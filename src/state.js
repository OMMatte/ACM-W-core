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
	return state.board[y][x];
}

export {
	charToColor,

	createPiece,
	createBoard,
	createState,

	getPiece,
	setPiece,

}