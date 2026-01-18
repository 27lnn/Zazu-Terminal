import chalk from 'chalk';
import type { ThemeName } from '../types';

export function themeColor(theme: ThemeName) {
  switch (theme) {
    case 'mono':
      return (s: string) => s;
    case 'amber':
      return chalk.hex('#ffb000');
    case 'green':
    default:
      return chalk.green;
  }
}

export function dim(s: string) {
  return chalk.gray(s);
}

export function subtle(s: string) {
  return chalk.dim(s);
}
