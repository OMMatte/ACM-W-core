import * as coreFunctions from '../game/core-functions';
import * as stateFunctions from '../game/state-functions';

function helloWorld() {
    return "Hello World!";
}

function getCellBackgroundColor(gameState, {row, col}) {
    if (stateFunctions.isWhiteCell(gameState, {x: col, y: row})) {
        return "white";
    }
    if (stateFunctions.isBlackCell(gameState, {x: col, y: row})) {
        return "black";
    }
    if (coreFunctions.isMoveValid(gameState, {x: col, y: row})) {
        return "yellow";
    }
    return "green";
}

export {
    helloWorld,
    getCellBackgroundColor
}