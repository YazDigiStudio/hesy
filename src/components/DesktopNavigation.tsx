// Desktop navigation component with mega menu

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { colors, hexToRgba } from '../config/colors';
import { useTranslations } from '../hooks/useTranslations';
import { UserMenu } from './UserMenu';

type DesktopNavigationProps = {
  currentLanguage: 'fi' | 'en' | 'sv';
  onLanguageChange: (lang: 'fi' | 'en' | 'sv') => void;
  currentPath: string;
};

type MenuSubitem = { label: string; path: string };
type MenuSection = { section: string; items: MenuSubitem[] };
type MenuSubmenuItem = MenuSubitem | MenuSection;

type MenuConfig = {
  label: string;
  path?: string;
  submenu?: MenuSubmenuItem[];
};

export function DesktopNavigation({ currentLanguage, onLanguageChange, currentPath }: DesktopNavigationProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute expanded secondary nav directly from current path
  const getExpandedSecondaryNav = (): string | null => {
    if (currentPath === '/') {
      return null;
    } else if (currentPath.startsWith('/animals')) {
      return '/animals';
    } else if (currentPath.startsWith('/help')) {
      return '/help';
    } else if (currentPath.startsWith('/about')) {
      return '/about';
    } else if (currentPath.startsWith('/news')) {
      return '/news';
    }
    return null;
  };

  const expandedSecondaryNav = getExpandedSecondaryNav();

  const defaultSubpages: Record<string, string> = {
    '/about': '/about/general',
    '/animals': '/animals',
    '/help': '/help/general',
    '/news': '/news/events',
  };

  const t = useTranslations(currentLanguage);

  const currentMenu = t.navigation.menu as MenuConfig[];

  const isHomePage = currentPath === '/';

  const scrollOpacity = scrollY < 200
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

  const getLinkColor = () => isHomePage ? 'white' : '#333';
  const getShadow = () => isHomePage ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none';

  const getSections = (): MenuSection[] => {
    if (!expandedSecondaryNav) return [];
    const expandedItem = currentMenu.find(item => item.path === expandedSecondaryNav);
    return expandedItem?.submenu?.filter((item): item is MenuSection => 'section' in item) || [];
  };

  const getFlatItems = (): MenuSubitem[] => {
    if (!expandedSecondaryNav) return [];
    const expandedItem = currentMenu.find(item => item.path === expandedSecondaryNav);
    return expandedItem?.submenu?.filter((item): item is MenuSubitem => !('section' in item)) || [];
  };

  const renderSecondaryNav = () => {
    const sections = getSections();
    const flatItems = getFlatItems();
    if (!expandedSecondaryNav || (sections.length === 0 && flatItems.length === 0)) return null;

    return (
      <>
        {/* Render flat items (no sections) */}
        {flatItems.map((item: MenuSubitem, idx: number) => {
          const isExternalLink = item.path.startsWith('http');
          return isExternalLink ? (
            <div key={`flat-${idx}`} style={styles.menuItemWrapper} className="secondary-menu-item-wrapper">
              <a
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.link,
                  color: getLinkColor(),
                  textShadow: getShadow(),
                  textDecoration: 'none',
                  borderBottom: '2px solid transparent',
                  paddingBottom: '4px',
                }}
              >
                {item.label}
              </a>
            </div>
          ) : (
            <div key={`flat-${idx}`} style={styles.menuItemWrapper} className="secondary-menu-item-wrapper">
              <Link
                to={item.path}
                style={{
                  ...styles.link,
                  color: getLinkColor(),
                  textShadow: getShadow(),
                  borderBottom: currentPath === item.path ? '2px solid #FDB913' : '2px solid transparent',
                  paddingBottom: '4px',
                }}
              >
                {item.label}
              </Link>
            </div>
          );
        })}

        {/* Render sections with dropdowns */}
        {sections.map((section: MenuSection, idx: number) => {
          const isActiveSectionPath = section.items.some(item => currentPath === item.path);
          return (
          <div key={`section-${idx}`} style={styles.menuItemWrapper} className="secondary-menu-item-wrapper">
            <button
              style={{
                ...styles.link,
                color: getLinkColor(),
                textShadow: getShadow(),
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottom: isActiveSectionPath ? '2px solid #FDB913' : '2px solid transparent',
                paddingBottom: '4px',
              }}
            >
              {section.section}
            </button>

            {/* Dropdown for section pages */}
            <div style={styles.secondaryDropdown} className="secondary-dropdown">
              <div style={styles.secondaryDropdownContent}>
                {section.items.map((link: MenuSubitem, linkIdx: number) => {
                  const isExternalLink = link.path.startsWith('http');
                  return isExternalLink ? (
                    <a
                      key={linkIdx}
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.secondaryDropdownItem}
                      className="secondary-dropdown-item"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={linkIdx}
                      to={link.path}
                      style={styles.secondaryDropdownItem}
                      className="secondary-dropdown-item"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
        })}
      </>
    );
  };

  const renderDesktopMenu = () => (
    <>
      {currentMenu.map((item, idx) => {
        const hasSection = item.submenu && (item.submenu.some((sub): sub is MenuSection => 'section' in sub) || item.submenu.some((sub): sub is MenuSubitem => !('section' in sub)));
        const isExpanded = expandedSecondaryNav === item.path;

        return (
          <div key={idx} style={styles.menuItemWrapper} className="menu-item-wrapper">
            {hasSection ? (
              <Link
                to={defaultSubpages[item.path || ''] || item.path || '#'}
                style={{
                  ...styles.link,
                  color: getLinkColor(),
                  textShadow: getShadow(),
                  textDecoration: 'none',
                  borderBottom: isExpanded ? '2px solid #FDB913' : '2px solid transparent',
                  paddingBottom: '4px',
                }}
              >
                {item.label}
              </Link>
            ) : (
              <Link
                to={item.path || '#'}
                style={{
                  ...styles.link,
                  color: getLinkColor(),
                  textShadow: getShadow(),
                  borderBottom: currentPath === item.path ? '2px solid #FDB913' : '2px solid transparent',
                  paddingBottom: '4px',
                }}
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </>
  );


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
        <div style={styles.desktopMenu} data-desktop-menu>
          {renderDesktopMenu()}
        </div>

        {/* Language Switcher and User Menu */}
        <div style={styles.rightSection} data-right-section>
          <div style={styles.languageSwitcher}>
            {['fi', 'en', 'sv'].map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang as 'fi' | 'en' | 'sv')}
                style={{
                  ...styles.langButton,
                  color: getLinkColor(),
                  borderColor: isHomePage ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                  ...(currentLanguage === lang ? {
                    backgroundColor: isHomePage ? 'rgba(253,185,19,0.3)' : 'rgba(253,185,19,0.2)',
                    borderColor: '#FDB913',
                    color: isHomePage ? '#FDB913' : '#333',
                    fontWeight: 'bold',
                  } : {}),
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <UserMenu language={currentLanguage} />
        </div>
      </div>

      {/* Secondary Navigation Row (for About/Hesy sections) - integrated into same navbar */}
      {expandedSecondaryNav && (
        <div style={{
          ...styles.secondaryNavRow,
          backgroundColor: isHomePage ? hexToRgba(colors.grey.medium, scrollOpacity) : colors.grey.medium,
        }}>
          <div style={styles.secondaryNavContainer}>
            {renderSecondaryNav()}
          </div>
        </div>
      )}
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '0',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    minHeight: 'auto',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0.5rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
    boxSizing: 'border-box',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '60px',
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
    gap: '1rem',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  menuItemWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  link: {
    textDecoration: 'none',
    fontSize: '0.9rem',
    padding: '0.5rem 0.75rem',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
  },
  megaMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    minWidth: '300px',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    transform: 'translateY(-8px)',
    marginTop: '-8px',
    paddingTop: '8px',
  },
  megaMenuContent: {
    padding: '0.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '500px',
    overflowY: 'auto',
    columnCount: 2,
    columnGap: '1rem',
  },
  megaMenuSection: {
    breakInside: 'avoid',
    marginBottom: '1rem',
  },
  megaMenuSectionTitle: {
    paddingLeft: '1.2rem',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: colors.green.dark,
    marginBottom: '0.4rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  megaMenuItem: {
    padding: '0.6rem 1.2rem',
    textDecoration: 'none',
    color: '#333',
    fontSize: '0.85rem',
    transition: 'background-color 0.2s ease',
    display: 'block',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
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
    fontSize: '0.8rem',
    transition: 'all 0.3s ease',
  },
  secondaryNav: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e0e0e0',
    paddingTop: '82px',
  },
  secondaryNavRow: {
    borderTop: 'none',
    borderBottom: 'none',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    top: '70px',
    left: 0,
  },
  secondaryNavContainer: {
    display: 'flex',
    gap: '2rem',
    padding: '0.25rem 1rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  secondaryNavItemWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  secondaryNavItem: {
    textDecoration: 'none',
    fontSize: '0.9rem',
    padding: '0.75rem 0.5rem',
    color: '#333',
    whiteSpace: 'nowrap',
  },
  secondaryDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    minWidth: '220px',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    transform: 'translateY(-8px)',
    marginTop: '-8px',
    paddingTop: '8px',
    zIndex: 50,
  },
  secondaryDropdownContent: {
    padding: '0.5rem 0',
    display: 'flex',
    flexDirection: 'column',
  },
  secondaryDropdownItem: {
    padding: '0.6rem 1.2rem',
    textDecoration: 'none',
    color: '#333',
    fontSize: '0.85rem',
    transition: 'background-color 0.2s ease',
    display: 'block',
  },
};

// Add CSS for hover effects
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .menu-item-wrapper:hover .mega-menu {
    opacity: 1 !important;
    pointer-events: auto !important;
    transform: translateY(0) !important;
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  .mega-menu-item:hover {
    background-color: #f5f5f5 !important;
  }

  .secondary-menu-item-wrapper:hover .secondary-dropdown {
    opacity: 1 !important;
    pointer-events: auto !important;
    transform: translateY(0) !important;
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  .secondary-dropdown-item:hover {
    background-color: #f5f5f5 !important;
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(styleSheet);
}
