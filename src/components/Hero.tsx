// src/components/Hero.tsx
"use client";
import { motion } from "framer-motion";
import { DropTarget } from "@/components/DropTarget";
import { ExtractProgress } from "@/components/ExtractProgress";
import { ExampleChips } from "@/components/ExampleChips";
import { ShieldCheckIcon } from "@/components/icons";
import { staggerContainer, riseIn } from "@/lib/motion/variants";
import type { RegisterMap } from "@/lib/schema/registerMap";
import type { ExtractPhase } from "@/app/page";

export function Hero({ busy, status, extractPhase, registersFound, onFile, onLoadExample }: {
  busy: boolean; status: string; extractPhase: ExtractPhase; registersFound: number;
  onFile: (f: File) => void; onLoadExample: (m: RegisterMap) => void;
}) {
  return (
    <motion.section
      variants={staggerContainer} initial="hidden" animate="show"
      className="mx-auto flex max-w-2xl flex-col items-center gap-[var(--space-5)] px-6 pt-[9vh] text-center lg:pt-[13vh]"
    >
      <motion.p variants={riseIn} className="font-mono text-step--1 uppercase tracking-[0.3em] text-[var(--muted)]">
        Datasheet → C Driver
      </motion.p>
      <motion.h1 variants={riseIn} className="max-w-xl text-balance text-step-4 font-semibold tracking-tight">
        Drop a datasheet to begin.
      </motion.h1>
      <motion.div variants={riseIn} className="w-full">
        <div className="flex justify-center">
          {busy
            ? <ExtractProgress phase={extractPhase} registersFound={registersFound} status={status} />
            : <DropTarget onFile={onFile} busy={busy} status={status} />}
        </div>
      </motion.div>
      <motion.div variants={riseIn}><ExampleChips onLoad={onLoadExample} /></motion.div>
      <motion.p variants={riseIn} className="flex max-w-md items-start gap-2 text-step--1 text-[var(--muted)]">
        <ShieldCheckIcon className="mt-0.5 shrink-0 text-[var(--accent)]" style={{ fontSize: "1rem" }} />
        <span>You verify the extracted register map before anything is generated. Code is built from
        deterministic templates and every line cites its datasheet page.</span>
      </motion.p>
    </motion.section>
  );
}
