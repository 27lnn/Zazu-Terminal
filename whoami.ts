import os from 'node:os';
import { comment } from '../core/personality';
import { printLines } from '../core/output';
import type { Command } from '../core/command';

export const cmdWhoami: Command = {
  name: 'whoami',
  description: 'Print the current user.',
  async run(ctx) {
    const u = os.userInfo();
    const lines: string[] = [];
    lines.push(`user: ${u.username}`);
    lines.push(`uid: ${typeof u.uid === 'number' ? u.uid : 'n/a'}`);
    const c = comment(ctx, 'whoami');
    if (c) lines.push(c);
    printLines(lines, ctx.output);
    return 0;
  }
};
