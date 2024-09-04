function bestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] == "") {
        // if spot is available, put an O there
        // and call minimax to see if it's a good
        // move or not
        // since we are altering the actual game board
        // we have to undo our move after we call minimax
        board[i][j] = ai;
        // we set isMax to false because the next move after the AI player is
        // the human, which is a minimizing move
        let score = minimax(board, false);
        board[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}

let scores = {
  X: 10,
  O: -10,
  Tie: 0,
};

function minimax(board, isMax) {
  // check for terminal game state
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMax) {
    let bestScore = -Infinity;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] == "") {
          board[i][j] = ai;
          let score = minimax(board, false);
          board[i][j] = "";
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] == "") {
          board[i][j] = human;
          let score = minimax(board, true);
          board[i][j] = "";
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
