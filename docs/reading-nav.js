(() => {
  'use strict';
  let dispose = () => {};

  function cleanup() {
    dispose();
    dispose = () => {};
  }

  function mount() {
    cleanup();
    const body = document.querySelector('.lesson-body');
    const nav = document.querySelector('[data-chapter-toc]');
    if (!body || !nav) return;

    const targets = [...body.querySelectorAll(':scope > .lesson-step > h2, :scope > .worked-example > h2, :scope > .lesson-checklist > h2, :scope > .prompt-box')];
    if (!targets.length) return;
    const chapterId = /^#chapter\/(\d+)$/.exec(location.hash)?.[1] || 'current';
    const list = document.createElement('ol');
    list.className = 'lesson-toc-list';
    const buttons = targets.map((target, index) => {
      if (!target.id) {
        const base = `chapter-${chapterId}-section-${index + 1}`;
        let id = base;
        let suffix = 2;
        while (document.getElementById(id)) id = `${base}-${suffix++}`;
        target.id = id;
      }
      if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.chapterSection = target.id;
      button.textContent = target.classList.contains('prompt-box') ? '本章 AI 提示词' : target.textContent.trim();
      item.append(button);
      list.append(item);
      return button;
    });
    nav.append(list);

    let activeIndex = -1;
    let frame = 0;
    function setActive(index) {
      if (index === activeIndex) return;
      buttons.forEach((button, buttonIndex) => {
        const active = buttonIndex === index;
        button.classList.toggle('is-active', active);
        if (active) button.setAttribute('aria-current', 'location');
        else button.removeAttribute('aria-current');
      });
      activeIndex = index;
      // 只滚动目录自身，避免阅读中的页面被活动项带走。
      if (list.scrollHeight <= list.clientHeight) return;
      const listRect = list.getBoundingClientRect();
      const buttonRect = buttons[index].getBoundingClientRect();
      const top = listRect.top + list.clientTop;
      const bottom = top + list.clientHeight;
      if (buttonRect.top < top) list.scrollTop -= top - buttonRect.top;
      else if (buttonRect.bottom > bottom) list.scrollTop += buttonRect.bottom - bottom;
    }

    function update() {
      frame = 0;
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
      const headerBottom = document.querySelector('.header')?.getBoundingClientRect().bottom || 0;
      const threshold = Number.isFinite(padding) ? padding : Math.max(0, headerBottom) + 24;
      let index = 0;
      targets.forEach((target, targetIndex) => {
        if (target.getBoundingClientRect().top <= threshold + 1) index = targetIndex;
      });
      const page = document.scrollingElement || document.documentElement;
      const bottom = page.scrollHeight - window.innerHeight;
      if (bottom > 0 && window.scrollY > 0 && window.scrollY >= bottom - 2) index = targets.length - 1;
      setActive(index);
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function settleEntrance(target) {
      for (let ancestor = target; ancestor; ancestor = ancestor.parentElement) {
        ancestor.getAnimations?.().forEach(animation => {
          if (animation.effect?.target !== ancestor || 'animationName' in animation || 'transitionProperty' in animation) return;
          const frames = animation.effect.getKeyframes?.() || [];
          if (frames.some(keyframe => Number.parseFloat(keyframe.opacity) < 1)) animation.cancel();
        });
      }
    }

    function selectSection(event) {
      const button = event.target.closest('button[data-chapter-section]');
      if (!button || !nav.contains(button)) return;
      const index = buttons.indexOf(button);
      const target = targets[index];
      if (!target?.isConnected) return;
      target.focus({preventScroll: true});
      target.scrollIntoView({block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
      settleEntrance(target);
      setActive(index);
      scheduleUpdate();
    }

    nav.addEventListener('click', selectSection);
    window.addEventListener('scroll', scheduleUpdate, {passive: true});
    window.addEventListener('resize', scheduleUpdate);
    body.addEventListener('load', scheduleUpdate, true);
    body.addEventListener('toggle', scheduleUpdate, true);
    dispose = () => {
      nav.removeEventListener('click', selectSection);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      body.removeEventListener('load', scheduleUpdate, true);
      body.removeEventListener('toggle', scheduleUpdate, true);
      if (frame) cancelAnimationFrame(frame);
      list.remove();
    };
    update();
  }

  window.GUIDE_READING = {mount, cleanup};
})();
