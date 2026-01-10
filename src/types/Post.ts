export interface Post {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  image?: string;
  url: string;
}

export interface PaginatedPosts {
  paginatedPosts: Post[];
  totalPages: number;
}
