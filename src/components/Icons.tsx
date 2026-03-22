import React from "react";
import { COLORS } from "../config";

const iconStyle: React.CSSProperties = {
  flexShrink: 0,
};

export const ClockIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={iconStyle}
  >
    <circle cx="12" cy="12" r="10" stroke={COLORS.accentBlue} strokeWidth="2" />
    <path d="M12 6v6l4 2" stroke={COLORS.accentBlue} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const WarningIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={iconStyle}
  >
    <path
      d="M12 2L1 21h22L12 2z"
      stroke={COLORS.accentBlue}
      strokeWidth="2"
      fill="none"
    />
    <path d="M12 9v5" stroke={COLORS.accentBlue} strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill={COLORS.accentBlue} />
  </svg>
);

export const FlatLineIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={iconStyle}
  >
    <path
      d="M2 18L8 14L12 16L16 8L22 12"
      stroke={COLORS.accentBlue}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M2 20h20" stroke={COLORS.accentBlue} strokeWidth="1.5" opacity={0.5} />
  </svg>
);

export const AdsIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect x="4" y="6" width="32" height="28" rx="4" stroke={COLORS.accentBlue} strokeWidth="2" />
    <rect x="8" y="10" width="16" height="10" rx="2" fill={COLORS.accentBlue} opacity={0.3} />
    <rect x="8" y="24" width="24" height="2" rx="1" fill={COLORS.accentBlue} opacity={0.5} />
    <rect x="8" y="28" width="16" height="2" rx="1" fill={COLORS.accentBlue} opacity={0.3} />
    <circle cx="30" cy="14" r="4" fill={COLORS.gold} opacity={0.8} />
  </svg>
);

export const FunnelIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path
      d="M6 8h28L24 20v10l-8 4V20L6 8z"
      stroke={COLORS.accentBlue}
      strokeWidth="2"
      fill={COLORS.accentBlue}
      fillOpacity={0.15}
    />
  </svg>
);

export const CalendarIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect x="5" y="8" width="30" height="27" rx="4" stroke={COLORS.accentBlue} strokeWidth="2" />
    <path d="M5 16h30" stroke={COLORS.accentBlue} strokeWidth="2" />
    <path d="M12 5v6M28 5v6" stroke={COLORS.accentBlue} strokeWidth="2" strokeLinecap="round" />
    <circle cx="14" cy="24" r="2" fill={COLORS.gold} />
    <circle cx="20" cy="24" r="2" fill={COLORS.accentBlue} opacity={0.5} />
    <circle cx="26" cy="24" r="2" fill={COLORS.accentBlue} opacity={0.5} />
  </svg>
);
