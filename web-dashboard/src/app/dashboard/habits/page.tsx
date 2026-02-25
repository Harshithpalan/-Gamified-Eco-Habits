'use client';

import React from 'react';
import Link from 'next/link';
import {
    ChevronLeft,
    Zap,
    TrendingUp,
    ShoppingBag,
    Navigation,
    CheckCircle2,
    Plus
} from 'lucide-react';
import { HABITS } from '@/lib/gamification';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function HabitsPage() {
    const [loggingId, setLoggingId] = React.useState<string | null>(null);

    const handleLogAction = async (habit: typeof HABITS[0]) => {
        setLoggingId(habit.id);
        try {
            await addDoc(collection(db, 'habit_logs'), {
                habitId: habit.id,
                habitName: habit.name,
                points: habit.basePoints,
                timestamp: serverTimestamp(),
                userId: 'demo-user' // In a real app, this would be the actual auth user ID
            });
            alert(`Logged ${habit.name}! +${habit.basePoints} points added.`);
        } catch (error) {
            console.error("Error logging habit:", error);
            alert("Failed to log habit. Please try again.");
        } finally {
            setLoggingId(null);
        }
    };

    return (
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
            <header className="mb-10 animate-slide-up">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#EAEEEF] transition-colors mb-4 group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
                </Link>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black mb-2 text-[#EAEEEF]">My Eco-Habits</h1>
                        <p className="text-slate-400">Manage and track your daily sustainable actions.</p>
                    </div>
                    <button className="px-6 py-3 rounded-2xl bg-[#EAEEEF] text-[#1B3733] font-black text-sm hover:scale-105 transition-all shadow-lg shadow-[#EAEEEF]/5 flex items-center gap-2">
                        <Plus className="w-5 h-5" /> Add New Habit
                    </button>
                </div>
            </header>

            {/* Habit Categories / Filter */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {['All habits', 'Transport', 'Food', 'Energy', 'Shopping'].map((cat, i) => (
                    <button
                        key={cat}
                        className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-bold border transition-all ${i === 0 ? 'bg-[#EAEEEF] text-[#1B3733] border-[#EAEEEF]' : 'border-white/10 text-slate-400 hover:border-white/20'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Habits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {HABITS.map((habit, idx) => (
                    <div
                        key={habit.id}
                        className="jungle-card p-8 rounded-[2.5rem] group hover:border-[#10b981]/40 transition-all flex flex-col animate-slide-up"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 rounded-2xl bg-[#EAEEEF]/10 group-hover:scale-110 transition-transform">
                                {habit.id === 'cycling' && <Navigation className="w-8 h-8 text-[#EAEEEF]" />}
                                {habit.id === 'composting' && <Zap className="w-8 h-8 text-[#EAEEEF]" />}
                                {habit.id === 'reusable_bags' && <ShoppingBag className="w-8 h-8 text-[#EAEEEF]" />}
                                {habit.id === 'solar_panels' && <TrendingUp className="w-8 h-8 text-[#EAEEEF]" />}
                                {habit.id === 'meat_free' && <Zap className="w-8 h-8 text-[#EAEEEF]" />}
                                {habit.id === 'charging_station' && <Zap className="w-8 h-8 text-[#EAEEEF]" />}
                            </div>
                            <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                                {habit.category}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-2">{habit.name}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                            Regularly performing this habit helps reduce your carbon footprint significantly over time.
                        </p>

                        <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-auto">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase tracking-tighter">Reward</span>
                                <span className="font-bold text-[#EAEEEF]">+{habit.basePoints} pts</span>
                            </div>
                            <button
                                onClick={() => handleLogAction(habit)}
                                disabled={loggingId === habit.id}
                                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/5 hover:bg-[#EAEEEF]/10 text-[#EAEEEF] text-xs font-bold transition-all border border-transparent hover:border-[#EAEEEF]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                {loggingId === habit.id ? 'Logging...' : 'Log Today'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
