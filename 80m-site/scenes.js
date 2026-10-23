/* =================== RENDU ATMOSPHÉRIQUE ===================
   Chaque scène est peinte en douceur (dégradés, brume, lumière),
   puis réduite à une palette de 24 couleurs avec un tramage ordonné :
   c'est ce qui donne le grain « pixel peint ». */
const W=240,H=135;
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const HEX={};function rgb(h){if(HEX[h])return HEX[h];const n=parseInt(h.slice(1),16);return HEX[h]=[n>>16&255,n>>8&255,n&255]}
function rgba(h,a){const [r,g,b]=rgb(h);return `rgba(${r},${g},${b},${a})`}
function mix(a,b,t){return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t]}
const R=(c,x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h)};
function vg(c,y0,y1,stops,x0,w){const g=c.createLinearGradient(0,y0,0,y1);stops.forEach(([o,col])=>g.addColorStop(o,col));c.fillStyle=g;c.fillRect(x0||0,y0,w||W,y1-y0)}
function glow(c,x,y,r,col,a){c.save();c.globalCompositeOperation="lighter";const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,rgba(col,a));g.addColorStop(1,rgba(col,0));c.fillStyle=g;c.fillRect(x-r,y-r,2*r,2*r);c.restore()}
function beam(c,x,y,w,dx,len,col,a){c.save();c.globalCompositeOperation="lighter";const g=c.createLinearGradient(0,y,0,y+len);g.addColorStop(0,rgba(col,a));g.addColorStop(1,rgba(col,0));c.fillStyle=g;c.beginPath();c.moveTo(x,y);c.lineTo(x+w,y);c.lineTo(x+w+dx+w*1.5,y+len);c.lineTo(x+dx-w*.5,y+len);c.closePath();c.fill();c.restore()}
function fog(c,y,h,col,a){const g=c.createLinearGradient(0,y,0,y+h);g.addColorStop(0,rgba(col,0));g.addColorStop(.5,rgba(col,a));g.addColorStop(1,rgba(col,0));c.fillStyle=g;c.fillRect(0,y,W,h)}
function tex(c,r,x,y,w,h,n,cols,a){c.save();c.globalAlpha=a||1;for(let i=0;i<n;i++){c.fillStyle=cols[i%cols.length];c.fillRect(x+Math.floor(r()*w),y+Math.floor(r()*h),1+Math.floor(r()*2),1)}c.restore()}
function poly(c,pts,col){c.fillStyle=col;c.beginPath();c.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)c.lineTo(pts[i],pts[i+1]);c.closePath();c.fill()}
function ell(c,x,y,rx,ry,col){c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
function trunk(c,r,x,base,top,w,col,dk){poly(c,[x-w*.5,base,x-w*.32,top,x+w*.32,top,x+w*.5,base],col);
  c.fillStyle=dk;for(let i=0;i<w/2;i++){const xx=x-w*.4+r()*w*.8;c.fillRect(xx,top+r()*(base-top)*.3,1,(base-top)*(.4+r()*.5))}
  c.strokeStyle=col;c.lineWidth=Math.max(1,w*.12);for(let i=0;i<3;i++){const y=top+r()*(base-top)*.5;const d=r()<.5?-1:1;c.beginPath();c.moveTo(x,y);c.lineTo(x+d*(w*1.2+r()*w*2),y-6-r()*14);c.stroke()}
  poly(c,[x-w*.5,base,x-w*.9,base+2,x+w*.9,base+2,x+w*.5,base],dk)}
function forest(c,r,n,base,hmin,hmax,wmin,wmax,col,dk){for(let i=0;i<n;i++){const x=r()*W,w=wmin+r()*(wmax-wmin);trunk(c,r,x,base+r()*4,base-hmin-r()*(hmax-hmin),w,col,dk)}}
function hills(c,r,y,amp,col,step){c.fillStyle=col;c.beginPath();c.moveTo(0,H);let yy=y;for(let x=0;x<=W;x+=step||8){yy=y+Math.sin(x*.02+r()*.6)*amp+(r()-.5)*amp*.4;c.lineTo(x,yy)}c.lineTo(W,H);c.closePath();c.fill()}
function canopy(c,r,n,y,rad,cols){for(let i=0;i<n;i++)ell(c,r()*W,y+(r()-.5)*rad,rad*(.6+r()*.8),rad*(.4+r()*.5),cols[i%cols.length])}
function persp(c,vx,vy,y0,n,col){c.strokeStyle=col;c.lineWidth=1;for(let i=0;i<=n;i++){const x=i*W/n;c.beginPath();c.moveTo(vx+(x-vx)*0.02,vy);c.lineTo(x,H);c.stroke()}}
function lines(c,y0,y1,n,col,pow){c.fillStyle=col;for(let i=0;i<n;i++){const t=Math.pow(i/n,pow||2);c.fillRect(0,Math.round(y0+(y1-y0)*t),W,1)}}
function vignette(c,a){const g=c.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,W*.75);g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(1,`rgba(0,0,0,${a})`);c.fillStyle=g;c.fillRect(0,0,W,H)}
function sky(c,top,bot,y1){vg(c,0,y1||70,[[0,top],[1,bot]])}
function stars(c,r,n,y1){for(let i=0;i<n;i++)R(c,Math.floor(r()*W),Math.floor(r()*(y1||50)),1,1,rgba("#dfe6ff",.4+r()*.6))}
function rain(c,f,col,a){c.fillStyle=rgba(col,a);for(let i=0;i<70;i++){const x=(i*53+f*7)%W,y=(i*29+f*13)%H;c.fillRect(x,y,1,3)}}
function motes(c,f,x0,x1,y0,y1,col){for(let i=0;i<18;i++){const x=x0+((i*37+f*(1+i%3)*.6)%(x1-x0)),y=y0+((i*23+Math.sin((f+i*9)*.15)*6+i*5)%(y1-y0));R(c,Math.round(x),Math.round(y),1,1,col)}}
function bubbles(c,f,col){for(let i=0;i<14;i++){const x=(i*41)%W+Math.sin((f+i)*.3)*2,y=H-((f*1.5+i*31)%H);R(c,Math.round(x),Math.round(y),1,1,col)}}
function shimmer(c,f,y0,y1,col){c.fillStyle=col;for(let i=0;i<30;i++){const y=y0+(i*11)%(y1-y0);const x=(i*67+f*2)%W;c.fillRect(x,y,4+(i%3)*2,1)}}

