"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/dashboard/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed");
      }
      const dest = searchParams.get("from") || "/dashboard/posts";
      router.push(dest);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-2 text-center">
          Practice Dashboard
        </p>
        <h1 className="font-display text-3xl text-white font-bold text-center mb-8">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-[#122040] p-8 border border-white/10">
          <div>
            <label htmlFor="password" className="block text-xs text-slate-300 mb-2">
              Dashboard Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/20 bg-[#0A1628] text-white px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-2.5 bg-[#C9A84C] text-[#0A1628] text-sm font-semibold rounded-sm hover:bg-[#E8C97A] transition-colors disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function DashboardLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
