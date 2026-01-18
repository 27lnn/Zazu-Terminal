import { comment } from '../core/personality';
import { printLines } from '../core/output';
import type { Command } from '../core/command';

export const cmdEnv: Command = {
  name: 'env',
  description: 'Show a sanitized environment summary.',
  async run(ctx) {
    const keys = ['SHELL', 'TERM', 'LANG', 'PATH', 'HOME'];
    const lines: string[] = [];
    for (const k of keys) {
      const v = process.env[k];
      lines.push(`${k}: ${v ? sanitize(v) : 'n/a'}`);
    }
    const c = comment(ctx, 'env');
    if (c) lines.push(c);
    printLines(lines, ctx.output);
    return 0;
  }
};

function sanitize(v: string): string {
  // avoid dumping huge values
  if (v.length > 200) return v.slice(0, 200) + '…';
  return v;
}
