/**
 * Après le build : crée une copie de dist/index.html pour chaque page projet
 * (dist/project/<id>/index.html) et un dist/404.html.
 *
 * Ainsi, un lien direct ou un rafraîchissement sur /project/<id> renvoie une vraie
 * page (HTTP 200) sur n'importe quel hébergeur statique, sans règle de redirection.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const indexHtml = resolve(dist, 'index.html');

// Identifiants des projets : écrits à la main + générés depuis GitHub
const sources = ['src/data/projects.ts', 'src/data/githubProjects.generated.ts']
  .map((f) => resolve(root, f))
  .filter(existsSync)
  .map((f) => readFileSync(f, 'utf8'));
const ids = [
  ...new Set(sources.flatMap((s) => [...s.matchAll(/^\s*"?id"?\s*:\s*['"]([^'"]+)['"]/gm)].map((m) => m[1]))),
];

for (const id of ids) {
  const dir = resolve(dist, 'project', id);
  mkdirSync(dir, { recursive: true });
  copyFileSync(indexHtml, resolve(dir, 'index.html'));
}
// Toute autre URL inconnue : l'application affiche sa propre page (Netlify sert 404.html)
copyFileSync(indexHtml, resolve(dist, '404.html'));

console.log(`✓ Pages projets : ${ids.length} page(s) générée(s) dans dist/project/, plus dist/404.html.`);
