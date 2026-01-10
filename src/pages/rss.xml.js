import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  const posts = await pagesGlobToRssItems(import.meta.glob('./blog/*.md'));
  console.log(posts);
  return rss({
    title: 'Amador López Parra Blog',
    description: 'Un blog sobre desarrollo de software, tecnología y cosas varias.',
    site: context.site,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: post.date,
      link: `${post.link}/`,
    })),
    customData: `<language>es-es</language>`,
  });
}