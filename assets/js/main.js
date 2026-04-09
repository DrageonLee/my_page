/* ============================================================
   DRAGEON LEE — Portfolio JS
   - Navbar scroll effect
   - Project tag filter
   - Scroll-triggered fade-in (IntersectionObserver)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Navbar scroll effect ────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  // ── 2. Tag Filter (index.html) ─────────────────────────────
  const filterBar   = document.getElementById('filterBar');
  const projectsGrid = document.getElementById('projectsGrid');

  if (filterBar && projectsGrid) {
    const cards = Array.from(projectsGrid.querySelectorAll('.project-card'));

    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      // Update active button
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const tags = (card.dataset.tags || '').split(' ');
        if (filter === 'all' || tags.includes(filter)) {
          card.classList.remove('hidden');
          // Re-trigger animation
          card.classList.remove('visible');
          requestAnimationFrame(() => card.classList.add('visible'));
        } else {
          card.classList.add('hidden');
        }
      });
    });
  }

  // ── 3. Scroll-triggered fade-in ────────────────────────────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
  );

  // Observe single fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Observe stagger children with delay
  document.querySelectorAll('.stagger').forEach(container => {
    const children = Array.from(container.children);
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 70}ms`;
      observer.observe(child);
    });
  });

  // Fallback: make everything visible after 400ms (handles cases where observer doesn't fire)
  setTimeout(() => {
    document.querySelectorAll('.fade-in, .stagger > *').forEach(el => {
      el.classList.add('visible');
    });
  }, 400);

  // ── 4. Mark active nav link ────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage ||
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html') ||
        (currentPage === 'about.html' && href === 'about.html')) {
      link.classList.add('active');
    }
  });

});
