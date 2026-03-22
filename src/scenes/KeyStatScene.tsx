import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { Logo } from '../components/Logo';
import { ResultsCard } from '../components/ResultsCard';
import { Particles } from '../components/Particles';
import { BrandColors } from '../types';

interface KeyStatSceneProps {
  clientName: string;
  stats: { clientsGuaranteed: number; adSpend: string; timeframe: string };
  brand: BrandColors;
  width: number;
  height: number;
}

export const KeyStatScene: React.FC<KeyStatSceneProps> = ({
  clientName,
  stats,
  brand,
  width,
  height,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isStory = height > width;

  const nameOpacity = interpolate(frame, [15, 30], [0, 1], {
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
        gap: isStory ? 30 : 25,
      }}
    >
      <Particles width={width} height={height} color={brand.accentBlue} count={20} />

      <div style={{ zIndex: 1 }}>
        <Logo size={isStory ? 80 : 70} color={brand.accentBlue} animate />
      </div>

      <div
        style={{
          opacity: nameOpacity,
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: isStory ? 26 : 28,
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
          delay={10}
        />
      </div>
    </div>
  );
};
