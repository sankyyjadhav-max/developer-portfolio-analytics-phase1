"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Code2,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Invalid email or password."
        );
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#171717]">
      {/* HEADER */}
      <header className="border-b border-black/[0.06] bg-[#f7f5f1]/95">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* BRAND */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#171717] text-white transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#292929]">
              <Code2 size={18} strokeWidth={2.3} />
            </div>

            <div>
              <p className="text-[15px] font-semibold tracking-[-0.02em]">
                Devfolio
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-black/40">
                Portfolio Builder
              </p>
            </div>
          </Link>

          {/* HEADER CTA */}
          <div className="text-sm text-black/45">
            <span className="hidden sm:inline">
              Don't have an account?{" "}
            </span>

            <Link
              href="/register"
              className="font-semibold text-[#E41159] transition hover:text-[#c90d4b]"
            >
              Create one
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <section className="relative flex min-h-[calc(100vh-76px)] items-center overflow-hidden px-6 py-14 lg:px-10">
        {/* SUBTLE BACKGROUND DETAILS */}
        <div className="pointer-events-none absolute left-1/2 top-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#E41159]/[0.025] blur-3xl" />

        <div className="pointer-events-none absolute left-[8%] top-[20%] hidden h-2 w-2 rounded-full bg-[#E41159]/30 lg:block" />

        <div className="pointer-events-none absolute right-[12%] bottom-[20%] hidden h-1.5 w-1.5 rounded-full bg-black/15 lg:block" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1fr_460px]">
          {/* LEFT SIDE */}
          <div className="hidden lg:block">
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3.5 py-2 text-[11px] font-semibold text-black/50 shadow-sm">
                <Sparkles
                  size={13}
                  className="text-[#E41159]"
                />
                Welcome back
              </div>

              <h1 className="text-[64px] font-semibold leading-[0.98] tracking-[-0.06em]">
                Keep building
                <span className="block text-[#E41159]">
                  something great.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-[16px] leading-7 text-black/45">
                Your portfolio is your digital first impression.
                Keep your projects, profile, and personal brand
                ready for the next opportunity.
              </p>

              <div className="mt-9 space-y-4">
                {[
                  "Manage your portfolio in one place",
                  "Showcase your best projects",
                  "Publish and share your work instantly",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-black/55"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E41159]/10">
                      <Check
                        size={13}
                        className="text-[#E41159]"
                        strokeWidth={2.5}
                      />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LOGIN COLUMN */}
          <div className="w-full">
            {/* MOBILE INTRO */}
            <div className="mb-8 text-center lg:hidden">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#171717] text-white shadow-sm">
                <Code2 size={22} strokeWidth={2.2} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E41159]">
                Welcome back
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
                Sign in to Devfolio
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/45">
                Continue building and managing your developer
                portfolio.
              </p>
            </div>

            {/* LOGIN CARD */}
            <div className="rounded-[28px] border border-black/[0.07] bg-white p-6 shadow-[0_25px_70px_rgba(23,23,23,0.07)] sm:p-8">
              <div className="hidden lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E41159]">
                  Account
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                  Sign in
                </h2>

                <p className="mt-2 text-sm leading-6 text-black/40">
                  Access your portfolio workspace.
                </p>
              </div>

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold text-black/65"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-[50px] w-full rounded-xl border border-black/[0.09] bg-[#fdfcf9] px-4 text-sm text-black outline-none transition duration-200 placeholder:text-black/25 focus:border-[#E41159]/40 focus:bg-white focus:ring-4 focus:ring-[#E41159]/[0.06]"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold text-black/65"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-[#E41159] transition hover:text-[#c90d4b] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="h-[50px] w-full rounded-xl border border-black/[0.09] bg-[#fdfcf9] px-4 pr-12 text-sm text-black outline-none transition duration-200 placeholder:text-black/25 focus:border-[#E41159]/40 focus:bg-white focus:ring-4 focus:ring-[#E41159]/[0.06]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-black/30 transition hover:bg-black/[0.04] hover:text-black/60"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#171717] text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#292929] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* REGISTER */}
              <div className="mt-7 border-t border-black/[0.06] pt-6 text-center">
                <p className="text-sm text-black/40">
                  New to Devfolio?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-black transition hover:text-[#E41159]"
                  >
                    Create your portfolio
                  </Link>
                </p>
              </div>
            </div>

            {/* BACK LINK */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-xs font-medium text-black/35 transition hover:text-black/60"
              >
                ← Back to Devfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-5">
          <p className="text-[11px] text-black/30">
            © {new Date().getFullYear()} Devfolio. Built for
            developers.
          </p>
        </div>
      </footer>
    </main>
  );
}