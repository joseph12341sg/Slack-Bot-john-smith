import React from "react";
import { Composition } from "remotion";
import { CaseStudy } from "./CaseStudy";
import { defaultConfig, FPS, TOTAL_DURATION } from "./config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Landscape — 1920×1080 for YouTube / website */}
      <Composition
        id="CaseStudy-Landscape"
        component={CaseStudy}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          config: defaultConfig,
          landscape: true,
        }}
      />

      {/* Square — 1080×1080 for social feed */}
      <Composition
        id="CaseStudy-Square"
        component={CaseStudy}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={1080}
        height={1080}
        defaultProps={{
          config: defaultConfig,
          landscape: false,
        }}
      />
    </>
  );
};