/* ---------- quantification ---------- */
const BAYER=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
function kmeans(d,k){const pts=[];for(let i=0;i<d.length;i+=4*5)pts.push([d[i],d[i+1],d[i+2]]);
  pts.sort((a,b)=>(a[0]+a[1]+a[2])-(b[0]+b[1]+b[2]));
  let C=[];for(let i=0;i<k;i++)C.push(pts[Math.floor((i+.5)/k*pts.length)].slice());
  for(let it=0;it<7;it++){const S=C.map(()=>[0,0,0,0]);
    for(const p of pts){let bi=0,bd=1e9;for(let j=0;j<k;j++){const c=C[j];const dd=(p[0]-c[0])**2+(p[1]-c[1])**2+(p[2]-c[2])**2;if(dd<bd){bd=dd;bi=j}}const s=S[bi];s[0]+=p[0];s[1]+=p[1];s[2]+=p[2];s[3]++}
    C=C.map((c,j)=>S[j][3]?[S[j][0]/S[j][3],S[j][1]/S[j][3],S[j][2]/S[j][3]]:c)}
  return C.map(c=>c.map(Math.round));}
function nearest(P,r,g,b){let bi=0,bd=1e9;for(let j=0;j<P.length;j++){const c=P[j];const dd=(r-c[0])**2*.3+(g-c[1])**2*.59+(b-c[2])**2*.11;if(dd<bd){bd=dd;bi=j}}return P[bi]}
function quantize(img,P,spread){const d=img.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4;const o=(BAYER[(y&3)*4+(x&3)]/16-.5)*spread;
  const c=nearest(P,d[i]+o,d[i+1]+o,d[i+2]+o);d[i]=c[0];d[i+1]=c[1];d[i+2]=c[2];d[i+3]=255}}

/* ---------- scènes ----------
   a = [x min, x max, y du fond, y du premier plan] : là où se tiennent les animaux (y = pieds) */
