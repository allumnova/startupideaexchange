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
        <div className="min-h-screen bg-gray-50 text-slate-900 font-sans mesh-gradient flex items-center justify-center p-6">
            <div className="glass-card max-w-2xl w-full p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-primary-500/10">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
                    <div
                        className="h-full bg-primary-600 transition-all duration-500 shadow-sm"
                        style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                </div>

                <h2 className="text-3xl font-extrabold mb-2 text-gray-900 font-display tracking-tight">
                    Share Your Vision
                </h2>
                <p className="text-gray-400 text-sm mb-10 uppercase tracking-widest font-bold">Step {step} of 3</p>

                {message && <div className="bg-primary-50 border border-primary-100/50 text-primary-600 p-4 rounded-2xl mb-8 text-sm font-bold shadow-sm">{message}</div>}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Startup Name / Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all text-lg placeholder:text-gray-400 font-medium"
                                    placeholder="e.g. EcoSphere AI"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Pitch / Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all h-40 resize-none placeholder:text-gray-400 font-medium"
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
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all cursor-pointer appearance-none font-medium"
                                    >
                                        <option value="AI/ML">AI / Machine Learning</option>
                                        <option value="Fintech">Fintech</option>
                                        <option value="SaaS">SaaS</option>
                                        <option value="Healthtech">Healthtech</option>
                                        <option value="Edtech">Edtech</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Stage</label>
                                    <select
                                        value={formData.stage}
                                        onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all cursor-pointer appearance-none font-medium"
                                    >
                                        <option value="Concept">Concept / Idea</option>
                                        <option value="Research">Research Phase</option>
                                        <option value="MVP">MVP Developed</option>
                                        <option value="Scaling">Already Scaling</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Equity Offer ({formData.equityOffer}%)</label>
                                <input
                                    type="range"
                                    min="0" max="100" step="0.5"
                                    value={formData.equityOffer}
                                    onChange={(e) => setFormData({ ...formData, equityOffer: e.target.value })}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold px-1">
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
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all placeholder:text-gray-400 font-medium"
                                    placeholder="e.g. eco, automation, solar"
                                />
                            </div>
                            <div className="bg-primary-50 border border-primary-100 p-6 rounded-3xl">
                                <h4 className="text-primary-600 text-xs font-bold uppercase tracking-widest mb-2">Review Summary</h4>
                                <div className="text-sm text-gray-600 font-medium">
                                    You are posting <span className="text-gray-900 font-bold">{formData.title || "[No Title]"}</span> as a <span className="text-gray-900 font-bold">{formData.stage}</span> concept in <span className="text-gray-900 font-bold">{formData.category}</span>.
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between pt-8 border-t border-gray-100">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-8 py-3 rounded-xl font-bold text-gray-400 hover:text-gray-900 transition-colors"
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
                                    className="bg-gray-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10 active:scale-95"
                                >
                                    Next Step
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-primary-600 hover:bg-primary-500 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary-500/30 active:scale-95 flex items-center gap-2"
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
