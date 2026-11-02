(function(g){
'use strict';
// Explicit playback only. The drawing phase drives all gains, filters and seeks.
const supported=new Set(Array.from({length:27},(_,i)=>'F'+String(i+29).padStart(2,'0')));
const defaults=['assets/film-audio-a.wav','assets/film-audio-b.wav'];
const effects={F38:'voice',F41:'ambience',F42:'ambience',F43:'footstep',F44:'cloth',F45:'prop',F46:'prop',F47:'ambience',F48:'ambience',F49:'prop',F50:'voice',F51:'ambience'};
let tracks=[], graph=null, playing=false, current='', last=-1, token=0, wasB=false;
function stop(){
 token++;tracks.forEach(x=>{x.a.pause();x.a.removeAttribute('src');x.a.load()});tracks=[];
 if(graph){graph.ctx.close().catch(()=>{});graph=null}
 playing=false;current='';last=-1;wasB=false;
}
function supports(id){return supported.has(id)}
async function start(id,files){
 stop();if(!supports(id))throw Error('此示例不含声音');
 const mine=token;current=id;let ctx;
 try{
  ctx=new (g.AudioContext||g.webkitAudioContext)();
  const wet=ctx.createGain(), dry=ctx.createGain(), convolver=ctx.createConvolver();
  let impulse=ctx.createBuffer(2,Math.round(ctx.sampleRate*.65),ctx.sampleRate);
  for(let c=0;c<2;c++){let a=impulse.getChannelData(c);for(let i=0;i<a.length;i++)a[i]=(Math.random()*2-1)*Math.pow(1-i/a.length,3)}
  convolver.buffer=impulse;wet.gain.value=0;dry.gain.value=1;dry.connect(ctx.destination);convolver.connect(wet);wet.connect(ctx.destination);
  tracks=defaults.map((fallback,i)=>{
   let key=i?'b':'a',url=(files||{})[key]||((i===1&&effects[id])?'assets/film-audio-'+effects[id]+'.wav':fallback);
   const a=new Audio(url);a.loop=!(i===1&&['F34','F35','F43','F44','F45','F46','F49','F52'].includes(id));a.preload='auto';
   let source=ctx.createMediaElementSource(a),gain=ctx.createGain(),filter=ctx.createBiquadFilter(),high=ctx.createBiquadFilter(),pan=ctx.createStereoPanner();
   filter.type='lowpass';filter.frequency.value=20000;high.type='highpass';high.frequency.value=10;gain.gain.value=0;source.connect(filter);filter.connect(high);high.connect(gain);gain.connect(pan);pan.connect(dry);pan.connect(convolver);
   return {a,gain,filter,high,pan};
  });
  graph={ctx,wet,dry};await Promise.all([ctx.resume(),...tracks.map(x=>x.a.play())]);
  if(mine!==token)return false;
  playing=true;last=-1;return true;
 }catch(e){if(ctx&&mine!==token){ctx.close().catch(()=>{});return false}stop();throw e}
}
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
// Avoid abrupt per-frame gain jumps, which can introduce clicks at cuts.
function setGain(param,value,ctx){
 if(typeof param.setTargetAtTime==='function'&&typeof param.cancelScheduledValues==='function'&&Number.isFinite(ctx.currentTime)){
  param.cancelScheduledValues(ctx.currentTime);param.setTargetAtTime(value,ctx.currentTime,.004);
 }else param.value=value;
}
function update(id,u,cycle,params,speed){
 if(!playing||id!==current||!graph)return;
 const p=((u/cycle)%1+1)%1, cut=params.cutAt??.5, offset=params.offset??.18;
 const volume=clamp(params.volume??.35,0,.8), start=params.startAt??.2, end=params.endAt??.75;
 const event=params.eventAt??.5, mix=params.mix??.5, amt=params.amount??.65, wet=params.reverbMix??.45;
 let ga=0,gb=0, pan=0, freq=20000, reverb=0, trigger=false;
 const active=p>=start&&p<end, pulse=(p,at,width)=>p>=at&&p<at+width;
 switch(id){
  case 'F29':case 'F30':case 'F31':{
   let switchAt=id==='F29'?cut-offset:id==='F30'?cut+offset:cut;ga=p<switchAt?volume:0;gb=p>=switchAt?volume:0;break;
  }
  case 'F32':ga=volume;break; // continuous sound bridge
  case 'F33':ga=active?volume:0;break; // cue
  case 'F34':trigger=pulse(p,.12,.16)||pulse(p,.56,.16);gb=trigger?volume:0;break;
  case 'F35':trigger=pulse(p,event,.18);gb=trigger?volume:0;break;
  case 'F36':ga=active?volume*clamp((p-start)/(end-start)*2,0,1)*clamp((end-p)/(end-start)*2,0,1):0;break;
  case 'F37':ga=active?0:volume;break;
  case 'F38':ga=volume*(active?1-amt:1);gb=active?volume*.7:0;break;
  case 'F39':ga=volume;freq=p<cut?900:20000;break;
  case 'F40':trigger=p>=start&&p<end;gb=trigger?volume:0;break;
  case 'F41':gb=volume;break;
  case 'F42':ga=(p<.35||p>=.65)?volume*.7:0;gb=volume*mix;break;
  case 'F43':trigger=pulse(p,0,.10)||pulse(p,.25,.10)||pulse(p,.5,.10)||pulse(p,.75,.10);gb=trigger?volume:0;break;
  case 'F44':trigger=pulse(p,event,.22);gb=trigger?volume:0;break;
  case 'F45':trigger=pulse(p,event,.18);gb=trigger?volume:0;break;
  case 'F46':trigger=pulse(p,event,.22);ga=trigger?volume*(1-mix):0;gb=trigger?volume*mix:0;break;
  case 'F47':gb=volume*(1-amt*p*.85);freq=20000-(18000*amt*p);break;
  case 'F48':gb=volume;pan=clamp(amt*(2*p-1),-1,1);break;
  case 'F49':trigger=pulse(p,event,.18);gb=trigger?volume:0;reverb=wet;break;
  case 'F50':gb=volume;freq=800+5000*(1-amt);break;
  case 'F51':gb=active?0:volume;break;
  case 'F52':ga=volume;trigger=pulse(p,0,.045)||pulse(p,.25,.045)||pulse(p,.5,.045)||pulse(p,.75,.045);gb=trigger?volume*.65:0;break;
  case 'F53':ga=p<cut?volume:0;gb=p>=cut?volume:0;break;
  case 'F54':ga=p<cut?volume:0;gb=p>=cut?volume:0;break;
  case 'F55':ga=p<cut?volume:0;gb=p>=cut?volume:0;break;
 }
 tracks.forEach((x,i)=>{
  setGain(x.gain.gain,clamp(i?gb:ga,0,1),graph.ctx);x.filter.frequency.value=(i||id==='F39')?freq:20000;x.high.frequency.value=(i&&id==='F50')?10+290*amt:10;x.pan.pan.value=i?pan:0;
  x.a.playbackRate=clamp(speed||1,.25,4);
  if(Number.isFinite(x.a.duration)&&x.a.duration>0){
   const duration=x.a.duration,target=((u%duration)+duration)%duration,delta=Math.abs(x.a.currentTime-target),distance=x.a.loop?Math.min(delta,Math.abs(duration-delta)):delta;
   // Event-triggered tracks restart at the event, not at the global timeline position.
   const triggeredTrack=(id==='F40'&&i===1)||(id==='F46'&&i===0);
   const drifted=x.a.loop&&!triggeredTrack&&!x.a.seeking&&distance>.15;
   if(last<0||p<last||drifted){try{x.a.currentTime=target}catch(_){}}
  }
 });
 // A gated effect should begin at the start of the selected clip, not its current silent position.
 if(trigger&&!wasB&&tracks[1]&&Number.isFinite(tracks[1].a.duration)){try{tracks[1].a.currentTime=0;if(tracks[1].a.paused)tracks[1].a.play().catch(()=>{})}catch(_){}}
 if(id==='F46'&&trigger&&!wasB&&tracks[0]&&Number.isFinite(tracks[0].a.duration)){try{tracks[0].a.currentTime=0}catch(_){}}
 setGain(graph.wet.gain,reverb,graph.ctx);setGain(graph.dry.gain,1-reverb*.5,graph.ctx);
 wasB=trigger;last=p;
}
g.MPFilmAudio={supports,start,stop,update,isPlaying:()=>playing};
})(window);
