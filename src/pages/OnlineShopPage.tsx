import { colors } from '../config/colors';

type OnlineShopPageProps = {
  language: 'fi' | 'en' | 'sv';
};

export function OnlineShopPage({ language }: OnlineShopPageProps) {
  const content = {
    fi: {
      title: 'Verkkokauppa',
      description: 'HESY:n verkkokauppa',
      message: 'Verkkokauppa avataan pian. Seuraa meitä päivitysten varalta!',
    },
    en: {
      title: 'Online Shop',
      description: 'HESY Online Shop',
      message: 'Our online shop is coming soon. Stay tuned for updates!',
    },
    sv: {
      title: 'Webbutik',
      description: 'HESY:s webbutik',
      message: 'Vår webbutik öppnas snart. Följ oss för uppdateringar!',
    },
  };

  const t = content[language];

  return (
    <div style={{ padding: '2rem', minHeight: '400px' }}>
      <h1 style={{ color: colors.green.dark, marginBottom: '0.5rem' }}>{t.title}</h1>
      <p style={{ color: colors.green.medium, marginBottom: '2rem', fontSize: '1.1rem' }}>
        {t.message}
      </p>
    </div>
  );
}
