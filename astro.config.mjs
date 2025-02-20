// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://amadorlopezdev.github.io',
    integrations: [tailwind()]
});
