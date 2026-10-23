/* ===== ANIMAUX DOMESTIQUES, NAC ET EXOTIQUES ===== */
L("hamster",{nom:"Hamster doré",cat:"nac",poids:10,sym:1,sprite:"hamster",sc:{bg:"animalerie",n:4,who:"hamster"},
 lieux:["France, Lille","France, Bordeaux","Belgique","Allemagne"],cond:"Né dans un élevage pour animalerie",
 nat:1000,natTxt:"Un hamster doré vit 2 à 3 ans.",note:"Le hamster est souvent le premier animal offert à un enfant. C'est un animal nocturne et solitaire, souvent mal compris.",
 ev:[
 {d:1,sc:{bg:"animalerie",n:6,who:"hamster"},x:"Tu nais dans un élevage qui fournit des animaleries. À quatre semaines, on te met dans une vitrine avec d'autres hamsters.",
  hu:"L'éleveur — produit des hamsters en série pour les animaleries.",f:"Le hamster doré est solitaire : deux adultes dans la même cage finissent souvent par se battre.",
  c:[{l:"Te cacher dans la sciure",r:"Les enfants tapent contre la vitre.",p:1},{l:"Te battre avec ton voisin",r:"Tu as une petite morsure à l'oreille.",s:-1}]},
 {d:45,sc:{bg:"maison",n:0},x:"Une famille t'achète pour l'anniversaire d'une petite fille. On t'installe dans une petite cage en plastique, avec une roue.",
  hu:"Le vendeur — a conseillé la cage la moins chère. La famille l'a crue suffisante.",f:"Les associations recommandent une cage d'au moins 100 cm × 50 cm au sol pour un hamster doré. Beaucoup de cages vendues sont bien plus petites.",
  c:[{l:"Courir dans la roue",r:"Tu cours toute la nuit. La roue grince. On la met dans le couloir.",p:-1},{l:"Ronger les barreaux",r:"Tu ronges des heures. Ça fait du bruit. On te gronde.",p:1}]},
 {d:120,sc:{bg:"maison",n:0},x:"Le jour, on te réveille pour jouer. Tu dors, toi, le jour.",
  hu:"L'enfant — veut jouer quand elle rentre de l'école. Personne ne lui a expliqué.",f:"Le hamster est nocturne. Le réveiller en journée est une source de stress importante.",
  c:[{l:"Mordre le doigt",r:"L'enfant pleure. On te touche moins.",p:1},{l:"Te laisser faire",r:"Tu trembles dans sa main.",p:2}]},
 {d:400,sc:{bg:"maison",n:0},x:"L'enfant ne vient plus te voir. Ta litière n'est plus changée qu'une fois par mois.",
  hu:"Les parents — avaient pensé que l'enfant s'en occuperait.",f:"Les petits rongeurs sont parmi les animaux de compagnie les plus abandonnés ou négligés après l'achat.",
  c:[{l:"Creuser",r:"Tu creuses dans la sciure sale.",s:-1},{l:"Dormir",r:"Tu dors presque tout le temps.",s:-1}]},
 {d:820,end:1,sc:{bg:"maison",n:0},x:"Un matin, on te trouve immobile dans ton nid.",
  hu:"La famille — t'enterre dans le jardin. L'enfant demande un autre hamster.",f:"Un hamster vit en moyenne 2 à 3 ans."}
 ]});

L("cobaye",{nom:"Cochon d'Inde",cat:"nac",poids:6,sym:1,sprite:"cobaye",sc:{bg:"maison",n:1,who:"cobaye"},
 lieux:["France, Nantes","Pérou, Cuzco","Pérou, Arequipa","Équateur"],cond:"Animal de compagnie ou d'élevage",
 nat:2500,natTxt:"Un cochon d'Inde vit 5 à 8 ans.",note:"Au Pérou, le cochon d'Inde, appelé cuy, est élevé pour sa viande depuis des milliers d'années. En Europe, c'est un animal de compagnie.",
 ev:[
 {d:1,x:"Tu nais les yeux ouverts, déjà couvert de poils. Tu peux courir quelques heures après ta naissance.",
  hu:null,f:"Le cochon d'Inde naît très développé, après une gestation d'environ deux mois.",
  c:[{l:"Couiner",r:"Ta mère te répond par un petit sifflement.",p:-1},{l:"Explorer",r:"Tu trouves déjà le foin.",s:1}]},
 {d:60,when:S=>S.lieu.startsWith("France"),sc:{bg:"maison",n:0},x:"Une famille t'adopte. Seul. On t'installe dans une cage, sur une commode.",
  hu:"La famille — n'a pris qu'un cochon d'Inde. Personne ne lui a dit qu'il en faut deux.",f:"Le cochon d'Inde est un animal social. En Suisse, la loi interdit d'en garder un seul.",
  c:[{l:"Siffler quand la porte s'ouvre",r:"On t'apporte une feuille de salade. Tu siffles chaque fois.",p:-1},{l:"Rester dans ta maisonnette",r:"Tu passes des heures seul.",p:2}]},
 {d:300,when:S=>S.lieu.startsWith("France"),sc:{bg:"maison",n:0},x:"Tu as les dents trop longues et du mal à manger. Tu manques de vitamine C.",
  hu:"La famille — te donne des granulés bon marché et peu de foin.",f:"Comme l'humain, le cochon d'Inde ne fabrique pas de vitamine C. Il doit la trouver dans son alimentation.",
  c:[{l:"Manger le poivron qu'on te tend",r:"On a lu un article. Ça va mieux.",s:2},{l:"Refuser de manger",r:"On t'emmène chez le vétérinaire.",s:-1}]},
 {d:2200,when:S=>S.lieu.startsWith("France"),end:1,x:"Tu as vécu six ans. Les dernières années, on t'a trouvé un compagnon.",
  hu:"La famille — a appris en chemin.",f:"Un cochon d'Inde bien soigné vit 5 à 8 ans."},
 {d:60,when:S=>!S.lieu.startsWith("France"),sc:{bg:"cuisine",n:6,who:"cobaye"},x:"Tu vis par dizaines dans la cuisine d'une famille, au chaud près du feu, comme le veut la tradition andine.",
  hu:"La famille — élève des cuys comme ses ancêtres, pour les fêtes.",f:"Les Péruviens consommeraient des dizaines de millions de cochons d'Inde chaque année.",
  c:[{l:"Courir sous les meubles",r:"Les enfants rient et te nourrissent de luzerne.",p:-1},{l:"Rester près du feu",r:"Il fait chaud.",s:1}]},
 {d:120,when:S=>!S.lieu.startsWith("France"),end:1,sc:{bg:"cuisine",n:3,who:"cobaye"},x:"C'est la fête du village.",
  hu:"La famille — cuisine le cuy pour le grand repas.",f:"Le cuy est un plat de fête au Pérou. Une peinture de la cathédrale de Cuzco représente la Cène avec un cochon d'Inde."}
 ]});

