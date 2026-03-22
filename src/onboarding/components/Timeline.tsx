import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

interface Milestone {
  week: string;
  label: string;
  icon: string;
}

interface TimelineProps {
  milestones: Milestone[];
  accentBlue?: string;
  goldColor?: string;
  cardBg?: string;
  white?: string;
  textSecondary?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  milestones,
  accentBlue = '#5B7C99',
  goldColor = '#D4A843',
  cardBg = '#161B22',
  white = '#FFFFFF',
  textSecondary = '#8B949E',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 0,
        position: 'relative',
        paddingLeft: 50,
      }}
    >
      {milestones.map((m, i) => {
        const staggerDelay = i * 25;
        const entryFrame = Math.max(0, frame - staggerDelay);

        const slideX = spring({
          frame: entryFrame,
          fps,
          config: { damping: 14, stiffness: 80 },
          durationInFrames: 30,
        });
        const opacity = interpolate(entryFrame, [0, 15], [0, 1], {
          extrapolateRight: 'clamp',
        });

        // Gold pulse when milestone activates
        const pulseProgress = interpolate(
          entryFrame,
          [20, 35],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const dotColor = pulseProgress > 0.5 ? goldColor : accentBlue;
        const glowSize = interpolate(pulseProgress, [0, 0.5, 1], [0, 12, 6]);

        // Vertical line grows
        const lineHeight = i < milestones.length - 1
          ? interpolate(entryFrame, [10, 30], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          : 0;

        return (
          <div key={i} style={{ position: 'relative', marginBottom: 10 }}>
            {/* Vertical connector line */}
            {i < milestones.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  left: -30,
                  top: 44,
                  width: 2,
                  height: lineHeight,
                  background: `linear-gradient(to bottom, ${goldColor}, ${accentBlue}40)`,
                }}
              />
            )}
            {/* Dot */}
            <div
              style={{
                position: 'absolute',
                left: -38,
                top: 18,
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: dotColor,
                boxShadow: `0 0 ${glowSize}px ${goldColor}`,
                border: `2px solid ${goldColor}`,
                transition: 'background-color 0.3s',
              }}
            />
            {/* Content */}
            <div
              style={{
                opacity,
                transform: `translateX(${(1 - slideX) * 60}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                backgroundColor: cardBg,
                borderRadius: 12,
                padding: '16px 24px',
                border: `1px solid ${accentBlue}25`,
                minWidth: 500,
              }}
            >
              <div style={{ fontSize: 36, minWidth: 44, textAlign: 'center' }}>
                {m.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 700,
                    fontSize: 16,
                    color: goldColor,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    marginBottom: 4,
                  }}
                >
                  {m.week}
                </div>
                <div
                  style={{
                    fontFamily: 'Open Sans',
                    fontSize: 22,
                    color: white,
                    fontWeight: 500,
                  }}
                >
                  {m.label}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
