
(()=>{
"use strict";
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const clean=s=>String(s||"").replace(/\s+/g," ").trim();
const norm=s=>clean(s).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"");
const HALLS=["Heldenhalle und Lager","Obere Galerie und Schmuck","Drachenbluthalle","Geheimnishalle","Waffenkammer","Naturkunde und Fossilien","Daedra und verlorene Reiche","Kuriositäten","Bibliothek","Wohnbereich","Gemälde","Entdeckergilde","Hall of Wonders · Anniversary"];
const NAMES={"Dawnbreaker":"Dämmerbrecher","Dragonbane":"Drachenfluch","Bloodskal Blade":"Blutskaal-Klinge","Wuuthrad":"Wuuthrad","Chillrend":"Kältedorn","Mace of Molag Bal":"Streitkolben von Molag Bal","Mehrunes' Razor":"Mehrunes' Klinge","Azura's Star":"Azuras Stern","The Black Star":"Der Schwarze Stern","Zephyr":"Zephyr","Ghostblade":"Geisterklinge","Wabbajack":"Wabbajack","Spellbreaker":"Zauberbrecher","Ebony Blade":"Ebenerzklinge","Ebony Mail":"Ebenerzpanzer","Skeleton Key":"Skelettschlüssel"};

const QUEST_GROUPS=[["main","Hauptquest"],["companions","Gefährten"],["college","Akademie von Winterfeste"],["thieves","Diebesgilde"],["brotherhood","Dunkle Bruderschaft"],["dawnguard","Dawnguard"],["dragonborn","Dragonborn"],["civilwar","Bürgerkrieg"],["daedric","Daedra-Quests"],["lotd","Legacy of the Dragonborn"],["side","Weitere Quests"],["none","Ohne feste Quest"]];
const REGION_GROUPS=[["Skyrim","Himmelsrand"],["Solstheim","Solstheim"],["SoulCairn","Seelengrab"],["unknown","Noch nicht zugeordnet"]];
function regionOf(o){
 const p=norm(o.p),n=norm(o.n),src=norm(o.s);
 if(o.loc?.world)return o.loc.world;
 if(/soul cairn|seelengrab|reaper.s lair|reaper.s bane|boneyard|arvak|morven stroud|jiub/.test(p+" "+n))return "SoulCairn";
 if(/solstheim|raven rock|skaal village|tel mithryn|fort frostmoth|temple of miraak|kolbjorn|kagrumez|fahlbtharz|nchardak|horker island|brodir grove|benkongerike|hrothmund|bloodskal|thirsk|ashfall.s tear/.test(p))return "Solstheim";
 if(!p||/random|leveled|merchant|vendor|anywhere|various|crafted|craftable|forge|smithing|general goods|loot table|unknown|unmarked museum display/.test(p))return "unknown";
 if(/dragonborn dlc/.test(src))return "unknown";
 return "Skyrim";
}
const STANDARD_GEAR=/^(?:iron|steel|ebony|dwarven|orcish|elven|glass|leather|hide|fur|daedric|dragonplate|dragonscale|imperial|scaled|chitin|bonemold|nordic carved)\s+(?:armor|boots|gauntlets|helmet|shield|sword|bow|dagger|mace|war axe|battleaxe|greatsword|warhammer|greaves|cuirass|arrows)$/i;
function isCraftOnly(o){const p=norm(o.p),q=norm(o.q),n=clean(o.n);if(q)return false;return STANDARD_GEAR.test(n)||/\b(crafted|craftable|craft at|crafting|smithing|any forge|archaeology table|archaeology station|smelted)\b/.test(p)}
function questGroupOf(o){const q=norm(o.q);
 if(!q)return "none";
 if(/main quest|bleak falls barrow|dragon rising|the way of the voice|elder knowledge|alduin/.test(q))return "main";
 if(/companions|proving honor|glory of the dead|silver hand|blood.s honor|purity of revenge/.test(q))return "companions";
 if(/college of winterhold|the college|under saarthal|first lessons|hitting the books|good intentions|revealing the unseen|the staff of magnus|eye of magnus/.test(q))return "college";
 if(/thieves guild|no stone unturned|loud and clear|darkness returns|blindsighted/.test(q))return "thieves";
 if(/dark brotherhood|bound until death|hail sithis|mourning never comes/.test(q))return "brotherhood";
 if(/dawnguard|chasing echoes|beyond death|touching the sky|kindred judgment|impatience of a saint/.test(q))return "dawnguard";
 if(/dragonborn|temple of miraak|path of knowledge|the final descent|march of the dead|cleansing the stones/.test(q))return "dragonborn";
 if(/civil war|battle for whiterun|reunification of skyrim|liberation of skyrim/.test(q))return "civilwar";
 if(/azura|boethiah|molag bal|mehrunes|meridia|sanguine|nocturnal|the break of dawn|the black star|house of horrors|pieces of the past|the whispering door|boethiah.s calling|waking nightmare/.test(q))return "daedric";
 if(/shattered legacy|much ado about snow elves|legacy of the dragonborn|trial of trinimac|more than you can chew|tools of the trade/.test(q)||/legacy of the dragonborn/i.test(o.s||"")&&q==="unmarked museum display milestone")return "lotd";
 return "side";
}

const P=[
{name:"Einsamkeit",world:"Skyrim",x:30,y:17,keys:["solitude","einsamkeit","blue palace","castle dour","bards college"]},
{name:"Markarth",world:"Skyrim",x:16,y:49,keys:["markarth","understone keep","silver-blood inn"]},
{name:"Weißlauf",world:"Skyrim",x:50,y:56,keys:["whiterun","dragonsreach","jorrvaskr","breezehome"]},
{name:"Rifton",world:"Skyrim",x:78,y:78,keys:["riften","riftweald manor","mistveil keep","ragged flagon"]},
{name:"Windhelm",world:"Skyrim",x:84,y:38,keys:["windhelm","palace of the kings"]},
{name:"Winterfeste",world:"Skyrim",x:77,y:18,keys:["winterhold","college of winterhold","arcanaeum","the midden"]},
{name:"Dämmerstern",world:"Skyrim",x:59,y:19,keys:["dawnstar","white hall","dawnstar sanctuary"]},
{name:"Falkenring",world:"Skyrim",x:32,y:79,keys:["falkreath"]},
{name:"Morthal",world:"Skyrim",x:42,y:30,keys:["morthal","highmoon hall"]},
{name:"Flusswald",world:"Skyrim",x:45,y:70,keys:["riverwood","sleeping giant inn"]},
{name:"Hoch-Hrothgar",world:"Skyrim",x:62,y:57,keys:["high hrothgar","throat of the world"]},
{name:"Kilkreath",world:"Skyrim",x:25,y:22,keys:["kilkreath","meridia shrine"]},
{name:"Saarthal",world:"Skyrim",x:71,y:20,keys:["saarthal"]},
{name:"Volkihar",world:"Skyrim",x:17,y:17,keys:["castle volkihar"]},
{name:"Helgen",world:"Skyrim",x:46,y:76,keys:["helgen"]},
{name:"Himmelshafen-Tempel",world:"Skyrim",x:21,y:62,keys:["sky haven temple","karthspire"]},
{name:"Rabenfels",world:"Solstheim",x:28,y:74,keys:["raven rock","raven rock mine","severin manor"]},
{name:"Skaaldorf",world:"Solstheim",x:71,y:24,keys:["skaal village"]},
{name:"Tel Mithryn",world:"Solstheim",x:76,y:73,keys:["tel mithryn"]},
{name:"Miraaks Tempel",world:"Solstheim",x:57,y:43,keys:["temple of miraak"]},
{name:"Festung Frostmotte",world:"Solstheim",x:51,y:79,keys:["fort frostmoth"]},
{name:"Thirsk",world:"Solstheim",x:62,y:57,keys:["thirsk"]},
{name:"Kolbjornhügel",world:"Solstheim",x:43,y:62,keys:["kolbjorn"]},
{name:"Benkongerike",world:"Solstheim",x:75,y:45,keys:["benkongerike"]}
];

const QUEST_STARTS={
 "the golden claw":{name:"Lucan Valerius · Flusswald-Handel",world:"Skyrim",x:45,y:70,hint:"Questgeber: Lucan Valerius im Flusswald-Handel in Flusswald. Fundort: Ödsturzhügelgrab; Arvel der Flinke trägt die Klaue."},
 "forbidden legend":{name:"Buch „Verlorene Legenden“, z. B. Drachenfeste",world:"Skyrim",x:50,y:56,hint:"Kein fester NPC: Queststart etwa durch das Buch „Verlorene Legenden“ bei Farengar in der Drachenfeste oder durch die Erkundung von Folgunthur."},
 "no stone unturned":{name:"Vex · Die Zersplitterte Flasche in Rifton",world:"Skyrim",x:78,y:78,hint:"Einen ungewöhnlichen Edelstein finden, anschließend Vex bei der Diebesgilde ansprechen."}
};
P.push(
{name:"Ödsturzhügelgrab",world:"Skyrim",x:40,y:68,keys:["bleak falls barrow"]},
{name:"Folgunthur",world:"Skyrim",x:38,y:28,keys:["folgunthur"]},
{name:"Geirmunds Halle",world:"Skyrim",x:72,y:76,keys:["geirmund's hall","geirmunds hall"]},
{name:"Wasserwindfelsen",world:"Skyrim",x:22,y:62,keys:["reachwater rock"]},
{name:"Ansilvund",world:"Skyrim",x:85,y:58,keys:["ansilvund"]},
{name:"Hobs Sturzhöhle",world:"Skyrim",x:65,y:17,keys:["hob's fall cave","hobs fall cave"]}
);

// Zwei geprüfte feste Fundorte; Positionen sind Weltkarten-Näherungen.
P.push(
 {name:"Horkerinsel",world:"Solstheim",x:90,y:18,keys:["horker island","horkerinsel","gyldenhul barrow"]},
 {name:"Bruchhelmtal",world:"Skyrim",x:91,y:82,keys:["broken helm hollow","bruchhelmtal"]}
);
// Solstheim und Seelengrab: bekannte Fundregionen, näherungsweise auf den Gebietskarten.
P.push(
 {name:"Hrothmunds Hügelgrab",world:"Solstheim",x:40,y:31,keys:["hrothmund's barrow","hrothmunds barrow"]},
 {name:"Kagrumez",world:"Solstheim",x:59,y:73,keys:["kagrumez"]},
 {name:"Brodirhain",world:"Solstheim",x:52,y:69,keys:["brodir grove"]},
 {name:"Handelsposten",world:"Solstheim",x:61,y:68,keys:["ramshackle trading post"]},
 {name:"Fahlbtharz",world:"Solstheim",x:72,y:22,keys:["fahlbtharz"]},
 {name:"Nchardak",world:"Solstheim",x:82,y:52,keys:["nchardak"]},
 {name:"Blutskaalhügelgrab",world:"Solstheim",x:29,y:62,keys:["bloodskal barrow"]},
 {name:"Weißkammhügelgrab",world:"Solstheim",x:47,y:35,keys:["white ridge barrow"]},
 {name:"Rabenfels",world:"Solstheim",x:30,y:79,keys:["raven rock mine","raven rock"]},
 {name:"Hrothmunds Grab",world:"Solstheim",x:39,y:31,keys:["hrothmund's barrow"]},
 {name:"Seelengrab · Schnitterhort",world:"SoulCairn",x:81,y:75,keys:["reaper's lair","reapers lair"]},
 {name:"Seelengrab · Knochenhof",world:"SoulCairn",x:58,y:31,keys:["boneyard"]},
 {name:"Seelengrab · Jiub",world:"SoulCairn",x:67,y:65,keys:["jiub's camp","soul cairn poi jiub"]},
 {name:"Seelengrab · Händler",world:"SoulCairn",x:47,y:52,keys:["morven stroud"]},
 {name:"Seelengrab · Arvaks Schädel",world:"SoulCairn",x:81,y:48,keys:["arvak's skull","arvaks skull"]}
);
const ITEM_NOTES={
 "s1r54":{de:"Horkerfluch",p:"Horkerinsel, nordöstlich vor Solstheim, östlich des Skaaldorfes. Beim toten Saden in einem Horker.",
 link:"https://skyrim.fandom.com/de/wiki/Horkerinsel"},
 "s1r15":{de:"Sixth House Bell Hammer",p:"Bruchhelmtal (Broken Helm Hollow) südöstlich von Rifton. Hinter einer Geheimtür; eine Kette öffnet den Zugang. In LotD SSE kann die Waffe erst nach Beginn von „An Interesting Prospect“ erscheinen.",
 link:"https://legacy-of-the-dragonborn.fandom.com/wiki/Sixth_House_Bell_Hammer"}
};

P.push(
 {name:"Drachenblut-Galerie · Einsamkeit",world:"Skyrim",x:30,y:17,keys:["dragonborn gallery","curator's office","explorer's guild","explorer's society guild house","explorer's guild house","given by auryen"],approx:true,hint:"Museumsgebäude und Entdeckergilde in Einsamkeit; markiert das Museum, nicht eine Ausstellungsvitrine."},
 {name:"Ashfall's Tear · nördlich von Rabenfels",world:"Solstheim",x:28,y:61,keys:["ashfall's tear"],approx:true,hint:"Creation Club: Ghosts of the Tribunal. Eingang nördlich von Rabenfels."},
 {name:"Runoff Caverns · nahe Valthume",world:"Skyrim",x:25.4,y:60.7,keys:["runoff caverns"],approx:true,hint:"Forgotten Seasons: westlich vom Cradle Stone Tower, östlich von Valthume."},
 {name:"Zugang zum Vergessenen Tal · Darkfall Cave",world:"Skyrim",x:15.454,y:29.736,keys:["forgotten vale"],approx:true,hint:"Dieser Pin zeigt den Eingang über Darkfall Cave, NICHT einen Lootfundort im Vergessenen Tal."},
 {name:"Dämmerwacht · Zugang über Dayspring Canyon",world:"Skyrim",x:94,y:75,keys:["fort dawnguard","dayspring canyon"],approx:true,hint:"Hinter der Schlucht Dayspring Canyon. Zugang südöstlich von Rifton nahe dem Morrowind-Grenzpass."},
 {name:"Ätheriumschmiede · Eingang Ruinen von Bthalft",world:"Skyrim",x:68.518,y:77.376,keys:["aetherium forge"],approx:true,hint:"Unter den Ruinen von Bthalft; Zugang im Zuge von Lost to the Ages."},
 {name:"Dead Man's Dread · Boot bei Orphan's Tear",world:"Skyrim",x:22.705,y:12.793,keys:["dead man's dread"],approx:true,hint:"DIES IST DER BOOTS-ZUGANG. Das Schiff liegt bei Blackbone Isle, das man mit einem Boot von Orphan's Tear erreicht."},
 {name:"Septimus-Signus-Außenposten",world:"Skyrim",x:68,y:9,keys:["septimus signus' outpost","septimus signus outpost"],approx:true,hint:"Auf dem Eis weit nördlich der Akademie Winterfeste."},
 {name:"Drachenbrücke",world:"Skyrim",x:25,y:31,keys:["dragon bridge"],approx:true,hint:"Südwestlich von Einsamkeit."}
);
const START=[
["the break of dawn","Statue von Meridia","Skyrim",25,22,"Meridias Stern finden oder die Statue aufsuchen."],
["the house of horrors","Markarth, verlassenes Haus","Skyrim",16,49,"Vor dem Haus mit Wächter Tyranus sprechen."],
["lost to the ages","Arkngthamz","Skyrim",22,61,"Arkngthamz erkunden oder „Die Ätheriumkriege“ lesen."],
["the black star","Schrein von Azura","Skyrim",79,13,"Mit Aranea Ienith sprechen."],
["pieces of the past","Museum in Dämmerstern","Skyrim",59,19,"Nach dem Botenbrief Silus Vesuius besuchen."],
["the whispering door","Drachenfeste","Skyrim",50,56,"Hulda nach Gerüchten fragen; Hauptquest-Fortschritt nötig."],
["the final descent","Rabenfels-Mine","Solstheim",28,74,"Mit Crescius Caerellius sprechen."],
["march of the dead","Rabenfels","Solstheim",28,74,"Mit Hauptmann Veleth sprechen."],
["waking nightmare","Dämmerstern","Skyrim",59,19,"Mit Erandur sprechen."],
["the only cure","Schrein von Peryite","Skyrim",23,42,"Mit Kesh sprechen."],
["the taste of death","Markarth","Skyrim",16,49,"Mit Bruder Verulus sprechen."],
["the cursed tribe","Largashbur","Skyrim",79,69,"Largashbur aufsuchen."],
["boethiah's calling","Schrein von Boethiah","Skyrim",87,48,"Ab Stufe 30 den Schrein aufsuchen."],
["discerning the transmundane","Septimus-Signus-Außenposten","Skyrim",68,9,"Septimus Signus aufsuchen."]
];
let all=[],shown=[],selected=null,checks={},world="Skyrim",scale=1,dx=0,dy=0,drag=null,regions=false,pinMode="find",page=40,view="adventure",museumCount=0,guideCount=0;
try{checks=JSON.parse(localStorage.getItem("lotd-museumsatlas-v2")||"{}")||{}}catch{}
function save(){try{localStorage.setItem("lotd-museumsatlas-v2",JSON.stringify(checks))}catch{}}
function source(i){const s=norm(i.s);if(s.includes("(cc)")||s.includes("creation club"))return "Anniversary / CC";if(s.includes("dawnguard"))return "Dawnguard";if(s.includes("dragonborn"))return "Dragonborn";if(s.includes("hearthfire"))return "Hearthfire";if(s.includes("legacy"))return "Legacy of the Dragonborn";if(s==="base game")return "Skyrim";return "Unbestimmte Quelle"}
function type(i){const p=norm(i.p),q=norm(i.q),n=norm(i.n);if(/craft|forge|smelt|smith/.test(p))return "Herstellbar";if(/sold|merchant|vendor|general goods|randomly sold/.test(p))return "Kaufbar";if(q)return "Quest";if(/book|sermon|journal|diary|letter|volume/.test(n)||i.t===8)return "Buch / Schrift";if(/fossil|painting|display|banner|replica/.test(n))return "Ausstellung / Sammlung";return "Frei auffindbar"}
function point(text){
 const n=norm(text);
 if(!n)return null;
 let found=[];
 for(const p of P)for(const key of p.keys){
   const k=norm(key);
   if(k.length<4)continue;
   const at=n.indexOf(k);
   if(at<0)continue;
   if((at>0&&/[a-z]/.test(n[at-1]))||/[a-z]/.test(n[at+k.length]||""))continue;
   found.push({p,at,len:k.length});
 }
 if(!found.length)return null;
 // Ein benannter Dungeon ist hilfreicher als die zuvor genannte Stadt
 // z.B. "Markarth, Festung Unterstein". Längster konkreter Treffer zuerst.
 found.sort((a,b)=>b.len-a.len||a.at-b.at);
 return found[0].p;
}
function questpoint(q){let n=norm(q);if(QUEST_STARTS[n])return {...QUEST_STARTS[n]};for(let v of START)if(n.includes(v[0]))return {name:v[1],world:v[2],x:v[3],y:v[4],hint:v[5]};return null}
function done(id,val){checks[id]=val;save();stats();list();details()}
function stats(){let n=all.filter(x=>checks[x.id]).length;$("statDone").textContent=n.toLocaleString("de-DE")+" / "+all.length.toLocaleString("de-DE");$("statPercent").textContent=(all.length?Math.round(n/all.length*100):0)+" %";$("barFill").style.width=(all.length?n/all.length*100:0)+"%"}
function opts(id,arr,alltext){$(id).innerHTML='<option value="all">'+alltext+"</option>"+arr.map(x=>'<option value="'+esc(x[0])+'">'+esc(x[1])+"</option>").join("")}
function select(id){
  if(selected?.id===id){selected=null;pinMode="find";list();details();pins();return}
  selected=all.find(x=>x.id===id)||null;if(!selected)return;
  pinMode=selected.loc?"find":"start";
  setWorld(selected.loc?.world||selected.start?.world||"Skyrim");
  list();details();pins();
  if(selected.loc||selected.start)focus(pinMode);
}
function updateRegionUI(){
 const active=view==="adventure"&&["side","none"].includes($("questGroup").value);
 $("regionGroup").hidden=!active;
 if(!active)$("regionFilter").value="all";
}
function filter(){
 updateRegionUI();
 const s=norm($("search").value),c=$("category").value,src=$("srcFilter").value,h=$("hallFilter").value,st=$("progress").value,m=$("mapFilter").value,qg=$("questGroup").value,rg=$("regionFilter").value;
 shown=all.filter(i=>{
 const area=view==="adventure"?!i.craftOnly&&!i.series:view==="collections"?!!i.series:!!i.craftOnly&&!i.series;
 return area&&(view!=="adventure"||qg==="all"||i.questGroup===qg)&&(rg==="all"||i.region===rg)&&(c==="all"||i.type===c)&&(src==="all"||i.origin===src)&&(h==="all"||String(i.t)===h)&&(st==="all"||(st==="done")===!!checks[i.id])&&(m==="all"||(m==="with"&&!!(i.loc||i.start))||(m==="without"&&!i.loc&&!i.start))&&(!s||norm([i.n,i.de,i.q,i.p,i.d,i.origin,HALLS[i.t],i.series].join(" ")).includes(s));
 });
 const sort=$("sortFilter").value;if(sort==="alpha")shown.sort((a,b)=>a.n.localeCompare(b.n));if(sort==="miss")shown.sort((a,b)=>Number(b.m)-Number(a.m));if(sort==="quest")shown.sort((a,b)=>Number(!!b.q)-Number(!!a.q));
 selected=null;pinMode="find";page=40;list();details();pins();
}
function list(){
 const rg=$("regionFilter").value,qg=$("questGroup").value;
 if(view==="adventure"&&["side","none"].includes(qg)&&rg==="all"&&!norm($("search").value)){
  const counts=new Map(REGION_GROUPS.map(([code])=>[code,shown.filter(x=>x.region===code).length]));
  $("visibleCounter").textContent="Region wählen";
  $("itemList").innerHTML='<div class="quest-overview"><p>Wähle die Region. Nicht sicher verortete Items stehen unter „Noch nicht zugeordnet“.</p>'+REGION_GROUPS.map(([code,label])=>'<button type="button" data-region="'+code+'"><strong>'+label+'</strong><small>'+counts.get(code)+' Einträge ›</small></button>').join("")+'</div>';
  $("itemList").querySelectorAll("[data-region]").forEach(b=>b.onclick=()=>{$("regionFilter").value=b.dataset.region;filter()});
  $("more").hidden=true;return;
 }
 const overview=view==="adventure"&&$("questGroup").value==="all"&&!norm($("search").value)&&$("category").value==="all"&&$("hallFilter").value==="all"&&$("srcFilter").value==="all"&&$("progress").value==="all"&&$("mapFilter").value==="all";
 if(overview){const counts=new Map();for(const i of all.filter(x=>!x.craftOnly&&!x.series))counts.set(i.questGroup,(counts.get(i.questGroup)||0)+1);
 $("visibleCounter").textContent="Questlinien";
 $("itemList").innerHTML='<div class="quest-overview"><p>Wähle links deine Questreihe. Herstellbare Standardgegenstände liegen separat unter „Herstellung“.</p>'+QUEST_GROUPS.map(([id,name])=>'<button type="button" data-group="'+id+'"><strong>'+esc(name)+'</strong><small>'+(counts.get(id)||0)+' Einträge ›</small></button>').join("")+'</div>';
 $("itemList").querySelectorAll("[data-group]").forEach(b=>b.onclick=()=>{$("questGroup").value=b.dataset.group;filter()});$("more").hidden=true;return;
 }
 const items=shown.slice(0,page);$("visibleCounter").textContent=shown.length.toLocaleString("de-DE")+" Einträge";$("itemList").innerHTML=items.map(i=>'<div class="atlasrow '+(selected?.id===i.id?"picked ":"")+(checks[i.id]?"checked":"")+'"><input type="checkbox" data-done="'+i.id+'" '+(checks[i.id]?"checked":"")+'><button data-pick="'+i.id+'"><b>'+esc(i.de||i.n)+'</b>'+(i.de?'<small>'+esc(i.n)+'</small>':"")+'<small>'+esc(HALLS[i.t])+' · '+esc(i.origin)+'</small><small class="labels">'+(i.q?'<em>Quest</em>':"")+(i.m?'<em class="warn">Verpassbar?</em>':"")+(i.loc?'<em>Region</em>':"")+'</small></button></div>').join("")||'<div class="nothing">Keine Einträge gefunden.</div>';$("more").hidden=shown.length<=page;$("more").textContent="Weitere "+Math.min(80,shown.length-page)+" anzeigen ("+(shown.length-page)+" übrig)";$("itemList").querySelectorAll("[data-pick]").forEach(b=>b.onclick=()=>select(b.dataset.pick));$("itemList").querySelectorAll("[data-done]").forEach(b=>b.onchange=e=>done(b.dataset.done,e.target.checked))}
function details(){const i=selected;if(!i){$("details").innerHTML='<h2>Fundorte auf der Karte</h2><p>Wähle links ein Item aus. Erst dann erscheint der Fundort als Marker. Klicke dasselbe Item erneut an, um die Auswahl und den Marker zu entfernen.</p><p>Queststarts kannst du bei einem Gegenstand mit zugehöriger Quest separat über die Detailansicht anzeigen.</p>';return;}let start=i.start,loc=i.loc;let hasCoordinates=!!(start||loc);$("details").innerHTML='<div class="overline">'+esc(i.series||HALLS[i.t])+'</div><h2>'+esc(i.de||i.n)+'</h2>'+(i.de?'<div class="translation">'+esc(i.n)+'</div>':'')+'<div class="tagrow"><span class="tag">'+esc(i.origin)+'</span><span class="tag">'+esc(i.type)+'</span>'+(i.m?'<span class="tag miss">⚠ Verpassbar laut Quellliste</span>':'')+'</div><h3>Fundort / Beschaffung</h3><p><strong>'+esc(i.p||"Kein Fundort angegeben")+'</strong></p>'+(i.steps?'<p>'+esc(i.steps)+'</p>':'')+(loc?'<div class="pointbox findbox"><span class="emoji">🟠</span><div class="pointtext"><strong>Region: '+esc(loc.name)+'</strong><small>Ungefähre Weltkartenposition – kein exakter Loot-Pin'+(loc.hint?'<br>'+esc(loc.hint):'')+'</small></div><button data-jump="find">Karte</button></div>':'<p class="atlaswarning">Für diesen Gegenstand ist noch kein verlässlicher Kartenpunkt zugeordnet.</p>')+'<h3>Zugehörige Quest</h3><p><strong>'+esc(i.q||"Keine feste Quest in der Quelltabelle angegeben")+'</strong></p>'+(start?'<div class="pointbox"><span class="emoji">🔹</span><div class="pointtext"><strong>Queststart: '+esc(start.name)+'</strong><small>'+esc(start.hint)+'</small></div><button data-jump="start">Karte</button></div>':i.q?'<p class="atlaswarning">Queststart und NPC müssen für diese Quest noch einzeln verifiziert werden.</p>':'')+'<h3>Museumsplatz</h3><p>'+esc(i.d||"Nicht angegeben")+'</p><h3>Vorgehen</h3><p>Suche in <strong>'+esc(i.p||"dem zugehörigen Questgebiet")+'</strong>'+(i.q?' und beachte die Quest „'+esc(i.q)+'“.':' .')+' Die Quelltabelle bietet nicht für jeden Eintrag vollständige Questvoraussetzungen.</p><div class="completion"><input id="completeCheck" type="checkbox" '+(checks[i.id]?"checked":"")+'><label for="completeCheck">Im Museum erledigt</label></div><div class="sources"><b>Quellen und weitere Hilfe</b>'+(i.sourceUrl?'<a target="_blank" rel="noopener" href="'+esc(i.sourceUrl)+'">↗ Fundort-Referenz</a>':'<a target="_blank" rel="noopener" href="https://docs.google.com/spreadsheets/d/1uWJs4adekvTOL-z7bRSf-JwUi7bX1bFQqlKPEv5k0qc/edit">↗ Community-Quelltabelle · Zeile '+i.r+'</a>')+'<a target="_blank" rel="noopener" href="https://legacy-of-the-dragonborn.fandom.com/wiki/Special:Search?query='+encodeURIComponent(i.n)+'">↗ LotD-Wiki nach Item durchsuchen</a><a target="_blank" rel="noopener" href="https://en.uesp.net/w/index.php?search='+encodeURIComponent(i.n)+'">↗ UESP-Suche</a></div><p class="atlasnote">Kartenzuordnung nur regional. Fundort- und Questangabe stammen aus einer Community-Liste und sind nicht für jede LotD-v6-Version einzeln gegengeprüft.</p>';$("completeCheck").onchange=e=>done(i.id,e.target.checked);$("details").querySelectorAll("[data-jump]").forEach(b=>b.onclick=()=>{pinMode=b.dataset.jump;pins();focus(pinMode)})}
function setWorld(w){
 world=w;scale=1;dx=dy=0;
 for(const [id,v] of [["worldSkyrim","Skyrim"],["worldSolstheim","Solstheim"],["worldSoulCairn","SoulCairn"]])$(id).classList.toggle("active",w===v);
 const bg=$("backgroundMap");
 for(const id of ["fallback","solstheimFallback","soulCairnFallback"])$(id).style.display="none";
 bg.style.display="none";
 const fallback=$(w==="Skyrim"?"fallback":w==="Solstheim"?"solstheimFallback":"soulCairnFallback");
 fallback.style.display="block";
 // Echte Gebietskarten statt der schematischen Seelengrab-Karte.
 // Externe Bilder: Bei Ladefehler bleibt eine lokale Orientierungskarte sichtbar.
 const images={
   Skyrim:"https://images.uesp.net/e/ef/SR-map-Skyrim.jpg",
   Solstheim:"https://images.uesp.net/2/29/SR-map-Solstheim.jpg",
   SoulCairn:"https://elderscrolls.fandom.com/wiki/Special:Redirect/file/Soul%20Cairn%20Map%20Render%20(Skyrim).png"
 };
 bg.onload=()=>{if(world!==w)return;bg.style.display="block";fallback.style.display="none"};
 bg.onerror=()=>{if(world!==w)return;bg.style.display="none";fallback.style.display="block"};
 const url=images[w];
 if(bg.src!==url)bg.src=url;else if(bg.complete&&bg.naturalWidth>0){bg.style.display="block";fallback.style.display="none"}
 $("threeDLink").style.display=w==="SoulCairn"?"none":"";
 move();pins();
}
function pins(){
 const pane=$("pins");pane.replaceChildren();
 if(!selected){$("mapBubble").textContent="Noch kein Item ausgewählt · Klicke links auf ein Fundstück.";return}
 const p=pinMode==="start" ? (selected.start||selected.loc) : (selected.loc||selected.start);
 if(!p){$("mapBubble").textContent="Kein fester Fundort kartiert · Details rechts beachten.";return}
 if(p.world!==world){$("mapBubble").textContent="Fundort auf "+(p.world==="SoulCairn"?"Seelengrab":p.world)+" · Kartenreiter wechseln.";return}
 const b=document.createElement("button");b.className="pin "+(pinMode==="start"?"start":"find")+" selected";
 b.style.left=p.x+"%";b.style.top=p.y+"%";b.textContent="✦";b.title=(pinMode==="start"?"Queststart: ":"Fundort: ")+p.name;
 b.setAttribute("aria-label",b.title);b.onclick=e=>{e.stopPropagation();focus(pinMode)};pane.append(b);
 $("mapBubble").textContent=(pinMode==="start"?"Queststart":"Fundort")+" · "+p.name+" · Weltkartenposition näherungsweise";
}
function move(){$("scene").style.transform="translate("+dx+"px,"+dy+"px) scale("+scale+")"}
function clamp(){let r=$("mapframe").getBoundingClientRect();dx=Math.min(0,Math.max(r.width-r.width*scale,dx));dy=Math.min(0,Math.max(r.height-r.height*scale,dy))}
function zoom(k,x,y){let r=$("mapframe").getBoundingClientRect(),ox=scale,px=x??r.width/2,py=y??r.height/2;scale=Math.max(1,Math.min(5,scale*k));dx=px-(px-dx)*scale/ox;dy=py-(py-dy)*scale/ox;clamp();move()}
function focus(k){const p=k==="start"?selected?.start:selected?.loc;if(!p)return;if(world!==p.world)setWorld(p.world);let r=$("mapframe").getBoundingClientRect();scale=1.8;dx=r.width/2-r.width*p.x/100*scale;dy=r.height/2-r.height*p.y/100*scale;clamp();move()}
function bind(){for(const id of ["search","category","progress","srcFilter","hallFilter","mapFilter","sortFilter","questGroup","regionFilter"])$(id).addEventListener(id==="search"?"input":"change",filter);for(const [mode,id] of [["adventure","viewAdventure"],["collections","viewCollections"],["craft","viewCraft"]]){$(id).onclick=()=>{
 view=mode;
 for(const [m,b] of [["adventure","viewAdventure"],["collections","viewCollections"],["craft","viewCraft"]]){$(b).classList.toggle("active",m===view);$(b).setAttribute("aria-pressed",String(m===view))}
 $("questGroup").style.display=mode==="adventure"?"":"none";
 for(const opt of ["category","srcFilter","hallFilter","mapFilter","sortFilter","questGroup","progress","regionFilter"])$(opt).selectedIndex=0;
 $("search").value="";
 $("search").placeholder=mode==="craft"?"Rüstung oder Herstellungsgegenstand …":mode==="collections"?"Sammelreihe oder Ort suchen …":"Gegenstand, Quest, Ort suchen …";
 filter();
 }}

 $("more").onclick=()=>{page+=40;list()};$("worldSkyrim").onclick=()=>setWorld("Skyrim");$("worldSolstheim").onclick=()=>setWorld("Solstheim");$("worldSoulCairn").onclick=()=>setWorld("SoulCairn");$("zoomIn").onclick=()=>zoom(1.25);$("zoomOut").onclick=()=>zoom(.8);$("home").onclick=()=>{scale=1;dx=dy=0;move()};$("mapframe").addEventListener("wheel",e=>{e.preventDefault();let r=$("mapframe").getBoundingClientRect();zoom(e.deltaY<0?1.15:1/1.15,e.clientX-r.left,e.clientY-r.top)},{passive:false});$("mapframe").addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;drag={x:e.clientX,y:e.clientY,dx,dy};$("mapframe").setPointerCapture(e.pointerId)});$("mapframe").addEventListener("pointermove",e=>{if(!drag)return;dx=drag.dx+e.clientX-drag.x;dy=drag.dy+e.clientY-drag.y;clamp();move()});for(let t of ["pointerup","pointercancel","lostpointercapture"])$("mapframe").addEventListener(t,()=>drag=null);
