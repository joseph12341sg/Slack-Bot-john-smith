import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from 'remotion';
import { Timeline } from '../components/Timeline';
import { AccentLine } from '../components/AccentLine';
import { Particles } from '../../components/Particles';
import type { OnboardingBrand, OnboardingConfig } from '../types';

interface Scene2TimelineProps {
  client: OnboardingConfig;
  brand: OnboardingBrand;
}

export const Scene2Timeline: React.FC<Scene2TimelineProps> = ({
  client,
  brand,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Heading animation
  const headingScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
    durationInFrames: 25,
  });

  const headingOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Scene fade in/out
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [390, 420], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const milestones = [
    { week: 'Week 1', label: 'Strategy & Onboarding Call', icon: '🤝' },
    { week: 'Week 2', label: 'Ad Creative & Funnel Build', icon: '🎨' },
    {
      week: 'Week 3',
      label: `Campaign Launch — Targeting ${client.niche} in ${client.location}`,
      icon: '🚀',
    },
    { week: 'Week 4', label: 'First Leads & Optimisation', icon: '📈' },
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
      <Particles width={width} height={height} count={30} color={brand.accentBlue} />

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
          Here&apos;s What&apos;s Coming
        </div>
      </div>

      {/* Accent line */}
      <div style={{ marginBottom: 50, display: 'flex', justifyContent: 'center' }}>
        <AccentLine width={100} color={brand.goldHighlight} delay={10} />
      </div>

      {/* Timeline */}
      <div style={{ marginTop: 10 }}>
        <Timeline
          milestones={milestones}
          accentBlue={brand.accentBlue}
          goldColor={brand.goldHighlight}
          cardBg={brand.cardBg}
          white={brand.white}
          textSecondary={brand.textSecondary}
        />
      </div>
    </AbsoluteFill>
  );
};