L("lapinnain",{nom:"Lapin nain",cat:"nac",poids:8,sym:1,sprite:"lapinnain",sc:{bg:"maison",n:0},
 lieux:["France, Toulouse","France, Rennes","Belgique","Suisse"],cond:"Acheté en animalerie",
 nat:3650,natTxt:"Un lapin nain vit 8 à 12 ans.",note:"Le lapin est l'un des animaux de compagnie les plus abandonnés, notamment après Pâques.",
 ev:[
 {d:56,sc:{bg:"animalerie",n:5,who:"lapinnain"},x:"On t'a sevré trop tôt. Tu es dans une vitrine, avec une étiquette : « Lapin nain, 39 € ».",
  hu:"L'animalerie — vend des lapins avant Pâques. Les ventes montent à cette période.",f:"Beaucoup de « lapins nains » vendus en animalerie ne restent pas nains.",
  c:[{l:"Te serrer contre les autres",r:"Vous êtes cinq à trembler.",p:1},{l:"Te dresser sur tes pattes",r:"Un enfant crie : « Celui-là ! »",p:-1}]},
 {d:100,x:"On t'a installé dans un clapier, sur un balcon. Tu ne peux pas faire trois bonds.",
  hu:"La famille — a acheté le clapier vendu avec le lapin.",f:"Un lapin a besoin de pouvoir faire plusieurs bonds et se dresser. Un clapier standard ne le permet pas.",
  c:[{l:"Tourner en rond",r:"Tu tournes. Tu ronges les barreaux.",p:2},{l:"Te coucher",r:"Tu dors en boule.",s:-1}]},
 {d:400,x:"Tu as grandi. Tu pèses trois kilos. La famille dit que tu n'es « pas vraiment nain ».",
  hu:"La famille — hésite à te garder.",f:"Selon les refuges, une grande partie des lapins abandonnés le sont dans la première année.",
  c:[{l:"Faire des sauts de joie",r:"Tu fais un « binky ». Ils rient. Ils te gardent encore un peu.",p:-1,luck:{p:.5,f:"garde",yes:"Ils te gardent.",no:"Ils appellent un refuge."}},{l:"Mordre quand on te soulève",r:"On te soulève de moins en moins.",p:1}]},
 {d:500,when:S=>!S.f.garde,sc:{bg:"refuge",n:3,who:"lapinnain"},x:"Tu es au refuge, avec trente autres lapins.",
  hu:"La famille — t'a déposé au refuge.",f:"Les refuges pour lapins sont souvent saturés.",
  c:[{l:"Attendre",r:"",luck:{p:.4,f:"adopt",yes:"Une famille t'adopte avec une compagne et un enclos.",no:"Les mois passent."}}]},
 {d:3300,end:1,x:"Tu as vécu ta vie de lapin. Plus ou moins longtemps, plus ou moins à l'étroit.",
  hu:"Les humains — ont décidé de l'espace que tu aurais.",f:"Un lapin de compagnie bien soigné vit 8 à 12 ans."}
 ]});

L("perruche",{nom:"Perruche ondulée",cat:"nac",poids:8,sym:1,sprite:"perruche",sc:{bg:"maison",n:0},
 lieux:["France, Lyon","Belgique, Liège","Pays-Bas","Royaume-Uni"],cond:"Oiseau de cage",
 nat:3650,natTxt:"Une perruche ondulée peut vivre 10 ans, parfois plus.",note:"À l'état sauvage, en Australie, les perruches ondulées volent en bandes de milliers d'oiseaux.",
 ev:[
 {d:40,sc:{bg:"animalerie",n:6,who:"perruche"},x:"Tu nais chez un éleveur amateur. À six semaines, tu pars en animalerie, dans une volière pleine d'oiseaux.",
  hu:"L'éleveur — vend les jeunes à l'animalerie.",f:"Les perruches ondulées sauvages vivent en bandes immenses dans l'intérieur de l'Australie.",
  c:[{l:"Voler d'un perchoir à l'autre",r:"Tu voles deux mètres, puis le grillage.",p:-1},{l:"Rester serrée contre les autres",r:"Vous gazouillez ensemble.",p:-1}]},
 {d:60,x:"Une personne t'achète, seule, pour une petite cage ronde.",
  hu:"L'acheteuse — a choisi une cage décorative. Le vendeur ne l'a pas contredite.",f:"Les cages rondes sont déconseillées : un oiseau a besoin de coins et d'espace pour voler.",
  c:[{l:"Parler à ton reflet dans le miroir",r:"Ton reflet te répond toujours.",p:-1},{l:"T'arracher des plumes",r:"Tu t'ennuies.",s:-1,p:1}]},
 {d:900,x:"Un été, la fenêtre est ouverte et la porte de la cage aussi.",
  hu:"La propriétaire — a oublié de fermer.",f:"Une perruche échappée survit rarement longtemps en Europe.",
  c:[{l:"T'envoler",r:"",risk:{p:.6,t:"Le ciel est immense. Un épervier aussi."}},{l:"Rester",r:"Elle referme la fenêtre en tremblant."}]},
 {d:3000,end:1,x:"Tu as vécu huit ans dans ta cage. Tu sifflais l'indicatif du journal télévisé.",
  hu:"La propriétaire — t'a parlé chaque matin.",f:"Les perruches peuvent apprendre des dizaines de mots et de sons."}
 ]});

