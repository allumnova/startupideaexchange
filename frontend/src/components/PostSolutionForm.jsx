import React, { useState } from 'react';
import axios from 'axios';

const PostSolutionForm = ({ problemId, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        type: 'IDEA',
        description: '',
        links: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/problems/solution', { ...formData, problemId });
            onSuccess();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <div className="max-w-lg w-full glass-card p-12 bg-white translate-y-[-10%] animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-black tracking-tight text-slate-900">Post Solution</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl font-light">×</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Solution Type</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['IDEA', 'SERVICE', 'PRODUCT'].map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: t })}
                                    className={`py-3 rounded-2xl text-[10px] font-black transition-all border ${formData.type === t
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                            : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Describe your logic</label>
                        <textarea
                            required
                            rows="4"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-medium text-slate-600 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none"
                            placeholder="How do you plan to solve this?"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full btn-primary">
                        Submit Solution
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostSolutionForm;
