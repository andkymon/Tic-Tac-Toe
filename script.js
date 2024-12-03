function createGameboard() {
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

    function checkWinningMark() {
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

    return {display, updateCell, checkWinningMark, reset};
}

function Player(name, mark) {
    this.name = name;
    this.mark = mark;
}

function gameStart(name1, name2) {
    const gameboard = createGameboard();
    const playerOne = new Player(name1, "X");
    const playerTwo = new Player(name2, "O");
    let round = 1;

    let currentPlayer = playerOne;

    function roundStart() {
        console.log(round);
        gameboard.display();
        if (round > 5) { //Wins are only checked after 5 rounds, as it takes 5 turns minimum for a win.
            const winner = gameboard.checkWinningMark();
            if (winner === "X") {
                console.log(`${playerOne.name} wins!`);
            } else if (winner === "O") {
                console.log(`${playerTwo.name} wins!`);
            }
            if (winner) {
                gameboard.reset();
                round = 0;
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

    return {roundStart, placeMark};
}


const game = gameStart("Kyle", "Hanz");
game.roundStart();