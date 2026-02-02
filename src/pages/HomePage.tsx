// Home page with hero image

import { useTranslations } from '../hooks/useTranslations';

type HomePageProps = {
  language: 'fi' | 'en' | 'sv';
};

export function HomePage({ language }: HomePageProps) {
  const t = useTranslations(language);
  const text = t.homepage;

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <img
          src="/images/hero.jpg"
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
            {text.newsTitle}
          </h2>
          <p style={styles.placeholder}>
            {text.newsPlaceholder}
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
    minHeight: '500px',
    height: 'clamp(500px, 70vh, 600px)',
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
    padding: 'clamp(1rem, 4vw, 2rem)',
    maxWidth: '800px',
    width: '100%',
  },
  heroTitle: {
    fontSize: 'clamp(1.75rem, 5vw, 3rem)',
    marginBottom: '0.5rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  heroSubtitle: {
    fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
    marginBottom: '1rem',
    fontWeight: 'normal',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  heroDescription: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
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
    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 2rem)',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    border: '2px solid #FDB913',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#1a1a1a',
    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 2rem)',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
    fontWeight: 'bold',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    border: '2px solid white',
  },
  mainContent: {
    padding: 'clamp(2rem, 5vw, 4rem) 0',
    backgroundColor: '#f5f5f5',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 clamp(1rem, 3vw, 2rem)',
  },
  sectionTitle: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    color: '#FDB913',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
  },
  placeholder: {
    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
    color: '#666',
    lineHeight: '1.8',
  },
};
