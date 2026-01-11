document.addEventListener('DOMContentLoaded', () => {
  let currentPage = 1;
  const blogContainer = document.querySelector('#blog-container');
  const loadMoreButton = document.querySelector('#load-more-button');

  if (!loadMoreButton) return;

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

    // Disparar evento para que el IntersectionObserver observe los nuevos elementos
    window.dispatchEvent(new Event('contentLoaded'));

    loadMoreButton.disabled = false;
    loadMoreButton.textContent = 'Cargar más artículos';

    if (currentPage >= totalPages) {
      loadMoreButton.style.display = 'none';
    }
  };

  loadMoreButton.addEventListener('click', loadMorePosts);
});