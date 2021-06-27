const MaxTaskPerPlayer = 16;
const NormalTaskScore = 135;
const RelayTaskMinScore = 130;
const RelayTaskStep = 5;
const RelayTaskMaxScore = 145;

export function isFullScore(numOfPlayers: number, score: number): boolean {
  if (numOfPlayers <= 3) {
    return (
      score % 135 === 0 &&
      score >= 0 &&
      score <= numOfPlayers * MaxTaskPerPlayer * NormalTaskScore
    );
  }

  return false;
}

function getSingleTaskScore(numOfPlayersDone: number): number {
  if (numOfPlayersDone === 1) {
    return RelayTaskMinScore;
  }

  if (numOfPlayersDone === 2) {
    return RelayTaskMinScore * 2 + RelayTaskStep;
  }

  if (numOfPlayersDone === 3) {
    return RelayTaskMinScore * 3 + RelayTaskStep * 3;
  }

  return (
    RelayTaskMinScore * 3 +
    RelayTaskStep * 3 +
    RelayTaskMaxScore * (numOfPlayersDone - 3)
  );
}

function getTaskPossibleScores(numOfPlayers: number): number[] {
  return [];
}
