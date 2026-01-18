import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { comment } from '../core/personality';
import { printLines } from '../core/output';
import type { Command } from '../core/command';

const execFileAsync = promisify(execFile);

export const cmdPs: Command = {
  name: 'ps',
  description: 'Show a small process snapshot.',
  async run(ctx) {
    const lines: string[] = [];

    try {
      if (process.platform === 'win32') {
        // Minimal cross-platform fallback
        lines.push('pid  name');
        lines.push(`${process.pid}  zazu`);
      } else {
        const { stdout } = await execFileAsync('ps', ['-eo', 'pid,comm', '--no-headers']);
        const rows = stdout
          .trim()
          .split(/\r?\n/)
          .slice(0, 8)
          .map((r) => r.trim().replace(/\s+/, ' '));

        lines.push('pid  cmd');
        for (const r of rows) lines.push(r);
      }

      const c = comment(ctx, 'ps');
      if (c) lines.push(c);
      printLines(lines, ctx.output);
      return 0;
    } catch {
      lines.push('error: unable to read process list');
      printLines(lines, ctx.output);
      return 1;
    }
  }
};
