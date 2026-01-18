import { COMMANDS } from '.';
import { printLines } from '../core/output';
import { themeColor, subtle } from '../ui/theme';
import type { Command } from '../core/command';

export const cmdHelp: Command = {
  name: 'help',
  description: 'Show command index and usage.',
  aliases: ['-h', '--help'],
  async run(ctx) {
    const color = themeColor(ctx.config.theme);
    const lines: string[] = [];
    lines.push(color('Zazu Terminal'));
    lines.push(subtle('A restrained CLI with a personality layer.'));
    lines.push('');
    lines.push('Usage:');
    lines.push('  zazu <command> [args]');
    lines.push('');
    lines.push('Commands:');
    for (const c of COMMANDS) {
      lines.push(`  ${c.name.padEnd(10)} ${c.description}`);
    }
    lines.push('');
    lines.push('Global flags:');
    lines.push('  --json           output machine-readable JSON');
    lines.push('  --no-comment     disable commentary');
    lines.push('  --theme <name>   mono|green|amber');
    lines.push('');
    printLines(lines, ctx.output);
    return 0;
  }
};
