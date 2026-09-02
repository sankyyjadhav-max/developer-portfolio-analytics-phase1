"use client";

import Link from "next/link";
import { Code2 } from "lucide-react";

export default function BrandLogo({
  href = "/",
  dark = false,
}: {
  href?: string;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3"
    >
      <div
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-xl
          bg-[#E41159]
          text-white
          shadow-sm
          transition-all duration-200
          group-hover:-translate-y-0.5
          group-hover:shadow-[0_8px_20px_rgba(228,17,89,0.22)]
        "
      >
        <Code2
          size={20}
          strokeWidth={2.5}
        />
      </div>

      <div className="leading-none">
        <div
          className={`text-[15px] font-semibold tracking-[-0.02em] ${
            dark ? "text-white" : "text-[#171717]"
          }`}
        >
          Portfolio
        </div>

        <div
          className={`mt-1 text-[10px] font-medium ${
            dark ? "text-white/45" : "text-[#8A8580]"
          }`}
        >
          Creator workspace
        </div>
      </div>
    </Link>
  );
}