import os from 'node:os';
import { comment } from '../core/personality';
import { printLines } from '../core/output';
import type { Command } from '../core/command';

export const cmdUptime: Command = {
  name: 'uptime',
  description: 'Show system uptime.',
  async run(ctx) {
    const sec = os.uptime();
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);
    const lines: string[] = [];
    lines.push(`uptime: ${h}h ${m}m ${s}s`);
    const c = comment(ctx, 'uptime');
    if (c) lines.push(c);
    printLines(lines, ctx.output);
    return 0;
  }
};
