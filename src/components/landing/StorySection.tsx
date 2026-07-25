// src/components/landing/StorySection.tsx
"use client";
import { motion } from "framer-motion";
import { staggerContainer, riseIn } from "@/lib/motion/variants";

export function StorySection({
  id, eyebrow, title, body, align = "left", children,
}: {
  id?: string; eyebrow: string; title: string; body: string;
  align?: "left" | "right"; children?: React.ReactNode;
}) {
  const reversed = align === "right";
  return (
    <motion.section
      id={id}
      variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}
      className="mx-auto max-w-6xl px-6 py-[var(--space-7)]"
    >
      <div className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reversed ? "lg:[direction:rtl]" : ""}`}>
        <div className={`flex flex-col gap-4 ${reversed ? "lg:[direction:ltr]" : ""}`}>
          <motion.p variants={riseIn} className="font-mono text-step--1 uppercase tracking-[0.25em] text-[var(--accent-bright)]">
            {eyebrow}
          </motion.p>
          <motion.h2 variants={riseIn} className="text-balance text-step-4 font-semibold tracking-tight">
            {title}
          </motion.h2>
          <motion.p variants={riseIn} className="max-w-lg text-balance text-step-1 text-[var(--muted)]">
            {body}
          </motion.p>
        </div>
        <motion.div variants={riseIn} className={reversed ? "lg:[direction:ltr]" : ""}>
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}
