import './App.css';
import { useState, useEffect } from "react";

// component imports
import Board from "./components/Board.js"

// lib imports
import { generateBoard } from "./minesweeper"


const rows = 18;
const cols = 18;
const mines = 30;

export function getTouching(board, row, col) {
  let touching = 0;
  let possibles = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
    [row - 1, col - 1],
    [row - 1, col + 1],
    [row + 1, col - 1],
    [row + 1, col + 1]
  ]
  for (let possible of possibles) {
    try {
      if (board[possible[0]][possible[1]].isMine) {
        touching++
      }
    } catch (error) {

    }
  }

  return touching
}

export default function App() {
  const [board, setBoard] = useState(generateBoard(rows, cols, mines))
  const [gameOver, setGameOver] = useState(false);
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("-")

  useEffect(() => {
    document.addEventListener("keydown", event => {
      if (event.ctrlKey) { // ctrl
        setCtrlPressed(true);
      }
    })
    document.addEventListener("keyup",event => {
      if (event.code === "ControlLeft") { // ctrl
        setCtrlPressed(false);
      }
    })
  }, [])

  function reset() {
    setBoard(generateBoard(rows, cols, mines))
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
    setTimeout(() => setGameOver(true), 500);
  }

  function handleCellClick(e,row, col) {
    if (gameOver) return;
    if (!ctrlPressed && !board[row][col].isFlagged) {
      let newBoard = JSON.parse(JSON.stringify(board))
      newBoard[row][col].isRevealed = true;
      setBoard(newBoard)
      if newBoard.filter(cell => )
      if (newBoard[row][col].isMine) {
        setGameOverMessage("unlucky")
        endGame()
      } else if (getTouching(board, row, col) === 0) {
        let newBoard = JSON.parse(JSON.stringify(board))
        floodFill(newBoard, row, col)
      }
    } else if (ctrlPressed && !board[row][col].isRevealed) {
      let newBoard = JSON.parse(JSON.stringify(board))
      newBoard[row][col].isFlagged = !board[row][col].isFlagged;
      setBoard(newBoard)
    }
  }

  function floodFill(newBoard, row, col) {

    for (var xoff = -1; xoff <= 1; xoff++) {
      var i = row + xoff;
      if (i < 0 || i >= cols) continue;

      for (var yoff = -1; yoff <= 1; yoff++) {
        var j = col + yoff;
        if (j < 0 || j >= rows) continue;

        var neighbor = newBoard[i][j];

        if (!neighbor.isRevealed) {
          if (!neighbor.isFlagged) newBoard[i][j].isRevealed = true;
          if (getTouching(newBoard, i, j) == 0) {
            floodFill(newBoard, i, j)
          }

        }
      }
    }
    setBoard(newBoard)
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