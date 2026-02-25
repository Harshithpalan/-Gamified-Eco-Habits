'use client';

import React from 'react';
import Link from 'next/link';
import {
    TrendingDown,
    Leaf,
    Zap,
    Trophy,
    Navigation,
    ShoppingBag,
    Plus,
    User
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-[#F4F7F4] text-[#1B3733] flex dark:bg-[#11261F] dark:text-[#E0E7E1] relative overflow-hidden">
            {/* Organic Nature Background Elements */}
            <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none animate-float"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[30vw] h-[30vw] bg-lime-500/10 blur-[100px] rounded-full pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

            {/* Celestial Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 text-yellow-400/20 dark:text-yellow-200/10 pointer-events-none animate-shine z-0">
                <svg viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="30" />
                    {[...Array(8)].map((_, i) => (
                        <rect
                            key={i}
                            x="48" y="0" width="4" height="20"
                            transform={`rotate(${i * 45} 50 50)`}
                            className="opacity-60"
                        />
                    ))}
                </svg>
            </div>

            {/* Drifting Clouds */}
            <div className="absolute top-[15%] left-0 w-48 h-24 text-white/10 dark:text-white/5 pointer-events-none animate-drift z-0" style={{ animationDelay: '-10s' }}>
                <svg viewBox="0 0 100 50" fill="currentColor">
                    <circle cx="30" cy="35" r="15" />
                    <circle cx="50" cy="30" r="20" />
                    <circle cx="70" cy="35" r="15" />
                </svg>
            </div>
            <div className="absolute top-[30%] left-0 w-64 h-32 text-white/10 dark:text-white/5 pointer-events-none animate-drift z-0" style={{ animationDelay: '-40s', animationDuration: '80s' }}>
                <svg viewBox="0 0 100 50" fill="currentColor">
                    <circle cx="20" cy="35" r="12" />
                    <circle cx="45" cy="25" r="18" />
                    <circle cx="75" cy="30" r="15" />
                </svg>
            </div>

            {/* Flying Birds */}
            <div className="absolute top-[20%] left-[-50px] w-8 h-4 text-emerald-900/20 dark:text-white/10 pointer-events-none animate-drift z-0" style={{ animationDuration: '40s', animationDelay: '-15s' }}>
                <div className="animate-flap">
                    <svg viewBox="0 0 20 10" fill="currentColor">
                        <path d="M0 5 C5 0 15 0 20 5 L18 6 C15 4 5 4 2 6 Z" />
                    </svg>
                </div>
            </div>
            <div className="absolute top-[25%] left-[-50px] w-6 h-3 text-emerald-900/15 dark:text-white/5 pointer-events-none animate-drift z-0" style={{ animationDuration: '45s', animationDelay: '-5s' }}>
                <div className="animate-flap" style={{ animationDelay: '0.1s' }}>
                    <svg viewBox="0 0 20 10" fill="currentColor">
                        <path d="M0 5 C5 0 15 0 20 5 L18 6 C15 4 5 4 2 6 Z" />
                    </svg>
                </div>
            </div>
            <div className="absolute top-[18%] left-[-50px] w-7 h-4 text-emerald-900/10 dark:text-white/5 pointer-events-none animate-drift z-0" style={{ animationDuration: '35s', animationDelay: '-25s' }}>
                <div className="animate-flap" style={{ animationDelay: '0.2s' }}>
                    <svg viewBox="0 0 20 10" fill="currentColor">
                        <path d="M0 5 C5 0 15 0 20 5 L18 6 C15 4 5 4 2 6 Z" />
                    </svg>
                </div>
            </div>


            {/* Aesthetic Minimalist Trees */}
            <div className="absolute bottom-0 left-[2%] w-48 h-96 text-emerald-900/20 dark:text-emerald-400/30 pointer-events-none animate-sway">
                <svg viewBox="0 0 100 200" fill="currentColor">
                    <path d="M50 200 L50 140" stroke="currentColor" strokeWidth="4" fill="none" />
                    <circle cx="50" cy="80" r="50" className="opacity-40" />
                    <circle cx="30" cy="120" r="30" className="opacity-30" />
                    <circle cx="70" cy="120" r="30" className="opacity-30" />
                    <path d="M50 80 L35 110 M50 90 L65 110" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
                </svg>
            </div>
            <div className="absolute bottom-[-10px] right-[5%] w-64 h-[500px] text-emerald-800/15 dark:text-emerald-300/25 pointer-events-none animate-sway" style={{ animationDelay: '1s' }}>
                <svg viewBox="0 0 100 200" fill="currentColor">
                    <path d="M50 200 L50 100" stroke="currentColor" strokeWidth="6" fill="none" />
                    <path d="M50 100 C10 80 10 20 50 0 C90 20 90 80 50 100" className="opacity-50" />
                    <path d="M50 110 C25 95 25 45 50 30 C75 45 75 95 50 110" className="opacity-40" />
                </svg>
            </div>
            {/* New: Pine Tree Variation */}
            <div className="absolute bottom-[-20px] left-[15%] w-32 h-64 text-emerald-950/10 dark:text-emerald-200/15 pointer-events-none animate-sway" style={{ animationDelay: '0.5s' }}>
                <svg viewBox="0 0 100 200" fill="currentColor">
                    <path d="M50 200 L50 180" stroke="currentColor" strokeWidth="4" />
                    <path d="M50 180 L20 180 L50 140 L25 140 L50 100 L30 100 L50 50 L70 100 L50 100 L75 140 L50 140 L80 180 Z" />
                </svg>
            </div>

            {/* Aesthetic Flowers */}
            <div className="absolute top-[15%] right-[12%] w-24 h-24 text-lime-600/25 dark:text-lime-400/30 pointer-events-none animate-bloom">
                <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 50 Q50 0 75 25 Q100 50 75 75 Q50 100 25 75 Q0 50 25 25 Q50 0 50 50" />
                    <circle cx="50" cy="50" r="10" fill="white" className="opacity-40" />
                </svg>
            </div>
            <div className="absolute top-[45%] left-[20%] w-16 h-16 text-emerald-500/25 dark:text-emerald-300/30 pointer-events-none animate-bloom" style={{ animationDelay: '3s' }}>
                <svg viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="20" />
                    <path d="M50 25 A25 25 0 0 1 75 50 A25 25 0 0 1 50 75 A25 25 0 0 1 25 50 A25 25 0 0 1 50 25" transform="rotate(45 50 50)" className="opacity-50" />
                </svg>
            </div>
            {/* New: Cluster of Small Flowers */}
            <div className="absolute top-[70%] right-[30%] w-32 h-32 flex gap-4 pointer-events-none">
                <div className="text-lime-500/20 dark:text-lime-300/25 animate-bloom">
                    <svg viewBox="0 0 100 100" className="w-8 h-8" fill="currentColor">
                        <path d="M50 50 L100 50 A50 50 0 0 1 50 100 Z" className="opacity-50" />
                        <path d="M50 50 L50 0 A50 50 0 0 1 100 50 Z" className="opacity-40" />
                    </svg>
                </div>
                <div className="text-emerald-400/20 dark:text-emerald-200/25 animate-bloom" style={{ animationDelay: '1s' }}>
                    <svg viewBox="0 0 100 100" className="w-10 h-10" fill="currentColor">
                        <circle cx="50" cy="50" r="50" className="opacity-30" />
                        <circle cx="50" cy="50" r="15" fill="white" className="opacity-40" />
                    </svg>
                </div>
            </div>

            {/* Subtle Texture Layer */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leaf.png")' }}></div>

            {/* Sidebar */}
            <aside className="w-64 border-r border-emerald-900/10 dark:border-white/10 hidden lg:flex flex-col p-6 sticky top-0 h-screen z-10 backdrop-blur-md bg-white/5">
                <Link href="/" className="flex items-center gap-3 mb-10 transition-all hover:scale-105 group animate-float">
                    <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-lime-400 shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
                        <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent drop-shadow-sm dark:from-emerald-400 dark:to-lime-300">
                        EcoHabit
                    </span>
                </Link>

                <nav className="flex-1 space-y-2">
                    <SidebarItem
                        icon={<TrendingDown className="w-5 h-5" />}
                        label="Overview"
                        href="/dashboard"
                        active={pathname === '/dashboard'}
                    />
                    <SidebarItem
                        icon={<Zap className="w-5 h-5" />}
                        label="Habits"
                        href="/dashboard/habits"
                        active={pathname === '/dashboard/habits'}
                    />
                    <SidebarItem
                        icon={<Trophy className="w-5 h-5" />}
                        label="Rewards"
                        href="/dashboard/rewards"
                        active={pathname === '/dashboard/rewards'}
                    />
                    <SidebarItem
                        icon={<Navigation className="w-5 h-5" />}
                        label="Community"
                        href="/dashboard/community"
                        active={pathname === '/dashboard/community'}
                    />
                    <SidebarItem
                        icon={<User className="w-5 h-5" />}
                        label="Profile"
                        href="/dashboard/profile"
                        active={pathname === '/dashboard/profile'}
                    />
                </nav>

                <div className="mt-auto glass p-4 rounded-2xl">
                    <p className="text-xs text-slate-400 mb-2">My Impact</p>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold font-black">142kg</span>
                        <span className="text-[#EAEEEF] text-xs mb-1 opacity-80">↓ 12%</span>
                    </div>
                    <p className="text-[10px] text-slate-500">CO2 saved this month</p>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen">
                {children}
            </div>
        </div>
    );
}

function SidebarItem({ icon, label, href, active = false }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-emerald-900/60 dark:text-emerald-100/60 hover:bg-emerald-600/10 hover:text-emerald-600'}`}
        >
            {icon}
            <span className="font-medium text-sm">{label}</span>
        </Link>
    );
}
