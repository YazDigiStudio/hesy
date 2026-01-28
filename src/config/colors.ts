// Color configuration for HESY website

export const colors = {
  // Brand colors
  primary: '#FDB913',        // HESY Yellow
  primaryLight: '#ecf5f8',   // Light yellow for backgrounds
  primaryDark: '#E5A710',    // Darker yellow for hover states

  // Neutral colors
  grey: {
    light: '#FAF8F3',        // Warm cream background
    medium: '#c0c0c0',       // Navigation bar grey
    dark: '#a0a0a0',         // Footer grey
    darker: '#808080',       // Footer bottom bar
  },

  // Text colors
  text: {
    primary: '#1a1a1a',      // Main text
    secondary: '#333',       // Secondary text
    tertiary: '#666',        // Tertiary text
    light: '#999',           // Light text
    white: '#ffffff',        // White text
  },

  // Status colors
  status: {
    available: '#4caf50',    // Green for available animals
    reserved: '#ff9800',     // Orange for reserved animals
    adopted: '#9e9e9e',      // Grey for adopted animals
  },

  // UI element colors
  border: {
    light: '#e0e0e0',
    primary: '#FDB913',
  },

  // Background colors
  background: {
    page: '#FAF8F3',         // Main page background
    card: '#ffffff',         // Card backgrounds
    section: '#f5f5f5',      // Section backgrounds
  },
};

// Helper function to create rgba from hex
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
