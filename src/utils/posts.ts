import type { Post, PaginatedPosts, RawPostFrontmatter, IsoDateString } from '../types/Post';

const ISO_DATE_SEPARATOR = 'T';
const FALLBACK_POST_URL = '/';
const DEFAULT_TIME = '00:00:00Z';

interface PostModule {
  frontmatter: RawPostFrontmatter;
  url?: string;
}

function toIsoDateTimeString(raw: string | Date): string {
  const date = new Date(raw);
  // Si el string original no tiene hora, añadir la hora por defecto
  if (typeof raw === 'string' && !raw.includes(ISO_DATE_SEPARATOR)) {
    // YYYY-MM-DD → YYYY-MM-DDT00:00:00Z
    return `${raw}${ISO_DATE_SEPARATOR}${DEFAULT_TIME}`;
  }
  // Si ya tiene hora, devolver el ISO completo
  return date.toISOString();
}

function byDateDescThenTitleAsc(postA: Post, postB: Post): number {
  const dateA = toIsoDateTimeString(postA.date);
  const dateB = toIsoDateTimeString(postB.date);
  const dateDiff = new Date(dateB).getTime() - new Date(dateA).getTime();
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
    date: module.frontmatter.date,
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