L("perroquet",{nom:"Perroquet gris du Gabon",cat:"nac",poids:.1,sym:1,sprite:"perroquet",sc:{bg:"jungle",n:3,who:"perroquet"},
 lieux:["Cameroun","République démocratique du Congo","Gabon"],cond:"Capturé dans la nature",
 nat:18000,natTxt:"Un perroquet gris peut vivre 40 à 60 ans.",note:"Le commerce international du perroquet gris du Gabon est interdit depuis 2017. Le trafic continue.",
 ev:[
 {d:1,x:"Tu nais dans un trou d'arbre, au fond de la forêt. Tes parents forment un couple pour la vie.",
  hu:null,f:"Les perroquets gris forment des couples durables et vivent en grands groupes.",
  c:[{l:"Réclamer à manger",r:"Ta mère régurgite des graines.",s:1},{l:"Dormir",r:"Ton père garde l'entrée du nid."}]},
 {d:150,sc:{bg:"jungle",n:0,extra:"humain"},x:"Un homme grimpe à l'arbre. Il te glisse dans un sac.",
  hu:"Un trappeur — gagne en une semaine ce qu'il gagne en un mois. Un acheteur, en Europe ou au Moyen-Orient, paiera dix fois plus.",f:"Selon les estimations, une grande partie des perroquets capturés meurent avant d'arriver à destination.",
  c:[{l:"Crier",r:"Tes parents crient aussi, de l'arbre.",p:3},{l:"Te taire",r:"Le sac est noir.",p:2}]},
 {d:160,sc:{bg:"camion",n:10,who:"perroquet"},x:"Tu voyages avec des dizaines d'autres, serrés dans un tube en plastique.",
  hu:"Le trafiquant — cache les oiseaux dans des bagages ou des caisses.",f:"Le perroquet gris est inscrit à l'annexe I de la CITES depuis 2017.",
  c:[{l:"Tenir",r:"",risk:{p:.4,t:"Tu ne survis pas au voyage."},s:-2},{l:"Picorer le plastique",r:"Rien ne cède.",p:2,risk:{p:.4,t:"Tu ne survis pas au voyage."}}]},
 {d:400,sc:{bg:"maison",n:0},x:"Tu vis dans un salon. Tu imites la sonnerie du téléphone et la voix de ton propriétaire.",
  hu:"Le propriétaire — t'a acheté avec de faux papiers, sans le savoir. Ou sans vouloir savoir.",f:"Le perroquet Alex, étudié par Irene Pepperberg, connaissait plus de 100 mots et comprenait des notions de forme et de couleur.",
  c:[{l:"Parler",r:"Il rit. Il te répond.",p:-1},{l:"T'arracher les plumes",r:"Tu t'ennuies seul toute la journée.",s:-2,p:2}]},
 {d:12000,end:1,sc:{bg:"maison",n:0},x:"Ton propriétaire est mort. Tu changes de maison, pour la troisième fois.",
  hu:"Les héritiers — ne savent pas quoi faire de toi.",f:"Un perroquet vit si longtemps qu'il change souvent plusieurs fois de propriétaire."}
 ]});

L("python",{nom:"Python royal",cat:"nac",poids:.3,sym:1,sprite:"python",sc:{bg:"terrarium",n:0},
 lieux:["Ghana","Togo","Bénin"],cond:"Élevé en ferme pour l'export",
 nat:9000,natTxt:"Un python royal peut vivre 20 à 30 ans.",note:"Le Ghana, le Togo et le Bénin exportent chaque année des dizaines de milliers de pythons royaux vers l'Europe et les États-Unis.",
 ev:[
 {d:1,sc:{bg:"savane",n:0},x:"Tu éclos dans une ferme. Ta mère a été capturée dans la nature, pleine d'œufs, puis relâchée.",
  hu:"Le collecteur — ramasse les femelles gravides. C'est ce qu'on appelle le « ranching ».",f:"Le ranching permet de vendre des animaux nés en captivité à partir de femelles sauvages.",
  c:[{l:"Siffler",r:"Personne ne t'entend."},{l:"Te cacher",r:"Il y a des centaines d'autres serpents dans les bacs."}]},
 {d:30,sc:{bg:"camion",n:20,who:"python"},x:"On te met dans un sac en tissu, puis dans une caisse, puis dans un avion.",
  hu:"L'exportateur — expédie des centaines de serpents par caisse.",f:"Le transport d'animaux vivants est encadré, mais les conditions varient beaucoup.",
  c:[{l:"T'enrouler",r:"Il fait froid dans la soute.",s:-1},{l:"Chercher une sortie",r:"Le tissu est solide.",p:1}]},
 {d:60,x:"Tu es dans un terrarium, chez un particulier. Une lampe chauffante. Une souris morte une fois par semaine.",
  hu:"Le propriétaire — t'a acheté sur un salon, pour 60 €.",f:"Le python royal est l'un des serpents les plus vendus au monde.",
  c:[{l:"Manger",r:"Tu manges. Tu digères une semaine.",s:1},{l:"Refuser de manger",r:"Les pythons royaux peuvent jeûner des mois. Ton propriétaire s'inquiète.",s:-1}]},
 {d:2000,x:"Tu mesures 1,40 mètre. Ton propriétaire déménage.",
  hu:"Le propriétaire — n'avait pas prévu que tu vivrais trente ans.",f:"Les refuges pour reptiles reçoivent de nombreux serpents abandonnés.",
  c:[{l:"Rester dans ta cachette",r:"",luck:{p:.5,f:"garde",yes:"Il t'emmène.",no:"Il te dépose dans un refuge pour reptiles."}}]},
 {d:8000,end:1,x:"Tu as vécu longtemps, dans une boîte de verre d'un mètre.",
  hu:"Tes propriétaires successifs — ont décidé de ta température, de ta lumière et de tes repas.",f:"Un python royal peut vivre plus de 30 ans en captivité."}
 ]});

