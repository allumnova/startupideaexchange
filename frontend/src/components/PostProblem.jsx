import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostProblem = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'SaaS',
        tags: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/problems', formData);
            navigate('/problems');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12">
            <div className="glass-card p-12 bg-white">
                <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-8">What problem are you facing?</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Problem Title</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none"
                            placeholder="e.g. Broken alumni networking in small colleges"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Category</label>
                        <select
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 outline-none"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            {['AI/ML', 'GreenTech', 'Fintech', 'EdTech', 'Health', 'E-commerce', 'SaaS', 'Robotics'].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Deep Description</label>
                        <textarea
                            required
                            rows="6"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-medium text-slate-600 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none"
                            placeholder="Explain the pain point in detail..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full btn-primary">
                        Submit Problem
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostProblem;
