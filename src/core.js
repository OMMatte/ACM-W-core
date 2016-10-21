// The functions here handle the rules/logic for the game
import * as gamestate from "state.js"

function getNextPlayerPieceXPosition(state, {initX,y, color, mapper}) {
	var opponentColor = color === "white" ? "black" : "white";
	var x = mapper(initX);
	if((x < 0 && x >= state.board[y].length()) || state.board[y][x].color == null) 
		return initX;

	for(; x < state.board[y].length(); x = mappper(x)) {
		if(state.board[y][x].color == opponentColor) continue;
		if(state.board[y][x].color == null) throw "Invalid move attempted.";
		if(state.board[y][x].color == color) return x;
	}
	throw "Invalid move attempted";
}

function getNextPlayerPieceXPosition(state, {initX,y, color, mapper}) {
	var opponentColor = color === "white" ? "black" : "white";
	var x = mapper(initX);
	if((x < 0 && x >= state.board[y].length()) || state.board[y][x].color == null) 
		return initX;
	
	for(; x < state.board[y].length(); x = mappper(x)) {
		if(state.board[y][x].color == opponentColor) continue;
		if(state.board[y][x].color == null) throw "Invalid move attempted.";
		if(state.board[y][x].color == color) return x;
	}
	throw "Invalid move attempted";
}

function makeMove(state, {x,y}) {
	if(!isValidMove(state,{x,y, color: state.playerInTurn})) throw "The requested move is not valid.";
	gamestate.setPiece(state, {x,y, color: state.playerInTurn});

	gamestate.setPiece(state, {x,y,state.playerInTurn});
	var leftX = getNextPlayerPieceXPosition(state,{x,y,state.playerInTurn,function(x){return x-1;}});
	var rightX = getNextPlayerPieceXPosition(state,{x,y,state.playerInTurn,function(x){return x+1;}});

	state.playerInTurn = state.playerInTurn === "white" ? "black" : "white";
}

function validMoves() {

}

function isValidMove(state, {x,y, color}) {

}

function score() {

}

export {
	makeMove
	validMoves
	isValidMove
	score
}