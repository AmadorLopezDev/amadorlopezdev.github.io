export function getSortedPosts() {
    const postsImport = Object.values(import.meta.glob("../pages/blog/*.md", { eager: true }));
  
    const posts = Object.values(postsImport).map((post) => {
      return ({
        ...post.frontmatter,
        url: post.url || '/',
      });
    });
  
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
    return posts;
  }
  
export function getPaginatedPosts(posts, currentPage, postsPerPage) {
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = posts.slice(start, end);
  
    return { paginatedPosts, totalPages };
}