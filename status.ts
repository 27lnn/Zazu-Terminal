import os from 'node:os';
import { comment } from '../core/personality';
import { printLines } from '../core/output';
import type { Command } from '../core/command';

export const cmdStatus: Command = {
  name: 'status',
  description: 'Show host, runtime, and mood state.',
  async run(ctx) {
    const lines: string[] = [];
    lines.push(`system: online`);
    lines.push(`host: ${os.hostname()}`);
    lines.push(`platform: ${process.platform}`);
    lines.push(`node: ${process.version}`);
    lines.push(`mood: ${ctx.config.mood}`);
    const c = comment(ctx, 'status');
    if (c) lines.push(c);
    printLines(lines, ctx.output);
    return 0;
  }
};
