let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let w; // = width / 3;
let h; // = height / 3;

let ai = "X";
let human = "O";
let currentPlayer = human;
let size = 3;
function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;

  // bestMove();
}
function checkWinner() {
  let winner = null;
  for (let i = 0; i < size; i++) {
    // check for winner down the columns
    if (
      board[0][i] != "" &&
      board[0][i] == board[1][i] &&
      board[1][i] == board[2][i]
    ) {
      winner = board[0][i];
    }
    // check for winner across the rows
    if (
      board[i][0] != "" &&
      board[i][0] == board[i][1] &&
      board[i][1] == board[i][2]
    ) {
      winner = board[i][0];
    }
  }

  // check both diagonals
  if (
    board[0][0] != "" &&
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2]
  ) {
    winner = board[0][0];
  }
  if (
    board[0][2] != "" &&
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0]
  ) {
    winner = board[0][2];
  }
  let openSpots = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] == "") {
        openSpots++;
      }
    }
  }
  if (winner == null && openSpots == 0) {
    return "Tie";
  } else {
    return winner;
  }
}

function mousePressed() {
  if (currentPlayer == human) {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if (i >= 0 && i < size && j >= 0 && j < size && board[i][j] == "") {
      board[i][j] = human;
      currentPlayer = ai;
      console.log("calling bestMove");
      bestMove();
    }
  }
}

function grid() {
  stroke(0);
  strokeWeight(4);
  for (let i = 1; i < size; i++) {
    line(i * w, 0, i * w, height);
    line(0, i * h, width, i * h);
  }
}

function draw() {
  background(255);
  grid();
  noFill();
  textSize(32);
  textAlign(CENTER, CENTER);

  // Draw board
  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      let x = i * w + w / 2;
      let y = j * h + h / 2;
      let spot = board[i][j];
      if (spot == human) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      } else if (spot == ai) {
        ellipse(x, y, w / 1.5);
      }
    }
  }

  // Check for winner
  let result = checkWinner();
  if (result != null) {
    noLoop();
    if (result == "Tie") {
      winMsg.html(`${result}!`).style("visibility", "visible");
    } else {
      winMsg.html(`${result} won!`).style("visibility", "visible");
    }
  }
}