L("tortueterre",{nom:"Tortue d'Hermann",cat:"nac",poids:.5,sym:1,sprite:"tortueterre",sc:{bg:"jardin",n:0,night:0},
 lieux:["France, Var","Italie","Espagne","Slovénie"],cond:"Espèce protégée",
 nat:22000,natTxt:"Une tortue d'Hermann peut vivre plus de 60 ans.",note:"La tortue d'Hermann est protégée en France. Sa détention exige une autorisation et un marquage.",
 ev:[
 {d:1,sc:{bg:"dehesa",n:0},x:"Tu éclos dans le maquis, sous le soleil de septembre. Tu tiens dans une main d'enfant.",
  hu:null,f:"En France, la tortue d'Hermann ne survit plus à l'état sauvage que dans le Var et en Corse.",
  c:[{l:"Te cacher sous une souche",r:"Tu restes immobile des jours.",p:-1},{l:"Chercher à manger",r:"Tu trouves des feuilles de pissenlit.",s:1}]},
 {d:400,sc:{bg:"dehesa",n:0,extra:"humain"},x:"Un randonneur te trouve sur le chemin. Il te ramène chez lui pour ses enfants.",
  hu:"Le randonneur — pense te sauver. Il t'enlève de ta forêt.",f:"Le ramassage des tortues par les promeneurs est l'une des causes du déclin de l'espèce.",
  c:[{l:"Rentrer dans ta carapace",r:"Il te met dans une boîte à chaussures.",p:3},{l:"Te débattre",r:"Tes pattes brassent l'air.",p:2}]},
 {d:3000,sc:{bg:"jardin",n:0,night:0},x:"Tu vis dans un jardin. Chaque hiver, on te met dans un carton au garage pour hiberner.",
  hu:"La famille — a appris à te soigner, sans papiers ni autorisation.",f:"L'hibernation est vitale pour les tortues terrestres méditerranéennes.",
  c:[{l:"Hiberner",r:"Tu dors quatre mois.",s:1},{l:"Rester éveillée",r:"Tu t'affaiblis.",s:-2}]},
 {d:12000,x:"Les enfants sont partis. Les parents vieillissent. Tu es toujours là.",
  hu:"La famille — se demande qui te gardera.",f:"Une tortue terrestre survit souvent à ses premiers propriétaires.",
  c:[{l:"Manger tes feuilles",r:"Tu manges. Le temps passe autrement pour toi."}]},
 {d:20000,end:1,x:"Tu as connu trois générations de la même famille.",
  hu:"La famille — t'a gardée toute ta vie, loin de ta forêt.",f:"Des centres de soins, comme le Village des tortues dans le Var, recueillent les tortues trouvées ou cédées."}
 ]});

L("iguane",{nom:"Iguane vert",cat:"nac",poids:.3,sym:1,sprite:"iguane",sc:{bg:"terrarium",n:0},
 lieux:["Salvador","Colombie","Floride"],cond:"Né en ferme d'élevage",
 nat:6500,natTxt:"Un iguane vert peut vivre 15 à 20 ans.",note:"Les iguanes verts achetés petits atteignent souvent 1,5 mètre. Beaucoup sont abandonnés.",
 ev:[
 {d:1,sc:{bg:"jungle",n:6,who:"iguane"},x:"Tu éclos dans une ferme d'Amérique centrale, parmi des milliers d'autres iguanes destinés à l'export.",
  hu:"Le producteur — élève des iguanes pour les animaleries du monde entier.",f:"Les iguanes verts sont parmi les reptiles les plus exportés.",
  c:[{l:"Grimper",r:"Tu grimpes sur tes frères.",p:-1},{l:"Te figer",r:"Tu restes immobile, comme les autres."}]},
 {d:90,x:"Tu es dans un petit terrarium, dans un appartement. Tu mesures 25 centimètres.",
  hu:"Le vendeur — a dit que tu resterais petit si on te gardait dans un petit terrarium.",f:"Un petit terrarium n'empêche pas un iguane de grandir. Il le rend malade.",
  c:[{l:"Te chauffer sous la lampe",r:"Il n'y a pas d'UV. Tes os se fragilisent.",s:-1},{l:"Grimper sur la branche",r:"Elle est trop petite.",p:1}]},
 {d:1500,x:"Tu mesures 1,30 mètre. Tu fouettes de la queue quand on t'approche.",
  hu:"Le propriétaire — ne sait plus quoi faire de toi.",f:"En Floride, des iguanes relâchés sont devenus une espèce invasive. Par grand froid, ils tombent des arbres, engourdis.",
  c:[{l:"Fouetter",r:"",luck:{p:.4,f:"refuge",yes:"Il appelle un refuge.",no:"Il te relâche dans un parc."}},{l:"Rester immobile",r:"",luck:{p:.6,f:"refuge",yes:"Il appelle un refuge.",no:"Il te relâche dans un parc."}}]},
 {d:6000,end:1,x:"Tu as vécu ce qui te restait à vivre, dans un refuge ou dehors.",
  hu:"Les humains — t'ont fait naître, acheter, grandir, puis céder.",f:"Les refuges pour reptiles sont saturés en Europe."}
 ]});

