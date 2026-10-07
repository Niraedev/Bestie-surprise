# ✨ Developer's World — Friend's Website

A cozy, magical, personalized website built with React + Vite + TailwindCSS + Framer Motion.

---

## 📁 Project Structure

```
src/
├── config/
│   └── config.ts          ← ⭐ EDIT THIS to customize the site
├── pages/
│   ├── LandingPage.tsx    ← Password lock screen
│   ├── WelcomePage.tsx    ← Animated welcome + typewriter
│   ├── ChoicePage.tsx     ← Main choice screen
│   ├── SecretPage.tsx     ← Runaway button + fake fetch joke
│   └── GamePage.tsx       ← Unwinnable quiz game
├── components/
│   ├── CharacterGuide.tsx ← Sketchfab 3D character + CSS fallback
│   ├── ParticleField.tsx  ← Canvas particle effects
│   ├── MagicButton.tsx    ← Reusable animated button
│   ├── Dialogue.tsx       ← Modal + inline dialogue components
│   └── ProgressBar.tsx    ← Animated progress bar
├── hooks/
│   ├── useTypewriter.ts   ← Typewriter text effect hook
│   └── useDialogue.ts     ← Character dialogue state hook
├── utils/
│   ├── animations.ts      ← Framer Motion reusable variants
│   └── helpers.ts         ← General utility functions
└── App.tsx                ← Router setup
```

---

## 🚀 Running Locally

```bash
npm install
npm run dev
# Visit: http://localhost:5173
```

---

## 🛠️ Customization

Open `src/config/config.ts` and edit:

```ts
export const config = {
  password: "your-password-here",
  hints: ["Hint 1", "Hint 2", ...],
  phoneNumber: "+91 XXXXX XXXXX",
  instagramId: "@your_id",
  snapchatId: "@your_id",
};
```

---

## 🌐 Deploying to Vercel (Free)

```bash
npm run build
# Upload the dist/ folder to vercel.com
```

---

## 🧱 Tech Stack

| Tool | Purpose |
|------|---------|
| React + Vite | Frontend framework |
| TypeScript | Type safety |
| TailwindCSS | Styling |
| Framer Motion | Animations |
| React Router | Page navigation |
