// src/components/ProviderControl.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROVIDER_NAMES, type ProviderName } from "@/lib/llm/types";
import { SlidersIcon, ChevronRightIcon } from "@/components/icons";

const LABEL: Record<ProviderName, string> = { anthropic: "Anthropic", openai: "OpenAI (paid)", gemini: "Gemini (free)" };

export function ProviderControl({
  provider, apiKey, onProvider, onKey,
}: {
  provider: ProviderName; apiKey: string;
  onProvider: (p: ProviderName) => void; onKey: (k: string) => void;
}) {
  // Only one popover open at a time — the provider listbox and the settings dialog share this.
  const [openMenu, setOpenMenu] = useState<"provider" | "settings" | null>(null);
  const [activeIdx, setActiveIdx] = useState(() => PROVIDER_NAMES.indexOf(provider));
  const ref = useRef<HTMLDivElement>(null);
  const providerTriggerRef = useRef<HTMLButtonElement>(null);
  const settingsTriggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    function onClick(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpenMenu(null); }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Move focus into whichever popover opened.
  useEffect(() => {
    if (openMenu === "settings") inputRef.current?.focus();
  }, [openMenu]);

  // Focus follows the active option once it's known (fires on open and on arrow-key moves).
  useEffect(() => {
    if (openMenu === "provider") optionRefs.current[PROVIDER_NAMES[activeIdx]]?.focus();
  }, [activeIdx, openMenu]);

  function selectProvider(p: ProviderName) {
    onProvider(p);
    setOpenMenu(null);
    providerTriggerRef.current?.focus();
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    const last = PROVIDER_NAMES.length - 1;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, last)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Home") { e.preventDefault(); setActiveIdx(0); }
    else if (e.key === "End") { e.preventDefault(); setActiveIdx(last); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectProvider(PROVIDER_NAMES[activeIdx]); }
    else if (e.key === "Escape") { e.preventDefault(); setOpenMenu(null); providerTriggerRef.current?.focus(); }
  }

  return (
    <div ref={ref} className="relative flex items-center gap-2 font-mono text-step--1"
      onKeyDown={(e) => { if (e.key === "Escape" && openMenu) { e.stopPropagation(); setOpenMenu(null); } }}>
      <div className="relative">
        <button
          ref={providerTriggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={openMenu === "provider"}
          onClick={() => {
            setActiveIdx(PROVIDER_NAMES.indexOf(provider));
            setOpenMenu((m) => (m === "provider" ? null : "provider"));
          }}
          className="focusable panel flex cursor-pointer items-center gap-2 px-2 py-1.5 text-[var(--text)] transition-colors hover:border-[var(--border-bright)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
          {LABEL[provider]}
          <ChevronRightIcon
            aria-hidden
            className={`text-[var(--muted)] transition-transform ${openMenu === "provider" ? "-rotate-90" : "rotate-90"}`}
            style={{ fontSize: "0.85rem" }}
          />
        </button>
        <AnimatePresence>
          {openMenu === "provider" && (
            <motion.div
              role="listbox"
              aria-label="LLM provider"
              tabIndex={-1}
              onKeyDown={onListKeyDown}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="panel absolute left-0 top-11 z-20 w-48 overflow-hidden p-1"
              style={{ borderRadius: "var(--radius-lg)" }}
            >
              {PROVIDER_NAMES.map((p, i) => (
                <div
                  key={p}
                  ref={(el) => { optionRefs.current[p] = el; }}
                  role="option"
                  aria-selected={p === provider}
                  tabIndex={i === activeIdx ? 0 : -1}
                  onClick={() => selectProvider(p)}
                  onMouseEnter={() => setActiveIdx(i)}
                  className={`focusable flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors ${
                    p === provider ? "bg-[var(--panel-2)] text-[var(--text)]" : "text-[var(--muted)] hover:bg-[var(--panel-2)] hover:text-[var(--text)]"
                  }`}
                >
                  {LABEL[p]}
                  {p === provider && <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        ref={settingsTriggerRef}
        className="focusable panel flex cursor-pointer items-center px-2 py-1.5 text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        onClick={() => setOpenMenu((m) => (m === "settings" ? null : "settings"))}
        aria-haspopup="dialog"
        aria-expanded={openMenu === "settings"}
        aria-label="API key settings"
      ><SlidersIcon style={{ fontSize: "0.95rem" }} /></button>
      <AnimatePresence>
        {openMenu === "settings" && (
          <motion.div
            role="dialog" aria-modal="false" aria-label="API key settings"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="panel absolute right-0 top-11 z-20 w-72 p-3"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            <label htmlFor="api-key-input" className="mb-1 block text-[var(--muted)]">Your {LABEL[provider]} API key (optional)</label>
            <input
              id="api-key-input" ref={inputRef}
              type="password" value={apiKey} onChange={(e) => onKey(e.target.value)}
              placeholder="Leave blank to use server default"
              className="focusable w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-2 py-1.5 text-[var(--text)] outline-none"
            />
            <p className="mt-2 text-[var(--muted)]">Never stored, sent only with your request.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
