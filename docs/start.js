(() => {
  'use strict';

  function render({icon, esc, crumb}) {
    const choices = [
      {
        id: 'workbuddy',
        name: 'WorkBuddy',
        platform: 'WorkBuddy 桌面版',
        symbol: 'spark',
        description: '浏览 Zotero 分类，查找已收藏论文，按需阅读正文。'
      },
      {
        id: 'codex',
        name: 'Codex',
        platform: '桌面本机任务 / 同机 CLI',
        symbol: 'layers',
        description: '检索 Zotero 文献，核对引用键，定位论文中的证据。'
      }
    ];

    const cards = choices.map(choice => `
      <a class="entry-card" href="#${choice.id}" aria-labelledby="entry-${choice.id}-title" aria-describedby="entry-${choice.id}-description">
        <div class="entry-card-top"><span class="entry-card-icon">${icon(choice.symbol)}</span><span class="entry-platform">${esc(choice.platform)}</span></div>
        <h2 id="entry-${choice.id}-title">${esc(choice.name)}</h2>
        <p id="entry-${choice.id}-description" class="entry-card-description">${esc(choice.description)}</p>
        <ul class="entry-features"><li>${icon('copy')} 自助安装指令</li><li>${icon('download')} 配置与技能下载包</li></ul>
        <span class="entry-card-action">查看 ${esc(choice.name)} 接入教程 ${icon('arrow')}</span>
      </a>`).join('');

    return `${crumb('选择接入')}
      <section class="entry-page" aria-labelledby="entry-title">
        <header class="entry-intro">
          <p class="entry-kicker">开始之前 · 可选接入</p>
          <h1 id="entry-title">先选一个文献助手。</h1>
          <p class="entry-description">把 Zotero 文献库接入你常用的助手。选择一种接入方式，或先阅读教程。</p>
        </header>
        <div class="entry-skip-area">
          <a class="entry-skip" href="#home">跳过，直接阅读教程 ${icon('book')}</a>
          <p>无需先安装，接入也可稍后从目录进入。</p>
        </div>
        <div class="entry-grid">${cards}</div>
      </section>`;
  }

  window.GUIDE_START = {render};
})();
