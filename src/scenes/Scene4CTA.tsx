import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { Logo } from '../components/Logo';
import { PulsingButton } from '../components/PulsingButton';
import { Particles } from '../components/Particles';
import { BrandColors } from '../types';

interface Scene4Props {
  cta: { headline: string; url: string };
  tagline: string;
  brand: BrandColors;
  width: number;
  height: number;
}

export const Scene4CTA: React.FC<Scene4Props> = ({
  cta,
  tagline,
  brand,
  width,
  height,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isStory = height > width;

  const contentScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  const urlOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const taglineOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

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
      }}
    >
      <Particles width={width} height={height} color={brand.accentBlue} count={30} />

      <div style={{ transform: `scale(${contentScale})`, zIndex: 1 }}>
        <PulsingButton
          text={cta.headline}
          color={brand.accentBlue}
          textColor={brand.white}
          width={isStory ? 380 : 450}
        />
      </div>

      <div
        style={{
          opacity: urlOpacity,
          fontFamily: 'Open Sans, sans-serif',
          fontSize: isStory ? 24 : 28,
          color: brand.goldHighlight,
          zIndex: 1,
          fontWeight: 600,
        }}
      >
        {cta.url}
      </div>

      <div
        style={{
          opacity: taglineOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 15,
          zIndex: 1,
          position: 'absolute',
          bottom: isStory ? 120 : 80,
        }}
      >
        <Logo size={50} color={brand.accentBlue} animate={false} />
        <div
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 16,
            color: brand.textSecondary,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          {tagline}
        </div>
      </div>
    </div>
  );
};
