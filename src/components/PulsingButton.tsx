import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface PulsingButtonProps {
  text: string;
  color?: string;
  textColor?: string;
  width?: number;
}

export const PulsingButton: React.FC<PulsingButtonProps> = ({
  text,
  color = '#5B7C99',
  textColor = '#FFFFFF',
  width = 400,
}) => {
  const frame = useCurrentFrame();

  const pulse = interpolate(frame % 30, [0, 15, 30], [1, 1.05, 1], {
    extrapolateRight: 'clamp',
  });

  const glowIntensity = interpolate(frame % 30, [0, 15, 30], [10, 25, 10], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        transform: `scale(${pulse})`,
        backgroundColor: color,
        color: textColor,
        padding: '20px 40px',
        borderRadius: 12,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: 24,
        textAlign: 'center',
        width,
        boxShadow: `0 0 ${glowIntensity}px ${color}, 0 4px 20px rgba(0,0,0,0.4)`,
        cursor: 'pointer',
      }}
    >
      {text}
    </div>
  );
};
