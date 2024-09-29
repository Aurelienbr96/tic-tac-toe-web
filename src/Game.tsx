import React, { useState } from "react";

import { GameInformations } from "./components/GameInformations";
import { WaitingRoom } from "./components/WaitingRoom";
import { WinningBoard } from "./components/WinningBoard";
import { TicTacToeBoard } from "./components/TicTacToeBoard";

import {
  HandleBoardUpdateInputType,
  HandleSetPlayerEventInputType,
  useWebSocketAdapter,
} from "./adapter/react-web-socket.adapter";
import {
  Board,
  defaultBoardState,
  PlayerType,
  WinnerStringStateType,
} from "./types/tic-tac-toe.domain-model";

function Game(): React.ReactElement {
  const [player, setPlayer] = useState<PlayerType>();
  const [nextPlayer, setNextPlayer] = useState<"x" | "o" | undefined>(
    undefined
  );
  const [isLookingForAPlayer, setIsLookingForAPlayer] = useState(false);

  const [ticTacToeState, setTicTacToeState] =
    useState<Board>(defaultBoardState);
  const [winner, setWinner] = useState<WinnerStringStateType>("none");

  const handleBoardUpdateEvent = (obj: HandleBoardUpdateInputType) => {
    setNextPlayer(obj.nextPlayer);
    setTicTacToeState(obj.board);
  };

  const handleSetPlayerEvent = (obj: HandleSetPlayerEventInputType) => {
    setNextPlayer("x");
    setPlayer(obj.player);
  };

  const handleSetIsLookingForAPlayer = () => {
    setIsLookingForAPlayer((prev) => !prev);
  };

  const { handleResetState, handleSetNextMove, connect } = useWebSocketAdapter({
    handleBoardUpdateEvent,
    handleSetPlayerEvent,
    handleWinnerEvent: (w) => setWinner(w),
    handleOnCloseConnection: handleSetIsLookingForAPlayer,
  });

  const handleFindPlayer = () => {
    connect(handleSetIsLookingForAPlayer);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-green-500 pt-20">
      {isLookingForAPlayer ? (
        <WaitingRoom player={player} />
      ) : (
        <button
          onClick={handleFindPlayer}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Find a player
        </button>
      )}
      <GameInformations winner={winner} player={player} turn={nextPlayer} />
      <TicTacToeBoard
        player={player}
        winner={winner}
        handleSetNextMove={handleSetNextMove}
        ticTacToeState={ticTacToeState}
        turn={nextPlayer}
      />
      <WinningBoard winner={winner} handleResetState={handleResetState} />
    </div>
  );
}

export default Game;
