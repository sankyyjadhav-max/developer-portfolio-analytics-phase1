"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Lock,
  Mail,
  Save,
  User,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        const current = result?.data || result?.user;

        setUser(current);
        setName(current?.name || "");
        setEmail(current?.email || "");
      }
    } catch {
      // Ignore.
    }
  }

  async function saveProfile() {
    setSaving(true);
    setMessage("");

    try {
      // Keep this endpoint adaptable to the current backend.
      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Profile update endpoint is unavailable.");
      }

      setMessage("Profile updated successfully.");
      await loadUser();
    } catch (error: any) {
      setMessage(error.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  }

  async function changePassword() {
    if (!password || !newPassword) {
      setMessage("Enter your current and new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/auth/change-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: password,
          newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Unable to change password."
        );
      }

      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Password changed successfully.");
    } catch (error: any) {
      setMessage(error.message || "Unable to change password.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-[#e41159]">
          Account
        </p>

        <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          Settings
        </h1>

        <p className="mt-2 text-sm text-black/45">
          Manage your account details and security.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f6f3ee]">
                <User size={18} />
              </div>

              <div>
                <h2 className="font-semibold">Profile information</h2>
                <p className="text-xs text-black/40">
                  Basic information associated with your account.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <Field
                label="Name"
                icon={<User size={16} />}
                value={name}
                onChange={setName}
              />

              <Field
                label="Email"
                icon={<Mail size={16} />}
                value={email}
                onChange={setEmail}
                type="email"
              />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-black/8 pt-5">
              <span className="text-sm text-black/45">
                {message}
              </span>

              <button
                onClick={saveProfile}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-[#252321] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                <Save size={16} />
                Save profile
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f6f3ee]">
                <Lock size={18} />
              </div>

              <div>
                <h2 className="font-semibold">Password</h2>
                <p className="text-xs text-black/40">
                  Update your account password.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <Field
                label="Current password"
                value={password}
                onChange={setPassword}
                type="password"
              />

              <Field
                label="New password"
                value={newPassword}
                onChange={setNewPassword}
                type="password"
              />

              <Field
                label="Confirm new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                type="password"
              />
            </div>

            <button
              onClick={changePassword}
              disabled={saving}
              className="mt-6 rounded-xl bg-[#252321] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              Update password
            </button>
          </section>
        </div>

        <aside className="h-fit">
          <div className="rounded-3xl bg-[#252321] p-6 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <User size={18} />
            </div>

            <h2 className="mt-6 text-xl font-semibold tracking-tight">
              Your account
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/45">
              Keep your account information current so your portfolio
              workspace stays organized.
            </p>

            {user && (
              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="text-xs text-white/35">
                  Signed in as
                </p>

                <p className="mt-1 truncate text-sm font-medium">
                  {user.email}
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/25">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-2xl border border-black/10 bg-[#faf9f7] px-4 py-3 text-sm outline-none transition focus:border-[#e41159] focus:bg-white focus:ring-4 focus:ring-[#e41159]/8 ${
            icon ? "pl-11" : ""
          }`}
        />
      </div>
    </div>
  );
}