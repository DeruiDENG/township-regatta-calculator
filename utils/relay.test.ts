import { parse } from './relay';

describe('#analysis', () => {
  test('should work for one task in parallel', () => {
    expect(parse(5, 0).isFullScore).toBe(true);
    expect(parse(5, 130).isFullScore).toBe(true);
    expect(parse(5, 130 + 135).isFullScore).toBe(true);

    expect(parse(5, 135 + 135).isFullScore).toBe(false);
    expect(parse(5, 135 + 133).isFullScore).toBe(false);

    expect(parse(5, 130 + 135 + 140).isFullScore).toBe(true);
    expect(parse(5, 130 + 135 + 140 + 145).isFullScore).toBe(true);
    expect(parse(5, 130 + 135 + 140 + 145 * 5).isFullScore).toBe(false);
  });

  test('should work for two tasks in parallel', () => {
    expect(parse(6, 130 + 130).isFullScore).toBe(true);
    expect(parse(6, 130 + 130 + 135).isFullScore).toBe(true);
    expect(parse(6, 130 + 135 + 140 + 145 + 130 + 135).isFullScore).toBe(true);
  });

  test('should handle impossible number of tasks in parallel', () => {
    expect(parse(5, 130 * 5).isFullScore).toBe(false);
    expect(parse(5, 130).isFullScore).toBe(true);

    expect(parse(21, 130 * 4).isFullScore).toBe(true);
    expect(parse(21, 130).isFullScore).toBe(true);
    expect(parse(21, 130 * 5).isFullScore).toBe(false);

    expect(parse(20, 130 * 3).isFullScore).toBe(true);
    expect(parse(20, 130 * 3 + 135).isFullScore).toBe(true);
    expect(parse(20, 130).isFullScore).toBe(true);
    expect(parse(20, 130 * 4).isFullScore).toBe(false);
    expect(parse(20, 130 * 4 + 135).isFullScore).toBe(false);
  });

  test('should work for random data', () => {
    expect(parse(20, 4000).isFullScore).toBe(true);
    // expect(parse(20, 17740).isFullScore).toBe(true);
    // expect(parse(20, 6425).isFullScore).toBe(true);
    // expect(parse(20, 6035).isFullScore).toBe(true);
  });
});
