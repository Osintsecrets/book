import { Link } from 'react-router-dom';
import { useTranslationValue, useTranslations } from '@/i18n/useTranslations';

export const HowItWorksPage = () => {
  const t = useTranslations();
  const getValue = useTranslationValue();
  const bullets = (getValue('how.whatItDoes.bullets') as string[]) ?? [];
  const darkFlow = (getValue('how.darkFlow.steps') as string[]) ?? [];
  const whatNot = (getValue('how.whatNot.bullets') as string[]) ?? [];
  const who = (getValue('how.who.cards') as { title: string; body: string }[]) ?? [];

  return (
    <div className="space-y-12">
      <section className="glass-panel p-8">
        <h2 className="text-3xl font-semibold text-white">{t('how.whatItDoes.title')}</h2>
        <ul className="mt-4 space-y-3 text-sm text-gray-200">
          {bullets.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="glass-panel p-8">
        <h3 className="text-2xl font-semibold text-white">{t('how.darkFlow.title')}</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {darkFlow.map((step, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-black/40 p-5 shadow-inner shadow-black/40">
              <span className="text-xs uppercase tracking-[0.25em] text-cyan-300">0{index + 1}</span>
              <p className="mt-3 text-sm text-gray-200">{step}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-8 md:grid-cols-2">
        <div className="glass-panel p-8">
          <h3 className="text-2xl font-semibold text-white">{t('how.whatNot.title')}</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-200">
            {whatNot.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-magenta" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-panel p-8">
          <h3 className="text-2xl font-semibold text-white">{t('how.who.title')}</h3>
          <div className="mt-4 grid gap-3">
            {who.map((item, index) => (
              <div key={index} className="rounded-xl border border-white/5 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-xs text-gray-300">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="flex justify-center">
        <Link to="/discover" className="neon-button primary">
          {t('how.cta')}
        </Link>
      </div>
    </div>
  );
};
