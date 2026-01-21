import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getLanguageFromRequest = (
   headers: Record<string, string | string[]> = {}
): string => {
   // Cookie'den dili kontrol et
   const cookies = headers['cookie'] as string | undefined;
   if (cookies) {
      const langCookie = cookies.split('; ').find((c) => c.startsWith('lang='));
      if (langCookie) {
         return langCookie.split('=')[1];
      }
   }

   // Accept-Language header'ından dili kontrol et
   const acceptLanguage = headers['accept-language'] as string | undefined;
   if (acceptLanguage) {
      const lang = acceptLanguage.split(',')[0].split('-')[0];
      if (['tr', 'en'].includes(lang)) {
         return lang;
      }
   }

   return 'tr'; // Varsayılan Türkçe
};

export const initI18n = async () => {
   await i18next.use(Backend).init({
      lng: 'tr',
      fallbackLng: 'tr',
      defaultNS: 'server',
      ns: ['server'],
      backend: {
         loadPath: path.join(__dirname, '../locales/{{lng}}.json'),
      },
      interpolation: {
         escapeValue: false,
      },
   });

   return i18next;
};

export const i18n = i18next;

export const setLanguageFromRequest = (
   headers: Record<string, string | string[]> = {}
) => {
   const lang = getLanguageFromRequest(headers);
   i18next.changeLanguage(lang);
};
