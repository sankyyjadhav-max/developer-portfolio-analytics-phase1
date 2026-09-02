"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  FolderKanban,
  Globe2,
  Palette,
  Pencil,
  Plus,
  Rocket,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Project = {
  id: string;
  title: string;
  description: string;
  technologies?: string[];
  featured?: boolean;
};

type Portfolio = {
  id: string;
  slug: string;
  published: boolean;
  fullName?: string | null;
  title?: string | null;
  introduction?: string | null;
  template?: string | null;
  accent?: string | null;
  darkMode?: boolean;
};

export default function DashboardOverview() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [portfolioResponse, projectsResponse] =
          await Promise.all([
            fetch(`${API_URL}/api/portfolio`, {
              credentials: "include",
            }),
            fetch(`${API_URL}/api/projects`, {
              credentials: "include",
            }),
          ]);

        if (portfolioResponse.ok) {
          const portfolioData = await portfolioResponse.json();

          setPortfolio(
            portfolioData?.data ||
              portfolioData?.portfolio ||
              null
          );
        }

        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();

          setProjects(
            projectsData?.data ||
              projectsData?.projects ||
              []
          );
        }
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const publicUrl = portfolio?.slug
    ? `/p/${portfolio.slug}`
    : null;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-52 animate-pulse rounded-lg bg-black/[0.06]" />
        <div className="h-4 w-80 animate-pulse rounded-lg bg-black/[0.05]" />

        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-2xl bg-white"
            />
          ))}
        </div>

        <div className="h-72 animate-pulse rounded-2xl bg-white" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E41159]">
            Overview
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            Welcome back
            {portfolio?.fullName
              ? `, ${portfolio.fullName.split(" ")[0]}`
              : ""}
            .
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
            Manage your portfolio, projects, appearance, and public
            profile from one place.
          </p>
        </div>

        <Link
          href="/dashboard/portfolio"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#292929]"
        >
          <Pencil size={15} />
          Edit portfolio
        </Link>
      </section>

      {/* STATUS CARD */}
      <section className="overflow-hidden rounded-[26px] border border-black/[0.07] bg-white">
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                portfolio?.published
                  ? "bg-[#E41159]/10 text-[#E41159]"
                  : "bg-black/[0.05] text-black/50"
              }`}
            >
              {portfolio?.published ? (
                <Globe2 size={21} />
              ) : (
                <Rocket size={21} />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold tracking-[-0.02em]">
                  {portfolio?.published
                    ? "Your portfolio is live"
                    : "Your portfolio is not published"}
                </h2>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                    portfolio?.published
                      ? "bg-[#E41159]/10 text-[#E41159]"
                      : "bg-black/[0.05] text-black/40"
                  }`}
                >
                  {portfolio?.published ? "Live" : "Draft"}
                </span>
              </div>

              <p className="mt-1 text-sm text-black/45">
                {portfolio?.published
                  ? "Anyone with your portfolio link can view your work."
                  : "Finish your portfolio and publish it when you're ready."}
              </p>
            </div>
          </div>

          {portfolio?.published && publicUrl ? (
            <Link
              href={publicUrl}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/[0.08] px-4 py-2.5 text-sm font-medium text-black/65 transition hover:border-black/15 hover:bg-[#f7f5f1] hover:text-black"
            >
              View portfolio
              <ExternalLink size={15} />
            </Link>
          ) : (
            <Link
              href="/dashboard/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E41159] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d80f53]"
            >
              Complete portfolio
              <ArrowUpRight size={15} />
            </Link>
          )}
        </div>

        {portfolio?.published && publicUrl && (
          <div className="border-t border-black/[0.06] bg-[#f7f5f1] px-6 py-3.5 sm:px-8">
            <p className="truncate text-xs text-black/45">
              localhost:3000{publicUrl}
            </p>
          </div>
        )}
      </section>

      {/* STATS */}
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={Code2}
          label="Portfolio"
          value={portfolio ? "Created" : "Not started"}
          description={
            portfolio?.template
              ? `${portfolio.template} template`
              : "Create your portfolio"
          }
        />

        <StatCard
          icon={FolderKanban}
          label="Projects"
          value={String(projects.length)}
          description={
            projects.length === 0
              ? "Add your first project"
              : `${projects.length} project${
                  projects.length === 1 ? "" : "s"
                } added`
          }
        />

        <StatCard
          icon={Palette}
          label="Appearance"
          value={
            portfolio?.template
              ? capitalize(portfolio.template)
              : "Default"
          }
          description={
            portfolio?.accent
              ? `${capitalize(portfolio.accent)} accent`
              : "Customize your design"
          }
        />
      </section>

      {/* MAIN GRID */}
      <section className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
        {/* RECENT PROJECTS */}
        <div className="rounded-[26px] border border-black/[0.07] bg-white">
          <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-5">
            <div>
              <h2 className="font-semibold tracking-[-0.025em]">
                Your projects
              </h2>

              <p className="mt-1 text-xs text-black/40">
                Projects shown on your portfolio.
              </p>
            </div>

            <Link
              href="/dashboard/projects"
              className="text-xs font-semibold text-[#E41159] hover:underline"
            >
              View all
            </Link>
          </div>

          {projects.length > 0 ? (
            <div className="divide-y divide-black/[0.06]">
              {projects.slice(0, 4).map((project) => (
                <Link
                  key={project.id}
                  href="/dashboard/projects"
                  className="group flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-[#fdfcf9]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-sm font-semibold">
                        {project.title}
                      </h3>

                      {project.featured && (
                        <span className="shrink-0 rounded-full bg-[#E41159]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#E41159]">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-1 truncate text-xs text-black/40">
                      {project.description || "No description added."}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-black/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#E41159]"
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7f5f1]">
                <FolderKanban size={20} className="text-black/35" />
              </div>

              <h3 className="mt-4 text-sm font-semibold">
                No projects yet
              </h3>

              <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-black/40">
                Add your best work so visitors can see what you build.
              </p>

              <Link
                href="/dashboard/projects"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#171717] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#292929]"
              >
                <Plus size={14} />
                Add project
              </Link>
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="rounded-[26px] border border-black/[0.07] bg-white">
          <div className="border-b border-black/[0.06] px-6 py-5">
            <h2 className="font-semibold tracking-[-0.025em]">
              Quick actions
            </h2>

            <p className="mt-1 text-xs text-black/40">
              Keep your portfolio up to date.
            </p>
          </div>

          <div className="space-y-2 p-4">
            <QuickAction
              href="/dashboard/portfolio"
              icon={Code2}
              title="Edit portfolio"
              description="Update your profile"
            />

            <QuickAction
              href="/dashboard/projects"
              icon={FolderKanban}
              title="Manage projects"
              description="Add or edit projects"
            />

            <QuickAction
              href="/dashboard/appearance"
              icon={Palette}
              title="Customize appearance"
              description="Templates and colors"
            />

            <QuickAction
              href="/dashboard/settings"
              icon={SettingsIcon}
              title="Account settings"
              description="Manage your account"
            />
          </div>
        </div>
      </section>

      {/* GETTING STARTED */}
      {!portfolio?.published && (
        <section className="rounded-[26px] border border-black/[0.07] bg-[#171717] p-6 text-white sm:p-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E954A2]">
                Getting started
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
                Finish your portfolio and make it live.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
                Add your information, showcase your projects, choose your
                design, and publish when everything looks right.
              </p>
            </div>

            <Link
              href="/dashboard/portfolio"
              className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#E41159] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#f01a63]"
            >
              Continue building
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-[22px] border border-black/[0.07] bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(23,23,23,0.05)]">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f5f1]">
          <Icon size={18} className="text-black/55" />
        </div>
      </div>

      <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-black/35">
        {label}
      </p>

      <p className="mt-1 text-xl font-semibold tracking-[-0.03em]">
        {value}
      </p>

      <p className="mt-1 text-xs text-black/40">
        {description}
      </p>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl p-3 transition hover:bg-[#f7f5f1]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7f5f1] transition group-hover:bg-white">
        <Icon size={17} className="text-black/50" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-black/40">{description}</p>
      </div>

      <ArrowUpRight
        size={15}
        className="text-black/20 transition group-hover:text-[#E41159]"
      />
    </Link>
  );
}

function SettingsIcon(props: React.ComponentProps<typeof Code2>) {
  return <Palette {...props} />;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}