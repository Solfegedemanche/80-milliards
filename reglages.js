/* =========================================================
   RÉGLAGES — thème, taille du texte, son ; bande son générée en direct
   (aucun fichier audio : tout est synthétisé, donc libre de droits).
   ========================================================= */
const PREF_K="ism80_pref";
let PREF=(()=>{try{return {theme:"auto",size:1,son:true,...JSON.parse(localStorage.getItem(PREF_K)||"{}")}}catch(e){return {theme:"auto",size:1,son:true}}})();
function savePref(){try{localStorage.setItem(PREF_K,JSON.stringify(PREF))}catch(e){}}
function applyPref(){const r=document.documentElement;if(PREF.theme==="auto")r.removeAttribute("data-theme");else r.setAttribute("data-theme",PREF.theme);
  r.style.setProperty("--zoom",String(PREF.size||1))}
applyPref();
function reglagesHTML(){return `<button class="btn quiet setb" id="setb" type="button" aria-expanded="false" aria-controls="setp">${tr("Réglages","Settings")}</button>
 <div class="setp" id="setp" hidden>
  <div class="sg"><span class="label">${tr("Thème","Theme")}</span>${[["auto","Auto"],["light",tr("Clair","Light")],["dark",tr("Sombre","Dark")]].map(([v,n])=>`<button type="button" class="sb ${PREF.theme===v?"on":""}" data-th="${v}">${n}</button>`).join("")}</div>
  <div class="sg"><span class="label">${tr("Texte","Text")}</span>${[[1,"A"],[1.12,"A+"],[1.25,"A++"]].map(([v,n])=>`<button type="button" class="sb ${PREF.size===v?"on":""}" data-sz="${v}">${n}</button>`).join("")}</div>
  <div class="sg"><span class="label">${tr("Son","Sound")}</span>${[[true,tr("Activé","On")],[false,tr("Coupé","Off")]].map(([v,n])=>`<button type="button" class="sb ${PREF.son===v?"on":""}" data-so="${v}">${n}</button>`).join("")}</div>
 <div class="sg"><span class="label">${tr("Langue","Language")}</span><button type="button" class="sb ${LANG==="fr"?"on":""}" data-lg="fr">Français</button><button type="button" class="sb ${LANG==="en"?"on":""}" data-lg="en">English</button></div>
 </div>`}
function bindReglages(){const b=document.getElementById("setb"),p=document.getElementById("setp");if(!b)return;
  b.onclick=()=>{p.hidden=!p.hidden;b.setAttribute("aria-expanded",!p.hidden)};
  p.querySelectorAll("[data-th]").forEach(x=>x.onclick=()=>{PREF.theme=x.dataset.th;savePref();applyPref();refreshSet(p)});
  p.querySelectorAll("[data-sz]").forEach(x=>x.onclick=()=>{PREF.size=+x.dataset.sz;savePref();applyPref();refreshSet(p)});
  p.querySelectorAll("[data-lg]").forEach(x=>x.onclick=()=>{if(x.dataset.lg===LANG)return;PREF.lang=x.dataset.lg;savePref();try{const u=new URL(location.href);u.searchParams.delete("lang");location.replace(u.toString())}catch(e){location.reload()}});
  p.querySelectorAll("[data-so]").forEach(x=>x.onclick=()=>{PREF.son=x.dataset.so==="true";savePref();refreshSet(p);if(PREF.son){SND.start();SND.set(SND.cur||"pre")}else SND.stop()});}
function refreshSet(p){p.querySelectorAll("[data-th]").forEach(x=>x.classList.toggle("on",x.dataset.th===PREF.theme));p.querySelectorAll("[data-sz]").forEach(x=>x.classList.toggle("on",+x.dataset.sz===PREF.size));p.querySelectorAll("[data-so]").forEach(x=>x.classList.toggle("on",(x.dataset.so==="true")===PREF.son))}

