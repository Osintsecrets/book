
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { Language } from '../../config';

const Settings: React.FC = () => {
    const { state, dispatch } = useContext(AppContext);
    const t = translations[state.language];

    const setLanguage = (lang: Language) => {
        dispatch({ type: 'SET_LANGUAGE', payload: lang });
    };

    const handleReset = () => {
        if (window.confirm(t['settings.reset.confirm'])) {
            dispatch({ type: 'RESET_DATA' });
        }
    };
    
    const Section: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">{title}</h2>
            <div className="p-6 bg-gray-900/50 border border-gray-700/50 rounded-lg">
                {children}
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">
                {t['settings.title']}
            </h1>

            <Section title={t['settings.language']}>
                <div className="flex items-center gap-4">
                    <p className="font-medium">{t['settings.language']}:</p>
                    <div className="flex items-center bg-gray-800 rounded-full p-1 text-sm">
                        <button onClick={() => setLanguage('en')} className={`px-4 py-1.5 rounded-full ${state.language === 'en' ? 'bg-cyan-500 text-white' : 'text-gray-300'}`}>English</button>
                        <button onClick={() => setLanguage('he')} className={`px-4 py-1.5 rounded-full ${state.language === 'he' ? 'bg-cyan-500 text-white' : 'text-gray-300'}`}>עברית</button>
                    </div>
                </div>
            </Section>
            
            <Section title={t['settings.dataMgmt']}>
                <p className="text-gray-400 mb-4">{t['settings.reset.desc']}</p>
                <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-lg shadow-red-500/30 hover:bg-red-700 transition-colors"
                >
                    {t['settings.reset.btn']}
                </button>
            </Section>

            <Section title={t['settings.trust.title']}>
                <ul className="space-y-3 text-gray-300 list-disc list-inside">
                    <li>{t['settings.trust.item1']}</li>
                    <li>{t['settings.trust.item2']}</li>
                    <li>{t['settings.trust.item3']}</li>
                    <li>{t['settings.trust.item4']}</li>
                </ul>
            </Section>

            <Section title={t['settings.limitations.title']}>
                 <ul className="space-y-3 text-gray-300 list-disc list-inside">
                    <li>{t['settings.limitations.item1']}</li>
                    <li>{t['settings.limitations.item2']}</li>
                </ul>
            </Section>
        </div>
    );
};

export default Settings;
   