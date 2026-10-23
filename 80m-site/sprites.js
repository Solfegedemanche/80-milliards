/* =================== SPRITES =================== */
const BIRD=["......r...",".....rww..",".....wkwy.",".....wwwy.",".wwwwwww..","wwwwwwwww.","gwwwwwwww.",".gwwwwww..","..gggg....","...y.y...."];
const HUM=["..kk..",".khhk.","..hh..",".cccc.","cccccc","h.cc.h","..cc..","..dd..",".d..d.",".d..d."];
const COW=["...........kk..",".wwkkwwwwwwkkk.","wwkkkwwkkwwkkkk","wwwkwwwkkwwkkwn","wwwwwwwwwwwwwnn",".wwwkkwwwwww...",".ww..ww..ww.w..",".kk..kk..kk.k.."];
const PIG=["........pp..",".ppppppppp..","pppppppppkp.","ppppppppppnn","pppppppppppn","dpppppppppp.",".dd..dd.dd..",".dd..dd.dd.."];
const DOG=[".........bb.","........bbkbn","b.......bbbb.",".b.bbbbbbbb..","..bbbbbbbbb..","..dbbbbbbbd..","..b.b..b.b...","..d.d..d.d..."];
const FOX=[".........o.o","........oooo","w.......okook","wo.ooooooooo.",".ooooooooo...","..oowwwwoo...","...k.k..k.k.."];
const FISH=["....ddd..",".d.sssss.","ddssssks.",".d.sssss.","....ddd.."];
const MOUSE=[".....ww..","....wwwkn",".wwwwwww.","wwwwwwww.","n.w...w.."];
const SPR={
 poulet:{r:BIRD,p:{w:"#f1eee6",g:"#c2bdb1",r:"#c8322b",y:"#e0a526",k:"#111"}},
 poule:{r:BIRD,p:{w:"#9a5a2c",g:"#6a3b1b",r:"#c8322b",y:"#d9a12a",k:"#111"}},
 pigeon:{r:["...ggg.","..ggkgo","..ggg..","gggggg.","gbbggg.",".gggg..","..o.o.."],p:{g:"#8a929a",b:"#5f6a74",o:"#d07a5a",k:"#111"}},
 poussin:{r:["..yyy..",".yyyky.",".yyyyyo","yyyyyy.",".yyyy..","..o.o.."],p:{y:"#f3d046",o:"#e08a1e",k:"#111"}},
 caille:{r:["...bb..","..bkbo.","bbbbbb.","bdbdbbb",".bbbbb.","..o.o.."],p:{b:"#8a6a44",d:"#5a4128",k:"#111",o:"#d9a12a"}},
 oie:{r:["......ww..","......wkoo","......ww..","......ww..",".wwwwwww..","wwwwwwwww.","gwwwwwwg..","..o..o...."],p:{w:"#f3f1ea",g:"#c9c6bb",o:"#e8902a",k:"#111"}},
 canard:{r:["......ww...",".....wwkwyy","......www..",".wwwwwwww..","wwwwwwwww..",".gwwwwwg...","...y..y...."],p:{w:"#f3f1ea",g:"#c9c6bb",y:"#e8a530",k:"#111"}},
 dinde:{r:[".......r..","......bbr.","......bkby",".bbbbbbb..","bbbbbbbbb.","gbbbbbbbb.",".gbbbbbg..","..y...y..."],p:{b:"#e9e6df",g:"#b9b4a8",r:"#c8322b",y:"#d9a12a",k:"#111"}},
 porc:{r:PIG,p:{p:"#e9a8a2",d:"#c47f79",n:"#d0807b",k:"#111"}},
 sanglier:{r:PIG,p:{p:"#5a4a3a",d:"#3a2e24",n:"#7a6a5a",k:"#111"}},
 vache:{r:COW,p:{w:"#ecebe6",k:"#1b1b1b",n:"#e3a3a0"}},
 boeuf:{r:COW,p:{w:"#d9c9a8",k:"#b8a888",n:"#e0b0a0"}},
 veau:{r:COW,p:{w:"#ecebe6",k:"#6a3a22",n:"#e3a3a0"}},
 buffle:{r:COW,p:{w:"#3a3a3a",k:"#1a1a1a",n:"#555"}},
 taureau:{r:["..w........w...","...kkkkkkkkk...",".kkkkkkkkkkkk..","kkkkkkkkkkkkkkn","kkkkkkkkkkkkknn",".kkkkkkkkkkk...",".kk..kk..kk.k..",".kk..kk..kk.k.."],p:{k:"#1d1d1d",w:"#e8e2cf",n:"#3a3a3a"}},
 chevre:{r:["..........hh",".........bbbk","b........bbbb","bbbbbbbbbbb..","bbbbbbbbbb...",".bbbbbbbbb...",".b.b...b.b...",".k.k...k.k..."],p:{b:"#d9ccb2",h:"#8a7a60",k:"#2a2420"}},
 mouton:{r:[".wwdwwww...","wwwwwwwwkk.","dwwwwwwwkkk","wwwwwdwwkk.",".wwwwwww...","..k..k.....","..k..k....."],p:{w:"#e9e3d4",d:"#c8bfa9",k:"#2a2622"}},
 cheval:{r:["..........kk.",".........bbbk","........bbbbb","bbbbbbbbbbb..","kbbbbbbbbb...",".bbbbbbbbb...",".b.b....b.b..",".b.b....b.b..",".k.k....k.k.."],p:{b:"#8b5a2b",k:"#2a1a0e"}},
 comtois:{r:["..........kk.",".........bbbk","........bbbbb","bbbbbbbbbbb..","kbbbbbbbbb...",".bbbbbbbbb...",".b.b....b.b..",".b.b....b.b..",".k.k....k.k.."],p:{b:"#a5652a",k:"#efe6cf"}},
 chameau:{r:["...........bb","..........bbk","....bb....b..","..bbbbbb..b..",".bbbbbbbbbb..","bbbbbbbbbb...",".b.b....b.b..",".b.b....b.b..",".b.b....b.b.."],p:{b:"#c8a46a",k:"#222"}},
 lapin:{r:[".......dd.",".......gd.","......gggg",".gggggggkg","ggggggggggn","dggggggg..",".gd..gd..."],p:{g:"#e8e6e1",d:"#b8b4ac",k:"#c33",n:"#e3a3a0"}},
 chien:{r:DOG,p:{b:"#9a6a3a",d:"#6e4a28",k:"#111",n:"#222"}},
 beagle:{r:DOG,p:{b:"#c98a4a",d:"#f2ece0",k:"#111",n:"#222"}},
 levrier:{r:DOG,p:{b:"#a8a29a",d:"#7a756f",k:"#111",n:"#222"}},
 errant:{r:DOG,p:{b:"#c9a26a",d:"#a07c4c",k:"#111",n:"#222"}},
 chat:{r:["b...b....","bbbbb....","bkbkb....",".bbb...b.",".bbbbbbb.",".bbbbbb..",".b.b.b.b."],p:{b:"#d98a3a",k:"#1a1a1a"}},
 renard:{r:FOX,p:{o:"#d4652a",w:"#f2ece0",k:"#1a1a1a"}},
 loup:{r:FOX,p:{o:"#8a8a86",w:"#d8d5cc",k:"#1a1a1a"}},
 vison:{r:[".......bb.","......bbkb","bbbbbbbbb.","bbbbbbbbb.",".b.b..b.b."],p:{b:"#3a2a20",k:"#111"}},
 souris:{r:MOUSE,p:{w:"#f2f0ec",k:"#c33",n:"#e9a0a0"}},
 rat:{r:MOUSE,p:{w:"#7a7068",k:"#111",n:"#c9a0a0"}},
 macaque:{r:["..bbb..",".bfffb.","..fkf..","bbbbbbb","b.bbb.b","..b.b..","..b.b.."],p:{b:"#8a6a4a",f:"#e0b0a0",k:"#222"}},
 herisson:{r:["..bbbbb..",".bbbbbbb.","bbbbbbbbf","bbbbbbbkf",".f.....fn"],p:{b:"#5a4a3a",f:"#c9a882",k:"#111",n:"#111"}},
 ours:{r:["...........ww..","..........wwkw.","wwwwwwwwwwwwwwk","wwwwwwwwwwwww..","wwwwwwwwwwww...",".ww.ww...ww.ww.",".ww.ww...ww.ww."],p:{w:"#f0ede4",k:"#111"}},
 orangoutan:{r:[".ooo...","oofoo..","ofkfo..",".ooo...","ooooooo","o.oo..o","..oo...",".o..o.."],p:{o:"#b5521f",f:"#7a3a1a",k:"#111"}},
 elephant:{r:["....gggggg......","...gggggggg.....","..ggggggggggg...","gggggggggggkgg..","gggggggggggggg..","gggggggggggg.gg.","gggggggggggg..g.",".gg.gg..gg.gg...",".gg.gg..gg.gg..."],p:{g:"#8a8a86",k:"#222"}},
 tortue:{r:["...ggggg...","..gdgdgdg..","sgggggggggs",".s.......s."],p:{g:"#4a6a3a",d:"#2f4a26",s:"#8a9a6a"}},
 poisson:{r:FISH,p:{s:"#a9b8bf",d:"#6d7f88",k:"#111"}},
 saumon:{r:["..ddd.......","dssssssssk..","sssrrrrrssss","dsssssssss..","..ddd......."],p:{s:"#b9c4c9",r:"#d99a8a",d:"#7d8790",k:"#111"}},
 thon:{r:[".....d.......","..ddddddd.....","dsssssssssk...","sssssssssssss.","dsssssssss....","..ddddddd.....",".....d........"],p:{s:"#4a5a7a",d:"#2a3550",k:"#eee"}},
 anchois:{r:[".ssss.","dssssk",".ssss."],p:{s:"#c0ccd4",d:"#7d8b94",k:"#111"}},
 poissonrouge:{r:["..oo...","ooooko.","oooooo.",".oo...."],p:{o:"#f08a2a",k:"#111"}},
 crevette:{r:["......rr","....rrrk","rrrrrrr.","r.rrrr..","..l.l..."],p:{r:"#c8b8a8",k:"#111",l:"#9a8a7a"}},
 homard:{r:["l.......l",".l.rrr.l.","rrrrrrrrr",".rrrkrkr.","..rrrrr..","...r.r..."],p:{r:"#34465e",l:"#5a6a7e",k:"#e8e0c0"}},
 poulpe:{r:["..ppp..",".ppppp.",".pkpkp.",".ppppp.","p.p.p.p","p.p.p.p",".p...p."],p:{p:"#b0605a",k:"#111"}},
 orque:{r:["......k.......",".....kk.......","kkkkkkkkkkkk..","kkwkkkkkkkkkkk","kkkkkkkkkkwwk.",".kwwwwwwkk....","k............."],p:{k:"#111",w:"#eee"}},
 baleine:{r:["..................b.","bbbbbbbbbbbbbbbbbb..","bbbbbbbbbbbbbbbbbbbb","bbkbbbbbbbbbbbbbbbb.",".lllllllllllbbbb....","..........b........."],p:{b:"#4a6a8a",l:"#8aa8c0",k:"#111"}},
 ver:{r:[".wwwwwwk","wwwwwwww",".w.w.w.."],p:{w:"#e8e2d0",k:"#222"}},
 larve:{r:[".lllllll.","lllllllll"],p:{l:"#d8c9a0"}},
 grillon:{r:["a.....a.",".a...a..","..bbbbbk",".bbbbbb.","b.b..b.b"],p:{b:"#4a3a2a",a:"#6a5a4a",k:"#111"}},
 abeille:{r:["..ww.","ykyky","ykykyk",".k.k."],p:{y:"#e8b830",k:"#222",w:"#dfe8f0"}},
 humain:{r:HUM,p:{k:"#3a2a1e",h:"#d8a888",c:"#3f6a8a",d:"#2a3a48"}},
 ouvrier:{r:HUM,p:{k:"#e8ecee",h:"#c99a78",c:"#e8ecee",d:"#9aa3a8"}},
 eleveur:{r:HUM,p:{k:"#5a3a22",h:"#e0b090",c:"#2f5a3a",d:"#3a3326"}},
 veto:{r:HUM,p:{k:"#2a2a2a",h:"#b8846a",c:"#f2f2f2",d:"#5a6a7a"}},
 pecheur:{r:HUM,p:{k:"#2a3a5a",h:"#d8a080",c:"#e8c02a",d:"#2a3a5a"}},
 parent:{r:HUM,p:{k:"#6a4a2a",h:"#e0b898",c:"#a4473b",d:"#3a3a48"}},
 chercheuse:{r:HUM,p:{k:"#1a1a1a",h:"#8a5a3a",c:"#f2f2f2",d:"#3a4a6a"}},
};
function sprW(n){return Math.max(...SPR[n].r.map(r=>r.length))}
function sprH(n){return SPR[n].r.length}
function spr(ctx,n,x,y,flip,sc,mono,rows,pal){
  const s=rows?{r:rows,p:pal}:SPR[n];sc=sc||1;const w=Math.max(...s.r.map(r=>r.length));
  s.r.forEach((row,j)=>{for(let i=0;i<row.length;i++){const ch=row[i];if(ch===".")continue;
    ctx.fillStyle=mono||s.p[ch];const xi=flip?(w-1-i):i;ctx.fillRect(Math.round(x+xi*sc),Math.round(y+j*sc),sc,sc)}});
}

