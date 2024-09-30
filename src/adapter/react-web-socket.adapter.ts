/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import WebSocketService from "../infra/socket";
import { Message, MessageToSend } from "../types/tic-tac-toe.socket-model";
import {
  Board,
  defaultBoardState,
  PlayerType,
  WinnerStringStateType,
} from "../types/tic-tac-toe.domain-model";

export type HandleBoardUpdateInputType = {
  nextPlayer: "x" | "o";
  board: Board;
};

export type HandleSetPlayerEventInputType = {
  player: PlayerType;
};

type AdapterInput = {
  handleBoardUpdateEvent: ({
    nextPlayer,
    board,
  }: HandleBoardUpdateInputType) => void;
  handleOnCloseConnection: () => void;
  handleSetPlayerEvent: ({ player }: HandleSetPlayerEventInputType) => void;
  handleWinnerEvent: (winner: WinnerStringStateType) => void;
};

export const useWebSocketAdapter = ({
  handleBoardUpdateEvent,
  handleSetPlayerEvent,
  handleWinnerEvent,
  handleOnCloseConnection,
}: AdapterInput) => {
  const socket = WebSocketService.getInstance();

  const handleMessage = (data: Message) => {
    console.log(data);
    switch (data.type) {
      case "board-update":
        handleBoardUpdateEvent({
          nextPlayer: data.data.turn,
          board: data.data.board,
        });
        break;

      case "set-player":
        handleSetPlayerEvent({
          player: data.data.player,
        });
        break;
      case "reset-board":
        handleBoardUpdateEvent({
          nextPlayer: "x",
          board: defaultBoardState,
        });
        handleWinnerEvent("none");
        break;

      case "set-winner":
        handleWinnerEvent(data.data.winner);
        break;
    }
  };

  const connect = (callback: () => void) => {
    socket
      .connect("wss://webs.aurelien-brachet.com//ws")
      .then(() => {
        socket.onReceiveMessage((msg) => handleMessage(msg));
        socket.onCloseConnection(handleOnCloseConnection);
        callback();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.closeConnection();
      }
    };
  }, []);

  const handleSetNextMove = (irow: number, icell: number, value: "x" | "o") => {
    socket.sendMessage({ x: irow, y: icell, m: value });
  };

  const handleResetState = () => {
    const messageToSend: MessageToSend = { x: 0, y: 0, m: "reset-board" };
    socket.sendMessage(messageToSend);
  };

  return {
    handleSetNextMove,
    handleResetState,
    connect,
    handleOnCloseConnection: socket.onCloseConnection,
  };
};
