export interface BrandColors {
  bgDark: string;
  cardBg: string;
  accentBlue: string;
  goldHighlight: string;
  white: string;
  textSecondary: string;
}

export interface VideoConfig {
  clientName: string;
  hookHeadline: string;
  painPoints: string[];
  stats: {
    clientsGuaranteed: number;
    adSpend: string;
    timeframe: string;
  };
  testimonial: {
    quote: string;
    attribution: string;
  };
  cta: {
    headline: string;
    url: string;
  };
  tagline: string;
  brand: BrandColors;
}

export type AspectRatio = 'feed' | 'story';
export type Duration = '15s' | '30s';

export interface CompositionProps {
  config: VideoConfig;
}
