import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProblemCard = ({ problem }) => {
    const navigate = useNavigate();
    const demandPercentage = Math.min(Math.max(problem.demandScore, 0), 100);

    return (
        <div
            onClick={() => navigate(`/problems/${problem.id}`)}
            className="glass-card p-8 cursor-pointer hover:scale-[1.02] transition-all bg-white group"
        >
            <div className="flex justify-between items-start mb-6">
                <span className="px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-100">
                    {problem.category}
                </span>
                <div className="flex -space-x-2">
                    {/* Mock avatars for now */}
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                            {String.fromCharCode(64 + i)}
                        </div>
                    ))}
                </div>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">
                {problem.title}
            </h3>
            <p className="text-slate-500 font-medium line-clamp-2 mb-8 leading-relaxed">
                {problem.description}
            </p>

            <div className="pt-6 border-t border-slate-50">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Demand Score</span>
                    <span className="text-sm font-black text-indigo-600">{demandPercentage}%</span>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000"
                        style={{ width: `${demandPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

const ProblemFeed = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('trending');

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const sort = filter === 'trending' ? 'demand' : 'newest';
                const res = await axios.get(`/api/problems?sort=${sort}`);
                setProblems(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProblems();
    }, [filter]);

    if (loading) return (
        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-slate-50 rounded-[2rem]"></div>)}
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Discover Problems</h1>
                    <p className="text-slate-500 font-medium">Valid issues from alumni waiting for solutions.</p>
                </div>

                <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 inline-flex">
                    <button
                        onClick={() => setFilter('trending')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'trending' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        Trending
                    </button>
                    <button
                        onClick={() => setFilter('newest')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'newest' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        Newest
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {problems.map(p => (
                    <ProblemCard key={p.id} problem={p} />
                ))}
            </div>
        </div>
    );
};

export default ProblemFeed;
