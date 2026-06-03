"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: wire up auth
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <main className="min-h-screen bg-parchment dark:bg-[#1c1814] flex items-center justify-center px-4 py-16 relative">

      {/* Background decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-saffron/10 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-saffron/8 blur-[100px]" />
        {/* cross pattern overlay */}
        <div className="absolute inset-0 cross-pattern opacity-40" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <motion.div
          className="flex flex-col items-center mb-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/"
            className="absolute top-6 left-6 flex items-center gap-1.5 font-body text-sm text-charcoal-muted dark:text-white/50 hover:text-charcoal dark:hover:text-white transition-colors no-underline"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>
          <Link href="/" className="flex items-center gap-3 no-underline mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-saffron-deep text-xl text-white shadow-lg shadow-saffron/30">
              <span aria-hidden>📖</span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl font-bold text-charcoal">HLAD</div>
              <div className="font-hindi text-xs text-saffron">हिंदी साहित्य</div>
            </div>
          </Link>
          <h1 className="font-display text-2xl font-bold text-charcoal dark:text-white/90">Welcome back</h1>
          <p className="font-body text-sm text-charcoal-muted mt-1">Sign in to your account</p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="rounded-3xl border border-white/70 dark:border-white/10 bg-white/80 dark:bg-[#2a221c]/80 backdrop-blur-xl shadow-[0_16px_60px_rgba(42,34,28,0.10)] p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-sm font-medium text-charcoal" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-charcoal/15 dark:border-white/10 bg-parchment/60 dark:bg-white/5 px-4 py-3 font-body text-sm text-charcoal dark:text-white/90 placeholder:text-charcoal-muted/60 outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-body text-sm font-medium text-charcoal" htmlFor="password">
                  Password
                </label>
                <Link href="/forgot-password" className="font-body text-xs text-saffron hover:text-saffron-deep transition-colors no-underline">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-charcoal/15 dark:border-white/10 bg-parchment/60 dark:bg-white/5 px-4 py-3 font-body text-sm text-charcoal dark:text-white/90 placeholder:text-charcoal-muted/60 outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-xl bg-gradient-to-r from-saffron to-saffron-deep py-3 font-body text-sm font-semibold text-white shadow-lg shadow-saffron/30 transition-shadow hover:shadow-xl hover:shadow-saffron/40 disabled:opacity-70"
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </motion.button>

          </form>
          {/* Divider */}
{/*
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-charcoal/10" />
            <span className="font-body text-xs text-charcoal-muted">या / or</span>
            <div className="h-px flex-1 bg-charcoal/10" />
          </div>

          * Google *
          <motion.button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-charcoal/15 dark:border-white/10 bg-white dark:bg-white/5 py-3 font-body text-sm font-medium text-charcoal dark:text-white/80 shadow-sm hover:border-charcoal/25 transition-all"
            whileTap={{ scale: 0.98 }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </motion.button>
          */}
        </motion.div>

        {/* Register link */}
        <motion.p
          className="mt-6 text-center font-body text-sm text-charcoal-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-saffron hover:text-saffron-deep transition-colors no-underline">
            Create one
          </Link>
        </motion.p>

      </div>
    </main>
  );
}
