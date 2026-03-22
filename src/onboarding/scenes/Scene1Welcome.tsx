import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from 'remotion';
import { CompassLogo } from '../components/CompassLogo';
import { ShimmerText } from '../components/ShimmerText';
import { Particles } from '../../components/Particles';
import type { OnboardingBrand } from '../types';

interface Scene1WelcomeProps {
  clientName: string;
  brand: OnboardingBrand;
}

export const Scene1Welcome: React.FC<Scene1WelcomeProps> = ({
  clientName,
  brand,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Main headline appears after logo settles
  const headlineDelay = 55;
  const headlineFrame = Math.max(0, frame - headlineDelay);

  const headlineScale = spring({
    frame: headlineFrame,
    fps,
    config: { damping: 12, stiffness: 60 },
    durationInFrames: 35,
  });

  const headlineOpacity = interpolate(headlineFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Scene fade out at the end
  const fadeOut = interpolate(frame, [210, 240], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.bgDark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut,
      }}
    >
      <Particles width={width} height={height} count={50} color={brand.accentBlue} />

      {/* Logo */}
      <div style={{ marginBottom: 40 }}>
        <CompassLogo size={160} color={brand.accentBlue} goldColor={brand.goldHighlight} />
      </div>

      {/* Welcome headline */}
      <div
        style={{
          opacity: headlineOpacity,
          transform: `scale(${headlineScale})`,
          textAlign: 'center',
          padding: '0 80px',
        }}
      >
        <div
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 700,
            fontSize: 62,
            color: brand.white,
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          Welcome to North Star,
        </div>
        <div
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 700,
            fontSize: 68,
            color: brand.goldHighlight,
            lineHeight: 1.2,
          }}
        >
          {clientName}!
        </div>
      </div>

      {/* Subtitle with shimmer */}
      <div style={{ marginTop: 36 }}>
        <ShimmerText
          text="Your growth journey starts now."
          fontSize={30}
          color={brand.textSecondary}
          shimmerColor={brand.goldHighlight}
          delay={headlineDelay + 25}
          fontFamily="Open Sans"
          fontWeight={400}
        />
      </div>
    </AbsoluteFill>
  );
};
