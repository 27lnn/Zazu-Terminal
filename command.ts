import type { ExecContext } from '../types';

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  run(ctx: ExecContext, args: string[]): Promise<number>;
}
