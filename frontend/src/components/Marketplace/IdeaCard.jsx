import React from 'react';

const IdeaCard = ({ idea, onConnect }) => {
    return (
        <div className="glass-card p-6 rounded-[2rem] flex flex-col h-full group relative overflow-hidden">
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary-50 border border-primary-100/50 text-primary-600 text-[10px] font-bold uppercase tracking-widest font-display shadow-sm">
                        {idea.category}
                    </span>
                    <span className="text-gray-400 text-xs font-medium font-sans">
                        {new Date(idea.createdAt).toLocaleDateString()}
                    </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 font-display tracking-tight">
                    {idea.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed font-sans">
                    {idea.description}
                </p>

                <div className="space-y-4 pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex justify-between items-center">
                        <a href={`/profile/${idea.founderId}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity group/profile">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                                {idea.founder?.profile?.firstName?.[0] || idea.founder?.email?.[0]}
                            </div>
                            <span className="text-xs text-gray-600 font-medium group-hover/profile:text-primary-600 transition-colors">
                                {idea.founder?.profile?.firstName} {idea.founder?.profile?.lastName}
                            </span>
                        </a>
                        <div className="text-right">
                            <div className="text-[10px] text-gray-400 uppercase tracking-tighter font-bold">Equity Offer</div>
                            <div className="text-sm font-bold text-emerald-500 font-display">{idea.equityOffer}%</div>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {idea.tags?.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[9px] bg-gray-50 border border-gray-100 px-2 py-0.5 rounded text-gray-500 uppercase font-bold tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm">
                            View Concept
                        </button>
                        <button
                            onClick={() => onConnect(idea)}
                            className="py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary-500/25 active:scale-95"
                        >
                            I'm Interested
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdeaCard;
