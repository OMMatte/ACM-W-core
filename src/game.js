import * as coreFunctions from "./core-functions"

// Here is the public API for the game. For any client to use

export default function Game(state) {
    return {
        state,
        makeMove: coreFunctions.makeMove.bind(null, state),
        validMoves: coreFunctions.validMoves.bind(null, state),
        isValidMove: coreFunctions.isValidMove.bind(null, state),
        isGameOver: coreFunctions.isGameOver.bind(null, state)
    };
}


