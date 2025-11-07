
import React, { useContext, useEffect } from 'react';
import { AppContext } from './context/AppContext';
import { Page } from './config';
import Header from './components/Layout';
import Home from './components/pages/Home';
import HowItWorks from './components/pages/HowItWorks';
import StartAudit from './components/pages/StartAudit';
import Analyze from './components/pages/Analyze';
import Reduce from './components/pages/Reduce';
import KeepSafe from './components/pages/KeepSafe';
import Reports from './components/pages/Reports';
import Settings from './components/pages/Settings';

const pages: Record<Page, React.ComponentType> = {
  [Page.Home]: Home,
  [Page.HowItWorks]: HowItWorks,
  [Page.StartAudit]: StartAudit,
  [Page.Analyze]: Analyze,
  [Page.Reduce]: Reduce,
  [Page.KeepSafe]: KeepSafe,
  [Page.Reports]: Reports,
  [Page.Settings]: Settings,
};

const App: React.FC = () => {
  const { state } = useContext(AppContext);
  const CurrentPage = pages[state.page];

  useEffect(() => {
    document.documentElement.lang = state.language;
    document.documentElement.dir = state.language === 'he' ? 'rtl' : 'ltr';
  }, [state.language]);

  return (
    <div className="min-h-screen bg-gray-950 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950/40">
      <Header />
      <main className="px-4 py-8 md:px-8 md:py-12">
        <CurrentPage />
      </main>
    </div>
  );
};

export default App;
   