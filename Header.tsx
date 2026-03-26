import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'en';
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    if (langDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langDropdownOpen]);

  const handleLanguageChange = (langCode: string) => {
    // Save preference
    localStorage.setItem('lang_preference', langCode);
    localStorage.setItem('i18nextLng', langCode);

    // Update HTML attributes
    document.documentElement.setAttribute('lang', langCode);
    document.documentElement.setAttribute('dir', langCode === 'ar' ? 'rtl' : 'ltr');

    // Navigate to the same page but with new language prefix
    const pathWithoutLang = location.pathname.replace(/^\/[a-z]{2}/, '') || '/';
    navigate(`/${langCode}${pathWithoutLang === '/' ? '' : pathWithoutLang}`);

    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  const isActive = (path: string) => {
    const currentPath = location.pathname.replace(`/${currentLang}`, '') || '/';
    return currentPath === path;
  };

  const navLinks = [
    { nameKey: 'nav.services', path: '/services' },
    { nameKey: 'nav.caseStudies', path: '/case-studies' },
    { nameKey: 'nav.shopifyCro', path: '/shopify-cro-agency' },
    { nameKey: 'nav.resources', path: '/resources' },
    { nameKey: 'nav.about', path: '/about' },
    { nameKey: 'nav.contact', path: 'http://instagram.com/7figurestom', external: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to={`/${currentLang}`} className="flex items-center gap-3 cursor-pointer">
              <img
                src="https://static.readdy.ai/image/9141bf56d24241eb66b91d91461534d9/17c33c4f464aed40ea94a7ee1d44bcb5.jpeg"
                alt="7Figurestom"
                className="h-10 sm:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-semibold text-sm xl:text-base transition-colors cursor-pointer ${
                      scrolled ? 'text-gray-700 hover:text-primary-500' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {t(link.nameKey)}
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={`/${currentLang}${link.path}`}
                    className={`font-semibold text-sm xl:text-base transition-colors cursor-pointer ${
                      isActive(link.path)
                        ? scrolled ? 'text-primary-500' : 'text-white'
                        : scrolled ? 'text-gray-700 hover:text-primary-500' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {t(link.nameKey)}
                  </Link>
                )
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                    scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
                  }`}
                  aria-label="Select Language"
                >
                  <i className="ri-global-line text-xl"></i>
                  <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
                  <i className={`ri-arrow-down-s-line text-lg transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {langDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => handleLanguageChange(l.code)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer flex items-center justify-between ${
                          currentLang === l.code
                            ? 'bg-primary-50 text-primary-600 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{l.nativeName}</span>
                        {currentLang === l.code && <i className="ri-check-line text-primary-600"></i>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Link
                to={`/${currentLang}/share-project`}
                className={`px-4 xl:px-6 py-2.5 xl:py-3 rounded-lg font-semibold text-sm xl:text-base transition-all whitespace-nowrap cursor-pointer ${
                  scrolled
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-white text-gray-900 hover:bg-primary-500 hover:text-white'
                }`}
              >
                {t('nav.shareProject')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden text-2xl cursor-pointer ${scrolled ? 'text-gray-900' : 'text-white'}`}
            >
              <i className={mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
            <nav className="flex flex-col p-4 sm:p-6 space-y-3 sm:space-y-4">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-semibold py-2 cursor-pointer text-gray-700 hover:text-primary-500 text-base"
                  >
                    {t(link.nameKey)}
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={`/${currentLang}${link.path}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-semibold py-2 cursor-pointer text-base ${
                      isActive(link.path) ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
                    }`}
                  >
                    {t(link.nameKey)}
                  </Link>
                )
              ))}

              {/* Mobile Language Selector */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 mb-3 text-sm font-medium">
                  <i className="ri-global-line text-lg"></i>
                  <span>Language</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageChange(l.code)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        currentLang === l.code
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {l.nativeName}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to={`/${currentLang}/share-project`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold text-center hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer text-base"
              >
                {t('nav.shareProject')}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Sticky CTA Button */}
      <Link
        to={`/${currentLang}/share-project`}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-40 px-4 sm:px-6 py-3 sm:py-4 bg-primary-500 text-white rounded-full font-bold shadow-2xl hover:bg-primary-600 hover:scale-110 transition-all duration-300 flex items-center gap-2 cursor-pointer text-sm sm:text-base"
      >
        <i className="ri-send-plane-fill"></i>
        <span className="hidden sm:inline whitespace-nowrap">{t('nav.shareProject')}</span>
        <span className="sm:hidden">Submit</span>
      </Link>
    </>
  );
}