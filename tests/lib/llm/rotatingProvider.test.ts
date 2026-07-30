import { describe, it, expect, vi } from "vitest";
import { RotatingProvider } from "@/lib/llm/rotatingProvider";
import { KeyRotator } from "@/lib/llm/keyRotator";
import type { LLMProvider } from "@/lib/llm/types";

class RateLimitError extends Error {
  status = 429;
}

function fakeProvider(key: string, opts: { failOnce?: boolean } = {}): LLMProvider {
  let failed = false;
  return {
    name: "gemini",
    async extractFromPdf() {
      if (opts.failOnce && !failed) { failed = true; throw new RateLimitError("limited"); }
      return `pdf:${key}`;
    },
    async *extractFromPdfStream() {
      if (opts.failOnce && !failed) { failed = true; throw new RateLimitError("limited"); }
      yield `stream:${key}`;
    },
    async reasonText() {
      if (opts.failOnce && !failed) { failed = true; throw new RateLimitError("limited"); }
      return `text:${key}`;
    },
  };
}

describe("RotatingProvider", () => {
  it("delegates to the current key's provider on success", async () => {
    const rotator = new KeyRotator(["k1", "k2"]);
    const factory = vi.fn((key: string) => fakeProvider(key));
    const p = new RotatingProvider(rotator, factory);
    expect(await p.reasonText("x")).toBe("text:k1");
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it("rotates to the next key and retries once on a 429", async () => {
    const rotator = new KeyRotator(["k1", "k2"]);
    const factory = vi.fn((key: string) => fakeProvider(key, { failOnce: key === "k1" }));
    const p = new RotatingProvider(rotator, factory);
    expect(await p.reasonText("x")).toBe("text:k2");
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it("rethrows a 429 when there is only one key in the pool", async () => {
    const rotator = new KeyRotator(["only"]);
    const factory = vi.fn((key: string) => fakeProvider(key, { failOnce: true }));
    const p = new RotatingProvider(rotator, factory);
    await expect(p.reasonText("x")).rejects.toThrow("limited");
  });

  it("rethrows non-429 errors without rotating", async () => {
    const rotator = new KeyRotator(["k1", "k2"]);
    const factory = vi.fn((): LLMProvider => ({
      name: "gemini",
      extractFromPdf: async () => { throw new Error("boom"); },
      reasonText: async () => { throw new Error("boom"); },
    }));
    const p = new RotatingProvider(rotator, factory);
    await expect(p.reasonText("x")).rejects.toThrow("boom");
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it("rotates streaming calls on a 429", async () => {
    const rotator = new KeyRotator(["k1", "k2"]);
    const factory = vi.fn((key: string) => fakeProvider(key, { failOnce: key === "k1" }));
    const p = new RotatingProvider(rotator, factory);
    const chunks: string[] = [];
    for await (const chunk of p.extractFromPdfStream(Buffer.from("x"), "prompt")) chunks.push(chunk);
    expect(chunks).toEqual(["stream:k2"]);
  });
});
