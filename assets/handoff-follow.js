/* Scene-specific 2D arm aiming. Coordinates are relative to the displayed image. */
(function(root){
'use strict';
const wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const ease=v=>{v=clamp(v,0,1);return v*v*(3-2*v)};
const mix=(a,b,t)=>a+(b-a)*t;
function layout(image){let scale=Math.min(80/image.naturalWidth,145/image.naturalHeight),w=image.naturalWidth*scale,h=image.naturalHeight*scale;return {w,h,ox:-w/2,oy:-30-h/2}}
function restContactY(image,config,scale){let {h}=layout(image);return (config.floorY??318)+scale*h*((config.handY??.67)-(config.footY??.9))}
function gait(phase,amplitude,cycles,direction=1){let p=clamp(phase,0,1),swing=Math.sin(2*Math.PI*cycles*p)*Math.sin(Math.PI*p)*amplitude*Math.PI/180*direction;return {leftThigh:swing,rightThigh:-swing,leftShin:Math.max(0,-swing)*.55,rightShin:Math.max(0,swing)*.55}}
function legAngles(joints,time){let seg=joints&&joints.enabled&&joints.segments,out={};for(let name of ['leftThigh','leftShin','rightThigh','rightShin']){let a=seg&&seg[name];if(!a||!a.enabled){out[name]=0;continue}let q=(time/4.8-(a.start??0))/((a.end??1)-(a.start??0)),envelope=q>=0&&q<=1?Math.min(1,q/.05,(1-q)/.05):0;out[name]=a.direction*a.amplitude*Math.PI/180*Math.sin(2*Math.PI*a.cycles*q+a.phase*Math.PI/180)*envelope}return out}
function supportPoint(image,joints,angles,config){let {w,h,ox,oy}=layout(image),p={x:ox+config.footX*w,y:oy+config.footY*h},segments=joints&&joints.enabled&&joints.segments,side=config.footSide||'left',upper=segments&&segments[side+'Thigh'],lower=segments&&segments[side+'Shin'];
 let inside=(a)=>a&&p.x>=ox+a.x*w&&p.x<=ox+(a.x+a.w)*w&&p.y>=oy+a.y*h&&p.y<=oy+(a.y+a.h)*h;
 let rotate=(point,part,angle)=>{let x=ox+part.pivotX*w,y=oy+part.pivotY*h,dx=point.x-x,dy=point.y-y;return {x:x+dx*Math.cos(angle)-dy*Math.sin(angle),y:y+dx*Math.sin(angle)+dy*Math.cos(angle)}};
 let a=upper&&upper.enabled?(angles[side+'Thigh']||0):0,b=lower&&lower.enabled?(angles[side+'Shin']||0):0;
 if(lower&&lower.enabled&&inside(lower)){if(b)p=rotate(p,lower,b);if(a)p=rotate(p,upper,a)}else if(upper&&upper.enabled&&inside(upper)&&a)p=rotate(p,upper,a);return p;
}
function footFor(config,side){let other=side!==(config.footSide||'left');return {footSide:side,footX:other?(config.otherFootX??.55):(config.footX??.5),footY:other?(config.otherFootY??.9):(config.footY??.9)}}
function supportState(phase,cycles,first){let p=clamp(phase,0,1),count=Math.max(1,cycles*2),at=Math.min(p*count,count-1e-8),index=Math.floor(at),flip=s=>s==='left'?'right':'left',side=index%2?flip(first):first,previous=index?flip(side):side,blend=index?ease((at-index)/.12):1;return {index,count,side,previous,blend,start:index/count}}
function lockLeg(image,joints,angles,foot,dx,dy,limit){let seg=joints&&joints.enabled&&joints.segments,side=foot.footSide,upper=seg&&seg[side+'Thigh'],lower=seg&&seg[side+'Shin'];if(!upper||!upper.enabled||limit<=0)return angles;let {w,h,ox,oy}=layout(image),point=(x,y)=>({x:ox+x*w,y:oy+y*h}),hand=point(foot.footX,foot.footY),inside=a=>a&&foot.footX>=a.x&&foot.footX<=a.x+a.w&&foot.footY>=a.y&&foot.footY<=a.y+a.h,lowerUsed=lower&&lower.enabled&&inside(lower);if(!lowerUsed&&!inside(upper))return angles;let shoulder=point(upper.pivotX,upper.pivotY),elbow=lowerUsed?point(lower.pivotX,lower.pivotY):null,a=solve(shoulder,elbow,hand,{x:hand.x+dx,y:hand.y+dy},limit,limit);return {...angles,[side+'Thigh']:a.shoulder,...(lowerUsed?{[side+'Shin']:a.elbow}:{})}}
function beats(shot,u,timing,movement,details){
 details=details||{receiveStart:.25,receiveEnd:.47,giverStart:.62,giverEnd:.78};
 let reach=shot===0?0:shot===1?ease((u-timing.reachStart)/(1-timing.reachStart)):shot===2?1:1-ease(u/timing.releaseEnd);
 let transfer=shot===2?ease((u-timing.transferStart)/(timing.transferEnd-timing.transferStart)):shot===3?1:0,release=shot===3?ease(u/timing.releaseEnd):0;
 // The receiver keeps hold while the hand and object settle together in the final shot.
 let objectX=shot===0?301:shot===1?mix(301,321,reach):shot===2?mix(321,321+162*movement,transfer):321+162*movement-12*release;
 return {reach,transfer,release,objectX,leftX:shot===0?270:shot===1?mix(270,300,reach):300,rightX:shot===0?530:shot===1?mix(530,500,reach):500,
  give:shot===1?reach:shot===2?1-ease((transfer-details.giverStart)/(details.giverEnd-details.giverStart)):0,receive:shot===2?ease((transfer-details.receiveStart)/(details.receiveEnd-details.receiveStart)):shot===3?1:0,
  giverBody:shot===1?reach:shot===2?1-ease((transfer-Math.min(.99,details.giverStart+.03))/(1-Math.min(.99,details.giverStart+.03))):0,receiverBody:shot===2?ease((transfer-Math.max(0,details.receiveStart-.07))/(details.receiveEnd-Math.max(0,details.receiveStart-.07))):shot===3?1:0,
  giverTarget:shot===2?mix(321,321+162*movement,Math.min(transfer,(details.giverStart+details.giverEnd)/2)):objectX};
}
function solve(shoulder,elbow,hand,target,maxShoulder,maxElbow){
 const dx=target.x-shoulder.x,dy=target.y-shoulder.y;
 const baseX=hand.x-shoulder.x,baseY=hand.y-shoulder.y;
 if(Math.hypot(dx,dy)<1e-6||Math.hypot(baseX,baseY)<1e-6)return {shoulder:0,elbow:0};
 if(!elbow){return {shoulder:clamp(wrap(Math.atan2(dy,dx)-Math.atan2(baseY,baseX)),-maxShoulder,maxShoulder),elbow:0};}
 const ax=elbow.x-shoulder.x,ay=elbow.y-shoulder.y,bx=hand.x-elbow.x,by=hand.y-elbow.y,l1=Math.hypot(ax,ay),l2=Math.hypot(bx,by);
 if(l1<1e-6||l2<1e-6)return solve(shoulder,null,hand,target,maxShoulder,maxElbow);
 const d=clamp(Math.hypot(dx,dy),Math.abs(l1-l2)+1e-6,l1+l2-1e-6),base=Math.atan2(dy,dx);
 const offset=Math.acos(clamp((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1));
 const bend=Math.acos(clamp((l1*l1+l2*l2-d*d)/(2*l1*l2),-1,1));
 let best=null;
 for(const sign of [-1,1]){let first=base+sign*offset,second=first-sign*(Math.PI-bend),a=clamp(wrap(first-Math.atan2(ay,ax)),-maxShoulder,maxShoulder),b=clamp(wrap(second-Math.atan2(by,bx)-a),-maxElbow,maxElbow),ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(a+b),sb=Math.sin(a+b),ex=shoulder.x+ax*ca-ay*sa+bx*cb-by*sb,ey=shoulder.y+ax*sa+ay*ca+bx*sb+by*cb,error=Math.hypot(ex-target.x,ey-target.y),cost=Math.abs(a)+Math.abs(b);if(!best||error<best.error-1e-8||(Math.abs(error-best.error)<1e-8&&cost<best.cost))best={a,b,cost,error};}
 return {shoulder:best.a,elbow:best.b};
}
function aim(image,rig,joints,config,target,gesture){
 if(!config||!config.enabled||!rig||!rig.enabled||!rig[config.arm]||!rig[config.arm].enabled||!target)return null;
 let {w,h,ox,oy}=layout(image),upper=rig[config.arm];
 let pt=(x,y)=>({x:ox+x*w,y:oy+y*h}),shoulder=pt(upper.pivotX,upper.pivotY),hand=pt(config.handX,config.handY);
 let lower=joints&&joints.enabled&&joints.segments&&joints.segments[config.arm+'Forearm'];
 let elbow=lower&&lower.enabled?pt(lower.pivotX,lower.pivotY):null;
 let angles=solve(shoulder,elbow,hand,{x:target[0],y:target[1]},config.maxShoulder*Math.PI/180,config.maxElbow*Math.PI/180),strength=clamp(target[2]*gesture,0,1),a=angles.shoulder*strength,b=angles.elbow*strength;
 const rotate=(p,angle)=>({x:p.x*Math.cos(angle)-p.y*Math.sin(angle),y:p.x*Math.sin(angle)+p.y*Math.cos(angle)});
 function wristAt(shoulderAngle,elbowAngle){if(elbow){let forearm=rotate({x:hand.x-elbow.x,y:hand.y-elbow.y},elbowAngle),whole=rotate({x:elbow.x-shoulder.x+forearm.x,y:elbow.y-shoulder.y+forearm.y},shoulderAngle);return {x:shoulder.x+whole.x,y:shoulder.y+whole.y}}let whole=rotate({x:hand.x-shoulder.x,y:hand.y-shoulder.y},shoulderAngle);return {x:shoulder.x+whole.x,y:shoulder.y+whole.y}}
 return {[config.arm]:a,[config.arm+'Forearm']:b,__hand:wristAt(a,b),__fullHand:wristAt(angles.shoulder,angles.elbow),__strength:strength,__patch:{side:config.arm,amount:config.jointPatch??45}};
}
function approach(angles,target,maxShift,scale,maxRise=12,rotation=0,weight=angles?.__strength??0){if(!angles||!angles.__fullHand)return {x:0,y:0};let dx=(target[0]-angles.__fullHand.x)*weight,dy=(target[1]-angles.__fullHand.y)*weight,cs=Math.cos(rotation),sn=Math.sin(rotation),worldX=dx*cs-dy*sn,worldY=clamp(dx*sn+dy*cs,-maxRise/scale,maxRise/scale),d=Math.hypot(worldX,worldY),factor=d?Math.min(1,maxShift/scale/d):0;worldX*=factor;worldY*=factor;return {x:worldX*cs+worldY*sn,y:-worldX*sn+worldY*cs}}
root.MPHandoffFollow={solve,aim,approach,beats,layout,restContactY,gait,legAngles,supportPoint,footFor,supportState,lockLeg};
})(typeof window==='undefined'?globalThis:window);
