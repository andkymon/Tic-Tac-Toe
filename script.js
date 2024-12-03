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

    return {display, updateCell, checkWinningMark};
}

function Player(name, mark) {
    this.name = name;
    this.mark = mark;
}

function gameStart() {
    const gameboard = createGameboard();
    const playerOne = new Player("Kyle", "X");
    const playerTwo = new Player("Hanz", "O");

    let currentPlayer = playerOne;

    function roundStart() {
        gameboard.display();
        if (gameboard.checkWinningMark() === "X") {
            console.log(`${playerOne.name} wins!`);
        } else if (gameboard.checkWinningMark() === "O") {
            console.log(`${playerTwo.name} wins!`);
        } else {
            console.log(`It's ${currentPlayer.name}'s turn!`);
        }
    }

    function placeMark(row, col) {
        const status = gameboard.updateCell(row, col, currentPlayer.mark);
        if (status == 1) switchTurn();
        roundStart();
    }

    function switchTurn() {
        currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
    }

    return {roundStart, placeMark};
}


const game = gameStart();
game.roundStart();