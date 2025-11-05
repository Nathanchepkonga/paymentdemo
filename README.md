# VukaPay Demo

Frontend-only payment demo built with React, Vite and Tailwind CSS.

Features
- Country selection (Kenya default)
- Provider selection per country
- Payment form (amount + phone)
- Mock processing (2.5s delay) and guaranteed SUCCESS response
- Success screen with transaction details and confetti
- Saves last transaction to localStorage

Quick start
1. Install dependencies

```powershell
npm install
```

2. Start development server

```powershell
npm run dev
```

Build

```powershell
npm run build
npm run preview
```

Deploy
- Push to GitHub and deploy with Vercel / Netlify (standard Vite static deploy).

Notes
- This is a frontend-only demo — no real transactions are executed.
- Provider logo URLs are public images and placeholders where necessary.
