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

    describe("getPositionsToSwap", function () {
        it("test that the player in turn gets positions to swap given a position", function () {
            expect(cf.getPositionsToSwap(sf.createState({board: [".bbw"]}), {x: 0, y: 0})).toEqual(
                [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}]
            );
            expect(cf.getPositionsToSwap(sf.createState({board: [".bbw"]}), {x: 1, y: 0})).toEqual(
                []
            );
            // expect(cf.getPositionsToSwap(sf.createState({board: [".bbw"]}), {x: 3, y: 0})).toEqual(
            //     []
            // );
            // expect(cf.getPositionsToSwap(sf.createState({board: ["..bw"]}), {x: 0, y: 0})).toEqual(
            //     []
            // );
        });
    });

    describe("isMoveValid", function () {
        it("test that the pos in question is owned by the opposing player of playerInTurn", function () {
            expect(cf.isMoveValid(sf.createState({playerInTurn: "white", board: [".bw"]}), {x: 0, y: 0})).toBe(true);
            expect(cf.isMoveValid(sf.createState({playerInTurn: "white", board: ["..bw"]}), {x: 0, y: 0})).toBe(false);
            expect(cf.isMoveValid(sf.createState({playerInTurn: "white", board: [".bw"]}), {x: 1, y: 0})).toBe(false);
            expect(cf.isMoveValid(sf.createState({playerInTurn: "white", board: [".bw"]}), {x: 2, y: 0})).toBe(false);
        });
    });

    describe("getValidMoves", function () {
        it("test that the pos in question is owned by the opposing player of playerInTurn", function () {
            expect(cf.getValidMoves(sf.createState({playerInTurn: "white", board: [".bw"]}))).toEqual([{x: 0, y: 0}]);
            // expect(cf.getValidMoves(sf.createState({playerInTurn: "black", board: [".bw"]}))).toEqual([]);
            //
            // expect(cf.getValidMoves(sf.createState({
            //     playerInTurn: "white",
            //     board: [
            //         "....",
            //         "bb..",
            //         "w.b."
            //     ]
            // }))).toEqual([
            //     {x: 0, y: 0},
            //     {x: 2, y: 0}]);
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

            it("test advanced move, changing pieces in multiple directions", function () {
                expect(cf.move(sf.createState(
                    {
                        board: [
                            "b...",
                            "w.w.",
                            "bb..",
                            ".bb."
                        ]
                    }), {x: 0, y: 3})).toEqual(sf.createState({
                    playerInTurn: "black",
                    board: [
                        "b...",
                        "w.w.",
                        "ww..",
                        "wbb."
                    ]
                }));
            });
        });
    });

    describe("switchPlayerInTurn", function () {
        it("test basic functionality", function () {
            expect(sf.getPlayerInTurn(cf.switchPlayerInTurn(sf.createState({playerInTurn: "white", board: [""]})))).toEqual("black");
            expect(sf.getPlayerInTurn(cf.switchPlayerInTurn(sf.createState({playerInTurn: "black", board: [""]})))).toEqual("white");
        });
    });
});
