# Music Split Calculator

A simple public webpage for calculating music payout splits. It has no accounts, no database, and no saved history. Everything runs in the browser and resets on refresh.

## Features

- Song title and total payment input
- Add, edit, and remove contributors
- Contributor name, role, and percentage fields
- Automatic payout calculation
- Total percentage status:
  - below 100% warning
  - above 100% error
  - exact 100% success
- Clear calculator button
- Print Summary button using the browser print dialog
- Responsive landing-page design for phone and desktop

## Stack

- Next.js App Router
- React
- Tailwind CSS
- Lucide icons

## Setup

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). The homepage is the calculator.

## Deploy

The easiest deployment path is Vercel:

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Keep the default Next.js build settings.
4. Deploy.

The project does not require environment variables or backend services.

## Build

```bash
npm run lint
npm run build
```
