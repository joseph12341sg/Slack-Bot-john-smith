import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { Logo } from '../components/Logo';
import { ResultsCard } from '../components/ResultsCard';
import { Particles } from '../components/Particles';
import { BrandColors } from '../types';

interface Scene3Props {
  clientName: string;
  stats: { clientsGuaranteed: number; adSpend: string; timeframe: string };
  testimonial: { quote: string; attribution: string };
  brand: BrandColors;
  width: number;
  height: number;
}

export const Scene3Solution: React.FC<Scene3Props> = ({
  clientName,
  stats,
  testimonial,
  brand,
  width,
  height,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isStory = height > width;

  const testimonialOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const nameOpacity = interpolate(frame, [25, 40], [0, 1], {
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
        gap: isStory ? 30 : 20,
      }}
    >
      <Particles width={width} height={height} color={brand.accentBlue} count={20} />

      <div style={{ zIndex: 1 }}>
        <Logo size={isStory ? 100 : 90} color={brand.accentBlue} animate />
      </div>

      <div
        style={{
          opacity: nameOpacity,
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: isStory ? 28 : 30,
          color: brand.white,
          zIndex: 1,
        }}
      >
        {clientName}
      </div>

      <div style={{ zIndex: 1, display: 'flex', justifyContent: 'center', width: '100%' }}>
        <ResultsCard
          clientsGuaranteed={stats.clientsGuaranteed}
          adSpend={stats.adSpend}
          timeframe={stats.timeframe}
          cardBg={brand.cardBg}
          goldHighlight={brand.goldHighlight}
          accentBlue={brand.accentBlue}
          white={brand.white}
          delay={30}
        />
      </div>

      <div
        style={{
          opacity: testimonialOpacity,
          fontFamily: 'Open Sans, sans-serif',
          fontSize: isStory ? 18 : 20,
          color: brand.textSecondary,
          textAlign: 'center',
          padding: '0 50px',
          fontStyle: 'italic',
          zIndex: 1,
          maxWidth: 500,
        }}
      >
        <div>{testimonial.quote}</div>
        <div
          style={{
            marginTop: 10,
            fontSize: isStory ? 15 : 16,
            color: brand.accentBlue,
          }}
        >
          {testimonial.attribution}
        </div>
      </div>
    </div>
  );
};
