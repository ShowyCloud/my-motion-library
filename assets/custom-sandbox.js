/* Draw user-provided Canvas snippets inside an opaque-origin sandbox. */
(function(g){
'use strict';
const entries=new Map();
const documentHTML=`<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; connect-src 'none'; img-src data: blob:; media-src data: blob:"><canvas width="539" height="208"></canvas><script>
let last='',fn=null; const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d');
onmessage=async e=>{if(e.source!==parent||!e.data||e.data.type!=='draw')return;let d=e.data;try{
 if(d.code!==last){fn=new Function('ctx','width','height','time','options','media',d.code);last=d.code;}
 ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.filter='none';ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.save();try{fn(ctx,canvas.width,canvas.height,d.time,d.options,d.media||null);}finally{ctx.restore();if(d.media)d.media.close();}
 let bitmap=await createImageBitmap(canvas);parent.postMessage({type:'motion-frame',seq:d.seq,bitmap:bitmap},'*',[bitmap]);
 }catch(err){parent.postMessage({type:'motion-error',seq:d.seq,error:String(err && err.message || err).slice(0,300)},'*');}};
parent.postMessage({type:'motion-ready'},'*');<\/script>`;
function create(id){
 let frame=document.createElement('iframe');frame.setAttribute('sandbox','allow-scripts');frame.title='自定义效果预览';frame.setAttribute('aria-hidden','true');frame.tabIndex=-1;frame.style.cssText='position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;border:0';
 const s={frame,ready:false,busy:false,seq:0,last:0,bitmap:null,error:'',code:''};entries.set(id,s);frame.srcdoc=documentHTML;document.body.appendChild(frame);return s;
}
g.addEventListener('message',e=>{
 for(const s of entries.values()){
  if(e.source!==s.frame.contentWindow || !e.data)continue;
  if(e.data.type==='motion-ready'){s.ready=true;return;}
  if(e.data.seq!==s.seq){if(e.data.bitmap&&e.data.bitmap.close)e.data.bitmap.close();return;}
  if(e.data.type==='motion-frame'){s.busy=false;s.error='';if(s.bitmap)s.bitmap.close();s.bitmap=e.data.bitmap;return;}
  if(e.data.type==='motion-error'){s.busy=false;s.error=e.data.error||'代码运行失败';return;}
 }
});
g.MPCustomCode={
 draw(ctx,w,h,u,o,asset){
  let s=entries.get(o.id)||create(o.id),code=o.effectCode||'';
  if(s.code!==code){s.code=code;s.error='';if(s.bitmap){s.bitmap.close();s.bitmap=null;}s.busy=false;s.seq++;}
  if(s.bitmap)ctx.drawImage(s.bitmap,0,0,w,h);
  let now=performance.now();
  if(s.ready&&!s.busy&&now-s.last>65&&code){
   s.busy=true;s.last=now;let seq=++s.seq,payload={type:'draw',seq,code,time:u,options:{duration:o.duration,amplitude:o.amplitude,size:o.size,color:o.color,background:o.background,label:o.label}};
   const send=bitmap=>{if(seq!==s.seq){if(bitmap)bitmap.close();return;}if(bitmap){payload.media=bitmap;s.frame.contentWindow.postMessage(payload,'*',[bitmap]);}else s.frame.contentWindow.postMessage(payload,'*');};
   if(asset)createImageBitmap(asset).then(send,()=>send(null));else send(null);
  }
 },
 status(id){let s=entries.get(id);return s&&s.error||'';}
};
})(window);
