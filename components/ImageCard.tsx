import React from 'react';
import type { GeneratedImage, LocaleStrings } from '../types';
import { downloadImage } from '../utils/imageUtils';

interface ImageCardProps {
  image: GeneratedImage;
  texts: LocaleStrings['results'];
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);


const ImageCard: React.FC<ImageCardProps> = ({ image, texts }) => {
  const handleDownload = async () => {
    await downloadImage(image.src, `past-forward-${image.decade}.jpg`);
  };

  return (
    <div className="group relative w-full max-w-sm aspect-square bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <img src={image.src} alt={`Portrait from the ${image.decade}s`} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white" style={{textShadow: '0 1px 3px rgba(0,0,0,0.7)'}}>{image.decade}s</h3>
          <button 
            onClick={handleDownload}
            className="p-2 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors"
            title={texts.downloadTooltip}
          >
            <DownloadIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
