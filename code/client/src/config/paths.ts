/**
 * Configuration des chemins de l'application
 * Utilisé par vite.config.ts et tsconfig.app.json
 */

import path from 'path';

const ROOT_DIR = path.resolve(__dirname, '..');

export const paths = {
    src: ROOT_DIR,
    components: path.resolve(ROOT_DIR, 'components'),
    pages: path.resolve(ROOT_DIR, 'pages'),
    services: path.resolve(ROOT_DIR, 'services'),
    utils: path.resolve(ROOT_DIR, 'utils'),
    styles: path.resolve(ROOT_DIR, 'styles'),
    assets: path.resolve(ROOT_DIR, 'assets'),
} as const;
