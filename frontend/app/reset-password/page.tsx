"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input, Button } from "../../components/ui";
import { api } from "../../lib/api";

function ResetPasswordForm() {
  const q = useSearchParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setErr("");

    if (password !== confirm) {
      setErr("Passwords do not match");
      return;
    }

    setBusy(true);

    try {
      await api("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token: q.get("token"),
          password,
        }),
      });

      router.push("/login");
    } catch (e: any) {
      setErr(e.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="w-full max-w-sm">
        <Link href="/login" className="text-sm">
          ← Back to sign in
        </Link>

        <h1 className="mt-10 text-3xl font-semibold">
          Choose a new password
        </h1>

        <form onSubmit={submit} className="mt-8 grid gap-5">
          <Input
            label="New password"
            type="password"
            minLength={8}
            required
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />

          <Input
            label="Confirm password"
            type="password"
            minLength={8}
            required
            value={confirm}
            onChange={(e: any) => setConfirm(e.target.value)}
          />

          {err && (
            <p className="text-sm text-red-600">{err}</p>
          )}

          <Button disabled={busy}>
            {busy ? "Updating…" : "Update password"}
          </Button>
        </form>
      </div>
    </main>
  );
}

export default function Reset() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center">
          Loading...
        </main>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}