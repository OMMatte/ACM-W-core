// Helping factory for creating game instances.
// Also part of the public API for any client

import Game from "./game";

function create() {
    return Game();
}

export {
    create
}
