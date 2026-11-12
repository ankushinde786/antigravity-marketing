import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { CosmicBackground } from './components/CosmicBackground';
import { Scene1CalendarGlitch } from './components/Scene1CalendarGlitch';
import { Scene2SolarOrbit } from './components/Scene2SolarOrbit';
import { Scene3FrozenJuly } from './components/Scene3FrozenJuly';
import { Scene4LeapBrake } from './components/Scene4LeapBrake';
import { Scene5CallToAction } from './components/Scene5CallToAction';
import { Scene6LoopSingularity } from './components/Scene6LoopSingularity';
import { TikTokCaptions } from './components/TikTokCaptions';
import { CosmicHud } from './components/CosmicHud';

export const LeapYearPromo: React.FC = () => {
  const frame = useCurrentFrame();

  // Ducked background music volume (crisp sub-ambient under voiceover, rises slightly during pauses/CTA)
  const bgmVolume = frame >= 705 && frame <= 810 ? 0.22 : 0.15;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050508',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Audio Track 1: AI Voiceover (Full Volume) */}
      <Audio src={staticFile('voiceover.mp3')} volume={1.0} />

      {/* Audio Track 2: Atmospheric Cosmic BGM (Ducked) */}
      <Audio src={staticFile('bgm.mp3')} volume={bgmVolume} />

      {/* Layer 1: Ambient Cosmic Starfield & Nebulae */}
      <CosmicBackground />

      {/* Layer 2: Visual Scenes Sequenced Every 3-4 Seconds */}
      {/* Scene 1: Pattern-Interrupt Hook (0 - 4.5s) */}
      <Sequence from={0} durationInFrames={135}>
        <Scene1CalendarGlitch />
      </Sequence>

      {/* Scene 2: The 365-Day Myth & Solar Orbit Telemetry (4.5s - 11.0s) */}
      <Sequence from={135} durationInFrames={195}>
        <Scene2SolarOrbit />
      </Sequence>

      {/* Scene 3: Cosmic Drift Threat & Frozen July Blizzard (11.0s - 18.0s) */}
      <Sequence from={330} durationInFrames={210}>
        <Scene3FrozenJuly />
      </Sequence>

      {/* Scene 4: The Cosmic Fix - Leap Day Slam (18.0s - 23.5s) */}
      <Sequence from={540} durationInFrames={165}>
        <Scene4LeapBrake />
      </Sequence>

      {/* Scene 5: High-Converting Call-To-Action (23.5s - 27.0s | CTA at 24s) */}
      <Sequence from={705} durationInFrames={105}>
        <Scene5CallToAction />
      </Sequence>

      {/* Scene 6: Seamless Infinite Loop Gravitational Singularity (27.0s - 30.0s) */}
      <Sequence from={810} durationInFrames={90}>
        <Scene6LoopSingularity />
      </Sequence>

      {/* Layer 3: High-Contrast TikTok/Reels Word-by-Word Captions (Safe Center Zone) */}
      <TikTokCaptions />

      {/* Layer 4: Cosmic HUD & Safe Area Telemetry */}
      <CosmicHud />
    </AbsoluteFill>
  );
};
