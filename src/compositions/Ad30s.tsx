import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { Scene1Hook } from '../scenes/Scene1Hook';
import { Scene2PainPoints } from '../scenes/Scene2PainPoints';
import { Scene3Solution } from '../scenes/Scene3Solution';
import { Scene4CTA } from '../scenes/Scene4CTA';
import { VideoConfig } from '../types';

interface Ad30sProps {
  config: VideoConfig;
}

export const Ad30s: React.FC<Ad30sProps> = ({ config }) => {
  const { fps, width, height } = useVideoConfig();

  // 30s @ 30fps = 900 frames
  // Scene 1: 0–5s   (frames 0–149)
  // Scene 2: 5–12s  (frames 150–359)
  // Scene 3: 12–22s (frames 360–659)
  // Scene 4: 22–30s (frames 660–899)

  return (
    <div style={{ width, height, backgroundColor: config.brand.bgDark }}>
      <Sequence from={0} durationInFrames={fps * 5}>
        <Scene1Hook
          headline={config.hookHeadline}
          brand={config.brand}
          width={width}
          height={height}
        />
      </Sequence>

      <Sequence from={fps * 5} durationInFrames={fps * 7}>
        <Scene2PainPoints
          painPoints={config.painPoints}
          brand={config.brand}
          width={width}
          height={height}
        />
      </Sequence>

      <Sequence from={fps * 12} durationInFrames={fps * 10}>
        <Scene3Solution
          clientName={config.clientName}
          stats={config.stats}
          testimonial={config.testimonial}
          brand={config.brand}
          width={width}
          height={height}
        />
      </Sequence>

      <Sequence from={fps * 22} durationInFrames={fps * 8}>
        <Scene4CTA
          cta={config.cta}
          tagline={config.tagline}
          brand={config.brand}
          width={width}
          height={height}
        />
      </Sequence>
    </div>
  );
};
