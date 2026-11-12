import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const CosmicHud: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Story progress bar (0% -> 100%)
  const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Top Progress Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 8,
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #00f2ff, #ff00e5)',
          boxShadow: '0 0 16px #00f2ff',
          zIndex: 100,
        }}
      />

      {/* Top Header Safe Zone HUD */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 90,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(10, 15, 30, 0.7)',
            padding: '10px 20px',
            borderRadius: 999,
            border: '1px solid rgba(0, 242, 255, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#00f2ff',
              boxShadow: '0 0 10px #00f2ff',
            }}
          />
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '2px',
            }}
          >
            COSMOLOGY ARCHIVES
          </span>
        </div>

        {/* Dynamic Waveform Visualizer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: 'rgba(10, 15, 30, 0.7)',
            padding: '10px 20px',
            borderRadius: 999,
            border: '1px solid rgba(255, 0, 229, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const h = 8 + 18 * Math.abs(Math.sin((frame + i * 8) / 5));
            return (
              <div
                key={i}
                style={{
                  width: 4,
                  height: h,
                  borderRadius: 2,
                  backgroundColor: i % 2 === 0 ? '#00f2ff' : '#ff00e5',
                }}
              />
            );
          })}
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: '#ff00e5',
              marginLeft: 8,
              letterSpacing: '1px',
            }}
          >
            AUDIO SYNC
          </span>
        </div>
      </div>

      {/* Bottom Branding Tag (above TikTok comment / audio area) */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 90,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: 'rgba(255, 255, 255, 0.6)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          ⚡ ANTIGRAVITY COSMIC DECODER
        </span>
      </div>
    </div>
  );
};
