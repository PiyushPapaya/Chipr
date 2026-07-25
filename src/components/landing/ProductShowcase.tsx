// src/components/landing/ProductShowcase.tsx
"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion/reducedMotion";
import { FileTextIcon, ArrowRightIcon, ShieldCheckIcon } from "@/components/icons";

// A tiny, honest sample of the real pipeline: a datasheet page → the
// register map RegForge extracts from it → the C it deterministically
// generates. This is what the product does, not a decorative animation.
const ROWS = [
  { addr: "0x0F", name: "WHO_AM_I", page: 12, def: "WHO_AM_I 0x0F" },
  { addr: "0x7C", name: "PWR_CONF", page: 41, def: "PWR_CONF 0x7C" },
  { addr: "0x7D", name: "PWR_CTRL", page: 41, def: "PWR_CTRL 0x7D" },
];

function Stage({ index, label, children }: { index: number; label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2.5">
      <div className="flex items-center gap-2 font-mono text-step--1 text-[var(--muted)]">
        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[var(--border-bright)] text-[10px] text-[var(--muted-strong)]">
          {index}
        </span>
        {label}
      </div>
      {children}
    </div>
  );
}

export function ProductShowcase() {
  const reduced = useReducedMotion();
  const loop = reduced ? {} : { repeat: Infinity, repeatType: "reverse" as const, duration: 2.4, ease: "easeInOut" as const };

  return (
    <div
      className="panel-raised w-full overflow-hidden p-5 sm:p-6"
      style={{ borderRadius: "var(--radius-lg)" }}
      aria-hidden
    >
      <div className="mb-5 flex items-center justify-between gap-2 font-mono text-step--1 text-[var(--muted)]">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          BMI270.pdf → verified map → generated driver
        </span>
        <span className="hidden text-[var(--muted)] sm:inline">sample run</span>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-4">
        {/* Stage 1 — the datasheet */}
        <Stage index={1} label="Datasheet">
          <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-[calc(var(--radius-lg)-4px)] border border-[var(--border)] bg-[var(--panel)] px-4 py-6 text-center">
            <FileTextIcon className="text-[var(--muted-strong)]" style={{ fontSize: "1.5rem" }} />
            <span className="font-mono text-step--1 text-[var(--muted-strong)]">bmi270.pdf</span>
            <span className="font-mono text-[10px] text-[var(--muted)]">62 pages</span>
          </div>
        </Stage>

        <div className="hidden items-center justify-center text-[var(--border-bright)] sm:flex">
          <ArrowRightIcon style={{ fontSize: "1.1rem" }} />
        </div>

        {/* Stage 2 — extracted, verified register map */}
        <Stage index={2} label="Verified map">
          <div className="flex-1 space-y-1.5 font-mono text-step--1">
            {ROWS.map((r, i) => (
              <motion.div key={r.name}
                initial={reduced ? false : { opacity: 0.5 }}
                animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
                transition={reduced ? {} : { ...loop, delay: i * 0.25 }}
                className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] px-2.5 py-1.5">
                <span className="w-11 text-[var(--accent-bright)]">{r.addr}</span>
                <span className="truncate text-[var(--text)]">{r.name}</span>
                <span className="ml-auto shrink-0 text-[var(--link)]">p{r.page}</span>
              </motion.div>
            ))}
          </div>
        </Stage>

        <div className="hidden items-center justify-center text-[var(--border-bright)] sm:flex">
          <ArrowRightIcon style={{ fontSize: "1.1rem" }} />
        </div>

        {/* Stage 3 — deterministic C output */}
        <Stage index={3} label="Generated C">
          <div className="flex-1 space-y-1 overflow-hidden rounded-[calc(var(--radius-lg)-4px)] border border-[var(--border)] bg-[var(--panel)] p-2.5 font-mono text-[11px] leading-relaxed">
            {ROWS.map((r, i) => (
              <motion.div key={r.def}
                initial={reduced ? false : { opacity: 0, x: -6 }}
                animate={reduced ? {} : { opacity: [0, 1, 1, 0], x: [-6, 0, 0, -6] }}
                transition={reduced ? {} : { repeat: Infinity, duration: 4.6, times: [0, 0.2, 0.85, 1], delay: 0.6 + i * 0.3 }}
                className="truncate text-[var(--text)]">
                <span className="text-[var(--accent-bright)]">#define </span>
                <span className="text-[var(--muted-strong)]">{r.def}</span>
              </motion.div>
            ))}
          </div>
        </Stage>
      </div>

      <div className="mt-5 flex items-start gap-2 border-t border-[var(--border)] pt-4 text-step--1 text-[var(--muted)]">
        <ShieldCheckIcon className="mt-0.5 shrink-0 text-[var(--accent)]" style={{ fontSize: "1rem" }} />
        <span>Every register is cited to its page. The C is built from deterministic templates, never written by the model.</span>
      </div>
    </div>
  );
}
