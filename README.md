# Alex — Portfolio 3D & Motion Design

Portfolio professionnel cinématique construit avec Next.js 14, TypeScript et Tailwind CSS.

## Démarrage rapide

```bash
npm install
npm run dev
```

Le site sera disponible sur [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
├── app/
│   ├── layout.tsx          # Layout principal + SEO + polices
│   ├── page.tsx            # Page d'accueil (hero + projets + footer)
│   └── globals.css         # Styles globaux (grain, curseur, animations)
├── components/
│   ├── Nav.tsx             # Navigation flottante
│   ├── VideoBackground.tsx # Vidéo en arrière-plan du hero
│   └── ProjectCard.tsx     # Carte projet avec vidéo au hover
├── public/
│   ├── videos/             # ← Mets tes vidéos ici
│   └── thumbs/             # ← Mets tes miniatures ici
└── package.json
```

## Comment ajouter tes vidéos

1. **Télécharge** tes vidéos depuis [SwissTransfer](https://www.swisstransfer.com/d/1dec70d8-7536-451f-8f7b-8b28b3be0949)
2. **Place** les fichiers vidéo dans le dossier `public/videos/`
3. **Place** les miniatures (images) dans le dossier `public/thumbs/`
4. **Modifie** le tableau `PROJECTS` en haut du fichier `app/page.tsx` :

```typescript
const PROJECTS = [
  {
    title: "Nom du projet",
    category: "3D Animation",
    videoUrl: "/videos/ton-fichier.mp4",
    thumbUrl: "/thumbs/ta-miniature.jpg",
    externalLink: "https://lien-vers-le-projet.com",
  },
  // ...
];
```

5. **Modifie** `HERO_VIDEO` pour la vidéo de fond du hero :

```typescript
const HERO_VIDEO = "/videos/ta-video-hero.mp4";
```

## Comment modifier les réseaux sociaux

Modifie l'objet `SOCIALS` dans `app/page.tsx` :

```typescript
const SOCIALS = {
  instagram: "https://instagram.com/ton-profil",
  linkedin: "https://linkedin.com/in/ton-profil",
  twitter: "https://x.com/ton-profil",
  email: "saiszer.pro@gmail.com",
};
```

## Déploiement sur Vercel

1. Pousse le projet sur un dépôt GitHub
2. Va sur [vercel.com](https://vercel.com) et importe le dépôt
3. Vercel détectera automatiquement Next.js — clique sur **Deploy**
4. C'est en ligne !

> **Note** : Les vidéos lourdes en `public/` augmentent la taille du déploiement. Pour de meilleures performances, envisage d'héberger les vidéos sur un CDN externe et utilise des liens directs dans le tableau `PROJECTS`.

## Stack technique

- **Next.js 14** — App Router
- **TypeScript**
- **Tailwind CSS**
- **Zéro dépendance externe** — Pas de librairie d'animation tierce

## Design

- Thème : Noir absolu `#0a0a0a` + accents dorés `#c9a84c`
- Polices : Cormorant Garamond (titres) + Space Mono (labels)
- Grain cinématique en overlay SVG
- Curseur custom avec effet de suivi
- Animations au scroll via Intersection Observer
