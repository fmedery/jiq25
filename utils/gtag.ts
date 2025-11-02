export const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

const isProduction = process.env.NODE_ENV === 'production';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  if (!isProduction) {
    return;
  }
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: { action: string; category: string; label: string; value: number }) => {
  if (!isProduction) {
    return;
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};