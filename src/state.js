// Here is the data/state manager. That handles reading, writing and creation regarding the game state
// The functions here have no comprehension of the rules of the game

function charToColor(c) {
	if(c === '.') return null;
	if(c === 'b') return 'black';
	if(c==='w') return 'white';
	throw new Error("Failed to map char to piece.");
}

function createPiece(color) {
	return {color: color};
}

function createBoard(board = "") {
	if(!board) return [];
	var rows = board.split(' ');
	return rows.map(function(row) {
		var arr = [];
		for(var i = 0; i < row.length; i++) {
			arr[i] = createPiece(charToColor(row.charAt(i)));
		}
		return arr;
	});
}

function createState({board, playerInTurn}) {
	return {playerInTurn, board};
}

function setPiece(state, {x,y, color}) {
	state.board[y][x] = createPiece(color);
}

function getPiece(state, {x,y}) {
	if(y < 0 || y >= state.board.length) {
		return null;
	}
	if(x < 0 || x >= state.board[y].length) {
		return null;
	}
	return state.board[y][x];
}

function isFree(state, pos) {
	var piece = getPiece(state, pos);
	return !!piece && piece.color === null;
}

function isOpponent(state, pos) {
	var piece = getPiece(state, pos);
	return !!piece && piece.color === (state.playerInTurn === "white" ? "black" : "white");
}

function isFriendly(state, pos) {
	var piece = getPiece(state, pos);
	return !!piece && getPiece(state, pos).color === state.playerInTurn;
}

export {
	charToColor,

	createPiece,
	createBoard,
	createState,

	getPiece,
	setPiece,

	isFree,
	isOpponent,
	isFriendly
}