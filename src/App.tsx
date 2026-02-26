import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeSplash from './components/WelcomeSplash';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';

type Lang = 'fr' | 'en';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Initialisation persistante du thème
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
    } catch (err) {
      // éviter no-empty
      console.debug('theme read failed', err);
    }
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Applique la classe 'dark' et persiste le choix
  useEffect(() => {
    try {
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (err) {
      // éviter no-empty
      console.debug('theme write failed', err);
    }
  }, [isDark]);

  const [language, setLanguage] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('language');
      if (saved === 'fr' || saved === 'en') return saved;
    } catch (err) {
      console.debug('language read failed', err);
    }
    return 'fr';
  });

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch (err) {
      console.debug('language write failed', err);
    }
  }, [language]);

  if (showSplash) {
    return <WelcomeSplash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isDark={isDark}
              setIsDark={setIsDark}
              language={language}
              setLanguage={setLanguage}
            />
          }
        />
        <Route
          path="/project/:id"
          element={
            <ProjectDetailPage
              isDark={isDark}
              setIsDark={setIsDark}
              language={language}
              setLanguage={setLanguage}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
