// src/components/landing/LandingHero.tsx
"use client";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/icons";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { staggerContainer, riseIn } from "@/lib/motion/variants";

export function LandingHero({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.section
      variants={staggerContainer} initial="hidden" animate="show"
      className="mx-auto max-w-6xl px-6 pt-[8vh] pb-[10vh] sm:pt-[12vh]"
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <motion.p variants={riseIn} className="font-mono text-step--1 uppercase tracking-[0.3em] text-[var(--muted)]">
          For embedded engineers
        </motion.p>
        <motion.h1 variants={riseIn} className="max-w-3xl text-balance text-step-6 font-semibold tracking-tight">
          Read the datasheet <span className="text-[var(--accent-bright)]">so you don&apos;t have to</span>.
        </motion.h1>
        <motion.p variants={riseIn} className="max-w-xl text-balance text-step-2 text-[var(--muted)]">
          Drop a sensor datasheet. Chipr extracts a verified register map, you check it,
          and it generates a cited, working C driver that&apos;s never hallucinated.
        </motion.p>
        <motion.div variants={riseIn} className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onEnter}
            className="focusable group flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 font-medium text-white transition-transform hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(90deg, var(--accent), var(--accent-bright))",
              boxShadow: "0 0 0 1px rgba(108,99,255,0.4), 0 16px 32px -14px rgba(108,99,255,0.55)",
            }}
          >
            Try it on a datasheet
            <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" style={{ fontSize: "1.05rem" }} />
          </button>
          <a
            href="#how-it-works"
            className="focusable rounded-full border border-[var(--border-bright)] px-6 py-3 font-mono text-step--1 text-[var(--muted-strong)] transition-colors hover:text-[var(--text)]"
          >
            See how it works
          </a>
        </motion.div>
      </div>

      <motion.div variants={riseIn} className="mx-auto mt-14 max-w-3xl">
        <ProductShowcase />
      </motion.div>
    </motion.section>
  );
}