const SC={
 hangar:{a:[6,234,66,130],fogc:"#4a4234",paint(c,r,s){const n=s.night;
   vg(c,0,48,[[0,"#0c0d0f"],[1,n?"#14161c":"#24221d"]]);vg(c,40,62,[[0,n?"#151820":"#3b3529"],[1,n?"#1a1c22":"#4c4433"]]);
   vg(c,58,H,[[0,n?"#1b1a18":"#4a4131"],[1,n?"#2a261f":"#6e5f45"]]);tex(c,r,0,60,W,75,900,["#7d6c4f","#3a3226","#8a7856"],.5);
   for(let k=0;k<2;k++)for(let i=0;i<7;i++){const t=i/6;const x=120+(k?1:-1)*(20+t*95),y=12+t*30;R(c,x-1-t*3,y,3+t*6,1,"#11100e");glow(c,x,y+2,6+t*16,n?"#7a8cff":"#ffd27a",n?.15:.45)}
   for(let k=0;k<3;k++)for(let i=0;i<6;i++){const t=i/5;const x=120+(k-1)*(30+t*70),y=70+t*55;ell(c,x,y,3+t*5,1+t*2,"#8a2f28");ell(c,x,y-1,2+t*4,1+t*1.2,"#b0453a")}
   if(!n){beam(c,30,0,10,30,90,"#ffe2a0",.12);beam(c,190,0,8,-20,90,"#ffe2a0",.1)}
   fog(c,40,40,"#8a7a5a",n?.1:.35);if(s.heat){c.fillStyle="rgba(255,110,40,.18)";c.fillRect(0,0,W,H)}vignette(c,.6)},
   anim(c,f,s){if(!s.night)motes(c,f,20,220,10,100,"#e8d6a0")}},
 couvoir:{a:[0,236,84,94],move:1,fogc:"#7e8a86",paint(c,r){vg(c,0,H,[[0,"#3c4644"],[1,"#6f7a76"]]);
   for(let i=0;i<5;i++){R(c,8+i*48,14,40,50,"#9aa6a2");R(c,10+i*48,16,36,46,"#b7c2bd");R(c,26+i*48,20,4,4,"#e9a03a");for(let j=0;j<4;j++)R(c,12+i*48,26+j*9,32,1,"#7a8682")}
   for(let i=0;i<3;i++){R(c,20+i*80,4,50,2,"#eaf6f0");glow(c,45+i*80,6,30,"#d8fff0",.3)}
   R(c,0,86,W,12,"#25292a");R(c,0,85,W,1,"#8a9693");R(c,0,98,W,3,"#3a4140");for(let x=0;x<W;x+=12)R(c,x,98,6,22,"#4a5250");vg(c,100,H,[[0,"#555e5b"],[1,"#7c8783"]]);vignette(c,.45)},
   anim(c,f){for(let i=0;i<24;i++)R(c,((i*10+f*2)%W),90,2,1,"#3d4442")}},
 cage:{a:[22,218,72,118],fogc:"#2a2e30",paint(c,r){vg(c,0,H,[[0,"#121416"],[1,"#26292b"]]);
   for(let k=0;k<4;k++){const t=k/3;const y=22+k*8,h=22-k*4;const x0=60+k*22,x1=180-k*22;R(c,x0,y,x1-x0,h,rgba("#3a3f42",1-t*.6));for(let x=x0;x<x1;x+=4-k*.6)R(c,Math.round(x),y,1,h,rgba("#6b7276",.5-t*.3))}
   R(c,0,0,W,4,"#0a0b0c");for(let i=0;i<4;i++){R(c,40+i*50,6,30,1,"#dfe8ec");glow(c,55+i*50,7,22,"#cfe0ff",.25)}
   R(c,0,118,W,17,"#1c1e1f");R(c,0,118,W,2,"#9aa0a3");for(let x=0;x<W;x+=7)ell(c,x+3,124,2.4,1.8,"#d9cdb0");vignette(c,.65)},
   fg(c){c.fillStyle="#8d9398";for(let x=2;x<W;x+=9)c.fillRect(x,54,1,64);for(const y of[54,86,117])c.fillRect(0,y,W,1);c.fillStyle="#5d6266";for(let x=6;x<W;x+=9)c.fillRect(x,54,1,64)}},
 caillebotis:{a:[8,232,74,130],fogc:"#4d4b45",paint(c,r){vg(c,0,60,[[0,"#2a2926"],[1,"#5c5a53"]]);R(c,0,14,W,2,"#3a3934");
   R(c,170,10,40,22,"#9fb0b6");R(c,172,12,36,18,"#cfe0e4");beam(c,172,30,34,-60,90,"#e6f2f0",.18);
   vg(c,60,H,[[0,"#3e3c37"],[1,"#5a574f"]]);lines(c,62,H,26,"#22201d",1.6);tex(c,r,0,62,W,73,300,["#6a665c","#2e2c28"],.6);
   R(c,200,0,1,40,"#8f9192");for(let i=0;i<5;i++)R(c,199+(i%2),40+i*3,3,2,"#b5b7b8");R(c,0,58,W,3,"#6b6860");vignette(c,.55)}},
 maternite:{a:[60,190,108,128],fogc:"#4d4b45",paint(c,r,s){SC.caillebotis.paint(c,r,s);glow(c,40,30,40,"#ff7a2a",.35);R(c,36,22,8,5,"#c8401a");
   spr(c,"porc",68,58,false,4)},fg(c){c.fillStyle="#b8bdc0";for(let x=58;x<=184;x+=10)c.fillRect(x,44,1,62);c.fillRect(56,44,130,2);c.fillRect(56,72,130,1);c.fillRect(56,105,130,2)}},
 etable:{a:[6,234,76,130],fogc:"#6b5233",paint(c,r){vg(c,0,70,[[0,"#1d150e"],[1,"#4a3522"]]);for(let y=6;y<70;y+=7)R(c,0,y,W,1,"#2c2015");
   R(c,95,18,50,52,"#f3e2b8");glow(c,120,44,60,"#ffdc9a",.45);beam(c,95,18,50,-30,110,"#ffe6b0",.18);
   vg(c,68,H,[[0,"#8a6c3c"],[1,"#c0a060"]]);tex(c,r,0,70,W,65,1400,["#e0c27a","#7a5a2c","#d4b062"],.6);
   for(const x of[20,70,170,220])R(c,x,10,5,90,"#3a2816");fog(c,50,50,"#c8a868",.25);vignette(c,.55)},anim(c,f){motes(c,f,90,170,20,100,"#ffeec0")}},
 traite:{a:[6,234,72,122],fogc:"#6d787e",paint(c,r){vg(c,0,H,[[0,"#3a4247"],[1,"#7d888e"]]);for(let i=0;i<4;i++){R(c,20+i*60,6,36,2,"#f2fbff");glow(c,38+i*60,8,30,"#e0f4ff",.3)}
   R(c,0,38,W,2,"#c6ced2");R(c,0,46,W,1,"#c6ced2");for(let x=10;x<W;x+=34){R(c,x,40,2,40,"#d6dde0");R(c,x-4,80,10,4,"#aab4b8")}
   vg(c,96,H,[[0,"#4f585d"],[1,"#6c777c"]]);shimmer(c,0,100,134,"#9aa6ac");vignette(c,.45)}},
 feedlot:{a:[0,240,60,132],fogc:"#a07850",paint(c,r){sky(c,"#c79a6a","#e8c08a",50);glow(c,190,30,50,"#fff0c0",.4);
   for(let i=0;i<4;i++){R(c,20+i*14,26,10,26,"#9a8a78");ell(c,25+i*14,26,5,3,"#aa9a88")}vg(c,48,H,[[0,"#8a6a48"],[1,"#5a4430"]]);tex(c,r,0,50,W,85,1200,["#4a3826","#9a7a52"],.6);
   for(let k=0;k<5;k++){const y=52+k*k*3.4;R(c,0,y,W,1,"#b09878")}for(let x=0;x<W;x+=30)R(c,x,50,2,85,"#a08a6a");fog(c,30,40,"#d8b080",.4);vignette(c,.4)}},
 pre:{a:[0,240,72,132],fogc:"#a8b8a8",paint(c,r){sky(c,"#9ab4c4","#e2e6d6",70);glow(c,180,34,40,"#fff6d0",.6);
   hills(c,r,52,4,"#8aa494",6);fog(c,40,30,"#e6ecdf",.6);hills(c,r,60,5,"#6e9170",6);fog(c,52,24,"#dfe8d8",.45);
   vg(c,64,H,[[0,"#6a9458"],[1,"#3f6a34"]]);tex(c,r,0,66,W,69,1800,["#8ab868","#2f5426","#a6c87a"],.55);
   for(let x=8;x<W;x+=26){R(c,x,60,2,12,"#5a4630")}R(c,0,63,W,1,"#5a4630");vignette(c,.35)}},
 dehesa:{a:[0,240,72,132],fogc:"#c8a868",paint(c,r){sky(c,"#8fb2cc","#f0dcae",70);glow(c,60,30,50,"#fff4c8",.5);hills(c,r,58,3,"#b49a62",6);
   vg(c,62,H,[[0,"#c8a85a"],[1,"#9a7c3a"]]);tex(c,r,0,62,W,73,1500,["#e0c070","#7a6028"],.5);
   for(const [x,y,s] of[[30,64,1],[110,60,.7],[190,66,1.2],[150,58,.5]]){R(c,x-1,y-12*s,3*s,12*s,"#3a2c1a");ell(c,x,y-14*s,14*s,7*s,"#3c5228");ell(c,x+4*s,y-17*s,9*s,5*s,"#4e6634")}fog(c,50,20,"#f0e0b8",.3);vignette(c,.35)}},
 arene:{a:[40,200,82,124],fogc:"#d8b080",paint(c,r){vg(c,0,40,[[0,"#5a2a1e"],[1,"#7a3a26"]]);tex(c,r,0,0,W,38,1600,["#e8d8b0","#c84a3a","#2a2a2a","#e0b090","#3a6a9a"],.9);
   R(c,0,38,W,8,"#a8241e");R(c,0,38,W,1,"#e8d0a0");vg(c,46,H,[[0,"#d8b47a"],[1,"#e8c88e"]]);tex(c,r,0,46,W,89,700,["#c49a60","#f0d8a0"],.5);glow(c,120,90,90,"#fff4d0",.25);vignette(c,.4)}},
 maison:{a:[40,220,96,130],fogc:"#8a6a4a",paint(c,r){vg(c,0,90,[[0,"#4a3a30"],[1,"#7a5e48"]]);R(c,22,16,46,40,"#2a2018");R(c,25,19,40,34,"#cfe2ea");glow(c,45,36,40,"#fff2d0",.35);beam(c,25,53,40,40,60,"#fff0c8",.15);
   R(c,140,58,80,26,"#6a4a7a");R(c,140,52,80,8,"#5a3e68");R(c,136,58,6,26,"#5a3e68");R(c,218,58,6,26,"#5a3e68");
   vg(c,88,H,[[0,"#6a4a30"],[1,"#8a6440"]]);lines(c,88,H,10,"#5a3e26",1.4);ell(c,110,116,60,10,"#a4473b");ell(c,110,116,52,7,"#b85a4c");glow(c,200,20,24,"#ffcf80",.35);vignette(c,.5)}},
 refuge:{a:[30,210,84,126],fogc:"#7a7a74",paint(c,r){vg(c,0,80,[[0,"#4a4a46"],[1,"#8a8a84"]]);for(let x=0;x<W;x+=60)R(c,x,0,3,80,"#6a6a64");R(c,90,10,60,8,"#cfd6d8");glow(c,120,14,40,"#e8f0f0",.3);
   vg(c,80,H,[[0,"#6a6a64"],[1,"#5a5a54"]]);tex(c,r,0,80,W,55,400,["#7a7a74","#4a4a46"],.6);ell(c,60,112,10,3,"#8a7a5a");vignette(c,.5)},
   fg(c){c.fillStyle="#b5babb";for(let x=0;x<W;x+=12)c.fillRect(x,8,1,120);c.fillStyle="#8a9090";for(let y=8;y<128;y+=24)c.fillRect(0,y,W,1);c.fillStyle="#d0d4d4";c.fillRect(0,8,W,2)}},
 bois:{a:[20,220,86,130],fogc:"#5a7a74",paint(c,r,s){const n=s.night;
   sky(c,n?"#0a1220":"#2f4a4a",n?"#1a2a34":"#9ab8aa",80);if(n){stars(c,r,30,40);glow(c,190,22,20,"#dfe8ff",.5)}else glow(c,130,50,70,"#e8f4d8",.5);
   forest(c,r,14,92,40,70,4,8,n?"#162430":"#5d7c76",n?"#122028":"#4e6c66");fog(c,60,40,n?"#2a3a48":"#b8d0c4",.55);
   forest(c,r,9,104,60,90,8,14,n?"#101820":"#35504a",n?"#0c1418":"#283e3a");fog(c,76,30,n?"#24343e":"#9ab8aa",.4);
   vg(c,96,H,[[0,n?"#141c18":"#3a5236"],[1,n?"#0c120e":"#26381f"]]);tex(c,r,0,98,W,37,700,n?["#1e2a20"]:["#5a7a3a","#1c2a16","#7a9a4a"],.6);
   trunk(c,r,12,H,-10,26,n?"#0c1012":"#1e2a2a",n?"#080a0c":"#141c1c");trunk(c,r,228,H,-10,30,n?"#0c1012":"#1e2a2a",n?"#080a0c":"#141c1c");
   if(!n){beam(c,110,0,14,20,120,"#f0ffe0",.12);beam(c,150,0,8,-10,110,"#f0ffe0",.1)}R(c,96,112,30,8,n?"#05070a":"#1a140c");vignette(c,.55)},
   anim(c,f,s){if(!s.night)motes(c,f,100,170,10,100,"#e8f4d0");else for(let i=0;i<6;i++)if((f+i*3)%10<6)R(c,(i*47+f)%W,60+(i*13)%40,1,1,"#e8f080")}},
 jardin:{a:[10,230,90,130],fogc:"#2a3a3a",paint(c,r,s){const n=!!(s.night||s.robot);
   sky(c,n?"#0c1424":"#9ab4c4",n?"#24344a":"#dde6e0",60);if(n){stars(c,r,30,40);glow(c,40,18,16,"#e8f0ff",.5)}
   R(c,150,20,80,50,n?"#1a1c22":"#c9b9a0");R(c,166,32,18,14,n?"#ffcf70":"#9cc3dd");if(n)glow(c,175,39,30,"#ffcf70",.4);R(c,196,32,18,14,n?"#2a2a30":"#9cc3dd");poly(c,[146,22,190,4,234,22],n?"#14161a":"#8a4a3a");
   for(let x=0;x<W;x+=8)R(c,x,62,6,22,n?"#2a2622":"#9a7a5a");vg(c,82,H,[[0,n?"#16241a":"#5f8f4e"],[1,n?"#0e1810":"#3f6a34"]]);tex(c,r,0,84,W,51,900,n?["#1e3020"]:["#7aa85a","#2f5426"],.5);
   canopy(c,r,6,78,10,n?["#0e1a12","#142218"]:["#3f6a34","#4e7a3e"]);if(s.robot){R(c,150,112,22,9,"#e05a2a");R(c,153,121,4,3,"#111");R(c,166,121,4,3,"#111");glow(c,172,115,10,"#ffa060",.4)}vignette(c,.5)}},
 route:{a:[30,210,92,122],fogc:"#1c2430",paint(c,r,s){sky(c,"#080c16","#1c2636",70);stars(c,r,40,40);forest(c,r,16,80,20,40,3,6,"#0e1418","#0a0e10");fog(c,62,24,"#2a3644",.5);
   poly(c,[100,78,140,78,W+40,H,-40,H],"#22252a");for(let i=0;i<7;i++){const t=i/6;const y=80+t*t*55;R(c,119-t*1,y,2+t*3,1+t*4,"#d8d8c8")}
   vg(c,78,H,[[0,"rgba(0,0,0,0)"],[1,"rgba(0,0,0,.2)"]]);if(s.danger){glow(c,200,96,70,"#fff6cc",.5);glow(c,226,98,40,"#fff6cc",.6)}vignette(c,.6)},
   anim(c,f,s){if(s.danger)glow(c,210,97,30+(f%4)*3,"#fff6cc",.2)}},
 champ:{a:[0,240,74,132],fogc:"#c8a868",paint(c,r){sky(c,"#9ab6cc","#f4dcac",64);glow(c,60,40,50,"#fff0c0",.5);hills(c,r,60,3,"#a49a6a",6);
   R(c,170,44,44,20,"#8a3b2c");poly(c,[166,46,192,32,218,46],"#5b2a20");vg(c,62,H,[[0,"#c9a650"],[1,"#a88838"]]);
   for(let k=0;k<22;k++){const y=64+Math.pow(k/22,1.6)*71;R(c,0,Math.round(y),W,1,"#8a6a28")}tex(c,r,0,64,W,71,900,["#e0c070","#7a5e24"],.45);fog(c,52,20,"#f8ecc8",.3);vignette(c,.35)}},
 ville:{a:[0,240,96,132],fogc:"#8a929a",paint(c,r){sky(c,"#8a9aaa","#d6d2c6",80);for(let k=0;k<2;k++){for(let i=0;i<10;i++){const x=i*26-k*12,h=30+r()*40+k*16;const col=k?["#b8b0a0","#a8a094","#c4baa8"][i%3]:"#9aa2a8";R(c,x,92-h,24,h,col);
     if(k)for(let y=92-h+5;y<86;y+=8)for(let j=0;j<3;j++)R(c,x+3+j*7,y,4,5,r()<.2?"#f4d890":"#4a5462")}if(!k)fog(c,40,50,"#d6d2c6",.6)}
   vg(c,92,H,[[0,"#7a7a76"],[1,"#5a5a56"]]);R(c,0,92,W,3,"#9a9a94");tex(c,r,0,95,W,40,300,["#8a8a84","#4a4a46"],.5);vignette(c,.4)}},
 inde:{a:[0,240,96,132],fogc:"#d8b888",paint(c,r){sky(c,"#e8c890","#f4e4c0",70);glow(c,190,20,40,"#fff6d8",.5);for(let i=0;i<9;i++){const x=i*28,h=36+r()*30;R(c,x,92-h,27,h,["#d8a8a0","#a8c8d0","#e8d8a0","#c8a0c8","#e8b880"][i%5]);R(c,x+9,80,9,12,"#5a3a2a");R(c,x+4,92-h+6,6,6,"#3a2a2a")}
   c.strokeStyle="#2a2a2a";for(let i=0;i<3;i++){c.beginPath();c.moveTo(0,30+i*5);c.quadraticCurveTo(120,44+i*5,W,28+i*6);c.stroke()}
   vg(c,92,H,[[0,"#c8a878"],[1,"#a88858"]]);tex(c,r,0,92,W,43,700,["#b09060","#e0c898"],.5);fog(c,40,60,"#f0dcb0",.4);vignette(c,.35)}},
 desert:{a:[0,240,80,130],fogc:"#e0c090",paint(c,r){sky(c,"#d8c8a8","#f4e4c4",60);glow(c,190,24,30,"#fffbe8",.8);for(let k=0;k<4;k++){c.fillStyle=["#e0c08a","#d4a86a","#c8985a","#b8884a"][k];c.beginPath();c.moveTo(0,H);for(let x=0;x<=W;x+=6)c.lineTo(x,56+k*14+Math.sin(x*.03+k*2)*6);c.lineTo(W,H);c.fill()}
   tex(c,r,0,70,W,65,500,["#f0d8a8","#a87a40"],.4);fog(c,50,20,"#fff0d0",.4);vignette(c,.3)}},
 savane:{a:[0,240,74,130],fogc:"#d8b878",paint(c,r){sky(c,"#e8b878","#f8e0a8",64);glow(c,120,50,50,"#fff0c0",.7);hills(c,r,60,2,"#b08a58",6);
   vg(c,62,H,[[0,"#c8a050"],[1,"#a07e38"]]);tex(c,r,0,62,W,73,1500,["#e0c070","#7a5a24"],.5);
   for(const [x,y,s] of[[40,62,1],[190,64,1.3],[130,58,.6]]){R(c,x,y-14*s,2*s,14*s,"#3a2a1a");ell(c,x+1,y-15*s,16*s,3.5*s,"#3e4a24")}fog(c,54,16,"#f8e0b0",.35);vignette(c,.3)}},
 jungle:{a:[30,210,86,128],fogc:"#4a7a5a",paint(c,r){vg(c,0,H,[[0,"#1c3a2a"],[1,"#0e2216"]]);glow(c,120,20,80,"#d8f0c0",.3);
   for(let k=0;k<3;k++){forest(c,r,8,90+k*12,50,80,4+k*3,8+k*4,["#3f6a4a","#2a5034","#183a22"][k],["#30583a","#1e4028","#10281a"][k]);canopy(c,r,14,20+k*14,16,[["#4e8a5a","#5a9a62"],["#2f6a3a","#3a7a44"],["#1c4a28","#24582e"]][k]);fog(c,40+k*20,30,"#a8d0a8",.35-k*.1)}
   beam(c,100,0,10,10,120,"#f0ffd0",.14);vg(c,108,H,[[0,"#1e3018"],[1,"#101a0c"]]);vignette(c,.55)},anim(c,f){motes(c,f,90,150,10,110,"#e8ffd0")}},
 palmiers:{a:[20,220,88,130],fogc:"#a89a7a",paint(c,r){sky(c,"#b8b8a8","#e6dcc4",60);glow(c,150,30,40,"#fff4d8",.4);
   for(let k=0;k<7;k++){const t=k/6;const y=58+t*t*70;for(let x=-10+(k%2)*10;x<W+10;x+=20+t*20){R(c,x,y-10-t*20,1+t*2,10+t*20,"#5a4a30");for(let a=0;a<6;a++){const an=a/6*Math.PI*2;c.strokeStyle=k<3?"#7a8a5a":"#3f5a28";c.lineWidth=1+t*1.5;c.beginPath();c.moveTo(x,y-10-t*20);c.lineTo(x+Math.cos(an)*(6+t*12),y-10-t*20+Math.sin(an)*(3+t*5)+3);c.stroke()}}fog(c,y-30,30,"#e6dcc4",.15)}
   vg(c,100,H,[[0,"rgba(90,74,48,.3)"],[1,"rgba(90,74,48,.6)"]]);vignette(c,.4)}},
 banquise:{a:[50,190,70,96],fogc:"#c0d4e0",paint(c,r){sky(c,"#8aa4bc","#e8eef2",50);glow(c,60,40,40,"#ffffff",.5);vg(c,48,H,[[0,"#2a4a62"],[1,"#12283a"]]);shimmer(c,0,52,134,"#4a6a84");
   poly(c,[30,74,90,64,170,66,214,76,200,100,40,100],"#e8f0f4");poly(c,[40,100,200,100,206,106,34,106],"#9ab8c8");poly(c,[160,112,206,110,220,120,150,122],"#dce8ee");fog(c,40,30,"#e8eef2",.35);vignette(c,.35)}},
 mer:{a:[0,240,20,128],fogc:"#2a6a84",paint(c,r){vg(c,0,H,[[0,"#4a9ab0"],[.5,"#1f5a74"],[1,"#0a2436"]]);for(let i=0;i<5;i++)beam(c,20+i*48,0,8,14,130,"#c8f0ff",.12);tex(c,r,0,0,W,H,200,["#8ac8d8"],.3);vignette(c,.5)},
   anim(c,f){bubbles(c,f,"#bfe8f4");shimmer(c,f,0,6,"#cff2ff")}},
 cagemer:{a:[0,240,20,128],fogc:"#2a5a6a",paint(c,r){SC.mer.paint(c,r,{});vg(c,0,H,[[0,"rgba(10,30,40,.2)"],[1,"rgba(10,30,40,.5)"]])},
   fg(c){c.fillStyle="rgba(200,220,220,.35)";for(let x=0;x<W;x+=8)c.fillRect(x,0,1,H);for(let y=0;y<H;y+=8)c.fillRect(0,y,W,1)},anim(c,f){bubbles(c,f,"#bfe8f4")}},
 fond:{a:[10,230,84,128],fogc:"#2a5a6a",paint(c,r){vg(c,0,H,[[0,"#3a8aa0"],[1,"#0e2a3a"]]);for(let i=0;i<4;i++)beam(c,30+i*55,0,8,12,110,"#c8f0ff",.1);
   for(let i=0;i<8;i++){const x=10+i*30;c.strokeStyle="#3a6a3a";c.lineWidth=2;c.beginPath();c.moveTo(x,128);c.quadraticCurveTo(x+6,90,x-2,60+i%3*10);c.stroke()}
   vg(c,108,H,[[0,"#7a6a4a"],[1,"#4a3e2a"]]);for(let i=0;i<6;i++)ell(c,20+i*40,112,14,8,"#3a3a3a");tex(c,r,0,110,W,25,300,["#9a8a6a"],.5);fog(c,40,50,"#3a8aa0",.3);vignette(c,.55)},anim(c,f){bubbles(c,f,"#bfe8f4")}},
 bassin:{a:[0,240,14,128],fogc:"#2a4a30",paint(c,r){vg(c,0,H,[[0,"#4a6a3a"],[1,"#12241a"]]);tex(c,r,0,0,W,H,600,["#5a7a4a","#203a26"],.4);beam(c,100,0,30,0,120,"#d0e8b0",.08);vignette(c,.6)},anim(c,f){bubbles(c,f,"#8aa87a")}},
 etang:{a:[0,240,20,128],fogc:"#4a5a34",paint(c,r){vg(c,0,H,[[0,"#7a8a4a"],[1,"#2a3418"]]);tex(c,r,0,0,W,H,700,["#8a9a5a","#3a4420"],.4);for(let i=0;i<3;i++)beam(c,40+i*70,0,10,6,120,"#e8f0b0",.08);vignette(c,.55)},anim(c,f){bubbles(c,f,"#a8b87a")}},
 bateau:{a:[50,190,84,110],fogc:"#5a6a78",paint(c,r){sky(c,"#3a4a62","#e8a878",62);glow(c,170,58,40,"#ffd0a0",.6);vg(c,60,H,[[0,"#3a4a5a"],[1,"#1a2430"]]);shimmer(c,0,64,134,"#5a6a7a");
   poly(c,[20,74,220,74,206,104,34,104],"#b8382a");R(c,30,72,180,4,"#e8e0d0");R(c,140,42,30,32,"#e8e8e0");R(c,146,48,8,8,"#2a3a4a");R(c,158,48,8,8,"#2a3a4a");R(c,90,20,2,54,"#3a3a3a");c.strokeStyle="#6a7a7a";c.beginPath();c.moveTo(91,22);c.lineTo(30,74);c.moveTo(91,22);c.lineTo(200,74);c.stroke();vignette(c,.45)}},
 vivier:{a:[70,170,72,102],fogc:"#2a5a64",paint(c,r){vg(c,0,H,[[0,"#3a2418"],[1,"#2a1810"]]);for(let i=0;i<5;i++)glow(c,20+i*50,30,24,"#ffb860",.35);
   R(c,50,40,140,70,"#2a5a6a");vg(c,42,110,[[0,"#4a8a9a"],[1,"#1a3a48"]],52,136);R(c,50,40,140,2,"#c8e0e8");R(c,50,110,140,6,"#5a4030");R(c,0,116,W,19,"#4a2a1a");vignette(c,.5)},anim(c,f){for(let i=0;i<10;i++)R(c,56+(i*13)%130,108-((f+i*7)%60),1,1,"#cfeef4")}},
 aquarium:{a:[92,150,64,92],fogc:"#5a9ab0",paint(c,r){vg(c,0,H,[[0,"#8a7058"],[1,"#5a4634"]]);glow(c,40,20,40,"#fff0c8",.4);R(c,0,104,W,31,"#6a4a30");ell(c,120,70,38,30,"#7ab8c8");ell(c,120,74,34,24,"#5a9ab0");R(c,84,40,72,6,"#8a7058");ell(c,120,98,30,4,"#e8d8a0");vignette(c,.45)}},
 zoo:{a:[20,220,64,128],fogc:"#2a7aa0",paint(c,r){vg(c,0,40,[[0,"#a8b8c8"],[1,"#d8dce0"]]);tex(c,r,0,4,W,30,800,["#c84a3a","#3a6a9a","#e8d8b0","#2a2a2a"],.7);R(c,0,38,W,4,"#f2f2f2");
   vg(c,42,H,[[0,"#4ab0d0"],[1,"#1a5a7a"]]);shimmer(c,0,44,134,"#8ad8f0");glow(c,120,30,60,"#ffffff",.25);vignette(c,.35)},anim(c,f){shimmer(c,f,44,134,"#a8e8f8")}},
 piste:{a:[0,240,92,122],move:1,fogc:"#9ab07a",paint(c,r){sky(c,"#8ab0d0","#e0e8e0",50);R(c,0,30,W,20,"#c8c0b0");tex(c,r,0,30,W,18,500,["#c84a3a","#2a3a6a","#e8e0d0"],.7);
   R(c,0,50,W,30,"#5a8a44");R(c,0,80,W,40,"#a8784a");tex(c,r,0,80,W,40,500,["#c89a6a","#7a5432"],.5);R(c,0,80,W,2,"#f2f2f2");R(c,0,120,W,15,"#4a7a3a");vignette(c,.3)},anim(c,f){for(let x=(f*6)%24-24;x<W;x+=24)R(c,x,74,1,6,"#f2f2f2")}},
 insectes:{a:[10,230,70,130],fogc:"#4a3a2a",paint(c,r){vg(c,0,H,[[0,"#1a120c"],[1,"#2a1e14"]]);for(let j=0;j<4;j++)for(let i=0;i<5;i++){const x=6+i*47,y=8+j*28;R(c,x,y,42,22,"#5a4428");R(c,x+2,y+2,38,16,"#7a5e36");tex(c,r,x+2,y+2,38,16,60,["#c8b080","#3a2a18"],.8)}
   for(let i=0;i<3;i++)glow(c,40+i*80,4,40,"#ff6a3a",.3);vignette(c,.6)}},
 magnanerie:{a:[10,230,74,130],fogc:"#7a6a4a",paint(c,r){vg(c,0,H,[[0,"#4a3a24"],[1,"#7a6a48"]]);glow(c,120,0,90,"#fff0c8",.3);for(let j=0;j<3;j++){R(c,4,30+j*34,232,12,"#a89060");for(let i=0;i<46;i++)ell(c,8+i*5,31+j*34,3,2,i%2?"#4a7a3a":"#3a6a2a")}vignette(c,.5)}},
 ruche:{a:[0,240,30,118],fogc:"#c8d8a8",paint(c,r){sky(c,"#9ac0d8","#e8f0d8",60);glow(c,190,20,40,"#fffbe0",.6);hills(c,r,54,3,"#8aa86a",6);vg(c,58,H,[[0,"#6e9e57"],[1,"#4a7a3a"]]);
   tex(c,r,0,62,W,73,900,["#f2e04a","#e86a8a","#f4f4f4","#b07ad8"],.8);for(const x of[30,70,110]){R(c,x,74,26,20,"#e0c890");R(c,x-2,70,30,5,"#c8a868");R(c,x+10,88,6,2,"#3a2a1a")}vignette(c,.3)}},
 labo:{a:[80,160,84,100],fogc:"#c8d4dc",paint(c,r){vg(c,0,H,[[0,"#c8d4dc"],[1,"#e8eef0"]]);for(let i=0;i<3;i++){R(c,20+i*80,4,50,2,"#ffffff");glow(c,45+i*80,6,30,"#eaf6ff",.4)}
   for(let k=0;k<2;k++)for(let i=0;i<6;i++){R(c,6+i*38,14+k*24,32,18,"#e8f0f4");R(c,6+i*38,14+k*24,32,1,"#9aa8b0");R(c,8+i*38,28+k*24,28,3,"#f5f0e0")}
   R(c,60,64,120,4,"#9aa8b0");vg(c,68,104,[[0,"rgba(230,240,245,.5)"],[1,"rgba(200,215,225,.7)"]],64,112);R(c,64,68,112,1,"#7a8890");R(c,64,104,112,2,"#7a8890");R(c,64,68,1,36,"#7a8890");R(c,175,68,1,36,"#7a8890");
   R(c,66,96,108,8,"#f2ecd8");R(c,186,80,30,16,"#f2c230");vg(c,108,H,[[0,"#aab8c0"],[1,"#c8d4dc"]]);vignette(c,.3)}},
 chenil:{a:[20,220,84,126],fogc:"#8a908e",paint(c,r){vg(c,0,H,[[0,"#5a605e"],[1,"#9aa09e"]]);for(let i=0;i<4;i++){R(c,30+i*50,4,30,2,"#f0f8f4");glow(c,45+i*50,6,24,"#e8fff4",.3)}vg(c,84,H,[[0,"#7a807e"],[1,"#5a605e"]]);vignette(c,.5)},
   fg(c){c.fillStyle="#3a3e3e";for(let x=0;x<W;x+=40)c.fillRect(x,14,3,120);c.fillStyle="#6a706e";for(let x=0;x<W;x+=5)c.fillRect(x,14,1,120)}},
 camion:{a:[52,172,62,106],fogc:"#1e2632",paint(c,r){sky(c,"#06080e","#141c28",80);stars(c,r,20,30);vg(c,104,H,[[0,"#14161a"],[1,"#0a0b0c"]]);
   R(c,30,40,150,68,"#2a3036");R(c,178,58,44,50,"#5a1e1a");R(c,196,62,18,14,"#1a2a36");glow(c,224,96,30,"#fff2b0",.6);for(const x of[50,76,150,204])ell(c,x,110,9,9,"#0a0a0a");
   glow(c,110,20,60,"#9ab0d0",.15);vignette(c,.6)},fg(c){c.fillStyle="#5a646c";for(let y=40;y<108;y+=9)c.fillRect(30,y,150,3);c.fillStyle="#3a4248";for(let x=30;x<182;x+=30)c.fillRect(x,40,3,68)},anim(c,f){rain(c,f,"#8aa0c0",.35)}},
 gavage:{a:[0,0,0,0],grid:1,fogc:"#3a382e",paint(c,r){vg(c,0,H,[[0,"#1e1c16"],[1,"#3b3a30"]]);for(let i=0;i<6;i++){R(c,10+i*40,3,14,2,"#e8d888");glow(c,17+i*40,5,20,"#e8d888",.3)}vignette(c,.6)},
   fg(c){c.fillStyle="#8d8a80";for(let j=0;j<3;j++){const y=56+j*28;c.fillRect(0,y,W,1);for(let x=0;x<W;x+=30)c.fillRect(x,y-24,1,24)}}},
 abattoir:{a:[10,230,82,126],fogc:"#7a8a94",paint(c,r){vg(c,0,H,[[0,"#2a3238"],[1,"#7a8890"]]);for(let i=0;i<5;i++){const t=i/4;R(c,120-20-t*70,6+t*14,40+t*140,1,"#e8f4ff");glow(c,120,8+t*14,30+t*40,"#dff0ff",.15)}
   persp(c,120,30,0,12,"#4a5258");R(c,0,20,W,3,"#3a4248");vg(c,80,H,[[0,"#6a787e"],[1,"#8a989e"]]);shimmer(c,0,84,134,"#a8b8be");fog(c,30,50,"#c8d8e0",.3);vignette(c,.5)}},
 cuisine:{a:[80,170,100,112],fogc:"#a08060",paint(c,r){vg(c,0,H,[[0,"#6a4a30"],[1,"#a07a50"]]);R(c,160,12,50,36,"#2a2018");R(c,163,15,44,30,"#3a5a7a");glow(c,60,10,40,"#ffd890",.5);R(c,56,4,8,6,"#ffe8b0");
   R(c,20,90,200,8,"#5a3a22");R(c,30,98,6,37,"#4a2e1a");R(c,204,98,6,37,"#4a2e1a");ell(c,120,88,14,3,"#f2ece0");vignette(c,.5)}},
 magasin:{a:[40,200,92,130],fogc:"#d8dcd8",paint(c,r){vg(c,0,H,[[0,"#d8dcd8"],[1,"#f0f0ea"]]);for(let i=0;i<6;i++){R(c,0,6+i*2,W,1,"#ffffff")}glow(c,120,10,90,"#ffffff",.3);
   for(let s=0;s<2;s++){const x0=s?150:0,w=90;for(let j=0;j<4;j++){R(c,x0,22+j*16,w,2,"#9a9a94");for(let i=0;i<16;i++)R(c,x0+2+i*5.5,12+j*16,4,10,["#c84a3a","#e8c84a","#4a8a5a","#3a6a9a","#f2f2f2","#e8a8a0"][Math.floor(r()*6)])}}
   poly(c,[90,20,150,20,180,H,60,H],"#c8c4b8");vg(c,86,H,[[0,"rgba(0,0,0,0)"],[1,"rgba(0,0,0,.1)"]]);vignette(c,.25)}},
 clinique:{a:[80,170,92,110],fogc:"#c8d4d4",paint(c,r){vg(c,0,H,[[0,"#c8d8d8"],[1,"#e8f0f0"]]);glow(c,120,10,60,"#ffffff",.5);R(c,60,92,120,6,"#9aa8ac");R(c,70,98,4,37,"#7a888c");R(c,166,98,4,37,"#7a888c");R(c,190,30,30,40,"#b8c8cc");vignette(c,.3)}},
};

