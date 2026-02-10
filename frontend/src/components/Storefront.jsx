import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Storefront = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/api/products');
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div className="animate-pulse grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => <div key={i} className="h-80 bg-slate-50 rounded-[2rem]"></div>)}
    </div>;

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">MVP Store<span className="text-indigo-600">.</span></h1>
                    <p className="text-slate-500 font-medium">Acquire built solutions and accelerate your growth.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {products.map(product => (
                    <div
                        key={product.id}
                        onClick={() => navigate(`/store/${product.id}`)}
                        className="glass-card p-8 bg-white ring-1 ring-slate-100 group cursor-pointer hover:scale-[1.02] transition-all"
                    >
                        <div className="aspect-video w-full bg-slate-50 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                            <div className="text-4xl">🚀</div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent"></div>
                        </div>

                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{product.problem?.title?.slice(0, 30)}...</div>
                        <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                        <p className="text-sm font-medium text-slate-500 line-clamp-2 mb-6">{product.description}</p>

                        <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                            <div className="text-2xl font-black text-slate-900 mx-0">₹{product.price.toLocaleString()}</div>
                            <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700">View Info</button>
                        </div>
                    </div>
                ))}

                {products.length === 0 && (
                    <div className="col-span-full p-20 text-center glass-card border-dashed">
                        <p className="text-slate-400 font-medium">No products listed in the store yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Storefront;
