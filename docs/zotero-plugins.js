(() => {
  'use strict';
  const checked = '2026-10-28';
  const plugins = [
    {id:'bbt',name:'Better BibTeX',version:'9.0.71',released:'2026-10-07',range:'8.0.1–10.*',
      purpose:'为文献生成稳定的引用键（Citekey），支持自动同步 BibTeX / BibLaTeX 文件，写 LaTeX 论文的必备搭档。如果只用 Word 写作，不需要安装。',
      repo:'https://github.com/retorquere/zotero-better-bibtex',release:'https://github.com/retorquere/zotero-better-bibtex/releases/tag/v9.0.71',
      xpi:'https://github.com/retorquere/zotero-better-bibtex/releases/download/v9.0.71/zotero-better-bibtex-9.0.71.xpi',
      docs:'https://retorque.re/zotero-better-bibtex/installation/',
      community:'https://zotero-chinese.com/plugins/#search=Better%20BibTeX%20for%20Zotero',communityDocs:'https://zotero-chinese.com/user-guide/plugins/better-bibtex',
      compatibility:'当前包要求 Zotero 8 及以上；若仍在使用 Zotero 7，请从发布页下载对应历史版本。',
      verify:'右键任意条目导出 Better BibTeX，检查作者、年份与引用键格式是否符合预期。'},
    {id:'notes',name:'Better Notes',version:'3.3.3',released:'2026-08-24',range:'8.0-beta.21–10.99.99',
      purpose:'增强 Zotero 笔记体验：支持笔记双链、自定义模板以及 Markdown 导入导出，方便对接 Obsidian 等笔记软件。日常批注转笔记用自带功能也完全够用。',
      repo:'https://github.com/windingwind/zotero-better-notes',release:'https://github.com/windingwind/zotero-better-notes/releases/tag/v3.3.3',
      xpi:'https://github.com/windingwind/zotero-better-notes/releases/download/v3.3.3/better-notes-for-zotero.xpi',
      docs:'https://github.com/windingwind/zotero-better-notes#readme',
      community:'https://zotero-chinese.com/plugins/#search=Better%20Notes%20for%20Zotero',communityDocs:'https://zotero-chinese.com/user-guide/plugins/better-notes',
      compatibility:'当前包适用于 Zotero 8 及以上；Zotero 7 用户请前往发布页查找对应旧版。',
      verify:'建一条带中文和引文的测试笔记，导出为 Markdown 并核对格式与链接是否完整。'},
    {id:'zotmoov',name:'ZotMoov',version:'1.2.34',released:'2026-10-16',range:'6.999–10.*',
      purpose:'把个人库中的 PDF 自动移动或复制到指定文件夹，并用链接方式管理附件。适合想用网盘或独立目录存 PDF 的进阶用户；新手建议先用 Zotero 默认的存储附件。',
      repo:'https://github.com/wileyyugioh/zotmoov',release:'https://github.com/wileyyugioh/zotmoov/releases/tag/v1.2.34',
      xpi:'https://github.com/wileyyugioh/zotmoov/releases/download/v1.2.34/zotmoov-1.2.34-fx.xpi',
      docs:'https://github.com/wileyyugioh/zotmoov#readme',
      community:'https://zotero-chinese.com/plugins/#search=ZotMoov',communityDocs:'https://zotero-chinese.com/user-guide/plugins/zotmoov',
      compatibility:'面向 Zotero 7 及以上版本，不支持 Zotero 6。',
      verify:'先备份文献库，用一份测试 PDF 设好目标文件夹试跑一次，重启 Zotero 确认能正常打开后再批量处理。',
      caution:'附件改为链接方式后，将不再随 Zotero 官方空间同步，群组库也不支持链接附件；卸载插件不会把已移动的文件还原回原目录。'},
    {id:'translate',name:'Translate for Zotero（PDF Translate）',version:'2.4.8',released:'2026-10-03',range:'7.9.9–10.9.9',
      purpose:'在阅读器中划词即时翻译外文段落与标题，降低阅读英文论文的门槛。涉及关键数值、条件和引文时，记得以英文原文为准。',
      repo:'https://github.com/windingwind/zotero-pdf-translate',release:'https://github.com/windingwind/zotero-pdf-translate/releases/tag/v2.4.8',
      xpi:'https://github.com/windingwind/zotero-pdf-translate/releases/download/v2.4.8/translate-for-zotero.xpi',
      docs:'https://github.com/windingwind/zotero-pdf-translate#readme',
      community:'https://zotero-chinese.com/plugins/#search=Translate%20for%20Zotero&author=windingwind',communityDocs:'https://zotero-chinese.com/user-guide/plugins/translate/',
      compatibility:'当前包要求 Zotero 8 及以上；Zotero 7.0.x 用户请从发布页选择兼容旧版。',
      verify:'打开一篇英文 PDF 划选一段正文，确认翻译引擎正常返回结果。',
      caution:'部分翻译接口需要配置 API 密钥，且会将选中段落发送给对应服务商；处理涉密或未公开稿件前请留意服务隐私政策。'}
  ];

  function render({icon, esc, crumb}) {
    const link = (url,label) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
    const shot = (image,caption,pins=[]) => window.GUIDE_ZOTERO_GUIDES.figure({image,caption,pins},{esc});
    const examples = plugins.map(plugin => `<section class="worked-example" id="plugin-${plugin.id}" aria-labelledby="plugin-${plugin.id}-title"><h2 id="plugin-${plugin.id}-title">${esc(plugin.name)}</h2><p>${esc(plugin.purpose)}</p><dl class="field-guide"><div><dt>参考版本</dt><dd>v${esc(plugin.version)}（${esc(plugin.released)}）· ${link(plugin.release,'查看发布页')}</dd></div><div><dt>支持范围</dt><dd><code>${esc(plugin.range)}</code> — ${esc(plugin.compatibility)}</dd></div><div><dt>快速验证</dt><dd>${esc(plugin.verify)}</dd></div>${plugin.caution ? `<div><dt>使用提示</dt><dd>${esc(plugin.caution)}</dd></div>` : ''}</dl><div class="example-actions"><a class="btn btn-secondary" href="${esc(plugin.community)}" target="_blank" rel="noopener noreferrer">中文社区下载</a>${link(plugin.communityDocs,'中文使用说明')}</div><p>${link(plugin.repo,'GitHub 仓库')} · ${link(plugin.docs,'官方文档')} · ${link(plugin.xpi,'直接下载 XPI')}</p></section>`).join('');
    return `${crumb('Zotero 插件安装与推荐')}
      <article class="workbuddy-content zotero-plugin-guide">
        <header class="page-intro"><div class="eyebrow">ZOTERO PLUGINS</div><h1>Zotero 插件安装与推荐</h1><p>建议先熟悉 Zotero 自带的文献、批注和引用流程，再按需加装插件。想省事的话，先装一个“插件市场”，后续常用插件都能在 Zotero 里一键搜索安装。</p><div class="page-meta"><span>${icon('file')} 兼容核对：${checked}</span><span>${icon('layers')} 4 款常用插件</span><span>${icon('check')} Zotero 10.0.6 界面参考</span></div></header>
        <section class="worked-example" aria-labelledby="plugin-types"><h2 id="plugin-types">先分清三类扩展，别装错地方</h2><div class="table-wrap"><table><caption class="sr-only">Connector、桌面 XPI 与 Word 插件的区别</caption><thead><tr><th scope="col">类型</th><th scope="col">装在哪里</th><th scope="col">怎么确认装好了</th></tr></thead><tbody><tr><th scope="row">Zotero Connector</th><td>装在<b>浏览器</b>里，从 ${link('https://www.zotero.org/download/','官方下载页')}跳转至浏览器扩展商店安装。</td><td>浏览器右上角出现保存按钮，桌面 Zotero 打开时能把论文存进分类。<a href="#chapter/2">查看保存教程</a>。</td></tr><tr><th scope="row">Zotero 桌面插件</th><td>装在 <b>Zotero 桌面端</b>，下载 <code>.xpi</code> 文件后在“工具 → 插件”里安装。</td><td>插件管理器中显示已启用，无版本不兼容提示。</td></tr><tr><th scope="row">Word 引文插件</th><td>随 Zotero 自带，在“设置 → 引用”中一键安装或修复，无需另下 XPI。</td><td>Word 顶部出现 Zotero 选项卡，能正常插入引用与书目。<a href="#chapter/6">查看 Word 排障</a>。</td></tr></tbody></table></div><p>参考：${link('https://www.zotero.org/support/plugins','Zotero 官方插件说明')} · ${link('https://www.zotero.org/support/word_processor_integration','文字处理软件集成说明')}</p></section>
        <section class="worked-example" aria-labelledby="plugin-install"><h2 id="plugin-install">桌面插件（XPI）通用安装步骤</h2><ol class="practice-steps"><li><b>确认自己的 Zotero 版本。</b>打开“帮助 → 关于 Zotero”，看清完整版本号，挑选对应兼容区间的发布包。${shot('localAbout','先确认当前 Zotero 版本号，再下载对应兼容包。',[[88,27,'查看本机版本号']])}</li><li><b>下载 <code>.xpi</code> 文件。</b>在插件发布页选择以 <code>.xpi</code> 结尾的附件（不要下成源码 ZIP）。用 Firefox 下载时如果浏览器试图直接安装，改为右键“链接另存为”先存到本地。</li><li><b>打开插件管理器。</b>在 Zotero 顶部菜单点击 <b>工具（Tools）→ 插件（Plugins）</b>。${shot('localTools','点击“工具 → 插件”打开管理器。',[[88,66,'桌面插件管理器入口']])}${shot('localManager','插件管理器主界面，右上角齿轮按钮用于安装本地文件。',[[92,15,'齿轮安装菜单'],[87,65,'启用/禁用开关']])}</li><li><b>安装本地 XPI。</b>点击右上角齿轮菜单，选择 <b>Install Plugin From File…</b>，选中刚下载的 <code>.xpi</code> 文件并打开（也可以直接把 <code>.xpi</code> 拖进管理器窗口）。${shot('localInstallMenu','点击齿轮图标，选择“从文件安装插件”。',[[92,12,'打开齿轮菜单'],[91,60,'从本地文件安装']])}${shot('localFilePicker','选中下载好的 .xpi 文件，点击打开即可安装。',[[94,31,'筛选 *.xpi 文件'],[84,67,'点击打开安装']])}</li><li><b>确认启用并测试。</b>安装完成后确认列表里处于启用状态（部分插件需重启 Zotero 生效），用一个测试条目试跑核心功能即可。</li></ol></section>
        <section class="worked-example" aria-labelledby="plugin-market"><div class="eyebrow">推荐首选</div><h2 id="plugin-market">第一步：安装 Zotero 插件市场</h2><p><b>Add-on Market for Zotero</b>（作者 syt）让你在 Zotero 内部直接搜索、下载和更新绝大多数热门插件。首次安装插件市场本身走一次上面的手动 XPI 流程，之后就能一站式装其他插件。</p><div class="example-actions"><a class="btn btn-secondary" href="https://zotero-chinese.com/plugins/#search=market" target="_blank" rel="noopener noreferrer">中文社区：下载插件市场</a>${link('https://zotero-chinese.com/user-guide/plugins/zotero-addons','中文使用说明')}${link('https://github.com/syt2/zotero-addons','GitHub 仓库')}</div><ol class="practice-steps"><li>从上方中文社区下载适配你当前 Zotero 版本的 <code>.xpi</code> 安装包。</li><li>在 Zotero 点击“工具 → 插件 → 齿轮图标 → Install Plugin From File…”安装并按提示重启。</li><li>重启后通过工具栏按钮或“工具 → 插件市场”打开市场界面。</li><li>直接搜索需要的插件名称，核对作者和适配版本即可一键安装。若列表加载较慢，可按中文说明在设置里切换镜像源。</li></ol><p class="case-scope">参考版本：${link('https://github.com/syt2/zotero-addons/releases/tag/V11.0.1','v11.0.1')}（支持 Zotero 7–11）。</p></section>
        <div class="callout"><strong>${icon('shield')} 安全与备份提醒</strong>Zotero 桌面插件拥有完整的本地读写权限，请只从官方 GitHub 发布页或 Zotero 中文社区等可信渠道获取。安装涉及移动 PDF 或批量修改题录的插件前，先做一次完整备份。</div>
        <section class="worked-example" aria-labelledby="plugin-versions"><h2 id="plugin-versions">注意大版本兼容（Zotero 7 / 8–10）</h2><p>Zotero 7 起重构了插件架构，旧版 Zotero 6 插件无法直接使用；而 Zotero 8 之后不少插件也提高了最低版本要求。安装前看清发布页标注的兼容范围即可——如果还在用 Zotero 7，从同一开发者的历史发布里选对应的 7.x 版本，不要强行修改插件清单绕过版本检查。</p><p>${link('https://www.zotero.org/blog/zotero-7/','Zotero 7 架构说明')} · ${link('https://www.zotero.org/support/dev/zotero_7_for_developers','兼容字段说明')}</p></section>
        <section class="worked-example" aria-labelledby="plugin-examples"><h2 id="plugin-examples">四款高口碑实用插件</h2><p>按实际写作与阅读需要挑选即可，不需要全部装满。以下链接均提供中文社区镜像与开发者原版发布页，下载时请核对与自己 Zotero 版本的对应关系。</p></section>
        ${examples}
        <section class="worked-example" aria-labelledby="plugin-maintenance"><h2 id="plugin-maintenance">更新、禁用与排障</h2><ol class="practice-steps"><li><b>更新：</b>在插件管理器中检查更新，或直接到发布页覆盖安装新版 XPI。Zotero 主程序升级后，建议顺手检查一次插件更新。</li><li><b>排查冲突：</b>遇到卡顿或功能异常，可以在插件管理器里逐个禁用最近安装的插件定位原因；如果启动报错，点击 <b>帮助 → Restart in Troubleshooting Mode…</b> 进入安全模式临时禁用全部插件。</li><li><b>卸载：</b>移除插件前先导出需要的配置或笔记模板。注意卸载操作不会自动还原插件此前移动过的 PDF 文件或改写过的题录。</li></ol></section>
        <section class="worked-example" aria-labelledby="plugin-trouble"><h2 id="plugin-trouble">常见问题速查</h2><div class="table-wrap"><table><thead><tr><th scope="col">现象</th><th scope="col">排查思路</th></tr></thead><tbody><tr><th scope="row">提示文件损坏或不兼容</th><td>确认下载的是 <code>.xpi</code>（不是源码 ZIP），且没有误拖进浏览器扩展栏；核对 Zotero 版本是否在插件兼容区间内。</td></tr><tr><th scope="row">已安装但找不到按钮</th><td>确认插件已启用并重启了 Zotero；查看插件文档确认入口位置（有的在右键菜单，有的在阅读器侧栏，不一定在主工具栏）。</td></tr><tr><th scope="row">更新后卡顿或闪退</th><td>先禁用刚更新的插件，或使用“故障排除模式”启动定位冲突源。</td></tr><tr><th scope="row">用 ZotMoov 移动后 PDF 打不开</th><td>暂停批量移动，检查目标路径与链接附件根目录设置是否一致，用单个文件确认路径正常后再继续。</td></tr><tr><th scope="row">划词翻译无响应</th><td>确认 PDF 有可选中的文字层（非纯扫描图片），检查所选翻译服务网络连接或 API 额度。</td></tr></tbody></table></div><p>延伸阅读：${link('https://www.zotero.org/support/attaching_files#linked_files','Zotero 链接附件说明')} · ${link('https://zhuanlan.zhihu.com/p/669287007','知乎 Zotero 插件配置参考')}</p></section>
      </article>`;
  }
  const searchItems = [{title:'Zotero 插件安装与推荐',type:'插件指南',body:'中文社区 插件市场 Add-on Market syt zotero-addons Connector XPI 安装 更新 禁用 卸载 Zotero7 兼容 Better BibTeX Better Notes ZotMoov PDF Translate 翻译 引用键 笔记 PDF 管理',href:'#zotero-plugins'}];
  window.GUIDE_ZOTERO_PLUGINS = {render,searchItems};
})();
