import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

interface InfoCardProps {
  label: string;
  value: string;
  delay?: number;
  accentBlue?: string;
  cardBg?: string;
  white?: string;
  goldColor?: string;
  index?: number;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  label,
  value,
  delay = 0,
  accentBlue = '#5B7C99',
  cardBg = '#161B22',
  white = '#FFFFFF',
  goldColor = '#D4A843',
  index = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  const slideProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 13, stiffness: 70 },
    durationInFrames: 35,
  });

  const opacity = interpolate(adjustedFrame, [0, 18], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Cards slide in from alternating sides
  const direction = index % 2 === 0 ? -1 : 1;
  const translateX = (1 - slideProgress) * 120 * direction;

  // Border glow
  const glowIntensity = interpolate(adjustedFrame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        backgroundColor: cardBg,
        borderRadius: 16,
        padding: '32px 40px',
        border: `1.5px solid ${accentBlue}`,
        boxShadow: `0 0 ${20 * glowIntensity}px ${accentBlue}40, inset 0 1px 0 ${white}08`,
        minWidth: 580,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'Open Sans',
          fontSize: 18,
          color: accentBlue,
          textTransform: 'uppercase',
          letterSpacing: 3,
          marginBottom: 10,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'Montserrat',
          fontWeight: 700,
          fontSize: 34,
          color: white,
        }}
      >
        {value}
      </div>
    </div>
  );
};
