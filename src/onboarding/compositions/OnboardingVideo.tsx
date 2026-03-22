import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { Scene1Welcome } from '../scenes/Scene1Welcome';
import { Scene2Timeline } from '../scenes/Scene2Timeline';
import { Scene3Setup } from '../scenes/Scene3Setup';
import { Scene4NextSteps } from '../scenes/Scene4NextSteps';
import type { OnboardingProps } from '../types';

/**
 * Onboarding Video Composition — ~55 seconds @ 30fps = 1650 frames
 *
 * Scene 1 — Welcome:       frames 0–240    (0–8s)
 * Scene 2 — Timeline:      frames 240–660  (8–22s)
 * Scene 3 — Your Setup:    frames 660–1140 (22–38s)
 * Scene 4 — Next Steps:    frames 1140–1650 (38–55s)
 */
export const OnboardingVideo: React.FC<OnboardingProps> = ({ client, brand }) => {
  const { fps } = useVideoConfig();

  const scene1Start = 0;
  const scene1Duration = fps * 8;       // 240 frames

  const scene2Start = scene1Duration;
  const scene2Duration = fps * 14;      // 420 frames

  const scene3Start = scene2Start + scene2Duration;
  const scene3Duration = fps * 16;      // 480 frames

  const scene4Start = scene3Start + scene3Duration;
  const scene4Duration = fps * 17;      // 510 frames

  return (
    <>
      <Sequence from={scene1Start} durationInFrames={scene1Duration} name="Welcome">
        <Scene1Welcome clientName={client.clientName} brand={brand} />
      </Sequence>

      <Sequence from={scene2Start} durationInFrames={scene2Duration} name="Timeline">
        <Scene2Timeline client={client} brand={brand} />
      </Sequence>

      <Sequence from={scene3Start} durationInFrames={scene3Duration} name="Your Setup">
        <Scene3Setup client={client} brand={brand} />
      </Sequence>

      <Sequence from={scene4Start} durationInFrames={scene4Duration} name="Next Steps">
        <Scene4NextSteps client={client} brand={brand} />
      </Sequence>
    </>
  );
};
