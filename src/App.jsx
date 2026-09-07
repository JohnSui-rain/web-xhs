import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import CanvasPreview from './components/CanvasPreview.jsx';
import EditorPanel from './components/EditorPanel.jsx';
import { THEMES, FONT_PRESETS, STYLE_PACKS } from './data/themes.js';
import { CONTENT_TEMPLATES, createPages } from './data/contentTemplates.js';
import { customTheme } from './utils/color.js';
import { generateLocalSeries } from './utils/generateContent.js';
import { makeZipFromDataUrls } from './utils/zip.js';

const defaultGlobal = {
  seriesName:'每天快速了解一个主题', issue:'{ 产品观察 } No.01 / 08', product:'TapNow', author:'龙龙 AI 知行日记',
  slogan:'把复杂工作流，变成一键完成的轻松动作', brandIntro:'AI 产品学习分享\n-\nAI 创业者分享\n-\n个人 AI 创业点滴分享',
  themeId:'red', customAccent:'#a20f18', layoutStyle:'classic', fontId:'system', stylePackId:'red_knowledge',
  layoutOptions:{contentPadding:56, headerSize:54, bodySize:29, imageGap:34, footerLift:0},
  aiPrompt:'TapNow 是一款面向内容创作与效率提升的 AI 工具。它把常用任务整理成可以直接调用的工作流。用户不需要反复配置复杂参数，就能快速开始。适合做资料整理、内容改写、灵感发散和日常办公。它的核心价值是降低工具的上手门槛。一个清晰的入口可以让新用户更快得到结果。持续复用工作流后，个人效率会逐步形成复利。'
};

