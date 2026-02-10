import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({ problems: [], solutions: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Mocking dashboard stats for now since we need a dedicated endpoint
                const problemsRes = await axios.get('/api/problems');
                setStats({
                    problems: problemsRes.data.slice(0, 3),
                    solutions: []
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">Founder Console</h1>
                    <p className="text-slate-500 font-medium italic">Manage your problems and solution engagement.</p>
                </div>
                <NavLink to="/post-problem" className="btn-primary">
                    Post a Problem
                </NavLink>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { label: 'Active Problems', value: stats.problems.length, color: 'indigo' },
                    { label: 'Solutions Received', value: '0', color: 'emerald' },
                    { label: 'Market Demand', value: '---', color: 'amber' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-8 bg-white ring-1 ring-slate-100/50">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</div>
                        <div className={`text-5xl font-black text-${stat.color}-600 tracking-tighter`}>{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Recent Problems Section */}
                <section className="space-y-6">
                    <h2 className="text-xl font-black tracking-tight text-slate-900">Your Recent Problems</h2>
                    <div className="space-y-4">
                        {stats.problems.length === 0 ? (
                            <div className="p-12 text-center glass-card border-dashed bg-slate-50/20">
                                <p className="text-slate-400 font-medium">No problems posted yet.</p>
                            </div>
                        ) : (
                            stats.problems.map(p => (
                                <div key={p.id} className="p-6 glass-card bg-white border border-slate-50 flex justify-between items-center group cursor-pointer hover:scale-[1.01] transition-all">
                                    <div>
                                        <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{p.title}</div>
                                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{p.category}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-black text-indigo-600">{p.demandScore}%</div>
                                        <div className="text-[8px] font-black uppercase text-slate-300 tracking-widest">Demand</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Platform Activity Section */}
                <section className="space-y-6">
                    <h2 className="text-xl font-black tracking-tight text-slate-900">Platform Activity</h2>
                    <div className="glass-card p-8 bg-slate-50/50 border-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8">
                            <div className="w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl"></div>
                        </div>
                        <div className="space-y-8 relative z-10">
                            <div className="flex gap-4 items-start">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shadow-lg shadow-emerald-500/20"></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 leading-snug">New solution posted for "Real-time Supply Chain AI"</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">By James Miller • 2m ago</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 shadow-lg shadow-amber-500/20"></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 leading-snug">Demand spike detected in GreenTech category</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">+15% engagement in 24h</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
