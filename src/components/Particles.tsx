import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface ParticlesProps {
  width: number;
  height: number;
  count?: number;
  color?: string;
}

export const Particles: React.FC<ParticlesProps> = ({
  width,
  height,
  count = 40,
  color = '#5B7C99',
}) => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: ((i * 137.508) % 100),
      y: ((i * 73.254 + 31) % 100),
      size: 1 + (i % 4),
      speed: 0.3 + (i % 5) * 0.15,
      delay: i * 3,
    }));
  }, [count]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => {
        const opacity = interpolate(
          frame,
          [p.delay, p.delay + 20, p.delay + 60, p.delay + 80],
          [0, 0.6, 0.6, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const yOffset = frame * p.speed;
        const currentY = ((p.y / 100) * height - yOffset) % height;
        const adjustedY = currentY < 0 ? currentY + height : currentY;

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: adjustedY,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: color,
              opacity,
              boxShadow: `0 0 ${p.size * 3}px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};
