import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

interface LogoProps {
  size?: number;
  color?: string;
  animate?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 120,
  color = '#5B7C99',
  animate = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = animate
    ? spring({ frame, fps, config: { damping: 12, stiffness: 80 } })
    : 1;

  const rotation = animate ? interpolate(frame, [0, 30], [0, 360], { extrapolateRight: 'clamp' }) : 0;

  const glowOpacity = animate
    ? interpolate(frame, [20, 40], [0, 0.6], { extrapolateRight: 'clamp' })
    : 0.6;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        filter: `drop-shadow(0 0 ${size * 0.15}px ${color}${Math.round(glowOpacity * 255).toString(16).padStart(2, '0')})`,
      }}
    >
      {/* Compass star SVG placeholder — replace with client logo SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring */}
        <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="2" opacity="0.3" />
        {/* North point (large) */}
        <polygon points="50,5 44,40 50,35 56,40" fill={color} />
        {/* South point */}
        <polygon points="50,95 44,60 50,65 56,60" fill={color} opacity="0.6" />
        {/* East point */}
        <polygon points="95,50 60,44 65,50 60,56" fill={color} opacity="0.6" />
        {/* West point */}
        <polygon points="5,50 40,44 35,50 40,56" fill={color} opacity="0.6" />
        {/* NE point */}
        <polygon points="82,18 55,40 58,43 60,38" fill={color} opacity="0.4" />
        {/* NW point */}
        <polygon points="18,18 40,40 43,38 42,43" fill={color} opacity="0.4" />
        {/* SE point */}
        <polygon points="82,82 60,62 58,57 55,60" fill={color} opacity="0.4" />
        {/* SW point */}
        <polygon points="18,82 40,60 42,57 43,62" fill={color} opacity="0.4" />
        {/* Center circle */}
        <circle cx="50" cy="50" r="6" fill={color} />
        <circle cx="50" cy="50" r="3" fill="#0E1116" />
      </svg>
    </div>
  );
};
