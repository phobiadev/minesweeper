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

export { getRandomInt, generateBoard }