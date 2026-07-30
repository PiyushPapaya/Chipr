import { describe, it, expect } from "vitest";
import { KeyRotator, parseKeys } from "@/lib/llm/keyRotator";

describe("parseKeys", () => {
  it("splits, trims, and drops empty entries", () => {
    expect(parseKeys(" key1 , key2,,key3 ")).toEqual(["key1", "key2", "key3"]);
  });
  it("returns a single-element array for one key", () => {
    expect(parseKeys("solo")).toEqual(["solo"]);
  });
});

describe("KeyRotator", () => {
  it("throws when constructed with no keys", () => {
    expect(() => new KeyRotator([])).toThrow();
  });
  it("starts at the first key", () => {
    const r = new KeyRotator(["a", "b", "c"]);
    expect(r.current()).toBe("a");
  });
  it("rotates forward and wraps around", () => {
    const r = new KeyRotator(["a", "b", "c"]);
    expect(r.rotate()).toBe("b");
    expect(r.current()).toBe("b");
    expect(r.rotate()).toBe("c");
    expect(r.rotate()).toBe("a");
  });
  it("reports pool size", () => {
    expect(new KeyRotator(["a", "b"]).size).toBe(2);
  });
});
