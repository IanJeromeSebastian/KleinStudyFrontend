/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import toast from 'react-hot-toast';
import BookStudyIcon from '../../assets/BookStudy.png';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, user } = await authService.login(email, password);
      login(user, token);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.log("error", error.message);
      setError(error.message || 'Failed to login. Check your credentials.');
      toast.error(error.message || 'Failed to login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='absolute inset-0 bg-[radial-gradient(#e5e7eb_1px, transparent_1px)] bg-size-[16px_16px] opacity-30' />
      <div className='relative w-full max-w-md px-6'>
        <div className='bg-[#faf4f1] backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-10'>
          <div className='text-center mb-10'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-[#ffd700] to-[#ffae00] shadow-lg shadow-[#ffd700]/30 mb-6'>
              <img src={BookStudyIcon} alt="Book Study Icon" className="mx-auto h-16 w-16" />
            </div>
            <h1 className='text-2xl font-medium text-slate-900 tracking-tight mb-2'>
              Welcome back
            </h1>
            <p className='text-slate-500 text-sm'>
              Sign in to continue your study
            </p>
          </div>

          <div className='space-y-5'>
            <div className='space-y-2'>
              <label className='block text-xs font-semibold text-slate-700 uppercase tracking-wide'>
                Email
              </label>
              <div className='relative group'>
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200
                  ${focusedField === 'email' ? 'text-[#ffd700]' : 'text-slate-400'}`}>
                  <Mail className='h-5 w-5' strokeWidth={2} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className='w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-[#e4dcd7]/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus-border-[#ffd700] focus:bg-[#faf4f1] focus:shadow-lg focus:shadow-[#ffd700]/50'
                  placeholder='Email' />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='block text-xs font-semibold text-slate-700 uppercase tracking-wide'>
                Password
              </label>
              <div className='relative group'>
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10 transition-colors duration-200
                  ${focusedField === 'password' ? 'text-[#ffd700]' : 'text-slate-400'}`}>
                  <Lock className='h-5 w-5' strokeWidth={2} />
                </div>
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200
                  ${focusedField === 'password' ? 'text-[#ffd700]' : 'text-slate-400'}`}>
                  <Lock className='h-5 w-5' strokeWidth={2} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className='w-full h-12 pl-12 pr-12 border-2 border-slate-200 rounded-xl bg-[#e4dcd7]/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus-border-[#ffd700] focus:bg-[#faf4f1] focus:shadow-lg focus:shadow-[#ffd700]/50'
                  placeholder='********' />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-[#ffae00] transition-colors duration-200 z-10"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" strokeWidth={2} />
                  ) : (
                    <Eye className="h-5 w-5" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className='rounded-lg bg-red-50 border border-red-200 p-3'>
                <p className='text-xs text-red-600 font-medium text-center'>{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className='group relative w-full h-12 bg-linear-to-br from-[#ffd700] to-[#ffae00] hover:from-[#ffd700] hover:to-[#ffae00] active:scale-[0.98] text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#ffae00]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:active-scale-100 shadow-lg shadow-[#ffae00]/50 overflow-hidden'>
              <span className='relative z-10 flex items-center justify-center gap-2'>
                {loading ? (
                  <>
                    <div className='w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin'>
                      Signing in...
                    </div>
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-200' strokeWidth={2.5} />
                  </>
                )}
              </span>
              <div className='absolute inset-0 bg-linear-to-r from-black/0 via-black/20 to-black/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700' />
            </button>
          </div>

          <div className='mt-8 pt-6 border-t border-slate-200/60'>
            <p className='text-center text-sm text-slate-600'>
              Don't have an account?{' '}
              <Link to='/register' className='font-semibold text-[#ffae00] hover:text-[#ffae00] transition-colors duration-200'>Sign up</Link>
            </p>
          </div>
        </div>

        <p className='text-center text-xs text-slate-400 mt-6'>
          By continuing, you agree to our Terms & Policy
        </p>

      </div>
    </div>
  )
}

export default LoginPage
