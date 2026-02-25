'use client';

import React from 'react';
import {
    TrendingDown,
    Leaf,
    Zap,
    Trophy,
    Navigation,
    ShoppingBag,
    Lightbulb,
    ArrowUpRight,
    Plus
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';

const data = [
    { name: 'Mon', co2: 12 },
    { name: 'Tue', co2: 8 },
    { name: 'Wed', co2: 15 },
    { name: 'Thu', co2: 10 },
    { name: 'Fri', co2: 7 },
    { name: 'Sat', co2: 5 },
    { name: 'Sun', co2: 4 },
];

const categoryData = [
    { name: 'Transport', value: 45, color: '#2D5A27' }, // Deep Forest
    { name: 'Energy', value: 30, color: '#84A98C' },    // Sage
    { name: 'Shopping', value: 25, color: '#CAD2C5' },  // Pale Leaf
];

import { getEcoSuggestion } from '@/lib/carbon-model';
import { HABITS, calculateActionPoints } from '@/lib/gamification';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [points, setPoints] = React.useState(2450);
    const [streak, setStreak] = React.useState(12);
    const [aiSuggestion, setAiSuggestion] = React.useState(getEcoSuggestion('CAR_GASOLINE', 25));

    const handleLogAction = async (id: string) => {
        const habit = HABITS.find(h => h.id === id);
        if (!habit) return;

        const gained = calculateActionPoints(id);

        try {
            await addDoc(collection(db, 'habit_logs'), {
                habitId: id,
                habitName: habit.name,
                points: gained,
                timestamp: serverTimestamp(),
                userId: 'demo-user'
            });

            setPoints(prev => prev + gained);
            setIsModalOpen(false);

            // Randomly update suggestion for demo purposes
            if (id === 'cycling') {
                setAiSuggestion(getEcoSuggestion('BEEF', 0.5));
            } else {
                setAiSuggestion(getEcoSuggestion('CAR_GASOLINE', Math.floor(Math.random() * 50) + 10));
            }
        } catch (error) {
            console.error("Error logging action to Firestore:", error);
            alert("Failed to save action to database.");
        }
    };

    return (
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
            <header className="flex justify-between items-center mb-10 animate-slide-up">
                <div>
                    <h1 className="text-3xl font-bold mb-1 text-emerald-900 dark:text-emerald-50">Welcome back, Eco-Warrior!</h1>
                    <p className="text-emerald-700/60 dark:text-emerald-100/60">Here's your footprint overview for this week.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 border border-white/10"
                >
                    <Plus className="w-5 h-5 font-black" /> Log Action
                </button>
            </header>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0d1a18]/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    <div className="relative jungle-card w-full max-w-md p-8 rounded-[2.5rem] animate-in fade-in zoom-in duration-300 border-[#10b981]/20">
                        <h3 className="text-2xl font-black mb-6 text-[#EAEEEF]">Log an Eco-Action</h3>
                        <div className="space-y-3">
                            {HABITS.map(habit => (
                                <button
                                    key={habit.id}
                                    onClick={() => handleLogAction(habit.id)}
                                    className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-[#EAEEEF]/5 border border-transparent hover:border-[#EAEEEF]/20 transition-all flex justify-between items-center group"
                                >
                                    <div>
                                        <div className="font-bold text-sm">{habit.name}</div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">{habit.category}</div>
                                    </div>
                                    <div className="text-[#EAEEEF] font-bold group-hover:scale-110 transition-transform opacity-80">
                                        +{habit.basePoints} pts
                                    </div>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-full mt-6 py-3 text-slate-400 hover:text-white transition-colors text-sm font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <StatCard
                        title="Total Footprint"
                        value="342kg"
                        sub="CO2 emitted"
                        trend="-8%"
                        icon={<TrendingDown className="text-[#10b981]" />}
                    />
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <StatCard
                        title="Current Streak"
                        value={`${streak} Days`}
                        sub="Active habits"
                        trend="+2"
                        icon={<Zap className="text-amber-500" />}
                    />
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                    <StatCard
                        title="Eco Points"
                        value={points.toLocaleString()}
                        sub="Total earned"
                        trend="Next: Silver Tier"
                        icon={<Trophy className="text-blue-500" />}
                    />
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <div className="jungle-card p-6 rounded-3xl group border-transparent hover:border-[#10b981]/20 transition-all">
                    <h3 className="text-xl font-bold mb-6 text-[#EAEEEF]">Emissions Trend</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2D5A27" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#2D5A27" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D5A2722" />
                                <XAxis dataKey="name" stroke="#52796F" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <YAxis stroke="#52796F" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#11261F', border: '1px solid #2D5A2744', borderRadius: '12px' }}
                                    itemStyle={{ color: '#E0E7E1' }}
                                />
                                <Area type="monotone" dataKey="co2" stroke="#2D5A27" strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="jungle-card p-6 rounded-3xl group border-transparent hover:border-[#10b981]/20 transition-all">
                    <h3 className="text-xl font-bold mb-6 text-[#EAEEEF]">Emissions by Category</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" stroke="#64748b" axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#1B3733', border: '1px solid #EAEEEF22', borderRadius: '12px' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* AI Insights & Habits */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '500ms' }}>
                <div className="lg:col-span-2 jungle-card p-6 rounded-3xl group border-transparent hover:border-[#10b981]/20 transition-all">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-[#EAEEEF]">Personalized Habits</h3>
                        <button className="text-[#EAEEEF] opacity-80 text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        <HabitItem
                            title="Cycling to Work"
                            points="+50"
                            status="Daily"
                            icon={<Navigation className="text-emerald-400" />}
                        />
                        <HabitItem
                            title="Use Reusable Bags"
                            points="+20"
                            status="Shopping"
                            icon={<ShoppingBag className="text-blue-400" />}
                        />
                        <HabitItem
                            title="Short Showers"
                            points="+30"
                            status="Energy"
                            icon={<Zap className="text-amber-400" />}
                        />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#10b981]/10 to-transparent border border-[#10b981]/20 p-6 rounded-3xl group hover:scale-[1.02] transition-all">
                    <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-[#10b981] animate-pulse" />
                        <h3 className="text-lg font-bold text-[#EAEEEF]">AI Eco-Insight</h3>
                    </div>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                        "{aiSuggestion}"
                    </p>
                    <button className="w-full py-3 rounded-xl bg-[#EAEEEF]/10 hover:bg-[#EAEEEF]/20 text-[#EAEEEF] font-bold transition-all">
                        Try this tip
                    </button>
                </div>
            </div>
        </main>
    );
}

function StatCard({ title, value, sub, trend, icon }: any) {
    return (
        <div className="jungle-card p-6 rounded-3xl transition-all hover:scale-[1.05] group border-transparent hover:border-[#10b981]/20">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-white/5">{icon}</div>
                <span className={`text-xs font-bold ${trend.startsWith('-') ? 'text-[#EAEEEF]' : trend.startsWith('+') ? 'text-blue-400' : 'text-slate-400'}`}>
                    {trend}
                </span>
            </div>
            <h4 className="text-slate-400 text-sm mb-1">{title}</h4>
            <div className="text-2xl font-bold mb-1">{value}</div>
            <p className="text-slate-500 text-xs">{sub}</p>
        </div>
    );
}

function HabitItem({ title, points, status, icon }: any) {
    return (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-slate-900">{icon}</div>
                <div>
                    <h4 className="font-bold text-sm">{title}</h4>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">{status}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[#EAEEEF] font-bold opacity-80">{points} pts</span>
                <ArrowUpRight className="w-4 h-4 text-slate-600" />
            </div>
        </div>
    );
}
