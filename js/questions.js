/**
 * 高考志愿性格测试 — 题库定义
 * 基于霍兰德职业兴趣理论（RIASEC）本土化改编
 * 6大维度 × 5道题 = 30题
 */

const DIMENSIONS = {
  practical: {
    id: 'practical',
    label: '实践操作型',
    icon: '🔧',
    color: '#FF6B35',
    desc: '你喜欢动手操作、使用工具、在户外或现场工作。'
  },
  investigative: {
    id: 'investigative',
    label: '研究探索型',
    icon: '🔬',
    color: '#004E89',
    desc: '你喜欢钻研科学原理、分析数据、解决有深度的问题。'
  },
  artistic: {
    id: 'artistic',
    label: '艺术创造型',
    icon: '🎨',
    color: '#9B5DE5',
    desc: '你喜欢创意表达、文学艺术、自由不设限的工作方式。'
  },
  social: {
    id: 'social',
    label: '社会助人型',
    icon: '🤝',
    color: '#00A896',
    desc: '你喜欢帮助他人、与人交流、做有社会价值的事情。'
  },
  enterprising: {
    id: 'enterprising',
    label: '经营影响型',
    icon: '📈',
    color: '#F9C74F',
    desc: '你喜欢领导团队、商业经营、影响和说服他人。'
  },
  conventional: {
    id: 'conventional',
    label: '常规事务型',
    icon: '📋',
    color: '#577590',
    desc: '你喜欢有条理、按规则做事，擅长处理数据和细节。'
  }
};

const QUESTIONS = [
  // === 实践操作型 (practical) Q1-Q5 ===
  {
    id: 1,
    text: '我喜欢动手拆装、修理各种东西（比如电器、模型、家具等）。',
    dimension: 'practical',
    reverse: false
  },
  {
    id: 2,
    text: '比起整天坐在办公室里，我更喜欢到户外活动或去现场工作。',
    dimension: 'practical',
    reverse: false
  },
  {
    id: 3,
    text: '我喜欢使用工具、机械或设备来完成一项任务。',
    dimension: 'practical',
    reverse: false
  },
  {
    id: 4,
    text: '我擅长做精细的手工活或需要身体协调性的工作。',
    dimension: 'practical',
    reverse: false
  },
  {
    id: 5,
    text: '我觉得操作机械、驾驶车辆或使用专业设备很有趣。',
    dimension: 'practical',
    reverse: false
  },

  // === 研究探索型 (investigative) Q6-Q10 ===
  {
    id: 6,
    text: '我对科学原理和自然现象充满好奇，喜欢问"为什么"。',
    dimension: 'investigative',
    reverse: false
  },
  {
    id: 7,
    text: '我喜欢通过数据、图表和逻辑分析来解决问题。',
    dimension: 'investigative',
    reverse: false
  },
  {
    id: 8,
    text: '我喜欢阅读科普书籍、科技文章或学术内容。',
    dimension: 'investigative',
    reverse: false
  },
  {
    id: 9,
    text: '我经常思考抽象的、理论性的问题（比如宇宙、生命、数学等）。',
    dimension: 'investigative',
    reverse: false
  },
  {
    id: 10,
    text: '遇到不懂的问题，我会花时间查资料、研究到底。',
    dimension: 'investigative',
    reverse: false
  },

  // === 艺术创造型 (artistic) Q11-Q15 ===
  {
    id: 11,
    text: '我对文学、音乐、绘画、设计等艺术领域有浓厚的兴趣。',
    dimension: 'artistic',
    reverse: false
  },
  {
    id: 12,
    text: '我喜欢用创意的方式表达自己的想法（写作、画画、拍视频等）。',
    dimension: 'artistic',
    reverse: false
  },
  {
    id: 13,
    text: '我经常有丰富的想象力和灵感，脑子里有很多新点子。',
    dimension: 'artistic',
    reverse: false
  },
  {
    id: 14,
    text: '我喜欢设计、创作或编排（如海报、音乐、舞台、方案等）。',
    dimension: 'artistic',
    reverse: false
  },
  {
    id: 15,
    text: '我对美感比较敏感，很在意事物的外观、设计和氛围。',
    dimension: 'artistic',
    reverse: false
  },

  // === 社会助人型 (social) Q16-Q20 ===
  {
    id: 16,
    text: '我愿意花时间去帮助有困难的人，这让我感到充实。',
    dimension: 'social',
    reverse: false
  },
  {
    id: 17,
    text: '我善于倾听别人的感受，能理解他人的情绪和处境。',
    dimension: 'social',
    reverse: false
  },
  {
    id: 18,
    text: '我喜欢和人交流，用语言或行动去教导、辅导别人。',
    dimension: 'social',
    reverse: false
  },
  {
    id: 19,
    text: '团队协作让我更有动力，我喜欢和大家一起完成目标。',
    dimension: 'social',
    reverse: false
  },
  {
    id: 20,
    text: '看到别人因为我的帮助而进步或开心，我会很有成就感。',
    dimension: 'social',
    reverse: false
  },

  // === 经营影响型 (enterprising) Q21-Q25 ===
  {
    id: 21,
    text: '我擅长说服别人接受我的观点或建议。',
    dimension: 'enterprising',
    reverse: false
  },
  {
    id: 22,
    text: '我喜欢在团队或活动中担任领导角色，带领大家前进。',
    dimension: 'enterprising',
    reverse: false
  },
  {
    id: 23,
    text: '我对商业、管理、创业、市场营销等方面感兴趣。',
    dimension: 'enterprising',
    reverse: false
  },
  {
    id: 24,
    text: '我不害怕竞争和挑战，有挑战反而让我更有干劲。',
    dimension: 'enterprising',
    reverse: false
  },
  {
    id: 25,
    text: '我有比较强的表达能力和感染力，能影响周围的人。',
    dimension: 'enterprising',
    reverse: false
  },

  // === 常规事务型 (conventional) Q26-Q30 ===
  {
    id: 26,
    text: '我喜欢按照清晰的流程和规范来完成工作。',
    dimension: 'conventional',
    reverse: false
  },
  {
    id: 27,
    text: '我做事细致、有条理，对准确性和细节要求比较高。',
    dimension: 'conventional',
    reverse: false
  },
  {
    id: 28,
    text: '我喜欢处理文字、数据或财务资料（整理文件、做表格等）。',
    dimension: 'conventional',
    reverse: false
  },
  {
    id: 29,
    text: '我更喜欢稳定、可预期的工作环境，而不是经常变来变去。',
    dimension: 'conventional',
    reverse: false
  },
  {
    id: 30,
    text: '我擅长做重复性但有规律的工作，能保持专注和耐心。',
    dimension: 'conventional',
    reverse: false
  }
];
