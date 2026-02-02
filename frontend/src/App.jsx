import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard';

const LandingPage = () => (
  <div className="min-h-screen mesh-gradient relative overflow-hidden">
    {/* Navigation */}
    <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto relative z-10">
      <div className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
        StartupIdeaExchange
      </div>
      <div className="flex items-center gap-6">
        <a href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Login</a>
        <a href="/signup">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 active:scale-95">
            Get Started
          </button>
        </a>
      </div>
    </nav>

    {/* Hero Section */}
    <main className="max-w-7xl mx-auto px-8 py-20 lg:py-32 relative z-10 text-center lg:text-left">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
            V1.0.0 Now Live
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            Pitch, Partner, and <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Scale Your Vision
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0">
            The premier marketplace for startup ideas. Find co-founders, validate Your
            concepts with AI, and secure the foundation of your next big venture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-white text-slate-950 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl active:scale-95">
              Explore Marketplace
            </button>
            <button className="glass px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all active:scale-95">
              Sell Your Service
            </button>
          </div>

          <div className="mt-16 flex items-center justify-center lg:justify-start gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="text-xs font-semibold">TRUSTED BY INNOVATORS AT</div>
            <div className="flex gap-6">
              <span className="font-bold">MICROSOFT</span>
              <span className="font-bold">GOOGLE</span>
              <span className="font-bold">AIRBNB</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-blue-500/20 rounded-[2rem] blur-3xl"></div>
          <div className="relative glass rounded-[2rem] p-8 aspect-square flex items-center justify-center overflow-hidden border-white/5">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-blue-500/50">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" /></svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Build Together</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">
                Matching you with people who share your passion and have the skills to execute.
              </p>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-blue-400/20 blur-sm"></div>
            <div className="absolute bottom-10 right-10 w-8 h-8 rounded-full bg-indigo-400/20 blur-md"></div>
          </div>
        </div>
      </div>
    </main>

    {/* Footer */}
    <footer className="border-t border-white/5 py-12 relative z-10 mt-20">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-slate-500 text-sm">© 2026 StartupIdeaExchange. All rights reserved.</p>
        <div className="flex gap-8 text-slate-500 text-sm">
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
