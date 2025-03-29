# 🧪 Rick & Morty Pedia

Une application React en TypeScript permettant d’explorer l’univers de **Rick & Morty**

---

## Fonctions principales

- 🔍 **Recherche de personnages** par nom
- 🧬 **Filtres dynamiques** : statut, genre, espèce
- 📄 **Fiche personnage détaillée**
- 📱 **Responsive** mobile / desktop
- ⏩ **Pagination fluide**
- 🌀 **Animations Lottie** & transitions `framer-motion`
- 🎁 **Easter Egg** animé (indice : clique sur le logo 5 fois)
- 🧭 **Navigation SPA** avec React Router
- 💚 **Effets visuels 3D & UI organique**

---

## Stack technique

- **React** + **TypeScript**
- **TailwindCSS** pour le design
- **Framer Motion** pour les animations fluides
- **@lottiefiles/dotlottie-react** pour les animations vectorielles
- **Vite**
- **React Router** pour la navigation
- **Rick & Morty REST API**

---

## Installation

```

git clone https://github.com/asari13ish/rick-morty-app.git
cd rick-morty-app
npm install
npm run dev

```

L’app tourne ensuite sur http://localhost:5173 par défaut.

## Build pour la production

`npm run build`

## Structure

- src/components/ → Composants UI

- public/ → Assets statiques (masque SVG, logo, manifest, etc)

## Bonus UX

Lottie intro au lancement (désactivée après une fois)

Filtres contextuels + gestion de clic en dehors

Animation “portail” pour l’Easter Egg

Adapté mobile avec navigation tactile fluide

## PWA ready

L’app est préparée pour un déploiement PWA (manifest, icône, thème couleur, etc).
