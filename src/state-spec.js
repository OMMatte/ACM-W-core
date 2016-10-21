import * as state from "./state.js";


describe("state", function () {

	describe("createBoard", function() {
		it("empty board creation",function(){
			expect(state.createBoard()).toEqual([]);
		});
		it("simple board creation",function(){
			expect(state.createBoard("... w.. .b."))
			.toEqual(
				[[{color: null},{color: null},{color: null}],
				[{color: "white"},{color: null},{color: null}],
				[{color: null},{color: "black"},{color: null}]]
			);
		})
	});

    describe("createState", function () {
        it("creation", function () {
            expect(state.createState({board: state.createBoard('.. ..'), playerInTurn: "white"}))
                .toEqual({playerInTurn: "white", board: state.createBoard('.. ..'), history: []});
        });
        it("empty", function () {
            expect(state.createState({board: state.createBoard(), playerInTurn: "white"}))
                .toEqual({playerInTurn: "white", board: state.createBoard(), history: []});
        });
    });

	describe("createPiece", function() {
		it("white", function() {
			expect(state.createPiece("white"))
			.toEqual({color: "white"});
		});
		it("black", function() {
			expect(state.createPiece("black"))
			.toEqual({color: "black"});
		});
		it("empty", function() {
			expect(state.createPiece(null))
			.toEqual({color: null});
		});
	});

	describe("charToColor", function(){
		it("black", function() {
			expect(state.charToColor('b'))
			.toEqual("black");
		});
		it("white", function() {
			expect(state.charToColor('w'))
			.toEqual("white");
		});
		it("empty", function() {
			expect(state.charToColor('.'))
			.toEqual(null);
		});
		/*it("other", function() {
			expect(state.charToColor('h'))
			.toThrow();
		});*/
	});


	describe("setPiece", function() {
		it("white", function() {
			var empty2x2Board = state.createState({ board: state.createBoard(".. .."), playerInTurn: "white"});
			var expectedBoard = state.createState({ board: state.createBoard("w. .."), playerInTurn: "white"});
            state.setPiece(empty2x2Board, {x:0,y:0,color: "white"});
			expect(empty2x2Board).toEqual(expectedBoard);
		});

		it("black", function() {
			var empty2x2Board = state.createState({ board: state.createBoard(".. .."), playerInTurn: "white"});
			var expectedBoard = state.createState({ board: state.createBoard("b. .."), playerInTurn: "white"});
            state.setPiece(empty2x2Board, {x:0,y:0,color: "black"});
			expect(empty2x2Board).toEqual(expectedBoard);
		});
	});

	describe("getPiece", function() {
		var initialBoard = state.createState({ board: state.createBoard("w. b."), playerInTurn: "white"});

		it("white", function() {
			expect(state.getPiece(initialBoard, {x:0,y:0}))
			.toEqual(state.createPiece("white"));
		});

		it("black", function() {
			expect(state.getPiece(initialBoard, {x:0,y:1}))
			.toEqual(state.createPiece("black"));
		});

		it("empty", function() {
			expect(state.getPiece(initialBoard, {x:1,y:1}))
			.toEqual(state.createPiece(null));
		});
	});
});

