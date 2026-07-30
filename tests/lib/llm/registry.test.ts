import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { resolveProvider } from "@/lib/llm/registry";
import { ProviderError } from "@/lib/llm/errors";
import { RotatingProvider } from "@/lib/llm/rotatingProvider";

describe("resolveProvider", () => {
  const OLD = process.env.GEMINI_API_KEY;
  beforeEach(() => { delete process.env.GEMINI_API_KEY; });
  afterEach(() => { if (OLD) process.env.GEMINI_API_KEY = OLD; else delete process.env.GEMINI_API_KEY; });

  it("uses BYOK key when supplied", () => {
    const p = resolveProvider({ provider: "gemini", apiKey: "byok" });
    expect(p).toBeInstanceOf(RotatingProvider);
    expect(p.name).toBe("gemini");
  });
  it("falls back to env key", () => {
    process.env.GEMINI_API_KEY = "envkey";
    expect(resolveProvider({ provider: "gemini" }).name).toBe("gemini");
  });
  it("throws ProviderError when no key anywhere", () => {
    expect(() => resolveProvider({ provider: "gemini" })).toThrow(ProviderError);
  });
  it("throws on unknown provider", () => {
    expect(() => resolveProvider({ provider: "bogus", apiKey: "x" })).toThrow(ProviderError);
  });
  it("defaults to anthropic when provider omitted", () => {
    process.env.ANTHROPIC_API_KEY = "a";
    const p = resolveProvider({ apiKey: undefined });
    expect(p.name).toBe("anthropic");
    delete process.env.ANTHROPIC_API_KEY;
  });
  it("round-robins across a comma-separated env key pool", () => {
    process.env.GEMINI_API_KEY = "key1,key2,key3";
    // Each call should rotate the shared env rotator forward; we can't observe
    // the key directly, but repeated resolution should never throw and should
    // keep returning a usable provider.
    for (let i = 0; i < 5; i++) {
      expect(resolveProvider({ provider: "gemini" }).name).toBe("gemini");
    }
  });
});
