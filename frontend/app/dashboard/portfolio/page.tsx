"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Save,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Portfolio = {
  id: string;
  slug: string;
  published: boolean;
  fullName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  introduction: string;
  about: string;
  template: string;
  accent: string;
  darkMode: boolean;
};

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function loadPortfolio() {
    try {
      const response = await fetch(`${API_URL}/api/portfolio`, {
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setPortfolio(result?.data || result?.portfolio);
      }
    } finally {
      setLoading(false);
    }
  }

  async function savePortfolio() {
    if (!portfolio) return;

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/portfolio`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolio),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Unable to save portfolio");
      }

      setPortfolio(result?.data || result?.portfolio || portfolio);
      setMessage("Changes saved");
    } catch (error: any) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish() {
    if (!portfolio) return;

    const endpoint = portfolio.published
      ? "/api/portfolio/unpublish"
      : "/api/portfolio/publish";

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      setPortfolio((current) =>
        current
          ? {
              ...current,
              published: !current.published,
            }
          : current
      );
    } else {
      setMessage(result?.message || "Unable to update publishing status");
    }
  }

  function update(field: keyof Portfolio, value: any) {
    setPortfolio((current) =>
      current
        ? {
            ...current,
            [field]: value,
          }
        : current
    );
  }

  function publicUrl() {
    if (typeof window === "undefined" || !portfolio) return "";
    return `${window.location.origin}/p/${portfolio.slug}`;
  }

  async function copyLink() {
    if (!portfolio) return;

    await navigator.clipboard.writeText(publicUrl());
    setCopied(true);

    setTimeout(() => setCopied(false), 1800);
  }

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="h-10 w-56 animate-pulse rounded-xl bg-black/5" />
        <div className="h-[500px] animate-pulse rounded-3xl bg-white" />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="rounded-3xl border border-black/10 bg-white p-10 text-center">
        <h2 className="text-xl font-semibold">Portfolio not found</h2>
        <p className="mt-2 text-sm text-black/45">
          Create your portfolio to start building your public profile.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-[#e41159]">
            Portfolio
          </p>

          <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Your portfolio
          </h1>

          <p className="mt-2 text-sm text-black/45">
            Keep your profile clear, focused and unmistakably yours.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {portfolio.published && (
            <Link
              href={`/p/${portfolio.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium transition hover:border-black/20"
            >
              <ExternalLink size={16} />
              View live
            </Link>
          )}

          <button
            onClick={togglePublish}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              portfolio.published
                ? "border border-black/10 bg-white hover:bg-[#f8f6f2]"
                : "bg-[#e41159] text-white hover:bg-[#cf0f50]"
            }`}
          >
            {portfolio.published ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>

      {portfolio.published && (
        <div className="mb-6 flex flex-col justify-between gap-3 rounded-2xl border border-[#d8eadf] bg-[#f1faf4] p-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d9f0e0]">
              <Globe size={17} className="text-[#277344]" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#277344]">
                Your portfolio is live
              </p>

              <p className="truncate text-sm text-black/50">
                {publicUrl()}
              </p>
            </div>
          </div>

          <button
            onClick={copyLink}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-3.5 py-2 text-sm font-medium shadow-sm"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
          <div className="mb-8 border-b border-black/8 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/30">
              Profile
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              Personal information
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Full name"
              value={portfolio.fullName || ""}
              onChange={(value) => update("fullName", value)}
              placeholder="Your name"
            />

            <Field
              label="Professional title"
              value={portfolio.title || ""}
              onChange={(value) => update("title", value)}
              placeholder="AI/ML Developer"
            />

            <Field
              label="Location"
              value={portfolio.location || ""}
              onChange={(value) => update("location", value)}
              placeholder="Bengaluru, India"
            />

            <Field
              label="Email"
              value={portfolio.email || ""}
              onChange={(value) => update("email", value)}
              placeholder="you@example.com"
            />

            <Field
              label="Phone"
              value={portfolio.phone || ""}
              onChange={(value) => update("phone", value)}
              placeholder="+91..."
            />

            <Field
              label="Portfolio slug"
              value={portfolio.slug || ""}
              onChange={(value) => update("slug", value)}
              placeholder="your-name"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Introduction
            </label>

            <textarea
              value={portfolio.introduction || ""}
              onChange={(e) => update("introduction", e.target.value)}
              rows={4}
              placeholder="A short introduction about yourself..."
              className="w-full resize-none rounded-2xl border border-black/10 bg-[#faf9f7] px-4 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-[#e41159] focus:bg-white focus:ring-4 focus:ring-[#e41159]/8"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              About
            </label>

            <textarea
              value={portfolio.about || ""}
              onChange={(e) => update("about", e.target.value)}
              rows={7}
              placeholder="Tell people more about your experience, interests and work..."
              className="w-full resize-none rounded-2xl border border-black/10 bg-[#faf9f7] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-black/25 focus:border-[#e41159] focus:bg-white focus:ring-4 focus:ring-[#e41159]/8"
            />
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-black/8 pt-6">
            <span className="text-sm text-black/45">
              {message}
            </span>

            <button
              onClick={savePortfolio}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#252321] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </section>

        <aside className="h-fit space-y-5">
          <div className="rounded-3xl bg-[#252321] p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
              Public URL
            </p>

            <h3 className="mt-3 font-semibold">Your portfolio address</h3>

            <div className="mt-4 rounded-xl bg-white/8 px-3 py-3 text-xs text-white/55">
              /p/{portfolio.slug}
            </div>

            <button
              onClick={copyLink}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#252321]"
            >
              <Copy size={15} />
              Copy link
            </button>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/30">
              Publishing
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm">Public visibility</span>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  portfolio.published
                    ? "bg-[#e3f4e8] text-[#287243]"
                    : "bg-black/5 text-black/40"
                }`}
              >
                {portfolio.published ? "Published" : "Draft"}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-black/40">
              Publishing makes your portfolio accessible through its public
              link.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-[#faf9f7] px-4 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-[#e41159] focus:bg-white focus:ring-4 focus:ring-[#e41159]/8"
      />
    </div>
  );
}