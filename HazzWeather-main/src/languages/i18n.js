import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bn from './bn.json';
import en from './en.json';
import ta from './ta.json';
import hnd from './hnd.json';


i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    ta: ta,
    bn: bn,
    hnd : hnd
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
