"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Github,
  Mail,
  MapPin,
  ExternalLink,
  Linkedin,
  Twitter,
  ChevronDown,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Project = {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  featured?: boolean;
};

type Portfolio = {
  id: string;
  slug: string;
  published: boolean;
  fullName?: string;
  title?: string;
  profileImage?: string;
  location?: string;
  email?: string;
  phone?: string;
  introduction?: string;
  about?: string;
  skills?: string[];
  experience?: any[];
  education?: any[];
  socialLinks?: Record<string, string>;
  template?: string;
  accent?: string;
  darkMode?: boolean;
};

export default function PublicPortfolio({
  params,
}: {
  params: { slug: string };
}) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(
    null
  );
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolio();
  }, [params.slug]);

  async function loadPortfolio() {
    try {
      const response = await fetch(
        `${API_URL}/api/portfolio/public/${params.slug}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setPortfolio(null);
        return;
      }

      const data = result?.data || result?.portfolio;

      setPortfolio(data);
      setProjects(data?.projects || []);
    } catch {
      setPortfolio(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingState />;
  }

  if (!portfolio || !portfolio.published) {
    return <NotFoundState />;
  }

  const accent = getAccent(portfolio.accent);

  const isDark =
    portfolio.darkMode || portfolio.template === "modern";

  if (portfolio.template === "creative") {
    return (
      <CreativePortfolio
        portfolio={portfolio}
        projects={projects}
        accent={accent}
      />
    );
  }

  if (portfolio.template === "modern") {
    return (
      <ModernPortfolio
        portfolio={portfolio}
        projects={projects}
        accent={accent}
      />
    );
  }

  return (
    <MinimalPortfolio
      portfolio={portfolio}
      projects={projects}
      accent={accent}
      dark={isDark}
    />
  );
}

/* =========================================================
   MODERN TEMPLATE
========================================================= */

function ModernPortfolio({
  portfolio,
  projects,
  accent,
}: {
  portfolio: Portfolio;
  projects: Project[];
  accent: string;
}) {
  const name = portfolio.fullName || "Your Name";
  const title = portfolio.title || "Developer & Creator";

  return (
    <div className="min-h-screen bg-[#171615] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-white/8 bg-[#171615]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            className="flex items-center gap-2.5"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              {name.charAt(0)}
            </span>

            <span className="text-sm font-semibold">
              {name}
            </span>
          </a>

          <div className="hidden items-center gap-7 text-xs text-white/45 sm:flex">
            <a href="#work" className="hover:text-white">
              Work
            </a>
            <a href="#about" className="hover:text-white">
              About
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>

          <a
            href="#contact"
            className="rounded-xl px-3.5 py-2 text-xs font-semibold text-white"
            style={{ backgroundColor: accent }}
          >
            Let's talk
          </a>
        </div>
      </nav>

      <main id="top">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pb-28 pt-24 sm:px-8 sm:pt-32 lg:pb-36">
          <div className="grid items-end gap-14 lg:grid-cols-[1fr_330px]">
            <div>
              <div
                className="mb-7 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px]"
                style={{
                  borderColor: `${accent}45`,
                  color: accent,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />

                Available for opportunities
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.065em] sm:text-7xl lg:text-[88px]">
                {name}
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/45 sm:text-xl">
                {title}
              </p>

              {portfolio.introduction && (
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/35">
                  {portfolio.introduction}
                </p>
              )}

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  style={{ backgroundColor: accent }}
                >
                  View my work
                  <ArrowUpRight size={16} />
                </a>

                {portfolio.email && (
                  <a
                    href={`mailto:${portfolio.email}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:text-white"
                  >
                    <Mail size={16} />
                    Contact
                  </a>
                )}
              </div>
            </div>

            {/* Profile card */}
            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-3">
              <div className="aspect-[4/5] overflow-hidden rounded-[22px] bg-white/[0.04]">
                {portfolio.profileImage ? (
                  <img
                    src={portfolio.profileImage}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-end bg-gradient-to-br from-white/10 to-transparent p-7">
                    <span className="text-[100px] font-semibold leading-none tracking-[-0.08em] text-white/10">
                      {name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between px-3 py-4">
                <div>
                  <p className="text-sm font-medium">
                    {name}
                  </p>

                  {portfolio.location && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-white/35">
                      <MapPin size={12} />
                      {portfolio.location}
                    </p>
                  )}
                </div>

                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: accent }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Work */}
        <section
          id="work"
          className="border-t border-white/8"
        >
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <SectionHeading
              eyebrow="Selected work"
              title="Things I've built."
              dark
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {projects.map((project, index) => (
                <ModernProject
                  key={project.id}
                  project={project}
                  index={index}
                  accent={accent}
                />
              ))}
            </div>

            {projects.length === 0 && (
              <EmptyProjects dark />
            )}
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="border-t border-white/8"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[250px_1fr]">
            <SectionHeading
              eyebrow="About"
              title="A little more about me."
              dark
            />

            <div>
              <p className="max-w-2xl text-xl leading-9 text-white/55 sm:text-2xl">
                {portfolio.about ||
                  "I enjoy turning ideas into useful, thoughtful digital products."}
              </p>

              {portfolio.skills &&
                portfolio.skills.length > 0 && (
                  <div className="mt-10 flex flex-wrap gap-2">
                    {portfolio.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 px-3.5 py-2 text-xs text-white/55"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="border-t border-white/8"
        >
          <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              Get in touch
            </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
              Have an idea?
              <br />
              Let's build it.
            </h2>

            {portfolio.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="mt-9 inline-flex items-center gap-2 text-lg font-medium"
                style={{ color: accent }}
              >
                {portfolio.email}
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </section>
      </main>

      <Footer name={name} dark />
    </div>
  );
}

/* =========================================================
   MODERN PROJECT
========================================================= */

function ModernProject({
  project,
  index,
  accent,
}: {
  project: Project;
  index: number;
  accent: string;
}) {
  return (
    <article className="group overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.04]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="flex h-full items-end p-7"
            style={{
              background: `linear-gradient(135deg, ${accent}22, transparent 65%)`,
            }}
          >
            <span className="text-[80px] font-semibold leading-none tracking-[-0.08em] text-white/5">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}

        {project.featured && (
          <span
            className="absolute left-5 top-5 rounded-full px-3 py-1.5 text-[10px] font-semibold text-white"
            style={{ backgroundColor: accent }}
          >
            Featured
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              {project.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/35">
              {project.description}
            </p>
          </div>

          <span className="text-xs text-white/20">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {project.technologies &&
          project.technologies.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px] text-white/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

        <div className="mt-6 flex gap-4 border-t border-white/8 pt-5">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium"
              style={{ color: accent }}
            >
              Live project
              <ArrowUpRight size={14} />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white"
            >
              GitHub
              <Github size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MINIMAL TEMPLATE
========================================================= */

function MinimalPortfolio({
  portfolio,
  projects,
  accent,
  dark,
}: {
  portfolio: Portfolio;
  projects: Project[];
  accent: string;
  dark: boolean;
}) {
  const name = portfolio.fullName || "Your Name";

  const bg = dark ? "#171615" : "#f8f6f2";
  const fg = dark ? "#ffffff" : "#252321";
  const muted = dark ? "rgba(255,255,255,.45)" : "rgba(37,35,33,.48)";
  const border = dark
    ? "rgba(255,255,255,.09)"
    : "rgba(37,35,33,.10)";

  return (
    <div
      className="min-h-screen"
      style={{
        background: bg,
        color: fg,
      }}
    >
      <nav
        className="border-b"
        style={{ borderColor: border }}
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <span className="text-sm font-semibold">
            {name}
          </span>

          <div
            className="hidden gap-6 text-xs sm:flex"
            style={{ color: muted }}
          >
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        <section className="mx-auto max-w-5xl px-5 pb-28 pt-32 sm:px-8">
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Portfolio
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.065em] sm:text-7xl">
            {name}
          </h1>

          <p
            className="mt-7 max-w-xl text-lg leading-8"
            style={{ color: muted }}
          >
            {portfolio.title ||
              "Developer building thoughtful digital experiences."}
          </p>

          {portfolio.introduction && (
            <p
              className="mt-4 max-w-xl text-sm leading-7"
              style={{ color: muted }}
            >
              {portfolio.introduction}
            </p>
          )}
        </section>

        <section
          id="work"
          className="border-t"
          style={{ borderColor: border }}
        >
          <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
            <SectionHeading
              eyebrow="Selected work"
              title="Projects"
              dark={dark}
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-3xl border"
                  style={{ borderColor: border }}
                >
                  <div className="aspect-[16/9] bg-black/5">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold">
                      {project.title}
                    </h3>

                    <p
                      className="mt-2 text-sm leading-6"
                      style={{ color: muted }}
                    >
                      {project.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="border-t"
          style={{ borderColor: border }}
        >
          <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
            <SectionHeading
              eyebrow="About"
              title="About me"
              dark={dark}
            />

            <p
              className="mt-10 max-w-2xl text-xl leading-9"
              style={{ color: muted }}
            >
              {portfolio.about ||
                "I enjoy solving problems and creating useful products."}
            </p>
          </div>
        </section>

        <section
          id="contact"
          className="border-t"
          style={{ borderColor: border }}
        >
          <div className="mx-auto max-w-5xl px-5 py-28 sm:px-8">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              Contact
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Let's work together.
            </h2>

            {portfolio.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium"
                style={{ color: accent }}
              >
                {portfolio.email}
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </section>
      </main>

      <Footer name={name} dark={dark} />
    </div>
  );
}

/* =========================================================
   CREATIVE TEMPLATE
========================================================= */

function CreativePortfolio({
  portfolio,
  projects,
  accent,
}: {
  portfolio: Portfolio;
  projects: Project[];
  accent: string;
}) {
  const name = portfolio.fullName || "Your Name";

  return (
    <div className="min-h-screen bg-[#f3dce7] text-[#252321]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: accent }}
        >
          {name.charAt(0)}
        </div>

        <div className="hidden gap-6 text-xs font-medium sm:flex">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <a
          href="#contact"
          className="rounded-full bg-[#252321] px-4 py-2.5 text-xs font-semibold text-white"
        >
          Contact
        </a>
      </nav>

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-32 pt-24 sm:px-8 sm:pt-32">
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-45">
            Hello, I'm
          </p>

          <h1 className="mt-5 max-w-5xl text-6xl font-bold leading-[0.85] tracking-[-0.075em] sm:text-8xl lg:text-[120px]">
            {name}
          </h1>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_330px]">
            <p className="max-w-2xl text-xl leading-9 opacity-60">
              {portfolio.title ||
                "Developer creating digital products and experiences."}
            </p>

            {portfolio.profileImage && (
              <div className="overflow-hidden rounded-[30px]">
                <img
                  src={portfolio.profileImage}
                  alt={name}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        <section
          id="work"
          className="bg-[#252321] text-white"
        >
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              Selected work
            </p>

            <h2 className="mt-5 text-5xl font-bold tracking-[-0.06em] sm:text-7xl">
              Projects.
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className={`overflow-hidden rounded-[28px] ${
                    index % 2 === 1
                      ? "md:mt-16"
                      : ""
                  }`}
                >
                  <div className="aspect-[4/3] bg-white/5">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-full items-end p-8"
                        style={{
                          backgroundColor: `${accent}20`,
                        }}
                      >
                        <span className="text-8xl font-bold text-white/5">
                          {index + 1}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-5">
                    <h3 className="text-2xl font-semibold">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/40">
                      {project.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="mx-auto max-w-6xl px-5 py-28 sm:px-8"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            About
          </p>

          <h2 className="mt-5 max-w-4xl text-5xl font-bold leading-none tracking-[-0.06em] sm:text-7xl">
            Curious by default.
            <br />
            Building by choice.
          </h2>

          <p className="mt-10 max-w-2xl text-lg leading-8 opacity-55">
            {portfolio.about ||
              "I like turning complex problems into simple, useful experiences."}
          </p>
        </section>

        <section
          id="contact"
          className="bg-[#252321] px-5 py-28 text-white sm:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              Let's connect
            </p>

            <h2 className="mt-5 max-w-3xl text-5xl font-bold leading-none tracking-[-0.06em] sm:text-7xl">
              Got something
              <br />
              interesting?
            </h2>

            {portfolio.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="mt-10 inline-flex items-center gap-2 text-lg"
                style={{ color: accent }}
              >
                {portfolio.email}
                <ArrowUpRight size={19} />
              </a>
            )}
          </div>
        </section>
      </main>

      <Footer name={name} dark />
    </div>
  );
}

/* =========================================================
   SHARED
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  dark,
}: {
  eyebrow: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.18em] ${
          dark ? "text-white/30" : "text-black/30"
        }`}
      >
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function Footer({
  name,
  dark,
}: {
  name: string;
  dark?: boolean;
}) {
  return (
    <footer
      className={`border-t px-5 py-7 sm:px-8 ${
        dark
          ? "border-white/8 text-white"
          : "border-black/10"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-xs sm:flex-row">
        <span className={dark ? "text-white/35" : "text-black/35"}>
          © {new Date().getFullYear()} {name}
        </span>

        <span className={dark ? "text-white/20" : "text-black/25"}>
          Built with Portfolia
        </span>
      </div>
    </footer>
  );
}

function EmptyProjects({
  dark,
}: {
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-10 text-center ${
        dark
          ? "border-white/10 text-white/40"
          : "border-black/10 text-black/40"
      }`}
    >
      No projects added yet.
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#171615]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white" />
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#171615] px-5 text-white">
      <div className="text-center">
        <p className="text-sm text-white/35">
          Portfolio unavailable
        </p>

        <h1 className="mt-3 text-3xl font-semibold">
          This portfolio doesn't exist.
        </h1>
      </div>
    </div>
  );
}

function getAccent(accent?: string) {
  const values: Record<string, string> = {
    neutral: "#252321",
    pink: "#e41159",
    purple: "#7c3aed",
    blue: "#2563eb",
    green: "#15803d",
  };

  return values[accent || "pink"] || "#e41159";
}