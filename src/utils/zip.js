function dataURLBytes(dataURL){
  const b64=dataURL.split(',')[1]; const bin=atob(b64); const arr=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++) arr[i]=bin.charCodeAt(i);
  return arr;
}
let crcTable=null;
function crc32(bytes){
  if(!crcTable){crcTable=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?(0xedb88320^(c>>>1)):(c>>>1);crcTable[n]=c>>>0;}}
  let c=0xffffffff; for(const b of bytes)c=crcTable[(c^b)&255]^(c>>>8); return (c^0xffffffff)>>>0;
}
const u16=n=>[n&255,(n>>>8)&255]; const u32=n=>[n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255];
export function makeZipFromDataUrls(files){
  const enc=new TextEncoder(), chunks=[], central=[]; let offset=0;
  const now=new Date(), dosTime=(now.getHours()<<11)|(now.getMinutes()<<5)|(now.getSeconds()/2), dosDate=((now.getFullYear()-1980)<<9)|((now.getMonth()+1)<<5)|now.getDate();
  for(const f of files){const name=enc.encode(f.name), data=dataURLBytes(f.dataUrl), crc=crc32(data); const local=new Uint8Array([...u32(0x04034b50),...u16(20),...u16(0),...u16(0),...u16(dosTime),...u16(dosDate),...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),...u16(0)]); chunks.push(local,name,data); central.push({name,data,crc,offset,dosTime,dosDate}); offset+=local.length+name.length+data.length;}
  const cdStart=offset; for(const f of central){const name=enc.encode(f.name); const h=new Uint8Array([...u32(0x02014b50),...u16(20),...u16(20),...u16(0),...u16(0),...u16(f.dosTime),...u16(f.dosDate),...u32(f.crc),...u32(f.data.length),...u32(f.data.length),...u16(name.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(f.offset)]); chunks.push(h,name); offset+=h.length+name.length;}
  const cdSize=offset-cdStart; chunks.push(new Uint8Array([...u32(0x06054b50),...u16(0),...u16(0),...u16(central.length),...u16(central.length),...u32(cdSize),...u32(cdStart),...u16(0)]));
  return new Blob(chunks,{type:'application/zip'});
}
