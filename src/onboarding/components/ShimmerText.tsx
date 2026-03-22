import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface ShimmerTextProps {
  text: string;
  fontSize?: number;
  color?: string;
  shimmerColor?: string;
  delay?: number;
  fontFamily?: string;
  fontWeight?: number;
}

export const ShimmerText: React.FC<ShimmerTextProps> = ({
  text,
  fontSize = 28,
  color = '#8B949E',
  shimmerColor = '#D4A843',
  delay = 0,
  fontFamily = 'Open Sans',
  fontWeight = 400,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  const opacity = interpolate(adjustedFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Shimmer sweep position (moves from -100% to 200%)
  const shimmerX = interpolate(adjustedFrame, [15, 55], [-100, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        opacity,
        fontSize,
        fontFamily,
        fontWeight,
        color,
        letterSpacing: 1.5,
      }}
    >
      {text}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(90deg, transparent ${shimmerX - 30}%, ${shimmerColor}50 ${shimmerX}%, transparent ${shimmerX + 30}%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize,
          fontFamily,
          fontWeight,
          letterSpacing: 1.5,
        }}
      >
        {text}
      </div>
    </div>
  );
};
