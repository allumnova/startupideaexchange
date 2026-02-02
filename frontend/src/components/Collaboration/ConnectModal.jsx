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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="glass max-w-lg w-full p-8 rounded-[2.5rem] border-white/10 relative shadow-2xl animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>

                <h3 className="text-2xl font-bold mb-2">Connect with {idea.founder?.profile?.firstName || 'Founder'}</h3>
                <p className="text-slate-400 text-sm mb-8">
                    Pitch your background and why you are interested in <span className="text-white font-bold">{idea.title}</span>.
                </p>

                {status && (
                    <div className={`p-4 rounded-2xl mb-6 text-sm font-bold ${status.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {status.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Your Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all h-32 resize-none placeholder:text-slate-700"
                            placeholder="e.g. I have 5 years of experience in AI and would love to discuss the technical roadmap..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
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
