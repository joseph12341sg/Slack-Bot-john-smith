import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { Particles } from '../components/Particles';
import { BrandColors } from '../types';

interface Scene2Props {
  painPoints: string[];
  brand: BrandColors;
  width: number;
  height: number;
}

export const Scene2PainPoints: React.FC<Scene2Props> = ({
  painPoints,
  brand,
  width,
  height,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isStory = height > width;
  const fontSize = isStory ? 30 : 34;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: brand.bgDark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        gap: isStory ? 40 : 30,
        padding: '0 40px',
      }}
    >
      <Particles width={width} height={height} color={brand.accentBlue} count={25} />
      {painPoints.map((point, index) => {
        const delay = index * 20;
        const adjustedFrame = Math.max(0, frame - delay);

        const slideX = spring({
          frame: adjustedFrame,
          fps,
          config: { damping: 14, stiffness: 80 },
        });

        const translateX = interpolate(slideX, [0, 1], [-200, 0]);
        const opacity = interpolate(adjustedFrame, [0, 10], [0, 1], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={index}
            style={{
              transform: `translateX(${translateX}px)`,
              opacity,
              fontFamily: 'Open Sans, sans-serif',
              fontSize,
              color: brand.white,
              zIndex: 1,
              textAlign: 'left',
              width: '85%',
              maxWidth: 600,
            }}
          >
            {point}
          </div>
        );
      })}
    </div>
  );
};
