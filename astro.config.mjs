// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkHtml from 'remark-html';
import remarkImages from 'remark-images';

export default defineConfig({
    site: 'https://amadorlopezdev.github.io',
    integrations: [
        tailwind(),
        sitemap({
            filter: (page) => !page.includes('/blog/page/'),
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date()
        })
    ],
    markdown: {
        remarkPlugins: [
            [remarkImages, {className: 'responsive-image'}],
            remarkHtml,
        ]
    },
});
