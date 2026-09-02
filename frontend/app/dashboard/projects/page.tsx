"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Pencil,
  Plus,
  Trash2,
  X,
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

const emptyProject = {
  title: "",
  description: "",
  image: "",
  technologies: "",
  githubUrl: "",
  liveDemoUrl: "",
  featured: false,
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const response = await fetch(`${API_URL}/api/projects`, {
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setProjects(result?.data || result?.projects || []);
      }
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyProject);
    setModal(true);
  }

  function openEdit(project: Project) {
    setEditing(project);

    setForm({
      title: project.title || "",
      description: project.description || "",
      image: project.image || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
      githubUrl: project.githubUrl || "",
      liveDemoUrl: project.liveDemoUrl || "",
      featured: Boolean(project.featured),
    });

    setModal(true);
  }

  async function saveProject() {
    if (!form.title.trim() || !form.description.trim()) return;

    setSaving(true);

    const payload = {
      title: form.title,
      description: form.description,
      image: form.image || null,
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      githubUrl: form.githubUrl || null,
      liveDemoUrl: form.liveDemoUrl || null,
      featured: form.featured,
    };

    try {
      const url = editing
        ? `${API_URL}/api/projects/${editing.id}`
        : `${API_URL}/api/projects`;

      const response = await fetch(url, {
        method: editing ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result?.message || "Unable to save project");
      }

      setModal(false);
      await loadProjects();
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;

    const response = await fetch(`${API_URL}/api/projects/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      setProjects((current) =>
        current.filter((project) => project.id !== id)
      );
    }
  }

  return (
    <div>
      <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-[#e41159]">
            Portfolio
          </p>

          <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Projects
          </h1>

          <p className="mt-2 text-sm text-black/45">
            Showcase the work that best represents your skills.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e41159] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#cf0f50]"
        >
          <Plus size={17} />
          Add project
        </button>
      </header>

      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[280px] animate-pulse rounded-3xl bg-white"
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-black/15 bg-white p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6f3ee]">
            <Plus size={22} className="text-black/40" />
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            Start building your work collection
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/45">
            Add projects, technologies and links so visitors can understand
            what you actually build.
          </p>

          <button
            onClick={openCreate}
            className="mt-6 rounded-xl bg-[#252321] px-5 py-3 text-sm font-semibold text-white"
          >
            Add your first project
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-3xl border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)]"
            >
              <div className="flex h-40 items-center justify-center bg-[#eeebe5]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-5xl font-semibold text-black/10">
                    {project.title.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold tracking-tight">
                        {project.title}
                      </h2>

                      {project.featured && (
                        <span className="rounded-full bg-[#fde6ef] px-2 py-1 text-[10px] font-semibold text-[#c50e4c]">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-2 line-clamp-3 text-sm leading-5 text-black/45">
                      {project.description}
                    </p>
                  </div>
                </div>

                {project.technologies &&
                  project.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg bg-[#f6f3ee] px-2.5 py-1 text-[11px] font-medium text-black/55"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                <div className="mt-5 flex items-center justify-between border-t border-black/8 pt-4">
                  <div className="flex gap-1">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg p-2 text-black/35 hover:bg-[#f6f3ee] hover:text-black"
                      >
                        <Github size={16} />
                      </a>
                    )}

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg p-2 text-black/35 hover:bg-[#f6f3ee] hover:text-black"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => openEdit(project)}
                      className="rounded-lg p-2 text-black/35 hover:bg-[#f6f3ee] hover:text-black"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => deleteProject(project.id)}
                      className="rounded-lg p-2 text-black/35 hover:bg-[#fde8ed] hover:text-[#d20d4e]"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-black/8 bg-white px-6 py-5">
              <div>
                <h2 className="font-semibold">
                  {editing ? "Edit project" : "Add project"}
                </h2>
                <p className="mt-1 text-xs text-black/40">
                  Keep the information concise and useful.
                </p>
              </div>

              <button
                onClick={() => setModal(false)}
                className="rounded-xl p-2 hover:bg-[#f6f3ee]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <Field
                label="Project title"
                value={form.title}
                onChange={(value) =>
                  setForm({ ...form, title: value })
                }
              />

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-2xl border border-black/10 bg-[#faf9f7] px-4 py-3 text-sm outline-none focus:border-[#e41159]"
                />
              </div>

              <Field
                label="Image URL"
                value={form.image}
                onChange={(value) =>
                  setForm({ ...form, image: value })
                }
              />

              <Field
                label="Technologies"
                value={form.technologies}
                onChange={(value) =>
                  setForm({
                    ...form,
                    technologies: value,
                  })
                }
                placeholder="React, Node.js, PostgreSQL"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="GitHub URL"
                  value={form.githubUrl}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      githubUrl: value,
                    })
                  }
                />

                <Field
                  label="Live demo URL"
                  value={form.liveDemoUrl}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      liveDemoUrl: value,
                    })
                  }
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/10 bg-[#faf9f7] p-4">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      featured: e.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-[#e41159]"
                />

                <div>
                  <p className="text-sm font-medium">
                    Feature this project
                  </p>
                  <p className="mt-0.5 text-xs text-black/40">
                    Highlight it on your public portfolio.
                  </p>
                </div>
              </label>

              <button
                onClick={saveProject}
                disabled={saving}
                className="w-full rounded-xl bg-[#252321] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editing
                  ? "Save changes"
                  : "Create project"}
              </button>
            </div>
          </div>
        </div>
      )}
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
        className="w-full rounded-2xl border border-black/10 bg-[#faf9f7] px-4 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-[#e41159] focus:bg-white"
      />
    </div>
  );
}