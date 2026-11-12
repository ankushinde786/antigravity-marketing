import React from 'react';
import { Composition } from 'remotion';
import { LeapYearPromo } from './LeapYearPromo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PromoReel"
        component={LeapYearPromo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
