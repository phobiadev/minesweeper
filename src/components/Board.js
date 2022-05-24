import { getTouching } from "../minesweeper"
import {ReactComponent as Flag} from "../red-flag.svg"

const touchingColors = [
    "blue",
    "green",
    "red",
    "purple",
    "purple",
    "purple",
    "purple",
    "purple"
]

export default function Board(props) {
    const {
        board,
        handleCellClick
    } = props

    return (
        <div className="minesweeper-board">
            {board.map(
                (row, i) => row.map(
                    (cell, j) => {
                        let cellInner = <div />
                        if (cell.isRevealed) {
                            if (cell.isMine) {
                                cellInner = <div className="minesweeper-mine" />
                            } else {
                                let touching = getTouching(board, i, j)
                                if (touching > 0) {
                                    cellInner = <div style={{ color: touchingColors[touching - 1] }}>{touching}</div>
                                }

                            }
                        } else if (cell.isFlagged) {
                            cellInner = <div className="flag"><Flag></Flag></div>
                        }

                        return (
                            <div
                                className={`minesweeper-cell ${!cell.isRevealed || cell.isMine ? ((i + j) % 2 === 0 ? "darker-green" : "lighter-green") : "revealed"}`}
                                onClick={() => handleCellClick(i, j)}
                            >
                                {cellInner}
                            </div>
                        )
                    }
                )
            )}
        </div>
    )
}