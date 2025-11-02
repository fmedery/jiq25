import type { GeneratedImage } from "../types";

export const generateContactSheet = async (
    images: GeneratedImage[],
    title: string,
    subtitle: string,
    footer: string
): Promise<void> => {
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
    const titleHeight = 120; // Increased for subtitle
    const footerHeight = 80;

    canvas.width = columns * imgWidth + (columns + 1) * padding;
    canvas.height = rows * imgHeight + (rows + 1) * padding + titleHeight + footerHeight;

    // Fill background
    ctx.fillStyle = '#111827'; // dark gray
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add title
    ctx.fillStyle = '#F9FAFB'; // light gray
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, 80);

    // Add subtitle
    ctx.font = '24px sans-serif';
    ctx.fillText(subtitle, canvas.width / 2, 120);

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

    // Add footer
    ctx.fillStyle = '#F9FAFB';
    ctx.font = '18px sans-serif';
    ctx.textAlign = 'center';
    
    // Split footer text into multiple lines
    const lines = footer.split('\n');
    const lineHeight = 24;
    const footerYStart = canvas.height - footerHeight + 30;

    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], canvas.width / 2, footerYStart + (i * lineHeight));
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

export const downloadImage = async (src: string, filename: string) => {
    try {
        // Fetch the image
        const response = await fetch(src);
        const blob = await response.blob();
        const file = new File([blob], filename, { type: blob.type });

        // Check if the Web Share API is available and can share files
        if (navigator.share && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: 'Past Forward Image',
                text: 'Check out this image from Past Forward!',
            });
        } else {
            // Fallback for browsers that do not support Web Share API
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        }
    } catch (error) {
        console.error('Error downloading image:', error);
        // Fallback to original method on any error
        const link = document.createElement('a');
        link.href = src;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
