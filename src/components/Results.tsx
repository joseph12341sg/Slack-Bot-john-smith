import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONTS, SCENE_TIMINGS } from "../config";
import { CaseStudyConfig } from "../types";

const CountUpNumber: React.FC<{
  value: number;
  prefix?: string;
  suffix?: string;
  frame: number;
  startFrame: number;
  fps: number;
  formatAsCurrency?: boolean;
}> = ({ value, prefix = "", suffix = "", frame, startFrame, fps, formatAsCurrency }) => {
  const progress = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: {
      damping: 30,
      stiffness: 40,
      mass: 1,
    },
  });

  const currentValue = Math.round(progress * value);
  const display = formatAsCurrency
    ? currentValue.toLocaleString("en-GB")
    : currentValue.toString();

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export const Results: React.FC<{
  config: CaseStudyConfig;
  landscape?: boolean;
}> = ({ config, landscape = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { duration } = SCENE_TIMINGS.results;

  const headingOpacity = interpolate(frame, [0, fps * 0.6], [0, 1], {
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
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const metrics = [
    {
      value: config.results.newClients,
      label: "New Clients",
      suffix: "",
      prefix: "",
    },
    {
      value: config.results.additionalRevenue,
      label: "Additional Revenue",
      prefix: "£",
      suffix: "",
      formatAsCurrency: true,
    },
    {
      value: config.results.paybackMonths,
      label: "Month Payback Period",
      suffix: "",
      prefix: "",
    },
  ];

  // Testimonial fade-in
  const quoteOpacity = interpolate(
    frame,
    [fps * 10, fps * 11.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
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
        padding: landscape ? "0 80px" : "50px 40px",
        opacity: Math.min(1, fadeOut),
      }}
    >
      {/* Heading */}
      <div style={{ opacity: headingOpacity, marginBottom: 60, textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONTS.headline,
            fontSize: landscape ? 44 : 36,
            fontWeight: 700,
            color: COLORS.white,
            marginBottom: 12,
          }}
        >
          THE RESULTS
        </div>
        <div
          style={{
            height: 4,
            width: `${underlineWidth}%`,
            backgroundColor: COLORS.gold,
            borderRadius: 2,
            maxWidth: 180,
            margin: "0 auto",
          }}
        />
      </div>

      {/* Metrics */}
      <div
        style={{
          display: "flex",
          flexDirection: landscape ? "row" : "column",
          gap: landscape ? 60 : 30,
          marginBottom: 60,
        }}
      >
        {metrics.map((metric, i) => {
          const metricDelay = fps * 2 + i * fps * 1;
          const metricOpacity = interpolate(
            frame,
            [metricDelay, metricDelay + fps * 0.4],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                opacity: metricOpacity,
                minWidth: landscape ? 240 : undefined,
                padding: "30px 20px",
                backgroundColor: COLORS.cardSurface,
                borderRadius: 16,
                border: `1px solid ${COLORS.gold}30`,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.headline,
                  fontSize: landscape ? 56 : 44,
                  fontWeight: 700,
                  color: COLORS.gold,
                  marginBottom: 8,
                }}
              >
                <CountUpNumber
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  frame={frame}
                  startFrame={metricDelay}
                  fps={fps}
                  formatAsCurrency={metric.formatAsCurrency}
                />
              </div>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 18,
                  color: COLORS.textMuted,
                }}
              >
                {metric.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Testimonial */}
      <div
        style={{
          opacity: quoteOpacity,
          maxWidth: 700,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 36,
            color: COLORS.gold,
            lineHeight: 1,
            marginBottom: -5,
          }}
        >
          &ldquo;
        </div>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 20,
            color: COLORS.white,
            fontStyle: "italic",
            lineHeight: 1.6,
            marginBottom: 16,
          }}
        >
          {config.testimonial.quote}
        </div>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 16,
            color: COLORS.textMuted,
          }}
        >
          — {config.testimonial.name}, {config.testimonial.firm}
        </div>
      </div>
    </div>
  );
};
