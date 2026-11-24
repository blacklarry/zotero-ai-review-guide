(() => {
  'use strict';
  const base = 'downloads/codex-zotero/';
  const config = '[mcp_servers.zotero]\ncommand = "uvx"\nargs = ["zotero-fulltext==0.5.1"]\n\n[mcp_servers.zotero.env]\nZOTERO_API_BASE_URL = "http://127.0.0.1:23119/api"\nZOTERO_LIBRARY_TYPE = "user"\nZOTERO_LIBRARY_ID = "0"';
  const copyTexts = {
    install: [
      '请读取以下教程，帮我在当前电脑完成 Zotero 接入 Codex 的配置：',
      '教程：https://blacklarry.github.io/zotero-ai-review-guide/downloads/codex-zotero/README.md',
      '安装包：https://blacklarry.github.io/zotero-ai-review-guide/downloads/codex-zotero/zotero-codex-kit.zip',
      '',
      '执行步骤：',
      '1. 确认当前任务与 Zotero 运行在同一本机系统，检查 Zotero 运行状态、本地 API 及 uv / uvx 是否就绪。',
      '2. 下载并解压接入包，找到当前生效的 config.toml（默认 ~/.codex/config.toml），先备份再合并 mcp_servers.zotero 配置（保留其他服务）。',
      '3. 可选：将 skills/zotero-local 安装到 ~/.agents/skills/（如已存在同名技能先确认）。',
      '4. 需要权限或信任确认时暂停并提示我操作。',
      '5. 配置完成后说明是否需要重启客户端，并在新对话调用 collections 验证连接，汇报安装位置与结果。'
    ].join('\n'),
    installDomestic: [
      '请帮我在当前电脑完成 Zotero 接入 Codex 的配置，教程与接入包从 Gitee 国内仓库获取：',
      '仓库：https://gitee.com/larry_17/zotero-ai-review-guide.git',
      '',
      '执行步骤：',
      '1. 确认当前任务与 Zotero 运行在同一本机系统。在新建的临时目录克隆上述仓库（或下载 ZIP），进入 docs/downloads/codex-zotero/ 读取本地 README.md 并使用同目录的 zotero-codex-kit.zip。',
      '2. 检查 Zotero 运行状态、本地 API 及 uv / uvx 是否就绪（如遇依赖下载网络问题请提示报错）。',
      '3. 定位当前生效的 config.toml（默认 ~/.codex/config.toml），先备份再合并 mcp_servers.zotero 配置；按需将 skills/zotero-local 安装到 ~/.agents/skills/。',
      '4. 需要权限或信任确认时暂停并提示我操作。',
      '5. 配置完成后说明是否需要重启客户端，并在新对话调用 collections 验证连接，汇报安装位置与结果。'
    ].join('\n'),
    config,
    cli: 'codex mcp add zotero --env ZOTERO_API_BASE_URL=http://127.0.0.1:23119/api --env ZOTERO_LIBRARY_TYPE=user --env ZOTERO_LIBRARY_ID=0 -- uvx zotero-fulltext==0.5.1\ncodex mcp list',
    runtime: 'uv --version\nuvx --version',
    verify: '使用 Zotero 本地文献检索，调用 collections 列出我的文献库分类，确认连接正常。',
    search: '在我的 Zotero 文献库中查找与“高光谱”和“种子活力”相关的论文，列出标题、作者、年份、引用键、条目 key 及 DOI / 来源链接；如果库里没有相关文献请直接说明。',
    read: '读取引用键为 [替换为检索结果中的 citekey] 的论文，提取研究问题、方法与局限。每条结论附原文证据与段落位置（注意段落序号不等于 PDF 页码）。'
  };
  const copyLabels = {install: 'GitHub 版安装指令', installDomestic: '国内版安装指令', config: 'TOML 配置', cli: 'CLI 命令', runtime: '检测命令', verify: '连接验证提示词', search: '检索提示词', read: '阅读提示词'};
  function resourceCard(icon) {
    return `<article class="resource-card"><div class="resource-card-icon">${icon('link')}</div><span class="resource-format">Codex · MCP + 可选 Skill</span><h2>Zotero 接入 Codex</h2><p>用桌面本机任务或同机 CLI 查阅已有文献。附 TOML、CLI 配置与中文证据阅读技能。</p><a class="btn btn-secondary" href="#codex">查看 Codex 接入教程 ${icon('arrow')}</a><div class="example-actions"><a href="${base}zotero-codex-kit.zip" download>下载完整包</a><a href="${base}zotero-local-codex-skill.zip" download>仅下载技能</a></div></article>`;
  }
  function render({icon, esc, crumb}) {
    const copyBlock = (id, label) => {
      const isInstall = ['install', 'installDomestic'].includes(id);
      const preAttrs = isInstall ? ` tabindex="0" aria-label="完整${id === 'install' ? ' GitHub 版' : '国内版'}安装指令"` : '';
      return `<section class="prompt-box"><div class="prompt-box-head"><span>${icon('copy')} ${esc(label)}</span><button type="button" class="copy-btn" data-copy-codex="${id}">复制${isInstall ? '安装指令' : id === 'config' ? '配置' : ['runtime', 'cli'].includes(id) ? '命令' : '提示词'}</button></div><pre${preAttrs}>${esc(copyTexts[id])}</pre></section>`;
    };
    const installPrompts = `<div class="install-prompt-switcher" data-install-switcher>
      <div class="install-source-tabs" role="tablist" aria-label="安装指令下载来源"><button type="button" class="install-source-tab" id="cx-install-tab-github" data-install-source="github" role="tab" aria-controls="cx-install-panel-github" aria-selected="true" tabindex="0">GitHub 版</button><button type="button" class="install-source-tab" id="cx-install-tab-domestic" data-install-source="domestic" role="tab" aria-controls="cx-install-panel-domestic" aria-selected="false" tabindex="-1">国内版 · Gitee</button></div>
      <div class="install-source-panel" id="cx-install-panel-github" role="tabpanel" aria-labelledby="cx-install-tab-github"><p class="install-source-note">直接从 GitHub Pages 读取教程与接入包，适合能正常访问 GitHub 的网络环境。</p>${copyBlock('install', '复制到本机 Codex · GitHub 版安装指令')}</div>
      <div class="install-source-panel" id="cx-install-panel-domestic" role="tabpanel" aria-labelledby="cx-install-tab-domestic" hidden><p class="install-source-note">从 Gitee 国内仓库获取教程与接入包；uv 与 Python 依赖仍按实际网络环境下载。</p>${copyBlock('installDomestic', '复制到本机 Codex · 国内版安装指令')}</div>
    </div>`;
    return `${crumb('Codex 接入')}
      <header class="page-intro"><div class="eyebrow">ZOTERO × CODEX</div><h1>让 Codex 查阅你的文献库。</h1><p>把本机 Zotero 接入 Codex，在桌面本机任务或 CLI 中直接检索已有论文、核对引用键并读取索引正文。MCP 负责提供检索能力，中文 Skill 可按需安装。</p><div class="page-meta"><span>${icon('shield')} 五个只读工具</span><span>${icon('file')} 配置与技能 · v1.0.0</span><span>${icon('check')} TOML / CLI 双方式</span></div></header>
      <section class="workbuddy-downloads integration-downloads" aria-labelledby="cx-download-title"><div class="integration-download-head"><span class="integration-kicker">接入文件 · 选择获取方式</span><h2 id="cx-download-title">下载 Codex 专用接入包</h2><p>完整包包含 TOML 配置片段、中文技能与文字说明；已经配好 Zotero MCP 时，只需下载技能包。</p></div><div class="integration-download-actions"><a class="btn btn-primary" href="${base}zotero-codex-kit.zip" download>下载完整接入包 ${icon('download')}</a><a class="btn btn-secondary" href="${base}zotero-local-codex-skill.zip" download>仅下载中文技能 ${icon('download')}</a><a class="btn btn-secondary" href="${base}README.md" download>文字版说明 ${icon('file')}</a></div><div class="integration-repos"><span class="integration-repo-label">仓库入口</span><a href="https://github.com/blacklarry/zotero-ai-review-guide" target="_blank" rel="noopener noreferrer">GitHub 仓库 ${icon('link')}</a><a href="https://gitee.com/larry_17/zotero-ai-review-guide" target="_blank" rel="noopener noreferrer">Gitee 国内仓库 ${icon('link')}</a><p class="integration-repo-note">国内网络可在 Gitee 仓库的 <code>docs/downloads/codex-zotero/</code> 目录获取同类文件。</p></div></section>
      <div class="callout"><strong>${icon('info')} 确保 Codex 与 Zotero 运行在同一系统</strong>本配置通过本机回环地址 <code>127.0.0.1:23119</code> 访问 Zotero，适用于同一台电脑上的 Codex 桌面本机任务或本地 CLI；云端任务、远程 SSH、容器或 WSL 默认无法直接连通宿主机的 <code>127.0.0.1</code>。</div>
      <article class="workbuddy-content">
        <section class="worked-example" aria-labelledby="cx-auto"><div class="eyebrow">省事方式 / 交给 Codex 自动配置</div><h2 id="cx-auto">复制指令，让 Codex 自助安装</h2><p>选择对应网络版本，把指令粘贴到本机 Codex 新对话即可。按终端或界面权限提示确认后，重启客户端并验证连接即可使用。</p>${installPrompts}<p class="case-scope">也可以按下面四步手动配置。</p></section>
        <section class="worked-example" aria-labelledby="cx-prepare"><div class="eyebrow">STEP 01 / 准备环境</div><h2 id="cx-prepare">开启 Zotero 本地接口，检查 uv / uvx</h2><ol class="practice-steps"><li>打开 Zotero 8 或更高版本，在“设置 → 高级”中勾选“允许此计算机上的其他应用程序与 Zotero 通信”，保持 Zotero 运行。</li><li>在终端运行下面两条命令确认 <code>uv</code> 和 <code>uvx</code> 可用；若未安装，请参考 <a href="https://docs.astral.sh/uv/getting-started/installation/" target="_blank" rel="noopener noreferrer">uv 官方安装说明</a>，装完重启终端与 Codex。</li><li>本配置固定调用 <code>zotero-fulltext==0.5.1</code>（需要 Python 3.11+，由 uv 自动管理），本地访问个人库无需 Zotero 云端 API 密钥。</li></ol>${copyBlock('runtime', '终端 · 检查 uv / uvx')}</section>
        <section class="worked-example" aria-labelledby="cx-connect"><div class="eyebrow">STEP 02 / 配置 MCP</div><h2 id="cx-connect">用 TOML 或 CLI 注册 Zotero 服务</h2><p>Codex 的默认配置文件为 <code>~/.codex/config.toml</code>（同一主机的桌面端、CLI 与 IDE 插件共享配置；若设置了 <code>CODEX_HOME</code> 则以该目录为准）。以下两种方式任选其一，修改前建议先备份原配置。</p><h3>方式 A：编辑 TOML 配置</h3><p>将下方片段追加到 <code>config.toml</code>（注意不要重复添加同名的 <code>[mcp_servers.zotero]</code> 表）。</p>${copyBlock('config', 'mcp-config.toml · 追加到 Codex 配置')}<a href="${base}mcp-config.toml" download>下载 TOML 配置片段 ${icon('download')}</a><h3>方式 B：用 Codex CLI 一键注册</h3><p>在运行 Zotero 的本机终端直接执行以下命令即可（本地 stdio 服务无需 <code>codex mcp login</code>）：</p>${copyBlock('cli', 'Codex CLI · 注册本地 stdio 服务')}<p class="case-scope">注册完成后重启 Codex 客户端并开启新对话，确认 MCP 列表中的 <code>zotero</code> 已启用。</p></section>
        <section class="worked-example" aria-labelledby="cx-skill"><div class="eyebrow">STEP 03 / 可选中文技能</div><h2 id="cx-skill">安装中文证据阅读 Skill</h2><ol class="practice-steps"><li>解压 <a href="${base}zotero-local-codex-skill.zip" download>单技能 ZIP</a>，得到 <code>zotero-local/SKILL.md</code>。</li><li>将 <code>zotero-local</code> 文件夹放进用户级目录 <code>~/.agents/skills/</code>（全局生效）或项目级目录 <code>.agents/skills/</code>（仅当前仓库生效）。</li><li>Codex 会自动发现新增技能；若未生效，重启客户端即可。</li></ol><p>只配 MCP 也能正常检索；装上中文 Skill 后，Codex 会自动按“查分类 → 搜文献 → 核对引用键 → 按需读正文”的节奏执行，也可以用 <code>$zotero-local</code> 显式触发。</p></section>
        <section class="worked-example" aria-labelledby="cx-try"><div class="eyebrow">STEP 04 / 验证与阅读</div><h2 id="cx-try">在新对话中调用工具验证</h2><p>重启后新建对话，先运行连接验证提示词查看分类列表（CLI 下也可用 <code>/mcp</code> 查看已加载的工具）。</p>${copyBlock('verify', '第一次使用 · 调用 collections')}${copyBlock('search', '检索已收藏文献')}${copyBlock('read', '阅读一篇确定的论文')}<p>精读前把方括号替换为检索结果返回的真实 <code>citekey</code>。</p><div class="table-wrap"><table><thead><tr><th scope="col">任务</th><th scope="col">工具名</th></tr></thead><tbody><tr><td>浏览分类、验证连接</td><td><code>collections</code></td></tr><tr><td>按关键词、分类或标签查文献</td><td><code>search</code></td></tr><tr><td>按引用键精确查询</td><td><code>lookup</code></td></tr><tr><td>分段读取已索引正文</td><td><code>fulltext</code></td></tr><tr><td>在单篇正文中搜索关键词与证据</td><td><code>fulltext_search</code></td></tr></tbody></table></div><p class="case-scope">这五个工具均为只读，不会修改你的文献库，也不会联网抓取新论文。</p></section>
      </article>
      <section class="faq" aria-labelledby="cx-faq"><h2 id="cx-faq">常见问题排查</h2><details><summary>已经注册 zotero，为什么对话里看不到工具？</summary><p>检查配置是否写进了当前生效的 <code>config.toml</code>、服务是否启用，以及是否已重启 Codex 并开启新对话。同时确认 Zotero 正在运行、本地通信已开启，且终端能正常运行 <code>uvx</code>。</p></details><details><summary>终端能运行 uvx，客户端却找不到？</summary><p>先完全重启客户端以刷新 PATH。若仍提示找不到，在 PowerShell 用 <code>(Get-Command uvx).Source</code> 拿到完整路径，填到配置的 <code>command</code> 中（TOML 可用正斜杠或单引号保留反斜杠）。</p></details><details><summary>为什么云端任务、WSL 或远程 SSH 连不上？</summary><p><code>127.0.0.1</code> 只指向当前运行环境的本机回环地址。远程机器、容器或 WSL 中的 <code>127.0.0.1</code> 不是运行 Zotero 的宿主机，请在 Zotero 所在系统直接运行本机任务。</p></details><details><summary>能搜到论文，但读不到全文？</summary><p>全文工具依赖 Zotero 已建立索引的 PDF 文字层，纯扫描件或未附加 PDF 的条目无法读取正文。长文会分页返回，可按 <code>next_offset</code> 继续读取；工具返回的段落编号不等于 PDF 页码。</p></details></section>
      <section class="workbuddy-sources" aria-labelledby="cx-sources"><h2 id="cx-sources">参考文档与开源组件</h2><p>本适配包为独立教程配套文件，通过 <code>uvx</code> 调用 MIT 协议的开源组件 <code>zotero-fulltext</code>。</p><ul><li><a href="https://learn.chatgpt.com/docs/extend/mcp?surface=cli" target="_blank" rel="noopener noreferrer">OpenAI MCP 配置文档</a> · <a href="https://learn.chatgpt.com/docs/developer-commands" target="_blank" rel="noopener noreferrer">CLI 命令参考</a></li><li><a href="https://learn.chatgpt.com/docs/build-skills" target="_blank" rel="noopener noreferrer">OpenAI Skills 目录与用法</a></li><li><a href="https://github.com/statzhero/zotero-fulltext" target="_blank" rel="noopener noreferrer">zotero-fulltext（Ulrich Atz / statzhero）</a> · <a href="https://www.zotero.org/support/dev/web_api/v3/local_api" target="_blank" rel="noopener noreferrer">Zotero 本地 API</a></li></ul></section>`;
  }
  window.GUIDE_CODEX = {render, resourceCard, copyTexts, copyLabels};
})();
