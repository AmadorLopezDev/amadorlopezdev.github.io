document.addEventListener('DOMContentLoaded', () => {
  let currentPage = 1;
  const blogContainer = document.querySelector('#blog-container');
  const loadMoreButton = document.querySelector('#load-more-button');
  const totalPages = parseInt(loadMoreButton.getAttribute('data-total-pages'), 10);

  const loadMorePosts = async () => {
    currentPage++;
    loadMoreButton.disabled = true;
    loadMoreButton.textContent = 'Cargando...';

    const response = await fetch(`/blog/page/${currentPage}`);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const newPosts = doc.querySelector('#blog-container').innerHTML;

    blogContainer.insertAdjacentHTML('beforeend', newPosts);
    loadMoreButton.disabled = false;
    loadMoreButton.textContent = 'Cargar más';

    if (currentPage >= totalPages) {
      loadMoreButton.style.display = 'none';
    }
  };

  loadMoreButton.addEventListener('click', loadMorePosts);
});