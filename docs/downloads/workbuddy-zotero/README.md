# Zotero 本地检索 · WorkBuddy 公开适配包

通过 `zotero-fulltext` MCP，把本机 Zotero 文献库连接到 WorkBuddy，浏览分类、检索文献、按引用键定位条目，并按请求读取索引全文。配置固定使用公开版本 `0.5.1`，要求 Python 3.11+。[上游项目](https://github.com/statzhero/zotero-fulltext)、[PyPI 版本页](https://pypi.org/project/zotero-fulltext/0.5.1/)

## 包内文件

- `mcp.json`：通用 MCP 配置，使用 `uvx` 启动服务。
- `skills/zotero-local/SKILL.md`：WorkBuddy 技能指令。
- `zotero-local-workbuddy-skill.zip`：可上传的单技能包，内含 `zotero-local/SKILL.md`。
- `README.md`：本文。完整下载包名为 `zotero-workbuddy-kit.zip`。

包中没有文献条目、PDF、检索结果、账号凭据或 API 密钥，也没有某台电脑的安装路径。

## 让 WorkBuddy 自助安装

大部分安装步骤可交给 WorkBuddy 按本教程执行，包括检查依赖、下载接入包、备份并合并 MCP 配置、安装技能和验证连接。将下面指令复制到 WorkBuddy 对话中：

```text
请读取以下文字版教程，在当前电脑完成 Zotero 接入 WorkBuddy 的安装与配置。
教程：https://blacklarry.github.io/zotero-ai-review-guide/downloads/workbuddy-zotero/README.md
安装包：https://blacklarry.github.io/zotero-ai-review-guide/downloads/workbuddy-zotero/zotero-workbuddy-kit.zip
先检查 Zotero 是否运行、本地 API 是否开启，以及 uv/uvx 是否可用；缺少依赖时按教程准备。
下载并解压接入包。按当前电脑的实际用户目录定位 WorkBuddy 配置与技能目录，不照搬其他电脑的路径。
修改前备份已有 mcp.json，合并 zotero 配置并保留其他连接器；安装中文技能。已有同名配置或技能先核对，内容一致时复用，存在冲突时报告后再处理。
遇到首次“信任”、权限确认或需要我手动操作的步骤时，说明具体操作并等待我完成，再继续。不要替我点击信任或修改授权记录。
最后在工具可用时调用 collections 验证连接；若需要重启或新建对话才能验证，明确说明。报告实际安装位置、修改内容和验证结果，不把配置已保存等同于连接成功。
```

首次“信任”需要用户亲自确认；写入工作空间外的 WorkBuddy 配置和技能目录、安装依赖或执行受控操作时，也可能需要用户授权。遇到确认提示时，按 WorkBuddy 说明检查具体操作并完成授权后再继续。[官方权限与安全沙箱说明](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Permission-Modes)

尚未完成完整自动安装流程实测。实际安装位置、是否需要重启及连接验证结果应由 WorkBuddy 如实报告，以 `collections` 的实际调用结果判断连接状态。

## 1. 准备 Zotero 与 uv

安装并保持 Zotero 8 或更高版本运行。在 Zotero「设置 → 高级」中启用“允许此计算机上的其他应用程序与 Zotero 通信”或对应的本地 API 选项；界面名称可能随版本和语言变化。[上游要求](https://github.com/statzhero/zotero-fulltext#quick-start)

在 Windows PowerShell 中检查 `uv` 与 `uvx` 是否可用：

```powershell
Get-Command uv, uvx -ErrorAction SilentlyContinue | Select-Object Name, Source
uv --version
uvx --version
```

找不到命令时，按 [uv 官方安装说明](https://docs.astral.sh/uv/getting-started/installation/)安装。支持 WinGet 的 Windows 可使用：

```powershell
winget install --id=astral-sh.uv -e
```

安装后重新打开 PowerShell 和 WorkBuddy，再检查命令。服务要求 Python 3.11+，uv 可管理相应运行环境；首次启动通常需要联网下载服务及依赖。[uv 工具运行说明](https://docs.astral.sh/uv/concepts/tools/)

可选的本地 API 检查，只输出 HTTP 状态码：

```powershell
(Invoke-WebRequest -Uri 'http://127.0.0.1:23119/api/' -UseBasicParsing).StatusCode
```

返回 `200` 表明本地 API 有响应。若失败，先检查 Zotero 是否运行及本地 API 是否启用；MCP 连接还需下面的配置和信任步骤。

## 2. 添加 WorkBuddy 自定义 MCP

1. 进入 WorkBuddy「专家·技能·连接器 → 连接器 → 自定义连接器」，添加 MCP 服务。入口以当前版本界面为准。[官方连接器说明](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Connector)
2. 打开本包 `mcp.json`。在配置编辑器中，将 `zotero` 对象合并到已有 `mcpServers` 中；保留已有服务。同名服务已存在时先核对配置，避免覆盖其他用途的连接器。
3. 保存后启用 `zotero`，按界面提示自行完成首次“信任”或授权确认。新建对话，并在该对话中启用连接器；未刷新时重新打开 WorkBuddy。
4. 检查服务是否连接成功，是否发现下面五个工具。只安装技能不能代替 MCP 连接配置。

本配置使用个人本地库：`ZOTERO_LIBRARY_TYPE=user`、`ZOTERO_LIBRARY_ID=0`、`ZOTERO_API_BASE_URL=http://127.0.0.1:23119/api`。此模式无需 Zotero API 密钥。[上游环境变量说明](https://github.com/statzhero/zotero-fulltext#environment-variables)

如果 WorkBuddy 提示找不到 `uvx`，用 `Get-Command uvx` 查出当前电脑的可执行文件位置，将 `command` 改为该位置；在 JSON 中注意正确转义反斜线。只在自己的配置里填写，不必改动公开包。

## 3. 导入技能

在 WorkBuddy「技能 → 添加技能 → 上传技能」中选择 `zotero-local-workbuddy-skill.zip`，导入后启用技能。请上传单技能 ZIP；完整包 ZIP 需要先解压。技能目录与 YAML frontmatter 按 WorkBuddy 格式提供。[官方导入说明](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market)、[官方技能格式](https://open.workbuddy.cn/docs/skill)

## 4. 验证与使用

先验证连接：

> 使用 Zotero 本地文献检索，先调用 collections，列出我的 Zotero 分类；如连接失败，请报告实际错误。

再检索本地库：

> 查找我的 Zotero 文献库中与机器学习有关的论文，列出标题、作者、年份、引用键，以及返回的 DOI 或来源链接。

需要阅读时，把上一步返回的引用键填入请求：

> 读取引用键为「填入实际引用键」的论文，在全文中查找方法和局限，并附上工具返回的段落定位。

引用键 `citekey` 与 Zotero 条目 key 不同，应使用工具返回的准确引用键；没有命中时只说明本地库未找到匹配条目，不自动去网上找论文。

## 五个工具

| 工具短名 | 用途 |
| --- | --- |
| `collections()` | 列出当前库分类，验证连接。 |
| `search(query, collection?, tag?, limit?)` | 检索元数据及 Zotero 已索引的全文，可按分类和标签过滤。 |
| `lookup(citekey)` | 通过准确引用键查询条目元数据。 |
| `fulltext(citekey, offset?, limit?)` | 按需读取编号段落；截断时用返回的 `next_offset` 继续。 |
| `fulltext_search(citekey, query, before?, after?, limit?)` | 在指定文献全文中查词并返回附近段落。 |

WorkBuddy 可能给工具名称添加前缀，以实际发现的名称为准。[上游工具定义](https://github.com/statzhero/zotero-fulltext#tools)

## 全文与数据处理范围

全文来源是 Zotero 已建立的文本索引。未索引附件、扫描件、图表或超出索引范围的内容可能无法返回。工具输出有数量和长度限制，未读到的内容不能作为“论文没有讨论”的证据；段落序号不是 PDF 页码。

该 MCP 服务只读取文献库，不提供新增、修改或删除文献的工具。检索返回的元数据与所请求的正文会进入 WorkBuddy 对话，由所选模型处理；连接本机 Zotero 并不等于内容始终留在本机。请按自己的文献使用范围选择模型与阅读内容。[上游只读设计](https://github.com/statzhero/zotero-fulltext#design)、[WorkBuddy 技能数据处理说明](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market)

## 来源与版本

- MCP 服务：Ulrich Atz 的 [statzhero/zotero-fulltext](https://github.com/statzhero/zotero-fulltext)，[MIT 许可证](https://github.com/statzhero/zotero-fulltext/blob/main/LICENSE)。本包通过 uvx 调用公开发布的服务，不内嵌其源码。
- 配置与技能：独立的 WorkBuddy 本地检索适配，非 Zotero、WorkBuddy 或上游项目官方发布。
- 公开包版本：1.0.0；MCP 版本：0.5.1。公开依赖与工具参数核验日期：2026-10-15。
