import { VideoConfig } from '../types';

const defaultConfig: VideoConfig = {
  clientName: 'North Star Solutions',
  hookHeadline: 'Still chasing leads for your accounting firm?',
  painPoints: [
    '❌ Cold calling that goes nowhere',
    '❌ Referrals drying up',
    '❌ No predictable pipeline',
  ],
  stats: {
    clientsGuaranteed: 12,
    adSpend: '£30/day',
    timeframe: '6 Months',
  },
  testimonial: {
    quote:
      '"North Star transformed our pipeline. We went from scrambling for leads to having a waitlist of qualified prospects."',
    attribution: '— Sarah M., Partner at Mitchell & Co Accountants',
  },
  cta: {
    headline: 'Book Your Free Growth Call Today',
    url: 'north-star-solution.com',
  },
  tagline: 'Predictable Growth for Accounting Firms',
  brand: {
    bgDark: '#0E1116',
    cardBg: '#161B22',
    accentBlue: '#5B7C99',
    goldHighlight: '#D4A843',
    white: '#FFFFFF',
    textSecondary: '#8B949E',
  },
};

export default defaultConfig;
