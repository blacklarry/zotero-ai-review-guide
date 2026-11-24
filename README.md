# 研读手册 · Zotero + AI 实操指南

用 Zotero 管好文献，用 AI 串联研究线索。从文献收集、精读批注到证据矩阵、综述写作与引用核查的中文实操教程。

- 在线阅读：https://blacklarry.github.io/zotero-ai-review-guide/
- GitHub 仓库：https://github.com/blacklarry/zotero-ai-review-guide
- Gitee 国内仓库：https://gitee.com/larry_17/zotero-ai-review-guide
- 问题反馈：https://github.com/blacklarry/zotero-ai-review-guide/issues

## 网站内容

- **六步文献研读教程**：涵盖明确选题、Zotero 安装与文献整理、PDF 批注转笔记、15 字段证据矩阵、主题归纳与写作、Word 正式引用与质量核查，配套两篇经典论文的完整演示案例。
- **AI 提示词库**：18 组可直接复制修改的中文提示词，按选题检索、精读提取、主题综合、写作核查四个阶段分类。
- **工具接入专题**：
  - [WorkBuddy 接入](https://blacklarry.github.io/zotero-ai-review-guide/#workbuddy)：通过本地只读 MCP（`zotero-fulltext`）检索本机 Zotero 文献库，附配置文件、中文 Skill 与一键安装指令（`docs/downloads/workbuddy-zotero/`）。
  - [Codex 接入](https://blacklarry.github.io/zotero-ai-review-guide/#codex)：支持桌面本机任务与 CLI 接入，附 TOML 配置与可选中文 Skill（`docs/downloads/codex-zotero/`）。
- **Zotero 插件指南**（`#zotero-plugins`）：区分浏览器 Connector、桌面 XPI 插件与 Word 插件，介绍插件市场及 Better BibTeX、Better Notes、ZotMoov、PDF Translate 四款常用插件。
- **搭建知识库专题**（`#knowledge`）：
  - [Obsidian 科研知识库](https://blacklarry.github.io/zotero-ai-review-guide/#knowledge/obsidian)：13 个规范目录、9 套基础模板与科研证据链起步包（`docs/downloads/knowledge-base/`）。
  - [ima 嵌入式知识库](https://blacklarry.github.io/zotero-ai-review-guide/#knowledge/ima)：以嵌入式系统（RK3588 / STM32 / FPGA）为例演示建库、分类归档、溯源提问与 WorkBuddy 联动（`docs/downloads/ima-embedded/`）。
- **论文排版模板**：集成 [浙江师范大学 LaTeX 论文模板](https://github.com/blacklarry/zjnu-latex-paper-template) 入口（支持侧栏、第 5 章及资源页直达）。

## 界面与架构

网站为纯静态 HTML、CSS 与 JavaScript，位于 `docs/` 目录，由 GitHub Pages 直接从 `main` 分支的 `/docs` 发布（`.nojekyll` 跳过 Jekyll 处理）。

- 界面采用「纸本研读」编辑风（暖米白纸色、森林绿主色、荧光笔黄点缀、浅色侧栏，支持跟随系统或手动切换深色模式），桌面端优先布局。
- 屏幕样式统一收敛在 `docs/site.css`，交互与物理动效由 `docs/ui.js` 驱动，支持系统“减少动态效果”偏好；打印使用 `docs/print.css` 独立样式，打印时自动展开折叠内容。
- 无后端服务，学习进度与清单勾选仅保存在当前浏览器 `localStorage`。

## 本地预览

```bash
python3 -m http.server 4173 --bind 127.0.0.1 --directory docs
```

打开 http://127.0.0.1:4173/ 即可预览。

## 来源与许可

- 案例论文保留原始来源链接与固定 PDF 版本，短摘录仅用于教学示范。
- 操作截图包含实机截图、Zotero 中文社区指南（按 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 署名复用，见 [中文用户指南](https://zotero-chinese.com/user-guide/)）以及 Zotero 官方文档与发布说明（见 [zotero-docs](https://github.com/zotero/zotero-docs)）。
- 本网站为独立中文教程，非 Zotero 官方出品。
