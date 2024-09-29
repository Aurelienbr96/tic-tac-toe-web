import React from "react";
import { PlayerType } from "../types/tic-tac-toe.domain-model";

type Props = {
  player: PlayerType;
};

export const WaitingRoom: React.FC<Props> = ({ player }) => {
  if (player) {
    return null;
  }
  return (
    <div className="waiting-room">
      <p>Looking for a player please wait...</p>
      <div className="spinner"></div>
    </div>
  );
};
