import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://suman-cha.github.io',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
