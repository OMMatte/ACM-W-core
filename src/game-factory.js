// Helping factory for creating game instances.
// Also part of the public API for any client

import Game from "./game";
import * as stateFunctions from "./state-functions";

function createDefault() {
    return Game(stateFunctions.createState({board: stateFunctions.createBoard("........ ........ ........ ...bw... ...wb... ........ ........ ........"), playerInTurn: "white"}));
}

export {
    createDefault
}
