import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene2SolarOrbit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Orbital motion (Earth orbiting Sun)
  const angle = interpolate(frame, [0, 200], [0, Math.PI * 1.8]);
  const orbitRadiusX = 260;
  const orbitRadiusY = 160;
  const earthX = Math.cos(angle) * orbitRadiusX;
  const earthY = Math.sin(angle) * orbitRadiusY;

  // Pulse effect on Sun
  const sunPulse = 1 + Math.sin(frame / 6) * 0.08;

  // Extra hours counter animation
  const counterProgress = interpolate(frame, [30, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const hoursCount = (counterProgress * 5.8).toFixed(1);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${entrance})`,
      }}
    >
      {/* Top HUD Badge */}
      <div
        style={{
          position: 'absolute',
          top: 300,
          display: 'flex',
          gap: 16,
        }}
      >
        <div
          style={{
            padding: '10px 24px',
            borderRadius: 16,
            background: 'rgba(0, 242, 255, 0.1)',
            border: '1px solid #00f2ff',
            color: '#00f2ff',
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: '2px',
          }}
        >
          COSMIC TELEMETRY
        </div>
      </div>

      {/* Orbit Arena */}
      <div
        style={{
          position: 'relative',
          width: 720,
          height: 520,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Orbit Path Ellipse */}
        <div
          style={{
            position: 'absolute',
            width: orbitRadiusX * 2,
            height: orbitRadiusY * 2,
            borderRadius: '50%',
            border: '2px dashed rgba(0, 242, 255, 0.4)',
            boxShadow: '0 0 30px rgba(0, 242, 255, 0.1)',
          }}
        />

        {/* Central Sun */}
        <div
          style={{
            position: 'absolute',
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #fff7ad 20%, #ff8c00 70%, #ff4500 100%)',
            boxShadow: '0 0 80px #ff8c00, 0 0 140px rgba(255, 69, 0, 0.5)',
            transform: `scale(${sunPulse})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 900, color: '#2b0000', letterSpacing: '1px' }}>
            SUN
          </span>
        </div>

        {/* Orbiting Earth */}
        <div
          style={{
            position: 'absolute',
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #00f2ff, #0055ff, #001155)',
            boxShadow: '0 0 25px #00f2ff',
            transform: `translate(${earthX}px, ${earthY}px)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Earth Atmosphere Ring */}
          <div
            style={{
              position: 'absolute',
              width: 74,
              height: 74,
              borderRadius: '50%',
              border: '1.5px solid rgba(0, 242, 255, 0.6)',
            }}
          />
        </div>
      </div>

      {/* Real-time Mismatch Counter Card */}
      <div
        style={{
          position: 'absolute',
          top: 880,
          width: 680,
          padding: '24px 32px',
          borderRadius: 24,
          background: 'rgba(10, 15, 30, 0.85)',
          border: '1.5px solid rgba(0, 242, 255, 0.4)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(15px)',
        }}
      >
        <div>
          <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 20, fontWeight: 700, letterSpacing: '2px' }}>
            EARTH ORBITAL PERIOD
          </div>
          <div style={{ color: '#ffffff', fontSize: 36, fontWeight: 900, marginTop: 4 }}>
            365d 5h 48m 46s
          </div>
        </div>
        <div
          style={{
            background: 'rgba(255, 0, 229, 0.15)',
            border: '1.5px solid #ff00e5',
            borderRadius: 16,
            padding: '12px 20px',
            textAlign: 'right',
          }}
        >
          <div style={{ color: '#ff00e5', fontSize: 16, fontWeight: 800 }}>SURPLUS TIME</div>
          <div style={{ color: '#ffffff', fontSize: 28, fontWeight: 900 }}>+{hoursCount}h / yr</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
