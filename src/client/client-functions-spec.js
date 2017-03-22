import * as cf from "./client-functions.js";
import * as sf from "../game/state-functions.js";

describe("client", function () {
    describe("getCellBackgroundColor", function () {
        it("test that getCellBackgroundColor works", function () {
            var gameState = sf.createState({board: [".bw."]});
            expect(cf.getCellBackgroundColor(gameState, {row: 0, col: 0})).toEqual("yellow");
            expect(cf.getCellBackgroundColor(gameState, {row: 0, col: 1})).toEqual("black");
            expect(cf.getCellBackgroundColor(gameState, {row: 0, col: 2})).toEqual("white");
            expect(cf.getCellBackgroundColor(gameState, {row: 0, col: 3})).toEqual("green");
        });
    });
});
