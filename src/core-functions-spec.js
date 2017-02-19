import * as coreFunctions from "./core-functions.js";

describe("core", function () {
    describe("helloWorld", function () {
        it("basic test", function () {
            expect(coreFunctions.helloWorld()).toEqual("Hello World!");
        });
    });
});
