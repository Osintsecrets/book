import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslations } from '@/i18n/useTranslations';

export const HomePage = () => {
  const t = useTranslations();
  const navigate = useNavigate();

  const cards = [
    { key: 'map', accent: 'from-violet/60 to-cyan-500/60' },
    { key: 'see', accent: 'from-cyan-500/60 to-magenta/50' },
    { key: 'decide', accent: 'from-magenta/50 to-violet/60' }
  ];

  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-10 shadow-glow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-6"
        >
          <h2 className="text-4xl font-bold tracking-tight text-transparent sm:text-5xl" style={{ backgroundImage: 'linear-gradient(120deg, rgba(127,90,240,1), rgba(0,245,255,0.9))', WebkitBackgroundClip: 'text' }}>
            {t('home.heroTitle')}
          </h2>
          <p className="whitespace-pre-line text-lg leading-relaxed text-gray-200">{t('home.heroBody')}</p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="neon-button primary"
              onClick={() => navigate('/discover')}
            >
              {t('home.primaryCta')}
            </button>
            <button
              type="button"
              className="neon-button secondary"
              onClick={() => navigate('/how-it-works')}
            >
              {t('home.secondaryCta')}
            </button>
          </div>
        </motion.div>
        <motion.div
          className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-violet/30 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          aria-hidden
        />
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {cards.map((card, index) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-panel card-hover p-6"
          >
            <div className={`mb-4 h-1 w-16 rounded-full bg-gradient-to-r ${card.accent}`} aria-hidden />
            <h3 className="text-xl font-semibold text-white">{t(`home.cards.${card.key}.title`)}</h3>
            <p className="mt-2 text-sm text-gray-300">{t(`home.cards.${card.key}.body`)}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};
