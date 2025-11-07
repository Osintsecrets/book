
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { Page } from '../config';
import { translations } from '../utils/translations';
import { MenuIcon, XIcon, LockIcon } from './Icons';

const navItems = [
  Page.Home,
  Page.HowItWorks,
  Page.StartAudit,
  Page.Analyze,
  Page.Reduce,
  Page.KeepSafe,
  Page.Reports,
  Page.Settings,
];

const Header: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[state.language];

  const setPage = (page: Page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    setIsMenuOpen(false);
  };

  const setLanguage = (lang: 'en' | 'he') => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
  };

  const NavLink: React.FC<{ page: Page }> = ({ page }) => (
    <button
      onClick={() => setPage(page)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        state.page === page
          ? 'text-cyan-400'
          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
      }`}
    >
      {t[page]}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-gray-900/50 backdrop-blur-lg border-b border-gray-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => setPage(Page.Home)} className="flex-shrink-0 flex items-center gap-2">
              <LockIcon className="h-8 w-8 text-cyan-400" />
              <span className="text-white font-bold text-xl hidden sm:block">{t.appTitle}</span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ms-10 flex items-baseline space-x-4 rtl:space-x-reverse">
              {navItems.map((item) => <NavLink key={item} page={item} />)}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
             <div className="flex items-center bg-gray-800/50 rounded-full p-1 text-sm">
                <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded-full ${state.language === 'en' ? 'bg-cyan-500 text-white' : 'text-gray-300'}`}>EN</button>
                <button onClick={() => setLanguage('he')} className={`px-3 py-1 rounded-full ${state.language === 'he' ? 'bg-cyan-500 text-white' : 'text-gray-300'}`}>HE</button>
            </div>
          </div>
          <div className="me-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                    key={item}
                    onClick={() => setPage(item)}
                    className={`block w-full text-start px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                        state.page === item
                        ? 'bg-cyan-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    >
                    {t[item]}
                </button>
              ))}
                <div className="flex justify-center pt-4">
                     <div className="flex items-center bg-gray-800/50 rounded-full p-1 text-sm">
                        <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded-full ${state.language === 'en' ? 'bg-cyan-500 text-white' : 'text-gray-300'}`}>EN</button>
                        <button onClick={() => setLanguage('he')} className={`px-3 py-1 rounded-full ${state.language === 'he' ? 'bg-cyan-500 text-white' : 'text-gray-300'}`}>HE</button>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
   