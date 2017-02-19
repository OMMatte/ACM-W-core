import * as stateFunctions from "./state-functions.js";

describe("state", function () {
    describe("helloWorld", function () {
        it("basic test", function () {
            expect(stateFunctions.helloWorld()).toEqual("Hello World!");
        });
    });
});
