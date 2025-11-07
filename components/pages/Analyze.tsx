
import React, { useContext, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { analyzeRisks } from '../../utils/riskEngine';
import { RiskCategory, RiskLevel } from '../../config';
import { XIcon } from '../Icons';
import { Page } from '../../config';

const riskLevelStyles: Record<RiskLevel, { text: string; bg: string; ring: string }> = {
    Low: { text: 'text-green-300', bg: 'bg-green-500/10', ring: 'ring-green-500/30' },
    Medium: { text: 'text-yellow-300', bg: 'bg-yellow-500/10', ring: 'ring-yellow-500/30' },
    High: { text: 'text-orange-300', bg: 'bg-orange-500/10', ring: 'ring-orange-500/30' },
    Critical: { text: 'text-red-400', bg: 'bg-red-500/10', ring: 'ring-red-500/30' },
};

const DetailsModal: React.FC<{ category: RiskCategory; onClose: () => void }> = ({ category, onClose }) => {
    const { state } = useContext(AppContext);
    const t = translations[state.language];
    const analysis = useMemo(() => analyzeRisks(state.auditData.answers), [state.auditData.answers]);
    const categoryRisk = analysis.categoryRisks[category];

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl w-full max-w-lg relative"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold mb-4 text-cyan-400">{t['analyze.findings'].replace('{category}', t[category])}</h2>
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700 transition-colors">
                            <XIcon className="w-6 h-6 text-gray-400"/>
                        </button>
                    </div>

                    {categoryRisk.findings.length > 0 ? (
                        <ul className="space-y-4 max-h-[60vh] overflow-y-auto">
                            {categoryRisk.findings.map((finding, index) => (
                                <li key={index} className="p-4 bg-gray-800/50 rounded-md">
                                    <p className="text-gray-200">{finding.reason}</p>
                                    <p className={`mt-1 text-sm font-semibold ${riskLevelStyles[finding.level].text}`}>{t[finding.level]}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">{t['analyze.noFindings']}</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};


const Analyze: React.FC = () => {
    const { state, dispatch } = useContext(AppContext);
    const t = translations[state.language];
    const [selectedCategory, setSelectedCategory] = useState<RiskCategory | null>(null);

    const analysis = useMemo(() => {
        if (Object.keys(state.auditData.answers).length === 0) return null;
        return analyzeRisks(state.auditData.answers);
    }, [state.auditData.answers]);


    if (!analysis) {
        return (
            <div className="text-center max-w-lg mx-auto">
                <h2 className="text-2xl font-bold text-gray-300 mb-4">{t['analyze.startHere']}</h2>
                <button 
                    onClick={() => dispatch({ type: 'SET_PAGE', payload: Page.StartAudit })}
                    className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
                >
                    {t.startAuditBtn}
                </button>
            </div>
        );
    }
    
    const overallStyle = riskLevelStyles[analysis.overallLevel];

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">
                {t['analyze.title']}
            </h1>

            <motion.div 
                initial={{ opacity: 0, y:20 }}
                animate={{ opacity: 1, y:0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <div className={`w-full max-w-md mx-auto p-6 rounded-xl border border-gray-700/50 ${overallStyle.bg}`}>
                    <h2 className="text-center text-lg font-medium text-gray-300 mb-3">{t['analyze.overall']}</h2>
                    <p className={`text-center text-5xl font-bold ${overallStyle.text}`}>{t[analysis.overallLevel]}</p>
                </div>
            </motion.div>

            <h2 className="text-2xl font-bold text-center mb-8">{t['analyze.categories']}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(analysis.categoryRisks).map(([category, risk], index) => {
                    const cat = category as RiskCategory;
                    const style = riskLevelStyles[risk.level];
                    return (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`p-6 rounded-lg border border-gray-700/50 ${style.bg} flex flex-col justify-between`}
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-gray-200">{t[cat]}</h3>
                                <p className={`mt-1 font-bold text-lg ${style.text}`}>{t[risk.level]}</p>
                                <p className="text-sm text-gray-400 mt-2">{risk.findings.length} finding(s)</p>
                            </div>
                            <button
                                onClick={() => setSelectedCategory(cat)}
                                className="mt-4 text-sm font-semibold text-cyan-400 hover:text-cyan-300 text-start rtl:text-end"
                            >
                                {t['analyze.viewDetails']} &rarr;
                            </button>
                        </motion.div>
                    )
                })}
            </div>
            <AnimatePresence>
                {selectedCategory && <DetailsModal category={selectedCategory} onClose={() => setSelectedCategory(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default Analyze;
   