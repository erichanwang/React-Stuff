import { useState, useEffect } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, isAITurn }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i] || isAITurn) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(Boolean)) {
    status = 'Draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function minimax(squares, isMaximizing) {
  const winner = calculateWinner(squares);
  if (winner === 'O') return { score: 1 };
  if (winner === 'X') return { score: -1 };
  if (squares.every(Boolean)) return { score: 0 };

  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove = null;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        const newSquares = squares.slice();
        newSquares[i] = 'O';
        const result = minimax(newSquares, false);
        if (result.score > bestScore) {
          bestScore = result.score;
          bestMove = i;
        }
      }
    }
    return { score: bestScore, move: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove = null;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        const newSquares = squares.slice();
        newSquares[i] = 'X';
        const result = minimax(newSquares, true);
        if (result.score < bestScore) {
          bestScore = result.score;
          bestMove = i;
        }
      }
    }
    return { score: bestScore, move: bestMove };
  }
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [playWithAI, setPlayWithAI] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const isAITurn = playWithAI && !xIsNext;

  useEffect(() => {
    if (isAITurn) {
      const { move } = minimax(currentSquares, true);
      if (move !== null) {
        const nextSquares = currentSquares.slice();
        nextSquares[move] = 'O';
        handlePlay(nextSquares);
      }
    }
  }, [isAITurn, currentSquares]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Tic Tac Toe</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={playWithAI}
            onChange={(e) => {
              setPlayWithAI(e.target.checked);
              setHistory([Array(9).fill(null)]);
              setCurrentMove(0);
            }}
          />
          Play against AI
        </label>
      </div>
      <div className="game-board" style={{ border: '4px solid #333', padding: '20px', borderRadius: '10px', backgroundColor: '#f0f0f0' }}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} isAITurn={isAITurn} />
      </div>
      <div className="game-info" style={{ marginTop: '20px' }}>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
