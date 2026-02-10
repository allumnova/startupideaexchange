import React, { useState } from 'react';

const ConnectModal = ({ idea, onClose }) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            const response = await fetch(`https://startupideaexcahnge.in/api/collab/ideas/${idea.id}/interest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ message }),
            });
            const data = await response.json();
            if (response.ok) {
                setStatus({ type: 'success', text: 'Connection request sent! Founder will be notified.' });
                setTimeout(onClose, 2500);
            } else {
                setStatus({ type: 'error', text: data.message || 'Failed to connect.' });
            }
        } catch (err) {
            setStatus({ type: 'error', text: 'Network error.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="glass-card max-w-lg w-full p-8 rounded-[2.5rem] shadow-2xl relative animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>

                <h3 className="text-2xl font-bold mb-2 text-gray-900 font-display tracking-tight">Connect with {idea.founder?.profile?.firstName || 'Founder'}</h3>
                <p className="text-gray-500 text-sm mb-8 font-medium">
                    Pitch your background and why you are interested in <span className="text-gray-900 font-bold">{idea.title}</span>.
                </p>

                {status && (
                    <div className={`p-4 rounded-2xl mb-6 text-sm font-bold ${status.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                        {status.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Your Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all h-32 resize-none placeholder:text-gray-400 font-medium"
                            placeholder="e.g. I have 5 years of experience in AI and would love to discuss the technical roadmap..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-500 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading ? 'Sending Request...' : 'Send Connection Request'}
                        {!loading && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConnectModal;
