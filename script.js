const gameboard = (function () {
    const board = [];

    for (let i = 0; i < 3; i++) {
        board.push([]);
        for (let j = 0; j < 3; j++) {
            board[i].push(null);
        }
    }

    function getBoard() {
        return board.flat(Infinity);
    }

    function updateCell(x, y, mark) {
        if (board[x][y] != null) {
            console.log("Cell already taken.");
        } else {
            board[x][y] = mark;
            return 1;
        }
    }

    function checkWin() {
        //row win condition
	    for (const row of board) {
            if ((row.every((cell) => (cell !== null && cell === row[0]))) === true) {
			    return row[0];
            }
        } 
        //column win condition
        for (i = 0; i < board.length; i++) {
            if ((board.every((row) => (row[i] !== null && row[i] === board[0][i]))) === true) {
                return board[0][i];
            }
        }
        //diagonal top left to bottom right win condition
        const diag1 = board.map((row, index) => row[index]);
        if ((diag1.every((cell) => cell === diag1[0])) === true) {
            return diag1[0];
        }
        //diagonal top right to bottom left win condition
        const diag2 = board.map((row, index) => row[board.length - 1 - index]); 
        if ((diag2.every((cell) => cell === diag2[0])) === true) {
            return diag2[0];
        }
        //No winner yet
        return null;
    }

    function reset() {
        for (const row of board) {
            row.fill(null);
        }
    }

    return {getBoard, updateCell, checkWin, reset};
})();

function Player(name, mark) {
    this.name = name;
    this.mark = mark;
}

const game = (function () {
    let round;
    let playerOne;
    let playerTwo;
    let currentPlayer;

    function start(name1, name2) {
        gameboard.reset();
        if (name1 == "") name1 = "Player 1";
        if (name2 == "") name2 = "Player 2";
        playerOne = new Player(name1, "X");
        playerTwo = new Player(name2, "O");
        round = 1;
        currentPlayer = playerOne;
        roundStart();
    }

    function roundStart() {
        if (round > 5) { //Wins are only checked after 5 rounds, as it takes 5 turns minimum for a win.
            const winner = gameboard.checkWin();
            if (winner === "X") {
                display.updateDisplay(`${playerOne.name} wins!`);
            } else if (winner === "O") {
                display.updateDisplay(`${playerTwo.name} wins!`);
            }
            if (winner) {
                display.removeCellEventListeners();
                return;
            }
        } 
        if (round > 9) {
            display.updateDisplay(`It's a draw!`);
            display.removeCellEventListeners();
            return;
        }
        display.updateDisplay(`It's ${currentPlayer.name}'s turn!`);
    }

    function placeMark(row, col) {
        const status = gameboard.updateCell(row, col, currentPlayer.mark);
        if (status == 1) switchTurn();
        roundStart();
    }

    function switchTurn() {
        currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
        round++;
    }
    return {start, placeMark};
})();

const display = (function () {
    //References accessed in multiple functions
    const startDialog = document.querySelector(".start-dialog");
    const p1Name = document.querySelector("#p1-name");
    const p2Name = document.querySelector("#p2-name");
    const cells = document.querySelectorAll(".cell");

    //Event handlers to be set once on page load and never removed
    function setup() {
        const startBtn = document.querySelector(".start-button");
        const restartBtn = document.querySelector(".restart");
        startBtn.addEventListener("click", () => {
            setCellEventListeners();
            game.start(p1Name.value, p2Name.value);
            startDialog.close();
        });
        restartBtn.addEventListener("click", start);
    }

    function start() {
        for (const cell of cells) {
            cell.classList.remove("clicked");
        }
        startDialog.showModal();
        p1Name.blur();
    }

    function updateDisplay(str) {
        const gameStatus = document.querySelector(".game-status");
        gameStatus.textContent = str;
        const board = gameboard.getBoard();
        for (let i = 0; i < board.length; i++) {
            cells[i].textContent = board[i];
        }
    }

    //Store references to store and remove cell event handlers
    const cellClickHandlers = []; 
    
    function setCellEventListeners() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const index = row * 3 + col;
                const mark = () => {
                    cells[index].classList.add("clicked");
                    game.placeMark(row, col);
                };
                cellClickHandlers[index] = mark;
                cells[index].addEventListener("click", cellClickHandlers[index]);
            }
        }
    }

    function removeCellEventListeners() {
        for (let i = 0; i < cells.length; i++) {
            cells[i].removeEventListener("click", cellClickHandlers[i]);
        }
    }
    return {setup, start, updateDisplay, removeCellEventListeners};
})();



document.addEventListener("DOMContentLoaded", () => {
    display.setup();
    display.start();
});