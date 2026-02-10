import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostSolutionForm from './PostSolutionForm';

const ProblemDetail = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSolutionForm, setShowSolutionForm] = useState(false);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const res = await axios.get(`/api/problems/${id}`);
                setProblem(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProblem();
    }, [id]);

    if (loading) return <div className="animate-pulse space-y-8"><div className="h-64 bg-slate-50 rounded-[2rem]"></div></div>;
    if (!problem) return <div>Problem not found.</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="glass-card p-12 bg-white ring-1 ring-slate-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-black">
                        {problem.title.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900">{problem.title}</h1>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{problem.category}</p>
                    </div>
                </div>

                <p className="text-xl text-slate-600 font-medium leading-relaxed mb-12">
                    {problem.description}
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-black text-indigo-600">{problem.demandScore}</div>
                            <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Demand</div>
                        </div>
                        <div className="h-8 w-px bg-slate-100 mx-4"></div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-slate-900">{problem.solutions.length}</div>
                            <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Solutions</div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowSolutionForm(true)}
                        className="btn-primary"
                    >
                        Post a Solution
                    </button>
                </div>
            </div>

            {showSolutionForm && (
                <PostSolutionForm
                    problemId={id}
                    onClose={() => setShowSolutionForm(false)}
                    onSuccess={() => {
                        setShowSolutionForm(false);
                        window.location.reload(); // Quick refresh
                    }}
                />
            )}

            <div className="space-y-6">
                <h2 className="text-2xl font-black tracking-tight text-slate-900">Community Solutions</h2>
                <div className="grid gap-6">
                    {problem.solutions.length === 0 ? (
                        <div className="p-12 text-center glass-card border-dashed">
                            <p className="text-slate-400 font-medium">No solutions yet. Be the first to build one!</p>
                        </div>
                    ) : (
                        problem.solutions.map(sol => (
                            <div key={sol.id} className="glass-card p-8 bg-white border border-slate-50">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">
                                            {sol.author.profile?.firstName?.charAt(0) || 'U'}
                                        </div>
                                        <span className="text-sm font-bold text-slate-900">{sol.author.profile?.firstName || 'User'}</span>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                                        {sol.type}
                                    </span>
                                </div>
                                <p className="text-slate-600 font-medium leading-relaxed">{sol.description}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProblemDetail;
