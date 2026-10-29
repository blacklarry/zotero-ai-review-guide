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
  copyTexts.imaQuestion = '请仅依据当前“嵌入式系统学习示例”知识库中的三份 STM32 学习资料，整理“最小工程 → GPIO/按键/LED → UART 调试”的学习顺序。每一步列出：先核对什么、准备做什么、怎样验证、哪些内容尚未实测。保留来源文件名称和可点击引用；材料没有给出的型号、引脚、时钟和测试结果写“资料未提供”，不要自行补齐，也不要把学习计划写成已完成实验。';
  copyTexts.workbuddyIma = '请读取 ima 知识库“嵌入式系统学习示例”中的三份 STM32 资料，整理一份“GPIO 按键与 LED 排查”学习笔记。列出来源文件名，未知型号、引脚和测试结果保留为待核对。完成后保存到这个知识库，优先放进 STM32 分类；如果当前工具不能指定分类，请告诉我实际保存位置。';
  const copyLabels = {tree: '知识库目录', note: '阅读笔记示例', setup: '本机搭建指令', imaQuestion: 'STM32 知识库提问示例', workbuddyIma: 'WorkBuddy × ima 整理指令'};
  const searchItems = [
    {title: '搭建科研知识库', type: '知识库', body: 'Obsidian learning-of-zjnu 13目录 模板 下载 起步包 本机AI搭建 ' + copyTexts.tree, href: '#knowledge/obsidian'},
    {title: '从阅读笔记到知识笔记与 MOC', type: '知识库', body: '主题地图 双向链接 inline 属性标签 来源 证据', href: '#knowledge/obsidian'},
    {title: '科研课题、实验与论文证据链', type: '知识库', body: '数据集 代码Commit 实验记录 结果图表 论文工作台 备份 同步', href: '#knowledge/obsidian'},
    {title: 'ima 嵌入式系统知识库', type: '知识库', body: '腾讯 ima RK3588 STM32 FPGA 知识库 文件夹 上传 资料 溯源 问答 WorkBuddy 专家 技能 连接器 ima-mcp 保存笔记', href: '#knowledge/ima'}
  ];

  function resourceCard(icon) {
    return `<article class="resource-card"><div class="resource-card-icon">${icon('layers')}</div><span class="resource-format">Obsidian / ima · 两种方法</span><h2>搭建科研知识库</h2><p>用 Obsidian 管理本地目录与模板，或用 ima 整理资料并按知识库提问。新增嵌入式系统示例，重点练习 STM32。</p><a class="btn btn-secondary" href="#knowledge">查看搭建教程 ${icon('arrow')}</a><div class="example-actions"><a href="${base}knowledge-base-starter.zip" download>Obsidian 起步包</a><a href="${base}README.md" download>Obsidian 文字说明</a></div></article>`;
  }

  function renderObsidian({icon, esc, crumb}) {
    const copyBlock = (id, label) => `<section class="prompt-box"><div class="prompt-box-head"><span>${icon('copy')} ${esc(label)}</span><button type="button" class="copy-btn" data-copy-knowledge="${id}">复制${id === 'tree' ? '目录' : id === 'note' ? '示例' : '搭建指令'}</button></div><pre>${esc(copyTexts[id])}</pre></section>`;
    const rows = directories.map(([name, use, rule]) => `<tr><th scope="row"><code>${esc(name)}</code></th><td>${esc(use)}</td><td>${esc(rule)}</td></tr>`).join('');
    return `${crumb('Obsidian 科研知识库')}
      <p class="knowledge-back"><a href="#knowledge">← 返回知识库搭建目录</a></p>
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

  const imaBase = 'downloads/ima-embedded/';
  const imaArticle = 'https://blog.csdn.net/weixin_44251099/article/details/162903844';
  const imaOfficial = 'https://www.codebuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Knowledge-Base/IMA%20Knowledge%20Base/';
  const imaMaterials = [
    ['STM32', 'STM32-01-最小工程学习路线.md', '先记录板卡信息，再分开验证构建、下载与运行'],
    ['STM32', 'STM32-02-GPIO按键与LED排查.md', '按原理图核对引脚，分别学习输出、输入与中断'],
    ['STM32', 'STM32-03-UART与调试记录.md', '从单向发送开始，保留参数、日志与排查记录']
  ];
  const imaShots = {
    wbEntry:{file:'ima-workbuddy-entry-20261029.png',environment:'Windows / WorkBuddy 5.9.3（截图所示）',captured:'2026-10-29 收录',note:'用户提供的真实界面截图，保留左侧入口和顶部连接器页签。',scope:'用于说明连接器入口，非一次新的接入测试。'},
    wbConnector:{file:'ima-workbuddy-connector-20261029.png',environment:'WorkBuddy（此图未显示版本号）',captured:'2026-10-29 收录',note:'用户提供的真实界面截图，裁取 ima 连接器卡片。',scope:'保留截图中的绿色状态点；连接状态不代表任务已经完成。'},
    wbPrompt:{file:'ima-workbuddy-prompt-20261029.png',environment:'WorkBuddy（此图未显示版本号）',captured:'2026-10-29 收录',note:'用户提供的对话截图，裁取任务输入区域，原始输入保留。',scope:'以外设调研演示任务表达；下方另附 STM32 整理指令。'},
    wbProcess:{file:'ima-workbuddy-process-20261029.png',environment:'WorkBuddy（此图未显示版本号）',captured:'2026-10-29 收录',note:'用户提供的对话过程截图，裁取工具处理与目标库名区域。',scope:'模型自述准备上传，仍需回到 ima 确认实际入库。'},
    wbResult:{file:'ima-workbuddy-result-20261029.png',environment:'WorkBuddy（此图未显示版本号）',captured:'2026-10-29 收录',note:'用户提供的报告结构与待确认事项截图，裁去下方输入框。',scope:'这是 AI 输出示例；技术结论需回查官方手册，截图不证明已入库。'},
    createEntry:{file:'ima-create-entry-20261029.png',environment:'Windows / ima（版本号未单独记录）',note:'用户提供的本机截图，裁取左侧知识库与新建入口，未包含头像和私人库内容。',scope:'用于说明个人知识库的新建入口。'},
    createDialog:{file:'ima-create-dialog-20261029.png',environment:'Windows / ima（版本号未单独记录）',note:'用户提供的本机截图，仅裁取“创建个人知识库”弹窗。',scope:'图中名称尚未填写；输入名称后再点击“确认”。'},
    addMenu:{file:'ima-add-menu-20261029.png',environment:'Windows / ima（版本号未单独记录）',note:'用户提供的本机截图，裁取“嵌入式系统”库的标题与新增菜单。',scope:'用于说明新建文件夹和本地文件的入口；后续示例库名为“嵌入式系统学习示例”。'},
    folders:{file:'ima-example-folders-20261029.png',environment:'Windows / ima（版本号未单独记录）',note:'仅保留新建个人示例库的目录区域；STM32 显示 3 项，FPGA 与 RK3588 显示 0 项，私人侧栏和账号区域未纳入截图。',scope:'已创建三个分类，只有 STM32 导入学习资料；未做硬件上板测试。'},
    materials:{file:'ima-stm32-list-20261029.png',environment:'Windows / ima（版本号未单独记录）',note:'在 ima 中收起侧栏后，仅保留新示例库的 STM32 内容区；裁去账号和无关区域，三份文件名与内容数量可见。',scope:'已将三份 Markdown 导入该文件夹，并打开首篇核对正文；未做硬件上板测试。'},
    reading:{file:'ima-stm32-reading-20261029.png',environment:'Windows / ima（版本号未单独记录）',note:'仅展示本例 STM32 首篇学习笔记的阅读窗口，不含账号、个人目录或其它知识库。',scope:'已在 ima 中打开 Markdown 并核对正文；未做硬件上板测试。'}
  };

  function renderIndex({icon, esc, crumb}) {
    return `${crumb('搭建知识库')}
      <header class="page-intro"><div class="eyebrow">RESEARCH KNOWLEDGE BASE</div><h1>选择一种知识库搭建方式。</h1><p>从本地笔记到资料问答，这里分成两块。原有 Obsidian 目录、模板与下载资源继续保留；ima 用嵌入式系统做一个简单的学习示例。</p></header>
      <div class="resource-grid knowledge-options">
        <article class="resource-card"><div class="resource-card-icon">${icon('folder')}</div><span class="resource-format">OBSIDIAN · 本地目录与模板</span><h2>把阅读与科研过程连起来</h2><p>沿用原来的 13 个目录、基础模板和证据链方法，整理文献阅读、课题、实验与论文工作台。</p><a class="btn btn-primary" href="#knowledge/obsidian">进入 Obsidian 教程 ${icon('arrow')}</a><div class="example-actions"><a href="${base}knowledge-base-starter.zip" download>下载原有起步包</a></div></article>
        <article class="resource-card"><div class="resource-card-icon">${icon('book')}</div><span class="resource-format">IMA · 资料整理与知识库问答</span><h2>用嵌入式资料练习建库</h2><p>分为 RK3588、STM32、FPGA 三类，重点整理 STM32 的最小工程、GPIO 与 UART 学习资料，再带着来源提问。</p><a class="btn btn-primary" href="#knowledge/ima">进入 ima 教程 ${icon('arrow')}</a><div class="example-actions"><a href="${imaArticle}" target="_blank" rel="noopener noreferrer">阅读参考教程</a></div></article>
      </div>
      <div class="callout"><strong>${icon('info')} 根据你的任务选择入口</strong>原有起步包面向 Obsidian 本地文件夹；ima 页面另附嵌入式学习示例资料，导入后需要检查它们是否已进入目标知识库。</div>`;
  }

  function renderIma({icon, esc, crumb}) {
    const shot = (key, caption, pins = []) => imaShots[key] ? window.GUIDE_ZOTERO_GUIDES.figure({image:{...imaShots[key],local:true,captured:imaShots[key].captured || '2026-10-29',annotationNote:pins.length ? '编号为网页叠加标注；界面像素未重绘。' : '截图未添加编号；界面像素未重绘。'},caption,pins},{esc}) : '';
    const materialRows = imaMaterials.map(([folder, file, purpose]) => `<tr><th scope="row">${esc(folder)}</th><td><a href="${imaBase}materials/${encodeURIComponent(folder)}/${encodeURIComponent(file)}" download>${esc(file)}</a></td><td>${esc(purpose)}</td></tr>`).join('');
    return `${crumb('ima 嵌入式知识库')}
      <p class="knowledge-back"><a href="#knowledge">← 返回知识库搭建目录</a></p>
      <header class="page-intro"><div class="eyebrow">IMA / EMBEDDED SYSTEMS</div><h1>从 STM32 开始，搭一个能回查资料的知识库。</h1><p>以“嵌入式系统学习示例”为主题，分成 RK3588、STM32、FPGA 三类。起步资料只包含 STM32 内容，RK3588 和 FPGA 保留分类，重点跑通 STM32 的归档、阅读与提问。</p><div class="page-meta"><span>${icon('folder')} 3 类主题</span><span>${icon('file')} 3 份 STM32 学习示例</span><span>${icon('check')} 资料整理：2026-10-29</span></div></header>
      <section class="workbuddy-downloads" aria-labelledby="ima-download"><div><h2 id="ima-download">先准备一小批明确的资料</h2><p>示例包包含 3 份 STM32 笔记；RK3588、FPGA 只保留空目录。笔记注明官方来源与待填写项，未做硬件上板测试。</p></div><div class="example-actions"><a class="btn btn-primary" href="${imaBase}ima-embedded-starter.zip" download>下载嵌入式示例资料 ${icon('download')}</a><a class="btn btn-secondary" href="https://ima.qq.com/download" target="_blank" rel="noopener noreferrer">打开 ima 官网 ${icon('up')}</a></div></section>
      <article class="workbuddy-content">
        <section class="worked-example operation-guide" aria-labelledby="ima-create"><div class="eyebrow">STEP 01 / 新建主题库</div><h2 id="ima-create">用一个具体的学习目标命名</h2><p>在 ima 中新建个人知识库，命名为“嵌入式系统学习示例”。若已有同名库，先使用新的示例名称。</p><ol class="practice-steps"><li><p>点击左侧“知识库”，再点击“个人知识库”右侧的“＋”。</p>${shot('createEntry','打开个人知识库的新建入口。',[[20,76,'点击“知识库”'],[86,14,'点击个人知识库右侧“＋”']])}</li><li><p>在弹窗中填写名称，可按需选择封面，最后点击“确认”创建。</p>${shot('createDialog','填写知识库名称后，确认创建。',[[92,16,'填写知识库名称'],[91,86,'填写后点击“确认”']])}</li></ol><p>本例先学习三个平台的基础资料，重点是 STM32。芯片完整型号、板卡、引脚与时钟仍按实际工程填写，不用通用示例代替硬件依据。</p></section>
        <section class="worked-example operation-guide" aria-labelledby="ima-organize"><div class="eyebrow">STEP 02 / 分清主题</div><h2 id="ima-organize">三个分类，先把 STM32 做清楚</h2><p>在库内右上方的“新增”菜单选择“新建文件夹”，依次建立 RK3588、STM32、FPGA。进入 STM32 文件夹后再添加这部分材料，避免全部混在库的根目录。</p>${shot('addMenu','“嵌入式系统”库的新增菜单：先建分类，再进入 STM32 导入资料。',[[96.7,20.4,'打开右上角“新增”'],[95,92,'选择“新建文件夹”'],[95,36,'进入 STM32 后用“本地文件”导入']])}<div class="table-wrap"><table><caption>嵌入式系统学习示例的三类材料</caption><thead><tr><th scope="col">主题</th><th scope="col">首批内容</th><th scope="col">本次重点</th></tr></thead><tbody><tr><th scope="row">RK3588</th><td>仅建分类</td><td>本例未添加材料</td></tr><tr><th scope="row">STM32</th><td>最小工程、GPIO/按键/LED、UART</td><td>先学习每一步怎样验证，再保存可追溯的调试记录</td></tr><tr><th scope="row">FPGA</th><td>仅建分类</td><td>本例未添加材料</td></tr></tbody></table></div>${shot('folders','RK3588、STM32 与 FPGA 三类资料。')}</section>
        <section class="worked-example operation-guide" aria-labelledby="ima-import"><div class="eyebrow">STEP 03 / 添加并检查</div><h2 id="ima-import">导入后，再回到目标知识库确认</h2><p>解压示例包，进入对应文件夹，从“新增 → 本地文件”添加该主题的材料。每次先处理一小批，再检查标题、正文与解析状态。如果 Markdown 先进入笔记区，还需确认它已归到目标知识库；看到文件名不能代替确认正文可读。</p><div class="table-wrap"><table><caption>可下载的三份 STM32 原创示例材料</caption><thead><tr><th scope="col">分类</th><th scope="col">文件</th><th scope="col">练习内容</th></tr></thead><tbody>${materialRows}</tbody></table></div>${shot('materials','STM32 文件夹中的三份原创学习资料。')}${shot('reading','打开首篇 Markdown，核对学习路线、待填写项和未上板说明。')}<p class="case-scope">这些文件是学习说明，未运行固件、未连接开发板，也未生成真实串口日志或波形。未知参数保留“待填写 / 待核对”。</p></section>
        <section class="worked-example operation-guide" aria-labelledby="ima-ask"><div class="eyebrow">STEP 04 / 带着材料提问</div><h2 id="ima-ask">让回答能回到 STM32 原文</h2><p>完成资料整理后，可以在选定的知识库或资料范围内继续提问。下面给出练习提示，本次未执行问答测试。要求按文件列出依据，再打开引用检查是否匹配；没有给出的型号、引脚、时钟和实验结果，不让 AI 自行补齐。</p><section class="prompt-box"><div class="prompt-box-head"><span>${icon('spark')} 可复制 · STM32 学习顺序</span><button type="button" class="copy-btn" data-copy-knowledge="imaQuestion">复制提问</button></div><pre>${esc(copyTexts.imaQuestion)}</pre></section><p>将核对后的理解整理成学习笔记，保留来源、阅读范围和待验证项。提问生成的内容先按草稿处理，不能把“建议去验证”写成“已经测试通过”。</p></section>
        <section class="worked-example operation-guide" aria-labelledby="ima-workbuddy"><div class="eyebrow">STEP 05 / 配合 WorkBuddy</div><h2 id="ima-workbuddy">连接 ima，用对话整理并保存资料</h2><p>先在 WorkBuddy 连接 ima，再把要整理的主题、目标知识库和输出要求写清楚。下面用真实界面图演示连接与对话流程。对话以 RK3588 外设调研为例，继续练习时可以使用下方的 STM32 指令。</p>
          <h3>先连接：打开入口 → 切换连接器 → 选择 ima</h3><ol class="practice-steps"><li><p>点击 WorkBuddy 左侧的“专家·技能·连接器”。</p></li><li><p>在上方切换到“连接器”页签。</p>${shot('wbEntry','先打开“专家·技能·连接器”，再切换到“连接器”。',[[43,55,'点击左侧“专家·技能·连接器”'],[96,20.4,'切换顶部“连接器”']])}</li><li><p>找到 ima 卡片并点击进入，首次使用按界面提示完成连接或授权，再回到列表查看状态。图中 ima 卡片旁已有绿色状态点。</p>${shot('wbConnector','选择 ima 连接器，并查看当前连接状态。',[[45,20,'选择 ima 卡片'],[79,18,'查看绿色连接状态']])}</li></ol>
          <h3>再对话：指定任务 → 查看处理 → 回库确认</h3><ol class="practice-steps"><li><p>新建任务，写清要做什么、用哪个知识库、完成后保存到哪里，再发送。使用完整库名比“刚新建的知识库”更容易定位目标。</p>${shot('wbPrompt','输入任务并发送；用户原始输入按截图保留。',[[49,38,'写明任务与目标知识库'],[96,61,'点击发送']])}<p>本页继续使用 STM32 三份学习资料，可直接复制下面这条指令。它是练习文本，未在本项目中执行。</p><section class="prompt-box"><div class="prompt-box-head"><span>${icon('spark')} 可复制 · 整理并保存到 ima</span><button type="button" class="copy-btn" data-copy-knowledge="workbuddyIma">复制指令</button></div><pre>${esc(copyTexts.workbuddyIma)}</pre></section></li><li><p>查看任务过程中的 ima 工具调用和目标库名。截图出现了 <code>ima-mcp</code>、知识库列表工具，以及“嵌入式系统学习示例”；如果 WorkBuddy 询问保存目标，就选定或回复这个完整库名。</p>${shot('wbProcess','查看 ima 工具处理和目标库名；对话中“上传”的文字仍是过程提示。',[[20,15,'查看 ima 工具调用'],[79,95,'核对目标知识库名称']])}</li><li><p>查看报告结构和待确认事项，按需要继续回复。任务结束后回到 ima 打开目标库，确认新增文件的位置和正文；接口参数、复用关系等技术结论仍要对照官方手册核对。</p>${shot('wbResult','查看报告草稿和待确认事项，最后回 ima 确认实际保存结果。',[[24,4,'查看报告结构'],[28,97,'处理对话中的待确认事项']])}</li></ol><p class="case-scope">这些截图展示连接器状态与 RK3588 对话过程；本项目未重复执行该任务，未核验 ima 侧最终入库、报告技术结论或 STM32 指令执行结果。</p><p><a href="${imaOfficial}01-Workbuddy-IMA-Basic-Guide" target="_blank" rel="noopener noreferrer">查看 WorkBuddy × ima 官方功能指引</a></p></section>
      </article>
      <section class="workbuddy-sources" aria-labelledby="ima-sources"><h2 id="ima-sources">参考与使用范围</h2><p>本页按参考教程的主题建库思路组织，示例文字为本项目原创，STM32 资料链接来自 ST 官方渠道。2026-10-29 已在 Windows 的 ima 中新建个人示例库，建立三类文件夹，并导入 STM32 三份 Markdown、打开首篇核对正文；原始建库记录中 RK3588 与 FPGA 目录为空。ima 截图来自本机实际界面，版本号未单独记录；本次未执行 ima 问答或硬件上板测试。WorkBuddy 部分另收录用户提供的连接器与对话截图，入口图显示 5.9.3；仅据图说明流程，未核验该报告最终入库或技术结论，也未执行新增的 STM32 整理指令。</p><ul><li><a href="${imaArticle}" target="_blank" rel="noopener noreferrer">参考教程：WorkBuddy+IMA 手把手教你打造自己的个人专属知识库 · 小墨同学boy</a></li><li><a href="https://ima.qq.com/download" target="_blank" rel="noopener noreferrer">ima 官方下载与产品入口</a></li><li><a href="${imaOfficial}02-Build-Knowledge-Base" target="_blank" rel="noopener noreferrer">WorkBuddy 官方：按任务建立与维护知识库</a></li><li><a href="${imaBase}README.md" download>示例资料说明与来源索引</a></li></ul></section>`;
  }

  function render(helpers, section = '') {
    if (section === 'obsidian') return renderObsidian(helpers);
    if (section === 'ima') return renderIma(helpers);
    return renderIndex(helpers);
  }

  window.GUIDE_KNOWLEDGE = {render, resourceCard, copyTexts, copyLabels, searchItems};
})();
