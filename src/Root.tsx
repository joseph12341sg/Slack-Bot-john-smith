import React from 'react';
import { Composition } from 'remotion';
import { Ad30s } from './compositions/Ad30s';
import { Ad15s } from './compositions/Ad15s';
import { OnboardingVideo } from './onboarding/compositions/OnboardingVideo';
import defaultConfig from './config/default';
import { brand as defaultBrand } from './onboarding/config/brand';
import clientConfig from './onboarding/config/clientConfig.json';
import type { OnboardingProps } from './onboarding/types';

const FPS = 30;

// Remotion v4 Composition expects LooseComponentType — use type assertion
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asComponent = (c: any) => c;

export const RemotionRoot: React.FC = () => {
  const defaultProps = { config: defaultConfig };

  const onboardingProps: OnboardingProps = {
    client: clientConfig,
    brand: defaultBrand,
  };

  return (
    <>
      {/* 30-second ad versions */}
      <Composition
        id="Ad30s-Feed"
        component={asComponent(Ad30s)}
        durationInFrames={FPS * 30}
        fps={FPS}
        width={1080}
        height={1080}
        defaultProps={defaultProps}
      />
      <Composition
        id="Ad30s-Story"
        component={asComponent(Ad30s)}
        durationInFrames={FPS * 30}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />

      {/* 15-second ad versions */}
      <Composition
        id="Ad15s-Feed"
        component={asComponent(Ad15s)}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={1080}
        height={1080}
        defaultProps={defaultProps}
      />
      <Composition
        id="Ad15s-Story"
        component={asComponent(Ad15s)}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />

      {/* Onboarding welcome video — 55s @ 1920×1080 */}
      <Composition
        id="Onboarding-Welcome"
        component={asComponent(OnboardingVideo)}
        durationInFrames={FPS * 55}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={onboardingProps}
      />
    </>
  );
};
