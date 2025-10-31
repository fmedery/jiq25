export enum AppStep {
  LANDING,
  CAMERA,
  GENERATING,
  RESULTS,
}

export interface GeneratedImage {
  decade: number;
  src: string;
}

export type Language = 'en' | 'fr';

export interface LocaleStrings {
  landing: {
    title: string;
    description: string;
    ctaButton: string;
    disclaimer: string;
  };
  camera: {
    title: string;
    captureButton: string;
    cancelButton: string;
    unsupported: string;
  };
  generating: {
    title: string;
    subtitle: string;
    progress: (current: number, total: number) => string;
    messages: string[];
  };
  results: {
    title: string;
    contactSheetTitle: string;
    contactSheetSubtitle: string;
    downloadAllButton: string;
    startOverButton: string;
    downloadTooltip: string;
    disclaimer: string;
  };
  error: {
    title: string;
    defaultMessage: string;
    tryAgainButton: string;
  }
}