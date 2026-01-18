import { loadConfig, saveConfig } from '../core/config';
import { printLines } from '../core/output';
import type { Command } from '../core/command';

export const cmdSleep: Command = {
  name: 'sleep',
  description: 'Set mood to sleepy.',
  async run(ctx) {
    const cfg = loadConfig();
    cfg.mood = 'sleepy';
    saveConfig(cfg);
    printLines(['mood: sleepy', 'zazu: finally'], ctx.output);
    return 0;
  }
};
