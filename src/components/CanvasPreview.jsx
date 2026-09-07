import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { drawPage, W, H } from '../canvas/draw.js';

const CanvasPreview = forwardRef(function CanvasPreview({ page, pages, active, global, theme, images, layout, fontPreset, layoutOptions, onThumbs }, ref){
  const canvasRef = useRef(null);
  useImperativeHandle(ref, () => ({
    exportCurrent(){
      const canvas = canvasRef.current;
      drawPage(canvas.getContext('2d'), page, global, theme, images, layout, fontPreset, layoutOptions);
      return canvas.toDataURL('image/png');
    },
    exportAll(){
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      return pages.map((p,i)=>{
        drawPage(ctx, p, global, theme, images, layout, fontPreset, layoutOptions);
        return { name: `${String(i+1).padStart(2,'0')}_${p.name}.png`, dataUrl: canvas.toDataURL('image/png') };
      });
    }
  }));

  useEffect(()=>{
    const canvas = canvasRef.current;
    drawPage(canvas.getContext('2d'), page, global, theme, images, layout, fontPreset, layoutOptions);
  }, [page, global, theme, images, layout, fontPreset, layoutOptions]);

  useEffect(()=>{
    let cancelled=false;
    const timer=setTimeout(async()=>{
      const off=document.createElement('canvas'); off.width=W; off.height=H;
      const ctx=off.getContext('2d');
      const thumbs=[];
      for(let i=0;i<pages.length;i++){
        drawPage(ctx,pages[i],global,theme,images,layout,fontPreset,layoutOptions);
        thumbs[i]=off.toDataURL('image/jpeg',0.45);
        await new Promise(r=>setTimeout(r,4));
      }
      if(!cancelled) onThumbs?.(thumbs);
    },120);
    return ()=>{cancelled=true;clearTimeout(timer)};
  }, [pages, global, theme, images, layout, fontPreset, layoutOptions, onThumbs]);

  return <canvas ref={canvasRef} width={W} height={H} />;
});
export default CanvasPreview;
