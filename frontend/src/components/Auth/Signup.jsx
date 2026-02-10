import React, { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('https://startupideaexcahnge.in/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess(true);
                setTimeout(() => window.location.href = '/login', 2000);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-slate-900 font-sans mesh-gradient flex items-center justify-center p-6">
            <div className="glass-card max-w-lg w-full p-10 rounded-[2rem] shadow-2xl shadow-primary-500/10">
                <h2 className="text-3xl font-bold mb-2 text-center text-gray-900 font-display tracking-tight">Join the Exchange</h2>
                <p className="text-gray-500 text-center mb-8 text-sm font-medium">Start your startup journey today</p>

                {error && <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-sm mb-6 text-center font-bold">{error}</div>}
                {success && <div className="bg-green-50 border border-green-100 text-green-600 p-3 rounded-xl text-sm mb-6 text-center font-bold">Registration successful! Redirecting...</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">First Name</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-medium placeholder:text-gray-400"
                                placeholder="John"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Last Name</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-medium placeholder:text-gray-400"
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-medium placeholder:text-gray-400"
                            placeholder="founder@startup.io"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-medium placeholder:text-gray-400"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary-500/25 active:scale-[0.98]">
                        Create Account
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-400 text-sm font-medium">
                    Already have an account? <a href="/login" className="text-primary-600 font-bold hover:text-primary-500 hover:underline">Sign in</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
