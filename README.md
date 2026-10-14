# 研读手册 · Zotero + AI 实操指南

从文献收集、证据提取到主题比较、综述写作和引用核查的中文入门网站。

- 在线阅读：https://blacklarry.github.io/zotero-ai-review-guide/
- 反馈与纠错：https://github.com/blacklarry/zotero-ai-review-guide/issues
- 内容核验日期：2026-10-14

## 内容

六章学习路径、六组 AI 提示词、两篇真实论文的完整案例、五条证据的 15 字段填写样例、三组 Zotero 官方操作截图，以及 Word 插件排障。

页面上的模拟 AI 错误用于演示人工核查，不是一次真实模型测试。论文内容与位置已对照原文核验，软件步骤按 Zotero 官方文档核验，未声称完成本机 Zotero / Word 全流程实测。

## 发布与维护

网站是 HTML、CSS 和 JavaScript 静态文件，位于 `docs/`。GitHub Pages 配置为从 `main` 分支的 `/docs` 发布；修改并推送该目录后会自动更新网站。`.nojekyll` 使 GitHub 直接发布静态文件。

本地预览（Python 3）：

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory docs
```

打开 http://127.0.0.1:4173/ 。章节进度只保存在当前浏览器；资源下载由浏览器生成，网站没有后端服务。

## 来源与归属

论文案例保留原始来源链接、固定版本和证据位置；引用只用于教学所需的短摘录。

界面截图来自 Zotero 官方文档和发布说明，每图附有来源和版本说明。Zotero 文档材料按 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 复用；博客截图的版权归原权利人，不把整站声明为同一开放许可。详见 [Zotero 文档源库](https://github.com/zotero/zotero-docs) 和网站“适用版本、核验记录与纠错”部分。

本网站为独立中文教程，非 Zotero 官方出品。
