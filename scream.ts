import { printLines } from '../core/output';
import type { Command } from '../core/command';

export const cmdScream: Command = {
  name: 'scream',
  description: 'Emit a minimal alert.',
  async run(ctx) {
    const lines: string[] = [];
    lines.push('zazu: no');
    printLines(lines, ctx.output);
    return 0;
  }
};