$("export").onclick=()=>{let b=new Blob([JSON.stringify({version:2,completed:checks,date:new Date().toISOString()},null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="lotd-fortschritt.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1200)};$("import").onclick=()=>$("fileImport").click();$("fileImport").onchange=async e=>{let f=e.target.files?.[0];if(!f)return;try{let o=JSON.parse(await f.text());if(!o.completed||typeof o.completed!=="object")throw Error("Ungültiges Backup");if(confirm("Fortschritt aus Backup übernehmen?")){for(const i of all)if(Object.hasOwn(o.completed,i.id))checks[i.id]=!!o.completed[i.id];save();stats();filter();details()}}catch(err){alert(err.message)}e.target.value=""};$("reset").onclick=()=>{if(confirm("Alle Häkchen zurücksetzen?")){checks={};save();stats();filter();details()}}}
async function boot(){try{let arr=await Promise.all(Array.from({length:13},(_,k)=>fetch("data/hall-"+String(k+1).padStart(2,"0")+".json").then(r=>{if(!r.ok)throw Error("Daten "+(k+1));return r.json()})));
 let guides=await fetch("data/guides.json").then(r=>{if(!r.ok)throw Error("Zusatz-Sammelziele");return r.json()});
 // Optionale, quellbezogene Referenz-Orte; ein Fehler dort darf den Museumskatalog nicht blockieren.
 let atlas=await fetch("data/skyrim-places.json").then(r=>r.ok?r.json():{places:[]}).catch(()=>({places:[]}));
 if(Array.isArray(atlas.places)){
   const additional=atlas.places.filter(a=>Array.isArray(a)&&a.length===3&&typeof a[0]==="string"&&Number.isFinite(a[1])&&Number.isFinite(a[2])).map(a=>({name:a[0],world:"Skyrim",x:a[1],y:a[2],keys:[a[0]],approx:true,source:"SSEEdit MapMarker"}));
   P.unshift(...additional);
 }
 museumCount=arr.reduce((n,x)=>n+x.items.length,0);all=arr.flatMap(x=>x.items).map(o=>{const note=ITEM_NOTES[o.id];const item={...o,de:note?.de||NAMES[o.n]||"",p:note?.p||o.p,sourceUrl:note?.link||"",origin:source(o),type:type(o),start:questpoint(o.q),craftOnly:isCraftOnly(o),questGroup:questGroupOf(o)};item.loc=point(item.p);return {...item,region:regionOf(item)}});guideCount=guides.items.length;all.push(...guides.items.map(o=>({...o,origin:o.origin||source(o),type:o.type||type(o),loc:o.loc||point(o.p),start:o.start||questpoint(o.q),craftOnly:false,questGroup:questGroupOf(o),region:regionOf(o)})));opts("category",[...new Set(all.map(i=>i.type))].sort().map(x=>[x,x]),"Alle Arten");opts("questGroup",QUEST_GROUPS,"Questreihe wählen …");opts("srcFilter",[...new Set(all.map(i=>i.origin))].sort().map(x=>[x,x]),"Alle Inhalte");opts("hallFilter",HALLS.map((h,k)=>[String(k),h]),"Alle Museumshallen");bind();selected=null;$("edition").textContent=museumCount.toLocaleString("de-DE")+" Ausstellungsobjekte · "+guideCount+" zusätzliche Sammelziele";const mappedMuseum=all.slice(0,museumCount).filter(i=>i.loc).length;$("metaInfo").textContent="Kartierbar: "+mappedMuseum.toLocaleString("de-DE")+" von "+museumCount.toLocaleString("de-DE")+" Museumseinträgen · Marker teils näherungsweise; unklare / zufällige Fundorte bleiben offen.";setWorld("Skyrim");filter();details();stats()}catch(e){$("itemList").innerHTML='<div class="nothing">Katalog konnte nicht geladen werden. Bitte die GitHub-Pages-Adresse öffnen. '+esc(e.message)+'</div>'; $("edition").textContent="Ladefehler"}}
boot();
})();
