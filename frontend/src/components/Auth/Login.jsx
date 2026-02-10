import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('https://startupideaexcahnge.in/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                login(data.user, data.token);
                window.location.href = '/dashboard';
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-slate-900 font-sans mesh-gradient flex items-center justify-center p-6">
            <div className="glass-card max-w-md w-full p-10 rounded-[2rem] shadow-2xl shadow-primary-500/10">
                <h2 className="text-3xl font-bold mb-2 text-center text-gray-900 font-display tracking-tight">Welcome Back</h2>
                <p className="text-gray-500 text-center mb-8 text-sm font-medium">Log in to your founder account</p>

                {error && <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-sm mb-6 text-center font-bold">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-medium placeholder:text-gray-400"
                            placeholder="e.g. founder@startup.io"
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-medium placeholder:text-gray-400"
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <button className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary-500/25 active:scale-[0.98]">
                        Sign In
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 text-center">Quick Demo Access</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => { setEmail('demo.founder@exchange.com'); setPassword('password123'); }}
                            className="bg-white hover:bg-gray-50 border border-gray-200 py-3 rounded-xl text-xs font-bold text-gray-600 transition-all shadow-sm"
                        >
                            Demo Founder
                        </button>
                        <button
                            onClick={() => { setEmail('alex.chen@allumnova.com'); setPassword('password123'); }}
                            className="bg-white hover:bg-gray-50 border border-gray-200 py-3 rounded-xl text-xs font-bold text-gray-600 transition-all shadow-sm"
                        >
                            Demo Investor
                        </button>
                    </div>
                </div>

                <p className="mt-8 text-center text-gray-400 text-sm font-medium">
                    Don't have an account? <a href="/signup" className="text-primary-600 font-bold hover:text-primary-500 hover:underline">Create one</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
