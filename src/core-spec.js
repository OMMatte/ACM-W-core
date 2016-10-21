import * as state from "./state.js";
import * as core from "./core.js";

describe("core", function () {

    describe("validMoves", function () {
        it("basic test", function () {
            var gameState = state.createState({board: state.createBoard(".bbw ...."), playerInTurn: "white"});
            expect(core.validMoves(gameState)).toEqual([{x: 0, y: 0}]);
        });
    });

    describe("isValidMove", function () {
        it("basic test", function () {
            var gameState = state.createState({board: state.createBoard(".bw ..."), playerInTurn: "white"});
            expect(core.isValidMove(gameState, {x: 0, y: 0})).toBe(true);
            expect(core.isValidMove(gameState, {x: 1, y: 0})).toBe(false);
            expect(core.isValidMove(gameState, {x: 2, y: 0})).toBe(false);
            expect(core.isValidMove(gameState, {x: 1, y: 1})).toBe(false);
        });

        it("advanced test", function () {
            var gameState = state.createState({board: state.createBoard(".bbw ...."), playerInTurn: "white"});
            expect(core.isValidMove(gameState, {x: 0, y: 0})).toBe(true);
            expect(core.isValidMove(gameState, {x: 1, y: 0})).toBe(false);
            expect(core.isValidMove(gameState, {x: 2, y: 0})).toBe(false);
            expect(core.isValidMove(gameState, {x: 1, y: 1})).toBe(false);
        });

        it("diagonal test", function () {
            var gameState = state.createState({board: state.createBoard("..w .b. ..."), playerInTurn: "white"});
            expect(core.isValidMove(gameState, {x: 0, y: 2})).toBe(true);
            expect(core.isValidMove(gameState, {x: 1, y: 0})).toBe(false);
            expect(core.isValidMove(gameState, {x: 2, y: 0})).toBe(false);
            expect(core.isValidMove(gameState, {x: 1, y: 1})).toBe(false);
        });
    });

    describe("makeMove", function () {
        it("basic test", function () {
            var gameState = state.createState({board: state.createBoard(".bbw .bw."), playerInTurn: "white"});
            core.makeMove(gameState, {x: 0, y: 0});
            expect(gameState.board).toEqual(state.createBoard("wwww .bw."));
            expect(gameState.playerInTurn).toEqual("black");
            var historyState = state.createState({board: state.createBoard(".bbw .bw."), playerInTurn: "white"});
            historyState.history = null;
            expect(gameState.history).toEqual([historyState]);
        });

        it("no more moves test", function () {
            var gameState = state.createState({board: state.createBoard(".bbw ...."), playerInTurn: "white"});
            core.makeMove(gameState, {x: 0, y: 0});
            expect(gameState.board).toEqual(state.createBoard("wwww ...."));
            expect(gameState.playerInTurn).toEqual("white");
        });

        it("make diagonal move", function () {
            var gameState = state.createState({board: state.createBoard("..w .b. ..."), playerInTurn: "white"});
            core.makeMove(gameState, {x: 0, y: 2});
            expect(gameState.board).toEqual(state.createBoard("..w .w. w.."));
            expect(gameState.playerInTurn).toEqual("white");
        });
    });

    describe("score", function () {
        it("basic test", function () {
            var gameState = state.createState({board: state.createBoard(".bbw .bw."), playerInTurn: "white"});
            expect(core.score(gameState, "black")).toEqual(3);
            expect(core.score(gameState, "white")).toEqual(2);
        });
    });

    describe("gameOver", function () {
        it("basic test", function () {
            var gameState = state.createState({board: state.createBoard("bbbb wbb."), playerInTurn: "white"});
            expect(core.isGameOver(gameState)).toEqual(false);

            core.makeMove(gameState, {x: 3, y:1});
            expect(core.isGameOver(gameState)).toEqual(true);
        });
    });
});

