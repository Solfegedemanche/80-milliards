/* =========================================================
   ÉTIQUETTES — le format réel d'identification de chaque animal.
   Les numéros sont fictifs ; le format, lui, est réel.
   Quand un animal n'a pas de numéro, le jeu le dit : c'est une information.
   ========================================================= */
const ISO={"France":"FR","Espagne":"ES","Italie":"IT","Allemagne":"DE","Pays-Bas":"NL","Irlande":"IE","Pologne":"PL","Belgique":"BE","Danemark":"DK","Hongrie":"HU","Grèce":"EL","Finlande":"FI","Roumanie":"RO","Slovénie":"SI","Royaume-Uni":"UK"};
const ISON={"France":"250","Espagne":"724","Italie":"380","Turquie":"792","Canada":"124","Belgique":"056","Allemagne":"276","Royaume-Uni":"826","États-Unis":"840","Suisse":"756","Pays-Bas":"528"};
const DEPTS={"Normandie":["14","50","61"],"Bretagne":["22","29","35","56"],"Charolais":["71"],"Camargue":["13","30"],"Aveyron":["12"],"Hautes-Alpes":["05"],"Deux-Sèvres":["79"],"Vienne":["86"],"Ardèche":["07"],"Jura":["39"],"Auvergne":["15","43","63"],"Haute-Saône":["70"],"Vendée":["85"],"Landes":["40"],"Gers":["32"],"Périgord":["24"],"Pays de la Loire":["44","49","53","72","85"]};
function digits(n,seed){let s="";for(let i=0;i<n;i++)s+=Math.floor(seed()*10);return s}
function letters(n,seed){const A="BCDFGHJKLMNPQRSTVWXZ";let s="";for(let i=0;i<n;i++)s+=A[Math.floor(seed()*A.length)];return s}
function seeded(str){let h=2166136261;for(const c of str)h=Math.imul(h^c.charCodeAt(0),16777619);return()=>{h^=h<<13;h^=h>>>17;h^=h<<5;return((h>>>0)%100000)/100000}}
function grp(s,n){return s.replace(new RegExp(`(.{${n}})(?=.)`,"g"),"$1 ")}
const FIC=" Le numéro est fictif, le format est réel.";
const ID_K={
 bovin:["vache","veau","bovin","taureau","buffle"],
 ovin:["agneau","chevreau"],
 porc:["porc","truie"],
 lot:["poulet","caille","canard","oie","dinde","lapin"],
 poisson:["poisson","saumon","crevette"],
 labo:["souris","rat"],
 labo2:["beagle","macaque"],
 puce:["chien","levrier","furet"],
 equide:["cheval","chevalcourse"],
 cites:["python","iguane"],
 rien:["poissonrouge","hamster","cobaye","lapinnain","chinchilla","betta","poissonclown","axolotl"],
 insecte:["larve","ver","grillon","abeille"],
};
function idCat(k){for(const c in ID_K)if(ID_K[c].includes(k))return c;return null}
function idTag(S){
  const L=LIVES[S.k],k=S.k,r=seeded(S.tag+k),pays=S.lieu.split(",")[0].trim(),reg=(S.lieu.split(",")[1]||"").trim();
  const cc=ISO[pays],c=idCat(k);
  if(L.human)return {a:"ID",b:grp(S.tag.slice(0,6),3),c:S.tag.slice(6),i:"Ton badge d'entreprise."};
  const none=(txt)=>({a:"",b:"aucun",c:"numéro",i:txt,none:1});
  if(L.cat==="sauvage"||["anchois","thon","homard","poulpe","perroquet"].includes(k))
    return none(k==="perroquet"?"Personne ne t'a numéroté. Pour la loi, ta capture est illégale : tu n'existes pas.":"Personne ne t'a numéroté. Tu n'appartiens à personne.");
  if(k==="poussin")return none("Tu n'as pas de numéro. Au couvoir, on compte les œufs et les poussins par milliers.");
  if(k==="chat"||k==="errant")return none(k==="chat"?"Personne ne t'a fait identifier. En France, c'est pourtant obligatoire pour les chats avant l'âge de 7 mois.":"Tu n'as pas de puce. Personne ne t'a déclaré.");
  if(k==="pondeuse"){if(cc)return {a:"ŒUF",b:"3"+cc,c:letters(3,r)+digits(2,r),i:"Toi, tu n'as pas de numéro. Tes œufs en portent un : le mode d'élevage (3 = cage), le pays, puis le code de ton élevage."+FIC};
    return {a:"LOT",b:"26",c:digits(4,r),i:"Tu n'as pas de numéro à toi. Les poules d'un même bâtiment sont suivies comme un seul lot."+FIC}}
  if(c==="bovin"){
    if(pays==="France"){const d=(DEPTS[reg]||["35"]);const dp=d[Math.floor(r()*d.length)];const n=digits(8,r);return {a:"FR",b:dp+" "+n.slice(0,4),c:n.slice(4),i:"Boucle officielle, une à chaque oreille : FR, le département de ton élevage, puis ton numéro. Elle te suivra jusqu'à l'abattoir."+FIC}}
    if(cc){const n=digits(12,r);return {a:cc,b:grp(n.slice(0,6),3),c:grp(n.slice(6),3),i:"Boucle officielle, une à chaque oreille, comme partout en Europe : le code du pays, puis ton numéro. Elle te suivra jusqu'à l'abattoir."+FIC}}
    if(pays==="États-Unis"){const n=digits(12,r);return {a:"840",b:grp(n.slice(0,6),3),c:grp(n.slice(6),3),i:"Boucle électronique officielle : 840 est le code des États-Unis, puis ton numéro."+FIC}}
  }
  if(c==="ovin"&&cc){const n=digits(12,r);return {a:cc,b:grp(n.slice(0,6),3),c:grp(n.slice(6),3),i:"Boucle électronique officielle : dans l'Union européenne, chaque mouton et chaque chèvre est identifié individuellement."+FIC}}
  if(c==="porc"&&pays==="France"){const d=(DEPTS[reg]||["35","22","29","56"]);const ind=d[Math.floor(r()*d.length)]+letters(3,r);
    return k==="truie"?{a:"FR",b:ind,c:digits(6,r),i:"Le code de ton élevage, suivi de ton numéro, tatoué sur ton oreille ou sur une boucle jaune : seuls les reproducteurs ont un numéro à eux."+FIC}
      :{a:"FR",b:ind,c:"",i:"Tu n'as pas de numéro à toi. Avant le départ pour l'abattoir, on tatoue sur ton épaule le code de ton élevage."+FIC}}
  if(c==="porc")return {a:"LOT",b:"26",c:digits(4,r),i:"Tu n'as pas de numéro à toi : les porcs charcutiers sont suivis par élevage et par lot."+FIC};
  if(c==="lot")return {a:"LOT",b:"26",c:digits(4,r),i:"Tu n'as pas de numéro à toi. Tu es suivi comme partie d'un lot : tout le bâtiment porte le même numéro."+FIC};
  if(c==="poisson")return {a:k==="saumon"?"CAGE":"BASSIN",b:digits(2,r),c:"",i:"Personne ne te compte. Les poissons d'élevage sont pesés en tonnes, pas comptés un par un."};
  if(k==="vison")return {a:"CAGE",b:digits(4,r),c:"",i:"Ta cage porte un numéro. C'est tout ce qui te distingue des autres."+FIC};
  if(c==="labo")return {a:"CAGE",b:letters(1,r)+"-"+digits(2,r),c:digits(4,r),i:"Ta cage porte une fiche : ton numéro, ta lignée, et le protocole qui t'attend."+FIC};
  if(c==="labo2"){const n=digits(6,r);return {a:"N°",b:n.slice(0,3),c:n.slice(3),i:"Un numéro tatoué ou une puce te suit partout. Dans l'Union européenne, c'est obligatoire pour les chiens et les primates de laboratoire."+FIC}}
  if(c==="puce"||c==="equide"){const code=ISON[pays];if(code){const n=digits(12,r);return {a:c==="equide"?"PUCE":"PUCE",b:code+" "+n.slice(0,3),c:grp(n.slice(3),3),i:c==="equide"&&pays==="France"?"Une puce sous ta peau et un passeport : en France, chaque cheval est enregistré au fichier central des équidés (SIRE)."+FIC:"Une puce sous ta peau : 15 chiffres, qui commencent par le code du pays ("+code+")."+(pays==="France"&&c==="puce"?" En France, l'identification est obligatoire pour les chiens, les chats et les furets.":"")+FIC}}}
  if(c==="cites")return {a:"CITES",b:"LOT",c:digits(3,r),i:"Tu voyages avec un permis CITES, dans une caisse avec des dizaines d'autres. Ton espèce est protégée, son commerce est encadré, pas interdit."+FIC};
  if(c==="rien")return none("Personne ne t'a identifié : aucune loi ne l'exige pour ton espèce. Tu as un prix, pas un numéro.");
  if(c==="insecte")return none("Personne ne compte les insectes un par un. On les vend au kilo.");
  const n=digits(6,r);return {a:"N°",b:n.slice(0,3),c:n.slice(3),i:"Les règles d'identification varient selon les pays et les espèces."+FIC};
}
function idLine(t){return t.none?"Aucun numéro":[t.a,t.b,t.c].filter(Boolean).join(" ")}
function idHTML(t,cls){return `<span class="idt ${cls||""}"><b>${esc(idLine(t))}</b><button class="ib" type="button" aria-label="Que signifie ce numéro ?" aria-expanded="false" title="${esc(t.i)}">i</button><span class="itxt" hidden>${esc(t.i)}</span></span>`}
function bindInfo(root){(root||document).querySelectorAll(".ib").forEach(b=>{b.onclick=e=>{e.stopPropagation();const p=b.nextElementSibling;const open=p.hidden;p.hidden=!open;b.setAttribute("aria-expanded",open)}})}
