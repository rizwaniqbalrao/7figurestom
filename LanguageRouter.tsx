import { useEffect } from 'react';
import { useParams, Navigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGUAGES = ['en', 'de', 'fr', 'es', 'it', 'nl', 'pt', 'ar'];

const LanguageRouter = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
      // Update i18next language
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }

      // Update HTML lang attribute
      document.documentElement.lang = lang;

      // Update HTML dir attribute for RTL languages
      if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }

      // Save language preference to localStorage
      localStorage.setItem('lang_preference', lang);
    }
  }, [lang, i18n]);

  // Redirect to /en if language is not supported
  if (!lang || !SUPPORTED_LANGUAGES.includes(lang)) {
    return <Navigate to="/en" replace />;
  }

  return <Outlet />;
};

export default LanguageRouter;