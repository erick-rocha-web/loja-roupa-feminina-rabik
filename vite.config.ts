import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

// As fotografias ficam em assets/ (material original do kit) e são referenciadas
// pelos dados como caminhos relativos. No build, só as pastas usadas pelo site
// são copiadas para dist/; os PNG originais permanecem fora da publicação.
const copiedFolders = ['assets/editorial', 'assets/products', 'assets/details', 'assets/brand', 'licenses'];

// Cópia manual: fs.cpSync encerra o processo sem erro em caminhos com acento no Windows (Node 24).
function copyDir(from: string, to: string) {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    const source = join(from, entry.name);
    const target = join(to, entry.name);
    if (entry.isDirectory()) copyDir(source, target);
    else copyFileSync(source, target);
  }
}

function copySiteAssets(): Plugin {
  return {
    name: 'veria-copy-assets',
    apply: 'build',
    closeBundle() {
      for (const folder of copiedFolders) copyDir(resolve(folder), resolve('dist', folder));
    },
  };
}

export default defineConfig({
  base: './',
  publicDir: false,
  build: {
    assetsDir: 'static',
    target: 'es2022',
  },
  plugins: [copySiteAssets()],
});
