import type { OutputMode } from '../types';

export function printLines(lines: string[], mode: OutputMode): void {
  if (mode === 'json') {
    // best-effort: return structured lines
    process.stdout.write(JSON.stringify({ lines }, null, 2) + '\n');
    return;
  }
  process.stdout.write(lines.join('\n') + (lines.length ? '\n' : ''));
}
