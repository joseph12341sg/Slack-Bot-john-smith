import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface AccentLineProps {
  width?: number;
  color?: string;
  delay?: number;
}

export const AccentLine: React.FC<AccentLineProps> = ({
  width = 80,
  color = '#D4A843',
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  const lineWidth = interpolate(adjustedFrame, [0, 20], [0, width], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(adjustedFrame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: lineWidth,
        height: 3,
        backgroundColor: color,
        borderRadius: 2,
        opacity,
        boxShadow: `0 0 10px ${color}60`,
      }}
    />
  );
};
