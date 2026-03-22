import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { Scene1Hook } from '../scenes/Scene1Hook';
import { KeyStatScene } from '../scenes/KeyStatScene';
import { Scene4CTA } from '../scenes/Scene4CTA';
import { VideoConfig } from '../types';

interface Ad15sProps {
  config: VideoConfig;
}

export const Ad15s: React.FC<Ad15sProps> = ({ config }) => {
  const { fps, width, height } = useVideoConfig();

  // 15s @ 30fps = 450 frames
  // Hook:     0–3s  (frames 0–89)
  // Key stat: 3–9s  (frames 90–269)
  // CTA:      9–15s (frames 270–449)

  return (
    <div style={{ width, height, backgroundColor: config.brand.bgDark }}>
      <Sequence from={0} durationInFrames={fps * 3}>
        <Scene1Hook
          headline={config.hookHeadline}
          brand={config.brand}
          width={width}
          height={height}
        />
      </Sequence>

      <Sequence from={fps * 3} durationInFrames={fps * 6}>
        <KeyStatScene
          clientName={config.clientName}
          stats={config.stats}
          brand={config.brand}
          width={width}
          height={height}
        />
      </Sequence>

      <Sequence from={fps * 9} durationInFrames={fps * 6}>
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
