import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { LocaleStrings } from '../types';

interface CameraViewProps {
  onCapture: (imageDataUrl: string) => void;
  onCancel: () => void;
  texts: LocaleStrings['camera'];
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onCancel, texts }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mediaStream: MediaStream;
    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error('getUserMedia not supported');
        }
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 720 } },
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError(texts.unsupported);
      }
    };

    startCamera();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [texts.unsupported]);

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        onCapture(dataUrl);
      }
    }
  }, [onCapture]);
  
  return (
    <div className="w-full max-w-2xl flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold text-white mb-6">{texts.title}</h2>
      <div className="relative w-full aspect-square bg-gray-800 rounded-2xl shadow-lg overflow-hidden border-4 border-gray-700">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100"></video>
        {error && <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-red-400 p-4 text-center">{error}</div>}
      </div>
      <canvas ref={canvasRef} className="hidden"></canvas>
      <div className="flex items-center justify-center mt-6 space-x-4">
        <button onClick={onCancel} className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-500 transition-colors">
            {texts.cancelButton}
        </button>
        <button
          onClick={handleCapture}
          disabled={!stream || !!error}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg"
        >
          {texts.captureButton}
        </button>
      </div>
    </div>
  );
};

export default CameraView;
