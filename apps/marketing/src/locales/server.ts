import { createI18nServer } from 'next-international/server';

export const { getI18n, getScopedI18n, getCurrentLocale } = createI18nServer({
  ka: async () => import('./ka'),
  en: async () => import('./en'),
});
