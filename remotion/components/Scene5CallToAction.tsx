import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene5CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy pop-in spring
  const popSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  // Bell ring wobble
  const bellWobble = Math.sin(frame * 0.8) * 15;

  // Pulse glow on follow button
  const buttonPulse = 1 + Math.sin(frame / 4) * 0.05;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Top CTA Tag */}
      <div
        style={{
          position: 'absolute',
          top: 300,
          padding: '12px 32px',
          borderRadius: 999,
          background: 'rgba(255, 0, 229, 0.2)',
          border: '2px solid #ff00e5',
          color: '#ff00e5',
          fontSize: 26,
          fontWeight: 900,
          letterSpacing: '3px',
          boxShadow: '0 0 30px rgba(255, 0, 229, 0.4)',
        }}
      >
        🚀 JOIN THE COSMIC EXPLORERS
      </div>

      {/* Modern High-Conversion Social Profile Card */}
      <div
        style={{
          transform: `scale(${popSpring})`,
          width: 700,
          padding: '48px 40px',
          borderRadius: 40,
          background: 'rgba(12, 16, 32, 0.95)',
          border: '2.5px solid #00f2ff',
          boxShadow: '0 20px 80px rgba(0, 242, 255, 0.4), inset 0 0 30px rgba(0, 242, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backdropFilter: 'blur(25px)',
        }}
      >
        {/* Glowing Avatar */}
        <div
          style={{
            position: 'relative',
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00f2ff, #ff00e5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 0 40px rgba(0, 242, 255, 0.6)',
          }}
        >
          <div
            style={{
              width: 124,
              height: 124,
              borderRadius: '50%',
              backgroundColor: '#0a0a14',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 60,
            }}
          >
            🌌
          </div>
          {/* Notification Bell Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: '#ff00e5',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 24,
              transform: `rotate(${bellWobble}deg)`,
              boxShadow: '0 0 20px #ff00e5',
            }}
          >
            🔔
          </div>
        </div>

        {/* Username & Title */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 900,
            color: '#ffffff',
            marginTop: 20,
            letterSpacing: '2px',
          }}
        >
          @AntigravityCosmos
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#00f2ff',
            letterSpacing: '1px',
            marginTop: 6,
          }}
        >
          Daily Astrophysics & Mind-Bends
        </div>

        {/* Big Neon CTA Button */}
        <div
          style={{
            marginTop: 32,
            width: '100%',
            padding: '22px 0',
            borderRadius: 24,
            background: 'linear-gradient(90deg, #00f2ff, #0088ff)',
            boxShadow: '0 0 40px rgba(0, 242, 255, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
            transform: `scale(${buttonPulse})`,
          }}
        >
          <span style={{ fontSize: 36, fontWeight: 900, color: '#050b1a', letterSpacing: '3px' }}>
            + FOLLOW NOW
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
