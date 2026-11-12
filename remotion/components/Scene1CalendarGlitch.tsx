import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene1CalendarGlitch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const scale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Glitch jitter
  const isGlitch = frame % 6 < 2;
  const jitterX = isGlitch ? (Math.sin(frame * 33) * 12) : 0;
  const jitterY = isGlitch ? (Math.cos(frame * 44) * 8) : 0;

  // Warning pulse
  const alertPulse = Math.sin(frame / 4);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(${jitterX}px, ${jitterY}px) scale(${scale})`,
      }}
    >
      {/* Pattern Interrupt Tag */}
      <div
        style={{
          position: 'absolute',
          top: 320,
          padding: '12px 32px',
          borderRadius: '999px',
          background: 'rgba(255, 30, 80, 0.2)',
          border: '2px solid #ff1e50',
          color: '#ff1e50',
          fontWeight: 900,
          fontSize: 28,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          boxShadow: '0 0 30px rgba(255, 30, 80, 0.4)',
        }}
      >
        ⚠️ REALITY GLITCH DETECTED
      </div>

      {/* Holographic Broken Calendar Card */}
      <div
        style={{
          position: 'relative',
          width: 640,
          height: 640,
          borderRadius: 36,
          background: 'rgba(15, 18, 30, 0.85)',
          border: '2px solid #00f2ff',
          boxShadow: '0 0 60px rgba(0, 242, 255, 0.3), inset 0 0 40px rgba(0, 242, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
        }}
      >
        {/* Top Header of Calendar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 120,
            background: 'linear-gradient(90deg, #ff1e50, #ff00e5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '6px',
            }}
          >
            FEBRUARY
          </span>
        </div>

        {/* Calendar Day Display */}
        <div
          style={{
            marginTop: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 180,
              fontWeight: 900,
              color: isGlitch ? '#ff1e50' : '#ffffff',
              textShadow: isGlitch
                ? '-4px 0 #00f2ff, 4px 0 #ff00e5'
                : '0 0 30px rgba(255, 255, 255, 0.6)',
              lineHeight: 1,
            }}
          >
            28
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#00f2ff',
              letterSpacing: '3px',
              marginTop: 15,
            }}
          >
            365 DAYS = A LIE?
          </div>
        </div>

        {/* Scanline overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(0, 242, 255, 0.05) 0px, rgba(0, 242, 255, 0.05) 2px, transparent 2px, transparent 4px)',
            pointerEvents: 'none',
          }}
        />

        {/* Warning Stamp */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            padding: '8px 24px',
            borderRadius: 12,
            background: alertPulse > 0 ? 'rgba(255, 30, 80, 0.3)' : 'rgba(255, 30, 80, 0.1)',
            border: '1px solid #ff1e50',
            color: '#ffffff',
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '2px',
          }}
        >
          ORBITAL DESYNC: 5h 48m 46s
        </div>
      </div>
    </AbsoluteFill>
  );
};
