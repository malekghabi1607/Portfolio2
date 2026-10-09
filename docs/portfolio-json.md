# Ajouter un projet GitHub au portfolio

Les dépôts publics qui portent le topic **`portfolio`** sont ajoutés automatiquement
à la section Projets (script `scripts/fetch-github-projects.mjs`, lancé à chaque build).

## 1. Afficher un dépôt

1. Sur la page GitHub du dépôt, cliquer sur l'engrenage ⚙️ à côté de **About**.
2. Dans **Topics**, ajouter `portfolio`, puis **Save changes**.
3. Le projet apparaît au prochain déploiement :
   - automatiquement chaque jour (vers 7 h, heure de Paris) ;
   - ou tout de suite : onglet **Actions** du dépôt `Portfolio2` →
     **Deploy Vite Portfolio to GitHub Pages** → **Run workflow**.

Pour retirer un projet : enlever le topic `portfolio`.

Sans autre fichier, la carte est **simple** (badge « Depuis GitHub ») :

| Ce qui s'affiche | D'où ça vient sur GitHub |
|---|---|
| Titre | nom du dépôt |
| Description | champ *Description* du dépôt (même texte en FR et en EN) |
| Technologies | langage principal + autres topics du dépôt |
| Image | aperçu généré automatiquement par GitHub |
| Lien « Voir le site » | champ *Website* du dépôt |

Les dépôts déjà décrits à la main dans `src/data/projects.ts` ne sont jamais ajoutés en double.

## 2. Enrichir la fiche avec `portfolio.json` (optionnel)

Créer un fichier `portfolio.json` **à la racine du dépôt du projet** (pas dans le portfolio).
Tous les champs sont optionnels : ceux qui manquent reprennent les infos GitHub ci-dessus.

| Champ | Type | Rôle |
|---|---|---|
| `titleFr` / `titleEn` | texte | titre affiché en français / anglais |
| `descriptionFr` / `descriptionEn` | texte | résumé court (carte + haut de la fiche) |
| `longDescriptionFr` / `longDescriptionEn` | texte ou liste de paragraphes | onglet « Détails » |
| `featuresFr` / `featuresEn` | liste | « Principales fonctionnalités » |
| `challengesFr` / `challengesEn` | liste | « Défis et solutions » |
| `tech` | liste | technologies (remplace langage + topics) |
| `image` | chemin ou URL | image principale de la carte |
| `gallery` | liste de chemins ou URL | captures de l'onglet « Médias » |
| `liveUrl` | URL | lien « Voir le site » (remplace le champ *Website*) |
| `liveNoteFr` / `liveNoteEn` | texte | petite note sous les liens (ex. accès restreint) |

Les chemins d'images sont **relatifs à la racine du dépôt** (ex. `docs/capture1.png`) :
les images doivent donc être poussées dans le dépôt. Une URL complète (`https://…`) fonctionne aussi.

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

### Vérifier avant de publier

Dans le dossier du portfolio :

```bash
npm run github:projects
```

Le script liste les dépôts trouvés et indique pour chacun `(portfolio.json)` ou `(fiche simple)`.
Un `portfolio.json` mal formé est ignoré avec un avertissement (le projet s'affiche en fiche simple).
