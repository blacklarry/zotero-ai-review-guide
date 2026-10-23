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
    return `${crumb('WorkBuddy 接入')}
      <header class="page-intro"><div class="eyebrow">ZOTERO × WORKBUDDY</div><h1>让 WorkBuddy 查阅你的文献库。</h1><p>连接本机 Zotero，浏览分类、查找论文，并在需要时读取已索引的正文。按下面四步安装，随后用自然语言开始检索。</p><div class="page-meta"><span>${icon('shield')} 文献库只读</span><span>${icon('file')} 中文 Skill · v1.0.0</span><span>${icon('check')} 说明更新：2026-10-23</span></div></header>
      <section class="workbuddy-downloads integration-downloads" aria-labelledby="wb-download-title"><div class="integration-download-head"><span class="integration-kicker">接入文件 · 选择获取方式</span><h2 id="wb-download-title">先下载，再接入</h2><p>完整包包含通用 MCP 配置、技能安装 ZIP 和文字说明。已经配置 MCP 时，只需下载技能包。</p></div><div class="integration-download-actions"><a class="btn btn-primary" href="${base}zotero-workbuddy-kit.zip" download>下载完整接入包 ${icon('download')}</a><a class="btn btn-secondary" href="${base}zotero-local-workbuddy-skill.zip" download>仅下载中文技能 ${icon('download')}</a><a class="btn btn-secondary" href="${base}README.md" download>文字版说明 ${icon('file')}</a></div><div class="integration-repos"><span class="integration-repo-label">仓库入口</span><a href="https://github.com/blacklarry/zotero-ai-review-guide" target="_blank" rel="noopener noreferrer">GitHub 仓库 ${icon('link')}</a><a href="https://gitee.com/larry_17/zotero-ai-review-guide" target="_blank" rel="noopener noreferrer">Gitee 国内仓库 ${icon('link')}</a><p class="integration-repo-note">Gitee 仓库中进入 <code>docs/downloads/workbuddy-zotero/</code> 获取相同类型的文件；版本以各仓库实际内容为准。</p></div></section>
      <div class="callout"><strong>${icon('info')} 接入发生在你的电脑上</strong>Zotero 桌面程序 → 本地 MCP 服务 → WorkBuddy → 当前所选模型。这个网站提供教程与安装包，不读取你的文献库；WorkBuddy 会将工具返回内容交给你所选的模型处理。</div>
      <article class="workbuddy-content">
        <section class="worked-example" aria-labelledby="wb-auto"><div class="eyebrow">可选方式 / 交给 WorkBuddy 执行</div><h2 id="wb-auto">让 WorkBuddy 按教程自助安装</h2><p>先选择 GitHub 版或国内版，再复制完整指令到 WorkBuddy 的新对话中。两版使用不同的教程与接入包来源，安装时仍会检查依赖、合并连接器配置并安装中文技能。</p><p>首次 MCP“信任”需你亲自确认；写入工作空间外的配置等操作，也可能请求授权。遇到这些步骤时，由你完成操作后让 WorkBuddy 继续。详见 <a href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Permission-Modes" target="_blank" rel="noopener noreferrer">WorkBuddy 官方权限说明</a>。</p>${installPrompts}<p class="case-scope">已验证接入配置和独立检索能力，尚未完成 WorkBuddy 完整自动安装流程实测。请以实际安装与连接结果为准；也可继续按下面四步手动安装。</p></section>
        <section class="worked-example" aria-labelledby="wb-prepare"><div class="eyebrow">STEP 01 / 准备环境</div><h2 id="wb-prepare">打开 Zotero，检查运行环境</h2><ol class="practice-steps"><li>使用 Zotero 8 或更高版本，并保持桌面程序运行。在“设置 → 高级”中启用“允许此计算机上的其他应用程序与 Zotero 通信”（界面语言不同会显示对应英文）。</li><li>准备 WorkBuddy 桌面版。在 Windows PowerShell 中运行下面两条命令；两条都能显示版本号，才说明运行环境已就绪。</li><li>若命令无法识别，按 <a href="https://docs.astral.sh/uv/getting-started/installation/" target="_blank" rel="noopener noreferrer">uv 官方安装说明</a> 安装 uv，重新打开 PowerShell 和 WorkBuddy 后再检测。服务需要 Python 3.11+，uv 可管理 Python 运行环境；首次启动需要联网获取包。</li></ol>${copyBlock('runtime', 'Windows PowerShell · 检查 uv / uvx')}<p class="case-scope">本包调用 <code>zotero-fulltext==0.5.1</code>，通过本机 <code>127.0.0.1:23119</code> 接口读取个人文献库，不需要 Zotero 云端 API 密钥。</p></section>
        <section class="worked-example" aria-labelledby="wb-connect"><div class="eyebrow">STEP 02 / 添加连接器</div><h2 id="wb-connect">将 MCP 配置保存到 WorkBuddy</h2><ol class="practice-steps"><li>在 WorkBuddy 打开“专家·技能·连接器 → 连接器 → 自定义连接器 → 添加 MCP”。</li><li>如果当前 <code>mcpServers</code> 为空，可复制下面完整配置。已有其他服务时，只把其中的 <code>zotero</code> 对象加入现有 <code>mcpServers</code>，保留其他配置。注意 JSON 对象之间的逗号。</li><li>保存后返回 MCP 列表。找到 <code>zotero</code>，由你亲自点击首次“信任”确认；如开关仍关闭，再启用服务。</li><li>等待服务连接。列表应显示五个工具；若没有出现，按下方排障提示检查。</li></ol>${copyBlock('config', '通用 MCP 配置 · 个人文献库')}<a href="${base}mcp.json" download>下载 mcp.json ${icon('download')}</a><p class="case-scope">配置保存在用户目录下的 <code>.workbuddy/mcp.json</code>。换电脑时仍使用通用 <code>uvx</code> 命令；若 WorkBuddy 无法找到命令，把 <code>command</code> 改为该电脑实际的 uvx 绝对路径。</p></section>
        <section class="worked-example" aria-labelledby="wb-skill"><div class="eyebrow">STEP 03 / 安装中文技能</div><h2 id="wb-skill">导入 Zotero 本地文献检索 Skill</h2><ol class="practice-steps"><li>打开“专家·技能·连接器 → 技能 → 添加技能 → 上传技能”。</li><li>选择 <a href="${base}zotero-local-workbuddy-skill.zip" download><code>zotero-local-workbuddy-skill.zip</code></a>；下载了完整包的读者，先解压完整包再取出这个技能 ZIP。</li><li>在已安装列表中确认“Zotero 本地文献检索”处于启用状态，然后新建 WorkBuddy 对话；若对话提供连接器选择入口，确认 <code>zotero</code> 已启用。</li></ol><p>技能负责指导工具选择、引用键核对和证据定位；MCP 负责提供真实检索能力。两者一起使用。</p><p class="case-scope">也可将完整包中的 <code>skills/zotero-local</code> 目录复制到用户目录的 <code>.workbuddy/skills/</code>。已有同名技能时先保留原文件，再决定是否替换。</p></section>
        <section class="worked-example" aria-labelledby="wb-try"><div class="eyebrow">STEP 04 / 开始使用</div><h2 id="wb-try">先验证连接，再查找一篇论文</h2><p>先复制连接验证提示词。如果分类列表成功返回，或明确返回有效的空分类列表，说明接口可用。连接错误与没有检索命中是两种情况。</p>${copyBlock('verify', '第一次使用 · 验证连接')}${copyBlock('search', '查找已收藏的论文')}${copyBlock('read', '阅读一篇确定的论文')}<p><code>citekey</code> 是工具返回的引用键，与 Zotero 条目 key 不同。阅读前把提示词中的方括号替换为真实引用键；不直接用题名或 DOI 代替。</p><div class="table-wrap"><table><thead><tr><th scope="col">你想做什么</th><th scope="col">使用的工具</th></tr></thead><tbody><tr><td>浏览分类、验证连接</td><td><code>collections</code></td></tr><tr><td>按关键词查文献，可按分类或标签筛选</td><td><code>search</code></td></tr><tr><td>用准确引用键核对一条文献</td><td><code>lookup</code></td></tr><tr><td>读取已索引正文，分段继续阅读</td><td><code>fulltext</code></td></tr><tr><td>在一篇论文中定位术语或证据</td><td><code>fulltext_search</code></td></tr></tbody></table></div></section>
      </article>
      <section class="faq" aria-labelledby="wb-faq"><h2 id="wb-faq">遇到问题时，从这里检查</h2><details><summary>列表里有 zotero，但工具没有连接成功</summary><p>先检查首次“信任”是否完成、服务开关是否开启，以及 Zotero 桌面程序和本地 API 是否开启。再检查 uvx 能否在终端运行。修改配置后重新打开 WorkBuddy，并留意具体连接错误。</p></details><details><summary>终端能运行 uvx，WorkBuddy 却提示找不到命令</summary><p>重新打开 WorkBuddy，让它取得新的 PATH。在 Windows PowerShell 中运行 <code>(Get-Command uvx).Source</code> 查看实际路径，并将配置的 <code>command</code> 改成该路径。JSON 中 Windows 反斜杠需写成两个反斜杠，或改用正斜杠。</p></details><details><summary>能搜到论文，为什么无法读取全文？</summary><p>全文工具依赖 Zotero 已保存并建立索引的附件文字。只有条目元数据、未索引的 PDF、扫描件或图片中的图表可能无法读取。打开论文附件检查全文索引；返回的段落编号也不能替代 PDF 页码。</p></details><details><summary>这是联网论文搜索，或可以自动改动我的文献库吗？</summary><p>这个接入包提供已收藏文献的检索和读取。当前五个 MCP 工具是只读工具；没有命中时应如实说明，不自动补造论文或引用键。联网寻找新论文、导入与修改条目需要另行选择相应工具。</p></details></section>
      <section class="workbuddy-sources" aria-labelledby="wb-sources"><h2 id="wb-sources">版本、验证范围与来源</h2><p>教程按 WorkBuddy 5.8.2 的界面入口整理，其他版本的菜单位置可能不同。2026-10-14 已验证 Zotero 本地接口与独立分类、关键词检索，并确认 WorkBuddy 能保存连接器配置和发现技能文件；WorkBuddy 会话内的实际调用需在用户完成首次信任后验证。</p><p>下载包仅包含通用配置、中文技能与说明，不包含个人文献、PDF、账号凭据或本机路径。MCP 服务采用上游 MIT 许可；本包通过 uvx 调用它，不内嵌服务源码。</p><ul><li><a href="https://github.com/statzhero/zotero-fulltext" target="_blank" rel="noopener noreferrer">zotero-fulltext · Ulrich Atz / statzhero</a></li><li><a href="https://open.workbuddy.cn/docs/connector" target="_blank" rel="noopener noreferrer">WorkBuddy 官方连接器文档</a> · <a href="https://open.workbuddy.cn/docs/skill" target="_blank" rel="noopener noreferrer">官方技能格式</a></li><li><a href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market" target="_blank" rel="noopener noreferrer">WorkBuddy 官方技能导入说明</a> · <a href="https://www.zotero.org/support/dev/web_api/v3/local_api" target="_blank" rel="noopener noreferrer">Zotero 本地 API 文档</a></li></ul></section>`;
  }
  window.GUIDE_WORKBUDDY = {render, resourceCard, copyTexts, copyLabels};
})();
