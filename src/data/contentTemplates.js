export const CONTENT_TEMPLATES = {
  ai_product: {
    name: 'AI 产品拆解',
    defaultTopic: 'CodeX',
    scenes: 'AI 工具、SaaS、效率产品、开发者工具',
    pages: {
      5: ['cover','overview','keyPoints','insights','end'],
      8: ['cover','overview','workflow','capabilities','scenarios','comparison','insights','end'],
      12: ['cover','trend','overview','workflow','capabilities','scenarios','business','comparison','risks','insights','actions','end']
    }
  },
  tool_tutorial: {
    name: '工具教程 / 使用指南',
    defaultTopic: 'Notion AI',
    scenes: '工具教程、软件安利、效率方法',
    pages: {
      5: ['cover','who','steps','tips','end'],
      8: ['cover','who','prepare','steps','advanced','faq','tips','end'],
      12: ['cover','pain','who','prepare','steps','case','advanced','faq','mistakes','tips','checklist','end']
    }
  },
  business_case: {
    name: '商业案例分析',
    defaultTopic: '泡泡玛特',
    scenes: '创业项目、商业模式、增长案例、融资分析',
    pages: {
      5: ['cover','overview','model','growth','end'],
      8: ['cover','overview','model','growth','users','moat','insights','end'],
      12: ['cover','background','overview','model','growth','users','channels','moat','finance','risks','insights','end']
    }
  },
  book_notes: {
    name: '读书笔记 / 知识卡片',
    defaultTopic: '纳瓦尔宝典',
    scenes: '读书笔记、课程总结、知识复盘',
    pages: {
      5: ['cover','about','ideas','quotes','end'],
      8: ['cover','about','ideas','model','quotes','reflection','actions','end'],
      12: ['cover','why','about','ideas','idea2','model','quotes','case','reflection','actions','mindmap','end']
    }
  },
  travel_guide: {
    name: '旅行攻略 / City Walk',
    defaultTopic: '京都三日游',
    scenes: '旅行攻略、探店路线、城市漫游',
    pages: {
      5: ['cover','overview','route','tips','end'],
      8: ['cover','overview','route','spots','food','budget','tips','end'],
      12: ['cover','overview','day1','day2','day3','spots','food','photo','transport','budget','tips','end']
    }
  },
  growth_method: {
    name: '个人成长 / 方法论',
    defaultTopic: '高效复盘法',
    scenes: '职场成长、学习方法、复盘清单、效率提升',
    pages: {
      5: ['cover','problem','method','checklist','end'],
      8: ['cover','problem','principle','method','example','mistakes','checklist','end'],
      12: ['cover','background','problem','principle','method','step1','step2','step3','example','mistakes','checklist','end']
    }
  },
  beauty_skincare: {
    name: '美妆护肤 / 好物种草',
    defaultTopic: '早 C 晚 A 护肤流程',
    scenes: '护肤流程、美妆测评、好物合集、成分科普',
    pages: {
      5: ['cover','pain','routine','tips','end'],
      8: ['cover','pain','routine','ingredients','steps','mistakes','recommend','end'],
      12: ['cover','skinType','pain','routine','morning','night','ingredients','steps','mistakes','recommend','checklist','end']
    }
  },
  fitness_weightloss: {
    name: '健身减脂 / 饮食计划',
    defaultTopic: '7 天减脂入门计划',
    scenes: '健身计划、减脂餐、运动打卡、体态改善',
    pages: {
      5: ['cover','goal','plan','food','end'],
      8: ['cover','goal','principle','plan','training','food','mistakes','end'],
      12: ['cover','background','goal','principle','plan','training','food','day1','day2','day3','mistakes','end']
    }
  },
  food_review: {
    name: '探店美食 / 菜单攻略',
    defaultTopic: '上海周末 Brunch 探店',
    scenes: '餐厅探店、美食合集、菜单推荐、城市生活',
    pages: {
      5: ['cover','overview','menu','tips','end'],
      8: ['cover','overview','environment','menu','mustOrder','price','tips','end'],
      12: ['cover','overview','location','environment','menu','mustOrder','taste','photo','price','transport','tips','end']
    }
  },
  parenting: {
    name: '母婴育儿 / 成长指南',
    defaultTopic: '宝宝辅食添加攻略',
    scenes: '育儿经验、辅食攻略、亲子教育、母婴好物',
    pages: {
      5: ['cover','problem','principle','checklist','end'],
      8: ['cover','age','problem','principle','steps','mistakes','checklist','end'],
      12: ['cover','age','problem','principle','prepare','steps','food','schedule','mistakes','faq','checklist','end']
    }
  },
  industry_report: {
    name: '行业报告 / 趋势洞察',
    defaultTopic: '2026 AI Agent 行业趋势',
    scenes: '行业研究、趋势报告、投资分析、市场洞察',
    pages: {
      5: ['cover','background','trend','opportunity','end'],
      8: ['cover','background','market','trend','players','opportunity','risks','end'],
      12: ['cover','background','market','trend','policy','players','business','technology','opportunity','risks','insights','end']
    }
  },
  career_recruitment: {
    name: '职场求职 / 招聘攻略',
    defaultTopic: '产品经理面试准备清单',
    scenes: '求职简历、面试攻略、职场成长、岗位分析',
    pages: {
      5: ['cover','position','prepare','checklist','end'],
      8: ['cover','position','requirements','prepare','interview','mistakes','checklist','end'],
      12: ['cover','position','requirements','resume','prepare','interview','case','salary','mistakes','faq','checklist','end']
    }
  }
};

