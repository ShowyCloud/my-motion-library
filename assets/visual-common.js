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
V.customSpec=o=>['动画类型：'+({slide:'水平往返',vertical:'上下往返',pulse:'呼吸缩放',rotate:'连续旋转'}[o.motion]||o.motion)+'；周期 '+o.duration+' 秒。','图形尺寸 '+o.size+' 像素；运动幅度 '+o.amplitude+' 像素（旋转与缩放类型不使用位移幅度）。','颜色 '+o.color+'；背景 '+o.background+'。'].concat(o.spec||[]);
V.draw=function(ctx,w,h,u,o){let phase=u/o.duration*Math.PI*2, wave=Math.sin(phase), x=w/2,y=h/2-12;ctx.fillStyle=o.background;ctx.fillRect(0,0,w,h);ctx.save();if(o.motion==='slide')x+=wave*o.amplitude;if(o.motion==='vertical')y+=wave*o.amplitude;ctx.translate(x,y);if(o.motion==='rotate')ctx.rotate(phase);let s=o.motion==='pulse'?1+0.25*wave:1;ctx.scale(s,s);ctx.fillStyle=o.color;let r=o.size/2;ctx.beginPath();ctx.roundRect(-r,-r,o.size,o.size,Math.min(16,r/2));ctx.fill();ctx.restore();ctx.fillStyle=o.color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='600 16px system-ui, sans-serif';ctx.fillText(o.label||'',w/2,h-25);};
V.call=function(ctx,cell,w,h,u,map,params,id){
 const draw=function(){if(!map||!Object.keys(map).length){cell(ctx,w,h,u);return;}let originals={};['fillText','strokeText','measureText'].forEach(k=>{originals[k]=ctx[k];ctx[k]=function(s,...rest){return originals[k].call(this,Object.prototype.hasOwnProperty.call(map,String(s))?map[String(s)]:s,...rest);};});try{cell(ctx,w,h,u);}finally{Object.keys(originals).forEach(k=>{ctx[k]=originals[k];});}};
 return g.MPParams?g.MPParams.withValues(id,params,draw):draw();
};
V.paramSummary=function(el){let values=el._visual&&el._visual.parameters||{},defs=(g.MP_PARAM_DEFS||{})[el.id]||[];return defs.filter(d=>Object.prototype.hasOwnProperty.call(values,d.key)).map(d=>d.label+'：'+values[d.key]+(d.unit?' '+d.unit:'')+(d.note?'（'+d.note+'）':''));};

g.MPVisual=V;
})(window);
