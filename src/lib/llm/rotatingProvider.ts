import type { LLMProvider, ProviderName } from "@/lib/llm/types";
import type { KeyRotator } from "@/lib/llm/keyRotator";

function isRateLimited(err: unknown): boolean {
  const status = (err as { status?: number } | undefined)?.status;
  return status === 429;
}

/**
 * Wraps a provider factory with a key pool: on a 429 from the active key it
 * rotates to the next one in the pool and retries the call exactly once.
 */
export class RotatingProvider implements LLMProvider {
  name: ProviderName;
  private active: LLMProvider;

  constructor(private rotator: KeyRotator, private factory: (key: string) => LLMProvider) {
    this.active = factory(rotator.current());
    this.name = this.active.name;
  }

  private async withRetry<T>(run: (p: LLMProvider) => Promise<T>): Promise<T> {
    try {
      return await run(this.active);
    } catch (err) {
      if (!isRateLimited(err) || this.rotator.size < 2) throw err;
      this.active = this.factory(this.rotator.rotate());
      return run(this.active);
    }
  }

  extractFromPdf(pdf: Buffer, prompt: string): Promise<string> {
    return this.withRetry((p) => p.extractFromPdf(pdf, prompt));
  }

  async *extractFromPdfStream(pdf: Buffer, prompt: string): AsyncIterable<string> {
    const provider = this.active;
    if (!provider.extractFromPdfStream) {
      yield await this.withRetry((p) => p.extractFromPdf(pdf, prompt));
      return;
    }
    try {
      yield* provider.extractFromPdfStream(pdf, prompt);
    } catch (err) {
      if (!isRateLimited(err) || this.rotator.size < 2) throw err;
      this.active = this.factory(this.rotator.rotate());
      yield* this.active.extractFromPdfStream!(pdf, prompt);
    }
  }

  reasonText(prompt: string): Promise<string> {
    return this.withRetry((p) => p.reasonText(prompt));
  }
}
