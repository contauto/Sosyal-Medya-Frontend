import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        'Sign Up': 'Sign Up',
        'Password mismatch': 'Password mismatch',
        Username: 'Username',
        'Name': 'Name',
        Password: 'Password',
        'Re-Password': 'Re-Password',
        "Login":"Login",
        "Logout":"Logout"
      }
    },
    tr: {
      translations: {
        'Sign Up': 'Kayıt Ol',
        'Password mismatch': 'Aynı şifreyi giriniz',
        Username: 'Kullanıcı Adı',
        'Name': 'İsim',
        Password: 'Şifre',
        'Re-Password': 'Şifreyi Tekrarla',
        "Login":"Giriş Yap",
        "Logout":"Çıkış Yap"
      }
    }
  },
  fallbackLng: 'tr',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ','
  },
  react: {
    wait: true
  }
});

export default i18n;