// Help page - how to support HESY

type HelpPageProps = {
  language: 'fi' | 'en' | 'sv';
};

export function HelpPage({ language }: HelpPageProps) {
  const content = {
    fi: {
      title: 'Näin autat',
      subtitle: 'Tukesi on meille tärkeää',
    },
    en: {
      title: 'How You Can Help',
      subtitle: 'Your support matters to us',
    },
    sv: {
      title: 'Så här hjälper du',
      subtitle: 'Ditt stöd är viktigt för oss',
    },
  };

  const text = content[language];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>{text.title}</h1>
        <p style={styles.subtitle}>{text.subtitle}</p>
        <p style={styles.placeholder}>
          {language === 'fi' && 'Sisältö tulossa...'}
          {language === 'en' && 'Content coming soon...'}
          {language === 'sv' && 'Innehåll kommer snart...'}
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    paddingTop: '80px',
    backgroundColor: '#f5f5f5',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#FDB913',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2rem',
  },
  placeholder: {
    fontSize: '1rem',
    color: '#999',
    fontStyle: 'italic',
  },
};
