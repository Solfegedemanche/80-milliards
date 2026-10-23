/* =========================================================
   APPLICATION DU RAPPORT
   1. Sources consultables dans le jeu
   2. Écran « Et toi ? » : trois gestes concrets par milieu de vie
   3. Carte de résultat en image (stories, TikTok)
   4. Mesure des tests : parties commencées, terminées, rejouées, partagées
   5. Mode « Vies sauvages »
   ========================================================= */

/* ---------- 2. Et toi ? ---------- */
const ACTIONS={
 bat:["Choisir du poulet Label Rouge, bio ou fermier : la vie de l'animal dure au moins deux fois plus longtemps.","Manger moins de viande, mais mieux. Un repas végétarien de plus par semaine change déjà la demande.","Regarder le mode d'élevage dans les plats préparés et demander ce qu'il en est à la cantine."],
 cage:["Acheter des œufs code 0 ou 1 : bio ou plein air.","Penser aux œufs cachés : pâtes, biscuits et gâteaux indiquent rarement le mode d'élevage.","Adopter des poules de réforme auprès d'une association."],
 pre:["Privilégier la viande et le lait issus d'élevages qui pratiquent le pâturage.","Manger moins de bœuf : c'est la viande au plus fort impact climatique.","Acheter en direct à des éleveurs locaux quand c'est possible."],
 aqua:["Chercher les labels ASC ou bio pour le poisson d'élevage.","Varier les espèces et limiter les crevettes importées.","Demander l'espèce et l'origine quand elles ne sont pas indiquées."],
 mer:["Consulter un guide des espèces à privilégier avant d'acheter du poisson.","Chercher le label MSC pour la pêche sauvage.","Réduire le plastique jetable : il finit en partie dans les océans."],
 labo:["Soutenir la recherche sur les méthodes sans animaux.","Adopter un animal sorti de laboratoire auprès d'une association comme le GRAAL.","Savoir que les tests de cosmétiques sur les animaux sont interdits dans l'Union européenne depuis 2013."],
 maison:["Adopter en refuge plutôt qu'acheter.","Faire stériliser son animal.","Se renseigner sur les besoins d'une espèce avant de l'accueillir, surtout pour un NAC."],
 bocal:["Ne jamais acheter un poisson sans aquarium adapté, filtré et chauffé.","Préférer les poissons nés en captivité.","Ne jamais relâcher un animal dans la nature."],
 rue:["Soutenir les campagnes de stérilisation et de vaccination.","Nourrir sans laisser de déchets.","Signaler un animal blessé à une association locale."],
 sauvage:["Ralentir la nuit sur les petites routes.","Laisser un passage pour la faune dans sa clôture et ne pas tondre la nuit.","Réduire son empreinte carbone et vérifier l'origine de l'huile de palme."],
 spec:["Refuser les activités avec contact : balades à dos d'éléphant, photos avec des félins.","Choisir des sanctuaires qui n'autorisent ni contact ni reproduction.","Ne pas partager de vidéos d'animaux sauvages traités en animaux de compagnie."],
 insecte:["Acheter du miel local à des apiculteurs qui laissent des réserves aux abeilles.","Planter des fleurs mellifères, sans pesticides.","Se renseigner sur l'origine des farines d'insectes."],
};
function etToiHTML(env){const a=ACTIONS[env];if(!a)return "";
  return `<section class="box etoi"><h2>Et toi ?</h2><p class="lede">Trois gestes simples, si tu veux que cette vie se passe autrement.</p><ol class="gestes">${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></section>`}

