(() => {
  'use strict';

  const base = 'downloads/knowledge-base/';
  const publicBase = 'https://blacklarry.github.io/zotero-ai-review-guide/';
  const directories = [
    ['00_Inbox', '临时收集', '灵感、链接和待整理材料；处理后再归位。'],
    ['01_Daily', '日常计划', '每日计划、复盘与临时待办。'],
    ['02_Courses', '课程学习', '按学期和课程保存笔记、作业与要求。'],
    ['03_Literature', '文献阅读', '保留来源、元数据、摘录位置与个人理解。'],
    ['04_Research', '科研课题', '按课题组织问题、数据、实验、算法与结果。'],
    ['05_Projects', '工程项目', '保存硬件配置、构建、调试、测试与交付证据。'],
    ['06_Knowledge', '主题知识', '提炼可复用知识；主题路径和 MOC 组织领域。'],
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
      'publication_date: "待核验"',
      'source_url: ""',
      'citekey: ""',
      '---',
      '',
      '标签： #type/阅读 #status/待处理 #source/论文',
      '',
      '# {{title}}',
      '',
      '## 来源与阅读范围',
      '- 题名、作者、DOI / 链接：待填写',
      '- 已读范围与附件位置：待填写',
      '',
      '## 原文证据',
      '- 原文摘录：待核验',
      '- 位置（章节 / 页码 / 表图）：待核验',
      '',
      '## 我的理解',
      '- 能支持的判断：待核验',
      '- 条件、局限与不能推出的结论：待核验',
      '',
      '## 可提炼的知识与下一步',
      '- 先写清可复用观点和依据，再建立真实相关的链接。',
      '- [ ] 核对来源与证据位置',
      '- [ ] 将已确认的观点提炼到 06_Knowledge',
      ''
    ].join('\n'),
    setup: [
      '请按以下公开教程，在本机搭建一个科研知识库起步目录。',
      `文字说明：${publicBase}${base}README.md`,
      `起步包：${publicBase}${base}knowledge-base-starter.zip`,
      '目标位置：[替换为我指定的本机目标文件夹]。如未替换目标位置，先让我给出路径，不猜测。',
      '先读取说明并检查目标位置、下载包的文件清单与解压路径。仅在该目标下的新目录中创建 research-vault；文件必须留在预定目标内。',
      '如果目标中已有文件或已有知识库，先列出冲突和拟新增内容；不覆盖、不删除、不移动原文件。改用新的空子目录，或等待我指定合并范围。',
      '创建 13 个约定目录、基础模板、入口说明与标明“演示”的课题和论文工作台；保留起步包的相对链接。',
      '核心模板的 {{title}} 和 {{date:YYYY-MM-DD}} 由 Obsidian 插入时替换；其余字段手填，不把占位符当成已完成配置。',
      '不读取或上传我的其他私人笔记、日记、账号配置和原始研究数据。不安装社区插件，不修改我的产品配置。',
      '不凭空填写论文、DOI、实验参数、结果、数据版本或代码 Commit；未知处保留“待填写 / 待核验”。',
      '检查新文件编码、内部链接目标与文件清单。最后只报告实际新建的文件、链接检查结果及仍需我完成的操作。',
      '提示我在 Obsidian 中选择“打开文件夹为仓库”，打开 research-vault；在核心 Templates 中将模板目录设为 09_Templates。不要把文件已创建称为桌面安装已验证。'
    ].join('\n')
  };
  const copyLabels = {tree: '知识库目录', note: '阅读笔记示例', setup: '本机搭建指令'};
  const searchItems = [
    {title: '搭建科研知识库', type: '知识库', body: 'Obsidian learning-of-zjnu 13目录 模板 下载 起步包 本机AI搭建 ' + copyTexts.tree, href: '#knowledge'},
    {title: '从阅读笔记到知识笔记与 MOC', type: '知识库', body: '主题地图 双向链接 inline 属性标签 来源 证据', href: '#knowledge'},
    {title: '科研课题、实验与论文证据链', type: '知识库', body: '数据集 代码Commit 实验记录 结果图表 论文工作台 备份 同步', href: '#knowledge'}
  ];

  function resourceCard(icon) {
    return `<article class="resource-card"><div class="resource-card-icon">${icon('layers')}</div><span class="resource-format">Obsidian · 目录 + 模板</span><h2>搭建科研知识库</h2><p>从文献阅读到课题、实验和论文，把笔记组织成可追溯的工作流。附公开起步包和本机搭建指令。</p><a class="btn btn-secondary" href="#knowledge">查看搭建教程 ${icon('arrow')}</a><div class="example-actions"><a href="${base}knowledge-base-starter.zip" download>下载起步包</a><a href="${base}README.md" download>文字版说明</a></div></article>`;
  }

  function render({icon, esc, crumb}) {
    const copyBlock = (id, label) => `<section class="prompt-box"><div class="prompt-box-head"><span>${icon('copy')} ${esc(label)}</span><button type="button" class="copy-btn" data-copy-knowledge="${id}">复制${id === 'tree' ? '目录' : id === 'note' ? '示例' : '搭建指令'}</button></div><pre>${esc(copyTexts[id])}</pre></section>`;
    const rows = directories.map(([name, use, rule]) => `<tr><th scope="row"><code>${esc(name)}</code></th><td>${esc(use)}</td><td>${esc(rule)}</td></tr>`).join('');
    return `${crumb('搭建科研知识库')}
      <header class="page-intro"><div class="eyebrow">OBSIDIAN / RESEARCH KNOWLEDGE BASE</div><h1>让读过的文献，接得上正在做的研究。</h1><p>从 learning-of-zjnu 的真实目录规范与模板中提炼：先归位，再保留依据，最后连接到知识、课题与论文。这里提供重新整理的公开模板和演示，不发布原私人笔记。</p><div class="page-meta"><span>${icon('layers')} 13 个目录 · 基础模板</span><span>${icon('file')} 本地 Markdown 文件</span><span>${icon('check')} 整理：2026-10-19</span></div></header>
      <section class="workbuddy-downloads" aria-labelledby="kb-download"><div><h2 id="kb-download">从一个空目录开始</h2><p>起步包包含 <code>research-vault/</code>、9 个基础模板、目录约定、入口说明、演示课题和论文工作台。先跑通一次阅读到输出，再按研究需要扩展。</p></div><div class="example-actions"><a class="btn btn-primary" href="${base}knowledge-base-starter.zip" download>下载知识库起步包 ${icon('download')}</a><a class="btn btn-secondary" href="${base}README.md" download>下载文字版说明 ${icon('file')}</a></div></section>
      <div class="callout"><strong>${icon('info')} 网站提供方法和文件</strong>本页不会读取或改动你的本地知识库。下载包不包含私人笔记、账号配置、社区插件或真实研究数据；示例中的空白需要你用真实来源补齐。</div>
      <article class="workbuddy-content">
        <section class="worked-example" aria-labelledby="kb-open"><div class="eyebrow">STEP 01 / 打开并配置</div><h2 id="kb-open">先打开仓库，再插入第一张模板</h2><ol class="practice-steps"><li>下载并解压到一个新的空文件夹。在 Obsidian 的仓库选择界面使用“打开文件夹为仓库”，选择解压后的 <code>research-vault</code>，不要误选外层下载目录。</li><li>在“设置 → 核心插件”启用 <code>Templates</code>（模板），将模板文件夹设为 <code>09_Templates</code>。先创建并命名笔记，再通过“插入模板”选择对应模板。</li><li>核心模板支持 <code>{{title}}</code> 和 <code>{{date:YYYY-MM-DD}}</code>。它们分别取当前文件名和插入当天的日期；作者、来源、研究问题等其他字段需要手填，未替换的说明文字也需核对。</li><li>先打开入口说明和演示文件，尝试一次内部链接。阅读笔记的 <code>created</code> 是记录日期，<code>publication_date</code> 是文献发表日期；未知时写“待核验”，不要拿今天代替。</li></ol><p class="case-scope">已有 Obsidian 库：先做一份可恢复的备份，再只合并需要的目录与模板；同名文件逐项比较，保留原文件。不要把整个起步包覆盖到现有库里。</p></section>
        <section class="worked-example" aria-labelledby="kb-structure"><div class="eyebrow">STEP 02 / 约定归位规则</div><h2 id="kb-structure">目录管场景，主题由路径和 MOC 组织</h2><p>一篇材料先回答“现在用来做什么”。论文阅读留在文献区，某次实验留在课题区；从中提炼的通用方法进入知识区，通过链接保留关系，不反复复制全文。</p><div class="table-wrap"><table><caption>13 个一级目录及最小归档规则</caption><thead><tr><th scope="col">目录</th><th scope="col">使用场景</th><th scope="col">放入什么</th></tr></thead><tbody>${rows}</tbody></table></div>${copyBlock('tree', '可复制 · 一级目录清单')}<dl class="field-guide"><div><dt>领域与主题</dt><dd>放在 <code>06_Knowledge/研究方法/</code> 等主题路径中，用 MOC 和双向链接表达关系。MOC 是“主题地图”，不仅是全部链接的堆叠。</dd></div><div><dt>属性标签</dt><dd>只描述 <code>type/</code>、<code>status/</code>、<code>source/</code>、<code>priority/</code>，例如 <code>#type/阅读 #status/进行中 #source/论文</code>。本方案统一放在正文的“标签：”行，领域不再重复做标签。</dd></div><div><dt>图片与附件</dt><dd>笔记专用图片放在同级 <code>images/</code> 子目录；跨笔记复用的 PDF、图片与绘图文件放入 <code>10_Assets</code>。Obsidian 的附件位置设置可按此约定选择“当前文件夹下的子文件夹”。</dd></div></dl><p class="case-scope">正文 inline 标签是本库的组织约定。Obsidian 本身也支持 Properties / YAML 中的 tags；选择这里的写法是为了保持项目规则一致，并非产品限制。</p></section>
        <section class="worked-example" aria-labelledby="kb-first-note"><div class="eyebrow">STEP 03 / 走通一次知识沉淀</div><h2 id="kb-first-note">一篇阅读笔记，一个知识点，一张主题地图</h2><p>下面是由你按模板新建的练习，不是 ZIP 中已填好的阅读与知识笔记，也不代表已核验的论文、实验或研究结论。请使用自己的真实来源完成练习。</p><ol class="practice-steps"><li><strong>记录来源。</strong>在 <code>03_Literature/</code> 创建“阅读示例 - 待填写.md”，插入阅读模板。用真实论文填写元数据、阅读范围、摘录及其位置，再单独写自己的理解。</li><li><strong>提炼一个可复用问题。</strong>例如在 <code>06_Knowledge/研究方法/</code> 创建“证据定位与核验.md”。只讨论这一个方法，写明适用条件，并链接到实际支持它的阅读笔记；未核对前不写成确定结论。</li><li><strong>建立主题路径。</strong>在同目录用“0_MOC - 研究方法.md”组织概念、阅读顺序、待解决问题和可输出方向。内部链接可写成 <code>[[06_Knowledge/研究方法/证据定位与核验]]</code>；文件还不存在时，链接只会留下待建入口，不等于已有依据。</li></ol>${copyBlock('note', '可复制 · 阅读模板最小示例')}<p>某个主题积累约 5 篇笔记时，可考虑建立 MOC；这是原库采用的经验阈值，可以调整。开始频繁用于研究或写作时，也可以提前建立，不必为了数量硬凑笔记和链接。</p><p class="case-scope">阅读模板中的 <code>{{title}}</code> 与日期在 Obsidian 插入时处理；直接复制成普通文件时，需自行替换。正文中的证据和来源始终需要人工核验。</p></section>
        <section class="worked-example" aria-labelledby="kb-evidence"><div class="eyebrow">STEP 04 / 接上科研与写作</div><h2 id="kb-evidence">让每项论文判断都能回到依据</h2><p><code>04_Research/课题名/</code> 负责研究过程，<code>05_Projects/项目名/</code> 负责工程实现，<code>07_Thesis/</code> 负责论证与写作，<code>08_Outputs/</code> 保存正式提交版本。通用知识仍回到 <code>06_Knowledge/</code>，用链接连接这些场景。</p><dl class="field-guide"><div><dt>科研课题</dt><dd>课题主页组织 <code>01_研究问题/</code>、<code>02_数据集/</code>、<code>03_实验记录/</code>、<code>04_模型与算法/</code>、<code>05_结果与图表/</code>、<code>06_周报与汇报/</code>；涉及硬件和采集时，可加 <code>07_设备与采集/</code>。同一课题的 <code>research_id</code> 保持一致。</dd></div><div><dt>数据与实验</dt><dd>数据集档案说明来源、版本、划分、限制和位置。一次实验记录代码 Commit、数据版本、环境、参数、随机性控制、结果位置和下一步；没有运行就写“未运行”，不能填示例性能冒充实测。</dd></div><div><dt>论文工作台</dt><dd>先在证据矩阵中逐项关联“论断 → 文献证据或实验结果 → 数据版本 / Commit”。章节引用已核验的结果图表，不复制整份实验日志；不被证据支持的内容保留为假设或待验证问题。</dd></div><div><dt>交付与归档</dt><dd>正式稿进入 <code>08_Outputs</code>，记录版本和日期；结束的课题或项目归入 <code>99_Archive</code> 前检查链接，并保留必要的复现说明。</dd></div></dl><p>包内已有三份过程演示：<code>04_Research/示例课题/01_研究问题/演示研究问题.md</code>、<code>04_Research/示例课题/02_数据集/演示数据集档案.md</code>、<code>04_Research/示例课题/03_实验记录/演示实验记录.md</code>，并连接到 <code>07_Thesis/00_论文工作台.md</code>。它们均为待填写、未运行的占位示例，不提供真实研究结果。</p><p>需要查阅 Zotero 中的文献时，可选用 <a href="#workbuddy">WorkBuddy 接入</a> 或 <a href="#codex">Codex 接入</a>。检索提供来源入口，知识库负责保存经过核对的理解与证据关系。</p></section>
        <section class="worked-example" aria-labelledby="kb-tools"><div class="eyebrow">按需扩展 / 先保持简单</div><h2 id="kb-tools">先用核心功能，插件按问题添加</h2><p>文件夹、Markdown、内部链接与核心 Templates 足以完成上面的流程。原库配置中可见以下可选插件；这里列出它们可承担的用途，不代表已逐项运行实测。起步包不安装、不捆绑插件，也不承诺不同版本之间的兼容性。</p><div class="table-wrap"><table><caption>可选能力与实际用途</caption><thead><tr><th scope="col">能力</th><th scope="col">何时再考虑</th></tr></thead><tbody><tr><th scope="row"><a href="https://blacksmithgu.github.io/obsidian-dataview/" target="_blank" rel="noopener noreferrer">Dataview</a></th><td>笔记数量增加，确实需要按属性生成列表时。</td></tr><tr><th scope="row"><a href="https://silentvoid13.github.io/Templater/" target="_blank" rel="noopener noreferrer">Templater</a></th><td>核心模板不足，需要更复杂的模板逻辑时；不要把两套语法混用。</td></tr><tr><th scope="row">Git</th><td>需要跟踪文本修改和版本；大附件与敏感文件单独制定策略。</td></tr><tr><th scope="row"><a href="https://github.com/zsviczian/obsidian-excalidraw-plugin" target="_blank" rel="noopener noreferrer">Excalidraw</a></th><td>需要在笔记中维护手绘结构、流程或方案图时。</td></tr><tr><th scope="row">图片命名工具、Colored Tags</th><td>附件命名或标签辨识出现具体需求时；不作为阅读和链接的前提。</td></tr></tbody></table></div><p>安装社区插件前，查看来源、维护状态和所需权限，并先在测试库验证。出现兼容问题时，先回到核心功能完成工作。</p></section>
        <section class="worked-example" aria-labelledby="kb-maintain"><div class="eyebrow">每周一次 / 维护可用性</div><h2 id="kb-maintain">少量维护，比不断搬目录更有效</h2><ol class="practice-steps"><li>处理 Inbox：删除无价值的临时材料或归位到正确场景，保留来源，不要求每天清空。</li><li>抽查最近新增笔记的来源、待核验项和内部链接；链接要解释关系，暂时没有合适关联就明确标记“待关联”。</li><li>更新正在使用的主题 MOC，补充阅读路径和知识缺口；每周选 3～5 项最值得处理的事项即可。</li><li>抽查论文证据矩阵：结果能否回到实验、数据版本与代码，引用能否回到原文位置；优先补证据，再润色表达。</li><li>保留独立、可恢复的备份，并定期试恢复。同步会传播误删和错误修改，不能替代备份；Git 版本历史也需要配合独立副本与附件方案。<a href="https://obsidian.md/help/backup" target="_blank" rel="noopener noreferrer">备份官方说明</a>。</li></ol></section>
        <section class="worked-example" aria-labelledby="kb-ai"><div class="eyebrow">可选方式 / 本机文件助手</div><h2 id="kb-ai">让 AI 按公开说明搭建空库</h2><p>将指令中的目标文件夹替换为你希望保存的位置，再交给能读取链接、下载文件并操作本机文件的助手。它只负责创建起步文件，Obsidian 中的打开仓库和核心模板设置仍以实际完成情况为准。</p>${copyBlock('setup', '可复制 · 本机知识库搭建指令')}<p class="case-scope">这是通用的本地文件搭建提示，不涉及 WorkBuddy 或 Codex 的产品设置。若助手没有联网或文件权限，可自行下载解压，继续按第一步操作。</p></section>
      </article>
      <section class="faq" aria-labelledby="kb-faq"><h2 id="kb-faq">容易混淆的几件事</h2><details><summary>需要先搬走全部旧笔记吗？</summary><p>不需要。先用一个新库走通流程，或在备份后选择少量文件试整理。旧库按需迁移，并核对附件和链接，避免一次性批量改名。</p></details><details><summary>论文 PDF 应放进知识库还是 Zotero？</summary><p>Zotero 可继续管理文献条目和附件；知识库保存阅读理解、证据位置和关联。需要跨笔记复用的附件才放入 <code>10_Assets</code>，不用重复复制全部 PDF。</p></details><details><summary>用了模板和 MOC，是否就已经形成知识库？</summary><p>目录和模板只是入口。真正可用的内容需要来源、自己的理解、适用边界和真实相关的链接；论文与实验仍要保留可追溯的证据。</p></details></section>
      <section class="workbuddy-sources" aria-labelledby="kb-sources"><h2 id="kb-sources">来源与核验范围</h2><p>2026-10-19 已读取 learning-of-zjnu 的目录规范、知识库宪法和相关模板，按一致规则改写为公开教程；同时核对下列 Obsidian 官方说明正文。公开文件不包含私人研究正文、日记或账号配置；未代替用户完成桌面安装全流程。</p><ul><li><a href="https://help.obsidian.md/Getting+started/Create+a+vault" target="_blank" rel="noopener noreferrer">Obsidian：创建与打开仓库</a> · <a href="https://help.obsidian.md/Plugins/Templates" target="_blank" rel="noopener noreferrer">核心 Templates 与变量</a></li><li><a href="https://help.obsidian.md/Linking+notes+and+files/Internal+links" target="_blank" rel="noopener noreferrer">内部链接</a> · <a href="https://help.obsidian.md/Editing+and+formatting/Attachments" target="_blank" rel="noopener noreferrer">附件保存位置</a></li><li><a href="https://help.obsidian.md/Editing+and+formatting/Properties" target="_blank" rel="noopener noreferrer">Properties 与标签</a> · <a href="https://help.obsidian.md/Extending+Obsidian/Community+plugins" target="_blank" rel="noopener noreferrer">社区插件</a></li></ul></section>`;
  }

  window.GUIDE_KNOWLEDGE = {render, resourceCard, copyTexts, copyLabels, searchItems};
})();
