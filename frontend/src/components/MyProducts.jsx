import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        problemId: ''
    });
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, probRes] = await Promise.all([
                    axios.get('/api/products'), // In a real app, this would be /api/products/my
                    axios.get('/api/problems')
                ]);
                setProducts(prodRes.data);
                setProblems(probRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/products', formData);
            alert('Product listed successfully!');
            setShowAddForm(false);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="animate-pulse space-y-8"><div className="h-64 bg-slate-50 rounded-[2rem]"></div></div>;

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">Builder Desk</h1>
                    <p className="text-slate-500 font-medium">Manage your listed MVPs and solution assets.</p>
                </div>
                <button onClick={() => setShowAddForm(true)} className="btn-primary">
                    List New MVP
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {products.map(p => (
                    <div key={p.id} className="glass-card p-8 bg-white ring-1 ring-slate-100 flex justify-between items-center group">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{p.name}</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price: ₹{p.price.toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded-xl bg-slate-50 text-slate-400 text-xs font-bold hover:bg-slate-100 transition-all border border-slate-100">Edit</button>
                            <button className="px-4 py-2 rounded-xl bg-red-50 text-red-400 text-xs font-bold hover:bg-red-100 transition-all border border-red-100">Delete</button>
                        </div>
                    </div>
                ))}
                {products.length === 0 && (
                    <div className="col-span-full p-20 text-center glass-card border-dashed">
                        <p className="text-slate-400 font-medium italic">No products listed. Start by solving a problem!</p>
                    </div>
                )}
            </div>

            {showAddForm && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                    <div className="max-w-lg w-full glass-card p-12 bg-white animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-black tracking-tight text-slate-900">List an MVP</h2>
                            <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-600 text-2xl font-light">×</button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">MVP Name</label>
                                <input required className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Problem it solves</label>
                                <select required className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold outline-none" value={formData.problemId} onChange={e => setFormData({ ...formData, problemId: e.target.value })}>
                                    <option value="">Select Problem</option>
                                    {problems.map(prob => <option key={prob.id} value={prob.id}>{prob.title}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Description</label>
                                <textarea required className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-medium outline-none" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Price (INR)</label>
                                <input required type="number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold outline-none" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                            <button type="submit" className="w-full btn-primary mt-4">Publish to Store</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProducts;
