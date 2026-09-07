import { createPages } from '../data/contentTemplates.js';

export function detectTopic(input, fallback='CodeX'){
  const s = String(input || '').trim();
  if(!s) return fallback;
  const latinTopic = s.match(/^[A-Za-z][A-Za-z0-9._-]*(?:\s+[A-Za-z][A-Za-z0-9._-]*){0,2}/);
  if(latinTopic) return latinTopic[0];
  const first = s.split(/[，,。\n：:]/)[0].trim();
  return first.length > 18 ? first.slice(0,18) : first;
}

export function generateLocalSeries({ input, templateId, pageCount, global }){
  const topic = detectTopic(input, global.product);
  const pages = createPages({ templateId, pageCount, topic });
  if(String(input || '').length > 80){
    const parts = String(input).replace(/\s+/g,' ').split(/[。！？!?；;]/).filter(x=>x.trim().length>8);
    let k=0; const next=()=>parts[(k++) % Math.max(parts.length,1)] || '';
    const pair=()=>[next(),next()].filter(Boolean).join('。')+'。';
    pages.forEach(page=>{
      if(page.type==='articleImage') page.body = `核心信息：${pair()}\n\n通俗理解：${pair()}\n\n为什么重要：${pair()}`;
      if(page.type==='featureImage') page.body = `围绕这个主题，先看它解决的具体问题：${pair()}\n\n放到真实工作流里，它的价值体现在：${pair()}`;
      if(page.type==='list' && page.items) page.items.forEach(item=>{ item.body = pair() || item.body; });
      if(page.type==='metrics' && page.rows) page.rows.forEach(row=>{ row.body = pair() || row.body; });
    });
  }
  return { topic, pages };
}
