import type { Post, PaginatedPosts } from '../types/Post';

interface PostModule {
  frontmatter: Omit<Post, 'url'>;
  url?: string;
}

export function getSortedPosts(): Post[] {
  const postsImport = Object.values(
    import.meta.glob<PostModule>("../pages/blog/*.md", { eager: true })
  );

  const posts: Post[] = postsImport.map((post) => ({
    ...post.frontmatter,
    url: post.url || '/',
  }));

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPaginatedPosts(
  posts: Post[],
  currentPage: number,
  postsPerPage: number
): PaginatedPosts {
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = posts.slice(start, end);

  return { paginatedPosts, totalPages };
}
