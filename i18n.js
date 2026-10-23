/* =========================================================
   LANGUE — français par défaut, anglais via en.js (dictionnaire FR → EN).
   tr(fr,en) : textes d'interface. T(fr) : textes de données.
   PL(lieu) : affiche un lieu dans la langue choisie, sans toucher au lieu
   lui-même (la logique du jeu compare les lieux en français).
   ========================================================= */
const UI_EN={"Corps":"Body","Peur":"Fear","Santé":"Health","Argent":"Money","Moral":"Morale","Rien":"Nothing","Carrière":"Career","Budget":"Budget","Ton corps est trop lourd pour courir.":"Your body is too heavy to run.",
 "Élevage terrestre":"Land farming","Laboratoire et fourrure":"Labs and fur","Poissons et crustacés":"Fish and crustaceans","Insectes":"Insects",
 "Animaux de compagnie":"Pets","NAC et animaux exotiques":"Exotic pets","Spectacle et loisirs":"Entertainment","Animaux sauvages":"Wild animals"};
function tr(fr,en){return window.LANG==="en"?en:fr}
function T(s){if(window.LANG!=="en"||s==null)return s;const D=window.EN||{};return D[s]!=null?D[s]:UI_EN[s]!=null?UI_EN[s]:s}
function PL(l){if(window.LANG!=="en"||!l)return l;const P=window.EN_PLACE||{};return String(l).split(", ").map(x=>P[x]||x).join(", ")}
const SKIP_EN=new Set(["lieux","k","sprite","bg","who","pl","ty","extra","sc","cat","env","t_tag"]);
function trDeep(o,key){if(o==null)return o;if(typeof o==="string")return SKIP_EN.has(key)?o:T(o);if(typeof o==="function")return o;
  if(Array.isArray(o)){for(let i=0;i<o.length;i++)o[i]=trDeep(o[i],key);return o}
  if(typeof o==="object"){for(const k in o){if(SKIP_EN.has(k))continue;o[k]=trDeep(o[k],k)}return o}return o}
let EN_DONE=false;
function applyEN(){if(window.LANG!=="en"||EN_DONE||!window.EN)return;EN_DONE=true;
  try{trDeep(LIVES);trDeep(INTER);trDeep(ARCS);if(typeof RARE_BY!=="undefined")for(const k in RARE_BY){const r=RARE_BY[k];for(const f in r)if(f!=="t")r[f]=trDeep(r[f],f)}
    for(const k in SOCIAL)SOCIAL[k].txt=T(SOCIAL[k].txt);
    for(const k in PROD)PROD[k]=T(PROD[k]);for(const k in HU_I)HU_I[k]=T(HU_I[k]);
    for(const k in ACTIONS)ACTIONS[k]=ACTIONS[k].map(T);
    SOURCES.forEach(s=>{s[0]=T(s[0]);s[1]=T(s[1])});
    for(const k in CATS)CATS[k].nom=T(CATS[k].nom);
    if(window.EN_NAMES&&typeof NAMES_A!=="undefined")NAMES_A.splice(0,NAMES_A.length,...window.EN_NAMES);
  }catch(e){console.warn("EN",e)}}
