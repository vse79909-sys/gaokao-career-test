/**
 * 安徽高校数据库（2024-2025年参考录取数据）
 * 基于安徽省2026年高考一分一档表数据校准
 * 数据仅供参考，实际录取以安徽省教育招生考试院公布为准
 * 物理类考生约28.5万（≥201分），历史类考生约15.9万（≥201分）
 */

const ANHUI_UNIVERSITIES = [
  // ===== 985 / 顶尖 =====
  {
    name: '中国科学技术大学',
    city: '合肥',
    tier: '985/双一流',
    type: '理工',
    admission: { wuli: 700, lishi: null },
    dimensions: ['investigative', 'practical'],
    features: ['理科研究', '科技创新', '人工智能'],
    highlight: '华东五校之一，科研实力全国顶尖',
    intro: '以尖端科研闻名的世界一流大学，适合热爱科学研究、数理基础扎实的同学。'
  },

  // ===== 211 / 双一流 =====
  {
    name: '合肥工业大学',
    city: '合肥',
    tier: '211/双一流',
    type: '理工',
    admission: { wuli: 7000, lishi: null },
    dimensions: ['practical', 'investigative', 'conventional'],
    features: ['机械工程', '车辆工程', '计算机', '电气工程'],
    highlight: '教育部直属工科强校，有合肥校区和宣城校区',
    intro: '老牌工科院校，工程实践能力培养出色，毕业生就业率高。'
  },
  {
    name: '合肥工业大学（宣城校区）',
    city: '宣城',
    tier: '211/双一流',
    type: '理工',
    admission: { wuli: 15000, lishi: null },
    dimensions: ['practical', 'investigative', 'conventional'],
    features: ['机械工程', '计算机', '材料科学'],
    highlight: '合工大分校区，毕业证与本部一致',
    intro: '与合肥校区同标准办学，享受合工大211平台资源，性价比较高。'
  },
  {
    name: '安徽大学',
    city: '合肥',
    tier: '211/双一流',
    type: '综合',
    admission: { wuli: 16000, lishi: 4500 },
    dimensions: ['investigative', 'enterprising', 'conventional'],
    features: ['计算机科学', '法学', '经济学', '电子信息'],
    highlight: '安徽省属唯一的211综合性大学',
    intro: '文理工综合发展，计算机和电子信息是其王牌专业。'
  },

  // ===== 省重点公办本科 =====
  {
    name: '安徽医科大学',
    city: '合肥',
    tier: '省重点',
    type: '医药',
    admission: { wuli: 25000, lishi: null },
    dimensions: ['investigative', 'social', 'conventional'],
    features: ['临床医学', '药学', '预防医学', '护理学'],
    highlight: '安徽省医学教育的领头羊',
    intro: '安徽省最好的医学院校，临床医学专业就业前景好。'
  },
  {
    name: '安徽师范大学',
    city: '芜湖',
    tier: '省重点',
    type: '师范',
    admission: { wuli: 32000, lishi: 8000 },
    dimensions: ['social', 'artistic', 'investigative'],
    features: ['教育学', '心理学', '汉语言文学', '数学'],
    highlight: '安徽省师范教育的最高学府',
    intro: '培养教师的摇篮，文科理科底蕴深厚，校园环境优美。'
  },
  {
    name: '安徽财经大学',
    city: '蚌埠',
    tier: '省重点',
    type: '财经',
    admission: { wuli: 38000, lishi: 12000 },
    dimensions: ['enterprising', 'conventional', 'social'],
    features: ['会计学', '金融学', '经济学', '工商管理'],
    highlight: '华东地区知名财经院校',
    intro: '安徽省唯一的财经类大学，会计金融类专业实力突出。'
  },
  {
    name: '安徽工业大学',
    city: '马鞍山',
    tier: '省重点',
    type: '理工',
    admission: { wuli: 42000, lishi: null },
    dimensions: ['practical', 'conventional', 'enterprising'],
    features: ['冶金工程', '材料科学', '电气自动化', '工商管理'],
    highlight: '以工学为主、多学科协调发展的省属重点大学',
    intro: '传统工科强校，冶金材料特色鲜明，近年向综合方向转型。'
  },
  {
    name: '安徽理工大学',
    city: '淮南',
    tier: '省重点',
    type: '理工',
    admission: { wuli: 50000, lishi: null },
    dimensions: ['practical', 'investigative', 'conventional'],
    features: ['安全工程', '矿业工程', '土木工程', '机械工程'],
    highlight: '安徽省属重点理工科大学',
    intro: '安全工程和矿业工程全国领先，工科基础扎实。'
  },
  {
    name: '安徽农业大学',
    city: '合肥',
    tier: '省重点',
    type: '农林',
    admission: { wuli: 52000, lishi: 16000 },
    dimensions: ['practical', 'investigative', 'social'],
    features: ['农学', '生物科学', '食品科学', '茶学'],
    highlight: '安徽省唯一省属重点农业大学',
    intro: '农林生物类学科优势明显，茶学专业全国知名。'
  },
  {
    name: '安徽建筑大学',
    city: '合肥',
    tier: '省重点',
    type: '理工',
    admission: { wuli: 55000, lishi: null },
    dimensions: ['practical', 'artistic', 'conventional'],
    features: ['建筑学', '土木工程', '城乡规划', '工程管理'],
    highlight: '安徽省建筑类最高学府',
    intro: '建筑土木类专业的首选，注重工程实践能力培养。'
  },
  {
    name: '安徽中医药大学',
    city: '合肥',
    tier: '省重点',
    type: '医药',
    admission: { wuli: 62000, lishi: 20000 },
    dimensions: ['social', 'investigative', 'conventional'],
    features: ['中医学', '针灸推拿', '中药学', '护理学'],
    highlight: '安徽省中医药人才培养基地',
    intro: '融合传统中医药与现代医学，中医类专业全国有影响力。'
  },
  {
    name: '蚌埠医科大学',
    city: '蚌埠',
    tier: '省属',
    type: '医药',
    admission: { wuli: 58000, lishi: null },
    dimensions: ['social', 'investigative'],
    features: ['临床医学', '医学检验', '护理学', '药学'],
    highlight: '原蚌埠医学院，皖北医学教育中心',
    intro: '临床医学底蕴深厚，医学检验专业特色鲜明。'
  },
  {
    name: '皖南医学院',
    city: '芜湖',
    tier: '省属',
    type: '医药',
    admission: { wuli: 64000, lishi: null },
    dimensions: ['social', 'investigative'],
    features: ['临床医学', '麻醉学', '医学影像', '口腔医学'],
    highlight: '皖南地区医学教育中心',
    intro: '麻醉学和医学影像专业省内领先，适合学医的同学。'
  },
  {
    name: '安徽工程大学',
    city: '芜湖',
    tier: '省属',
    type: '理工',
    admission: { wuli: 72000, lishi: null },
    dimensions: ['practical', 'artistic', 'enterprising'],
    features: ['机械工程', '纺织工程', '艺术设计', '计算机'],
    highlight: '以工为主，工、理、文、艺多学科协调发展',
    intro: '工科基础扎实，设计专业（服装/视传）有特色，就业率不错。'
  },
  {
    name: '合肥大学',
    city: '合肥',
    tier: '省属',
    type: '综合',
    admission: { wuli: 78000, lishi: 18000 },
    dimensions: ['enterprising', 'conventional', 'practical'],
    features: ['电子信息', '工商管理', '原材料', '旅游管理'],
    highlight: '合肥市属综合性大学，原合肥学院',
    intro: '地理位置优越，应用型人才培养，电子信息类专业有特色。'
  },

  // ===== 其他公办本科 =====
  {
    name: '安庆师范大学',
    city: '安庆',
    tier: '省属',
    type: '师范',
    admission: { wuli: 88000, lishi: 22000 },
    dimensions: ['social', 'artistic', 'conventional'],
    features: ['教育学', '汉语言文学', '英语', '化学'],
    highlight: '皖西南地区师范教育中心',
    intro: '百年师范名校，文科底蕴深厚，适合想当老师的同学。'
  },
  {
    name: '淮北师范大学',
    city: '淮北',
    tier: '省属',
    type: '师范',
    admission: { wuli: 95000, lishi: 24000 },
    dimensions: ['social', 'conventional'],
    features: ['教育学', '数学', '化学', '计算机'],
    highlight: '皖北地区师范教育中心',
    intro: '师范类专业为主，化学和数学学科有较强的师资力量。'
  },
  {
    name: '阜阳师范大学',
    city: '阜阳',
    tier: '省属',
    type: '师范',
    admission: { wuli: 102000, lishi: 26000 },
    dimensions: ['social', 'conventional', 'artistic'],
    features: ['教育学', '汉语言文学', '生物科学', '体育教育'],
    highlight: '皖北最大规模的师范类大学',
    intro: '招生规模大，师范类专业齐全，地方基础教育师资的重要来源。'
  },
  {
    name: '安徽科技学院',
    city: '滁州（凤阳）',
    tier: '省属',
    type: '理工',
    admission: { wuli: 115000, lishi: null },
    dimensions: ['practical', 'conventional'],
    features: ['农学', '动物科学', '机械电子'],
    highlight: '应用型本科院校',
    intro: '农学、动物科学等专业有特色，注重实践技能培养。'
  },
  {
    name: '滁州学院',
    city: '滁州',
    tier: '省属',
    type: '综合',
    admission: { wuli: 120000, lishi: 30000 },
    dimensions: ['conventional', 'enterprising', 'social'],
    features: ['物联网工程', '食品质量', '旅游管理'],
    highlight: '紧邻南京的皖东综合性院校',
    intro: '地理位优越，物联网工程等新兴专业发展势头好。'
  },
  {
    name: '皖西学院',
    city: '六安',
    tier: '省属',
    type: '综合',
    admission: { wuli: 128000, lishi: 32000 },
    dimensions: ['conventional', 'social'],
    features: ['土木工程', '电子信息', '旅游管理'],
    highlight: '皖西地区唯一的本科院校',
    intro: '应用型本科，土木和电子信息是优势专业。'
  },
  {
    name: '黄山学院',
    city: '黄山',
    tier: '省属',
    type: '综合',
    admission: { wuli: 132000, lishi: 34000 },
    dimensions: ['artistic', 'social', 'conventional'],
    features: ['旅游管理', '园林', '烹饪与营养', '日语'],
    highlight: '坐落在国际旅游城市的特色院校',
    intro: '旅游和园林专业有地域优势，校园环境优美。'
  },
  {
    name: '巢湖学院',
    city: '合肥（巢湖）',
    tier: '省属',
    type: '综合',
    admission: { wuli: 136000, lishi: 36000 },
    dimensions: ['conventional', 'social', 'enterprising'],
    features: ['计算机科学', '旅游管理', '体育教育'],
    highlight: '紧邻合肥的综合性本科院校',
    intro: '离合肥近，计算机专业近年发展较快。'
  },
  {
    name: '淮南师范学院',
    city: '淮南',
    tier: '省属',
    type: '师范',
    admission: { wuli: 140000, lishi: 35000 },
    dimensions: ['social', 'conventional'],
    features: ['教育学', '小学教育', '计算机', '英语'],
    highlight: '皖北地区师范教育重要基地',
    intro: '师范类专业为主，小学教育有特色。'
  },
  {
    name: '池州学院',
    city: '池州',
    tier: '省属',
    type: '综合',
    admission: { wuli: 146000, lishi: 38000 },
    dimensions: ['conventional', 'social', 'artistic'],
    features: ['资源环境', '旅游管理', '学前教育'],
    highlight: '皖南地区的综合性本科院校',
    intro: '生态环保和旅游方向有特色，学前教育专业有优势。'
  },
  {
    name: '宿州学院',
    city: '宿州',
    tier: '省属',
    type: '综合',
    admission: { wuli: 150000, lishi: 40000 },
    dimensions: ['conventional', 'practical'],
    features: ['应用化学', '地质工程', '计算机'],
    highlight: '皖北地区综合性本科院校',
    intro: '应用化学和地质工程有特色，应用型本科定位。'
  },
  {
    name: '铜陵学院',
    city: '铜陵',
    tier: '省属',
    type: '财经',
    admission: { wuli: 155000, lishi: 41000 },
    dimensions: ['enterprising', 'conventional'],
    features: ['会计学', '金融学', '财务管理', '国际经济与贸易'],
    highlight: '以财经为特色的应用型本科院校',
    intro: '财经类专业在省内有较好口碑，适合想学财会的同学。'
  },
  {
    name: '亳州学院',
    city: '亳州',
    tier: '省属',
    type: '综合',
    admission: { wuli: 160000, lishi: 42000 },
    dimensions: ['conventional', 'social'],
    features: ['中药学', '学前教育', '文化产业管理'],
    highlight: '皖北年轻本科院校',
    intro: '亳州是全国中药材基地，中药类专业有特色。'
  },

  // ===== 民办本科 =====
  {
    name: '安徽新华学院',
    city: '合肥',
    tier: '民办',
    type: '综合',
    admission: { wuli: 175000, lishi: 45000 },
    dimensions: ['enterprising', 'conventional', 'practical'],
    features: ['计算机', '电子信息', '土木工程', '经济管理'],
    highlight: '安徽省最大的民办本科院校之一',
    intro: '位于合肥，校园大、专业全，注重应用型人才培养。'
  },
  {
    name: '安徽三联学院',
    city: '合肥',
    tier: '民办',
    type: '综合',
    admission: { wuli: 178000, lishi: 47000 },
    dimensions: ['enterprising', 'conventional', 'social'],
    features: ['交通运输', '计算机', '会计', '护理'],
    highlight: '安徽省第一所民办本科高校',
    intro: '交通运输和护理是特色专业，应用型办学定位。'
  },
  {
    name: '皖江工学院',
    city: '马鞍山',
    tier: '民办',
    type: '理工',
    admission: { wuli: 182000, lishi: null },
    dimensions: ['practical', 'conventional'],
    features: ['水利工程', '土木工程', '机械工程'],
    highlight: '原河海大学文天学院转设',
    intro: '水利水电工程有行业背景，工科专业有河海大学传承。'
  },
  {
    name: '安徽文达信息工程学院',
    city: '合肥',
    tier: '民办',
    type: '理工',
    admission: { wuli: 185000, lishi: null },
    dimensions: ['practical', 'enterprising'],
    features: ['计算机', '软件工程', '数字媒体'],
    highlight: 'IT类特色民办院校',
    intro: '计算机和软件工程是核心专业，适合想学IT的同学。'
  }
];

