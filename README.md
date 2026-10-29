# 研读手册 · Zotero + AI 实操指南

从文献收集、证据提取到主题比较、综述写作和引用核查的中文入门网站。

- 在线阅读：https://blacklarry.github.io/zotero-ai-review-guide/
- GitHub 仓库：https://github.com/blacklarry/zotero-ai-review-guide
- Gitee 国内仓库：https://gitee.com/larry_17/zotero-ai-review-guide
- 反馈与纠错：https://github.com/blacklarry/zotero-ai-review-guide/issues
- 案例原核验日期：2026-10-14；新增操作与插件资料核对：2026-10-28（文档核对，非软件实测）。
- 中文用户指南补充：2026-10-29，对照 Zotero 中文社区核对导入、附件、批注与引用步骤；补入 10 张社区原图及 1 张 Zotero 10 高级搜索发布图，版本未注明的逐图标注，未作软件全流程实测。
- WorkBuddy 本机图文记录：2026-10-29，5.9.3 连接器配置、首次信任及 5/5 工具发现；独立 MCP 分类读取通过，模型会话内调用未验证。

## 内容

六章学习路径、18 组 AI 提示词（选题检索、精读提取、主题综合、写作核查）、两篇真实论文的完整案例、五条证据的 15 字段填写样例、Connector、批注笔记与 Word 操作截图，以及 Word 插件排障。

新增 [浙江师范大学 LaTeX 论文模板](https://github.com/blacklarry/zjnu-latex-paper-template)入口：资源页和第 5 章均可前往公开模板仓库、查看编译说明。模板面向课程论文、研究报告等场景，为非官方 XeLaTeX 模板，提交格式以学院或教师要求为准。

新增 [WorkBuddy 接入专题](https://blacklarry.github.io/zotero-ai-review-guide/#workbuddy)：通用 Zotero MCP 配置、中文检索技能、安装包下载、可复制的自助安装指令、首次信任授权与排障。公开下载文件位于 `docs/downloads/workbuddy-zotero/`，只包含配置、技能和说明；未包含本机路径、用户文献或凭据。

新增 [Codex 接入专题](https://blacklarry.github.io/zotero-ai-review-guide/#codex)：TOML 与 CLI 配置、可选中文技能、自助安装指令，以及本机/远程运行边界和实际工具验证。专用公开包位于 `docs/downloads/codex-zotero/`。

新增 [搭建科研知识库专题](https://blacklarry.github.io/zotero-ai-review-guide/#knowledge)：基于 learning-of-zjnu 的目录、模板和证据链约定，整理 Obsidian 建库、MOC 与维护方法。`docs/downloads/knowledge-base/` 提供通用起步包和文字教程，不包含原知识库的私人笔记、插件配置、数据或凭据。

网站默认先展示“选择接入”页：可进入 WorkBuddy 或 Codex 接入教程，也可进入 Zotero 插件指南，或选择“跳过，直接阅读教程”。品牌与面包屑统一返回教程概览，侧栏可返回选择页；已有章节、提示词和接入教程的深链接仍可直接访问，不记录接入选择。

全站屏幕界面采用白底、浅灰绿导航与深绿操作按钮，使用 `docs/theme.css` 管理配色、排版和组件样式，`docs/desktop.css` 统一桌面的标题层级、控件、卡片与截图对齐。学习路径采用可点击条目，六步流程图可展开查看；正文使用开放的阅读布局。路由切换、菜单、搜索与卡片反馈使用短动画；系统开启“减少动态效果”时关闭动画，打印继续使用独立样式。

页面上的模拟 AI 错误用于演示人工核查，不是一次真实模型测试。论文内容与位置已对照原文核验，软件步骤参考 Zotero 中文社区用户指南，并按 Zotero 官方文档交叉核对，未声称完成本机 Zotero / Word 全流程实测。

教程补充：在原有六章中增加 Zotero 安装、Connector、题录/PDF、分类标签/保存搜索、导入去重、阅读笔记、Word 样式、备份与同步的逐步说明，配有明确来源的真实界面图和网页编号；过时且无可靠替代的官方旧图已撤下，安装向导、浏览器商店和备份操作未录图的位置仍如实标待补。`#zotero-plugins` 区分浏览器 Connector 与桌面 XPI，列出四个插件的已核验发布和包内兼容声明。WorkBuddy 专题补工作空间、手工资料包和小批量分析，第 3–5 章补矩阵到教学短综述的闭环；原 18 条提示词保留。2026-10-29 增补 DOI / RIS / BibTeX 实际导入入口、独立 PDF 的元数据重试、创建父条目与手动录入、存储附件与链接附件、带批注 PDF 导出，并修正截图与步骤的对应关系。

## 发布与维护

网站是 HTML、CSS 和 JavaScript 静态文件，位于 `docs/`。GitHub Pages 配置为从 `main` 分支的 `/docs` 发布；修改并推送该目录后会自动更新网站。`.nojekyll` 使 GitHub 直接发布静态文件。

GitHub 与 Gitee 并列保留项目源码；国内仓库地址不是网站托管地址，在线阅读仍使用上面的 GitHub Pages 链接。本地远程名 `origin` 对应 GitHub，`gitee` 对应国内仓库，更新后分别推送 `main` 分支即可同步。

本地预览（Python 3）：

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory docs
```

打开 http://127.0.0.1:4173/ 。章节进度只保存在当前浏览器；模板下载由浏览器生成，WorkBuddy 安装包由静态文件提供，网站没有后端服务。

支持打印当前页面：打印时展开证据详情和排障步骤，结束后恢复阅读状态。首页包含静态课程简介、Course 结构化数据与分享预览图；未接入第三方访问统计。网页底部的“反馈问题”可打开 GitHub Issues，纠错表单仅在本地生成报告。

## 来源与归属

论文案例保留原始来源链接、固定版本和证据位置；引用只用于教学所需的短摘录。

界面截图包含本机操作记录、Zotero 中文社区及其贡献者的公开指南、Zotero 官方文档与发布说明中的示例，各图附有来源、版本或日期与验证范围。中文社区原图保留作者已有标注，按 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 署名复用，参见 [中文用户指南](https://zotero-chinese.com/user-guide/)。Zotero 文档材料按 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 复用；博客截图的版权归原权利人，不把整站声明为同一开放许可。详见 [Zotero 文档源库](https://github.com/zotero/zotero-docs) 和网站“适用版本、核验记录与纠错”部分。

本网站为独立中文教程，非 Zotero 官方出品。
