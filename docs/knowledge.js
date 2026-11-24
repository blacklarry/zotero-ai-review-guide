(() => {
  'use strict';

  const base = 'downloads/knowledge-base/';
  const publicBase = 'https://blacklarry.github.io/zotero-ai-review-guide/';
  const directories = [
    ['00_Inbox', '临时收集', '灵感、链接和待整理材料，定期归位。'],
    ['01_Daily', '日常计划', '每日计划、复盘与临时待办。'],
    ['02_Courses', '课程学习', '按学期和课程保存笔记、作业与要求。'],
    ['03_Literature', '文献阅读', '保留来源、元数据、摘录位置与个人理解。'],
    ['04_Research', '科研课题', '按课题组织问题、数据、实验、算法与结果。'],
    ['05_Projects', '工程项目', '保存硬件配置、构建、调试、测试与交付记录。'],
    ['06_Knowledge', '主题知识', '提炼可复用知识，用主题路径和 MOC 组织领域。'],
    ['07_Thesis', '论文工作台', '证据矩阵、章节草稿、图表引用与答辩准备。'],
    ['08_Outputs', '正式成果', '已提交、投稿或交付的版本，注明日期与状态。'],
    ['09_Templates', '笔记模板', '统一放置模板，按需插入新笔记。'],
    ['10_Assets', '共用附件', '跨笔记复用的 PDF、图片与绘图文件。'],
    ['98_Docs', '使用说明', '保存工具设置、维护规则与工作流说明。'],
    ['99_Archive', '结束归档', '保存已结束、短期不再维护的内容。']
  ];
  const copyTexts = {
    tree: ['research-vault/', ...directories.map(([name], i) => `${i === directories.length - 1 ? '└──' : '├──'} ${name}/`)].join('\n'),
    note: [
      '---',
      'title: "{{title}}"',
      'created: "{{date:YYYY-MM-DD}}"',
      'author: ""',
      'publication_date: ""',
      'source_url: ""',
      'citekey: ""',
      '---',
      '',
      '标签： #type/阅读 #status/待处理 #source/论文',
      '',
      '# {{title}}',
      '',
      '## 来源与阅读范围',
      '- 题名、作者、DOI / 链接：',
      '- 已读范围与附件位置：',
      '',
      '## 原文证据',
      '- 原文摘录：',
      '- 位置（章节 / 页码 / 表图）：',
      '',
      '## 我的理解',
      '- 核心结论与依据：',
      '- 适用条件与局限：',
      '',
      '## 下一步',
      '- [ ] 核对来源与证据位置',
      '- [ ] 将可复用观点提炼到 06_Knowledge',
      ''
    ].join('\n'),
    setup: [
      '请按以下公开起步包，在本机帮我搭建科研知识库目录：',
      `文字说明：${publicBase}${base}README.md`,
      `起步包：${publicBase}${base}knowledge-base-starter.zip`,
      '目标位置：[替换为本机目标文件夹路径]',
      '',
      '执行步骤：',
      '1. 如果目标位置尚未填写，先让我确认路径；如果目录中已有文件，先列出冲突，不要覆盖原有笔记。',
      '2. 下载并解压起步包，在目标位置下创建 research-vault/（含 13 个目录、基础模板和演示文件），保留相对链接。',
      '3. 模板中的 {{title}} 与 {{date:YYYY-MM-DD}} 留给 Obsidian 插入时自动替换，不要提前写死，也不要编造论文或实验数据。',
      '4. 完成后列出新建目录，并提示我在 Obsidian 中“打开文件夹为仓库”，将核心 Templates 目录设为 09_Templates。'
    ].join('\n')
  };
  copyTexts.imaQuestion = '请依据当前“嵌入式系统学习示例”知识库中的三份 STM32 资料，整理一份“最小工程 → GPIO/按键/LED → UART 调试”的学习顺序。每一步列出：准备事项、核心步骤、验证方法与注意事项，并附上来源文件名和引用位置；资料中未给出的具体型号、引脚或参数留空待填。';
  copyTexts.workbuddyIma = '请读取 ima 知识库“嵌入式系统学习示例”中的三份 STM32 资料，整理一份“GPIO 按键与 LED 排查”学习笔记，保留来源文件名，具体的板卡型号和引脚留待实际核对。整理完成后保存到该知识库的 STM32 分类下（如无法指定分类请告知实际保存位置）。';
  const copyLabels = {tree: '知识库目录', note: '阅读笔记示例', setup: '本机搭建指令', imaQuestion: 'STM32 知识库提问示例', workbuddyIma: 'WorkBuddy × ima 整理指令'};
  const searchItems = [
    {title: '搭建科研知识库', type: '知识库', body: 'Obsidian learning-of-zjnu 13目录 模板 下载 起步包 本机AI搭建 ' + copyTexts.tree, href: '#knowledge/obsidian'},
    {title: '从阅读笔记到知识笔记与 MOC', type: '知识库', body: '主题地图 双向链接 inline 属性标签 来源 证据', href: '#knowledge/obsidian'},
    {title: '科研课题、实验与论文证据链', type: '知识库', body: '数据集 代码Commit 实验记录 结果图表 论文工作台 备份 同步', href: '#knowledge/obsidian'},
    {title: 'ima 嵌入式系统知识库', type: '知识库', body: '腾讯 ima RK3588 STM32 FPGA 知识库 文件夹 上传 资料 溯源 问答 WorkBuddy 专家 技能 连接器 ima-mcp 保存笔记', href: '#knowledge/ima'}
  ];

  function resourceCard(icon) {
    return `<article class="resource-card"><div class="resource-card-icon">${icon('layers')}</div><span class="resource-format">Obsidian / ima · 两种方法</span><h2>搭建科研知识库</h2><p>用 Obsidian 管理本地目录与模板，或用 ima 整理资料并按知识库提问，附嵌入式系统 STM32 实战示例。</p><a class="btn btn-secondary" href="#knowledge">查看搭建教程 ${icon('arrow')}</a><div class="example-actions"><a href="${base}knowledge-base-starter.zip" download>Obsidian 起步包</a><a href="${base}README.md" download>Obsidian 文字说明</a></div></article>`;
  }

  function renderObsidian({icon, esc, crumb}) {
    const copyBlock = (id, label) => `<section class="prompt-box"><div class="prompt-box-head"><span>${icon('copy')} ${esc(label)}</span><button type="button" class="copy-btn" data-copy-knowledge="${id}">复制${id === 'tree' ? '目录' : id === 'note' ? '示例' : '搭建指令'}</button></div><pre>${esc(copyTexts[id])}</pre></section>`;
    const rows = directories.map(([name, use, rule]) => `<tr><th scope="row"><code>${esc(name)}</code></th><td>${esc(use)}</td><td>${esc(rule)}</td></tr>`).join('');
    return `${crumb('Obsidian 科研知识库')}
      <p class="knowledge-back"><a href="#knowledge">← 返回知识库搭建目录</a></p>
      <header class="page-intro"><div class="eyebrow">OBSIDIAN / RESEARCH KNOWLEDGE BASE</div><h1>让读过的文献，接得上正在做的研究。</h1><p>一套从实际科研流程沉淀出来的 Obsidian 目录与模板：先按场景归位，再保留出处，最后通过双向链接把阅读笔记、实验记录与论文章节串成证据链。</p><div class="page-meta"><span>${icon('layers')} 13 个目录 · 9 套基础模板</span><span>${icon('file')} 纯本地 Markdown</span><span>${icon('check')} 开箱即用起步包</span></div></header>
      <section class="workbuddy-downloads" aria-labelledby="kb-download"><div><h2 id="kb-download">从一个干净的起步包开始</h2><p>下载包内含 <code>research-vault/</code> 目录结构、9 套基础模板、入口说明，以及一份完整的示例课题与论文工作台。先跑通一次“阅读 → 提炼 → 写作”，再按自己的研究方向扩展。</p></div><div class="example-actions"><a class="btn btn-primary" href="${base}knowledge-base-starter.zip" download>下载知识库起步包 ${icon('download')}</a><a class="btn btn-secondary" href="${base}README.md" download>下载文字版说明 ${icon('file')}</a></div></section>
      <div class="callout"><strong>${icon('info')} 完全本地，零第三方插件依赖</strong>知识库全部基于标准 Markdown 文件和 Obsidian 核心功能，不需要预先折腾社区插件，随时可以自由迁移和备份。</div>
      <article class="workbuddy-content">
        <section class="worked-example" aria-labelledby="kb-open"><div class="eyebrow">STEP 01 / 打开并配置</div><h2 id="kb-open">打开仓库，启用核心模板</h2><ol class="practice-steps"><li>将起步包解压到新的空文件夹。打开 Obsidian，选择“打开文件夹为仓库”，选中里面的 <code>research-vault</code>。</li><li>进入“设置 → 核心插件”启用 <code>Templates</code>（模板），并将模板文件夹设为 <code>09_Templates</code>。以后新建笔记后，直接点“插入模板”即可套用。</li><li>核心模板自带 <code>{{title}}</code> 和 <code>{{date:YYYY-MM-DD}}</code> 变量，插入时会自动替换成当前文件名和当天日期；作者、来源等字段按实际论文填写即可。</li><li>打开 <code>00_开始这里.md</code> 和演示文件逛一圈，熟悉内部链接的跳转方式。留意阅读笔记里的 <code>created</code> 是记笔记的日期，<code>publication_date</code> 填论文发表年份。</li></ol><p class="case-scope">如果已经有现成的 Obsidian 库，先做好备份，只把需要的目录和模板拷进去合并，避免覆盖同名文件。</p></section>
        <section class="worked-example" aria-labelledby="kb-structure"><div class="eyebrow">STEP 02 / 目录与归位规则</div><h2 id="kb-structure">目录管场景，主题由路径和 MOC 组织</h2><p>放文件时只问一个问题：“它现在用来做什么？”论文阅读进文献区，实验记录进课题区，提炼出的通用方法进知识区——用双向链接连起来，不用到处复制粘贴。</p><div class="table-wrap"><table><caption>13 个一级目录与归档规则</caption><thead><tr><th scope="col">目录</th><th scope="col">使用场景</th><th scope="col">放入什么</th></tr></thead><tbody>${rows}</tbody></table></div>${copyBlock('tree', '可复制 · 一级目录清单')}<dl class="field-guide"><div><dt>领域与主题</dt><dd>放在 <code>06_Knowledge/研究方法/</code> 等主题子目录下，用 MOC（主题地图）和双向链接串起概念、阅读顺序与待解问题。</dd></div><div><dt>属性标签</dt><dd>只用来标状态和属性：<code>type/</code>、<code>status/</code>、<code>source/</code>、<code>priority/</code>，例如 <code>#type/阅读 #status/进行中 #source/论文</code>，统一写在正文的“标签：”行，不再拿学科领域重复打标。</dd></div><div><dt>图片与附件</dt><dd>单篇笔记专用的截图放在同级 <code>images/</code> 子文件夹；跨笔记复用的 PDF、图表放在 <code>10_Assets</code>。Obsidian 设置里可将“默认附件路径”设为“当前文件夹下的子文件夹”。</dd></div></dl></section>
        <section class="worked-example" aria-labelledby="kb-first-note"><div class="eyebrow">STEP 03 / 走通一次知识沉淀</div><h2 id="kb-first-note">一篇阅读笔记，一个知识点，一张主题地图</h2><p>挑一篇正在读的真实论文，亲手走完这三步，立刻就能体会到知识库和普通文件夹的区别：</p><ol class="practice-steps"><li><strong>记录来源。</strong>在 <code>03_Literature/</code> 新建一篇阅读笔记并插入阅读模板，填好题录、原文摘录和页码，再另起一段写自己的理解。</li><li><strong>提炼一个可复用观点。</strong>在 <code>06_Knowledge/研究方法/</code> 新建一篇原子笔记（如“证据定位与核验.md”），只讲清这一个方法及其适用条件，并用双链指向刚才那篇阅读笔记。</li><li><strong>串联主题地图（MOC）。</strong>在同目录建立 <code>0_MOC - 研究方法.md</code>，把相关笔记按阅读顺序组织起来（例如 <code>[[06_Knowledge/研究方法/证据定位与核验]]</code>），顺手记下还缺哪些资料。</li></ol>${copyBlock('note', '可复制 · 阅读笔记模板')}<p>通常某个主题攒够 5 篇左右笔记时最适合建 MOC；如果正高频用于写论文，提前建一张空地图当提纲也很顺手。</p></section>
        <section class="worked-example" aria-labelledby="kb-evidence"><div class="eyebrow">STEP 04 / 接上科研与写作</div><h2 id="kb-evidence">让论文章节直接连回实验与文献</h2><p><code>04_Research/课题名/</code> 记录研究过程，<code>05_Projects/项目名/</code> 管工程实现，<code>07_Thesis/</code> 写论文，<code>08_Outputs/</code> 存定稿。通用知识沉淀在 <code>06_Knowledge/</code>，用双链打通所有环节。</p><dl class="field-guide"><div><dt>科研课题</dt><dd>每个课题下按 <code>01_研究问题/</code>、<code>02_数据集/</code>、<code>03_实验记录/</code>、<code>04_模型与算法/</code>、<code>05_结果与图表/</code>、<code>06_周报与汇报/</code> 组织；涉及硬件采集可加 <code>07_设备与采集/</code>。</dd></div><div><dt>数据与实验</dt><dd>数据集档案记清来源、版本与划分方式；每次实验记下代码 Commit、数据版本、关键参数、随机种子和结果图表位置，方便复现与回查。</dd></div><div><dt>论文工作台</dt><dd>先在证据矩阵里对应好“论断 → 文献证据或实验结果 → 数据版本 / Commit”，写作时直接引用已确认的图表与笔记，避免把整份日志搬进草稿。</dd></div><div><dt>交付与归档</dt><dd>提交版放进 <code>08_Outputs</code> 并标明日期版本；课题结束后归入 <code>99_Archive</code>，顺手留一份简短复现说明。</dd></div></dl><p>起步包里内置了一套示例课题骨架（<code>04_Research/示例课题/</code>）并与 <code>07_Thesis/00_论文工作台.md</code> 建立了链接，打开就能直观参考结构。需要联动 Zotero 查文献时，可以配合 <a href="#workbuddy">WorkBuddy 接入</a> 或 <a href="#codex">Codex 接入</a> 一起用。</p></section>
        <section class="worked-example" aria-labelledby="kb-tools"><div class="eyebrow">按需扩展 / 保持克制</div><h2 id="kb-tools">先用核心功能，遇到痛点再加插件</h2><p>文件夹、双链和核心模板已经能解决 90% 的需求。等笔记量上来后，可以按实际需要挑选下面几款常用插件：</p><div class="table-wrap"><table><caption>常用进阶插件与使用场景</caption><thead><tr><th scope="col">插件</th><th scope="col">什么时候值得装</th></tr></thead><tbody><tr><th scope="row"><a href="https://blacksmithgu.github.io/obsidian-dataview/" target="_blank" rel="noopener noreferrer">Dataview</a></th><td>笔记变多，想按属性自动汇总文献或实验列表时。</td></tr><tr><th scope="row"><a href="https://silentvoid13.github.io/Templater/" target="_blank" rel="noopener noreferrer">Templater</a></th><td>需要比核心模板更灵活的自动化脚本或动态变量时（建议与核心 Templates 二选一，避免语法混用）。</td></tr><tr><th scope="row">Git</th><td>习惯用 Git 管理文本历史版本时（大体积 PDF 附件建议单独处理）。</td></tr><tr><th scope="row"><a href="https://github.com/zsviczian/obsidian-excalidraw-plugin" target="_blank" rel="noopener noreferrer">Excalidraw</a></th><td>想在笔记里随手画技术架构图、流程图或草图时。</td></tr><tr><th scope="row">附件命名 / 标签着色插件</th><td>截图很多需要统一命名，或希望用颜色快速区分状态标签时。</td></tr></tbody></table></div><p>安装社区插件前先看维护状态，拿测试库试过没问题再用到主力库。</p></section>
        <section class="worked-example" aria-labelledby="kb-maintain"><div class="eyebrow">每周 15 分钟 / 保持活力</div><h2 id="kb-maintain">轻量维护，比频繁重构目录更有效</h2><ol class="practice-steps"><li>清理 <code>00_Inbox</code>：把有价值的收集归位到对应目录，没用的直接删掉，不用强迫每天清空。</li><li>抽查本周新笔记：补全遗漏的来源或页码，顺手连上相关的旧笔记。</li><li>更新正在推进的主题 MOC，挑出下周最值得优先处理的 3–5 件事。</li><li>做好独立备份：云同步会把误删同步到所有设备，不能替代备份。定期把整个仓库冷备到另一块硬盘或网盘归档（详见 <a href="https://obsidian.md/help/backup" target="_blank" rel="noopener noreferrer">Obsidian 备份指南</a>）。</li></ol></section>
        <section class="worked-example" aria-labelledby="kb-ai"><div class="eyebrow">省事方式 / 本机 AI 助手</div><h2 id="kb-ai">让本机 AI 助手帮你建好空库</h2><p>把下方指令里的目标路径改成你自己的文件夹，发给支持操作本地文件的 AI 助手即可自动下载并初始化好整个起步目录。</p>${copyBlock('setup', '可复制 · 本机知识库搭建指令')}</section>
      </article>
      <section class="faq" aria-labelledby="kb-faq"><h2 id="kb-faq">常见问题</h2><details><summary>需要先搬走全部旧笔记吗？</summary><p>不需要。先建一个新库跑通一两周，觉得顺手了再按课题分批把旧笔记迁过来，避免一上来大规模改名导致链接失效。</p></details><details><summary>论文 PDF 放在 Zotero 还是 Obsidian？</summary><p>各司其职最好：Zotero 专心管 PDF 原文、批注和 Word 引用；Obsidian 存消化后的阅读笔记、观点关联和论文草稿。只有多篇笔记共用的参考图或资料才放进 <code>10_Assets</code>。</p></details><details><summary>用了这套模板和 MOC，知识库就算建好了吗？</summary><p>目录和模板只是架子，真正让知识库发挥作用的是你写下的个人理解、清晰的来源位置，以及围绕研究问题建立起来的真实关联。</p></details></section>
      <section class="workbuddy-sources" aria-labelledby="kb-sources"><h2 id="kb-sources">参考文档</h2><ul><li><a href="https://help.obsidian.md/Getting+started/Create+a+vault" target="_blank" rel="noopener noreferrer">Obsidian：创建与打开仓库</a> · <a href="https://help.obsidian.md/Plugins/Templates" target="_blank" rel="noopener noreferrer">核心 Templates 与变量</a></li><li><a href="https://help.obsidian.md/Linking+notes+and+files/Internal+links" target="_blank" rel="noopener noreferrer">内部链接</a> · <a href="https://help.obsidian.md/Editing+and+formatting/Attachments" target="_blank" rel="noopener noreferrer">附件保存位置</a></li><li><a href="https://help.obsidian.md/Editing+and+formatting/Properties" target="_blank" rel="noopener noreferrer">Properties 与标签</a> · <a href="https://help.obsidian.md/Extending+Obsidian/Community+plugins" target="_blank" rel="noopener noreferrer">社区插件</a></li></ul></section>`;
  }

  const imaBase = 'downloads/ima-embedded/';
  const imaArticle = 'https://blog.csdn.net/weixin_44251099/article/details/162903844';
  const imaOfficial = 'https://www.codebuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Knowledge-Base/IMA%20Knowledge%20Base/';
  const imaMaterials = [
    ['STM32', 'STM32-01-最小工程学习路线.md', '先记录板卡信息，再分开验证构建、下载与运行'],
    ['STM32', 'STM32-02-GPIO按键与LED排查.md', '按原理图核对引脚，分别学习输出、输入与中断'],
    ['STM32', 'STM32-03-UART与调试记录.md', '从单向发送开始，保留参数、日志与排查记录']
  ];
  const imaShots = {
    wbEntry:{file:'ima-workbuddy-entry-20261029.png',environment:'WorkBuddy 5.9.3'},
    wbConnector:{file:'ima-workbuddy-connector-20261029.png',environment:'WorkBuddy 连接器'},
    wbPrompt:{file:'ima-workbuddy-prompt-20261029.png',environment:'WorkBuddy 对话'},
    wbProcess:{file:'ima-workbuddy-process-20261029.png',environment:'WorkBuddy 对话'},
    wbResult:{file:'ima-workbuddy-result-20261029.png',environment:'WorkBuddy 对话'},
    createEntry:{file:'ima-create-entry-20261029.png',environment:'ima 桌面端'},
    createDialog:{file:'ima-create-dialog-20261029.png',environment:'ima 桌面端'},
    addMenu:{file:'ima-add-menu-20261029.png',environment:'ima 桌面端'},
    folders:{file:'ima-example-folders-20261029.png',environment:'ima 桌面端'},
    materials:{file:'ima-stm32-list-20261029.png',environment:'ima 桌面端'},
    reading:{file:'ima-stm32-reading-20261029.png',environment:'ima 桌面端'}
  };

  function renderIndex({icon, esc, crumb}) {
    return `${crumb('搭建知识库')}
      <header class="page-intro"><div class="eyebrow">RESEARCH KNOWLEDGE BASE</div><h1>选择一种知识库搭建方式。</h1><p>无论你习惯本地 Markdown 深度管理，还是偏好开箱即用的云端知识库问答，都可以直接从这里起步。</p></header>
      <div class="resource-grid knowledge-options">
        <article class="resource-card"><div class="resource-card-icon">${icon('folder')}</div><span class="resource-format">OBSIDIAN · 本地目录与模板</span><h2>把阅读与科研过程连起来</h2><p>13 个规范目录、9 套基础模板与科研证据链方法，打通文献阅读、课题实验与论文写作。</p><a class="btn btn-primary" href="#knowledge/obsidian">进入 Obsidian 教程 ${icon('arrow')}</a><div class="example-actions"><a href="${base}knowledge-base-starter.zip" download>下载起步包</a></div></article>
        <article class="resource-card"><div class="resource-card-icon">${icon('book')}</div><span class="resource-format">IMA · 资料整理与知识库问答</span><h2>用嵌入式资料练习建库</h2><p>以 RK3588、STM32、FPGA 三类主题为例，跑通建库、分类上传、溯源问答以及 WorkBuddy 联动。</p><a class="btn btn-primary" href="#knowledge/ima">进入 ima 教程 ${icon('arrow')}</a><div class="example-actions"><a href="${imaArticle}" target="_blank" rel="noopener noreferrer">参考文章</a></div></article>
      </div>
      <div class="callout"><strong>${icon('info')} 怎么选？</strong>追求纯本地掌控、双链沉淀与论文长文管理，选 <b>Obsidian</b>；想快速上传资料、基于知识库提问并与 WorkBuddy 协作整理，选 <b>ima</b>。两者也可以配合使用。</div>`;
  }

  function renderIma({icon, esc, crumb}) {
    const shot = (key, caption, pins = []) => imaShots[key] ? window.GUIDE_ZOTERO_GUIDES.figure({image:{...imaShots[key],local:true},caption,pins},{esc}) : '';
    const materialRows = imaMaterials.map(([folder, file, purpose]) => `<tr><th scope="row">${esc(folder)}</th><td><a href="${imaBase}materials/${encodeURIComponent(folder)}/${encodeURIComponent(file)}" download>${esc(file)}</a></td><td>${esc(purpose)}</td></tr>`).join('');
    return `${crumb('ima 嵌入式知识库')}
      <p class="knowledge-back"><a href="#knowledge">← 返回知识库搭建目录</a></p>
      <header class="page-intro"><div class="eyebrow">IMA / EMBEDDED SYSTEMS</div><h1>从 STM32 开始，搭一个能回查资料的知识库。</h1><p>用“嵌入式系统学习示例”演练 ima 建库全流程：按 RK3588、STM32、FPGA 建好分类，先往 STM32 导入三份起步资料，跑通归档、提问和 WorkBuddy 联动。</p><div class="page-meta"><span>${icon('folder')} 3 类主题</span><span>${icon('file')} 3 份 STM32 示例资料</span><span>${icon('check')} 含 WorkBuddy 联动</span></div></header>
      <section class="workbuddy-downloads" aria-labelledby="ima-download"><div><h2 id="ima-download">下载嵌入式示例资料包</h2><p>包内含 3 份 STM32 专题 Markdown 笔记（RK3588 与 FPGA 留作空分类方便你自行扩充），解压后即可直接导入 ima 练手。</p></div><div class="example-actions"><a class="btn btn-primary" href="${imaBase}ima-embedded-starter.zip" download>下载嵌入式示例资料 ${icon('download')}</a><a class="btn btn-secondary" href="https://ima.qq.com/download" target="_blank" rel="noopener noreferrer">打开 ima 官网 ${icon('up')}</a></div></section>
      <article class="workbuddy-content">
        <section class="worked-example operation-guide" aria-labelledby="ima-create"><div class="eyebrow">STEP 01 / 新建主题库</div><h2 id="ima-create">围绕具体学习目标建库</h2><p>在 ima 中新建个人知识库，命名为“嵌入式系统学习示例”。按主题单独建库，提问时检索范围更精准，不容易混入无关笔记。</p><ol class="practice-steps"><li><p>点击左侧“知识库”，再点击“个人知识库”右侧的“＋”。</p>${shot('createEntry','打开个人知识库的新建入口。',[[20,76,'点击“知识库”'],[86,14,'点击个人知识库右侧“＋”']])}</li><li><p>在弹窗中填写知识库名称、按需选择封面，点击“确认”完成创建。</p>${shot('createDialog','输入知识库名称并点击“确认”。',[[92,16,'填写知识库名称'],[91,86,'点击“确认”']])}</li></ol></section>
        <section class="worked-example operation-guide" aria-labelledby="ima-organize"><div class="eyebrow">STEP 02 / 分清主题</div><h2 id="ima-organize">建好三个分类，先集中做透 STM32</h2><p>点击库内右上角“新增 → 新建文件夹”，依次创建 RK3588、STM32、FPGA 三个目录，再点进 STM32 文件夹添加资料，避免文件全堆在根目录。</p>${shot('addMenu','打开右上角“新增”，先建文件夹分类，再导入本地文件。',[[96.7,20.4,'打开右上角“新增”'],[95,92,'选择“新建文件夹”'],[95,36,'进入目录后用“本地文件”导入']])}<div class="table-wrap"><table><caption>示例库分类规划</caption><thead><tr><th scope="col">主题</th><th scope="col">首批内容</th><th scope="col">练习重点</th></tr></thead><tbody><tr><th scope="row">RK3588</th><td>预留分类</td><td>后续可补充开发板与外设资料</td></tr><tr><th scope="row">STM32</th><td>最小工程、GPIO/按键/LED、UART</td><td>跑通分类归档、带出处提问与调试记录沉淀</td></tr><tr><th scope="row">FPGA</th><td>预留分类</td><td>后续可补充工具链与时序资料</td></tr></tbody></table></div>${shot('folders','创建完成后的三个主题文件夹（STM32 已导入 3 份资料）。')}</section>
        <section class="worked-example operation-guide" aria-labelledby="ima-import"><div class="eyebrow">STEP 03 / 导入并检查</div><h2 id="ima-import">批量导入资料，抽查解析效果</h2><p>解压示例包，进入 STM32 文件夹点击“新增 → 本地文件”上传三份 Markdown。上传完成后点开任意一篇检查排版和正文是否解析完整。</p><div class="table-wrap"><table><caption>三份 STM32 示例学习资料</caption><thead><tr><th scope="col">分类</th><th scope="col">文件</th><th scope="col">核心内容</th></tr></thead><tbody>${materialRows}</tbody></table></div>${shot('materials','STM32 文件夹内的三份学习资料。')}${shot('reading','点开首篇 Markdown 确认正文排版清晰可读。')}<p class="case-scope">三份示例资料为通用学习路线，实际开发时的具体芯片型号、引脚定义与时钟参数请对照手头开发板的官方手册补充。</p></section>
        <section class="worked-example operation-guide" aria-labelledby="ima-ask"><div class="eyebrow">STEP 04 / 带着材料提问</div><h2 id="ima-ask">限定知识库范围，让回答可溯源</h2><p>选中这个知识库（或仅选中 STM32 文件夹）开始提问。要求回答附上来源文件名和引用链接，方便点开回查原笔记，避免 AI 自行脑补型号或引脚号。</p><section class="prompt-box"><div class="prompt-box-head"><span>${icon('spark')} 可复制 · STM32 学习顺序提问</span><button type="button" class="copy-btn" data-copy-knowledge="imaQuestion">复制提问</button></div><pre>${esc(copyTexts.imaQuestion)}</pre></section><p>把核对好的回答顺手保存为新的学习笔记，逐步把分散资料沉淀成自己的排查手册。</p></section>
        <section class="worked-example operation-guide" aria-labelledby="ima-workbuddy"><div class="eyebrow">STEP 05 / 配合 WorkBuddy</div><h2 id="ima-workbuddy">连接 ima，用对话自动整理并写回知识库</h2><p>把 ima 接入 WorkBuddy 后，可以让 AI 直接读取知识库资料、帮你梳理结构化报告并存回指定库。下面以一次外设调研任务为例演示操作路径，练手时可直接用下方的 STM32 指令。</p>
          <h3>先连接：打开入口 → 切换连接器 → 选择 ima</h3><ol class="practice-steps"><li><p>点击 WorkBuddy 左侧导航栏的“专家·技能·连接器”，在顶部切换到“连接器”页签。</p>${shot('wbEntry','打开左侧“专家·技能·连接器”，切换到顶部的“连接器”。',[[43,55,'点击“专家·技能·连接器”'],[96,20.4,'切换到“连接器”页签']])}</li><li><p>找到 ima 卡片点进去按提示完成账号授权，返回列表看到绿色状态点即表示连接成功。</p>${shot('wbConnector','点开 ima 卡片完成授权，绿点亮起即已连通。',[[45,20,'选择 ima 卡片'],[79,18,'绿色已连接状态']])}</li></ol>
          <h3>再对话：下达任务 → 观察调用 → 回库确认</h3><ol class="practice-steps"><li><p>新建任务，写清要整理的主题、来源知识库全称和输出要求，点击发送（写完整库名比写“刚才建的库”更不容易找错）。</p>${shot('wbPrompt','明确写清任务目标与目标知识库名称后发送。',[[49,38,'写明任务与目标知识库'],[96,61,'点击发送']])}<p>结合前面的 STM32 资料，可以直接复制下面这条指令试试：</p><section class="prompt-box"><div class="prompt-box-head"><span>${icon('spark')} 可复制 · 整理并保存到 ima</span><button type="button" class="copy-btn" data-copy-knowledge="workbuddyIma">复制指令</button></div><pre>${esc(copyTexts.workbuddyIma)}</pre></section></li><li><p>观察对话中的工具调用记录（如 <code>ima-mcp</code> 读取列表和写入目标库）；若 AI 询问要存到哪个库，直接回复完整库名即可。</p>${shot('wbProcess','确认工具调用与目标知识库名称正确。',[[20,15,'查看 ima 工具调用'],[79,95,'核对目标知识库名']])}</li><li><p>查看生成的报告结构与待确认项，完成后切回 ima 打开目标知识库，检查新生成的笔记位置和内容；关键硬件参数记得再对照一次官方手册。</p>${shot('wbResult','查看整理结果与待确认事项，随后回 ima 核对入库笔记。',[[24,4,'查看报告结构'],[28,97,'确认待补或待核对事项']])}</li></ol><p><a href="${imaOfficial}01-Workbuddy-IMA-Basic-Guide" target="_blank" rel="noopener noreferrer">查看 WorkBuddy × ima 官方指引 ↗</a></p></section>
      </article>
      <section class="workbuddy-sources" aria-labelledby="ima-sources"><h2 id="ima-sources">参考资料</h2><ul><li><a href="${imaArticle}" target="_blank" rel="noopener noreferrer">参考教程：WorkBuddy + IMA 个人知识库实战（小墨同学boy）</a></li><li><a href="https://ima.qq.com/download" target="_blank" rel="noopener noreferrer">ima 官网与客户端下载</a></li><li><a href="${imaOfficial}02-Build-Knowledge-Base" target="_blank" rel="noopener noreferrer">WorkBuddy 官方：建立与维护知识库</a></li><li><a href="${imaBase}README.md" download>示例资料说明与 ST 官方链接索引</a></li></ul></section>`;
  }

  function render(helpers, section = '') {
    if (section === 'obsidian') return renderObsidian(helpers);
    if (section === 'ima') return renderIma(helpers);
    return renderIndex(helpers);
  }

  window.GUIDE_KNOWLEDGE = {render, resourceCard, copyTexts, copyLabels, searchItems};
})();
