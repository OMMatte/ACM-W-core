import * as state from "state.js";


describe("state", function () {

	describe("createBoard", function() {
		it("empty board creation",function(){
			expect(state.createBoard()).toEqual([]);
		});
		it("simple board creation",function(){
			expect(state.createBoard("... w.. .b."))
			.toEqual({[[{color: null},{piece: null},{piece: null}],
				[{piece: "white"},{piece: null},{piece: null}],
				[{piece: null},{piece: "black"},{piece: null}]]});
		})
	});

	describe("createPiece", function() {
		it("white", function() {
			expect(state.createPiece({"white"}))
			.toEqual({color: "white"});
		});
		it("black", function() {
			expect(state.createPiece({"black"}))
			.toEqual({color: "black"});
		});
		it("empty", function() {
			expect(state.createPiece({null}))
			.toEqual({color: null});
		});
	});

	describe("charToPiece", function(){
		it("black", function() {
			expect(state.charToPiece('b'))
			.toEqual("black");
		});
		it("white", function() {
			expect(state.charToPiece('w'))
			.toEqual("white");
		});
		it("empty", function() {
			expect(state.charToPiece('.'))
			.toEqual(null);
		});
		it("other", function() {
			expect(state.charToPiece('h'))
			.toThrow();
		});
	});


	describe("setPiece", function() {
		it("white", function() {
			var empty2x2Board = state.createState({state.createBoard(".. .."),"white"});
			var expectedBoard = state.createState({state.createBoard("w. .."), "white"});
			expect(empty2x2Board, {0,0, "white"})
			.toEqual(expectedBoard);
		});

		it("black", function() {
			var empty2x2Board = state.createState({state.createBoard(".. .."),"white"});
			var expectedBoard = state.createState({state.createBoard("b. .."), "white"});
			expect(empty2x2Board, {0,0, "black"})
			.toEqual(expectedBoard);
		});

		it("black", function() {
			var empty2x2Board = state.createState({state.createBoard(".. .."),"white"});
			var expectedBoard = state.createState({state.createBoard("b. .."), "white"});
			expect(empty2x2Board, {0,0, "black"})
			.toEqual(expectedBoard);
		});
	});

	describe("getPiece", function() {
		var initialBoard = state.createState({state.createBoard("w. b."), "white"});

		it("white", function() {
			expect(initialBoard, {0,0})
			.toEqual(createPiece({"white"}));
		});

		it("black", function() {
			expect(initialBoard, {0,0})
			.toEqual(createPiece({"black"}));
		});

		it("empty", function() {
			expect(initialBoard, {0,0, "black"})
			.toEqual(createPiece({null}));
		});
	});
});

