'use client';

import React from 'react';
import {
    User,
    Mail,
    Calendar,
    Award,
    Edit2,
    LogOut,
    Shield,
    Leaf
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

export default function ProfilePage() {
    const router = useRouter();
    const user = auth.currentUser || {
        displayName: 'Eco Warrior',
        email: 'warrior@eco.com',
        metadata: { creationTime: 'January 2026' }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/login');
    };

    return (
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
            <header className="mb-10 animate-slide-up">
                <h1 className="text-3xl font-bold mb-1 text-[#EAEEEF]">User Profile</h1>
                <p className="text-slate-400">Manage your eco-identity and preferences.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <div className="jungle-card p-8 rounded-[2.5rem] flex flex-col items-center text-center">
                        <div className="relative mb-6">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#10b981] to-emerald-400 p-1">
                                <div className="w-full h-full rounded-full bg-[#1B3733] flex items-center justify-center overflow-hidden">
                                    <User className="w-16 h-16 text-[#10b981]" />
                                </div>
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-[#EAEEEF] text-[#1B3733] shadow-lg border-4 border-[#1B3733] hover:scale-110 transition-transform">
                                <Edit2 className="w-4 h-4" />
                            </button>
                        </div>

                        <h2 className="text-2xl font-black mb-1">{user.displayName}</h2>
                        <p className="text-[#10b981] font-bold text-sm mb-6 flex items-center gap-1">
                            <Shield className="w-3 h-3" /> Earth Guardian
                        </p>

                        <div className="w-full space-y-4 pt-6 border-t border-white/5 text-left">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-white/5">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Email</p>
                                    <p className="text-xs font-bold">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-white/5">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Joined</p>
                                    <p className="text-xs font-bold">{new Date(user.metadata.creationTime || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full mt-8 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-bold flex items-center justify-center gap-2 transition-all"
                        >
                            <LogOut className="w-4 h-4" /> Log Out
                        </button>
                    </div>
                </div>

                {/* Achievements & Goals */}
                <div className="lg:col-span-2 space-y-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <div className="jungle-card p-8 rounded-[2.5rem]">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-500" /> Your Achievements
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <AchievementItem icon="🚲" title="Cyclist" />
                            <AchievementItem icon="🌱" title="Composter" />
                            <AchievementItem icon="🔋" title="Eco-Saver" />
                            <AchievementItem icon="🛍️" title="Planeteer" locked />
                        </div>
                    </div>

                    <div className="jungle-card p-8 rounded-[2.5rem]">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-[#10b981]" /> Eco Goals
                        </h3>
                        <div className="space-y-6">
                            <GoalProgress title="Reduce Meat Consumption" progress={75} />
                            <GoalProgress title="Zero Waste Week" progress={40} />
                            <GoalProgress title="Solar Energy Target" progress={90} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function AchievementItem({ icon, title, locked = false }: { icon: string, title: string, locked?: boolean }) {
    return (
        <div className={`p-4 rounded-3xl flex flex-col items-center gap-2 ${locked ? 'bg-black/20 opacity-40' : 'bg-white/5 hover:bg-white/10 transition-all'}`}>
            <span className="text-3xl">{icon}</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">{title}</span>
        </div>
    );
}

function GoalProgress({ title, progress }: { title: string, progress: number }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-300">{title}</span>
                <span className="text-[#10b981] font-black">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-[#10b981] to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
