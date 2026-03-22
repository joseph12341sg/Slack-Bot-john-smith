import { CaseStudyConfig } from "./types";

export const defaultConfig: CaseStudyConfig = {
  clientName: "Freemans Accountancy",
  clientLogo: require("./assets/client-logo-placeholder.png"),
  location: "Manchester",
  niche: "Dental Practices",
  challenges: [
    "Relied entirely on word-of-mouth referrals",
    "No online presence or lead generation",
    "Revenue plateaued at £180k for 3 years",
  ],
  results: {
    newClients: 14,
    additionalRevenue: 42000,
    paybackMonths: 2,
  },
  testimonial: {
    quote:
      "North Star completely transformed how we attract new clients.",
    name: "Craig Freeman",
    firm: "Freemans Accountancy",
  },
};

// Brand colours
export const COLORS = {
  background: "#0E1116",
  cardSurface: "#161B22",
  accentBlue: "#5B7C99",
  gold: "#D4A843",
  white: "#FFFFFF",
  textMuted: "#8B949E",
} as const;

// Typography
export const FONTS = {
  headline: "Montserrat, sans-serif",
  body: "Open Sans, sans-serif",
} as const;

// Scene timings (in frames at 30 fps)
export const FPS = 30;

export const SCENE_TIMINGS = {
  titleCard: { start: 0, duration: 5 * FPS }, // 0–5s
  challenge: { start: 5 * FPS, duration: 15 * FPS }, // 5–20s
  solution: { start: 20 * FPS, duration: 20 * FPS }, // 20–40s
  results: { start: 40 * FPS, duration: 25 * FPS }, // 40–65s
  cta: { start: 65 * FPS, duration: 10 * FPS }, // 65–75s
} as const;

export const TOTAL_DURATION = 75 * FPS; // 75 seconds
