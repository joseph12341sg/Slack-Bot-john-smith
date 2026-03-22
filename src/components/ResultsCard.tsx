import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

interface ResultsCardProps {
  clientsGuaranteed: number;
  adSpend: string;
  timeframe: string;
  cardBg: string;
  goldHighlight: string;
  accentBlue: string;
  white: string;
  delay?: number;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({
  clientsGuaranteed,
  adSpend,
  timeframe,
  cardBg,
  goldHighlight,
  accentBlue,
  white,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const slideUp = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const translateY = interpolate(slideUp, [0, 1], [80, 0]);
  const opacity = interpolate(adjustedFrame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        backgroundColor: cardBg,
        borderRadius: 16,
        padding: '32px 40px',
        border: `1px solid ${accentBlue}33`,
        width: '85%',
        maxWidth: 500,
      }}
    >
      <div
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 32,
          color: goldHighlight,
          textAlign: 'center',
          marginBottom: 12,
        }}
      >
        {clientsGuaranteed} New Clients Guaranteed in {timeframe}
      </div>
      <div
        style={{
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 22,
          color: white,
          textAlign: 'center',
          opacity: 0.9,
        }}
      >
        {adSpend} ad spend → Predictable Growth
      </div>
    </div>
  );
};
