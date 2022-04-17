export default function Board({ board, handleCellClick }) {
    function getTouching(row,col) {
        let touching = 0;
        let possibles = [
            [row-1,col],
            [row+1,col],
            [row,col-1],
            [row,col+1],
            [row-1,col-1],
            [row-1,col+1],
            [row+1,col-1],
            [row+1,col+1]
        ]
        for (let possible of possibles) {
            try {
                if (board[possible[0]][possible[1]].isMine) {
                    touching++
                }
            } catch(error) {
                
            }
        }

        return touching
    }

    return (
        <div className="minesweeper-board">
            {board.map(
            (row,i) => row.map(
                (cell,j) => {
                    let cellInner = <div />
                    if (cell.isRevealed) {
                        if (cell.isMine) {
                            cellInner = <div className="minesweeper-mine" />
                        } else {
                            let touching = getTouching(i,j)
                            if (touching > 0) {
                                cellInner = <div>{touching}</div>
                            }
                            
                        }
                    }

                    return (
                        <div
                        className={`minesweeper-cell ${!cell.isRevealed ? ((i+j) % 2 === 0 ? "darker-green" : "lighter-green") : "revealed" }`}
                        onClick={() => handleCellClick(i,j)}  
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