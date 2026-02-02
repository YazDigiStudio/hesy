// About/Hesy hub page - Main landing page for organization information

import { Link } from 'react-router-dom';
import { colors } from '../config/colors';
import { useTranslations } from '../hooks/useTranslations';

type AboutPageProps = {
  language: 'fi' | 'en' | 'sv';
};

export function AboutPage({ language }: AboutPageProps) {
  const allTranslations = useTranslations(language);
  const t = allTranslations.about;


  const categoryStyle = {
    marginBottom: 'clamp(32px, 5vw, 48px)',
  };

  const categoryTitleStyle = {
    fontSize: 'clamp(20px, 3vw, 24px)',
    fontWeight: 'bold' as const,
    color: colors.green.dark,
    marginBottom: 'clamp(12px, 2vw, 16px)',
    paddingBottom: 'clamp(8px, 1.5vw, 12px)',
    borderBottom: `2px solid ${colors.green.light}`,
  };

  const categoryDescStyle = {
    fontSize: 'clamp(13px, 1.5vw, 14px)',
    color: '#666',
    marginBottom: 'clamp(16px, 2.5vw, 20px)',
  };

  const linksGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
    gap: 'clamp(12px, 2vw, 16px)',
  };

  const linkItemStyle = {
    padding: 'clamp(12px, 2vw, 16px)',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    textDecoration: 'none',
    color: colors.green.dark,
    border: `2px solid transparent`,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const linkItemHoverStyle = {
    ...linkItemStyle,
    backgroundColor: colors.green.light,
    color: 'white',
    borderColor: colors.green.dark,
  };

  const renderCategory = (
    title: string,
    description: string,
    items: Array<{ path: string; name: string }>
  ) => (
    <div style={categoryStyle}>
      <h2 style={categoryTitleStyle}>{title}</h2>
      <p style={categoryDescStyle}>{description}</p>
      <div style={linksGridStyle}>
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={linkItemStyle}
            onMouseOver={(e) => {
              Object.assign(e.currentTarget.style, linkItemHoverStyle);
            }}
            onMouseOut={(e) => {
              Object.assign(e.currentTarget.style, linkItemStyle);
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ padding: 'clamp(24px, 5vw, 40px) clamp(16px, 3vw, 20px)', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', color: colors.green.dark, marginBottom: 'clamp(24px, 4vw, 40px)' }}>
        {t.pageTitle}
      </h1>

      {renderCategory(t.operations, t.operationsDesc, t.sections.operations)}
      {renderCategory(t.people, t.peopleDesc, t.sections.people)}
      {renderCategory(t.locations, t.locationsDesc, t.sections.locations)}
      {renderCategory(t.other, t.otherDesc, t.sections.other)}
    </div>
  );
}
