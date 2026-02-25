'use client';

import React from 'react';
import {
    Users,
    Target,
    MapPin,
    Trophy,
    ArrowRight,
    Shield,
    MessageSquare
} from 'lucide-react';

const neighborhoodData = [
    { name: 'Green Valley', reduction: '1,240kg', rank: 1, members: 450 },
    { name: 'Sunnyvale', reduction: '980kg', rank: 2, members: 320 },
    { name: 'Eco District', reduction: '850kg', rank: 3, members: 280 },
    { name: 'Park Side', reduction: '620kg', rank: 4, members: 210 },
];

const activeChallenges = [
    {
        id: 1,
        title: '1,000kg CO2 Reduction',
        target: '1000kg',
        current: '740kg',
        daysLeft: 5,
        participants: 120
    },
    {
        id: 2,
        title: 'The Bike-to-Work Week',
        target: '500 Trips',
        current: '312 Trips',
        daysLeft: 3,
        participants: 85
    }
];

export default function Community() {
    return (
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
            <header className="mb-10 animate-slide-up">
                <h1 className="text-3xl font-bold mb-1 text-[#EAEEEF]">Community Challenges</h1>
                <p className="text-slate-400">Join forces with your neighborhood for collective impact.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Neighborhood Leaderboard */}
                <div className="lg:col-span-2 jungle-card p-8 rounded-[2.5rem] animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-[#EAEEEF]/10">
                                <Shield className="w-6 h-6 text-[#EAEEEF]" />
                            </div>
                            <h3 className="text-xl font-bold">Neighborhood Rankings</h3>
                        </div>
                        <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Monthly Impact</span>
                    </div>

                    <div className="space-y-4">
                        {neighborhoodData.map((neighborhood) => (
                            <div key={neighborhood.name} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                                <div className="flex items-center gap-6">
                                    <span className="text-lg font-bold text-slate-500 w-4">#{neighborhood.rank}</span>
                                    <div>
                                        <h4 className="font-bold text-lg">{neighborhood.name}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <Users className="w-3 h-3" /> {neighborhood.members} members
                                            </span>
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> Area 4
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[#10b981] font-black text-xl">-{neighborhood.reduction}</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-tighter">CO2 Offset</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <div className="bg-[#10b981] p-8 rounded-[2.5rem] text-[#1B3733] shadow-xl shadow-[#10b981]/10">
                        <h4 className="text-[#1B3733]/60 text-sm font-bold uppercase tracking-widest mb-2">Total Community Impact</h4>
                        <div className="text-4xl font-black mb-4">12,450kg</div>
                        <p className="text-[#1B3733]/80 rounded-xl bg-[#1B3733]/5 p-4 text-sm leading-relaxed font-medium">
                            Together, our platform's 50,000+ users have removed equivalent to planting 620 trees this year.
                        </p>
                    </div>

                    <div className="jungle-card p-6 rounded-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare className="w-5 h-5 text-blue-400" />
                            <h3 className="font-bold text-[#EAEEEF]">Recent Achievements</h3>
                        </div>
                        <div className="space-y-4">
                            <ActivityFeedItem user="Alex G." action="completed 7-day streak" time="2m ago" />
                            <ActivityFeedItem user="EcoDistrict" action="reached 500kg milestone" time="15m ago" />
                            <ActivityFeedItem user="Sarah L." action="switched to Solar Power" time="1h ago" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Challenges */}
            <section>
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold">Active Challenges</h3>
                    <button className="text-[#EAEEEF] opacity-80 font-medium hover:underline flex items-center gap-1">
                        Browse All <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
                    {activeChallenges.map((challenge, idx) => (
                        <div
                            key={challenge.id}
                            className="jungle-card p-8 rounded-[2.5rem] group hover:border-[#10b981]/40 transition-all"
                            style={{ animationDelay: `${(idx + 4) * 100}ms` }}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 rounded-2xl bg-[#EAEEEF]/10">
                                    <Target className="w-8 h-8 text-[#EAEEEF]" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold">
                                    {challenge.daysLeft} days left
                                </span>
                            </div>
                            <h4 className="text-xl font-bold mb-2">{challenge.title}</h4>
                            <div className="flex justify-between text-sm mb-3">
                                <span className="text-slate-400">Target: {challenge.target}</span>
                                <span className="text-[#EAEEEF] font-bold opacity-80">{challenge.current}</span>
                            </div>
                            {/* Progress Bar */}
                            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mb-8">
                                <div
                                    className="h-full bg-[#10b981] rounded-full transition-all duration-1000 opacity-90 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                    style={{ width: `${(parseInt(challenge.current) / parseInt(challenge.target)) * 100}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-[#1B3733] bg-[#EAEEEF] flex items-center justify-center text-[10px] font-bold text-[#1B3733]">
                                        +{challenge.participants - 4}
                                    </div>
                                </div>
                                <button className="px-6 py-2 rounded-xl bg-[#10b981] text-[#1B3733] font-black text-sm hover:scale-105 transition-all">
                                    Join Challenge
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

function ActivityFeedItem({ user, action, time }: { user: string, action: string, time: string }) {
    return (
        <div className="flex justify-between items-start gap-4 text-sm">
            <div className="flex-1">
                <span className="font-bold text-[#EAEEEF] opacity-90">{user}</span>
                <span className="text-slate-400 ml-1">{action}</span>
            </div>
            <span className="text-[10px] text-slate-600 whitespace-nowrap">{time}</span>
        </div>
    );
}
