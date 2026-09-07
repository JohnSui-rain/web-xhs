import { mix } from '../utils/color.js';

export const W = 1080;
export const H = 1440;

function grad(ctx,y0,y1,c0,c1){const g=ctx.createLinearGradient(0,y0,0,y1);g.addColorStop(0,c0);g.addColorStop(1,c1);return g;}
function rr(ctx,x,y,w,h,r,fill,stroke,lw=1){ctx.beginPath();r=Math.min(r,w/2,h/2);ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke()}}
function wrap(ctx,str,width){const out=[];for(const para of String(str||'').split(/\n/)){let line='';for(const ch of Array.from(para)){const test=line+ch;if(ctx.measureText(test).width<=width||!line)line=test;else{out.push(line);line=ch}}if(line)out.push(line);if(!para)out.push('')}return out;}
let CURRENT_FONT={body:'system-ui',serif:'Georgia, serif'};
function text(ctx,t,x,y,size,color='#111',weight=400,width=900,lh=1.55,align='left',family='system-ui'){ctx.save();const fam=family==='system-ui'?CURRENT_FONT.body:(family.includes('Georgia')?CURRENT_FONT.serif:family);ctx.font=`${weight} ${size}px ${fam}`;ctx.fillStyle=color;ctx.textBaseline='top';ctx.textAlign=align;const lines=wrap(ctx,String(t||''),width);let tx=x;if(align==='center')tx=x+width/2;if(align==='right')tx=x+width;for(let i=0;i<lines.length;i++)ctx.fillText(lines[i],tx,y+i*size*lh);ctx.restore();return y+lines.length*size*lh;}
function line(ctx,x1,y1,x2,y2,c='#ddd',lw=1){ctx.save();ctx.strokeStyle=c;ctx.lineWidth=lw;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.restore()}
function drawImg(ctx,img,x,y,w,h,r=0,theme){ctx.save();rr(ctx,x,y,w,h,r);ctx.clip();if(img){const iw=img.naturalWidth||img.width,ih=img.naturalHeight||img.height,s=Math.max(w/iw,h/ih),dw=iw*s,dh=ih*s;ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh)}else{const g=ctx.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,theme.placeholderA);g.addColorStop(1,theme.placeholderB);ctx.fillStyle=g;ctx.fillRect(x,y,w,h);ctx.fillStyle='rgba(255,255,255,.75)';rr(ctx,x+w*.35,y+h*.42,w*.3,56,22,'rgba(255,255,255,.75)');ctx.fillStyle='#333';ctx.font='700 26px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('上传图片',x+w/2,y+h*.42+28)}ctx.restore()}
function avatar(ctx,img,x,y,r=34,theme){ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();if(img)ctx.drawImage(img,x-r,y-r,2*r,2*r);else{ctx.fillStyle=theme.accent;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.fillStyle='#111';ctx.beginPath();ctx.arc(x,y+8,r*.58,0,Math.PI*2);ctx.fill();ctx.fillStyle='#333';ctx.beginPath();ctx.arc(x+8,y-10,r*.34,0,Math.PI*2);ctx.fill()}ctx.restore()}
function smoothCoverBg(ctx,theme){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,theme.coverTop);g.addColorStop(.34,mix(theme.coverTop,theme.coverMid,.45));g.addColorStop(.68,mix(theme.coverMid,theme.coverBottom,.35));g.addColorStop(1,theme.coverBottom);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
function contentBg(ctx,theme,layout){ctx.fillStyle=grad(ctx,0,190,theme.contentTop,theme.contentBg);ctx.fillRect(0,0,W,H);ctx.fillStyle=theme.contentBg;ctx.fillRect(0,190,W,H-190);if(layout==='card'){ctx.fillStyle=mix(theme.accent,'#ffffff',.96);ctx.fillRect(0,190,W,H-190);rr(ctx,38,236,1004,1068,30,'#fff','#ececec',1)}if(layout==='magazine'){ctx.strokeStyle=mix(theme.accent,'#000000',.15);ctx.lineWidth=3;ctx.strokeRect(46,46,988,1328);line(ctx,56,244,1024,244,mix(theme.accent,'#ffffff',.65),2)}}
const DEFAULT_LAYOUT_OPTIONS={contentPadding:56,headerSize:54,bodySize:29,imageGap:34,footerLift:0};
function layoutOptions(options){return {...DEFAULT_LAYOUT_OPTIONS,...(options||{})}}
function header(ctx,title,images,theme,options){const pad=options.contentPadding;avatar(ctx,images.avatar,pad+36,86,34,theme);text(ctx,title,pad+84,58,options.headerSize,'#111',900,W-pad*2-84,1.1)}
function sectionTitle(ctx,s,theme,y=198,options=DEFAULT_LAYOUT_OPTIONS){text(ctx,s,options.contentPadding,y,34,'#111',900,W-options.contentPadding*2,1.2,'left','Georgia,serif')}
function footer(ctx,global,theme,options){const y=1366-options.footerLift;const pad=options.contentPadding;text(ctx,global.author,pad,y,18,'#111',800,360,1.1);const sloganX=W/2+8;const sloganWidth=W/2-pad-8;text(ctx,global.slogan,sloganX,y-2,18,theme.muted,400,sloganWidth,1.1,'right')}
const IMAGE_BOTTOM = 1288;
const IMAGE_MAX_HEIGHT = 620;

