import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from 'remotion';
import { AnimatedChecklist } from '../components/AnimatedChecklist';
import { AccentLine } from '../components/AccentLine';
import { CompassLogo } from '../components/CompassLogo';
import { Particles } from '../../components/Particles';
import type { OnboardingBrand, OnboardingConfig } from '../types';

interface Scene4NextStepsProps {
  client: OnboardingConfig;
  brand: OnboardingBrand;
}

export const Scene4NextSteps: React.FC<Scene4NextStepsProps> = ({
  client,
  brand,
}) => {
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

  // Fade in
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Final frame elements appear later
  const finalFrameDelay = 130;
  const finalFrame = Math.max(0, frame - finalFrameDelay);

  const finalOpacity = interpolate(finalFrame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const finalScale = spring({
    frame: finalFrame,
    fps,
    config: { damping: 12, stiffness: 60 },
    durationInFrames: 30,
  });

  const checklistItems = [
    { text: 'Check your inbox for your onboarding questionnaire' },
    { text: `Book your kickoff call: ${client.bookingLink}` },
    { text: 'Add us on WhatsApp for fast support' },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.bgDark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeIn,
        padding: '50px 100px',
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
          Your Next Step
        </div>
      </div>

      {/* Accent line */}
      <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'center' }}>
        <AccentLine width={100} color={brand.goldHighlight} delay={10} />
      </div>

      {/* Checklist */}
      <AnimatedChecklist
        items={checklistItems}
        white={brand.white}
        goldColor={brand.goldHighlight}
        accentBlue={brand.accentBlue}
        cardBg={brand.cardBg}
      />

      {/* Final frame — closing message + logo lockup */}
      <div
        style={{
          opacity: finalOpacity,
          transform: `scale(${finalScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 50,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 700,
            fontSize: 34,
            color: brand.white,
            lineHeight: 1.3,
            marginBottom: 30,
          }}
        >
          We&apos;re excited to grow your firm,{' '}
          <span style={{ color: brand.goldHighlight }}>{client.clientName}</span>.
        </div>

        {/* Logo lockup */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <CompassLogo size={50} color={brand.accentBlue} goldColor={brand.goldHighlight} />
          <div
            style={{
              fontFamily: 'Open Sans',
              fontSize: 22,
              color: brand.textSecondary,
              letterSpacing: 1,
            }}
          >
            north-star-solution.com
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
