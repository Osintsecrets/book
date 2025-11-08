# Privacy Self-Audit

A private-by-design progressive web application that helps you map, analyse, and reduce your public digital footprint entirely on your own device. Built with React, TypeScript, Tailwind CSS, and Vite. All data lives in the browser via localStorage—no accounts, servers, or tracking.

## Features

- 🔐 **Local-first:** Answers, risk scores, and mitigation progress never leave your browser.
- 🧭 **Guided audit wizard:** Step-by-step questions covering identity, location, work, relationships, media, habits, and platform exposure.
- 📊 **Risk intelligence:** Deterministic client-side rules translate your answers into category scores and triggers.
- 🛡️ **Mitigation playbook:** Personalised suggestions mapped to risk categories with completion tracking.
- 📆 **Long-term safety:** Habit reminders and optional local self-check date.
- 📄 **Offline-ready reports:** Generate Markdown or JSON summaries for export without uploading anything.
- 🌍 **Bilingual UI:** English and Hebrew (RTL) interface with one-tap language toggle.
- 📱 **Installable PWA:** Works offline after first load and can be installed to desktop or mobile.

## Getting started

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or newer

### Install dependencies
```bash
npm install
```

> ℹ️ If installing packages is blocked in your environment, you can still review the source. Run the command once you have registry access.

### Run the development server
```bash
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Build for production
```bash
npm run build
```
Outputs a static bundle in the `dist/` folder that can be served from any static hosting provider.

### Preview the production build
```bash
npm run preview
```

## PWA notes
- `public/manifest.webmanifest` defines the install experience and icons.
- `public/sw.js` implements a cache-first service worker suitable for static hosting.
- The app registers the service worker in `src/main.tsx` after the window load event.

## Local storage keys
- `psa_locale`
- `psa_theme`
- `psa_answers`
- `psa_wizard_step`
- `psa_reduce_progress`
- `psa_next_check`

Deleting data from **Settings & Trust** clears every key above.

## License
This project is provided as-is without any additional license terms beyond those already present in the repository.
