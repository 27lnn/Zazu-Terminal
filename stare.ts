import { printLines } from '../core/output';
import type { Command } from '../core/command';

export const cmdStare: Command = {
  name: 'stare',
  description: 'A longer pause, but still productive.',
  async run(ctx) {
    const lines: string[] = [];
    lines.push('zazu: ...');
    printLines(lines, ctx.output);
    return 0;
  }
};
