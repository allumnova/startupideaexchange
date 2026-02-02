import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const PostIdeaForm = () => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'AI/ML',
        stage: 'Concept',
        equityOffer: 10,
        tags: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://startupideaexcahnge.in/api/ideas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map(tag => tag.trim())
                }),
            });
            if (response.ok) {
                setMessage('Idea posted successfully! Redirecting to marketplace...');
                setTimeout(() => window.location.href = '/marketplace', 2000);
            } else {
                setMessage('Failed to post idea. Please try again.');
            }
        } catch (err) {
            setMessage('Network error.');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="min-h-screen mesh-gradient flex items-center justify-center p-6">
            <div className="glass max-w-2xl w-full p-10 rounded-[2.5rem] border-white/10 shadow-3xl relative overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                    <div
                        className="h-full bg-blue-500 transition-all duration-500 shadow-[0_0_10px_#3b82f6]"
                        style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                </div>

                <h2 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Share Your Vision
                </h2>
                <p className="text-slate-500 text-sm mb-10 uppercase tracking-widest font-bold">Step {step} of 3</p>

                {message && <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-4 rounded-2xl mb-8 text-sm font-medium">{message}</div>}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Startup Name / Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all text-lg placeholder:text-slate-600"
                                    placeholder="e.g. EcoSphere AI"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Pitch / Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all h-40 resize-none placeholder:text-slate-600"
                                    placeholder="Explain the problem, solution, and potential impact..."
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer appearance-none"
                                    >
                                        <option value="AI/ML" className="bg-slate-900">AI / Machine Learning</option>
                                        <option value="Fintech" className="bg-slate-900">Fintech</option>
                                        <option value="SaaS" className="bg-slate-900">SaaS</option>
                                        <option value="Healthtech" className="bg-slate-900">Healthtech</option>
                                        <option value="Edtech" className="bg-slate-900">Edtech</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Stage</label>
                                    <select
                                        value={formData.stage}
                                        onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer appearance-none"
                                    >
                                        <option value="Concept" className="bg-slate-900">Concept / Idea</option>
                                        <option value="Research" className="bg-slate-900">Research Phase</option>
                                        <option value="MVP" className="bg-slate-900">MVP Developed</option>
                                        <option value="Scaling" className="bg-slate-900">Already Scaling</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Equity Offer ({formData.equityOffer}%)</label>
                                <input
                                    type="range"
                                    min="0" max="100" step="0.5"
                                    value={formData.equityOffer}
                                    onChange={(e) => setFormData({ ...formData, equityOffer: e.target.value })}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-bold px-1">
                                    <span>0%</span>
                                    <span>50%</span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-600"
                                    placeholder="e.g. eco, automation, solar"
                                />
                            </div>
                            <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-3xl">
                                <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Review Summary</h4>
                                <div className="text-sm text-slate-300">
                                    You are posting <span className="text-white font-bold">{formData.title || "[No Title]"}</span> as a <span className="text-white font-bold">{formData.stage}</span> concept in <span className="text-white font-bold">{formData.category}</span>.
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between pt-8">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-8 py-3 rounded-xl font-bold text-slate-400 hover:text-white transition-colors"
                                disabled={loading}
                            >
                                Back
                            </button>
                        )}
                        <div className="ml-auto">
                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-white text-slate-950 px-10 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all shadow-xl active:scale-95"
                                >
                                    Next Step
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/40 active:scale-95 flex items-center gap-2"
                                    disabled={loading}
                                >
                                    {loading ? 'Posting...' : 'Launch Concept'}
                                    {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostIdeaForm;
