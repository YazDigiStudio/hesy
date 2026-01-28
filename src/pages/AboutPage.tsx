// About/Hesy hub page - Main landing page for organization information

import { Link } from 'react-router-dom';
import { colors } from '../config/colors';

type AboutPageProps = {
  language: 'fi' | 'en' | 'sv';
};

export function AboutPage({ language }: AboutPageProps) {
  const translations = {
    fi: {
      pageTitle: 'HESY - Helsingin eläinsuojeluyhdistys',
      operations: 'Toiminta',
      people: 'Ihmiset',
      locations: 'Paikat',
      other: 'Muut',
      operationsDesc: 'Tietoa HESYn toiminnasta ja säännöistä',
      peopleDesc: 'Tutustu HESYn henkilökunnan ja hallitukseen',
      locationsDesc: 'HESYn toimipisteet ja sijainnit',
      otherDesc: 'Muita tärkeää tietoa',
      sections: {
        operations: [
          { path: '/about/general', name: 'Yleistä' },
          { path: '/about/rules', name: 'Säännöt' },
          { path: '/about/reports', name: 'Vuosikertomukset' },
          { path: '/about/member-associations', name: 'Jäsenyhdistykset' },
          { path: '/about/collaboration', name: 'Yhteistyö' },
          { path: '/about/faq', name: 'UKK' },
        ],
        people: [
          { path: '/about/staff', name: 'Henkilökunta' },
          { path: '/about/board', name: 'Hallitus' },
        ],
        locations: [
          { path: '/about/center', name: 'HESY-keskus' },
          { path: '/about/shop', name: 'HESY-Puoti' },
          { path: '/about/arena', name: 'HESY-areena' },
          { path: '/about/cemetery', name: 'Hautausmaa' },
          { path: '/about/viik-animal-house', name: 'Viikin löytöeläintalo' },
        ],
        other: [
          { path: '/about/award', name: 'Eläinsuojelun Topelius -palkinto' },
          { path: '/about/magazine', name: 'Hesy-lehti' },
          { path: '/about/brochures', name: 'Esitteet' },
          { path: '/about/partners', name: 'Yhteistyökumppanit' },
          { path: '/about/history', name: 'Historia' },
          { path: '/about/privacy', name: 'Rekisteriseloste' },
        ],
      },
    },
    en: {
      pageTitle: 'HESY - Helsinki Animal Welfare Association',
      operations: 'Operations',
      people: 'People',
      locations: 'Locations',
      other: 'Other',
      operationsDesc: 'Information about HESY operations and rules',
      peopleDesc: 'Meet our staff and board',
      locationsDesc: 'HESY locations and facilities',
      otherDesc: 'Other important information',
      sections: {
        operations: [
          { path: '/about/general', name: 'General Info' },
          { path: '/about/rules', name: 'Rules' },
          { path: '/about/reports', name: 'Annual Reports' },
          { path: '/about/member-associations', name: 'Member Associations' },
          { path: '/about/collaboration', name: 'Collaboration' },
          { path: '/about/faq', name: 'FAQ' },
        ],
        people: [
          { path: '/about/staff', name: 'Staff' },
          { path: '/about/board', name: 'Board' },
        ],
        locations: [
          { path: '/about/center', name: 'HESY Center' },
          { path: '/about/shop', name: 'HESY Shop' },
          { path: '/about/arena', name: 'HESY Arena' },
          { path: '/about/cemetery', name: 'Cemetery' },
          { path: '/about/viik-animal-house', name: 'Viik Lost Animal House' },
        ],
        other: [
          { path: '/about/award', name: 'Award' },
          { path: '/about/magazine', name: 'Magazine' },
          { path: '/about/brochures', name: 'Brochures' },
          { path: '/about/partners', name: 'Partners' },
          { path: '/about/history', name: 'History' },
          { path: '/about/privacy', name: 'Privacy Notice' },
        ],
      },
    },
    sv: {
      pageTitle: 'HESY - Helsingfors djurskyddsförening',
      operations: 'Verksamhet',
      people: 'Människor',
      locations: 'Platser',
      other: 'Övrigt',
      operationsDesc: 'Information om HESYs verksamhet och regler',
      peopleDesc: 'Lär känna vår personal och styrelse',
      locationsDesc: 'HESYs lokaler och platser',
      otherDesc: 'Annan viktig information',
      sections: {
        operations: [
          { path: '/about/general', name: 'Allmänt' },
          { path: '/about/rules', name: 'Regler' },
          { path: '/about/reports', name: 'Årsrapporter' },
          { path: '/about/member-associations', name: 'Medlemsföreningar' },
          { path: '/about/collaboration', name: 'Samarbete' },
          { path: '/about/faq', name: 'FAQ' },
        ],
        people: [
          { path: '/about/staff', name: 'Personal' },
          { path: '/about/board', name: 'Styrelse' },
        ],
        locations: [
          { path: '/about/center', name: 'HESY-centrum' },
          { path: '/about/shop', name: 'HESY-butiken' },
          { path: '/about/arena', name: 'HESY-arena' },
          { path: '/about/cemetery', name: 'Kyrkogård' },
          { path: '/about/viik-animal-house', name: 'Viks djurhem' },
        ],
        other: [
          { path: '/about/award', name: 'Pris' },
          { path: '/about/magazine', name: 'Tidning' },
          { path: '/about/brochures', name: 'Broschyrer' },
          { path: '/about/partners', name: 'Partners' },
          { path: '/about/history', name: 'Historia' },
          { path: '/about/privacy', name: 'Integritetspolicy' },
        ],
      },
    },
  };

  const t = translations[language];

  const categoryStyle = {
    marginBottom: '48px',
  };

  const categoryTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold' as const,
    color: colors.green.dark,
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: `2px solid ${colors.green.light}`,
  };

  const categoryDescStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
  };

  const linksGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
  };

  const linkItemStyle = {
    padding: '16px',
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
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '36px', color: colors.green.dark, marginBottom: '40px' }}>
        {t.pageTitle}
      </h1>

      {renderCategory(t.operations, t.operationsDesc, t.sections.operations)}
      {renderCategory(t.people, t.peopleDesc, t.sections.people)}
      {renderCategory(t.locations, t.locationsDesc, t.sections.locations)}
      {renderCategory(t.other, t.otherDesc, t.sections.other)}
    </div>
  );
}
