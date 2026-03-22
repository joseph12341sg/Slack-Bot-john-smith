import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Img,
  staticFile,
} from "remotion";
import { COLORS, FONTS, SCENE_TIMINGS } from "../config";
import { CaseStudyConfig } from "../types";

export const TitleCard: React.FC<{ config: CaseStudyConfig }> = ({
  config,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { duration } = SCENE_TIMINGS.titleCard;

  const fadeIn = interpolate(frame, [0, fps * 0.8], [0, 1], {
    extrapolateRight: "clamp",
  });

  const nameOpacity = interpolate(frame, [fps * 0.5, fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameSlide = interpolate(frame, [fps * 0.5, fps * 1.5], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [fps * 1.5, fps * 2.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [duration - fps * 0.5, duration],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const overallOpacity = Math.min(1, fadeOut);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
        opacity: overallOpacity,
      }}
    >
      {/* "CLIENT SUCCESS STORY" label */}
      <div
        style={{
          fontFamily: FONTS.headline,
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.gold,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          opacity: fadeIn,
          marginBottom: 40,
        }}
      >
        Client Success Story
      </div>

      {/* Client logo */}
      <div
        style={{
          opacity: nameOpacity,
          transform: `translateY(${nameSlide}px)`,
          marginBottom: 20,
        }}
      >
        <Img
          src={config.clientLogo}
          style={{
            maxWidth: 280,
            maxHeight: 100,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Client name */}
      <div
        style={{
          fontFamily: FONTS.headline,
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.white,
          opacity: nameOpacity,
          transform: `translateY(${nameSlide}px)`,
          textAlign: "center",
        }}
      >
        {config.clientName}
      </div>

      {/* Location | Niche subtitle */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 22,
          color: COLORS.textMuted,
          opacity: subtitleOpacity,
          marginTop: 16,
          letterSpacing: "0.05em",
        }}
      >
        {config.location} | {config.niche} Specialists
      </div>
    </div>
  );
};
