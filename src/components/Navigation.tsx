// Main navigation component

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { colors, hexToRgba } from '../config/colors';

type NavigationProps = {
  currentLanguage: 'fi' | 'en' | 'sv';
  onLanguageChange: (lang: 'fi' | 'en' | 'sv') => void;
  currentPath: string;
};

export function Navigation({ currentLanguage, onLanguageChange, currentPath }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = {
    fi: {
      home: 'Etusivu',
      animals: 'Kotia etsivät eläimet',
      help: 'Näin autat',
      about: 'Hesy',
      news: 'Ajankohtaista',
      contact: 'Yhteystiedot',
      shop: 'Verkkokauppa',
    },
    en: {
      home: 'Home',
      animals: 'Animals Seeking Homes',
      help: 'How You Can Help',
      about: 'Hesy',
      news: 'Current Events',
      contact: 'Contact',
      shop: 'Web Shop',
    },
    sv: {
      home: 'Hem',
      animals: 'Djur söker hem',
      help: 'Så här hjälper du',
      about: 'Hesy',
      news: 'Aktuellt',
      contact: 'Kontakt',
      shop: 'Webbshop',
    },
  };

  const menu = menuItems[currentLanguage];
  const isHomePage = currentPath === '/';

  const scrollOpacity = scrollY < 300
    ? 0
    : Math.min((scrollY - 300) / 300, 1);
  const backgroundColor = isHomePage
    ? hexToRgba(colors.grey.medium, scrollOpacity)
    : colors.grey.medium;

  const navStyle = {
    ...styles.nav,
    backgroundColor,
    position: 'fixed' as const,
  };

  const getLinkStyle = (path: string) => ({
    ...styles.link,
    color: isHomePage ? 'white' : '#333',
    textShadow: isHomePage ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none',
    borderBottom: currentPath === path ? '2px solid #FDB913' : '2px solid transparent',
    paddingBottom: '4px',
    transition: 'border-bottom 0.3s ease',
  });

  const getMobileLinkStyle = (path: string) => ({
    ...styles.mobileLink,
    borderBottom: currentPath === path
      ? '2px solid #FDB913'
      : '1px solid rgba(255,255,255,0.1)',
  });

  return (
    <nav style={navStyle}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo}>
          <Link to="/" style={styles.logoLink}>
            <img
              src="/images/logo_keltainan_512-300x300.png"
              alt="HESY"
              style={styles.logoImage}
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div style={styles.desktopMenu}>
          <Link to="/" style={getLinkStyle('/')}>{menu.home}</Link>
          <Link to="/animals" style={getLinkStyle('/animals')}>{menu.animals}</Link>
          <Link to="/help" style={getLinkStyle('/help')}>{menu.help}</Link>
          <Link to="/about" style={getLinkStyle('/about')}>{menu.about}</Link>
          <Link to="/news" style={getLinkStyle('/news')}>{menu.news}</Link>
          <Link to="/contact" style={getLinkStyle('/contact')}>{menu.contact}</Link>
          <a href="https://shop.hesy.fi" style={{...styles.link, color: isHomePage ? 'white' : '#333'}} target="_blank" rel="noopener noreferrer">
            {menu.shop}
          </a>
        </div>

        {/* Language Switcher */}
        <div style={styles.languageSwitcher}>
          <button
            onClick={() => onLanguageChange('fi')}
            style={{
              ...styles.langButton,
              color: isHomePage ? 'white' : '#333',
              borderColor: isHomePage ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
              ...(currentLanguage === 'fi' ? {
                backgroundColor: isHomePage ? 'rgba(253,185,19,0.3)' : 'rgba(253,185,19,0.2)',
                borderColor: '#FDB913',
                color: isHomePage ? '#FDB913' : '#333',
                fontWeight: 'bold',
              } : {}),
            }}
          >
            FI
          </button>
          <button
            onClick={() => onLanguageChange('en')}
            style={{
              ...styles.langButton,
              color: isHomePage ? 'white' : '#333',
              borderColor: isHomePage ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
              ...(currentLanguage === 'en' ? {
                backgroundColor: isHomePage ? 'rgba(253,185,19,0.3)' : 'rgba(253,185,19,0.2)',
                borderColor: '#FDB913',
                color: isHomePage ? '#FDB913' : '#333',
                fontWeight: 'bold',
              } : {}),
            }}
          >
            EN
          </button>
          <button
            onClick={() => onLanguageChange('sv')}
            style={{
              ...styles.langButton,
              color: isHomePage ? 'white' : '#333',
              borderColor: isHomePage ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
              ...(currentLanguage === 'sv' ? {
                backgroundColor: isHomePage ? 'rgba(253,185,19,0.3)' : 'rgba(253,185,19,0.2)',
                borderColor: '#FDB913',
                color: isHomePage ? '#FDB913' : '#333',
                fontWeight: 'bold',
              } : {}),
            }}
          >
            SV
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          style={{
            ...styles.mobileMenuButton,
            color: isHomePage ? 'white' : '#333',
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={getMobileLinkStyle('/')}>{menu.home}</Link>
          <Link to="/animals" style={getMobileLinkStyle('/animals')}>{menu.animals}</Link>
          <Link to="/help" style={getMobileLinkStyle('/help')}>{menu.help}</Link>
          <Link to="/about" style={getMobileLinkStyle('/about')}>{menu.about}</Link>
          <Link to="/news" style={getMobileLinkStyle('/news')}>{menu.news}</Link>
          <Link to="/contact" style={getMobileLinkStyle('/contact')}>{menu.contact}</Link>
          <a href="https://shop.hesy.fi" style={styles.mobileLink} target="_blank" rel="noopener noreferrer">
            {menu.shop}
          </a>
        </div>
      )}
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '1rem 0',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logoImage: {
    height: '50px',
    width: 'auto',
    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))',
  },
  desktopMenu: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  languageSwitcher: {
    display: 'flex',
    gap: '0.5rem',
  },
  langButton: {
    background: 'transparent',
    border: '1px solid',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'all 0.3s ease',
  },
  mobileMenuButton: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    gap: '0.75rem',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  mobileLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  },
};
