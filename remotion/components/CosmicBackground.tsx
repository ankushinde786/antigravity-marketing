import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const CosmicBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Deterministic starfield
  const stars = useMemo(() => {
    const list = [];
    for (let i = 0; i < 90; i++) {
      const x = ((i * 137.5) % 1080);
      const y = ((i * 223.7) % 1920);
      const size = (i % 3) + 1.5;
      const speed = 0.5 + (i % 5) * 0.3;
      list.push({ x, y, size, speed });
    }
    return list;
  }, []);

  // Nebula drifts
  const nebula1X = interpolate(frame, [0, 900], [200, 350]);
  const nebula1Y = interpolate(frame, [0, 900], [400, 600]);
  const nebula2X = interpolate(frame, [0, 900], [800, 650]);
  const nebula2Y = interpolate(frame, [0, 900], [1400, 1200]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050508',
        overflow: 'hidden',
      }}
    >
      {/* Deep Space Gradients */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          left: nebula1X - 450,
          top: nebula1Y - 450,
          background: 'radial-gradient(circle, rgba(0, 242, 255, 0.12) 0%, rgba(5, 5, 8, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 1000,
          height: 1000,
          left: nebula2X - 500,
          top: nebula2Y - 500,
          background: 'radial-gradient(circle, rgba(255, 0, 229, 0.10) 0%, rgba(5, 5, 8, 0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Stars */}
      {stars.map((star, i) => {
        const currentY = (star.y + frame * star.speed) % 1920;
        const opacity = 0.3 + 0.7 * Math.abs(Math.sin((frame + i * 20) / 25));
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: star.x,
              top: currentY,
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              backgroundColor: i % 4 === 0 ? '#00f2ff' : '#ffffff',
              boxShadow: i % 4 === 0 ? '0 0 6px #00f2ff' : '0 0 3px #ffffff',
              opacity,
            }}
          />
        );
      })}

      {/* Subtle Cosmic Grid overlay */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(rgba(0, 242, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          backgroundPosition: `center ${frame * 0.5}px`,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
