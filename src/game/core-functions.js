// The functions here handle the rules/logic for the game
import * as sf from './state-functions.js';

function getValidMoves(state) {
    // TODO
}

function isFriendly(state, options) {
    if(!sf.isPositionInsideBoard(state, options)) {
        return false;
    }
    return sf.getPosition(state, options).player === state.playerInTurn;
}

function isEnemy(state, options) {
    if(!sf.isPositionInsideBoard(state, options)) {
        return false;
    }
    return sf.getPosition(state, options).player === (state.playerInTurn === "white" ? "black" : "white");
}

function isValidMove(state, options) {
    // TODO
}

function move(state, options) {
    var x = options.x;
    var y = options.y;
    sf.mark(state, {x: x, y: y, player: state.playerInTurn});
    // if (!isValidMove(state, {x, y})) throw Error("The requested move is not valid.");

    var directions = [[0, 1], [1, 1], [1, 0], [0, -1], [-1, -1], [-1, 0], [1, -1], [-1, 1]];

    directions.forEach(function (dir) {
        var xDir = dir[0];
        var yDir = dir[1];

        for(var multiplier = 1; isEnemy(state, {x: x + xDir * multiplier, y: y + yDir * multiplier}); multiplier++) {
            if (isFriendly(state, {x: x + xDir * (multiplier + 1), y: y + yDir * (multiplier + 1)})) {
                for (var start = 0; start <= multiplier; start++) {
                    sf.mark(state, {x: x + xDir * start, y: y + yDir * start, player: state.playerInTurn});
                }
                return;
            }
        }
    });

    sf.setPlayerInTurn(state, {playerInTurn: state.playerInTurn === "white" ? "black" : "white"});
    return state;
}

export {
    getValidMoves,
    isFriendly,
    isEnemy,
    isValidMove,
    move,

}