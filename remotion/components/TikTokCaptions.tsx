import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

// Import raw caption tokens
import rawCaptions from '../public/captions.json';

interface CaptionToken {
  text: string;
  startMs: number;
  endMs: number;
}

interface CaptionPage {
  text: string;
  startMs: number;
  endMs: number;
  tokens: {
    text: string;
    fromMs: number;
    toMs: number;
  }[];
}

export const TikTokCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Current composition time in milliseconds
  const currentTimeMs = (frame / fps) * 1000;

  // Build cadence pages matching speech rhythm
  const pages: CaptionPage[] = useMemo(() => {
    // Break indices matching natural sentence and phrase boundaries
    const breakIndices = new Set([3, 11, 16, 20, 28, 33, 40, 48, 56, 63, 71]);
    const result: CaptionPage[] = [];
    let curTokens: { text: string; fromMs: number; toMs: number }[] = [];
    let pageStartMs = 0;

    for (let i = 0; i < rawCaptions.length; i++) {
      const item = rawCaptions[i];
      if (curTokens.length === 0) {
        pageStartMs = item.startMs;
      }
      curTokens.push({
        text: item.text,
        fromMs: item.startMs,
        toMs: item.endMs,
      });

      if (breakIndices.has(i) || i === rawCaptions.length - 1) {
        result.push({
          text: curTokens.map((t) => t.text).join('').trim(),
          startMs: pageStartMs,
          endMs: item.endMs,
          tokens: [...curTokens],
        });
        curTokens = [];
      }
    }
    return result;
  }, []);

  // Find the currently active page based on currentTimeMs
  const activePage = pages.find((p, index) => {
    const nextPage = pages[index + 1];
    const pageEnd = nextPage ? nextPage.startMs : p.endMs + 800;
    return currentTimeMs >= p.startMs && currentTimeMs < pageEnd;
  });

  if (!activePage) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 1120, // Positioned firmly inside TikTok safe center zone
        left: 60,
        right: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          padding: '24px 36px',
          borderRadius: 28,
          background: 'rgba(8, 12, 24, 0.88)',
          border: '2px solid rgba(0, 242, 255, 0.4)',
          boxShadow: '0 16px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 255, 0.25)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 960,
        }}
      >
        {activePage.tokens.map((token, idx) => {
          const isActive =
            token.fromMs <= currentTimeMs && token.toMs >= currentTimeMs;
          const isPassed = token.toMs < currentTimeMs;

          // Word pop spring on activation
          const wordAgeFrames = Math.max(0, (currentTimeMs - token.fromMs) / (1000 / fps));
          const pop = spring({
            frame: wordAgeFrames,
            fps,
            config: { damping: 12, stiffness: 200 },
          });

          const scale = isActive ? 1 + 0.15 * pop : 1;

          return (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                whiteSpace: 'pre',
                fontSize: 54,
                fontWeight: 900,
                letterSpacing: '1px',
                transform: `scale(${scale})`,
                color: isActive
                  ? '#00f2ff'
                  : isPassed
                  ? '#ffffff'
                  : 'rgba(255, 255, 255, 0.5)',
                textShadow: isActive
                  ? '0 0 25px #00f2ff, 0 0 50px #00f2ff, 0 4px 10px #000000'
                  : '0 3px 8px rgba(0, 0, 0, 0.9)',
                transition: 'none',
              }}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
