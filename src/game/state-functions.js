// Here is the data/state manager. That handles the reading, writing and creation regarding the game state
// The functions here have no comprehension of the rules of the game

function createState(options) {
    return {
        board: options.board.map(function (string) {
            return string.split("").map(function (char) {
                if (char === "w") {
                    return {player: "white"};
                } else if (char === "b") {
                    return {player: "black"};
                } else if (char === ".") {
                    return {player: null};
                } else {
                    throw new Error("Unknown char type for board: " + char);
                }
            })
        }),
        playerInTurn: options.playerInTurn || "white"
    }
}

function getBoard(state) {
    return state.board;
}

function getPlayerInTurn(state) {
    return state.playerInTurn;
}

function getPosition(state, options) {
    return state.board[options.y][options.x];
}

function isOccupied(state, options) {
    return getPosition(state, options).player !== null;
}

function isPositionInsideBoard(state, options) {
    if (options.x < 0 || options.x >= state.board[0].length) {
        return false;
    }
    if (options.y < 0 || options.y >= state.board.length) {
        return false;
    }
    return true;
}

function mark(state, options) {
    var pos = getPosition(state, {x: options.x, y: options.y});
    pos.player = options.player;
    return state;
}

function setPlayerInTurn(state, options) {
    state.playerInTurn = options.playerInTurn;
    return state;
}

export {
    createState,
    getBoard,
    getPlayerInTurn,
    getPosition,
    isOccupied,
    isPositionInsideBoard,
    mark,
    setPlayerInTurn
}


