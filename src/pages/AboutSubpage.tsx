// Generic about subpage - Shows page title with placeholder content

type AboutSubpageProps = {
  pageName: string;
  language: 'fi' | 'en' | 'sv';
};

export function AboutSubpage({ pageName, language }: AboutSubpageProps) {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
        {pageName}
      </h1>
      <p style={{ fontSize: '18px', color: '#666', fontStyle: 'italic' }}>
        {language === 'fi' && 'Sisältö tulossa...'}
        {language === 'en' && 'Content coming soon...'}
        {language === 'sv' && 'Innehåll kommer snart...'}
      </p>
    </div>
  );
}
