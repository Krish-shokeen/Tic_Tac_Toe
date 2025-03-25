const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currPlay = "X";
let cells = ["", "", "", "", "", "", "", "", ""];
let active = true;

function createBoard() {
    board.innerHTML = "";
    cells.forEach((cell, index) => {
        const cellEle = document.createElement("div");
        cellEle.classList.add("cell");
        cellEle.setAttribute("data-index", index);
        cellEle.innerText = cell;
        cellEle.addEventListener("click", handleMove);
        board.appendChild(cellEle);
    });
}

function handleMove(event) {
    const i = event.target.getAttribute("data-index");
    if (cells[i] === "" && active) {
        cells[i] = currPlay;
        event.target.innerText = currPlay;
        checkWin();
        currPlay = currPlay === "X" ? "O" : "X";
        statusText.innerText = active ? `Player ${currPlay}'s turn` : statusText.innerText;
    }
}

function checkWin() {
    const winCombo = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    
    for (const combo of winCombo) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            statusText.innerText = `Player ${cells[a]} Wins!`;
            active = false;
            return;
        }
    }

    if (!cells.includes("")) {
        statusText.innerText = "It's a draw!";
        active = false;
    }
}

function resetGame() {
    cells = ["", "", "", "", "", "", "", "", ""];
    currPlay = "X";
    active = true;
    statusText.innerText = "Player X's turn";
    createBoard();
}

createBoard();  // Initialize the game board when the page loads
