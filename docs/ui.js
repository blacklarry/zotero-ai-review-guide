(() => {
  'use strict';

  const THEME_KEY = 'research-notes-theme';
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function syncMotionClass() {
    root.classList.toggle('motion', !reducedMotion.matches);
  }
  syncMotionClass();

  /* ---------- 1. 深浅主题切换 ---------- */
  function getSavedTheme() {
    try {
      const value = localStorage.getItem(THEME_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch {
      return null;
    }
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.dataset.theme = isDark ? 'dark' : 'light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? '#0f1311' : '#f7f5f0');
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      const label = isDark ? '切换到浅色模式' : '切换到深色模式';
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
      toggle.setAttribute('aria-pressed', String(isDark));
    }
  }

  applyTheme(getSavedTheme() || (systemDark.matches ? 'dark' : 'light'));

  systemDark.addEventListener('change', event => {
    if (!getSavedTheme()) applyTheme(event.matches ? 'dark' : 'light');
  });

  function toggleTheme(trigger) {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch { /* 忽略隐私模式限制 */ }

    if (reducedMotion.matches || typeof document.startViewTransition !== 'function') {
      applyTheme(next);
      return;
    }

    const rect = trigger?.getBoundingClientRect?.();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 34;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      applyTheme(next);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 560, easing: 'cubic-bezier(.22, 1, .36, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
  }

  document.addEventListener('click', event => {
    const toggle = event.target.closest('[data-theme-toggle]');
    if (toggle) toggleTheme(toggle);
  });

  /* ---------- 2. 顶栏滚动状态与阅读进度条 ---------- */
  let scrollFrame = 0;
  function updateScrollUI() {
    scrollFrame = 0;
    const header = document.querySelector('.header');
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);

    const bar = document.querySelector('.header-progress');
    if (!bar) return;
    const page = document.scrollingElement || document.documentElement;
    const scrollable = page.scrollHeight - window.innerHeight;
    if (scrollable > 120) {
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
      bar.style.setProperty('--progress', progress.toFixed(4));
      bar.style.setProperty('--progress-visible', window.scrollY > 24 ? '1' : '0');
    } else {
      bar.style.setProperty('--progress', '0');
      bar.style.setProperty('--progress-visible', '0');
    }
  }

  function scheduleScrollUI() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollUI);
  }

  window.addEventListener('scroll', scheduleScrollUI, { passive: true });
  window.addEventListener('resize', scheduleScrollUI);

  /* ---------- 3. 顶栏导航滑动胶囊 ---------- */
  function updateNavIndicator() {
    const nav = document.querySelector('.top-nav');
    const indicator = nav?.querySelector('.top-nav-indicator');
    if (!nav || !indicator) return;
    const active = nav.querySelector('a.active');
    if (!active || active.offsetWidth === 0) {
      indicator.style.setProperty('--o', '0');
      return;
    }
    indicator.style.setProperty('--x', `${active.offsetLeft}px`);
    indicator.style.setProperty('--w', `${active.offsetWidth}px`);
    indicator.style.setProperty('--o', '1');
  }

  window.addEventListener('resize', updateNavIndicator);

  /* ---------- 4. 卡片鼠标光晕追踪 ---------- */
  document.addEventListener('pointermove', event => {
    if (reducedMotion.matches || event.pointerType !== 'mouse') return;
    const card = event.target.closest('.entry-card, .resource-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${(event.clientX - rect.left).toFixed(1)}px`);
    card.style.setProperty('--my', `${(event.clientY - rect.top).toFixed(1)}px`);
  }, { passive: true });

  /* ---------- 5. 路由入场与滚动渐显 ---------- */
  let observer = null;
  let charAnimations = [];

  function cleanupMotion() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    charAnimations.forEach(anim => anim.cancel());
    charAnimations = [];
  }

  function settleAllReveals() {
    cleanupMotion();
    document.querySelectorAll('#app .reveal').forEach(el => {
      el.style.removeProperty('--d');
      el.classList.add('is-in');
    });
  }

  const REVEAL_SELECTOR = [
    '.breadcrumb',
    '.entry-intro',
    '.entry-card',
    '.entry-skip-area',
    '.hero-copy',
    '.hero-evidence',
    '.intro-strip',
    '.learning-row',
    '.home-update',
    '.prompt-banner',
    '.resource-teaser',
    '.page-intro',
    '.lesson-step',
    '.lesson-aside',
    '.worked-example',
    '.callout',
    '.prompt-box',
    '.lesson-checklist',
    '.lesson-navigation',
    '.prompt-toolbar',
    '.prompt-library-card',
    '.resource-group',
    '.source-link',
    '.faq',
    '.workbuddy-downloads',
    '.workbuddy-sources'
  ].join(',');

  function mountRoute(routeName, { animate = true } = {}) {
    cleanupMotion();
    const app = document.querySelector('#app');
    if (!app) return;
    app.classList.remove('is-leaving');

    updateNavIndicator();
    scheduleScrollUI();

    if (!animate || reducedMotion.matches) return;

    // 开始方式页标题逐字轻盈浮现
    if (routeName === 'start') {
      const title = app.querySelector('.entry-intro h1');
      if (title && typeof title.animate === 'function') {
        const text = title.textContent;
        title.setAttribute('aria-label', text);
        const chars = Array.from(text, ch => {
          const span = document.createElement('span');
          span.className = 'entry-title-character';
          span.setAttribute('aria-hidden', 'true');
          span.textContent = ch;
          return span;
        });
        title.replaceChildren(...chars);
        chars.forEach((span, idx) => {
          const anim = span.animate(
            [
              { opacity: 0, transform: 'translate3d(0, 18px, 0)' },
              { opacity: 1, transform: 'none' }
            ],
            { duration: 540, delay: 40 + idx * 24, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' }
          );
          charAnimations.push(anim);
        });
      }
    }

    // 只选取顶层块，避免嵌套元素双重渐显
    const rawTargets = [...app.querySelectorAll(REVEAL_SELECTOR)];
    const targets = rawTargets.filter(el => !el.parentElement?.closest(REVEAL_SELECTOR));
    if (!targets.length) return;

    const vh = window.innerHeight || 900;
    const inView = [];
    const belowFold = [];

    targets.forEach(el => {
      const rect = el.getBoundingClientRect();
      el.classList.add('reveal');
      if (rect.top < vh - 16) inView.push(el);
      else belowFold.push(el);
    });

    requestAnimationFrame(() => {
      inView.forEach((el, idx) => {
        el.style.setProperty('--d', `${Math.min(idx * 55, 360)}ms`);
        el.classList.add('is-in');
      });
    });

    if (belowFold.length && typeof IntersectionObserver === 'function') {
      observer = new IntersectionObserver(entries => {
        let batch = 0;
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.style.setProperty('--d', `${Math.min(batch * 55, 220)}ms`);
          batch += 1;
          el.classList.add('is-in');
          observer?.unobserve(el);
        });
      }, { threshold: 0, rootMargin: '0px 0px -16px 0px' });

      belowFold.forEach(el => observer.observe(el));
    } else {
      belowFold.forEach(el => el.classList.add('is-in'));
    }
  }

  function isMotionEnabled() {
    return !reducedMotion.matches;
  }

  reducedMotion.addEventListener('change', event => {
    syncMotionClass();
    if (event.matches) settleAllReveals();
  });
  window.addEventListener('beforeprint', settleAllReveals);

  /* ---------- 6. 搜索弹窗键盘上下选择 ---------- */
  const searchDialog = document.querySelector('#search-dialog');
  const searchInput = document.querySelector('#search-input');
  if (searchDialog && searchInput) {
    searchDialog.addEventListener('keydown', event => {
      if (!searchDialog.open) return;
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      const results = [...searchDialog.querySelectorAll('.search-result')];
      if (!results.length) return;

      const currentIndex = results.indexOf(document.activeElement);
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const next = currentIndex < 0 ? 0 : (currentIndex + 1) % results.length;
        results[next].focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (currentIndex <= 0) searchInput.focus();
        else results[currentIndex - 1].focus();
      } else if (event.key === 'Home' && currentIndex >= 0) {
        event.preventDefault();
        results[0].focus();
      } else if (event.key === 'End' && currentIndex >= 0) {
        event.preventDefault();
        results[results.length - 1].focus();
      }
    });
  }

  window.GUIDE_UI = {
    mountRoute,
    updateNavIndicator,
    refreshProgress: scheduleScrollUI,
    toggleTheme,
    isMotionEnabled,
    settleAllReveals
  };
})();
