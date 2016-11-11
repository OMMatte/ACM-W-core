// The functions here handle the rules/logic for the game

import * as stateFunctions from "./state-functions.js"
import clone from "./clone.js"

function makeMove(state, {x,y}) {
    if (!isValidMove(state, {x, y, color: state.playerInTurn})) throw Error("The requested move is not valid.");

    var historyState = clone(state);
    historyState.history = null;
    state.history.push(historyState);

    stateFunctions.setPiece(state, {x, y, color: state.playerInTurn});
    var directions = [[0, 1], [1, 1], [1, 0], [0, -1], [-1, -1], [-1, 0], [1, -1], [-1, 1]];

    directions.forEach(function (dir) {
        var xDir = dir[0];
        var yDir = dir[1];
        for (var multiplier = 1; stateFunctions.isOpponent(state, {x: x + xDir * multiplier, y: y + yDir * multiplier}); multiplier++) {
            if (stateFunctions.isFriendly(state, {x: x + xDir * (multiplier + 1), y: y + yDir * (multiplier + 1)})) {
                for (var start = 0; start <= multiplier; start++) {
                    stateFunctions.setPiece(state, {x: x + xDir * start, y: y + yDir * start, color: state.playerInTurn});
                }
                return;
            }
        }
    });

    state.playerInTurn = state.playerInTurn === "white" ? "black" : "white";
    if (validMoves(state).length === 0) {
        state.playerInTurn = state.playerInTurn === "white" ? "black" : "white";
    }
}

function validMoves(state) {
    var validMoves = [];
    for (var row = 0; row < state.board.length; row++) {
        for (var col = 0; col < state.board[row].length; col++) {
            if (isValidMove(state, {x: col, y: row})) {
                validMoves.push({x: col, y: row});
            }
        }
    }
    return validMoves;
}

function isValidMove(state, {x,y}) {
    if (!stateFunctions.isFree(state, {x, y})) {
        return false;
    }
    var validMove = false;

    var directions = [[0, 1], [1, 1], [1, 0], [0, -1], [-1, -1], [-1, 0], [1, -1], [-1, 1]];

    directions.forEach(function (dir) {
        var xDir = dir[0];
        var yDir = dir[1];
        for (var multiplier = 1; stateFunctions.isOpponent(state, {x: x + xDir * multiplier, y: y + yDir * multiplier}); multiplier++) {
            if (stateFunctions.isFriendly(state, {x: x + xDir * (multiplier + 1), y: y + yDir * (multiplier + 1)})) {
                validMove = true;
            }
        }
    });
    return validMove;
}

function score(state, color) {
    var score = 0;
    state.board.forEach(function (row) {
        row.forEach(function (piece) {
            if (piece.color === color) {
                score++;
            }
        });
    });

    return score;
}

function isGameOver(state) {
    return validMoves(state).length === 0;
}

export {
    makeMove,
    validMoves,
    isValidMove,
    score,
    isGameOver
}