/**
 * 高考志愿性格测试 — 结果分析引擎
 * 根据6大维度得分，生成综合评估报告
 */

const RESULT_TYPES = [
  {
    id: 'practical',
    label: '实践操作型',
    icon: '🔧',
    color: '#FF6B35',
    slogan: '动手创造世界',
    careers: ['机械/电气工程师', '建筑施工/工程管理', '农业技术专家', '手工艺人/匠人', '汽车/航空维修技师', '地质/测绘工程师'],
    majors: ['工学（机械/土木/电气/建筑/交通）', '农学（植物/动物/园林）', '工学（地质/测绘/矿业）'],
    workTypes: ['工程师', '技术员', '蓝领专家'],
    description: '你是一个"行动派"！你喜欢通过实际操作来解决问题，不习惯整天坐着空想。你用双手和工具创造价值，享受看得见、摸得着的成果。在未来的职业道路上，那些需要动手能力、现场经验和实践技能的领域，会让你如鱼得水。',
    advice: '填报志愿时，重点关注工学门类下的实践性专业。可以考虑有实习基地、实验条件好的工科院校。如果分数允许，"新工科"方向（智能制造、机器人、新能源汽车等）将是很好的选择。'
  },
  {
    id: 'investigative',
    label: '研究探索型',
    icon: '🔬',
    color: '#004E89',
    slogan: '探索未知边界',
    careers: ['科研人员（物理/化学/生物）', '数据分析师/算法工程师', '医生/医学研究员', '大学教授/研究员', '软件工程师/程序员', '市场研究分析师'],
    majors: ['理学（数学/物理/化学/生物/天文）', '医学（临床/药学/预防/基础医学）', '工学（计算机/数据科学/AI）', '农学（研究型方向）'],
    workTypes: ['科研人员', '工程师', '技术员（研发类）'],
    description: '你是一个"思考者"！你对世界充满好奇，喜欢追问事物背后的原理。你用逻辑和理性去分析问题，享受智力挑战带来的快感。在未来的职业道路上，那些需要深度思考、持续学习和创新的领域，会让你不断成长。',
    advice: '填报志愿时，理学和医学门类是你的主战场。建议选择有科研实力、有硕博点的大学。如果你对计算机和AI感兴趣，"计算机科学与技术""数据科学"等专业将是热门且有前景的选择。'
  },
  {
    id: 'artistic',
    label: '艺术创造型',
    icon: '🎨',
    color: '#9B5DE5',
    slogan: '用创意点亮世界',
    careers: ['平面/UI/产品设计师', '作家/编辑/记者', '音乐人/编导/制片人', '广告创意/品牌策划', '建筑师/室内设计师', '游戏策划/影视制作'],
    majors: ['艺术学（美术/设计/音乐/表演）', '文学（中文/外语/新闻传播）', '建筑学', '艺术与科技（数字媒体/游戏设计）'],
    workTypes: ['创意工作者', '自由职业者', '白领（文创类）'],
    description: '你是一个"创作者"！你的内心世界丰富而多彩，拥有独特的审美和自由的想象力。你不喜欢被条条框框束缚，渴望用创意和才华去影响世界。在未来的职业道路上，那些需要灵感、审美和表现力的领域，会让你闪闪发光。',
    advice: '填报志愿时，重点关注艺术学、文学和建筑学门类。近年来数字媒体艺术、游戏设计、交互设计等交叉学科发展迅速，既有创意含量又有就业前景，值得考虑。'
  },
  {
    id: 'social',
    label: '社会助人型',
    icon: '🤝',
    color: '#00A896',
    slogan: '温暖他人成就自己',
    careers: ['教师（各学段/各学科）', '医生/护士/康复师', '心理咨询师/社工', '教育培训/教育管理', '公共服务（公务员/事业单位）', '人力资源/客户服务'],
    majors: ['教育学（师范类）', '医学（临床/护理/康复/公卫）', '法学（社会学/心理学）', '管理学（人力资源管理/公共服务）'],
    workTypes: ['白领（社会服务类）', '技术员（医疗类）', '教师'],
    description: '你是一个"守护者"！你心地善良，善于倾听和理解他人。帮助别人对你来说不是负担，而是快乐的来源。在未来的职业道路上，那些与人打交道、以服务他人为核心的领域，会让你找到真正的意义感和成就感。',
    advice: '填报志愿时，教育学和医学门类是主要方向。如果你喜欢稳定的职业，师范类专业和临床医学是不错的选择。如果你对心理和人际关系感兴趣，可以考虑心理学、社会学等专业。'
  },
  {
    id: 'enterprising',
    label: '经营影响型',
    icon: '📈',
    color: '#F9C74F',
    slogan: '引领变革创造价值',
    careers: ['企业管理者/项目经理', '创业者/企业家', '销售经理/市场营销', '公务员/政府管理者', '律师/法务', '金融分析师/投资人'],
    majors: ['管理学（工商/市场/人力/会计）', '经济学（金融/国贸/财税）', '法学（法律）', '文学（新闻/传播/公共关系）'],
    workTypes: ['白领（管理/商务类）', '创业者', '公务员'],
    description: '你是一个"领导者"！你自信、有魄力、敢于担当。你喜欢站在舞台中央，用自己的魅力和能力去影响和带领他人。在未来的职业道路上，那些需要决策力、沟通力和执行力的领域，会让你脱颖而出。',
    advice: '填报志愿时，管理学、经济学和法学是核心方向。如果你有创业梦想，建议选择商科氛围浓厚的大学。同时，法学专业考公务员有天然优势，也是值得考虑的方向。'
  },
  {
    id: 'conventional',
    label: '常规事务型',
    icon: '📋',
    color: '#577590',
    slogan: '稳扎稳打成就可靠',
    careers: ['会计/审计', '行政/文秘', '统计员/数据分析', '银行/保险内勤', '档案管理/图书管理', '公务员（事务类岗位）'],
    majors: ['管理学（会计/审计/财务管理）', '经济学（统计学）', '管理学（行政管理/图书馆学）', '法学（公安学/行政管理）'],
    workTypes: ['白领（事务类）', '公务员', '技术员（数据类）'],
    description: '你是一个"实干家"！你认真细致、稳重可靠，凡事讲究条理和规范。你不追求轰轰烈烈，但求事事靠谱、件件落实。在未来的职业道路上，那些需要耐心、细致和责任心的事务性岗位，会因为你而变得高效有序。',
    advice: '填报志愿时，会计、审计、财务管理等专业是经典选择，就业稳定。行政管理、图书馆学等专业适合考公务员。如果你对数据感兴趣，统计学、信息管理也是不错的选择。'
  }
];

