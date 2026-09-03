"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Moon,
  Sparkles,
  Sun,
  Loader2,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* =========================================================
   TEMPLATES
========================================================= */

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Editorial layout with clean typography.",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Bold SaaS-inspired portfolio with strong hierarchy.",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Expressive layout for designers and builders.",
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "Animated gradients with a futuristic atmosphere.",
  },
  {
    id: "orbit",
    name: "Orbit",
    description: "Modern space-inspired design with floating elements.",
  },
];

/* =========================================================
   ACCENTS
========================================================= */

const accents = [
  {
    id: "neutral",
    name: "Charcoal",
    value: "#252321",
  },
  {
    id: "pink",
    name: "Pink",
    value: "#e41159",
  },
  {
    id: "purple",
    name: "Violet",
    value: "#7c3aed",
  },
  {
    id: "blue",
    name: "Blue",
    value: "#2563eb",
  },
  {
    id: "green",
    name: "Green",
    value: "#15803d",
  },
];

/* =========================================================
   MAIN PAGE
========================================================= */

export default function AppearancePage() {
  const [portfolio, setPortfolio] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    loadPortfolio();
  }, []);

  /* =========================================================
     LOAD PORTFOLIO
  ========================================================= */

  async function loadPortfolio() {
    try {
      const response = await fetch(
        `${API_URL}/api/portfolio`,
        {
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok) {
        const data =
          result?.data ||
          result?.portfolio;

        setPortfolio({
          ...data,

          template:
            data?.template || "minimal",

          accent:
            data?.accent || "pink",

          darkMode:
            data?.darkMode || false,
        });
      }
    } catch (error) {
      console.error(
        "Failed to load portfolio:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     SAVE APPEARANCE
  ========================================================= */

  async function save(changes: any) {
    if (!portfolio) return;

    /*
      IMPORTANT:

      Update UI FIRST.

      This makes template/accent/theme
      selection work immediately.
    */

    const previousPortfolio = portfolio;

    const updatedPortfolio = {
      ...portfolio,
      ...changes,
    };

    setPortfolio(updatedPortfolio);

    setSaving(true);

    setSaveMessage("");

    try {
      /*
        Send ONLY the changed values.

        Example:
        { template: "aurora" }

        instead of sending the entire portfolio.
      */

      const response = await fetch(
        `${API_URL}/api/portfolio`,
        {
          method: "PUT",

          credentials: "include",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            changes
          ),
        }
      );

      const result =
        await response.json().catch(
          () => null
        );

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Unable to save"
        );
      }

      /*
        If backend returns updated portfolio,
        use that data.
      */

      const savedPortfolio =
        result?.data ||
        result?.portfolio;

      if (savedPortfolio) {
        setPortfolio((current: any) => ({
          ...current,
          ...savedPortfolio,
        }));
      }

      setSaveMessage("Saved");

      setTimeout(() => {
        setSaveMessage("");
      }, 2000);
    } catch (error) {
      console.error(
        "Appearance save error:",
        error
      );

      /*
        IMPORTANT:

        We DO NOT reset the selected option.

        The user can still see their selection.
      */

      setSaveMessage(
        "Unable to save"
      );

      setTimeout(() => {
        setSaveMessage("");
      }, 3000);

      /*
        Keep the selected appearance
        instead of reverting.
      */

      setPortfolio(
        updatedPortfolio
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="h-10 w-64 animate-pulse rounded-xl bg-black/5" />

        <div className="h-[500px] animate-pulse rounded-3xl bg-white" />
      </div>
    );
  }

  /* =========================================================
     NO PORTFOLIO
  ========================================================= */

  if (!portfolio) {
    return (
      <div className="rounded-3xl border border-black/10 bg-white p-10 text-center">
        Portfolio not found.
      </div>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#e41159]">
          <Sparkles size={15} />

          Design system
        </div>

        <h1 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
          Appearance
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
          Choose a visual direction for your public portfolio.
          Your content stays the same while the presentation changes.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1fr_390px]">
        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div className="space-y-6">

          {/* =================================================
              TEMPLATES
          ================================================= */}

          <section className="rounded-[28px] border border-black/10 bg-white p-6 sm:p-8">

            <div className="mb-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
                Layout
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Choose your template
              </h2>

              <p className="mt-1 text-sm text-black/40">
                Pick the layout that best represents your work.
              </p>
            </div>

            {/* 5 TEMPLATES */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

              {templates.map(
                (template) => {
                  const active =
                    portfolio.template ===
                    template.id;

                  return (
                    <button
                      type="button"

                      key={template.id}

                      onClick={() => {
                        save({
                          template:
                            template.id,
                        });
                      }}

                      className={`group text-left transition duration-200 ${
                        active
                          ? "scale-[1.02]"
                          : "hover:-translate-y-1"
                      }`}
                    >

                      {/* PREVIEW */}

                      <div
                        className={`relative overflow-hidden rounded-[20px] border bg-[#f5f2ed] p-2 transition ${
                          active
                            ? "border-[#e41159] ring-4 ring-[#e41159]/10"
                            : "border-black/10 group-hover:border-black/25"
                        }`}
                      >

                        <div className="overflow-hidden rounded-[15px] bg-white shadow-sm">

                          {/* Browser */}

                          <div className="flex h-7 items-center gap-1.5 border-b border-black/5 px-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-black/10" />

                            <span className="h-1.5 w-1.5 rounded-full bg-black/10" />

                            <span className="h-1.5 w-1.5 rounded-full bg-black/10" />

                            <div className="ml-auto h-2 w-12 rounded-full bg-black/5" />
                          </div>

                          <TemplatePreview
                            type={
                              template.id
                            }
                          />

                        </div>

                        {/* ACTIVE */}

                        {active && (
                          <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#e41159] text-white shadow-lg">
                            <Check
                              size={14}
                            />
                          </div>
                        )}

                      </div>

                      {/* TEXT */}

                      <div className="mt-4 px-1">

                        <div className="flex items-center justify-between gap-2">

                          <h3 className="text-sm font-semibold">
                            {
                              template.name
                            }
                          </h3>

                          {active && (
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-[#e41159]">
                              Selected
                            </span>
                          )}

                        </div>

                        <p className="mt-1 text-xs leading-5 text-black/40">
                          {
                            template.description
                          }
                        </p>

                      </div>

                    </button>
                  );
                }
              )}

            </div>

          </section>


          {/* =================================================
              ACCENT COLOR
          ================================================= */}

          <section className="rounded-[28px] border border-black/10 bg-white p-6 sm:p-8">

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
              Brand
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              Accent colour
            </h2>

            <p className="mt-1 text-sm text-black/40">
              Used for buttons, links and highlights.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">

              {accents.map(
                (accent) => {
                  const active =
                    portfolio.accent ===
                    accent.id;

                  return (
                    <button
                      type="button"

                      key={accent.id}

                      onClick={() => {
                        save({
                          accent:
                            accent.id,
                        });
                      }}

                      className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm transition ${
                        active
                          ? "border-[#e41159] bg-[#fff7fa] ring-2 ring-[#e41159]/10"
                          : "border-black/10 hover:border-black/20"
                      }`}
                    >

                      <span
                        className="h-5 w-5 rounded-full ring-2 ring-white ring-offset-1"
                        style={{
                          backgroundColor:
                            accent.value,
                        }}
                      />

                      <span>
                        {
                          accent.name
                        }
                      </span>

                      {active && (
                        <Check
                          size={14}
                          className="text-[#e41159]"
                        />
                      )}

                    </button>
                  );
                }
              )}

            </div>

          </section>


          {/* =================================================
              DISPLAY MODE
          ================================================= */}

          <section className="rounded-[28px] border border-black/10 bg-white p-6 sm:p-8">

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
              Theme
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              Display mode
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <ThemeOption
                active={
                  portfolio.darkMode ===
                  false
                }

                icon={
                  <Sun size={18} />
                }

                title="Light"

                text="Bright editorial look"

                onClick={() => {
                  save({
                    darkMode: false,
                  });
                }}
              />


              <ThemeOption
                active={
                  portfolio.darkMode ===
                  true
                }

                icon={
                  <Moon size={18} />
                }

                title="Dark"

                text="Deep modern presentation"

                onClick={() => {
                  save({
                    darkMode: true,
                  });
                }}
              />

            </div>

          </section>

        </div>


        {/* ===================================================
            LIVE PREVIEW
        =================================================== */}

        <aside className="h-fit xl:sticky xl:top-8">

          <div className="overflow-hidden rounded-[28px] bg-[#252321] p-3 shadow-xl">

            {/* PREVIEW HEADER */}

            <div className="flex items-center justify-between px-3 py-3">

              <div>

                <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                  Live preview
                </p>

                <p className="mt-0.5 text-sm font-medium text-white">

                  {
                    templates.find(
                      (item) =>
                        item.id ===
                        portfolio.template
                    )?.name ||
                      "Portfolio"
                  }

                </p>

              </div>


              {/* SAVE STATUS */}

              <div className="flex items-center gap-2">

                {saving && (
                  <>
                    <Loader2
                      size={14}
                      className="animate-spin text-white/50"
                    />

                    <span className="text-[11px] text-white/40">
                      Saving...
                    </span>
                  </>
                )}

                {!saving &&
                  saveMessage && (
                    <span
                      className={`text-[11px] ${
                        saveMessage ===
                        "Saved"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {saveMessage}
                    </span>
                  )}

              </div>

            </div>


            {/* ACTUAL PREVIEW */}

            <div className="overflow-hidden rounded-[20px]">

              <LivePreview
                template={
                  portfolio.template ||
                  "minimal"
                }

                dark={
                  portfolio.darkMode ===
                  true
                }

                accent={
                  accents.find(
                    (item) =>
                      item.id ===
                      portfolio.accent
                  )?.value ||
                  "#e41159"
                }

                name={
                  portfolio.fullName ||
                  "Your Name"
                }

                title={
                  portfolio.title ||
                  "Your professional title"
                }
              />

            </div>

          </div>

        </aside>

      </div>
    </div>
  );
}


/* =========================================================
   TEMPLATE PREVIEW
========================================================= */

function TemplatePreview({
  type,
}: {
  type: string;
}) {


  /* MODERN */

  if (
    type ===
    "modern"
  ) {
    return (
      <div className="h-[185px] bg-[#252321] p-4 text-white">

        <div className="flex justify-between">

          <div className="h-3 w-3 rounded-full bg-[#e41159]" />

          <div className="flex gap-2">
            <span className="h-1.5 w-7 rounded-full bg-white/15" />
            <span className="h-1.5 w-9 rounded-full bg-white/15" />
            <span className="h-1.5 w-5 rounded-full bg-white/15" />
          </div>

        </div>


        <div className="mt-9">

          <div className="h-2 w-12 rounded bg-[#e41159]" />

          <div className="mt-3 h-5 w-32 rounded bg-white/80" />

          <div className="mt-2 h-2 w-28 rounded bg-white/15" />

          <div className="mt-1 h-2 w-20 rounded bg-white/10" />

        </div>


        <div className="mt-8 flex gap-2">

          <div className="h-10 flex-1 rounded-lg bg-white/8" />

          <div className="h-10 flex-1 rounded-lg bg-white/8" />

        </div>

      </div>
    );
  }


  /* CREATIVE */

  if (
    type ===
    "creative"
  ) {
    return (
      <div className="h-[185px] bg-[#f4d9e5] p-4">

        <div className="flex justify-between">

          <div className="h-4 w-4 rounded-full bg-[#e41159]" />

          <div className="h-2 w-10 rounded-full bg-black/15" />

        </div>


        <div className="mt-9">

          <div className="text-[16px] font-bold text-black/70">
            HELLO.
          </div>

          <div className="mt-1 h-5 w-28 rounded bg-black/65" />

          <div className="mt-3 h-1.5 w-32 rounded bg-black/15" />

        </div>


        <div className="mt-7 flex gap-2">

          <div className="h-9 w-9 rounded-full bg-black/10" />

          <div className="h-9 flex-1 rounded-lg bg-white/50" />

          <div className="h-9 flex-1 rounded-lg bg-white/50" />

        </div>

      </div>
    );
  }


  /* AURORA */

  if (
    type ===
    "aurora"
  ) {
    return (
      <div className="relative h-[185px] overflow-hidden bg-[#090b1a] p-4 text-white">

        {/* Gradient */}

        <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-purple-500/40 blur-3xl" />

        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-pink-500/40 blur-3xl" />

        <div className="relative">

          <div className="flex justify-between">

            <div className="h-3 w-3 rounded-full bg-purple-400" />

            <div className="h-2 w-12 rounded-full bg-white/10" />

          </div>


          <div className="mt-10">

            <div className="h-2 w-14 rounded bg-purple-400" />

            <div className="mt-4 h-6 w-36 rounded bg-white/80" />

            <div className="mt-3 h-2 w-28 rounded bg-white/15" />

          </div>


          <div className="mt-8 flex gap-2">

            <div className="h-10 flex-1 rounded-xl border border-white/10 bg-white/10" />

            <div className="h-10 flex-1 rounded-xl border border-white/10 bg-white/10" />

          </div>

        </div>

      </div>
    );
  }


  /* ORBIT */

  if (
    type ===
    "orbit"
  ) {
    return (
      <div className="relative h-[185px] overflow-hidden bg-[#07111f] p-4 text-white">

        {/* Orbit circles */}

        <div className="absolute right-[-25px] top-[20px] h-36 w-36 rounded-full border border-blue-400/30" />

        <div className="absolute right-[-5px] top-[40px] h-24 w-24 rounded-full border border-purple-400/30" />

        <div className="absolute right-[45px] top-[72px] h-3 w-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />


        <div className="relative">

          <div className="h-3 w-3 rounded bg-blue-400" />

          <div className="mt-10">

            <div className="h-2 w-12 rounded bg-blue-400" />

            <div className="mt-4 h-6 w-32 rounded bg-white/80" />

            <div className="mt-3 h-2 w-24 rounded bg-white/15" />

          </div>


          <div className="mt-8 h-9 w-24 rounded-lg bg-blue-500/30" />

        </div>

      </div>
    );
  }


  /* MINIMAL DEFAULT */

  return (
    <div className="h-[185px] bg-white p-4">

      <div className="flex justify-between">

        <div className="h-2 w-14 rounded bg-black/20" />

        <div className="flex gap-2">
          <span className="h-1.5 w-7 rounded bg-black/8" />
          <span className="h-1.5 w-7 rounded bg-black/8" />
        </div>

      </div>


      <div className="mt-10">

        <div className="h-2 w-12 rounded bg-[#e41159]/60" />

        <div className="mt-3 h-6 w-36 rounded bg-black/15" />

        <div className="mt-3 h-1.5 w-full rounded bg-black/7" />

        <div className="mt-1.5 h-1.5 w-4/5 rounded bg-black/7" />

      </div>


      <div className="mt-7 grid grid-cols-3 gap-2">

        <div className="h-9 rounded-lg bg-[#f2f0eb]" />

        <div className="h-9 rounded-lg bg-[#f2f0eb]" />

        <div className="h-9 rounded-lg bg-[#f2f0eb]" />

      </div>

    </div>
  );
}


/* =========================================================
   LIVE PREVIEW
========================================================= */

function LivePreview({
  template,
  dark,
  accent,
  name,
  title,
}: {
  template: string;
  dark: boolean;
  accent: string;
  name: string;
  title: string;
}) {


  /* AURORA */

  if (
    template ===
    "aurora"
  ) {
    return (
      <AuroraPreview
        name={name}
        title={title}
        accent={accent}
      />
    );
  }


  /* ORBIT */

  if (
    template ===
    "orbit"
  ) {
    return (
      <OrbitPreview
        name={name}
        title={title}
        accent={accent}
      />
    );
  }


  const background =
    dark ||
    template ===
      "modern"
      ? "#252321"
      : template ===
        "creative"
      ? "#f5dce7"
      : "#f8f6f2";


  const foreground =
    dark ||
    template ===
      "modern"
      ? "#ffffff"
      : "#252321";


  return (
    <div
      className="min-h-[550px] p-5"
      style={{
        background,
        color: foreground,
      }}
    >

      {template ===
      "modern" ? (

        <ModernPreview
          name={name}
          title={title}
          accent={accent}
        />

      ) : template ===
        "creative" ? (

        <CreativePreview
          name={name}
          title={title}
          accent={accent}
        />

      ) : (

        <MinimalPreview
          name={name}
          title={title}
          accent={accent}
        />

      )}

    </div>
  );
}


/* =========================================================
   MODERN PREVIEW
========================================================= */

function ModernPreview({
  name,
  title,
  accent,
}: {
  name: string;
  title: string;
  accent: string;
}) {
  return (
    <>

      <div className="flex items-center justify-between">

        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold text-white"
          style={{
            backgroundColor:
              accent,
          }}
        >
          {name.charAt(0)}
        </div>


        <div className="flex gap-3 text-[9px] opacity-50">

          <span>Work</span>

          <span>About</span>

          <span>Contact</span>

        </div>

      </div>


      <div className="mt-24">

        <p
          className="text-[9px] font-semibold uppercase tracking-[0.2em]"
          style={{
            color:
              accent,
          }}
        >
          Developer / Creator
        </p>


        <h2 className="mt-3 max-w-[270px] text-[31px] font-semibold leading-[1.02] tracking-[-0.05em]">
          {name}
        </h2>


        <p className="mt-3 max-w-[230px] text-[11px] leading-5 opacity-50">
          {title}
        </p>


        <div className="mt-6 flex gap-2">

          <div
            className="rounded-lg px-3 py-2 text-[9px] font-semibold text-white"
            style={{
              backgroundColor:
                accent,
            }}
          >
            View work
          </div>


          <div className="rounded-lg border border-white/15 px-3 py-2 text-[9px] opacity-70">
            About me
          </div>

        </div>

      </div>


      <div className="mt-20 grid grid-cols-2 gap-2">

        <div className="h-24 rounded-xl bg-white/8" />

        <div className="h-24 rounded-xl bg-white/8" />

      </div>

    </>
  );
}


/* =========================================================
   MINIMAL PREVIEW
========================================================= */

function MinimalPreview({
  name,
  title,
  accent,
}: {
  name: string;
  title: string;
  accent: string;
}) {
  return (
    <>

      <div className="flex justify-between text-[9px] opacity-45">

        <span>
          {name}
        </span>


        <div className="flex gap-3">

          <span>
            Projects
          </span>

          <span>
            About
          </span>

        </div>

      </div>


      <div className="mt-28">

        <p
          className="text-[9px] font-semibold uppercase tracking-[0.2em]"
          style={{
            color:
              accent,
          }}
        >
          Portfolio
        </p>


        <h2 className="mt-3 text-[30px] font-semibold leading-none tracking-[-0.05em]">
          {name}
        </h2>


        <p className="mt-4 max-w-[250px] text-[11px] leading-5 opacity-50">
          {title}
        </p>

      </div>


      <div className="mt-24 grid grid-cols-2 gap-2">

        <div className="h-24 rounded-xl bg-black/5" />

        <div className="h-24 rounded-xl bg-black/5" />

      </div>

    </>
  );
}


/* =========================================================
   CREATIVE PREVIEW
========================================================= */

function CreativePreview({
  name,
  title,
  accent,
}: {
  name: string;
  title: string;
  accent: string;
}) {
  return (
    <>

      <div className="flex justify-between">

        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{
            backgroundColor:
              accent,
          }}
        >
          {name.charAt(0)}
        </div>


        <div className="text-[9px] opacity-50">
          MENU +
        </div>

      </div>


      <div className="mt-24">

        <p className="text-[11px] font-bold uppercase tracking-wider opacity-50">
          Hello, I'm
        </p>


        <h2 className="mt-2 text-[34px] font-bold leading-none tracking-[-0.06em]">
          {name}
        </h2>


        <p className="mt-4 max-w-[230px] text-[11px] leading-5 opacity-60">
          {title}
        </p>

      </div>


      <div className="mt-20 flex gap-2">

        <div
          className="h-20 flex-1 rounded-2xl"
          style={{
            backgroundColor:
              `${accent}30`,
          }}
        />

        <div className="h-20 w-20 rounded-2xl bg-black/8" />

      </div>

    </>
  );
}


/* =========================================================
   AURORA PREVIEW
========================================================= */

function AuroraPreview({
  name,
  title,
  accent,
}: {
  name: string;
  title: string;
  accent: string;
}) {
  return (
    <div className="relative min-h-[550px] overflow-hidden bg-[#080b18] p-5 text-white">

      {/* Animated gradient blobs */}

      <div className="absolute -left-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-purple-600/30 blur-3xl" />

      <div className="absolute -bottom-20 -right-20 h-64 w-64 animate-pulse rounded-full bg-pink-600/30 blur-3xl" />


      <div className="relative">

        <div className="flex justify-between">

          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold"
            style={{
              backgroundColor:
                accent,
            }}
          >
            {name.charAt(0)}
          </div>


          <span className="text-[9px] text-white/40">
            AVAILABLE
          </span>

        </div>


        <div className="mt-28">

          <p
            className="text-[9px] uppercase tracking-[0.25em]"
            style={{
              color:
                accent,
            }}
          >
            DIGITAL EXPERIENCE
          </p>


          <h2 className="mt-4 text-[38px] font-semibold leading-[0.95] tracking-[-0.06em]">
            {name}
          </h2>


          <p className="mt-5 max-w-[240px] text-[11px] leading-5 text-white/50">
            {title}
          </p>


          <div
            className="mt-7 inline-flex rounded-xl px-4 py-2 text-[10px] font-semibold"
            style={{
              backgroundColor:
                accent,
            }}
          >
            Explore work →
          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   ORBIT PREVIEW
========================================================= */

function OrbitPreview({
  name,
  title,
  accent,
}: {
  name: string;
  title: string;
  accent: string;
}) {
  return (
    <div className="relative min-h-[550px] overflow-hidden bg-[#06101e] p-5 text-white">

      {/* ORBIT */}

      <div className="absolute right-[-120px] top-[130px] h-[320px] w-[320px] rounded-full border border-blue-400/20" />

      <div className="absolute right-[-70px] top-[180px] h-[220px] w-[220px] rounded-full border border-purple-400/20" />

      <div className="absolute right-[65px] top-[280px] h-4 w-4 animate-pulse rounded-full bg-blue-400 shadow-xl shadow-blue-400/60" />


      <div className="relative">

        <div className="flex justify-between">

          <div className="text-xs font-semibold">
            {name}
          </div>


          <div className="text-[9px] text-white/40">
            2026
          </div>

        </div>


        <div className="mt-28">

          <p
            className="text-[9px] uppercase tracking-[0.25em]"
            style={{
              color:
                accent,
            }}
          >
            EXPLORING DIGITAL SPACE
          </p>


          <h2 className="mt-4 max-w-[250px] text-[38px] font-semibold leading-[0.95] tracking-[-0.06em]">
            {name}
          </h2>


          <p className="mt-5 max-w-[220px] text-[11px] leading-5 text-white/50">
            {title}
          </p>


          <div className="mt-8 flex gap-2">

            <div
              className="rounded-lg px-4 py-2 text-[10px] font-semibold"
              style={{
                backgroundColor:
                  accent,
              }}
            >
              View projects
            </div>


            <div className="rounded-lg border border-white/10 px-4 py-2 text-[10px] text-white/60">
              Contact
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   THEME OPTION
========================================================= */

function ThemeOption({
  active,
  icon,
  title,
  text,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"

      onClick={onClick}

      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
        active
          ? "border-[#e41159] bg-[#fff7fa] ring-4 ring-[#e41159]/5"
          : "border-black/10 hover:border-black/20"
      }`}
    >

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          active
            ? "bg-[#fde5ee] text-[#e41159]"
            : "bg-[#f6f3ee] text-black/45"
        }`}
      >
        {icon}
      </div>


      <div>

        <p className="text-sm font-semibold">
          {title}
        </p>


        <p className="mt-0.5 text-xs text-black/40">
          {text}
        </p>

      </div>


      {active && (
        <Check
          size={16}
          className="ml-auto text-[#e41159]"
        />
      )}

    </button>
  );
}