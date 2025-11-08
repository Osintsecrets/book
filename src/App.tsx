import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { DiscoverPage } from '@/pages/DiscoverPage';
import { AnalyzePage } from '@/pages/AnalyzePage';
import { ReducePage } from '@/pages/ReducePage';
import { KeepSafePage } from '@/pages/KeepSafePage';
import { ReportsPage } from '@/pages/ReportsPage';
import { SettingsPage } from '@/pages/SettingsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="discover" element={<DiscoverPage />} />
          <Route path="analyze" element={<AnalyzePage />} />
          <Route path="reduce" element={<ReducePage />} />
          <Route path="keep-safe" element={<KeepSafePage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
