import React, { useRef } from 'react';
import { FONT_PRESETS, STYLE_PACKS } from '../data/themes.js';
import { CONTENT_TEMPLATES } from '../data/contentTemplates.js';

const limits = { headline:22, productName:12, tagline:44, title:18, sectionTitle:8, heading:18, label:6, body:180, slogan:32 };
function limitFor(path){
  if(path.includes('headline')) return limits.headline;
  if(path.includes('productName')) return limits.productName;
  if(path.includes('tagline')) return limits.tagline;
  if(path.endsWith('title')) return limits.title;
  if(path.endsWith('sectionTitle')) return limits.sectionTitle;
  if(path.includes('heading')) return limits.heading;
  if(path.includes('label')) return limits.label;
  if(path.includes('body')) return limits.body;
  if(path.includes('slogan')) return limits.slogan;
  return 80;
}

export default function EditorPanel(props){
  const { global, updateGlobal, applyStylePack, page, active, updatePageField, updateNested, images, setImage, pageCount, templateId, setTemplateId, regenerate, importJson, pageActions, checks, optimizeTitle, saveProfile, profiles, loadProfile, deleteProfile } = props;
  const importRef=useRef(null);
  const input=(label,path,value,onChange,textarea=false)=>{
    const limit=limitFor(path); const len=String(value||'').length; const warn=len>limit;
    return <label className="field">{label}{textarea?<textarea value={value||''} onChange={e=>onChange(e.target.value)} />:<input value={value||''} onChange={e=>onChange(e.target.value)} />}<div className={`field-tip ${warn?'warn':''}`}>当前 {len} 字 / 建议 ≤ {limit} 字{warn?'，可能过长':''}</div></label>
  };
  const file=(label,key)=><label className="field">{label}<input type="file" accept="image/*" onChange={e=>loadImage(e.target.files?.[0],img=>setImage(key,img))}/></label>;
  const options=global.layoutOptions||{contentPadding:56,headerSize:54,bodySize:29,imageGap:34,footerLift:0};
  const range=(label,key,min,max,step=1,suffix='')=><label className="range-field"><span>{label}<b>{options[key]}{suffix}</b></span><input type="range" min={min} max={max} step={step} value={options[key]} onChange={e=>updateGlobal('layoutOptions',{...options,[key]:Number(e.target.value)})}/></label>;
  return <aside className="panel right">
    <div className="header"><div className="logo small"><span className="badge dark">编</span><span>字段编辑</span></div><div className="sub">支持多内容模板、账号模板、品牌色、页数模式和导出检查。</div></div>
    <div className="form">
      <div className="section">内容模板</div>
      <label className="field">模板类型<select value={templateId} onChange={e=>setTemplateId(e.target.value)}>{Object.entries(CONTENT_TEMPLATES).map(([id,t])=><option key={id} value={id}>{t.name}</option>)}</select></label>
      <label className="field">套图长度<input value="8页标准版" readOnly aria-readonly="true" /></label>
      <div className="section">全局信息</div>
      {input('封面期数','global.issue',global.issue,v=>updateGlobal('issue',v))}
      {input('产品 / 主题名','global.product',global.product,v=>updateGlobal('product',v))}
      {input('账号名','global.author',global.author,v=>updateGlobal('author',v))}
      {input('底部口号','global.slogan',global.slogan,v=>updateGlobal('slogan',v),true)}
      {input('结尾页介绍','global.brandIntro',global.brandIntro,v=>updateGlobal('brandIntro',v),true)}
      <label className="field">风格包<select value={global.stylePackId || ''} onChange={e=>applyStylePack(e.target.value)}>{Object.entries(STYLE_PACKS).map(([id,t])=><option key={id} value={id}>{t.name}</option>)}</select></label>
      <label className="field">视觉版式<input value="经典知识卡" readOnly aria-readonly="true" /></label>
      <label className="field">字体选择<select value={global.fontId || 'system'} onChange={e=>updateGlobal('fontId',e.target.value)}>{Object.entries(FONT_PRESETS).map(([id,f])=><option key={id} value={id}>{f.name}</option>)}</select></label>
      <div className="section">模板调整</div>
      <div className="layout-box">
        {range('内容内边距','contentPadding',40,84,1,' px')}
        {range('标题字号','headerSize',44,68,1,' px')}
        {range('正文字号','bodySize',24,34,1,' px')}
        {range('图片与正文间距','imageGap',18,90,1,' px')}
        {range('页脚上移','footerLift',0,90,1,' px')}
      </div>
      <label className="field">自定义品牌色<div className="color-row"><input type="color" value={global.customAccent} onChange={e=>{updateGlobal('customAccent',e.target.value);updateGlobal('themeId','custom')}}/><button className="secondary" onClick={()=>updateGlobal('themeId','custom')}>应用</button></div></label>
      <div className="two">{file('账号头像','avatar')}{file('产品图标','icon')}</div>{file('产品截图 / 内容配图','screenshot')}
      <div className="section">AI / 本地生成</div>
      <div className="ai-box">
        <label className="field">主题 / 长文资料<textarea value={global.aiPrompt} onChange={e=>updateGlobal('aiPrompt',e.target.value)} placeholder="输入主题、产品资料，或粘贴一段长文" /></label>
        <div className="two"><button className="primary" onClick={regenerate}>生成当前模板内容</button><button className="secondary" onClick={optimizeTitle}>优化封面标题</button></div>
        <input ref={importRef} type="file" accept="application/json,.json" hidden onChange={e=>{importJson(e.target.files?.[0]);e.target.value='';}} />
        <button className="secondary" onClick={()=>importRef.current?.click()}>导入产品研究 JSON</button>
      </div>
      <div className="section">账号模板</div>
      <div className="profile-box"><label className="field">已保存模板<select onChange={e=>props.setSelectedProfile(e.target.value)}><option value="">选择模板</option>{profiles.map((p,i)=><option key={i} value={i}>{p.name}</option>)}</select></label><div className="manage-row"><button className="secondary" onClick={saveProfile}>保存</button><button className="secondary" onClick={loadProfile}>载入</button><button className="secondary" onClick={deleteProfile}>删除</button></div></div>
      <div className="section">页面管理</div><div className="manage-row"><button className="secondary" onClick={()=>pageActions('up')}>上移</button><button className="secondary" onClick={()=>pageActions('copy')}>复制</button><button className="secondary" onClick={()=>pageActions('delete')}>删除</button></div>
      <div className={`check-box ${checks.length?'warn':'ok'}`}>{checks.length?<>导出检查：<br/>{checks.map((x,i)=><React.Fragment key={i}>• {x}<br/></React.Fragment>)}</>:'导出检查：当前未发现明显问题'}</div>
      <div className="sep"/><div className="section">当前页：{page?.name}</div>
      {input('页面名称','name',page.name,v=>updatePageField('name',v))}
      {renderPageFields({page, active, input, updatePageField, updateNested})}
    </div>
  </aside>
}
function renderPageFields({page, input, updatePageField, updateNested}){
  if(!page) return null;
  if(page.type==='cover') return <>{input('封面主标题','headline',page.headline,v=>updatePageField('headline',v))}{input('产品名大字','productName',page.productName,v=>updatePageField('productName',v))}{input('一句话点评','tagline',page.tagline,v=>updatePageField('tagline',v),true)}</>;
  if(page.type==='end') return <>{input('感谢语','thanks',page.thanks,v=>updatePageField('thanks',v))}</>;
  const common=<>{input('页眉标题','title',page.title,v=>updatePageField('title',v))}{input('栏目标题','sectionTitle',page.sectionTitle,v=>updatePageField('sectionTitle',v))}</>;
  if(page.type==='articleImage') return <>{common}{input('正文','body',page.body,v=>updatePageField('body',v),true)}</>;
  if(page.type==='featureImage') return <>{common}{input('红色小标题','heading',page.heading,v=>updatePageField('heading',v))}{input('正文','body',page.body,v=>updatePageField('body',v),true)}</>;
  if(page.type==='list') return <>{common}{(page.items||[]).map((it,i)=><div key={i}><div className="section">段落 {i+1}</div>{input('小标题','heading',it.heading,v=>updateNested(['items',i,'heading'],v))}{input('正文','body',it.body,v=>updateNested(['items',i,'body'],v),true)}</div>)}</>;
  if(page.type==='metrics') return <>{common}{(page.rows||[]).map((r,i)=><div key={i}><div className="section">指标 {i+1}</div>{input('标签','label',r.label,v=>updateNested(['rows',i,'label'],v))}{input('内容','body',r.body,v=>updateNested(['rows',i,'body'],v),true)}</div>)}</>;
  if(page.type==='table') return <>{common}{(page.headers||[]).map((h,i)=>input(`表头 ${i+1}`,'headers',h,v=>updateNested(['headers',i],v)))}{(page.rows||[]).map((row,r)=><div key={r}><div className="section">表格第 {r+1} 行</div>{row.map((cell,c)=>input(`第 ${c+1} 列`,'rows',cell,v=>updateNested(['rows',r,c],v),true))}</div>)}</>;
}
function loadImage(file, cb){ if(!file) return; const img=new Image(); img.onload=()=>cb(img); img.src=URL.createObjectURL(file); }
