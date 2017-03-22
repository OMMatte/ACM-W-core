import React from "react";
import * as clientFunctions from './client-functions.js';
import * as gameFactory from './../game/gameFactory.js';

export default React.createClass({
    getInitialState: function () {
        return {
            game: gameFactory.createDefaultGame(),
            historyIndex: null,
        }
    },
    render: function () {
        var thisComponent = this;
        var game = thisComponent.state.game;
        var gameState = thisComponent.state.game.getState();
        var visualGameState;
        console.log("HistoryIndex: ", thisComponent.state.historyIndex);
        if (thisComponent.state.historyIndex === null) {
            visualGameState = gameState;
        } else {
            visualGameState = gameState.history[thisComponent.state.historyIndex];
        }
        return (
            <div>
                Player in turn: {visualGameState.playerInTurn}
                <table>
                    <tbody>{visualGameState.board.map(function (row, rowIndex) {
                        return <tr key={rowIndex}>{row.map(function (position, colIndex) {
                            console.log(position);
                            var backgroundColor = clientFunctions.getCellBackgroundColor(visualGameState, {row: rowIndex, col: colIndex});
                            return <td onClick={function () {
                                if (!game.isMoveValid({x: colIndex, y: rowIndex})) {
                                    console.log("Invalid move! X: ", colIndex, " Y: ", rowIndex);
                                    return;
                                }
                                game.move({x: colIndex, y: rowIndex});
                                thisComponent.forceUpdate();
                            }} key={colIndex} style={{width: 60, height: 60, backgroundColor: backgroundColor}}/>
                        })}</tr>;
                    })}</tbody>
                </table>
                <button onClick={function () {
                    if (thisComponent.state.historyIndex === 0) {
                        return;
                    }
                    if (thisComponent.state.historyIndex === null) {
                        thisComponent.state.historyIndex = gameState.history.length - 1;
                    } else {
                        thisComponent.state.historyIndex = thisComponent.state.historyIndex - 1;
                    }
                    thisComponent.forceUpdate();
                }}>Step back
                </button>
                <button onClick={function () {
                    if (thisComponent.state.historyIndex === null) {
                        return;
                    }
                    if (thisComponent.state.historyIndex === gameState.history.length - 1) {
                        thisComponent.state.historyIndex = null;
                    } else {
                        thisComponent.state.historyIndex = thisComponent.state.historyIndex + 1;
                    }
                    thisComponent.forceUpdate();
                }}>Step forward
                </button>
            </div>)
    }
});
