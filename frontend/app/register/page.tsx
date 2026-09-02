"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Check,
  Code2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const benefits = [
  "Professional portfolio templates",
  "Easy project management",
  "Custom profile and social links",
  "Responsive public portfolio",
  "One-click publishing",
];

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Unable to create your account."
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
  }

  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#171717]">

      {/* HEADER */}
      <header className="border-b border-black/[0.06] bg-[#f7f5f1]">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">

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

              <p className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-black/40 sm:block">
                Portfolio Builder
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-black/40 sm:block">
              Already have an account?
            </span>

            <Link
              href="/login"
              className="rounded-full border border-black/[0.09] bg-white px-4 py-2 text-sm font-semibold text-[#171717] transition duration-200 hover:-translate-y-0.5 hover:border-black/15 hover:shadow-sm"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">

        <div className="grid items-start gap-20 lg:grid-cols-2 lg:gap-28">

          {/* LEFT CONTENT */}
          <div className="max-w-xl">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E41159]/15 bg-white px-3.5 py-2 text-xs font-medium text-black/55 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E41159]" />
              Start building today
            </div>

            <h1 className="text-[46px] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-[58px] lg:text-[64px]">
              Create a portfolio
              <span className="block text-[#E41159]">
                worth sharing.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-[16px] leading-7 text-black/50">
              Build a professional developer portfolio without
              worrying about complicated layouts or design tools.
              Create, customize, publish, and share your work.
            </p>

            {/* BENEFITS */}
            <div className="mt-10 space-y-4">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E41159]/10">
                    <Check
                      size={13}
                      strokeWidth={2.5}
                      className="text-[#E41159]"
                    />
                  </div>

                  <span className="text-sm font-medium text-black/60">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full max-w-md lg:ml-auto">

            <div className="mb-8">

              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E41159]">
                Get started
              </p>

              <h2 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-black/45">
                Set up your account and start creating your
                developer portfolio in minutes.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                {error}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[13px] font-semibold text-black/70"
                >
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sanket Jadhav"
                  className="h-12 w-full rounded-xl border border-black/[0.10] bg-white px-4 text-sm text-[#171717] outline-none transition duration-200 placeholder:text-black/25 hover:border-black/15 focus:border-[#E41159] focus:ring-4 focus:ring-[#E41159]/10"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[13px] font-semibold text-black/70"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-black/[0.10] bg-white px-4 text-sm text-[#171717] outline-none transition duration-200 placeholder:text-black/25 hover:border-black/15 focus:border-[#E41159] focus:ring-4 focus:ring-[#E41159]/10"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-[13px] font-semibold text-black/70"
                  >
                    Password
                  </label>

                  <span className="text-[11px] text-black/30">
                    8+ characters
                  </span>

                </div>

                <div className="relative">

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-black/[0.10] bg-white px-4 pr-12 text-sm text-[#171717] outline-none transition duration-200 placeholder:text-black/25 hover:border-black/15 focus:border-[#E41159] focus:ring-4 focus:ring-[#E41159]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-black/30 transition hover:bg-[#f7f5f1] hover:text-black/70"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#E41159] text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#d80f53] hover:shadow-[0_12px_30px_rgba(228,17,89,0.20)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* LOGIN */}
            <div className="mt-8 border-t border-black/[0.06] pt-7">
              <p className="text-center text-sm text-black/45">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#E41159] transition hover:text-[#b90e49]"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* TERMS */}
            <p className="mx-auto mt-6 max-w-sm text-center text-[11px] leading-5 text-black/30">
              By creating an account, you agree to our
              terms and acknowledge our privacy policy.
            </p>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#171717] text-white">
              <Code2 size={16} />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Devfolio
              </p>

              <p className="text-[10px] uppercase tracking-[0.16em] text-black/35">
                Portfolio Builder
              </p>
            </div>
          </Link>

          <p className="text-xs text-black/35">
            Build something worth sharing.
          </p>

        </div>
      </footer>

    </main>
  );
}