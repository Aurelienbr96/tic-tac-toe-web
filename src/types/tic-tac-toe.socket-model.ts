import { Board, WinnerStringStateType } from "./tic-tac-toe.domain-model";

type BoardUpdateMessage = {
  type: "board-update";
  data: {
    board: Board;
    turn: "x" | "o";
  };
};

type SetWinnerMessage = {
  type: "set-winner";
  data: {
    winner: WinnerStringStateType;
  };
};

type SetResetBoardMessage = {
  type: "reset-board";
};

type SetPlayerMessage = {
  type: "set-player";
  data: {
    player: "x" | "o";
  };
};

export type Message =
  | BoardUpdateMessage
  | SetWinnerMessage
  | SetPlayerMessage
  | SetResetBoardMessage;

export type MessageToSend = {
  x: number;
  y: number;
  m: "x" | "o" | "reset-board";
};
