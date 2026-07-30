// src/components/landing/LandingHeader.tsx
"use client";
import { GithubIcon } from "@/components/icons";

const REPO = "https://github.com/PiyushPapaya/Chipr";

export function LandingHeader({ onEnter }: { onEnter: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-transparent px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="" width={22} height={22} className="rounded-[5px]" />
          <span className="font-mono text-step-1 font-semibold tracking-tight text-[var(--text)]">
            Reg<span className="text-[var(--accent-bright)]">Forge</span>
          </span>
        </div>
        <nav className="hidden items-center gap-7 font-mono text-step--1 text-[var(--muted)] sm:flex">
          <a href="#how-it-works" className="focusable rounded transition-colors hover:text-[var(--text)]">How it works</a>
          <a href="#trust" className="focusable rounded transition-colors hover:text-[var(--text)]">Trust model</a>
          <a href={REPO} target="_blank" rel="noopener noreferrer"
            className="focusable flex items-center gap-1.5 rounded transition-colors hover:text-[var(--text)]">
            <GithubIcon style={{ fontSize: "1rem" }} /> Source
          </a>
        </nav>
        <button
          onClick={onEnter}
          className="focusable cursor-pointer rounded-full border border-[var(--border-bright)] bg-[var(--panel)] px-4 py-2 font-mono text-step--1 text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-bright)]"
        >
          Open app →
        </button>
      </div>
    </header>
  );
}
