import type { GeneratedImage } from "../types";

export const generateContactSheet = async (images: GeneratedImage[]): Promise<void> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sortedImages = [...images].sort((a, b) => a.decade - b.decade);

    // Assuming all images are the same size, get dimensions from the first one
    const firstImage = await loadImage(sortedImages[0].src);
    const imgWidth = firstImage.width;
    const imgHeight = firstImage.height;
    
    const columns = 3;
    const rows = 2;
    const padding = 50;
    const titleHeight = 80;

    canvas.width = columns * imgWidth + (columns + 1) * padding;
    canvas.height = rows * imgHeight + (rows + 1) * padding + titleHeight;

    // Fill background
    ctx.fillStyle = '#111827'; // dark gray
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add title
    ctx.fillStyle = '#F9FAFB'; // light gray
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Past Forward', canvas.width / 2, titleHeight);

    // Draw images
    for (let i = 0; i < sortedImages.length; i++) {
        const imgData = sortedImages[i];
        const row = Math.floor(i / columns);
        const col = i % columns;

        const x = padding + col * (imgWidth + padding);
        const y = titleHeight + padding + row * (imgHeight + padding);

        const img = await loadImage(imgData.src);
        ctx.drawImage(img, x, y, imgWidth, imgHeight);

        // Add decade label
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(x, y + imgHeight - 30, imgWidth, 30);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(imgData.decade.toString(), x + imgWidth / 2, y + imgHeight - 10);
    }
    
    downloadCanvas(canvas, 'past-forward-contact-sheet.jpg');
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.crossOrigin = "anonymous"; // Important for canvas with external images
        img.src = src;
    });
};

const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/jpeg', 0.9);
    link.click();
}

export const downloadImage = (src: string, filename: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
