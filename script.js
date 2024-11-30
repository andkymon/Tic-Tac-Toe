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

function createPlayer(name, mark) {
    return {name, mark}
}

const game = createGameboard();
const playerOne = createPlayer("Kyle", "X");
const playerTwo = createPlayer("Hanz", "O");

game.display();
console.log(playerOne.name);
console.log(playerOne.mark);
console.log(playerTwo.name);
console.log(playerTwo.mark);