// Mobile navigation component - Simple logo + hamburger menu

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslations } from '../hooks/useTranslations';

type MobileNavigationProps = {
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

export function MobileNavigation({
  currentLanguage,
  onLanguageChange,
  currentPath,
}: MobileNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  const t = useTranslations(currentLanguage);
  const menu = t.navigation.menu as MenuConfig[];

  const closeMenu = () => {
    setMenuOpen(false);
    setExpandedSubmenu(null);
  };

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.container}>
          {/* Logo */}
          <Link to="/" style={styles.logoLink} onClick={closeMenu}>
            <img
              src="/images/logo_keltainan_512-300x300.png"
              alt="HESY"
              style={styles.logo}
            />
          </Link>

          {/* Hamburger Button */}
          <button
            style={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div style={styles.overlay} onClick={closeMenu}>
          <div style={styles.menu} onClick={(e) => e.stopPropagation()}>
            {/* Menu Items */}
            <div style={styles.menuItems}>
              {menu.map((item, idx) => {
                const isActivePath = currentPath === item.path || currentPath.startsWith((item.path || '') + '/');
                const isExpanded = expandedSubmenu === item.path;

                return (
                <div key={idx} style={styles.menuItem}>
                  {/* Primary Link - clicking expands submenu or navigates */}
                  <button
                    style={{
                      ...styles.menuLink,
                      fontWeight: isActivePath ? 'bold' : 'normal',
                      color: isActivePath ? '#FDB913' : '#333',
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      if (item.submenu) {
                        // Toggle submenu
                        setExpandedSubmenu(isExpanded ? null : (item.path || null));
                      } else {
                        // Navigate and close
                        closeMenu();
                      }
                    }}
                  >
                    {item.label}
                  </button>

                  {/* Submenu - shown when expanded */}
                  {item.submenu && isExpanded && (
                    <div style={styles.submenu}>
                      {item.submenu.map((subitem: MenuSubmenuItem, subIdx: number) => {
                        if ('section' in subitem) {
                          // Section with items
                          return (
                            <div key={subIdx}>
                              <div style={styles.sectionTitle}>{subitem.section}</div>
                              {subitem.items.map((link: MenuSubitem, linkIdx: number) => (
                                <Link
                                  key={linkIdx}
                                  to={link.path}
                                  style={styles.submenuLink}
                                  onClick={closeMenu}
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          );
                        } else {
                          // Regular submenu item
                          return (
                            <Link
                              key={subIdx}
                              to={subitem.path}
                              style={styles.submenuLink}
                              onClick={closeMenu}
                            >
                              {subitem.label}
                            </Link>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              );
              })}
            </div>

            {/* Language Switcher at bottom */}
            <div style={styles.langSection}>
              {['fi', 'en', 'sv'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    onLanguageChange(lang as 'fi' | 'en' | 'sv');
                  }}
                  style={{
                    ...styles.langButton,
                    ...(currentLanguage === lang ? styles.langButtonActive : {}),
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#a0a0a0',
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    maxWidth: '100%',
    flexWrap: 'nowrap',
    width: '100%',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    flex: '0 0 auto',
  },
  logo: {
    height: '40px',
    width: 'auto',
    maxWidth: '200px',
  },
  hamburger: {
    background: 'transparent',
    border: 'none',
    padding: '0.5rem',
    fontSize: '1.75rem',
    cursor: 'pointer',
    minWidth: '44px',
    minHeight: '44px',
    width: 'auto',
    maxWidth: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
    flex: '0 0 auto',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
    paddingTop: '60px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  menu: {
    backgroundColor: 'white',
    maxHeight: 'calc(100vh - 60px)',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    maxWidth: '300px',
    minWidth: '250px',
  },
  langSection: {
    display: 'flex',
    gap: '0.375rem',
    padding: '0.625rem 0.5rem',
    borderTop: '1px solid #e0e0e0',
    justifyContent: 'center',
    marginTop: 'auto',
    backgroundColor: '#f8f8f8',
    flexWrap: 'nowrap',
    flexShrink: 0,
  },
  langButton: {
    background: 'white',
    border: '1px solid #ccc',
    padding: '0.375rem 0.625rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.75rem',
    flex: '0 0 auto',
    minWidth: 'auto',
    width: 'auto',
  },
  langButtonActive: {
    backgroundColor: '#FDB913',
    borderColor: '#FDB913',
    color: 'white',
    fontWeight: 'bold',
  },
  menuItems: {
    padding: '0',
  },
  menuItem: {
    borderBottom: '1px solid #e0e0e0',
  },
  menuLink: {
    padding: '0.875rem 1rem',
    color: '#333',
    textDecoration: 'none',
    fontSize: '0.95rem',
    display: 'block',
  },
  submenu: {
    backgroundColor: '#f9f9f9',
    borderLeft: '3px solid #FDB913',
  },
  sectionTitle: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#FDB913',
    padding: '0.625rem 1rem 0.375rem 1.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  submenuLink: {
    display: 'block',
    padding: '0.625rem 1rem 0.625rem 1.5rem',
    color: '#555',
    textDecoration: 'none',
    fontSize: '0.875rem',
  },
};
