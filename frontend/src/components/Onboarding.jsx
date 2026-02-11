import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Industries = ['AI/ML', 'GreenTech', 'Fintech', 'EdTech', 'Health', 'E-commerce', 'SaaS', 'Robotics'];
const Skills = ['React', 'Node.js', 'Python', 'UI/UX Design', 'Product Management', 'Sales', 'Marketing', 'Machine Learning'];
const Roles = [
    { id: 'Builder', title: 'Builder', desc: 'You build products and solutions.' },
    { id: 'Founder', title: 'Founder', desc: 'You have ideas and valid problems.' },
    { id: 'Buyer', title: 'Buyer', desc: 'You want to buy built MVPs/Products.' }
];

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        industries: [],
        skills: [],
        role: ''
    });
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    const toggleSelection = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter(i => i !== value)
                : [...prev[key], value]
        }));
    };

    const nextStep = () => setStep(prev => prev + 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/auth/profile', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await refreshUser(); // Update user state in context
            navigate('/dashboard');
        } catch (error) {
            console.error('Onboarding failed:', error);
            alert('Failed to complete setup. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-50 rounded-full blur-[120px] -ml-64 -mb-64"></div>

            <div className="max-w-xl w-full relative z-10 glass-card p-12">
                <div className="mb-12">
                    <div className="flex gap-2 mb-8">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-indigo-600' : 'bg-slate-100'
                                    }`}
                            ></div>
                        ))}
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">
                        {step === 1 && "What interests you?"}
                        {step === 2 && "What are your superpowers?"}
                        {step === 3 && "How would you like to grow?"}
                    </h2>
                    <p className="text-slate-500 font-medium">
                        {step === 1 && "Select the industries you want to follow and solve for."}
                        {step === 2 && "Help others find your expertise."}
                        {step === 3 && "Choose your primary role on ATO."}
                    </p>
                </div>

                {step === 1 && (
                    <div className="flex flex-wrap gap-3 mb-12">
                        {Industries.map(item => (
                            <button
                                key={item}
                                onClick={() => toggleSelection('industries', item)}
                                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border ${formData.industries.includes(item)
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}

                {step === 2 && (
                    <div className="flex flex-wrap gap-3 mb-12">
                        {Skills.map(item => (
                            <button
                                key={item}
                                onClick={() => toggleSelection('skills', item)}
                                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border ${formData.skills.includes(item)
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4 mb-12">
                        {Roles.map(role => (
                            <button
                                key={role.id}
                                onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
                                className={`w-full p-6 rounded-3xl text-left transition-all border-2 ${formData.role === role.id
                                    ? 'bg-indigo-50 border-indigo-600'
                                    : 'bg-white border-slate-50 hover:border-slate-100'
                                    }`}
                            >
                                <div className="font-black text-slate-900 mb-1">{role.title}</div>
                                <div className="text-sm font-medium text-slate-500">{role.desc}</div>
                            </button>
                        ))}
                    </div>
                )}

                <button
                    onClick={step === 3 ? handleSubmit : nextStep}
                    disabled={
                        loading ||
                        (step === 1 && formData.industries.length === 0) ||
                        (step === 2 && formData.skills.length === 0) ||
                        (step === 3 && !formData.role)
                    }
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                    ) : (
                        step === 3 ? "Complete Setup" : "Continue"
                    )}
                </button>
            </div>
        </div>
    );
};

export default Onboarding;
