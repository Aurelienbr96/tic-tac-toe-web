import React from "react";

const OSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg height="100%" width="100%" viewBox="0 0 100 100" {...props}>
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#FFFFFF"
        strokeWidth="16"
        fill="none"
        className="o-animation"
      />
      <style>{`
        .o-animation {
          stroke-dasharray: 251.2;
          stroke-dashoffset: 251.2;
          animation: drawO 0.6s ease forwards;
          transform-origin: center;
          transform: rotate(-90deg);
        }
        
        @keyframes drawO {
          to {
            stroke-dashoffset: 0;
            transform: rotate(270deg);
          }
        }
      `}</style>
    </svg>
  );
};

export default OSVG;
