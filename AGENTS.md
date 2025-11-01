# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Commands

-   `npm run dev`: Starts the Vite development server.
-   `npm run build`: Builds the application for production.
-   `npm run preview`: Serves the production build locally.
-   There are no linting or testing commands configured in `package.json`.

## Code Style & Conventions

-   The project uses TypeScript and React with Vite.
-   A path alias `@` is configured to resolve to the project root (`.`). This should be used for imports.
-   All UI text is managed in [`constants/locales.ts`](constants/locales.ts) for internationalization. New text should be added there.

## Architecture

-   The main application logic is in [`App.tsx`](App.tsx), which acts as a state machine to control the UI flow.
-   The application interacts with the Google Gemini API through [`services/geminiService.ts`](services/geminiService.ts). Note that a new `GoogleGenAI` instance is created for each API call.
-   Environment variable `GEMINI_API_KEY` is injected at build time via [`vite.config.ts`](vite.config.ts). It must be present in a `.env` file at the project root.
-   Custom image manipulation logic, including generating a contact sheet, is located in [`utils/imageUtils.ts`](utils/imageUtils.ts).
-   The Gemini model version is managed by the user and should not be changed.