# Zotero 本地检索 · Codex 公开适配包

通过 `zotero-fulltext==0.5.1` 的五个只读 MCP 工具，让 Codex 浏览已收藏文献、检索元数据和索引文字、核对引用键并按需读取正文。MCP 是连接前提；中文 Skill 可选，用来指导工具选择和证据输出。服务要求 Zotero 8+、Python 3.11+。[上游项目](https://github.com/statzhero/zotero-fulltext)、[公开版本](https://pypi.org/project/zotero-fulltext/0.5.1/)

## 下载与包内文件

- [完整接入包](https://blacklarry.github.io/zotero-ai-review-guide/downloads/codex-zotero/zotero-codex-kit.zip)：配置片段、技能、单技能 ZIP 和本说明。
- [单技能包](https://blacklarry.github.io/zotero-ai-review-guide/downloads/codex-zotero/zotero-local-codex-skill.zip)：内含 `zotero-local/SKILL.md`。
- `mcp-config.toml`：合并到 Codex 配置的 TOML 片段，不是一份可覆盖全部配置的文件。
- `skills/zotero-local/SKILL.md`：自包含中文技能，YAML frontmatter 仅含 `name` 和 `description`，保持自动发现。

公开包没有私人文献、PDF、检索结果、账号凭据、API 密钥或某台电脑的安装路径。通过 uvx 调用服务，不内嵌其源码。

## 可选：让 Codex 按教程自助安装

在运行于 Zotero 所在电脑的 Codex 新对话中，复制以下完整指令。它与网页上的“复制安装指令”一致：

```text
请读取以下文字版教程，在当前电脑完成 Zotero 接入 Codex 的安装与配置。
教程：https://blacklarry.github.io/zotero-ai-review-guide/downloads/codex-zotero/README.md
安装包：https://blacklarry.github.io/zotero-ai-review-guide/downloads/codex-zotero/zotero-codex-kit.zip
先确认这次任务的 MCP 服务在 Zotero 所在电脑及同一系统运行；远程机器、WSL、容器或云端的 127.0.0.1 不能直接代表我的本机 Zotero。
检查 Zotero 是否运行、本地 API 是否开启，以及 uv/uvx 是否可用；缺少依赖时按教程准备。下载并解压接入包。
定位当前 Codex 主机实际生效的 config.toml（默认 ~/.codex/config.toml，CODEX_HOME 或项目配置可能改变位置）。修改前备份，仅合并 mcp_servers.zotero 及其 env，保留其他配置。已有同名 MCP 先核查，内容一致时复用，冲突时报告后再处理；不要重复添加 TOML 表。
如需中文阅读流程，可将包内 skills/zotero-local 安装到用户 ~/.agents/skills/；先检查已有同名技能，避免重复安装或覆盖。MCP 必需，技能可选。
遇到权限确认、信任提示或需要我手动操作的步骤时，说明具体操作并等待我处理；不绕过审批，不更改安全策略。
配置后重启相应 Codex 客户端并新建对话；工具可用时调用 collections 验证连接。codex mcp list 只证明服务已注册，不证明连接成功。若重启或新会话需我完成，明确说明。
报告实际安装位置、修改内容和验证结果；不要把配置保存、技能出现或命令返回成功等同于文献库连接成功。
```

本指令尚未完成端到端自动安装实测。操作应遵循当前环境权限，遇到需要用户处理的审批或重启时，说明后继续验证。报告只需列出相关修改与结果，不输出整份私人配置。也可以按下面四步手动操作。

## 1. 准备 Zotero 与运行环境

保持 Zotero 8 或更高版本运行，在“设置 → 高级”启用“允许此计算机上的其他应用程序与 Zotero 通信”。本地 API 地址为 `http://127.0.0.1:23119/api`，个人本地库读取不需要 Zotero 云端 API 密钥。[Zotero 本地 API](https://www.zotero.org/support/dev/web_api/v3/local_api)

在 Zotero 所在系统的终端检查：

```powershell
uv --version
uvx --version
```

无法识别命令时，按 [uv 官方安装说明](https://docs.astral.sh/uv/getting-started/installation/)安装，重新打开终端和客户端。Python 要求为 3.11+，uv 可管理运行环境；首次启动通常需要联网下载包。若下载失败，应先解决实际网络或依赖错误。

### 本机、远程与云端的区别

`127.0.0.1` 始终指向发起请求的 MCP 进程所在系统，不表示任意设备上的 Zotero：

| 运行方式 | 本教程适用条件 |
| --- | --- |
| 桌面本机任务或同机 Codex CLI | MCP 和 Zotero 在同一电脑及同一系统，本地 API 可达。 |
| SSH 远程任务 | 先确认 MCP 实际在哪台主机启动；远程主机上的回环地址不会指向用户本机。 |
| WSL 或容器 | 有独立网络环境，不能默认通过其回环地址访问 Windows Zotero；本教程优先使用同一系统的本机任务。 |
| 云端任务 | 本机配置与回环接口不会自动变成云端可用工具；需另行核对实际 MCP 支持与连通性。 |

此边界来自本地进程与回环地址的运行方式。本文不配置远程转发、不把 Zotero 端口公开到外网。[OpenAI 官方 MCP 运行环境说明](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)

## 2. 配置 MCP：TOML 与 CLI 选一种

默认用户配置是 `~/.codex/config.toml`，同一 Codex 主机的桌面、CLI 和 IDE 客户端共享配置。`CODEX_HOME` 或项目级 `.codex/config.toml` 可能影响实际位置与生效范围，先检查当前环境。[官方 MCP 配置](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)

写入前备份已有 `config.toml`。仅合并 `mcp_servers.zotero` 和它的 `env`，保留其他设置与服务。同名服务已存在时先核查：一致则复用，冲突则说明区别后再决定；不要重复添加 TOML 表，也不要用下载片段替换整份用户配置。

### 方式 A：编辑 TOML

将 `mcp-config.toml` 中的以下片段合并到生效的配置中：

```toml
[mcp_servers.zotero]
command = "uvx"
args = ["zotero-fulltext==0.5.1"]

[mcp_servers.zotero.env]
ZOTERO_API_BASE_URL = "http://127.0.0.1:23119/api"
ZOTERO_LIBRARY_TYPE = "user"
ZOTERO_LIBRARY_ID = "0"
```

### 方式 B：已安装 Codex CLI 时注册

在本机终端确认 CLI 可用，备份原配置并核对不存在同名服务后执行：

```powershell
codex mcp add zotero --env ZOTERO_API_BASE_URL=http://127.0.0.1:23119/api --env ZOTERO_LIBRARY_TYPE=user --env ZOTERO_LIBRARY_ID=0 -- uvx zotero-fulltext==0.5.1
codex mcp list
```

`--env` 为 stdio 子进程提供环境变量；`--` 后是启动命令及参数。`codex mcp list` 只证明配置已注册，不证明运行中的 MCP 已连接。本地只读配置不需要 `codex mcp login`。[官方 CLI 命令](https://learn.chatgpt.com/docs/developer-commands)

保存后重启相应 Codex 客户端，IDE 中重启扩展，并新建对话。桌面设置如提供 MCP 服务开关，确认 `zotero` 已启用；权限或信任提示由用户按实际提示处理。旧对话可能仍没有新工具。

## 3. 可选：安装中文技能

解压单技能 ZIP 可得 `zotero-local/SKILL.md`；完整包中相同技能位于 `skills/zotero-local`。按现行官方目录安装到用户 `~/.agents/skills/zotero-local/`，或当前项目 `.agents/skills/zotero-local/`，二选一即可。[官方技能目录与调用](https://learn.chatgpt.com/docs/build-skills)

Windows 的用户目录应根据当前用户解析，例如 PowerShell 的 `[Environment]::GetFolderPath('UserProfile')`，不要照搬其他电脑的绝对路径。先核查同名技能，避免覆盖或重复注册。如果旧环境已经从 `.codex/skills` 加载该技能，先检查实际发现结果，不盲目迁移或安装第二份。

Codex 自动检测技能变化，未显示时重启。可按描述自动选择；CLI 或 IDE 中也可输入 `$zotero-local` 明确调用。无需为了本技能更改自动调用策略。只有技能而没有 MCP 时，不能获得真实文献库检索能力。

## 4. 验证连接与证据

在重启后的新对话先输入：

> 使用 Zotero 本地文献检索，先调用 collections 列出我的 Zotero 分类；连接失败时报告实际错误。

工具实际成功返回分类或有效的空分类列表，才说明接口可用。CLI 交互界面可用 `/mcp` 查看当前会话工具；工具名称可能有服务前缀，以实际发现的名称和参数为准。

然后检索：

> 查找我的 Zotero 文献库中与高光谱和种子活力有关的论文，列出标题、作者、年份、引用键、条目 key，以及实际返回的 DOI 或来源链接。只使用本地库真实检索结果，没有命中时如实说明。

需要阅读时替换方括号中的引用键：

> 读取引用键为 [替换为检索结果中的 citekey] 的论文，提取研究问题、方法和局限。每条结论附原文证据和工具返回的段落定位；结果截断时说明已读范围，段落编号不能当作 PDF 页码。

### 五个只读工具

| 工具短名 | 用法 |
| --- | --- |
| `collections()` | 列出当前库分类，验证连接。 |
| `search(query, collection?, tag?, limit?)` | 检索元数据及已索引文字；按分类或标签过滤。 |
| `lookup(citekey)` | 用准确引用键核对文献。 |
| `fulltext(citekey, offset?, limit?)` | 读取编号段落，按返回的 `next_offset` 继续。 |
| `fulltext_search(citekey, query, before?, after?, limit?)` | 查单篇正文并返回附近证据。 |

`citekey` 是引用键，与 Zotero 条目 key 不同，不要用题名或 DOI 代替。没有命中就报告本地库未找到，不补造论文。工具不提供文献新增、修改或删除，也不会自动联网找新论文。[上游工具定义](https://github.com/statzhero/zotero-fulltext#tools)

## 排障与数据范围

- 注册了服务但没有工具：检查当前 Codex 主机和实际生效配置、服务开关、客户端重启、新对话与具体连接错误；按已有权限和管理策略处理。
- 终端能找到 `uvx`、客户端不能：重新打开客户端更新 PATH；Windows PowerShell 可用 `(Get-Command uvx).Source` 查询位置，仅在自己的 `command` 中填写该绝对路径。TOML 可用正斜杠，或单引号字符串保留 Windows 反斜杠。
- API 连接失败：确认 Zotero 正在运行且本地 API 已启用；未启用时可能返回 403。再检查 MCP 是否与 Zotero 在同一系统。
- 全文不可读或不完整：未索引附件、扫描件、图表和超出索引范围的文字可能无法返回；工具也会截断与分页。没有读到不等于论文没有相关内容，段落编号不等于 PDF 页码。
- 只安装技能：技能只能指导流程，不会替代 MCP 注册和运行。

服务只读的是本地文献库；检索返回的元数据和所请求的正文会进入 Codex 对话，由所选模型处理。接入本地 Zotero 不表示返回内容始终只留在电脑上，请按自己的材料使用范围选择请求内容。

## 来源与验证范围

- OpenAI 官方文档：[MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)、[CLI 命令](https://learn.chatgpt.com/docs/developer-commands)、[技能](https://learn.chatgpt.com/docs/build-skills)。原 `developers.openai.com/codex/` 文档入口已重定向到 ChatGPT Learn。
- MCP 服务：Ulrich Atz 的 [statzhero/zotero-fulltext](https://github.com/statzhero/zotero-fulltext)，[MIT 许可证](https://github.com/statzhero/zotero-fulltext/blob/main/LICENSE)。本包不内嵌上游源码。
- 适配包版本：1.0.0；服务版本：0.5.1。独立教程配套文件，非 OpenAI、Zotero 或上游官方发布。
- 核验日期：2026-10-15。已实际读取官方正文，核对 CLI 命令帮助、TOML 与技能格式、UTF-8 和 ZIP 完整性。未修改当前用户配置，也未完成本包自助安装和新会话调用的端到端实测；不能将这些文档检查当作连接成功。
