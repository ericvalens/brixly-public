# Brixly

A small, presentation-ready walkthrough of Brixly, the quality-standard workspace for juice blending. It keeps the main screens: a batch calculator, an ingredient list, and three example views of results, a floor dashboard, and a batch summary.

Every figure in the app is **demo data**. The numbers are hardcoded placeholders for a walkthrough. They are sample labels, and they stay the same no matter what you type.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm install
npm run build
npm start
```

## Deploy

Import the repository in Vercel and name the project `brixly`. Leave the framework, install command, and build command on their defaults. Vercel detects Next.js, installs from the lockfile, and runs `npm run build`. No environment variables are required.

## Pages

| Path | What it shows |
| --- | --- |
| `/` | Calculator walkthrough |
| `/ingredients` | Example ingredient list |
| `/demo/results` | Example blend results |
| `/demo/dashboard` | Example floor dashboard |
| `/demo/summary` | Example batch summary |
