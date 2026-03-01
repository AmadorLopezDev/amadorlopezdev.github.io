import type { Post, PaginatedPosts, RawPostFrontmatter, IsoDateString } from '../types/Post';

const ISO_DATE_SEPARATOR = 'T';
const FALLBACK_POST_URL = '/';

interface PostModule {
  frontmatter: RawPostFrontmatter;
  url?: string;
}

function toIsoDateString(raw: string | Date): IsoDateString {
  const isoFull = new Date(raw).toISOString();
  return isoFull.split(ISO_DATE_SEPARATOR)[0] as IsoDateString;
}

function byDateDescThenTitleAsc(postA: Post, postB: Post): number {
  const dateDiff = new Date(postB.date).getTime() - new Date(postA.date).getTime();
  if (dateDiff !== 0) return dateDiff;
  return postA.title.localeCompare(postB.title);
}

function loadPostModules(): PostModule[] {
  return Object.values(
    import.meta.glob<PostModule>("../pages/blog/*.md", { eager: true })
  );
}

function toPost(module: PostModule): Post {
  return {
    ...module.frontmatter,
    date: toIsoDateString(module.frontmatter.date),
    url: module.url ?? FALLBACK_POST_URL,
  };
}

export function getSortedPosts(): Readonly<Post[]> {
  const posts = loadPostModules().map(toPost);
  return [...posts].sort(byDateDescThenTitleAsc);
}

export function getPaginatedPosts(
  posts: Readonly<Post[]>,
  currentPage: number,
  postsPerPage: number
): PaginatedPosts {
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = [...posts].slice(start, end);

  return { paginatedPosts, totalPages };
}
