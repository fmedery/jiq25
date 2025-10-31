<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/2

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Google Cloud Run

**Prerequisites:**

*   [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
*   [Docker](https://docs.docker.com/get-docker/)

**Steps:**

1.  **Authenticate with Google Cloud:**
    `gcloud auth login`
2.  **Configure Docker:**
    `gcloud auth configure-docker`
3.  **Build the Docker image:**
    `docker build -t gcr.io/[PROJECT-ID]/[IMAGE-NAME] --build-arg GEMINI_API_KEY=[YOUR-API-KEY] .`
4.  **Push the Docker image to Google Container Registry:**
    `docker push gcr.io/[PROJECT-ID]/[IMAGE-NAME]`
5.  **Deploy to Google Cloud Run:**
    `gcloud run deploy [SERVICE-NAME] --image gcr.io/[PROJECT-ID]/[IMAGE-NAME] --platform managed --region [REGION] --allow-unauthenticated`

Replace `[PROJECT-ID]`, `[IMAGE-NAME]`, `[YOUR-API-KEY]`, `[SERVICE-NAME]`, and `[REGION]` with your own values.
