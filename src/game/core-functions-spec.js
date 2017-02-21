import * as cf from "./core-functions.js";
import * as sf from "./state-functions.js";

describe("core", function () {


    describe("isFriendly", function () {
        it("test that the pos in question is owned by the playerInTurn", function () {
            expect(cf.isFriendly(sf.createState({playerInTurn: "white", board: [".bw"]}), {x: 0, y: 0})).toBe(false);
            expect(cf.isFriendly(sf.createState({playerInTurn: "white", board: [".bw"]}), {x: 1, y: 0})).toBe(false);
            expect(cf.isFriendly(sf.createState({playerInTurn: "white", board: [".bw"]}), {x: 2, y: 0})).toBe(true);
        });
    });

    describe("isEnemy", function () {
        it("test that the pos in question is owned by the opposing player of playerInTurn", function () {
            expect(cf.isEnemy(sf.createState({playerInTurn: "white", board: [".bw"]}), {x: 0, y: 0})).toBe(false);
            expect(cf.isEnemy(sf.createState({playerInTurn: "white", board: [".bw"]}), {x: 1, y: 0})).toBe(true);
            expect(cf.isEnemy(sf.createState({playerInTurn: "white", board: [".bw"]}), {x: 2, y: 0})).toBe(false);
        });
    });

    describe("isValidMove", function () {
        it("test that the pos in question is owned by the opposing player of playerInTurn", function () {
            expect(cf.isValidMove(sf.createState({playerInTurn: "white", board: [".bw"]}), {x: 0, y: 0})).toBe(true);
            expect(cf.isValidMove(sf.createState({playerInTurn: "white", board: [".bw"]}), {x: 1, y: 0})).toBe(false);
            expect(cf.isValidMove(sf.createState({playerInTurn: "white", board: [".bw"]}), {x: 2, y: 0})).toBe(false);
        });
    });

    describe("getValidMoves", function () {
        it("test that the pos in question is owned by the opposing player of playerInTurn", function () {
            expect(cf.getValidMoves(sf.createState({playerInTurn: "white", board: [".bw"]}))).toEqual([{x: 0, y: 0}]);
            expect(cf.getValidMoves(sf.createState({playerInTurn: "black", board: [".bw"]}))).toEqual([]);

            expect(cf.getValidMoves(sf.createState({
                playerInTurn: "white",
                board: [
                    "....",
                    "bb..",
                    "wbb."
                ]
            }))).toEqual([
                {x: 0, y: 0},
                {x: 2, y: 0},
                {x: 3, y: 2}]);
        });
    });

    describe("move", function () {
        it("test basic move functionality", function () {
            expect(cf.move(sf.createState({board: [".bw"]}), {x: 0, y: 0})).toEqual(sf.createState({
                playerInTurn: "black",
                board: ["www"]
            }));

            expect(cf.move(sf.createState({playerInTurn: "black", board: [".wb"]}), {x: 0, y: 0})).toEqual(sf.createState({
                playerInTurn: "white",
                board: ["bbb"]
            }));

            expect(cf.move(sf.createState({
                playerInTurn: "white",
                board: [
                    "w",
                    "b",
                    "."
                ]
            }), {x: 0, y: 2}))
                .toEqual(sf.createState({
                    playerInTurn: "black",
                    board: [
                        "w",
                        "w",
                        "w"
                    ]
                }));
        });

        it("test advanced move, changing pieces in multiple directions", function () {
            expect(cf.move(sf.createState(
                {
                    board: [
                        "w..w",
                        "b.b.",
                        "bb..",
                        ".bb."
                    ]
                }), {x: 0, y: 3})).toEqual(sf.createState({
                playerInTurn: "black",
                board: [
                    "w..w",
                    "w.w.",
                    "ww..",
                    "wbb."
                ]
            }));
        });
    });
});
