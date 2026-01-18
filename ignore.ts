import { printLines } from '../core/output';
import type { Command } from '../core/command';

export const cmdIgnore: Command = {
  name: 'ignore',
  description: 'Do nothing. Intentionally.',
  async run(ctx) {
    printLines([], ctx.output);
    return 0;
  }
};
