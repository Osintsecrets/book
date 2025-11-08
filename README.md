<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1F4Ee4pTpqO0UHktwNsgGVT3aoffGXBgP

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This project is configured to build as a static site that can be served from any sub-path, which makes it compatible with GitHub Pages.

1. Build the production bundle:
   `npm run build`
2. Deploy the contents of the generated `dist` directory to the `gh-pages` branch (or use GitHub Actions).

If you need to override the default relative asset paths (for example when hosting behind a custom reverse proxy), set `VITE_BASE_URL` before running the build:

```bash
VITE_BASE_URL=/custom-base/ npm run build
```
