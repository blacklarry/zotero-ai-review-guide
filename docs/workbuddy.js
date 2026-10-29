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
      '请读取以下文字版教程，在当前电脑完成 Zotero 接入 WorkBuddy 的安装与配置。',
      '教程：https://blacklarry.github.io/zotero-ai-review-guide/downloads/workbuddy-zotero/README.md',
      '安装包：https://blacklarry.github.io/zotero-ai-review-guide/downloads/workbuddy-zotero/zotero-workbuddy-kit.zip',
      '先检查 Zotero 是否运行、本地 API 是否开启，以及 uv/uvx 是否可用；缺少依赖时按教程准备。',
      '下载并解压接入包。按当前电脑的实际用户目录定位 WorkBuddy 配置与技能目录，不照搬其他电脑的路径。',
      '修改前备份已有 mcp.json，合并 zotero 配置并保留其他连接器；安装中文技能。已有同名配置或技能先核对，内容一致时复用，存在冲突时报告后再处理。',
      '遇到首次“信任”、权限确认或需要我手动操作的步骤时，说明具体操作并等待我完成，再继续。不要替我点击信任或修改授权记录。',
      '最后在工具可用时调用 collections 验证连接；若需要重启或新建对话才能验证，明确说明。报告实际安装位置、修改内容和验证结果，不把配置已保存等同于连接成功。'
    ].join('\n'),
    installDomestic: [
      '请在当前电脑完成 Zotero 接入 WorkBuddy 的安装与配置，教程和接入包优先从 Gitee 国内仓库取得。',
      '仓库：https://gitee.com/larry_17/zotero-ai-review-guide.git',
      '先检查 Git 是否可用。在新建的独立临时目录克隆上述仓库，不重置、覆盖或清理我已有的项目目录。没有 Git 时，可尝试通过 Gitee 仓库网页下载 ZIP 并解压；无法取得文件时报告实际错误，不自行切换来源。',
      '进入本次取得的仓库 docs/downloads/workbuddy-zotero，先读取本地 README.md，再使用同目录的 zotero-workbuddy-kit.zip；技能包为 zotero-local-workbuddy-skill.zip。核对文件实际存在，不猜测 Gitee raw 或附件下载地址。',
      '本地 README 中如仍含 GitHub 下载链接，使用本次从 Gitee 取得的本地 README 安装步骤与本地 ZIP，不再按其中 GitHub 下载链接重新下载。',
      '先检查 Zotero 是否运行、本地 API 是否开启，以及 uv/uvx 是否可用；缺少依赖时按教程准备。国内版仅更换教程与接入包来源，uv、Python 与 zotero-fulltext 等依赖仍可能需要访问各自下载源；网络失败时说明具体依赖和错误，不声称已安装成功。',
      '解压本地接入包。按当前电脑的实际用户目录定位 WorkBuddy 配置与技能目录，不照搬其他电脑的路径。',
      '修改前备份已有 mcp.json，合并 zotero 配置并保留其他连接器；安装中文技能。已有同名配置或技能先核对，内容一致时复用，存在冲突时报告后再处理。',
      '遇到首次“信任”、权限确认或需要我手动操作的步骤时，说明具体操作并等待我完成，再继续。不要替我点击信任或修改授权记录。',
      '最后在工具可用时调用 collections 验证连接；若需要重启或新建对话才能验证，明确说明。报告实际文件来源、安装位置、修改内容和验证结果，不把配置已保存等同于连接成功。'
    ].join('\n'),
    config: JSON.stringify(config, null, 2),
    runtime: 'uv --version\nuvx --version',
    verify: '使用 Zotero 本地文献检索，先列出我的文献库分类，确认连接是否可用。',
    search: '使用 Zotero 本地文献检索，查找我的文献库中与高光谱和种子活力有关的论文。列出标题、作者、年份、引用键和条目 key；只使用真实检索结果，没有命中时明确说明。',
    read: '读取引用键为 [替换为检索结果中的 citekey] 的论文，提取研究问题、方法和局限。每条结论附文内证据和编号段落位置；不能把段落序号当作 PDF 页码。'
  };
  const copyLabels = {install: 'GitHub 版安装指令', installDomestic: '国内版安装指令', config: 'MCP 配置', runtime: '检测命令', verify: '连接验证提示词', search: '检索提示词', read: '阅读提示词'};
  function resourceCard(icon) {
    return `<article class="resource-card"><div class="resource-card-icon">${icon('link')}</div><span class="resource-format">WorkBuddy · MCP + Skill</span><h2>Zotero 本地文献检索</h2><p>把已收藏的文献接入 WorkBuddy。附通用配置、中文技能、首次授权和检索验证步骤。</p><a class="btn btn-secondary" href="#workbuddy">查看接入教程 ${icon('arrow')}</a><div class="example-actions"><a href="${base}zotero-workbuddy-kit.zip" download>下载完整包</a><a href="${base}zotero-local-workbuddy-skill.zip" download>仅下载技能</a></div></article>`;
  }
  function render({icon, esc, crumb}) {
    const localShots = {
      api:{file:'zotero-local-api-20261029.png',environment:'Windows / Zotero 设置',note:'仅保留高级设置的通信选项与本地端口，裁去无关区域。'},
      connectors:{file:'workbuddy-connectors-20261029.png',note:'原截图左上角显示 V5.9.3；仅保留导航和连接器入口。'},
      manager:{file:'workbuddy-mcp-add-20261029.png',note:'仅保留管理器标题、搜索与“添加 MCP”入口，裁去无关连接器。'},
      config:{file:'workbuddy-zotero-config-20261029.png',note:'配置文件的个人路径已在原截图中遮盖；公开参数与下方可复制配置一致。'},
      trust:{file:'workbuddy-zotero-trust-20261029.png',note:'这是确认前的首次信任提示；本次操作随后由使用者本人完成确认。'},
      tools:{file:'workbuddy-zotero-tools-20261029.png',note:'仅保留 Zotero 状态与五个工具名称，裁去无关连接器。'}
    };
    const localShot = (name,caption,pins=[]) => window.GUIDE_ZOTERO_GUIDES.figure({image:{environment:'Windows / WorkBuddy 5.9.3',...localShots[name],local:true,captured:'2026-10-29',scope:'本机接入过程记录；实际调用的验证范围见本页末尾。'},caption,pins},{esc});
    const copyBlock = (id, label) => {
      const isInstall = ['install', 'installDomestic'].includes(id);
      const preAttrs = isInstall ? ` tabindex="0" aria-label="完整${id === 'install' ? ' GitHub 版' : '国内版'}安装指令"` : '';
      return `<section class="prompt-box"><div class="prompt-box-head"><span>${icon('copy')} ${esc(label)}</span><button type="button" class="copy-btn" data-copy-workbuddy="${id}">复制${isInstall ? '安装指令' : id === 'config' ? '配置' : id === 'runtime' ? '命令' : '提示词'}</button></div><pre${preAttrs}>${esc(copyTexts[id])}</pre></section>`;
    };
    const installPrompts = `<div class="install-prompt-switcher" data-install-switcher>
      <div class="install-source-tabs" role="tablist" aria-label="安装指令下载来源"><button type="button" class="install-source-tab" id="wb-install-tab-github" data-install-source="github" role="tab" aria-controls="wb-install-panel-github" aria-selected="true" tabindex="0">GitHub 版</button><button type="button" class="install-source-tab" id="wb-install-tab-domestic" data-install-source="domestic" role="tab" aria-controls="wb-install-panel-domestic" aria-selected="false" tabindex="-1">国内版 · Gitee</button></div>
      <div class="install-source-panel" id="wb-install-panel-github" role="tabpanel" aria-labelledby="wb-install-tab-github"><p class="install-source-note">从 GitHub Pages 读取教程与接入包，适合可正常访问本站下载的环境。</p>${copyBlock('install', '复制到 WorkBuddy · GitHub 版安装指令')}</div>
      <div class="install-source-panel" id="wb-install-panel-domestic" role="tabpanel" aria-labelledby="wb-install-tab-domestic" hidden><p class="install-source-note">从 Gitee 仓库取得本地教程与接入包。仅更换文件来源，运行依赖仍需按实际网络情况下载。</p>${copyBlock('installDomestic', '复制到 WorkBuddy · 国内版安装指令')}</div>
    </div>`;
    const introduction = `<section class="worked-example" aria-labelledby="wb-basics"><h2 id="wb-basics">先完成安装、登录与工作空间准备</h2><p><strong>目的：</strong>先建立一个只包含本次练习材料的工作目录，再让 WorkBuddy 读取明确指定的输入，避免一上来就连接整个文献库。</p><ol class="practice-steps"><li>打开 <a href="https://www.workbuddy.cn/" target="_blank" rel="noopener noreferrer">WorkBuddy 官网</a>，按电脑系统下载客户端。Windows 用户可对照 <a href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Installation-Win-Guide" target="_blank" rel="noopener noreferrer">官方安装图文</a>：运行安装包，自行阅读并确认协议，选择安装位置，完成后启动客户端并登录。不要从第三方打包站获取安装程序。</li><li>记录安装包或客户端实际显示的版本。本页于 2026-10-28 核对的 <a href="https://www.workbuddy.cn/docs/workbuddy/Changelog" target="_blank" rel="noopener noreferrer">官方更新日志</a>首项为 5.9.3（2026-10-27）；这不表示你的电脑已经安装该版本。需要升级时再使用头像菜单中的“检查更新”，该操作可能开始下载更新。</li><li>在资源管理器中新建独立目录 <code>review-handoff</code>，下建 <code>sources</code> 和 <code>outputs</code>。只放入本次有权处理的资料副本，不把 Zotero 的整个数据目录设为工作空间，也不移动其数据库或 <code>storage</code>。</li><li>在 WorkBuddy 创建本地任务，点击输入框左下角“选择工作空间”，选中 <code>review-handoff</code>。按 <a href="https://www.workbuddy.cn/docs/workbuddy/Create-Task" target="_blank" rel="noopener noreferrer">官方任务说明</a>，可用 <code>@</code> 引用文件，也可上传或拖入文件；只有两个短笔记时，直接粘贴文本即可。发出分析请求前，先让它列出实际能读取的输入文件和文献编号。</li></ol><p class="operation-result"><strong>完成后应看到：</strong>当前任务使用你选定的工作目录，能够回显本批材料的文件名和 P001/P002 编号。列出文件名只证明目录可见，仍需下一节核对实际读到的正文。</p><details class="operation-trouble"><summary>找不到工作空间、文件未读到或请求权限时</summary><ol class="practice-steps"><li>先区分本地任务与云端任务；本页的本机目录和 MCP 方法用于本地任务。界面入口不同则对照当前版本官方文档，不猜测同名按钮。</li><li>将需处理的副本放入已选工作目录，再确认文件是否真正被引用或上传；也可将已核验的笔记直接粘贴到对话中。仅贴一个本机路径，不代表任务已获得文件内容。</li><li>文件访问受 <a href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Permission-Modes" target="_blank" rel="noopener noreferrer">当前权限与工作空间边界</a>约束。由你核对路径与授权提示；不需要为普通阅读练习关闭保护或开放整个磁盘。</li></ol></details><p class="case-scope">以上是官方文档核验后的操作说明，尚未完成本机 5.9.3 安装、登录与文件读取全流程实测。下方四步配置的是可选的 Zotero 本机只读检索；接口不可用时，可直接采用后面的手工资料交接。</p></section>`;
    const handoff = `<section class="worked-example" aria-labelledby="wb-handoff"><h2 id="wb-handoff">把 Zotero 中的材料交给 WorkBuddy</h2><p><strong>目的：</strong>用一个可检查的资料包连接阅读笔记与 AI 分析。先用 <a href="#chapter/3">第 3 章两篇真实论文案例</a>练习 P001/P002，再换成自己的研究材料；两款软件不需要原生直连。</p><ol class="practice-steps"><li>在 Zotero 选中每篇论文的父条目，在右侧信息区核对题名、作者、年份、DOI 或来源链接。将这些内容连同 P001/P002 编号写入 <code>sources/records.txt</code>；有工具返回的引用键时另行记录，不能把人工 P 编号当作引用键。</li><li>打开已整理的条目笔记，把文字复制到 UTF-8 文本文件 <code>sources/P001-note.txt</code>、<code>sources/P002-note.txt</code>。每份写清文献编号、固定论文版本、研究问题、原文短片段、PDF 页序或印刷页码、章节或表图号、实验条件及待核查问题。保留 Zotero 内部回链供自己使用，同时把位置写成文字；外部 AI 不能据此保证能打开内部链接。</li><li>需要全文时，把有权使用的 PDF 副本放入 <code>sources</code> 或作为附件加入任务，保留原件。先请 WorkBuddy 回显题名及一段你能在原文找到的文字和位置，再继续提取；不要只根据它说“已阅读”就认定全文可用。扫描件、图表或读取失败时，改交人工核对过的文字和图表转录，并保留原位置。</li><li>在对话中明确本批只处理哪些文献编号、文件是全文还是笔记，以及哪些内容只是你的解释。若用 MCP，则先检索并核对实际 <code>citekey</code>，再读取；若结果被截断，按返回的继续位置分段取回。工具段落号与 PDF 页码分开记，不互相替代。</li><li>下载 <a href="#resources">现有 15 字段空白矩阵</a>，另存为 <code>outputs/matrix.csv</code>。保留原表头，不用 AI 自创列名覆盖它；先看完整填写样例，再决定每条证据落在哪一行。</li></ol><pre class="worked-note">review-handoff/
  sources/
    records.txt          文献编号、已核对的题录与来源
    P001-note.txt        原文短片段、位置、条件与核查问题
    P002-note.txt
    P001.pdf             有权使用的原文副本，可选
  outputs/
    batch01-unverified.md  本批 AI 草稿，待回原文核验
    matrix.csv             沿用下载模板的 15 个字段</pre><p class="operation-result"><strong>完成后应看到：</strong>WorkBuddy 能对应到两份输入编号，回显内容与原文相符；矩阵仍为空白或只含你确认过的记录。题录、文件名和阅读笔记都不能替代尚未提供的全文证据。</p><details class="operation-trouble"><summary>中文乱码、页码丢失、全文无法解析时</summary><ol class="practice-steps"><li>先在本地文本编辑器打开笔记，确认中文正常并以 UTF-8 保存，再重新引用文件；不要让 AI 猜测乱码。</li><li>复制后若只剩内部链接或段落序号，回到固定版本 PDF 补上可人工定位的位置；不要推算页码。</li><li>缺少结果段、表格或局限段时，把相应原文补进资料包后重做该条提取，保留旧输出为待核查，不自动补齐。</li></ol></details></section>`;
    const batchAnalysis = `<section class="worked-example" aria-labelledby="wb-analysis"><h2 id="wb-analysis">从单篇精读到小批量矩阵分析</h2><p><strong>目的：</strong>先走通一篇，再合并多篇；批量分析的每一行都能回到唯一文献和证据位置。每批先用 2–3 篇试跑是教学建议，不是产品容量上限，材料较长时继续缩小批次。</p><ol class="practice-steps"><li>只交 P001，打开并复制 <a href="#prompts/extract">“单篇文献证据提取”</a>模板，替换全部方括号。附上笔记或原文，并把当前 CSV 的完整 15 列表头一起提供，要求按原表头输出候选记录；材料未涉及的字段写“所给材料未提及”，每个发现附短依据和位置。</li><li>把结果先保存到 <code>outputs/batch01-unverified.md</code>，标明“AI 草稿，待核查”。返回 Zotero 打开原文，逐条核对数值、单位、样本、条件与位置，再把确认的记录录入 <code>matrix.csv</code>。同一篇两个结果拆两行，在“主要发现”中写 E01/E02；在“人工核查状态”中如实记录待核查或已核验及检查范围。</li><li>单篇验证后再加入 P002，或新增一个包含 2–3 篇的批次。每批发送文献编号清单，先要求回显实际收到的编号，再逐篇提取；没有读到的文献列为缺失，不复用上一批的研究事实。</li><li>结束时对账：输入文献数、实际处理编号、输出证据行数、待核查行数分别列出。按 P 编号统计论文数，按 P001:E01 这类标识检查证据；同篇多条结果不能算多篇论文。多出陌生编号、漏篇、题名错配或无出处时，暂停合并，缩到单篇修正。</li><li>只有通过原文核对的行才进入比较池。合并各批时保留原始输出和每行来源，检查重复证据标识，不直接覆盖原矩阵。再用 <a href="#prompts/themes">主题归纳</a>和 <a href="#prompts/compare">共识与分歧比较</a>，列出主题、中心判断、支持及反面证据、条件差异和待补检索；不要按不同实验设置的指标给论文排优劣。</li><li>把核验后的主题表交给 <a href="#prompts/outline">论证式提纲</a>模板：每节对应一个子问题与中心判断，并列出证据编号、反例与局限。审查后逐节使用 <a href="#prompts/paragraph">段落起草</a>，保存为 <code>outputs/draft.md</code>；引用仍用临时编号占位。最后做 <a href="#prompts/audit">论断与引用核查</a>，按 <a href="#chapter/6">第 6 章</a>用真实 Zotero 条目插入正式引用，WorkBuddy 不替你自动写入 Word 引文字段。</li></ol><p class="operation-result"><strong>完成后应看到：</strong>输入清单、分批草稿、核验后的 15 字段矩阵、主题比较表、提纲和逐节草稿能够通过 P/E 编号互相追溯；未核验行没有混进正式比较。完整草稿仍需逐句回查，不能把一份 AI 输出称为已经完成的综述。</p><details class="operation-trouble"><summary>批量结果漏篇、串篇、截断或生成陌生引用时</summary><ol class="practice-steps"><li>漏篇或串篇：保留问题输出，按输入清单退回单篇，先确认题名和编号，再提取。不要仅让 AI 把错编号统一替换。</li><li>长文截断：只处理本次实际可见的片段，记录已处理范围；补齐后再继续，不能把“未读到”写成“论文未报告”。</li><li>陌生作者、DOI、数值或页码：回原文寻找依据；找不到就删除该结论或标待核查，不靠模型记忆补引文。</li><li>所谓研究空白：先写“当前文献集未覆盖”，保留补检索计划；不能由两篇示例推出全领域没有研究。</li></ol></details><p class="case-scope">本节是可执行的操作流程与核查要求，不是一次已经完成的 WorkBuddy 会话实测。矩阵填写与比较可对照 <a href="#chapter/3">第 3 章</a>、<a href="#chapter/4">第 4 章</a>和 <a href="#chapter/5">第 5 章</a>的既有真实论文教学材料。</p></section>`;
    return `${crumb('WorkBuddy 接入')}
      <header class="page-intro"><div class="eyebrow">ZOTERO × WORKBUDDY</div><h1>让 WorkBuddy 查阅你的文献库。</h1><p>连接本机 Zotero，浏览分类、查找论文，并在需要时读取已索引的正文。先完成入门与材料准备，再按四步配置可选的本地只读检索；也可直接使用手工资料交接完成后续分析。</p><div class="page-meta"><span>${icon('shield')} 文献库只读</span><span>${icon('file')} 中文 Skill · v1.0.0</span><span>${icon('check')} 说明更新：2026-10-29</span></div></header>
      <section class="workbuddy-downloads integration-downloads" aria-labelledby="wb-download-title"><div class="integration-download-head"><span class="integration-kicker">接入文件 · 选择获取方式</span><h2 id="wb-download-title">先下载，再接入</h2><p>完整包包含通用 MCP 配置、技能安装 ZIP 和文字说明。已经配置 MCP 时，只需下载技能包。</p></div><div class="integration-download-actions"><a class="btn btn-primary" href="${base}zotero-workbuddy-kit.zip" download>下载完整接入包 ${icon('download')}</a><a class="btn btn-secondary" href="${base}zotero-local-workbuddy-skill.zip" download>仅下载中文技能 ${icon('download')}</a><a class="btn btn-secondary" href="${base}README.md" download>文字版说明 ${icon('file')}</a></div><div class="integration-repos"><span class="integration-repo-label">仓库入口</span><a href="https://github.com/blacklarry/zotero-ai-review-guide" target="_blank" rel="noopener noreferrer">GitHub 仓库 ${icon('link')}</a><a href="https://gitee.com/larry_17/zotero-ai-review-guide" target="_blank" rel="noopener noreferrer">Gitee 国内仓库 ${icon('link')}</a><p class="integration-repo-note">Gitee 仓库中进入 <code>docs/downloads/workbuddy-zotero/</code> 获取相同类型的文件；版本以各仓库实际内容为准。</p></div></section>
      <div class="callout"><strong>${icon('info')} 接入发生在你的电脑上</strong>Zotero 桌面程序 → 本地 MCP 服务 → WorkBuddy → 当前所选模型。这个网站提供教程与安装包，不读取你的文献库；WorkBuddy 会将工具返回内容交给你所选的模型处理。</div>
      <article class="workbuddy-content">
        ${introduction}
        <section class="worked-example" aria-labelledby="wb-auto"><div class="eyebrow">可选方式 / 交给 WorkBuddy 执行</div><h2 id="wb-auto">让 WorkBuddy 按教程自助安装</h2><p>先选择 GitHub 版或国内版，再复制完整指令到 WorkBuddy 的新对话中。两版使用不同的教程与接入包来源，安装时仍会检查依赖、合并连接器配置并安装中文技能。</p><p>首次 MCP“信任”需你亲自确认；写入工作空间外的配置等操作，也可能请求授权。遇到这些步骤时，由你完成操作后让 WorkBuddy 继续。详见 <a href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Permission-Modes" target="_blank" rel="noopener noreferrer">WorkBuddy 官方权限说明</a>。</p>${installPrompts}<p class="case-scope">已验证接入配置和独立检索能力，尚未完成 WorkBuddy 完整自动安装流程实测。请以实际安装与连接结果为准；也可继续按下面四步手动安装。</p></section>
        <section class="worked-example" aria-labelledby="wb-prepare"><div class="eyebrow">STEP 01 / 准备环境</div><h2 id="wb-prepare">打开 Zotero，检查运行环境</h2><ol class="practice-steps"><li>使用 Zotero 8 或更高版本，并保持桌面程序运行。在“设置 → 高级”中启用“允许此计算机上的其他应用程序与 Zotero 通信”（界面语言不同会显示对应英文）。${localShot('api','先进入“高级”，再勾选允许本机其他程序与 Zotero 通信。',[[17,81,'高级设置'],[67,71,'允许本机通信的选项']])}</li><li>准备 WorkBuddy 桌面版。在 Windows PowerShell 中运行下面两条命令；两条都能显示版本号，才说明运行环境已就绪。</li><li>若命令无法识别，按 <a href="https://docs.astral.sh/uv/getting-started/installation/" target="_blank" rel="noopener noreferrer">uv 官方安装说明</a> 安装 uv，重新打开 PowerShell 和 WorkBuddy 后再检测。服务需要 Python 3.11+，uv 可管理 Python 运行环境；首次启动需要联网获取包。</li></ol>${copyBlock('runtime', 'Windows PowerShell · 检查 uv / uvx')}<p class="case-scope">本包调用 <code>zotero-fulltext==0.5.1</code>，通过本机 <code>127.0.0.1:23119</code> 接口读取个人文献库，不需要 Zotero 云端 API 密钥。</p></section>
        <section class="worked-example" aria-labelledby="wb-connect"><div class="eyebrow">STEP 02 / 添加连接器</div><h2 id="wb-connect">将 MCP 配置保存到 WorkBuddy</h2><ol class="practice-steps"><li>在 WorkBuddy 打开“专家·技能·连接器 → 连接器 → 自定义连接器 → 添加 MCP”。${localShot('connectors','从连接器页进入自定义连接器；截图记录 WorkBuddy 5.9.3 的实际入口。',[[18,92,'专家·技能·连接器'],[47,32,'连接器页签'],[85,32,'自定义连接器']])}${localShot('manager','进入 MCP 服务管理后，点击右上角“添加 MCP”。',[[67,25,'添加 MCP 的入口']])}</li><li>如果当前 <code>mcpServers</code> 为空，可复制下面完整配置。已有其他服务时，只把其中的 <code>zotero</code> 对象加入现有 <code>mcpServers</code>，保留其他配置。注意 JSON 对象之间的逗号。${localShot('config','填入本地 Zotero MCP 配置；优先复制下方代码，不要根据图片逐字录入。',[[62,45,'使用 uvx 启动服务'],[68,52,'本次固定服务版本 0.5.1'],[87,62,'本地 API 与个人库参数']])}</li><li>保存后返回 MCP 列表。找到 <code>zotero</code>，核对命令与数据范围后，由你亲自点击首次“信任”确认；如开关仍关闭，再启用服务。${localShot('trust','保存后的首次信任提示：需由使用者本人确认；该图保留的是确认前状态。',[[77,91,'本人确认首次信任']])}</li><li>等待服务连接。列表应显示五个工具；若没有出现，按下方排障提示检查。${localShot('tools','本机确认后的状态：zotero 已启用，显示 5/5 工具；接下来仍需实际调用验证。',[[31,71,'绿色状态点与 5/5 提示'],[94,64,'服务开关已启用'],[68,90,'五个工具名称']])}</li></ol>${copyBlock('config', '通用 MCP 配置 · 个人文献库')}<a href="${base}mcp.json" download>下载 mcp.json ${icon('download')}</a><p class="case-scope">配置保存在用户目录下的 <code>.workbuddy/mcp.json</code>。换电脑时仍使用通用 <code>uvx</code> 命令；若 WorkBuddy 无法找到命令，把 <code>command</code> 改为该电脑实际的 uvx 绝对路径。</p></section>
        <section class="worked-example" aria-labelledby="wb-skill"><div class="eyebrow">STEP 03 / 安装中文技能</div><h2 id="wb-skill">导入 Zotero 本地文献检索 Skill</h2><ol class="practice-steps"><li>打开“专家·技能·连接器 → 技能 → 添加技能 → 上传技能”。</li><li>选择 <a href="${base}zotero-local-workbuddy-skill.zip" download><code>zotero-local-workbuddy-skill.zip</code></a>；下载了完整包的读者，先解压完整包再取出这个技能 ZIP。</li><li>在已安装列表中确认“Zotero 本地文献检索”处于启用状态，然后新建 WorkBuddy 对话；若对话提供连接器选择入口，确认 <code>zotero</code> 已启用。</li></ol><p>技能负责指导工具选择、引用键核对和证据定位；MCP 负责提供真实检索能力。两者一起使用。</p><p class="case-scope">也可将完整包中的 <code>skills/zotero-local</code> 目录复制到用户目录的 <code>.workbuddy/skills/</code>。已有同名技能时先保留原文件，再决定是否替换。</p></section>
        <section class="worked-example" aria-labelledby="wb-try"><div class="eyebrow">STEP 04 / 开始使用</div><h2 id="wb-try">先验证连接，再查找一篇论文</h2><p>上文的 5/5 状态只证明工具已被发现并启用。接下来复制连接验证提示词；如果分类列表成功返回，或明确返回有效的空分类列表，才说明本次调用可用。连接错误与没有检索命中是两种情况。</p>${copyBlock('verify', '第一次使用 · 验证连接')}${copyBlock('search', '查找已收藏的论文')}${copyBlock('read', '阅读一篇确定的论文')}<p><code>citekey</code> 是工具返回的引用键，与 Zotero 条目 key 不同。阅读前把提示词中的方括号替换为真实引用键；不直接用题名或 DOI 代替。</p><div class="table-wrap"><table><thead><tr><th scope="col">你想做什么</th><th scope="col">使用的工具</th></tr></thead><tbody><tr><td>浏览分类、验证连接</td><td><code>collections</code></td></tr><tr><td>按关键词查文献，可按分类或标签筛选</td><td><code>search</code></td></tr><tr><td>用准确引用键核对一条文献</td><td><code>lookup</code></td></tr><tr><td>读取已索引正文，分段继续阅读</td><td><code>fulltext</code></td></tr><tr><td>在一篇论文中定位术语或证据</td><td><code>fulltext_search</code></td></tr></tbody></table></div></section>
        ${handoff}
        ${batchAnalysis}
      </article>
      <section class="faq" aria-labelledby="wb-faq"><h2 id="wb-faq">遇到问题时，从这里检查</h2><details><summary>列表里有 zotero，但工具没有连接成功</summary><p>先检查首次“信任”是否完成、服务开关是否开启，以及 Zotero 桌面程序和本地 API 是否开启。再检查 uvx 能否在终端运行。修改配置后重新打开 WorkBuddy，并留意具体连接错误。</p></details><details><summary>终端能运行 uvx，WorkBuddy 却提示找不到命令</summary><p>重新打开 WorkBuddy，让它取得新的 PATH。在 Windows PowerShell 中运行 <code>(Get-Command uvx).Source</code> 查看实际路径，并将配置的 <code>command</code> 改成该路径。JSON 中 Windows 反斜杠需写成两个反斜杠，或改用正斜杠。</p></details><details><summary>能搜到论文，为什么无法读取全文？</summary><p>全文工具依赖 Zotero 已保存并建立索引的附件文字。只有条目元数据、未索引的 PDF、扫描件或图片中的图表可能无法读取。打开论文附件检查全文索引；返回的段落编号也不能替代 PDF 页码。</p></details><details><summary>这是联网论文搜索，或可以自动改动我的文献库吗？</summary><p>这个接入包提供已收藏文献的检索和读取。当前五个 MCP 工具是只读工具；没有命中时应如实说明，不自动补造论文或引用键。联网寻找新论文、导入与修改条目需要另行选择相应工具。</p></details></section>
      <section class="workbuddy-sources" aria-labelledby="wb-sources"><h2 id="wb-sources">版本、验证范围与来源</h2><p>入门、工作空间与资料输入说明于 2026-10-28 对照官方安装、创建任务、权限文档及更新日志核验；官方日志当日列出 5.9.3（2026-10-27）。安装向导、登录与完整文献分析流程仍未完成本机全流程实测。</p><p>2026-10-29 补入本机操作截图：连接器页显示 WorkBuddy V5.9.3，配置使用 zotero-fulltext==0.5.1；已保存 Zotero MCP，使用者亲自完成首次信任后，管理器显示 5/5 工具已启用。使用相同 WorkBuddy 配置进行的独立 stdio MCP 初始化、工具列表读取与 collections 调用已通过；该测试没有发起 WorkBuddy 模型对话中的工具调用。2026-10-14 的本地接口与独立关键词检索记录保留，不能由这些记录推断会话内全文读取或综述写作已完成。</p><p>下载包仅包含通用配置、中文技能与说明，不包含个人文献、PDF、账号凭据或本机路径。MCP 服务采用上游 MIT 许可；本包通过 uvx 调用它，不内嵌服务源码。</p><ul><li><a href="https://github.com/statzhero/zotero-fulltext" target="_blank" rel="noopener noreferrer">zotero-fulltext · Ulrich Atz / statzhero</a></li><li><a href="https://open.workbuddy.cn/docs/connector" target="_blank" rel="noopener noreferrer">WorkBuddy 官方连接器文档</a> · <a href="https://open.workbuddy.cn/docs/skill" target="_blank" rel="noopener noreferrer">官方技能格式</a></li><li><a href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market" target="_blank" rel="noopener noreferrer">WorkBuddy 官方技能导入说明</a> · <a href="https://www.zotero.org/support/dev/web_api/v3/local_api" target="_blank" rel="noopener noreferrer">Zotero 本地 API 文档</a></li></ul></section>`;
  }
  window.GUIDE_WORKBUDDY = {render, resourceCard, copyTexts, copyLabels};
})();
