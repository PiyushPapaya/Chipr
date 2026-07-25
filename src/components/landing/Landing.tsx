// src/components/landing/Landing.tsx
"use client";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { StorySection } from "@/components/landing/StorySection";
import { ProblemPanel, WorkflowPanel, TechAdvantagePanel } from "@/components/landing/panels";
import { TrustSection } from "@/components/landing/TrustSection";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { SiteFooter } from "@/components/SiteFooter";

export function Landing({ onEnter }: { onEnter: () => void }) {
  return (
    <div>
      <LandingHeader onEnter={onEnter} />
      <LandingHero onEnter={onEnter} />

      <StorySection
        eyebrow="The problem"
        title="Sensor datasheets weren't written for code."
        body="Register maps sit in dense tables, bitfields are scattered across sections, and the init sequence is buried in prose. Every new chip means hours of manual cross-referencing before a single line of driver code exists."
      >
        <ProblemPanel />
      </StorySection>

      <StorySection
        align="right"
        eyebrow="How it works"
        id="how-it-works"
        title="Four steps, one trust checkpoint."
        body="Drop the PDF and RegForge streams the extraction live. You verify the register map, the one point a human checks the model's work, then generate a header, driver, and cited init sequence in one pass."
      >
        <WorkflowPanel />
      </StorySection>

      <StorySection
        eyebrow="Technical advantage"
        title="The model reads. Templates write."
        body="The LLM is confined to producing a register map, validated against a strict schema. All C output comes from pure, deterministic template functions, so it's reproducible, testable, and can't invent a register that isn't there."
      >
        <TechAdvantagePanel />
      </StorySection>

      <TrustSection />
      <LandingCTA onEnter={onEnter} />
      <SiteFooter />
    </div>
  );
}
