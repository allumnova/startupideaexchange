import React from 'react';

const IdeaCard = ({ idea, onConnect }) => {
    return (
        <div className="glass p-6 rounded-[2rem] border-white/5 hover:border-blue-500/30 transition-all group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                    {idea.category}
                </span>
                <span className="text-slate-500 text-xs font-medium">
                    {new Date(idea.createdAt).toLocaleDateString()}
                </span>
            </div>

            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                {idea.title}
            </h3>

            <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow">
                {idea.description}
            </p>

            <div className="space-y-4 pt-4 border-t border-white/5 mt-auto">
                <div className="flex justify-between items-center">
                    <a href={`/profile/${idea.founderId}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold">
                            {idea.founder?.profile?.firstName?.[0] || idea.founder?.email?.[0]}
                        </div>
                        <span className="text-xs text-slate-300 font-medium">
                            {idea.founder?.profile?.firstName} {idea.founder?.profile?.lastName}
                        </span>
                    </a>
                    <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase tracking-tighter">Equity Offer</div>
                        <div className="text-sm font-bold text-green-400">{idea.equityOffer}%</div>
                    </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {idea.tags?.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-slate-400 uppercase font-bold">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest transition-all border border-white/5">
                        View Concept
                    </button>
                    <button
                        onClick={() => onConnect(idea)}
                        className="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        I'm Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IdeaCard;
