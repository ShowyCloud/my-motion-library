/* 课程专用二维图片分段动画；读取但不修改用户的关节配置。 */
(function(g){
'use strict';
function draw(k,image,rig,joints,time,x,y,width,height,signals){
 const iw=image&&(image.naturalWidth||image.width),ih=image&&(image.naturalHeight||image.height);
 if(!image||image.complete===false||!iw||!ih)return false;
 const scale=Math.min(width/iw,height/ih),w=iw*scale,h=ih*scale,ox=x-w/2,oy=y-h/2;
 const arms=rig&&rig.enabled?rig:null,extra=joints&&joints.enabled?joints.segments:null;
 if(!arms&&!extra){k.drawImage(image,ox,oy,w,h);return true}
 function angle(a,key){
  if(!a||!a.enabled)return 0;
  const start=a.start??0,end=a.end??1,q=(time/4.8-start)/(end-start),env=q>=0&&q<=1?Math.max(0,Math.min(1,q/.05,(1-q)/.05)):0;
  const max=a.amplitude*Math.PI/180,base=a.direction*max*Math.sin(2*Math.PI*a.cycles*q+a.phase*Math.PI/180)*env;
  const gesture=(signals[key]||0)*max*.35*env;
  return Math.max(-max,Math.min(max,base+gesture));
 }
 const chains=[[arms&&arms.left,extra&&extra.leftForearm,'left','leftForearm'],[arms&&arms.right,extra&&extra.rightForearm,'right','rightForearm'],[extra&&extra.leftThigh,extra&&extra.leftShin,'leftThigh','leftShin'],[extra&&extra.rightThigh,extra&&extra.rightShin,'rightThigh','rightShin']].map(([upper,lower,aKey,bKey])=>{let a=angle(upper,aKey),b=angle(lower,bKey);return {upper,lower,a,b,upperMoves:!!(upper&&upper.enabled&&Math.abs(a)>1e-7),lowerMoves:!!(lower&&lower.enabled&&(Math.abs(a)>1e-7||Math.abs(b)>1e-7))}});
 const parts=[];for(const c of chains){if(c.upperMoves)parts.push(c.upper);if(c.lowerMoves)parts.push(c.lower)}
 if(!parts.length){k.drawImage(image,ox,oy,w,h);return true}
 k.save();for(const a of parts){k.beginPath();k.rect(ox,oy,w,h);k.rect(ox+a.x*w,oy+a.y*h,a.w*w,a.h*h);k.clip('evenodd')}k.drawImage(image,ox,oy,w,h);k.restore();
 function rotate(a,r){k.translate(ox+a.pivotX*w,oy+a.pivotY*h);k.rotate(r);k.translate(-ox-a.pivotX*w,-oy-a.pivotY*h)}
 function part(a,exclude){k.save();k.beginPath();k.rect(ox+a.x*w,oy+a.y*h,a.w*w,a.h*h);k.clip();if(exclude){k.beginPath();k.rect(ox+a.x*w,oy+a.y*h,a.w*w,a.h*h);k.rect(ox+exclude.x*w,oy+exclude.y*h,exclude.w*w,exclude.h*h);k.clip('evenodd')}k.drawImage(image,ox,oy,w,h);k.restore()}
 for(const c of chains){if(!c.upperMoves&&!c.lowerMoves)continue;k.save();if(c.upperMoves)rotate(c.upper,c.a);if(c.upperMoves)part(c.upper,c.lowerMoves?c.lower:null);if(c.lowerMoves){rotate(c.lower,c.b);part(c.lower,null)}k.restore()}
 return true;
}
// Shared story beats use the same normalized cycle in the renderer and course readouts.
function smooth(a,b,p){let q=Math.max(0,Math.min(1,(p-a)/(b-a)));return q*q*(3-2*q)}
function windowed(p,a,b,c,d){return smooth(a,b,p)*(1-smooth(c,d,p))}
function walk(p){
 const qa=smooth(.08,.40,p)*(1-smooth(.62,.92,p)),qb=smooth(.13,.43,p)*(1-smooth(.57,.88,p));
 function velocity(t,a,b,c,d){function v(x,l,r){let q=Math.max(0,Math.min(1,(x-l)/(r-l)));return 6*q*(1-q)/(r-l)}return v(t,a,b)*(1-smooth(c,d,t))-smooth(a,b,t)*v(t,c,d)}
 const va=velocity(p,.08,.40,.62,.92),vb=velocity(p,.13,.43,.57,.88);
 return {a:qa,b:qb,velocityA:va,velocityB:vb,recognition:windowed(p,.30,.43,.57,.70)};
}
function dialogue(p,cut=.5){cut=Math.max(.15,Math.min(.85,cut));let tail=1-cut;
 return {aTalk:windowed(p,cut*.08,cut*.24,cut*.72,cut*.94),bListen:windowed(p,cut*.20,cut*.42,cut*.90,Math.min(1,cut+tail*.08)),bTalk:windowed(p,cut+tail*.08,cut+tail*.25,cut+tail*.66,cut+tail*.90),aListen:windowed(p,cut+tail*.14,cut+tail*.30,cut+tail*.76,cut+tail*.96)};
}
// Both face their partner, with B establishing attention slightly later than A.
function eyeContact(p,cut=.5){let d=dialogue(p,cut);return {a:.20+.35*windowed(p,.04,.22,.78,.96)+.22*d.aListen,b:.20+.35*windowed(p,.11,.27,.82,.99)+.22*d.bListen}}
function door(q){
 const approach=smooth(.02,.30,q),reach=smooth(.09,.35,q),partner=smooth(.24,.67,q);
 return {approach,reach,lean:windowed(q,.08,.28,.72,.96),step:Math.sin(Math.PI*approach)*.34,partner,
  partnerStep:Math.sin(Math.PI*partner)*.28,acknowledge:smooth(.56,.84,q)};
}
function lightPair(p){
 const first=windowed(p,.14,.27,.68,.87),second=windowed(p,.25,.42,.73,.93);
 return {first,second,settleA:windowed(p,.03,.17,.73,.94),settleB:windowed(p,.12,.30,.78,.97)};
}
function reactionPair(r){
 const first=smooth(.02,.42,r),second=smooth(.20,.72,r);
 return {first,second,turnA:smooth(.32,.67,r),turnB:smooth(.44,.82,r)};
}
g.MPCourseSubject={draw,walk,dialogue,eyeContact,door,lightPair,reactionPair};
})(window);
