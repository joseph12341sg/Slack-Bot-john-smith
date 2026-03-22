import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

interface CompassLogoProps {
  size?: number;
  color?: string;
  goldColor?: string;
}

export const CompassLogo: React.FC<CompassLogoProps> = ({
  size = 140,
  color = '#5B7C99',
  goldColor = '#D4A843',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Compass spins in then locks
  const spinProgress = interpolate(frame, [0, 50], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const rotation = interpolate(spinProgress, [0, 1], [0, 720]);

  const scale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
    durationInFrames: 50,
  });

  const glowIntensity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        filter: `drop-shadow(0 0 ${size * 0.2 * glowIntensity}px ${color}80)`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring */}
        <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" opacity="0.3" />
        <circle cx="50" cy="50" r="42" stroke={goldColor} strokeWidth="0.5" opacity="0.2" />

        {/* North — primary, gold-tipped */}
        <polygon points="50,5 44,38 50,32 56,38" fill={color} />
        <polygon points="50,5 47,20 50,16 53,20" fill={goldColor} opacity="0.8" />

        {/* South */}
        <polygon points="50,95 44,62 50,68 56,62" fill={color} opacity="0.6" />
        {/* East */}
        <polygon points="95,50 62,44 68,50 62,56" fill={color} opacity="0.6" />
        {/* West */}
        <polygon points="5,50 38,44 32,50 38,56" fill={color} opacity="0.6" />

        {/* Diagonal points */}
        <polygon points="82,18 55,40 58,43 60,38" fill={color} opacity="0.35" />
        <polygon points="18,18 40,40 43,38 42,43" fill={color} opacity="0.35" />
        <polygon points="82,82 60,62 58,57 55,60" fill={color} opacity="0.35" />
        <polygon points="18,82 40,60 42,57 43,62" fill={color} opacity="0.35" />

        {/* Center */}
        <circle cx="50" cy="50" r="7" fill={color} />
        <circle cx="50" cy="50" r="4" fill={goldColor} opacity="0.9" />
        <circle cx="50" cy="50" r="2" fill="#0E1116" />
      </svg>
    </div>
  );
};
