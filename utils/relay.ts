const MaxTaskPerPlayer = 16;
const NormalTaskScore = 135;
const RelayTaskMinScore = 130;
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
