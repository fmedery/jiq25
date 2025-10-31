# AGENTS.md (code mode)

This file provides guidance to agents when writing code in this repository.

## Code Style & Conventions

-   A path alias `@` is configured to resolve to the project root (`.`). This should be used for imports.
-   All UI text is managed in [`constants/locales.ts`](constants/locales.ts) for internationalization. New text should be added there.

## Architecture

-   The application interacts with the Google Gemini API through [`services/geminiService.ts`](services/geminiService.ts). Note that a new `GoogleGenAI` instance is created for each API call.
-   Custom image manipulation logic, including generating a contact sheet, is located in [`utils/imageUtils.ts`](utils/imageUtils.ts).