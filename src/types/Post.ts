export type IsoDateString = string & { __brand: 'IsoDateString' };

export interface RawPostFrontmatter extends Omit<Post, 'url' | 'date'> {
  date: string | Date;
}

export interface Post {
  title: string;
  description: string;
  date: IsoDateString;
  tags?: string[];
  image?: string;
  url: string;
}

export interface PaginatedPosts {
  paginatedPosts: Post[];
  totalPages: number;
}
