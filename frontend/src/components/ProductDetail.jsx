import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="animate-pulse p-12"><div className="h-96 bg-slate-50 rounded-[2rem]"></div></div>;
    if (!product) return <div>Product not found.</div>;

    return (
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-8">
                <div className="glass-card p-12 bg-white ring-1 ring-slate-100">
                    <button onClick={() => navigate('/store')} className="text-slate-400 font-bold text-xs mb-8 hover:text-slate-600 flex items-center gap-2">
                        ← Back to Store
                    </button>

                    <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-6">{product.name}</h1>
                    <div className="flex gap-4 mb-10">
                        <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">Built Solution</span>
                        <span className="px-4 py-1.5 rounded-full bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest line-clamp-1 max-w-[200px]">Problem: {product.problem?.title}</span>
                    </div>

                    <p className="text-lg text-slate-600 font-medium leading-relaxed mb-12">
                        {product.description}
                    </p>

                    <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 italic font-medium text-slate-500">
                        "Solving the core inefficiency of {product.problem?.title.toLowerCase()} with a production-ready MVP."
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
                <div className="glass-card p-10 bg-white ring-1 ring-slate-100 sticky top-12">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Investment Required</div>
                    <div className="text-6xl font-black text-slate-900 mb-8 tracking-tighter">₹{product.price.toLocaleString()}</div>

                    <button
                        onClick={async () => {
                            try {
                                await axios.post('/api/transactions/buy', { productId: product.id });
                                alert('Purchase successful! You now have access to the MVP.');
                                navigate('/dashboard');
                            } catch (err) {
                                alert('Purchase failed. Please try again.');
                            }
                        }}
                        className="w-full btn-primary py-5 text-lg mb-4"
                    >
                        1-Click Buy MVP
                    </button>
                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-300">Escrow Protected Transaction</p>

                    <div className="mt-12 pt-8 border-t border-slate-50">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold">
                                {product.seller.profile?.firstName?.charAt(0)}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">{product.seller.profile?.firstName} (Seller)</div>
                                <div className="text-[10px] font-medium text-slate-400">Verified Alumni Builder</div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed italic">{product.seller.profile?.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
