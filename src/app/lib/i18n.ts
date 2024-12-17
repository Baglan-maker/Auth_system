'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLogin from '../locales/en/login.json';
import ruLogin from '../locales/ru/login.json';
import enRegister from '../locales/en/register.json';
import ruRegister from '../locales/ru/register.json';

const resources = {
  en: {
    login: enLogin,
    register: enRegister,
  },
  ru: {
    login: ruLogin,
    register: ruRegister,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru', // русский как язык по умолчанию
      fallbackLng: 'ru',
      ns: ['login', 'register'],
      defaultNS: 'login',
      interpolation: {
        escapeValue: false, 
      },
    });
}


export const loadNamespace = async (namespace: string) => {
  const resources = await import(`../locales/en/${namespace}.json`);
  i18n.addResourceBundle('en', namespace, resources.default, true, true);
  console.log(`Namespace "${namespace}" loaded.`);
};

export default i18n;
