function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
function generateBoard(rows,cols,mines) {
    let board = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
        row.push({
            isMine: false,
            isFlagged: false,
            isRevealed: false
        })
        }
        board.push(row)
    }

    for (let i = 0; i < mines; i++) {
        console.log(i)
        let candidate = [getRandomInt(0,rows-1),getRandomInt(0,cols-1)]
        while (board[candidate[0]][candidate[1]].isMine) {
        candidate = [getRandomInt(0,rows-1),getRandomInt(0,cols-1)]
        }
        board[candidate[0]][candidate[1]].isMine = true;
    }

    return board
}

function getTouching(board, row, col) {
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

function getHidden(board) {
    let hidden = 0
    for (let row of board) {
        hidden += row.filter(item => !item.isRevealed).length
    }
    return hidden
}

export { generateBoard, getTouching, getHidden }