# TimeStamp

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

This project is a web application that uses the Google Gemini API to generate images of a user in different decades. The user can take a selfie, and the application will generate images of them in the 1930s, 1950s, 1960s, 1970s, 1980s, and 2000s.

## Run Locally

**Prerequisites:**

*   Node.js
*   A Google Gemini API key

**Steps:**

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Create a `.env.local` file in the root of the project. See the "Environment Variables" section for the required content.
3.  Run the app:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Deployment

This application is designed to be deployed to Google Cloud Run using Google Cloud Build.

### Configuration

To deploy the application, you'll need to configure the following environment variables in your Google Cloud project:

*   **`_GEMINI_API_KEY`**: Your Google Gemini API key.
*   **`_GA_TRACKING_ID`**: Your Google Analytics GTAG ID.

These variables can be configured in the Google Cloud Build trigger settings.

### Cloud Build

The `cloudbuild.yaml` file is configured to use these variables and pass them to the Docker build. The `Dockerfile` then uses these variables to build the application with the correct configuration.

### Cloud Run

The `cloudbuild.yaml` file is also configured to deploy the application to Google Cloud Run. The service is named `demo-jiq-2025` and is deployed to the `us-central1` region.

### Development

To run the application in a development environment, use the following command:

```bash
npm run dev
```

This will start the Vite development server, and the application will be available at `http://localhost:3000`.

### Production

To run the application in a production environment, use the following command:

```bash
npm start
```

This will build the application for production and then serve the production build.

## Technologies Used

*   React
*   TypeScript
*   Vite
*   Tailwind CSS
*   Google Gemini API

## Environment Variables

This project requires a `.env.local` file in the root of the directory to store necessary credentials. This file should not be committed to version control.

Create the `.env.local` file and add the following content, replacing the placeholder values with your actual credentials:

```
# .env.local

# Required for image generation
GEMINI_API_KEY=your-gemini-api-key

# Required for usage tracking in production
GA_TRACKING_ID=your-gtag-id
```

## Google Analytics Integration

This project uses Google Analytics to track user engagement. Tracking is automatically enabled when the application is built for production (`npm run build`).

### Implementation Details

*   **`utils/gtag.ts`**: Contains the core logic for sending `pageview` and `event` data to Google Analytics.
*   **`vite.config.ts`**: Makes the `GA_TRACKING_ID` available to the application.
*   **`index.html`**: Includes the necessary Google Analytics script.
*   **`App.tsx`**: Initializes tracking and sends data based on user interaction.

### Environment-Specific Tracking

Tracking is disabled in the development environment (`npm run dev`) to prevent test data from polluting your analytics. This is handled automatically by checking Vite's `process.env.NODE_ENV` variable.
