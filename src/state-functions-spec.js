import * as stateFunctions from "./state-functions.js";


describe("state", function () {

    describe("createBoard", function () {
        it("empty board creation", function () {
            expect(stateFunctions.createBoard()).toEqual([]);
        });
        it("simple board creation", function () {
            expect(stateFunctions.createBoard("... w.. .b."))
                .toEqual(
                    [[{color: null}, {color: null}, {color: null}],
                        [{color: "white"}, {color: null}, {color: null}],
                        [{color: null}, {color: "black"}, {color: null}]]
                );
        })
    });

    describe("createState", function () {
        it("creation", function () {
            expect(stateFunctions.createState({board: stateFunctions.createBoard('.. ..'), playerInTurn: "white"}))
                .toEqual({playerInTurn: "white", board: stateFunctions.createBoard('.. ..'), history: []});
        });
        it("empty", function () {
            expect(stateFunctions.createState({board: stateFunctions.createBoard(), playerInTurn: "white"}))
                .toEqual({playerInTurn: "white", board: stateFunctions.createBoard(), history: []});
        });
    });

    describe("createPiece", function () {
        it("white", function () {
            expect(stateFunctions.createPiece("white"))
                .toEqual({color: "white"});
        });
        it("black", function () {
            expect(stateFunctions.createPiece("black"))
                .toEqual({color: "black"});
        });
        it("empty", function () {
            expect(stateFunctions.createPiece(null))
                .toEqual({color: null});
        });
    });

    describe("charToColor", function () {
        it("black", function () {
            expect(stateFunctions.charToColor('b'))
                .toEqual("black");
        });
        it("white", function () {
            expect(stateFunctions.charToColor('w'))
                .toEqual("white");
        });
        it("empty", function () {
            expect(stateFunctions.charToColor('.'))
                .toEqual(null);
        });
        /*it("other", function() {
         expect(stateFunctions.charToColor('h'))
         .toThrow();
         });*/
    });


    describe("setPiece", function () {
        it("white", function () {
            var empty2x2Board = stateFunctions.createState({board: stateFunctions.createBoard(".. .."), playerInTurn: "white"});
            var expectedBoard = stateFunctions.createState({board: stateFunctions.createBoard("w. .."), playerInTurn: "white"});
            stateFunctions.setPiece(empty2x2Board, {x: 0, y: 0, color: "white"});
            expect(empty2x2Board).toEqual(expectedBoard);
        });

        it("black", function () {
            var empty2x2Board = stateFunctions.createState({board: stateFunctions.createBoard(".. .."), playerInTurn: "white"});
            var expectedBoard = stateFunctions.createState({board: stateFunctions.createBoard("b. .."), playerInTurn: "white"});
            stateFunctions.setPiece(empty2x2Board, {x: 0, y: 0, color: "black"});
            expect(empty2x2Board).toEqual(expectedBoard);
        });
    });

    describe("getPiece", function () {
        var initialBoard = stateFunctions.createState({board: stateFunctions.createBoard("w. b."), playerInTurn: "white"});

        it("white", function () {
            expect(stateFunctions.getPiece(initialBoard, {x: 0, y: 0}))
                .toEqual(stateFunctions.createPiece("white"));
        });

        it("black", function () {
            expect(stateFunctions.getPiece(initialBoard, {x: 0, y: 1}))
                .toEqual(stateFunctions.createPiece("black"));
        });

        it("empty", function () {
            expect(stateFunctions.getPiece(initialBoard, {x: 1, y: 1}))
                .toEqual(stateFunctions.createPiece(null));
        });
    });
});