/**
 * 生成组合推荐类型（取得分最高的2个维度组合）
 */
function getCombinationType(topTwo) {
  const comboKey = topTwo.map(d => d.id).sort().join('+');

  const combos = {
    'practical+investigative': {
      title: '工程技术型',
      desc: '你既有动手能力又有钻研精神，是典型的"工程师"苗子！你既能把理论变成实践，又能在实践中不断优化。技术研发、工程管理、产品开发等方向非常适合你。',
      majors: '工学类（计算机/机械/电子/土木/自动化）、理学类（应用物理/应用化学）',
      combinedTypes: ['技术研发工程师', '产品设计师/开发', '质量/工艺工程师']
    },
    'practical+artistic': {
      title: '创意实践型',
      desc: '你既有动手能力又有艺术品味，是能把创意落地的实践者！你可以考虑建筑、景观设计、工业设计、数字媒体等需要"设计思维+动手能力"的复合型领域。',
      majors: '建筑学、设计学（工业设计/环境设计/数字媒体）、艺术与科技',
      combinedTypes: ['建筑/景观设计师', '工业设计师', '游戏美术/技术美术']
    },
    'practical+social': {
      title: '社会服务技术型',
      desc: '你既有动手能力又乐于助人，非常适合医疗、康复、体育教育等与人相关的技术岗位。你不仅能解决实际问题，还能温暖他人。',
      majors: '医学（康复治疗/护理/医学技术）、教育学（体育教育/技术教育）',
      combinedTypes: ['康复治疗师', '医学技术员', '体育教练/技术指导']
    },
    'practical+enterprising': {
      title: '工程管理型',
      desc: '你既有技术功底又有管理潜质，是未来的"技术型管理者"。项目经理、工程管理、技术创业等需要"技术+商业头脑"的复合岗位会让你大放异彩。',
      majors: '管理学（工程管理/项目管理）、工学+管理双学位项目',
      combinedTypes: ['工程项目经理', '技术创业', '产品经理']
    },
    'practical+conventional': {
      title: '技术事务型',
      desc: '你既有动手能力又细心有条理，是技术团队中不可或缺的"可靠高手"。质量控制、工艺管理、设备管理等岗位需要你这样细致的技术人才。',
      majors: '工学（质量管理/工业工程/测控技术）',
      combinedTypes: ['质量控制工程师', '工艺管理', '设备/检测技术员']
    },
    'investigative+artistic': {
      title: '创新研究型',
      desc: '你既有科学头脑又有艺术灵感，思维跨越逻辑与感性的边界。你适合科学研究、用户体验研究、战略咨询等需要创造力和分析力的领域。',
      majors: '新闻传播（数据新闻）、心理学（认知科学）、设计学（用户体验设计）',
      combinedTypes: ['UX研究员', '战略咨询师', '科技/科普作家']
    },
    'investigative+social': {
      title: '人文研究型',
      desc: '你既有研究精神又关心他人，非常适合医学、心理学、教育学等"以人为本"的研究领域。你不仅能发现问题本质，还能把研究成果转化为社会价值。',
      majors: '医学（临床/药学）、心理学、教育学（教育研究/教育技术）',
      combinedTypes: ['医生/医学研究员', '心理咨询师', '教育研究员']
    },
    'investigative+enterprising': {
      title: '商业分析型',
      desc: '你既有分析头脑又有商业嗅觉，是数据驱动决策时代的紧缺人才。数据分析师、金融分析师、市场研究、商业咨询等岗位非常适合你。',
      majors: '经济学（金融/统计/计量经济）、管理学（商业分析/信息管理）',
      combinedTypes: ['数据分析师', '金融分析师', '商业咨询顾问']
    },
    'investigative+conventional': {
      title: '精确研究型',
      desc: '你既有钻研精神又注重细节，是"数据世界里的守门人"。会计审计、数据管理、实验研究等需要严谨态度和深入研究能力的岗位非常适合你。',
      majors: '统计学、管理学（会计/审计）、医学检验/药学',
      combinedTypes: ['审计师', '实验室研究员', '数据质量管理']
    },
    'artistic+social': {
      title: '人文创意型',
      desc: '你既有艺术才华又有社会关怀，是"用创意温暖世界"的人。文化传播、教育培训、公益创意、艺术治疗等方向非常契合你的特质。',
      majors: '文学（新闻传播/广告学）、艺术学（艺术教育/公共艺术）',
      combinedTypes: ['文化创意策划', '艺术教育培训', '传媒/公益传播']
    },
    'artistic+enterprising': {
      title: '创意管理型',
      desc: '你既有创意头脑又有执行力，是"创意产业的操盘手"。品牌策划、广告创意总监、演艺管理、文创创业等岗位非常适合你。',
      majors: '艺术学（艺术管理/文化产业管理）、管理学（市场营销/品牌管理）',
      combinedTypes: ['品牌/营销策划', '文创创业者', '娱乐/演艺管理']
    },
    'artistic+conventional': {
      title: '创意执行型',
      desc: '你既有创意能力又踏实可靠，是团队中"靠谱的创意执行者"。平面设计、排版编辑、UI设计、舞美设计等需要美感+细致的工作很适合你。',
      majors: '艺术学（视觉传达/环境设计）、文学（编辑出版）',
      combinedTypes: ['视觉/UI设计师', '编辑/排版', '展览/舞美设计']
    },
    'social+enterprising': {
      title: '社会管理型',
      desc: '你既有服务意识又有领导能力，是"高情商的管理者"。教育培训管理、医院管理、政府管理、非营利组织管理等领域非常适合你。',
      majors: '管理学（公共管理/教育管理/医院管理）、法学（行政管理/社会学）',
      combinedTypes: ['教育管理者', '公共事务管理', '人力资源总监']
    },
    'social+conventional': {
      title: '社会服务事务型',
      desc: '你既乐于助人又细致负责，是公共服务领域的"可靠使者"。行政管理、社区服务、图书馆学、档案管理、学校行政等岗位很适合你。',
      majors: '管理学（行政管理/图书馆学）、法学（社会工作/公安学）',
      combinedTypes: ['行政/人事专员', '社区/社工服务', '学校管理人员']
    },
    'enterprising+conventional': {
      title: '商务管理型',
      desc: '你既有领导才干又严谨务实，是"企业中的中坚力量"。财务管理、行政总监、项目管理、银行管理等既需要管理能力又需要细致态度的工作非常适合你。',
      majors: '管理学（财务管理/会计/审计）、经济学（金融/税收/国际经济与贸易）',
      combinedTypes: ['财务/审计主管', '银行/金融管理', '行政/运营总监']
    }
  };

  return combos[comboKey] || null;
}

