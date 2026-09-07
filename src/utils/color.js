export function hexToRgb(hex){
  hex=String(hex||'#a20f18').replace('#','');
  if(hex.length===3) hex=hex.split('').map(x=>x+x).join('');
  const n=parseInt(hex,16);
  return {r:(n>>16)&255,g:(n>>8)&255,b:n&255};
}
export function rgbToHex(r,g,b){
  return '#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
}
export function mix(c1,c2,t){
  const a=hexToRgb(c1), b=hexToRgb(c2);
  return rgbToHex(a.r+(b.r-a.r)*t,a.g+(b.g-a.g)*t,a.b+(b.b-a.b)*t);
}
export function customTheme(accent='#a20f18'){
  return {
    name:'自定义品牌色', accent,
    coverTop:mix(accent,'#000000',.78), coverMid:accent, coverBottom:mix(accent,'#ffffff',.78),
    contentTop:mix(accent,'#ffffff',.86), contentBg:'#fff', tableHead:mix(accent,'#ffffff',.92),
    text:'#111', muted:'#60646c', placeholderA:mix(accent,'#ffffff',.72), placeholderB:mix(accent,'#ffffff',.88)
  };
}