/* ---------- cuisson, animation ---------- */
const BAKE={};
function bake(key,spec,seed){const id=key+JSON.stringify(spec)+seed;if(BAKE[id])return BAKE[id];
  const S0=SC[key]||SC.pre;const cv=document.createElement("canvas");cv.width=W;cv.height=H;const c=cv.getContext("2d");
  S0.paint(c,rng(seed||9),spec);
  if(spec.heat&&key!=="hangar"){c.fillStyle="rgba(255,110,40,.16)";c.fillRect(0,0,W,H)}
  const img=c.getImageData(0,0,W,H);const P=kmeans(img.data,24);quantize(img,P,22);
  return BAKE[id]={img,P};}
const SPRC={};
function sprPix(n,flip){const k=n+(flip?1:0);if(SPRC[k])return SPRC[k];const s=SPR[n];const w=sprW(n),h=s.r.length;const out=[];
  s.r.forEach((row,j)=>{for(let i=0;i<row.length;i++){const ch=row[i];if(ch===".")continue;out.push([flip?w-1-i:i,j,rgb(s.p[ch])])}});return SPRC[k]={px:out,w,h}}
function drawSpr(c,n,x,yFeet,flip,sc,fogc,k,P){const S=sprPix(n,flip);const fc=rgb(fogc);const y0=yFeet-S.h*sc;
  for(const [i,j,col] of S.px){let cc=mix(col,fc,k);if(j>=S.h*.66)cc=mix(cc,[0,0,0],.18);if(P)cc=nearest(P,cc[0],cc[1],cc[2]);
    c.fillStyle=`rgb(${cc[0]|0},${cc[1]|0},${cc[2]|0})`;c.fillRect(Math.round(x+i*sc),Math.round(y0+j*sc),sc,sc)}}
