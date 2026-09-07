export const THEMES = {
  red: { name:'酒红知识风', accent:'#a20f18', coverTop:'#210000', coverMid:'#980000', coverBottom:'#ffd8d8', contentTop:'#fde0df', contentBg:'#fff', tableHead:'#fff1f1', text:'#111', muted:'#555', placeholderA:'#ddecff', placeholderB:'#f0e4ff' },
  blue: { name:'科技蓝白风', accent:'#155EEF', coverTop:'#061B3A', coverMid:'#155EEF', coverBottom:'#DCEBFF', contentTop:'#DDEBFF', contentBg:'#fff', tableHead:'#EEF5FF', text:'#101828', muted:'#667085', placeholderA:'#DCEBFF', placeholderB:'#E9F8FF' },
  purple: { name:'紫色 AI 风', accent:'#6D28D9', coverTop:'#18002E', coverMid:'#7C3AED', coverBottom:'#F1DDFF', contentTop:'#F0E1FF', contentBg:'#fff', tableHead:'#F7EEFF', text:'#18111F', muted:'#6B6175', placeholderA:'#E9D5FF', placeholderB:'#DBEAFE' },
  green: { name:'薄荷增长风', accent:'#087443', coverTop:'#022C22', coverMid:'#059669', coverBottom:'#D9FBEA', contentTop:'#DFF8EA', contentBg:'#fff', tableHead:'#EDFCF2', text:'#101828', muted:'#667085', placeholderA:'#D9FBEA', placeholderB:'#DDF4FF' },
  orange: { name:'暖橙商业风', accent:'#C2410C', coverTop:'#431407', coverMid:'#EA580C', coverBottom:'#FFE0C2', contentTop:'#FFE7D4', contentBg:'#fff', tableHead:'#FFF3EA', text:'#1F130B', muted:'#6F5B4D', placeholderA:'#FFE0C2', placeholderB:'#FFF1B8' },
  blackgold: { name:'黑金高级风', accent:'#B8860B', coverTop:'#050505', coverMid:'#1E1E1E', coverBottom:'#F3E3B3', contentTop:'#F2E8D0', contentBg:'#fff', tableHead:'#FBF4E3', text:'#111', muted:'#5E5545', placeholderA:'#F3E3B3', placeholderB:'#F5F5F5' }
};

export const LAYOUTS = {
  classic: '经典知识卡'
};

export const FONT_PRESETS = {
  system: { name:'系统黑体', body:'-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Arial, sans-serif', serif:'Georgia, "Times New Roman", serif' },
  xhs_bold: { name:'小红书醒目黑体', body:'"Arial Black", "PingFang SC", "Microsoft YaHei", sans-serif', serif:'Georgia, serif' },
  songti: { name:'宋体知识感', body:'"Noto Serif SC", "Songti SC", "SimSun", serif', serif:'"Songti SC", "SimSun", serif' },
  rounded: { name:'圆体亲和风', body:'"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif', serif:'Georgia, serif' },
  mono: { name:'科技等宽风', body:'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace', serif:'Georgia, serif' }
};

export const STYLE_PACKS = {
  red_knowledge: { name:'酒红知识卡', themeId:'red', layoutStyle:'classic', fontId:'system' },
  tech_blue: { name:'科技蓝报告', themeId:'blue', layoutStyle:'classic', fontId:'mono' },
  purple_ai: { name:'紫色 AI 未来感', themeId:'purple', layoutStyle:'classic', fontId:'system' },
  mint_growth: { name:'薄荷成长清单', themeId:'green', layoutStyle:'classic', fontId:'rounded' },
  orange_business: { name:'暖橙商业媒体', themeId:'orange', layoutStyle:'classic', fontId:'system' },
  blackgold_report: { name:'黑金深度报告', themeId:'blackgold', layoutStyle:'classic', fontId:'songti' },
  xhs_pop: { name:'小红书爆款大字', themeId:'red', layoutStyle:'classic', fontId:'xhs_bold' }
};
