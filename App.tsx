import React, { useState, useCallback, useMemo, useEffect } from 'react';
import type { GeneratedImage, Language } from './types';
import { AppStep } from './types';
import { locales } from './constants/locales';
import { generateDecadeImage } from './services/geminiService';
import Landing from './components/Landing';
import CameraView from './components/CameraView';
import ResultsView from './components/ResultsView';
import GeneratingView from './components/GeneratingView';
import LanguageSwitcher from './components/LanguageSwitcher';
import GoogleGLogo from './components/GoogleGLogo';

const DECADES_TO_GENERATE = [1920, 1930, 1950, 1960, 1970, 1980];

function App() {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [language, setLanguage] = useState<Language>('en');
  const [selfie, setSelfie] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const texts = useMemo(() => locales[language], [language]);

  const resetApp = useCallback(() => {
    setStep(AppStep.LANDING);
    setSelfie(null);
    setGeneratedImages([]);
    setError(null);
  }, []);

  const handleSelfieCapture = useCallback((imageDataUrl: string) => {
    setSelfie(imageDataUrl);
    setStep(AppStep.GENERATING);
  }, []);

  const generateAllImages = useCallback(async (selfieData: string) => {
    setError(null);
    setGeneratedImages([]); // Clear previous results
    
    try {
        const promises = DECADES_TO_GENERATE.map(async (decade) => {
            const generatedSrc = await generateDecadeImage(selfieData, decade);
            const newImage: GeneratedImage = { decade, src: generatedSrc };
            // Update state as each image completes, triggering a re-render
            setGeneratedImages(prevImages => 
                [...prevImages, newImage].sort((a, b) => a.decade - b.decade)
            );
        });

        await Promise.all(promises);
        setStep(AppStep.RESULTS);
    } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : texts.error.defaultMessage);
    }
  }, [texts.error.defaultMessage]);

  useEffect(() => {
    if (step === AppStep.GENERATING && selfie) {
      generateAllImages(selfie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, selfie]);

  const renderContent = () => {
    if (error) {
      return (
        <div className="text-center p-8 text-white">
          <h2 className="text-2xl font-bold text-red-400 mb-4">{texts.error.title}</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={resetApp}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {texts.error.tryAgainButton}
          </button>
        </div>
      );
    }
    
    switch (step) {
      case AppStep.CAMERA:
        return <CameraView onCapture={handleSelfieCapture} onCancel={resetApp} texts={texts.camera} />;
      case AppStep.GENERATING:
        return <GeneratingView 
                    texts={texts.generating} 
                    total={DECADES_TO_GENERATE.length}
                    current={generatedImages.length}
                    images={generatedImages}
                />;
      case AppStep.RESULTS:
        return <ResultsView images={generatedImages} onReset={resetApp} texts={texts.results} />;
      default:
        return null;
    }
  };

  // Special full-screen layout for the landing page
  if (step === AppStep.LANDING) {
    return (
      <div className="bg-gray-900 font-sans relative">
        <div className="absolute top-4 left-4 z-20">
            <GoogleGLogo />
        </div>
        <Landing 
            onStart={() => setStep(AppStep.CAMERA)} 
            texts={texts.landing}
            language={language}
            setLanguage={setLanguage}
        />
      </div>
    );
  }

  // Centered layout for the rest of the app
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 font-sans relative">
      <main className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;