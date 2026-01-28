// Main App component

import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AnimalsPage } from './pages/AnimalsPage';
import { HelpPage } from './pages/HelpPage';
import { AboutPage } from './pages/AboutPage';
import { AboutSubpage } from './pages/AboutSubpage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { colors } from './config/colors';
import './App.css';

function AppContent() {
  const [currentLanguage, setCurrentLanguage] = useState<'fi' | 'en' | 'sv'>('fi');
  const location = useLocation();

  return (
    <div style={styles.app}>
      <Navigation
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        currentPath={location.pathname}
      />

      <main style={{
        ...styles.main,
        paddingTop: location.pathname === '/' ? 0 : '82px',
      }}>
        <Routes>
          <Route path="/" element={<HomePage language={currentLanguage} />} />
          <Route path="/animals" element={<AnimalsPage language={currentLanguage} />} />
          <Route path="/help" element={<HelpPage language={currentLanguage} />} />
          <Route path="/about" element={<AboutPage language={currentLanguage} />} />
          {/* About Subpages - Operations */}
          <Route path="/about/general" element={<AboutSubpage pageName="Yleistä" language={currentLanguage} />} />
          <Route path="/about/rules" element={<AboutSubpage pageName="Säännöt" language={currentLanguage} />} />
          <Route path="/about/reports" element={<AboutSubpage pageName="Vuosikertomukset" language={currentLanguage} />} />
          <Route path="/about/member-associations" element={<AboutSubpage pageName="Jäsenyhdistykset" language={currentLanguage} />} />
          <Route path="/about/collaboration" element={<AboutSubpage pageName="Yhteistyö" language={currentLanguage} />} />
          <Route path="/about/faq" element={<AboutSubpage pageName="UKK - Usein Kysytyt Kysymykset" language={currentLanguage} />} />
          {/* About Subpages - People */}
          <Route path="/about/staff" element={<AboutSubpage pageName="Henkilökunta" language={currentLanguage} />} />
          <Route path="/about/board" element={<AboutSubpage pageName="Hallitus" language={currentLanguage} />} />
          {/* About Subpages - Locations */}
          <Route path="/about/center" element={<AboutSubpage pageName="HESY-keskus" language={currentLanguage} />} />
          <Route path="/about/shop" element={<AboutSubpage pageName="HESY-Puoti" language={currentLanguage} />} />
          <Route path="/about/arena" element={<AboutSubpage pageName="HESY-areena" language={currentLanguage} />} />
          <Route path="/about/cemetery" element={<AboutSubpage pageName="Hautausmaa" language={currentLanguage} />} />
          <Route path="/about/viik-animal-house" element={<AboutSubpage pageName="Viikin löytöeläintalo" language={currentLanguage} />} />
          {/* About Subpages - Other */}
          <Route path="/about/award" element={<AboutSubpage pageName="Eläinsuojelun Topelius -palkinto" language={currentLanguage} />} />
          <Route path="/about/magazine" element={<AboutSubpage pageName="Hesy-lehti" language={currentLanguage} />} />
          <Route path="/about/brochures" element={<AboutSubpage pageName="Esitteet" language={currentLanguage} />} />
          <Route path="/about/partners" element={<AboutSubpage pageName="Yhteistyökumppanit" language={currentLanguage} />} />
          <Route path="/about/history" element={<AboutSubpage pageName="Historia" language={currentLanguage} />} />
          <Route path="/about/privacy" element={<AboutSubpage pageName="Rekisteriseloste" language={currentLanguage} />} />
          <Route path="/news" element={<NewsPage language={currentLanguage} />} />
          <Route path="/contact" element={<ContactPage language={currentLanguage} />} />
        </Routes>
      </main>

      <Footer language={currentLanguage} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
    padding: 0,
    backgroundColor: colors.primaryLight,
  },
};

export default App;
