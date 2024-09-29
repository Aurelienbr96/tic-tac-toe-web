import React, { useEffect, useRef } from "react";
import { WinnerStringStateType } from "../types/tic-tac-toe.domain-model";

type Props = {
  winner: WinnerStringStateType;
  handleResetState: () => void;
};

export const WinningBoard: React.FC<Props> = ({ winner, handleResetState }) => {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (winner !== "none" && boardRef.current) {
      boardRef.current.style.opacity = "1";
    }
  }, [winner]);

  if (winner === "none") {
    return null;
  }

  return (
    <div ref={boardRef} className="winning-board">
      <p className="winner-text">
        {winner === "draw" ? "Draw" : `Winner: ${winner}`}
      </p>
      <button onClick={handleResetState} className="play-again-button">
        Play Again
      </button>
    </div>
  );
};
