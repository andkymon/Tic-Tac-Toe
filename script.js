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

    return {display};
}

function Player(name, mark) {
    this.name = name;
    this.mark = mark;
}

function createPlayers(playerOneName, playerTwoName) {
    const playerOne = new Player(playerOneName, "X");
    const playerTwo = new Player(playerTwoName, "O");

    return {playerOne, playerTwo};
}

function gameStart() {
    const gameboard = createGameboard();
    const players = createPlayers("Kyle", "Hanz");
    let currentPlayer = players.playerOne;

    gameboard.display();
    console.log(`It's ${currentPlayer.name}'s turn!`);
}

gameStart();