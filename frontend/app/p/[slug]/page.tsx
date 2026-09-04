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

const RAW_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const API_URL = RAW_API_URL.endsWith("/api")
  ? RAW_API_URL.slice(0, -4)
  : RAW_API_URL;

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

/* =========================================================
   MAIN PORTFOLIO PAGE
========================================================= */

export default function PublicPortfolio({
  params,
}: {
  params: { slug: string };
}) {
  const [portfolio, setPortfolio] =
    useState<Portfolio | null>(null);

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadPortfolio();
  }, [params.slug]);

  /* =========================
     ANALYTICS
  ========================= */

  useEffect(() => {
    if (!portfolio?.published) return;

    const key = "devfolio_anonymous_id";

    let anonymousId =
      localStorage.getItem(key);

    if (!anonymousId) {
      anonymousId = crypto.randomUUID();

      localStorage.setItem(
        key,
        anonymousId
      );
    }

    const send = (
      type: string,
      projectId?: string
    ) => {
      fetch(
        `${API_URL}/api/analytics/events`,
        {
          method: "POST",

          keepalive: true,

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            portfolioSlug:
              portfolio.slug,

            type,

            projectId,

            page: `/p/${portfolio.slug}`,

            anonymousId,

            referrer:
              document.referrer ||
              undefined,
          }),
        }
      ).catch(() => undefined);
    };

    send("PORTFOLIO_VIEW");

    const handler = (
      event: Event
    ) => {
      const id =
        (event as CustomEvent)
          .detail?.projectId;

      if (id) {
        send(
          "PROJECT_CLICK",
          id
        );
      }
    };

    window.addEventListener(
      "devfolio-project-click",
      handler
    );

    return () =>
      window.removeEventListener(
        "devfolio-project-click",
        handler
      );
  }, [
    portfolio?.id,
    portfolio?.published,
    portfolio?.slug,
  ]);

  /* =========================
     LOAD PORTFOLIO
  ========================= */

  async function loadPortfolio() {
    try {
      const response =
        await fetch(
          `${API_URL}/api/portfolio/public/${params.slug}`,
          {
            cache: "no-store",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        setPortfolio(null);

        return;
      }

      const data =
        result?.data ||
        result?.portfolio;

      setPortfolio(data);

      setProjects(
        data?.projects || []
      );
    } catch {
      setPortfolio(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingState />;
  }

  if (
    !portfolio ||
    !portfolio.published
  ) {
    return <NotFoundState />;
  }

  const accent =
    getAccent(portfolio.accent);

  /* =========================================================
     TEMPLATE ROUTING
  ========================================================= */

  if (
    portfolio.template ===
    "aurora"
  ) {
    return (
      <AuroraPortfolio
        portfolio={portfolio}
        projects={projects}
        accent={accent}
      />
    );
  }

  if (
    portfolio.template ===
    "orbit"
  ) {
    return (
      <OrbitPortfolio
        portfolio={portfolio}
        projects={projects}
        accent={accent}
      />
    );
  }

  if (
    portfolio.template ===
    "creative"
  ) {
    return (
      <CreativePortfolio
        portfolio={portfolio}
        projects={projects}
        accent={accent}
      />
    );
  }

  if (
    portfolio.template ===
    "modern"
  ) {
    return (
      <ModernPortfolio
        portfolio={portfolio}
        projects={projects}
        accent={accent}
      />
    );
  }

const isDark = portfolio.darkMode ?? false;

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
   AURORA TEMPLATE
========================================================= */

function AuroraPortfolio({
  portfolio,
  projects,
  accent,
}: {
  portfolio: Portfolio;
  projects: Project[];
  accent: string;
}) {
  const name =
    portfolio.fullName ||
    "Your Name";

  const title =
    portfolio.title ||
    "Developer & Digital Creator";

  return (
    <div className="aurora-page min-h-screen overflow-hidden bg-[#08080d] text-white">

      <AuroraStyles />

      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div
          className="aurora-blob aurora-blob-1"
          style={{
            background: accent,
          }}
        />

        <div
          className="aurora-blob aurora-blob-2"
          style={{
            background:
              "#7c3aed",
          }}
        />

        <div
          className="aurora-blob aurora-blob-3"
          style={{
            background:
              "#06b6d4",
          }}
        />

        <div className="aurora-grid" />

      </div>

      {/* NAVBAR */}

      <nav className="relative z-30 border-b border-white/10 bg-black/10 backdrop-blur-xl">

        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-5 sm:px-8">

          <a
            href="#top"
            className="flex items-center gap-3"
          >

            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold"
              style={{
                backgroundColor:
                  accent,
              }}
            >
              {name.charAt(0)}
            </div>

            <div>

              <p className="text-sm font-semibold">
                {name}
              </p>

              <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                Portfolio
              </p>

            </div>

          </a>

          <div className="hidden items-center gap-8 text-xs text-white/45 md:flex">

            <a
              href="#work"
              className="transition hover:text-white"
            >
              Work
            </a>

            <a
              href="#about"
              className="transition hover:text-white"
            >
              About
            </a>

            <a
              href="#contact"
              className="transition hover:text-white"
            >
              Contact
            </a>

          </div>

          <a
            href="#contact"
            className="rounded-full px-5 py-2.5 text-xs font-semibold text-white transition hover:scale-105"
            style={{
              backgroundColor:
                accent,
              boxShadow:
                `0 0 30px ${accent}55`,
            }}
          >
            Let's Talk
          </a>

        </div>

      </nav>

      <main
        id="top"
        className="relative z-10"
      >

        {/* HERO */}

        <section className="mx-auto flex min-h-[85vh] max-w-7xl items-center px-5 py-24 sm:px-8">

          <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_380px]">

            {/* LEFT */}

            <div>

              <div
                className="aurora-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/60 backdrop-blur-xl"
              >

                <span
                  className="h-2 w-2 animate-pulse rounded-full"
                  style={{
                    backgroundColor:
                      accent,
                  }}
                />

                Available for new opportunities

              </div>

              <h1 className="aurora-title aurora-fade-up mt-8 max-w-5xl text-6xl font-bold leading-[0.85] tracking-[-0.075em] sm:text-8xl lg:text-[110px]">

                <span className="block text-white">
                  {name.split(" ")[0]}
                </span>

                {name.split(" ").length >
                  1 && (
                  <span
                    className="aurora-gradient-text block"
                    style={{
                      backgroundImage:
                        `linear-gradient(90deg, ${accent}, #a78bfa, #22d3ee)`,
                    }}
                  >
                    {name
                      .split(" ")
                      .slice(1)
                      .join(" ")}
                  </span>
                )}

              </h1>

              <p className="aurora-fade-up mt-9 max-w-2xl text-xl leading-9 text-white/50 sm:text-2xl">

                {title}

              </p>

              {portfolio.introduction && (

                <p className="aurora-fade-up mt-5 max-w-xl text-sm leading-7 text-white/35">

                  {portfolio.introduction}

                </p>

              )}

              <div className="aurora-fade-up mt-10 flex flex-wrap gap-4">

                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition hover:scale-105"
                  style={{
                    backgroundColor:
                      accent,
                    boxShadow:
                      `0 10px 40px ${accent}45`,
                  }}
                >

                  Explore Work

                  <ArrowUpRight
                    size={17}
                    className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  />

                </a>

                {portfolio.email && (

                  <a
                    href={`mailto:${portfolio.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm text-white/70 backdrop-blur-xl transition hover:border-white/25 hover:bg-white/[0.07]"
                  >

                    <Mail size={16} />

                    Get in touch

                  </a>

                )}

              </div>

            </div>

            {/* PROFILE */}

            <div className="aurora-profile relative">

              <div
                className="absolute -inset-5 rounded-[40px] opacity-30 blur-3xl"
                style={{
                  backgroundColor:
                    accent,
                }}
              />

              <div className="relative overflow-hidden rounded-[34px] border border-white/15 bg-white/[0.06] p-3 backdrop-blur-2xl">

                <div className="aspect-[4/5] overflow-hidden rounded-[26px] bg-black/30">

                  {portfolio.profileImage ? (

                    <img
                      src={
                        portfolio.profileImage
                      }
                      alt={name}
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />

                  ) : (

                    <div
                      className="flex h-full items-end p-8"
                      style={{
                        background:
                          `linear-gradient(135deg, ${accent}55, transparent)`,
                      }}
                    >

                      <span className="text-[120px] font-bold leading-none text-white/10">

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

                  <div className="flex items-center gap-2 text-[10px] text-white/40">

                    <span
                      className="h-2 w-2 animate-pulse rounded-full"
                      style={{
                        backgroundColor:
                          accent,
                      }}
                    />

                    ONLINE

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* SCROLL INDICATOR */}

        <div className="relative z-10 flex justify-center pb-10">

          <a
            href="#work"
            className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/30"
          >

            Scroll to explore

            <ChevronDown
              size={18}
              className="animate-bounce"
            />

          </a>

        </div>

        {/* PROJECTS */}

        <section
          id="work"
          className="border-t border-white/10 bg-black/20 backdrop-blur-xl"
        >

          <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div>

                <p
                  className="text-xs font-semibold uppercase tracking-[0.25em]"
                  style={{
                    color:
                      accent,
                  }}
                >
                  Selected Work
                </p>

                <h2 className="mt-5 text-5xl font-bold tracking-[-0.065em] sm:text-7xl">

                  Built with
                  <br />

                  intention.

                </h2>

              </div>

              <p className="max-w-xs text-sm leading-7 text-white/35">

                A selection of projects,
                experiments and products
                I've worked on.

              </p>

            </div>

            {projects.length > 0 ? (

              <div className="mt-16 grid gap-7 md:grid-cols-2">

                {projects.map(
                  (
                    project,
                    index
                  ) => (

                    <AuroraProject
                      key={project.id}
                      project={project}
                      index={index}
                      accent={accent}
                    />

                  )
                )}

              </div>

            ) : (

              <EmptyProjects dark />

            )}

          </div>

        </section>

        {/* ABOUT */}

        <section
          id="about"
          className="border-t border-white/10"
        >

          <div className="mx-auto grid max-w-7xl gap-16 px-5 py-28 sm:px-8 lg:grid-cols-[280px_1fr]">

            <div>

              <p
                className="text-xs font-semibold uppercase tracking-[0.25em]"
                style={{
                  color:
                    accent,
                }}
              >
                About Me
              </p>

              <h2 className="mt-5 text-4xl font-bold tracking-[-0.06em]">

                Beyond
                <br />

                the screen.

              </h2>

            </div>

            <div>

              <p className="max-w-3xl text-2xl leading-10 text-white/55 sm:text-3xl">

                {portfolio.about ||
                  "I enjoy building thoughtful digital experiences that combine creativity, technology and problem solving."}

              </p>

              {portfolio.skills &&
                portfolio.skills.length >
                  0 && (

                  <div className="mt-12 flex flex-wrap gap-3">

                    {portfolio.skills.map(
                      (
                        skill,
                        index
                      ) => (

                        <span
                          key={skill}
                          className="aurora-skill rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/60 backdrop-blur-xl"
                          style={{
                            animationDelay:
                              `${index * 80}ms`,
                          }}
                        >
                          {skill}
                        </span>

                      )
                    )}

                  </div>

                )}

            </div>

          </div>

        </section>

        {/* CONTACT */}

        <section
          id="contact"
          className="border-t border-white/10"
        >

          <div className="mx-auto max-w-7xl px-5 py-32 text-center sm:px-8">

            <p
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{
                color:
                  accent,
              }}
            >
              Let's Connect
            </p>

            <h2 className="mt-6 text-5xl font-bold leading-[0.9] tracking-[-0.07em] sm:text-7xl lg:text-8xl">

              Let's create
              <br />

              something <span
                style={{
                  color:
                    accent,
                }}
              >
                extraordinary.
              </span>

            </h2>

            {portfolio.email && (

              <a
                href={`mailto:${portfolio.email}`}
                className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-7 py-4 text-sm backdrop-blur-xl transition hover:scale-105"
              >

                {portfolio.email}

                <ArrowUpRight size={17} />

              </a>

            )}

          </div>

        </section>

      </main>

      <Footer
        name={name}
        dark
      />

    </div>
  );
}

/* =========================================================
   AURORA PROJECT CARD
========================================================= */

function AuroraProject({
  project,
  index,
  accent,
}: {
  project: Project;
  index: number;
  accent: string;
}) {
  return (

    <article className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] transition duration-500 hover:-translate-y-2 hover:border-white/25">

      <div className="relative aspect-[16/10] overflow-hidden bg-black/20">

        {project.image ? (

          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

        ) : (

          <div
            className="flex h-full items-end p-8"
            style={{
              background:
                `linear-gradient(135deg, ${accent}55, transparent)`,
            }}
          >

            <span className="text-[100px] font-bold text-white/10">

              {String(
                index + 1
              ).padStart(
                2,
                "0"
              )}

            </span>

          </div>

        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        {project.featured && (

          <span
            className="absolute left-5 top-5 rounded-full px-3 py-1.5 text-[10px] font-bold"
            style={{
              backgroundColor:
                accent,
            }}
          >
            FEATURED
          </span>

        )}

      </div>

      <div className="p-7">

        <div className="flex justify-between gap-5">

          <div>

            <h3 className="text-2xl font-semibold tracking-tight">

              {project.title}

            </h3>

            <p className="mt-3 text-sm leading-7 text-white/40">

              {project.description}

            </p>

          </div>

          <span className="text-xs text-white/20">

            {String(
              index + 1
            ).padStart(
              2,
              "0"
            )}

          </span>

        </div>

        {project.technologies &&
          project.technologies.length >
            0 && (

            <div className="mt-6 flex flex-wrap gap-2">

              {project.technologies.map(
                (
                  tech
                ) => (

                  <span
                    key={tech}
                    className="rounded-full bg-white/5 px-3 py-1.5 text-[10px] text-white/45"
                  >

                    {tech}

                  </span>

                )
              )}

            </div>

          )}

        <div className="mt-7 flex gap-5 border-t border-white/10 pt-5">

          {project.liveDemoUrl && (

            <a
              href={
                project.liveDemoUrl
              }
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackProjectClick(
                  project.id
                )
              }
              className="inline-flex items-center gap-1.5 text-xs font-semibold"
              style={{
                color:
                  accent,
              }}
            >

              View Project

              <ArrowUpRight
                size={14}
              />

            </a>

          )}

          {project.githubUrl && (

            <a
              href={
                project.githubUrl
              }
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackProjectClick(
                  project.id
                )
              }
              className="inline-flex items-center gap-1.5 text-xs text-white/45 transition hover:text-white"
            >

              GitHub

              <Github
                size={14}
              />

            </a>

          )}

        </div>

      </div>

    </article>

  );
}

/* =========================================================
   ORBIT TEMPLATE
========================================================= */

function OrbitPortfolio({
  portfolio,
  projects,
  accent,
}: {
  portfolio: Portfolio;
  projects: Project[];
  accent: string;
}) {
  const name =
    portfolio.fullName ||
    "Your Name";

  const skills =
    portfolio.skills?.slice(
      0,
      8
    ) || [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
    ];

  return (

    <div className="orbit-page min-h-screen overflow-hidden bg-[#09090f] text-white">

      <OrbitStyles />

      {/* STARS */}

      <div className="orbit-stars pointer-events-none fixed inset-0" />

      {/* NAV */}

      <nav className="relative z-30 border-b border-white/10 bg-[#09090f]/70 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          <a
            href="#top"
            className="flex items-center gap-3"
          >

            <div
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor:
                  accent,
                boxShadow:
                  `0 0 20px ${accent}`,
              }}
            />

            <span className="text-sm font-semibold">

              {name}

            </span>

          </a>

          <div className="hidden gap-8 text-xs text-white/45 md:flex">

            <a href="#projects">

              Projects

            </a>

            <a href="#about">

              About

            </a>

            <a href="#contact">

              Contact

            </a>

          </div>

          <a
            href="#projects"
            className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/60"
          >

            Explore

          </a>

        </div>

      </nav>

      <main
        id="top"
        className="relative z-10"
      >

        {/* HERO */}

        <section className="relative flex min-h-[850px] items-center justify-center overflow-hidden px-5">

          {/* ORBITS */}

          <div className="orbit-system">

            <div className="orbit-ring orbit-ring-1">

              {skills[0] && (

                <OrbitSkill
                  skill={skills[0]}
                  accent={accent}
                  position="top"
                />

              )}

            </div>

            <div className="orbit-ring orbit-ring-2">

              {skills[1] && (

                <OrbitSkill
                  skill={skills[1]}
                  accent={accent}
                  position="right"
                />

              )}

              {skills[2] && (

                <OrbitSkill
                  skill={skills[2]}
                  accent={accent}
                  position="bottom"
                />

              )}

            </div>

            <div className="orbit-ring orbit-ring-3">

              {skills[3] && (

                <OrbitSkill
                  skill={skills[3]}
                  accent={accent}
                  position="left"
                />

              )}

              {skills[4] && (

                <OrbitSkill
                  skill={skills[4]}
                  accent={accent}
                  position="top-right"
                />

              )}

            </div>

            {/* CENTER */}

            <div className="orbit-center">

              <div
                className="absolute -inset-16 rounded-full opacity-30 blur-3xl"
                style={{
                  backgroundColor:
                    accent,
                }}
              />

              <div className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/[0.06] shadow-2xl backdrop-blur-xl sm:h-52 sm:w-52">

                {portfolio.profileImage ? (

                  <img
                    src={
                      portfolio.profileImage
                    }
                    alt={name}
                    className="h-full w-full object-cover"
                  />

                ) : (

                  <span className="text-7xl font-bold text-white/30">

                    {name.charAt(0)}

                  </span>

                )}

              </div>

            </div>

          </div>

          {/* TEXT */}

          <div className="absolute bottom-16 left-1/2 w-full max-w-4xl -translate-x-1/2 px-5 text-center">

            <p
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{
                color:
                  accent,
              }}
            >
              Developer Universe
            </p>

            <h1 className="mt-6 text-5xl font-bold tracking-[-0.075em] sm:text-7xl lg:text-8xl">

              {name}

            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/45">

              {portfolio.title ||
                "Building ideas that move through the digital universe."}

            </p>

            <a
              href="#projects"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 text-sm backdrop-blur-xl transition hover:scale-105"
            >

              Enter my universe

              <ArrowUpRight
                size={16}
              />

            </a>

          </div>

        </section>

        {/* PROJECTS */}

        <section
          id="projects"
          className="border-t border-white/10"
        >

          <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">

            <div className="text-center">

              <p
                className="text-xs font-semibold uppercase tracking-[0.3em]"
                style={{
                  color:
                    accent,
                }}
              >
                Project Galaxy
              </p>

              <h2 className="mt-5 text-5xl font-bold tracking-[-0.065em] sm:text-7xl">

                Things I've
                <br />

                launched.

              </h2>

            </div>

            <div className="mt-20 space-y-16">

              {projects.map(
                (
                  project,
                  index
                ) => (

                  <OrbitProject
                    key={project.id}
                    project={project}
                    index={index}
                    accent={accent}
                  />

                )
              )}

            </div>

            {projects.length ===
              0 && (
              <EmptyProjects
                dark
              />
            )}

          </div>

        </section>

        {/* ABOUT */}

        <section
          id="about"
          className="border-t border-white/10 bg-white/[0.015]"
        >

          <div className="mx-auto max-w-5xl px-5 py-28 text-center sm:px-8">

            <p
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{
                color:
                  accent,
              }}
            >
              Mission
            </p>

            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.055em] sm:text-6xl">

              {portfolio.about ||
                "Exploring technology, solving problems and building meaningful digital experiences."}

            </h2>

            {skills.length > 0 && (

              <div className="mt-14 flex flex-wrap justify-center gap-3">

                {skills.map(
                  (
                    skill
                  ) => (

                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/55"
                    >

                      {skill}

                    </span>

                  )
                )}

              </div>

            )}

          </div>

        </section>

        {/* CONTACT */}

        <section
          id="contact"
          className="relative overflow-hidden border-t border-white/10"
        >

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
            style={{
              backgroundColor:
                accent,
            }}
          />

          <div className="relative mx-auto max-w-5xl px-5 py-36 text-center sm:px-8">

            <p
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{
                color:
                  accent,
              }}
            >
              Transmission Open
            </p>

            <h2 className="mt-6 text-5xl font-bold tracking-[-0.07em] sm:text-7xl">

              Let's build
              <br />

              the next idea.

            </h2>

            {portfolio.email && (

              <a
                href={`mailto:${portfolio.email}`}
                className="mt-10 inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold transition hover:scale-105"
                style={{
                  backgroundColor:
                    accent,
                  boxShadow:
                    `0 10px 50px ${accent}55`,
                }}
              >

                {portfolio.email}

                <ArrowUpRight
                  size={17}
                />

              </a>

            )}

          </div>

        </section>

      </main>

      <Footer
        name={name}
        dark
      />

    </div>

  );
}

/* =========================================================
   ORBIT SKILL
========================================================= */

function OrbitSkill({
  skill,
  accent,
  position,
}: {
  skill: string;
  accent: string;
  position: string;
}) {

  const positions:
    Record<
      string,
      string
    > = {

    top:
      "-top-5 left-1/2 -translate-x-1/2",

    right:
      "right-[-35px] top-1/2 -translate-y-1/2",

    bottom:
      "-bottom-5 left-1/2 -translate-x-1/2",

    left:
      "left-[-35px] top-1/2 -translate-y-1/2",

    "top-right":
      "right-[5%] top-[5%]",

  };

  return (

    <div
      className={`absolute ${positions[position]}`}
    >

      <div
        className="rounded-full border border-white/15 bg-[#11111a]/90 px-4 py-2 text-[10px] font-medium text-white/70 shadow-xl backdrop-blur-xl"
        style={{
          boxShadow:
            `0 0 30px ${accent}20`,
        }}
      >

        {skill}

      </div>

    </div>

  );
}

/* =========================================================
   ORBIT PROJECT
========================================================= */

function OrbitProject({
  project,
  index,
  accent,
}: {
  project: Project;
  index: number;
  accent: string;
}) {

  const reverse =
    index % 2 === 1;

  return (

    <article
      className={`grid items-center gap-10 lg:grid-cols-2 ${
        reverse
          ? "lg:[&>div:first-child]:order-2"
          : ""
      }`}
    >

      {/* IMAGE */}

      <div className="group relative">

        <div
          className="absolute -inset-6 rounded-[40px] opacity-20 blur-3xl"
          style={{
            backgroundColor:
              accent,
          }}
        />

        <div className="relative aspect-[16/10] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04]">

          {project.image ? (

            <img
              src={
                project.image
              }
              alt={
                project.title
              }
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

          ) : (

            <div
              className="flex h-full items-center justify-center"
              style={{
                background:
                  `radial-gradient(circle, ${accent}35, transparent 65%)`,
              }}
            >

              <span className="text-8xl font-bold text-white/10">

                {String(
                  index + 1
                ).padStart(
                  2,
                  "0"
                )}

              </span>

            </div>

          )}

        </div>

      </div>

      {/* CONTENT */}

      <div>

        <p
          className="text-xs font-semibold tracking-[0.25em]"
          style={{
            color:
              accent,
          }}
        >

          PROJECT {String(
            index + 1
          ).padStart(
            2,
            "0"
          )}

        </p>

        <h3 className="mt-5 text-4xl font-bold tracking-[-0.05em]">

          {project.title}

        </h3>

        <p className="mt-5 max-w-xl text-base leading-8 text-white/45">

          {project.description}

        </p>

        {project.technologies &&
          project.technologies.length >
            0 && (

            <div className="mt-7 flex flex-wrap gap-2">

              {project.technologies.map(
                (
                  tech
                ) => (

                  <span
                    key={tech}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/45"
                  >

                    {tech}

                  </span>

                )
              )}

            </div>

          )}

        <div className="mt-8 flex gap-5">

          {project.liveDemoUrl && (

            <a
              href={
                project.liveDemoUrl
              }
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackProjectClick(
                  project.id
                )
              }
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{
                color:
                  accent,
              }}
            >

              Launch Project

              <ArrowUpRight
                size={16}
              />

            </a>

          )}

          {project.githubUrl && (

            <a
              href={
                project.githubUrl
              }
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackProjectClick(
                  project.id
                )
              }
              className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white"
            >

              GitHub

              <Github
                size={16}
              />

            </a>

          )}

        </div>

      </div>

    </article>

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
  const name =
    portfolio.fullName ||
    "Your Name";

  const title =
    portfolio.title ||
    "Developer & Creator";

  return (
    <div className="min-h-screen bg-[#171615] text-white">

      <nav className="sticky top-0 z-40 border-b border-white/8 bg-[#171615]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">

          <a
            href="#top"
            className="flex items-center gap-2.5"
          >

            <span
              className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold text-white"
              style={{
                backgroundColor:
                  accent,
              }}
            >
              {name.charAt(0)}
            </span>

            <span className="text-sm font-semibold">

              {name}

            </span>

          </a>

          <div className="hidden items-center gap-7 text-xs text-white/45 sm:flex">

            <a href="#work">

              Work

            </a>

            <a href="#about">

              About

            </a>

            <a href="#contact">

              Contact

            </a>

          </div>

          <a
            href="#contact"
            className="rounded-xl px-3.5 py-2 text-xs font-semibold text-white"
            style={{
              backgroundColor:
                accent,
            }}
          >

            Let's talk

          </a>

        </div>

      </nav>

      <main id="top">

        <section className="mx-auto max-w-6xl px-5 pb-28 pt-24 sm:px-8 sm:pt-32 lg:pb-36">

          <div className="grid items-end gap-14 lg:grid-cols-[1fr_330px]">

            <div>

              <div
                className="mb-7 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px]"
                style={{
                  borderColor:
                    `${accent}45`,
                  color:
                    accent,
                }}
              >

                Available for opportunities

              </div>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.065em] sm:text-7xl lg:text-[88px]">

                {name}

              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/45 sm:text-xl">

                {title}

              </p>

              <div className="mt-9 flex flex-wrap gap-3">

                <a
                  href="#work"
                  className="rounded-xl px-5 py-3 text-sm font-semibold"
                  style={{
                    backgroundColor:
                      accent,
                  }}
                >

                  View my work

                </a>

              </div>

            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-3">

              <div className="aspect-[4/5] overflow-hidden rounded-[22px]">

                {portfolio.profileImage ? (

                  <img
                    src={
                      portfolio.profileImage
                    }
                    alt={name}
                    className="h-full w-full object-cover"
                  />

                ) : (

                  <div className="flex h-full items-center justify-center bg-white/5">

                    <span className="text-8xl text-white/10">

                      {name.charAt(0)}

                    </span>

                  </div>

                )}

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer
        name={name}
        dark
      />

    </div>
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

  const name =
    portfolio.fullName ||
    "Your Name";

  const bg =
    dark
      ? "#171615"
      : "#f8f6f2";

  const fg =
    dark
      ? "#ffffff"
      : "#252321";

  const muted =
    dark
      ? "rgba(255,255,255,.45)"
      : "rgba(37,35,33,.48)";

  return (

    <div
      className="min-h-screen"
      style={{
        background:
          bg,
        color:
          fg,
      }}
    >

      <main>

        <section className="mx-auto max-w-5xl px-5 pb-28 pt-32 sm:px-8">

          <p
            className="text-xs font-semibold uppercase tracking-[0.18em]"
            style={{
              color:
                accent,
            }}
          >
            Portfolio
          </p>

          <h1 className="mt-5 text-5xl font-semibold sm:text-7xl">

            {name}

          </h1>

          <p
            className="mt-7 text-lg"
            style={{
              color:
                muted,
            }}
          >

            {portfolio.title}

          </p>

        </section>

      </main>

      <Footer
        name={name}
        dark={dark}
      />

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

  const name =
    portfolio.fullName ||
    "Your Name";

  return (

    <div className="min-h-screen bg-[#f3dce7] text-[#252321]">

      <main>

        <section className="mx-auto max-w-6xl px-5 pb-32 pt-24 sm:px-8">

          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-45">

            Hello, I'm

          </p>

          <h1 className="mt-5 text-6xl font-bold sm:text-8xl lg:text-[120px]">

            {name}

          </h1>

          <p className="mt-10 text-xl opacity-60">

            {portfolio.title}

          </p>

        </section>

      </main>

      <Footer name={name} />

    </div>

  );
}

/* =========================================================
   SHARED COMPONENTS
========================================================= */

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

        <span
          className={
            dark
              ? "text-white/35"
              : "text-black/35"
          }
        >

          © {new Date().getFullYear()}{" "}
          {name}

        </span>

        <span
          className={
            dark
              ? "text-white/20"
              : "text-black/25"
          }
        >

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
      className={`mt-12 rounded-3xl border p-10 text-center ${
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

function trackProjectClick(
  projectId: string
) {

  window.dispatchEvent(

    new CustomEvent(
      "devfolio-project-click",
      {
        detail: {
          projectId,
        },
      }
    )

  );

}

function getAccent(
  accent?: string
) {

  const values:
    Record<
      string,
      string
    > = {

    neutral:
      "#252321",

    pink:
      "#e41159",

    purple:
      "#7c3aed",

    blue:
      "#2563eb",

    green:
      "#15803d",

  };

  return (
    values[
      accent || "pink"
    ] || "#e41159"
  );

}

/* =========================================================
   AURORA ANIMATIONS
========================================================= */

function AuroraStyles() {

  return (

    <style jsx global>{`

      .aurora-page {
        background:
          radial-gradient(
            circle at top,
            #11111c,
            #08080d 60%
          );
      }

      .aurora-grid {
        position: absolute;
        inset: 0;
        opacity: .035;
        background-image:
          linear-gradient(
            rgba(255,255,255,.5) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(255,255,255,.5) 1px,
            transparent 1px
          );
        background-size: 60px 60px;
      }

      .aurora-blob {
        position: absolute;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        filter: blur(130px);
        opacity: .18;
      }

      .aurora-blob-1 {
        top: -150px;
        left: -100px;
        animation:
          auroraFloat 16s infinite alternate ease-in-out;
      }

      .aurora-blob-2 {
        top: 20%;
        right: -200px;
        animation:
          auroraFloat 20s infinite alternate-reverse ease-in-out;
      }

      .aurora-blob-3 {
        bottom: -200px;
        left: 30%;
        animation:
          auroraFloat 24s infinite alternate ease-in-out;
      }

      @keyframes auroraFloat {

        0% {
          transform:
            translate(0,0)
            scale(1);
        }

        100% {
          transform:
            translate(150px,80px)
            scale(1.3);
        }

      }

      .aurora-gradient-text {

        background-clip: text;

        -webkit-background-clip: text;

        color: transparent;

        background-size:
          200% 200%;

        animation:
          gradientMove 7s infinite ease;

      }

      @keyframes gradientMove {

        0% {
          background-position:
            0% 50%;
        }

        50% {
          background-position:
            100% 50%;
        }

        100% {
          background-position:
            0% 50%;
        }

      }

      .aurora-fade-up {

        animation:
          auroraFadeUp .8s ease both;

      }

      @keyframes auroraFadeUp {

        from {

          opacity: 0;

          transform:
            translateY(30px);

        }

        to {

          opacity: 1;

          transform:
            translateY(0);

        }

      }

      .aurora-profile {

        animation:
          auroraProfile 6s ease-in-out infinite alternate;

      }

      @keyframes auroraProfile {

        from {

          transform:
            translateY(0);

        }

        to {

          transform:
            translateY(-14px);

        }

      }

    `}</style>

  );

}

/* =========================================================
   ORBIT ANIMATIONS
========================================================= */

function OrbitStyles() {

  return (

    <style jsx global>{`

      .orbit-stars {

        opacity: .45;

        background-image:

          radial-gradient(
            white 1px,
            transparent 1px
          );

        background-size:
          45px 45px;

      }

      .orbit-system {

        position: relative;

        width: 650px;

        height: 650px;

        max-width: 100%;

      }

      .orbit-ring {

        position: absolute;

        left: 50%;

        top: 50%;

        border-radius: 50%;

        border:
          1px solid
          rgba(255,255,255,.08);

        transform:
          translate(-50%,-50%);

      }

      .orbit-ring-1 {

        width: 270px;

        height: 270px;

        animation:
          orbitRotate 20s linear infinite;

      }

      .orbit-ring-2 {

        width: 430px;

        height: 430px;

        animation:
          orbitRotateReverse 30s linear infinite;

      }

      .orbit-ring-3 {

        width: 620px;

        height: 620px;

        animation:
          orbitRotate 45s linear infinite;

      }

      .orbit-center {

        position: absolute;

        left: 50%;

        top: 50%;

        transform:
          translate(-50%,-50%);

        z-index: 10;

        animation:
          orbitPulse 5s ease-in-out infinite;

      }

      @keyframes orbitRotate {

        from {

          transform:
            translate(-50%,-50%)
            rotate(0deg);

        }

        to {

          transform:
            translate(-50%,-50%)
            rotate(360deg);

        }

      }

      @keyframes orbitRotateReverse {

        from {

          transform:
            translate(-50%,-50%)
            rotate(360deg);

        }

        to {

          transform:
            translate(-50%,-50%)
            rotate(0deg);

        }

      }

      @keyframes orbitPulse {

        0%,
        100% {

          transform:
            translate(-50%,-50%)
            scale(1);

        }

        50% {

          transform:
            translate(-50%,-50%)
            scale(1.04);

        }

      }

      @media (
        max-width: 700px
      ) {

        .orbit-system {

          width: 420px;

          height: 420px;

        }

        .orbit-ring-1 {

          width: 170px;

          height: 170px;

        }

        .orbit-ring-2 {

          width: 280px;

          height: 280px;

        }

        .orbit-ring-3 {

          width: 390px;

          height: 390px;

        }

      }

    `}</style>

  );

}