import { describe, expect, it } from 'vitest';
import { findCommand } from '../src/commands';

describe('command registry', () => {
  it('finds help', () => {
    const c = findCommand('help');
    expect(c?.name).toBe('help');
  });

  it('finds status', () => {
    const c = findCommand('status');
    expect(c?.name).toBe('status');
  });

  it('returns null for unknown', () => {
    expect(findCommand('nope')).toBeNull();
  });
});
