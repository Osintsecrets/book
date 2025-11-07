import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { Page, WIZARD_SECTIONS, WIZARD_QUESTIONS, Question, QuestionType, Answer } from '../../config';

const ToggleInput: React.FC<{ questionId: string, value: Answer, onChange: (value: Answer) => void }> = ({ questionId, value, onChange }) => {
    const { state } = useContext(AppContext);
    const t = translations[state.language];

    const options: {label: string, value: Answer}[] = [
        { label: t['audit.answer.yes'], value: true },
        { label: t['audit.answer.no'], value: false },
        { label: t['audit.answer.not_sure'], value: 'not_sure' },
    ];

    return (
        <div className="flex bg-gray-800 rounded-full p-1" role="group" aria-labelledby={`q-${questionId}`}>
            {options.map(opt => (
                <button
                    key={opt.label}
                    onClick={() => onChange(opt.value)}
                    aria-pressed={value === opt.value}
                    className={`w-full rounded-full py-2 text-sm font-medium transition-colors ${
                        value === opt.value
                            ? 'bg-cyan-500 text-white'
                            : 'text-gray-300 hover:bg-gray-700'
                    }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
};

const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
    const { state, dispatch } = useContext(AppContext);
    const t = translations[state.language];
    const answer = state.auditData.answers[question.id] ?? null;

    const setAnswer = (value: Answer) => {
        dispatch({ type: 'SET_ANSWER', payload: { questionId: question.id, answer: value } });
    };

    return (
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 md:p-6 mb-4">
            <p id={`q-${question.id}`} className="text-lg text-gray-200 mb-4">{t[question.id as keyof typeof t] || question.id}</p>
            {question.type === QuestionType.Toggle && (
                <ToggleInput questionId={question.id} value={answer} onChange={setAnswer} />
            )}
        </div>
    );
};

const StartAudit: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const { state, dispatch } = useContext(AppContext);
    const t = translations[state.language];

    const currentSection = WIZARD_SECTIONS[currentStep];
    const questionsForStep = WIZARD_QUESTIONS.filter(q => q.section === currentSection);

    const nextStep = () => {
        if (currentStep < WIZARD_SECTIONS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            dispatch({ type: 'SET_PAGE', payload: Page.Analyze });
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    const progress = ((currentStep + 1) / WIZARD_SECTIONS.length) * 100;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-center mb-2">{t[currentSection as keyof typeof t] || currentSection}</h1>
                <p className="text-center text-cyan-400">{t['audit.progress'].replace('{current}', String(currentStep + 1)).replace('{total}', String(WIZARD_SECTIONS.length))}</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
                    <motion.div 
                        className="bg-gradient-to-r from-cyan-500 to-violet-500 h-2.5 rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%`}}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {questionsForStep.map(q => <QuestionCard key={q.id} question={q} />)}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="md:col-span-1">
                    <div className="sticky top-24 bg-gray-900/30 p-4 rounded-lg border border-gray-700/50">
                        <h3 className="font-bold text-violet-400 mb-2">{t['audit.context.title']}</h3>
                        <p className="text-sm text-gray-400">
                           { state.language === 'en' 
                           ? `Answering these questions helps the tool identify potential vulnerabilities. For example, a public phone number combined with your full name can enable SIM swap attacks or social engineering.`
                           : `מענה על שאלות אלו מסייע לכלי לזהות פגיעויות פוטנציאליות. לדוגמה, מספר טלפון ציבורי בשילוב עם שמך המלא יכול לאפשר התקפות החלפת SIM או הנדסה חברתית.`}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
                <button 
                    onClick={prevStep} 
                    disabled={currentStep === 0}
                    className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t['audit.back']}
                </button>
                <button 
                    onClick={nextStep}
                    className="px-6 py-2 bg-cyan-500 text-white font-semibold rounded-lg shadow-md shadow-cyan-500/20 hover:bg-cyan-600 transition-colors"
                >
                    {currentStep === WIZARD_SECTIONS.length - 1 ? t['audit.finish'] : t['audit.next']}
                </button>
            </div>
        </div>
    );
};

export default StartAudit;
