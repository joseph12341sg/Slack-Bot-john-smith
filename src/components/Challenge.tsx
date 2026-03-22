import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONTS, SCENE_TIMINGS } from "../config";
import { CaseStudyConfig } from "../types";
import { ClockIcon, WarningIcon, FlatLineIcon } from "./Icons";

const BULLET_ICONS = [ClockIcon, WarningIcon, FlatLineIcon];

export const Challenge: React.FC<{
  config: CaseStudyConfig;
  landscape?: boolean;
}> = ({ config, landscape = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { duration } = SCENE_TIMINGS.challenge;

  const fadeIn = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  const underlineWidth = interpolate(frame, [fps * 0.3, fps * 1.2], [0, 100], {
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

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: landscape ? "row" : "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
        padding: landscape ? "0 100px" : "60px 60px",
        gap: landscape ? 80 : 40,
        opacity: Math.min(1, fadeOut),
      }}
    >
      {/* Left: Heading */}
      <div
        style={{
          flex: landscape ? "0 0 320px" : undefined,
          opacity: fadeIn,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.headline,
            fontSize: landscape ? 44 : 38,
            fontWeight: 700,
            color: COLORS.white,
            marginBottom: 12,
          }}
        >
          THE CHALLENGE
        </div>
        <div
          style={{
            height: 4,
            width: `${underlineWidth}%`,
            backgroundColor: COLORS.accentBlue,
            borderRadius: 2,
            maxWidth: 200,
          }}
        />
      </div>

      {/* Right: Bullet points */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 28,
          maxWidth: 700,
        }}
      >
        {config.challenges.map((challenge, i) => {
          const bulletStart = fps * 1.5 + i * fps * 1.5;
          const bulletOpacity = interpolate(
            frame,
            [bulletStart, bulletStart + fps * 0.6],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const bulletSlide = interpolate(
            frame,
            [bulletStart, bulletStart + fps * 0.6],
            [20, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const IconComponent = BULLET_ICONS[i % BULLET_ICONS.length];

          // Typewriter effect
          const typeProgress = interpolate(
            frame,
            [bulletStart, bulletStart + fps * 1.2],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const visibleChars = Math.floor(typeProgress * challenge.length);
          const displayText = challenge.substring(0, visibleChars);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                opacity: bulletOpacity,
                transform: `translateX(${bulletSlide}px)`,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: COLORS.cardSurface,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <IconComponent size={24} />
              </div>
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 22,
                  color: COLORS.white,
                  lineHeight: 1.5,
                }}
              >
                {displayText}
                <span style={{ opacity: 0 }}>
                  {challenge.substring(visibleChars)}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
