import React from "react";

export const CompassStar: React.FC<{
  size?: number;
  color?: string;
  glowing?: boolean;
}> = ({ size = 60, color = "#5B7C99", glowing = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={
        glowing
          ? {
              filter: `drop-shadow(0 0 12px ${color}80) drop-shadow(0 0 24px ${color}40)`,
            }
          : undefined
      }
    >
      {/* Four-pointed compass star */}
      <polygon
        points="50,2 58,38 95,50 58,62 50,98 42,62 5,50 42,38"
        fill={color}
      />
      {/* Inner detail */}
      <polygon
        points="50,18 55,42 78,50 55,58 50,82 45,58 22,50 45,42"
        fill="#0E1116"
        opacity={0.3}
      />
      {/* Centre circle */}
      <circle cx="50" cy="50" r="6" fill={color} />
      <circle cx="50" cy="50" r="3" fill="#0E1116" />
    </svg>
  );
};
