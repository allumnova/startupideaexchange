import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IdeaCard from '../Marketplace/IdeaCard';

const PublicProfile = () => {
    const { userId } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`https://startupideaexcahnge.in/api/collab/profile/${userId}`);
                const data = await response.json();
                setProfileData(data);
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId]);

    if (loading) return (
        <div className="min-h-screen mesh-gradient flex items-center justify-center">
            <div className="text-white animate-pulse font-bold tracking-widest text-xl">Loading Founder...</div>
        </div>
    );

    if (!profileData) return <div>Profile not found</div>;

    const { profile, ideas } = profileData;

    return (
        <div className="min-h-screen mesh-gradient text-white">
            {/* Hero Section */}
            <div className="relative h-60 bg-gradient-to-br from-blue-600/20 to-indigo-900/40 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 mesh-gradient opacity-30"></div>
            </div>

            <div className="max-w-6xl mx-auto px-8 -mt-24 relative z-10">
                <div className="flex flex-col md:flex-row gap-10 items-start">
                    {/* Left Sidebar Info */}
                    <div className="glass w-full md:w-80 p-8 rounded-[2.5rem] border-white/10 shrink-0">
                        <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 border-4 border-slate-950 mx-auto mb-6 flex items-center justify-center text-4xl font-black">
                            {profile?.firstName?.[0] || 'U'}
                        </div>
                        <h1 className="text-3xl font-bold text-center mb-1">
                            {profile?.firstName} {profile?.lastName}
                        </h1>
                        <p className="text-blue-400 text-xs font-bold text-center uppercase tracking-widest mb-6 px-4">
                            Founder & Concept Architect
                        </p>

                        <div className="space-y-6 pt-6 border-t border-white/5">
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">About</label>
                                <p className="text-sm text-slate-400 leading-relaxed">{profile?.bio || "No bio available."}</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Core Skills</label>
                                <div className="flex gap-2 flex-wrap">
                                    {profile?.skills?.map((skill, i) => (
                                        <span key={i} className="text-[10px] bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 font-bold">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Portfolio */}
                    <div className="flex-grow w-full space-y-12 pb-20">
                        <div className="flex justify-between items-end border-b border-white/5 pb-6">
                            <h2 className="text-4xl font-black">Startup Portfolio</h2>
                            <span className="text-slate-500 font-bold uppercase tracking-tighter text-xs">{ideas.length} Active Concepts</span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {ideas.map((idea) => (
                                <IdeaCard key={idea.id} idea={idea} />
                            ))}
                        </div>

                        {ideas.length === 0 && (
                            <div className="text-center py-20 text-slate-500 font-bold tracking-widest uppercase bg-white/2 rounded-3xl border-dashed border-2 border-white/5">
                                No published concepts yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
