import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

interface ChecklistItem {
  text: string;
}

interface AnimatedChecklistProps {
  items: ChecklistItem[];
  white?: string;
  goldColor?: string;
  accentBlue?: string;
  cardBg?: string;
}

export const AnimatedChecklist: React.FC<AnimatedChecklistProps> = ({
  items,
  white = '#FFFFFF',
  goldColor = '#D4A843',
  accentBlue = '#5B7C99',
  cardBg = '#161B22',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        alignItems: 'flex-start',
      }}
    >
      {items.map((item, i) => {
        const staggerDelay = i * 30;
        const entryFrame = Math.max(0, frame - staggerDelay);

        const slideProgress = spring({
          frame: entryFrame,
          fps,
          config: { damping: 12, stiffness: 80 },
          durationInFrames: 25,
        });

        const opacity = interpolate(entryFrame, [0, 15], [0, 1], {
          extrapolateRight: 'clamp',
        });

        // Checkmark appears after slide-in
        const checkScale = spring({
          frame: Math.max(0, entryFrame - 15),
          fps,
          config: { damping: 8, stiffness: 120 },
          durationInFrames: 20,
        });

        const checkColor = interpolate(
          entryFrame,
          [15, 25],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateX(${(1 - slideProgress) * 80}px)`,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              backgroundColor: cardBg,
              borderRadius: 12,
              padding: '18px 28px',
              border: `1px solid ${accentBlue}30`,
              minWidth: 650,
            }}
          >
            {/* Animated checkmark */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: checkColor > 0.5 ? `${goldColor}20` : `${accentBlue}15`,
                border: `2px solid ${checkColor > 0.5 ? goldColor : accentBlue}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transform: `scale(${checkScale})`,
              }}
            >
              {checkColor > 0.5 && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10L8 14L16 6"
                    stroke={goldColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <div
              style={{
                fontFamily: 'Open Sans',
                fontSize: 22,
                color: white,
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              {item.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};
