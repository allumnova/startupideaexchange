import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Settings = () => {
    const { user, login } = useAuth();
    const [formData, setFormData] = useState({
        firstName: user?.profile?.firstName || '',
        lastName: user?.profile?.lastName || '',
        bio: user?.profile?.bio || '',
        skills: user?.skills?.join(', ') || '',
        industries: user?.industries?.join(', ') || ''
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            // API call to update profile
            const res = await axios.put('/api/auth/profile', {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim()),
                industries: formData.industries.split(',').map(i => i.trim())
            });
            alert('Profile updated successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-12 py-8">
            <div>
                <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">Account Settings</h1>
                <p className="text-slate-500 font-medium">Manage your public presence on ATO.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="glass-card p-10 bg-white ring-1 ring-slate-100 space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">First Name</label>
                            <input
                                type="text"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-100"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Last Name</label>
                            <input
                                type="text"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-100"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Professional Bio</label>
                        <textarea
                            rows="4"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-100"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        ></textarea>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Skills (Comma separated)</label>
                        <input
                            type="text"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-100"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full btn-primary"
                >
                    {saving ? 'Saving Changes...' : 'Save Profile'}
                </button>
            </form>
        </div>
    );
};

export default Settings;
