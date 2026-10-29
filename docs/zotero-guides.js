(() => {
  'use strict';
  const docs = 'https://www.zotero.org/support/';
  const community = 'https://zotero-chinese.com/user-guide/';
  const communityPages = {'zt-install':'install','zt-connector':'add-items','zt-metadata':'edit-items','zt-reference-import':'add-items','zt-organize':'organize-library','zt-pdf-import':'add-items','zt-backup':'backup','zt-sync':'sync','zt-reader':'take-notes','zt-word-style':'ms-word-plugin'};
  const images = {
    search:{file:'zotero-10-advanced-search.png',source:'https://www.zotero.org/blog/zotero-10/',checked:'2026-10-29',note:'Zotero 10 官方高级搜索演示；原图是作者与批注颜色条件，不是本教程的标签示例。原发布图保留原权利人的版权。'},
    duplicates:{file:'community-duplicates.png',source:community+'organize-library',community:true,note:'中文社区原有整理示例；来源页明确尚未按 Zotero 7 更新，只用于辨认主记录和合并入口。原图中的插件图标不属于教程必装项。'},
    sync:{file:'community-sync-account.png',source:community+'sync',community:true,note:'只展示关联账户的入口，用户名与密码为空；文件同步选项须登录后另行检查。原图红框与编号由来源作者添加。'},
    word:{file:'community-word-style.png',source:community+'ms-word-plugin',community:true,note:'中文文档首选项示例；图中所选样式只示意操作，请按学校或期刊要求选择。'},
    parentMenu:{file:'community-create-parent.png',source:community+'add-items',community:true,note:'独立 PDF 的右键菜单，“创建父条目”由原作者橙色箭头指出；不是已有父条目的菜单。'},
    parentDialog:{file:'community-parent-dialog.png',source:community+'add-items',community:true,note:'输入经核实的标识符，或点击“手动录入”。图中的文件名是来源文档的演示资料，不是本教程论文案例。'},
    pdfParent:{file:'community-pdf-parent.webp',source:community+'add-items',community:true,note:'局部截图只展示识别成功后的父条目和缩进 PDF；元数据是否准确仍需人工核对。'},
    importFile:{file:'community-import-file.webp',source:community+'add-items',community:true,note:'macOS 英文导入向导；选择 A file (BibTeX, RIS, Zotero RDF, etc.) 后继续，Windows 外观可能不同。原图橙色箭头由来源作者添加。'},
    localHelp:{file:'zotero-help-local-10.0.6.png',local:true,note:'仅保留帮助菜单；其他插件增加的菜单项不属于教程必装项。'},
    localAbout:{file:'zotero-about-local-10.0.6.png',local:true,note:'裁出“关于 Zotero”窗口，去掉个人文献库背景；版本文字未改。'},
    localTools:{file:'zotero-tools-plugins-local-10.0.6.png',local:true,note:'截取工具菜单顶部；“插件”是桌面管理器入口，浏览器扩展是另一个入口。'},
    localManager:{file:'zotero-plugins-manager-local-10.0.6.png',local:true,note:'图中是截图时已有插件，只示意管理器布局与启用控件；不表示推荐全部安装或已逐一测试。'},
    localInstallMenu:{file:'zotero-plugin-file-menu-local-10.0.6.png',local:true,note:'裁出齿轮菜单和 Install Plugin From File… 命令；未改变更新设置。'},
    localFilePicker:{file:'zotero-plugin-file-picker-local-10.0.6.png',local:true,note:'只保留文件名、文件类型和打开/取消区域，去掉个人目录；本次以取消结束，未安装 XPI。'}
  };
  const groups = {
    1:[
      {id:'zt-install',title:'图文入门：安装 Zotero，认清三个工作区',purpose:'先让桌面程序正常启动，并能找到分类、条目和题录信息。Windows 作为操作示例，其他系统按官方下载页选择安装程序。',source:docs+'installation',
        steps:[
          {text:'打开 Zotero 官方下载页，下载与你的操作系统相符的桌面安装程序。浏览器 Connector 是另一个安装入口，先不要把两者混用。',link:['https://www.zotero.org/download/','打开官方下载页']},
          {text:'Windows 运行刚下载的安装程序，按向导完成安装，然后从开始菜单启动 Zotero。打开“帮助 → 关于 Zotero”记录完整版本号；遇到系统拦截时核对下载来源和系统要求，不绕过安全警告。',pending:'Windows 安装向导；本机已安装，未为截图重新安装。'},
          {text:'首次启动后，点击菜单栏“帮助”，再点击“关于 Zotero”。先确认桌面版本，再选择兼容的插件。',image:'localHelp',caption:'帮助菜单中的“关于 Zotero”入口。',pins:[[88,75,'点击关于 Zotero']]},
          {text:'在弹出的窗口记录完整版本号。本机截图显示 Zotero 10.0.6（64-bit）；你的版本可能不同，请以自己的窗口为准，不能用教程截图代替兼容核对。',image:'localAbout',caption:'本机“关于 Zotero”窗口：10.0.6（64-bit）。',pins:[[88,27,'记录完整版本与位数']]},
          {text:'在文库主界面：左侧选择分类，中间选择文献父条目，右侧查看题录。父条目下缩进的 PDF 是附件；不要把 PDF 文件名当成已核实题名。',link:[community+'quick-start','查看中文快速入门']},
          {text:'进入 Zotero 设置检查界面语言、文件保存与同步选项。Windows/Linux 通常从“编辑 → 设置”进入，macOS 从“Zotero → 设置”进入；旧版可能称为首选项。第一轮先完成本地保存与阅读，再设置同步。',link:[docs+'preferences','设置菜单与各面板说明']}
        ],expected:'能重新启动 Zotero，知道自己的版本，并在一个试验分类中找到条目与附件。',errors:['下载了 Connector 却没有桌面程序：返回官方下载页，分别安装桌面程序与浏览器扩展。','启动失败：核对官方系统要求和安装包平台；保留错误文本，不先删除文献库或重装系统。']},
      {id:'zt-connector',title:'图文入门：安装并检查浏览器 Connector',purpose:'让学术网页的保存按钮能找到本机 Zotero。Connector 安装在浏览器，不通过 Zotero 的 .xpi 插件管理器安装。',source:docs+'connector_preferences',
        steps:[
          {text:'在将要检索文献的浏览器中打开官方下载页，点击该浏览器的 Connector 安装入口，并在浏览器商店完成添加。Chrome/Edge 可从扩展菜单固定图标；Firefox 可从工具栏扩展菜单找到它。',link:['https://www.zotero.org/download/connectors','按浏览器安装 Connector'],pending:'当前浏览器商店的安装确认页与固定扩展图标操作；浏览器版本待实机记录。'},
          {text:'先打开 Zotero 桌面程序，再打开 Connector 的扩展选项/设置，查看 General 中的 Zotero Status。Save to Zotero.org 区的选项只影响桌面程序关闭、保存到云端时的附件选项。桌面保存的自动关联 PDF 设置需在 Zotero 自身设置中检查。先保持桌面运行，再用一篇有权限的论文试存。',link:[docs+'connector_preferences','核对 Connector 状态与设置']},
          {text:'在论文详情页使用保存按钮，再回到 Zotero 检查目标分类和附件；第 2 章已有“保存到分类、标签与附件检查”的图文示范。',link:['#chapter/2','继续看网页保存示范']}
        ],expected:'Connector 状态可识别本机 Zotero，保存试验条目出现在预期分类中。',errors:['状态不可用：确认桌面 Zotero 已启动，刷新网页与状态；仍失败按官方保存排障逐项检查。','只出现网页图标：先进入论文详情页，确认数据库支持；可用 DOI 或数据库导出的 RIS/BibTeX 回退导入。','有条目没有 PDF：先核对全文权限与保存提示。桌面保存时检查 Zotero 设置 General → File Handling 下的 Automatically attach associated PDFs and other files when saving items；不要仅修改 Connector 的云端保存选项。']}
    ],
    2:[
      {id:'zt-metadata',title:'图文整理：核对题录，再检查 PDF 附件',purpose:'得到能用于正式引用的父条目，并确认读到的是对应论文的全文版本。',source:docs+'adding_items_to_zotero',
        steps:[
          {text:'选择父条目，在右侧逐项对照出版社页面或论文首页：条目类型、题名、作者、年份、期刊/会议、卷期页码、DOI/URL。作者要按作者字段逐人核对；不要把预印本和正式发表版本混成一个题录。'},
          {text:'展开父条目，双击其 PDF 子附件。核对首页题名、作者和版本，再记录“PDF 页序/印刷页码”的区别。已有合法 PDF 时，将文件拖到正确父条目上成为子附件；不要拖到空白列表后误留成独立 PDF。',image:'pdfParent',caption:'识别后的父条目与缩进 PDF：这是中文社区的层级示例。'},
          {text:'普通拖入会把文件复制为“存储的附件”，由 Zotero 管理；“链接的附件”只指向外部文件，不随 Zotero 文件同步上传。初学者可先保留存储附件；保留原文件到核对完成，再决定如何整理，避免把唯一文件误删。',link:[community+'add-attachments','核对存储附件与链接附件的区别']}
        ],expected:'每篇文献有正确父条目和对应 PDF；矩阵记录的版本与实际阅读版本一致。',errors:['只有独立 PDF：先识别或创建父条目，再核对元数据；见下一节 PDF 导入。','PDF 不能获取：通过学校/出版商许可入口查找可用全文，或补开放版本并注明版本；不要绕过权限或猜补内容。','期刊文献被识别为网页，引用出现不合适的 [EB/OL]：先在信息面板改正条目类型及字段，再回 Word 刷新。','引用显示不完整：先修正 Zotero 元数据，再在 Word Refresh；直接改自动书目可能被刷新覆盖。']},
      {id:'zt-reference-import',title:'抓取失败时：用 DOI 或引用文件导入',purpose:'网页保存失败也能补入真实题录；先用一篇试验，再处理一小批。',source:docs+'adding_items_to_zotero',
        steps:[
          {text:'已知 DOI、ISBN、PMID 或 arXiv ID 时，点击工具栏“通过标识符添加条目”（魔杖图标），粘贴核实过的标识符并回车。导入后核对题名、作者与年份；部分中文来源可能无法识别，改用下面的引用文件方法。',link:[community+'add-items#通过标识符添加条目','查看中文标识符导入说明']},
          {text:'在数据库的论文详情页点击“导出”或“引用”，选择 RIS、BibTeX 等 Zotero 支持的格式并保存文件。回到 Zotero，选择“文件 → 导入”，选择该文件并按向导完成；如果复制的是完整的引用数据，可用“文件 → 从剪贴板导入”。不要把普通参考文献文本当作 RIS/BibTeX 数据。',image:'importFile',caption:'引用文件导入向导：选择文件来源，再继续。',link:[community+'add-items#由通用格式的引用信息导入-通用方法','查看引用文件导入图解']},
          {text:'打开导入后的条目，检查条目类型、作者顺序、年份、DOI 和目标分类。引用文件通常只提供题录，附件需另外检查；已有合法 PDF 时拖到对应父条目上。最后与原库核对重复项，再继续下一批。'}
        ],expected:'试验条目出现在目标分类，元数据与来源相符；是否包含 PDF 已单独确认。',errors:['DOI 无法识别：核对标识符本身，再尝试真实来源网页或引用文件，不猜造 DOI。','导入后缺摘要、作者多出导师或类型有误：对照论文首页和来源页修正，再用于引用。','只有参考文献排版文本：回数据库重新导出结构化文件，或手动创建条目。']},
      {id:'zt-organize',title:'图文整理：分类、子分类、标签与智能分类',purpose:'把主题、阅读状态和证据核验状态分开管理，方便后续选取一批材料。',source:docs+'collections_and_tags',
        steps:[
          {text:'在左侧“我的文库”上右键，新建一个选题分类。再在该分类上右键选择 New Subcollection（新建子分类），建立“待筛选、纳入、排除”等子分类。选中已有条目拖到目标分类，分类关系不会复制一份文献。'},
          {text:'选中文献，在右侧 Tags/标签页点击 Add，输入“待读”“已提取”或“待核查”等状态标签并回车。同一篇可以有多个主题标签；批量整理时先确认选中的条目范围，再把所选条目拖到左侧已有标签上统一加标。'},
          {text:'在 Zotero 10 点击快速搜索栏的筛选按钮打开高级搜索；其他版本可从高级搜索入口进入。设置如“标签 / 是 / 待核查”的条件，先搜索确认结果，再点 Save Search（保存搜索）并命名“待核查材料”。这是随条件自动更新的保存搜索，不是复制条目到普通分类。',image:'search',caption:'Zotero 10 高级搜索：先配置条件，再搜索并保存。图中是作者和批注颜色示例；本练习应改为自己的标签条件。',pins:[[13,22,'字段与条件'],[7,51,'先搜索验证结果'],[34,51,'Save Search 保存条件']]}
        ],expected:'能按分类、主题标签和待核查保存搜索分别定位同一条文献，且文献总条数不会因多分类而增加。',errors:['父分类看不到子分类条目：检查“显示子分类中的条目”视图选项，或直接进入对应子分类。','智能分类为空：先检查标签拼写、所选文库和 all/any 条件组合；保存的是条件而非当时结果。','误以为删分类等于删条目：两种菜单作用不同，执行前读完整命令；练习优先用移出分类，不做批量删除。']},
      {id:'zt-pdf-import',title:'PDF 导入、识别元数据与去重',purpose:'把已有 PDF 整理为真实可引用的条目，并在合并前识别误匹配。',source:docs+'retrieve_pdf_metadata',
        steps:[
          {text:'先在试验分类拖入少量 PDF。Zotero 默认尝试获取元数据并建立父条目；完成后核对题名和 DOI。扫描件或缺少可识别信息的文件可能只留下独立附件，不能据文件名直接认定文献身份。',image:'pdfParent',caption:'自动识别成功后，PDF 成为父条目下的子附件；该图只展示结果层级。'},
          {text:'独立 PDF 识别未完成时，可右键尝试“检索元数据”；此命令只对尚无父条目的 PDF 提供。识别结果仍需逐项核对，中文论文不能只凭文件名确认身份。'},
          {text:'识别失败时，在独立 PDF 上右键选择 Create Parent Item（创建父条目）。已有父条目时，不要重复创建；可先核对现有记录。',image:'parentMenu',caption:'独立 PDF 的右键菜单中选择“创建父条目”。'},
          {text:'在弹窗中输入已核实的 DOI/ISBN 等标识符；没有标识符时选择 Manual Entry（手动录入），按真实来源填写题录。也可从论文网页保存题录，再把 PDF 拖到该父条目下。',image:'parentDialog',caption:'标识符输入框与“手动录入”入口；不根据示例文件名猜造题录。',link:[docs+'adding_items_to_zotero','识别失败的官方回退步骤']},
          {text:'在左侧 Duplicate Items（重复条目）选择一组候选，先对照 DOI、作者、年份及版本；确认是同一文献后，在右侧选择保留的主记录及字段，再点 Merge Items。不同预印本/出版版本是否合并需逐项判断。',image:'duplicates',caption:'中文示例：先选主记录及字段，再合并；原图橙框由社区文档作者提供。'}
        ],expected:'PDF 有经核对的父条目；确认的重复项被合并，标签、分类与引用关联保留。',errors:['错配题录：使用 Undo Retrieve Metadata（撤销获取元数据）回退后重新创建父条目，不直接把错误结果填入矩阵。','批量导入过多难核查：先小批验证字段与附件，再继续；数据库大批记录优先导出 RIS/BibTeX 后导入。','误报重复：跳过该组，保留不同论文；不要为清空重复列表强行合并。']},
      {id:'zt-backup',title:'图文维护：完整备份文献库',purpose:'保留可恢复的本地数据库和附件副本，避免把导出或同步误当成完整备份。',source:docs+'zotero_data#backing_up_your_zotero_data',
        steps:[
          {text:'打开 Zotero 设置的 Advanced → Files and Folders（高级 → 文件和文件夹），点击 Show Data Directory（显示数据文件夹）。记下实际位置；不要把 Linked Attachment Base Directory（链接附件根目录）误认为整个数据库目录。',link:[community+'backup','查看数据目录与备份说明']},
          {text:'退出 Zotero 后，复制整个数据目录（包括 zotero.sqlite、storage 和其他子目录）到带日期的备份位置，优先放另一存储设备。链接附件在数据目录之外的，还要单独备份；按需下载且尚未落地的附件不在本地备份中。检查备份大小和关键文件是否存在，不在唯一原库上演练恢复。',pending:'干净演示库的完整目录备份与校验截图；不得公开个人库路径、账户或未授权文献。'}
        ],expected:'拥有注明日期的完整副本，知道哪些附件不在本地备份中。',errors:['只导出 BibTeX/RIS：这是文献交换材料，不能完整保留数据库状态及现有 Word 引用关联。','程序运行时直接复制数据库：先退出程序再复制；不要在运行时移动或替换数据库。','把数据目录放进普通网盘同步目录：可能损坏数据库，使用 Zotero 自身同步或关闭程序后的完整备份。']},
      {id:'zt-sync',title:'图文维护：分别验证数据同步与附件同步',purpose:'确认两台设备不仅能看到题录，也能打开所需 PDF；同步仍需配合独立备份。',source:docs+'sync',
        steps:[
          {text:'进入设置的 Sync（同步）面板，在自己的设备上关联 Zotero 账户。分别检查 Data Syncing（题录、笔记等）与 File Syncing（附件文件）；个人库按实际使用选择 Zotero Storage 或 WebDAV，群组附件使用 Zotero Storage。',image:'sync',caption:'中文设置示例：先关联自己的 Zotero 账户。此图未展示文件同步设置。'},
          {text:'使用少量试验条目，在一台电脑手动同步并查看具体错误，再在另一台电脑同步，验证题录、笔记和 PDF 实际可打开。仅看见题名不能证明附件已上传；WebDAV 应先验证服务器，自动同步冲突须人工核对。'},
          {text:'有红色错误图标时先阅读错误消息，区分账号、数据同步、存储空间或附件网络问题。保留已有库与备份，不把 Reset/重置当作通用排障按钮。',link:[docs+'sync#file_syncing','数据与文件同步的官方区别']}
        ],expected:'另一设备上能查到试验条目、阅读笔记并打开对应 PDF，异常有具体记录。',errors:['题录有而 PDF 无：检查文件同步、下载模式、存储额度或 WebDAV 连接，不反复导入相同论文。','链接附件未同步：链接文件不走 Zotero 附件同步，需要另行管理路径与备份。','多设备冲突：先核对两份改动再选择版本，避免同时批量编辑同一组条目。']}
    ],
    3:[
      {id:'zt-reader',title:'图文阅读：划词批注、注释与笔记',purpose:'把阅读时的高亮转成带出处的笔记，而不只保留颜色。',source:docs+'pdf_reader',
        steps:[
          {text:'双击正确父条目下的 PDF 附件。在原文中选中一段可核验的内容，使用弹出的颜色菜单高亮；也可先启用高亮工具后连续划词。'},
          {text:'点击批注写入自己的注释，说明“研究问题/方法/结果/局限”和证据为何相关。正文没有说的内容另标为个人解释，不混进原文引语。记录 PDF 页序、印刷页码或章节，数值同时记下条件与单位。'},
          {text:'按本章已有图示，在父条目上右键“从批注添加笔记”，或在阅读器右侧笔记面板新建条目笔记。检查笔记里的批注位置链接是否能回到原页，再整理为 P001/E01 等证据记录。复制给 WorkBuddy 时另保留纯文字编号和位置。'},
          {text:'需要分享带批注 PDF 时，回到文库视图使用“文件 → 导出 PDF”，或在阅读器使用“文件 → 另存为”，并核对输出是否包含批注；直接复制 storage 中的原始 PDF，未必带有 Zotero 内置批注。导出的文件另存为副本，保留文库中的原附件。',link:[docs+'kb/annotations_in_database','核对 PDF 与批注导出方式']}
        ],expected:'生成的笔记包含原文片段、出处、自己的注释和回到 PDF 的位置链接。',errors:['扫描 PDF 无法划词：先确认是否有文字层，需要时另行 OCR，并对识别文字逐段核对。','只有高亮没有来源：从批注生成笔记后检查引用与位置，手工复制时不要丢掉文献编号。','选错 PDF 版本：先记录当前固定版本，再重新定位页码；工具段落号不能替代 PDF 页码。']}
    ],
    6:[
      {id:'zt-word-style',title:'Word 操作补充：切换格式与核对书目',purpose:'在已有真实引用的文档副本中调整样式，并保持引文与参考文献可更新。',source:docs+'word_processor_plugin_usage',
        steps:[
          {text:'先按本章已有截图插入一条真实引用。保存可编辑文档副本，进入 Word 的 Zotero 选项卡，点击 Document Preferences（文档首选项），选择学校或期刊要求的引用样式和语言。',image:'word',caption:'中文文档首选项：选择样式，按需管理样式，核对后确定。图中样式是来源示例。',pins:[[94,27,'参考文献样式列表'],[16,52,'管理样式'],[76,91,'确认所选样式']]},
          {text:'把光标放到文后书目位置，点击 Add/Edit Bibliography 生成书目。题录有误先在 Zotero 修正，回 Word 点击 Refresh，再对照实际引用的条目逐项检查作者、年份、题名、来源和 DOI。不要手工改写自动生成的书目来代替修正元数据。'},
          {text:'回到每处 [P001] 等临时编号，确认其对应真实条目后用 Add/Edit Citation 替换；直接引语或指定页码通过引用编辑器填写。完成后搜索残留临时编号，并核对每条引用是否确实支持相邻论断。'}
        ],expected:'同一文档能按选定样式更新正文引用和文后书目，且不残留练习用的临时编号。',errors:['Word 没有 Zotero 选项卡：按本章排障步骤检查桌面 Word、Zotero 设置中的文字处理软件插件和重装入口。','样式改变后结果不对：先确认选中样式、语言及条目元数据，再刷新，不靠手动逐条改格式。','准备解除链接：仅在确有提交要求时对另存副本操作；保留含有效 Zotero 字段的可编辑原稿。']}
    ]
  };

  function figure(step,{esc}) {
    if (!step.image) return '';
    const meta=typeof step.image === 'string' ? images[step.image] : step.image;
    const path='assets/operations/'+meta.file;
    const source=meta.local
      ? `本机截图 · ${esc(meta.environment || 'Windows / Zotero 10.0.6（64-bit）')} · ${esc(meta.captured || '2026-10-29')}<br>${esc(meta.note)} 编号为网页叠加标注；界面像素未重绘。${esc(meta.scope || '仅核对界面与安装入口，未执行插件安装或软件全流程实测。')} · <a href="${path}" target="_blank" rel="noopener noreferrer">查看截图</a>`
      : meta.community
        ? `<a href="${meta.source}" target="_blank" rel="noopener noreferrer">Zotero 中文社区及其贡献者</a> · <a href="${path}" target="_blank" rel="noopener noreferrer">查看完整原图</a><br>${esc(meta.note)} 来源未注明截图具体版本；界面随版本与系统变化。原图按 <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> 署名复用，原有标注保留，网页编号另行叠加。资料核对：2026-10-29；未完成本机全流程实测。`
        : `<a href="${meta.source}" target="_blank" rel="noopener noreferrer">Zotero 官方来源</a> · <a href="${path}" target="_blank" rel="noopener noreferrer">查看完整原图</a><br>${esc(meta.note || '官方文档保留截图，原页未标明截图版本；当前菜单外观可能不同。文档图片按 CC BY-SA 4.0 署名复用。')} 编号为本页叠加标注，原图文件未改。文档核对：${esc(meta.checked || '2026-10-28')}；未完成本机全流程实测。`;
    return `<figure><div class="tutorial-shot${step.zoom ? ' tutorial-shot-zoom' : ''}"><a href="${path}" target="_blank" rel="noopener noreferrer" aria-label="打开截图：${esc(step.caption)}"><img src="${path}" alt="${esc(step.caption)}" loading="lazy"></a>${(step.pins||[]).map(([left,top,label],i)=>`<span class="tutorial-pin" style="left:${left}%;top:${top}%" aria-hidden="true">${i+1}</span>`).join('')}</div>${step.pins?.length ? `<ol class="tutorial-key">${step.pins.map(pin=>`<li>${esc(pin[2])}</li>`).join('')}</ol>` : ''}<figcaption>${esc(step.caption)}<br>${source}</figcaption></figure>`;
  }

  function chapter(id,{esc}) {
    return (groups[id]||[]).map(group=>`<section class="worked-example operation-guide zotero-walkthrough" aria-labelledby="${group.id}"><h2 id="${group.id}">${esc(group.title)}</h2><p><b>操作目的：</b>${esc(group.purpose)}</p><ol class="practice-steps">${group.steps.map(step=>`<li><p>${esc(step.text)}${step.link ? ` <a href="${esc(step.link[0])}"${step.link[0].startsWith('https:')?' target="_blank" rel="noopener noreferrer"':''}>${esc(step.link[1])}</a>` : ''}</p>${figure(step,{esc})}${step.pending ? `<p class="screenshot-pending"><b>待补实机截图：</b>${esc(step.pending)}</p>` : ''}</li>`).join('')}</ol><p class="operation-result"><b>预期结果：</b>${esc(group.expected)}</p><details class="operation-trouble"><summary>常见错误与处理</summary><ul class="practice-steps">${group.errors.map(error=>`<li>${esc(error)}</li>`).join('')}</ul></details><p class="case-scope"><a href="${group.source}" target="_blank" rel="noopener noreferrer">核对本节官方操作说明</a> · <a href="${community}${communityPages[group.id]}" target="_blank" rel="noopener noreferrer">中文社区分步指南</a> · <a href="https://github.com/zotero/zotero-docs" target="_blank" rel="noopener noreferrer">文档来源与许可</a></p></section>`).join('');
  }
  window.GUIDE_ZOTERO_GUIDES = {chapter,figure};
})();
