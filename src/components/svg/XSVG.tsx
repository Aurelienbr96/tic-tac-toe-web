import React from "react";

const XSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg height="100%" width="100%" viewBox="0 0 100 100" {...props}>
      <path
        d="M10 10L90 90M90 10L10 90"
        stroke="#545454"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
        className="x-animation"
      />
      <style>{`
        .x-animation {
          stroke-dasharray: 113.14;
          stroke-dashoffset: 113.14;
          animation: drawX 0.6s ease forwards;
        }
        
        @keyframes drawX {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );
};

export default XSVG;
