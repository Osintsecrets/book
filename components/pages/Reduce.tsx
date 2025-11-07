
import React, { useContext, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { getMitigations } from '../../utils/riskEngine';
import { Mitigation } from '../../config';
import { Page } from '../../config';

type Filter = 'All' | 'Quick Wins' | 'High Impact' | 'Advanced';

const Reduce: React.FC = () => {
    const { state, dispatch } = useContext(AppContext);
    const t = translations[state.language];
    const [filter, setFilter] = useState<Filter>('All');

    const mitigations = useMemo(() => {
        if (Object.keys(state.auditData.answers).length === 0) return [];
        return getMitigations(state.auditData.answers);
    }, [state.auditData.answers]);

    const filteredMitigations = useMemo(() => {
        if (filter === 'All') return mitigations;
        return mitigations.filter(m => m.category === filter);
    }, [filter, mitigations]);

    const completedCount = state.auditData.completedMitigations.length;
    const totalCount = mitigations.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    if (totalCount === 0) {
        return (
            <div className="text-center max-w-lg mx-auto">
                <h2 className="text-2xl font-bold text-gray-300 mb-4">{t['reduce.startHere']}</h2>
                <button 
                    onClick={() => dispatch({ type: 'SET_PAGE', payload: Page.StartAudit })}
                    className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
                >
                    {t.startAuditBtn}
                </button>
            </div>
        );
    }

    const FilterButton: React.FC<{
        label: string;
        value: Filter;
    }> = ({ label, value }) => (
        <button
            onClick={() => setFilter(value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === value ? 'bg-cyan-500 text-white' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">
                {t['reduce.title']}
            </h1>
            <p className="text-center text-gray-400 mb-8">{t['reduce.intro']}</p>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-300">{t['reduce.progress'].replace('{completed}', String(completedCount)).replace('{total}', String(totalCount))}</p>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <motion.div
                        className="bg-gradient-to-r from-cyan-500 to-violet-500 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
                <FilterButton label={t['reduce.filter.all']} value="All" />
                <FilterButton label={t['reduce.filter.quick']} value="Quick Wins" />
                <FilterButton label={t['reduce.filter.high']} value="High Impact" />
                <FilterButton label={t['reduce.filter.advanced']} value="Advanced" />
            </div>

            <div className="space-y-4">
                {filteredMitigations.map((mitigation, index) => (
                    <motion.div
                        key={mitigation.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <MitigationItem item={mitigation} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const MitigationItem: React.FC<{item: Mitigation}> = ({ item }) => {
    const { state, dispatch } = useContext(AppContext);
    const isCompleted = state.auditData.completedMitigations.includes(item.id);

    return (
        <div className={`p-4 rounded-lg border transition-all duration-300 ${isCompleted ? 'bg-green-500/10 border-green-500/20' : 'bg-gray-800/50 border-gray-700/50'}`}>
            <label className="flex items-start gap-4 cursor-pointer">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => dispatch({ type: 'TOGGLE_MITIGATION', payload: item.id })}
                    className="mt-1 h-5 w-5 rounded border-gray-500 text-cyan-500 focus:ring-cyan-600 bg-gray-700"
                />
                <div>
                    <h3 className={`font-semibold ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-100'}`}>{item.title}</h3>
                    <p className={`text-sm ${isCompleted ? 'text-gray-500' : 'text-gray-400'}`}>{item.description}</p>
                </div>
            </label>
        </div>
    )
}


export default Reduce;
   