/* ---------- Bande son ---------- */
const SND_BG={
 bat:["hangar","cage","caillebotis","maternite","etable","traite","couvoir","gavage","labo","chenil","magnanerie","insectes","abattoir","animalerie","clinique","refuge","cuisine","magasin","terrarium"],
 eau:["mer","fond","recif","bassin","etang","cagemer","aquarium","vivier"],
 moteur:["camion","bateau"],
 ville:["ville","route","inde","maison"],
 froid:["banquise","desert"],
};
function sndKind(bg){for(const k in SND_BG)if(SND_BG[k].includes(bg))return k;return "pre"}
const SND={ctx:null,master:null,layers:null,cur:null,timer:null,music:null,
 start(){if(this.ctx||!PREF.son)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;this.ctx=new C();this.master=this.ctx.createGain();this.master.gain.value=0;this.master.connect(this.ctx.destination);
   this.master.gain.linearRampToValueAtTime(.5,this.ctx.currentTime+2);this.noise=this.mkNoise();this.musicStart()}catch(e){this.ctx=null}},
 stop(){if(!this.ctx)return;try{const c=this.ctx;this.master.gain.linearRampToValueAtTime(0,c.currentTime+.6);clearInterval(this.timer);clearInterval(this.mtimer);setTimeout(()=>{try{c.close()}catch(e){}},700)}catch(e){}this.ctx=null;this.layers=null},
 mkNoise(){const c=this.ctx,b=c.createBuffer(1,c.sampleRate*4,c.sampleRate),d=b.getChannelData(0);let l=0;for(let i=0;i<d.length;i++){const w=Math.random()*2-1;l=(l+.02*w)/1.02;d[i]=l*3.5}return b},
 src(){const s=this.ctx.createBufferSource();s.buffer=this.noise;s.loop=true;s.loopStart=Math.random();return s},
 set(bg,night){if(!PREF.son)return;if(!this.ctx)this.start();if(!this.ctx)return;const kind=sndKind(bg)+(night?"-n":"");if(kind===this.cur&&this.layers)return;this.cur=kind;
   const c=this.ctx,t=c.currentTime;if(this.layers){const old=this.layers;old.g.gain.linearRampToValueAtTime(0,t+1.5);setTimeout(()=>old.nodes.forEach(n=>{try{n.stop()}catch(e){}}),1700)}
   clearInterval(this.timer);const g=c.createGain();g.gain.value=0;g.connect(this.master);const nodes=[];const k=kind.split("-")[0];
   const bed=(f,q,vol,type)=>{const s=this.src(),fl=c.createBiquadFilter();fl.type=type||"lowpass";fl.frequency.value=f;fl.Q.value=q||.7;const v=c.createGain();v.gain.value=vol;s.connect(fl).connect(v).connect(g);s.start();nodes.push(s);return {fl,v}};
   if(k==="bat"){bed(220,.8,.55);const o=c.createOscillator();o.type="sawtooth";o.frequency.value=50;const f=c.createBiquadFilter();f.type="lowpass";f.frequency.value=120;const v=c.createGain();v.gain.value=.05;o.connect(f).connect(v).connect(g);o.start();nodes.push(o)}
   if(k==="eau"){const b=bed(380,.6,.6);const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=.08;lg.gain.value=160;lfo.connect(lg).connect(b.fl.frequency);lfo.start();nodes.push(lfo);this.timer=setInterval(()=>this.blip(g,700+Math.random()*900,.04),900)}
   if(k==="moteur"){bed(160,1,.5);const o=c.createOscillator();o.type="square";o.frequency.value=38;const f=c.createBiquadFilter();f.frequency.value=90;const v=c.createGain();v.gain.value=.06;o.connect(f).connect(v).connect(g);o.start();nodes.push(o)}
   if(k==="ville"){bed(300,.5,.45);this.timer=setInterval(()=>{if(Math.random()<.3)this.swoosh(g)},2500)}
   if(k==="froid"){const b=bed(900,2.5,.35,"bandpass");const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=.11;lg.gain.value=500;lfo.connect(lg).connect(b.fl.frequency);lfo.start();nodes.push(lfo)}
   if(k==="pre"){const b=bed(700,1.8,.25,"bandpass");const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=.07;lg.gain.value=300;lfo.connect(lg).connect(b.fl.frequency);lfo.start();nodes.push(lfo);
     this.timer=setInterval(()=>{if(night){if(Math.random()<.7)this.cricket(g)}else if(Math.random()<.45)this.bird(g)},1400)}
   if(k==="bat"&&night)bed(120,.7,.2);
   g.gain.linearRampToValueAtTime(1,t+2);this.layers={g,nodes}},
 blip(g,f,vol){const c=this.ctx;if(!c)return;const o=c.createOscillator(),v=c.createGain(),t=c.currentTime;o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*2.2,t+.08);v.gain.setValueAtTime(vol,t);v.gain.exponentialRampToValueAtTime(.0001,t+.12);o.connect(v).connect(g);o.start(t);o.stop(t+.14)},
 bird(g){const c=this.ctx;if(!c)return;const t0=c.currentTime,n=2+Math.floor(Math.random()*4),f0=2200+Math.random()*1800;for(let i=0;i<n;i++){const o=c.createOscillator(),v=c.createGain(),t=t0+i*.13;o.type="sine";o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f0*(1.2+Math.random()*.4),t+.07);v.gain.setValueAtTime(0,t);v.gain.linearRampToValueAtTime(.025,t+.02);v.gain.exponentialRampToValueAtTime(.0001,t+.1);o.connect(v).connect(g);o.start(t);o.stop(t+.12)}},
 cricket(g){const c=this.ctx;if(!c)return;const t0=c.currentTime;for(let i=0;i<3;i++){const o=c.createOscillator(),v=c.createGain(),t=t0+i*.06;o.frequency.value=4300;v.gain.setValueAtTime(.012,t);v.gain.exponentialRampToValueAtTime(.0001,t+.04);o.connect(v).connect(g);o.start(t);o.stop(t+.05)}},
 swoosh(g){const c=this.ctx;if(!c)return;const s=this.src(),f=c.createBiquadFilter(),v=c.createGain(),t=c.currentTime;f.type="bandpass";f.frequency.setValueAtTime(200,t);f.frequency.linearRampToValueAtTime(900,t+1.2);f.frequency.linearRampToValueAtTime(200,t+2.6);v.gain.setValueAtTime(0,t);v.gain.linearRampToValueAtTime(.35,t+1.2);v.gain.linearRampToValueAtTime(0,t+2.6);s.connect(f).connect(v).connect(g);s.start(t);s.stop(t+2.7)},
 /* Musique : nappes lentes en mineur, très basses, qui changent toutes les 8 secondes */
 musicStart(){const c=this.ctx;const mg=c.createGain();mg.gain.value=.05;const lp=c.createBiquadFilter();lp.type="lowpass";lp.frequency.value=900;mg.connect(lp).connect(this.master);this.music=mg;
   const CH=[[57,60,64],[53,57,60],[55,59,62],[52,55,59]];let i=0;
   const play=()=>{if(!this.ctx)return;const t=c.currentTime;CH[i%CH.length].forEach((m,j)=>{const o=c.createOscillator(),v=c.createGain();o.type=j?"triangle":"sine";o.frequency.value=440*Math.pow(2,(m-12-69)/12)*(j?2:1);v.gain.setValueAtTime(0,t);v.gain.linearRampToValueAtTime(.5/(j+1),t+3);v.gain.linearRampToValueAtTime(0,t+8.5);o.connect(v).connect(mg);o.start(t);o.stop(t+9)});i++};
   play();this.mtimer=setInterval(play,8000)},
 mood(end){if(!this.music||!this.ctx)return;this.music.gain.linearRampToValueAtTime(end?.09:.05,this.ctx.currentTime+2)}
};
document.addEventListener("visibilitychange",()=>{if(!SND.ctx)return;if(document.hidden)SND.ctx.suspend();else SND.ctx.resume()});
