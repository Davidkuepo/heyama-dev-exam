import en from '@/messages/en.json';
import fr from '@/messages/fr.json';

type Language = 'en' | 'fr';

const messages = {
  en,
  fr,
};

export function getLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem('lang') as Language) || 'en';
}

export function setLanguage(lang: Language) {
  localStorage.setItem('lang', lang);
}

export function getMessage(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = messages[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  if (!value) {
    console.warn(`Missing translation for: ${key}`);
    return key;
  }

  return value;
}

export function t(key: string): string {
  const lang = getLanguage();
  return getMessage(lang, key);
}
