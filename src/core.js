// The functions here handle the rules/logic for the game
import * as stateFunctions from "./state.js"

function getNextPlayerPieceXPosition(state, {initX,y, color, incrementor}) {
	var opponentColor = color === "white" ? "black" : "white";
	var x = incrementor(initX);
	if((x < 0 || x >= state.board[y].length || state.board[y][x].color == null))
		return initX;

	for(; x < state.board[y].length; x = incrementor(x)) {
		if(state.board[y][x].color == opponentColor) continue;
		if(state.board[y][x].color == null) throw new Error("Invalid move attempted.");
		if(state.board[y][x].color == color) return x;
	}
	throw new Error("Invalid move attempted");
}

function getNextPlayerPieceYPosition(state, {x,initY, color, incrementor}) {
	var opponentColor = color === "white" ? "black" : "white";
	var y = incrementor(initY);
	if((y < 0 || y >= state.board.length || state.board[y][x].color == null))
		return initY;

	for(; y < state.board.length; y = incrementor(y)) {
		if(state.board[y][x].color == opponentColor) continue;
		if(state.board[y][x].color == null) throw new Error("Invalid move attempted.");
		if(state.board[y][x].color == color) return y;
	}
	throw new Error("Invalid move attempted");
}

function makeMove(state, {x,y}) {
	if(!isValidMove(state,{x,y, color: state.playerInTurn})) throw Error("The requested move is not valid.");
	stateFunctions.setPiece(state, {x,y, color: state.playerInTurn});

	stateFunctions.setPiece(state, {x,y, color: state.playerInTurn});
	var leftX = getNextPlayerPieceXPosition(state, {initX: x,y, color: state.playerInTurn, incrementor: function(x){return x-1;}});
	var rightX = getNextPlayerPieceXPosition(state,{initX: x,y, color: state.playerInTurn, incrementor: function(x){return x+1;}});

	var topY = getNextPlayerPieceYPosition(state,{x, initY: y, color: state.playerInTurn, incrementor: function(x){return x-1;}});
	var bottomY = getNextPlayerPieceYPosition(state,{x, initY: y, color: state.playerInTurn, incrementor: function(x){return x+1;}});

	for(var xpos = leftX; xpos <= rightX; xpos++)
		stateFunctions.setPiece(state,{x: xpos, y, color: state.playerInTurn});
	for(var ypos = topY; ypos <= bottomY; ypos++)
		stateFunctions.setPiece(state,{x, y: ypos, color: state.playerInTurn});

	state.playerInTurn = state.playerInTurn === "white" ? "black" : "white";
}

function validMoves(state) {
    var validMoves = [];
	for(var row = 0; row < state.board.length; row++) {
		for(var col = 0; col < state.board[row].length; col++) {
			if(isValidMove(state, {x: col, y: row})) {
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

    var directions = [[0, 1], [1, 1], [1, 0], [0, -1], [-1, -1], [-1, 0]];

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

function score() {

}

export {
	makeMove,
	validMoves,
	isValidMove,
	score
}