import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from 'remotion';
import { InfoCard } from '../components/InfoCard';
import { AccentLine } from '../components/AccentLine';
import { Particles } from '../../components/Particles';
import type { OnboardingBrand, OnboardingConfig } from '../types';

interface Scene3SetupProps {
  client: OnboardingConfig;
  brand: OnboardingBrand;
}

export const Scene3Setup: React.FC<Scene3SetupProps> = ({ client, brand }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const headingScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
    durationInFrames: 25,
  });

  const headingOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Scene transitions
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [450, 480], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cards = [
    { label: 'Your Niche', value: client.niche },
    { label: 'Your Area', value: client.location },
    {
      label: 'Your Target',
      value: `${client.guarantee} in ${client.timeframe}`,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.bgDark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: Math.min(fadeIn, fadeOut),
        padding: '60px 100px',
      }}
    >
      <Particles width={width} height={height} count={25} color={brand.accentBlue} />

      {/* Heading */}
      <div
        style={{
          opacity: headingOpacity,
          transform: `scale(${headingScale})`,
          textAlign: 'center',
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 700,
            fontSize: 44,
            color: brand.white,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          Tailored for Your Firm
        </div>
      </div>

      {/* Accent line */}
      <div style={{ marginBottom: 50, display: 'flex', justifyContent: 'center' }}>
        <AccentLine width={100} color={brand.goldHighlight} delay={10} />
      </div>

      {/* Info cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          alignItems: 'center',
        }}
      >
        {cards.map((card, i) => (
          <InfoCard
            key={i}
            label={card.label}
            value={card.value}
            delay={20 + i * 30}
            accentBlue={brand.accentBlue}
            cardBg={brand.cardBg}
            white={brand.white}
            goldColor={brand.goldHighlight}
            index={i}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
