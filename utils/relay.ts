const RelayTaskMinScore = 130;
const RelayTaskStep = 5;
const RelayTaskMaxScore = 145;

function getSingleTaskScore(numOfPlayersDone: number): number {
  if (numOfPlayersDone <= 3) {
    return (
      ((RelayTaskMinScore +
        RelayTaskMinScore +
        (numOfPlayersDone - 1) * RelayTaskStep) *
        numOfPlayersDone) /
      2
    );
  }

  return (
    RelayTaskMinScore * 3 +
    RelayTaskStep * 3 +
    RelayTaskMaxScore * (numOfPlayersDone - 3)
  );
}

type TaskStatus = number;
export type RegattaStatus = TaskStatus[];

export function parse(
  numOfPlayers: number,
  points: number
): { isFullScore: boolean; matches: RegattaStatus[] } {
  const maxNumberOfInprogressTask = getMaxNumberOfInprogressTask(numOfPlayers);
  const inprogressCases: { points: number; case: RegattaStatus }[] = [];
  for (let i = 0; i <= maxNumberOfInprogressTask; i++) {
    inprogressCases.push(...getPossibleIncompleteCases(numOfPlayers, i));
  }

  const fullTaskScore = getSingleTaskScore(numOfPlayers);
  const results: RegattaStatus[] = [];
  for (const inprogressCase of inprogressCases) {
    const numOfInprogressTask = inprogressCase.case.length;
    const completeTaskPoints = points - inprogressCase.points;
    if (
      completeTaskPoints >= 0 &&
      completeTaskPoints % fullTaskScore === 0 &&
      completeTaskPoints / fullTaskScore + numOfInprogressTask <= 16
    ) {
      results.push([
        ...Array(completeTaskPoints / fullTaskScore).fill(numOfPlayers),
        ...inprogressCase.case,
      ]);
    }
  }

  return { isFullScore: results.length > 0, matches: results };
}

export function getPossibleIncompleteCases(
  numOfPerson: number,
  numOfTasks: number
): { points: number; case: RegattaStatus }[] {
  const cases = getCases([], numOfTasks, numOfPerson);
  return cases.map((singleCase) => ({
    case: singleCase,
    points: singleCase.reduce(
      (points, taskStatus) => points + getSingleTaskScore(taskStatus),
      0
    ),
  }));
}

export function getCases(
  arr: RegattaStatus,
  numOfTasks: number,
  numOfPeople: number
): RegattaStatus[] {
  if (numOfTasks === 0) {
    return [arr];
  } else {
    const result = [];
    for (let i = 1; i <= (arr[arr.length - 1] || numOfPeople - 1); i++) {
      result.push(...getCases([...arr, i], numOfTasks - 1, numOfPeople));
    }

    return result;
  }
}

function getMaxNumberOfInprogressTask(numOfPlayers: number): number {
  if (numOfPlayers >= 21) {
    return 4;
  } else if (numOfPlayers >= 11) {
    return 3;
  } else if (numOfPlayers >= 6) {
    return 2;
  }

  return 1;
}
