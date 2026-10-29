window.GUIDE_STUDY = {
  "id": "transfer-learning",
  "title": "完整案例：预训练特征什么时候值得迁移？",
  "question": "在图像分类任务中，迁移方式与目标任务怎样影响预训练的收益？",
  "verifiedAt": "2026-10-14",
  "scope": "两篇真实论文的叙述性阅读案例，用于练习证据整理；不是系统综述，也不是论文实验复现。",
  "verification": "编写时核对官方论文详情页、作者稿版本与原始 PDF，并将关键页渲染为图片核查位置。已核验表示内容和位置已对照原文，不表示重跑了实验。样例中的人工核查状态是填写示范，读者须按自己实际完成的动作更新。",
  "workflow": [
    "保存两篇论文的真实条目，核对题名、作者、年份及来源；将下面指定版本的 PDF 放在对应父条目下。",
    "打开指定页，只高亮所需短句；在批注评论中写下条件、证据编号和自己的解释。",
    "从批注生成条目笔记，保留文献编号与位置；用下方笔记成品核对自己的记录。",
    "把笔记映射到 15 列矩阵。同一论文有不同结果时保留相同文献编号，另建证据行。",
    "按主题比较已经核验的证据，检查模拟 AI 错误，再形成附有证据编号的综述段落。"
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
      "definition": "达到怎样的分类表现与花多少训练步骤达到该表现，是两类不同的问题。"
    }
  ],
  "papers": [
    {
      "id": "P001",
      "title": "How transferable are features in deep neural networks?",
      "authors": "Jason Yosinski, Jeff Clune, Yoshua Bengio, Hod Lipson",
      "year": 2014,
      "venue": "Advances in Neural Information Processing Systems 27",
      "pages": "3320–3328（会议书目信息；本例证据位置使用独立 PDF 的页码）",
      "url": "https://proceedings.neurips.cc/paper_files/paper/2014/hash/532a2f85b6977104bc93f8580abbb330-Abstract.html",
      "pdfUrl": "https://proceedings.neurips.cc/paper_files/paper/2014/file/532a2f85b6977104bc93f8580abbb330-Paper.pdf",
      "doi": "10.48550/arXiv.1411.1792",
      "doiNote": "这是 arXiv 预印本标识符；本例位置对应上面的 NIPS 官方 PDF。",
      "metadataUrl": "https://arxiv.org/abs/1411.1792",
      "location": "官方 PDF 第 6 页，§4.1 第 4 条；相关曲线见第 5 页 Figure 2。",
      "excerpt": "Layers one and two transfer almost perfectly from A to B",
      "annotation": "E01｜这句话的条件是本研究的随机 ImageNet 类别划分，复制层保持冻结；不能扩展为任何层都可无损迁移。",
      "note": "P001｜问题：层次与迁移方式怎样影响表现？｜E01：随机类别划分中，前两层冻结特征较好迁移。｜E02：同任务 BnB 对照中，微调可恢复冻结复制层造成的性能下降。｜位置：官方 PDF 第 6 页 §4.1 第 4 条和第 3 条；Figure 2 在第 5 页。｜局限：见矩阵中明确标注的教学分析。",
      "boundary": "教学分析：本例证据来自一种八层 CNN 与 ImageNet 子任务；不能直接外推至全部架构或视觉任务。"
    },
    {
      "id": "P002",
      "title": "Do Better ImageNet Models Transfer Better?",
      "authors": "Simon Kornblith, Jonathon Shlens, Quoc V. Le",
      "year": 2019,
      "venue": "Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
      "pages": "2661–2671（CVF 论文详情页书目信息；本例证据位置使用作者稿 PDF 页序）",
      "url": "https://openaccess.thecvf.com/content_CVPR_2019/html/Kornblith_Do_Better_ImageNet_Models_Transfer_Better_CVPR_2019_paper.html",
      "pdfUrl": "https://arxiv.org/pdf/1805.08974v3",
      "doi": "10.48550/arXiv.1805.08974",
      "doiNote": "这是 arXiv 预印本标识符；请固定使用 v3 作者稿核对下列 PDF 页序。",
      "metadataUrl": "https://arxiv.org/abs/1805.08974v3",
      "version": "arXiv:1805.08974v3，2019-06-17",
      "location": "v3 作者稿 PDF 第 3 页，§4.1 第一段；另见第 6 页 §4.5 和第 7 页 §4.6 / Figure 8。",
      "excerpt": "ImageNet top-1 accuracy was highly correlated with accuracy on transfer tasks",
      "annotation": "E03｜这里指统一预训练设置下，固定特征加逻辑回归的比较。整体相关性不保证每个数据集或任意公开模型都按同样顺序表现。",
      "note": "P002｜问题：更好的 ImageNet 模型能否更好迁移？｜E03：统一设置下，固定特征分类表现与 ImageNet 表现相关。｜E04：Stanford Cars 与 FGVC Aircraft 上，预训练对最终表现增益较小。｜E05：预训练仍可加快收敛。｜位置：v3 PDF 第 3 页 §4.1、第 6 页 §4.5、第 7 页 §4.6 / Figure 8。",
      "boundary": "教学分析：这是分类实验；不能从所测数据集直接推断全部视觉任务的收益。"
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
      "教学分析：仅此架构与 ImageNet 子任务，不能扩大到所有层或任务。",
      "层次；冻结特征；任务条件",
      "纳入：直接回答迁移层次问题",
      "已核验：对照 PDF 第6页第4条及第5页图2，确认冻结条件与层次；未复现实验。 核验日期：2026-10-14。"
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
      "教学分析：这是同任务对照，不能写成微调解决全部跨任务差异。",
      "微调；协同适应；对照实验",
      "纳入：解释迁移方式与性能差异",
      "已核验：对照 PDF 第6页第2–3条及图2，确认 BnB 是同任务对照；未复现实验。 核验日期：2026-10-14。"
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
      "作者说明：公开模型训练设置的差异会影响这一关系（§4.1 第二段）。",
      "固定特征；训练设置；相关性",
      "纳入：比较模型表现与迁移表现的关系",
      "已核验：对照 v3 PDF 第3页 §4.1 和第4页图2，确认固定特征及统一设置；未复现实验。 核验日期：2026-10-14。"
    ],
    [
      "P002",
      "Kornblith 等，2019",
      "Do Better ImageNet Models Transfer Better?",
      "https://arxiv.org/pdf/1805.08974v3",
      "预训练是否总能明显提高最终分类表现？",
      "Stanford Cars 与 FGVC Aircraft",
      "比较 ImageNet 初始化后微调与随机初始化训练",
      "最终分类表现；本例不直接比较两个数据集的指标数值",
      "E04｜在这两个细粒度数据集上，预训练对最终表现的增益较小。",
      "the improvement was unexpectedly small",
      "v3 作者稿 PDF 第6页，§4.5 第一段；Figures 6–7",
      "教学分析：两种任务的有限增益不能写成所有细粒度任务都无收益。",
      "细粒度分类；目标任务；适用边界",
      "纳入：提供整体趋势的具体条件限制",
      "已核验：对照 v3 PDF 第6页 §4.5 和图6–7，核对所指数据集与比较条件；未复现实验。 核验日期：2026-10-14。"
    ],
    [
      "P002",
      "Kornblith 等，2019",
      "Do Better ImageNet Models Transfer Better?",
      "https://arxiv.org/pdf/1805.08974v3",
      "最终表现接近时，预训练还有何作用？",
      "Figure 8 中的 Inception v4 分类实验",
      "比较预训练微调与随机初始化的训练曲线",
      "达到指定表现所需的训练步数或轮数；与最终准确率区分",
      "E05｜即使最终表现接近，预训练仍可加快达到该表现的收敛过程。",
      "Networks pretrained on ImageNet converge faster",
      "v3 作者稿 PDF 第7页，§4.6；Figure 8 图注",
      "教学分析：这里是所测模型的收敛结果，不能保证全部模型或实际硬件上的耗时。",
      "收敛速度；训练效率；指标区分",
      "纳入：区分最终表现收益与训练过程收益",
      "已核验：对照 v3 PDF 第7页 §4.6 及图8图注，确认收敛条件；未复现实验。 核验日期：2026-10-14。"
    ]
  ],
  "matrixHelp": [
    {
      "field": "证据位置",
      "example": "P002 E04：v3 作者稿 PDF 第6页，§4.5 第一段；Figures 6–7。",
      "instruction": "同时写版本、PDF页序和章节/图表号。只写“第6页”可能指向另一版本的内容。"
    },
    {
      "field": "人工核查状态",
      "example": "已核验：对照指定版本的 PDF 页、章节及图注，确认条件；未复现实验。",
      "instruction": "写下实际完成的动作。还没回到原文时填“待核查”，不要因 AI 生成了出处就填“已核验”。"
    },
    {
      "field": "局限与偏倚",
      "example": "教学分析：所测分类任务不能直接代表全部视觉任务。",
      "instruction": "区分作者明确指出的限制与自己的分析。找不到时写“所给材料未提及，待阅读全文”。"
    },
    {
      "field": "一篇论文多个结果",
      "example": "P002 的 E03、E04、E05 保留同一文献编号，分别占三行。",
      "instruction": "按证据拆行，避免把不同实验、指标与条件压在一个单元格。"
    }
  ],
  "themes": [
    {
      "title": "迁移方式与实验条件",
      "evidence": "P001 E01–E02；P002 E03",
      "comparison": "P001 在同一架构中比较层次与冻结/微调；P002 比较统一设置下的不同架构。两者比较单位不同，不宜直接给模型或策略排总榜。",
      "boundary": "综合解释：先记录迁移方式和训练设置，再比较结果。"
    },
    {
      "title": "最终表现与训练效率",
      "evidence": "P002 E04–E05",
      "comparison": "两个细粒度数据集的最终增益较小，与预训练加快收敛可以同时成立，衡量的是不同收益。",
      "boundary": "只支持本例所测任务；不能改写为预训练完全无用。"
    },
    {
      "title": "有条件的结论",
      "evidence": "P001 E01；P002 E03–E04",
      "comparison": "前两层的迁移表现与多数据集整体相关性，都要附带条件；具体任务的有限增益提醒我们保留反面或限制性证据。",
      "boundary": "当前两篇论文不构成完整领域检索，不足以断言多数研究或整个领域。"
    }
  ],
  "aiCorrection": {
    "label": "教学模拟：以下错误由教程编写，用于演示核查；不是某次真实 AI 测试记录。",
    "wrong": "P002 已证明预训练在细粒度任务上没有用：它既不提高最终表现，也不能缩短训练。",
    "check": "先把句子拆成“最终表现”与“训练效率”两项主张。打开 v3 PDF 第6页 §4.5，确认原文只点名两个数据集且写的是有限增益；再打开第7页 §4.6 和 Figure 8，发现收敛优势被遗漏。",
    "corrected": "在本研究的 Stanford Cars 与 FGVC Aircraft 实验中，预训练对最终表现的增益较小；但预训练仍可加快收敛，不能据此推断它在全部细粒度任务上没有价值 [P002：E04–E05]。",
    "action": "把 E04 与 E05 分成两行，补回各自位置与条件；先标为待核查，实际对照原文后写明已核验的动作。"
  },
  "paragraph": "图像分类中的迁移收益需要结合迁移方式与目标任务判断。Yosinski 等（2014）在随机 ImageNet 子任务上观察到，前两层冻结特征较好迁移，而微调可以恢复同任务对照中冻结复制层后的性能下降 [P001：E01–E02]。Kornblith 等（2019）发现，统一训练设置下，ImageNet 表现与固定特征分类的迁移表现相关 [P002：E03]。但在 Stanford Cars 与 FGVC Aircraft 上，预训练对最终表现的增益较小，它仍可加快收敛 [P002：E04–E05]。因此，比较预训练策略时应分别记录最终表现与训练效率；这一综合判断限于本例讨论的分类实验，不能据此推断全部视觉任务。",
  "sentenceEvidence": [
    {
      "claim": "迁移收益需要结合迁移方式与目标任务判断。",
      "evidence": "P001 E01–E02；P002 E03–E05",
      "boundary": "本教程的综合判断；不是原文直接引语。"
    },
    {
      "claim": "前两层冻结特征较好迁移，微调恢复同任务对照中的下降。",
      "evidence": "P001 E01–E02",
      "boundary": "随机 ImageNet 子任务；微调恢复的描述对应同任务 BnB 对照。"
    },
    {
      "claim": "ImageNet 表现与固定特征分类的迁移表现相关。",
      "evidence": "P002 E03",
      "boundary": "统一训练设置；相关性不能改写为因果或每个任务的保证。"
    },
    {
      "claim": "两个细粒度任务最终增益较小，预训练仍可加快收敛。",
      "evidence": "P002 E04–E05",
      "boundary": "分别对应最终表现与训练过程，不能合并成“没有收益”。"
    },
    {
      "claim": "比较策略时分别记录最终表现与训练效率。",
      "evidence": "由 P002 E04–E05 形成的比较建议",
      "boundary": "这是阅读者的分析建议，不是论文新增实验结论。"
    }
  ],
  "referenceUse": "段落中的 [P001：E01] 等是教程证据编号，提交论文前需在 Word 中用真实 Zotero 条目插入正式引用。证据编号保留在工作笔记中。",
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
    "note": "只保留教学所需短摘录；重复展示使用同一摘录，不再扩展原文。公开可访问不等同于允许自由重发全文。"
  }
};
window.GUIDE_OPERATIONS = {
  "verificationDate": "2026-10-14",
  "verificationMethod": "对照 Zotero 官方文档与官方发布说明核验；图片为官方现有截图的原文件下载。未执行本机 Zotero、Connector 或 Word 端到端操作实测。",
  "localApplicationTested": false,
  "groups": [
    {
      "chapter": 2,
      "title": "跟着截图：用 Connector 保存文献",
      "steps": [
        "安装 Zotero 桌面程序与对应浏览器的 Connector，并打开桌面 Zotero。",
        "进入论文的出版商详情页或摘要页，找到浏览器工具栏中的 Connector。图中红圈标出的是论文图标；点击它保存条目。",
        "在保存提示中选择目标分类；有权限取得的 PDF 通常会一并保存。检索结果页出现文件夹图标时，先勾选所需文献再确认。",
        "返回 Zotero，检查题名、作者、年份、DOI 和附件；网页元数据仍可能出错，保存成功不等于信息已核实。"
      ],
      "images": [
        {
          "path": "assets/operations/connector-save.png",
          "originalUrl": "https://www.zotero.org/support/_media/connector_firefox.png",
          "sourcePage": "https://www.zotero.org/support/adding_items_to_zotero",
          "alt": "Zotero 官方 Firefox 工具栏截图，红圈标出 Connector 的论文保存图标",
          "caption": "先看图标再保存：论文详情页会显示论文图标。红圈由官方原图提供。来源：Zotero 官方文档。",
          "versionNote": "官方保留的 Firefox 界面示例，具体截图版本未标明；Chrome、Edge、Safari 的位置和外观可能不同。",
          "width": 774,
          "height": 52,
          "licenseScope": "official-documentation",
          "modified": false
        },
        {
          "path": "assets/operations/connector-select-items.png",
          "originalUrl": "https://www.zotero.org/support/_media/zotero-item-selector.png",
          "sourcePage": "https://www.zotero.org/support/adding_items_to_zotero",
          "alt": "Zotero 官方多条目选择窗口，含文献复选框及 OK 按钮",
          "caption": "结果列表批量保存：勾选要保存的条目，然后确认。来源：Zotero 官方文档。",
          "versionNote": "官方保留的旧 Windows 外观截图，仅演示勾选条目的动作；当前浏览器弹窗样式可能不同。",
          "width": 354,
          "height": 226,
          "licenseScope": "official-documentation",
          "modified": false
        }
      ],
      "expected": "分类中出现有作者、年份等信息的文献条目；能获取全文时，PDF 作为条目附件保存。"
    },
    {
      "chapter": 3,
      "title": "跟着截图：把批注生成一条笔记",
      "steps": [
        "在 Zotero 内置阅读器打开 PDF，选中关键原文做高亮，并在批注中写清这是结果、方法还是局限。",
        "回到文献列表，右键文献的父条目，选择 Add Note from Annotations（从批注添加笔记）。图中蓝色选中行即是该命令。",
        "打开生成的子笔记，检查引文及页码；点击批注并使用 Show on Page（在页面中显示）回到原文核查。",
        "在阅读器中也可打开右侧笔记面板，点加号并选择 Add Item Note from Annotations；只需要部分批注时，可选中批注后 Add to Note 或拖入已打开的笔记。"
      ],
      "images": [
        {
          "path": "assets/operations/annotations-to-note.png",
          "originalUrl": "https://www.zotero.org/static/images/blog/6.0/add-note-from-annotations.png",
          "sourcePage": "https://www.zotero.org/support/pdf_reader",
          "alt": "Zotero 官方右键菜单截图，Add Note from Annotations 命令被选中",
          "caption": "对父条目点右键，再选 Add Note from Annotations。来源：Zotero 官方 PDF Reader 文档。",
          "versionNote": "原图来自 Zotero 6.0（2022）界面；2026-10-14 官方 PDF Reader 文档仍说明此命令。当前版本菜单外观可能不同。",
          "width": 620,
          "height": 600,
          "licenseScope": "official-documentation-linked-blog-image",
          "modified": false
        }
      ],
      "expected": "父条目下生成批注笔记，批注包含回到 PDF 页面的位置链接及来源引文，便于填写证据矩阵。"
    },
    {
      "chapter": 6,
      "title": "跟着截图：在 Word 中插入引用",
      "steps": [
        "打开 Zotero 桌面程序与 Word 桌面版，把光标放在需要引用的位置，在 Word 的 Zotero 选项卡点击 Add/Edit Citation。",
        "首次引用时按文档要求选择引用样式；在引用对话框输入题名、作者或年份。Zotero 8–10 使用统一对话框，可在右下角切换 List 与 Library。",
        "选中结果后按 Enter/Return，或双击条目/点击条目旁的加号，将其加入顶部引用区域；若需页码，在搜索输入框键入页码并确认。再按 Enter/Return 或确认按钮完成插入。",
        "用 Add/Edit Bibliography 插入参考文献表；Zotero 中改好元数据后回到 Word 点击 Refresh，检查引文与文后条目一起更新。"
      ],
      "images": [
        {
          "path": "assets/operations/word-zotero-toolbar.png",
          "originalUrl": "https://www.zotero.org/support/_media/word_integration_tab.png",
          "sourcePage": "https://www.zotero.org/support/word_processor_plugin_usage",
          "alt": "Word 中 Zotero 选项卡，含 Add/Edit Citation、Bibliography 和 Refresh 按钮",
          "caption": "入口在 Word 的 Zotero 选项卡：插入引用用 Add/Edit Citation，更新用 Refresh。来源：Zotero 官方文档。",
          "versionNote": "官方保留的旧 Word 工具栏截图；新版本可能另有 Add Note、Add Annotation 等按钮，本文所示核心命令仍适用。",
          "width": 300,
          "height": 200,
          "licenseScope": "official-documentation",
          "modified": false
        },
        {
          "path": "assets/operations/word-citation-list-v8.png",
          "originalUrl": "https://www.zotero.org/static/images/blog/8.0/citation-dialog-list.png",
          "sourcePage": "https://www.zotero.org/blog/zotero-8/",
          "alt": "Zotero 8 统一引用对话框的 List 模式，顶部搜索框与右下角 List 和 Library 切换按钮",
          "caption": "Zotero 8 起采用统一引用对话框：在 List 模式搜索题名、作者或年份；右下角可切换 Library。来源：Zotero 8 官方发布说明。",
          "versionNote": "官方 Zotero 8 截图（2026）；Zotero 9、10 沿用统一引用对话框，部分功能及外观可能不同。",
          "width": 1824,
          "height": 1224,
          "licenseScope": "official-blog-image-no-separate-license-found",
          "modified": false
        },
        {
          "path": "assets/operations/word-page-number-before.png",
          "originalUrl": "https://www.zotero.org/static/images/support/kb/citation-dialog-page-number-pre.png",
          "sourcePage": "https://www.zotero.org/support/kb/classic_citation_dialog",
          "alt": "统一引用对话框中已选中文献，输入框内键入页码 47",
          "caption": "页码第 1 步：选好文献，在输入框键入 47。来源：Zotero 官方知识库。",
          "versionNote": "2026 官方知识库的统一引用对话框示例，适用于 Zotero 8 起的新对话框。",
          "width": 916,
          "height": 196,
          "licenseScope": "official-documentation",
          "modified": false
        },
        {
          "path": "assets/operations/word-page-number-after.png",
          "originalUrl": "https://www.zotero.org/static/images/support/kb/citation-dialog-page-number-post.png",
          "sourcePage": "https://www.zotero.org/support/kb/classic_citation_dialog",
          "alt": "确认页码后引用条目气泡显示 Fitzgerald, 2004, p. 47",
          "caption": "页码第 2 步：确认后引用气泡显示 p. 47，再完成插入。来源：Zotero 官方知识库。",
          "versionNote": "2026 官方知识库的统一引用对话框示例，适用于 Zotero 8 起的新对话框。",
          "width": 934,
          "height": 196,
          "licenseScope": "official-documentation",
          "modified": false
        }
      ],
      "expected": "Word 正文出现可由 Zotero 更新的引用，文后参考文献表由插件生成；修改元数据后 Refresh 可更新。",
      "trouble": {
        "title": "Word 没有 Zotero 选项卡：按这个顺序排查",
        "steps": [
          "关闭 Word。在 Zotero 设置的 Cite（引用）中找到 Word Processors/Word Processor Plugins，点 Install/Reinstall Microsoft Word Add-in，然后重启 Word。",
          "仍未出现：在 Windows Word 的 文件 → 选项 → 加载项 中查找 Zotero.dotm。若在非活动加载项中，管理选择 Word 加载项并勾选它；若在禁用项目中，管理选择禁用项目并启用它。",
          "Mac Word：打开 工具 → 模板和加载项，检查 Zotero.dotm 是否存在且已勾选。",
          "安装完成仍无选项卡：按官方手动安装说明定位当前 Word Startup 文件夹并复制 Zotero.dotm；随后再看官方按操作系统区分的排障步骤。",
          "单位电脑的策略可能限制 Word 模板或界面扩展，联系 IT 排查。排障后用新空白文档插入一条引用验证。"
        ],
        "url": "https://www.zotero.org/support/word_processor_plugin_troubleshooting",
        "manualInstallationUrl": "https://www.zotero.org/support/word_processor_plugin_manual_installation",
        "images": [
          {
            "path": "assets/operations/word-plugin-settings.png",
            "originalUrl": "https://www.zotero.org/support/_media/preferences_cite_processors.png",
            "sourcePage": "https://www.zotero.org/support/preferences/cite",
            "alt": "旧版 Zotero Cite 设置中的 Word Processors 标签和 Reinstall Microsoft Word Add-in 按钮",
            "caption": "找不到 Zotero 选项卡时，先到 Zotero 的 Cite 设置重新安装 Word 插件。来源：Zotero 官方文档。",
            "versionNote": "官方 Cite 页保留的 2017 旧 macOS 设置图；当前设置布局不同，应按 Cite 中的 Word Processors/Word Processor Plugins 区域查找安装按钮。图中的 Use classic Add Citation dialog 已不适用于 Zotero 8–10。",
            "width": 797,
            "height": 813,
            "licenseScope": "official-documentation",
            "modified": false
          }
        ]
      }
    }
  ],
  "compatibility": [
    "核验基准：2026-10-14 官方文档及发布记录；当前稳定版记录为 Zotero 10.0.6（2026-10-07 发布），没有进行本机 Zotero/Word 全流程实测。",
    "本教程涉及的内置 PDF 批注与批注转笔记功能从 Zotero 6 起具备；Zotero 8–10 的引用对话框为 List/Library 统一界面，旧版红条与 classic 对话框已被替换。",
    "当前 Zotero 官方系统要求：Windows 10+、macOS 10.15+，或满足 Firefox 140 库要求的 Linux。",
    "官方 Word 插件支持范围：Windows Word 2010–2024 或 Office 365（不含 Word 2010 Starter）；Mac Word 2016–2024 或 Office 365。本教程的 Word 路径针对桌面版。",
    "Connector 当前支持 Chrome/Edge 稳定版或扩展稳定版、Firefox 115+；Safari 18+ 要求 macOS 13+，macOS 11/12 使用功能较少的旧 Connector。",
    "截图来自官方保留配图，部分为旧版；每张图已注明界面年代。点击来源页可核对最新说明，不能将文档核验或下载官方截图称为本机实测。"
  ],
  "licenseNote": "截图来自 Zotero 官方文档与发布说明，图片原文件未修改，每图附有来源与界面版本。文档材料归属 Zotero，按 CC BY-SA 4.0 复用；博客截图保留原权利人的版权。",
  "licenseSources": [
    {
      "url": "https://github.com/zotero/zotero-docs",
      "label": "Zotero 官方文档源库许可说明"
    },
    {
      "url": "https://github.com/zotero/zotero-docs/blob/main/LICENSE-CONTENT",
      "label": "文档内容 CC BY-SA 4.0 许可"
    },
    {
      "url": "https://creativecommons.org/licenses/by-sa/4.0/",
      "label": "CC BY-SA 4.0"
    }
  ],
  "versionSources": [
    {
      "url": "https://www.zotero.org/support/changelog",
      "label": "当前 Zotero 版本与发布日期"
    },
    {
      "url": "https://www.zotero.org/support/system_requirements",
      "label": "Zotero / Connector / Word 支持范围"
    },
    {
      "url": "https://www.zotero.org/support/pdf_reader",
      "label": "批注生成笔记与原文回跳"
    },
    {
      "url": "https://www.zotero.org/support/adding_items_to_zotero",
      "label": "Connector 保存文献"
    },
    {
      "url": "https://www.zotero.org/support/word_processor_plugin_usage",
      "label": "Word 插件命令与刷新"
    },
    {
      "url": "https://www.zotero.org/support/kb/classic_citation_dialog",
      "label": "Zotero 8 起的统一引用对话框"
    },
    {
      "url": "https://www.zotero.org/blog/zotero-8/",
      "label": "Zotero 8 官方界面发布说明"
    },
    {
      "url": "https://www.zotero.org/support/word_processor_plugin_troubleshooting",
      "label": "Word 选项卡缺失排障"
    },
    {
      "url": "https://github.com/zotero/zotero-docs",
      "label": "Zotero 官方文档源库许可说明"
    },
    {
      "url": "https://github.com/zotero/zotero-docs/blob/main/LICENSE-CONTENT",
      "label": "文档内容 CC BY-SA 4.0 许可"
    },
    {
      "url": "https://creativecommons.org/licenses/by-sa/4.0/",
      "label": "CC BY-SA 4.0"
    }
  ]
};
