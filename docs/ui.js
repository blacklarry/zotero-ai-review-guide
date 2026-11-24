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

  /* ---------- 1. 深浅主题切换（View Transitions 圆形扩散） ---------- */
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
    if (meta) meta.setAttribute('content', isDark ? '#0e1310' : '#f6f3ec');
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
        { duration: 580, easing: 'cubic-bezier(.16, 1, .3, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
  }

  document.addEventListener('click', event => {
    const toggle = event.target.closest('[data-theme-toggle]');
    if (toggle) toggleTheme(toggle);
  });

  /* ---------- 2. 圆形阅读进度 + 返回顶部悬浮按钮 ---------- */
  const backTop = document.createElement('button');
  backTop.type = 'button';
  backTop.className = 'back-top';
  backTop.setAttribute('aria-label', '返回页面顶部');
  backTop.title = '返回顶部';
  backTop.innerHTML =
    '<svg class="back-top-ring" viewBox="0 0 48 48" aria-hidden="true">' +
      '<circle class="ring-track" cx="24" cy="24" r="22"></circle>' +
      '<circle class="ring-fill" cx="24" cy="24" r="22"></circle>' +
    '</svg>' +
    '<svg class="icon back-top-arrow" aria-hidden="true"><use href="#i-arrow"/></svg>';
  document.body.append(backTop);

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  });

  /* ---------- 3. 顶栏滚动状态、进度条与进度环 ---------- */
  let scrollFrame = 0;
  function updateScrollUI() {
    scrollFrame = 0;
    const y = window.scrollY;
    const header = document.querySelector('.header');
    if (header) header.classList.toggle('is-scrolled', y > 8);

    const page = document.scrollingElement || document.documentElement;
    const scrollable = page.scrollHeight - window.innerHeight;
    const progress = scrollable > 120 ? Math.min(1, Math.max(0, y / scrollable)) : 0;

    const bar = document.querySelector('.header-progress');
    if (bar) {
      bar.style.setProperty('--progress', progress.toFixed(4));
      bar.style.setProperty('--progress-visible', scrollable > 120 && y > 24 ? '1' : '0');
    }

    backTop.style.setProperty('--ring', progress.toFixed(4));
    backTop.classList.toggle('is-visible', scrollable > 240 && y > 360);
  }

  function scheduleScrollUI() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollUI);
  }

  window.addEventListener('scroll', scheduleScrollUI, { passive: true });
  window.addEventListener('resize', scheduleScrollUI);

  /* ---------- 4. 滑动指示器全家桶（顶栏 / 筛选栏 / 分段开关 / TOC） ---------- */
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

  let savedFilterPos = null;

  function syncFilterIndicator() {
    const group = document.querySelector('#app .prompt-filters');
    if (!group) return;
    const active = group.querySelector('.filter-btn.active');
    if (!active || active.offsetWidth === 0) {
      group.classList.remove('has-indicator');
      return;
    }
    let indicator = group.querySelector('.filter-indicator');
    if (!indicator) {
      indicator = document.createElement('span');
      indicator.className = 'filter-indicator';
      indicator.setAttribute('aria-hidden', 'true');
      group.prepend(indicator);
    }
    group.classList.add('has-indicator');
    if (savedFilterPos && !reducedMotion.matches) {
      indicator.style.transition = 'none';
      indicator.style.setProperty('--x', `${savedFilterPos.x}px`);
      indicator.style.setProperty('--w', `${savedFilterPos.w}px`);
      indicator.style.setProperty('--o', '1');
      void indicator.offsetWidth;
      indicator.style.transition = '';
    }
    savedFilterPos = { x: active.offsetLeft, w: active.offsetWidth };
    indicator.style.setProperty('--x', `${active.offsetLeft}px`);
    indicator.style.setProperty('--w', `${active.offsetWidth}px`);
    indicator.style.setProperty('--o', '1');
  }

  function syncInstallTabIndicators() {
    document.querySelectorAll('#app .install-source-tabs').forEach(tabs => {
      const active = tabs.querySelector('[aria-selected="true"]');
      if (!active || active.offsetWidth === 0) {
        tabs.classList.remove('has-indicator');
        return;
      }
      let indicator = tabs.querySelector('.tab-indicator');
      if (!indicator) {
        indicator = document.createElement('span');
        indicator.className = 'tab-indicator';
        indicator.setAttribute('aria-hidden', 'true');
        tabs.prepend(indicator);
      }
      tabs.classList.add('has-indicator');
      indicator.style.setProperty('--x', `${active.offsetLeft}px`);
      indicator.style.setProperty('--w', `${active.offsetWidth}px`);
      indicator.style.setProperty('--o', '1');
    });
  }

  // 点击安装来源标签时平滑滑动
  document.addEventListener('click', event => {
    if (event.target.closest('[data-install-source]')) {
      requestAnimationFrame(syncInstallTabIndicators);
    }
  });
  document.addEventListener('keydown', event => {
    if (event.target.closest('[data-install-source]') && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      requestAnimationFrame(syncInstallTabIndicators);
    }
  });

  // 章节目录 TOC 竖向滑动游标（监听 reading-nav.js 切换 .is-active）
  let tocObserver = null;
  function mountTocIndicator() {
    if (tocObserver) {
      tocObserver.disconnect();
      tocObserver = null;
    }
    const list = document.querySelector('#app .lesson-toc-list');
    if (!list) return;

    let indicator = list.querySelector('.toc-indicator');
    if (!indicator) {
      indicator = document.createElement('span');
      indicator.className = 'toc-indicator';
      indicator.setAttribute('aria-hidden', 'true');
      list.prepend(indicator);
    }

    const update = () => {
      const active = list.querySelector('button.is-active, button[aria-current="location"]');
      if (!active || active.offsetHeight === 0) {
        indicator.style.setProperty('--o', '0');
        return;
      }
      indicator.style.setProperty('--y', `${active.offsetTop + 5}px`);
      indicator.style.setProperty('--h', `${Math.max(18, active.offsetHeight - 10)}px`);
      indicator.style.setProperty('--o', '1');
    };

    tocObserver = new MutationObserver(update);
    tocObserver.observe(list, { subtree: true, attributes: true, attributeFilter: ['class', 'aria-current'] });
    requestAnimationFrame(update);
  }

  function syncAllIndicators() {
    updateNavIndicator();
    syncFilterIndicator();
    syncInstallTabIndicators();
  }

  window.addEventListener('resize', syncAllIndicators);
  window.addEventListener('load', syncAllIndicators);
  document.fonts?.ready?.then(syncAllIndicators);

  /* ---------- 5. 侧栏章节进度时间轴连线 ---------- */
  function syncSidebarProgress(completedCount) {
    const nav = document.querySelector('#chapter-nav');
    if (!nav) return;
    const ratio = Math.min(1, Math.max(0, Number(completedCount || 0) / 6));
    nav.style.setProperty('--done-ratio', ratio.toFixed(4));
  }

  /* ---------- 6. 卡片边框聚光灯 + 极轻阻尼 3D 微倾 ---------- */
  let hoveredCard = null;
  const TILT_SELECTOR = '.entry-card, .resource-grid .resource-card';

  function resetCardTilt(card) {
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  }

  document.addEventListener('pointermove', event => {
    if (reducedMotion.matches || event.pointerType !== 'mouse') return;
    const card = event.target.closest('.entry-card, .resource-card');
    if (hoveredCard && hoveredCard !== card) {
      resetCardTilt(hoveredCard);
      hoveredCard = null;
    }
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty('--mx', `${x.toFixed(1)}px`);
    card.style.setProperty('--my', `${y.toFixed(1)}px`);

    if (card.matches(TILT_SELECTOR) && rect.width > 0 && rect.height > 0) {
      hoveredCard = card;
      const nx = (x / rect.width) - 0.5;
      const ny = (y / rect.height) - 0.5;
      const rx = (-ny * 3.2).toFixed(2);
      const ry = (nx * 3.6).toFixed(2);
      card.style.setProperty('--rx', `${rx}deg`);
      card.style.setProperty('--ry', `${ry}deg`);
    }
  }, { passive: true });

  document.addEventListener('pointerleave', () => {
    if (hoveredCard) {
      resetCardTilt(hoveredCard);
      hoveredCard = null;
    }
  });

  /* ---------- 7. 截图点击灯箱放大预览 ---------- */
  const lightbox = document.createElement('dialog');
  lightbox.className = 'lightbox-dialog';
  lightbox.setAttribute('aria-label', '截图放大预览');
  lightbox.innerHTML =
    '<div class="lightbox-head">' +
      '<span class="lightbox-caption"></span>' +
      '<div class="lightbox-actions">' +
        '<a class="lightbox-open-raw" target="_blank" rel="noopener noreferrer">新标签打开原图 ↗</a>' +
        '<button type="button" class="icon-button lightbox-close" aria-label="关闭大图"><svg class="icon" aria-hidden="true"><use href="#i-close"/></svg></button>' +
      '</div>' +
    '</div>' +
    '<div class="lightbox-stage"><img alt=""></div>';
  document.body.append(lightbox);

  const lbImg = lightbox.querySelector('.lightbox-stage img');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const lbRaw = lightbox.querySelector('.lightbox-open-raw');
  const lbClose = lightbox.querySelector('.lightbox-close');
  let lbReturnFocus = null;

  function openLightbox(src, alt, trigger) {
    lbReturnFocus = trigger;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lbCaption.textContent = alt || '操作截图预览';
    lbRaw.href = src;
    if (!lightbox.open) lightbox.showModal();
    lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox.open) return;
    const target = lbReturnFocus;
    lbReturnFocus = null;
    lightbox.close();
    if (target?.isConnected) target.focus({ preventScroll: true });
  }

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('cancel', event => {
    event.preventDefault();
    closeLightbox();
  });
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) {
      const r = lightbox.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) {
        closeLightbox();
      }
    }
  });

  document.addEventListener('click', event => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('#app .operation-guide figure > a, #app .tutorial-shot > a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (!/\.(png|jpe?g|webp|svg)(\?.*)?$/i.test(href)) return;
    const img = link.querySelector('img');
    event.preventDefault();
    openLightbox(link.href, img?.alt || link.getAttribute('aria-label') || '', link);
  });

  /* ---------- 8. 路由入场与滚动渐显 ---------- */
  let observer = null;
  let charAnimations = [];

  function cleanupMotion() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (tocObserver) {
      tocObserver.disconnect();
      tocObserver = null;
    }
    charAnimations.forEach(anim => anim.cancel());
    charAnimations = [];
    if (hoveredCard) {
      resetCardTilt(hoveredCard);
      hoveredCard = null;
    }
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

  function mountRoute(routeName, { animate = true, filterChange = false } = {}) {
    cleanupMotion();
    const app = document.querySelector('#app');
    if (!app) return;
    app.classList.remove('is-leaving');

    if (routeName !== 'prompts') savedFilterPos = null;
    syncAllIndicators();
    requestAnimationFrame(syncAllIndicators);
    scheduleScrollUI();

    if (routeName.startsWith('chapter/')) {
      requestAnimationFrame(mountTocIndicator);
    }

    if (reducedMotion.matches) return;

    // 提示词筛选切换：只对卡片网格做轻盈错峰浮现，不整页重绘抖动
    if (filterChange) {
      const cards = [...app.querySelectorAll('.prompt-library-card')];
      cards.slice(0, 12).forEach((card, idx) => {
        card.classList.add('reveal');
        card.style.setProperty('--d', `${Math.min(idx * 35, 240)}ms`);
      });
      requestAnimationFrame(() => {
        cards.forEach(card => card.classList.add('is-in'));
      });
      return;
    }

    if (!animate) return;

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
              { opacity: 0, transform: 'translate3d(0, 20px, 0)' },
              { opacity: 1, transform: 'none' }
            ],
            { duration: 560, delay: 40 + idx * 26, easing: 'cubic-bezier(.16, 1, .3, 1)', fill: 'backwards' }
          );
          charAnimations.push(anim);
        });
      }
    }

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
        el.style.setProperty('--d', `${Math.min(idx * 48, 340)}ms`);
        el.classList.add('is-in');
      });
    });

    if (belowFold.length && typeof IntersectionObserver === 'function') {
      observer = new IntersectionObserver(entries => {
        let batch = 0;
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.style.setProperty('--d', `${Math.min(batch * 50, 220)}ms`);
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

  /* ---------- 9. 搜索弹窗键盘上下选择 ---------- */
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
    syncSidebarProgress,
    refreshProgress: scheduleScrollUI,
    toggleTheme,
    isMotionEnabled,
    settleAllReveals
  };
})();
