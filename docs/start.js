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
      },
      {
        id: 'zotero-plugins',
        name: 'Zotero 插件',
        platform: '插件管理 / 中文社区',
        symbol: 'grid',
        description: '查找桌面插件与中文社区资料，核对来源、版本和安装方法。',
        action: '查看 Zotero 插件指南',
        features: [
          {symbol:'grid',title:'插件市场与中文社区',description:'按实际用途查找插件与使用资料。'},
          {symbol:'check',title:'安装与兼容核查',description:'核对安装步骤、来源和适用版本。'}
        ]
      },
      {
        id: 'knowledge',
        name: '搭建知识库',
        platform: 'Obsidian / ima + WorkBuddy',
        symbol: 'folder',
        description: '用 Obsidian 管理本地目录与模板，或用 ima + WorkBuddy 整理资料、按知识库提问。',
        action: '选择知识库搭建方式',
        features: [
          {symbol:'folder',title:'Obsidian 本地知识库',description:'保留目录、模板与科研证据链。'},
          {symbol:'book',title:'ima + WorkBuddy',description:'从 STM32 示例整理资料与来源。'}
        ]
      }
    ];

    const assistantFeatures = [
      {symbol:'copy',title:'自助安装指令',description:'复制安装指令，按步骤完成接入。'},
      {symbol:'download',title:'配置与技能下载包',description:'下载配置与中文技能，按需使用。'}
    ];
    const cards = choices.map(choice => `
      <a class="entry-card" href="#${choice.id}" aria-labelledby="entry-${choice.id}-title" aria-describedby="entry-${choice.id}-description">
        <div class="entry-card-top"><span class="entry-card-icon">${icon(choice.symbol)}</span><div class="entry-card-heading"><span class="entry-platform">${esc(choice.platform)}</span><h2 id="entry-${choice.id}-title">${esc(choice.name)}</h2></div></div>
        <p id="entry-${choice.id}-description" class="entry-card-description">${esc(choice.description)}</p>
        <ul class="entry-features">${(choice.features || assistantFeatures).map(feature => `<li>${icon(feature.symbol)}<div><strong>${esc(feature.title)}</strong><small>${esc(feature.description)}</small></div></li>`).join('')}</ul>
        <span class="entry-card-action">${esc(choice.action || `查看 ${choice.name} 接入教程`)} ${icon('arrow')}</span>
      </a>`).join('');

    return `${crumb('选择开始方式')}
      <section class="entry-page" aria-labelledby="entry-title">
        <header class="entry-intro">
          <h1 id="entry-title">选择你的开始方式。</h1>
          <p class="entry-description">接入 WorkBuddy 或 Codex，查看 Zotero 插件，或搭建 Obsidian / ima 知识库。也可以先阅读教程，再按需要配置工具。</p>
        </header>
        <div class="entry-grid">${cards}</div>
        <div class="entry-skip-area">
          <a class="entry-skip" href="#home">跳过，直接阅读教程 ${icon('book')}</a>
          <p>无需先安装，工具接入与知识库搭建都可稍后从目录进入。</p>
        </div>
      </section>`;
  }

  window.GUIDE_START = {render};
})();
