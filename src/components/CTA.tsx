import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONTS, SCENE_TIMINGS } from "../config";
import { CompassStar } from "./CompassStar";

export const CTA: React.FC<{ landscape?: boolean }> = ({
  landscape = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, fps * 0.8], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headlineSlide = interpolate(frame, [0, fps * 0.8], [30, 0], {
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [fps * 1, fps * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const urlOpacity = interpolate(frame, [fps * 2, fps * 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = spring({
    frame: Math.max(0, frame - fps * 2.5),
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Subtle glow pulse
  const glowIntensity = interpolate(
    frame,
    [fps * 3, fps * 5, fps * 7, fps * 9],
    [0, 1, 0.5, 1],
    { extrapolateRight: "clamp" }
  );

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
        gap: 30,
      }}
    >
      {/* "Ready for results like these?" */}
      <div
        style={{
          fontFamily: FONTS.headline,
          fontSize: landscape ? 42 : 34,
          fontWeight: 700,
          color: COLORS.white,
          opacity: headlineOpacity,
          transform: `translateY(${headlineSlide}px)`,
          textAlign: "center",
        }}
      >
        Ready for results like these?
      </div>

      {/* CTA button-style text */}
      <div
        style={{
          fontFamily: FONTS.headline,
          fontSize: 28,
          fontWeight: 700,
          color: COLORS.background,
          backgroundColor: COLORS.gold,
          padding: "16px 48px",
          borderRadius: 12,
          opacity: ctaOpacity,
        }}
      >
        Book Your Free Growth Call
      </div>

      {/* URL */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 22,
          color: COLORS.accentBlue,
          opacity: urlOpacity,
          letterSpacing: "0.05em",
        }}
      >
        north-star-solution.com
      </div>

      {/* Logo lockup with glow */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          marginTop: 20,
          filter: `drop-shadow(0 0 ${8 + glowIntensity * 16}px ${COLORS.accentBlue}${Math.round(
            40 + glowIntensity * 40
          ).toString(16)})`,
        }}
      >
        <CompassStar size={80} color={COLORS.accentBlue} glowing />
      </div>
    </div>
  );
};
