import * as cf from './core-functions.js';
import clone from './../util/clone.js';

export default function gameMaker(state) {
    return {
        getState: function () {
            return clone(state);
        },
        move: function (options) {
            cf.move(state, options);
        },
        isMoveValid: function (options) {
            return cf.isMoveValid(state, options);
        },
        getValidMoves: function () {
            return cf.getValidMoves(state);
        }
    }
};
