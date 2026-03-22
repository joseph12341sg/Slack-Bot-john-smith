import React from 'react';
import { Composition } from 'remotion';
import { Ad30s } from './compositions/Ad30s';
import { Ad15s } from './compositions/Ad15s';
import defaultConfig from './config/default';

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  const defaultProps = { config: defaultConfig };

  return (
    <>
      {/* 30-second versions */}
      <Composition
        id="Ad30s-Feed"
        component={Ad30s}
        durationInFrames={FPS * 30}
        fps={FPS}
        width={1080}
        height={1080}
        defaultProps={defaultProps}
      />
      <Composition
        id="Ad30s-Story"
        component={Ad30s}
        durationInFrames={FPS * 30}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />

      {/* 15-second versions */}
      <Composition
        id="Ad15s-Feed"
        component={Ad15s}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={1080}
        height={1080}
        defaultProps={defaultProps}
      />
      <Composition
        id="Ad15s-Story"
        component={Ad15s}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
    </>
  );
};
