import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene3FrozenJuly: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Temperature plunge animation
  const tempProgress = interpolate(frame, [15, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const temp = Math.round(interpolate(tempProgress, [0, 1], [32, -18]));

  // Ice crystallization intensity
  const frostIntensity = interpolate(frame, [20, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Deterministic blizzard snowflakes
  const snowflakes = useMemo(() => {
    const list = [];
    for (let i = 0; i < 45; i++) {
      const startX = (i * 97) % 1080;
      const startY = (i * 149) % 1920;
      const speed = 4 + (i % 5) * 3;
      const size = 6 + (i % 8) * 3;
      list.push({ startX, startY, speed, size });
    }
    return list;
  }, []);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${entrance})`,
      }}
    >
      {/* Blizzard Wind & Snowflakes */}
      {snowflakes.map((flake, i) => {
        const posX = (flake.startX + frame * flake.speed * 1.5) % 1200 - 60;
        const posY = (flake.startY + frame * flake.speed * 2) % 1920;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: posX,
              top: posY,
              width: flake.size,
              height: flake.size,
              borderRadius: '50%',
              backgroundColor: '#a5f3fc',
              boxShadow: '0 0 10px #38bdf8',
              opacity: 0.7,
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* Warning Alert */}
      <div
        style={{
          position: 'absolute',
          top: 300,
          padding: '12px 32px',
          borderRadius: 999,
          background: 'rgba(56, 189, 248, 0.15)',
          border: '2px solid #38bdf8',
          color: '#38bdf8',
          fontSize: 26,
          fontWeight: 900,
          letterSpacing: '3px',
          boxShadow: '0 0 30px rgba(56, 189, 248, 0.3)',
        }}
      >
        ❄️ CALENDAR CATASTROPHE
      </div>

      {/* Frozen Calendar Card */}
      <div
        style={{
          position: 'relative',
          width: 660,
          height: 580,
          borderRadius: 36,
          background: `rgba(15, 23, 42, ${0.75 + frostIntensity * 0.2})`,
          border: `2px solid ${temp < 0 ? '#38bdf8' : '#f59e0b'}`,
          boxShadow:
            temp < 0
              ? '0 0 60px rgba(56, 189, 248, 0.4), inset 0 0 40px rgba(56, 189, 248, 0.2)'
              : '0 0 40px rgba(245, 158, 11, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: 'rgba(255, 255, 255, 0.7)',
            letterSpacing: '4px',
          }}
        >
          MONTH DRIFT
        </div>

        {/* Frozen July Word */}
        <div
          style={{
            fontSize: 140,
            fontWeight: 900,
            color: temp < 0 ? '#e0f2fe' : '#ffffff',
            textShadow:
              temp < 0
                ? '0 0 30px #38bdf8, 0 0 60px #0284c7'
                : '0 0 20px rgba(255, 255, 255, 0.5)',
            letterSpacing: '6px',
            marginTop: -10,
          }}
        >
          JULY
        </div>

        {/* Subtext description */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: temp < 0 ? '#38bdf8' : '#f59e0b',
            letterSpacing: '2px',
          }}
        >
          {temp < 0 ? 'FREEZING BLIZZARDS' : 'SUMMER HEAT'}
        </div>

        {/* Temperature Gauge */}
        <div
          style={{
            marginTop: 30,
            padding: '14px 36px',
            borderRadius: 20,
            background: temp < 0 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(245, 158, 11, 0.2)',
            border: `1.5px solid ${temp < 0 ? '#38bdf8' : '#f59e0b'}`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ fontSize: 32 }}>{temp < 0 ? '🥶' : '☀️'}</span>
          <span
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: '#ffffff',
            }}
          >
            {temp > 0 ? `+${temp}` : temp}°C
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
