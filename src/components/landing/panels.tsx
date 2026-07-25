// src/components/landing/panels.tsx
// Small supporting visuals for each landing story section — not decoration,
// each one explains the beat it sits beside.
"use client";
import { FileTextIcon, AlertIcon, UploadIcon, ListIcon, CodeIcon, ShieldCheckIcon } from "@/components/icons";

export function ProblemPanel() {
  return (
    <div className="panel-recessed p-5" style={{ borderRadius: "var(--radius-lg)" }}>
      <div className="flex items-center gap-2 font-mono text-step--1 text-[var(--muted)]">
        <FileTextIcon style={{ fontSize: "1rem" }} /> bmi270-datasheet.pdf · 62 pages
      </div>
      <div className="mt-4 space-y-2.5">
        {["Register map buried in table 4.7 (p. 41–56)", "Bitfield resets scattered across 3 sections", "Init sequence described in prose, not steps"].map((t) => (
          <div key={t} className="flex items-start gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-step--1 text-[var(--muted-strong)]">
            <AlertIcon className="mt-0.5 shrink-0 text-[var(--warn)]" style={{ fontSize: "0.95rem" }} />
            {t}
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono text-step--1 text-[var(--muted)]">Hours of manual cross-referencing, per chip.</p>
    </div>
  );
}

export function WorkflowPanel() {
  const steps = [
    { icon: UploadIcon, label: "Upload", detail: "Drop the PDF" },
    { icon: ListIcon, label: "Extract", detail: "Streamed, page by page" },
    { icon: ShieldCheckIcon, label: "Verify", detail: "You correct the map" },
    { icon: CodeIcon, label: "Generate", detail: "Deterministic C output" },
  ];
  return (
    <div className="panel-raised p-5" style={{ borderRadius: "var(--radius-lg)" }}>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={s.label} className="flex items-center gap-3.5 rounded-lg border border-[var(--border)] bg-[var(--panel-2)] px-3.5 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-bright)] bg-[var(--bg)] text-[var(--accent-bright)]">
              <s.icon style={{ fontSize: "1rem" }} />
            </span>
            <div className="min-w-0">
              <div className="text-step-0 text-[var(--text)]">{s.label}</div>
              <div className="truncate font-mono text-step--1 text-[var(--muted)]">{s.detail}</div>
            </div>
            <span className="ml-auto shrink-0 font-mono text-step--1 text-[var(--muted)]">{i + 1}/4</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function TechAdvantagePanel() {
  const rows = [
    { label: "Model output", value: "Register map JSON only" },
    { label: "Validation", value: "Strict Zod schema" },
    { label: "Code generation", value: "Pure template functions" },
    { label: "Citations", value: "Every field → datasheet page" },
  ];
  return (
    <div className="panel-recessed overflow-hidden" style={{ borderRadius: "var(--radius-lg)" }}>
      <div className="border-b border-[var(--border)] px-4 py-3 font-mono text-step--1 text-[var(--muted)]">
        the trust boundary
      </div>
      <dl className="divide-y divide-[var(--border)]">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-4 px-4 py-3">
            <dt className="font-mono text-step--1 text-[var(--muted)]">{r.label}</dt>
            <dd className="text-right text-step--1 text-[var(--text)]">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
