import os from 'node:os';
import { comment } from '../core/personality';
import { printLines } from '../core/output';
import type { Command } from '../core/command';

export const cmdTop: Command = {
  name: 'top',
  description: 'Show a minimal resource snapshot.',
  async run(ctx) {
    const memTotal = os.totalmem();
    const memFree = os.freemem();
    const load = os.loadavg();
    const lines: string[] = [];

    lines.push(`cpu_load_1m: ${load[0]?.toFixed(2) ?? 'n/a'}`);
    lines.push(`cpu_load_5m: ${load[1]?.toFixed(2) ?? 'n/a'}`);
    lines.push(`cpu_load_15m: ${load[2]?.toFixed(2) ?? 'n/a'}`);
    lines.push(`mem_free: ${formatBytes(memFree)}`);
    lines.push(`mem_total: ${formatBytes(memTotal)}`);

    const c = comment(ctx, 'top');
    if (c) lines.push(c);
    printLines(lines, ctx.output);
    return 0;
  }
};

function formatBytes(n: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let v = n;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(1)}${units[i]}`;
}
