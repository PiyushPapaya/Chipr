/** Splits a comma-separated env/BYOK value into individual trimmed keys. */
export function parseKeys(raw: string): string[] {
  return raw.split(",").map((k) => k.trim()).filter(Boolean);
}

/** Round-robins a fixed pool of API keys for one provider. */
export class KeyRotator {
  private index = 0;
  constructor(private readonly keys: string[]) {
    if (keys.length === 0) throw new Error("KeyRotator requires at least one key");
  }

  get size(): number {
    return this.keys.length;
  }

  current(): string {
    return this.keys[this.index];
  }

  /** Advances to the next key in the pool and returns it. */
  rotate(): string {
    this.index = (this.index + 1) % this.keys.length;
    return this.current();
  }
}
