import type { Command } from '../core/command';
import { cmdHelp } from './help';
import { cmdStatus } from './status';
import { cmdMood } from './mood';
import { cmdJudge } from './judge';
import { cmdUptime } from './uptime';
import { cmdWhoami } from './whoami';
import { cmdEnv } from './env';
import { cmdPs } from './ps';
import { cmdTop } from './top';
import { cmdScream } from './scream';
import { cmdStare } from './stare';
import { cmdSleep } from './sleep';
import { cmdIgnore } from './ignore';

export const COMMANDS: Command[] = [
  cmdHelp,
  cmdStatus,
  cmdMood,
  cmdJudge,
  cmdUptime,
  cmdWhoami,
  cmdEnv,
  cmdPs,
  cmdTop,
  cmdScream,
  cmdStare,
  cmdSleep,
  cmdIgnore
];

export function findCommand(name: string): Command | null {
  const n = name.trim();
  for (const c of COMMANDS) {
    if (c.name === n) return c;
    if (c.aliases?.includes(n)) return c;
  }
  return null;
}
