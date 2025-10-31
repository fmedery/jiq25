import React, { useState, useEffect } from 'react';
import type { LocaleStrings, Language } from '../types';
import LanguageSwitcher from './LanguageSwitcher';

interface LandingProps {
  onStart: () => void;
  texts: LocaleStrings['landing'];
  language: Language;
  setLanguage: (lang: Language) => void;
}

// An easily editable array of showcase images from an image hosting service like Imgur.
// Replace these URLs with your own hosted images.
const showcaseImages = [
  { 
    decade: '1920s', 
    imageUrl: 'https://i.imgur.com/mU8K8c1.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
  },
  { 
    decade: '1950s', 
    imageUrl: 'https://i.imgur.com/acbmv8P.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    decade: '1970s', 
    imageUrl: 'https://i.imgur.com/7hKN9oc.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    decade: '1980s', 
    imageUrl: 'https://i.imgur.com/YVijRZk.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];


const Landing: React.FC<LandingProps> = ({ onStart, texts, language, setLanguage }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % showcaseImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center text-center p-8 min-h-screen w-full overflow-hidden">
      {/* Background container: Stays in the background due to DOM order. */}
      <div className="absolute inset-0 w-full h-full">
        {/* Image Carousel */}
        {showcaseImages.map((image, index) => (
           <img
            key={image.decade}
            src={image.imageUrl}
            alt={`Example portrait with ${image.decade} style`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        {/* Dark overlay on top of images */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Content container: z-index ensures it's on top of the absolute background elements. */}
      <div className="relative z-10 animate-fade-in flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-4 tracking-tighter font-orbitron" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
          {texts.title}
        </h1>
        <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-10 font-raleway">
          {texts.description}
        </p>
        <button
          onClick={onStart}
          className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl hover:bg-blue-500 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg shadow-blue-600/50"
        >
          {texts.ctaButton}
        </button>
        <div className="mt-12">
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
      </div>
      <p className="absolute bottom-4 text-xs text-gray-400 max-w-4xl">{texts.disclaimer}</p>
    </div>
  );
};

export default Landing;
