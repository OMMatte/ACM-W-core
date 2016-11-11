import * as stateFunctions from "./state-functions.js";
import * as coreFunctions from "./core-functions.js";

describe("core", function () {

    describe("validMoves", function () {
        it("basic test", function () {
            var gameState = stateFunctions.createState({board: stateFunctions.createBoard(".bbw ...."), playerInTurn: "white"});
            expect(coreFunctions.validMoves(gameState)).toEqual([{x: 0, y: 0}]);
        });
    });

    describe("isValidMove", function () {
        it("basic test", function () {
            var gameState = stateFunctions.createState({board: stateFunctions.createBoard(".bw ..."), playerInTurn: "white"});
            expect(coreFunctions.isValidMove(gameState, {x: 0, y: 0})).toBe(true);
            expect(coreFunctions.isValidMove(gameState, {x: 1, y: 0})).toBe(false);
            expect(coreFunctions.isValidMove(gameState, {x: 2, y: 0})).toBe(false);
            expect(coreFunctions.isValidMove(gameState, {x: 1, y: 1})).toBe(false);
        });

        it("advanced test", function () {
            var gameState = stateFunctions.createState({board: stateFunctions.createBoard(".bbw ...."), playerInTurn: "white"});
            expect(coreFunctions.isValidMove(gameState, {x: 0, y: 0})).toBe(true);
            expect(coreFunctions.isValidMove(gameState, {x: 1, y: 0})).toBe(false);
            expect(coreFunctions.isValidMove(gameState, {x: 2, y: 0})).toBe(false);
            expect(coreFunctions.isValidMove(gameState, {x: 1, y: 1})).toBe(false);
        });

        it("diagonal test", function () {
            var gameState = stateFunctions.createState({board: stateFunctions.createBoard("..w .b. ..."), playerInTurn: "white"});
            expect(coreFunctions.isValidMove(gameState, {x: 0, y: 2})).toBe(true);
            expect(coreFunctions.isValidMove(gameState, {x: 1, y: 0})).toBe(false);
            expect(coreFunctions.isValidMove(gameState, {x: 2, y: 0})).toBe(false);
            expect(coreFunctions.isValidMove(gameState, {x: 1, y: 1})).toBe(false);
        });
    });

    describe("makeMove", function () {
        it("basic test", function () {
            var gameState = stateFunctions.createState({board: stateFunctions.createBoard(".bbw .bw."), playerInTurn: "white"});
            coreFunctions.makeMove(gameState, {x: 0, y: 0});
            expect(gameState.board).toEqual(stateFunctions.createBoard("wwww .bw."));
            expect(gameState.playerInTurn).toEqual("black");
            var historyState = stateFunctions.createState({board: stateFunctions.createBoard(".bbw .bw."), playerInTurn: "white"});
            historyState.history = null;
            expect(gameState.history).toEqual([historyState]);
        });

        it("no more moves test", function () {
            var gameState = stateFunctions.createState({board: stateFunctions.createBoard(".bbw ...."), playerInTurn: "white"});
            coreFunctions.makeMove(gameState, {x: 0, y: 0});
            expect(gameState.board).toEqual(stateFunctions.createBoard("wwww ...."));
            expect(gameState.playerInTurn).toEqual("white");
        });

        it("make diagonal move", function () {
            var gameState = stateFunctions.createState({board: stateFunctions.createBoard("..w .b. ..."), playerInTurn: "white"});
            coreFunctions.makeMove(gameState, {x: 0, y: 2});
            expect(gameState.board).toEqual(stateFunctions.createBoard("..w .w. w.."));
            expect(gameState.playerInTurn).toEqual("white");
        });
    });

    describe("score", function () {
        it("basic test", function () {
            var gameState = stateFunctions.createState({board: stateFunctions.createBoard(".bbw .bw."), playerInTurn: "white"});
            expect(coreFunctions.score(gameState, "black")).toEqual(3);
            expect(coreFunctions.score(gameState, "white")).toEqual(2);
        });
    });

    describe("gameOver", function () {
        it("basic test", function () {
            var gameState = stateFunctions.createState({board: stateFunctions.createBoard("bbbb wbb."), playerInTurn: "white"});
            expect(coreFunctions.isGameOver(gameState)).toEqual(false);

            coreFunctions.makeMove(gameState, {x: 3, y:1});
            expect(coreFunctions.isGameOver(gameState)).toEqual(true);
        });
    });
});

