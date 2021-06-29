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

type RegattaStatus = number[];

export function parse(
  numOfPlayers: number,
  points: number
): { isFullScore: boolean; matches: RegattaStatus[] } {
  const maxNumberOfInprogressTask = getMaxNumberOfInprogressTask(numOfPlayers);
  const queue: RegattaStatus[] = [Array(16).fill(0)];
  const results: RegattaStatus[] = [];
  while (queue.length) {
    const combination = queue.pop() as number[];
    const sum = combination.reduce(
      (acc, cur) => acc + getSingleTaskScore(cur),
      0
    );
    if (sum === points) {
      results.push(combination);
    } else if (sum > points) {
      continue;
    }

    const nextStatus = getNextStatus(
      combination,
      numOfPlayers,
      maxNumberOfInprogressTask
    );
    queue.unshift(...nextStatus);
  }

  console.log(`Input: ${numOfPlayers} ${points}`);
  console.log('Output: ', results);
  return { isFullScore: results.length > 0, matches: results };
}

function getNextStatus(
  currentStatus: RegattaStatus,
  numOfPlayers: number,
  maxNumberOfInprogress: number
): RegattaStatus[] {
  return currentStatus
    .map((task, index) => {
      const newTask = [...currentStatus];
      newTask[index]++;
      return newTask;
    })
    .filter((nextStatus) => {
      const isOrdered = nextStatus.every(
        (val, index, array) => index === 0 || val <= array[index - 1]
      );
      const isInScope = nextStatus.every((val) => val <= numOfPlayers);
      const inprogressCount = nextStatus.filter(
        (taskStatus) => taskStatus < numOfPlayers && taskStatus > 0
      ).length;
      return isOrdered && isInScope && inprogressCount <= maxNumberOfInprogress;
    });
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
