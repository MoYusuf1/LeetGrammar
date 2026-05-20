/**
 * Auth Modal — sign in / sign up with OAuth and email/password.
 *
 * Uses Supabase Auth with Google and GitHub OAuth providers,
 * plus email/password fallback.
 */

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Github, Chrome, ArrowRight, Loader2 } from 'lucide-react';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  if (!isSupabaseConfigured) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-[#141414] border-[#ffffff10] text-[#eff1f6] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Auth Not Configured</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-[#8c8c8c]">
            Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  const handleOAuth = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await getSupabase().auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) setError(error.message);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === 'signup') {
        const { error } = await getSupabase().auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) {
          setError(error.message);
        } else {
          setMessage('Check your email for the confirmation link!');
        }
      } else {
        const { error } = await getSupabase().auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setError(error.message);
        } else {
          onOpenChange(false);
        }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((m) => (m === 'login' ? 'signup' : 'login'));
    setError(null);
    setMessage(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#141414] border-[#ffffff10] text-[#eff1f6] max-w-sm p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-5 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold">
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </DialogTitle>
          </div>
          <p className="text-xs text-[#8c8c8c] mt-1">
            {mode === 'login'
              ? 'Sign in to sync your progress across devices'
              : 'Start tracking your Somali grammar journey'}
          </p>
        </DialogHeader>

        <div className="p-5 space-y-4">
          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleOAuth('google')}
              disabled={loading}
              className="flex items-center justify-center gap-2 h-10 rounded-xl bg-[#1a1a1a] border border-[#ffffff10] text-sm text-[#c8c8c8] hover:bg-[#222222] hover:text-[#eff1f6] transition-colors disabled:opacity-50"
            >
              <Chrome size={16} />
              <span className="hidden sm:inline">Google</span>
            </button>
            <button
              onClick={() => handleOAuth('github')}
              disabled={loading}
              className="flex items-center justify-center gap-2 h-10 rounded-xl bg-[#1a1a1a] border border-[#ffffff10] text-sm text-[#c8c8c8] hover:bg-[#222222] hover:text-[#eff1f6] transition-colors disabled:opacity-50"
            >
              <Github size={16} />
              <span className="hidden sm:inline">GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#ffffff10]" />
            <span className="text-[10px] text-[#5c5c5c] uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-[#ffffff10]" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3">
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c5c5c]" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#0f0f0f] border border-[#ffffff10] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
              />
            </div>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c5c5c]" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full h-10 pl-9 pr-9 rounded-xl bg-[#0f0f0f] border border-[#ffffff10] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5c5c5c] hover:text-[#8c8c8c]"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            {error && (
              <div className="rounded-lg bg-[#ef4444]08 border border-[#ef4444]15 px-3 py-2">
                <p className="text-xs text-[#ef4444]">{error}</p>
              </div>
            )}

            {message && (
              <div className="rounded-lg bg-[#22c55e]08 border border-[#22c55e]15 px-3 py-2">
                <p className="text-xs text-[#22c55e]">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-[#ffa116] text-[#0f0f0f] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#ffb800] transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Toggle mode */}
          <p className="text-center text-xs text-[#8c8c8c]">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={toggleMode}
              className="text-[#ffa116] hover:underline font-medium"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
