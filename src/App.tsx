import { useMemo, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { classifyMove, type MoveCategory } from './lib/chessAnalysis';

export function App() {
  const [game, setGame] = useState(() => new Chess());
  const [lastCategory, setLastCategory] = useState<MoveCategory>('Best !!');

  const fen = useMemo(() => game.fen(), [game]);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const next = new Chess(game.fen());
    const move = next.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });
    if (!move) return false;

    // Placeholder eval change until backend UCI stream is wired.
    const previousEval = 30;
    const newEval = Math.floor(Math.random() * 100) - 20;
    setLastCategory(classifyMove(previousEval, newEval));
    setGame(next);
    return true;
  };

  return (
    <main style={{ display: 'grid', gridTemplateColumns: '640px 1fr', gap: 20, padding: 20, fontFamily: 'Inter, sans-serif' }}>
      <section>
        <h1>PaiChess Arena</h1>
        <p>Move classifier: <strong>{lastCategory}</strong></p>
        <Chessboard position={fen} onPieceDrop={onDrop} boardWidth={620} />
      </section>
      <section>
        <h2>Roadmap hooks included</h2>
        <ul>
          <li>UCI evaluation categories</li>
          <li>Tauri engine-downloader command support</li>
          <li>Lichess puzzle parser utilities</li>
        </ul>
      </section>
    </main>
  );
}