const typeMap = {
  cover:'cover', end:'end', comparison:'table', business:'metrics', overview:'articleImage', trend:'articleImage',
  scenarios:'featureImage', who:'articleImage', prepare:'list', steps:'list', advanced:'featureImage', faq:'list', tips:'list',
  pain:'articleImage', case:'featureImage', mistakes:'list', checklist:'list', background:'articleImage', model:'list', growth:'metrics',
  users:'metrics', moat:'list', finance:'metrics', risks:'list', about:'articleImage', ideas:'list', idea2:'list', quotes:'list',
  reflection:'list', actions:'list', why:'articleImage', mindmap:'featureImage', route:'list', spots:'featureImage', food:'list',
  budget:'metrics', day1:'list', day2:'list', day3:'list', photo:'featureImage', transport:'metrics', problem:'articleImage',
  principle:'articleImage', method:'list', step1:'list', step2:'list', step3:'list', keyPoints:'list', workflow:'list', capabilities:'list',
  insights:'list', channels:'metrics', routine:'list', ingredients:'list', recommend:'list', skinType:'articleImage', morning:'list', night:'list', goal:'articleImage', training:'list', environment:'featureImage', menu:'list', mustOrder:'list', price:'metrics', location:'articleImage', taste:'metrics', age:'articleImage', schedule:'metrics', market:'metrics', players:'metrics', policy:'articleImage', technology:'list', opportunity:'list', position:'articleImage', requirements:'list', interview:'list', resume:'articleImage', salary:'metrics'
};

const sectionTitle = {
  overview:'产品速览', workflow:'工作流程', capabilities:'核心能力', business:'商业表现', comparison:'竞品分析', insights:'产品启示',
  trend:'背景趋势', scenarios:'典型场景', risks:'风险局限', actions:'行动清单', keyPoints:'核心要点',
  who:'适合人群', prepare:'准备工作', steps:'操作步骤', advanced:'进阶技巧', faq:'常见问题', tips:'避坑提醒', pain:'用户痛点',
  model:'商业模式', growth:'增长路径', users:'用户画像', moat:'竞争壁垒', finance:'财务表现', channels:'渠道策略',
  about:'本书讲什么', ideas:'核心观点', idea2:'延伸观点', quotes:'金句摘录', reflection:'我的思考', why:'为什么读', mindmap:'知识框架',
  route:'路线总览', spots:'拍照机位', food:'美食推荐', budget:'预算清单', day1:'Day 1', day2:'Day 2', day3:'Day 3', photo:'拍照攻略', transport:'交通住宿',
  problem:'问题定义', principle:'底层原则', method:'方法步骤', step1:'步骤一', step2:'步骤二', step3:'步骤三', checklist:'行动清单', background:'背景介绍', case:'案例拆解', mistakes:'常见误区', routine:'护肤流程', ingredients:'成分解析', recommend:'产品推荐', skinType:'肤质判断', morning:'早间流程', night:'夜间流程', goal:'目标设定', training:'训练安排', environment:'环境体验', menu:'菜单推荐', mustOrder:'必点清单', price:'价格预算', location:'位置交通', taste:'口味评价', age:'适用阶段', schedule:'时间安排', market:'市场规模', players:'主要玩家', policy:'政策环境', technology:'技术趋势', opportunity:'机会判断', position:'岗位定位', requirements:'能力要求', interview:'面试准备', resume:'简历优化', salary:'薪资参考'
};

