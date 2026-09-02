"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  LayoutDashboard,
  Palette,
  Rocket,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Simple portfolio builder",
    description:
      "Create and manage your developer portfolio from one clean workspace.",
  },
  {
    icon: Palette,
    title: "Make it yours",
    description:
      "Choose a template, customize your accent, and switch between light and dark mode.",
  },
  {
    icon: Rocket,
    title: "Publish instantly",
    description:
      "Get a unique public portfolio URL and share your work with anyone.",
  },
];

const benefits = [
  "Professional portfolio templates",
  "Project management",
  "Custom profile and social links",
  "Responsive public portfolio",
  "One-click publishing",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#171717]">
      {/* NAVBAR */}
      <header className="border-b border-black/[0.06] bg-[#f7f5f1]/95">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="group flex items-center gap-3">
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
            <Link
              href="/login"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-black/65 transition hover:bg-black/[0.04] hover:text-black sm:block"
            >
              Log in
            </Link>

            <Link
              href="/register"
              className="group flex items-center gap-2 rounded-full bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#2a2a2a]"
            >
              Get started
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-10 lg:pb-28 lg:pt-28">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E41159]/15 bg-white px-3.5 py-2 text-xs font-medium text-black/60 shadow-sm">
                <Sparkles size={14} className="text-[#E41159]" />
                Built for modern developers
              </div>

              <h1 className="max-w-4xl text-[48px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[62px] lg:text-[76px]">
                Your work deserves
                <span className="block text-[#E41159]">a better portfolio.</span>
              </h1>

              <p className="mt-7 max-w-xl text-[17px] leading-7 text-black/55">
                Build a polished developer portfolio without fighting with
                layouts, styling, or complicated tools. Create, customize,
                publish, and share.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#E41159] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(228,17,89,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d80f53]"
                >
                  Create your portfolio
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-sm"
                >
                  I already have an account
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  "Free to get started",
                  "Responsive",
                  "No design skills needed",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs font-medium text-black/45"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E41159]/10">
                      <Check size={10} className="text-[#E41159]" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* HERO PREVIEW */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-[#E41159]/[0.035] blur-2xl" />

              <div className="relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-[0_30px_80px_rgba(23,23,23,0.10)]">
                <div className="flex h-12 items-center gap-2 border-b border-black/[0.06] px-5">
                  <div className="h-2.5 w-2.5 rounded-full bg-black/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-black/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-black/10" />
                  <div className="ml-3 h-6 flex-1 rounded-md bg-[#f7f5f1]" />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-8 rounded-xl bg-[#171717]" />
                    <div className="flex gap-2">
                      <div className="h-7 w-14 rounded-full bg-black/[0.04]" />
                      <div className="h-7 w-14 rounded-full bg-black/[0.04]" />
                    </div>
                  </div>

                  <div className="mt-14 max-w-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E41159]">
                      Developer
                    </p>
                    <div className="mt-3 h-9 w-64 rounded-lg bg-[#171717]" />
                    <div className="mt-3 h-3 w-80 max-w-full rounded-full bg-black/[0.07]" />
                    <div className="mt-2 h-3 w-64 max-w-full rounded-full bg-black/[0.05]" />
                  </div>

                  <div className="mt-12 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-black/[0.06] p-4">
                      <div className="h-24 rounded-xl bg-[#f7f5f1]" />
                      <div className="mt-4 h-3 w-24 rounded-full bg-black/[0.08]" />
                      <div className="mt-2 h-2.5 w-32 rounded-full bg-black/[0.05]" />
                    </div>

                    <div className="rounded-2xl border border-black/[0.06] p-4">
                      <div className="h-24 rounded-xl bg-[#f7f5f1]" />
                      <div className="mt-4 h-3 w-28 rounded-full bg-black/[0.08]" />
                      <div className="mt-2 h-2.5 w-24 rounded-full bg-black/[0.05]" />
                    </div>
                  </div>

                  <div className="mt-6 h-2 w-36 rounded-full bg-[#E41159]/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE INTRO */}
      <section className="border-y border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E41159]">
              Everything in one place
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Less time designing.
              <br />
              More time building.
            </h2>

            <p className="mt-5 text-base leading-7 text-black/50">
              Devfolio gives you the tools to turn your work into a portfolio
              that actually feels like you.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-[24px] border border-black/[0.07] bg-[#fdfcf9] p-7 transition duration-300 hover:-translate-y-1 hover:border-black/10 hover:shadow-[0_18px_45px_rgba(23,23,23,0.06)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#171717] text-white transition duration-300 group-hover:bg-[#E41159]">
                    <Icon size={19} />
                  </div>

                  <h3 className="mt-7 text-lg font-semibold tracking-[-0.025em]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-black/50">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-[#f7f5f1]">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E41159]">
              Designed for you
            </p>

            <h2 className="mt-4 max-w-lg text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Everything you need to present your work professionally.
            </h2>
          </div>

          <div className="rounded-[28px] border border-black/[0.07] bg-white p-7 sm:p-9">
            <div className="space-y-5">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-4 border-b border-black/[0.06] pb-5 last:border-0 last:pb-0"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E41159]/10">
                    <Check size={14} className="text-[#E41159]" />
                  </div>

                  <span className="text-sm font-medium text-black/70">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#171717] px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E954A2]">
              Start building
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Your next opportunity starts with a great portfolio.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-white/55">
              Build your developer portfolio, showcase your projects, and
              share your work with a professional public link.
            </p>

            <Link
              href="/register"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#E41159] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#f01a63]"
            >
              Create your portfolio
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#171717] text-white">
              <Code2 size={16} />
            </div>

            <div>
              <p className="text-sm font-semibold">Devfolio</p>
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