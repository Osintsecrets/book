
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { motion } from 'framer-motion';

const HabitCard: React.FC<{ title: string, delay: number }> = ({ title, delay }) => (
    <motion.div
        className="p-6 bg-gray-800/50 border border-gray-700/50 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
    </motion.div>
);

const KeepSafe: React.FC = () => {
    const { state, dispatch } = useContext(AppContext);
    const t = translations[state.language];

    const habits = [
        "Use a password manager",
        "Enable 2FA on key accounts",
        "Review your public profiles monthly",
        "Think before posting kids’ faces / locations"
    ];

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_CHECKUP_DATE', payload: e.target.value });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">
                {t['keepsake.title']}
            </h1>
            <p className="text-center text-gray-400 mb-12">{t['keepsake.intro']}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {habits.map((habit, index) => (
                    <HabitCard key={habit} title={habit} delay={index * 0.1} />
                ))}
            </div>

            <motion.div
                className="p-6 bg-gray-900/50 border border-gray-700/50 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: habits.length * 0.1 }}
            >
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">{t['keepsake.nextCheckup']}</h2>
                <p className="text-gray-400 mb-4">{t['keepsake.nextCheckupDesc']}</p>
                <input
                    type="date"
                    value={state.auditData.nextCheckupDate || ''}
                    onChange={handleDateChange}
                    className="bg-gray-800 border border-gray-600 text-gray-200 rounded-lg p-2 w-full md:w-auto"
                />
            </motion.div>
        </div>
    );
};

export default KeepSafe;
   