
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { Page } from '../../config';
import { EyeIcon, ShieldCheckIcon, WrenchScrewdriverIcon } from '../Icons';

const Home: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const t = translations[state.language];

  const headline = t['home.headline'];
  const narrative = t['home.narrative'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };
  
  const narrativeVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
          opacity: 1,
          y: 0,
          transition: {
              delay: headline.split(" ").length * 0.05 + 0.5,
              duration: 0.8
          }
      }
  }

  const buttonVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
          opacity: 1,
          scale: 1,
          transition: {
              delay: headline.split(" ").length * 0.05 + 1.0,
              type: 'spring',
          }
      }
  }

  return (
    <div className="max-w-5xl mx-auto text-center flex flex-col min-h-[calc(100vh-10rem)] justify-center">
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-transparent bg-clip-text mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {headline.split(" ").map((word, wordIndex) => (
          <span className="inline-block whitespace-nowrap" key={wordIndex}>
            {word.split("").map((char, charIndex) => (
              <motion.span className="inline-block" variants={letterVariants} key={charIndex}>
                {char}
              </motion.span>
            ))}
            &nbsp;
          </span>
        ))}
      </motion.h1>

      <motion.p 
        className="max-w-3xl mx-auto text-base md:text-lg text-gray-300 mb-10"
        variants={narrativeVariants}
        initial="hidden"
        animate="visible"
      >
        {narrative}
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
      >
        <button 
          onClick={() => dispatch({ type: 'SET_PAGE', payload: Page.StartAudit })}
          className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
        >
          {t.startAuditBtn}
        </button>
        <button 
          onClick={() => dispatch({ type: 'SET_PAGE', payload: Page.HowItWorks })}
          className="px-8 py-3 bg-transparent border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-all duration-300"
        >
          {t.howItWorksBtn}
        </button>
      </motion.div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 rounded-lg">
          <EyeIcon className="h-8 w-8 mx-auto mb-4 text-cyan-400" />
          <h3 className="text-xl font-semibold mb-2">{t['home.card1.title']}</h3>
          <p className="text-gray-400">{t['home.card1.desc']}</p>
        </div>
        <div className="p-6 bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 rounded-lg">
          <ShieldCheckIcon className="h-8 w-8 mx-auto mb-4 text-violet-400" />
          <h3 className="text-xl font-semibold mb-2">{t['home.card2.title']}</h3>
          <p className="text-gray-400">{t['home.card2.desc']}</p>
        </div>
        <div className="p-6 bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 rounded-lg">
          <WrenchScrewdriverIcon className="h-8 w-8 mx-auto mb-4 text-fuchsia-400" />
          <h3 className="text-xl font-semibold mb-2">{t['home.card3.title']}</h3>
          <p className="text-gray-400">{t['home.card3.desc']}</p>
        </div>
      </div>
       <div className="mt-16 text-center text-gray-500">{t['home.footer']}</div>
    </div>
  );
};

export default Home;
   