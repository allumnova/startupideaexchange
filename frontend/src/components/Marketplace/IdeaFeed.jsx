import React, { useEffect, useState } from 'react';
import IdeaCard from './IdeaCard';
import ConnectModal from '../Collaboration/ConnectModal';

const IdeaFeed = () => {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ category: '', stage: '' });
    const [selectedIdea, setSelectedIdea] = useState(null);

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const query = new URLSearchParams(filter).toString();
                const response = await fetch(`https://startupideaexcahnge.in/api/ideas?${query}`);
                const data = await response.json();
                setIdeas(data);
            } catch (err) {
                console.error('Error fetching ideas:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchIdeas();
    }, [filter]);

    return (
        <div className="min-h-screen bg-gray-50 text-slate-900 font-sans mesh-gradient px-8 py-20">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl font-extrabold mb-4 text-gray-900 font-display tracking-tight">
                            Idea Marketplace
                        </h1>
                        <p className="text-gray-500 max-w-lg text-lg">
                            Discover the next generation of startups. Filter concepts by stage, category, or founder background.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <select
                            className="bg-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-600 focus:outline-none focus:border-primary-500 transition-all border border-gray-200 cursor-pointer shadow-sm hover:border-gray-300"
                            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                        >
                            <option value="">All Categories</option>
                            <option value="AI/ML">AI/ML</option>
                            <option value="Fintech">Fintech</option>
                            <option value="SaaS">SaaS</option>
                            <option value="Health">Health</option>
                        </select>
                        <a href="/post-idea">
                            <button className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary-500/25 active:scale-95 transition-all">
                                Post My Idea
                            </button>
                        </a>
                    </div>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center py-20 text-gray-400 animate-pulse font-bold tracking-widest uppercase text-sm">
                        Loading Concepts...
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ideas.map((idea) => (
                            <IdeaCard
                                key={idea.id}
                                idea={idea}
                                onConnect={(idea) => setSelectedIdea(idea)}
                            />
                        ))}
                        {ideas.length === 0 && (
                            <div className="col-span-full py-32 text-center text-gray-500 font-medium">
                                No ideas found matching your criteria. Be the first to <a href="/post-idea" className="text-primary-600 hover:underline font-bold">post one!</a>
                            </div>
                        )}
                    </div>
                )}

                {selectedIdea && (
                    <ConnectModal
                        idea={selectedIdea}
                        onClose={() => setSelectedIdea(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default IdeaFeed;
