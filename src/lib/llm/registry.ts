import { PROVIDER_ENV, PROVIDER_NAMES, type LLMProvider, type ProviderName } from "@/lib/llm/types";
import { ProviderError } from "@/lib/llm/errors";
import { AnthropicProvider } from "@/lib/llm/anthropic";
import { OpenAIProvider } from "@/lib/llm/openai";
import { GeminiProvider } from "@/lib/llm/gemini";
import { KeyRotator, parseKeys } from "@/lib/llm/keyRotator";
import { RotatingProvider } from "@/lib/llm/rotatingProvider";

export interface ProviderRequest {
  provider?: string;        // raw from request; validated at runtime by the guard
  apiKey?: string;          // optional BYOK — may itself be a comma-separated list of keys
}

function isProviderName(x: unknown): x is ProviderName {
  return typeof x === "string" && (PROVIDER_NAMES as readonly string[]).includes(x);
}

function makeProvider(name: ProviderName, key: string): LLMProvider {
  switch (name) {
    case "anthropic": return new AnthropicProvider(key);
    case "openai": return new OpenAIProvider(key);
    case "gemini": return new GeminiProvider(key);
  }
}

// Cached per provider so the round-robin position survives across requests in
// this process, instead of every request restarting at the pool's first key.
const envRotators = new Map<ProviderName, { raw: string; rotator: KeyRotator }>();

function getEnvRotator(name: ProviderName): KeyRotator | null {
  const raw = process.env[PROVIDER_ENV[name]];
  if (!raw?.trim()) return null;
  const cached = envRotators.get(name);
  if (cached?.raw === raw) return cached.rotator;
  const keys = parseKeys(raw);
  if (keys.length === 0) return null;
  const rotator = new KeyRotator(keys);
  envRotators.set(name, { raw, rotator });
  return rotator;
}

export function resolveProvider(req: ProviderRequest): LLMProvider {
  const name: ProviderName = req.provider == null ? "anthropic" : (req.provider as ProviderName);
  if (!isProviderName(name)) {
    throw new ProviderError("anthropic", 400, `Unknown provider "${req.provider}".`);
  }
  const byok = req.apiKey?.trim();
  const rotator = byok ? new KeyRotator(parseKeys(byok)) : getEnvRotator(name);
  if (!rotator) {
    throw new ProviderError(name, 401, `No API key for ${name}. Add one in settings or set ${PROVIDER_ENV[name]}.`);
  }
  const provider = new RotatingProvider(rotator, (key) => makeProvider(name, key));
  // Spread load across the pool: the *next* resolveProvider() call for this
  // provider picks up where this one left off, round-robin style.
  if (!byok) rotator.rotate();
  return provider;
}
