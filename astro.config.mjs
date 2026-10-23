import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://suman-cha.github.io',
  integrations: [sitemap()],
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
