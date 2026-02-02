// Help page - how to support HESY

import { useTranslations } from '../hooks/useTranslations';

type HelpPageProps = {
  language: 'fi' | 'en' | 'sv';
};

export function HelpPage({ language }: HelpPageProps) {
  const t = useTranslations(language);
  const text = t.help;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>{text.title}</h1>
        <p style={styles.subtitle}>{text.subtitle}</p>
        <p style={styles.placeholder}>
          {t.common.contentComingSoon}
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    paddingTop: 'clamp(60px, 10vw, 80px)',
    backgroundColor: '#f5f5f5',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'clamp(1.5rem, 3vw, 2rem) clamp(0.75rem, 2vw, 1rem)',
  },
  title: {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    color: '#FDB913',
    marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#666',
    marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
  },
  placeholder: {
    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
    color: '#999',
    fontStyle: 'italic',
  },
};
