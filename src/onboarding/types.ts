export interface OnboardingConfig {
  clientName: string;
  firmName: string;
  niche: string;
  location: string;
  guarantee: string;
  timeframe: string;
  bookingLink: string;
  whatsapp: string;
}

export interface OnboardingBrand {
  bgDark: string;
  cardBg: string;
  accentBlue: string;
  goldHighlight: string;
  white: string;
  textSecondary: string;
}

export interface OnboardingProps {
  client: OnboardingConfig;
  brand: OnboardingBrand;
}
