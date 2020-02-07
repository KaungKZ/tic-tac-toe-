const squares = document.querySelectorAll(".square");
const gameBoard = document.querySelector(".container");
const finish_text = document.querySelector(".finish-text");
const restart_btn = document.querySelector(".restart-btn");
const endBoard = document.querySelector(".end-game");

let x_turn = true;
const winners = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  x_turn = true;
  endBoard.classList.remove("active");
  hoverSquares();
  squares.forEach(square => {
    square.classList.remove("x");
    square.classList.remove("c");
    square.removeEventListener("click", handleClick);
    square.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick() {
  x_turn ? this.classList.add("x") : this.classList.add("c");
  const currentClass = x_turn ? "x" : "c";

  if (checkWinner(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    x_turn = !x_turn;
    hoverSquares();
  }
}

function endGame(draw) {
  if (draw) {
    finish_text.innerHTML = "Draw";
  } else {
    finish_text.innerHTML = `${x_turn ? "X wins !" : "C wins !"}`;
  }
  endBoard.classList.add("active");
}

function checkWinner(currentClass) {
  return winners.some(pair => {
    return pair.every(one => {
      return squares[one].classList.contains(currentClass);
    });
  });
}

function hoverSquares() {
  gameBoard.classList.remove("x-turn");
  gameBoard.classList.remove("c-turn");
  x_turn
    ? gameBoard.classList.add("x-turn")
    : gameBoard.classList.add("c-turn");
}
function isDraw() {
  return [...squares].every(
    square => square.classList.contains("x") || square.classList.contains("c")
  );
}

startGame();
squares.forEach(square =>
  square.addEventListener("click", handleClick, { once: true })
);
restart_btn.addEventListener("click", startGame);
