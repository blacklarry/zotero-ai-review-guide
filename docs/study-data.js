window.GUIDE_STUDY = {
  "id": "transfer-learning",
  "title": "完整案例：预训练特征什么时候值得迁移？",
  "question": "在图像分类任务中，迁移方式与目标任务怎样影响预训练的收益？",
  "verifiedAt": "2026-10-14",
  "scope": "以两篇经典迁移学习论文为例，完整演示从原文批注、结构化笔记到证据矩阵和综述段落的写作流程。",
  "verification": "案例中的原文摘录与页码均已对照指定 PDF 版本核对，你可以直接跟着练手，并按同样格式记录自己的论文。",
  "workflow": [
    "在 Zotero 保存两篇论文的条目并核对题录，把下方指定版本的 PDF 挂载到父条目下。",
    "翻到指定页码高亮关键短句，在批注中补充实验条件、证据编号和个人理解。",
    "右键父条目从批注生成笔记，保留文献编号与位置，并与下方成品对照。",
    "按“一条证据占一行”整理进 15 列矩阵，同一篇论文的多个结果共用文献编号、另起证据行。",
    "跨文献归纳主题、体验一次回原文纠错，最后写出每句话都有出处的综述段落。"
  ],
  "terms": [
    {
      "term": "冻结特征",
      "definition": "在目标任务训练时不更新已复制层的参数。"
    },
    {
      "term": "微调",
      "definition": "在目标任务训练时继续更新已复制层的参数。"
    },
    {
      "term": "最终表现与收敛速度",
      "definition": "最终能达到多高的分类准确率，与需要多少步训练收敛，是两类不同的收益。"
    }
  ],
  "papers": [
    {
      "id": "P001",
      "title": "How transferable are features in deep neural networks?",
      "authors": "Jason Yosinski, Jeff Clune, Yoshua Bengio, Hod Lipson",
      "year": 2014,
      "venue": "Advances in Neural Information Processing Systems 27",
      "pages": "3320–3328（下述位置使用独立 PDF 页码）",
      "url": "https://proceedings.neurips.cc/paper_files/paper/2014/hash/532a2f85b6977104bc93f8580abbb330-Abstract.html",
      "pdfUrl": "https://proceedings.neurips.cc/paper_files/paper/2014/file/532a2f85b6977104bc93f8580abbb330-Paper.pdf",
      "doi": "10.48550/arXiv.1411.1792",
      "doiNote": "arXiv 预印本标识符；文中定位对应上方 NIPS 官方 PDF。",
      "metadataUrl": "https://arxiv.org/abs/1411.1792",
      "location": "官方 PDF 第 6 页，§4.1 第 4 条；相关曲线见第 5 页 Figure 2。",
      "excerpt": "Layers one and two transfer almost perfectly from A to B",
      "annotation": "E01｜前提是随机 ImageNet 类别划分且复制层保持冻结；高层特征迁移时会出现明显下降，不能推成所有层都无损迁移。",
      "note": "P001｜问题：层次与迁移方式怎样影响表现？｜E01：随机类别划分中，前两层冻结特征较好迁移。｜E02：同任务 BnB 对照中，微调可恢复冻结复制层造成的性能下降。｜位置：官方 PDF 第 6 页 §4.1 第 4 条和第 3 条；Figure 2 在第 5 页。｜局限：基于八层 CNN 与 ImageNet 子任务。",
      "boundary": "仅基于八层 CNN 与 ImageNet 类别子任务，不能直接外推至所有架构或视觉任务。"
    },
    {
      "id": "P002",
      "title": "Do Better ImageNet Models Transfer Better?",
      "authors": "Simon Kornblith, Jonathon Shlens, Quoc V. Le",
      "year": 2019,
      "venue": "Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
      "pages": "2661–2671（下述位置使用 v3 作者稿 PDF 页序）",
      "url": "https://openaccess.thecvf.com/content_CVPR_2019/html/Kornblith_Do_Better_ImageNet_Models_Transfer_Better_CVPR_2019_paper.html",
      "pdfUrl": "https://arxiv.org/pdf/1805.08974v3",
      "doi": "10.48550/arXiv.1805.08974",
      "doiNote": "arXiv 预印本标识符；核对页码请固定使用 v3 作者稿。",
      "metadataUrl": "https://arxiv.org/abs/1805.08974v3",
      "version": "arXiv:1805.08974v3，2019-06-17",
      "location": "v3 作者稿 PDF 第 3 页，§4.1 第一段；另见第 6 页 §4.5 和第 7 页 §4.6 / Figure 8。",
      "excerpt": "ImageNet top-1 accuracy was highly correlated with accuracy on transfer tasks",
      "annotation": "E03｜前提是统一预训练设置下，用固定特征加逻辑回归比较；整体相关不意味着每个数据集或所有公开权重都严格按同一顺序排列。",
      "note": "P002｜问题：更好的 ImageNet 模型能否更好迁移？｜E03：统一设置下，固定特征分类表现与 ImageNet 表现高度相关。｜E04：Stanford Cars 与 FGVC Aircraft 上，预训练对最终准确率增益较小。｜E05：预训练仍能明显加快收敛。｜位置：v3 PDF 第 3 页 §4.1、第 6 页 §4.5、第 7 页 §4.6 / Figure 8。",
      "boundary": "聚焦图像分类实验，不同细粒度数据集的收益差异较大，不宜直接推及所有视觉任务。"
    }
  ],
  "matrixColumns": [
    "文献编号",
    "作者与年份",
    "题名",
    "DOI或来源URL",
    "研究问题",
    "研究对象与样本",
    "研究设计与方法",
    "指标与条件",
    "主要发现",
    "证据原文片段",
    "页码或章节或表号",
    "局限与偏倚",
    "主题标签",
    "纳入或排除及原因",
    "人工核查状态"
  ],
  "matrixRows": [
    [
      "P001",
      "Yosinski 等，2014",
      "How transferable are features in deep neural networks?",
      "https://proceedings.neurips.cc/paper_files/paper/2014/file/532a2f85b6977104bc93f8580abbb330-Paper.pdf",
      "不同层次的特征能否迁移？",
      "ImageNet 随机、不重叠的类别子任务",
      "将源网络前若干层复制并冻结，训练目标任务上层",
      "top-1 准确率；随机 A/B 类别划分",
      "E01｜前两层冻结特征在这组任务间较好迁移。",
      "Layers one and two transfer almost perfectly from A to B",
      "官方 PDF 第6页，§4.1 第4条；Figure 2 在第5页",
      "仅覆盖该八层 CNN 架构与 ImageNet 子任务，不能外推至所有层或任务。",
      "层次；冻结特征；任务条件",
      "纳入：直接回答迁移层次问题",
      "已核验：对照 PDF 第6页第4条及第5页图2，确认冻结条件与层次（2026-10-14）。"
    ],
    [
      "P001",
      "Yosinski 等，2014",
      "How transferable are features in deep neural networks?",
      "https://proceedings.neurips.cc/paper_files/paper/2014/file/532a2f85b6977104bc93f8580abbb330-Paper.pdf",
      "冻结后的下降是否只因任务改变？",
      "ImageNet 同任务 BnB 对照",
      "比较冻结复制层的 BnB 与允许所有层学习的 BnB+",
      "top-1 准确率；同任务对照，区别冻结与微调",
      "E02｜微调可恢复冻结复制层后的性能下降，提示层间协同适应的影响。",
      "fine-tuning thus prevents the performance drop observed in the BnB networks.",
      "官方 PDF 第6页，§4.1 第3条；Figure 2 在第5页",
      "该对照属于同任务设置，不宜直接推演为微调能消除所有跨任务差异。",
      "微调；协同适应；对照实验",
      "纳入：解释迁移方式与性能差异",
      "已核验：对照 PDF 第6页第2–3条及图2，确认 BnB 为同任务对照（2026-10-14）。"
    ],
    [
      "P002",
      "Kornblith 等，2019",
      "Do Better ImageNet Models Transfer Better?",
      "https://arxiv.org/pdf/1805.08974v3",
      "ImageNet 表现能否预测固定特征的迁移表现？",
      "16 种网络，12 个图像分类数据集",
      "统一预训练设置；固定倒数第二层特征加逻辑回归",
      "ImageNet top-1 与跨数据集迁移指标；按论文 §3 处理比较",
      "E03｜统一设置下，ImageNet 表现与固定特征分类的迁移表现相关。",
      "ImageNet top-1 accuracy was highly correlated with accuracy on transfer tasks",
      "v3 作者稿 PDF 第3页，§4.1 第一段；Figure 2 在第4页",
      "作者指出，公开模型训练设置的差异会影响这一相关性（§4.1 第二段）。",
      "固定特征；训练设置；相关性",
      "纳入：比较模型表现与迁移表现的关系",
      "已核验：对照 v3 PDF 第3页 §4.1 和第4页图2，确认固定特征与统一设置（2026-10-14）。"
    ],
    [
      "P002",
      "Kornblith 等，2019",
      "Do Better ImageNet Models Transfer Better?",
      "https://arxiv.org/pdf/1805.08974v3",
      "预训练是否总能明显提高最终分类表现？",
      "Stanford Cars 与 FGVC Aircraft",
      "比较 ImageNet 初始化后微调与随机初始化训练",
      "最终分类表现；各数据集独立比较",
      "E04｜在这两个细粒度数据集上，预训练对最终表现的增益较小。",
      "the improvement was unexpectedly small",
      "v3 作者稿 PDF 第6页，§4.5 第一段；Figures 6–7",
      "基于两个细粒度分类数据集，不能推广为所有细粒度任务均无收益。",
      "细粒度分类；目标任务；适用边界",
      "纳入：提供整体趋势的具体条件限制",
      "已核验：对照 v3 PDF 第6页 §4.5 和图6–7，确认数据集与比较条件（2026-10-14）。"
    ],
    [
      "P002",
      "Kornblith 等，2019",
      "Do Better ImageNet Models Transfer Better?",
      "https://arxiv.org/pdf/1805.08974v3",
      "最终表现接近时，预训练还有何作用？",
      "Figure 8 中的 Inception v4 分类实验",
      "比较预训练微调与随机初始化的训练曲线",
      "达到指定表现所需的训练步数；与最终准确率区分",
      "E05｜即使最终表现接近，预训练仍可加快达到该表现的收敛过程。",
      "Networks pretrained on ImageNet converge faster",
      "v3 作者稿 PDF 第7页，§4.6；Figure 8 图注",
      "基于所测模型的训练步数曲线，不同架构与硬件下的实际耗时需另行评估。",
      "收敛速度；训练效率；指标区分",
      "纳入：区分最终表现收益与训练过程收益",
      "已核验：对照 v3 PDF 第7页 §4.6 及图8图注，确认收敛条件（2026-10-14）。"
    ]
  ],
  "matrixHelp": [
    {
      "field": "证据位置",
      "example": "P002 E04：v3 作者稿 PDF 第6页，§4.5 第一段；Figures 6–7。",
      "instruction": "同时写明版本、PDF 页序和章节/图表号，避免不同版本页码错位。"
    },
    {
      "field": "人工核查状态",
      "example": "已核验：对照 v3 PDF 第6页 §4.5 及图6–7，确认数据集与条件。",
      "instruction": "如实记录核对进度。还没回原文确认时先填“待核查”，核对完再改“已核验”。"
    },
    {
      "field": "局限与偏倚",
      "example": "基于两个细粒度分类数据集，不能推广为所有细粒度任务均无收益。",
      "instruction": "分开写“作者自述的局限”和“自己评估的适用边界”；原文没提就写“材料未提及”。"
    },
    {
      "field": "一篇论文多个结果",
      "example": "P002 的 E03、E04、E05 共用文献编号，分别占三行。",
      "instruction": "一条证据占一行，避免把不同实验条件、指标与结果挤在同一个单元格里。"
    }
  ],
  "themes": [
    {
      "title": "迁移方式与实验条件",
      "evidence": "P001 E01–E02；P002 E03",
      "comparison": "P001 在同一架构内比较层次与冻结/微调；P002 在统一设置下比较不同架构。两者比较维度不同，不宜直接按单一指标排总榜。",
      "boundary": "跨论文比较前，先对齐迁移方式和训练设置。"
    },
    {
      "title": "最终表现与训练效率",
      "evidence": "P002 E04–E05",
      "comparison": "两个细粒度数据集上最终增益较小，但预训练依然加快了收敛——两者衡量的是不同维度的收益，并不矛盾。",
      "boundary": "结论基于所测分类数据集，不宜简化成“预训练无用”。"
    },
    {
      "title": "结论的适用边界",
      "evidence": "P001 E01；P002 E03–E04",
      "comparison": "无论是前两层的平滑迁移还是多数据集整体相关性，都依赖特定设置；具体任务上的有限增益提醒我们在综述中保留反例与前提条件。",
      "boundary": "示例仅含两篇文献，写正式综述时还需围绕主题扩大检索。"
    }
  ],
  "aiCorrection": {
    "label": "核查示范：模拟一种典型的 AI 误读场景，演示如何回到原文纠错。",
    "wrong": "P002 已证明预训练在细粒度任务上没有用：它既不提高最终表现，也不能缩短训练。",
    "check": "把句子拆成“最终表现”和“训练效率”两项主张。打开 v3 PDF 第6页 §4.5，原文只针对两个数据集且表述为“增益较小”；再看第7页 §4.6 和 Figure 8，原文明确指出预训练加快了收敛。",
    "corrected": "在 Stanford Cars 与 FGVC Aircraft 实验中，预训练对最终表现的增益较小，但仍可加快收敛，不能据此推断它在所有细粒度任务上都没有价值 [P002：E04–E05]。",
    "action": "把 E04 与 E05 拆成两行，补齐位置和条件；核对原文后再把状态改为“已核验”。"
  },
  "paragraph": "图像分类中的迁移收益需要结合迁移方式与目标任务判断。Yosinski 等（2014）在随机 ImageNet 子任务上观察到，前两层冻结特征较好迁移，而微调可以恢复同任务对照中冻结复制层后的性能下降 [P001：E01–E02]。Kornblith 等（2019）发现，统一训练设置下，ImageNet 表现与固定特征分类的迁移表现相关 [P002：E03]。但在 Stanford Cars 与 FGVC Aircraft 上，预训练对最终表现的增益较小，不过仍可加快收敛 [P002：E04–E05]。因此，评估预训练策略时应将最终表现与训练效率分开考察，并结合具体任务与模型条件来解释结果。",
  "sentenceEvidence": [
    {
      "claim": "迁移收益需要结合迁移方式与目标任务判断。",
      "evidence": "P001 E01–E02；P002 E03–E05",
      "boundary": "段落中心句（综合判断）。"
    },
    {
      "claim": "前两层冻结特征较好迁移，微调恢复同任务对照中的下降。",
      "evidence": "P001 E01–E02",
      "boundary": "随机 ImageNet 子任务与同任务 BnB 对照。"
    },
    {
      "claim": "ImageNet 表现与固定特征分类的迁移表现相关。",
      "evidence": "P002 E03",
      "boundary": "统一训练设置下的相关性，不直接等同于因果。"
    },
    {
      "claim": "两个细粒度任务最终增益较小，但预训练仍可加快收敛。",
      "evidence": "P002 E04–E05",
      "boundary": "区分最终表现与训练收敛两项指标。"
    },
    {
      "claim": "评估策略时应分别考察最终表现与训练效率。",
      "evidence": "综合 P002 E04–E05 得出的写作启示",
      "boundary": "作者的综合评述。"
    }
  ],
  "referenceUse": "段落里的 [P001：E01] 是写作阶段用来追踪证据的临时编号，定稿前在 Word 中用 Zotero 插件替换为正式引用，证据编号留在笔记里备查即可。",
  "quoteAudit": {
    "P001": {
      "uniqueWordsQuoted": 22,
      "excerpts": [
        "Layers one and two transfer almost perfectly from A to B",
        "fine-tuning thus prevents the performance drop observed in the BnB networks."
      ]
    },
    "P002": {
      "uniqueWordsQuoted": 22,
      "excerpts": [
        "ImageNet top-1 accuracy was highly correlated with accuracy on transfer tasks",
        "the improvement was unexpectedly small",
        "Networks pretrained on ImageNet converge faster"
      ]
    },
    "note": "仅摘录教学所需的短句，完整正文请通过原论文链接阅读。"
  }
};
window.GUIDE_OPERATIONS = {
  "verificationDate": "2026-10-29",
  "verificationMethod": "结合 Zotero 官方文档、Zotero 中文社区用户指南与实机界面整理。",
  "localApplicationTested": false,
  "groups": [
    {
      "chapter": 2,
      "title": "跟着截图：用 Connector 保存文献",
      "steps": [
        "启动 Zotero 桌面程序，并确保浏览器已安装 Zotero Connector。",
        "打开论文的出版商详情页或摘要页，点击浏览器工具栏中的 Connector 图标（单篇论文通常显示纸张图标）。",
        "在弹出的保存框里选好目标分类、按需补上标签后点“完成”；有权限获取的 PDF 会一并存下来。如果是在检索结果页点击文件夹图标，可先勾选需要的论文再批量保存。",
        "回到 Zotero，快速检查题名、作者、年份、DOI 和 PDF 附件是否准确。"
      ],
      "images": [
        {
          "path": "assets/operations/community-connector-save.png",
          "originalUrl": "https://zotero-chinese.com/assets/%E4%BB%8E%E6%B5%8F%E8%A7%88%E5%99%A8%E6%B7%BB%E5%8A%A0%E6%9D%A1%E7%9B%AE-%E5%AF%B9%E8%AF%9D%E6%A1%86.D7DUdzJX.png",
          "sourcePage": "https://zotero-chinese.com/user-guide/add-items",
          "sourceLabel": "Zotero 中文社区",
          "alt": "Connector 中文保存提示，包含保存到分类、标签输入框及已抓取条目和 PDF 附件列表",
          "caption": "在“保存到”选择目标分类，按需填写标签；下方实时显示保存的条目与 PDF 附件。",
          "versionNote": "",
          "width": 710,
          "height": 824,
          "licenseScope": "chinese-community-documentation-cc-by-sa-4.0",
          "modified": false
        }
      ],
      "expected": "目标分类中出现完整的文献条目；可访问全文时，PDF 会自动挂在父条目下方。"
    },
    {
      "chapter": 3,
      "title": "跟着截图：把批注生成一条笔记",
      "steps": [
        "在 Zotero 内置阅读器打开 PDF，高亮关键原文并在批注中写明属于结果、方法还是局限。",
        "回到文献列表，右键父条目，选择“从注释中添加笔记”（Add Note from Annotations，位于蓝色“添加笔记”的下一行）。",
        "打开生成的子笔记，核对引文和页码；点击任意一条批注的 Show on Page（在页面中显示），即可一键跳回原文核对。",
        "在阅读器里也可以直接点右侧笔记面板的加号选择 Add Item Note from Annotations；只需要汇总部分批注时，选中批注右键 Add to Note 或直接拖进笔记即可。"
      ],
      "images": [
        {
          "path": "assets/operations/community-annotations-menu.png",
          "originalUrl": "https://zotero-chinese.com/assets/%E6%B7%BB%E5%8A%A0%E7%AC%94%E8%AE%B0%E8%8F%9C%E5%8D%95.oSwpAzYe.png",
          "sourcePage": "https://zotero-chinese.com/user-guide/take-notes",
          "sourceLabel": "Zotero 中文社区",
          "alt": "Zotero 中文条目右键菜单，“从注释中添加笔记”位于蓝色高亮的“添加笔记”下一行",
          "caption": "右键父条目选择“从注释中添加笔记”即可一键汇总批注（不同版本也可能译作“从批注添加笔记”）。",
          "versionNote": "",
          "width": 421,
          "height": 829,
          "licenseScope": "chinese-community-documentation-cc-by-sa-4.0",
          "modified": false
        }
      ],
      "expected": "父条目下生成结构化批注笔记，附带原文引文和一键回跳 PDF 原页的链接。"
    },
    {
      "chapter": 6,
      "title": "跟着截图：在 Word 中插入引用",
      "steps": [
        "同时打开 Zotero 和桌面版 Word，把光标放在引用处，在 Word 顶部 Zotero 选项卡点击 Add/Edit Citation。",
        "首次引用会弹出样式选择框，按学校或期刊要求选好格式；然后在搜索框输入题名、作者或年份（Zotero 8–10 使用统一引用对话框，右下角可切换 List 和 Library 视图）。",
        "选中对应论文回车加入引用区；如需标注页码，直接键入页码确认即可。全部选完再按回车完成插入。",
        "文末点击 Add/Edit Bibliography 自动生成参考文献表；如果在 Zotero 里修正了题录，回到 Word 点 Refresh 即可同步刷新。"
      ],
      "images": [
        {
          "path": "assets/operations/community-word-toolbar.png",
          "originalUrl": "https://zotero-chinese.com/assets/word-zotero%E7%AA%97%E6%A0%BC.CCT-CRnr.png",
          "sourcePage": "https://zotero-chinese.com/user-guide/ms-word-plugin",
          "sourceLabel": "Zotero 中文社区",
          "alt": "Mac Word 的 Zotero 选项卡，含 Add/Edit Citation、Add/Edit Bibliography、Document Preferences、Refresh 和 Unlink Citations",
          "caption": "Word 中的 Zotero 选项卡（Mac 界面示例，Windows 按钮排列略有差异）：分别对应插入引文、生成书目、切换样式与刷新。",
          "versionNote": "",
          "width": 1022,
          "height": 298,
          "licenseScope": "chinese-community-documentation-cc-by-sa-4.0",
          "modified": false
        },
        {
          "path": "assets/operations/word-citation-list-v8.png",
          "originalUrl": "https://www.zotero.org/static/images/blog/8.0/citation-dialog-list.png",
          "sourcePage": "https://www.zotero.org/blog/zotero-8/",
          "sourceLabel": "Zotero 官方发布说明",
          "alt": "Zotero 8 统一引用对话框的 List 模式，顶部搜索框与右下角 List 和 Library 切换按钮",
          "caption": "Zotero 8–10 统一引用对话框：搜索题名、作者或年份，右下角可切换 List / Library 视图。",
          "versionNote": "",
          "width": 1824,
          "height": 1224,
          "licenseScope": "official-blog-image-no-separate-license-found",
          "modified": false
        },
        {
          "path": "assets/operations/word-page-number-before.png",
          "originalUrl": "https://www.zotero.org/static/images/support/kb/citation-dialog-page-number-pre.png",
          "sourcePage": "https://www.zotero.org/support/kb/classic_citation_dialog",
          "sourceLabel": "Zotero 官方知识库",
          "alt": "统一引用对话框中已选中文献，输入框内键入页码 47",
          "caption": "添加页码第 1 步：选中文献后，在输入框直接键入页码 47。",
          "versionNote": "",
          "width": 916,
          "height": 196,
          "licenseScope": "official-documentation",
          "modified": false
        },
        {
          "path": "assets/operations/word-page-number-after.png",
          "originalUrl": "https://www.zotero.org/static/images/support/kb/citation-dialog-page-number-post.png",
          "sourcePage": "https://www.zotero.org/support/kb/classic_citation_dialog",
          "sourceLabel": "Zotero 官方知识库",
          "alt": "确认页码后引用条目气泡显示 Fitzgerald, 2004, p. 47",
          "caption": "添加页码第 2 步：确认后气泡显示 p. 47，按回车即可插入。",
          "versionNote": "",
          "width": 934,
          "height": 196,
          "licenseScope": "official-documentation",
          "modified": false
        }
      ],
      "expected": "Word 正文出现动态引文，文末自动生成参考文献表，修改题录后点 Refresh 可一键更新。",
      "trouble": {
        "title": "Word 没有 Zotero 选项卡？按这几步排查",
        "steps": [
          "先关闭 Word。在 Zotero“设置 → 引用 → 文字处理软件”中点击“安装/重新安装 Microsoft Word 加载项”，完成后重启 Word。",
          "Windows Word 仍未显示：进入“文件 → 选项 → 加载项”，在“Word 加载项”或“禁用项目”里找到 Zotero.dotm 并勾选启用。",
          "Mac Word 仍未显示：进入“工具 → 模板和加载项”，确认 Zotero.dotm 存在且已勾选。",
          "还是不行时，按官方手动安装文档把 Zotero.dotm 复制到 Word 的 Startup 目录；若是单位受控电脑，可能是组策略屏蔽了模板加载，需联系管理员。"
        ],
        "url": "https://www.zotero.org/support/word_processor_plugin_troubleshooting",
        "manualInstallationUrl": "https://www.zotero.org/support/word_processor_plugin_manual_installation",
        "images": []
      }
    }
  ],
  "compatibility": [
    "Zotero 桌面端：内置 PDF 批注与批注转笔记支持 Zotero 6 及以上；Zotero 8–10 采用统一的 List / Library 引用对话框。系统要求 Windows 10+、macOS 10.15+ 或主流 Linux。",
    "Word 引文插件：支持桌面版 Windows Word 2010–2024 / Microsoft 365，以及 Mac Word 2016–2024 / Microsoft 365。",
    "浏览器 Connector：支持 Chrome、Edge、Firefox 115+ 及 Safari 18+（macOS 13+）。"
  ],
  "licenseNote": "操作截图分别来自实机录制、Zotero 中文社区（CC BY-SA 4.0 署名复用）与 Zotero 官方文档 / 发布说明，每张图均已注明来源与原图链接。",
  "licenseSources": [
    {
      "url": "https://zotero-chinese.com/user-guide/",
      "label": "Zotero 中文社区用户指南"
    },
    {
      "url": "https://github.com/zotero/zotero-docs",
      "label": "Zotero 官方文档源库"
    },
    {
      "url": "https://creativecommons.org/licenses/by-sa/4.0/",
      "label": "CC BY-SA 4.0 许可协议"
    }
  ],
  "versionSources": [
    {
      "url": "https://zotero-chinese.com/user-guide/",
      "label": "Zotero 中文社区用户指南"
    },
    {
      "url": "https://www.zotero.org/support/changelog",
      "label": "Zotero 更新日志"
    },
    {
      "url": "https://www.zotero.org/support/system_requirements",
      "label": "系统与软件兼容要求"
    },
    {
      "url": "https://www.zotero.org/support/pdf_reader",
      "label": "PDF 批注与笔记文档"
    },
    {
      "url": "https://www.zotero.org/support/adding_items_to_zotero",
      "label": "添加文献官方文档"
    },
    {
      "url": "https://www.zotero.org/support/word_processor_plugin_usage",
      "label": "Word 插件使用说明"
    },
    {
      "url": "https://www.zotero.org/support/kb/classic_citation_dialog",
      "label": "统一引用对话框说明"
    },
    {
      "url": "https://www.zotero.org/support/word_processor_plugin_troubleshooting",
      "label": "Word 插件排障指南"
    },
    {
      "url": "https://creativecommons.org/licenses/by-sa/4.0/",
      "label": "CC BY-SA 4.0"
    }
  ]
};
