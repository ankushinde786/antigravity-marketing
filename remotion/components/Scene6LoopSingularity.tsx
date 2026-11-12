import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const Scene6LoopSingularity: React.FC = () => {
  const frame = useCurrentFrame();

  // Spiral spin accelerating towards loop point
  const spin = interpolate(frame, [0, 90], [0, 720]);

  // Singularity contraction then sudden burst at frame 89
  const coreScale = interpolate(frame, [0, 75, 88, 90], [1.2, 0.2, 0.05, 12], {
    extrapolateRight: 'clamp',
  });

  const flashOpacity = interpolate(frame, [85, 89, 90], [0, 0.9, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Top Hook Connection Tag */}
      <div
        style={{
          position: 'absolute',
          top: 300,
          padding: '12px 32px',
          borderRadius: 999,
          background: 'rgba(255, 30, 80, 0.2)',
          border: '2px solid #ff1e50',
          color: '#ff1e50',
          fontSize: 26,
          fontWeight: 900,
          letterSpacing: '3px',
          boxShadow: '0 0 30px rgba(255, 30, 80, 0.4)',
        }}
      >
        🌀 INFINITE ORBITAL LOOP
      </div>

      {/* Warping Space-Time Rings */}
      <div
        style={{
          position: 'relative',
          width: 600,
          height: 600,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `rotate(${spin}deg)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 580,
            height: 580,
            borderRadius: '50%',
            border: '3px dashed #00f2ff',
            boxShadow: '0 0 50px #00f2ff',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 420,
            height: 420,
            borderRadius: '50%',
            border: '3px solid #ff00e5',
            boxShadow: '0 0 40px #ff00e5',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 260,
            height: 260,
            borderRadius: '50%',
            border: '4px dashed #ffffff',
            boxShadow: '0 0 30px #ffffff',
          }}
        />

        {/* Singularity Core */}
        <div
          style={{
            position: 'absolute',
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ffffff 10%, #00f2ff 60%, transparent 100%)',
            boxShadow: '0 0 80px #00f2ff, 0 0 160px #ff00e5',
            transform: `scale(${coreScale})`,
          }}
        />
      </div>

      {/* White/Cyan Flash at loop transition */}
      {flashOpacity > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: '#00f2ff',
            opacity: flashOpacity,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
