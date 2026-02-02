import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [myIdeas, setMyIdeas] = useState([]);
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [interests, setInterests] = useState([]);

    useEffect(() => {
        const fetchMyIdeas = async () => {
            try {
                const response = await fetch(`https://startupideaexcahnge.in/api/collab/profile/${user.id}`);
                const data = await response.json();
                setMyIdeas(data.ideas || []);
            } catch (err) {
                console.error('Error fetching my ideas:', err);
            }
        };
        if (user) fetchMyIdeas();
    }, [user]);

    const viewInterests = async (ideaId) => {
        try {
            const response = await fetch(`https://startupideaexcahnge.in/api/collab/ideas/${ideaId}/interests`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setInterests(data);
            setSelectedIdea(ideaId);
        } catch (err) {
            console.error('Error fetching interests:', err);
        }
    };

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center">Redirecting to login...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
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
                <header className="mb-12 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">My Ideas</h1>
                        <p className="text-slate-400">Manage your pitches and collaborations</p>
                    </div>
                    <a href="/marketplace" className="text-blue-400 text-sm font-bold hover:underline">Browse Marketplace →</a>
                </header>

                <div className="grid md:grid-cols-3 gap-8">
                    <a href="/post-idea" className="glass p-8 rounded-3xl border-blue-500/20 bg-blue-500/5 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-blue-500/10 transition-all border-dashed border-2 min-h-[200px]">
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7v14" /></svg>
                        </div>
                        <h3 className="font-bold text-lg mb-1">Post New Idea</h3>
                        <p className="text-sm text-slate-400">Launch a new concept</p>
                    </a>

                    {myIdeas.map(idea => (
                        <div key={idea.id} className="glass p-8 rounded-3xl border-white/5 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{idea.category}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${idea.status === 'OPEN' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {idea.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold mb-4">{idea.title}</h3>
                            <button
                                onClick={() => viewInterests(idea.id)}
                                className="mt-auto w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5"
                            >
                                Inbound Interests
                            </button>
                        </div>
                    ))}
                </div>

                {selectedIdea && (
                    <div className="mt-20 border-t border-white/5 pt-12 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-end mb-8">
                            <h2 className="text-2xl font-bold">Interested Partners</h2>
                            <button onClick={() => setSelectedIdea(null)} className="text-slate-500 text-xs hover:text-white">Close Section</button>
                        </div>

                        <div className="space-y-4">
                            {interests.length === 0 ? (
                                <p className="text-slate-500 text-sm italic">No one has expressed interest in this idea yet.</p>
                            ) : (
                                interests.map(interest => (
                                    <div key={interest.id} className="glass p-6 rounded-2xl border-white/5 flex flex-col md:flex-row gap-6">
                                        <div className="flex items-start gap-4 shrink-0">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-lg">
                                                {interest.user.profile?.firstName?.[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold">{interest.user.profile?.firstName} {interest.user.profile?.lastName}</div>
                                                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{interest.user.email}</div>
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-sm text-slate-300 italic">"{interest.message}"</p>
                                        </div>
                                        <div className="flex gap-2 self-end md:self-center">
                                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all">Connect</button>
                                            <button className="bg-white/5 hover:bg-white/10 text-slate-400 px-4 py-2 rounded-lg text-xs font-bold border border-white/5 transition-all">Decline</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
