/* Local filmmaking and camera-axis demonstrations; all timings are normalized to the 4.8 s loop. */
MotionPrompt.pack('cinema',function(){
'use strict';
const W=539,H=208,cycle=4.8,PI=Math.PI,ink='#173152',blue='#416fe1',coral='#e95f55',teal='#219d9e',line='#c4d2e3',paper='#f6f8fc';
let slots={},lessonMode=false,lessonSubject=null;
const lightCanvas=document.createElement('canvas');lightCanvas.width=W;lightCanvas.height=H;const lightCtx=lightCanvas.getContext('2d');
const paletteCanvas=document.createElement('canvas');paletteCanvas.width=135;paletteCanvas.height=52;const paletteCtx=paletteCanvas.getContext('2d',{willReadFrequently:true});
const param=(k,v)=>{let id=window.MPParams&&window.MPParams.currentId();return id?window.MPParams.get(id,k,v):v};
const phase=u=>((u/cycle)%1+1)%1;
function t(k,s,x,y,size=17,color=ink){k.fillStyle=color;k.font='700 '+size+'px system-ui, sans-serif';k.textAlign='center';k.textBaseline='middle';k.fillText(s,x,y)}
function caption(k,s){t(k,s,269,190,16)}
function linePath(k,points,color=line,width=2,dash=false){k.save();k.strokeStyle=color;k.lineWidth=width;k.setLineDash(dash?[5,5]:[]);k.beginPath();points.forEach(([x,y],i)=>i?k.lineTo(x,y):k.moveTo(x,y));k.stroke();k.restore()}
function ready(i){return i&&i.complete&&i.naturalWidth>0&&i.naturalHeight>0}
function fit(k,i,x,y,w,h,cover=false){if(!ready(i))return false;let f=(cover?Math.max:Math.min)(w/i.naturalWidth,h/i.naturalHeight),dw=i.naturalWidth*f,dh=i.naturalHeight*f;k.save();k.beginPath();k.rect(x,y,w,h);k.clip();k.drawImage(i,x+(w-dw)/2,y+(h-dh)/2,dw,dh);k.restore();return true}
function base(k){k.fillStyle=paper;k.fillRect(0,0,W,H)}
function scene(k,x=22,y=35,w=495,h=130){k.save();k.beginPath();k.rect(x,y,w,h);k.clip();k.fillStyle='#e6edf7';k.fillRect(x,y,w,h);if(!fit(k,slots.background,x,y,w,h,true)){k.fillStyle='#d0dced';k.fillRect(x,y+h*.67,w,h*.33);k.fillStyle='#c2d2e5';k.fillRect(x+w*.09,y+h*.16,w*.16,h*.51);k.fillRect(x+w*.72,y+h*.08,w*.18,h*.59);linePath(k,[[x,y+h*.67],[x+w,y+h*.67]],'#a7bcd4',2)}k.restore()}
function actor(k,x,y,size=45,which='primary',face=1,pose=0,gait=0,lean=0,expression=0,animate=true,gaze=0){
 let scale=param('subjectScale',1),w=size*1.1*scale,h=size*1.42*scale;
 k.save();k.beginPath();k.rect(0,35,W,130);k.clip();k.translate(x,y);if(face<0)k.scale(-1,1);k.rotate(lean);
 // Replacement images receive an overall performance; configured primary segments can follow the scene as well.
 const signals={left:-gait*.7-pose*.15,right:gait*.7-pose*.65,leftForearm:-pose*.25,rightForearm:-pose*.55,leftThigh:gait*.8,rightThigh:-gait*.8,leftShin:Math.max(0,-gait)*.55,rightShin:Math.max(0,gait)*.55};
 function bodyBeat(){if(!lessonMode||!animate)return;k.translate(0,-h*.035*Math.abs(gait));k.rotate(gait*.07-pose*.035+expression*.025);k.scale(1+expression*.018,1-expression*.018)}
 if(which==='primary'&&animate&&lessonSubject&&ready(lessonSubject.image)&&window.MPCourseSubject&&(lessonMode||lessonSubject.eyes?.enabled)){k.save();bodyBeat();let image=window.MPSubjectEyes?MPSubjectEyes.frame(lessonSubject.image,lessonSubject.eyes,lessonSubject.time,gaze,'primary'):lessonSubject.image;let drawn=MPCourseSubject.draw(k,image,lessonSubject.rig,lessonSubject.joints,lessonSubject.time,0,-h*.42,w,h,signals);k.restore();if(drawn){k.restore();return}}
 if(which==='primary'&&MotionPrompt.packs.principles.drawSubject(k,0,-h*.42,w,h,animate)){k.restore();return}
 if(which==='secondary'||which==='third'){k.save();bodyBeat();let image=slots[which],secondary=which==='secondary'&&lessonSubject&&lessonSubject.secondary,drawn=false;if(animate&&ready(image)&&secondary&&(secondary.rig?.enabled||secondary.joints?.enabled||secondary.eyes?.enabled)){if((lessonMode||secondary.eyes?.enabled)&&window.MPCourseSubject){let source=window.MPSubjectEyes?MPSubjectEyes.frame(image,secondary.eyes,lessonSubject.time,gaze,'secondary'):image;drawn=MPCourseSubject.draw(k,source,secondary.rig,secondary.joints,lessonSubject.time,0,-h*.42,w,h,signals)}else drawn=MotionPrompt.packs.principles.withSubject(image,secondary.rig,secondary.joints,lessonSubject.time,()=>MotionPrompt.packs.principles.drawSubject(k,0,-h*.42,w,h,true))}else drawn=fit(k,image,-w/2,-h*.92,w,h,false);k.restore();if(drawn){k.restore();return}}
 const col=which==='secondary'?coral:which==='third'?teal:blue;
 k.lineCap='round';k.lineWidth=Math.max(2,size*.095*scale);k.strokeStyle=ink;k.beginPath();k.moveTo(-w*.14,-h*.15);k.lineTo(-w*.2+w*.14*gait,-h*.04);k.lineTo(-w*.27+w*.3*gait,h*.06-h*.08*Math.max(0,gait));k.moveTo(w*.14,-h*.15);k.lineTo(w*.2-w*.14*gait,-h*.04);k.lineTo(w*.27-w*.3*gait,h*.06-h*.08*Math.max(0,-gait));k.moveTo(-w*.27,-h*.55);k.lineTo(-w*.4,-h*.33);k.moveTo(w*.27,-h*.55);k.lineTo(w*(.4+.06*pose),-h*(.33+.12*pose));k.stroke();k.fillStyle=col;k.beginPath();k.roundRect(-w*.3,-h*.89,w*.6,h*.75,Math.max(4,w*.2));k.fill();k.fillStyle='#fff';k.beginPath();let eyeShift=Math.max(-1,Math.min(1,gaze))*w*.055;k.arc(w*.05+eyeShift,-h*.67,Math.max(2,w*.045),0,2*PI);k.arc(w*.18+eyeShift,-h*.67,Math.max(2,w*.045),0,2*PI);k.fill();if(expression>.02){k.fillStyle=ink;k.beginPath();k.ellipse(w*.12,-h*.48,Math.max(1.5,w*.045),Math.max(1.5,h*.045*expression),0,0,2*PI);k.fill()}k.restore();
}
function object(k,x,y,size=32){if(fit(k,slots.object,x-size/2,y-size/2,size,size,false))return;k.fillStyle='#efaf45';k.beginPath();k.roundRect(x-size*.35,y-size*.37,size*.7,size*.74,5);k.fill();k.fillStyle='#fff2bc';k.fillRect(x-size*.19,y-size*.18,size*.38,size*.11)}
function arrow(k,x1,y1,x2,y2,color=ink){let a=Math.atan2(y2-y1,x2-x1);linePath(k,[[x1,y1],[x2,y2]],color,2);linePath(k,[[x2-9*Math.cos(a-.5),y2-9*Math.sin(a-.5)],[x2,y2],[x2-9*Math.cos(a+.5),y2-9*Math.sin(a+.5)]],color,2)}
function frame(k,x,y,w,h){k.strokeStyle='#a9bed9';k.lineWidth=2;k.strokeRect(x,y,w,h)}
function stageText(k,s){t(k,s,269,19,17)}
// A brief visual cue marks the actual cut without moving it or obscuring the subject.
function lessonCut(k,p,cuts){if(!lessonMode||!cuts.some(c=>p>=c&&p<c+.035))return;k.save();k.fillStyle='rgba(28,48,76,.86)';k.beginPath();k.roundRect(455,39,49,19,5);k.fill();t(k,'切镜',479,49,11,'#fff');k.restore()}
const cells=[];
// F01: Five distinct shot sizes shown by changing the on-screen subject scale.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),count=param('shotCount',5),index=Math.min(count-1,Math.floor(p*count)),z=[.5,.75,1,1.45,2.15][Math.round(index*4/(count-1))],labels=['远景','全景','中景','近景','特写'],label=labels[Math.round(index*4/(count-1))];scene(k);k.save();k.beginPath();k.rect(22,35,495,130);k.clip();actor(k,269+param('positionX',0),145+Math.max(0,z-1.45)*60,50*z,'primary',1);k.restore();frame(k,22,35,495,130);stageText(k,label+' · '+(index+1)+' / '+count);caption(k,'同一场景：景别改变画面信息');});
// F02: establish two people, then show their opposing dialogue shots.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),sep=param('separation',108),first=param('firstCut',.28),second=param('secondCut',.65);scene(k);if(p<first){actor(k,269-sep,149,48,'primary',1);actor(k,269+sep,149,48,'secondary',-1);stageText(k,'① 双人全景');arrow(k,230,84,300,84,'#8299b9')}else if(p<second){actor(k,230,180,105,'primary',1);arrow(k,300,92,365,92,teal);stageText(k,'② A 的镜头')}else{actor(k,309,180,105,'secondary',-1);arrow(k,239,92,174,92,coral);stageText(k,'③ B 的镜头')}frame(k,22,35,495,130);caption(k,'建立空间 → A → B');});
// F03: top-down axis and two-shot image; the second camera can cross the line.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),side=p<.5?0:1,cross=param('crossLine',0),sep=param('separation',90),a=param('cameraAngle',42)*PI/180;scene(k,283,40,225,123);k.fillStyle='#e8eef7';k.fillRect(25,40,225,123);linePath(k,[[40,101],[235,101]],coral,2,true);let ax=137-sep*.48,bx=137+sep*.48;actor(k,ax,108,27,'primary',1);actor(k,bx,108,27,'secondary',-1);let cx=137+(side?1:-1)*54*Math.cos(a),cy=101+(side&&cross?-1:1)*50*Math.sin(a);k.fillStyle=ink;k.beginPath();k.arc(cx,cy,6,0,2*PI);k.fill();arrow(k,cx,cy,137,101,ink);let flipped=!!(side&&cross),left=flipped?'secondary':'primary',right=flipped?'primary':'secondary';let dialogueBeat=(lessonMode||lessonSubject?.eyes?.enabled||lessonSubject?.secondary?.eyes?.enabled)&&window.MPCourseSubject?MPCourseSubject.dialogue(p,.5):null,contact=dialogueBeat?MPCourseSubject.eyeContact(p,.5):null;function perform(role,x,face){let talk=dialogueBeat?(role==='primary'?dialogueBeat.aTalk:dialogueBeat.bTalk):0,listen=dialogueBeat?(role==='primary'?dialogueBeat.aListen:dialogueBeat.bListen):0;actor(k,x,153-(lessonMode?listen*.7:0),48,role,face,lessonMode?.08+talk*.48+listen*.12:0,0,lessonMode?-.035*talk+.018*listen:0,lessonMode?talk*.7:0,true,contact?(role==='primary'?contact.a:contact.b):.2)}perform(left,335,1);perform(right,455,-1);if(lessonMode){t(k,left==='primary'?'A':'B',335,54,12);t(k,right==='primary'?'A':'B',455,54,12)}frame(k,283,40,225,123);t(k,'轴线',63,91,12,coral);stageText(k,side?'机位 B':'机位 A');lessonCut(k,p,[.5]);caption(k,cross?'越轴后：屏幕左右关系发生变化':'同侧拍摄：屏幕左右关系保持');});
// F04: glance followed by the object being looked at.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),cut=param('cutAt',.48),x=269+param('targetX',0),a=param('gazeAngle',0)*PI/180;scene(k);if(p<cut){actor(k,193,151,80,'primary',1);arrow(k,245,86,320,86+75*Math.tan(a),teal);stageText(k,'① 人物看向画外')}else{object(k,x,100,75);stageText(k,'② 切到所看物体')}frame(k,22,35,495,130);caption(k,'视线建立方向，再揭示对象');});
// F05: same door-progress signal in both shot scales, with an optional intentional offset.
cells.push((k,w,h,u)=>{
 base(k);let p=phase(u),cut=param('cutAt',.5),wide=p<cut,q=Math.max(0,Math.min(1,p+(wide?0:param('offset',0)))),angle=param('doorAngle',75)*PI/180*q;
 scene(k);k.save();k.beginPath();k.rect(22,35,495,130);k.clip();
 let dx=wide?322:272,dy=wide?53:38,dh=wide?100:130,dw=wide?67:94,paired=lessonMode||!!slots.secondary;
 let action=paired&&window.MPCourseSubject?MPCourseSubject.door(q):null;
 k.fillStyle='#8a9db7';k.fillRect(dx,dy,dw,dh);k.fillStyle='#fcf7e8';k.fillRect(dx+5,dy+5,dw-10,dh-5);
 let doorW=Math.max(3,(dw-10)*Math.cos(angle));
 if(!fit(k,slots.object,dx+5,dy+5,doorW,dh-5,false)){k.fillStyle='#d89858';k.fillRect(dx+5,dy+5,doorW,dh-5);k.fillStyle='#70442c';k.beginPath();k.arc(dx+Math.max(7,doorW-6),dy+dh*.56,3,0,2*PI);k.fill()}
 actor(k,(wide?dx-22:dx-35)+(action?9*action.approach:0),155,wide?48:70,'primary',1,action?action.reach:q,action?action.step:0,action?.065*action.lean:0,0,true,action?.1+.25*action.reach+.35*action.acknowledge:0);
 if(paired){let reply=action?action.partner:q,ack=action?action.acknowledge:0;actor(k,dx+dw+(wide?36:39)+12*reply,155,wide?40:58,'secondary',-1,.08+.27*ack,action?-action.partnerStep:0,-.04*reply,.18*ack,true,-.15+.25*reply+.4*ack)}
 k.restore();frame(k,22,35,495,130);stageText(k,wide?'① 全景 · 推门':'② 近景 · 接续推门');lessonCut(k,p,[cut]);caption(k,'动作进度 '+Math.round(q*100)+'% · 偏移 0 为连续');
});
// F06: a foreground element passes in front of a persistent subject.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),x=269+(2*p-1)*param('coverSpeed',430),width=param('coverWidth',140);scene(k);actor(k,269+param('subjectX',0),151,67,'primary',1,.4);if(!fit(k,slots.foreground,x-width/2,35,width,130,true)){k.fillStyle='#526782';k.fillRect(x-width/2,35,width,130);k.fillStyle='#7f94ac';k.fillRect(x-width/2+8,35,8,130)}frame(k,22,35,495,130);stageText(k,'前景经过 · 遮挡与揭示');caption(k,'前景遮挡后，主体重新出现');});
// F07: background, middle subject and foreground; blur uses Canvas filters only.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),fg=param('foregroundX',90),bb=param('backgroundBlur',3),fb=param('foregroundBlur',2);k.save();k.filter='blur('+bb+'px)';scene(k);k.restore();actor(k,269+8*Math.sin(2*PI*p),151,65,'primary',1);k.save();k.filter='blur('+fb+'px)';if(!fit(k,slots.foreground,fg-45,57,90,105,false)){k.fillStyle='#699a8a';k.beginPath();k.ellipse(fg,116,34,55,-.3,0,2*PI);k.fill()}k.restore();frame(k,22,35,495,130);stageText(k,'前景 · 中景 · 背景');caption(k,'模糊是二维示意，不代表真实景深');});
// F08: guide lines converge on an editable vanishing point.
cells.push((k,w,h,u)=>{base(k);let x=param('vanishingX',270),y=param('vanishingY',92),n=param('lineCount',4),p=phase(u);scene(k);for(let i=0;i<n;i++){let f=(i+1)/(n+1);linePath(k,[[22,35+130*f],[x,y]],'#9fb8d8',2);linePath(k,[[517,35+130*f],[x,y]],'#9fb8d8',2)}actor(k,x,y+35+2*Math.sin(2*PI*p),42,'primary',1);frame(k,22,35,495,130);stageText(k,'线条汇聚到主体附近');caption(k,'移动消失点，观察视线引导');});
// F09: a foreground frame surrounds a moving subject.
cells.push((k,w,h,u)=>{base(k);let ow=param('openingWidth',220),oh=param('openingHeight',128),p=phase(u),travel=param('travel',45);scene(k);actor(k,269+travel*Math.sin(2*PI*p),151,58,'primary',1);if(!fit(k,slots.foreground,22,35,495,130,true)){let left=269-ow/2,top=100-oh/2;k.fillStyle='#536b87';k.fillRect(22,35,Math.max(0,left-22),130);k.fillRect(left+ow,35,Math.max(0,517-left-ow),130);k.fillRect(left,35,ow,Math.max(0,top-35));k.fillRect(left,top+oh,ow,Math.max(0,165-top-oh));k.strokeStyle='#90a5bd';k.lineWidth=7;k.strokeRect(left,top,ow,oh)}frame(k,22,35,495,130);stageText(k,'前景框架 · 中景主体');caption(k,'用门窗等框架突出画内人物');});
// F10: staged 2D light overlays, explicitly an illustration rather than physical lighting.
cells.push((k,w,h,u)=>{
 base(k);let p=phase(u),key=param('key',.8),fill=param('fill',.5),rim=param('rim',.7),dir=param('direction',-1),on1=p>=.15,on2=p>=.4,on3=p>=.68,paired=lessonMode||!!slots.secondary;
 let beat=paired&&window.MPCourseSubject?MPCourseSubject.lightPair(p):{first:0,second:0,settleA:0,settleB:0};
 let ax=226+4*beat.settleA,bx=360-4*beat.settleB;
 scene(k);if(lessonMode){k.save();k.beginPath();k.rect(22,35,495,130);k.clip();if(on1){let glow=k.createLinearGradient(dir<0?40:498,50,dir<0?400:139,160);glow.addColorStop(0,'rgba(255,224,155,'+(key*.32)+')');glow.addColorStop(1,'rgba(255,224,155,0)');k.fillStyle=glow;k.beginPath();k.moveTo(dir<0?22:517,37);k.lineTo(dir<0?390:149,165);k.lineTo(dir<0?22:517,165);k.closePath();k.fill()}k.fillStyle='rgba(21,38,61,.18)';for(const x of paired?[ax,bx]:[269]){k.beginPath();k.ellipse(x,154,paired?35:58,7,0,0,2*PI);k.fill()}k.restore()}
 let off=lightCanvas,c=lightCtx;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);c.globalCompositeOperation='source-over';
 if(paired){actor(c,ax,151,65,'primary',1,.10+.24*beat.first,.13*beat.settleA,-.03*beat.first,0,true,.2+.55*beat.first);actor(c,bx,151,65,'secondary',-1,.08+.24*beat.second,-.13*beat.settleB,-.03*beat.second,0,true,.2+.55*beat.second)}else actor(c,269,151,90,'primary',1);
 c.globalCompositeOperation='source-atop';let grad=c.createLinearGradient(paired?155:185,0,paired?411:353,0);
 if(dir<0){grad.addColorStop(0,'rgba(255,228,155,'+(on1?key*.6:0)+')');grad.addColorStop(1,'rgba(39,59,102,'+(on2?(1-fill)*(lessonMode?.7:.4):(lessonMode?.7:.4))+')')}else if(dir>0){grad.addColorStop(1,'rgba(255,228,155,'+(on1?key*.6:0)+')');grad.addColorStop(0,'rgba(39,59,102,'+(on2?(1-fill)*(lessonMode?.7:.4):(lessonMode?.7:.4))+')')}else{grad.addColorStop(0,'rgba(255,228,155,'+(on1?key*.35:0)+')');grad.addColorStop(1,'rgba(255,228,155,'+(on1?key*.35:0)+')')}
 c.fillStyle=grad;c.fillRect(paired?145:150,25,paired?285:240,140);if(on3){for(const x of paired?[ax,bx]:[269]){let edge=c.createLinearGradient(x-34,0,x+34,0);edge.addColorStop(0,'rgba(255,236,172,'+rim*.85+')');edge.addColorStop(.35,'rgba(255,236,172,0)');edge.addColorStop(.65,'rgba(255,236,172,0)');edge.addColorStop(1,'rgba(255,236,172,'+rim*.85+')');c.fillStyle=edge;c.fillRect(x-49,25,98,140)}}
 k.drawImage(off,0,0);t(k,'主光 '+(on1?Math.round(key*100):0)+'%',82,70,14,'#ae7938');t(k,'补光 '+(on2?Math.round(fill*100):0)+'%',82,101,14,teal);t(k,'轮廓 '+(on3?Math.round(rim*100):0)+'%',82,132,14,blue);frame(k,22,35,495,130);stageText(k,'主光 → 补光 → 轮廓光');caption(k,'二维颜色叠加示意，不是物理布光');
});
// F11: position in overhead plan and the frontal view are driven by the same time signal.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),q=(1-Math.cos(2*PI*p))/2,beat=lessonMode&&window.MPCourseSubject?MPCourseSubject.walk(p):null,qa=beat?beat.a:q,qb=beat?beat.b:q,dist=param('separation',100),move=param('travel',78),camera=param('cameraX',0),ax=137-dist*.5+move*.45*qa,bx=137+dist*.5-move*.45*qb;scene(k,285,40,223,123);k.fillStyle='#e8eef7';k.fillRect(25,40,225,123);let pathA=lessonMode?137-dist*.5:ax,pathB=lessonMode?137+dist*.5:bx;linePath(k,[[pathA,70],[pathA+move*.45,70]],'#93add1',2,true);linePath(k,[[pathB,122],[pathB-move*.45,122]],'#e4a9a1',2,true);actor(k,ax,85,28,'primary',1);actor(k,bx,137,28,'secondary',-1);if(lessonMode){t(k,'A',ax-14,51,11,blue);t(k,'B',bx+14,101,11,coral)}k.fillStyle=ink;k.beginPath();k.arc(137+camera,151,5,0,2*PI);k.fill();let ga=beat&&move?Math.sin(qa*6*PI)*Math.min(1,Math.abs(beat.velocityA)*.3)*.8:0,gb=beat&&move?Math.sin(qb*6*PI)*Math.min(1,Math.abs(beat.velocityB)*.3)*.8:0,respond=beat&&move?beat.recognition:0;actor(k,340+(ax-87)*.55-camera*.4,154-1.6*Math.abs(ga),48,'primary',1,lessonMode?.12+respond*.2:0,ga,lessonMode?-.035*respond:0,0,true,.12+.30*qa+.38*respond);actor(k,456+(bx-187)*.55-camera*.4,154-1.6*Math.abs(gb),48,'secondary',-1,lessonMode?.10+respond*.3:0,gb,lessonMode?-.025*respond:0,0,true,.12+.30*qb+.38*respond);frame(k,285,40,223,123);stageText(k,'俯视走位 ↔ 镜头画面');caption(k,'同一动作，观察人物空间关系');});
// F12: three actual sequential shots, with shared subject and prop assets.
cells.push((k,w,h,u)=>{
 base(k);let p=phase(u),first=param('firstCut',.3),second=param('secondCut',.67),sz=param('objectScale',1),paired=lessonMode||!!slots.secondary;scene(k);
 if(p<first){let look=paired&&first>0?Math.min(1,p/first):0;actor(k,200+3*look,150,57,'primary',1,.08*look,0,-.015*look,0,true,-.25+.65*look);object(k,355,125,38*sz);if(paired)actor(k,438-2*look,150,48,'secondary',-1,.08*look,0,-.012*look,0,true,-.2+.6*look);stageText(k,'① 场景全貌')}
 else if(p<second){object(k,269,102,85*sz);stageText(k,'② 插入线索')}
 else{let r=Math.max(0,Math.min(1,(p-second)/Math.max(.001,1-second))),beat=paired&&window.MPCourseSubject?MPCourseSubject.reactionPair(r):null,response=paired?(beat?beat.first:r):1;
 actor(k,(paired?197:269)+(paired?5*response:0),paired?159:180,paired?69:105,'primary',1,response,0,paired?-.045*response:0,paired?response*.7:0,true,beat?-.45+1.1*beat.turnA:0);
 if(paired){let reply=beat?beat.second:r;actor(k,369-4*reply,159,69,'secondary',-1,.08+.55*reply,0,-.04*reply,reply*.5,true,beat?-.45+1.1*beat.turnB:0)}stageText(k,'③ 人物反应')}
 frame(k,22,35,495,130);lessonCut(k,p,[first,second]);caption(k,'整体 → 线索 → 反应');
});

// Axis diagrams are 2D teaching schematics. Screen movement and camera side use the same time signal.
function axisPanel(k){k.fillStyle='#e8eef7';k.fillRect(25,40,225,123);scene(k,283,40,225,123);frame(k,283,40,225,123)}
function pin(k,x,y,label,color){k.fillStyle=color;k.beginPath();k.arc(x,y,9,0,2*PI);k.fill();t(k,label,x,y,11,'#fff')}
function camera(k,x,y,tx=137,ty=101){k.fillStyle=ink;k.beginPath();k.arc(x,y,5,0,2*PI);k.fill();arrow(k,x,y,tx,ty,ink)}
function axisLine(k,a,b){linePath(k,[a,b],coral,2,true)}
// F13: unchanging world direction, with optional change of camera side at the cut.
cells.push((k,w,h,u)=>{base(k);axisPanel(k);let p=phase(u),cut=param('cutAt',.5),across=param('crossLine',0),travel=param('travel',115),late=p>=cut,side=late&&across?-1:1,x=50+175*p;axisLine(k,[40,101],[235,101]);pin(k,x,101,'人',blue);arrow(k,55,75,205,75,teal);camera(k,late?180:95,late&&across?55:146);let sx=395+side*travel*(p-.5);actor(k,sx,153,52,'primary',side);arrow(k,355,64,355+side*72,64,teal);stageText(k,late?(across?'② 越轴机位':'② 同侧机位'):'① 原机位');caption(k,side>0?'实际行进向右 · 画面向右':'实际行进向右 · 画面向左');});
// F14: opposing eyelines for an A/B dialogue, with a switch for crossing the line.
cells.push((k,w,h,u)=>{base(k);axisPanel(k);let p=phase(u),second=p>=param('cutAt',.5),cross=param('crossLine',0),sep=param('separation',95),a=137-sep*.48,b=137+sep*.48;axisLine(k,[40,101],[235,101]);pin(k,a,101,'A',blue);pin(k,b,101,'B',coral);camera(k,second?178:96,second&&cross?55:146);let direction=second&&!cross?-1:1,beat=(lessonMode||lessonSubject?.eyes?.enabled||lessonSubject?.secondary?.eyes?.enabled)&&window.MPCourseSubject?MPCourseSubject.dialogue(p,param('cutAt',.5)):null,speech=beat?(second?beat.bTalk:beat.aTalk):0,listen=beat?(second?beat.bListen:beat.aListen):0,contact=beat?MPCourseSubject.eyeContact(p,param('cutAt',.5)):null;actor(k,395,154-(lessonMode?listen*.8:0),72,second?'secondary':'primary',direction,lessonMode?.08+.5*speech+.12*listen:0,0,lessonMode?-.035*speech+.02*listen:0,lessonMode?.7*speech:0,true,contact?(second?contact.b:contact.a):.2);arrow(k,396,65,396+direction*65,65,teal);stageText(k,second?'② B 的对话镜头':'① A 的对话镜头');lessonCut(k,p,[param('cutAt',.5)]);caption(k,second&&cross?'越轴对照：双方可能朝同一画面方向':'同侧正反打：示意视线相向');});
// F15: an axial neutral shot is an optional reorientation, not a guarantee of continuity.
cells.push((k,w,h,u)=>{base(k);axisPanel(k);let p=phase(u),first=param('firstCut',.3),second=param('secondCut',.68),sep=param('separation',95),st=p<first?0:p<second?1:2,a=137-sep*.48,b=137+sep*.48;axisLine(k,[40,101],[235,101]);pin(k,a,101,'A',blue);pin(k,b,101,'B',coral);camera(k,[96,48,180][st],[146,101,55][st]);if(st===1){actor(k,395,154,70,'primary',1);t(k,'轴上方向',395,57,13,teal)}else{let left=st===0?'primary':'secondary',right=st===0?'secondary':'primary';actor(k,395-sep*.55,152,47,left,1);actor(k,395+sep*.55,152,47,right,-1)}stageText(k,['① 原侧镜头','② 轴上中性镜头','③ 换到另一侧'][st]);caption(k,'中性镜头有助重新定向，仍需检查衔接');});
// F16: the top-down camera travels continuously; the view uses a simple orthographic horizontal projection.
cells.push((k,w,h,u)=>{base(k);axisPanel(k);let p=phase(u),q=(1-Math.cos(2*PI*p))/2,angle=PI/2+q*param('sweep',180)*PI/180,sep=param('separation',95),show=param('showAxis',1),cx=137+50*Math.cos(angle),cy=101+50*Math.sin(angle),projection=Math.sin(angle);if(show)axisLine(k,[40,101],[235,101]);pin(k,137-sep*.48,101,'A',blue);pin(k,137+sep*.48,101,'B',coral);k.save();k.strokeStyle='#9bb5d7';k.lineWidth=2;k.setLineDash([4,4]);k.beginPath();k.ellipse(137,101,50,50,0,0,2*PI);k.stroke();k.restore();camera(k,cx,cy);actor(k,395-sep*.55*projection,153,49,'primary',projection>=0?1:-1);actor(k,395+sep*.55*projection,153,49,'secondary',projection>=0?-1:1);stageText(k,'连续运镜 · 摄影机跨轴');caption(k,'二维投影示意：位置随视角连续变化');});
// F17: use a wide view to re-establish the actors after changing to the opposite side.
cells.push((k,w,h,u)=>{base(k);axisPanel(k);let p=phase(u),first=param('firstCut',.3),second=param('secondCut',.68),sep=param('separation',95),st=p<first?0:p<second?1:2;axisLine(k,[40,101],[235,101]);pin(k,137-sep*.48,101,'A',blue);pin(k,137+sep*.48,101,'B',coral);camera(k,st?180:96,st?55:146);if(st===2){actor(k,395,153,72,'secondary',1);arrow(k,400,66,458,66,teal)}else{actor(k,395-sep*.55,153,47,st?'secondary':'primary',1);actor(k,395+sep*.55,153,47,st?'primary':'secondary',-1)}stageText(k,['① 原侧空间','② 新侧全景','③ 新侧后续镜头'][st]);caption(k,'全景交代位置，方向变化仍需检查');});
// F18: highlight the current conversational pair in a three-person layout.
cells.push((k,w,h,u)=>{base(k);axisPanel(k);let p=phase(u),second=p>=param('cutAt',.5),a=[65,107],b=[135,107],c=[param('thirdX',181),param('thirdY',65)];axisLine(k,second?b:a,second?c:b);pin(k,a[0],a[1],'A',blue);pin(k,b[0],b[1],'B',coral);pin(k,c[0],c[1],'C',teal);camera(k,137,150,second?(b[0]+c[0])/2:(a[0]+b[0])/2,second?(b[1]+c[1])/2:107);actor(k,345,153,53,second?'secondary':'primary',1);actor(k,455,153,53,second?'third':'secondary',-1);stageText(k,second?'② B 与 C 交流':'① A 与 B 交流');caption(k,'交流对象变化时，重新检查视线与机位');});

// Editing examples use two independent static background slots; the second fallback is visually distinct.
function sceneVariant(k,isB,x=22,y=35,w=495,h=130){
 if(!isB){scene(k,x,y,w,h);return}
 k.save();k.beginPath();k.rect(x,y,w,h);k.clip();k.fillStyle='#f4e0cf';k.fillRect(x,y,w,h);
 if(!fit(k,slots.backgroundB,x,y,w,h,true)){k.fillStyle='#d9b9a9';k.fillRect(x,y+h*.67,w,h*.33);k.fillStyle='#e3c5b5';k.fillRect(x+w*.14,y+h*.15,w*.19,h*.52);k.fillRect(x+w*.7,y+h*.07,w*.14,h*.6);linePath(k,[[x,y+h*.67],[x+w,y+h*.67]],'#bc958d',2)}k.restore();
}
// The small rails describe this example's playback time, not source-media timeline tracks.
function editRail(k,p,cuts){let x=87,w=365,y=169;k.fillStyle='#d4deeb';k.fillRect(x,y,w,3);for(const q of cuts){let xx=x+w*q;k.fillStyle=coral;k.fillRect(xx-1,y-3,2,9)}k.fillStyle=blue;k.beginPath();k.arc(x+w*p,y+1.5,4,0,2*PI);k.fill()}
function eventGauge(k,q){let x=350,y=44,w=145;k.fillStyle='rgba(255,255,255,.8)';k.fillRect(x-3,y-3,w+6,12);k.fillStyle='#d0dbea';k.fillRect(x,y,w,5);k.fillStyle=teal;k.fillRect(x,y,w*Math.max(0,Math.min(1,q)),5)}
function segmentRail(k,x,w,count,p){let y=169;k.fillStyle='#d4deeb';k.fillRect(x,y,w,3);for(let i=1;i<count;i++){k.fillStyle=coral;k.fillRect(x+w*i/count-1,y-2,2,7)}k.fillStyle=blue;k.beginPath();k.arc(x+w*p,y+1.5,3.5,0,2*PI);k.fill()}
// F19: the source-story clock advances across the cut without changing playback rate.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),cut=param('cutAt',.5),skip=param('skipSeconds',4),rate=param('travelRate',20),story=p*cycle+(p>=cut?skip:0),x=70+story*rate,gait=.8*Math.sin(story*rate*PI/30);scene(k);actor(k,x,151,58,'primary',1,0,gait);frame(k,22,35,495,130);stageText(k,'故事时间 '+story.toFixed(1)+' 秒');editRail(k,p,[cut]);caption(k,p<cut?'切镜前：动作进行中':'切镜后：省略 '+skip+' 秒');});
// F20: the second view starts at an earlier event-progress value when overlap is nonzero.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),cut=param('cutAt',.5),overlap=param('overlap',.2),distance=param('movement',135),a=p<cut,q=a?.65*p/cut:.65-overlap+(p-cut)/(1-cut)*(.35+overlap),gait=.75*Math.sin(q*4*PI);scene(k);actor(k,(a?115:145)+distance*q,153,a?55:75,'primary',1,.5*Math.sin(q*PI),gait);eventGauge(k,q);frame(k,22,35,495,130);stageText(k,a?'① 第一视角':'② 第二视角 · 重复一段动作');editRail(k,p,[cut]);caption(k,'动作进度 '+Math.round(q*100)+'% · 重复 '+Math.round(overlap*100)+'%');});
// F21: an event occurs before the reaction shot; the reaction symbol is a visual cue.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),cut=param('cutAt',.55),reaction=param('reaction',1),os=param('objectScale',1);scene(k);if(p<cut){actor(k,155,153,58,'primary',1);actor(k,250,153,45,'secondary',-1);let q=Math.min(1,p/.25),y=55+78*q*q;object(k,340,y,37*os);if(p>=.25&&p<.38){let alpha=1-(p-.25)/.13;k.save();k.globalAlpha=alpha;linePath(k,[[312,146],[302,149]],coral,3);linePath(k,[[368,146],[378,149]],coral,3);k.restore()}stageText(k,'① 事件：道具落下')}else{let q=Math.min(1,(p-cut)/.14),shock=Math.sin(PI*q/2)*reaction;actor(k,269,175,92,'secondary',1,shock,0,-.1*shock,shock);t(k,'！',343,71,Math.round(32*reaction),coral);stageText(k,'② 人物反应')}frame(k,22,35,495,130);editRail(k,p,[cut]);caption(k,'观察事件后，再切到人物反应');});
// F22: the camera switches scene only while an opaque foreground rectangle fully covers the frame.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),cut=param('cutAt',.5),width=param('maskWidth',520),isB=p>=cut,cx=p<cut?-width/2+(269.5+width/2)*p/cut:269.5+(539+width/2-269.5)*(p-cut)/(1-cut);sceneVariant(k,isB);actor(k,(isB?335:205)+param('subjectX',0),153,62,'primary',1);k.save();k.beginPath();k.rect(22,35,495,130);k.clip();k.fillStyle='#526782';k.fillRect(cx-width/2,35,width,130);fit(k,slots.foreground,cx-width/2,35,width,130,true);k.restore();frame(k,22,35,495,130);stageText(k,isB?'② 场景 B':'① 场景 A');editRail(k,p,[cut]);caption(k,'切点发生在遮挡物完全覆盖画面时');});
// F23: simultaneous independent panels, each with its own background and subject.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),split=param('split',.5),x=22+495*split,move=param('movement',24),offset=param('offset',.25),a=2*PI*p,b=2*PI*(p+offset),g1=move?.7*Math.sin(3*a)*Math.cos(a):0,g2=move?.7*Math.sin(3*b)*Math.cos(b):0;sceneVariant(k,false,22,35,x-24,130);sceneVariant(k,true,x+2,35,515-x,130);k.save();k.beginPath();k.rect(22,35,x-24,130);k.clip();actor(k,(22+x)/2+move*Math.sin(a),153,54,'primary',1,0,g1);k.restore();k.save();k.beginPath();k.rect(x+2,35,515-x,130);k.clip();actor(k,(x+517)/2+move*Math.sin(b),153,54,'secondary',-1,0,g2);k.restore();linePath(k,[[x,35],[x,165]],'#f7f9fd',4);frame(k,22,35,495,130);stageText(k,'左右画面同时出现');caption(k,'分屏并置：同步比较两组画面');});
// F24: both camera views use the same event-progress value.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),cut=param('cutAt',.5),movement=param('movement',80),os=param('objectScale',1),wide=p<cut,q=(1-Math.cos(2*PI*p))/2;scene(k);actor(k,wide?165:155,153,wide?56:80,'primary',1);object(k,(wide?250:260)+movement*q*(wide?1:.8),wide?105:93,(wide?34:50)*os);eventGauge(k,q);frame(k,22,35,495,130);stageText(k,wide?'① 机位 A':'② 机位 B');editRail(k,p,[cut]);caption(k,'往返动作进度 '+Math.round(q*100)+'% · 切镜不断开');});
// F25: two versus an editable number of visual segments in the same period, without audio.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),count=param('segmentCount',6),left=Math.min(1,Math.floor(p*2)),right=Math.min(count-1,Math.floor(p*count)),dx=param('subjectX',0),r=10*param('objectScale',1);function panel(x,w,index){let alt=index%2===1;sceneVariant(k,alt,x,35,w,130);k.save();k.beginPath();k.rect(x,35,w,130);k.clip();actor(k,x+w/2+dx,153,55,alt?'secondary':'primary',alt?-1:1);k.restore();k.fillStyle=alt?coral:blue;k.beginPath();k.arc(x+20,57,r,0,2*PI);k.fill();frame(k,x,35,w,130)}panel(22,239,left);panel(278,239,right);segmentRail(k,35,213,2,p);segmentRail(k,291,213,count,p);t(k,'2 段 · '+(left+1),141,19,16);t(k,count+' 段 · '+(right+1),397,19,16);caption(k,'同一周期内，镜头段数改变视觉节奏');});
// F26: three non-linear story phases, with a visible optional memory tint.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),first=param('firstCut',.3),second=param('secondCut',.7),memory=p>=first&&p<second,tint=param('tint',.35);sceneVariant(k,memory);actor(k,(memory?260:235)+9*Math.sin(2*PI*p),153,65,'primary',1);if(!memory){k.fillStyle='#fff';k.fillRect(353,58,64,57);k.strokeStyle='#829ab9';k.lineWidth=3;k.strokeRect(353,58,64,57);object(k,385,86,40);arrow(k,282,84,338,84,teal)}else{object(k,370,106,61)}if(memory){k.save();k.globalAlpha=tint;k.fillStyle='#c78f55';k.fillRect(22,35,495,130);k.restore()}frame(k,22,35,495,130);stageText(k,p<first?'① 现在':memory?'② 回忆':'③ 返回现在');editRail(k,p,[first,second]);caption(k,'画中物件引出回忆，再返回现在');});

// F27–F31: additional lighting and audible editing examples.
cells.push((k,w,h,u)=>{base(k);let p=phase(u),soft=param('softness',18),power=param('lightPower',.6),edge=6*Math.sin(2*PI*p);scene(k);let c=lightCtx;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);c.globalCompositeOperation='source-over';actor(c,150,151,60);actor(c,390,151,60);c.globalCompositeOperation='source-atop';c.fillStyle='rgba(27,42,71,'+power+')';c.fillRect(150+edge,35,80,130);let gradient=c.createLinearGradient(390+edge-soft,0,390+edge+soft,0);gradient.addColorStop(0,'rgba(27,42,71,0)');gradient.addColorStop(1,'rgba(27,42,71,'+power+')');c.fillStyle=gradient;c.fillRect(350,35,100,130);c.globalCompositeOperation='source-over';k.drawImage(lightCanvas,0,0);frame(k,22,35,495,130);t(k,'硬光',145,20,16);t(k,'软光',390,20,16);caption(k,'阴影边缘宽度对照 · 二维示意');});
cells.push((k,w,h,u)=>{base(k);let p=phase(u),x=param('windowX',120),power=param('lightPower',.45);scene(k);k.fillStyle='#e7f8ff';k.fillRect(x-38,47,76,73);k.strokeStyle='#7398ac';k.lineWidth=4;k.strokeRect(x-38,47,76,73);k.beginPath();k.moveTo(x,47);k.lineTo(x,120);k.stroke();k.save();k.globalAlpha=power*(.72+.28*Math.sin(p*2*PI));k.fillStyle='#fff6b3';k.beginPath();k.moveTo(x+38,48);k.lineTo(x+235,160);k.lineTo(x+35,160);k.closePath();k.fill();k.restore();actor(k,300,153,62);frame(k,22,35,495,130);t(k,'窗户',x,20,15);caption(k,'光线方向呼应画面中的窗户 · 二维示意');});
function audioCut(k,u,kind){base(k);let p=phase(u),cut=param('cutAt',.5),offset=param('offset',.18),sound=kind==='J'?cut-offset:cut+offset,alt=p>=cut;sceneVariant(k,alt);let isB=p>=sound,beat=kind==='J'&&(lessonMode||lessonSubject?.eyes?.enabled||lessonSubject?.secondary?.eyes?.enabled)&&window.MPCourseSubject?MPCourseSubject.dialogue(p,cut):null,gesture=beat?(alt?beat.bTalk:beat.aTalk):0,listen=beat?(alt?beat.bListen:beat.aListen):0,contact=beat?MPCourseSubject.eyeContact(p,cut):null;actor(k,alt?350:190,153-.7*listen,60,alt?'secondary':'primary',alt?-1:1,gesture*.4+listen*.1,0,-.025*gesture,gesture*.5,true,contact?(alt?contact.b:contact.a):.2);if(lessonMode&&kind==='J'){k.save();k.fillStyle=isB?'rgba(29,143,125,.92)':'rgba(38,72,117,.85)';k.beginPath();k.roundRect(335,43,165,24,6);k.fill();t(k,isB?'B 音轨阶段':'A 音轨阶段',417,55,12,'#fff');k.restore()}frame(k,22,35,495,130);stageText(k,alt?'画面 B':'画面 A');k.fillStyle='#c9d5e5';k.fillRect(55,171,430,7);k.fillStyle=teal;k.fillRect(55+430*sound,171,430*(1-sound),7);if(lessonMode&&kind==='J'){k.fillStyle=ink;k.fillRect(55+430*cut,166,2,16)}k.fillStyle=coral;k.fillRect(55+430*p,166,3,16);caption(k,kind==='J'?'声音 B 提前进入 · 点击试听':'声音 A 延续到画面 B · 点击试听');}
cells.push((k,w,h,u)=>audioCut(k,u,'J'));
cells.push((k,w,h,u)=>audioCut(k,u,'L'));
cells.push((k,w,h,u)=>{base(k);let p=phase(u),cut=param('cutAt',.5);scene(k);actor(k,269+30*Math.sin(p*2*PI),153,60);frame(k,22,35,495,130);stageText(k,p<cut?'配乐 A':'配乐 B');editRail(k,p,[cut]);caption(k,'同一画面比较两段音乐 · 点击试听');});

