
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { Page } from '../../config';
import { motion } from 'framer-motion';

const Section: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <motion.div 
        className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl p-6 md:p-8 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">{title}</h2>
        {children}
    </motion.div>
);

const HowItWorks: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const t = translations[state.language];

  const sections = [
      {
          title: t['hiw.section1.title'],
          content: (
              <ul className="space-y-3 text-gray-300 list-disc list-inside">
                  <li>{t['hiw.section1.item1']}</li>
                  <li>{t['hiw.section1.item2']}</li>
                  <li>{t['hiw.section1.item3']}</li>
              </ul>
          )
      },
      {
          title: t['hiw.section2.title'],
          content: (
              <div className="space-y-4">
                  <p><strong className="text-violet-400">1. {t['hiw.section2.step1']}</strong></p>
                  <p><strong className="text-violet-400">2. {t['hiw.section2.step2']}</strong></p>
                  <p><strong className="text-violet-400">3. {t['hiw.section2.step3']}</strong></p>
                  <p><strong className="text-violet-400">4. {t['hiw.section2.step4']}</strong></p>
              </div>
          )
      },
      {
          title: t['hiw.section3.title'],
          content: (
              <ul className="space-y-3 text-gray-300 list-disc list-inside">
                  <li>{t['hiw.section3.item1']}</li>
                  <li>{t['hiw.section3.item2']}</li>
                  <li>{t['hiw.section3.item3']}</li>
                  <li>{t['hiw.section3.item4']}</li>
              </ul>
          )
      }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">
        {t['hiw.title']}
      </h1>
      <div className="space-y-8">
        {sections.map((section, index) => (
            <Section key={index} title={section.title}>
                {section.content}
            </Section>
        ))}
      </div>
      <div className="text-center mt-12">
        <button 
          onClick={() => dispatch({ type: 'SET_PAGE', payload: Page.StartAudit })}
          className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
        >
          {t.startAuditBtn}
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;
   