let CUR=null,LAST=0,FR=0;
const REDUCE=matchMedia("(prefers-reduced-motion: reduce)").matches;
function setScene(cv,spec,player,seed){
  if(!cv)return;const key=spec.bg&&SC[spec.bg]?spec.bg:"pre";const S0=SC[key];const r=rng(seed||1);const a=S0.a;const who=spec.who||player;
  const flags={night:spec.night,heat:spec.heat,danger:spec.danger,robot:spec.robot};
  const B=bake(key,flags,(seed||1)%5+1);
  const crowd=[];const n=spec.n||0;
  if(S0.grid){for(let j=0;j<3;j++)for(let x=0;x<8;x++)crowd.push({x:8+x*30,y:54+j*28,f:false,ph:x+j,n:who,sc:1,k:.1*(2-j)})}
  else for(let i=0;i<n;i++){const y=a[2]+r()*(a[3]-a[2]);const t=(y-a[2])/Math.max(1,a[3]-a[2]);crowd.push({x:a[0]+r()*Math.max(1,a[1]-a[0]-sprW(who)*2),y,f:r()<.5,ph:Math.floor(r()*8),n:who,sc:t>.55?2:1,k:(1-t)*.55})}
  [].concat(spec.extra||[]).forEach((e,i)=>crowd.push({x:16+i*30,y:a[3]-2,f:false,ph:i,n:e,sc:2,k:0}));
  let pl=null;
  if(!spec.nopl){const w=sprW(player)*2;pl={x:spec.px!=null?spec.px*1.5:Math.round((a[0]+a[1])/2-w/2),y:spec.py!=null?Math.min(a[3],spec.py*1.5+14):a[3]-4,n:player,sc:2,k:0};if(S0.grid){pl.x=98;pl.y=82;pl.sc=1}}
  CUR={cv,ctx:cv.getContext("2d"),spec,S0,B,crowd,pl,fogc:S0.fogc||"#808080"};
  drawScene(0);
}
function drawScene(f){
  if(!CUR||!CUR.cv.isConnected)return;const {ctx:c,spec,S0,B,crowd,pl,fogc}=CUR;
  c.putImageData(B.img,0,0);
  const items=crowd.slice();if(pl)items.push({...pl,me:1});items.sort((a,b)=>a.y-b.y);
  for(const o of items){let x=o.x;if(S0.move&&!o.me)x=((o.x+f*2)%(W+30))-20;
    const bob=(spec.still||REDUCE)?0:((f+o.ph)%8<1?-o.sc:0);drawSpr(c,o.n,x,o.y+bob,o.f,o.sc,fogc,o.k,null);
    if(o.me&&(REDUCE||f%6<4)){const cx=Math.round(x+sprW(o.n)*o.sc/2);const top=o.y-sprH(o.n)*o.sc+bob;R(c,cx-2,top-8,5,5,"#f2c230");R(c,cx-1,top-3,3,1,"#f2c230")}}
  if(S0.anim)S0.anim(c,f,spec);
  if(S0.fg)S0.fg(c,f,spec);
  if(spec.dark){c.fillStyle="rgba(0,0,0,"+spec.dark+")";c.fillRect(0,0,W,H)}
}
function loop(t){if(t-LAST>125){LAST=t;FR++;drawScene(FR)}requestAnimationFrame(loop)}
if(!REDUCE)requestAnimationFrame(loop);
Object.assign(SC,{
 animalerie:{a:[40,200,84,104],fogc:"#c8c8b8",paint(c,r){vg(c,0,H,[[0,"#d8d8cc"],[1,"#eeeee4"]]);glow(c,120,6,80,"#ffffff",.4);
   for(let j=0;j<3;j++)for(let i=0;i<5;i++){const x=6+i*47,y=8+j*26;R(c,x,y,42,20,"#c8d8dc");R(c,x+1,y+1,40,18,["#9ac8d8","#e8d8b0","#b8d8a8"][(i+j)%3]);R(c,x,y+19,42,2,"#8a9aa0")}
   R(c,30,86,180,4,"#9a9a90");R(c,34,60,172,26,"rgba(220,236,240,.6)");R(c,34,60,172,1,"#8a9aa0");R(c,34,60,1,26,"#8a9aa0");R(c,205,60,1,26,"#8a9aa0");vg(c,90,H,[[0,"#c8c4b4"],[1,"#b8b4a4"]]);R(c,150,100,60,20,"#e86a3a");vignette(c,.3)}},
 terrarium:{a:[40,200,70,112],fogc:"#5a6a3a",paint(c,r){vg(c,0,H,[[0,"#3a2a1e"],[1,"#5a4430"]]);R(c,24,18,192,104,"#2a3a22");vg(c,20,120,[[0,"#4a5a2a"],[1,"#8a6a3a"]],26,188);glow(c,120,20,60,"#ffd88a",.5);R(c,90,18,60,4,"#f0e0b0");
   for(let i=0;i<5;i++){c.strokeStyle="#3a6a2a";c.lineWidth=2;c.beginPath();c.moveTo(40+i*38,118);c.quadraticCurveTo(50+i*38,80,36+i*38,60);c.stroke()}ell(c,150,112,30,6,"#7a5a3a");R(c,24,18,192,2,"#c8c8c8");R(c,24,120,192,3,"#5a3a24");vignette(c,.5)}},
 recif:{a:[0,240,20,124],fogc:"#2a8ab0",paint(c,r){vg(c,0,H,[[0,"#5ac8e0"],[1,"#1a5a8a"]]);for(let i=0;i<5;i++)beam(c,20+i*48,0,8,10,120,"#e0ffff",.14);
   for(let i=0;i<14;i++){const x=r()*W,h=10+r()*24;ell(c,x,128-h/2,6+r()*10,h/2,["#e86a7a","#f0a040","#b07ad8","#f2e04a","#5ac0a0"][i%5])}vg(c,124,H,[[0,"#e8d8a8"],[1,"#c8b888"]]);vignette(c,.4)},anim(c,f){bubbles(c,f,"#e0f8ff")}},
 enclos:{a:[30,210,80,124],fogc:"#8a8a6a",paint(c,r){sky(c,"#a8b8c8","#e8e0c8",60);R(c,150,20,80,46,"#c8b898");R(c,166,32,16,14,"#5a6a7a");poly(c,[146,22,190,6,234,22],"#6a4a3a");R(c,0,50,W,85,"#8a7a52");tex(c,r,0,52,W,83,600,["#6a5a3a","#a89a6a"],.5);vignette(c,.4)},
   fg(c){c.fillStyle="#5a5a5a";for(let x=0;x<W;x+=7)c.fillRect(x,40,1,95);c.fillRect(0,40,W,2);c.fillStyle="#7a7a7a";for(let y=46;y<135;y+=7)c.fillRect(0,y,W,1)}},
});
