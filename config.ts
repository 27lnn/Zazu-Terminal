import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { z } from 'zod';
import type { ZazuConfig } from '../types';

const ZazuConfigSchema = z
  .object({
    theme: z.enum(['mono', 'green', 'amber']).default('green'),
    commentLevel: z.number().int().min(0).max(2).default(1),
    mood: z.enum(['neutral', 'observing', 'annoyed', 'sleepy', 'focused']).default('observing'),
    asciiRare: z.boolean().default(true),
    telemetry: z.boolean().default(false)
  })
  .strict();

export function defaultConfig(): ZazuConfig {
  return {
    theme: 'green',
    commentLevel: 1,
    mood: 'observing',
    asciiRare: true,
    telemetry: false
  };
}

export function configPath(): string {
  return path.join(os.homedir(), '.zazurc');
}

export function loadConfig(): ZazuConfig {
  const file = configPath();
  if (!fs.existsSync(file)) return defaultConfig();

  try {
    const raw = fs.readFileSync(file, 'utf8');
    // allow json or simple key=value
    const parsed = raw.trim().startsWith('{') ? JSON.parse(raw) : parseKeyValue(raw);
    const cfg = ZazuConfigSchema.parse(parsed);
    return cfg;
  } catch {
    return defaultConfig();
  }
}

export function saveConfig(cfg: ZazuConfig): void {
  const file = configPath();
  fs.writeFileSync(file, JSON.stringify(cfg, null, 2) + '\n', 'utf8');
}

function parseKeyValue(raw: string): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const idx = t.indexOf('=');
    if (idx === -1) continue;
    const key = t.slice(0, idx).trim();
    const val = t.slice(idx + 1).trim();
    out[key] = coerce(val);
  }
  return out;
}

function coerce(v: string): unknown {
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (/^-?\d+$/.test(v)) return Number(v);
  return v;
}
