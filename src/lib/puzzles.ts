export interface PuzzleRecord {
  puzzleId: string;
  fen: string;
  moves: string[];
  rating: number;
  themes: string[];
  gameUrl: string;
}

export function parsePuzzleCsvLine(line: string): PuzzleRecord | null {
  if (!line.trim()) return null;
  const [puzzleId, fen, moves, rating, _deviation, _popularity, _nbPlays, themes, gameUrl] = line.split(',');
  if (!puzzleId || !fen || !moves || !rating || !themes || !gameUrl) return null;

  return {
    puzzleId,
    fen,
    moves: moves.split(' ').filter(Boolean),
    rating: Number(rating),
    themes: themes.split(' ').filter(Boolean),
    gameUrl
  };
}
