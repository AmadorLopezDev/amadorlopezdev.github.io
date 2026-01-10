document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle (nuevo Header)
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function () {
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';

      mobileMenu.classList.toggle('hidden');
      mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));
    });
  }

  // Legacy menu support (por si acaso)
  const menuButton = document.getElementById('menu-button');
  const menu = document.getElementById('menu');

  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      menu.classList.toggle('hidden');
    });
  }
});
