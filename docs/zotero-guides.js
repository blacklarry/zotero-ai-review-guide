(() => {
  'use strict';
  const docs = 'https://www.zotero.org/support/';
  const community = 'https://zotero-chinese.com/user-guide/';
  const communityPages = {'zt-install':'install','zt-connector':'install','zt-metadata':'edit-items','zt-reference-import':'add-items','zt-organize':'organize-library','zt-pdf-import':'add-items','zt-backup':'backup','zt-sync':'sync','zt-reader':'take-notes','zt-word-style':'ms-word-plugin'};
  const images = {
    download:{file:'community-download.png',source:community+'install',community:true,note:'界面版本以官网当前发布为准。'},
    connectorEdge:{file:'community-connector-edge-pin.png',source:community+'install',community:true,note:'macOS Edge 界面示例，红框数字为原图标记。'},
    connectorFirefox:{file:'community-connector-firefox-pin.png',source:community+'install',community:true,note:'macOS Firefox 界面示例，红框数字为原图标记。'},
    search:{file:'zotero-10-advanced-search.png',source:'https://www.zotero.org/blog/zotero-10/',note:'Zotero 10 官方高级搜索界面。'},
    duplicates:{file:'community-duplicates.png',source:community+'organize-library',community:true,note:'示例界面来自旧版，用于定位主记录与合并入口。'},
    sync:{file:'community-sync-account.png',source:community+'sync',community:true,note:'登录账户后可继续配置数据与文件同步。'},
    word:{file:'community-word-style.png',source:community+'ms-word-plugin',community:true,note:'引用样式请按学校或期刊要求选择。'},
    parentMenu:{file:'community-create-parent.png',source:community+'add-items',community:true,note:'仅独立 PDF 的右键菜单会显示此项。'},
    parentDialog:{file:'community-parent-dialog.png',source:community+'add-items',community:true,note:'支持输入 DOI / ISBN，或选择“手动录入”。'},
    pdfParent:{file:'community-pdf-parent.webp',source:community+'add-items',community:true,note:'识别完成后仍建议核对题名、作者与年份。'},
    importFile:{file:'community-import-file.webp',source:community+'add-items',community:true,note:'macOS 英文界面示例，Windows 选项名称一致。'},
    localHelp:{file:'zotero-help-local-10.0.6.png',local:true},
    localAbout:{file:'zotero-about-local-10.0.6.png',local:true},
    localTools:{file:'zotero-tools-plugins-local-10.0.6.png',local:true},
    localManager:{file:'zotero-plugins-manager-local-10.0.6.png',local:true},
    localInstallMenu:{file:'zotero-plugin-file-menu-local-10.0.6.png',local:true},
    localFilePicker:{file:'zotero-plugin-file-picker-local-10.0.6.png',local:true}
  };
  const groups = {
    1:[
      {id:'zt-install',title:'图文入门：安装 Zotero，认清三个工作区',purpose:'完成桌面端安装，熟悉“分类、条目、题录”三栏布局。以下以 Windows 为例，macOS 与 Linux 步骤基本一致。',source:docs+'installation',
        steps:[
          {text:'打开 Zotero 官方下载页，下载对应系统的桌面安装程序。页面右侧的浏览器 Connector 需要单独安装。',image:'download',caption:'左侧下载 Zotero 桌面程序，右侧安装浏览器 Connector。',link:['https://www.zotero.org/download/','打开官方下载页']},
          {text:'运行安装程序，按向导完成安装并启动 Zotero。建议顺手查看完整版本号，方便后续挑选兼容插件。'},
          {text:'点击顶部菜单栏“帮助”，选择“关于 Zotero”。',image:'localHelp',caption:'在“帮助”菜单打开“关于 Zotero”。',pins:[[88,75,'点击关于 Zotero']]},
          {text:'记下弹窗中显示的版本号与系统位数（例如 Zotero 10.0.6，64-bit）。',image:'localAbout',caption:'查看当前 Zotero 版本号与系统位数。',pins:[[88,27,'查看完整版本号']]},
          {text:'主界面分为三栏：左侧是分类目录，中间是文献条目列表，右侧是当前条目的题录信息。缩进在父条目下方的是 PDF 附件，建议核对右侧题录，不要直接用 PDF 文件名当作正式题名。',link:[community+'quick-start','查看中文快速入门']},
          {text:'进入设置面板可按需调整界面语言、文件保存与同步选项（Windows/Linux 在“编辑 → 设置”，macOS 在“Zotero → 设置”）。初次使用先跑通本地保存与阅读，再配置同步。',link:[docs+'preferences','设置面板说明']}
        ],expected:'Zotero 正常启动，能看清版本号，并能在新建的分类中定位文献条目与附件。',errors:['只装了浏览器扩展却打不开文献库：回到官网同时安装桌面程序和 Connector。','启动异常：检查系统版本是否满足官方要求，保留报错信息再对照官方文档排查。']},
      {id:'zt-connector',title:'图文入门：安装并检查浏览器 Connector',purpose:'让浏览器的保存按钮正常连接本机 Zotero，实现网页一键抓题录与 PDF。',source:docs+'connector_preferences',
        steps:[
          {text:'在常用浏览器中打开 Zotero 官方下载页，点击对应浏览器的 Connector 入口，前往官方扩展商店完成安装。',link:['https://www.zotero.org/download/connectors','按浏览器安装 Connector']},
          {text:'在 Chrome / Edge 中点击右上角扩展菜单，找到 Zotero Connector 并点击图钉图标，把它固定到工具栏方便一键保存。',image:'connectorEdge',zoom:true,caption:'Edge 固定图标：打开扩展菜单（1），点击 Zotero Connector 旁的图钉（2）。'},
          {text:'Firefox 用户可点击扩展菜单中 Zotero Connector 旁的齿轮图标，选择“固定到工具栏”。',image:'connectorFirefox',zoom:true,caption:'Firefox 固定图标：打开扩展菜单，点齿轮并选择“固定到工具栏”。'},
          {text:'保持 Zotero 桌面程序处于打开状态，进入 Connector 设置页，确认 General 中的 Zotero Status 显示在线。如需自动附加 PDF，可在 Zotero 桌面端“设置 → 常规 → 文件处理”中确认已开启自动关联附件。',link:[docs+'connector_preferences','查看 Connector 设置说明']},
          {text:'找一篇论文详情页点击工具栏保存按钮试存一次，回到 Zotero 确认条目和附件是否到位。',link:['#chapter/2','查看网页保存示范']}
        ],expected:'Connector 状态显示在线，点击保存后条目直接进入 Zotero 指定分类。',errors:['提示无法连接桌面端：先确认 Zotero 桌面程序已打开，再刷新网页重试。','图标只显示普通网页而非论文图标：点进论文详情页再保存，或改用 DOI / RIS 导入。','只保存了题录没有 PDF：确认有全文访问权限，并在 Zotero 常规设置中开启“保存条目时自动附加相关 PDF”。']}
    ],
    2:[
      {id:'zt-metadata',title:'图文整理：核对题录，再检查 PDF 附件',purpose:'确保父条目题录准确可用，且挂载的 PDF 与实际阅读版本一致。',source:docs+'adding_items_to_zotero',
        steps:[
          {text:'选中父条目，对照出版社页面或论文首页检查右侧栏：条目类型、题名、作者、年份、期刊/会议、卷期页码与 DOI。预印本与正式发表版建议分开记录，避免题录混淆。'},
          {text:'展开父条目并双击 PDF 附件，确认正文版本无误，并留意 PDF 页序与印刷页码是否一致。手头已有 PDF 时，直接拖到对应父条目上即可挂为子附件。',image:'pdfParent',caption:'规范的条目结构：父条目在上，PDF 附件缩进在下方。'},
          {text:'直接拖入会把文件复制为“存储的附件”，交由 Zotero 统一管理；“链接的附件”仅指向磁盘外部路径，不参与 Zotero 文件同步。新手建议默认使用存储附件，整理完毕确认无误后再清理原下载文件。',link:[community+'add-attachments','存储附件与链接附件的区别']}
        ],expected:'每篇文献都有准确的父条目与对应的 PDF 附件，引用和定位不再错乱。',errors:['只拖入了独立 PDF 没有父条目：右键选择“检索元数据”或“创建父条目”，见下方 PDF 导入步骤。','下载不到 PDF：通过校园网、出版商页面或合法开放版本补全，并在笔记中注明版本。','期刊论文被识别成网页、引用出现 [EB/OL]：在右侧面板将条目类型改为“期刊文章”并补全字段，回 Word 点 Refresh 刷新。','Word 引用显示缺字段：回 Zotero 改好元数据后再点 Refresh，避免直接在自动书目里手动改字。']},
      {id:'zt-reference-import',title:'抓取失败时：用 DOI 或引用文件导入',purpose:'遇到网页抓不全或无法识别的数据库时，通过标识符或导出文件稳定补录题录。',source:docs+'adding_items_to_zotero',
        steps:[
          {text:'已有 DOI、ISBN、PMID 或 arXiv ID 时，点击工具栏的魔杖图标（通过标识符添加条目），粘贴后回车即可导入。部分中文文献若无法识别，可改用下方的引用文件方式。',link:[community+'add-items#通过标识符添加条目','标识符导入说明']},
          {text:'在数据库页面点击“导出”或“引用”，下载 RIS 或 BibTeX 格式文件；回到 Zotero，点击“文件 → 导入”选中该文件即可。若剪贴板已复制标准 RIS/BibTeX 文本，也可直接用“文件 → 从剪贴板导入”。',image:'importFile',caption:'在导入向导中选择“文件（BibTeX、RIS 等）”继续。',link:[community+'add-items#由通用格式的引用信息导入-通用方法','引用文件导入图解']},
          {text:'导入后检查条目类型、作者顺序、年份与 DOI，并拖入对应的 PDF 附件，顺手确认是否与已有条目重复。'}
        ],expected:'条目准确出现在目标分类中，题录完整且已确认附件情况。',errors:['DOI 无法识别：检查是否多复制了空格或前缀，或改从数据库导出 RIS 文件。','中文数据库导出后作者多出导师、字段错位：对照论文首页手动微调后再用于引用。','手头只有纯文本参考文献列表：回数据库重新导出 RIS/BibTeX，或手动新建条目。']},
      {id:'zt-organize',title:'图文整理：分类、子分类、标签与智能分类',purpose:'用分类管项目结构，用标签管主题和进度，用保存搜索自动聚合待办文献。',source:docs+'collections_and_tags',
        steps:[
          {text:'右键左侧“我的文库”新建选题分类，再右键该分类新建“待筛选、纳入、排除”等子分类。把条目拖入多个分类只会建立关联，不会重复占用空间。'},
          {text:'选中条目，在右侧“标签”栏添加“待读”“已提取”“待核查”等状态标签，以及研究主题标签。批量打标时，可选中多篇文献直接拖到左侧标签栏的对应标签上。'},
          {text:'点击快速搜索栏右侧的筛选按钮打开高级搜索，设置条件（例如“标签 / 是 / 待核查”），点击搜索确认命中后，点 Save Search 保存为智能分类。之后只要增删标签，列表就会自动更新。',image:'search',caption:'高级搜索：配置条件（1），先搜索确认（2），再点击 Save Search 保存（3）。',pins:[[13,22,'设置字段与条件'],[7,51,'点击搜索查看结果'],[34,51,'保存为智能分类']]}
        ],expected:'能按分类、标签和智能分类快速定位同一篇文献，库内条目整洁无冗余。',errors:['点父分类看不到子分类里的文献：在菜单“查看”中勾选“显示子分类中的条目”。','智能分类是空的：检查标签拼写以及条件组合（满足“全部”还是“任一”条件）。','删除分类时误删了文献：右键“删除分类”只移除目录，“删除分类及条目”才会把文献移进回收站，操作前看清选项。']},
      {id:'zt-pdf-import',title:'PDF 导入、识别元数据与去重',purpose:'把本地已有 PDF 整理成规范条目，并清理库里的重复文献。',source:docs+'retrieve_pdf_metadata',
        steps:[
          {text:'将 PDF 拖入目标分类，Zotero 会自动联网匹配元数据并生成父条目。识别完成后对照首页核对题名与 DOI。',image:'pdfParent',caption:'自动识别后，PDF 会挂载到新生成的父条目下方。'},
          {text:'若导入后仍是独立 PDF，右键尝试“检索元数据”。扫描版或信息不全的中文 PDF 可能识别失败，可走下一步手动建父条目。'},
          {text:'识别失败时，右键该独立 PDF，选择“创建父条目（Create Parent Item）”。',image:'parentMenu',caption:'在独立 PDF 的右键菜单中选择“创建父条目”。'},
          {text:'在弹窗中输入 DOI / ISBN 等标识符；没有标识符则点击“手动录入”，按原文首页填写基本题录。也可以先从论文网页抓好题录，再把 PDF 拖过去挂载。',image:'parentDialog',caption:'输入标识符自动补全，或点击“手动录入”。',link:[docs+'adding_items_to_zotero','官方文档：添加条目']},
          {text:'点击左侧“重复条目”，逐组核对作者、年份与版本，确认是同一篇论文后，在右侧选择信息更完整的主记录，点击“合并项目”。预印本与正式版可按引用需要决定是否合并。',image:'duplicates',caption:'在右侧挑选信息更全的主记录，确认后点击合并。'}
        ],expected:'本地 PDF 都挂在准确的父条目下，重复文献合并干净且保留原有分类与标签。',errors:['自动匹配错了论文：右键选择“撤销检索元数据”，再手动创建父条目。','一次拖入几十篇 PDF 难以逐一核对：分批小量导入，大批题录优先从数据库导出 RIS/BibTeX。','两篇不同论文被误判为重复：直接跳过，无需强行合并。']},
      {id:'zt-backup',title:'图文维护：完整备份文献库',purpose:'保留可完整恢复的本地副本，避免把普通导出或云同步当成唯一保险。',source:docs+'zotero_data#backing_up_your_zotero_data',
        steps:[
          {text:'打开“设置 → 高级 → 文件和文件夹”，点击“显示数据文件夹”定位实际目录（注意不要与“链接附件根目录”混淆）。',link:[community+'backup','完整备份指南']},
          {text:'完全退出 Zotero 后，复制整个数据目录（含 zotero.sqlite 数据库和 storage 附件夹）到移动硬盘或其他备份位置，并标注日期。如果使用了链接附件，记得把外部附件目录一并备份。'}
        ],expected:'拿到一份带日期的完整备份，随时可以无损恢复文献库与 Word 引用关联。',errors:['只导出了 BibTeX/RIS 当备份：导出文件会丢失笔记关联、分类结构与 Word 引用 ID，不能替代完整目录备份。','开着 Zotero 直接拷贝：可能导致数据库损坏，务必先完全退出程序。','把数据目录直接放进 OneDrive / 百度网盘同步盘：极易引发数据库冲突损坏，请使用 Zotero 自带同步或定期冷备份。']},
      {id:'zt-sync',title:'图文维护：配置数据同步与附件同步',purpose:'让多台电脑都能看到完整的题录、笔记和 PDF，跨设备无缝衔接。',source:docs+'sync',
        steps:[
          {text:'打开“设置 → 同步”，登录你的 Zotero 账号。数据同步（题录与笔记）免费不限容量；文件同步（PDF 附件）可按需选择 Zotero 官方空间或自建 WebDAV，群组库统一使用 Zotero 空间。',image:'sync',caption:'在同步设置中登录 Zotero 账号，再按需开启文件同步。'},
          {text:'先用两三篇文献测试：在第一台电脑点击右上角同步按钮，再到另一台电脑同步，确认题录、笔记与 PDF 都能正常打开。使用 WebDAV 时先点击“验证服务器”。'},
          {text:'如果右上角出现红色感叹号，点开查看具体报错，排查网络、空间额度或账号状态，不要随意点击设置里的“重置（Reset）”。',link:[docs+'sync#file_syncing','数据同步与文件同步说明']}
        ],expected:'另一台设备同步后能正常检索条目、查看笔记并打开 PDF。',errors:['能看到题录但打不开 PDF：检查是否开启文件同步、Zotero 免费 300MB 空间是否已满，或 WebDAV 是否连接正常。','链接附件在另一台电脑找不到：链接附件不走 Zotero 同步，需要另配同步方案并统一根目录。','多台设备同时修改产生冲突：按弹窗提示对比两份改动后保留正确版本。']}
    ],
    3:[
      {id:'zt-reader',title:'图文阅读：划词批注、注释与笔记',purpose:'把阅读时的顺手高亮，沉淀为带页码回链的结构化笔记。',source:docs+'pdf_reader',
        steps:[
          {text:'双击父条目下的 PDF，在 Zotero 内置阅读器中打开。选中关键句子点击弹出色块即可高亮，或点亮工具栏的高亮笔连续划词。'},
          {text:'点击高亮块补充批注，随手记下这条内容对应“研究问题、方法、结果还是局限”，以及你的思考。把原文事实和个人解读分开写，顺手记下页码、表图号与实验条件。'},
          {text:'读完后，在文献列表右键父条目选择“从注释中添加笔记”，或在阅读器右侧笔记面板一键汇入。每条批注都会附带跳转回 PDF 原页的链接；需要复制给 AI 时，补上 P001/E01 等纯文字编号和页码。'},
          {text:'要把带批注的 PDF 发给别人看，在文库视图点击“文件 → 导出 PDF”（或在阅读器里“文件 → 另存为”）。直接从 storage 文件夹拷出的原始 PDF 不含 Zotero 内置批注。',link:[docs+'kb/annotations_in_database','PDF 批注导出说明']}
        ],expected:'生成一条包含原文摘录、个人批注和回跳链接的条目笔记，随时可定位原页。',errors:['扫描版 PDF 无法选中文字：先用 OCR 工具识别文字层，再对识别出的关键数值人工核对。','复制笔记给 AI 后丢了页码：从批注生成的链接在纯文本中会失效，提前把页码和文献编号写进文字。','页码和论文印刷页对不上：笔记里注明用的是“PDF 第 X 页”还是“印刷页码”，保持全文统一。']}
    ],
    6:[
      {id:'zt-word-style',title:'Word 操作补充：切换格式与核对书目',purpose:'一键统改引文样式并生成参考文献表，保持文内引用与文后书目同步更新。',source:docs+'word_processor_plugin_usage',
        steps:[
          {text:'在 Word 的 Zotero 选项卡点击 Document Preferences（文档首选项），选择学校或期刊要求的引用样式（如 GB/T 7714 或 APA）以及语言。',image:'word',caption:'在文档首选项中选择目标引文样式（1），可点管理样式增补（2），确认生效（3）。',pins:[[94,27,'选择引文样式'],[16,52,'管理或添加样式'],[76,91,'点击确定生效']]},
          {text:'将光标移至文末参考文献处，点击 Add/Edit Bibliography 自动生成书目。若发现作者、年份或期刊名有误，回到 Zotero 修改题录，再回 Word 点 Refresh 同步更新。'},
          {text:'逐一搜索并替换草稿中的 [P001] 等临时编号，直接引语或指定页码在引用弹窗中填写。完成后通读检查，确认没有残留占位符，且每条引用都准确对应相邻论点。'}
        ],expected:'正文引文与文末参考文献按目标样式自动排版，修改题录后可一键刷新。',errors:['Word 里看不到 Zotero 选项卡：按本章下方的“Word 没有 Zotero 选项卡”清单逐项排查。','切换样式后格式仍不对：确认文档语言设置（中文样式选中文）及 Zotero 题录字段是否填写规范，再点击 Refresh。','提交前需要移除域代码：先另存一份提交副本，再在副本中点击 Unlink Citations，务必保留带 Zotero 字段的可编辑原稿。']}
    ]
  };

  function figure(step,{esc}) {
    if (!step.image) return '';
    const meta=typeof step.image === 'string' ? images[step.image] : step.image;
    const path='assets/operations/'+meta.file;
    const note = meta.note ? `${esc(meta.note)} ` : '';
    const source=meta.local
      ? `${note}${esc(meta.environment || 'Zotero 10.0.6 界面参考')} · <a href="${path}" target="_blank" rel="noopener noreferrer">查看大图</a>`
      : meta.community
        ? `${note}来源：<a href="${meta.source}" target="_blank" rel="noopener noreferrer">Zotero 中文社区</a>（<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>） · <a href="${path}" target="_blank" rel="noopener noreferrer">查看原图</a>`
        : `${note}来源：<a href="${meta.source}" target="_blank" rel="noopener noreferrer">Zotero 官方文档</a> · <a href="${path}" target="_blank" rel="noopener noreferrer">查看原图</a>`;
    return `<figure><div class="tutorial-shot${step.zoom ? ' tutorial-shot-zoom' : ''}"><a href="${path}" target="_blank" rel="noopener noreferrer" aria-label="打开截图：${esc(step.caption)}"><img src="${path}" alt="${esc(step.caption)}" loading="lazy"></a>${(step.pins||[]).map(([left,top,label],i)=>`<span class="tutorial-pin" style="left:${left}%;top:${top}%" aria-hidden="true">${i+1}</span>`).join('')}</div>${step.pins?.length ? `<ol class="tutorial-key">${step.pins.map(pin=>`<li>${esc(pin[2])}</li>`).join('')}</ol>` : ''}<figcaption>${esc(step.caption)}<br>${source}</figcaption></figure>`;
  }

  function chapter(id,{esc}) {
    return (groups[id]||[]).map(group=>`<section class="worked-example operation-guide zotero-walkthrough" aria-labelledby="${group.id}"><h2 id="${group.id}">${esc(group.title)}</h2><p><b>操作目的：</b>${esc(group.purpose)}</p><ol class="practice-steps">${group.steps.map(step=>`<li><p>${esc(step.text)}${step.link ? ` <a href="${esc(step.link[0])}"${step.link[0].startsWith('https:')?' target="_blank" rel="noopener noreferrer"':''}>${esc(step.link[1])}</a>` : ''}</p>${figure(step,{esc})}${step.pending ? `<p class="screenshot-pending"><b>待补实机截图：</b>${esc(step.pending)}</p>` : ''}</li>`).join('')}</ol><p class="operation-result"><b>预期结果：</b>${esc(group.expected)}</p><details class="operation-trouble"><summary>常见错误与处理</summary><ul class="practice-steps">${group.errors.map(error=>`<li>${esc(error)}</li>`).join('')}</ul></details><p class="case-scope"><a href="${group.source}" target="_blank" rel="noopener noreferrer">Zotero 官方文档</a> · <a href="${community}${communityPages[group.id]}" target="_blank" rel="noopener noreferrer">中文社区指南</a></p></section>`).join('');
  }
  window.GUIDE_ZOTERO_GUIDES = {chapter,figure};
})();
