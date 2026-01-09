// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkHtml from 'remark-html';
import remarkImages from 'remark-images';

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
