export type MoveCategory =
  | 'Best !!'
  | 'Good !'
  | 'Inaccuracy ?!'
  | 'Miss'
  | 'Mistake ?'
  | 'Blunder ??';

export function classifyMove(previousEvalCp: number, newEvalCp: number): MoveCategory {
  const evalDrop = previousEvalCp - newEvalCp;

  if (evalDrop > 300) return 'Blunder ??';
  if (evalDrop > 150) return 'Mistake ?';
  if (evalDrop > 50) return 'Miss';
  if (evalDrop > 20) return 'Inaccuracy ?!';
  if (evalDrop > 0) return 'Good !';
  return 'Best !!';
}
