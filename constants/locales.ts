import type { LocaleStrings } from '../types';

export const locales: Record<'en' | 'fr', LocaleStrings> = {
  en: {
    landing: {
      title: 'Past Forward',
      description: 'Travel through time with a selfie. See yourself reimagined in the iconic styles of past decades.',
      ctaButton: 'Take a Selfie',
      disclaimer: "Your photos are instantly processed, never stored anywhere, and are not used for training.",
    },
    camera: {
        title: 'Ready for your close-up?',
        captureButton: 'Capture',
        cancelButton: 'Cancel',
        unsupported: 'Camera access is not supported or was denied. Please check your browser settings.',
    },
    generating: {
      title: "Hold on to your hats, we're warming up the time machine!",
      subtitle: "Made with ❤️ by fmedery  with Google AI Studio",
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
      contactSheetTitle: 'Past Forward',
      contactSheetSubtitle: 'A journey through the decades',
      downloadAllButton: 'Download Contact Sheet',
      startOverButton: 'Start Over',
      downloadTooltip: 'Download Photo',
      disclaimer: "Your photos are instantly processed, never stored anywhere (including our servers or Google's), and are never used for training.",
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
      disclaimer: "Vos photos sont traitées instantanément, ne sont pas stockées nulle part ni utilisées pour l'entraînement.",
    },
    camera: {
        title: 'Prêt pour votre portrait?',
        captureButton: 'Capturer',
        cancelButton: 'Annuler',
        unsupported: "L'accès à la caméra n'est pas pris en charge ou a été refusé. Veuillez vérifier les paramètres de votre navigateur.",
    },
    generating: {
      title: 'Accrochez-vous, on préchauffe la machine à remonter le temps !',
      subtitle: "Fait avec ❤️ par fmedery grâce à Google AI Studio",
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
      disclaimer: "Vos photos sont traitées instantanément, ne sont jamais stockées nulle part (y compris sur nos serveurs ou ceux de Google), et ne sont jamais utilisées pour l'entraînement.",
    },
    error: {
        title: 'Un Bug dans la Ligne Temporelle!',
        defaultMessage: 'Une erreur est survenue lors de la génération de vos images.',
        tryAgainButton: 'Réessayer'
    }
  },
};

export const PROMPT = "Please generate a photograph of the persons in this image, reimagining them as if they were living in the {DECADE}. This should be a portrait shot, showing them from the waist up or closer, but ensuring it is not a full-body view. It is important to style them with the distinct fashion and a characteristic hairstyle from that specific era. Do not hesitate to use well-known and even cliché visual elements from the {DECADE} to make it recognizable. The final image must look like a clear, authentic photograph from that time, capturing the era's signature atmosphere, color palette, and film quality.";
export const PROMPT_2020 = "Please generate a photograph of the persons in this image, reimagining them as if they were living in the 2020. This should be a portrait shot, showing them from the waist up or closer, but ensuring it is not a full-body view. They are taking a selfie, and we can see the phone in the shot, with them looking at the phone screen. It is important to style them with the distinct fashion and a characteristic hairstyle from that specific era. Do not hesitate to use well-known and even cliché visual elements from the 2020 to make it recognizable. The final image must look like a clear, authentic photograph from that time, capturing the era's signature atmosphere, color palette, and film quality.";