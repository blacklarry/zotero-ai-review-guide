(() => {
  'use strict';
  const checked = '2026-10-28';
  const plugins = [
    {id:'bbt',name:'Better BibTeX',version:'9.0.71',released:'2026-10-07',range:'8.0.1–10.*',
      purpose:'适合需要稳定引用键、BibTeX / BibLaTeX 导出及 LaTeX 写作的人。Word 的 Zotero 引用功能不依赖它。',
      repo:'https://github.com/retorquere/zotero-better-bibtex',release:'https://github.com/retorquere/zotero-better-bibtex/releases/tag/v9.0.71',
      xpi:'https://github.com/retorquere/zotero-better-bibtex/releases/download/v9.0.71/zotero-better-bibtex-9.0.71.xpi',
      docs:'https://retorque.re/zotero-better-bibtex/installation/',
      compatibility:'此发布包不适用于 Zotero 7.0.x。保留旧版 Zotero 时应另查明确兼容的历史发布，不能把当前包改名后安装。',
      verify:'选一个测试条目，按插件说明导出 Better BibTeX 或 Better BibLaTeX 文件，核对题名、作者、年份和引用键。已有文稿使用的引用键先保留，不批量修改后再猜测对应关系。'},
    {id:'notes',name:'Better Notes',version:'3.3.3',released:'2026-08-24',range:'8.0-beta.21–10.99.99',
      purpose:'适合需要笔记关联、模板和 Markdown 等格式导出的人。基础批注转笔记仍可使用 Zotero 自带功能。',
      repo:'https://github.com/windingwind/zotero-better-notes',release:'https://github.com/windingwind/zotero-better-notes/releases/tag/v3.3.3',
      xpi:'https://github.com/windingwind/zotero-better-notes/releases/download/v3.3.3/better-notes-for-zotero.xpi',
      docs:'https://github.com/windingwind/zotero-better-notes#readme',
      compatibility:'当前发布包下限是 8.0-beta.21，不适用于 Zotero 7.0.x。不要因旧教程写着支持 Zotero 7，就安装这里的当前包。',
      verify:'在测试条目创建一条含中文和来源信息的笔记，按官方说明导出 Markdown；对照原笔记检查文字、链接与引用位置，再决定是否用于正式笔记。'},
    {id:'zotmoov',name:'ZotMoov',version:'1.2.34',released:'2026-10-16',range:'6.999–10.*',
      purpose:'适合明确需要把个人文献库附件移动或复制到自选目录、以链接管理 PDF 的用户。初学者可先保留 Zotero 自带的存储附件方式。',
      repo:'https://github.com/wileyyugioh/zotmoov',release:'https://github.com/wileyyugioh/zotmoov/releases/tag/1.2.34',
      xpi:'https://github.com/wileyyugioh/zotmoov/releases/download/1.2.34/zotmoov-1.2.34-fx.xpi',
      docs:'https://github.com/wileyyugioh/zotmoov#readme',
      compatibility:'项目面向 Zotero 7 附件管理；6.999 是发布包中的声明下限，不表示支持 Zotero 6.0.x。声明覆盖范围不等于已对每一版本完成实机验证。',
      verify:'先备份，使用一份可重新取得的测试 PDF，按项目说明设置专用目录，只测试一个附件。完成后在 Zotero 打开该 PDF、查看实际路径并重新启动验证；确认后再考虑批量操作。',
      caution:'移动会改变文件位置与附件管理方式；链接附件不由 Zotero 文件同步上传，群组库不支持链接附件。卸载插件也不会自动把已移动的文件恢复原位。'},
    {id:'translate',name:'Translate for Zotero（PDF Translate）',version:'2.4.8',released:'2026-10-03',range:'7.9.9–10.9.9',
      purpose:'适合阅读时辅助理解外文段落。译文仅用于理解，研究结果、数值和引用仍以原文为准。',
      repo:'https://github.com/windingwind/zotero-pdf-translate',release:'https://github.com/windingwind/zotero-pdf-translate/releases/tag/v2.4.8',
      xpi:'https://github.com/windingwind/zotero-pdf-translate/releases/download/v2.4.8/translate-for-zotero.xpi',
      docs:'https://github.com/windingwind/zotero-pdf-translate#readme',
      compatibility:'当前包声明下限为 7.9.9，这不代表可安装到 Zotero 7.0.x；使用旧版时须另行核对历史发布。',
      verify:'打开可选中文字的测试 PDF，按插件说明选择翻译服务并翻译一小段，核对否定词、限定条件、专业术语与数值。外部服务不可用时记录错误，不据此补写论文结论。',
      caution:'部分翻译服务可能需要账号、额度或 API 凭据，并可能接收所选文本。使用前核对服务的数据政策；不要把凭据或未公开材料放入公开问题报告。'}
  ];

  function render({icon, esc, crumb}) {
    const link = (url,label) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
    const shot = (image,caption,pins=[]) => window.GUIDE_ZOTERO_GUIDES.figure({image,caption,pins},{esc});
    const examples = plugins.map(plugin => `<section class="worked-example" id="plugin-${plugin.id}" aria-labelledby="plugin-${plugin.id}-title"><h2 id="plugin-${plugin.id}-title">${esc(plugin.name)}</h2><p>${esc(plugin.purpose)}</p><dl class="field-guide"><div><dt>已核验发布</dt><dd>${esc(plugin.version)} · 发布日期 ${esc(plugin.released)}；核对时仓库未归档。${link(plugin.release,'发布记录')}</dd></div><div><dt>兼容声明</dt><dd><code>${esc(plugin.range)}</code>，依据上述 XPI 内 <code>manifest.json</code> 的 <code>applications.zotero</code> 最低与最高版本字段。${esc(plugin.compatibility)}</dd></div><div><dt>安装与验证</dt><dd>下载此兼容版本的 XPI，按下方通用安装步骤处理。${esc(plugin.verify)}</dd></div>${plugin.caution ? `<div><dt>使用前确认</dt><dd>${esc(plugin.caution)}</dd></div>` : ''}</dl><p>${link(plugin.repo,'开发者仓库')} · ${link(plugin.docs,'安装与使用说明')} · ${link(plugin.xpi,'下载已核验版本 XPI')}</p></section>`).join('');
    return `${crumb('Zotero 插件安装与推荐')}
      <article class="workbuddy-content zotero-plugin-guide">
        <header class="page-intro"><h1>Zotero 插件安装与推荐</h1><p>先完成 Zotero 自带的文献、批注和引用流程，再按实际需要添加插件。Connector 装在浏览器中，桌面插件 XPI 装在 Zotero 中，两者不能混用。</p><div class="page-meta"><span>${icon('file')} 资料核验：${checked}</span><span>${icon('info')} 发布记录与包内声明已核对，未做本机安装实测</span><span>实机入口截图：2026-10-29 · Zotero 10.0.6</span></div></header>
        <section class="worked-example" aria-labelledby="plugin-types"><h2 id="plugin-types">先分清三类扩展</h2><div class="table-wrap"><table><caption class="sr-only">Connector、桌面 XPI 与 Word 插件的区别</caption><thead><tr><th scope="col">类型</th><th scope="col">安装位置与获取方式</th><th scope="col">完成后检查</th></tr></thead><tbody><tr><th scope="row">Zotero Connector</th><td>从 ${link('https://www.zotero.org/download/','Zotero 官方下载页')}进入适合当前浏览器的官方扩展商店。不要把桌面 XPI 拖入浏览器扩展管理器。</td><td>浏览器工具栏出现保存按钮，Zotero 桌面程序运行时能把一个真实条目保存到指定分类。<a href="#chapter/2">查看保存文献图文教程</a>。</td></tr><tr><th scope="row">Zotero 桌面插件</th><td>从开发者正式发布页取得兼容的 <code>.xpi</code>，在 Zotero 的“工具 → 插件”中安装。</td><td>管理器显示正确名称与版本，未提示不兼容，并通过一个测试条目的功能验证。</td></tr><tr><th scope="row">Word 引文插件</th><td>随 Zotero 提供，通过 Zotero 的引用设置安装或修复，不需下载上面这些第三方 XPI。</td><td>Word 出现 Zotero 选项卡，能插入真实条目并生成书目。<a href="#chapter/6">查看 Word 操作与排障</a>。</td></tr></tbody></table></div><p>依据：${link('https://www.zotero.org/support/plugins','Zotero 官方插件说明')} · ${link('https://www.zotero.org/support/word_processor_integration','文字处理软件集成说明')}。</p></section>
        <section class="worked-example" aria-labelledby="plugin-install"><h2 id="plugin-install">桌面 XPI：按顺序安装并验证</h2><ol class="practice-steps"><li><b>确认 Zotero 版本。</b>打开“关于 Zotero”窗口，记录完整版本号和系统；用目标发布的兼容说明或包内清单核对，不只看“支持 Zotero”几个字。${shot('localAbout','先记录本机完整版本，再核对 XPI 的兼容范围。',[[88,27,'本机版本号']])}</li><li><b>下载兼容的发布文件。</b>进入下方开发者发布页，在发布附件中选择 <code>.xpi</code>，不要选 <code>Source code.zip</code>。Firefox 若尝试安装为浏览器扩展，改用右键保存链接，将文件先保存到电脑。</li><li><b>打开 Zotero 管理器。</b>在 Zotero 选择 <b>工具（Tools）→ 插件（Plugins）</b>；这一步发生在桌面程序内。${shot('localTools','在 Zotero 的工具菜单中选择“插件”。',[[88,66,'桌面插件管理器入口']])}${shot('localManager','打开后应看到 Plugins Manager；右上角齿轮是安装工具菜单。',[[92,15,'齿轮工具菜单'],[87,65,'已有插件的启用控件']])}</li><li><b>选择本地 XPI。</b>在管理器齿轮菜单选择 <b>Install Plugin From File…</b>（界面可能写作 Install Add-on From File…），选择已下载文件；官方也支持把 XPI 拖到插件管理器窗口。${shot('localInstallMenu','点击齿轮，再选择 Install Plugin From File… 。',[[92,12,'打开齿轮菜单'],[91,60,'从本地文件安装']])}${shot('localFilePicker','在文件选择器中找到已核对的 XPI，再点打开；本图仅示意文件类型与按钮。',[[94,31,'筛选器包含 *.xpi'],[84,67,'确认所选文件后打开']])}</li><li><b>核对后完成安装。</b>确认插件名称和来源，按界面完成安装。仅在 Zotero 或插件说明要求时重启或重新加载，不把安装文件自动执行到其他程序。</li><li><b>检查是否启用。</b>回到管理器，核对显示的版本、启用状态及不兼容提示；菜单文字可能随版本和语言变化。若没有显示，先确认安装目标和下载文件，不删除文献库来排障。</li><li><b>验证最小功能。</b>按对应插件下方的验证方法，用测试条目或测试 PDF 完成一次操作，记录输入、结果与错误；确认后再用于正式资料或批量操作。</li></ol><p>安装路径依据：${link('https://www.zotero.org/support/plugins','Zotero 官方说明')} · ${link('https://retorque.re/zotero-better-bibtex/installation/','Better BibTeX 安装说明')}。上述界面于 2026-10-29 在 Windows / Zotero 10.0.6 中截取；实际走到本地文件选择后取消，未安装、更新或禁用插件，不能据此认定插件功能已实测。</p></section>
        <div class="callout"><strong>${icon('shield')} 选择可信来源</strong>官方说明指出，桌面插件能完整访问 Zotero 和电脑。只从可信开发者的正式发布页取得 XPI，核对维护与兼容信息；涉及移动附件或批量改数据时先备份，不以关闭安全校验或修改清单的方式强行安装。</div>
        <section class="worked-example" aria-labelledby="plugin-versions"><h2 id="plugin-versions">Zotero 7、旧版与当前发布不能混装</h2><p>Zotero 7 改变了插件架构，原有插件需要更新。能在 Zotero 6 使用的旧插件不能直接视为兼容 Zotero 7；同理，最新插件也可能已经提高最低版本要求。检查的是具体发布文件，不是插件名称。</p><p>例如本次核对的 Better BibTeX 和 Better Notes 当前包均不支持 Zotero 7.0.x，PDF Translate 当前包的下限也高于 7.0.x。仍使用旧版 Zotero 时，应在同一开发者的历史发布中寻找明确兼容的版本；本次没有逐个核验历史包，不能保证任意旧版本可用。不要修改 <code>strict_min_version</code> 或 <code>strict_max_version</code> 来绕过检查。</p><p>${link('https://www.zotero.org/blog/zotero-7/','Zotero 7 官方架构说明')} · ${link('https://www.zotero.org/support/dev/zotero_7_for_developers','官方兼容清单字段说明')}。</p></section>
        <section class="worked-example" aria-labelledby="plugin-examples"><h2 id="plugin-examples">按需求选择实例</h2><p>下列四项在 ${checked} 均有稳定发布记录，仓库未归档，并已读取所列 XPI 的兼容清单。这里推荐的是对应需求下的候选工具，清单声明不等于已对全部 Zotero 版本做实机验证。教程主流程不要求全部安装。</p></section>
        ${examples}
        <section class="worked-example" aria-labelledby="plugin-maintenance"><h2 id="plugin-maintenance">更新、禁用与卸载</h2><ol class="practice-steps"><li><b>更新：</b>在插件管理器检查插件更新；若当前版本没有检出，回到原开发者发布页核对兼容版 XPI，再按同一路径安装。更新后核对管理器中的实际版本，并重做最小功能验证。Zotero 主程序更新不等于每个插件均已更新。</li><li><b>禁用与恢复：</b>找到目标插件，使用其启用/禁用控件；若界面要求重启则照做。一次只改变一个插件，验证原问题是否还出现，再决定是否恢复。</li><li><b>卸载：</b>先保存必要设置、导出结果和原文件位置信息，再在该插件条目菜单中使用移除/卸载命令。卸载不自动撤销已发生的文件移动、元数据修改或写回结果。</li><li><b>启动异常：</b>所用版本如提供 <b>帮助 → Restart in Troubleshooting Mode…</b>，可用它临时禁用全部插件定位问题；旧版按官方故障处理说明操作。保留错误信息，勿清空数据目录或批量删除配置文件。</li></ol><p>参考：${link('https://www.zotero.org/support/7.0_changelog','Zotero 7 更新记录中的故障排除模式说明')} · ${link('https://retorque.re/zotero-better-bibtex/installation/','插件更新说明')}。</p></section>
        <section class="worked-example" aria-labelledby="plugin-trouble"><h2 id="plugin-trouble">安装与使用失败时检查什么</h2><div class="table-wrap"><table><thead><tr><th scope="col">现象</th><th scope="col">依次检查</th><th scope="col">应记录的结果</th></tr></thead><tbody><tr><th scope="row">提示损坏或不兼容</th><td>确认文件是正式发布的 XPI、未下载成源码 ZIP；确认目标是 Zotero 管理器；核对完整 Zotero 版本与该发布兼容范围，重新从可信来源下载。</td><td>系统、Zotero 版本、插件版本、下载页和完整错误文字。</td></tr><tr><th scope="row">已安装但找不到功能</th><td>核对启用状态，按要求重启；再查插件自身使用说明中功能所属的窗口或条目类型，不假定所有插件都会增加同一种工具栏按钮。</td><td>管理器显示的版本、实际操作对象和出现的菜单。</td></tr><tr><th scope="row">更新后异常或卡顿</th><td>先禁用刚更新的插件，用同一测试条目复现；必要时使用官方故障排除模式，区分 Zotero 问题与第三方插件问题。</td><td>禁用前后对比、复现步骤，以及去除敏感信息的日志。</td></tr><tr><th scope="row">PDF 移动后打不开</th><td>停止批量移动，检查原路径、目标目录和是否有备份；ZotMoov 的链接附件与 Zotero 存储附件不是同一种同步方式。</td><td>一份测试附件的路径变化，确认恢复或重新定位后再继续。</td></tr><tr><th scope="row">翻译无输出或意思不对</th><td>检查原文能否选中、所选服务是否可用及实际错误；对照原文核对否定、数值与条件。不要把翻译结果直接当作作者结论。</td><td>不含私密材料的最小输入、原文/译文差异和服务错误。</td></tr></tbody></table></div><p>附件同步边界参见 ${link('https://www.zotero.org/support/attaching_files#linked_files','Zotero 链接附件说明')}；下载失败时记录实际网络错误，不使用来源不明的重打包插件。</p></section>
        <p class="case-scope">补充阅读：${link('https://zhuanlan.zhihu.com/p/669287007','用户提供的知乎教程')}。当前访问受限，原文内容、适用版本及图片复用许可待核实；暂仅提供原文入口，本页未转载其图片。操作以已核对的官方说明和你的实际版本为准。</p>
      </article>`;
  }
  const searchItems = [{title:'Zotero 插件安装与推荐',type:'插件指南',body:'Connector XPI 安装 更新 禁用 卸载 Zotero7 兼容 Better BibTeX Better Notes ZotMoov PDF Translate 翻译 引用键 笔记 PDF 管理',href:'#zotero-plugins'}];
  window.GUIDE_ZOTERO_PLUGINS = {render,searchItems};
})();
