(() => {
  'use strict';
  const data = window.GUIDE_DATA;
  const app = document.querySelector('#app');
  const study = window.GUIDE_STUDY;
  const operations = window.GUIDE_OPERATIONS;
  const extras = window.GUIDE_EXTRAS;
  const workbuddy = window.GUIDE_WORKBUDDY;
  const codex = window.GUIDE_CODEX;
  const entry = window.GUIDE_START;
  const knowledge = window.GUIDE_KNOWLEDGE;
  const zoteroGuides = window.GUIDE_ZOTERO_GUIDES;
  const zoteroPlugins = window.GUIDE_ZOTERO_PLUGINS;
  if (!app) return;
  if (!data?.chapters?.length || !Array.isArray(data.prompts) || !Array.isArray(data.sources) ||
      !study?.matrixColumns?.length || !Array.isArray(study.matrixRows) ||
      !Array.isArray(operations?.groups) || !Array.isArray(operations.compatibility) || !Array.isArray(operations.versionSources) ||
      typeof workbuddy?.render !== 'function' || typeof workbuddy.resourceCard !== 'function' || !workbuddy.copyTexts || !workbuddy.copyLabels ||
      typeof codex?.render !== 'function' || typeof codex.resourceCard !== 'function' || !codex.copyTexts || !codex.copyLabels ||
      typeof entry?.render !== 'function' ||
      typeof zoteroGuides?.chapter !== 'function' || typeof zoteroPlugins?.render !== 'function' || !Array.isArray(zoteroPlugins.searchItems) ||
      typeof knowledge?.render !== 'function' || typeof knowledge.resourceCard !== 'function' || !knowledge.copyTexts || !knowledge.copyLabels || !Array.isArray(knowledge.searchItems) ||
      typeof extras?.chapter !== 'function' || typeof extras.resources !== 'function' || typeof extras.caseText !== 'function') {
    app.innerHTML = '<div class="page-intro"><h1>教程内容暂时未能加载</h1><p>请刷新页面重试，或先查看 <a href="https://www.zotero.org/support/">Zotero 官方文档</a>。</p></div>';
    return;
  }
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let completed = [];
  let checked = {};
  try {
    const saved = JSON.parse(localStorage.getItem('research-notes-progress') || '{}');
    completed = Array.isArray(saved.completed) ? saved.completed.filter(id => Number.isInteger(id) && id >= 1 && id <= 6) : [];
    checked = saved.checked && typeof saved.checked === 'object' ? saved.checked : {};
  } catch { /* 浏览器不提供存储时，当前会话仍可学习。 */ }
  const promptCategories = ['全部',...new Set(data.prompts.map(prompt => prompt.category))];
  let promptFilter = '全部';
  let selectedPromptId = null;
  let currentRoute = 'start';
  let toastTimer;
  const copyFeedback = new WeakMap();
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopMotion = window.matchMedia('(min-width: 1001px)');
  const routeAnimations = new Set();
  function cancelRouteAnimation() {
    routeAnimations.forEach(animation => animation.cancel());
    routeAnimations.clear();
    app.getAnimations?.({subtree:true}).forEach(animation => animation.cancel());
  }
  function animateRoute() {
    if (motionPreference.matches || !desktopMotion.matches || selectedPromptId || typeof app.animate !== 'function') return;
    const reveal = (target, frames, delay = 0, duration = 640) => {
      if (!target) return;
      const animation = target.animate(frames, {duration,delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
      routeAnimations.add(animation);
      animation.onfinish = animation.oncancel = () => routeAnimations.delete(animation);
    };
    const rise = [{opacity:0,transform:'translateY(24px)',filter:'blur(4px)'},{opacity:1,transform:'none',filter:'blur(0px)'}];
    reveal(app.querySelector('.breadcrumb'), [{opacity:0,transform:'translateX(-12px)'},{opacity:1,transform:'none'}], 0, 420);
    if (currentRoute === 'start') {
      const title = app.querySelector('.entry-intro h1');
      if (title) {
        const text = title.textContent;
        title.setAttribute('aria-label', text);
        const characters = Array.from(text, character => {
          const span = document.createElement('span');
          span.className = 'entry-title-character';
          span.setAttribute('aria-hidden','true');
          span.textContent = character;
          return span;
        });
        title.replaceChildren(...characters);
        characters.forEach((character,index) => reveal(character, [
          {opacity:0,transform:'perspective(450px) translateY(55%) rotateX(-40deg)',filter:'blur(8px)'},
          {opacity:1,transform:'none',filter:'blur(0px)'}
        ], 60 + index * 26, 740));
      }
      reveal(app.querySelector('.entry-description'), rise, 240, 700);
      app.querySelectorAll('.entry-card').forEach((card,index) => reveal(card, [
        {opacity:0,transform:`perspective(1000px) translateY(58px) rotateX(9deg) rotateY(${index ? -6 : 6}deg) scale(.94)`,filter:'blur(5px)'},
        {offset:.78,opacity:1,transform:'perspective(1000px) translateY(-4px) rotateX(0deg) rotateY(0deg) scale(1.005)',filter:'blur(0px)'},
        {opacity:1,transform:'none',filter:'blur(0px)'}
      ], 320 + index * 140, 920));
      reveal(app.querySelector('.entry-skip-area'), rise, 660, 680);
      return;
    }
    const targets = [...app.querySelectorAll('.page-intro,.hero-copy,.hero-evidence,.intro-strip,.learning-row,.resource-card,.prompt-library-card,.integration-downloads,.callout,.lesson-step,.lesson-aside')]
      .filter(element => { const rect = element.getBoundingClientRect();return rect.top < innerHeight + 24 && rect.bottom > 0; });
    targets.slice(0,10).forEach((target,index) => reveal(target, rise, Math.min(index * 65, 300)));
  }
  motionPreference.addEventListener('change',event => {
    if (event.matches) cancelRouteAnimation();
  });
  desktopMotion.addEventListener('change',event => {
    if (!event.matches) cancelRouteAnimation();
  });
  const settleFocusedEntrance = event => {
    routeAnimations.forEach(animation => {
      const target = animation.effect?.target;
      if (target instanceof Element && target.contains(event.target)) animation.cancel();
    });
  };
  app.addEventListener('focusin',settleFocusedEntrance);
  app.addEventListener('pointerdown',settleFocusedEntrance);
  window.addEventListener('beforeprint',cancelRouteAnimation);
  const saveProgress = () => {
    try { localStorage.setItem('research-notes-progress', JSON.stringify({completed,checked})); }
    catch { toast('浏览器暂不可保存进度，本次会话内仍可使用。'); }
  };
  function toast(message) {
    const el = document.querySelector('#toast');
    el.textContent = message;
    el.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('visible'), 3200);
  }
  const crumb = label => `<nav class="breadcrumb" aria-label="面包屑导航"><a href="#home">${icon('book')} 研读手册</a><span class="slash">/</span><span>Zotero + AI</span><span class="slash">/</span><strong aria-current="page">${esc(label)}</strong></nav>`;
  function updateNavigation() {
    document.querySelector('#chapter-nav').innerHTML = data.chapters.map(ch => `<a class="chapter-link ${currentRoute === `chapter/${ch.id}` ? 'active' : ''} ${completed.includes(ch.id) ? 'done' : ''}" href="#chapter/${ch.id}" ${currentRoute === `chapter/${ch.id}` ? 'aria-current="page"' : ''}><span class="chapter-number">${completed.includes(ch.id) ? icon('check') : String(ch.id).padStart(2,'0')}</span><span>${esc(ch.title)}</span></a>`).join('');
    document.querySelectorAll('[data-route]').forEach(a => {
      const active = a.dataset.route === currentRoute;
      a.classList.toggle('active',active);
      if (active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-top]').forEach(a => {
      const active = a.dataset.top === currentRoute || (a.dataset.top === 'home' && currentRoute.startsWith('chapter/'));
      a.classList.toggle('active',active);
      if (active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
    const progressLabel = document.querySelector('#progress-label');
    const progressText = `${completed.length} / 6`;
    if (progressLabel.textContent !== progressText) progressLabel.textContent = progressText;
    document.querySelector('#progress-fill').style.width = `${completed.length / 6 * 100}%`;
    document.querySelector('#progress-note').textContent = completed.length === 6 ? '六章已完成，把方法用在你的研究中。' : '每读完一章，离综述更近一步。';
  }
  function renderHome() {
    const next = data.chapters.find(ch => !completed.includes(ch.id))?.id || 1;
    return `${crumb('教程概览')}
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy"><h1 id="hero-title">让文献有序，<br>让综述<em>有据。</em></h1><p class="hero-description">用 Zotero 搭建文献库，用 AI 串联研究线索。<br>从第一篇论文，到一份有逻辑、有证据的文献综述。</p><div class="hero-actions"><a class="btn btn-primary" href="#chapter/${next}">${completed.length ? '继续我的学习' : '开始学习'} ${icon('arrow')}</a><a class="btn btn-quiet" href="#resources">获取配套模板 ${icon('download')}</a></div><div class="hero-meta"><span>${icon('book')} 6 个学习章节</span><span>${icon('clock')} 按自己的节奏学习</span><span>${icon('check')} 无需编程基础</span></div></div>
      <section class="hero-evidence" aria-labelledby="hero-evidence-title"><h2 class="hero-evidence-title" id="hero-evidence-title">${icon('file')} 把证据连成线索</h2><div class="hero-evidence-body"><div class="note-row">${icon('check')}<span><b>研究问题</b>这篇文献在回答什么？</span></div><div class="note-row">${icon('check')}<span><b>方法与证据</b>结论是如何得出的？</span></div><div class="note-row">${icon('check')}<span><b>关联与局限</b>它与其他研究有何联系？</span></div></div></section>
    </section>
    <div class="intro-strip"><div class="intro-item">${icon('folder')}<div><b>Zotero 管好文献</b><span>收集、分类、批注与引用</span></div></div><div class="intro-item">${icon('spark')}<div><b>AI 辅助深度阅读</b><span>提取证据，发现研究关联</span></div></div><div class="intro-item">${icon('shield')}<div><b>让判断有据可循</b><span>回到原文，保留证据出处</span></div></div></div>
    <section aria-labelledby="path-title"><div class="section-heading"><div><h2 id="path-title">一条清晰的综述路径</h2><p>不急着生成全文。先建立证据，再组织你的观点。</p></div><span class="section-counter">THE LEARNING PATH / 06</span></div><div class="learning-path">${data.chapters.map(ch => `<a class="learning-row${completed.includes(ch.id) ? ' is-complete' : ''}" href="#chapter/${ch.id}"><span class="learning-number">${String(ch.id).padStart(2,'0')}</span><div class="learning-summary"><h3>${esc(ch.title)}</h3><p>${esc(ch.subtitle)}</p>${completed.includes(ch.id) ? `<span class="learning-complete">${icon('check')} 已完成</span>` : ''}</div><span class="learning-duration">${icon('clock')} ${esc(ch.duration)}</span><span class="learning-arrow"><span class="sr-only">进入章节</span>${icon('arrow')}</span></a>`).join('')}</div><details class="path-reference"><summary>查看六步流程图</summary><figure class="path-figure"><img src="assets/six-steps.svg" alt="六步研读流程：明确问题与准备、收集与整理文献、精读与证据提取、主题归纳与比较、搭建结构与写作、引用质量核查" width="480" height="760" loading="lazy"></figure></details></section>
    <section class="home-updates" aria-labelledby="home-updates-title"><div class="section-heading"><h2 id="home-updates-title">实操与工具更新</h2></div><div class="home-updates-grid"><article class="home-update"><h3>新增完整实操案例 · 2026-10-14</h3><p>用两篇真实论文走完原文、批注、证据矩阵、主题比较与综述成品。<a href="#chapter/3">从第3章开始 →</a> · <a href="#resources">适用版本与纠错</a></p></article><article class="home-update"><h3>${icon('link')} 新增工具接入 · 2026-10-15</h3><p>让 WorkBuddy 或 Codex 检索本机 Zotero 文献库，附配置、中文技能和自助安装指令。<a href="#workbuddy">WorkBuddy 教程 →</a> · <a href="#codex">Codex 教程 →</a></p></article><article class="home-update"><h3>${icon('folder')} 搭建科研知识库 · 2026-10-19</h3><p>把阅读笔记、实验记录和论文章节连起来。参考 learning-of-zjnu 的实际目录与模板，附通用起步包。<a href="#knowledge">开始搭建知识库 →</a></p></article></div></section>
    <section class="prompt-banner" aria-labelledby="prompt-banner-title"><div><div class="banner-label">${icon('spark')} YOUR RESEARCH COPILOT</div><h2 id="prompt-banner-title">好问题，让 AI 更懂你的研究。</h2><p>从选题检索到段落核查，${data.prompts.length} 组可直接修改的提示词。<br>让每次对话，都回到你提供的真实文献。</p><a class="banner-link" href="#prompts">打开 AI 提示词库 ${icon('arrow')}</a></div><div class="banner-example"><div class="example-top"><span>单篇文献 · 证据提取</span>${icon('copy')}</div><p>“请仅根据我提供的论文内容，提取研究问题、方法、主要发现与局限。<strong>每条结论附原文位置；没有依据时标记‘未提及’。</strong>”</p></div></section>
    <section class="resource-teaser"><div><h2>准备好了，就从你的第一篇文献开始。</h2><p>把模板带走，让阅读笔记真正积累成写作素材。</p><div class="resource-chips"><span class="chip">${icon('grid')} 文献矩阵</span><span class="chip">${icon('shield')} 综述核查清单</span><span class="chip">${icon('spark')} 提示词合集</span></div></div><a class="btn btn-secondary" href="#resources">查看配套资源 ${icon('download')}</a></section>`;
  }
  function renderChapter(ch) {
    const done = completed.includes(ch.id);
    return `${crumb(`第 ${ch.id} 章`)}
    <div class="chapter-layout"><article class="lesson-body"><header class="page-intro"><div class="eyebrow">CHAPTER ${String(ch.id).padStart(2,'0')} / 06</div><h1>${esc(ch.title)}</h1><p>${esc(ch.lead)}</p><div class="page-meta"><span>${icon('clock')} 建议练习 ${esc(ch.duration)}</span><span>${icon('file')} 边读边做 · 完成一份小成果</span>${done ? `<span>${icon('check')} 你已完成本章</span>` : ''}</div></header>${ch.steps.map((step,i) => `<section class="lesson-step"><span class="lesson-step-number">${i+1}</span><h2>${esc(step.title)}</h2><p>${esc(step.body)}</p></section>`).join('')}
    ${zoteroGuides.chapter(ch.id,{esc})}${window.GUIDE_EXTRAS.chapter(ch.id)}
    ${ch.id === 5 ? `<div class="callout"><strong>${icon('file')} 论文排版模板</strong>需要用 LaTeX 整理论文时，可使用 <a href="https://github.com/blacklarry/zjnu-latex-paper-template" target="_blank" rel="noopener noreferrer">浙江师范大学 LaTeX 论文模板</a>。这是面向课程论文、研究报告等场景的非官方模板，提交格式以学院或教师要求为准。</div>` : ''}
    <div class="callout"><strong>${icon('info')} 研究者的小提醒</strong>${esc(ch.tip)}</div>
    <section class="prompt-box"><div class="prompt-box-head"><span>${icon('spark')} 本章可用的 AI 提示词</span><button class="copy-btn" data-copy-chapter="${ch.id}">${icon('copy')} 复制提示词</button></div><pre>${esc(ch.prompt)}</pre></section>
    <section class="lesson-checklist"><h2>离开这一章前，检查一下</h2>${ch.checklist.map((text,i) => {const key = `${ch.id}-${i}`; return `<div class="check-item"><input id="check-${key}" type="checkbox" data-check="${key}" ${checked[key] ? 'checked' : ''}><label for="check-${key}">${esc(text)}</label></div>`;}).join('')}<div class="lesson-sources"><p>操作参考 · 中文社区与官方文档</p>${ch.sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)} ↗</a>`).join('')}</div></section>
    <div class="lesson-navigation"><button class="btn btn-primary completion-btn ${done ? 'is-done' : ''}" data-complete="${ch.id}" aria-pressed="${done}">${icon('check')} ${done ? '已完成本章 · 点击撤销' : '标记本章已完成'}</button><div class="chapter-pager">${ch.id > 1 ? `<a class="prev-chapter" href="#chapter/${ch.id-1}">${icon('arrow')} 上一章：${esc(data.chapters[ch.id-2].title)}</a>` : ''}${ch.id < 6 ? `<a class="next-chapter" href="#chapter/${ch.id+1}">下一章：${esc(data.chapters[ch.id].title)} ${icon('arrow')}</a>` : `<a class="next-chapter" href="#resources">带走模板，开始你的综述 ${icon('arrow')}</a>`}</div></div></article>
    <aside class="lesson-aside" aria-label="本章目录与学习目标"><nav class="lesson-toc" aria-label="本章目录"><h2>本章目录</h2><div data-chapter-toc></div></nav><div class="output-box"><div class="eyebrow">本章小成果</div><h3>读完，也动手做。</h3><p>${esc(ch.deliverable)}</p></div><p class="lesson-principle">Zotero 存证据，AI 帮你理线索。论点由你判断，引用回到原文核实。</p><a class="chapter-jump" href="#resources">${icon('download')} 下载配套模板 ${icon('up')}</a><a class="chapter-jump" href="#home">${icon('grid')} 返回学习路径</a></aside></div>`;
  }
  function renderPrompts() {
    const filtered = data.prompts.filter(p => promptFilter === '全部' || p.category === promptFilter);
    const cards = filtered.map(p => {
      const expanded = selectedPromptId === p.id;
      return `<article id="prompt-${esc(p.id)}" class="prompt-library-card${expanded ? ' is-highlighted is-expanded' : ''}" tabindex="-1" aria-labelledby="prompt-title-${esc(p.id)}">
        <header><div class="prompt-card-heading"><h2 id="prompt-title-${esc(p.id)}"><a class="prompt-permalink" href="#prompts/${encodeURIComponent(p.id)}">${esc(p.title)}</a></h2><span class="prompt-type">${esc(p.category)}</span></div><button class="copy-btn" data-copy="${esc(p.id)}" aria-label="复制${esc(p.title)}">${icon('copy')} 复制</button></header>
        <p class="prompt-description">${esc(p.description)}</p>
        <div class="prompt-preview-wrap"><pre id="prompt-text-${esc(p.id)}" class="prompt-preview" tabindex="${expanded ? '0' : '-1'}" aria-label="${esc(p.title)}完整提示词">${esc(p.text)}</pre></div>
        <div class="prompt-card-bottom"><button class="prompt-expand" type="button" data-expand-prompt="${esc(p.id)}" aria-controls="prompt-text-${esc(p.id)}" aria-expanded="${expanded}"><span>${expanded ? '收起全文' : '展开全文'}</span>${icon('arrow')}</button><span>按研究需要修改</span></div>
      </article>`;
    }).join('');
    return `${crumb('AI 提示词库')}<header class="page-intro"><div class="eyebrow">THE PROMPT LIBRARY</div><h1>把问题问清楚，让证据说话。</h1><p>复制一份提示词，替换方括号中的内容，并附上你的文献材料。这里提供可修改的模板，实际分析在你选择的 AI 工具中完成。</p><div class="page-meta"><span>${icon('spark')} ${data.prompts.length} 组实用模板</span><span>${icon('shield')} 仅依据你提供的材料</span></div></header>
      <div class="callout prompt-preparation"><strong>${icon('info')} 使用前准备</strong><span>为每篇文献分配稳定编号（如 P001），保留题名、DOI 和页码。只提供你有权使用的材料；提交前检查所用 AI 工具的数据政策，并去除个人或未公开的敏感信息。</span></div>
      <div class="prompt-toolbar"><div class="prompt-filters" role="group" aria-label="按用途筛选提示词">${promptCategories.map(type => { const count = data.prompts.filter(p => type === '全部' || p.category === type).length; return `<button class="filter-btn ${promptFilter === type ? 'active' : ''}" data-filter="${type}" aria-pressed="${promptFilter === type}">${type}<span class="filter-count">${count}</span></button>`; }).join('')}</div><span class="prompt-results" role="status" aria-live="polite" aria-atomic="true">显示 ${filtered.length} / ${data.prompts.length} 组</span></div>
      <div class="prompt-grid">${cards}</div>
      <section class="faq"><h2>让 AI 输出更可靠</h2><details><summary>AI 给出了原文里找不到的结论，怎么办？</summary><p>将该结论标记为待核查，要求 AI 提供原文片段及位置，再由你打开原文逐条确认。无法找到依据时删除该结论，不把 AI 的回答本身当作论文证据。</p></details><details><summary>可以只给题名，让 AI 写文献综述吗？</summary><p>题名与摘要不能替代全文证据。先用数据库与 Zotero 建立真实文献集，再提供经过核对的笔记或原文。方法细节、数值与局限尤其需要回到全文核实。</p></details><details><summary>一次放很多篇论文，会不会更好？</summary><p>不一定。先分批精读，统一提取字段与文献编号，再基于已核验的矩阵做跨文献比较。检查 AI 是否遗漏材料、混淆文献或把不同条件的结果直接比较。</p></details></section>`;
  }
  function renderResources() {
    return `${crumb('模板与资源')}<header class="page-intro"><div class="eyebrow">YOUR RESEARCH TOOLKIT</div><h1>让每一次阅读，都有积累。</h1><p>下载可编辑的轻量模板，把它们放进你的研究流程。你可以用 Excel 打开文献矩阵，用文本编辑器修改提示词和核查清单。</p><div class="page-meta"><span>${icon('download')} 直接下载，无需填写信息</span><span>${icon('file')} 通用格式，自由修改</span></div></header><div class="callout repository-strip"><strong>${icon('folder')} 项目源码</strong><a href="https://github.com/blacklarry/zotero-ai-review-guide" target="_blank" rel="noopener noreferrer">GitHub 仓库 ↗</a> · <a href="https://gitee.com/larry_17/zotero-ai-review-guide" target="_blank" rel="noopener noreferrer">Gitee 国内仓库 ↗</a></div>
      <section class="resource-group resource-templates" aria-labelledby="resource-templates-title">
        <div class="section-heading"><div><h2 id="resource-templates-title">阅读与写作模板</h2><p>先看填写样例，再开始记录。</p></div></div>
        <div class="resource-grid"><article class="resource-card"><div class="resource-card-head"><span class="resource-card-icon">${icon('grid')}</span><div><div class="resource-format">CSV / 文献整理</div><h2>文献证据矩阵</h2></div></div><p>统一记录研究问题、对象、方法、发现、局限与证据位置。先把表格填扎实，再开始跨文献综合。</p><button class="btn btn-primary" data-download="matrix-example">${icon('download')} 下载完整填写样例</button><button class="btn btn-secondary" data-download="matrix">${icon('download')} 下载空白模板</button></article><article class="resource-card"><div class="resource-card-head"><span class="resource-card-icon">${icon('shield')}</span><div><div class="resource-format">TXT / 提交前核查</div><h2>综述质量检查清单</h2></div></div><p>从问题边界到参考文献，逐项检查论证、证据与引用，带着清单回到原文做最后一轮核查。</p><button class="btn btn-primary" data-download="checklist">${icon('download')} 下载检查清单</button></article><article class="resource-card"><div class="resource-card-head"><span class="resource-card-icon">${icon('spark')}</span><div><div class="resource-format">TXT / AI 辅助阅读</div><h2>AI 提示词合集</h2></div></div><p>一次带走 ${data.prompts.length} 组提示词。覆盖选题检索、精读提取、主题比较与写作核查，按需要替换研究背景。</p><button class="btn btn-primary" data-download="prompts">${icon('download')} 下载提示词合集</button></article></div>
      </section>
      <section class="resource-group" aria-labelledby="resource-tools-title">
        <div class="section-heading"><div><h2 id="resource-tools-title">接入工具包</h2></div></div>
        <div class="resource-tools">${workbuddy.resourceCard(icon)}${codex.resourceCard(icon)}${knowledge.resourceCard(icon)}</div>
      </section>
      <section class="resource-group" id="resource-latex" tabindex="-1" aria-labelledby="resource-latex-title">
        <div class="section-heading"><div><h2 id="resource-latex-title">论文排版模板</h2><p>把整理好的证据与段落，接到可编辑的论文源码中。</p></div></div>
        <div class="resource-tools"><article class="resource-card"><div class="resource-card-icon">${icon('file')}</div><span class="resource-format">LaTeX / XeLaTeX · 非官方模板</span><h2>浙江师范大学 LaTeX 论文模板</h2><p>面向课程论文、研究报告和一般学术文稿，提供封面、双语摘要、目录、图表与 BibTeX 示例。具体格式以学院或教师要求为准。</p><a class="btn btn-secondary" href="https://github.com/blacklarry/zjnu-latex-paper-template" target="_blank" rel="noopener noreferrer">查看模板仓库 ${icon('up')}</a><div class="example-actions"><a href="https://github.com/blacklarry/zjnu-latex-paper-template#使用方法" target="_blank" rel="noopener noreferrer">使用与编译说明</a><a href="https://github.com/blacklarry/zjnu-latex-paper-template/archive/refs/heads/main.zip" target="_blank" rel="noopener noreferrer">下载模板源码 ZIP</a></div></article></div>
      </section>
      ${window.GUIDE_EXTRAS.resources()}<section><div class="section-heading"><div><h2>查阅中文教程与官方说明</h2><p>中文社区方便按步骤查阅，官方文档用于交叉核对。社区部分页面仍含旧版示例，界面名称与外观请以自己的版本为准。</p></div><span class="section-counter">ZOTERO REFERENCES</span></div><div class="source-list">${data.sources.map(s=>`<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${icon('book')}<span><b>${esc(s.label)}</b><small>${esc(s.description)}</small></span>${icon('up')}</a>`).join('')}</div></section><section class="faq"><h2>开始前，你可能还想知道</h2><details><summary>必须安装第三方 Zotero AI 插件吗？</summary><p>本教程不要求额外的 AI 插件。Zotero 负责文献、PDF 批注和笔记；你可以把整理好的笔记或文献矩阵复制给能接收文本的 AI 工具。若选择第三方插件，请另外核实版本兼容性、维护状态与数据去向。</p></details><details><summary>这套流程适合系统综述或 Meta 分析吗？</summary><p>它可用于组织阅读与证据，但不等同于完整的系统综述方法。系统综述仍需遵循适用规范，预先设计检索与纳排流程，并完成质量评价、偏倚评估等工作；Meta 分析还需适当的统计方法。</p></details><details><summary>网站会读取我的 Zotero 文献库吗？</summary><p>这个网站提供教程、模板与提示词，不连接或读取你的 Zotero 文献库。章节进度与清单勾选仅保存在当前浏览器；模板由浏览器生成，WorkBuddy 安装包作为静态文件提供下载。</p></details></section><div class="callout"><strong>${icon('check')} 一条贯穿始终的原则</strong>AI 的输出是待核查的研究草稿。真实文献、可追溯的证据，以及你对问题的判断，才是综述的基础。</div>`;
  }
  function route({focus = true,scroll = true,animate = scroll} = {}) {
    cancelRouteAnimation();
    window.GUIDE_READING?.cleanup();
    let hash = location.hash.slice(1) || 'start';
    const resourceSection = hash === 'resources/latex' ? 'resource-latex' : null;
    if (resourceSection) hash = 'resources';
    let promptId = '';
    try { if (hash.startsWith('prompts/')) promptId = decodeURIComponent(hash.slice(8)); }
    catch { /* 无效编码按未知路由处理。 */ }
    const prompt = data.prompts.find(p => p.id === promptId);
    const isPromptRoute = hash === 'prompts' || Boolean(prompt);
    const chapter = data.chapters.find(ch => `chapter/${ch.id}` === hash);
    if (!chapter && !isPromptRoute && !['start','home','resources','workbuddy','codex','knowledge','zotero-plugins'].includes(hash)) {
      history.replaceState(null,'','#start');
      hash = 'start';
    }
    currentRoute = isPromptRoute ? 'prompts' : hash;
    selectedPromptId = prompt?.id || null;
    if (isPromptRoute) {
      const savedFilter = history.state?.promptFilter;
      promptFilter = prompt?.category || (promptCategories.includes(savedFilter) ? savedFilter : '全部');
      history.replaceState({...history.state,promptFilter},'',location.href);
    }
    const title = chapter?.title || ({start:'选择接入',home:'教程概览',prompts:'AI 提示词库',resources:'模板与资源',workbuddy:'WorkBuddy 接入',codex:'Codex 接入',knowledge:'搭建知识库','zotero-plugins':'Zotero 插件安装与推荐'})[currentRoute];
    document.title = `${prompt ? prompt.title + ' · ' : ''}${title} · 研读手册 | Zotero + AI`;
    app.innerHTML = chapter ? renderChapter(chapter) : isPromptRoute ? renderPrompts() : hash === 'start' ? entry.render({icon,esc,crumb}) : hash === 'resources' ? renderResources() : hash === 'workbuddy' ? workbuddy.render({icon,esc,crumb}) : hash === 'codex' ? codex.render({icon,esc,crumb}) : hash === 'knowledge' ? knowledge.render({icon,esc,crumb}) : hash === 'zotero-plugins' ? zoteroPlugins.render({icon,esc,crumb}) : renderHome();
    app.dataset.route = currentRoute;
    updateNavigation();
    closeMenu();
    if (prompt) {
      const target = document.getElementById(`prompt-${prompt.id}`);
      target?.scrollIntoView({block:'start',behavior:'instant'});
      target?.focus({preventScroll:true});
    } else if (resourceSection) {
      const target = document.getElementById(resourceSection);
      target?.scrollIntoView({block:'start',behavior:'instant'});
      target?.focus({preventScroll:true});
    } else {
      if (scroll) window.scrollTo({top:0,behavior:'instant'});
      if (focus) document.querySelector('#main').focus({preventScroll:true});
    }
    if (animate && !resourceSection) animateRoute();
    if (chapter) window.GUIDE_READING?.mount();
  }
  function resetCopied(button) {
    const state = button && copyFeedback.get(button);
    if (!state) return;
    clearTimeout(state.timer);
    button.innerHTML = state.html;
    button.classList.remove('is-copied');
    copyFeedback.delete(button);
  }
  function showCopied(button) {
    if (!button?.isConnected) return;
    const html = copyFeedback.get(button)?.html || button.innerHTML;
    resetCopied(button);
    button.innerHTML = `${icon('check')} 已复制`;
    button.classList.add('is-copied');
    copyFeedback.set(button, {html,timer:setTimeout(() => resetCopied(button), 2000)});
  }
  async function copy(text, message = '提示词已复制，粘贴后替换你的研究材料。', button = null) {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
      else {
        const field = document.createElement('textarea');
        field.value = text;
        field.setAttribute('readonly','');
        field.style.cssText = 'position:fixed;left:-9999px;top:0';
        document.body.append(field);field.select();
        const ok = document.execCommand('copy');field.remove();
        if (!ok) throw new Error('Clipboard unavailable');
      }
      showCopied(button);
      toast(message);
    } catch { resetCopied(button);toast('浏览器未允许自动复制，请选中内容手动复制。'); }
  }
  function download(type) {
    let name,body,mime='text/plain;charset=utf-8';
    if (type === 'matrix' || type === 'matrix-example') {
      name=type === 'matrix' ? '文献证据矩阵_空白模板.csv' : '文献证据矩阵_完整填写样例.csv';mime='text/csv;charset=utf-8';
      const columns=window.GUIDE_STUDY.matrixColumns;
      const rows=type === 'matrix-example' ? window.GUIDE_STUDY.matrixRows : Array.from({length:5},(_,i)=>[`P${String(i+1).padStart(3,'0')}`,...Array(14).fill('')]);
      const csvRow=row=>row.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',');
      body='\uFEFF'+[columns,...rows].map(csvRow).join('\r\n')+'\r\n';
    } else if (type === 'case') {
      name='Zotero与AI_完整案例.txt';body=window.GUIDE_EXTRAS.caseText();
    } else if (type === 'feedback') {
      name='研读手册_纠错报告.txt';
      body='研读手册 | 纠错报告\n教程版本：1.1（内容核验：2026-10-14）\n网址：'+location.href+'\n页面 / 步骤：'+document.querySelector('#feedback-location').value+'\n系统与软件版本：'+document.querySelector('#feedback-version').value+'\n复现步骤、实际结果与预期结果：\n'+document.querySelector('#feedback-description').value+'\n\n请将本报告发给提供教程链接的维护者；本网站未自动提交。\n';
    } else if (type === 'prompts') {
      name='Zotero与AI_文献综述提示词合集.txt';
      body='研读手册 | Zotero + AI 文献综述提示词合集\n\n使用方法：替换方括号中的内容，附上已核实的材料，逐条核查 AI 的输出。\n\n'+data.prompts.map((p,i)=>`${i+1}. ${p.title}\n分类：${p.category}\n用途：${p.description}\n\n${p.text}`).join('\n\n'+'—'.repeat(32)+'\n\n');
    } else {
      name='文献综述质量核查清单.txt';
      body='研读手册 | 文献综述质量核查清单\n\n研究题目：________________\n核查日期：________________\n\n'+data.chapters.map(ch=>`${String(ch.id).padStart(2,'0')} ${ch.title}\n`+ch.checklist.map(t=>'[ ] '+t).join('\n')).join('\n\n')+'\n\n[ ] 每条引用与原文对应，作者、年份、题名、DOI 已核对。\n[ ] 数值、样本量、实验条件与局限已回到原文确认。\n[ ] 已按学校或期刊要求说明 AI 的使用情况。\n\n说明：本清单不替代系统综述或 Meta 分析的专业方法规范。\n';
    }
    const url=URL.createObjectURL(new Blob([body],{type:mime}));
    const anchor=document.createElement('a');anchor.href=url;anchor.download=name;document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
    toast('下载已开始：'+name);
  }
  function selectInstallSource(tab, {focus = false} = {}) {
    const switcher = tab.closest('[data-install-switcher]');
    if (!switcher) return;
    switcher.querySelectorAll('[data-install-source]').forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    switcher.querySelectorAll('[role="tabpanel"]').forEach(panel => {
      panel.hidden = panel.id !== tab.getAttribute('aria-controls');
    });
    if (focus) tab.focus();
  }
  function closeMenu() {
    document.querySelector('#sidebar').classList.remove('is-open');
    document.querySelector('.sidebar-overlay').hidden=true;
    document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');
    document.querySelector('.menu-toggle').setAttribute('aria-label','打开学习目录');
  }
  const searchDialog=document.querySelector('#search-dialog');
  const searchInput=document.querySelector('#search-input');
  let searchReturnFocus = null;
  const searchItems=[
    {title:'选择接入：WorkBuddy 或 Codex',type:'开始使用',body:'入口 文献助手 Zotero 接入 选择 跳过 直接阅读 教程',href:'#start'},
    {title:'教程概览',type:'学习路径',body:'Zotero AI 文献综述 教程 六步 入门',href:'#home'},
    {title:'WorkBuddy 接入 Zotero 本地文献检索',type:'工具接入',body:'WorkBuddy MCP Skill 技能 安装 下载 uv uvx 本地 API 信任 连接 检索 全文 引用键 citekey 排障',href:'#workbuddy'},
    {title:'Codex 接入 Zotero 本地文献检索',type:'工具接入',body:'Codex MCP Skill 技能 TOML config.toml CLI 安装 下载 uv uvx 本地 API 自助安装 检索 全文 引用键 citekey 排障',href:'#codex'},
    ...knowledge.searchItems,
    ...zoteroPlugins.searchItems,
    {title:'Zotero 安装与 Connector 图文入门',type:'第 1 章',body:'下载 安装 首次启动 浏览器扩展 配置 图文',href:'#chapter/1'},
    {title:'Zotero 分类、PDF、去重、备份与同步',type:'第 2 章',body:'元数据 智能分类 标签 全文 备份 同步 WebDAV',href:'#chapter/2'},
    {title:'抓取失败时：用 DOI 或引用文件导入',type:'第 2 章',body:'RIS BibTeX 标识符 文件导入 剪贴板 检索元数据 创建父条目 手动录入 存储附件 链接附件',href:'#chapter/2'},
    ...data.chapters.map(ch=>({title:ch.title,type:`第 ${ch.id} 章`,body:[ch.lead,ch.subtitle,...ch.steps.map(s=>s.title+' '+s.body)].join(' '),href:`#chapter/${ch.id}`})),
    ...data.prompts.map(p=>({title:p.title,type:p.category,body:p.description+' '+p.text,href:`#prompts/${encodeURIComponent(p.id)}`})),
    {title:'浙江师范大学 LaTeX 论文模板',type:'论文排版',body:'浙师大 zjnu latex xelatex 模板 课程论文 研究报告 BibTeX 参考文献 源码',href:'#resources/latex'},
    {title:'文献矩阵、质量核查清单与提示词下载',type:'配套资源',body:'CSV Excel 模板 Word 引用 下载 Zotero 官方 文档',href:'#resources'}
  ];
  function search() {
    const query=searchInput.value.trim().toLowerCase();
    const matches=searchItems.filter(s=>!query||`${s.title} ${s.body}`.toLowerCase().includes(query));
    document.querySelector('#search-results').innerHTML=matches.length?matches.map(s=>`<a class="search-result" href="${s.href}" data-search-result><span><b>${esc(s.title)}</b><small>${esc(s.type)}</small></span>${icon('arrow')}</a>`).join(''):'<p class="search-empty">没有找到相关内容。试试“引用”“批注”或“主题”。</p>';
  }
  function openSearch(trigger = document.activeElement) {
    if (!searchDialog.open) {
      searchReturnFocus = trigger;
      searchDialog.showModal();
    }
    searchInput.value='';search();searchInput.focus();
  }
  function closeSearch({restoreFocus = true} = {}) {
    if (!searchDialog.open) return;
    const target = searchReturnFocus;
    searchReturnFocus = null;
    searchDialog.close();
    if (restoreFocus && target?.isConnected) target.focus({preventScroll:true});
  }
  document.addEventListener('click',event=>{
    const el=event.target.closest('button,a');
    if (!el) return;
    if (el.classList.contains('skip-link')) { event.preventDefault();document.querySelector('#main').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'}); }
    else if (el.hasAttribute('data-copy')) { const p=data.prompts.find(p=>p.id===el.dataset.copy);if(p)copy(p.text,undefined,el); }
    else if (el.hasAttribute('data-copy-chapter')) { const ch=data.chapters.find(ch=>ch.id===Number(el.dataset.copyChapter));if(ch)copy(ch.prompt,undefined,el); }
    else if (el.hasAttribute('data-copy-workbuddy')) { const key=el.dataset.copyWorkbuddy;if(Object.hasOwn(workbuddy.copyTexts,key))copy(workbuddy.copyTexts[key],workbuddy.copyLabels[key]+'已复制。',el); }
    else if (el.hasAttribute('data-copy-codex')) { const key=el.dataset.copyCodex;if(Object.hasOwn(codex.copyTexts,key))copy(codex.copyTexts[key],codex.copyLabels[key]+'已复制。',el); }
    else if (el.hasAttribute('data-copy-knowledge')) { const key=el.dataset.copyKnowledge;if(Object.hasOwn(knowledge.copyTexts,key))copy(knowledge.copyTexts[key],knowledge.copyLabels[key]+'已复制。',el); }
    else if (el.hasAttribute('data-expand-prompt')) {
      const card = el.closest('.prompt-library-card');
      const expanded = el.getAttribute('aria-expanded') !== 'true';
      card.classList.toggle('is-expanded',expanded);
      el.setAttribute('aria-expanded',String(expanded));
      el.querySelector('span').textContent = expanded ? '收起全文' : '展开全文';
      card.querySelector('.prompt-preview').tabIndex = expanded ? 0 : -1;
      if (!expanded && el.getBoundingClientRect().top < document.querySelector('.header').getBoundingClientRect().bottom) card.scrollIntoView({block:'start',behavior:'instant'});
    }
    else if (el.hasAttribute('data-install-source')) selectInstallSource(el);
    else if (el.hasAttribute('data-filter')) { promptFilter=el.dataset.filter;history.replaceState({...history.state,promptFilter},'','#prompts');const y=scrollY;route({focus:false,scroll:false});window.scrollTo(0,y);const active=[...document.querySelectorAll('[data-filter]')].find(b=>b.dataset.filter===promptFilter);active?.focus({preventScroll:true}); }
    else if (el.hasAttribute('data-download')) download(el.dataset.download);
    else if (el.hasAttribute('data-complete')) { const id=Number(el.dataset.complete);const wasDone=completed.includes(id);completed=wasDone?completed.filter(n=>n!==id):[...completed,id];saveProgress();route({focus:false,scroll:false});document.querySelector('[data-complete]')?.focus({preventScroll:true});toast(wasDone?'已撤销本章完成标记。':completed.length===6?'六章全部完成，开始把方法用在你的研究中。':'已记录本章进度，继续下一步。'); }
    else if(el.hasAttribute('data-search'))openSearch(el);
    else if(el.hasAttribute('data-close-search'))closeSearch();
    else if(el.hasAttribute('data-search-result')){closeSearch({restoreFocus:false});if(location.hash===el.getAttribute('href')){event.preventDefault();route();}}
    else if(el.getAttribute('href')?.startsWith('#') && location.hash===el.getAttribute('href') && event.button===0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey){event.preventDefault();route();}
    else if(el.classList.contains('menu-toggle')){const open=document.querySelector('#sidebar').classList.toggle('is-open');document.querySelector('.sidebar-overlay').hidden=!open;el.setAttribute('aria-expanded',String(open));el.setAttribute('aria-label',open?'关闭学习目录':'打开学习目录');}
    else if(el.classList.contains('sidebar-overlay'))closeMenu();
  });
  document.addEventListener('change',e=>{if(e.target.matches('[data-check]')){checked[e.target.dataset.check]=e.target.checked;saveProgress();}});
  document.addEventListener('keydown',e=>{
    const tab = e.target.closest('[data-install-source]');
    if (tab && ['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) {
      const tabs = [...tab.closest('[data-install-switcher]').querySelectorAll('[data-install-source]')];
      const index = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (tabs.indexOf(tab) + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      e.preventDefault();selectInstallSource(tabs[index], {focus:true});return;
    }
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch();}if(e.key==='Escape'&&!searchDialog.open)closeMenu();
  });
  searchInput.addEventListener('input',search);
  searchDialog.addEventListener('cancel',e=>{e.preventDefault();closeSearch();});
  searchDialog.addEventListener('click',e=>{if(e.target===searchDialog){const r=searchDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeSearch();}});
  window.addEventListener('hashchange',()=>route());
  route({focus:false,scroll:false,animate:true});
})();
