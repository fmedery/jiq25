import { GoogleGenAI, Modality } from "@google/genai";

const DECADES = {
  1920: "A black and white, slightly grainy, art deco style portrait of the person in the image. They should have 1920s fashion and hairstyle, looking like a photograph from the Roaring Twenties.",
  1930: "A sepia-toned portrait of the person in the image, reflecting the fashion and mood of the 1930s. The style should be elegant but somber, reminiscent of the Great Depression era photography.",
  1950: "A vibrant, technicolor-style portrait of the person in the image. They should be dressed in 1950s rock-and-roll fashion with a classic hairstyle from the era. The photo should feel optimistic and clean.",
  1960: "A vibrant, colorful portrait of the person in the image, capturing the fashion of the late 1960s. Think groovy, flower-power aesthetic with bold patterns, bell-bottoms, and long, natural hair. The background should be bright and artistic, reflecting the optimistic spirit of the era.",
  1970: "A warm, slightly faded, Kodachrome-style portrait of the person in the image. They should have 1970s disco or folk fashion, with feathered hair or an afro, and a relaxed vibe.",
  1980: "A portrait of the person in the image with a bold, neon-lit 1980s style. Think big hair, shoulder pads, and vibrant, slightly gaudy makeup. The background should have geometric patterns or a soft-focus glamour shot look.",
};

export async function generateDecadeImage(
  base64Image: string,
  decade: number
): Promise<string> {
  // It's recommended to create a new instance for each call if the API key can change.
  // Assuming process.env.API_KEY is available and managed externally.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const mimeType = base64Image.substring(
    base64Image.indexOf(":") + 1,
    base64Image.indexOf(";")
  );
  const pureBase64 = base64Image.substring(base64Image.indexOf(",") + 1);

  const prompt = DECADES[decade as keyof typeof DECADES];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: pureBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    const candidate = response.candidates?.[0];
    const firstPart = candidate?.content?.parts?.[0];

    if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
        const generatedBase64 = firstPart.inlineData.data;
        const generatedMimeType = firstPart.inlineData.mimeType;
        return `data:${generatedMimeType};base64,${generatedBase64}`;
    } else {
        console.error(`No image data found for decade ${decade}. Full API response:`, JSON.stringify(response, null, 2));

        if (candidate?.finishReason === 'SAFETY') {
            const safetyMessage = `Image generation for ${decade} was blocked for safety reasons. This can happen with prompts that are too ambiguous or trigger content filters.`;
            console.error(safetyMessage);
            if (candidate.safetyRatings) {
                console.error('Safety Ratings:', JSON.stringify(candidate.safetyRatings, null, 2));
            }
            throw new Error(safetyMessage);
        }
        
        throw new Error("No image data found in Gemini API response. The model may have returned an empty response.");
    }
  } catch (error) {
    console.error(`Error generating image for decade ${decade}:`, error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image for ${decade}: ${error.message}`);
    }
    throw new Error(`Failed to generate image for ${decade}. Please check console for details.`);
  }
}