L("furet",{nom:"Furet",cat:"nac",poids:1,sym:1,sprite:"furet",sc:{bg:"maison",n:0},
 lieux:["France, Paris","États-Unis","Royaume-Uni"],cond:"Né dans un élevage",
 nat:3000,natTxt:"Un furet vit 6 à 10 ans.",note:"Le furet est domestiqué depuis plus de 2 000 ans, à l'origine pour chasser les lapins.",
 ev:[
 {d:50,sc:{bg:"animalerie",n:4,who:"furet"},x:"Aux États-Unis, une grande ferme produit des furets par milliers. On t'a stérilisé et on t'a retiré les glandes à odeur à quelques semaines.",
  hu:"La ferme — stérilise tous les furets avant la vente.",f:"La stérilisation très précoce des furets est associée à des maladies hormonales plus tard.",
  c:[{l:"Jouer avec les autres",r:"Vous faites la « danse de guerre ».",p:-2},{l:"Dormir",r:"Un furet dort 14 à 18 heures par jour."}]},
 {d:200,x:"Ta famille te laisse courir dans l'appartement. Tu voles des chaussettes et tu les caches sous le canapé.",
  hu:"La famille — a sécurisé l'appartement.",f:"Le furet est un animal joueur et curieux.",
  c:[{l:"Voler une chaussette",r:"Ton trésor grossit sous le canapé.",p:-2},{l:"Dormir dans le tiroir",r:"On te cherche partout.",p:-1}]},
 {d:1800,x:"Tes poils tombent. Tu as une maladie des glandes surrénales.",
  hu:"Le vétérinaire — propose un implant hormonal.",f:"La maladie des surrénales est fréquente chez les furets stérilisés jeunes.",
  c:[{l:"Te laisser soigner",r:"Tes poils repoussent.",s:1},{l:"Te cacher",r:"Tu dors encore plus.",s:-1}]},
 {d:2800,end:1,x:"Tu as vécu huit ans.",
  hu:"La famille — t'a gardé jusqu'au bout.",f:"Un furet vit en moyenne 6 à 10 ans."}
 ]});

L("chinchilla",{nom:"Chinchilla",cat:"nac",poids:2,sym:1,sprite:"chinchilla",sc:{bg:"cage",n:3,who:"chinchilla"},
 lieux:["Hongrie","Argentine","Roumanie","France, Lyon"],cond:"Élevage",
 nat:5500,natTxt:"Un chinchilla peut vivre 15 à 20 ans.",note:"Le chinchilla sauvage est en danger d'extinction au Chili. Il a presque disparu à cause du commerce de sa fourrure.",
 ev:[
 {d:1,x:"Tu nais dans un élevage, dans une cage grillagée. Ton pelage est l'un des plus denses du règne animal.",
  hu:"L'éleveur — élève des chinchillas pour la fourrure ou pour les animaleries.",f:"Le chinchilla possède jusqu'à 60 poils par follicule.",
  c:[{l:"Prendre un bain de sable",r:"Tu te roules dans le sable. C'est ainsi que tu te laves.",p:-2},{l:"Rester contre ta mère",r:"Elle te garde au chaud.",p:-1}]},
 {d:240,when:S=>S.lieu!=="France, Lyon",x:"Ta fourrure est prête.",
  hu:"L'éleveur — vend les peaux. Il en faut une centaine pour un manteau.",f:"L'élevage de chinchillas pour la fourrure existe encore en Europe de l'Est et en Amérique du Sud.",
  c:[{l:"Sauter contre le grillage",r:"On t'attrape par la queue.",p:3,fin:1},{l:"Te figer",r:"On t'attrape.",p:2,fin:1}]},
 {d:240,when:S=>S.lieu==="France, Lyon",sc:{bg:"maison",n:0},x:"Une famille t'achète. Tu dors le jour et tu sautes partout la nuit.",
  hu:"La famille — t'a pris pour sa douceur.",f:"Le chinchilla est nocturne et supporte mal la chaleur au-delà de 25 °C.",
  c:[{l:"Sauter partout",r:"Tu réveilles toute la maison.",p:-1},{l:"Te laisser caresser",r:"Tu n'aimes pas trop ça.",p:1}]},
 {d:4500,when:S=>S.lieu==="France, Lyon",end:1,sc:{bg:"maison",n:0},x:"Tu as vécu douze ans.",
  hu:"La famille — a appris à te laisser tranquille la journée.",f:"Un chinchilla bien soigné peut dépasser 15 ans."}
 ]});

L("poissonclown",{nom:"Poisson-clown",cat:"nac",poids:1.5,sym:1,sprite:"poissonclown",sc:{bg:"recif",n:4,who:"poissonclown"},
 lieux:["Indonésie","Philippines","Sri Lanka"],cond:"Sauvage, puis aquarium",
 nat:3650,natTxt:"Un poisson-clown peut vivre plus de 10 ans.",note:"Plus de 90 % des poissons marins d'aquarium sont capturés dans la nature.",
 ev:[
 {d:30,x:"Tu vis dans une anémone, sur un récif. Ses tentacules te protègent. Tu les nettoies.",
  hu:null,f:"Le poisson-clown vit en symbiose avec une anémone de mer.",
  c:[{l:"Rester dans l'anémone",r:"Les prédateurs passent sans entrer.",p:-1},{l:"Explorer le récif",r:"Le récif est blanchi par endroits.",p:1}]},
 {d:300,x:"Un plongeur vaporise un liquide dans ton anémone. Tu es étourdi. Il te ramasse.",
  hu:"Le pêcheur — utilise du cyanure pour étourdir les poissons. C'est illégal, et courant.",f:"La pêche au cyanure est utilisée pour capturer des poissons d'aquarium en Indonésie et aux Philippines. Elle tue aussi le corail.",
  c:[{l:"Nager",r:"Tu ne peux plus.",s:-2},{l:"Te laisser couler",r:"Une main te prend.",s:-2}]},
 {d:320,sc:{bg:"vivier",n:20,who:"poissonclown"},x:"Sachet en plastique, avion, grossiste, animalerie.",
  hu:"Le grossiste — achète par milliers. Il prévoit des pertes.",f:"Après le film Le Monde de Nemo, la demande de poissons-clowns a fortement augmenté.",
  c:[{l:"Tenir",r:"",s:-1,risk:{p:.3,t:"Le voyage est trop long."}}]},
 {d:400,sc:{bg:"aquarium",n:0},x:"Tu nages dans un aquarium de salon. Il n'y a pas d'anémone.",
  hu:"La famille — voulait « Nemo ».",f:"Des poissons-clowns sont aujourd'hui élevés en captivité, ce qui évite la capture.",
  c:[{l:"Nager le long de la vitre",r:"Tu nages des allers-retours.",p:1},{l:"Te cacher derrière la pompe",r:"C'est ton anémone, maintenant.",p:-1}]},
 {d:1200,end:1,sc:{bg:"aquarium",n:0},x:"Tu as vécu trois ans dans le salon.",
  hu:"La famille — a appris à entretenir l'eau. Pas assez.",f:"Un poisson-clown peut vivre beaucoup plus longtemps dans de bonnes conditions."}
 ]});