export function drawPage(ctx,page,global,theme,images={},layout='classic',fontPreset,options){
  options=layoutOptions(options);
  CURRENT_FONT=fontPreset||CURRENT_FONT;
  ctx.clearRect(0,0,W,H);
  if(!page) return;
  if(page.type==='cover') return drawCover(ctx,page,global,theme,images,layout,options);
  if(page.type==='end') return drawEnd(ctx,page,global,theme,images,layout,options);
  contentBg(ctx,theme,layout); header(ctx,page.title||global.product,images,theme,options); sectionTitle(ctx,page.sectionTitle||'',theme,198,options);
  if(page.type==='articleImage') drawArticleImage(ctx,page,theme,images,options);
  if(page.type==='list') drawList(ctx,page,theme,options);
  if(page.type==='metrics') drawMetrics(ctx,page,theme,options);
  if(page.type==='featureImage') drawFeatureImage(ctx,page,theme,images,options);
  if(page.type==='table') drawTable(ctx,page,theme);
  footer(ctx,global,theme,options);
}
function drawCover(ctx,p,global,theme,images,layout,options){smoothCoverBg(ctx,theme);if(layout==='magazine'){ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=3;ctx.strokeRect(54,54,972,1332)}if(layout==='card'){rr(ctx,112,430,856,610,48,'rgba(255,255,255,.10)','rgba(255,255,255,.18)',2)}text(ctx,global.issue,0,145,38,'rgba(255,255,255,.58)',400,W,1.1,'center');text(ctx,p.headline,100,235,options.headerSize,'#fff',900,880,1.15,'center');drawImg(ctx,images.icon,398,485,284,284,70,theme);text(ctx,p.productName,0,820,86,'#fff',900,W,1.05,'center');text(ctx,p.tagline,90,980,Math.max(32,options.bodySize+9),'rgba(255,255,255,.72)',800,900,1.35,'center');avatar(ctx,images.avatar,382,1268,30,theme);text(ctx,global.author,446,1258,34,'#fff',850,420,1.1);text(ctx,global.slogan,0,1335,26,'rgba(255,255,255,.68)',400,W,1.1,'center')}
function drawEnd(ctx,p,global,theme,images,layout,options){smoothCoverBg(ctx,theme);if(layout==='magazine'){ctx.strokeStyle='rgba(255,255,255,.50)';ctx.lineWidth=3;ctx.strokeRect(54,54,972,1332)}avatar(ctx,images.avatar,318,500,48,theme);text(ctx,global.author,390,488,52,'#fff',900,520,1.1);text(ctx,global.brandIntro,0,625,Math.max(32,options.bodySize+7),'rgba(255,255,255,.78)',800,W,1.55,'center');text(ctx,p.thanks,0,1190,Math.max(46,options.headerSize-2),'#fff',900,W,1.1,'center')}
function drawArticleImage(ctx,p,theme,images,options){const pad=options.contentPadding;let y=262;y=text(ctx,p.body,pad,y,options.bodySize,'#111',450,W-pad*2,1.62)+options.imageGap;const imageY=Math.max(640,y);const imageH=Math.max(220,Math.min(IMAGE_MAX_HEIGHT,IMAGE_BOTTOM-imageY));drawImg(ctx,images.screenshot,pad,imageY,W-pad*2,imageH,10,theme)}
function drawList(ctx,p,theme,options){const pad=options.contentPadding;let y=270;const items=p.items||[];const trailingGap=items.length<=3?170:105;items.forEach((it,i)=>{y=text(ctx,it.heading,pad,y,30,theme.accent,900,W-pad*2,1.25)+14;y=text(ctx,it.body,pad,y,options.bodySize,'#111',450,W-pad*2,1.62)+trailingGap;if(i<items.length-1){line(ctx,pad,y-8,W-pad,y-8,'#e5e5e5',1);y+=18}})}
function drawMetrics(ctx,p,theme,options){const pad=options.contentPadding;let y=282;const rows=p.rows||[];const rowGap=rows.length>=5?82:70;rows.forEach(r=>{line(ctx,pad,y-26,W-pad,y-26,'#e3e3e3',1);text(ctx,r.label,pad,y+10,26,theme.accent,900,155,1.35);y=text(ctx,r.body,pad+174,y,options.bodySize,'#111',420,W-pad*2-174,1.6)+rowGap})}
function drawFeatureImage(ctx,p,theme,images,options){const pad=options.contentPadding;let y=270;y=text(ctx,p.heading,pad,y,30,theme.accent,900,W-pad*2,1.25)+14;y=text(ctx,p.body,pad,y,options.bodySize,'#111',450,W-pad*2,1.62)+options.imageGap;const imageY=Math.max(620,y);const imageH=Math.max(220,Math.min(IMAGE_MAX_HEIGHT,IMAGE_BOTTOM-imageY));drawImg(ctx,images.screenshot,pad,imageY,W-pad*2,imageH,12,theme)}
function drawTable(ctx,p,theme){const x=56,y=268,w=968,h=1025;const col=[150,270,270,278];const rows=(p.rows||[]).slice(0,5);const dataRowHeight=(h-105)/Math.max(rows.length,1);const rowH=[105,...rows.map(()=>dataRowHeight)];ctx.save();ctx.fillStyle='#fff';ctx.fillRect(x,y,w,h);let yy=y;for(let r=0;r<rowH.length;r++){let xx=x;for(let c=0;c<4;c++){ctx.fillStyle=(r===0||c===0)?theme.tableHead:'#fff';ctx.fillRect(xx,yy,col[c],rowH[r]);ctx.strokeStyle='#ddd';ctx.lineWidth=1;ctx.strokeRect(xx,yy,col[c],rowH[r]);const val=r===0?(p.headers||[])[c]:rows[r-1]?.[c];const color=(c===0&&r>0)?theme.accent:'#111';const weight=(r===0||c===0)?900:420;text(ctx,val,xx+18,yy+34,26,color,weight,col[c]-36,1.35,'center');xx+=col[c]}yy+=rowH[r]}ctx.restore()}
