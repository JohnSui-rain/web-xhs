import React from 'react';

export default function Sidebar({ pages, active, setActive, thumbs, movePage }){
  const onDragStart=(e,i)=>{e.dataTransfer.setData('text/plain',String(i));};
  const onDrop=(e,i)=>{e.preventDefault();const from=Number(e.dataTransfer.getData('text/plain'));if(Number.isFinite(from)) movePage(from,i);};
  return <aside className="panel left">
    <div className="header"><div className="logo"><span className="badge">套</span><span>小红书套图生成器</span></div><div className="sub">React 项目版：内容模板 + 视觉主题 + 套图编辑 + 导出。</div></div>
    <div className="page-list">
      {pages.map((p,i)=><div key={i} className={`page-card ${i===active?'active':''}`} draggable onDragStart={e=>onDragStart(e,i)} onDragOver={e=>e.preventDefault()} onDrop={e=>onDrop(e,i)} onClick={()=>setActive(i)}>
        <div className={`mini ${thumbs[i]?'real':''}`} style={thumbs[i]?{backgroundImage:`url(${thumbs[i]})`}:undefined}/>
        <div><div className="pname">{p.name}</div><div className="ptype">{typeName(p.type)}</div></div>
      </div>)}
    </div>
  </aside>
}
function typeName(t){return {cover:'封面页',articleImage:'图文介绍页',list:'分段正文页',metrics:'指标列表页',featureImage:'图片内容页',table:'对比表格页',end:'结束页'}[t]||t}
