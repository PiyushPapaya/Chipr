// src/components/landing/TrustSection.tsx
"use client";
import { motion } from "framer-motion";
import { staggerContainer, riseIn } from "@/lib/motion/variants";
import { ShieldCheckIcon } from "@/components/icons";

const STATS = [
  { value: "50+", label: "unit tests covering schema, sanitization, and codegen" },
  { value: "3", label: "providers behind one interface: Anthropic, OpenAI, Gemini" },
  { value: "0", label: "lines of generated C written by the model itself" },
];

export function TrustSection() {
  return (
    <motion.section
      id="trust"
      variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}
      className="mx-auto max-w-6xl px-6 py-[var(--space-7)]"
    >
      <motion.div variants={riseIn} className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-step--1 uppercase tracking-[0.25em] text-[var(--accent-bright)]">Why trust it</p>
        <h2 className="mt-3 text-balance text-step-4 font-semibold tracking-tight">
          The model reads. It never writes the driver.
        </h2>
        <p className="mt-3 text-balance text-step-1 text-[var(--muted)]">
          RegForge confines the LLM to one job: turning a datasheet into a validated data
          structure. Everything downstream is deterministic, tested, and cited back to its source.
        </p>
      </motion.div>

      <motion.div variants={riseIn} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="panel p-6 text-center">
            <div className="text-step-4 font-semibold text-[var(--accent-bright)]">{s.value}</div>
            <div className="mt-2 text-step--1 text-[var(--muted)]">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.p variants={riseIn} className="mx-auto mt-8 flex max-w-md items-start justify-center gap-2 text-center text-step--1 text-[var(--muted)]">
        <ShieldCheckIcon className="mt-0.5 shrink-0 text-[var(--accent)]" style={{ fontSize: "1rem" }} />
        <span>Bring your own API key, never stored or logged, sent only with your own request.</span>
      </motion.p>
    </motion.section>
  );
}