L("betta",{nom:"Combattant",cat:"nac",poids:10,sym:1,sprite:"betta",sc:{bg:"aquarium",n:0},
 lieux:["Thaïlande","France, Marseille","États-Unis"],cond:"Vendu en gobelet",
 nat:1800,natTxt:"Un combattant peut vivre 3 à 5 ans.",note:"Le combattant est souvent vendu dans un gobelet de quelques centilitres.",
 ev:[
 {d:90,sc:{bg:"bassin",n:6,who:"betta"},x:"Tu nais dans une ferme de Thaïlande. On sélectionne tes nageoires, tes couleurs. Tu es un mâle.",
  hu:"L'éleveur — sélectionne les couleurs que les clients préfèrent.",f:"Les combattants sont élevés par millions en Thaïlande pour l'export.",
  c:[{l:"Déployer tes nageoires",r:"Tu es sélectionné.",p:-1},{l:"Rester au fond",r:"Tu es sélectionné quand même."}]},
 {d:120,sc:{bg:"animalerie",n:0},x:"Tu es dans un gobelet en plastique sur une étagère. On t'isole : deux mâles se battraient.",
  hu:"L'animalerie — empile les gobelets. C'est moins cher qu'un aquarium par poisson.",f:"Le combattant respire de l'air en surface grâce à un organe appelé labyrinthe. C'est ce qui lui permet de survivre dans un gobelet.",
  c:[{l:"Remonter respirer",r:"Tu tiens.",s:-1},{l:"Regarder le gobelet voisin",r:"Un autre mâle. Vous vous gonflez l'un contre l'autre.",p:2}]},
 {d:130,x:"On te met dans un vase, sur le bureau d'un open space.",
  hu:"L'acheteur — voulait un poisson décoratif.",f:"Un combattant a besoin d'un aquarium chauffé d'au moins 20 litres.",
  c:[{l:"Construire un nid de bulles",r:"Tu fais des bulles en surface. Il n'y a pas de femelle.",p:-1},{l:"Rester immobile",r:"L'eau est froide.",s:-1}]},
 {d:600,end:1,x:"Le week-end prolongé a été trop long.",
  hu:"L'open space — était vide quatre jours.",f:"Beaucoup de combattants meurent en quelques mois au lieu de vivre plusieurs années."}
 ]});

L("axolotl",{nom:"Axolotl",cat:"nac",poids:.5,sym:1,sprite:"axolotl",sc:{bg:"aquarium",n:0},
 lieux:["Mexique, Xochimilco","France, Paris","Japon"],cond:"Né en captivité",
 nat:5000,natTxt:"Un axolotl peut vivre 10 à 15 ans.",note:"L'axolotl est en danger critique d'extinction dans la nature, et très répandu en aquarium.",
 ev:[
 {d:30,sc:{bg:"etang",n:6,who:"axolotl"},x:"Tu éclos dans un élevage. Ton espèce ne vit plus, à l'état sauvage, que dans les canaux de Xochimilco, au Mexique.",
  hu:"La ville de Mexico — a asséché et pollué les lacs où vivait ton espèce.",f:"Il resterait très peu d'axolotls sauvages par kilomètre carré à Xochimilco.",
  c:[{l:"Manger",r:"Tu grandis vite.",s:1},{l:"Te cacher",r:"Tu restes sous une plante."}]},
 {d:200,x:"Une vidéo d'axolotl qui « sourit » fait des millions de vues. On t'achète.",
  hu:"Le client — a vu une vidéo. Il t'achète le lendemain.",f:"La popularité des axolotls sur les réseaux sociaux et dans les jeux vidéo a fait monter les ventes.",
  c:[{l:"Sourire",r:"Tu ne souris pas. Ta bouche est faite comme ça."},{l:"Rester au fond",r:"On te prend en photo."}]},
 {d:500,x:"L'aquarium est trop chaud. Tes branchies rapetissent.",
  hu:"Le propriétaire — n'a pas installé de refroidissement.",f:"L'axolotl vit dans une eau fraîche, idéalement sous 20 °C.",
  c:[{l:"Rester immobile au fond",r:"Il fait un peu plus frais.",s:-1},{l:"Remonter",r:"L'eau est plus chaude.",s:-2}]},
 {d:3500,end:1,x:"Tu as perdu une patte un jour. Elle a repoussé.",
  hu:"Les chercheurs — étudient ta régénération pour la médecine humaine.",f:"L'axolotl peut régénérer ses membres, et même une partie de son cœur et de son cerveau."}
 ]});

