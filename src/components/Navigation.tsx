// Main navigation component with mega menu

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { colors, hexToRgba } from '../config/colors';

type NavigationProps = {
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

export function Navigation({ currentLanguage, onLanguageChange, currentPath }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [expandedMobileSubmenu, setExpandedMobileSubmenu] = useState<string | null>(null);
  const [expandedSecondaryNav, setExpandedSecondaryNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-expand secondary nav based on current path
  useEffect(() => {
    // Determine which menu item should be expanded based on current path
    if (currentPath === '/' || currentPath === '/news' || currentPath === '/contact') {
      setExpandedSecondaryNav(null);
    } else if (currentPath.startsWith('/animals')) {
      setExpandedSecondaryNav('Kotia etsivät eläimet');
    } else if (currentPath.startsWith('/help')) {
      setExpandedSecondaryNav('Näin autat');
    } else if (currentPath.startsWith('/about')) {
      setExpandedSecondaryNav('Hesy');
    } else if (currentPath.startsWith('/news')) {
      setExpandedSecondaryNav('Ajankohtaista');
    } else if (currentPath.startsWith('/contact')) {
      setExpandedSecondaryNav('Yhteystiedot');
    }
  }, [currentPath]);

  const menuConfig: Record<'fi' | 'en' | 'sv', MenuConfig[]> = {
    fi: [
      { label: 'Etusivu', path: '/' },
      {
        label: 'Kotia etsivät eläimet',
        path: '/animals',
        submenu: [
          { label: 'Eläimet', path: '/animals' },
          { label: 'Tietoa eläimen hankinnasta', path: '/animals/info' },
          { label: 'Sopimusehdot', path: '/animals/contract' },
          { label: 'Sijoitusmaksut', path: '/animals/fees' },
          { label: 'Pääkaupunkiseudun Löytöeläimet', path: '/animals/found' },
        ],
      },
      {
        label: 'Näin autat',
        path: '/help',
        submenu: [
          {
            section: 'Rahalahjoitukset',
            items: [
              { label: 'Verkkokauppa', path: '/help/shop' },
              { label: 'MobilePay', path: '/help/mobilepay' },
              { label: 'Tekstiviestilahjoitus', path: '/help/sms' },
              { label: 'Kuukausilahjoitus', path: '/help/monthly' },
              { label: 'Tilisiirto', path: '/help/transfer' },
            ],
          },
          {
            section: 'Muut tavat auttaa',
            items: [
              { label: 'Tavaralahjoitukset', path: '/help/goods' },
              { label: 'Tavaratonkka', path: '/help/thrift-store' },
              { label: 'Testamentit', path: '/help/bequests' },
              { label: 'Vapaaehtoistyö', path: '/help/volunteer' },
              { label: 'Liity jäseneksi', path: '/help/membership' },
            ],
          },
        ],
      },
      {
        label: 'Hesy',
        path: '/about',
        submenu: [
          {
            section: 'Toiminta',
            items: [
              { label: 'Yleistä', path: '/about/general' },
              { label: 'Säännöt', path: '/about/rules' },
              { label: 'Vuosikertomukset', path: '/about/reports' },
              { label: 'Jäsenyhdistykset', path: '/about/member-associations' },
              { label: 'Yhteistyö', path: '/about/collaboration' },
              { label: 'UKK', path: '/about/faq' },
            ],
          },
          {
            section: 'Ihmiset',
            items: [
              { label: 'Henkilökunta', path: '/about/staff' },
              { label: 'Hallitus', path: '/about/board' },
            ],
          },
          {
            section: 'Paikat',
            items: [
              { label: 'HESY-keskus', path: '/about/center' },
              { label: 'HESY-Puoti', path: '/about/shop' },
              { label: 'HESY-areena', path: '/about/arena' },
              { label: 'Hautausmaa', path: '/about/cemetery' },
              { label: 'Viikin löytöeläintalo', path: '/about/viik-animal-house' },
            ],
          },
          {
            section: 'Muut',
            items: [
              { label: 'Eläinsuojelun Topelius -palkinto', path: '/about/award' },
              { label: 'Hesy-lehti', path: '/about/magazine' },
              { label: 'Esitteet', path: '/about/brochures' },
              { label: 'Yhteistyökumppanit', path: '/about/partners' },
              { label: 'Historia', path: '/about/history' },
              { label: 'Rekisteriseloste', path: '/about/privacy' },
            ],
          },
        ],
      },
      {
        label: 'Ajankohtaista',
        path: '/news',
        submenu: [
          {
            section: 'Uutiset ja tiedotteet',
            items: [
              { label: 'Tiedotteet', path: '/news/press-releases' },
              { label: 'Lausunnot', path: '/news/statements' },
              { label: 'Blogi', path: '/news/blog' },
            ],
          },
          {
            section: 'Tapahtumat ja uutiskirje',
            items: [
              { label: 'Tapahtumat', path: '/news/events' },
              { label: 'Tilaa HESYn uutiskirje', path: '/news/newsletter' },
            ],
          },
        ],
      },
      {
        label: 'Yhteystiedot',
        path: '/contact',
        submenu: [
          {
            section: 'Ota yhteyttä',
            items: [
              { label: 'Yhteydenotto', path: '/contact' },
            ],
          },
        ],
      },
      { label: 'Verkkokauppa', path: 'https://shop.hesy.fi' },
    ],
    en: [
      { label: 'Home', path: '/' },
      {
        label: 'Animals Seeking Homes',
        path: '/animals',
        submenu: [
          { label: 'Animals', path: '/animals' },
          { label: 'Info on Acquiring Animals', path: '/animals/info' },
          { label: 'Contract Terms', path: '/animals/contract' },
          { label: 'Placement Fees', path: '/animals/fees' },
          { label: 'Found Animals', path: '/animals/found' },
        ],
      },
      {
        label: 'How You Can Help',
        path: '/help',
        submenu: [
          {
            section: 'Monetary Donations',
            items: [
              { label: 'Online Shop', path: '/help/shop' },
              { label: 'MobilePay', path: '/help/mobilepay' },
              { label: 'SMS Donations', path: '/help/sms' },
              { label: 'Monthly Giving', path: '/help/monthly' },
              { label: 'Bank Transfer', path: '/help/transfer' },
            ],
          },
          {
            section: 'Other Support',
            items: [
              { label: 'Goods Donations', path: '/help/goods' },
              { label: 'Thrift Store', path: '/help/thrift-store' },
              { label: 'Bequests', path: '/help/bequests' },
              { label: 'Volunteering', path: '/help/volunteer' },
              { label: 'Join as Member', path: '/help/membership' },
            ],
          },
        ],
      },
      {
        label: 'About HESY',
        path: '/about',
        submenu: [
          {
            section: 'Operations',
            items: [
              { label: 'General Info', path: '/about/general' },
              { label: 'Rules', path: '/about/rules' },
              { label: 'Annual Reports', path: '/about/reports' },
              { label: 'Member Associations', path: '/about/member-associations' },
              { label: 'Collaboration', path: '/about/collaboration' },
              { label: 'FAQ', path: '/about/faq' },
            ],
          },
          {
            section: 'People',
            items: [
              { label: 'Staff', path: '/about/staff' },
              { label: 'Board', path: '/about/board' },
            ],
          },
          {
            section: 'Locations',
            items: [
              { label: 'HESY Center', path: '/about/center' },
              { label: 'HESY Shop', path: '/about/shop' },
              { label: 'HESY Arena', path: '/about/arena' },
              { label: 'Cemetery', path: '/about/cemetery' },
              { label: 'Viik Lost Animal House', path: '/about/viik-animal-house' },
            ],
          },
          {
            section: 'Other',
            items: [
              { label: 'Award', path: '/about/award' },
              { label: 'Magazine', path: '/about/magazine' },
              { label: 'Brochures', path: '/about/brochures' },
              { label: 'Partners', path: '/about/partners' },
              { label: 'History', path: '/about/history' },
              { label: 'Privacy Notice', path: '/about/privacy' },
            ],
          },
        ],
      },
      {
        label: 'News',
        path: '/news',
        submenu: [
          {
            section: 'News',
            items: [
              { label: 'Press Releases', path: '/news/press-releases' },
              { label: 'Statements', path: '/news/statements' },
              { label: 'Blog', path: '/news/blog' },
            ],
          },
          {
            section: 'Events & Newsletter',
            items: [
              { label: 'Events', path: '/news/events' },
              { label: 'Newsletter Signup', path: '/news/newsletter' },
            ],
          },
        ],
      },
      {
        label: 'Contact',
        path: '/contact',
        submenu: [
          {
            section: 'Get in Touch',
            items: [
              { label: 'Contact', path: '/contact' },
            ],
          },
        ],
      },
      { label: 'Web Shop', path: 'https://shop.hesy.fi' },
    ],
    sv: [
      { label: 'Hem', path: '/' },
      {
        label: 'Djur söker hem',
        path: '/animals',
        submenu: [
          { label: 'Djur', path: '/animals' },
          { label: 'Info om att skaffa djur', path: '/animals/info' },
          { label: 'Avtalsvillkor', path: '/animals/contract' },
          { label: 'Placeringsavgifter', path: '/animals/fees' },
          { label: 'Hittade djur', path: '/animals/found' },
        ],
      },
      {
        label: 'Så här hjälper du',
        path: '/help',
        submenu: [
          {
            section: 'Donationer',
            items: [
              { label: 'Webshop', path: '/help/shop' },
              { label: 'MobilePay', path: '/help/mobilepay' },
              { label: 'SMS-donation', path: '/help/sms' },
              { label: 'Månatlig donation', path: '/help/monthly' },
              { label: 'Banköverföring', path: '/help/transfer' },
            ],
          },
          {
            section: 'Andra sätt',
            items: [
              { label: 'Varudonation', path: '/help/goods' },
              { label: 'Skräpbutiken', path: '/help/thrift-store' },
              { label: 'Testamenten', path: '/help/bequests' },
              { label: 'Frivilligarbete', path: '/help/volunteer' },
              { label: 'Bli medlem', path: '/help/membership' },
            ],
          },
        ],
      },
      {
        label: 'Om HESY',
        path: '/about',
        submenu: [
          {
            section: 'Verksamhet',
            items: [
              { label: 'Allmänt', path: '/about/general' },
              { label: 'Regler', path: '/about/rules' },
              { label: 'Årsrapporter', path: '/about/reports' },
              { label: 'Medlemsföreningar', path: '/about/member-associations' },
              { label: 'Samarbete', path: '/about/collaboration' },
              { label: 'FAQ', path: '/about/faq' },
            ],
          },
          {
            section: 'Människor',
            items: [
              { label: 'Personal', path: '/about/staff' },
              { label: 'Styrelse', path: '/about/board' },
            ],
          },
          {
            section: 'Platser',
            items: [
              { label: 'HESY-centrum', path: '/about/center' },
              { label: 'HESY-butiken', path: '/about/shop' },
              { label: 'HESY-arena', path: '/about/arena' },
              { label: 'Kyrkogård', path: '/about/cemetery' },
              { label: 'Viks djurhem', path: '/about/viik-animal-house' },
            ],
          },
          {
            section: 'Övrigt',
            items: [
              { label: 'Pris', path: '/about/award' },
              { label: 'Tidning', path: '/about/magazine' },
              { label: 'Broschyrer', path: '/about/brochures' },
              { label: 'Partners', path: '/about/partners' },
              { label: 'Historia', path: '/about/history' },
              { label: 'Integritetspolicy', path: '/about/privacy' },
            ],
          },
        ],
      },
      {
        label: 'Aktuellt',
        path: '/news',
        submenu: [
          {
            section: 'Nyheter',
            items: [
              { label: 'Pressmeddelanden', path: '/news/press-releases' },
              { label: 'Uttalanden', path: '/news/statements' },
              { label: 'Blogg', path: '/news/blog' },
            ],
          },
          {
            section: 'Evenemang och nyhetsbrev',
            items: [
              { label: 'Evenemang', path: '/news/events' },
              { label: 'Prenumerera på nyhetsbrev', path: '/news/newsletter' },
            ],
          },
        ],
      },
      {
        label: 'Kontakt',
        path: '/contact',
        submenu: [
          {
            section: 'Kontakta oss',
            items: [
              { label: 'Kontakt', path: '/contact' },
            ],
          },
        ],
      },
      { label: 'Webbshop', path: 'https://shop.hesy.fi' },
    ],
  };

  const currentMenu = menuConfig[currentLanguage];
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

  const getLinkColor = () => isHomePage ? 'white' : '#333';
  const getShadow = () => isHomePage ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none';

  const getSections = (): MenuSection[] => {
    if (!expandedSecondaryNav) return [];
    const expandedItem = currentMenu.find(item => item.label === expandedSecondaryNav);
    return expandedItem?.submenu?.filter((item): item is MenuSection => 'section' in item) || [];
  };

  const getFlatItems = (): MenuSubitem[] => {
    if (!expandedSecondaryNav) return [];
    const expandedItem = currentMenu.find(item => item.label === expandedSecondaryNav);
    return expandedItem?.submenu?.filter((item): item is MenuSubitem => !('section' in item)) || [];
  };

  const renderSecondaryNav = () => {
    const sections = getSections();
    const flatItems = getFlatItems();
    if (!expandedSecondaryNav || (sections.length === 0 && flatItems.length === 0)) return null;

    return (
      <>
        {/* Render flat items (no sections) */}
        {flatItems.map((item: MenuSubitem, idx: number) => (
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
              onClick={() => {
                setExpandedSecondaryNav(null);
              }}
            >
              {item.label}
            </Link>
          </div>
        ))}

        {/* Render sections with dropdowns */}
        {sections.map((section: MenuSection, idx: number) => (
          <div key={`section-${idx}`} style={styles.menuItemWrapper} className="secondary-menu-item-wrapper">
            <button
              style={{
                ...styles.link,
                color: getLinkColor(),
                textShadow: getShadow(),
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottom: '2px solid transparent',
                paddingBottom: '4px',
              }}
            >
              {section.section}
            </button>

            {/* Dropdown for section pages */}
            <div style={styles.secondaryDropdown} className="secondary-dropdown">
              <div style={styles.secondaryDropdownContent}>
                {section.items.map((link: MenuSubitem, linkIdx: number) => (
                  <Link
                    key={linkIdx}
                    to={link.path}
                    style={{
                      ...styles.secondaryDropdownItem,
                      color: currentPath === link.path ? colors.green.dark : '#333',
                      fontWeight: currentPath === link.path ? 'bold' : 'normal',
                    }}
                    className="secondary-dropdown-item"
                    onClick={() => {
                      setExpandedSecondaryNav(null);
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderDesktopMenu = () => (
    <>
      {currentMenu.map((item, idx) => {
        const hasSection = item.submenu && (item.submenu.some((sub): sub is MenuSection => 'section' in sub) || item.submenu.some((sub): sub is MenuSubitem => !('section' in sub)));
        const isExpanded = expandedSecondaryNav === item.label;
        
        return (
          <div key={idx} style={styles.menuItemWrapper} className="menu-item-wrapper">
            {hasSection ? (
              <Link
                to={item.path || '#'}
                style={{
                  ...styles.link,
                  color: getLinkColor(),
                  textShadow: getShadow(),
                  textDecoration: 'none',
                  borderBottom: isExpanded ? '2px solid #FDB913' : '2px solid transparent',
                  paddingBottom: '4px',
                }}
                onClick={() => {
                  setExpandedSecondaryNav(item.label);
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
                onClick={() => {
                  setExpandedSecondaryNav(null);
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

  const renderMobileMenu = () => (
    <div style={styles.mobileMenu}>
      {currentMenu.map((item, idx) => (
        <div key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link
              to={item.path || '#'}
              style={{
                ...styles.mobileLink,
                flex: 1,
                borderBottom: 'none',
                paddingRight: item.submenu ? '1rem' : '0',
              }}
            >
              {item.label}
            </Link>
            {item.submenu && (
              <button
                style={styles.mobileExpandButton}
                onClick={() =>
                  setExpandedMobileSubmenu(
                    expandedMobileSubmenu === item.label ? null : item.label
                  )
                }
              >
                {expandedMobileSubmenu === item.label ? '▲' : '▼'}
              </button>
            )}
          </div>

          {item.submenu && expandedMobileSubmenu === item.label && (
            <div style={styles.mobileSubmenu}>
              {item.submenu.map((subitem: MenuSubmenuItem, subIdx: number) => {
                if ('section' in subitem) {
                  // Render section items
                  return (
                    <div key={subIdx}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: colors.green.dark, paddingLeft: '2rem', paddingTop: '0.5rem' }}>
                        {subitem.section}
                      </div>
                      {subitem.items.map((link: MenuSubitem, linkIdx: number) => (
                        <Link
                          key={linkIdx}
                          to={link.path}
                          style={{
                            ...styles.mobileLink,
                            paddingLeft: '3rem',
                            fontSize: '0.9rem',
                          }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  );
                } else {
                  // Regular submenu item (no sections)
                  return (
                    <Link
                      key={subIdx}
                      to={subitem.path}
                      style={{
                        ...styles.mobileLink,
                        paddingLeft: '2rem',
                        fontSize: '0.9rem',
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {subitem.label}
                    </Link>
                  );
                }
              })}
            </div>
          )}
        </div>
      ))}
    </div>
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

        {/* Language Switcher */}
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

        {/* Mobile Menu Button */}
        <button
          style={{
            ...styles.mobileMenuButton,
            color: getLinkColor(),
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-mobile-menu-button
        >
          ☰
        </button>
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div data-mobile-menu>
          {renderMobileMenu()}
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
    padding: '0',
    gap: '0',
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  mobileLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    display: 'block',
  },
  mobileExpandButton: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  mobileSubmenu: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderLeft: '2px solid #FDB913',
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

// Add CSS for hover effect and responsive design
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

  @media (max-width: 768px) {
    [data-desktop-menu] {
      display: none !important;
    }
    [data-mobile-menu-button] {
      display: block !important;
    }
  }

  @media (min-width: 769px) {
    [data-mobile-menu] {
      display: none !important;
    }
    [data-mobile-menu-button] {
      display: none !important;
    }
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(styleSheet);
}
