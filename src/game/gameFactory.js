import gameMaker from './game.js';
import * as sf from './state-functions.js';

function createDefaultGame() {
    return gameMaker(sf.createState({
        board: [
            "........",
            "........",
            "........",
            "...wb...",
            "...bw...",
            "........",
            "........",
            "........"
        ]
    }));
}

export {
    createDefaultGame
}