# Past Forward

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
2.  Create a `.env` file in the root of the project and add your Gemini API key:
    ```bash
    GEMINI_API_KEY=your-api-key
    ```
3.  Run the app:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Deployment

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