L("tigre",{nom:"Tigre captif",cat:"nac",poids:.01,sym:1,sprite:"tigre",sc:{bg:"enclos",n:0},
 lieux:["États-Unis, Oklahoma","États-Unis, Texas","Thaïlande"],cond:"Né chez un particulier",
 nat:8000,natTxt:"Un tigre peut vivre 20 ans en captivité.",note:"On estime souvent qu'il y a plus de tigres en captivité aux États-Unis que de tigres sauvages dans le monde.",
 ev:[
 {d:10,sc:{bg:"maison",n:0},x:"Tu nais dans un parc privé. On te retire à ta mère au bout de quelques jours.",
  hu:"Le propriétaire — fait payer les visiteurs pour te caresser et te donner le biberon.",f:"En 2022, le Big Cat Public Safety Act a interdit aux États-Unis les nouvelles détentions privées de grands félins et les séances de caresses de petits.",
  c:[{l:"Téter le biberon",r:"Des dizaines de mains te passent dessus chaque jour.",p:2},{l:"Dormir",r:"On te réveille pour la photo suivante.",p:2}]},
 {d:150,x:"Tu as quatre mois. Tu es trop gros pour les photos.",
  hu:"Le propriétaire — a déjà une nouvelle portée pour les visiteurs.",f:"Les petits utilisés pour les photos sont souvent revendus ou gardés dans des enclos exigus une fois grands.",
  c:[{l:"Jouer avec les autres",r:"Vous vous battez pour rire.",p:-1},{l:"Arpenter la grille",r:"Un aller. Un retour.",p:2}]},
 {d:1500,x:"Tu vis dans un enclos de béton et de grillage. Tu fais les cent pas le long de la clôture.",
  hu:"Le propriétaire — a construit l'enclos le moins cher possible.",f:"Il resterait environ 5 500 tigres sauvages dans le monde.",
  c:[{l:"Faire les cent pas",r:"Tu creuses un sillon dans la terre.",p:2},{l:"Dormir",r:"Tu dors dix-huit heures.",s:-1}]},
 {d:3000,x:"Des inspecteurs fédéraux arrivent. Le parc va fermer.",
  hu:"Le législateur — a changé la loi. Un sanctuaire propose de t'accueillir.",f:"Des sanctuaires américains accueillent des grands félins saisis ou cédés.",
  c:[{l:"Rugir",r:"",luck:{p:.6,f:"sanct",yes:"On te transfère dans un sanctuaire, avec de l'herbe.",no:"Le transfert n'aboutit pas."}},{l:"Rester couché",r:"",luck:{p:.6,f:"sanct",yes:"On te transfère dans un sanctuaire, avec de l'herbe.",no:"Le transfert n'aboutit pas."}}]},
 {d:6500,end:1,x:"Tu as vécu dix-huit ans, sans jamais avoir chassé.",
  hu:"Les humains — t'ont fait naître pour une photo.",f:"Les tigres captifs ne peuvent pas être relâchés : ils n'ont jamais appris à chasser."}
 ]});

L("lion",{nom:"Lionceau d'élevage",cat:"nac",poids:.01,sym:1,sprite:"lion",sc:{bg:"savane",n:0},
 lieux:["Afrique du Sud, État-Libre","Afrique du Sud, Nord-Ouest"],cond:"Élevage commercial de lions",
 nat:7000,natTxt:"Un lion peut vivre 15 à 20 ans.",note:"L'Afrique du Sud compterait plusieurs milliers de lions élevés en captivité. Le gouvernement a annoncé en 2021 vouloir mettre fin à cette filière.",
 ev:[
 {d:5,sc:{bg:"enclos",n:0},x:"Tu nais dans un élevage. On t'enlève à ta mère pour qu'elle se reproduise plus vite.",
  hu:"L'éleveur — fait naître des lionceaux pour les touristes.",f:"Retirer les petits permet aux lionnes de se reproduire plusieurs fois par an.",
  c:[{l:"Appeler",r:"Personne ne vient.",p:3},{l:"Téter le biberon",r:"Une bénévole venue d'Europe te le donne.",p:-1}]},
 {d:60,sc:{bg:"enclos",n:0,extra:"humain"},x:"Des bénévoles payent pour venir te nourrir. Ils pensent participer à la conservation.",
  hu:"La bénévole — a payé 2 000 € pour s'occuper de lionceaux « orphelins ».",f:"Les lionceaux d'élevage ne peuvent pas être relâchés : ces programmes ne contribuent pas à la conservation.",
  c:[{l:"Jouer avec elle",r:"Elle pleure en partant.",p:-1},{l:"Te cacher",r:"On te ramène pour la photo."}]},
 {d:400,sc:{bg:"savane",n:0,extra:"humain"},x:"Tu es trop grand pour être caressé. Des touristes marchent maintenant avec toi dans la savane.",
  hu:"L'agence — vend des « promenades avec les lions ».",f:"Ces activités font partie d'une même chaîne commerciale que la chasse en enclos.",
  c:[{l:"Marcher",r:"On te tient au bâton.",p:1},{l:"Grogner",r:"On t'enferme.",p:2}]},
 {d:1800,end:1,sc:{bg:"enclos",n:0},x:"Tu as cinq ans. On t'emmène dans un enclos clôturé, plus grand.",
  hu:"Un chasseur étranger — a payé pour un trophée. Tes os seront vendus en Asie.",f:"La « chasse en boîte » consiste à abattre un lion d'élevage dans un enclos. Elle est vivement critiquée, y compris par des chasseurs."}
 ]});

