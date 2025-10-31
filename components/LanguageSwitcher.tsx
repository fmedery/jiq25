import React from 'react';
import type { Language } from '../types';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const inactiveClass = "px-3 py-1 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white";
  const activeClass = "px-3 py-1 rounded-md text-sm font-medium text-white bg-gray-700";

  return (
    <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg border border-gray-700">
      <button
        onClick={() => setLanguage('en')}
        className={language === 'en' ? activeClass : inactiveClass}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={language === 'fr' ? activeClass : inactiveClass}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
