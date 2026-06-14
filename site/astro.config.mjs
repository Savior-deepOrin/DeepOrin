import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served from the custom domain deeporin.io at the site root.
export default defineConfig({
  site: 'https://deeporin.io',
  build: { assets: 'static' },
  integrations: [sitemap()],
});
