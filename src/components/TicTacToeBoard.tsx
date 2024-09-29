import React, { useEffect, useRef } from "react";
import XSVG from "./svg/XSVG";
import OSVG from "./svg/OSVG";

import {
  Board,
  PlayerType,
  WinnerStringStateType,
} from "../types/tic-tac-toe.domain-model";

type Props = {
  player: PlayerType;
  winner: WinnerStringStateType;
  ticTacToeState: Board;
  turn?: string;
  handleSetNextMove: (irow: number, icell: number, value: "x" | "o") => void;
};

export const TicTacToeBoard: React.FC<Props> = ({
  player,
  winner,
  ticTacToeState,
  turn,
  handleSetNextMove,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const prevWinnerRef = useRef<string>();

  useEffect(() => {
    if (winner !== "none") {
      boardRef.current?.classList.add("translate-y-[-50px]", "opacity-50");
    } else if (winner === "none" && prevWinnerRef.current !== "none") {
      boardRef.current?.classList.remove("translate-y-[-50px]", "opacity-50");
    }
    prevWinnerRef.current = winner;
  }, [winner]);

  if (!player) {
    return null;
  }

  return (
    <div
      ref={boardRef}
      className="w-[300px] h-[300px] mx-auto relative transition-all duration-300 ease-out"
    >
      {ticTacToeState.map((row, irow) => (
        <div key={irow} className="flex">
          {row.map((cell, icell) => (
            <button
              key={`${irow}-${icell}`}
              onClick={() => {
                const canClick =
                  ticTacToeState[irow][icell] === "" &&
                  winner === "none" &&
                  player !== undefined &&
                  turn === player;

                if (canClick) {
                  handleSetNextMove(irow, icell, player);
                }
              }}
              className={`flex-1 aspect-square flex items-center justify-center text-5xl
                ${irow === 0 ? "border-t-0" : "border-t-2"}
                ${irow === 2 ? "border-b-0" : "border-b-2"}
                ${icell === 0 ? "border-l-0" : "border-l-2"}
                ${icell === 2 ? "border-r-0" : "border-r-2"}
                border-gray-800 bg-transparent
                ${
                  ticTacToeState[irow][icell] !== "" ||
                  winner !== "none" ||
                  turn !== player
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              disabled={
                ticTacToeState[irow][icell] !== "" ||
                winner !== "none" ||
                turn !== player
              }
            >
              {cell === "x" ? (
                <XSVG className="w-full h-full" />
              ) : cell === "o" ? (
                <OSVG className="w-full h-full" />
              ) : null}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
