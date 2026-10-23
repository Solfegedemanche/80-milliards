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
const FIC=tr(" Le numéro est fictif, le format est réel."," The number is fictional; the format is real.");
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
  if(L.human)return {a:"ID",b:grp(S.tag.slice(0,6),3),c:S.tag.slice(6),i:tr("Ton badge d'entreprise.","Your company badge.")};
  const none=(txt)=>({a:"",b:tr("aucun","no"),c:tr("numéro","number"),i:txt,none:1});
  if(L.cat==="sauvage"||["anchois","thon","homard","poulpe","perroquet"].includes(k))
    return none(k==="perroquet"?tr("Personne ne t'a numéroté. Pour la loi, ta capture est illégale : tu n'existes pas.","No one gave you a number. In the eyes of the law, your capture is illegal: you don't exist."):tr("Personne ne t'a numéroté. Tu n'appartiens à personne.","No one gave you a number. You belong to no one."));
  if(k==="poussin")return none(tr("Tu n'as pas de numéro. Au couvoir, on compte les œufs et les poussins par milliers.","You have no number. At the hatchery, eggs and chicks are counted by the thousand."));
  if(k==="chat"||k==="errant")return none(k==="chat"?tr("Personne ne t'a fait identifier. En France, c'est pourtant obligatoire pour les chats avant l'âge de 7 mois.","No one had you identified. In France, though, it's mandatory for cats before the age of 7 months."):tr("Tu n'as pas de puce. Personne ne t'a déclaré.","You have no microchip. No one registered you."));
  if(k==="pondeuse"){if(cc)return {a:tr("ŒUF","EGG"),b:"3"+cc,c:letters(3,r)+digits(2,r),i:tr("Toi, tu n'as pas de numéro. Tes œufs en portent un : le mode d'élevage (3 = cage), le pays, puis le code de ton élevage.","You have no number. Your eggs do: the farming method (3 = cage), the country, then your farm's code.")+FIC};
    return {a:tr("LOT","BATCH"),b:"26",c:digits(4,r),i:tr("Tu n'as pas de numéro à toi. Les poules d'un même bâtiment sont suivies comme un seul lot.","You have no number of your own. Hens in the same building are tracked as a single batch.")+FIC}}
  if(c==="bovin"){
    if(pays==="France"){const d=(DEPTS[reg]||["35"]);const dp=d[Math.floor(r()*d.length)];const n=digits(8,r);return {a:"FR",b:dp+" "+n.slice(0,4),c:n.slice(4),i:tr("Boucle officielle, une à chaque oreille : FR, le département de ton élevage, puis ton numéro. Elle te suivra jusqu'à l'abattoir.","Official tag, one in each ear: FR, your farm's département, then your number. It will follow you to the slaughterhouse.")+FIC}}
    if(cc){const n=digits(12,r);return {a:cc,b:grp(n.slice(0,6),3),c:grp(n.slice(6),3),i:tr("Boucle officielle, une à chaque oreille, comme partout en Europe : le code du pays, puis ton numéro. Elle te suivra jusqu'à l'abattoir.","Official tag, one in each ear, as everywhere in Europe: the country code, then your number. It will follow you to the slaughterhouse.")+FIC}}
    if(pays==="États-Unis"){const n=digits(12,r);return {a:"840",b:grp(n.slice(0,6),3),c:grp(n.slice(6),3),i:tr("Boucle électronique officielle : 840 est le code des États-Unis, puis ton numéro.","Official electronic tag: 840 is the United States code, then your number.")+FIC}}
  }
  if(c==="ovin"&&cc){const n=digits(12,r);return {a:cc,b:grp(n.slice(0,6),3),c:grp(n.slice(6),3),i:tr("Boucle électronique officielle : dans l'Union européenne, chaque mouton et chaque chèvre est identifié individuellement.","Official electronic tag: in the European Union, every sheep and goat is individually identified.")+FIC}}
  if(c==="porc"&&pays==="France"){const d=(DEPTS[reg]||["35","22","29","56"]);const ind=d[Math.floor(r()*d.length)]+letters(3,r);
    return k==="truie"?{a:"FR",b:ind,c:digits(6,r),i:tr("Le code de ton élevage, suivi de ton numéro, tatoué sur ton oreille ou sur une boucle jaune : seuls les reproducteurs ont un numéro à eux.","Your farm's code, followed by your number, tattooed on your ear or on a yellow tag: only breeding animals have a number of their own.")+FIC}
      :{a:"FR",b:ind,c:"",i:tr("Tu n'as pas de numéro à toi. Avant le départ pour l'abattoir, on tatoue sur ton épaule le code de ton élevage.","You have no number of your own. Before you leave for the slaughterhouse, your farm's code is tattooed on your shoulder.")+FIC}}
  if(c==="porc")return {a:tr("LOT","BATCH"),b:"26",c:digits(4,r),i:tr("Tu n'as pas de numéro à toi : les porcs charcutiers sont suivis par élevage et par lot.","You have no number of your own: finishing pigs are tracked by farm and by batch.")+FIC};
  if(c==="lot")return {a:tr("LOT","BATCH"),b:"26",c:digits(4,r),i:tr("Tu n'as pas de numéro à toi. Tu es suivi comme partie d'un lot : tout le bâtiment porte le même numéro.","You have no number of your own. You're tracked as part of a batch: the whole building has the same number.")+FIC};
  if(c==="poisson")return {a:k==="saumon"?"CAGE":tr("BASSIN","POND"),b:digits(2,r),c:"",i:tr("Personne ne te compte. Les poissons d'élevage sont pesés en tonnes, pas comptés un par un.","No one counts you. Farmed fish are weighed in tonnes, not counted one by one.")};
  if(k==="vison")return {a:"CAGE",b:digits(4,r),c:"",i:tr("Ta cage porte un numéro. C'est tout ce qui te distingue des autres.","Your cage has a number. It's all that sets you apart from the others.")+FIC};
  if(c==="labo")return {a:"CAGE",b:letters(1,r)+"-"+digits(2,r),c:digits(4,r),i:tr("Ta cage porte une fiche : ton numéro, ta lignée, et le protocole qui t'attend.","Your cage has a card: your number, your line, and the protocol that awaits you.")+FIC};
  if(c==="labo2"){const n=digits(6,r);return {a:"N°",b:n.slice(0,3),c:n.slice(3),i:tr("Un numéro tatoué ou une puce te suit partout. Dans l'Union européenne, c'est obligatoire pour les chiens et les primates de laboratoire.","A tattooed number or a microchip follows you everywhere. In the European Union, it's mandatory for laboratory dogs and primates.")+FIC}}
  if(c==="puce"||c==="equide"){const code=ISON[pays];if(code){const n=digits(12,r);return {a:tr("PUCE","CHIP"),b:code+" "+n.slice(0,3),c:grp(n.slice(3),3),i:c==="equide"&&pays==="France"?tr("Une puce sous ta peau et un passeport : en France, chaque cheval est enregistré au fichier central des équidés (SIRE).","A microchip under your skin and a passport: in France, every horse is registered in the central equine database (SIRE).")+FIC:tr("Une puce sous ta peau : 15 chiffres, qui commencent par le code du pays (","A microchip under your skin: 15 digits, starting with the country code (")+code+")."+(pays==="France"&&c==="puce"?tr(" En France, l'identification est obligatoire pour les chiens, les chats et les furets."," In France, identification is mandatory for dogs, cats and ferrets."):"")+FIC}}}
  if(c==="cites")return {a:"CITES",b:"LOT",c:digits(3,r),i:tr("Tu voyages avec un permis CITES, dans une caisse avec des dizaines d'autres. Ton espèce est protégée, son commerce est encadré, pas interdit.","You travel with a CITES permit, in a crate with dozens of others. Your species is protected; its trade is regulated, not banned.")+FIC};
  if(c==="rien")return none(tr("Personne ne t'a identifié : aucune loi ne l'exige pour ton espèce. Tu as un prix, pas un numéro.","No one identified you: no law requires it for your species. You have a price, not a number."));
  if(c==="insecte")return none(tr("Personne ne compte les insectes un par un. On les vend au kilo.","No one counts insects one by one. They're sold by the kilo."));
  const n=digits(6,r);return {a:"N°",b:n.slice(0,3),c:n.slice(3),i:tr("Les règles d'identification varient selon les pays et les espèces.","Identification rules vary by country and species.")+FIC};
}
function idLine(t){return t.none?tr("Aucun numéro","No number"):[t.a,t.b,t.c].filter(Boolean).join(" ")}
function idHTML(t,cls){return `<span class="idt ${cls||""}"><b>${esc(idLine(t))}</b><button class="ib" type="button" aria-label="${tr("Que signifie ce numéro ?","What does this number mean?")}" aria-expanded="false" title="${esc(t.i)}">i</button><span class="itxt" hidden>${esc(t.i)}</span></span>`}
function bindInfo(root){(root||document).querySelectorAll(".ib").forEach(b=>{b.onclick=e=>{e.stopPropagation();const p=b.nextElementSibling;const open=p.hidden;p.hidden=!open;b.setAttribute("aria-expanded",open)}})}