// F32–F55: sound-driven teaching diagrams. Parameters also drive film-audio.js.
function soundBar(k,label,x,y,width,begin,end,color,playhead){
 t(k,label,x-24,y+5,11);k.fillStyle='#d8e0ec';k.fillRect(x,y,width,10);k.fillStyle=color;k.fillRect(x+width*begin,y,width*(end-begin),10);k.fillStyle=coral;k.fillRect(x+width*playhead-1,y-3,2,16);
}
function soundDemo(k,u,id){
 base(k);let p=phase(u),cut=param('cutAt',.5),start=param('startAt',.2),end=param('endAt',.75),at=param('eventAt',.5),amount=param('amount',.65),mix=param('mix',.5),active=p>=start&&p<end,alt=p>=cut;
 if(id==='F32'||id==='F40'||id==='F52')sceneVariant(k,id==='F52'?Math.floor(p*4)%2===1:alt);else scene(k);
 const isFoot=id==='F43',isDistance=id==='F47',isPan=id==='F48',isObject=['F39','F45','F46','F49','F50'].includes(id);
 let x=isDistance?130+250*p:isPan?130+250*p:235;
 if(isFoot)actor(k,120+300*p,151,59,'primary',1,0,Math.sin(2*PI*p*2));
 else if(id==='F44')actor(k,235,151,60,'primary',1,0,0,(p>=at&&p<at+.22)?Math.sin((p-at)/.22*PI)*.3:0);
 else if(id==='F40'&&!alt){t(k,'？',370,90,36,coral);actor(k,205,151,60)}
 else actor(k,x,151,60,'primary',1);
 if(id==='F35'&&p>=at&&p<at+.18)object(k,370,105,54);
 if(isObject){let q=(id==='F45'||id==='F46'||id==='F49')?Math.max(0,1-Math.abs(p-at)*7):0;object(k,370,120+q*20,42)}
 if(id==='F41'||id==='F42'||id==='F51'){for(let i=0;i<7;i++){let y=55+((i*29+p*70)%80);linePath(k,[[335+i*19,y],[340+i*19,y+12]],'#79a5c2',2)}}
 if(id==='F48'){arrow(k,90,57,450,57,teal);t(k,'左',80,58,13);t(k,'右',460,58,13)}
 if(id==='F49'){for(let i=1;i<=3;i++){k.strokeStyle='rgba(50,130,180,'+(.6-i*.13)+')';k.beginPath();k.arc(370,120,i*16+15*p,0,2*PI);k.stroke()}}
 if(id==='F50'){k.fillStyle='#dbe7f0';k.fillRect(333,45,78,27);t(k,'电话滤波',372,59,13)}
 frame(k,22,35,495,130);
 let title={F32:alt?'② 场景 B · 同一声音继续':'① 场景 A · 同一声音开始',F33:'配乐起止点',F34:'主题声音重复出现',F35:'声音与画面同步点',F36:'音乐渐强与释放',F37:'音乐留白',F38:'对白出现时降低配乐',F39:alt?'② 画外配乐':'① 画内收音机',F40:alt?'② 声源揭示':'① 画外先听见',F41:'环境声音持续',F42:'底噪填补对白间隙',F43:'脚步和落脚对齐',F44:'转身与衣物声',F45:'物体与接触声',F46:'两条声音叠加',F47:'声音逐渐远离',F48:'立体声左右移动',F49:'声音反射与尾声',F50:'受限声音的滤波',F51:'环境声音与静默',F52:'画面与节拍同步',F53:'两段音乐衔接',F54:'顺应式音乐对照',F55:'反差式音乐对照'}[id];
 stageText(k,title);
 if(['F33','F36','F38','F40'].includes(id))soundBar(k,'声音',63,171,410,start,end,teal,p);
 else if(['F37','F51'].includes(id)){soundBar(k,'声音',63,171,410,0,start,teal,p);k.fillStyle=teal;k.fillRect(63+410*end,171,410*(1-end),10)}
 else if(['F35','F44','F45','F46','F49'].includes(id)){let duration=(id==='F44'||id==='F46')?.22:.18;soundBar(k,'事件',63,171,410,at,Math.min(1,at+duration),teal,p)}
 else if(id==='F34'){soundBar(k,'主题',63,171,410,.12,.28,teal,p);k.fillStyle=teal;k.fillRect(63+410*.56,171,410*.16,10)}
 else if(id==='F43'){soundBar(k,'脚步',63,171,410,0,.1,teal,p);k.fillStyle=teal;[.25,.5,.75].forEach(x=>k.fillRect(63+410*x,171,410*.1,10))}
 else if(id==='F52'){soundBar(k,'节拍',63,171,410,0,.045,teal,p);k.fillStyle=teal;[.25,.5,.75].forEach(x=>k.fillRect(63+410*x,171,410*.045,10))}
 else if(['F53','F54','F55'].includes(id)){soundBar(k,'音轨',63,171,410,0,cut,blue,p);k.fillStyle=teal;k.fillRect(63+410*cut,171,410*(1-cut),10)}
 else soundBar(k,'音轨',63,171,410,0,1,teal,p);
 if(id==='F32'||id==='F39'){k.fillStyle='#173152';k.fillRect(63+410*cut,168,2,16)}
 k.fillStyle=coral;k.fillRect(63+410*p-1,168,2,16);
 caption(k,'点击试听 · 可替换声音与画面素材');
}
cells.push((k,w,h,u)=>soundDemo(k,u,'F32'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F33'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F34'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F35'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F36'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F37'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F38'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F39'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F40'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F41'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F42'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F43'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F44'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F45'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F46'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F47'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F48'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F49'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F50'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F51'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F52'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F53'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F54'));
cells.push((k,w,h,u)=>soundDemo(k,u,'F55'));

