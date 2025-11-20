import type { LocaleStrings } from '../types';

export const locales: Record<'en' | 'fr', LocaleStrings> = {
  en: {
    landing: {
      title: 'TimeStamp',
      description: 'Travel through time with a selfie. See yourself reimagined in the iconic styles of past decades.',
      ctaButton: 'Take a Selfie',
      disclaimer: "Your photos are processed in memory and are not stored. They are not used for model training.",
    },
    camera: {
        title: 'Ready for your close-up?',
        captureButton: 'Capture',
        cancelButton: 'Cancel',
        unsupported: 'Camera access is not supported or was denied. Please check your browser settings.',
    },
    generating: {
      title: "Hold on to your hats, we're warming up the time machine!",
      subtitle: "Made with ❤️ by Google Montreal with Google AI Studio",
      progress: (current, total) => `Generating images... (${current}/${total})`,
      messages: [
        'Polishing the chrome on the DeLorean...',
        'Wax on, wax off',
        'Adjusting the flux capacitor...',
        'Syncing timelines...',
        'Rummaging through vintage wardrobes...',
        'Man who catch fly with chopstick, accomplish anything',
        'Developing the film...',
        'Applying a sepia filter...',
      ],
    },
    results: {
      title: 'Your Journey Through Time',
      contactSheetTitle: 'TimeStamp',
      contactSheetSubtitle: 'A journey through the decades',
      downloadAllButton: 'Download Contact Sheet',
      startOverButton: 'Start Over',
      downloadTooltip: 'Download Photo',
      disclaimer: "Your photos are processed in memory and never stored. They are not used for training purposes.",
      shareTitle: 'TimeStamp Image',
      shareText: 'Check out this image from TimeStamp!',
    },
    error: {
        title: 'A Glitch in the Timeline!',
        defaultMessage: 'Something went wrong while generating your images.',
        tryAgainButton: 'Try Again'
    }
  },
  fr: {
    landing: {
      title: 'Passé Recomposé',
      description: 'Voyagez dans le temps avec un selfie. Redécouvrez-vous dans les styles iconiques des décennies passées.',
      ctaButton: 'Prendre un Selfie',
      disclaimer: "Vos photos sont traitées en mémoire et jamais stockées. Elles ne sont pas utilisées à des fins de formation.",
    },
    camera: {
        title: 'Prêt pour votre portrait?',
        captureButton: 'Capturer',
        cancelButton: 'Annuler',
        unsupported: "L'accès à la caméra n'est pas pris en charge ou a été refusé. Veuillez vérifier les paramètres de votre navigateur.",
    },
    generating: {
      title: 'Accrochez-vous, on préchauffe la machine à remonter le temps !',
      subtitle: "Fait avec ❤️ par Google Montreal grâce à Google AI Studio",
      progress: (current, total) => `Génération des images... (${current}/${total})`,
      messages: [
        'Polissage du chrome de la DeLorean...',
        'Lustrer, frotter',
        'Ajustement du convecteur temporel...',
        'Synchronisation des lignes temporelles...',
        'Fouille dans les garde-robes vintage...',
        'Homme qui attrape mouche avec des baguettes est homme qui réussit tout',
        'Développement de la pellicule...',
        "Application d'un filtre sépia...",
      ],
    },
    results: {
      title: 'Votre Voyage Dans Le Temps',
      contactSheetTitle: 'Passé Recomposé',
      contactSheetSubtitle: 'Un voyage à travers les décennies',
      downloadAllButton: 'Télécharger la Planche Contact',
      startOverButton: 'Recommencer',
      downloadTooltip: 'Télécharger la Photo',
      disclaimer: "Vos photos sont traitées en mémoire et ne sont pas stockées. Elles ne sont pas utilisées pour entrainer le modèle.",
      shareTitle: 'Image Passé Recomposé',
      shareText: 'Regardez cette image de Passé Recomposé !',
    },
    error: {
        title: 'Un Bug dans la Ligne Temporelle!',
        defaultMessage: 'Une erreur est survenue lors de la génération de vos images.',
        tryAgainButton: 'Réessayer'
    }
  },
};

export const PROMPT = "Please generate a photograph of the persons in this image, reimagining them as if they were living in the {DECADE}. This should be a portrait shot, showing them from the waist up or closer, but ensuring it is not a full-body view. It is important to style them with the distinct fashion and a characteristic hairstyle from that specific era. Do not hesitate to use well-known and even cliché visual elements from the {DECADE} to make it recognizable. The final image must look like a clear, authentic photograph from that time, capturing the era's signature atmosphere, color palette, and film quality.";
export const PROMPT_1920 = "Please generate a photograph of the persons in this image, reimagining them as if they were living in the 1920s, specifically with a Great Gatsby aesthetic. This should be a portrait shot, showing them from the waist up or closer, but ensuring it is not a full-body view. It is important to style them with the distinct fashion and a characteristic hairstyle from that specific era. Do not hesitate to use well-known and even cliché visual elements from the 1920s to make it recognizable. The final image must look like a clear, authentic photograph from that time, capturing the era's signature atmosphere, color palette, and film quality.";
export const PROMPT_2020 = "Please generate a photograph of the persons in this image, reimagining them as if they were living in the 2020s. This should be a portrait shot, showing them from the waist up or closer, but ensuring it is not a full-body view. They are taking a selfie holding the mobile phone vertically, we can see the back of the mobile phone in the shot, with them looking at the phone screen The phone is highly detailed product shot of the Google Pixel 5 released in 2020, showing its Sorta Sage green textured bio-resin back panel and the G Google logo is subtly embedded and flush with the back surface near the bottom half. In the top-left corner, there is a square camera bump that is almost flush with the back surface This module houses a main camera lens an ultrawide lens, an LED flash module, a microphone and spectral/flicker sensor. It is important to style them with the distinct fashion and a characteristic hairstyle from that specific era. Do not hesitate to use well-known and even cliché visual elements from the 2020s to make it recognizable. The final image must look like a clear, authentic photograph from that time, capturing the era's signature atmosphere, color palette, and film quality.";