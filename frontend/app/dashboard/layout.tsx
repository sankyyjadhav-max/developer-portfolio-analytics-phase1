"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Code2,
  LayoutDashboard,
  FolderKanban,
  Palette,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Portfolio",
    href: "/dashboard/portfolio",
    icon: Code2,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    name: "Appearance",
    href: "/dashboard/appearance",
    icon: Palette,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [portfolioSlug, setPortfolioSlug] = useState<string | null>(null);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await fetch(`${API_URL}/api/portfolio`, {
          credentials: "include",
        });

        if (!response.ok) return;

        const result = await response.json();

        const portfolio = result?.data || result?.portfolio;

        if (portfolio) {
          setPortfolioSlug(portfolio.slug || null);
          setPublished(Boolean(portfolio.published));
        }
      } catch {
        // Ignore sidebar portfolio loading errors.
      }
    };

    loadPortfolio();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Continue to login even if logout request fails.
    }

    router.push("/login");
    router.refresh();
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const Sidebar = () => (
    <aside className="flex h-full w-[250px] flex-col border-r border-black/[0.07] bg-white">
      {/* BRAND */}
      <div className="px-5 pb-6 pt-6">
        <Link
          href="/"
          onClick={closeMobile}
          className="group flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#171717] text-white transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#292929]">
            <Code2 size={18} strokeWidth={2.3} />
          </div>

          <div>
            <p className="text-[15px] font-semibold tracking-[-0.02em]">
              Devfolio
            </p>

            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-black/40">
              Portfolio Builder
            </p>
          </div>
        </Link>
      </div>

      {/* NAVIGATION */}
      <div className="px-3">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition duration-200 ${
                  active
                    ? "bg-[#171717] text-white shadow-sm"
                    : "text-black/50 hover:bg-[#f7f5f1] hover:text-black"
                }`}
              >
                <Icon
                  size={17}
                  strokeWidth={active ? 2.2 : 1.9}
                  className={
                    active
                      ? "text-white"
                      : "text-black/40 group-hover:text-black"
                  }
                />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* PUBLIC PORTFOLIO */}
      <div className="mt-auto px-4 pb-4">
        {published && portfolioSlug ? (
          <Link
            href={`/p/${portfolioSlug}`}
            target="_blank"
            className="group mb-3 flex items-center justify-between rounded-2xl border border-[#E41159]/15 bg-[#E41159]/[0.045] p-3.5 transition duration-200 hover:border-[#E41159]/25 hover:bg-[#E41159]/[0.07]"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E41159]" />
                <p className="text-xs font-semibold text-black/70">
                  Live portfolio
                </p>
              </div>

              <p className="mt-1 truncate text-[11px] text-black/40">
                /p/{portfolioSlug}
              </p>
            </div>

            <ExternalLink
              size={15}
              className="shrink-0 text-black/35 transition group-hover:text-[#E41159]"
            />
          </Link>
        ) : (
          <div className="mb-3 rounded-2xl border border-black/[0.06] bg-[#f7f5f1] p-3.5">
            <p className="text-xs font-semibold text-black/60">
              Portfolio not published
            </p>

            <p className="mt-1 text-[11px] leading-4 text-black/35">
              Publish your portfolio to get a public link.
            </p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-black/45 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={17} strokeWidth={1.9} />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f7f5f1] text-[#171717]">
      {/* DESKTOP SIDEBAR */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <Sidebar />
      </div>

      {/* MOBILE HEADER */}
      <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-black/[0.07] bg-white px-5 lg:hidden">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#171717] text-white">
            <Code2 size={18} strokeWidth={2.3} />
          </div>

          <div>
            <p className="text-[15px] font-semibold tracking-[-0.02em]">
              Devfolio
            </p>

            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-black/35">
              Portfolio Builder
            </p>
          </div>
        </Link>

        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* MOBILE SIDEBAR */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
            onClick={closeMobile}
          />

          <div className="absolute inset-y-0 left-0">
            <div className="relative h-full">
              <button
                onClick={closeMobile}
                className="absolute right-4 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.07] bg-white"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>

              <Sidebar />
            </div>
          </div>
        </div>
      )}

      {/* PAGE CONTENT */}
      <main className="min-h-screen lg:ml-[250px]">
        <div className="mx-auto w-full max-w-[1500px] px-5 py-6 sm:px-7 lg:px-10 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}