function listItems(topic, key){
  const generic = {
    routine:[['1. 清洁','选择温和清洁，避免过度去油和破坏屏障。'],['2. 修护','优先补水保湿，稳定皮肤状态。'],['3. 功效','根据需求选择美白、抗老或祛痘成分。'],['4. 防晒','白天防晒是护肤流程里最关键的一步。']],
    training:[['1. 热身','先用 5-10 分钟激活关节和肌肉。'],['2. 力量训练','优先安排复合动作，提升基础代谢。'],['3. 有氧收尾','根据体能选择快走、椭圆机或骑行。'],['4. 拉伸恢复','训练后放松肌肉，降低酸痛。']],
    menu:[['招牌菜','优先点店内复购率最高的菜品。'],['隐藏菜单','关注季节限定或店员推荐。'],['避雷菜','过度营销但口味普通的菜可以谨慎选择。']],
    mustOrder:[['必点 1','适合第一次来的人，稳定不踩雷。'],['必点 2','适合拍照分享，颜值和口味都在线。'],['搭配建议','主食、饮品和甜点尽量错开口味。']],
    requirements:[['硬技能','岗位需要的工具、方法和项目经验。'],['软技能','沟通、协作、复盘和推动能力。'],['加分项','行业理解、作品集和真实项目案例。']],
    interview:[['自我介绍','用 1 分钟讲清背景、优势和目标岗位匹配度。'],['项目复盘','准备 2-3 个能体现能力的项目案例。'],['反问环节','围绕团队目标、岗位挑战和成长空间提问。']],
    workflow:[['1. 输入目标','先明确要完成什么、交付什么、限制条件是什么。'],['2. 拆解任务','把复杂目标拆成多个可执行步骤，降低执行难度。'],['3. 执行验证','在过程中检查输出，及时修正偏差。'],['4. 汇总交付','把结果、风险和下一步建议整理给用户。']],
    capabilities:[['1. 降低上手成本',`让用户更快理解并使用 ${topic}。`],['2. 提升执行效率','把重复、多步骤的流程交给系统处理。'],['3. 保持过程可控','让用户看清楚每一步做了什么。'],['4. 适配真实场景','不只停留在演示，而是融入工作流。']],
    insights:[['从工具到工作流','真正有价值的产品，不只是功能强，而是能融入真实使用场景。'],['人类角色前移','用户更重要的能力变成定义目标、判断结果和制定标准。'],['可控性决定信任','越自动化的产品，越需要透明过程和可回退机制。']],
    steps:[['1. 打开工具','先完成账号、权限和基础环境设置。'],['2. 输入目标','用一句话说明你希望它帮你完成什么。'],['3. 调整结果','根据输出效果微调关键词、参数或素材。'],['4. 保存复用','把常用流程沉淀成自己的模板。']],
    tips:[['别一上来就追求复杂','先用小任务验证效果，再逐步扩大使用范围。'],['把需求说具体','告诉工具目标、限制、风格和验收标准。'],['保留人工检查','重要结果一定要自己复核。']],
    model:[['收入来源','它主要通过产品销售、订阅服务、增值服务或生态合作获得收入。'],['成本结构','成本通常来自研发、获客、供应链、运营和服务交付。'],['关键飞轮','用户增长、内容传播、产品复购共同形成增长循环。']],
    growth:[['冷启动','通过垂直人群和标杆案例打开第一批用户。'],['破圈传播','借助社交平台、内容种草和用户分享扩大声量。'],['规模化','通过渠道、品牌和产品矩阵提升复购与增长。']],
    ideas:[['观点一','真正重要的不是知道更多，而是把关键概念转化为行动。'],['观点二','长期主义的价值，来自持续复利而不是短期爆发。'],['观点三','选择比努力更底层，环境比意志更稳定。']],
    quotes:[['金句 1','如果你不能长期坚持，说明它还不是你的系统。'],['金句 2','真正的自由来自选择权，而选择权来自能力积累。'],['金句 3','把复杂问题拆小，是普通人最容易获得进步的方式。']],
    route:[['第一站','从交通最方便的位置开始，减少路上消耗。'],['第二站','安排最值得拍照或体验的核心地点。'],['第三站','把美食、休息和购物穿插在路线中。'],['第四站','最后留一个弹性时间，避免行程过满。']],
    food:[['必吃 1','选择当地特色，优先考虑口碑稳定的店。'],['必吃 2','安排一家适合拍照和休息的咖啡店。'],['避雷提醒','热门店建议提前预约，避免排队影响行程。']],
    method:[['1. 明确问题','先写下真正要解决的问题，而不是表面现象。'],['2. 找到原因','用数据、事实和反馈定位关键原因。'],['3. 形成动作','把结论变成下一次可以执行的具体动作。'],['4. 定期复盘','用固定节奏检查行动是否有效。']],
    checklist:[['今天就能做','选一个小任务马上实践，不要等准备完美。'],['本周完成','把方法应用到一个真实项目中。'],['长期坚持','每周复盘一次，持续优化自己的系统。']]
  };
  const arr = generic[key] || generic.insights;
  return arr.map(([heading, body]) => ({heading, body}));
}

