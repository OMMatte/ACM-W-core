import * as core from "./core"

// Here is the public API for the game. For any client to use

export default function Game(state) {
    return {
        state,
        makeMove: core.makeMove.bind(null, state),
        validMoves: core.validMoves.bind(null, state),
        isValidMove: core.isValidMove.bind(null, state)
    };
}
