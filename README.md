# Portfolio - Malek Ghabi

Portfolio personnel professionnel présentant mes compétences, projets, formation et expériences en développement informatique.

## 🎯 À propos

Ce portfolio a été conçu pour présenter mon parcours académique et professionnel dans le domaine de l'informatique. Il met en avant mes compétences techniques, mes projets réalisés, ma formation ainsi que mes expériences professionnelles.

Actuellement en double formation (Licence Informatique à Avignon et Bachelor en Sciences Informatiques à Genève), je recherche un stage de 2 mois pour mettre en pratique mes compétences et découvrir le monde professionnel.

## ✨ Fonctionnalités

- **Design moderne et responsive** : Interface adaptée à tous les appareils (mobile, tablette, desktop)
- **Mode sombre/clair** : Basculement entre thèmes pour une meilleure expérience utilisateur
- **Multilingue** : Support français et anglais
- **Animations fluides** : Transitions et animations pour une navigation agréable
- **Section projets** : Présentation détaillée de tous mes projets avec technologies utilisées
- **Formulaire de contact** : Envoi de messages via Supabase Edge Functions
- **Performance optimisée** : Chargement rapide et expérience utilisateur fluide

## 🛠 Technologies utilisées

### Frontend
- **React 18** : Bibliothèque JavaScript pour créer l'interface utilisateur
- **TypeScript** : Typage statique pour un code plus robuste
- **Vite** : Build tool moderne et rapide
- **Tailwind CSS** : Framework CSS utility-first pour le styling
- **React Router DOM** : Gestion du routing côté client
- **Lucide React** : Bibliothèque d'icônes modernes

### Backend & Services
- **Supabase** : Backend-as-a-Service pour la base de données et les fonctions
- **Supabase Edge Functions** : Fonctions serverless pour le traitement côté serveur
- **PostgreSQL** : Base de données relationnelle (via Supabase)

### Outils de développement
- **ESLint** : Linter pour maintenir la qualité du code
- **PostCSS** : Transformation CSS
- **Autoprefixer** : Ajout automatique des préfixes CSS

## 📁 Structure du projet

```
project/
├── public/                          # Fichiers statiques
│   └── images/                      # Images (projets, skills, etc.)
│       ├── projects/                # Images des projets
│       └── skills/                  # Logos des technologies
├── src/                             # Code source
│   ├── components/                  # Composants réutilisables
│   │   ├── BackgroundAnimation.tsx  # Animation d'arrière-plan
│   │   ├── Section.tsx              # Wrapper de section
│   │   ├── SkillCard.tsx            # Carte de compétence
│   │   ├── SkillsSection.tsx        # Section complète des compétences
│   │   └── WelcomeSplash.tsx        # écran de bienvenue
│   ├── data/                        # Données statiques structurées
│   │   ├── projects.ts              # Données des projets
│   │   ├── education.ts             # Données de formation
│   │   ├── experiences.ts           # Données des expériences
│   │   └── skills.ts                # Données des compétences
│   ├── hooks/                       # Hooks React personnalisés
│   │   ├── useScrollAnimation.ts    # Animation au scroll
│   │   └── useTranslation.ts        # Gestion des traductions
│   ├── locales/                     # Fichiers de traduction
│   │   ├── fr.json                  # Traductions françaises
│   │   └── en.json                  # Traductions anglaises
│   ├── pages/                       # Pages de l'application
│   │   ├── HomePage.tsx             # Page d'accueil principale
│   │   └── ProjectDetailPage.tsx    # Page de détail d'un projet
│   ├── utils/                       # Utilitaires
│   │   └── emailService.ts          # Service d'envoi d'emails
│   ├── App.tsx                      # Composant principal
│   ├── main.tsx                     # Point d'entrée de l'application
│   └── index.css                    # Styles globaux
├── supabase/                        # Configuration Supabase
│   ├── functions/                   # Edge Functions
│   │   └── send-contact-email/      # Fonction d'envoi d'emails
│   └── migrations/                  # Migrations de base de données
├── .env                             # Variables d'environnement
├── package.json                     # Dépendances et scripts
├── tailwind.config.js               # Configuration Tailwind CSS
├── vite.config.ts                   # Configuration Vite
└── README.md                        # Ce fichier
```

## 🚀 Installation et démarrage

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn

### Installation

1. Cloner le dépôt
```bash
git clone https://github.com/malekghabi1607/Portfolio2.git
cd portfolio
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
Créer un fichier `.env` à la racine du projet avec les variables suivantes :
```
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase
```

4. Lancer le serveur de développement
```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173`

### Build pour la production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`

### Prévisualiser le build de production

```bash
npm run preview
```

## 📝 Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Crée un build de production
- `npm run preview` : Prévisualise le build de production
- `npm run lint` : Vérifie la qualité du code avec ESLint
- `npm run typecheck` : Vérifie les types TypeScript

## 🎨 Personnalisation

### Modifier les couleurs
Les couleurs principales sont définies dans `tailwind.config.js` et peuvent être personnalisées selon vos préférences.

### Ajouter des projets
Les projets sont définis dans `src/data/projects.ts`. Pour ajouter un nouveau projet :
1. Ajoutez l'image du projet dans `public/images/projects/`
2. Ajoutez les informations du projet dans le fichier `projects.ts`

### Modifier les traductions
Les traductions sont stockées dans `src/locales/`. Éditez `fr.json` pour le français et `en.json` pour l'anglais.

## 📧 Contact

Pour me contacter, vous pouvez utiliser le formulaire de contact sur le portfolio ou me joindre directement :

- **Email** : malekghabi.education@gmail.com
- **LinkedIn** : [malek-ghabi-3b3267a9](https://www.linkedin.com/in/malek-ghabi-3b3267a9/)
- **GitHub** : [malekghabi1607](https://github.com/malekghabi1607)
- **Téléphone** : +33 6 04 10 21 56

## 📄 Licence

© 2025 Malek Ghabi. Tous droits réservés.

---

Développé avec ❤️ par Malek Ghabi
