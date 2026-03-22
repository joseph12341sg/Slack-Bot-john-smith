import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Audio,
  staticFile,
} from "remotion";
import { COLORS, SCENE_TIMINGS, TOTAL_DURATION } from "./config";
import { CaseStudyConfig } from "./types";
import { TitleCard } from "./components/TitleCard";
import { Challenge } from "./components/Challenge";
import { Solution } from "./components/Solution";
import { Results } from "./components/Results";
import { CTA } from "./components/CTA";

export const CaseStudy: React.FC<{
  config: CaseStudyConfig;
  landscape?: boolean;
}> = ({ config, landscape = true }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Background music */}
      {config.backgroundMusic && (
        <Audio src={staticFile(config.backgroundMusic)} volume={0.15} />
      )}

      {/* Scene 1: Title Card */}
      <Sequence
        from={SCENE_TIMINGS.titleCard.start}
        durationInFrames={SCENE_TIMINGS.titleCard.duration}
      >
        <TitleCard config={config} />
      </Sequence>

      {/* Scene 2: The Challenge */}
      <Sequence
        from={SCENE_TIMINGS.challenge.start}
        durationInFrames={SCENE_TIMINGS.challenge.duration}
      >
        <Challenge config={config} landscape={landscape} />
      </Sequence>

      {/* Scene 3: The Solution */}
      <Sequence
        from={SCENE_TIMINGS.solution.start}
        durationInFrames={SCENE_TIMINGS.solution.duration}
      >
        <Solution config={config} landscape={landscape} />
      </Sequence>

      {/* Scene 4: The Results */}
      <Sequence
        from={SCENE_TIMINGS.results.start}
        durationInFrames={SCENE_TIMINGS.results.duration}
      >
        <Results config={config} landscape={landscape} />
      </Sequence>

      {/* Scene 5: CTA */}
      <Sequence
        from={SCENE_TIMINGS.cta.start}
        durationInFrames={SCENE_TIMINGS.cta.duration}
      >
        <CTA landscape={landscape} />
      </Sequence>
    </AbsoluteFill>
  );
};
