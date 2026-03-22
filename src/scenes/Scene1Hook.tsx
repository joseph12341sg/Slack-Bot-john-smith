import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { Particles } from '../components/Particles';
import { BrandColors } from '../types';

interface Scene1Props {
  headline: string;
  brand: BrandColors;
  width: number;
  height: number;
}

export const Scene1Hook: React.FC<Scene1Props> = ({
  headline,
  brand,
  width,
  height,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const titleScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  const isStory = height > width;
  const fontSize = isStory ? 48 : 52;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: brand.bgDark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Particles width={width} height={height} color={brand.accentBlue} count={50} />
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize,
          color: brand.white,
          textAlign: 'center',
          padding: '0 60px',
          lineHeight: 1.3,
          zIndex: 1,
        }}
      >
        {headline}
      </div>
    </div>
  );
};
