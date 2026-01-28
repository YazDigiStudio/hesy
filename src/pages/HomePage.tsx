// Home page with hero image

type HomePageProps = {
  language: 'fi' | 'en' | 'sv';
};

export function HomePage({ language }: HomePageProps) {
  const content = {
    fi: {
      heroTitle: 'Tervetuloa HESYn sivuille',
      heroSubtitle: 'Helsingin eläinsuojeluyhdistys ry',
      heroDescription: 'Autamme eläimiä löytämään rakastavan kodin jo vuodesta 1897',
      adoptButton: 'Kotia etsivät eläimet',
      helpButton: 'Näin voit auttaa',
    },
    en: {
      heroTitle: 'Welcome to HESY',
      heroSubtitle: 'Helsinki Humane Society',
      heroDescription: 'Helping animals find loving homes since 1897',
      adoptButton: 'Animals Seeking Homes',
      helpButton: 'How You Can Help',
    },
    sv: {
      heroTitle: 'Välkommen till HESY',
      heroSubtitle: 'Helsingfors djurskyddsförening rf',
      heroDescription: 'Vi hjälper djur att hitta kärleksfulla hem sedan 1897',
      adoptButton: 'Djur söker hem',
      helpButton: 'Så här kan du hjälpa',
    },
  };

  const text = content[language];

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <img
          src="/images/frontpage.jpg"
          alt="HESY"
          style={styles.heroImage}
        />
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>{text.heroTitle}</h1>
            <h2 style={styles.heroSubtitle}>{text.heroSubtitle}</h2>
            <p style={styles.heroDescription}>{text.heroDescription}</p>
            <div style={styles.heroButtons}>
              <a href="/animals" style={styles.primaryButton}>
                {text.adoptButton}
              </a>
              <a href="/help" style={styles.secondaryButton}>
                {text.helpButton}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>
            {language === 'fi' && 'Ajankohtaista'}
            {language === 'en' && 'Current News'}
            {language === 'sv' && 'Aktuellt'}
          </h2>
          <p style={styles.placeholder}>
            {language === 'fi' && 'Tähän tulee uutisia ja tiedotteita...'}
            {language === 'en' && 'News and announcements will appear here...'}
            {language === 'sv' && 'Nyheter och meddelanden kommer att visas här...'}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
  },
  hero: {
    position: 'relative',
    height: '600px',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    textAlign: 'center',
    color: 'white',
    padding: '2rem',
    maxWidth: '800px',
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '0.5rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    fontWeight: 'normal',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  heroDescription: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#FDB913',
    color: '#1a1a1a',
    padding: '1rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    border: '2px solid #FDB913',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#1a1a1a',
    padding: '1rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    border: '2px solid white',
  },
  mainContent: {
    padding: '4rem 0',
    backgroundColor: '#f5f5f5',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  sectionTitle: {
    fontSize: '2rem',
    color: '#FDB913',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
  },
  placeholder: {
    fontSize: '1.1rem',
    color: '#666',
    lineHeight: '1.8',
  },
};