L("loutre",{nom:"Loutre cendrée",cat:"nac",poids:.01,sym:1,sprite:"loutre",sc:{bg:"etang",n:3,who:"loutre"},
 lieux:["Indonésie","Thaïlande","Vietnam"],cond:"Sauvage, puis café à loutres",
 nat:5000,natTxt:"Une loutre cendrée peut vivre 15 ans.",note:"Depuis 2019, la loutre cendrée est inscrite à l'annexe I de la CITES, qui interdit son commerce international.",
 ev:[
 {d:30,sc:{bg:"jungle",n:4,who:"loutre"},x:"Tu nais dans une famille de loutres, au bord d'une rizière.",
  hu:null,f:"Les loutres cendrées vivent en familles de plusieurs générations.",
  c:[{l:"Jouer dans l'eau",r:"Vous jonglez avec des cailloux.",p:-2},{l:"Rester contre ta mère",r:"Elle te lisse les poils.",p:-1}]},
 {d:90,sc:{bg:"jungle",n:0,extra:"humain"},x:"Des hommes ont tué tes parents pour attraper les petits.",
  hu:"Le braconnier — vend les petits à des trafiquants. Les adultes ne valent rien.",f:"Le trafic de loutres a explosé avec les vidéos virales de loutres de compagnie.",
  c:[{l:"Siffler",r:"Tes frères sifflent avec toi dans le sac.",p:3},{l:"Te taire",r:"Le sac bouge.",p:3}]},
 {d:300,sc:{bg:"maison",n:4,who:"loutre"},x:"Tu vis dans un café, à Tokyo. Les clients te caressent derrière une vitre. Il n'y a pas de rivière.",
  hu:"Le gérant — fait payer 20 € la demi-heure de caresses.",f:"Une loutre a besoin d'eau pour nager et se nettoyer plusieurs heures par jour.",
  c:[{l:"Tendre la patte par le trou de la vitre",r:"Les clients filment. Ça fera des millions de vues.",p:1},{l:"Dormir",r:"Tu dors entre deux clients.",s:-1}]},
 {d:2000,end:1,x:"Tu as vécu cinq ans dans le café.",
  hu:"Les clients — ont payé pour te toucher. Les vidéos ont fait venir d'autres clients.",f:"Des ONG appellent à ne pas partager de vidéos de loutres ou de primates domestiques."}
 ]});

L("fennec",{nom:"Fennec",cat:"nac",poids:.01,sym:1,sprite:"fennec",sc:{bg:"desert",n:0},
 lieux:["Algérie","Tunisie","Maroc"],cond:"Sauvage, puis trafic",
 nat:4500,natTxt:"Un fennec peut vivre 12 ans.",note:"En France, détenir un fennec exige un certificat de capacité et une autorisation.",
 ev:[
 {d:30,x:"Tu nais dans un terrier, sous une dune. Tes grandes oreilles te servent à entendre les insectes sous le sable et à évacuer la chaleur.",
  hu:null,f:"Le fennec est le plus petit canidé du monde.",
  c:[{l:"Écouter le sable",r:"Un insecte gratte, quelque part.",s:1},{l:"Jouer avec tes frères",r:"Vous vous roulez dans le sable.",p:-1}]},
 {d:60,sc:{bg:"desert",n:0,extra:"humain"},x:"Un homme creuse le terrier. Il vous attrape, tes frères et toi.",
  hu:"Le vendeur — te proposera au bord de la route aux touristes.",f:"Des fennecs sont vendus illégalement au bord des routes en Afrique du Nord, souvent à des touristes.",
  c:[{l:"Mordre",r:"Il porte des gants.",p:3},{l:"Te recroqueviller",r:"Il te met dans une cage à oiseau.",p:3}]},
 {d:100,sc:{bg:"maison",n:0},x:"Un touriste t'a caché dans sa voiture. Tu vis dans un appartement en France. Tu creuses le canapé la nuit.",
  hu:"Le touriste — a voulu un animal « unique ».",f:"Ramener un animal sauvage de l'étranger peut aussi introduire des maladies, dont la rage.",
  c:[{l:"Creuser",r:"Tu creuses le canapé jusqu'au bois.",p:-1},{l:"Japper toute la nuit",r:"Les voisins se plaignent.",p:1}]},
 {d:400,end:1,sc:{bg:"refuge",n:0},x:"Les douanes ont été prévenues. On te saisit.",
  hu:"Les douaniers — t'ont confié à un centre de soins. Tu ne pourras jamais retourner dans le désert.",f:"Les animaux saisis finissent souvent dans des centres de sauvegarde ou des zoos."}
 ]});

L("ouistiti",{nom:"Ouistiti",cat:"nac",poids:.02,sym:1,sprite:"ouistiti",sc:{bg:"jungle",n:3,who:"ouistiti"},
 lieux:["Brésil","Royaume-Uni","France"],cond:"Né en captivité, vendu sur internet",
 nat:5000,natTxt:"Un ouistiti peut vivre 12 à 16 ans.",note:"En Angleterre, garder un primate chez soi exige une licence depuis avril 2026, avec des normes proches de celles d'un zoo.",
 ev:[
 {d:60,sc:{bg:"maison",n:0},x:"Tu nais chez un éleveur particulier. On te retire à tes parents très tôt pour que tu t'attaches aux humains.",
  hu:"Le vendeur — sait qu'un ouistiti élevé à la main « se vend mieux ».",f:"Chez les ouistitis, les deux parents et les frères aînés portent les petits.",
  c:[{l:"T'agripper à la main",r:"Tu t'agrippes à n'importe quoi de chaud.",p:1},{l:"Pousser des cris aigus",r:"On te donne un biberon.",p:2}]},
 {d:200,x:"On te met une couche et on te filme pour les réseaux sociaux.",
  hu:"Le propriétaire — gagne des abonnés. Les vidéos donnent envie à d'autres d'acheter un singe.",f:"Les primates de compagnie souffrent souvent de troubles du comportement et de carences.",
  c:[{l:"Faire ce qu'on attend",r:"La vidéo marche bien.",p:1},{l:"Mordre",r:"On te met dans une cage.",p:2}]},
 {d:1500,x:"Tu es devenu adulte. Tu mords, tu marques ton territoire. On ne te sort plus.",
  hu:"Le propriétaire — ne s'attendait pas à un animal sauvage.",f:"Des refuges spécialisés accueillent les primates de particuliers, souvent avec des troubles graves.",
  c:[{l:"Crier",r:"",luck:{p:.4,f:"refuge",yes:"Un refuge vient te chercher. Il y a d'autres ouistitis.",no:"On met un drap sur ta cage."}},{l:"Te balancer",r:"Tu te balances des heures.",p:2}]},
 {d:4500,end:1,x:"Tu as vécu douze ans.",
  hu:"Les humains — t'ont fait naître pour être un jouet.",f:"Un ouistiti a besoin d'un groupe familial pour vivre normalement."}
 ]});
