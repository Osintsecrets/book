import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { Navigation } from './Navigation';
import { useAppState } from '@/state/AppStateContext';
import { useTranslations } from '@/i18n/useTranslations';

export const Layout = () => {
  const { locale } = useAppState();
  const t = useTranslations();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black via-midnight to-black text-gray-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-glow opacity-70" aria-hidden />
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-cyan-300">{t('common.appName')}</span>
              <h1 className="text-2xl font-semibold text-white">Privacy Self-Audit</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
          <p className="text-sm text-gray-300 lg:w-3/4">{t('common.privacyPromise')}</p>
          <Navigation />
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <Outlet />
        </div>
      </main>
      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-gray-400 md:flex-row">
          <span>© {new Date().getFullYear()} Privacy Self-Audit</span>
          <span className="text-center md:text-right">
            {locale === 'he' ? '100% פרטיות. כל הנתונים נשארים אצלכם.' : '100% private. Your data never leaves this device.'}
          </span>
        </div>
      </footer>
    </div>
  );
};
