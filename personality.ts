import crypto from 'node:crypto';
import type { CommentLevel, ExecContext, Mood } from '../types';

export interface Comment {
  level: CommentLevel;
  mood?: Mood | 'any';
  text: string;
}

const COMMENTS: Comment[] = [
  { level: 1, mood: 'any', text: 'observing' },
  { level: 1, mood: 'neutral', text: 'fine' },
  { level: 1, mood: 'focused', text: 'keep it moving' },
  { level: 1, mood: 'sleepy', text: 'low battery behavior' },
  { level: 1, mood: 'annoyed', text: 'why' },
  { level: 2, mood: 'any', text: 'do not get confident' },
  { level: 2, mood: 'annoyed', text: 'impressive waste of time' },
  { level: 2, mood: 'sleepy', text: 'wake me when it matters' }
];

export function comment(ctx: ExecContext, salt: string): string | null {
  if (ctx.config.commentLevel === 0) return null;

  const allowed = COMMENTS.filter((c) => c.level <= ctx.config.commentLevel);
  const pool = allowed.filter((c) => c.mood === 'any' || c.mood === ctx.config.mood);
  const selected = pickDeterministic(pool.length ? pool : allowed, salt);
  return selected ? `zazu: ${selected.text}` : null;
}

function pickDeterministic<T>(arr: T[], salt: string): T | null {
  if (arr.length === 0) return null;
  const h = crypto.createHash('sha256').update(salt).digest();
  const n = h.readUInt32BE(0);
  return arr[n % arr.length] ?? null;
}
