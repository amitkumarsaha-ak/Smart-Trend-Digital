import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Logo({ compact = false, light = false, className = '' }) {
  let isDarkTheme = false;
  try {
    const themeCtx = useTheme();
    isDarkTheme = themeCtx?.isDark || false;
  } catch {
    isDarkTheme = false;
  }

  const useLightLogo = light || isDarkTheme;

  if (compact) {
    return (
      <span className={`brand-logo compact ${useLightLogo ? 'light-mode' : ''} ${className}`}>
        <img
          src="/logo-icon.png"
          alt="Smart Trend Digital (STD)"
          className="brand-logo-img brand-icon-only"
        />
      </span>
    );
  }

  return (
    <span className={`brand-logo ${useLightLogo ? 'light-mode' : ''} ${className}`}>
      <img
        src={useLightLogo ? '/logo-white.png' : '/logo.png'}
        alt="Smart Trend Digital"
        className="brand-logo-img"
      />
    </span>
  );
}
