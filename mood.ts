import { loadConfig, saveConfig } from '../core/config';
import { comment } from '../core/personality';
import { printLines } from '../core/output';
import type { Command } from '../core/command';
import type { Mood } from '../types';

const VALID: Mood[] = ['neutral', 'observing', 'annoyed', 'sleepy', 'focused'];

export const cmdMood: Command = {
  name: 'mood',
  description: 'Get or set mood state.',
  async run(ctx, args) {
    const lines: string[] = [];

    if (args.length === 0) {
      lines.push(`mood: ${ctx.config.mood}`);
      const c = comment(ctx, 'mood:get');
      if (c) lines.push(c);
      printLines(lines, ctx.output);
      return 0;
    }

    const next = args[0] as Mood;
    if (!VALID.includes(next)) {
      lines.push(`error: invalid mood '${args[0]}'`);
      lines.push(`valid: ${VALID.join(', ')}`);
      printLines(lines, ctx.output);
      return 2;
    }

    const cfg = loadConfig();
    cfg.mood = next;
    saveConfig(cfg);

    lines.push(`mood: ${next}`);
    const c = comment({ ...ctx, config: cfg }, 'mood:set');
    if (c) lines.push(c);

    printLines(lines, ctx.output);
    return 0;
  }
};
