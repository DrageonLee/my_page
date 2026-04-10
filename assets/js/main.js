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

  // ── 2. Phase Tab Navigation ────────────────────────────────
  const phaseTabs = document.getElementById('phaseTabs');

  function showPhasePanel(phase) {
    // Hide all panels
    document.querySelectorAll('.phase-panel').forEach(p => p.classList.remove('active'));
    // Show selected
    const panel = document.getElementById(`phase-${phase}`);
    if (!panel) return;
    panel.classList.add('active');
    // Trigger stagger animations after display:block renders
    setTimeout(() => {
      panel.querySelectorAll('.stagger > *').forEach((card, i) => {
        card.classList.remove('visible');
        card.style.transitionDelay = `${i * 70}ms`;
        setTimeout(() => card.classList.add('visible'), 20);
      });
    }, 30);
  }

  if (phaseTabs) {
    phaseTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.phase-tab');
      if (!tab) return;
      phaseTabs.querySelectorAll('.phase-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      showPhasePanel(tab.dataset.phase);
    });

    // Show default panel immediately on load
    showPhasePanel('battery');
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
