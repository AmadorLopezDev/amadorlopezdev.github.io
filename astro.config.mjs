// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    site: 'https://amadorlopezdev.github.io',
    integrations: [tailwind()]
});
