/* Eight fixed framings of the same departure, in platform coordinates. */
MotionPrompt.pack('shots', function () {
  'use strict';
  const width = 539, height = 208, cycle = 6;
  // All cameras share the same axis. World y=0 is the platform; the eye is at -95.
  const cameras = [
    [0, -116, .38], [0, -76, .82], [0, -53, 1.68], [0, -68, 2.5],
    [0, -78, 3.2], [0, -86, 4.5], [0, -94, 7.5], [4, -95, 25]
  ];
  const ink = '#263e49', coat = '#b95439', skin = '#edb38a';
  function stroke(k, points, color, weight) {
    k.beginPath();
    points.forEach(([x,y], i) => i ? k.lineTo(x,y) : k.moveTo(x,y));
    k.strokeStyle = color; k.lineWidth = weight; k.stroke();
  }
  function oval(k, x, y, rx, ry, color) {
    k.fillStyle = color; k.beginPath(); k.ellipse(x,y,rx,ry,0,0,Math.PI*2); k.fill();
  }
  function rect(k,x,y,w,h,color) { k.fillStyle=color; k.fillRect(x,y,w,h); }
  function ease(t, a, b) {
    const f = Math.max(0,Math.min(1,(t-a)/(b-a)));
    return f*f*(3-2*f);
  }
  function platform(k,t) {
    rect(k,-1100,-550,2200,650,'#dbe6dc');
    oval(k,210,-195,33,33,'#f4d6a2');
    for (let i=-9;i<=9;i++) {
      const x=i*108, roof=-101-((i*i*17)%80);
      rect(k,x,roof,95,-roof,'#afc3bd');
      rect(k,x+9,roof+13,55,4,'#d9e2d8');
    }
    // Repeating cars cross exactly one carriage spacing per loop.
    const slide=254*(t/cycle);
    for(let i=-5;i<=5;i++) {
      const x=i*254+slide;
      rect(k,x,-84,250,74,'#4c787a'); rect(k,x,-80,250,3,'#e8c993');
      for(let j=0;j<6;j++) rect(k,x+9+j*39,-70,30,22,'#ceded6');
      rect(k,x,-39,250,4,'#e3c8a2');
    }
    rect(k,-1100,-12,2200,170,'#b9b5a4');
    rect(k,-1100,-8,2200,3,'#e9cf8b');
    for (const x of [-610,-330,-115,155,380,635]) {
      rect(k,x,-146,5,146,'#50656a');
      stroke(k,[[x+2,-123],[x+25,-148]],'#50656a',3);
    }
    rect(k,-665,-152,1350,7,'#425c62');
    rect(k,-112,-135,44,21,'#38535a');
    k.font='bold 13px sans-serif'; k.textAlign='center'; k.fillStyle='#fff4d7'; k.fillText('02',-90,-120);
    rect(k,-65,-23,35,4,'#7b6352');
    rect(k,-62,-19,3,18,ink); rect(k,-35,-19,3,18,ink);
  }
  function traveller(k,t) {
    const lift=ease(t,.45,1.65)*(1-ease(t,3.6,5.1));
    const wave=Math.sin((t-1.65)*8)*lift;
    const gaze=ease(t,.45,2.8)*(1-ease(t,4.4,5.75));
    const blink=Math.exp(-Math.pow((t-3.36)/.085,2));
    oval(k,0,0,24,2.2,'#8c9690');
    stroke(k,[[-6,-38],[-8,-20],[-10,-3],[-15,-2]],ink,6);
    stroke(k,[[6,-38],[8,-20],[10,-3],[15,-2]],ink,6);
    rect(k,-35,-26,17,23,'#ba8c4d');
    stroke(k,[[-30,-26],[-30,-34],[-23,-34],[-23,-26]],ink,1.6);
    oval(k,-32,-2,2,2,ink); oval(k,-21,-2,2,2,ink);
    stroke(k,[[-9,-69],[-17,-56],[-24,-35]],coat,7);
    oval(k,-24,-35,3.3,3.6,skin);
    k.fillStyle=coat; k.beginPath(); k.moveTo(-10,-76); k.lineTo(9,-76); k.lineTo(15,-35); k.lineTo(-14,-35); k.closePath(); k.fill();
    rect(k,-3,-85,8,12,skin);
    const elbow=[13+10*lift,-57-12*lift], hand=[14+14*lift+3*wave,-44-45*lift];
    stroke(k,[[7,-70],elbow,hand],coat,7);
    oval(k,hand[0],hand[1]-1,3.4,4,skin);
    k.save(); k.translate(0,-94);
    oval(k,0,0,10,13,skin);
    k.fillStyle='#34474a'; k.beginPath(); k.moveTo(-10,3); k.bezierCurveTo(-16,-18,4,-19,11,-8);
    k.quadraticCurveTo(1,-11,-7,-1); k.lineTo(-8,5); k.fill();
    oval(k,-8,.8,2.1,3,skin);
    stroke(k,[[7,1],[9,3],[7,3.5]],'#b77960',.7);
    stroke(k,[[2.6,7],[6.2,7-.8*lift],[7.3,6.5-.8*lift]],'#885745',.65);
    const opening=1.18*(1-blink);
    k.save(); k.beginPath(); k.ellipse(4,-1,2.9,Math.max(.07,opening),0,0,2*Math.PI);
    k.fillStyle='#fff2d7'; k.fill(); k.clip();
    oval(k,3.2+2*gaze,-1,.96,1.12,'#4c6156');
    oval(k,3.2+2*gaze,-1,.52,.7,ink); oval(k,3+2*gaze,-1.32,.17,.17,'#fff');
    k.restore();
    stroke(k,[[1.15,-1],[2.4,-1-opening*.88],[4.5,-1-opening],[6.85,-1]],ink,.38);
    stroke(k,[[1,-4],[3,-4.6-.3*lift],[6.7,-4.3]],ink,.8);
    k.restore();
  }
  const cells=cameras.map(([x,y,zoom])=>function(k,w,h,time) {
    const t=((time%cycle)+cycle)%cycle;
    k.save(); k.translate(w/2,h/2); k.scale(zoom,zoom); k.translate(-x,-y);
    k.lineJoin='round'; k.lineCap='round'; platform(k,t); traveller(k,t); k.restore();
  });
  return {width,height,cycle,cells};
});
