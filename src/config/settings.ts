// Site-wide settings and constants for HESY website

export const siteSettings = {
  // Layout
  maxWidth: '1200px',
  containerPadding: '0 1rem',

  // Navigation
  navigation: {
    height: '70px',
    logoHeight: '50px',
  },

  // Hero section
  hero: {
    height: '600px',
    overlayOpacity: 0.4,
  },

  // Spacing
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
    xlarge: '4rem',
  },

  // Border radius
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '20px',
  },

  // Transitions
  transitions: {
    fast: '0.2s',
    medium: '0.3s',
    slow: '0.5s',
  },

  // Font sizes
  fontSize: {
    small: '0.85rem',
    normal: '0.95rem',
    medium: '1rem',
    large: '1.1rem',
    xlarge: '1.2rem',
    xxlarge: '1.5rem',
    title: '2rem',
    hero: '3rem',
  },

  // Shadows
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 2px 8px rgba(0,0,0,0.1)',
    large: '0 4px 6px rgba(0,0,0,0.3)',
    text: '1px 1px 2px rgba(0,0,0,0.5)',
    textStrong: '2px 2px 4px rgba(0,0,0,0.5)',
  },

  // Grid settings
  grid: {
    minCardWidth: '300px',
    gap: '2rem',
  },

  // Contact information
  contact: {
    phone: '09 5420 0100',
    email: 'hesy@hesy.fi',
    address: {
      line1: 'Muonamiehentie 7',
      line2: '00390 Helsinki',
    },
  },

  // Social media
  social: {
    facebook: 'https://facebook.com/hesy',
    instagram: 'https://instagram.com/hesy',
    linkedin: 'https://linkedin.com/company/hesy',
    tiktok: 'https://tiktok.com/@hesy',
    youtube: 'https://youtube.com/@hesy',
    shop: 'https://shop.hesy.fi',
  },

  // Images
  images: {
    logo: '/images/logo_keltainan_512-300x300.png',
    frontpage: '/images/frontpage.jpg',
  },

  // Default language
  defaultLanguage: 'fi' as const,

  // Organization info
  organization: {
    businessId: '0201239-8',
    foundedYear: 1897,
  },
};

// Responsive breakpoints
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px',
};

// Helper function to create media queries
export function mediaQuery(breakpoint: keyof typeof breakpoints): string {
  return `@media (min-width: ${breakpoints[breakpoint]})`;
}
