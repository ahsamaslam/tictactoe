import { useState } from "react";
import "./App.css";
import Player from "./Components/Player";
import Cell from "./Components/Cell";
import GameLog from "./Components/GameLog";

// Winning combinations for tic-tac-toe
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [logs, setLogs] = useState([]);
  const [winner, setWinner] = useState(null);
  const [playerNames, setPlayerNames] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  // Update player name
  const handleNameChange = (symbol, newName) => {
    setPlayerNames((prev) => ({
      ...prev,
      [symbol]: newName,
    }));
  };

  // Check for winner
  const checkWinner = (board) => {
    for (let combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return 'X' or 'O'
      }
    }
    // Check for draw
    if (board.every((cell) => cell !== null)) {
      return "Draw";
    }
    return null;
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setLogs([]);
    setWinner(null);
  };

  const handleCellClick = (index) => {
    if (board[index] || winner) return; // Don't allow overwriting or playing after game ends

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const playerName = playerNames[currentPlayer];
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    const action = `placed ${currentPlayer} at position (${row}, ${col})`;

    setLogs([{ playerName, action, timestamp: Date.now() }, ...logs]);

    // Check for winner after move
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <main>
      <div className="App">
        <ol>
          <Player
            name="Player 1"
            symbol="X"
            selected={currentPlayer === "X"}
            onNameChange={handleNameChange}
          />
          <Player
            name="Player 2"
            symbol="O"
            selected={currentPlayer === "O"}
            onNameChange={handleNameChange}
          />
        </ol>
        <div className="board">
          {board.map((value, index) => (
            <Cell
              key={index}
              value={value}
              onClick={() => handleCellClick(index)}
            />
          ))}
        </div>
        <div className="game-logs">
          <h3>Game Log</h3>
          {logs.map((log, index) => (
            <GameLog
              key={log.timestamp || index}
              playerName={log.playerName}
              action={log.action}
            />
          ))}
        </div>

        {/* Winner Popup */}
        {winner && (
          <div className="winner-popup-overlay">
            <div className="winner-popup">
              <h2>
                {winner === "Draw"
                  ? "It's a Draw!"
                  : `${playerNames[winner]} Wins!`}
              </h2>
              <p className="winner-symbol">
                {winner !== "Draw" && `${winner} is the winner!`}
              </p>
              <button onClick={resetGame} className="reset-button">
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
