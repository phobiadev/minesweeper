import './App.css';
import { useState } from "react";

// component imports
import Board from "./components/Board.js"

// lib imports
import { generateBoard } from "./minesweeper"


const rows = 8;
const cols = 8;
const mines = 10;


export default function App() {
  const [board, setBoard] = useState(generateBoard(rows,cols,mines))
  const [gameOver, setGameOver] = useState(false);

  function reset() {
    setBoard(generateBoard(rows,cols,mines))
    setGameOver(false)
  }

  function endGame() {
    let newBoard = JSON.parse(JSON.stringify(board))
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (board[i][j].isMine) {
          newBoard[i][j].isRevealed = true
        }
      }
    }
    setBoard(newBoard)
    setGameOver(true)
  }

  function handleCellClick(row,col) {
    if (!gameOver) {
      let newBoard = JSON.parse(JSON.stringify(board))
      newBoard[row][col].isRevealed = true;
      setBoard(newBoard)
      if (newBoard[row][col].isMine) {
        endGame()
      }
    }  
  }

  return (
    <>
      <div className="minesweeper-board-container">
        {gameOver && <button className="reset-button" onClick={reset}>RESET</button>}
        <Board board={board} handleCellClick={handleCellClick} />
      </div>
    </>
  )
}
