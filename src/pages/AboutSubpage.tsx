// Generic about subpage - Shows page title with placeholder content

import { useTranslations } from '../hooks/useTranslations';

type AboutSubpageProps = {
  pageName: string;
  language: 'fi' | 'en' | 'sv';
};

export function AboutSubpage({ pageName, language }: AboutSubpageProps) {
  const t = useTranslations(language);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
        {pageName}
      </h1>
      <p style={{ fontSize: '18px', color: '#666', fontStyle: 'italic' }}>
        {t.common.contentComingSoon}
      </p>
    </div>
  );
}
