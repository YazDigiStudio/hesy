// Contact page - contact information

type ContactPageProps = {
  language: 'fi' | 'en' | 'sv';
};

export function ContactPage({ language }: ContactPageProps) {
  const content = {
    fi: {
      title: 'Yhteystiedot',
      subtitle: 'Ota yhteyttä',
    },
    en: {
      title: 'Contact',
      subtitle: 'Get in touch',
    },
    sv: {
      title: 'Kontakt',
      subtitle: 'Kontakta oss',
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
