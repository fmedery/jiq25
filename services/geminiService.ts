import { GoogleGenAI, Modality } from "@google/genai";
import { PROMPT } from "@/constants/locales";

const toTitleCase = (s: string) =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
    c ? c.toUpperCase() : " " + d.toUpperCase()
  );

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

  const prompt = PROMPT.replace(/{DECADE}/g, toTitleCase(decade.toString()));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
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