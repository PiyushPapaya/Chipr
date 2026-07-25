// src/components/landing/LandingCTA.tsx
"use client";
import { motion } from "framer-motion";
import { ArrowRightIcon, GithubIcon } from "@/components/icons";
import { riseIn } from "@/lib/motion/variants";

const REPO = "https://github.com/PiyushPapaya/RegForge";

export function LandingCTA({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-[var(--space-7)]">
      <motion.div
        variants={riseIn} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}
        className="panel-raised flex flex-col items-center gap-5 px-8 py-14 text-center"
        style={{ borderRadius: "var(--radius-lg)" }}
      >
        <h2 className="text-balance text-step-4 font-semibold tracking-tight">
          Bring a datasheet. Leave with a driver.
        </h2>
        <p className="max-w-md text-balance text-step-1 text-[var(--muted)]">
          Free to try with the Gemini demo path, no signup required.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onEnter}
            className="focusable group flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 font-medium text-white transition-transform hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(90deg, var(--accent), var(--accent-bright))",
              boxShadow: "0 0 0 1px rgba(108,99,255,0.4), 0 16px 32px -14px rgba(108,99,255,0.55)",
            }}
          >
            Open RegForge
            <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" style={{ fontSize: "1.05rem" }} />
          </button>
          <a href={REPO} target="_blank" rel="noopener noreferrer"
            className="focusable flex items-center gap-2 rounded-full border border-[var(--border-bright)] px-6 py-3 font-mono text-step--1 text-[var(--muted-strong)] transition-colors hover:text-[var(--text)]">
            <GithubIcon style={{ fontSize: "1rem" }} /> View source
          </a>
        </div>
      </motion.div>
    </section>
  );
}
