'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Share2, Instagram, Facebook, Twitter, Linkedin, ChevronRight, User, Leaf, Zap, TrendingDown, Trophy } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="landing-layout">
      {/* SVG Filter for Grass Texture */}
      <svg width="0" height="0" className="absolute">
        <filter id="grassFilter" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="main-card animate-in fade-in duration-700 relative min-h-[calc(100vh-4rem)] flex flex-col overflow-visible">
        {/* Decorative Floating Leaves */}
        <div className="absolute top-20 right-[15%] w-32 h-32 text-emerald-500/10 animate-float pointer-events-none opacity-40">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,0 C70,30 90,50 50,100 C10,50 30,30 50,0" />
          </svg>
        </div>
        <div className="absolute bottom-40 left-[10%] w-48 h-48 text-lime-500/10 animate-float pointer-events-none opacity-30" style={{ animationDelay: '2s' }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,0 C70,30 90,50 50,100 C10,50 30,30 50,0" />
          </svg>
        </div>
        <div className="absolute top-[40%] right-[5%] w-24 h-24 text-emerald-400/10 animate-float pointer-events-none opacity-40" style={{ animationDelay: '1s' }}>
          <svg viewBox="0 0 100 100" fill="currentColor" transform="rotate(45)">
            <path d="M50,0 C70,30 90,50 50,100 C10,50 30,30 50,0" />
          </svg>
        </div>

        {/* Navigation */}
        <nav className="flex justify-between items-center px-12 py-8 z-10 shrink-0">
          <div className="flex items-center gap-12">
            <span className="font-extrabold text-2xl tracking-tighter">GREEN</span>
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link text-black font-bold border-b-2 border-black">Home</Link>
              <Link href="/" className="nav-link">About</Link>
              <Link href="/" className="nav-link">Goals</Link>
              <Link href="/" className="nav-link">Location</Link>
              <Link href="/" className="nav-link">Blog</Link>
              <Link href="/" className="nav-link">Contact</Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-slate-400">
              <Facebook className="w-4 h-4 cursor-pointer hover:text-[#1B3733] transition-colors" />
              <Instagram className="w-4 h-4 cursor-pointer hover:text-[#1B3733] transition-colors" />
              <Twitter className="w-4 h-4 cursor-pointer hover:text-[#1B3733] transition-colors" />
              <Linkedin className="w-4 h-4 cursor-pointer hover:text-[#1B3733] transition-colors" />
              <Share2 className="w-4 h-4 cursor-pointer hover:text-[#1B3733] transition-colors" />
            </div>
            <Link href={user ? "/dashboard" : "/login"} className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B3733] text-white text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#1B3733]/10">
              {user ? 'Dashboard' : 'Get Started'} <ChevronRight className="w-4 h-4 text-[#EAEEEF]" />
            </Link>
            <Link href={user ? "/dashboard/profile" : "/login"} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              {user && (
                <span className="text-sm font-bold text-[#1B3733] hidden md:block">
                  {user.displayName || 'Eco Warrior'}
                </span>
              )}
              <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-[#1B3733]" />
                )}
              </div>
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <main className="min-h-[85vh] flex flex-col items-center justify-center relative px-12">
          {/* Floating Rotating Text */}
          <div className="absolute top-1/2 left-32 -translate-y-1/2 hidden xl:block animate-float">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#1B3733]/5 blur-3xl rounded-full scale-150 group-hover:bg-[#1B3733]/10 transition-all"></div>
              <div className="w-40 h-40 animate-rotate-slow cursor-help">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="textPath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[8px] font-black uppercase tracking-[0.2em] fill-[#1B3733]/40 group-hover:fill-[#1B3733] transition-colors">
                    <textPath xlinkHref="#textPath">
                      Is there still hope . is there still hope .
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#1B3733] animate-ping opacity-20"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#1B3733] absolute"></div>
              </div>
            </div>
          </div>

          <div className="text-center px-4 relative">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] mb-8 text-[#1B3733]/60 animate-slide-up" style={{ animationDelay: '200ms' }}>
              A Sustainable Future Awaits
            </h2>
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-lime-500/10 rounded-full blur-3xl animate-pulse"></div>

              <h1 className="text-[10vw] font-black uppercase leading-[0.85] tracking-tighter mb-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
                <span className="block text-[#1B3733] opacity-80">Transforming</span>
                <span className="text-[14vw] font-black uppercase leading-none grass-text-effect tracking-[-0.05em] block">
                  Green
                </span>
              </h1>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex justify-between items-end w-full px-12 pb-12 mt-auto">
            <div className="max-w-xs animate-slide-up" style={{ animationDelay: '600ms' }}>
              <h4 className="font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1B3733]"></div>
                We are transforming the world
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                Learn more about our AI-driven sustainability platform and how you can
                make a difference today.
              </p>
              <button className="text-xs font-black uppercase tracking-widest border-b-2 border-[#1B3733] pb-1 flex items-center gap-2 hover:gap-4 transition-all">
                See more about <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="relative group animate-float">
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-3xl group-hover:bg-emerald-500/30 transition-all opacity-0 group-hover:opacity-100"></div>
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
                alt="Nature"
                className="w-64 h-40 object-cover rounded-[2.5rem] relative z-10 shadow-2xl transition-transform group-hover:scale-105"
              />
              <div className="absolute -bottom-4 -left-4 bg-[#1B3733] text-[#EAEEEF] p-4 rounded-2xl z-20 shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                <span className="text-[10px] font-black uppercase tracking-widest">Global Outreach</span>
                <div className="text-xl font-black">1.2M+ Trees</div>
              </div>
            </div>
          </div>
        </main>
        {/* Scroll Indicator */}
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-[1px] h-12 bg-black" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] inline-block mt-4 mb-4">Scroll For Impact</span>
        </div>

        {/* Global Impact Section */}
        <div className="relative z-10 bg-white/50 backdrop-blur-xl border-t border-black/5 px-24 py-32 space-y-32 overflow-hidden">
          {/* Decorative Elements for Section */}
          <div className="absolute top-40 left-[5%] w-64 h-64 text-emerald-500/5 animate-float pointer-events-none -rotate-12">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50,0 C70,30 90,50 50,100 C10,50 30,30 50,0" />
            </svg>
          </div>
          <div className="absolute top-[40%] right-[-5%] w-96 h-96 text-lime-500/5 animate-float pointer-events-none rotate-45" style={{ animationDelay: '3s' }}>
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50,0 C70,30 90,50 50,100 C10,50 30,30 50,0" />
            </svg>
          </div>
          <div className="absolute bottom-40 left-[10%] w-48 h-48 text-emerald-400/5 animate-float pointer-events-none opacity-40">
            <Leaf className="w-full h-full" />
          </div>

          {/* Section Header */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-600/60">Our Mission</h3>
            <h2 className="text-6xl font-black tracking-tighter text-[#1B3733] leading-none">
              Gamifying Planet <span className="text-emerald-500">Restoration</span> through AI.
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              EcoHabit combines behavioral psychology with cutting-edge carbon models to transform individual actions into collective planetary healing.
            </p>
          </div>

          {/* Impact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-10 rounded-[3rem] bg-emerald-900/5 border border-emerald-900/5 hover:bg-emerald-900/10 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-8 shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">
                <Leaf className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black mb-4 text-[#1B3733]">AI Carbon Tracking</h4>
              <p className="text-slate-500 leading-relaxed">
                Our proprietary AI models calculate your carbon footprint across transport, energy, and diet in real-time, providing actionable insights for reduction.
              </p>
            </div>

            <div className="p-10 rounded-[3rem] bg-lime-900/5 border border-lime-900/5 hover:bg-lime-900/10 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-lime-500 text-white flex items-center justify-center mb-8 shadow-lg shadow-lime-500/20 group-hover:scale-110 transition-transform">
                <Trophy className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black mb-4 text-[#1B3733]">Gamified Habits</h4>
              <p className="text-slate-500 leading-relaxed">
                Turn sustainable choices into an adventure. Earn "Eco Warrior" badges, maintain streaks, and climb the global leaderboards while saving the planet.
              </p>
            </div>

            <div className="p-10 rounded-[3rem] bg-emerald-950/5 border border-emerald-950/5 hover:bg-emerald-950/10 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white flex items-center justify-center mb-8 shadow-lg shadow-emerald-800/20 group-hover:scale-110 transition-transform">
                <Share2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black mb-4 text-[#1B3733]">Global Community</h4>
              <p className="text-slate-500 leading-relaxed">
                Join a movement of 1.2M+ world-changers. Participate in community challenges and see how your individual habits contribute to global reforestation.
              </p>
            </div>
          </div>

          {/* Data Insights */}
          <div className="relative p-16 rounded-[4rem] bg-gradient-to-br from-[#1B3733] to-[#0A1A17] text-white overflow-hidden shadow-2xl">
            {/* Background Shapes */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-lime-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-emerald-400 font-black uppercase tracking-widest text-sm">Carbon Reduction Goal</h3>
                  <h2 className="text-5xl font-black tracking-tighter leading-tight">We aim to reduce global CO2 by 5% within the next decade.</h2>
                </div>
                <div className="flex gap-16">
                  <div className="space-y-2">
                    <div className="text-4xl font-black">2027</div>
                    <div className="text-sm text-emerald-400/60 font-bold uppercase tracking-widest">Target Year</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-black">10M+</div>
                    <div className="text-sm text-emerald-400/60 font-bold uppercase tracking-widest">Active Heroes</div>
                  </div>
                </div>
                <Link href={user ? "/dashboard" : "/login"} className="inline-flex items-center gap-4 px-10 py-5 bg-emerald-500 text-white font-black uppercase tracking-tighter rounded-full hover:bg-emerald-400 transition-colors shadow-xl shadow-emerald-500/30">
                  {user ? 'View Dashboard' : 'Join the Mission'} <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-8 relative">
                <div className="space-y-8 p-10 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10">
                  <Zap className="w-10 h-10 text-lime-400" />
                  <h5 className="text-xl font-black leading-tight">Energy Efficiency</h5>
                  <p className="text-sm text-white/60">AI suggests optimal energy usage patterns for your home gadgets.</p>
                </div>
                <div className="space-y-8 p-10 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 mt-12">
                  <TrendingDown className="w-10 h-10 text-emerald-400" />
                  <h5 className="text-xl font-black leading-tight">Dietary Impact</h5>
                  <p className="text-sm text-white/60">Shift to planet-friendly meals with data-backed carbon savings.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer-like Info section */}
          <div className="pt-32 pb-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <span className="font-extrabold text-2xl tracking-tighter text-[#1B3733]">GREEN</span>
              <p className="text-sm text-slate-400 mt-2 font-medium">© 2026 EcoHabit. Building the future of sustainability.</p>
            </div>
            <div className="flex gap-12 font-black text-xs uppercase tracking-widest text-[#1B3733]/60">
              <Link href="/" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
              <Link href="/" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
              <Link href="/" className="hover:text-emerald-600 transition-colors">Global Metrics</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
