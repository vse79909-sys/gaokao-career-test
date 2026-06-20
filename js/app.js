/**
 * 高考志愿性格测试 — 核心应用逻辑
 * 页面导航、题目流转、评分计算、雷达图绘制、结果渲染
 */

(function() {
  'use strict';

  // ===== 状态管理 =====
  const state = {
    currentQuestion: 0,
    answers: new Array(QUESTIONS.length).fill(null),
    totalQuestions: QUESTIONS.length
  };

  // ===== DOM 缓存 =====
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const pages = {
    welcome: $('#welcome-page'),
    test: $('#test-page'),
    result: $('#result-page')
  };

  const elements = {
    progressText: $('#progress-text'),
    progressPercent: $('#progress-percent'),
    progressFill: $('#progress-fill'),
    dimensionIndicator: $('#dimension-indicator'),
    questionNumber: $('#question-number'),
    questionDimDot: $('#question-dim-dot'),
    questionDimLabel: $('#question-dim-label'),
    questionText: $('#question-text'),
    options: $('#options'),
    btnPrev: $('#btn-prev'),
    btnNext: $('#btn-next'),
    btnNextText: $('#btn-next-text'),
    radarCanvas: $('#radarChart'),
    resultTitle: $('#result-title'),
    resultSubtitle: $('#result-subtitle'),
    resultIcon: $('#result-icon'),
    resultScores: $('#dimension-scores'),
    resultAnalysis: $('#result-analysis')
  };

  // ===== 页面切换 =====
  function showPage(pageId) {
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages[pageId].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===== 题目渲染 =====
  function renderQuestion(index) {
    const q = QUESTIONS[index];
    const dim = DIMENSIONS[q.dimension];
    const isFirst = index === 0;
    const isLast = index === state.totalQuestions - 1;
    const hasAnswer = state.answers[index] !== null;

    // 进度
    const pct = Math.round(((index + 1) / state.totalQuestions) * 100);
    elements.progressText.textContent = `第 ${index + 1} / ${state.totalQuestions} 题`;
    elements.progressPercent.textContent = `${pct}%`;
    elements.progressFill.style.width = `${pct}%`;

    // 维度指示器
    elements.dimensionIndicator.innerHTML = `
      <span class="dim-dot" style="background:${dim.color}"></span>
      ${dim.label}
    `;

    // 题目编号与维度
    elements.questionDimDot.style.background = dim.color;
    elements.questionDimLabel.textContent = dim.label;
    elements.questionDimLabel.style.color = dim.color;
    elements.questionNumber.textContent = `Q${q.id}`;

    // 题目文本
    elements.questionText.textContent = q.text;

    // 选项列表（5级评分）
    const labels = [
      { value: 5, text: '非常符合', desc: '这说得就是我' },
      { value: 4, text: '比较符合', desc: '与我的情况比较一致' },
      { value: 3, text: '一般', desc: '没有明确倾向' },
      { value: 2, text: '不太符合', desc: '与我的情况不太一样' },
      { value: 1, text: '非常不符合', desc: '完全不是这样' }
    ];

    elements.options.innerHTML = labels.map(opt => `
      <div class="option ${hasAnswer && state.answers[index] === opt.value ? 'selected' : ''}"
           data-value="${opt.value}">
        <div class="option-radio"></div>
        <div class="option-label">
          <strong>${opt.text}</strong>
          <br><span style="font-weight:400;font-size:0.85rem;color:var(--text-secondary)">${opt.desc}</span>
        </div>
      </div>
    `).join('');

    // 选项点击事件
    $$('.option', elements.options).forEach(el => {
      el.addEventListener('click', () => {
        const value = parseInt(el.dataset.value);
        state.answers[index] = value;

        // 更新选中样式
        $$('.option', elements.options).forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');

        // 更新按钮状态
        updateButtons();

        // 延迟自动跳转到下一题
        if (!isLast) {
          clearTimeout(state._autoAdvanceTimer);
          state._autoAdvanceTimer = setTimeout(() => {
            goToNext();
          }, 600);
        }
      });
    });

    // 按钮状态
    elements.btnPrev.disabled = isFirst;
    updateButtons();

    // 下一题按钮文字
    elements.btnNextText.textContent = isLast ? '查看结果' : '下一题';
  }

  function updateButtons() {
    const hasAnswer = state.answers[state.currentQuestion] !== null;
    elements.btnNext.disabled = !hasAnswer;
  }

  // ===== 导航逻辑 =====
  function goToNext() {
    if (state.currentQuestion < state.totalQuestions - 1) {
      state.currentQuestion++;
      renderQuestion(state.currentQuestion);
    } else {
      // 所有题目完成，计算并显示结果
      calculateAndShowResults();
    }
  }

  function goToPrev() {
    if (state.currentQuestion > 0) {
      state.currentQuestion--;
      renderQuestion(state.currentQuestion);
    }
  }

  // ===== 评分计算 =====
  function calculateScores() {
    const scores = {};
    Object.keys(DIMENSIONS).forEach(key => { scores[key] = 0; });

    QUESTIONS.forEach((q, i) => {
      const answer = state.answers[i];
      if (answer !== null) {
        scores[q.dimension] += answer;
      }
    });

    return scores;
  }

  // ===== 雷达图绘制 =====
  function drawRadarChart(scores) {
    const canvas = elements.radarCanvas;
    const container = canvas.parentElement;
    const size = Math.min(container.clientWidth - 48, 400);
    const dpr = window.devicePixelRatio || 1;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.38;

    const dims = Object.keys(DIMENSIONS);
    const angleStep = (Math.PI * 2) / dims.length;
    const startAngle = -Math.PI / 2; // 12点钟方向开始

    // 计算每个维度的百分比得分
    const scoreValues = dims.map(d => formatScore(scores[d]) / 100);

    // 获取角度
    function getPoint(angle, ratio) {
      return {
        x: centerX + radius * ratio * Math.cos(angle),
        y: centerY + radius * ratio * Math.sin(angle)
      };
    }

    function getAngle(index) {
      return startAngle + index * angleStep;
    }

    // === 背景网格（5层） ===
    for (let level = 1; level <= 5; level++) {
      const ratio = level / 5;
      ctx.beginPath();
      for (let i = 0; i <= dims.length; i++) {
        const angle = getAngle(i % dims.length);
        const pt = getPoint(angle, ratio);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
      if (ctx.setLineDash) ctx.setLineDash([]);
    }

    // === 轴线 ===
    for (let i = 0; i < dims.length; i++) {
      const angle = getAngle(i);
      const pt = getPoint(angle, 1);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(pt.x, pt.y);
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // === 维度标签 ===
    ctx.font = 'bold 11px -apple-system, "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < dims.length; i++) {
      const angle = getAngle(i);
      const labelRadius = radius * 1.18;
      const pt = getPoint(angle, labelRadius / radius);
      const dim = DIMENSIONS[dims[i]];
      ctx.fillStyle = dim.color;
      ctx.fillText(dim.label, pt.x, pt.y);
    }

    // === 数据多边形（填充） ===
    ctx.beginPath();
    for (let i = 0; i <= dims.length; i++) {
      const idx = i % dims.length;
      const angle = getAngle(idx);
      const pt = getPoint(angle, scoreValues[idx]);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();

    const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    grad.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
    grad.addColorStop(1, 'rgba(99, 102, 241, 0.4)');
    ctx.fillStyle = grad;
    ctx.fill();

    // === 数据多边形（描边） ===
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.7)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // === 数据点 ===
    for (let i = 0; i < dims.length; i++) {
      const angle = getAngle(i);
      const pt = getPoint(angle, scoreValues[i]);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = DIMENSIONS[dims[i]].color;
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  // ===== 结果渲染 =====
  function renderResults(report) {
    const { sortedDimensions, topDimension, combo, uniqueCareers, uniqueMajors, uniqueWorkTypes, scores } = report;
    const primaryResult = RESULT_TYPES.find(r => r.id === topDimension.id);

    // 标题
    elements.resultIcon.textContent = primaryResult.icon;
    elements.resultTitle.textContent = `你的核心类型：${primaryResult.label}`;
    elements.resultSubtitle.textContent = `你的性格画像偏向「${primaryResult.label}」，一起来看看详细分析吧！`;
    elements.resultTitle.style.color = primaryResult.color;

    // === 维度得分 ===
    const scoresHtml = sortedDimensions.map(d => {
      const level = getScoreLevel(scores[d.id]);
      const pct = formatScore(scores[d.id]);
      return `
        <div class="dim-score-card">
          <div class="dim-score-header">
            <span class="dim-icon">${d.icon}</span>
            <span class="dim-label" style="color:${d.color}">${d.label}</span>
          </div>
          <div class="dim-score-bar-track">
            <div class="dim-score-bar-fill" style="background:${d.color};width:${pct}%"></div>
          </div>
          <div class="dim-score-value">
            <span>${pct}分</span>
            <span class="level">${level.label}</span>
          </div>
        </div>
      `;
    }).join('');

    // === 主要分析 ===
    let mainHtml = `
      <div class="result-section" style="border-left: 4px solid ${primaryResult.color};">
        <div class="result-tag" style="color:${primaryResult.color};background:${primaryResult.color}12;">
          ${primaryResult.icon} 核心类型
        </div>
        <div class="slogan" style="color:${primaryResult.color}">${primaryResult.slogan}</div>
        <p>${primaryResult.description}</p>
      </div>
    `;

    // === 组合推荐 ===
    if (combo) {
      const topTwo = report.topTwo;
      mainHtml += `
        <div class="result-section">
          <div class="result-tag">🌟 你的复合类型</div>
          <div class="combo-badge">
            ${topTwo[0].icon} ${topTwo[0].label} + ${topTwo[1].icon} ${topTwo[1].label}
          </div>
          <h3>${combo.title}</h3>
          <p>${combo.desc}</p>
          <h4 style="margin-top:16px;">组合推荐专业</h4>
          <p>${combo.majors}</p>
          <h4 style="margin-top:12px;">组合推荐职业</h4>
          <div class="tag-cloud">
            ${combo.combinedTypes.map(c => `<span class="tag">${c}</span>`).join('')}
          </div>
        </div>
      `;
    }

    // === 推荐职业 ===
    mainHtml += `
      <div class="result-section">
        <div class="result-tag">💼 推荐职业方向</div>
        <h3>你适合的工作</h3>
        <div class="tag-cloud">
          ${uniqueCareers.map(c => `<span class="tag">${c}</span>`).join('')}
        </div>
      </div>
    `;

    // === 工作类型 ===
    const workTypeClass = (wt) => {
      if (wt.includes('工程师')) return 'engineer';
      if (wt.includes('技术员')) return 'technician';
      if (wt.includes('科研')) return 'researcher';
      if (wt.includes('创意') || wt.includes('自由') || wt.includes('文创')) return 'creative';
      if (wt.includes('白领')) return 'white-collar';
      if (wt.includes('蓝领')) return 'blue-collar';
      if (wt.includes('教师')) return 'teacher';
      if (wt.includes('公务员')) return 'government';
      if (wt.includes('创业')) return 'entrepreneur';
      if (wt.includes('自由')) return 'freelancer';
      return '';
    };

    mainHtml += `
      <div class="result-section">
        <div class="result-tag">👔 适合的工作类型</div>
        <h3>你适合做哪种类型的工作？</h3>
        <div class="tag-cloud">
          ${uniqueWorkTypes.map(wt => `<span class="worktype-tag ${workTypeClass(wt)}">${wt}</span>`).join('')}
        </div>
      </div>
    `;

    // === 推荐专业 ===
    mainHtml += `
      <div class="result-section">
        <div class="result-tag">🎓 推荐专业门类</div>
        <h3>填报志愿参考——适合你的大学专业</h3>
        <div class="tag-cloud">
          ${uniqueMajors.map(m => `<span class="tag">${m}</span>`).join('')}
        </div>
      </div>
    `;

    // === 填报建议 ===
    mainHtml += `
      <div class="result-section" style="border-left: 4px solid ${primaryResult.color};">
        <div class="result-tag" style="color:${primaryResult.color};background:${primaryResult.color}12;">
          💡 个性化填报建议
        </div>
        <p>${primaryResult.advice}</p>
      </div>
    `;

    // === 温馨提示 ===
    mainHtml += `
      <div class="result-section" style="background:#fefce8;border-color:#fef08a;">
        <div class="result-tag" style="color:#92400e;background:#fef3c7;">📝 温馨提示</div>
        <p style="font-size:0.9rem;color:#713f12;">
          本测试的结果仅供参考，是帮助你更好地了解自己的一个工具。填报志愿时，还需要综合考虑高考分数、学校排名、地理位置、就业前景、家庭情况等多方面因素。<br><br>
          <strong>祝你填报顺利，进入理想大学！🎉</strong>
        </p>
      </div>
    `;

    elements.resultScores.innerHTML = scoresHtml;
    elements.resultAnalysis.innerHTML = mainHtml;
  }

  // ===== 计算并显示结果 =====
  function calculateAndShowResults() {
    const scores = calculateScores();
    const report = generateReport(scores);

    showPage('result');

    // 绘制雷达图
    setTimeout(() => {
      drawRadarChart(scores);
    }, 100);

    // 渲染结果内容
    renderResults(report);
  }

  // ===== 重新开始 =====
  function resetTest() {
    state.currentQuestion = 0;
    state.answers = new Array(QUESTIONS.length).fill(null);
    showPage('welcome');
  }

  // ===== 窗口resize处理 =====
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (pages.result.classList.contains('active')) {
        drawRadarChart(calculateScores());
      }
    }, 200);
  });

  // ===== 初始化 =====
  function init() {
    // 事件绑定
    $('#btn-start').addEventListener('click', () => {
      showPage('test');
      renderQuestion(0);
    });

    elements.btnPrev.addEventListener('click', goToPrev);
    elements.btnNext.addEventListener('click', goToNext);
    $('#btn-restart').addEventListener('click', resetTest);
    $('#btn-retry').addEventListener('click', resetTest);

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
      if (pages.test.classList.contains('active')) {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          if (!elements.btnPrev.disabled) goToPrev();
        }
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          if (!elements.btnNext.disabled) goToNext();
        }
        // 数字快捷键 1-5 选择选项
        if (e.key >= '1' && e.key <= '5') {
          const idx = parseInt(e.key) - 1;
          const opts = $$('.option', elements.options);
          if (opts[idx]) opts[idx].click();
        }
      }
    });

    // 显示欢迎页
    showPage('welcome');
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
