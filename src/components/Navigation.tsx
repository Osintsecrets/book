import { NavLink } from 'react-router-dom';
import { useTranslations } from '@/i18n/useTranslations';
import clsx from 'clsx';

const navItems = [
  { path: '/', key: 'nav.home' },
  { path: '/how-it-works', key: 'nav.how' },
  { path: '/discover', key: 'nav.discover' },
  { path: '/analyze', key: 'nav.analyze' },
  { path: '/reduce', key: 'nav.reduce' },
  { path: '/keep-safe', key: 'nav.keepSafe' },
  { path: '/reports', key: 'nav.reports' },
  { path: '/settings', key: 'nav.settings' }
] as const;

export const Navigation = () => {
  const t = useTranslations();

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 text-sm">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            clsx(
              'rounded-full border border-white/5 px-4 py-1.5 text-gray-300 transition hover:text-white',
              isActive && 'bg-white/10 text-white shadow-glow'
            )
          }
        >
          {t(item.key)}
        </NavLink>
      ))}
    </nav>
  );
};
