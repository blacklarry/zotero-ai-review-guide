(() => {
  'use strict';
  const phases = [
    {name:'阶段一',title:'基础教程',range:'T01–T06'},
    {name:'阶段二',title:'联合工作流实战',range:'T07–T10'},
    {name:'阶段三',title:'质量核查',range:'T11'},
    {name:'阶段四',title:'教程整理与交付',range:'T12'}
  ];
  const tasks = [
    {id:'T01',phase:0,title:'教程规划',deliverable:'教程大纲',status:'已有大纲',
      work:'明确读者、学习目标、章节顺序，以及每项任务与现有内容的对应关系。',
      evidence:'现有六章提供学习路径；本页补充四阶段、12 项任务与验收映射。',links:[['#home','教程概览']],
      pending:'待人工确认受众、学习前提和最终交付边界。',accept:'大纲写清学习目标、先修要求、章节顺序和资源入口；T01–T12 均能对应到交付成果。'},
    {id:'T02',phase:0,title:'Zotero 入门',deliverable:'安装与基础设置指南',status:'部分具备',
      work:'说明安装来源、Connector、基础设置与第一篇文献的准备过程。',
      evidence:'第 1 章已有工具准备、分类和材料准备说明。',links:[['#chapter/1','第 1 章']],
      pending:'待补完整安装与基础设置步骤，并在注明版本的环境中实测。',accept:'新读者按步骤能启动 Zotero、完成 Connector 设置，保存并打开一篇真实文献；记录环境版本和实际结果。'},
    {id:'T03',phase:0,title:'Zotero 文献管理',deliverable:'导入、去重、分类、批注指南',status:'已有教学指南',
      work:'演示真实条目导入、元数据核对、去重、分类标签、PDF 批注和笔记整理。',
      evidence:'第 2–3 章已有操作指南、截图与证据记录示例。',links:[['#chapter/2','第 2 章'],['#chapter/3','第 3 章']],
      pending:'待在指定版本下补齐实际操作验收记录。',accept:'示例条目可回到真实来源，重复项经人工确认；批注笔记保留文献编号、原文位置和核查状态。'},
    {id:'T04',phase:0,title:'Zotero 引文管理',deliverable:'Word 引文与参考文献指南',status:'已有指南，待实测',
      work:'说明 Word 插入引用、生成参考文献、修正元数据后刷新及插件排障。',
      evidence:'第 6 章已有引用指南、官方截图和排障说明。',links:[['#chapter/6','第 6 章']],
      pending:'尚未完成本机 Zotero 与 Word 组合的端到端操作验收。',accept:'在记录版本的 Word 文档中插入真实条目、生成书目并验证刷新；引用与参考文献逐项匹配，保留可编辑字段。'},
    {id:'T05',phase:0,title:'WorkBuddy 入门',deliverable:'安装、配置与工作空间指南',status:'部分具备',
      work:'整理软件安装、工作空间、MCP 配置、技能导入、首次信任与连接验证。',
      evidence:'接入专题已有环境准备、配置、授权和技能说明。',links:[['#workbuddy','WorkBuddy 接入']],
      pending:'待补完整的软件安装与工作空间指南；自动安装全流程、会话调用仍待实测。',accept:'读者按所用版本完成安装与工作空间设置；授权后能验证实际工具返回，并记录失败信息和排障结果。'},
    {id:'T06',phase:0,title:'WorkBuddy 文献分析',deliverable:'分析方法与提示词模板',status:'已有方法与提示词',
      work:'用明确输入和证据约束完成检索、阅读、信息提取与人工修订。',
      evidence:'接入专题提供验证、检索和阅读指令；提示词库提供分析模板。',links:[['#workbuddy','接入与阅读方法'],['#prompts','提示词库']],
      pending:'待补可复现的 WorkBuddy 分析会话及输入、输出、人工修订记录。',accept:'示范明确输入材料与实际输出；每条关键发现附文献编号和原文位置，缺失信息标待核查，并展示至少一次人工纠正。'},
    {id:'T07',phase:1,title:'文献数据整理',deliverable:'文献矩阵模板',status:'已有模板与样例',
      work:'统一矩阵字段，按一条证据一行记录对象、方法、结果、条件、局限与出处。',
      evidence:'已有 15 字段空白模板、五条填写样例及字段说明。',links:[['#resources','矩阵与字段说明'],['#chapter/3','证据提取案例']],
      pending:'实际项目仍需根据自己的原文填写矩阵并完成核验。',accept:'空白模板与样例可打开且字段一致；同篇多结果可拆行，证据位置、人工核查状态和局限均可核对。'},
    {id:'T08',phase:1,title:'联合工作流设计',deliverable:'工具交接规范与流程图',status:'流程已整理，待实战',
      work:'定义 Zotero 与 WorkBuddy 的输入、输出、交接字段和失败回退方式。',
      evidence:'本页补充十步流程与交接规范；第 3 章已有证据链示意。',links:[['#chapter/3','现有证据链案例'],['#workbuddy','接入边界与排障']],
      pending:'待在实际版本、配置和授权环境中走通全流程，保存交接记录。',accept:'一次示范能串联同一组文献编号；交接保留来源、原文位置、条件与核验状态，读取失败时能回退到人工整理。'},
    {id:'T09',phase:1,title:'研究主题分析',deliverable:'主题分析报告',status:'已有示例，报告待补',
      work:'依据已核验矩阵归纳主题，比较研究进展、争议、条件差异与待补证据。',
      evidence:'第 4 章已有两篇论文、五条证据的主题比较教学表。',links:[['#chapter/4','主题比较示例']],
      pending:'教学比较表尚不等于完整主题分析报告或 WorkBuddy 实战报告。',accept:'报告包含主题定义、文献分组、共识与分歧、适用边界；每项判断有证据编号，不把当前文献集缺口直接称为领域空白。'},
    {id:'T10',phase:1,title:'综述写作实战',deliverable:'综述初稿',status:'已有段落，初稿待补',
      work:'先审查论证式大纲，再根据已核验证据完成正文和引用占位。',
      evidence:'第 5 章已有提纲方法、单段综述成品与逐句证据对照。',links:[['#chapter/5','写作与段落成品']],
      pending:'尚无完整综述初稿；单个示范段落不计为整篇初稿交付。',accept:'初稿围绕主问题形成完整结构；区分作者结论、综合解释与推断，关键论断可回查证据，不新增未经核实的事实或引用。'},
    {id:'T11',phase:2,title:'质量核查',deliverable:'原文、数据、引文与逻辑检查清单',status:'已有清单，待项目验收',
      work:'逐项核验事实、数值、实验条件、引用对应关系和论证逻辑。',
      evidence:'第 6 章与下载清单已有核查方法。',links:[['#chapter/6','质量核查指南'],['#resources','下载核查清单']],
      pending:'待对实际项目全稿执行清单，记录通过项、问题及修正依据。',accept:'每项检查有实际结论或待核查标记；关键数值、引文和参考文献与原文一致，未解决问题有明确处理记录。'},
    {id:'T12',phase:3,title:'教程交付',deliverable:'完整教程及配套资源',status:'已有站点，待人工验收',
      work:'整理教程、案例、提示词、模板、版本说明和问题记录，形成可交接版本。',
      evidence:'现有网站提供六章、18 条提示词、案例、截图和下载资源。',links:[['#home','六章教程'],['#resources','配套资源']],
      pending:'本轮路线图须经过针对性测试和人工验收，再单独决定是否发布。',accept:'T01–T12 的成果与状态一致，导航和下载可用，保留验证范围及未解决问题；人工确认后才决定发布。'}
  ];
  const workflow = [
    ['研究问题与检索策略','明确范围、关键词与纳排规则，记录检索条件。'],
    ['Zotero 收集、去重和分类','核对真实条目，保留来源，人工确认重复项。'],
    ['整理 PDF、元数据及笔记','保留文献编号、固定版本、原文位置与阅读笔记。'],
    ['WorkBuddy 分析文献','提供可用材料，或在授权后读取已配置工具实际返回的内容。'],
    ['建立文献矩阵与主题分类','按证据行整理，区分待核查记录与已核验记录。'],
    ['提炼研究进展、争议和不足','基于当前文献集比较，保留条件、反例与证据边界。'],
    ['生成综述大纲与初稿','先审大纲，再写段落，使用临时证据编号标明依据。'],
    ['回到原文核验','逐条检查关键事实、数据、推断和引用是否有原文支持。'],
    ['Zotero 管理引文与参考文献','在 Word 等实际支持的写作环境中插入真实条目并核对书目。'],
    ['最终检查','按 T11 清单复核全稿，保留修改记录，再进入人工交付验收。']
  ];

  function render({icon, esc, crumb}) {
    const rows = tasks.map(task => `<tr><th scope="row"><b>${task.id}</b><span>${esc(task.title)}</span><small>${phases[task.phase].name}</small></th><td><p>${esc(task.work)}</p><p><b>交付成果：</b>${esc(task.deliverable)}</p></td><td><span class="roadmap-status">${esc(task.status)}</span><p>${esc(task.evidence)} ${task.links.map(([href,label]) => `<a href="${href}">${esc(label)}</a>`).join(' · ')}</p><p><b>待补与验证：</b>${esc(task.pending)}</p></td><td>${esc(task.accept)}</td></tr>`).join('');
    return `${crumb('项目路线图')}
      <article class="roadmap-page">
        <header class="page-intro"><h1>项目路线图与实施计划</h1><p>将现有六章教程、工具专题与配套资源组织成四阶段项目计划，明确每项工作的交付成果、验收依据和待补内容。</p><div class="page-meta"><span>${icon('layers')} 4 个阶段 · 12 项任务</span><span>${icon('file')} 内容对照：2026-10-28 · 基线 0412134</span></div></header>
        <div class="callout"><strong>${icon('info')} 如何阅读状态</strong>状态描述现有成果的覆盖程度，不代表读者学习进度或真实项目已完成。文档核验不等于软件全流程实测；本页不写入原有六章进度。</div>
        <section aria-labelledby="roadmap-phases-title"><h2 id="roadmap-phases-title">四阶段项目路线图</h2><ol class="roadmap-phases">${phases.map(phase => `<li><span>${phase.name}</span><h3>${phase.title}</h3><b>${phase.range}</b></li>`).join('')}</ol><p class="table-caption">任务编号与章节编号不同。例如 T04 的引文管理对应现有第 6 章，T05–T06 主要对应 WorkBuddy 专题。</p></section>
        <section class="worked-example" aria-labelledby="roadmap-tasks-title"><h2 id="roadmap-tasks-title">12 项任务、成果与验收标准</h2><div class="table-wrap" tabindex="0" aria-label="项目任务表，可横向滚动"><table class="roadmap-tasks"><caption class="sr-only">四阶段任务清单，按编号列出工作、交付成果、现状与验收标准。</caption><colgroup><col style="width:15%"><col style="width:27%"><col style="width:31%"><col style="width:27%"></colgroup><thead><tr><th scope="col">任务与阶段</th><th scope="col">主要工作与交付成果</th><th scope="col">当前状态与依据</th><th scope="col">可验证的验收标准</th></tr></thead><tbody>${rows}</tbody></table></div></section>
        <section class="worked-example" aria-labelledby="roadmap-workflow-title"><h2 id="roadmap-workflow-title">Zotero + WorkBuddy 联合工作流</h2><p>按顺序推进，AI 输出先作为待核查草稿。所有关键事实、数据和引用都要回到原文核验。</p><ol class="roadmap-flow">${workflow.map(([title,body]) => `<li><b>${esc(title)}</b><p>${esc(body)}</p></li>`).join('')}</ol><dl class="field-guide"><div><dt>Zotero</dt><dd>负责文献管理、PDF 阅读批注、笔记和引文管理，保留真实条目及原始证据。</dd></div><div><dt>WorkBuddy</dt><dd>辅助文献分析、信息归纳和写作；研究判断与证据核验由人工负责。</dd></div><div><dt>实际交接方式</dt><dd>可以人工复制已核验的原文片段、笔记和矩阵。本项目接入专题另提供本机 MCP 只读检索与读取方案，是否可用以实际版本、配置、首次信任及工具返回结果为准。没有读取到全文时，回退到人工整理材料，不让 AI 补全缺失证据。</dd></div><div><dt>交接保留字段</dt><dd>文献编号（如 P001）、证据编号（如 E01）、题名与 DOI 或来源、固定版本、原文短片段、位置、实验条件和人工核查状态。同篇多个结果拆为多条证据。工具返回的引用键须核对，全文段落编号不能直接当作 PDF 页码。</dd></div><div><dt>能力边界</dt><dd>本站提供教程，不直接读取文献库。现有接入工具为只读工具，不承诺自动导入或改写 Zotero 条目、自动写回笔记或插入 Word 引用；相关操作应由已验证的实际功能或人工完成。</dd></div></dl><p><a href="#workbuddy">查看接入与排障说明</a> · <a href="#chapter/3">查看证据链案例</a> · <a href="#resources">获取矩阵与核查清单</a></p></section>
        <section class="worked-example" aria-labelledby="roadmap-acceptance-title"><h2 id="roadmap-acceptance-title">交付验收</h2><ul class="practice-steps"><li>任务编号、所属阶段和交付成果一致，已有示例与计划成果分别标注。</li><li>文献分析中的关键判断可追溯至具体原文、位置和核验记录。</li><li>引文与参考文献可核验，条目身份、引用位置与所支持的论断对应。</li><li>页面导航、站内搜索和内部链接有效，配套资源能按既定方式获取。</li><li>原有六章、案例、18 条提示词、进度、打印和下载等功能未受影响。</li></ul></section>
        <section class="worked-example" aria-labelledby="roadmap-maintenance-title"><h2 id="roadmap-maintenance-title">维护流程</h2><ol class="practice-steps"><li><b>记录问题：</b>注明页面或任务编号、环境版本、复现步骤及实际结果。</li><li><b>最小化修改：</b>仅修改直接相关内容，保留已有教程、案例与资源。</li><li><b>针对性测试：</b>运行项目已有检查及受影响页面的必要测试，区分本次引入问题与既有问题。</li><li><b>检查 diff：</b>确认变更范围、中文编码、内部链接和状态说明准确。</li><li><b>人工验收：</b>根据任务交付物核对内容与证据，记录尚未验证的项目。</li><li><b>决定是否发布：</b>由维护者明确决定，不把修改完成或本地测试通过等同于发布批准。</li></ol><p>问题可从 <a href="#resources">资源页的反馈与纠错入口</a>整理。本页保留未完成项；待实际验证后再更新任务状态与核验记录。</p></section>
      </article>`;
  }
  const searchItems = [{title:'项目路线图与实施计划',type:'项目计划',body:'四阶段 教程规划 验收标准 维护流程 Zotero WorkBuddy 联合工作流 '+tasks.map(task => `${task.id} ${task.title} ${task.deliverable}`).join(' '),href:'#roadmap'}];
  window.GUIDE_ROADMAP = {render,searchItems};
})();
