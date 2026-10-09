/**
 * Récupère les dépôts GitHub marqués du topic « portfolio » et génère
 * src/data/githubProjects.generated.ts, fusionné avec les projets de projects.ts.
 *
 * Pour chaque dépôt, un fichier portfolio.json (optionnel) à la racine permet
 * d'enrichir la fiche : textes FR/EN, captures, fonctionnalités… (voir docs/portfolio-json.md).
 *
 * Le script ne fait jamais échouer le build : en cas d'erreur réseau, il garde
 * le dernier fichier généré (ou en crée un vide).
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const GITHUB_USER = 'malekghabi1607';
const TOPIC = 'portfolio';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = resolve(root, 'src/data/githubProjects.generated.ts');
const curatedFile = resolve(root, 'src/data/projects.ts');

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': `${GITHUB_USER}-portfolio-build`,
  // En CI, GITHUB_TOKEN relève la limite de l'API (60 → 1000 requêtes/heure)
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

function writeOutput(projects) {
  const body = `// Fichier généré par scripts/fetch-github-projects.mjs — ne pas modifier à la main.
import type { Project } from './projects';

export const githubProjects: Project[] = ${JSON.stringify(projects, null, 2)};
`;
  writeFileSync(outputFile, body);
}

// Dépôts déjà présents dans projects.ts (fiches écrites à la main) : on ne les duplique pas
function curatedRepoUrls() {
  const source = readFileSync(curatedFile, 'utf8');
  return new Set(
    [...source.matchAll(/githubUrl:\s*['"]([^'"]+)['"]/g)].map((m) => m[1].toLowerCase().replace(/\/$/, ''))
  );
}

const asString = (value) => (typeof value === 'string' && value.trim() ? value.trim() : undefined);
const asStringList = (value) =>
  Array.isArray(value) ? value.filter((v) => typeof v === 'string' && v.trim()).map((v) => v.trim()) : undefined;
const asText = (value) => asStringList(value) ?? asString(value);

async function readPortfolioJson(repo) {
  const url = `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/portfolio.json`;
  const response = await fetch(url, { headers: { 'User-Agent': headers['User-Agent'] } });
  if (response.status === 404) return {};
  if (!response.ok) throw new Error(`${url} → HTTP ${response.status}`);
  try {
    return await response.json();
  } catch {
    console.warn(`⚠️  ${repo.name}/portfolio.json n'est pas un JSON valide : il est ignoré.`);
    return {};
  }
}

// Chemin d'image relatif au dépôt → URL publique ; URL complète → inchangée
function imageUrl(repo, path) {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  return `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/${path.replace(/^\.?\//, '')}`;
}

function toProject(repo, meta) {
  const ghDescription = asString(repo.description) ?? '';
  const descriptionFr =
    asString(meta.descriptionFr) ?? asString(meta.descriptionEn) ?? (ghDescription || 'Projet publié sur GitHub.');
  const descriptionEn =
    asString(meta.descriptionEn) ?? asString(meta.descriptionFr) ?? (ghDescription || 'Project published on GitHub.');
  const topics = (repo.topics ?? []).filter((t) => t !== TOPIC);
  const tech = asStringList(meta.tech) ?? [...new Set([repo.language, ...topics].filter(Boolean))];

  return {
    id: `gh-${repo.name.toLowerCase()}`,
    title: asString(meta.titleFr) ?? asString(meta.title) ?? repo.name,
    titleEn: asString(meta.titleEn) ?? asString(meta.title) ?? repo.name,
    descriptionFr,
    descriptionEn,
    longDescriptionFr: asText(meta.longDescriptionFr),
    longDescriptionEn: asText(meta.longDescriptionEn),
    featuresFr: asStringList(meta.featuresFr),
    featuresEn: asStringList(meta.featuresEn),
    challengesFr: asStringList(meta.challengesFr),
    challengesEn: asStringList(meta.challengesEn),
    tech,
    // Sans image fournie : aperçu généré automatiquement par GitHub
    image: imageUrl(repo, asString(meta.image)) ?? `https://opengraph.githubassets.com/1/${repo.full_name}`,
    galleryImages: asStringList(meta.gallery)?.map((p) => imageUrl(repo, p)),
    githubUrl: repo.html_url,
    liveUrl: asString(meta.liveUrl) ?? asString(repo.homepage),
    liveNoteFr: asString(meta.liveNoteFr),
    liveNoteEn: asString(meta.liveNoteEn),
    source: 'github',
    // Fiche « simple » (badge Depuis GitHub) si aucun portfolio.json
    hasPortfolioJson: Object.keys(meta).length > 0,
    updatedAt: repo.pushed_at,
  };
}

async function main() {
  const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`, { headers });
  if (!response.ok) throw new Error(`API GitHub → HTTP ${response.status}`);
  const repos = await response.json();

  const curated = curatedRepoUrls();
  const selected = repos.filter(
    (r) => !r.fork && !r.archived && (r.topics ?? []).includes(TOPIC) && !curated.has(r.html_url.toLowerCase())
  );

  const projects = [];
  for (const repo of selected) {
    projects.push(toProject(repo, await readPortfolioJson(repo)));
  }
  // Du plus récent au plus ancien
  projects.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  // Supprime les champs vides pour garder le fichier généré lisible
  const clean = projects.map((p) => Object.fromEntries(Object.entries(p).filter(([, v]) => v !== undefined)));
  writeOutput(clean);
  console.log(`✓ Projets GitHub : ${clean.length} dépôt(s) avec le topic « ${TOPIC} » ajouté(s) au portfolio.`);
  for (const p of clean) console.log(`   - ${p.titleEn}${p.hasPortfolioJson ? ' (portfolio.json)' : ' (fiche simple)'}`);
}

main().catch((err) => {
  if (existsSync(outputFile)) {
    console.warn(`⚠️  Projets GitHub non mis à jour (${err.message}) : le dernier fichier généré est conservé.`);
  } else {
    console.warn(`⚠️  Projets GitHub indisponibles (${err.message}) : aucun projet GitHub ajouté.`);
    writeOutput([]);
  }
});
