import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const languageNames: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  nl: 'Nederlands',
  pt: 'Português',
  ar: 'العربية'
};

export default function LanguageBanner() {
  const { i18n } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [detectedLang, setDetectedLang] = useState<string | null>(null);
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    // Check if user has already made a language choice
    const langPreference = localStorage.getItem('lang_preference');
    
    if (langPreference) {
      // User has already chosen, don't show banner
      return;
    }

    // Detect browser language
    const browserLang = navigator.language.split('-')[0]; // Get 'en' from 'en-US'
    const supportedLanguages = ['en', 'de', 'fr', 'es', 'it', 'nl', 'pt', 'ar'];
    
    // Only show banner if detected language is supported and not English
    if (supportedLanguages.includes(browserLang) && browserLang !== 'en') {
      setDetectedLang(browserLang);
      setShowBanner(true);
    } else {
      // If English or unsupported, save 'en' as default preference
      localStorage.setItem('lang_preference', 'en');
    }
  }, []);

  const handleSwitch = () => {
    if (detectedLang) {
      // Change language
      i18n.changeLanguage(detectedLang);
      
      // Save preference
      localStorage.setItem('lang_preference', detectedLang);
      
      // Update HTML lang attribute
      document.documentElement.setAttribute('lang', detectedLang);
      
      // Update direction for RTL languages
      if (detectedLang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
      }
      
      // Navigate to detected language URL
      const currentPath = window.location.pathname.replace(`/${lang}`, '') || '/';
      navigate(`/${detectedLang}${currentPath === '/' ? '' : currentPath}`);
      
      // Dismiss banner
      setShowBanner(false);
    }
  };

  const handleKeepEnglish = () => {
    // Save English preference
    localStorage.setItem('lang_preference', 'en');
    
    // Ensure English is set
    i18n.changeLanguage('en');
    document.documentElement.setAttribute('lang', 'en');
    document.documentElement.setAttribute('dir', 'ltr');
    
    // Navigate to English URL if not already there
    if (lang !== 'en') {
      const currentPath = window.location.pathname.replace(`/${lang}`, '') || '/';
      navigate(`/en${currentPath === '/' ? '' : currentPath}`);
    }
    
    // Dismiss banner
    setShowBanner(false);
  };

  if (!showBanner || !detectedLang) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <i className="ri-global-line text-2xl"></i>
            <p className="text-sm sm:text-base font-medium">
              We noticed your language is <strong>{languageNames[detectedLang]}</strong>. 
              Switch to {languageNames[detectedLang]}?
            </p>
          </div>
          
          <div className="flex items-center gap-3 whitespace-nowrap">
            <button
              onClick={handleSwitch}
              className="px-6 py-2 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              Switch
            </button>
            <button
              onClick={handleKeepEnglish}
              className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            >
              Keep English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}