function metricsRows(topic, key){
  return [
    {label:'定位', body:`${topic} 的核心定位，是在特定场景里提供更高效的解决方案。`},
    {label:'用户', body:'主要面向有明确需求、愿意尝试新工具或新方法的人群。'},
    {label:'价值', body:'帮助用户节省时间、降低成本、提升决策或执行质量。'},
    {label:'趋势', body:'背后反映的是效率工具、内容产品和智能化工作流的持续升级。'},
    {label:'机会', body:'如果能建立稳定体验和复用场景，就有机会形成长期用户粘性。'}
  ];
}

function tableRows(topic){
  return [
    ['形态定位', topic, '竞品 A', '竞品 B'],
    ['交互方式', '任务驱动，围绕目标完成', '功能驱动，用户手动操作', '对话驱动，依赖提示词'],
    ['核心优势', '流程完整，结果可复用', '成熟稳定，上手简单', '灵活开放，适合探索'],
    ['适合人群', '希望提升效率的用户', '已有固定流程的用户', '喜欢深度自定义的用户'],
    ['主要门槛', '需要建立使用习惯', '个性化不足', '学习成本较高'],
    ['使用方式', '按任务调用并持续复用', '按对话逐次描述需求', '按模板手动执行步骤']
  ];
}

export function createPages({templateId='ai_product', pageCount=8, topic='CodeX'} = {}){
  const tpl = CONTENT_TEMPLATES[templateId] || CONTENT_TEMPLATES.ai_product;
  const keys = tpl.pages[pageCount] || tpl.pages[8];
  return keys.map((key, idx) => {
    const type = typeMap[key] || 'list';
    const num = String(idx+1).padStart(2,'0');
    if(type==='cover') return {type:'cover', name:`${num} 封面`, headline: pageCount===5?'一篇快速看懂':'每天快速了解一个主题', productName: topic, tagline:`一句话点评：${topic} 是一个值得拆解的案例，核心价值在于解决真实问题。`};
    if(type==='end') return {type:'end', name:`${num} 结束页`, thanks:'感谢您的点赞、收藏、关注'};
    const st = sectionTitle[key] || '核心内容';
    if(type==='articleImage') return {type, name:`${num} ${st}`, title:`${topic}：${st}`, sectionTitle:st, body:`核心信息：${topic} 之所以值得关注，是因为它对应了一个真实且高频的需求。\n\n通俗理解：它把原本复杂、分散或依赖经验的流程，变成更清晰、更容易执行的步骤。\n\n为什么重要：当一个工具或方法能降低门槛、提升效率，并稳定产出结果时，就具备了长期价值。`, imageKey:'screenshot'};
    if(type==='featureImage') return {type, name:`${num} ${st}`, title:`${topic}：${st}`, sectionTitle:st, heading:`${st}的关键看点`, body:`围绕 ${topic}，最值得关注的是它如何把抽象能力落到具体场景。\n\n真正有价值的不是概念本身，而是用户能不能在实际工作和生活中稳定复用。`, imageKey:'screenshot'};
    if(type==='metrics') return {type, name:`${num} ${st}`, title:`${topic}：${st}`, sectionTitle:st, rows:metricsRows(topic, key)};
    if(type==='table') return {type, name:`${num} ${st}`, title:`${topic} 和竞品的差异？`, sectionTitle:st, headers:['维度', topic, '竞品 A', '竞品 B'], rows:tableRows(topic).slice(1)};
    return {type:'list', name:`${num} ${st}`, title:`${topic}：${st}`, sectionTitle:st, items:listItems(topic, key)};
  });
}
