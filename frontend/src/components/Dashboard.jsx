import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center">Redirecting to login...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Sidebar / Topnav */}
            <nav className="glass border-b border-white/5 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                        Founder Console
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-sm text-slate-400">
                        Welcome, <span className="text-white font-semibold">{user.profile?.firstName || user.email}</span>
                    </div>
                    <button
                        onClick={logout}
                        className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 py-12">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-2">My Ideas</h1>
                    <p className="text-slate-400">Manage your pitches and collaborations</p>
                </header>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Action Card */}
                    <div className="glass p-8 rounded-3xl border-blue-500/20 bg-blue-500/5 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-blue-500/10 transition-all border-dashed border-2">
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7v14" /></svg>
                        </div>
                        <h3 className="font-bold text-lg mb-1">Post New Idea</h3>
                        <p className="text-sm text-slate-400">Phase 2: Management</p>
                    </div>

                    {/* Placeholder Card */}
                    <div className="glass p-8 rounded-3xl opacity-50 relative overflow-hidden">
                        <div className="h-4 w-24 bg-white/10 rounded mb-4"></div>
                        <div className="h-8 w-full bg-white/10 rounded mb-6"></div>
                        <div className="flex gap-2">
                            <div className="h-6 w-16 bg-white/10 rounded-full"></div>
                            <div className="h-6 w-16 bg-white/10 rounded-full"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px]">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Locked until Phase 2</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
