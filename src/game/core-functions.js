// The functions here handle the rules/logic for the game
import * as sf from './state-functions.js';

function getValidMoves(state) {
    var validMoves = [];

    for (var row = 0; row < sf.getBoard(state).length; row++) {
        for (var col = 0; col < sf.getBoard(state)[0].length; col++) {
            if (isMoveValid(state, {x: col, y: row})) {
                validMoves.push({x: col, y: row});
            }
        }
    }

    return validMoves;
}

function getPositionsToSwap(state, options) {
    var x = options.x;
    var y = options.y;

    if (!sf.isPositionInsideBoard(state, options) || sf.isOccupied(state, options)) {
        return [];
    }

    var directions = [[0, 1], [1, 1], [1, 0], [0, -1], [-1, -1], [-1, 0], [1, -1], [-1, 1]];

    var positionsToSwap = [];
    directions.forEach(function (dir) {
        var xDir = dir[0];
        var yDir = dir[1];
        for (var multiplier = 1; isEnemy(state, {x: x + xDir * multiplier, y: y + yDir * multiplier}); multiplier++) {
            if (isFriendly(state, {x: x + xDir * (multiplier + 1), y: y + yDir * (multiplier + 1)})) {
                for (var start = 0; start <= multiplier; start++) {
                    positionsToSwap.push({x: x + xDir * start, y: y + yDir * start});
                }
                return;
            }
        }
    });

    return positionsToSwap;
}

function isFriendly(state, options) {
    if (!sf.isPositionInsideBoard(state, options)) {
        return false;
    }
    return sf.getPosition(state, options).player === sf.getPlayerInTurn(state);
}

function isEnemy(state, options) {
    if (!sf.isPositionInsideBoard(state, options)) {
        return false;
    }
    return sf.getPosition(state, options).player === (sf.getPlayerInTurn(state) === "white" ? "black" : "white");
}

function isMoveValid(state, options) {
  return getPositionsToSwap(state, options).length > 0;
}

function switchPlayerInTurn(state) {
    if (sf.getPlayerInTurn(state) === "white") {
        sf.setPlayerInTurn(state, {playerInTurn: "black"});
    } else {
        sf.setPlayerInTurn(state, {playerInTurn: "white"});
    }
    return state;
}

function move(state, options) {
    getPositionsToSwap(state, options).forEach(function (pos) {
        sf.mark(state, {x: pos.x, y: pos.y, player: sf.getPlayerInTurn(state)});
    });
    switchPlayerInTurn(state);
    return state;
}

export {
    getPositionsToSwap,
    getValidMoves,
    isFriendly,
    isEnemy,
    isMoveValid,
    move,
    switchPlayerInTurn
}
