// Main App component

import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AnimalsPage } from './pages/AnimalsPage';
import { HelpPage } from './pages/HelpPage';
import { AboutPage } from './pages/AboutPage';
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
