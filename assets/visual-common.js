/* Shared editable catalogue and canvas rendering. */
(function(g){
'use strict';
const V={};
V.localize=function(cat){cat.elements.forEach(e=>{let z=(g.MP_ZH_DETAILS||{})[e.id]; if(z&&!z.error&&z.source_summary===e.summary.en&&z.source_use===e.use.en&&JSON.stringify(z.source_spec)===JSON.stringify(e.spec.en)){e.summary['zh-Hans']=z.summary;e.use['zh-Hans']=z.use;e.spec['zh-Hans']=z.spec;}});};
V.apply=function(cat,data){
 Object.entries(data.overrides||{}).forEach(([id,o])=>{let e=cat.elements.find(x=>x.id===id);if(!e)return;['name','meaning','summary','use','ask'].forEach(k=>{if(typeof o[k]==='string')e[k]['zh-Hans']=o[k];});if(Array.isArray(o.spec))e.spec['zh-Hans']=o.spec;if(Array.isArray(o.tags))e.tags=o.tags;e._visual=o;e._baseCycle=e.cycle;e.cycle=+(e.cycle/(o.speed||1)).toFixed(4);});
 let list=data.custom||[];if(!list.length)return;
 let title={'zh-Hans':'我的动态示例',en:'My examples',ja:'自分の作例'}, catTitle={'zh-Hans':'自定义',en:'Custom',ja:'カスタム',slug:'custom'};
 cat.packs.push({pack:'custom',title,categories:[catTitle],count:list.length,first:list[0].id,last:list[list.length-1].id,width:539,height:208,cycle:4,scalable:true});
 list.forEach((o,i)=>{let lang=s=>({'zh-Hans':s,en:s,ja:s});let specs=V.customSpec(o);cat.elements.push({id:o.id,pack:'custom',no:String(i+1),slug:'custom-'+o.id,category:'custom',width:539,height:208,cycle:o.duration,name:lang(o.name),meaning:lang(o.meaning),summary:lang(o.summary),use:lang(o.use),ask:lang(o.ask),spec:{'zh-Hans':specs,en:specs,ja:specs},tags:o.tags||[],_custom:true});});cat.count=cat.elements.length;
};
const motionNames={slide:'水平往返',vertical:'上下往返',pulse:'呼吸缩放',rotate:'连续旋转',script:'自定义代码','camera-pan-left':'向左摇镜（二维模拟）','camera-pan-right':'向右摇镜（二维模拟）','camera-tilt-up':'向上摇镜（二维模拟）','camera-tilt-down':'向下摇镜（二维模拟）','camera-push':'推近画面（二维模拟）','camera-pull':'拉远画面（二维模拟）','camera-roll':'倾斜摇摆（二维模拟）','camera-handheld':'手持晃动（二维模拟）'};
Object.assign(motionNames,{'transition-fade-black':'淡入淡出黑场','transition-fade-white':'淡入淡出白场','transition-wipe-left':'从左向右擦除','transition-wipe-right':'从右向左擦除','transition-wipe-down':'从上向下擦除','transition-center':'中间向两侧展开','transition-iris':'圆形开合','transition-zoom':'缩放开合'});
function cameraDetail(o){const a=o.amplitude,round=n=>+n.toFixed(2);if(o.motion.startsWith('camera-pan')||o.motion.startsWith('camera-tilt'))return '最大平移 '+a+' 像素';if(o.motion==='camera-push'||o.motion==='camera-pull')return '最大放大 '+round(a/2)+'%';if(o.motion==='camera-roll')return '最大倾斜 ±'+round(a*.15)+'°';return '最大水平 ±'+round(a*.12)+' 像素、垂直 ±'+round(a*.07)+' 像素、倾斜 ±'+round(a*.015)+'°';}
V.customSpec=o=>['动画类型：'+(motionNames[o.motion]||o.motion)+'；周期 '+o.duration+' 秒。','图形或素材宽度 '+o.size+' 像素；'+(o.motion.startsWith('camera-')?'运镜幅度 '+o.amplitude+'，'+cameraDetail(o):o.motion.startsWith('transition-')?'转场强度 '+o.amplitude+'（200 为完整开合）':'运动幅度 '+o.amplitude+' 像素')+'。','颜色 '+o.color+'；背景 '+o.background+'。'].concat(o.motion.startsWith('camera-')?['二维画面模拟；周期包含去程和返回。背景和素材整体变换，不产生真实三维透视或视差。']:[]).concat(o.motion.startsWith('transition-')?['单画面与黑场或白场之间循环开合；周期包含显现和消失，不是两个画面之间的剪辑。']:[]).concat(o.asset?['使用自选图片或视频素材。']:[]).concat(o.backgroundAsset?['使用背景图片。']:[]).concat((o.layers||[]).length?['叠加 '+o.layers.length+' 个素材图层。']:[]).concat(o.spec||[]);
const media=new Map();
function assetFor(path){
 if(!/^data\/media\/[a-f0-9]{64}\.(png|jpg|webp|gif|mp4|webm)$/.test(path||''))return null;
 if(media.has(path))return media.get(path);
 let video=/\.(mp4|webm)$/.test(path),item=video?document.createElement('video'):new Image();
 if(video){item.muted=true;item.loop=true;item.playsInline=true;item.preload='auto';}
 if(!video)item.addEventListener('load',()=>g.dispatchEvent(new Event('mp-subject-ready')));item.src=path;media.set(path,item);if(video)item.play().catch(()=>{});return item;
}
V.draw=function(ctx,w,h,u,o){
 let phase=u/o.duration*Math.PI*2,wave=Math.sin(phase),x=w/2,y=h/2-12;
 // Transitions reveal a single composition against black or white; they do not blend two clips.
 const transition=o.motion.startsWith('transition-'),progress=(1-Math.cos(phase))/2,strength=o.amplitude/200,visible=1-strength*(1-progress);
 if(transition){
  ctx.save();ctx.fillStyle=o.motion==='transition-fade-white'?'#fff':'#000';ctx.fillRect(0,0,w,h);
  ctx.beginPath();
  if(o.motion==='transition-wipe-left')ctx.rect(0,0,w*visible,h);
  else if(o.motion==='transition-wipe-right')ctx.rect(w*(1-visible),0,w*visible,h);
  else if(o.motion==='transition-wipe-down')ctx.rect(0,0,w,h*visible);
  else if(o.motion==='transition-center')ctx.rect(w*(1-visible)/2,0,w*visible,h);
  else if(o.motion==='transition-iris')ctx.arc(w/2,h/2,Math.hypot(w,h)/2*visible,0,Math.PI*2);
  else ctx.rect(0,0,w,h);
  ctx.clip();
  if(o.motion==='transition-zoom'){let scale=visible;ctx.translate(w/2,h/2);ctx.scale(scale,scale);ctx.translate(-w/2,-h/2);}
 }
 ctx.fillStyle=o.background;ctx.fillRect(0,0,w,h);
 // Simulate a camera on the complete flat composition. The overscan keeps its edges covered.
 let camera=o.motion.startsWith('camera-'),p=(1-Math.cos(phase))/2,amp=o.amplitude,dx=0,dy=0,angle=0,zoom=1;
 if(camera){
  switch(o.motion){
   case 'camera-pan-left':dx=amp*p;break;case 'camera-pan-right':dx=-amp*p;break;
   case 'camera-tilt-up':dy=amp*p;break;case 'camera-tilt-down':dy=-amp*p;break;
   case 'camera-push':zoom=1+amp/200*p;break;case 'camera-pull':zoom=1+amp/200*(1-p);break;
   case 'camera-roll':angle=amp*.15*Math.PI/180*wave;break;
   case 'camera-handheld':dx=amp*.12*Math.sin(phase*3);dy=amp*.07*Math.sin(phase*4);angle=amp*.015*Math.PI/180*Math.sin(phase*5);break;
  }
  const maxAngle=o.motion==='camera-roll'?amp*.15*Math.PI/180:o.motion==='camera-handheld'?amp*.015*Math.PI/180:0;
  const overscan=Math.max((w*Math.cos(maxAngle)+h*Math.sin(maxAngle)+2*(o.motion.startsWith('camera-pan')?amp:o.motion==='camera-handheld'?amp*.12:0))/w,(h*Math.cos(maxAngle)+w*Math.sin(maxAngle)+2*(o.motion.startsWith('camera-tilt')?amp:o.motion==='camera-handheld'?amp*.07:0))/h);
  ctx.save();ctx.translate(w/2+dx,h/2+dy);ctx.rotate(angle);ctx.scale(zoom*overscan,zoom*overscan);ctx.translate(-w/2,-h/2);
 }
 let bg=assetFor(o.backgroundAsset),bw=bg&&(bg.videoWidth||bg.naturalWidth),bh=bg&&(bg.videoHeight||bg.naturalHeight);if(bg&&bw&&bh){if(bg.tagName==='VIDEO'&&bg.paused)bg.play().catch(()=>{});let scale=Math.max(w/bw,h/bh),ww=bw*scale,hh=bh*scale;ctx.drawImage(bg,(w-ww)/2,(h-hh)/2,ww,hh);}
 ctx.save();if(o.motion==='slide')x+=wave*o.amplitude;if(o.motion==='vertical')y+=wave*o.amplitude;ctx.translate(x,y);if(o.motion==='rotate')ctx.rotate(phase);let s=o.motion==='pulse'?1+0.25*wave:1;ctx.scale(s,s);
 let a=assetFor(o.asset),aw=a&&(a.videoWidth||a.naturalWidth),ah=a&&(a.videoHeight||a.naturalHeight);
 if(a&&aw&&ah){if(a.tagName==='VIDEO'&&a.paused)a.play().catch(()=>{});let scale=Math.min(o.size/aw,(h-10)/ah),ww=aw*scale,hh=ah*scale;ctx.drawImage(a,-ww/2,-hh/2,ww,hh);}
 else if(!o.asset&&!(o.layers||[]).length&&o.motion!=='script'){ctx.fillStyle=o.color;let r=o.size/2;ctx.beginPath();ctx.roundRect(-r,-r,o.size,o.size,Math.min(16,r/2));ctx.fill();}
 (o.layers||[]).forEach(layer=>{let image=assetFor(layer.asset),iw=image&&(image.videoWidth||image.naturalWidth),ih=image&&(image.videoHeight||image.naturalHeight);if(!iw||!ih)return;if(image.tagName==='VIDEO'&&image.paused)image.play().catch(()=>{});let scale=Math.min(layer.size/iw,(h-10)/ih),ww=iw*scale,hh=ih*scale;ctx.save();ctx.globalAlpha=layer.opacity;ctx.drawImage(image,layer.x-ww/2,layer.y-hh/2,ww,hh);ctx.restore();});
 ctx.restore();
 if(o.motion==='script'&&g.MPCustomCode)g.MPCustomCode.draw(ctx,w,h,u,o,aw&&ah?a:null);
 ctx.fillStyle=o.color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='600 16px system-ui, sans-serif';ctx.fillText(o.label||'',w/2,h-25);
 if(camera)ctx.restore();
 if(transition){if(o.motion==='transition-fade-black'||o.motion==='transition-fade-white'){ctx.globalAlpha=1-visible;ctx.fillStyle=o.motion==='transition-fade-white'?'#fff':'#000';ctx.fillRect(0,0,w,h);}ctx.restore();}
};
V.call=function(ctx,cell,w,h,u,map,params,id,subjectPath,subjectRig,subjectJoints,filmAssets,secondaryRig,secondaryJoints,subjectEyes,secondaryEyes){
 const draw=function(){if(!map||!Object.keys(map).length){cell(ctx,w,h,u);return;}let originals={};['fillText','strokeText','measureText'].forEach(k=>{originals[k]=ctx[k];ctx[k]=function(s,...rest){return originals[k].call(this,Object.prototype.hasOwnProperty.call(map,String(s))?map[String(s)]:s,...rest);};});try{cell(ctx,w,h,u);}finally{Object.keys(originals).forEach(k=>{ctx[k]=originals[k];});}};
 const run=()=>g.MPParams?g.MPParams.withValues(id,params,draw):draw();
 const pack=id&&g.MotionPrompt&&(id.startsWith('P')?g.MotionPrompt.packs.principles:id.startsWith('F')?g.MotionPrompt.packs.cinema:null);
 const images={};Object.entries(filmAssets||{}).forEach(([key,path])=>{images[key]=assetFor(path)});
 return pack&&pack.withSubject?pack.withSubject(assetFor(subjectPath),subjectRig,subjectJoints,u,run,images,{rig:secondaryRig,joints:secondaryJoints,eyes:secondaryEyes},subjectEyes):run();
};
V.paramSummary=function(el){let visual=el._visual||{},values=visual.parameters||{},defs=(g.MP_PARAM_DEFS||{})[el.id]||[],out=defs.filter(d=>Object.prototype.hasOwnProperty.call(values,d.key)).map(d=>d.label+'：'+values[d.key]+(d.unit?' '+d.unit:'')+(d.note?'（'+d.note+'）':''));let rig=visual.subjectRig;if(visual.subjectAsset&&rig&&rig.enabled){for(const [key,label] of [['left','左臂'],['right','右臂']]){let arm=rig[key];if(arm&&arm.enabled)out.push(label+'：摆幅 '+arm.amplitude+'°，在 '+((arm.start??0)*el.cycle).toFixed(2)+'–'+((arm.end??1)*el.cycle).toFixed(2)+' 秒内摆动 '+arm.cycles+' 次，起始相位 '+arm.phase+'°，'+(arm.direction===1?'顺时针':'逆时针')+'起摆');}}let joints=visual.subjectJoints;if(visual.subjectAsset&&joints&&joints.enabled){for(const [key,label] of [['leftForearm','左肘'],['rightForearm','右肘'],['leftThigh','左髋'],['leftShin','左膝'],['rightThigh','右髋'],['rightShin','右膝']]){let part=joints.segments&&joints.segments[key];if(part&&part.enabled)out.push(label+'：幅度 '+part.amplitude+'°，在 '+((part.start??0)*el.cycle).toFixed(2)+'–'+((part.end??1)*el.cycle).toFixed(2)+' 秒内动作 '+part.cycles+' 次，起始相位 '+part.phase+'°');}}return out;};

g.MPVisual=V;
})(window);
