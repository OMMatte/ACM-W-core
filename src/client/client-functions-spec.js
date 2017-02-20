import * as clientFunctions from "./client-functions.js";

describe("client", function () {
    describe("helloWorld", function () {
        it("basic test", function () {
            expect(clientFunctions.helloWorld()).toEqual("Hello World!");
        });
    });
});
