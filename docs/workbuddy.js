(() => {
  'use strict';
  const base = 'downloads/workbuddy-zotero/';
  const config = {
    mcpServers: {
      zotero: {
        type: 'stdio',
        command: 'uvx',
        args: ['zotero-fulltext==0.5.1'],
        env: {
          ZOTERO_API_BASE_URL: 'http://127.0.0.1:23119/api',
          ZOTERO_LIBRARY_TYPE: 'user',
          ZOTERO_LIBRARY_ID: '0'
        }
      }
    }
  };
  const copyTexts = {
    install: [
      '请读取以下教程，帮我在当前电脑完成 Zotero 接入 WorkBuddy 的配置：',
      '教程：https://blacklarry.github.io/zotero-ai-review-guide/downloads/workbuddy-zotero/README.md',
      '安装包：https://blacklarry.github.io/zotero-ai-review-guide/downloads/workbuddy-zotero/zotero-workbuddy-kit.zip',
      '',
      '执行步骤：',
      '1. 检查 Zotero 是否运行、本地 API 是否开启，以及 uv / uvx 是否可用；缺少依赖时提示我安装。',
      '2. 下载并解压接入包，定位当前电脑的 WorkBuddy 配置与技能目录。',
      '3. 先备份现有 mcp.json，再合并 zotero 配置（保留其他连接器），并安装中文技能；遇到同名冲突时先向我确认。',
      '4. 需要首次“信任”或权限确认时暂停并提示我手动操作。',
      '5. 完成后调用 collections 验证连接（如需重启或新建对话请说明），并汇报安装路径与验证结果。'
    ].join('\n'),
    installDomestic: [
      '请帮我在当前电脑完成 Zotero 接入 WorkBuddy 的配置，教程与接入包从 Gitee 国内仓库获取：',
      '仓库：https://gitee.com/larry_17/zotero-ai-review-guide.git',
      '',
      '执行步骤：',
      '1. 在新建的临时目录克隆上述仓库（或从网页下载 ZIP），进入 docs/downloads/workbuddy-zotero/ 读取本地 README.md 并使用同目录的 zotero-workbuddy-kit.zip。',
      '2. 检查 Zotero 是否运行、本地 API 是否开启，以及 uv / uvx 是否可用（如遇依赖下载网络问题请提示具体报错）。',
      '3. 定位当前电脑的 WorkBuddy 配置与技能目录，先备份现有 mcp.json，再合并 zotero 配置并安装中文技能。',
      '4. 需要首次“信任”或权限确认时暂停并提示我手动操作。',
      '5. 完成后调用 collections 验证连接（如需重启或新建对话请说明），并汇报安装路径与验证结果。'
    ].join('\n'),
    config: JSON.stringify(config, null, 2),
    runtime: 'uv --version\nuvx --version',
    verify: '使用 Zotero 本地文献检索，先列出我的文献库分类，确认连接正常。',
    search: '使用 Zotero 本地文献检索，查找文献库中与“高光谱”和“种子活力”相关的论文，列出标题、作者、年份、引用键和条目 key；如果库里没有相关文献请直接说明。',
    read: '读取引用键为 [替换为检索结果中的 citekey] 的论文，提取研究问题、方法与局限。每条结论附文内证据和段落位置（注意工具返回的段落序号与 PDF 页码不同）。'
  };
  const copyLabels = {install: 'GitHub 版安装指令', installDomestic: '国内版安装指令', config: 'MCP 配置', runtime: '检测命令', verify: '连接验证提示词', search: '检索提示词', read: '阅读提示词'};
  function resourceCard(icon) {
    return `<article class="resource-card"><div class="resource-card-icon">${icon('link')}</div><span class="resource-format">WorkBuddy · MCP + Skill</span><h2>Zotero 本地文献检索</h2><p>把已收藏的文献接入 WorkBuddy。附通用配置、中文技能、首次授权和检索验证步骤。</p><a class="btn btn-secondary" href="#workbuddy">查看接入教程 ${icon('arrow')}</a><div class="example-actions"><a href="${base}zotero-workbuddy-kit.zip" download>下载完整包</a><a href="${base}zotero-local-workbuddy-skill.zip" download>仅下载技能</a></div></article>`;
  }
  function render({icon, esc, crumb}) {
    const localShots = {
      api:{file:'zotero-local-api-20261029.png',environment:'Zotero 设置界面'},
      connectors:{file:'workbuddy-connectors-20261029.png',environment:'WorkBuddy 5.9.3'},
      manager:{file:'workbuddy-mcp-add-20261029.png',environment:'WorkBuddy 5.9.3'},
      config:{file:'workbuddy-zotero-config-20261029.png',environment:'WorkBuddy 5.9.3'},
      trust:{file:'workbuddy-zotero-trust-20261029.png',environment:'WorkBuddy 5.9.3'},
      tools:{file:'workbuddy-zotero-tools-20261029.png',environment:'WorkBuddy 5.9.3'}
    };
    const localShot = (name,caption,pins=[]) => window.GUIDE_ZOTERO_GUIDES.figure({image:{...localShots[name],local:true},caption,pins},{esc});
    const copyBlock = (id, label) => {
      const isInstall = ['install', 'installDomestic'].includes(id);
      const preAttrs = isInstall ? ` tabindex="0" aria-label="完整${id === 'install' ? ' GitHub 版' : '国内版'}安装指令"` : '';
      return `<section class="prompt-box"><div class="prompt-box-head"><span>${icon('copy')} ${esc(label)}</span><button type="button" class="copy-btn" data-copy-workbuddy="${id}">复制${isInstall ? '安装指令' : id === 'config' ? '配置' : id === 'runtime' ? '命令' : '提示词'}</button></div><pre${preAttrs}>${esc(copyTexts[id])}</pre></section>`;
    };
    const installPrompts = `<div class="install-prompt-switcher" data-install-switcher>
      <div class="install-source-tabs" role="tablist" aria-label="安装指令下载来源"><button type="button" class="install-source-tab" id="wb-install-tab-github" data-install-source="github" role="tab" aria-controls="wb-install-panel-github" aria-selected="true" tabindex="0">GitHub 版</button><button type="button" class="install-source-tab" id="wb-install-tab-domestic" data-install-source="domestic" role="tab" aria-controls="wb-install-panel-domestic" aria-selected="false" tabindex="-1">国内版 · Gitee</button></div>
      <div class="install-source-panel" id="wb-install-panel-github" role="tabpanel" aria-labelledby="wb-install-tab-github"><p class="install-source-note">直接从 GitHub Pages 读取教程与接入包，适合能正常访问 GitHub 的网络环境。</p>${copyBlock('install', '复制到 WorkBuddy · GitHub 版安装指令')}</div>
      <div class="install-source-panel" id="wb-install-panel-domestic" role="tabpanel" aria-labelledby="wb-install-tab-domestic" hidden><p class="install-source-note">从 Gitee 国内仓库获取教程与接入包；uv 与 Python 依赖仍按实际网络环境下载。</p>${copyBlock('installDomestic', '复制到 WorkBuddy · 国内版安装指令')}</div>
    </div>`;
    const introduction = `<section class="worked-example" aria-labelledby="wb-basics"><h2 id="wb-basics">先完成安装与工作空间准备</h2><p><strong>目的：</strong>先建一个干净的工作目录放本次文献材料，方便控制分析范围，不用一开始就挂载整个 Zotero 目录。</p><ol class="practice-steps"><li>前往 <a href="https://www.workbuddy.cn/" target="_blank" rel="noopener noreferrer">WorkBuddy 官网</a>下载对应系统的客户端并登录（Windows 用户可参考 <a href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Installation-Win-Guide" target="_blank" rel="noopener noreferrer">官方安装指南</a>，查看最新版本见 <a href="https://www.workbuddy.cn/docs/workbuddy/Changelog" target="_blank" rel="noopener noreferrer">更新日志</a>）。</li><li>在本地新建独立文件夹 <code>review-handoff</code>，下建 <code>sources</code> 和 <code>outputs</code> 两个子文件夹，专门存放本次要分析的笔记或论文副本，避免直接改动 Zotero 的数据目录。</li><li>在 WorkBuddy 新建本地任务，点击输入框左下角“选择工作空间”并选中 <code>review-handoff</code>。日常分析时可以用 <code>@</code> 引用目录里的文件，或者直接把整理好的短笔记粘贴进对话（详见 <a href="https://www.workbuddy.cn/docs/workbuddy/Create-Task" target="_blank" rel="noopener noreferrer">官方任务说明</a>）。</li></ol><p class="operation-result"><strong>完成后应看到：</strong>WorkBuddy 正常识别工作目录，并在对话中准确列出本批材料的文献文件名和 P001/P002 编号。</p><details class="operation-trouble"><summary>找不到工作空间或读不到文件怎么办？</summary><ol class="practice-steps"><li>确认创建的是“本地任务”而非云端任务；本机目录与本地 MCP 仅在本地任务下可用。</li><li>把材料放进选定的工作目录，用 <code>@</code> 显式引用或直接粘贴文本，不要只发一段本地路径字符串。</li><li>涉及目录读写时会受 <a href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Permission-Modes" target="_blank" rel="noopener noreferrer">WorkBuddy 权限模式</a>保护，按弹窗核对路径后授权即可。</li></ol></details></section>`;
    const handoff = `<section class="worked-example" aria-labelledby="wb-handoff"><h2 id="wb-handoff">不配 MCP 也能用：把 Zotero 材料交给 WorkBuddy</h2><p><strong>目的：</strong>如果暂时不想折腾本地 MCP，也可以用标准化的文件夹把 Zotero 笔记交给 WorkBuddy，照样跑通精读、矩阵提取与主题比较。</p><ol class="practice-steps"><li>在 Zotero 核对好每篇论文的题名、作者、年份与 DOI，连同 P001/P002 编号写入 <code>sources/records.txt</code>。</li><li>把整理好的条目笔记另存为 UTF-8 文本文件（如 <code>sources/P001-note.txt</code>），写清文献编号、固定 PDF 版本、原文摘录、页码/表图号与实验条件，避免复制后丢失 Zotero 内部回链位置。</li><li>需要直接读取全文时，把 PDF 副本放进 <code>sources/</code> 目录；遇到扫描件或复杂图表识别不准，改交人工校对过的文字段落。</li><li>下载本站的 <a href="#resources">15 字段文献证据矩阵</a>模板，保存为 <code>outputs/matrix.csv</code>，让 AI 严格按现有表头输出候选记录。</li></ol><pre class="worked-note">review-handoff/
  sources/
    records.txt          文献编号、题录与来源链接
    P001-note.txt        原文摘录、位置、条件与个人批注
    P002-note.txt
    P001.pdf             论文 PDF 副本（可选）
  outputs/
    batch01-unverified.md  AI 提取草稿（待核验）
    matrix.csv             15 字段证据矩阵</pre><p class="operation-result"><strong>完成后应看到：</strong>WorkBuddy 准确识别两份笔记编号并按要求提取信息，你只需逐条对照原文核对后填入 <code>matrix.csv</code>。</p><details class="operation-trouble"><summary>中文乱码、页码丢失或全文解析不全时</summary><ol class="practice-steps"><li>用文本编辑器确认笔记保存为 UTF-8 编码，再重新引用。</li><li>给 AI 的材料里把页码、章节或表号写成纯文本，避免只留 Zotero 内部跳转链接。</li><li>如果漏读了结果段或表格，单独补充对应段落重新提取，不要让 AI 自行补全缺失数据。</li></ol></details></section>`;
    const batchAnalysis = `<section class="worked-example" aria-labelledby="wb-analysis"><h2 id="wb-analysis">从单篇精读到小批量矩阵分析</h2><p><strong>目的：</strong>先跑通单篇，再 2–3 篇一小批推进，保证矩阵里的每一条证据都能准确对应到具体论文和页码。</p><ol class="practice-steps"><li>先只交 P001，复制提示词库的 <a href="#prompts/extract">“单篇文献证据提取”</a>模板，附上笔记或原文及 15 列表头，让 WorkBuddy 输出结构化候选记录。</li><li>把输出先存入 <code>outputs/batch01-unverified.md</code>，回到 Zotero 原文核对数值、单位、实验条件与页码，确认无误再写入 <code>matrix.csv</code>。同一篇论文有多个关键发现时拆成多行（如 E01、E02）。</li><li>单篇顺手后，再以每批 2–3 篇的节奏继续推进。每批开始先核对本批处理的文献编号，结束时核对输入篇数与输出行数，避免漏篇或串篇。</li><li>核验后的记录汇总进矩阵后，依次使用 <a href="#prompts/themes">主题归纳</a> 和 <a href="#prompts/compare">共识与分歧比较</a> 提示词，梳理核心主题、支持/反面证据与条件差异。</li><li>最后用 <a href="#prompts/outline">论证式提纲</a> 与 <a href="#prompts/paragraph">段落起草</a> 逐节生成带临时编号的草稿（保存为 <code>outputs/draft.md</code>），配合 <a href="#prompts/audit">论断与引用核查</a> 复核一遍，再按 <a href="#chapter/6">第 6 章</a> 在 Word 中用 Zotero 插入正式引文。</li></ol><p class="operation-result"><strong>完成后应看到：</strong>笔记、分批草稿、15 字段矩阵、主题比较表和初稿之间通过 P/E 编号首尾呼应，每一句论断都能一键追溯回原文。</p><details class="operation-trouble"><summary>批量分析出现漏篇、串篇或输出截断怎么办？</summary><ol class="practice-steps"><li><b>漏篇或串篇：</b>退回单篇模式重新核对题名与编号再提取，不要直接让 AI 批量改编号。</li><li><b>长文被截断：</b>缩小批次或按章节分段处理，合并前检查是否有遗漏。</li><li><b>出现陌生作者或数值：</b>回原文核查，找不到依据直接删除，不保留无出处结论。</li></ol></details></section>`;
    return `${crumb('WorkBuddy 接入')}
      <header class="page-intro"><div class="eyebrow">ZOTERO × WORKBUDDY</div><h1>让 WorkBuddy 查阅你的文献库。</h1><p>把本机 Zotero 接入 WorkBuddy，直接用自然语言浏览分类、检索论文并按需读取正文。既可以按下面四步配置本地只读 MCP，也可以直接用文件夹手工交接笔记。</p><div class="page-meta"><span>${icon('shield')} 文献库只读</span><span>${icon('file')} 中文 Skill · v1.0.0</span><span>${icon('check')} 适用于 WorkBuddy 5.9+</span></div></header>
      <section class="workbuddy-downloads integration-downloads" aria-labelledby="wb-download-title"><div class="integration-download-head"><span class="integration-kicker">接入文件 · 选择获取方式</span><h2 id="wb-download-title">先下载，再接入</h2><p>完整包内含通用 MCP 配置、中文技能 ZIP 和文字说明；如果已经配好 MCP，只下载中文技能即可。</p></div><div class="integration-download-actions"><a class="btn btn-primary" href="${base}zotero-workbuddy-kit.zip" download>下载完整接入包 ${icon('download')}</a><a class="btn btn-secondary" href="${base}zotero-local-workbuddy-skill.zip" download>仅下载中文技能 ${icon('download')}</a><a class="btn btn-secondary" href="${base}README.md" download>文字版说明 ${icon('file')}</a></div><div class="integration-repos"><span class="integration-repo-label">仓库入口</span><a href="https://github.com/blacklarry/zotero-ai-review-guide" target="_blank" rel="noopener noreferrer">GitHub 仓库 ${icon('link')}</a><a href="https://gitee.com/larry_17/zotero-ai-review-guide" target="_blank" rel="noopener noreferrer">Gitee 国内仓库 ${icon('link')}</a><p class="integration-repo-note">国内网络可在 Gitee 仓库的 <code>docs/downloads/workbuddy-zotero/</code> 目录获取同类文件。</p></div></section>
      <div class="callout"><strong>${icon('info')} 仅在本机只读连接</strong>数据流向为：本机 Zotero → 本地 MCP 服务 → WorkBuddy → 你当前选择的模型。本网站不读取你的任何文献；检索和正文读取都在你自己的电脑上完成，且五个工具均为只读，不会修改你的 Zotero 文献库。</div>
      <article class="workbuddy-content">
        ${introduction}
        <section class="worked-example" aria-labelledby="wb-auto"><div class="eyebrow">省事方式 / 交给 WorkBuddy 自动配置</div><h2 id="wb-auto">复制指令，让 WorkBuddy 自助安装</h2><p>按网络环境选择 GitHub 版或国内版，把指令粘贴到 WorkBuddy 新对话即可。它会自动检查依赖、备份并合并连接器配置、安装中文技能。遇到首次“信任”或目录授权弹窗时，由你亲自点击确认后继续（详见 <a href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Permission-Modes" target="_blank" rel="noopener noreferrer">官方权限说明</a>）。</p>${installPrompts}<p class="case-scope">如果你更习惯自己一步步配置，直接看下方手动四步。</p></section>
        <section class="worked-example" aria-labelledby="wb-prepare"><div class="eyebrow">STEP 01 / 准备环境</div><h2 id="wb-prepare">开启 Zotero 本地接口，检查 uv / uvx</h2><ol class="practice-steps"><li>打开 Zotero 8 或更高版本，在“设置 → 高级”中勾选“允许此计算机上的其他应用程序与 Zotero 通信”，保持 Zotero 运行。${localShot('api','进入“设置 → 高级”，开启本地应用通信。',[[17,81,'打开高级设置'],[67,71,'勾选允许本机通信']])}</li><li>在终端（Windows 可用 PowerShell）运行下方命令，确认 <code>uv</code> 与 <code>uvx</code> 都能输出版本号。</li><li>如果提示找不到命令，按 <a href="https://docs.astral.sh/uv/getting-started/installation/" target="_blank" rel="noopener noreferrer">uv 官方文档</a>安装后，重启终端和 WorkBuddy。uv 会自动处理 Python 3.11+ 运行环境，首次启动时需联网拉取依赖包。</li></ol>${copyBlock('runtime', '终端 · 检查 uv / uvx')}<p class="case-scope">本配置调用 <code>zotero-fulltext==0.5.1</code>，直接访问本机 <code>127.0.0.1:23119</code> 接口，无需配置 Zotero 云端 API 密钥。</p></section>
        <section class="worked-example" aria-labelledby="wb-connect"><div class="eyebrow">STEP 02 / 添加连接器</div><h2 id="wb-connect">将 MCP 配置添加到 WorkBuddy</h2><ol class="practice-steps"><li>打开 WorkBuddy，依次进入“专家·技能·连接器 → 连接器 → 自定义连接器 → 添加 MCP”。${localShot('connectors','打开左侧“专家·技能·连接器”，切换到“连接器 → 自定义连接器”。',[[18,92,'专家·技能·连接器'],[47,32,'连接器页签'],[85,32,'自定义连接器']])}${localShot('manager','在 MCP 服务管理页点击右上角“添加 MCP”。',[[67,25,'点击添加 MCP']])}</li><li>如果当前 <code>mcpServers</code> 为空，直接粘贴下方完整 JSON；如果已有其他 MCP 服务，把里面的 <code>zotero</code> 这一项合并进去即可（留意 JSON 逗号）。${localShot('config','粘贴本地 Zotero MCP 配置并保存。',[[62,45,'使用 uvx 启动'],[68,52,'固定服务版本 0.5.1'],[87,62,'本地 API 与个人库参数']])}</li><li>保存后回到列表找到 <code>zotero</code>，点击首次“信任”确认，并确保右侧开关处于开启状态。${localShot('trust','保存后点击首次“信任”确认授权。',[[77,91,'点击信任确认']])}</li><li>等待几秒完成连接，状态灯变绿并显示 5/5 个工具即表示就绪。${localShot('tools','连接就绪：状态点变绿，显示 5/5 个可用工具。',[[31,71,'绿色状态与 5/5 工具'],[94,64,'服务已启用'],[68,90,'五个只读工具']])}</li></ol>${copyBlock('config', '通用 MCP 配置 · 个人文献库')}<a href="${base}mcp.json" download>下载 mcp.json ${icon('download')}</a><p class="case-scope">配置文件位于用户目录下的 <code>.workbuddy/mcp.json</code>。如果 WorkBuddy 找不到 <code>uvx</code>，可将 <code>command</code> 改为本机 <code>uvx</code> 的完整绝对路径。</p></section>
        <section class="worked-example" aria-labelledby="wb-skill"><div class="eyebrow">STEP 03 / 安装中文技能</div><h2 id="wb-skill">导入 Zotero 本地文献检索 Skill</h2><ol class="practice-steps"><li>进入“专家·技能·连接器 → 技能 → 添加技能 → 上传技能”。</li><li>上传 <a href="${base}zotero-local-workbuddy-skill.zip" download><code>zotero-local-workbuddy-skill.zip</code></a>（完整包用户先解压即可找到此文件）。</li><li>确认“Zotero 本地文献检索”已启用，新建一个 WorkBuddy 对话并在连接器里勾选 <code>zotero</code> 即可开始使用。</li></ol><p>MCP 负责打通 Zotero 数据，中文 Skill 负责规范检索策略、引用键核对和证据定位，两者配合效果最好。</p><p class="case-scope">也可以直接把完整包中的 <code>skills/zotero-local</code> 文件夹复制到用户目录下的 <code>.workbuddy/skills/</code>。</p></section>
        <section class="worked-example" aria-labelledby="wb-try"><div class="eyebrow">STEP 04 / 开始使用</div><h2 id="wb-try">验证连接，开始检索和精读</h2><p>新建对话后，先发送第一条验证提示词，看到自己的 Zotero 分类列表返回就大功告成了。</p>${copyBlock('verify', '第一次使用 · 验证连接')}${copyBlock('search', '查找已收藏的论文')}${copyBlock('read', '阅读一篇确定的论文')}<p><code>citekey</code> 是检索工具返回的引用键（不同于 Zotero 条目 key），精读前直接把检索结果里的真实引用键填进方括号即可。</p><div class="table-wrap"><table><thead><tr><th scope="col">你想做什么</th><th scope="col">对应工具</th></tr></thead><tbody><tr><td>浏览分类、验证连接</td><td><code>collections</code></td></tr><tr><td>按关键词、分类或标签检索文献</td><td><code>search</code></td></tr><tr><td>按引用键精确查看单篇信息</td><td><code>lookup</code></td></tr><tr><td>分段读取论文已索引正文</td><td><code>fulltext</code></td></tr><tr><td>在单篇论文中搜索关键词与上下文</td><td><code>fulltext_search</code></td></tr></tbody></table></div></section>
        ${handoff}
        ${batchAnalysis}
      </article>
      <section class="faq" aria-labelledby="wb-faq"><h2 id="wb-faq">常见问题排查</h2><details><summary>列表里有 zotero，但一直连不上？</summary><p>依次检查四项：① 首次“信任”是否已点、开关是否开启；② Zotero 桌面程序是否正在运行；③ Zotero 高级设置中的本地通信是否勾选；④ 终端能否正常运行 <code>uvx --version</code>。改完配置后重启 WorkBuddy 再试。</p></details><details><summary>终端能跑 uvx，WorkBuddy 却提示找不到命令？</summary><p>先完全重启 WorkBuddy 让它刷新系统 PATH。如果还不行，在 PowerShell 运行 <code>(Get-Command uvx).Source</code> 获取完整路径，把配置里的 <code>"uvx"</code> 替换成该路径（JSON 中路径用正斜杠 <code>/</code> 或双反斜杠 <code>\\\\</code>）。</p></details><details><summary>能搜到论文，为什么读不到正文？</summary><p>全文工具读取的是 Zotero 已建立索引的 PDF 文字层。如果这篇文献只有题录没有 PDF、或是未 OCR 的纯扫描件，就无法提取正文。另外，工具返回的段落编号不等于 PDF 页码，引用时请回原 PDF 确认页码。</p></details><details><summary>它会联网搜新论文，或者改动我的 Zotero 库吗？</summary><p>都不会。这套工具只读取你本地 Zotero 已收藏的文献，五个接口全部只读，不会增删或修改任何条目。</p></details></section>
      <section class="workbuddy-sources" aria-labelledby="wb-sources"><h2 id="wb-sources">参考文档与开源组件</h2><p>接入包仅包含通用配置模板、中文技能与文字说明，通过 <code>uvx</code> 调用 MIT 协议的开源组件 <code>zotero-fulltext</code>。</p><ul><li><a href="https://github.com/statzhero/zotero-fulltext" target="_blank" rel="noopener noreferrer">zotero-fulltext（Ulrich Atz / statzhero）</a></li><li><a href="https://open.workbuddy.cn/docs/connector" target="_blank" rel="noopener noreferrer">WorkBuddy 连接器文档</a> · <a href="https://open.workbuddy.cn/docs/skill" target="_blank" rel="noopener noreferrer">技能规范</a></li><li><a href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market" target="_blank" rel="noopener noreferrer">WorkBuddy 技能导入说明</a> · <a href="https://www.zotero.org/support/dev/web_api/v3/local_api" target="_blank" rel="noopener noreferrer">Zotero 本地 API 文档</a></li></ul></section>`;
  }
  window.GUIDE_WORKBUDDY = {render, resourceCard, copyTexts, copyLabels};
})();
