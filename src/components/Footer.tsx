// Footer component

type FooterProps = {
  language: 'fi' | 'en' | 'sv';
};

export function Footer({ language }: FooterProps) {
  const content = {
    fi: {
      organization: 'Helsingin eläinsuojeluyhdistys HESY ry',
      businessId: 'Y-tunnus: 0201239-8',
      phone: 'Puhelin',
      phoneHours: 'Puhelinpalvelu ma-pe klo 09-16',
      email: 'Sähköposti',
      address: 'Osoite',
      shopHours: 'HESY-puoti avoinna ti-pe klo 11-19 ja la klo 10-16',
      catFacilityHours: 'Kissatilat avoinna ti ja to klo 16-19',
      newsletter: 'Tilaa uutiskirje',
      terms: 'Tilaus- ja toimitusehdot',
      privacy: 'Rekisteriseloste',
    },
    en: {
      organization: 'Helsinki Humane Society HESY',
      businessId: 'Business ID: 0201239-8',
      phone: 'Phone',
      phoneHours: 'Phone service Mon-Fri 9am-4pm',
      email: 'Email',
      address: 'Address',
      shopHours: 'HESY Shop open Tue-Fri 11am-7pm and Sat 10am-4pm',
      catFacilityHours: 'Cat facilities open Tue and Thu 4pm-7pm',
      newsletter: 'Subscribe to newsletter',
      terms: 'Terms and Conditions',
      privacy: 'Privacy Notice',
    },
    sv: {
      organization: 'Helsingfors djurskyddsförening HESY rf',
      businessId: 'FO-nummer: 0201239-8',
      phone: 'Telefon',
      phoneHours: 'Telefonservice mån-fre kl. 09-16',
      email: 'E-post',
      address: 'Adress',
      shopHours: 'HESY-butiken öppen ti-fre kl. 11-19 och lö kl. 10-16',
      catFacilityHours: 'Kattanläggning öppen ti och to kl. 16-19',
      newsletter: 'Prenumerera på nyhetsbrev',
      terms: 'Villkor',
      privacy: 'Dataskydd',
    },
  };

  const text = content[language];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Organization Info */}
        <div style={styles.section}>
          <h3 style={styles.heading}>{text.organization}</h3>
          <p style={styles.text}>{text.businessId}</p>
        </div>

        {/* Contact Info */}
        <div style={styles.section}>
          <h4 style={styles.subheading}>{text.phone}</h4>
          <p style={styles.text}>09 5420 0100</p>
          <p style={styles.smallText}>{text.phoneHours}</p>

          <h4 style={styles.subheading}>{text.email}</h4>
          <p style={styles.text}>
            <a href="mailto:hesy@hesy.fi" style={styles.link}>
              hesy@hesy.fi
            </a>
          </p>

          <h4 style={styles.subheading}>{text.address}</h4>
          <p style={styles.text}>Muonamiehentie 7<br />00390 Helsinki</p>
        </div>

        {/* Opening Hours */}
        <div style={styles.section}>
          <h4 style={styles.subheading}>Aukioloajat / Opening Hours</h4>
          <p style={styles.smallText}>{text.shopHours}</p>
          <p style={styles.smallText}>{text.catFacilityHours}</p>
        </div>

        {/* Social Media */}
        <div style={styles.section}>
          <h4 style={styles.subheading}>Sosiaalinen media / Social Media</h4>
          <div style={styles.socialLinks}>
            <a href="https://facebook.com/hesy" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://instagram.com/hesy" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://linkedin.com/company/hesy" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://tiktok.com/@hesy" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
            <a href="https://youtube.com/@hesy" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div style={styles.bottomBar}>
        <div style={styles.container}>
          <div style={styles.bottomLinks}>
            <a href="/newsletter" style={styles.bottomLink}>{text.newsletter}</a>
            <a href="/terms" style={styles.bottomLink}>{text.terms}</a>
            <a href="/privacy" style={styles.bottomLink}>{text.privacy}</a>
          </div>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} HESY
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: '#a0a0a0',
    color: '#1a1a1a',
    padding: '3rem 0 0',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  section: {
    marginBottom: '1.5rem',
  },
  heading: {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    color: '#FDB913',
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: '0.95rem',
    marginTop: '1rem',
    marginBottom: '0.25rem',
    color: '#2c2c2c',
    fontWeight: '600',
  },
  text: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    margin: '0.25rem 0',
    color: '#2c2c2c',
  },
  smallText: {
    fontSize: '0.85rem',
    lineHeight: '1.5',
    margin: '0.25rem 0',
    color: '#3a3a3a',
  },
  link: {
    color: '#FDB913',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  socialLink: {
    color: '#2c2c2c',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s ease',
  },
  bottomBar: {
    backgroundColor: '#808080',
    marginTop: '2rem',
    padding: '1.5rem 0',
  },
  bottomLinks: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },
  bottomLink: {
    color: '#1a1a1a',
    textDecoration: 'none',
    fontSize: '0.85rem',
    transition: 'color 0.2s ease',
  },
  copyright: {
    fontSize: '0.85rem',
    color: '#4a4a4a',
    margin: 0,
  },
};
