import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONTS, SCENE_TIMINGS } from "../config";
import { CaseStudyConfig } from "../types";
import { CompassStar } from "./CompassStar";
import { AdsIcon, FunnelIcon, CalendarIcon } from "./Icons";

const DEFAULT_PILLARS = [
  { title: "Targeted Meta Ads", Icon: AdsIcon },
  { title: "Conversion-Optimised Funnel", Icon: FunnelIcon },
  { title: "Appointment Setting System", Icon: CalendarIcon },
];

export const Solution: React.FC<{
  config: CaseStudyConfig;
  landscape?: boolean;
}> = ({ config, landscape = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { duration } = SCENE_TIMINGS.solution;

  const fadeOut = interpolate(
    frame,
    [duration - fps * 0.5, duration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Compass star spin-in
  const starRotation = interpolate(frame, [0, fps * 1.5], [180, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const starScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const headingOpacity = interpolate(frame, [fps * 0.3, fps * 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const connectingTextOpacity = interpolate(
    frame,
    [fps * 8, fps * 9],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const pillars = config.solutionPillars
    ? config.solutionPillars.map((p, i) => ({
        title: p.title,
        Icon: DEFAULT_PILLARS[i % DEFAULT_PILLARS.length].Icon,
      }))
    : DEFAULT_PILLARS;

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
        padding: landscape ? "0 80px" : "60px 40px",
        opacity: Math.min(1, fadeOut),
      }}
    >
      {/* Heading with compass star */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 60,
          opacity: headingOpacity,
        }}
      >
        <div
          style={{
            transform: `rotate(${starRotation}deg) scale(${starScale})`,
          }}
        >
          <CompassStar size={50} color={COLORS.accentBlue} />
        </div>
        <div
          style={{
            fontFamily: FONTS.headline,
            fontSize: landscape ? 40 : 32,
            fontWeight: 700,
            color: COLORS.white,
          }}
        >
          THE NORTH STAR APPROACH
        </div>
      </div>

      {/* Three pillar cards */}
      <div
        style={{
          display: "flex",
          flexDirection: landscape ? "row" : "column",
          gap: 30,
          marginBottom: 50,
        }}
      >
        {pillars.map((pillar, i) => {
          const cardDelay = fps * 2 + i * fps * 1.5;
          const cardScale = spring({
            frame: Math.max(0, frame - cardDelay),
            fps,
            config: { damping: 14, stiffness: 100 },
          });
          const cardOpacity = interpolate(
            frame,
            [cardDelay, cardDelay + fps * 0.5],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                width: landscape ? 300 : 280,
                padding: "40px 30px",
                backgroundColor: COLORS.cardSurface,
                borderRadius: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                opacity: cardOpacity,
                transform: `scale(${cardScale})`,
                border: `1px solid ${COLORS.accentBlue}20`,
              }}
            >
              <pillar.Icon size={48} />
              <div
                style={{
                  fontFamily: FONTS.headline,
                  fontSize: 20,
                  fontWeight: 700,
                  color: COLORS.white,
                  textAlign: "center",
                }}
              >
                {pillar.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Connecting text */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 20,
          color: COLORS.textMuted,
          opacity: connectingTextOpacity,
          textAlign: "center",
        }}
      >
        Tailored strategy for {config.niche.toLowerCase()} practices in{" "}
        {config.location}
      </div>
    </div>
  );
};
