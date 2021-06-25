import { isFullScore } from './relay';

describe('#analysis', () => {
  test('should work for one task in parallel', () => {
    expect(isFullScore(5, 0)).toBe(true);
    expect(isFullScore(5, 130)).toBe(true);
    expect(isFullScore(5, 130 + 135)).toBe(true);

    expect(isFullScore(5, 135 + 135)).toBe(false);
    expect(isFullScore(5, 135 + 133)).toBe(false);

    expect(isFullScore(5, 130 + 135 + 140)).toBe(true);
    expect(isFullScore(5, 130 + 135 + 140 + 145)).toBe(true);
    expect(isFullScore(5, 130 + 135 + 140 + 145 * 5)).toBe(false);
  });

  test('should work for small number of players', () => {
    expect(isFullScore(1, 135)).toBe(true);
    expect(isFullScore(1, 135 * 16)).toBe(true);
    expect(isFullScore(1, 135 * 17)).toBe(false);
    expect(isFullScore(1, 135 + 130)).toBe(false);
    expect(isFullScore(1, 130)).toBe(false);

    expect(isFullScore(2, 130 + 135)).toBe(false);
    expect(isFullScore(2, 130 + 130)).toBe(false);
    expect(isFullScore(2, 135 + 135)).toBe(true);
    expect(isFullScore(2, 135)).toBe(true);

    expect(isFullScore(3, 135)).toBe(true);
    expect(isFullScore(3, 135 * 2)).toBe(true);
    expect(isFullScore(3, 135 * 3)).toBe(true);
    expect(isFullScore(3, 135 * 16 * 3)).toBe(true);
    expect(isFullScore(3, 130)).toBe(false);
  });

  test('should work for two tasks in parallel', () => {
    expect(isFullScore(5, 130 + 130)).toBe(true);
    expect(isFullScore(5, 130 + 130 + 135)).toBe(true);
    expect(isFullScore(5, 130 + 135 + 140 + 145 + 130 + 135)).toBe(true);
  });

  test('should handle impossible number of tasks in parallel', () => {
    expect(isFullScore(5, 130 * 5)).toBe(false);
    expect(isFullScore(5, 130 * 1)).toBe(true);

    expect(isFullScore(21, 130 * 4)).toBe(true);
    expect(isFullScore(21, 130)).toBe(true);
    expect(isFullScore(21, 130 * 5)).toBe(false);

    expect(isFullScore(20, 130 * 3)).toBe(true);
    expect(isFullScore(20, 130 * 3 + 135)).toBe(true);
    expect(isFullScore(20, 130)).toBe(true);
    expect(isFullScore(20, 130 * 4)).toBe(false);
    expect(isFullScore(20, 130 * 4 + 135)).toBe(false);
  });
});