// F56–F90: lighting, colour and time demonstrations; filters are illustrative.
function sceneAndActor(k,u,x=240){scene(k);actor(k,x,151,60,'primary',1,0,.4*Math.sin(2*PI*phase(u)))}
function visualDemo(k,u,id){
 base(k);let p=phase(u),a=param('strength',.65),cut=param('cutAt',.5),q=(1-Math.cos(2*PI*p))/2, alt=p>=cut;
 if(Number(id.slice(1))>=62&&Number(id.slice(1))<=71){
  let c=lightCtx;c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.clearRect(0,0,W,H);sceneAndActor(c,u,269);
  if(id==='F70'){
   k.drawImage(lightCanvas,0,0);k.save();k.globalAlpha=a*.45;let red=Math.round(255*(1-q)+111*q),green=Math.round(211*(1-q)+164*q),blue=Math.round(109*(1-q)+244*q);k.fillStyle='rgb('+red+','+green+','+blue+')';k.fillRect(22,35,495,130);k.restore();
  }else{
   k.save();k.beginPath();k.rect(22,35,245,130);k.clip();k.drawImage(lightCanvas,0,0);k.restore();
   k.save();k.beginPath();k.rect(270,35,247,130);k.clip();
   let fx='none';
   if(id==='F62')fx='brightness('+(1+.35*a)+') contrast('+(1+.25*a)+')';
   if(id==='F63')fx='sepia('+(.65*a)+') saturate('+(1+.5*a)+')';
   if(id==='F64')fx='sepia('+(.55*a)+') hue-rotate('+(-25*a)+'deg)';
   if(id==='F65')fx='brightness('+(1+.8*a)+')';
   if(id==='F66')fx='saturate('+(1+2*a)+')';
   if(id==='F67')fx='saturate('+(1+a)+')';
   if(id==='F68')fx='grayscale('+(a)+') sepia('+(a)+')';
   if(id==='F69'){c.clearRect(0,0,W,H);sceneVariant(c,true);actor(c,269,151,60);fx='sepia('+(a*.55)+') saturate('+(1-a*.25)+')';}
   if(id==='F71')fx='grayscale('+a+')';
   k.filter=fx;if(id==='F68'){paletteCtx.clearRect(0,0,135,52);paletteCtx.drawImage(lightCanvas,0,0,135,52);let im=paletteCtx.getImageData(0,0,135,52),px=im.data,colors=[[28,53,77],[190,118,82],[245,220,160]];for(let i=0;i<px.length;i+=4){let lum=.2126*px[i]+.7152*px[i+1]+.0722*px[i+2],col=colors[lum<85?0:lum<170?1:2];for(let j=0;j<3;j++)px[i+j]=Math.round(px[i+j]*(1-a)+col[j]*a)}paletteCtx.putImageData(im,0,0);k.filter='none';k.drawImage(paletteCanvas,0,0,W,H)}else k.drawImage(lightCanvas,0,0);k.filter='none';if(id==='F67'){let g=k.createLinearGradient(270,0,517,0);g.addColorStop(0,'rgba(45,115,240,'+(a*.38)+')');g.addColorStop(1,'rgba(255,145,35,'+(a*.38)+')');k.fillStyle=g;k.fillRect(270,35,247,130)}k.restore();
   t(k,'原画',145,20,15);t(k,'调整',390,20,15);
  }
  frame(k,22,35,495,130);caption(k,'二维滤镜示意 · 原始素材可替换');return;
 }
 if(['F72','F73','F75','F81','F89'].includes(id))sceneVariant(k,id==='F73'?Math.floor(p*(2+Math.round(a*4)))%2===1:alt);else scene(k);
 if(id==='F56'){object(k,110,80,55);k.save();k.globalAlpha=a*(.65+.35*q);k.fillStyle='#ffe8a1';k.beginPath();k.moveTo(110,84);k.lineTo(350,160);k.lineTo(75,160);k.fill();k.restore();actor(k,285,151,60)}
 else if(id==='F57'){actor(k,269,151,70);k.fillStyle='rgba(30,47,78,'+(a*.65*q)+')';k.fillRect(269,56,32,90);k.fillStyle='#526782';k.fillRect(410,62,22,95);t(k,'遮挡板',421,51,12)}
 else if(id==='F58'){actor(k,269,151,70);k.fillStyle=alt?'rgba(15,25,48,'+(a*.75)+')':'rgba(255,255,255,'+(a*.42)+')';k.fillRect(22,35,495,130);stageText(k,alt?'低调照明':'高调照明')}
 else if(id==='F59'){actor(k,269,151,70);let n=param('lineCount',5);k.save();k.beginPath();k.rect(22,35,495,130);k.clip();k.fillStyle='rgba(25,45,75,'+(a*.5)+')';for(let i=0;i<n;i++)k.fillRect(35+i*500/n+25*Math.sin(p*2*PI),35,22,130);k.restore()}
 else if(id==='F60'){actor(k,269,151,70);k.fillStyle='rgba(255,160,70,'+(a*.35*q)+')';k.fillRect(22,35,245,130);k.fillStyle='rgba(70,150,255,'+(a*.35*(1-q))+')';k.fillRect(270,35,247,130)}
 else if(id==='F61'||id==='F79'){actor(k,269,151,60);k.fillStyle='rgba(255,174,80,'+(a*.3*q)+')';k.fillRect(22,35,495,130);k.fillStyle='#f9c35a';k.beginPath();k.arc(65+p*390,65+45*q,16,0,2*PI);k.fill()}
 else if(id==='F72'){actor(k,165,151,55);if(!fit(k,slots.object,330,65,60,60,false)){k.fillStyle=alt?'#f4ce65':'#5289d9';k.beginPath();k.arc(360,95,25+12*a,0,2*PI);k.fill()}stageText(k,alt?'② 形状 B':'① 形状 A')}
 else if(id==='F73'){let index=Math.floor(p*(2+Math.round(a*4))),second=index%2===1;actor(k,second?365:165,151,60,second?'secondary':'primary');stageText(k,second?'行动线 B':'行动线 A')}
 else if(id==='F74'){actor(k,135+[0,100,195,270][Math.floor(p*4)]*(.25+.75*a),151,60);stageText(k,'位置跳变 · 省略动作')}
 else if(id==='F75'){sceneVariant(k,false);k.save();k.globalAlpha=Math.max(0,Math.min(1,(p-(cut-a*.25))/Math.max(.01,a*.5)));sceneVariant(k,true);k.restore();actor(k,269,151,60);stageText(k,'场景 A → 场景 B')}
 else if(id==='F76'){k.save();k.beginPath();k.rect(22,35,495,130);k.clip();k.translate(30*a*Math.sin(2*PI*p),0);scene(k);actor(k,130+260*p,151,60);k.restore();stageText(k,'持续镜头 · 没有切点')}
 else if(id==='F77'){actor(k,110+280*p,151,50);actor(k,110+280*p*(1-.7*a),95,30,'primary');t(k,'正常',75,135,12);t(k,'慢速',75,82,12)}
 else if(id==='F78'){let r=(1-a)*p+a*p*p;actor(k,100+340*r,151,60);stageText(k,'由慢到快 · 时间重映射')}
 else if(id==='F80'){let half=a*.18,start=Math.max(0,cut-half),end=Math.min(1,cut+half),r=p<start?p:p<end?start:p-(end-start);actor(k,100+340*Math.max(0,r),151,60);stageText(k,p>=start&&p<end?'定格':'运动中')}
 else if(id==='F81'){let index=p<.2+.2*a?0:p<.5+.12*a?1:p<.7+.04*a?2:p<.84?3:4;sceneVariant(k,index%2===1);actor(k,index%2?350:180,151,60);stageText(k,'镜头 '+(index+1)+' · 时长变化')}
 else if(id==='F82'){actor(k,269,151,60);k.fillStyle='rgba(42,60,86,'+(a*(alt?0:1))+')';if(!alt&&!fit(k,slots.foreground,205,35,130,130,true))k.fillRect(205,35,130,130);stageText(k,alt?'目标揭示':'遮挡线索')}
 else if(id==='F83'){actor(k,180,151,60);k.fillStyle='#3d4559';k.fillRect(390,50,75,110);k.fillStyle='#9e7655';k.fillRect(390,50,alt?43:75,110);k.fillStyle='#f2c95c';k.beginPath();k.arc(405,108,4,0,2*PI);k.fill();let x=alt?392:285,y=alt?108:93,size=32+12*a;if(!fit(k,slots.object,x-size/2,y-size/2,size,size,false)){k.strokeStyle='#d19d27';let z=size/40;k.lineWidth=5*z;k.beginPath();k.arc(x-7*z,y,7*z,0,2*PI);k.moveTo(x,y);k.lineTo(x+17*z,y);k.lineTo(x+17*z,y+6*z);k.stroke()}stageText(k,alt?'② 钥匙开门':'① 先展示钥匙线索')}
 else if(id==='F84'){actor(k,alt?285:160,151,60,'primary',alt?1:-1);object(k,365,102,35+20*a);stageText(k,alt?'② 人物发现':'① 观众先看到线索')}
 else if(id==='F85'){k.save();k.beginPath();k.rect(22,35,495,130);k.clip();k.translate(-a*20*Math.sin(p*2*PI),0);scene(k);actor(k,269+20*a*Math.sin(p*2*PI),151,60);if(!fit(k,slots.foreground,35+100*a*Math.sin(p*2*PI),46,90,115,false)){k.fillStyle='#669984';k.fillRect(40+100*a*Math.sin(p*2*PI),55,40,110)}k.restore()}
 else if(id==='F86'){let x=100+330*p;for(let i=4;i>=1;i--){k.save();k.globalAlpha=a*(5-i)*.09;actor(k,x-i*18,151,60);k.restore()}actor(k,x,151,60)}
 else if(id==='F87'){k.save();k.translate(a*10*Math.sin(p*30*PI),a*6*Math.cos(p*24*PI));scene(k);actor(k,269,151,60);k.restore()}
 else if(id==='F88'){actor(k,269,151,60);k.save();k.globalAlpha=a*.38;k.fillStyle='#111';for(let i=0;i<220;i++){let x=22+((i*91+Math.floor(p*24)*29)%495),y=35+((i*47+Math.floor(p*24)*31)%130);k.fillRect(x,y,1.5,1.5)}k.restore()}
 else if(id==='F89'){actor(k,alt?350:180,151,60,alt?'secondary':'primary');stageText(k,alt?'② 场景 B':'① 场景 A')}
 else if(id==='F90'){let c=lightCtx;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);c.globalCompositeOperation='source-over';actor(c,269,151,75);c.globalCompositeOperation='source-atop';c.fillStyle='rgba(18,28,49,'+(a*q)+')';c.fillRect(180,35,180,130);c.globalCompositeOperation='source-over';k.drawImage(lightCanvas,0,0);stageText(k,'主体暗化 · 逆光剪影示意')}
 frame(k,22,35,495,130);caption(k,'可替换画面素材 · 二维教学示意');
}
cells.push((k,w,h,u)=>visualDemo(k,u,'F56'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F57'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F58'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F59'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F60'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F61'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F62'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F63'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F64'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F65'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F66'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F67'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F68'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F69'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F70'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F71'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F72'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F73'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F74'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F75'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F76'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F77'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F78'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F79'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F80'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F81'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F82'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F83'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F84'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F85'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F86'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F87'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F88'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F89'));
cells.push((k,w,h,u)=>visualDemo(k,u,'F90'));

// F91: show thirds, centered framing, and symmetrical placement side by side.
cells.push((k,w,h,u)=>{
 base(k);let p=phase(u),shift=param('subjectOffset',0),opacity=param('gridOpacity',.5),active=Math.min(2,Math.floor(p*3));
 const xs=[22,190,358],width=159,labels=['三分构图','居中构图','对称构图'];
 xs.forEach((x,i)=>{
  scene(k,x,35,width,130);k.save();k.beginPath();k.rect(x,35,width,130);k.clip();
  // Each frame has a clear visual anchor; the pair is mirrored around the center.
  if(i===2){actor(k,x+width*.32+shift,151,43,'primary',1);actor(k,x+width*.68-shift,151,43,'primary',-1);}
  else actor(k,x+width*(i===0?1/3:1/2)+shift,151,52,'primary',1);
  k.save();k.globalAlpha=opacity;
  if(i===0){for(let n=1;n<3;n++){linePath(k,[[x+width*n/3,35],[x+width*n/3,165]],'#273f63',1.5);linePath(k,[[x,35+130*n/3],[x+width,35+130*n/3]],'#273f63',1.5)}k.fillStyle='#e95f55';k.beginPath();k.arc(x+width/3,35+130/3,3,0,2*PI);k.fill()}
  else linePath(k,[[x+width/2,35],[x+width/2,165]],'#273f63',2,true);
  k.restore();k.restore();
  frame(k,x,35,width,130);if(active===i){k.strokeStyle=coral;k.lineWidth=3;k.strokeRect(x+1,36,width-2,128)}t(k,labels[i],x+width/2,19,14);
 });
 caption(k,'同一素材对照构图 · 红框轮流提示');
});

// F92: reverse direction together with positions so the front space remains meaningful.
cells.push((k,w,h,u)=>{
 base(k);let p=phase(u),left=param('lookLeft',0)===1,margin=param('margin',48),active=p<.5?0:1;
 [22,278].forEach((x,i)=>{
  scene(k,x,35,239,130);let cx=x+(i===0?(left?margin:239-margin):(left?239-margin:margin)),direction=left?-1:1;
  k.save();k.beginPath();k.rect(x,35,239,130);k.clip();
  // Shade the open side, with an arrow and a baseline making its extent visible.
  let start=Math.max(x,Math.min(x+239,cx+direction*22)),edge=left?x+3:x+236;
  k.fillStyle='rgba(33,157,158,.16)';k.fillRect(Math.min(start,edge),45,Math.abs(edge-start),106);
  actor(k,cx,151,57,'primary',direction);
  let tip=Math.max(x+8,Math.min(x+231,cx+direction*42));arrow(k,cx+direction*15,82,tip,82,teal);
  linePath(k,[[start,142],[edge,142]],teal,2);linePath(k,[[start,137],[start,147]],teal,2);linePath(k,[[edge,137],[edge,147]],teal,2);k.restore();
  frame(k,x,35,239,130);if(active===i){k.strokeStyle=coral;k.lineWidth=3;k.strokeRect(x+1,36,237,128)}
  t(k,i===0?'前方留白较少':'前方留白较多',x+119.5,19,14);
 });
 caption(k,'人物朝向与前方留白一起比较');
});

// F93: screen direction persists across a cut, with an optional reversed comparison.
cells.push((k,w,h,u)=>{
 base(k);let p=phase(u),cut=param('cutAt',.5),dir=param('moveLeft',0)===1?-1:1,reverse=param('reverseAfterCut',0)===1,second=p>=cut,q=second?(p-cut)/(1-cut):p/cut,actual=second&&reverse?-dir:dir;
 let from=second?(actual>0?-30:569):(actual>0?72:467),to=second?(actual>0?467:72):(actual>0?569:-30);
 sceneVariant(k,second);k.save();k.beginPath();k.rect(22,35,495,130);k.clip();
 // Edge accents and a floor path make the exit and entry side visible during the cut.
 k.fillStyle='rgba(33,157,158,.13)';k.fillRect((second?(actual>0?22:505):(actual>0?505:22)),35,12,130);
 linePath(k,[[43,150],[496,150]],'rgba(33,157,158,.65)',2,true);
 actor(k,from+(to-from)*q,151,57,'primary',actual,0,.65*Math.sin(q*6*PI));k.restore();
 frame(k,22,35,495,130);arrow(k,245,55,245+actual*48,55,teal);stageText(k,second?(reverse?'② 场景 B · 方向反转':'② 场景 B · 方向延续'):'① 场景 A · 人物离开');
 editRail(k,p,[cut]);caption(k,reverse?'可对照有意反转的画面方向':'切镜前后保持屏幕运动方向');
});

// F94: one shared event clock controls the prop in both shots; offset illustrates mismatch.
cells.push((k,w,h,u)=>{
 base(k);let p=phase(u),cut=param('cutAt',.5),offset=param('continuityOffset',0),travel=param('travel',100),size=param('objectScale',1),second=p>=cut,q=Math.max(0,Math.min(1,p+(second?offset:0)));
 k.save();k.beginPath();k.rect(22,35,495,130);k.clip();
 if(second){k.translate(269,100);k.scale(1.15,1.15);k.translate(-269,-100)}
 scene(k);let objectX=215+travel*q,subjectScale=param('subjectScale',1);
 // A grounded prop and a following subject turn abstract motion into a readable push.
 actor(k,objectX-19*size-23*subjectScale,151,59,'primary',1,0,.18*Math.sin(q*4*PI));
 k.fillStyle='#b99a7d';k.fillRect(199,135,Math.min(260,travel+86),7);k.fillStyle='#8d725d';k.fillRect(211,142,7,23);k.fillRect(Math.min(446,travel+259),142,7,23);
 linePath(k,[[215,131],[215+travel,131]],'#fff4df',2,true);
 object(k,objectX,135-19*size,38*size);k.restore();frame(k,22,35,495,130);eventGauge(k,q);
 stageText(k,second?'② 第二镜 · 道具继续移动':'① 第一镜 · 道具移动中');editRail(k,p,[cut]);
 caption(k,'道具进度 '+Math.round(q*100)+'% · 接续偏移 '+Math.round(offset*100)+'%');
});

// F95: the exact same neutral character view alternates with two independently replaceable contexts.
cells.push((k,w,h,u)=>{
 base(k);let p=phase(u),faceFraction=param('faceFraction',.48),size=param('objectScale',1),second=p>=.5,local=(p% .5)*2,face=local<faceFraction;
 if(face){scene(k);actor(k,269,175,105,'primary',1,0,0,0,0,false);stageText(k,'同一人物画面')}
 else{
  sceneVariant(k,second);let image=second?slots.objectB:slots.object,sz=82*size;
  // Both contexts are framed as inserts on a surface; the uploaded images stay independent.
  k.fillStyle='rgba(104,76,61,.35)';k.fillRect(22,143,495,22);linePath(k,[[22,143],[517,143]],'rgba(255,255,255,.65)',2);
  if(!fit(k,image,269-sz/2,98-sz/2,sz,sz,false)){
   k.save();k.translate(269,98);k.scale(size,size);
   if(second){k.fillStyle='#799ac6';k.fillRect(-38,-20,76,48);linePath(k,[[-38,-20],[0,7],[38,-20]],'#fff',3);k.fillStyle='#fff';k.beginPath();k.arc(0,6,5,0,2*PI);k.fill()}
   else{k.fillStyle='#f1bc69';k.beginPath();k.ellipse(0,4,42,16,0,0,2*PI);k.fill();k.fillStyle='#e9a555';k.beginPath();k.ellipse(0,7,42,20,0,0,PI);k.fill();k.strokeStyle='#9c652f';k.lineWidth=3;k.stroke();k.fillStyle='#bd6c38';for(let n=-1;n<=1;n++){k.beginPath();k.arc(n*15,1,4,0,2*PI);k.fill()}}
   k.restore();
  }
  stageText(k,second?'情境 B':'情境 A');
 }
 frame(k,22,35,495,130);editRail(k,p,[faceFraction*.5,.5,.5+faceFraction*.5]);
 caption(k,'人物画面相同 · 情境影响观众解读');
});
return {width:W,height:H,cycle,cells,withLesson(fn){let previous=lessonMode;lessonMode=true;try{return fn()}finally{lessonMode=previous}},withSubject(image,rig,joints,time,fn,images,secondary,eyes){let prev=slots,prevSubject=lessonSubject;slots=images||{};lessonSubject={image,rig,joints,time,secondary,eyes};try{return MotionPrompt.packs.principles.withSubject(image,rig,joints,time,fn)}finally{slots=prev;lessonSubject=prevSubject}}};
});
