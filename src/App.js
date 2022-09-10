import './App.css';
import { useState, useEffect } from "react";

// component imports
import Board from "./components/Board.js"

// lib imports
import { generateBoard, getTouching, getHidden } from "./minesweeper"

const rows = 18;
const cols = 18
const mines = 30;

export default function App() {
  const [board, setBoard] = useState(generateBoard(rows, cols, mines))
  const [gameOver, setGameOver] = useState(false);
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [message, setMessage] = useState("")

  useEffect(() => {
    document.addEventListener("keydown", event => {
      if (event.altKey) { // alt
        setCtrlPressed(true);
      }
    })
    document.addEventListener("keyup",event => {
      console.log(event.code)
      if (event.code === "AltLeft" || event.code === "AltRight") { // ctrl
        setCtrlPressed(false);
      }
    })
  }, [])

  function reset() {
    setBoard(generateBoard(rows, cols, mines))
    setGameOver(false)
    setMessage("")
  }

  function endGame(board,win) {
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

  function handleCellClick(row, col) {
    if (gameOver) return;
    if (!ctrlPressed && !board[row][col].isFlagged) {
      let newBoard = JSON.parse(JSON.stringify(board))
      newBoard[row][col].isRevealed = true;
      setBoard(newBoard)
      if (getHidden(newBoard) === mines) {
        setMessage("well done")
        endGame(newBoard,true)
      }

      if (newBoard[row][col].isMine) {
        setMessage("unlucky, try again")
        endGame(newBoard,false)
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
    <div className="App">
      <div className="message">
        {message !== "" ? message : `${getHidden(board)} cells left to uncover`}
      </div>

      {document.body.clientWidth <= 600 && <div className="flag-button-container"><button className={`flag-button ${ctrlPressed ? "flag-button-on" : "flag-button-off"}`} onClick={() => setCtrlPressed(!ctrlPressed)}>Flags {ctrlPressed ? "on" : "off"}</button></div>}

      <div className="minesweeper-board-container">
        {gameOver && <button className="reset-button" onClick={reset}>
          RESET
        </button>}
        <Board board={board} handleCellClick={handleCellClick} />
      </div>
    </div>
  )
}