function safeName(s){return String(s||'套图').replace(/[\\/:*?"<>|\s]+/g,'_')}
function download(name, href){const a=document.createElement('a');a.download=name;a.href=href;document.body.appendChild(a);a.click();a.remove();}
function clone(x){return JSON.parse(JSON.stringify(x));}

export default function App(){
  const [templateId,setTemplateIdState]=useState('ai_product');
  const pageCount = 8;
  const [global,setGlobal]=useState({...defaultGlobal, layoutStyle:'classic'});
  const [pages,setPages]=useState(()=>generateLocalSeries({input:defaultGlobal.aiPrompt,templateId:'ai_product',pageCount:8,global:defaultGlobal}).pages);
  const [active,setActive]=useState(0);
  const [images,setImages]=useState({avatar:null,icon:null,screenshot:null});
  const [thumbs,setThumbs]=useState([]);
  const [profiles,setProfiles]=useState(()=>JSON.parse(localStorage.getItem('xhs_react_profiles')||'[]'));
  const [selectedProfile,setSelectedProfile]=useState('');
  const canvasRef=useRef(null);

  const theme=useMemo(()=>global.themeId==='custom'?customTheme(global.customAccent):(THEMES[global.themeId]||THEMES.red),[global.themeId,global.customAccent]);
  const fontPreset=useMemo(()=>FONT_PRESETS[global.fontId]||FONT_PRESETS.system,[global.fontId]);
  const page=pages[active];
  const layoutOptions=global.layoutOptions||defaultGlobal.layoutOptions;

  const updateGlobal=(key,val)=>setGlobal(g=>({...g,[key]:val}));
  const applyStylePack=(packId)=>{const pack=STYLE_PACKS[packId]; if(!pack)return; setGlobal(g=>({...g,stylePackId:packId,themeId:pack.themeId,layoutStyle:'classic',fontId:pack.fontId}));};
  const updatePageField=(key,val)=>setPages(ps=>ps.map((p,i)=>i===active?{...p,[key]:val}:p));
  const updateNested=(path,val)=>setPages(ps=>ps.map((p,i)=>{
    if(i!==active) return p; const n=clone(p); let o=n; for(let j=0;j<path.length-1;j++) o=o[path[j]]; o[path.at(-1)]=val; return n;
  }));
  const setImage=(key,img)=>setImages(x=>({...x,[key]:img}));

  const rebuild=(tid=templateId, count=pageCount, topic=global.product)=>{
    setPages(createPages({templateId:tid,pageCount:count,topic})); setActive(0);
  };
  const setTemplateId=(tid)=>{setTemplateIdState(tid); const topic=CONTENT_TEMPLATES[tid]?.defaultTopic || global.product; setGlobal(g=>({...g,product:topic})); rebuild(tid,pageCount,topic);};
  const regenerate=()=>{
    const {topic,pages:newPages}=generateLocalSeries({input:global.aiPrompt||global.product,templateId,pageCount,global});
    setGlobal(g=>({...g,product:topic})); setPages(newPages); setActive(0);
  };
  const optimizeTitle=()=>setPages(ps=>ps.map((p,i)=>i===0?{...p,headline:cycleTitle(p.headline,global.product)}:p));

  const movePage=(from,to)=>setPages(ps=>{const arr=[...ps];const [m]=arr.splice(from,1);arr.splice(to,0,m);setActive(to);return arr;});
  const pageActions=(action)=>{
    if(action==='up'&&active>0) movePage(active,active-1);
    if(action==='copy'){const cp=clone(page);cp.name=cp.name+' 副本';setPages(ps=>{const arr=[...ps];arr.splice(active+1,0,cp);return arr});setActive(active+1);}
    if(action==='delete'&&pages.length>1){setPages(ps=>ps.filter((_,i)=>i!==active));setActive(Math.max(0,active-1));}
  };

  const checks=useMemo(()=>collectChecks(pages, images),[pages,images]);
  const confirmChecks=()=>!checks.length||window.confirm('导出检查发现问题：\n'+checks.join('\n')+'\n\n仍然导出吗？');
  const exportCurrent=()=>{if(!confirmChecks())return; download(`${String(active+1).padStart(2,'0')}_${safeName(page.name)}.png`, canvasRef.current.exportCurrent());};
  const exportAll=()=>{if(!confirmChecks())return; canvasRef.current.exportAll().forEach((f,i)=>setTimeout(()=>download(safeName(f.name),f.dataUrl),i*120));};
  const exportZip=()=>{if(!confirmChecks())return; const files=canvasRef.current.exportAll().map(f=>({...f,name:safeName(f.name)})); const blob=makeZipFromDataUrls(files); const url=URL.createObjectURL(blob); download(`${safeName(global.product)}_${pages.length}页.zip`,url); setTimeout(()=>URL.revokeObjectURL(url),1000);};

  const saveProfile=()=>{const name=prompt('模板名称',global.author||'我的账号模板'); if(!name)return; const item={name,author:global.author,slogan:global.slogan,brandIntro:global.brandIntro,themeId:global.themeId,customAccent:global.customAccent,layoutStyle:global.layoutStyle,layoutOptions:global.layoutOptions}; const next=[...profiles,item]; setProfiles(next); localStorage.setItem('xhs_react_profiles',JSON.stringify(next));};
  const loadProfile=()=>{const p=profiles[Number(selectedProfile)]; if(!p)return alert('请先选择模板'); setGlobal(g=>({...g,...p,layoutStyle:'classic'}));};
  const deleteProfile=()=>{const idx=Number(selectedProfile); if(!profiles[idx])return alert('请先选择模板'); const next=profiles.filter((_,i)=>i!==idx); setProfiles(next); localStorage.setItem('xhs_react_profiles',JSON.stringify(next)); setSelectedProfile('');};

  const importJson=async(file)=>{
    if(!file) return;
    try{
      const data=JSON.parse(await file.text());
      const nextTemplate=CONTENT_TEMPLATES[data.templateId]?data.templateId:templateId;
      const importedGlobal=data.global||{};
      // Keep account branding and layout fields manually controlled; research imports only update product context.
      const nextGlobal={...global,product:data.product||importedGlobal.product||global.product,aiPrompt:data.aiPrompt||importedGlobal.aiPrompt||global.aiPrompt,layoutStyle:'classic',layoutOptions:{...global.layoutOptions}};
      const importedPages=Array.isArray(data.pages)?data.pages:null;
      if(importedPages && importedPages.length!==8) throw new Error('pages 必须正好包含 8 页');
      const validTypes=new Set(['cover','articleImage','list','metrics','featureImage','table','end']);
      if(importedPages?.some(p=>!p||!validTypes.has(p.type))) throw new Error('存在不支持的页面类型');
      const nextPages=importedPages||generateLocalSeries({input:data.aiPrompt||nextGlobal.aiPrompt,templateId:nextTemplate,pageCount:8,global:nextGlobal}).pages;
      setTemplateIdState(nextTemplate); setGlobal(nextGlobal); setPages(nextPages); setActive(0);
      alert(`已导入 ${nextGlobal.product} 的 8 页内容`);
    }catch(error){ alert(`导入失败：${error.message||'JSON 格式不正确'}`); }
  };

  return <div className="app">
    <Sidebar pages={pages} active={active} setActive={setActive} thumbs={thumbs} movePage={movePage}/>
    <main className="panel stage"><div className="topbar"><div><div className="title-now">{page?.name}</div><div className="sub">{CONTENT_TEMPLATES[templateId].name} · 第 {active+1}/{pages.length} 页</div></div><div className="actions"><button className="secondary" onClick={exportCurrent}>导出当前页</button><button className="secondary" onClick={exportAll}>导出全套</button><button className="primary" onClick={exportZip}>导出 ZIP</button></div></div><div className="canvas-shell"><div><div className="canvas-box"><CanvasPreview ref={canvasRef} page={page} pages={pages} active={active} global={global} theme={theme} images={images} layout={global.layoutStyle} fontPreset={fontPreset} layoutOptions={layoutOptions} onThumbs={setThumbs}/></div><div className="hint">1080×1440 小红书图文卡片，React 组件化版本。</div></div></div></main>
    <EditorPanel global={global} updateGlobal={updateGlobal} applyStylePack={applyStylePack} page={page} active={active} updatePageField={updatePageField} updateNested={updateNested} images={images} setImage={setImage} pageCount={pageCount} templateId={templateId} setTemplateId={setTemplateId} regenerate={regenerate} importJson={importJson} pageActions={pageActions} checks={checks} optimizeTitle={optimizeTitle} saveProfile={saveProfile} profiles={profiles} loadProfile={loadProfile} deleteProfile={deleteProfile} selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile}/>
  </div>;
}
function cycleTitle(current,topic){const opts=['每天快速了解一个主题',`一篇看懂 ${topic}`,`${topic} 到底强在哪？`,`${topic} 解决了什么问题？`]; const i=opts.indexOf(current); return opts[(i+1+opts.length)%opts.length];}
function collectChecks(pages,images){const issues=[]; pages.forEach((p,i)=>{JSON.stringify(p,(k,v)=>{if(typeof v==='string'&&v.length>220) issues.push(`第 ${i+1} 页文字可能过长`); return v;});}); if(!images.screenshot && pages.some(p=>['articleImage','featureImage'].includes(p.type))) issues.push('有图片页尚未上传内容配图'); return [...new Set(issues)].slice(0,8);}