/* ===== NAC et exotiques ===== */
Object.assign(SPR,{
 hamster:{r:["..oo.oo.",".ooooooo","ooookooo","oowwwwon",".wwwwww.","..o..o.."],p:{o:"#d8a060",w:"#f4e8d4",k:"#111",n:"#e09090"}},
 cobaye:{r:["...bb.....",".bbbbwwbb.","bbbbwwwkbb","bbwwwwwwbn",".wwwwwwww.","..w....w.."],p:{b:"#8a5a32",w:"#f2ece0",k:"#111",n:"#e09090"}},
 lapinnain:{r:[".......dd.",".......gd.","......gggg",".gggggggkg","ggggggggggn","dggggggg..",".gd..gd..."],p:{g:"#c8b8a8",d:"#9a8a7a",k:"#111",n:"#e3a3a0"}},
 perruche:{r:["..yyy..","..ykyb.","..yyy..",".gggg..","ggggg..","gg.gg..","..ggg..","...gg.."],p:{y:"#f2e04a",k:"#111",b:"#3a6ac8",g:"#5ac05a"}},
 perroquet:{r:["..ggg...",".gwkg...",".gwwgb..","..ggg...",".gggg...","ggggg...","gg.gg...","..rrr...","...rr..."],p:{g:"#8a9096",w:"#f2f2f2",k:"#111",b:"#222",r:"#c8322b"}},
 python:{r:["..................","....bbbb..bbbb....","...byyyb.byyyb.bbk","bbbb..bbbb..bbbbb.","................."],p:{b:"#4a3a24",y:"#c8a050",k:"#111"}},
 tortueterre:{r:["...yyyyy...","..ybybyby..","..yyyyyyyy.","sbbbbbbbbbs",".s.....s.sk"],p:{y:"#c8a040",b:"#3a2a1a",s:"#8a7a5a",k:"#111"}},
 iguane:{r:["...........gg.","..........gkgg","g...gggggggg..",".g.ggggggggg..","..gg.g.g..g.g."],p:{g:"#5a9a3a",k:"#111"}},
 furet:{r:[".......ww.","......wkkn","bbbbbbbbb.","bbbbbbbbb.",".b.b..b.b."],p:{b:"#8a6a48",w:"#f2ece0",k:"#2a2a2a",n:"#e09090"}},
 chinchilla:{r:["..gg.gg.",".gggggg.","ggggkggg","gggggggn",".gggggg.","..g..g.."],p:{g:"#9aa0a6",k:"#111",n:"#e09090"}},
 poissonclown:{r:["...ooo...",".owowoo..","oowowoko.",".owowoo..","...ooo..."],p:{o:"#f07a2a",w:"#f8f8f8",k:"#111"}},
 betta:{r:["bb..rrr...","bbbrrrrrr.","bbrrrrrkr.","bbbrrrrrr.","bb..rrr..."],p:{r:"#c82a4a",b:"#7a2ab0",k:"#111"}},
 axolotl:{r:["p...........p","pp.ppppppp.pp","..ppppppkpp..","...ppppppp...","...p.p..p.p.."],p:{p:"#f0b0c0",k:"#111"}},
 tigre:{r:["..........oo..","..o......okoo.","..o.oooooooooo","...okokokookon","...ooooooooo..","...wwwwwww....","...o.o...o.o.."],p:{o:"#e08a2a",k:"#1a1a1a",w:"#f2ece0",n:"#c86a6a"}},
 lion:{r:["..........mm..","..........mykm","..y.yyyyyymmmn","...yyyyyyyy...","...yyyyyyyy...","...y.y...y.y.."],p:{y:"#d8b070",m:"#8a5a2a",k:"#111",n:"#5a3a2a"}},
 loutre:{r:[".......bb.","......bwkb","bbbbbbbbw.","bbbbbbbbb.",".b.b..b.b."],p:{b:"#6a4a30",w:"#d8c8b0",k:"#111"}},
 fennec:{r:["........y.y.","........y.y.","........yyyy","w.......ykyk","wy.yyyyyyyy.",".yyyyyyyy...","..y.y..y.y.."],p:{y:"#f0d8a0",w:"#f8f0e0",k:"#2a2a2a"}},
 ouistiti:{r:[".wbbbw.",".bfkfb.","..fff..",".bbbb..","bbbbbb.","b.bb.bb","..b..b.","......b"],p:{b:"#6a5a4a",w:"#f2f2f2",f:"#d8b098",k:"#111"}},
});
