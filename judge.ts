import { comment } from '../core/personality';
import { printLines } from '../core/output';
import type { Command } from '../core/command';

const JUDGMENTS = [
  'acceptable',
  'concerning',
  'not ideal',
  'unexpectedly fine',
  'suspicious',
  'suboptimal'
];

export const cmdJudge: Command = {
  name: 'judge',
  description: 'Return a dry assessment of the current situation.',
  async run(ctx) {
    const lines: string[] = [];
    const idx = Math.abs((Date.now() / 1000) | 0) % JUDGMENTS.length;
    lines.push(`verdict: ${JUDGMENTS[idx]}`);
    const c = comment(ctx, 'judge');
    if (c) lines.push(c);
    printLines(lines, ctx.output);
    return 0;
  }
};
