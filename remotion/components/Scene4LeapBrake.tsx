import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene4LeapBrake: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring with impact bounce
  const stampSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 180, mass: 1.5 },
  });

  // Impact shockwave ring expanding
  const shockwave = interpolate(frame, [10, 60], [0, 400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockwaveOpacity = interpolate(frame, [10, 60], [0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Clockwork rotating gears
  const gearRotation = frame * 1.5;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background Rotating Astrolabe Rings */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          border: '2px dashed rgba(0, 242, 255, 0.25)',
          transform: `rotate(${gearRotation}deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 540,
          height: 540,
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 0, 229, 0.25)',
          transform: `rotate(-${gearRotation * 0.8}deg)`,
        }}
      />

      {/* Expanding Shockwave on Impact */}
      {shockwave > 0 && (
        <div
          style={{
            position: 'absolute',
            width: shockwave * 2,
            height: shockwave * 2,
            borderRadius: '50%',
            border: '3px solid #00f2ff',
            boxShadow: '0 0 40px #00f2ff',
            opacity: shockwaveOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Top HUD Badge */}
      <div
        style={{
          position: 'absolute',
          top: 300,
          padding: '12px 32px',
          borderRadius: 999,
          background: 'rgba(0, 242, 255, 0.15)',
          border: '2px solid #00f2ff',
          color: '#00f2ff',
          fontSize: 26,
          fontWeight: 900,
          letterSpacing: '3px',
          boxShadow: '0 0 30px rgba(0, 242, 255, 0.3)',
        }}
      >
        ⚡ TIME BRAKE ENGAGED
      </div>

      {/* Slamming Leap Day Stamp */}
      <div
        style={{
          transform: `scale(${stampSpring})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 60px',
          borderRadius: 36,
          background: 'rgba(10, 15, 30, 0.9)',
          border: '3px solid #00f2ff',
          boxShadow: '0 0 80px rgba(0, 242, 255, 0.5), inset 0 0 40px rgba(0, 242, 255, 0.2)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: '#ff00e5',
            letterSpacing: '5px',
          }}
        >
          ORBITAL RECALIBRATION
        </div>

        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: '#ffffff',
            textShadow: '0 0 40px #00f2ff, 0 0 80px #00f2ff',
            lineHeight: 1.1,
            marginTop: 10,
          }}
        >
          +1 DAY
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: '#00f2ff',
            letterSpacing: '6px',
            marginTop: 8,
          }}
        >
          FEBRUARY 29
        </div>

        <div
          style={{
            marginTop: 25,
            padding: '10px 24px',
            borderRadius: 12,
            background: 'rgba(0, 255, 136, 0.2)',
            border: '1.5px solid #00ff88',
            color: '#00ff88',
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '2px',
          }}
        >
          ✓ SEASONS SAVED FOR 400 YEARS
        </div>
      </div>
    </AbsoluteFill>
  );
};
