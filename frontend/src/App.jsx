import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import ProblemFeed from './components/ProblemFeed';
import ProblemDetail from './components/ProblemDetail';
import PostProblem from './components/PostProblem';
import Storefront from './components/Storefront';
import ProductDetail from './components/ProductDetail';
import Settings from './components/Settings';
import MyProducts from './components/MyProducts';

const LandingPage = () => (
  <div className="min-h-screen bg-white text-slate-900 font-sans mesh-gradient relative overflow-hidden flex flex-col items-center justify-center p-8">
    <div className="max-w-4xl w-full text-center relative z-10">
      <span className="inline-block py-2 px-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black mb-8 tracking-widest uppercase border border-indigo-100 italic">
        The Problem-Solution Marketplace
      </span>
      <h1 className="text-6xl md:text-8xl font-black leading-tight mb-8 text-slate-900 tracking-tighter">
        Alumni <span className="text-indigo-600">To</span> Owner<span className="text-indigo-600">.</span>
      </h1>
      <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
        Stop chasing ideas. Start solving real problems. Discover validated demand, build with experts, or buy your next venture.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/signup" className="btn-primary">Get Started</a>
        <a href="/login" className="px-8 py-3 rounded-2xl font-bold bg-white border border-slate-100 hover:bg-slate-50 transition-all flex items-center justify-center">Sign In</a>
      </div>
    </div>
  </div>
);

const ProtectedRoute = ({ children, requireOnboarding = true }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );
  if (!user) return <Navigate to="/login" />;

  // Force onboarding if not completed
  if (requireOnboarding && !user.onboarded) {
    return <Navigate to="/onboarding" />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Onboarding Flow (Protected but doesn't require onboarding complete) */}
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute requireOnboarding={false}>
            <Onboarding />
          </ProtectedRoute>
        }
      />

      {/* Main App Routes with Layout */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/problems" element={<ProblemFeed />} />
                <Route path="/problems/:id" element={<ProblemDetail />} />
                <Route path="/post-problem" element={<PostProblem />} />
                <Route path="/store" element={<Storefront />} />
                <Route path="/store/:id" element={<ProductDetail />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/my-products" element={<MyProducts />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
