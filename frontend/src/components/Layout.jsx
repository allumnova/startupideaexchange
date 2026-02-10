import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItems = [
    { name: 'Console', path: '/dashboard', icon: '📊' },
    { name: 'Problems', path: '/problems', icon: '🧩' },
    { name: 'Store', path: '/store', icon: '🛒' },
    { name: 'My Desk', path: '/my-products', icon: '🛠️' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
];

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans flex overflow-hidden">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex w-72 flex-col glass-card m-4 border-r-0 h-[calc(100vh-2rem)] sticky top-4">
                <div className="p-8">
                    <div className="text-2xl font-black tracking-tighter text-indigo-600 mb-12">
                        ATO<span className="text-slate-200">.</span>
                    </div>

                    <nav className="space-y-2">
                        {NavItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                <span className="text-xl">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Settings integrated into main nav */}
                </div>

                <div className="mt-auto p-8 border-t border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-lg"></div>
                        <div>
                            <div className="text-sm font-bold">Alex Chen</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Founder</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto relative pb-24 lg:pb-0">
                <div className="max-w-6xl w-full mx-auto p-4 md:p-8">
                    {children}
                </div>
            </main>

            {/* Bottom Tab Bar - Mobile */}
            <nav className="lg:hidden fixed bottom-6 left-6 right-6 h-20 glass-card flex items-center justify-around px-4 z-50 border-white/50 shadow-2xl">
                {NavItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center gap-1 transition-all ${isActive ? 'text-indigo-600 scale-110' : 'text-slate-400'
                            }`
                        }
                    >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-[10px] font-black uppercase tracking-tighter">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Layout;
