import { getCases, getPossibleIncompleteCases, parse } from './relay';

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
    expect(parse(20, 4265).isFullScore).toBe(true);
    expect(parse(18, 4695).isFullScore).toBe(true);
  });

  describe('#getCases', () => {
    test('should work', () => {
      expect(getCases([], 2, 5)).toEqual(
        expect.arrayContaining([
          [5, 5],
          [5, 4],
          [5, 3],
          [5, 2],
          [5, 1],
          [4, 4],
          [4, 3],
        ])
      );
    });

    test('should not include 0', () => {
      expect(getCases([], 2, 5)).not.toEqual(
        expect.arrayContaining([
          [5, 0],
          [0, 0],
        ])
      );
    });

    test('should be ordered', () => {
      expect(getCases([], 2, 5)).not.toEqual(
        expect.arrayContaining([
          [3, 4],
          [1, 5],
        ])
      );
    });

    test('should be bounded', () => {
      expect(getCases([], 2, 5)).not.toEqual(
        expect.arrayContaining([
          [6, 5],
          [6, 6],
          [-1, -2],
        ])
      );
    });
  });

  describe('#getPossibleIncompleteCases', () => {
    const result = getPossibleIncompleteCases(4, 2);
    expect(result).toContainEqual({
      points: 130 + 130,
      case: [1, 1],
    });
    expect(result).toContainEqual({ points: 130 + 135 + 130, case: [2, 1] });
    expect(result).toContainEqual({
      points: 130 + 135 + 140 + 145 + 130,
      case: [4, 1],
    });
  });
});