/* ---------- 1. Sources ---------- */
const SOURCES=[
 ["Nombre d'animaux abattus par espèce","FAO, FAOSTAT","https://www.fao.org/faostat/"],
 ["Animaux terrestres et poissons tués chaque année","Our World in Data","https://ourworldindata.org/animal-welfare"],
 ["Estimations du nombre de poissons capturés et élevés","Fishcount","https://fishcount.org.uk/"],
 ["Élevage d'insectes et de crevettes","Rethink Priorities","https://rethinkpriorities.org/"],
 ["Bien-être des poulets de chair et des poules","EFSA, autorité européenne de sécurité des aliments","https://www.efsa.europa.eu/fr/topics/topic/animal-welfare"],
 ["Croissance des poulets de 1957 à 2005","Zuidhof et al., Poultry Science, 2014","https://doi.org/10.3382/ps.2014-04291"],
 ["Directive européenne sur les poulets de chair (2007/43/CE)","EUR-Lex","https://eur-lex.europa.eu/legal-content/FR/ALL/?uri=CELEX:32007L0043"],
 ["Directive européenne sur les porcs (2008/120/CE)","EUR-Lex","https://eur-lex.europa.eu/legal-content/FR/ALL/?uri=CELEX:32008L0120"],
 ["Animaux utilisés à des fins scientifiques en France","Ministère de l'Enseignement supérieur et de la Recherche","https://www.enseignementsup-recherche.gouv.fr/fr/utilisation-des-animaux-fins-scientifiques"],
 ["Commerce international des espèces menacées","CITES","https://cites.org/fra"],
 ["Mortalité des saumons d'élevage en Norvège","Institut vétérinaire norvégien","https://www.vetinst.no/en"],
 ["Statut des espèces menacées","Liste rouge de l'UICN","https://www.iucnredlist.org/fr"],
 ["Émissions de gaz à effet de serre par aliment","Poore et Nemecek, Science, 2018 · Our World in Data","https://ourworldindata.org/environmental-impacts-of-food"],
 ["Exportations de bovins et commerce de viande ovine","Idele, Institut de l'élevage · FranceAgriMer","https://idele.fr/"],
 ["Statistiques agricoles françaises (consommation, cheptels)","Agreste, ministère de l'Agriculture","https://agreste.agriculture.gouv.fr/"],
 ["Exportations de veaux irlandais","Ministère irlandais de l'Agriculture","https://www.gov.ie/en/organisation/department-of-agriculture-food-and-the-marine/"],
 ["Origine des feux de forêt en France","Ministère de l'Intérieur, prévention des incendies","https://www.feux-foret.gouv.fr/"],
 ["Ordonnance suisse sur la protection des animaux (cochons d'Inde, homards)","Fedlex, Confédération suisse","https://www.fedlex.admin.ch/eli/cc/2008/416/fr"],
 ["Licences pour primates de compagnie en Angleterre (2024/296)","legislation.gov.uk","https://www.legislation.gov.uk/uksi/2024/296/part/1/made"],
 ["Interdiction du commerce des perroquets gris sauvages","World Parrot Trust","https://parrots.org/news/africa/ban-on-trade-in-wild-grey-parrots-comes-into-effect/"],
 ["Big Cat Public Safety Act (États-Unis, 2022)","Congrès des États-Unis","https://www.congress.gov/bill/117th-congress/house-bill/263"],
 ["Fin annoncée de l'élevage de lions en Afrique du Sud","Mongabay, 2021","https://news.mongabay.com/2021/05/south-africa-pulls-the-plug-on-controversial-captive-lion-industry/"],
 ["Poissons d'aquarium capturés dans la nature","Université de Sydney, 2025","https://www.sydney.edu.au/news-opinion/news/2025/10/09/losing-nemo--almost-all-aquarium-fish-in-the-us-are-caught-in-th.html"],
 ["Pythons royaux exportés d'Afrique de l'Ouest","Harrington et al., Nature Conservation, 2020","https://natureconservation.pensoft.net/article_preview.php?id=51270"],
 ["Baleine franche de l'Atlantique Nord","NOAA Fisheries","https://www.fisheries.noaa.gov/species/north-atlantic-right-whale"],
 ["Suivi du loup en France","Office français de la biodiversité","https://www.loupfrance.fr/"],
];
function sources(){
  KEY=null;
  app.innerHTML=`<div class="label">80 milliards · <b>Sources</b></div>
  <h1>D'où viennent les faits du jeu.</h1>
  <p class="lede">Chaque étape affiche un fait sous « Dans la réalité ». Ces faits viennent des sources ci-dessous. Les chiffres sont arrondis et ont été revérifiés en octobre 2026. Quand les estimations divergent, le jeu donne une fourchette ou l'ordre de grandeur le plus prudent.</p>
  <ul class="srcs">${SOURCES.map(([t,o,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${esc(t)}</a><span class="small">${esc(o)}</span></li>`).join("")}</ul>
  <p class="small">Une erreur ? Note l'espèce, l'étape et la phrase, et signale-la à l'équipe du jeu.</p>
  <div class="row"><button class="btn" id="back">Accueil</button></div>`;
  document.getElementById("back").onclick=intro;window.scrollTo(0,0);
}

/* ---------- 3. Carte de résultat ---------- */
function makeCard(o){
  const c=document.createElement("canvas");c.width=1080;c.height=1920;const x=c.getContext("2d");
  x.fillStyle="#0e1112";x.fillRect(0,0,1080,1920);
  x.imageSmoothingEnabled=false;if(o.scene)x.drawImage(o.scene,60,140,960,540);
  x.fillStyle="#f2c230";x.font="600 40px Archivo, Arial, sans-serif";x.fillText("80 MILLIARDS",60,100);
  x.fillStyle="#8d9496";x.font="500 38px Archivo, Arial, sans-serif";x.fillText(o.lieu.toUpperCase(),60,760);
  x.fillStyle="#ebe7de";x.font="700 64px Archivo, Arial, sans-serif";wrap(x,"J'ai tiré : "+o.nom,60,840,960,74);
  if(!o.human){x.font="700 300px Archivo, Arial, sans-serif";x.fillText(String(o.n),50,1240);
    x.font="600 56px Archivo, Arial, sans-serif";x.fillStyle="#8d9496";x.fillText(o.u.toUpperCase()+(o.mort?" · MORT AVANT L'HEURE":""),60,1320);
    x.fillStyle="#283033";for(let i=0;i<60;i++)x.fillRect(60+i*16,1380,10,30);x.fillStyle=o.mort?"#ebe7de":"#f2c230";x.fillRect(60,1380,Math.max(8,960*Math.min(1,o.ratio/100)),30);
    x.fillStyle="#ebe7de";x.font="500 46px Archivo, Arial, sans-serif";x.fillText(o.pct+" de ma vie possible ("+o.nat+")",60,1480);
    if(o.hu){x.fillStyle="#e0a080";x.font="600 42px Archivo, Arial, sans-serif";x.fillText(o.hu+" décisions humaines ont façonné ma vie.",60,1560)}}
  else{x.font="700 120px Archivo, Arial, sans-serif";x.fillText(o.t||"",60,1200)}
  if(o.rare){x.fillStyle="#f2c230";x.fillRect(60,1620,330,70);x.fillStyle="#1a1608";x.font="700 40px Archivo, Arial, sans-serif";x.fillText("FIN RARE",90,1670)}
  x.fillStyle="#ebe7de";x.font="600 44px Archivo, Arial, sans-serif";x.fillText("Et toi, tu serais né quoi ?",60,1790);x.fillStyle="#f2c230";x.font="600 36px Archivo, Arial, sans-serif";x.fillText(String(window.SITE||"").replace(/^https?:\/\//,"").replace(/\/$/,""),60,1856);
  return c;
}
function wrap(x,t,l,y,w,lh){const words=t.split(" ");let line="";for(const wd of words){const tt=line?line+" "+wd:wd;if(x.measureText(tt).width>w&&line){x.fillText(line,l,y);line=wd;y+=lh}else line=tt}x.fillText(line,l,y)}
let DL=null;
async function showCard(o){
  const box=document.getElementById("cardbox");if(!box)return;
  const cv=makeCard(o);const url=cv.toDataURL("image/png");
  box.innerHTML=`<img src="${url}" alt="Carte de résultat : ${esc(o.nom)}, ${esc(o.pct||"")} de sa vie possible" class="card-img"><p class="small">Sur téléphone : appui long sur l'image pour l'enregistrer.</p>${DL?`<button class="btn ghost" id="dlcard">Enregistrer l'image</button>`:""}`;
  const b=document.getElementById("dlcard");
  if(b)b.onclick=()=>cv.toBlob(bl=>{if(!DL){const u=URL.createObjectURL(bl),l=document.createElement("a");l.href=u;l.download="80-milliards.png";document.body.appendChild(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),2000);return}DL.save({filename:"80-milliards.png",data:bl}).then(()=>{},e=>{if(e&&e.code==="unavailable")b.remove()})},"image/png");
  statMark({card:true});
}

/* ---------- 4. Mesure des tests ---------- */
let DB=null,ME=null,OWNER=false;
const SESS=(()=>{try{const n=+(sessionStorage.getItem("ism80_n")||0);return {get:()=>n,inc(){try{sessionStorage.setItem("ism80_n",String(n+1))}catch(e){}return n+1}}}catch(e){return {get:()=>0,inc:()=>1}}})();
let NPLAY=SESS.get();
(async()=>{try{if(!window.claude||!window.claude.use)return;
  const [db,u,dl]=await Promise.all([claude.use("db"),claude.use("user"),claude.use("downloads")]);
  DB=db;DL=dl;if(u){OWNER=u.isOwner();try{ME=await u.id()}catch(e){}}
  const slot=document.getElementById("ownerslot");if(slot&&OWNER&&DB)slot.innerHTML=`<button class="btn ghost" id="stats">Statistiques des tests</button>`,document.getElementById("stats").onclick=statsView;
}catch(e){}})();
function statStart(){if(!DB||!S)return;NPLAY++;const L=LIVES[S.k];
  DB.collection("plays").add({k:S.k,cat:L.cat,lieu:S.lieu,mode:WILD?"sauvage":OPT.mode,n:NPLAY,t0:Date.now(),fini:false,partage:false,carte:false})
    .then(r=>{if(S)S.gid=r.id;GID=r.id},()=>{})}
let GID=null;
function statEnd(o){if(!DB)return;const id=(S&&S.gid)||GID;if(!id)return;DB.doc("plays/"+id).update({fini:true,sec:o.sec,etapes:o.steps,rare:!!o.rare,mort:!!o.mort}).catch(()=>{})}
function statMark(f){if(!DB||!GID)return;DB.doc("plays/"+GID).update(f).catch(()=>{})}
async function statsView(){
  KEY=null;app.innerHTML=`<div class="label">80 milliards · <b>Statistiques des tests</b></div><h1>Ce que font les testeurs.</h1><p class="lede" id="st">Chargement…</p>`;
  let docs=[];try{const q=await DB.collection("plays").orderBy("t0","desc").limit(1000).get();docs=q.docs.map(d=>d.data()||{})}catch(e){document.getElementById("st").textContent="Les statistiques ne sont pas lisibles depuis cette vue.";return}
  const n=docs.length,fin=docs.filter(d=>d.fini).length,rej=docs.filter(d=>(d.n||1)>1).length,part=docs.filter(d=>d.partage||d.carte).length;
  const pc=v=>n?Math.round(v/n*100)+" %":"—";const avg=fin?Math.round(docs.filter(d=>d.fini).reduce((a,d)=>a+(d.sec||0),0)/fin):0;
  const by={};docs.forEach(d=>{by[d.k]=(by[d.k]||0)+1});const top=Object.entries(by).sort((a,b)=>b[1]-a[1]).slice(0,8);
  app.innerHTML=`<div class="label">80 milliards · <b>Statistiques des tests</b></div><h1>Ce que font les testeurs.</h1>
  ${n?"":`<p class="lede">Aucune partie enregistrée pour l'instant. Les parties des testeurs connectés apparaîtront ici.</p>`}
  <div class="totals"><div><strong>${n}</strong><span class="label">parties lancées</span></div><div><strong>${pc(fin)}</strong><span class="label">terminées</span></div><div><strong>${pc(rej)}</strong><span class="label">rejouées</span></div><div><strong>${pc(part)}</strong><span class="label">partagées</span></div></div>
  <p>Durée moyenne d'une partie terminée : <b>${clock(avg)}</b>.</p>
  <section class="box"><h2>Vies les plus jouées</h2><ul class="par">${top.map(([k,v])=>`<li><span>${esc(LIVES[k]?LIVES[k].nom:k)}</span><span>${v}</span></li>`).join("")}</ul></section>
  <p class="small">Une partie « rejouée » est une deuxième partie ou plus dans la même session. « Partagée » : résultat copié ou carte créée.</p>
  <div class="row"><button class="btn" id="back">Accueil</button></div>`;
  document.getElementById("back").onclick=intro;
}

/* ---------- 5. Vies sauvages ---------- */
let WILD=false;
const WILDSET=()=>ANIMALS().filter(k=>LIVES[k].cat==="sauvage"||k==="thon");
function drawWild(){const h=HIST();return pick(WILDSET(),k=>h[h.length-1]===fam(k)?.1:1)}