/**
 * 获取用户可见的高校列表（不含仅物理/历史类不招生的学校）
 */
function getFilteredUniversities(subject) {
  return ANHUI_UNIVERSITIES.filter(u => u.admission[subject] !== null);
}

/**
 * 核心匹配算法：根据考生位次和性格测试结果推荐高校
 */
function matchUniversities(rank, subject, scores) {
  const allUnis = getFilteredUniversities(subject);

  // 获取考生性格维度排序
  const sortedDims = Object.keys(DIMENSIONS)
    .map(id => ({ id, score: scores[id] }))
    .sort((a, b) => b.score - a.score);

  const topDimIds = sortedDims.slice(0, 3).map(d => d.id);

  // 为每所高校计算匹配分数
  const scored = allUnis.map(uni => {
    const threshold = uni.admission[subject];

    // 1. 位次匹配度
    let rankScore = 0;
    let matchLevel = '';
    if (rank <= threshold * 0.85) {
      rankScore = 100 - (rank / (threshold * 0.85)) * 20; // 保
      matchLevel = '保';
    } else if (rank <= threshold * 1.00) {
      rankScore = 70 - ((rank - threshold * 0.85) / (threshold * 0.15)) * 30; // 稳
      matchLevel = '稳';
    } else if (rank <= threshold * 1.15) {
      rankScore = 40 - ((rank - threshold * 1.00) / (threshold * 0.15)) * 20; // 冲
      matchLevel = '冲';
    } else if (rank <= threshold * 1.25) {
      rankScore = 15;
      matchLevel = '冲';
    } else {
      rankScore = 0;
      matchLevel = '';
    }

    // 2. 性格匹配度
    let dimScore = 0;
    uni.dimensions.forEach(dim => {
      const idx = topDimIds.indexOf(dim);
      if (idx === 0) dimScore += 15;
      else if (idx === 1) dimScore += 10;
      else if (idx === 2) dimScore += 5;
      else dimScore += 2;
    });

    // 综合得分 = 位次权重0.7 + 性格权重0.3
    const totalScore = rankScore * 0.7 + dimScore;

    return { ...uni, rankScore, dimScore, totalScore, matchLevel, threshold };
  });

  // 筛选有匹配度的学校
  const matched = scored.filter(u => u.matchLevel !== '' && u.totalScore > 10);

  // 排序：先按匹配级别优先，再按综合得分
  const levelOrder = { '冲': 0, '稳': 1, '保': 2 };
  matched.sort((a, b) => {
    if (levelOrder[a.matchLevel] !== levelOrder[b.matchLevel]) {
      return levelOrder[a.matchLevel] - levelOrder[b.matchLevel];
    }
    return b.totalScore - a.totalScore;
  });

  // 取 Top 12
  return matched.slice(0, 12);
}

/**
 * 获取匹配结果统计
 */
function getMatchStats(rank, subject) {
  const matched = matchUniversities(rank, subject, {});
  return {
    reach: matched.filter(u => u.matchLevel === '冲').length,
    target: matched.filter(u => u.matchLevel === '稳').length,
    safe: matched.filter(u => u.matchLevel === '保').length
  };
}

/**
 * 数据来源说明
 */
const UNIVERSITY_DATA_NOTE = '本平台高校录取数据基于2025年和2026年安徽省新高考公开信息整理，仅供参考。实际录取位次以安徽省教育招生考试院公布为准。';


