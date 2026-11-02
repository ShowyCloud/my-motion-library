/* Editable eye movement and a soft, source-alpha-preserving two-dimensional patch. */
(function(g){
'use strict';
const canvases=new WeakMap(),clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function smooth(q){q=clamp(q,0,1);return q*q*(3-2*q)}
// A quick closing, short hold, and gentler reopening all fit inside the saved window.
function blinkCurve(q){if(q<0||q>1)return 0;if(q<.30)return smooth(q/.30);if(q<.38)return 1;return 1-smooth((q-.38)/.62)}
function localCover(ctx,pair,part,w,h){
 const key=[part.x,part.y,part.w,part.h,w,h].join(':');
 if(pair.colors.has(key))return pair.colors.get(key);
 let result=null;
 try{
  const x=part.x*w,y=part.y*h,pw=part.w*w,ph=part.h*h,px=Math.max(3,pw*.32),py=Math.max(3,ph*.48);
  const x0=Math.max(0,Math.floor(x-px)),y0=Math.max(0,Math.floor(y-py)),x1=Math.min(w,Math.ceil(x+pw+px)),y1=Math.min(h,Math.ceil(y+ph+py));
  if(x1>x0&&y1>y0){
   const rw=x1-x0,rh=y1-y0,d=ctx.getImageData(x0,y0,rw,rh).data,samples=[],step=Math.max(1,Math.ceil(Math.sqrt(rw*rh/240)));
   for(let yy=0;yy<rh;yy+=step)for(let xx=0;xx<rw;xx+=step){
    let ax=x0+xx,ay=y0+yy;if(ax>=x&&ax<x+pw&&ay>=y&&ay<y+ph)continue;
    let i=4*(yy*rw+xx);if(d[i+3]<220)continue;
    // The eyebrow and hair are often above an eye; rely more on below and sides.
    samples.push({x:ax,y:ay,r:d[i],g:d[i+1],b:d[i+2],weight:ay<y?.45:ay>=y+ph?1.5:1});
   }
   if(samples.length>=6){
    const distance=(a,b)=>(a.r-b.r)**2+(a.g-b.g)**2+(a.b-b.b)**2;
    let anchor=samples[0],best=-1;for(const a of samples){let score=0;for(const b of samples)if(distance(a,b)<58**2)score+=b.weight;if(score>best){best=score;anchor=a}}
    const usable=samples.filter(a=>distance(a,anchor)<78**2);
    if(usable.length>=6){
     let cover=document.createElement('canvas');cover.width=Math.max(2,Math.min(64,Math.ceil(pw)));cover.height=Math.max(2,Math.min(48,Math.ceil(ph)));
     let cc=cover.getContext('2d'),pixels=cc.createImageData(cover.width,cover.height);
     for(let gy=0;gy<cover.height;gy++)for(let gx=0;gx<cover.width;gx++){
      let sx=x+(gx+.5)/cover.width*pw,sy=y+(gy+.5)/cover.height*ph,total=0,rr=0,gg=0,bb=0;
      for(const a of usable){let dx=(a.x-sx)/Math.max(2,pw),dy=(a.y-sy)/Math.max(2,ph),weight=a.weight/(.06+dx*dx+dy*dy);total+=weight;rr+=weight*a.r;gg+=weight*a.g;bb+=weight*a.b}
      let i=4*(gy*cover.width+gx);pixels.data[i]=Math.round(rr/total);pixels.data[i+1]=Math.round(gg/total);pixels.data[i+2]=Math.round(bb/total);pixels.data[i+3]=255;
     }
     cc.putImageData(pixels,0,0);result=cover;
    }
   }
  }
 }catch(_){/* Cross-origin or unavailable pixels use the chosen fallback color. */}
 if(pair.colors.size>=64)pair.colors.clear();pair.colors.set(key,result);return result;
}
// An optional clean patch contributes local color and fine texture without changing the source image.
function referenceCover(image,pair,part,reference,base,color,w,h){
 if(!reference)return base;
 const key=[part.x,part.y,part.w,part.h,reference.x,reference.y,reference.w,reference.h,!!base,color,w,h].join(':');
 if(pair.textures.has(key))return pair.textures.get(key)||base;
 let result=null;
 try{
  const cw=Math.max(2,Math.min(64,Math.ceil(part.w*w))),ch=Math.max(2,Math.min(48,Math.ceil(part.h*h)));
  const ref=document.createElement('canvas');ref.width=cw;ref.height=ch;let rc=ref.getContext('2d',{willReadFrequently:true});
  rc.drawImage(image,reference.x*image.naturalWidth,reference.y*image.naturalHeight,reference.w*image.naturalWidth,reference.h*image.naturalHeight,0,0,cw,ch);
  let rp=rc.getImageData(0,0,cw,ch),sum=[0,0,0],count=0;for(let i=0;i<rp.data.length;i+=4)if(rp.data[i+3]>=220){count++;for(let n=0;n<3;n++)sum[n]+=rp.data[i+n]}
  if(count>=Math.max(6,cw*ch*.6)){
   const means=sum.map(v=>v/count),cover=document.createElement('canvas');cover.width=cw;cover.height=ch;let cc=cover.getContext('2d',{willReadFrequently:true});
   if(base)cc.drawImage(base,0,0,cw,ch);else{cc.fillStyle=color;cc.fillRect(0,0,cw,ch)}
   let cp=cc.getImageData(0,0,cw,ch);for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){
    let i=4*(y*cw+x),local=[0,0,0],neighbors=0;
    for(let yy=Math.max(0,y-1);yy<=Math.min(ch-1,y+1);yy++)for(let xx=Math.max(0,x-1);xx<=Math.min(cw-1,x+1);xx++){let j=4*(yy*cw+xx);if(rp.data[j+3]>=220){neighbors++;for(let n=0;n<3;n++)local[n]+=rp.data[j+n]}}
    for(let n=0;n<3;n++){
     let detail=rp.data[i+3]>=220&&neighbors?clamp(rp.data[i+n]-local[n]/neighbors,-24,24):0;
     cp.data[i+n]=Math.round(.88*cp.data[i+n]+.12*means[n]+.7*detail);
    }
   }
   cc.putImageData(cp,0,0);result=cover;
  }
 }catch(_){/* Preserve the existing automatic or manual cover if pixels cannot be read. */}
 if(pair.textures.size>=64)pair.textures.clear();pair.textures.set(key,result);return result||base;
}
// Cache a softly feathered foreground layer; each stroke remains limited to the eye rectangles.
function restoreForeground(k,image,pair,parts,paths,w,h){
 if(!Array.isArray(paths)||!paths.length)return;
 const key=JSON.stringify([w,h,parts,paths]);let fg=pair.foregrounds.get(key);
 if(!fg){
  let mask=document.createElement('canvas');mask.width=w;mask.height=h;let m=mask.getContext('2d');m.save();m.beginPath();for(const a of parts)m.rect(a.x*w,a.y*h,a.w*w,a.h*h);m.clip();m.strokeStyle='#fff';m.fillStyle='#fff';m.lineCap='round';m.lineJoin='round';
  for(const path of paths){let points=path.points||[],width=path.width*Math.min(w,h);if(!points.length||!Number.isFinite(width)||width<=0)continue;
   function draw(factor,blur){m.filter=blur?`blur(${blur}px)`:'none';m.lineWidth=Math.max(.5,width*factor);m.beginPath();points.forEach((pt,i)=>i?m.lineTo(pt[0]*w,pt[1]*h):m.moveTo(pt[0]*w,pt[1]*h));if(points.length===1)m.lineTo(points[0][0]*w+.01,points[0][1]*h);m.stroke()}
   draw(1,Math.min(2,Math.max(.35,width*.14)));draw(.72,0);
  }
  m.restore();fg=document.createElement('canvas');fg.width=w;fg.height=h;let f=fg.getContext('2d');f.drawImage(image,0,0,w,h);f.globalCompositeOperation='destination-in';f.drawImage(mask,0,0);
  if(pair.foregrounds.size>=6)pair.foregrounds.clear();pair.foregrounds.set(key,fg);
 }
 k.save();k.globalCompositeOperation='source-atop';k.drawImage(fg,0,0);k.restore();
}
function frame(image,settings,time,sceneGaze=0,role='primary'){
 if(!image||!image.complete||!image.naturalWidth||!settings?.enabled)return image;
 const scale=Math.min(1,1024/Math.max(image.naturalWidth,image.naturalHeight));
 const w=Math.max(1,Math.round(image.naturalWidth*scale)),h=Math.max(1,Math.round(image.naturalHeight*scale));
 let pair=canvases.get(image);if(!pair){pair={out:document.createElement('canvas'),patch:document.createElement('canvas'),colors:new Map(),textures:new Map(),foregrounds:new Map()};canvases.set(image,pair)}
 const c=pair.out;if(c.width!==w)c.width=w;if(c.height!==h)c.height=h;
 let k=c.getContext('2d');k.globalCompositeOperation='source-over';k.clearRect(0,0,w,h);k.drawImage(image,0,0,w,h);
 const phase=((time/4.8)%1+1)%1,span=settings.blinkEnd-settings.blinkStart,q=span>0?(phase-settings.blinkStart)/span:-1;
 const closed=settings.blink?blinkCurve(q)*settings.blinkStrength:0;
 const offset=role==='secondary'?1.1:0,settle=1-.65*closed,drift=settings.follow*.09*settle*Math.sin(2*Math.PI*phase+offset);
 const gx=clamp(settings.gazeX+sceneGaze*settings.follow+drift,-1,1),gy=clamp(settings.gazeY+settings.follow*.035*settle*Math.sin(2*Math.PI*phase+offset+.7),-1,1);
 const parts=[settings.left,settings.right],covers=parts.map(part=>{let base=settings.autoColor?localCover(k,pair,part,w,h):null;return referenceCover(image,pair,part,settings.textureRegion,base,settings.coverColor,w,h)});
 for(const [index,part] of parts.entries()){
  const x=part.x*w,y=part.y*h,pw=part.w*w,ph=part.h*h;if(pw<1||ph<1)continue;
  const patch=pair.patch,tw=Math.max(2,Math.ceil(pw)),th=Math.max(2,Math.ceil(ph));if(patch.width!==tw)patch.width=tw;if(patch.height!==th)patch.height=th;
  const p=patch.getContext('2d');p.globalCompositeOperation='source-over';p.clearRect(0,0,tw,th);if(covers[index])p.drawImage(covers[index],0,0,tw,th);else{p.fillStyle=settings.coverColor;p.fillRect(0,0,tw,th)}
  const height=th*Math.max(.04,1-closed),dx=gx*tw*.15,dy=gy*th*.15*(1-.65*closed);
  // The upper lid travels slightly farther; vertical gaze settles as the eye closes.
  p.drawImage(image,part.x*image.naturalWidth,part.y*image.naturalHeight,part.w*image.naturalWidth,part.h*image.naturalHeight,dx,(th-height)*.54+dy,tw,height);
  // Fade inside the selected rectangle; no color is added outside the original silhouette.
  p.globalCompositeOperation='destination-in';
  let horizontal=p.createLinearGradient(0,0,tw,0);horizontal.addColorStop(0,'rgba(0,0,0,0)');horizontal.addColorStop(.18,'rgba(0,0,0,1)');horizontal.addColorStop(.82,'rgba(0,0,0,1)');horizontal.addColorStop(1,'rgba(0,0,0,0)');p.fillStyle=horizontal;p.fillRect(0,0,tw,th);
  let vertical=p.createLinearGradient(0,0,0,th);vertical.addColorStop(0,'rgba(0,0,0,0)');vertical.addColorStop(.18,'rgba(0,0,0,1)');vertical.addColorStop(.82,'rgba(0,0,0,1)');vertical.addColorStop(1,'rgba(0,0,0,0)');p.fillStyle=vertical;p.fillRect(0,0,tw,th);
  k.save();k.globalCompositeOperation='source-atop';k.drawImage(patch,x,y,pw,ph);k.restore();
 }
 restoreForeground(k,image,pair,parts,settings.protectPaths,w,h);
 return c;
}
g.MPSubjectEyes={frame};
})(window);
