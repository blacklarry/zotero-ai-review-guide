(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const study = () => window.GUIDE_STUDY;
  const external = (url, label) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
  const title = (label, heading) => `<div class="eyebrow">${esc(label)}</div><h2>${esc(heading)}</h2>`;
  const caseNav = () => '<nav class="case-nav" aria-label="完整案例步骤"><a href="#chapter/3">① 原文、批注与矩阵</a><a href="#chapter/4">② 主题比较</a><a href="#chapter/5">③ 综述成品</a></nav>';
  const operationImageSteps = {
    'assets/operations/community-connector-save.png':'步骤 3',
    'assets/operations/community-annotations-menu.png':'步骤 2',
    'assets/operations/community-word-toolbar.png':'步骤 1、4',
    'assets/operations/word-citation-list-v8.png':'步骤 2',
    'assets/operations/word-page-number-before.png':'步骤 3',
    'assets/operations/word-page-number-after.png':'步骤 3'
  };
  const handoffSteps = [
    '在练习目录里新建 P001-notes.txt 和 P002-notes.txt 两份 UTF-8 文本，避免直接改动 Zotero 数据目录。',
    '把两篇论文的题名、作者、年份、固定 PDF 版本、原文位置和笔记成品复制进去，按需要附上原文短摘录。',
    '为每篇论文单独开一个 AI 对话，贴入 P001 的文本，配合提示词库的“单篇文献证据提取”提取结构化记录；完成后再另起对话处理 P002。',
    '把输出另存为待核查草稿，检查有没有漏篇、串篇或重复（本例 P001 含 E01–E02，P002 含 E03–E05）。',
    '打开原 PDF 逐条核对短摘录、页码和实验条件，确认无误再正式填入 15 字段矩阵。'
  ];
  const citationSteps = [
    '先核对编号映射：P001 对应 Yosinski 等（2014），P002 对应 Kornblith 等（2019），确认 Zotero 中两篇条目的题名、作者、年份和类型都准确。',
    '在 Word 草稿中把光标放在引用位置，用 Zotero 的 Add/Edit Citation 逐一替换 [P001]、[P002]；同一句引用两篇时在同一个引文框里一起加入。',
    '每替换一处引用，顺手回查对应的证据条目，确认这篇论文确实支持这句完整论断。',
    '用 Document Preferences 选好引文样式，用 Add/Edit Bibliography 生成文末参考文献表；发现题录错漏先回 Zotero 修改再点 Refresh。'
  ];
  const draftSections = [
    {heading:'范围',text:'本示例聚焦图像分类任务中预训练特征的迁移收益，围绕特征层次、迁移方式（冻结与微调）及目标任务条件展开比较，基于 Yosinski 等（2014）与 Kornblith 等（2019）两篇代表性研究组织证据 [P001：E01–E02；P002：E03–E05]。'},
    {heading:'主题比较',text:'Yosinski 等在随机 ImageNet 子任务上观察到，前两层冻结特征较好迁移；而在同任务 BnB 对照中，微调可以恢复冻结复制层带来的性能下降 [P001：E01–E02]。Kornblith 等在统一训练设置下发现，ImageNet 准确率与固定特征的跨数据集迁移表现高度相关 [P002：E03]；但在 Stanford Cars 与 FGVC Aircraft 两个细粒度数据集上，预训练对最终准确率的增益较小，不过依然显著加快了训练收敛 [P002：E04–E05]。由此可见，“最终增益有限”与“收敛更快”衡量的是不同维度的收益，两者可以同时成立。'},
    {heading:'局限',text:'以上结论均依赖具体的网络架构、训练设置与任务类型：前两层的平滑迁移无法外推为所有层都无损迁移，而公开模型训练配置的差异也会影响整体相关性 [P001：E01；P002：E03–E04]。要在综述中判断其他视觉任务或新型架构的规律，还需进一步扩大检索范围。'},
    {heading:'结论',text:'综合现有证据，比较不同迁移策略时应同时记录迁移方式、训练设置与目标任务，并把“最终表现”与“训练效率”分开评估，避免用单一指标草率下结论 [P001：E01–E02；P002：E03–E05]。'}
  ];
  function handoff() {
    const s = study();
    return `<section class="worked-example">${title('CASE / HANDOFF', '把两篇 Zotero 笔记交给 AI 工具')}<p>把整理好的笔记存成纯文本交接，能确保 AI 拿到的每一条材料都有清晰的论文身份和页码出处，用 WorkBuddy 或任意对话式 AI 都能直接练手。</p><ol class="practice-steps">${handoffSteps.map(step => `<li>${esc(step)}</li>`).join('')}</ol><p>配套模板：<a href="#prompts/extract">单篇文献证据提取</a>。</p><div class="table-wrap"><table><caption>交接清单：两篇文献，五条证据</caption><thead><tr><th scope="col">文本副本</th><th scope="col">文献身份</th><th scope="col">本例证据编号</th><th scope="col">位置核对</th></tr></thead><tbody>${s.papers.map(paper => `<tr><th scope="row">${esc(paper.id)}-notes.txt</th><td>${esc(paper.authors)} (${paper.year})<br>${esc(paper.title)}</td><td>${s.matrixRows.filter(row => row[0] === paper.id).map(row => esc(row[8].split('｜')[0])).join('、')}</td><td>${esc(paper.location)}</td></tr>`).join('')}</tbody></table></div><p class="operation-result"><strong>完成后应看到：</strong>P001、P002 各自有独立的输入文本与核查记录，写入矩阵的每一行都完整保留文献编号与原文位置。</p><details class="operation-trouble"><summary>交接后读不全、串篇或输出被截断怎么办？</summary><ul class="practice-steps"><li>先让 AI 复述它收到的文献编号与题名，发现漏篇或串篇时立刻退回单篇重做。</li><li>如果只提供了摘要或局部笔记，在记录中注明阅读范围，别把局部没提写成全文没写。</li><li>长输出被截断时按单篇或按证据分批生成，合并前检查是否有漏行或重复。</li></ul></details></section>`;
  }
  function synthesisGuide() {
    const s = study();
    const groups = [
      {indices:[0,1,2,3],use:'核对文献身份。P001 两行、P002 三行总共代表两篇论文，统计篇数时按文献编号去重。'},
      {indices:[4,5,6,7],use:'对齐比较维度：区分 P001 的单架构层次比较，与 P002 的统一设置跨架构比较。'},
      {indices:[8,9,10],use:'逐条定位 E01–E05，确保每条发现都有对应的原文短摘录和固定版本页码。'},
      {indices:[11,12,13,14],use:'保留作者局限与适用边界，只把核验通过的记录放进跨文献综合。'}
    ];
    return `<section class="worked-example">${title('CASE / SYNTHESIS', '从 15 字段矩阵整理成主题章节')}<p>好的综述是按“问题和主题”展开的，而不是把“论文一、论文二”的摘要顺着贴一遍。把 15 列分成四组阅读，思路会非常清楚：</p><div class="table-wrap"><table><thead><tr><th scope="col">字段分组</th><th scope="col">怎么用</th></tr></thead><tbody>${groups.map(group => `<tr><th scope="row">${group.indices.map(index => esc(s.matrixColumns[index])).join('、')}</th><td>${esc(group.use)}</td></tr>`).join('')}</tbody></table></div><ol class="practice-steps"><li>检查矩阵里的五条记录（P001 两行、P002 三行），确认每条的状态都已核验。</li><li>把已核验的行交给 AI，使用<a href="#prompts/themes">主题归纳模板</a>提炼候选主题，再用<a href="#prompts/conflicts">冲突排查模板</a>检查不同结果是否真的矛盾。</li><li>把“迁移方式与实验条件”设为第一节（用 E01–E03 讨论设计差异），把“最终表现与训练效率”设为第二节（用 E04–E05 区分两类收益），每节先亮出中心句再摆证据。</li><li>把“结论的适用边界”写进综合评述与局限；如果想指出研究空白，先列补检索词验证，再下结论。</li></ol><p class="operation-result"><strong>完成后应看到：</strong>一张主题—证据对照表和按问题组织的章节大纲，每个小节都有中心判断、支持/限制证据和清晰出处。</p></section>`;
  }
  function shortReview() {
    const s = study();
    return `<section class="worked-example">${title('CASE / DRAFT', '短综述示范初稿（四段结构）')}<p class="case-scope">下面沿用这两篇论文的五条证据，示范“范围 → 主题比较 → 局限 → 结论”的完整成文结构，供模仿结构与核查节奏。</p>${draftSections.map(part => `<h3>${esc(part.heading)}</h3><p>${esc(part.text)}</p>`).join('')}<h3>从临时编号换成正式引文</h3><ol class="practice-steps">${citationSteps.map(step => `<li>${esc(step)}</li>`).join('')}</ol><p>本例书目与原文入口：${s.papers.map(paper => external(paper.url, paper.id + ' · ' + paper.authors + ' (' + paper.year + ')')).join(' · ')}。</p><p class="operation-result"><strong>完成后应看到：</strong>正文按主题组织、每句核心判断都能回查矩阵，文内引用与文末参考文献均由真实 Zotero 条目自动生成。</p><div class="example-actions"><button class="btn btn-secondary" data-download="case">下载完整案例 TXT</button><a href="#chapter/6">查看 Word 引文操作与最终核查 →</a></div></section>`;
  }
  function matrix() {
    const s = study();
    return `<section class="worked-example">${title('CASE / EVIDENCE MATRIX', '已填写的证据矩阵')}<p>两篇论文共拆出五条证据，一条证据占一行。下表展示核心字段，点开下方折叠栏可查看全部 15 列。</p><div class="table-wrap"><table class="evidence-table"><caption class="sr-only">两篇论文的五条已核验证据</caption><thead><tr><th>文献</th><th>主要发现</th><th>证据位置</th><th>局限与边界</th></tr></thead><tbody>${s.matrixRows.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[8])}</td><td>${esc(r[10])}</td><td>${esc(r[11])}</td></tr>`).join('')}</tbody></table></div><div class="evidence-details">${s.matrixRows.map(r => `<details><summary>${esc(r[0])} · ${esc(r[8].split(/[｜：]/)[0])} · 查看 15 字段</summary><dl>${s.matrixColumns.map((column, i) => `<div><dt>${esc(column)}</dt><dd>${esc(r[i])}</dd></div>`).join('')}</dl></details>`).join('')}</div><div class="example-actions"><button class="btn btn-secondary" data-download="matrix-example">下载完整填写样例 CSV</button><a href="#resources">查看字段填写说明 →</a></div></section>`;
  }
  function reading() {
    const s = study();
    return `<section class="worked-example">${title('WORKED CASE / 01', '跟着做：预训练特征如何迁移？')}<p>${esc(s.question)}</p><p class="case-scope">${esc(s.scope)}</p>${caseNav()}<ol class="practice-steps"><li>打开下列原文，在 Zotero 新建“迁移学习练习”分类，分别编号为 P001、P002。</li><li>翻到标注位置高亮关键短句，把“人工批注”写进批注栏。</li><li>右键父条目点击“从注释中添加笔记”，整理好实验条件和证据编号。</li><li>把笔记交给<a href="#prompts/extract">“单篇文献证据提取”</a>，对照原文复核后与下方矩阵比对。</li></ol><dl class="field-guide">${s.terms.map(t => `<div><dt>${esc(t.term)}</dt><dd>${esc(t.definition)}</dd></div>`).join('')}</dl>${s.papers.map(p => `<article class="paper-example"><span class="prompt-type">${esc(p.id)} · ${esc(p.authors)} (${esc(p.year)})</span><h3>${esc(p.title)}</h3><p>${external(p.url, '论文与书目信息')} · ${external(p.pdfUrl, '打开指定版本原文')}</p><p class="evidence-location">定位：${esc(p.location)}</p><h4>原文短摘录</h4><blockquote lang="en">${esc(p.excerpt)}</blockquote><h4>人工批注示范</h4><p>${esc(p.annotation)}</p><h4>汇入笔记后的成品</h4><pre class="worked-note">${esc(p.note.replace(/｜/g, '\n'))}</pre></article>`).join('')}</section>${handoff()}<section class="worked-example correction-example">${title('HUMAN CHECK', 'AI 误读后，怎样回到原文纠正')}<p class="case-scope">${esc(s.aiCorrection.label)}</p><div class="correction-row"><h3>① 错误草稿示例</h3><p>${esc(s.aiCorrection.wrong)}</p></div><div class="correction-row"><h3>② 回原文核查</h3><p>${esc(s.aiCorrection.check)}</p></div><div class="correction-row"><h3>③ 修订后的准确表述</h3><p>${esc(s.aiCorrection.corrected)}</p></div><p>核查习惯很简单：拿不准先标“待核查”，对照原文补回条件后再改“已核验”，找不到出处的直接删去，并同步更新矩阵。</p></section><figure class="flow-figure"><div class="flow-scroll" role="region" aria-label="证据流转图，可横向滚动" tabindex="0"><img src="assets/evidence-flow.svg" alt="证据流转：文献全文 → PDF 批注 → 条目笔记 → 证据矩阵 → 主题比较 → 综述成品" width="1680" height="340" loading="lazy"></div><figcaption>每一步都保留文献编号与出处；矩阵用来理清证据，最终判断始终回到原文。<span class="diagram-hint">左右滑动查看完整流程图。</span></figcaption></figure>${matrix()}<p class="case-next"><a href="#chapter/4">继续：用这些证据做主题比较 →</a></p>`;
  }
  function comparison() {
    const s = study();
    return `<section class="worked-example">${title('WORKED CASE / 02', '从五条证据到主题比较')}<p>沿用第 3 章的五条核验记录。比较时先对齐实验设置与条件，不拿不同条件下的数值直接排高低。</p>${caseNav()}<div class="table-wrap"><table><caption class="sr-only">主题、证据、比较与适用边界</caption><thead><tr><th>主题</th><th>证据编号</th><th>比较与综合判断</th><th>边界</th></tr></thead><tbody>${s.themes.map(t => `<tr><td>${esc(t.title)}</td><td>${esc(t.evidence)}</td><td>${esc(t.comparison)}</td><td>${esc(t.boundary)}</td></tr>`).join('')}</tbody></table></div><p>两篇论文足以说明“迁移收益取决于特征层次、迁移方式与任务条件”；如果要讨论更广领域的规律，把还没覆盖的问题列进下一轮检索清单即可。</p><p class="case-next"><a href="#chapter/5">继续：查看由这些证据写出的综述段落 →</a></p></section>${synthesisGuide()}`;
  }
  function writing() {
    const s = study();
    return `<section class="worked-example">${title('WORKED CASE / 03', '一段句句有据的综述示范')}${caseNav()}<p>按“中心判断 → 研究证据 → 条件比较 → 适用边界”展开段落，再逐句核对有没有超出原文范围。</p><blockquote class="review-paragraph">${esc(s.paragraph)}</blockquote><p class="case-scope">[P001:E01] 是草稿阶段的证据标记；定稿前用 Word 的 Zotero 插件替换为正式引用，E 编号留在工作笔记中即可。</p><div class="table-wrap"><table><caption class="sr-only">综述句子与支持证据对照</caption><thead><tr><th>段落中的主张</th><th>支持证据</th><th>条件与判断性质</th></tr></thead><tbody>${s.sentenceEvidence.map(r => `<tr><td>${esc(r.claim)}</td><td>${esc(r.evidence)}</td><td>${esc(r.boundary)}</td></tr>`).join('')}</tbody></table></div><div class="example-actions"><button class="btn btn-secondary" data-download="case">下载案例笔记与综述成品 TXT</button><a href="#chapter/6">下一步：插入正式引用 →</a></div></section>${shortReview()}`;
  }
  function operations(chapter) {
    const groups = window.GUIDE_OPERATIONS.groups.filter(g => g.chapter === chapter);
    return groups.map(g => `<section class="worked-example operation-guide">${title('ZOTERO / STEP BY STEP', g.title)}<p><strong>操作目的：</strong>${esc(g.title.replace('跟着截图：',''))}。</p><ol class="practice-steps">${g.steps.map(t => `<li>${esc(t)}</li>`).join('')}</ol>${g.images.map(i => `<figure><a href="${esc(i.path)}" target="_blank" rel="noopener noreferrer" aria-label="打开大图：${esc(i.caption)}"><img src="${esc(i.path)}" alt="${esc(i.alt)}" width="${i.width}" height="${i.height}" loading="lazy"></a><figcaption>${operationImageSteps[i.path] ? `<strong>对应${esc(operationImageSteps[i.path])}。</strong> ` : ''}${esc(i.caption)}<br>来源：${external(i.sourcePage, i.sourceLabel || 'Zotero 官方文档')}${i.licenseScope === 'chinese-community-documentation-cc-by-sa-4.0' ? `（${external('https://creativecommons.org/licenses/by-sa/4.0/', 'CC BY-SA 4.0')}）` : ''}${i.versionNote ? ` · ${esc(i.versionNote)}` : ''}</figcaption></figure>`).join('')}<p class="operation-result"><strong>完成后应看到：</strong>${esc(g.expected)}</p>${g.trouble ? `<details class="operation-trouble"><summary>${esc(g.trouble.title)}</summary><ol class="practice-steps">${g.trouble.steps.map(t => `<li>${esc(t)}</li>`).join('')}</ol><p>${external(g.trouble.url, '官方故障排查文档')}</p></details>` : ''}</section>`).join('');
  }
  function resources() {
    const o = window.GUIDE_OPERATIONS;
    return `<section class="worked-example">${title('MATRIX / HOW TO FILL', '填写证据矩阵的三个要点')}<p>保留模板原有的 15 个字段，对照样例填写即可；一篇论文有多个关键发现时拆成多行，别挤在一个格子里。</p><dl class="field-guide"><div><dt>证据位置</dt><dd>同时记下版本、PDF 页序和章节/表图号（如“作者稿 v3，PDF 第6页，§4.5”），换版本时方便重新定位。</dd></div><div><dt>人工核查状态</dt><dd>还没回原文确认前先填“待核查”；核对完原文片段、条件和位置后改为“已核验（日期）”。只看过摘要的标为“待读全文”。</dd></div><div><dt>局限与偏倚</dt><dd>分开写“作者自述的局限”和“自己判断的适用边界”；原文未提及的写“材料未提及”。</dd></div></dl><p>例如：P001 的 E01 与 E02 分占两行，文献编号与题名相同、主要发现与位置各自独立；统计论文篇数时按文献编号去重即可。</p><div class="example-actions"><a href="#chapter/3">查看原文 → 笔记 → 完整样例</a><button class="btn btn-secondary" data-download="case">下载完整案例 TXT</button></div></section><section class="worked-example maintenance">${title('VERSION / MAINTENANCE', '适用版本、参考来源与纠错')}<dl class="field-guide"><div><dt>适用软件版本</dt><dd>${o.compatibility.map(line => `<p>${esc(line)}</p>`).join('')}</dd></div><div><dt>内容与截图来源</dt><dd>${esc(o.licenseNote)}</dd></div></dl><p>${o.versionSources.map(s => external(s.url, s.label)).join(' · ')}</p><details class="feedback-entry"><summary>发现错漏？生成纠错报告</summary><p>填写下方内容可导出纯文本报告，再到 GitHub Issues 提交即可（数据仅保存在本地，不会自动上传）。</p><label for="feedback-location">页面 / 步骤</label><input id="feedback-location" placeholder="例如：第3章 · 从批注添加笔记"><label for="feedback-version">系统与软件版本</label><input id="feedback-version" placeholder="例如：Windows 11 / Zotero 10.0.6 / Word Microsoft 365"><label for="feedback-description">遇到的问题与建议修改</label><textarea id="feedback-description" rows="5" placeholder="描述遇到的问题、预期效果，或附上参考链接。"></textarea><div class="example-actions"><button class="btn btn-secondary" data-download="feedback">下载纠错报告 TXT</button><a class="btn btn-secondary" href="https://github.com/blacklarry/zotero-ai-review-guide/issues/new" target="_blank" rel="noopener noreferrer">在 GitHub 提交问题 ↗</a></div></details></section>`;
  }
  function caseText() {
    const s = study();
    return `研读手册 | Zotero + AI 完整案例\n\n问题：${s.question}\n说明：${s.scope}\n\n${s.papers.map(p => `${p.id} | ${p.authors} (${p.year})\n${p.title}\n来源：${p.url}\n固定原文：${p.pdfUrl}\n位置：${p.location}\n短摘录：${p.excerpt}\n人工批注：${p.annotation}\n笔记成品：\n${p.note}`).join('\n\n')}\n\nAI 误读核查示例：${s.aiCorrection.wrong}\n回原文核查：${s.aiCorrection.check}\n修订结果：${s.aiCorrection.corrected}\n\n主题比较：\n${s.themes.map(t => `${t.title} | ${t.evidence}\n${t.comparison}\n边界：${t.boundary}`).join('\n\n')}\n\n综述成品：\n${s.paragraph}\n\n逐句证据对照：\n${s.sentenceEvidence.map(r => `${r.claim}\n证据：${r.evidence}\n说明：${r.boundary}`).join('\n\n')}\n\n笔记交接步骤：\n${handoffSteps.map((step,index) => `${index+1}. ${step}`).join('\n')}\n\n短综述示范初稿：\n${draftSections.map(part => `${part.heading}\n${part.text}`).join('\n\n')}\n\n替换为正式引文：\n${citationSteps.map((step,index) => `${index+1}. ${step}`).join('\n')}\n\n提示：[P001:E01] 为写作阶段的证据编号，定稿前请在 Word 中通过 Zotero 插件替换为正式引用。\n`;
  }
  window.GUIDE_EXTRAS = {
    chapter: id => operations(id) + (id === 3 ? reading() : id === 4 ? comparison() : id === 5 ? writing() : ''),
    matrix, resources, caseText
  };
})();
