// Main App component

import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DesktopNavigation } from './components/DesktopNavigation';
import { MobileNavigation } from './components/MobileNavigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AnimalsPage } from './pages/AnimalsPage';
import { HelpPage } from './pages/HelpPage';
import { AboutPage } from './pages/AboutPage';
import { AboutSubpage } from './pages/AboutSubpage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { ProfilePage } from './pages/ProfilePage';
import { PageContent } from './components/PageContent';
import { colors } from './config/colors';
import './App.css';

function AppContent() {
  const [currentLanguage, setCurrentLanguage] = useState<'fi' | 'en' | 'sv'>('fi');
  const location = useLocation();

  return (
    <div style={styles.app}>
      {/* Desktop Navigation - hidden on mobile */}
      <div style={{ display: 'none' }} className="desktop-nav-wrapper">
        <DesktopNavigation
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          currentPath={location.pathname}
        />
      </div>

      {/* Mobile Navigation - hidden on desktop */}
      <div style={{ display: 'block' }} className="mobile-nav-wrapper">
        <MobileNavigation
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          currentPath={location.pathname}
        />
      </div>

      <main style={{
        ...styles.main,
        paddingTop: location.pathname === '/' || location.pathname === '/home' ? 0 : '82px',
      }}>
        <Routes>
          <Route path="/" element={<HomePage language={currentLanguage} />} />
          <Route path="/home" element={<HomePage language={currentLanguage} />} />
          <Route path="/animals" element={<AnimalsPage language={currentLanguage} />} />
          {/* Animals Subpages - Listings */}
          <Route path="/animals/cats" element={<AboutSubpage pageName="Kissat" language={currentLanguage} />} />
          <Route path="/animals/dogs" element={<AboutSubpage pageName="Koirat" language={currentLanguage} />} />
          <Route path="/animals/other" element={<AboutSubpage pageName="Muut eläimet" language={currentLanguage} />} />
          {/* Animals Subpages - Information */}
          <Route path="/animals/info" element={<PageContent contentFile="pages/fi/animals-info.md" language={currentLanguage} />} />
          <Route path="/animals/contract" element={<PageContent contentFile="pages/fi/animals-contract.md" language={currentLanguage} />} />
          <Route path="/animals/fees" element={<PageContent contentFile="pages/fi/animals-fees.md" language={currentLanguage} />} />
          <Route path="/animals/found" element={<PageContent contentFile="pages/fi/animals-found.md" language={currentLanguage} />} />
          <Route path="/help" element={<HelpPage language={currentLanguage} />} />
          {/* Help Subpages - General */}
          <Route path="/help/general" element={<PageContent contentFile="pages/fi/help-general.md" language={currentLanguage} />} />
          {/* Help Subpages - Monetary Donations */}
          <Route path="/help/shop" element={<AboutSubpage pageName="Verkkokauppa" language={currentLanguage} />} />
          <Route path="/help/mobilepay" element={<PageContent contentFile="pages/fi/help-mobilepay.md" language={currentLanguage} />} />
          <Route path="/help/sms" element={<PageContent contentFile="pages/fi/help-sms.md" language={currentLanguage} />} />
          <Route path="/help/monthly" element={<PageContent contentFile="pages/fi/help-monthly.md" language={currentLanguage} />} />
          <Route path="/help/transfer" element={<PageContent contentFile="pages/fi/help-transfer.md" language={currentLanguage} />} />
          {/* Help Subpages - Other Support */}
          <Route path="/help/goods" element={<PageContent contentFile="pages/fi/help-goods.md" language={currentLanguage} />} />
          <Route path="/help/thrift-store" element={<PageContent contentFile="pages/fi/help-thrift-store.md" language={currentLanguage} />} />
          <Route path="/help/bequests" element={<PageContent contentFile="pages/fi/help-bequests.md" language={currentLanguage} />} />
          <Route path="/help/volunteer" element={<PageContent contentFile="pages/fi/help-volunteer.md" language={currentLanguage} />} />
          <Route path="/help/membership" element={<PageContent contentFile="pages/fi/help-membership.md" language={currentLanguage} />} />
          <Route path="/about" element={<AboutPage language={currentLanguage} />} />
          {/* About Subpages - Operations */}
          <Route path="/about/general" element={<PageContent contentFile="pages/fi/about-general.md" language={currentLanguage} />} />
          <Route path="/about/rules" element={<PageContent contentFile="pages/fi/about-rules.md" language={currentLanguage} />} />
          <Route path="/about/reports" element={<PageContent contentFile="pages/fi/about-reports.md" language={currentLanguage} />} />
          <Route path="/about/member-associations" element={<PageContent contentFile="pages/fi/about-member-associations.md" language={currentLanguage} />} />
          <Route path="/about/collaboration" element={<PageContent contentFile="pages/fi/about-collaboration.md" language={currentLanguage} />} />
          <Route path="/about/faq" element={<PageContent contentFile="pages/fi/about-faq.md" language={currentLanguage} />} />
          {/* About Subpages - People */}
          <Route path="/about/staff" element={<PageContent contentFile="pages/fi/about-staff.md" language={currentLanguage} />} />
          <Route path="/about/board" element={<PageContent contentFile="pages/fi/about-board.md" language={currentLanguage} />} />
          {/* About Subpages - Locations */}
          <Route path="/about/center" element={<PageContent contentFile="pages/fi/about-center.md" language={currentLanguage} />} />
          <Route path="/about/shop" element={<PageContent contentFile="pages/fi/about-shop.md" language={currentLanguage} />} />
          <Route path="/about/arena" element={<PageContent contentFile="pages/fi/about-arena.md" language={currentLanguage} />} />
          <Route path="/about/cemetery" element={<PageContent contentFile="pages/fi/about-cemetery.md" language={currentLanguage} />} />
          <Route path="/about/viik-animal-house" element={<PageContent contentFile="pages/fi/about-viik-animal-house.md" language={currentLanguage} />} />
          {/* About Subpages - Other */}
          <Route path="/about/award" element={<PageContent contentFile="pages/fi/about-award.md" language={currentLanguage} />} />
          <Route path="/about/magazine" element={<PageContent contentFile="pages/fi/about-magazine.md" language={currentLanguage} />} />
          <Route path="/about/brochures" element={<PageContent contentFile="pages/fi/about-brochures.md" language={currentLanguage} />} />
          <Route path="/about/partners" element={<PageContent contentFile="pages/fi/about-partners.md" language={currentLanguage} />} />
          <Route path="/about/history" element={<PageContent contentFile="pages/fi/about-history.md" language={currentLanguage} />} />
          <Route path="/about/privacy" element={<PageContent contentFile="pages/fi/about-privacy.md" language={currentLanguage} />} />
          <Route path="/news" element={<NewsPage language={currentLanguage} />} />
          {/* News Subpages */}
          <Route path="/news/press-releases" element={<PageContent contentFile="pages/fi/news-press-releases.md" language={currentLanguage} />} />
          <Route path="/news/statements" element={<PageContent contentFile="pages/fi/news-statements.md" language={currentLanguage} />} />
          <Route path="/news/blog" element={<PageContent contentFile="pages/fi/news-blog.md" language={currentLanguage} />} />
          <Route path="/news/events" element={<PageContent contentFile="pages/fi/news-events.md" language={currentLanguage} />} />
          <Route path="/news/newsletter" element={<PageContent contentFile="pages/fi/news-newsletter.md" language={currentLanguage} />} />
          <Route path="/contact" element={<ContactPage language={currentLanguage} />} />
          {/* Contact Subpages */}
          <Route path="/contact/get-in-touch" element={<AboutSubpage pageName="Ota yhteyttä" language={currentLanguage} />} />
          {/* User Profile */}
          <Route path="/profile" element={<ProfilePage language={currentLanguage} />} />
        </Routes>
      </main>

      <Footer language={currentLanguage} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
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
