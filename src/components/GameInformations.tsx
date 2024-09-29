import React from "react";
import {
  PlayerType,
  WinnerStringStateType,
} from "../types/tic-tac-toe.domain-model";

type Props = {
  player: PlayerType;
  winner: WinnerStringStateType;
  turn?: string;
};

export const GameInformations: React.FC<Props> = ({ winner, player, turn }) => {
  if (winner !== "none" || !player) {
    return null;
  }
  return (
    <div>
      <p>You are: {player}</p>
      <p>Next turn: {turn}</p>
    </div>
  );
};
