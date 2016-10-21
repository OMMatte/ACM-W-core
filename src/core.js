// The functions here handle the rules/logic for the game
import * as gamestate from "./state.js"

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
	gamestate.setPiece(state, {x,y, color: state.playerInTurn});

	gamestate.setPiece(state, {x,y, color: state.playerInTurn});
	var leftX = getNextPlayerPieceXPosition(state, {initX: x,y, color: state.playerInTurn, incrementor: function(x){return x-1;}});
	var rightX = getNextPlayerPieceXPosition(state,{initX: x,y, color: state.playerInTurn, incrementor: function(x){return x+1;}});

	var topY = getNextPlayerPieceYPosition(state,{x, initY: y, color: state.playerInTurn, incrementor: function(x){return x-1;}});
	var bottomY = getNextPlayerPieceYPosition(state,{x, initY: y, color: state.playerInTurn, incrementor: function(x){return x+1;}});

	for(int xpos = leftX; xpos <= rightX; xpos++)
		gamestate.setPiece(state,{x: xpos, y, color: state.playerInTurn});
	for(int ypos = topY; ypos <= bottomY; ypos++)
		gamestate.setPiece(state,{x, y: ypos, color: state.playerInTurn});

	state.playerInTurn = state.playerInTurn === "white" ? "black" : "white";
}

function validMoves() {

}

function isValidMove(state, {x,y, color}) {

}

function score() {

}

export {
	makeMove,
	validMoves,
	isValidMove,
	score
}