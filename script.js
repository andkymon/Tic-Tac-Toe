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

const game = createGameboard();
game.display();