/**
 * 根据6维度得分生成完整结果报告
 */
function generateReport(scores) {
  // 将得分排序
  const sortedDimensions = Object.keys(DIMENSIONS)
    .map(id => ({ id, ...DIMENSIONS[id], score: scores[id] }))
    .sort((a, b) => b.score - a.score);

  const topDimension = sortedDimensions[0];
  const topTwo = sortedDimensions.slice(0, 2);
  const topThree = sortedDimensions.slice(0, 3);

  // 获取对应的结果类型
  const primaryResult = RESULT_TYPES.find(r => r.id === topDimension.id);

  // 获取组合推荐
  const combo = getCombinationType(topTwo);

  // 收集推荐职业（去重）
  const allCareers = [];
  topThree.forEach(d => {
    const rt = RESULT_TYPES.find(r => r.id === d.id);
    if (rt) allCareers.push(...rt.careers);
  });
  const uniqueCareers = [...new Set(allCareers)].slice(0, 8);

  // 收集推荐专业
  const allMajors = [];
  topThree.forEach(d => {
    const rt = RESULT_TYPES.find(r => r.id === d.id);
    if (rt) allMajors.push(...rt.majors);
  });
  const uniqueMajors = [...new Set(allMajors)];

  // 收集工作类型
  const allWorkTypes = [];
  topThree.forEach(d => {
    const rt = RESULT_TYPES.find(r => r.id === d.id);
    if (rt) allWorkTypes.push(...rt.workTypes);
  });
  const uniqueWorkTypes = [...new Set(allWorkTypes)];

  return {
    sortedDimensions,
    topDimension,
    topTwo,
    topThree,
    primaryResult,
    combo,
    uniqueCareers,
    uniqueMajors,
    uniqueWorkTypes,
    scores
  };
}

/**
 * 格式化得分（将原始分数转为百分比，最大25分=100%）
 */
function formatScore(rawScore) {
  return Math.round((rawScore / 25) * 100);
}

/**
 * 获取得分等级
 */
function getScoreLevel(rawScore) {
  const pct = formatScore(rawScore);
  if (pct >= 80) return { label: '非常明显', level: 5 };
  if (pct >= 64) return { label: '比较明显', level: 4 };
  if (pct >= 48) return { label: '中等程度', level: 3 };
  if (pct >= 32) return { label: '稍有倾向', level: 2 };
  return { label: '不太明显', level: 1 };
}
