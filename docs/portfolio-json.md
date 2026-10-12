# Ajouter un projet GitHub au portfolio

**Règle unique : un dépôt public qui contient un fichier `portfolio.json` à sa racine
apparaît dans la section Projets du portfolio.**

Le script `scripts/fetch-github-projects.mjs` vérifie tous les dépôts publics à chaque build.

## 1. Ajouter un projet

1. Dans le dépôt du projet (pas dans le portfolio), créer un fichier `portfolio.json`
   **à la racine** (au même niveau que le README).
2. Le pousser sur la branche principale du dépôt (`main` ou `master`).
3. Le projet apparaît au prochain déploiement du portfolio :
   - automatiquement chaque jour (vers 7 h, heure de Paris) ;
   - ou tout de suite : dépôt `Portfolio2` → onglet **Actions** →
     **Rebuild quotidien Netlify** → **Run workflow**
     (ou, sur Netlify : **Deploys** → **Trigger deploy**).

Pour retirer un projet : supprimer son `portfolio.json`.

Ne sont jamais ajoutés : les dépôts privés, les forks, les dépôts archivés,
et ceux déjà décrits à la main dans `src/data/projects.ts` (pas de doublon).

## 2. Contenu de `portfolio.json`

Tous les champs sont optionnels. Un fichier vide `{}` suffit pour afficher le projet :
les champs manquants reprennent les infos du dépôt GitHub.

| Champ | Type | Où il s'affiche | Si absent |
|---|---|---|---|
| `titleFr` / `titleEn` | texte | titre de la carte et de la page | nom du dépôt |
| `descriptionFr` / `descriptionEn` | texte | résumé court (carte + haut de la fiche) | *Description* du dépôt |
| `longDescriptionFr` / `longDescriptionEn` | texte ou liste de paragraphes | onglet « Détails » | résumé court |
| `featuresFr` / `featuresEn` | liste | « Principales fonctionnalités » | section masquée |
| `challengesFr` / `challengesEn` | liste | « Défis et solutions » | section masquée |
| `tech` | liste | badges des technologies | langage + topics du dépôt |
| `image` | chemin ou URL | image de la carte | aperçu généré par GitHub |
| `gallery` | liste de chemins ou URL | onglet « Médias » | section masquée |
| `liveUrl` | URL | bouton « Voir le site » | champ *Website* du dépôt |
| `liveNoteFr` / `liveNoteEn` | texte | petite note sous les liens | — |

Les chemins d'images sont **relatifs à la racine du dépôt** (ex. `docs/capture1.png`) :
les images doivent donc être poussées dans le dépôt. Une URL complète (`https://…`) fonctionne aussi.

Si le fichier contient une erreur de syntaxe JSON, le projet s'affiche quand même
avec les infos GitHub, et le build affiche un avertissement.

### Exemple complet

```json
{
  "titleFr": "PigeManager",
  "titleEn": "PigeManager",
  "descriptionFr": "Application de gestion des piges avec suivi des paiements.",
  "descriptionEn": "Freelance assignment manager with payment tracking.",
  "longDescriptionFr": [
    "PigeManager centralise les missions, les factures et les paiements.",
    "L'application est développée en React/TypeScript avec une API Node.js."
  ],
  "longDescriptionEn": [
    "PigeManager centralizes assignments, invoices and payments.",
    "The app is built with React/TypeScript and a Node.js API."
  ],
  "featuresFr": ["Tableau de bord des missions", "Suivi des paiements", "Export PDF"],
  "featuresEn": ["Assignments dashboard", "Payment tracking", "PDF export"],
  "challengesFr": ["Gérer les statuts de paiement sans incohérence"],
  "challengesEn": ["Keeping payment statuses consistent"],
  "tech": ["React", "TypeScript", "Node.js", "PostgreSQL"],
  "image": "docs/cover.png",
  "gallery": ["docs/capture1.png", "docs/capture2.png"],
  "liveUrl": "https://pigemanager.example.com"
}
```

Le texte de l'exemple est fictif : remplacer par la vraie description du projet.

## 3. Vérifier avant de publier

Dans le dossier du portfolio :

```bash
npm run github:projects
```

Le script liste les dépôts trouvés avec un `portfolio.json`.
