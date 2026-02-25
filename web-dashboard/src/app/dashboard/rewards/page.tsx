'use client';

import React from 'react';
import Link from 'next/link';
import {
    ChevronLeft,
    Trophy,
    Gift,
    Star,
    Zap,
    Lock,
    ArrowRight
} from 'lucide-react';

const REWARDS = [
    { title: 'Tree Planting', cost: 1000, desc: 'We will plant a tree in your name in the Amazon.', unlocked: true },
    { title: 'Solar Coupon', cost: 2500, desc: '15% off your next solar panel installation.', unlocked: true },
    { title: 'Eco Merchant', cost: 500, desc: '$5 Gift card for premium sustainable stores.', unlocked: true },
    { title: 'Master Badge', cost: 5000, desc: 'Exclusive digital badge for top-tier warriors.', unlocked: false },
    { title: 'Zero Waste Kit', cost: 3500, desc: 'A physical hamper of bamboo & glass essentials.', unlocked: false },
];

export default function RewardsPage() {
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
                        <h1 className="text-4xl font-black mb-2 text-[#EAEEEF]">Eco Rewards</h1>
                        <p className="text-slate-400">Redeem your points for real-world environmental impact.</p>
                    </div>
                    <div className="jungle-card px-6 py-3 rounded-2xl flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Your Balance</span>
                            <span className="text-xl font-black text-[#EAEEEF]">2,450 pts</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-amber-500" />
                        </div>
                    </div>
                </div>
            </header>

            <section className="mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="relative overflow-hidden group rounded-[3rem] bg-gradient-to-br from-[#1B3733] via-[#0d1a18] to-[#10b981]/20 p-12 border border-[#10b981]/20 shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 group-hover:opacity-20 transition-all duration-1000 animate-float">
                        <Trophy className="w-64 h-64 text-[#10b981]" />
                    </div>
                    <div className="relative z-10 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] text-[10px] font-black uppercase tracking-widest mb-6 border border-[#10b981]/20">
                            <Star className="w-3 h-3" /> Monthly Highlight
                        </div>
                        <h2 className="text-4xl font-black mb-4 text-[#EAEEEF]">Elite Amazonian Restoration</h2>
                        <p className="text-slate-300 leading-relaxed mb-8">
                            Help restore critical wildlife habitats. Redesigned to give you full transparency on the impact of your points.
                            Participate now and receive a personalized digital reforestation certifcate.
                        </p>
                        <button className="px-8 py-4 rounded-2xl bg-[#EAEEEF] text-[#1B3733] font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-black/40">
                            Redeem 2,000 pts <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {REWARDS.map((reward, idx) => (
                    <div
                        key={reward.title}
                        className={`jungle-card p-8 rounded-[2.5rem] border transition-all flex flex-col animate-slide-up ${reward.unlocked ? 'border-white/5 hover:border-[#10b981]/40' : 'opacity-40 grayscale border-transparent'}`}
                        style={{ animationDelay: `${(idx + 3) * 100}ms` }}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 rounded-2xl bg-white/5">
                                {reward.unlocked ? <Gift className="w-8 h-8 text-[#EAEEEF]" /> : <Lock className="w-8 h-8 text-slate-500" />}
                            </div>
                            <span className="text-sm font-black text-[#EAEEEF]">{reward.cost} PTS</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
                        <p className="text-slate-500 text-sm mb-8 leading-relaxed flex-1">
                            {reward.desc}
                        </p>
                        <button
                            disabled={!reward.unlocked}
                            className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${reward.unlocked ? 'bg-[#EAEEEF]/5 hover:bg-[#EAEEEF]/10 text-[#EAEEEF] border border-[#EAEEEF]/10 hover:border-[#EAEEEF]/30' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                        >
                            {reward.unlocked ? 'Redeem Reward' : 'Level Higher to Unlock'}
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}
