import React, { useState } from 'react';
import type { GeneratedImage, LocaleStrings } from '../types';
import { generateContactSheet } from '../utils/imageUtils';
import ImageCard from './ImageCard';

interface ResultsViewProps {
  images: GeneratedImage[];
  onReset: () => void;
  texts: LocaleStrings['results'];
}

const ResultsView: React.FC<ResultsViewProps> = ({ images, onReset, texts }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadAll = async () => {
        setIsDownloading(true);
        try {
            await generateContactSheet(
                images,
                texts.contactSheetTitle,
                texts.contactSheetSubtitle,
                texts.contactSheetFooter
            );
        } catch (error) {
            console.error("Failed to generate contact sheet:", error);
            alert("Could not generate contact sheet. Please try downloading images individually.");
        } finally {
            setIsDownloading(false);
        }
    };
    
    return (
        <div className="w-full flex flex-col items-center p-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center">{texts.title}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
                {images.map((image) => (
                    <ImageCard key={image.decade} image={image} texts={texts} />
                ))}
            </div>

            <div className="w-full max-w-xs sm:w-auto sm:max-w-none flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                 <button 
                    onClick={onReset} 
                    className="w-full sm:w-auto bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-500 transition-colors order-2 sm:order-1"
                >
                    {texts.startOverButton}
                </button>
                <button 
                    onClick={handleDownloadAll}
                    disabled={isDownloading}
                    className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-wait transition-colors text-lg order-1 sm:order-2"
                >
                    {isDownloading ? 'Generating...' : texts.downloadAllButton}
                </button>
            </div>
        </div>
    );
};

export default ResultsView;