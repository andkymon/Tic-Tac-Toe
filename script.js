const gameboard = (function () {
    const board = [];

    for (let i = 0; i < 3; i++) {
        board.push([]);
        for (let j = 0; j < 3; j++) {
            board[i].push(null);
        }
    }

    function display() {
        console.log(board);
    }

    function updateCell(x, y, mark) {
        if (x < 0 || x > 2 || y < 0 || y > 2) {
            console.log("Out of bounds.");
        } else if (board[x][y] != null) {
            console.log("Cell already taken.");
        } else if (!Number.isInteger(x) || !Number.isInteger(y)) {
            console.log("Invalid input.");
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

    return {display, updateCell, checkWin, reset};
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
        console.log(round);
        gameboard.display();
        if (round > 5) { //Wins are only checked after 5 rounds, as it takes 5 turns minimum for a win.
            const winner = gameboard.checkWin();
            if (winner === "X") {
                console.log(`${playerOne.name} wins!`);
            } else if (winner === "O") {
                console.log(`${playerTwo.name} wins!`);
            }
            if (winner) {
                return;
            }
        } 
        console.log(`It's ${currentPlayer.name}'s turn!`);
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

const displayController = (function () {
    function start() {
        const nameDialog = document.querySelector(".name-dialog");
        const p1Name = document.querySelector("#p1-name");
        const p2Name = document.querySelector("#p2-name");
        const startBtn = document.querySelector(".start-button");

        nameDialog.showModal();

        startBtn.addEventListener("click", () => {
            console.log(p1Name.value);
            game.start(p1Name.value, p2Name.value);
            nameDialog.close();
        })
    }
    return {start};
})();

displayController.start();