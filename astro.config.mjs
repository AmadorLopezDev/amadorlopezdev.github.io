// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import dotenv from 'dotenv';
import remarkHtml from 'remark-html';
import remarkImages from 'remark-images';

dotenv.config();

export default defineConfig({
    site: 'https://amadorlopezdev.github.io',
    integrations: [tailwind()],
    markdown: {
        remarkPlugins: [
            [remarkImages, {className: 'responsive-image'}],
            remarkHtml,
        ]
    },
});
