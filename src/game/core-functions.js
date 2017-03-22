// The functions here handle the rules/logic for the game
import * as sf from './state-functions.js';
import clone from './../util/clone.js';

function getValidMoves(state) {
    return sf.getBoard(state).reduce(function (result, row, y) {
        return result.concat(row.reduce(function (rowResult, position, x) {
            if (isMoveValid(state, {x: x, y: y})) {
                rowResult.push({x: x, y: y});
            }
            return rowResult;
        }, []))
    }, []);
}

function getPositionsToSwap(state, options) {
    var x = options.x;
    var y = options.y;

    if (!sf.isPositionInsideBoard(state, options) || sf.isOccupied(state, options)) {
        return [];
    }

    var getPositionsToSwapInDirection = function (direction) {
        var xDir = direction[0];
        var yDir = direction[1];

        var innerLoop = function (result, multiplier) {
            var position = {x: x + xDir * multiplier, y: y + yDir * multiplier};
            if (isEnemy(state, position)) {
                result.push(position);
                return innerLoop(result, multiplier + 1);
            } else if (isFriendly(state, position)) {
                return result;
            } else {
                return [];
            }
        };
        return innerLoop([], 1);
    };

    var directions = [[0, 1], [1, 1], [1, 0], [0, -1], [-1, -1], [-1, 0], [1, -1], [-1, 1]];

    var positionsToSwap = [{x: options.x, y: options.y}].concat(directions.reduce(function (result, direction) {
        return result.concat(getPositionsToSwapInDirection(direction));
    }, []));

    if (positionsToSwap.length > 1) {
        return positionsToSwap;
    }
    return [];
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
    console.log(options);
    return getPositionsToSwap(state, options).length > 0;
}

function    switchPlayerInTurn(state) {
    if (sf.getPlayerInTurn(state) === "white") {
        sf.setPlayerInTurn(state, {playerInTurn: "black"});
    } else {
        sf.setPlayerInTurn(state, {playerInTurn: "white"});
    }
    return state;
}

function move(state, options) {
    var clonedState = clone(state);
    clonedState.history = null;
    state.history.push(clonedState);

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
