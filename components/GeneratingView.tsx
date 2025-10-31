import React, { useState, useEffect } from 'react';
import type { LocaleStrings, GeneratedImage } from '@/types';
import GoogleGLogo from './GoogleGLogo';

interface GeneratingViewProps {
  texts: LocaleStrings['generating'];
  current: number;
  total: number;
  images: GeneratedImage[];
}

const GeneratingView: React.FC<GeneratingViewProps> = ({ texts, current, total, images }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % texts.messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [texts.messages.length]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 w-full">
      <div className="relative w-12 h-12 animate-pulse">
        <GoogleGLogo />
      </div>
      <h2 className="text-3xl font-bold text-white mt-8 mb-2">{texts.title}</h2>
      <p className="text-blue-200 max-w-lg mb-8 font-raleway">{texts.subtitle}</p>
      
      <div className="w-full max-w-md bg-gray-700 rounded-full h-2.5 mb-2">
        <div 
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${(current / total) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-300 font-medium mb-6">
        {texts.progress(current, total)}
      </p>

      <p className="text-lg text-gray-400 h-6 transition-opacity duration-500 mb-8 font-raleway">
        {texts.messages[messageIndex]}
      </p>

      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl">
            {images.map((image) => (
                <div key={image.decade} className="relative w-full max-w-sm aspect-square bg-gray-800 rounded-2xl shadow-lg overflow-hidden mx-auto animate-fade-in">
                    <img src={image.src} alt={`Portrait from the ${image.decade}s`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white" style={{textShadow: '0 1px 3px rgba(0,0,0,0.7)'}}>{image.decade}s</h3>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default GeneratingView;