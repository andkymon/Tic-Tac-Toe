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

    return {display, updateCell};
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
        console.log(`It's ${currentPlayer.name}'s turn!`);
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