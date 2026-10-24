/* ÇİZİMLER: breadboard, Arduino Uno devresi, canlı sahneler (deniz feneri, tekne, robot, uçak), zaman çizelgesi */
(function(root){
var PINX={AREF:210,GND:234,13:258,12:282,11:306,10:330,9:354,8:378,7:414,6:438,5:462,4:486,3:510,2:534,1:558,0:582};
var PWM={11:1,10:1,9:1,6:1,5:1,3:1};
var RY={j:100,i:122,h:144,g:166,f:188,e:230,d:252,c:274,b:296,a:318};
var RAIL={tp:44,tm:64,bm:348,bp:368};
var ROWS_UP=['j','i','h','g','f'],ROWS_LO=['e','d','c','b','a'];
function bx(c){return 88+28*(c-1);}
var LEDC={
  red:{base:'#C62828',lit:'#FF8A80',glow:'#FF5252',vf:2.0,name:'kırmızı'},
  green:{base:'#2E7D32',lit:'#A5F5B8',glow:'#4CFF7A',vf:2.2,name:'yeşil'},
  white:{base:'#9FB0BA',lit:'#FFFFFF',glow:'#EAF6FF',vf:3.0,name:'beyaz'},
  yellow:{base:'#B58900',lit:'#FFF59D',glow:'#FFD54F',vf:2.1,name:'sarı'},
  blue:{base:'#1A56B8',lit:'#9CCBFF',glow:'#4DA3FF',vf:3.0,name:'mavi'}};
var WIRE=['#F97316','#22C55E','#FACC15','#A78BFA'];

function board(p,o){
  o=o||{};var s='<g>';
  s+='<rect x="52" y="20" width="884" height="372" rx="14" fill="#EFEADB" stroke="#B9B29B" stroke-width="2"/>';
  s+='<line x1="72" y1="34" x2="916" y2="34" stroke="#D32F2F" stroke-width="3"/><line x1="72" y1="76" x2="916" y2="76" stroke="#1E6BD6" stroke-width="3"/>';
  s+='<line x1="72" y1="337" x2="916" y2="337" stroke="#1E6BD6" stroke-width="3"/><line x1="72" y1="379" x2="916" y2="379" stroke="#D32F2F" stroke-width="3"/>';
  s+='<g font-family="Rubik,Arial,sans-serif" font-weight="700" font-size="15" text-anchor="middle"><text x="63" y="49" fill="#D32F2F">+</text><text x="63" y="69" fill="#1E6BD6">−</text><text x="63" y="353" fill="#1E6BD6">−</text><text x="63" y="373" fill="#D32F2F">+</text></g>';
  s+='<rect x="72" y="199" width="844" height="20" rx="4" fill="#DCD5C0"/>';
  s+='<text x="494" y="213" text-anchor="middle" font-family="Rubik,Arial,sans-serif" font-size="12" letter-spacing="3" fill="#8D8670">ÇUKUR (ORTA OLUK)</text>';
  s+='<g id="'+p+'-strips" style="display:none" fill="#9FB1C6">';
  for(var c=1;c<=30;c++){s+='<rect x="'+(bx(c)-2.5)+'" y="'+(RY.j-9)+'" width="5" height="106" rx="2"/><rect x="'+(bx(c)-2.5)+'" y="'+(RY.e-9)+'" width="5" height="106" rx="2"/>';}
  ['tp','tm','bm','bp'].forEach(function(k){s+='<rect x="82" y="'+(RAIL[k]-2.5)+'" width="824" height="5" rx="2"/>';});
  s+='</g>';
  var lt='font-family="JetBrains Mono,monospace" font-size="11" fill="#8D8670"';
  ROWS_UP.concat(ROWS_LO).forEach(function(r){s+='<text x="72" y="'+(RY[r]+4)+'" '+lt+' text-anchor="middle">'+r+'</text>';});
  for(c=1;c<=30;c++){if(c===1||c%5===0){s+='<text x="'+bx(c)+'" y="91" '+lt+' text-anchor="middle">'+c+'</text><text x="'+bx(c)+'" y="332" '+lt+' text-anchor="middle">'+c+'</text>';}}
  s+='<g id="'+p+'-holes">';
  for(c=1;c<=30;c++){
    ROWS_UP.concat(ROWS_LO).forEach(function(r){s+='<rect class="hole" data-k="m:'+c+':'+r+'" data-g="'+(ROWS_LO.indexOf(r)>=0?'L':'U')+c+'" x="'+(bx(c)-4.5)+'" y="'+(RY[r]-4.5)+'" width="9" height="9" rx="1.5"/>';});
    ['tp','tm','bm','bp'].forEach(function(k){s+='<rect class="hole" data-k="r:'+k+':'+c+'" data-g="'+k+'" x="'+(bx(c)-4.5)+'" y="'+(RAIL[k]-4.5)+'" width="9" height="9" rx="1.5"/>';});}
  s+='</g></g>';
  return s;}

function uno(p,used){
  var s='<g id="'+p+'-uno" font-family="Rubik,Arial,sans-serif">';
  s+='<rect x="100" y="430" width="520" height="235" rx="12" fill="#0E7C86" stroke="#0A5A62" stroke-width="3"/>';
  s+='<rect x="58" y="462" width="96" height="76" rx="4" fill="#C4CBD3" stroke="#8F99A5" stroke-width="2"/><rect x="70" y="476" width="70" height="48" fill="#9AA5B1"/>';
  s+='<rect x="58" y="575" width="86" height="64" rx="4" fill="#1B1F26"/>';
  s+='<rect x="198" y="436" width="200" height="22" rx="3" fill="#171B22"/><rect x="402" y="436" width="194" height="22" rx="3" fill="#171B22"/>';
  Object.keys(PINX).forEach(function(k){
    var px=PINX[k],isUsed=used&&used.indexOf(+k)>=0;
    s+='<rect x="'+(px-4)+'" y="441" width="8" height="12" fill="'+(isUsed?'#FFB74D':'#D9B34A')+'"/>';
    var lab=(PWM[k]?'~':'')+k;
    s+='<text x="'+px+'" y="474" font-size="11" text-anchor="middle" fill="'+(isUsed?'#FFE0B2':'#D5F3F6')+'" font-weight="'+(isUsed?700:400)+'">'+lab+'</text>';
    if(isUsed)s+='<rect x="'+(px-12)+'" y="432" width="24" height="96" rx="6" fill="none" stroke="#FFB74D" stroke-width="2" stroke-dasharray="4 3"/>';});
  s+='<rect x="300" y="560" width="200" height="46" rx="3" fill="#1D252E"/><text x="400" y="588" font-size="14" text-anchor="middle" fill="#9FB0BA" font-family="JetBrains Mono,monospace">ATmega328P</text>';
  s+='<circle cx="182" cy="520" r="14" fill="#C62828" stroke="#F5F5F5" stroke-width="3"/><text x="182" y="552" font-size="11" text-anchor="middle" fill="#D5F3F6">RESET</text>';
  s+='<text x="400" y="640" font-size="26" font-weight="700" text-anchor="middle" fill="#E8F7F8" letter-spacing="4">ARDUINO UNO</text>';
  s+='<text x="400" y="538" font-size="12" text-anchor="middle" fill="#BFE9ED" letter-spacing="2">DİJİTAL PİNLER · D0–D13</text>';
  s+='</g>';return s;}

function pinBubbles(p,pins){var s='';
  pins.forEach(function(pin){var px=PINX[pin];
    s+='<rect id="'+p+'-pv-'+pin+'" x="'+(px-12)+'" y="496" width="24" height="18" rx="4" fill="#2A3B50"/><text id="'+p+'-pt-'+pin+'" x="'+px+'" y="509" font-size="11" font-weight="700" text-anchor="middle" fill="#C8D3E0" font-family="JetBrains Mono,monospace">0V</text>';});
  return s;}

function wire(d,col,id){
  return '<g id="'+id+'"><path d="'+d.d+'" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="10" stroke-linecap="round"/><path d="'+d.d+'" fill="none" stroke="'+col+'" stroke-width="6" stroke-linecap="round"/>'
   +'<circle cx="'+d.x1+'" cy="'+d.y1+'" r="6" fill="'+col+'" stroke="rgba(0,0,0,.45)" stroke-width="2"/><circle cx="'+d.x2+'" cy="'+d.y2+'" r="6" fill="'+col+'" stroke="rgba(0,0,0,.45)" stroke-width="2"/></g>';}
function curve(x1,y1,x2,y2,k){k=k||395;return{d:'M'+x1+' '+y1+' C'+x1+' '+k+','+x2+' '+k+','+x2+' '+y2,x1:x1,y1:y1,x2:x2,y2:y2};}

function resistor(p,i,xa,xb,y,bands){
  var x1=xa+14,w=(xb-xa)-28,s='<g id="'+p+'-r'+i+'">';
  s+='<line x1="'+xa+'" y1="'+y+'" x2="'+xb+'" y2="'+y+'" stroke="#9AA5B1" stroke-width="4" stroke-linecap="round"/>';
  s+='<rect x="'+x1+'" y="'+(y-11)+'" width="'+w+'" height="22" rx="9" fill="#D9BC8C" stroke="#A98B58" stroke-width="2"/>';
  var pos=[.2,.34,.48,.8];
  bands.forEach(function(c,k){s+='<rect x="'+(x1+w*pos[k]-3)+'" y="'+(y-11)+'" width="6" height="22" fill="'+c+'"/>';});
  s+='</g>';return s;}

function led(p,i,xa,xc,color,labels,tag){
  var c=LEDC[color]||LEDC.red,xm=(xa+xc)/2,s='<g id="'+p+'-l'+i+'">';
  s+='<line x1="'+xa+'" y1="232" x2="'+xa+'" y2="176" stroke="#C9D1D9" stroke-width="4" stroke-linecap="round"/>';
  s+='<line x1="'+xc+'" y1="232" x2="'+xc+'" y2="192" stroke="#C9D1D9" stroke-width="4" stroke-linecap="round"/>';
  s+='<circle id="'+p+'-glow'+i+'" cx="'+xm+'" cy="164" r="86" fill="url(#'+p+'-gr'+i+')" opacity="0"/>';
  s+='<path d="M'+(xm-25)+' 192 V168 A25 25 0 0 1 '+(xm+25)+' 168 V192 Z" fill="'+c.base+'" stroke="rgba(0,0,0,.35)" stroke-width="2"/>';
  s+='<path id="'+p+'-lit'+i+'" d="M'+(xm-25)+' 192 V168 A25 25 0 0 1 '+(xm+25)+' 168 V192 Z" fill="'+c.lit+'" opacity="0"/>';
  s+='<path d="M'+(xm-17)+' 160 A18 18 0 0 1 '+(xm-3)+' 146" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4" stroke-linecap="round"/>';
  s+='<rect x="'+(xm-30)+'" y="190" width="60" height="8" rx="2" fill="'+c.base+'" stroke="rgba(0,0,0,.35)" stroke-width="2"/>';
  if(tag){var tw=tag.length*8.4+22;s+='<rect x="'+(xm-tw/2)+'" y="112" width="'+tw+'" height="24" rx="12" fill="#FFF8E6" stroke="#B9B29B"/><text x="'+xm+'" y="129" text-anchor="middle" font-family="Rubik,Arial" font-weight="600" font-size="14" fill="#14202E">'+tag+'</text>';}
  if(labels)s+='<text x="'+xa+'" y="214" text-anchor="middle" font-family="Rubik,Arial" font-weight="700" font-size="14" fill="#B71C1C">+</text><text x="'+xc+'" y="214" text-anchor="middle" font-family="Rubik,Arial" font-weight="700" font-size="14" fill="#1E4FA3">−</text>';
  s+='</g>';return s;}

/* cfg: {leds:[{pin,color}], labels:bool} */
function circuit(p,cfg){
  var leds=cfg.leds.slice().sort(function(a,b){return PINX[a.pin]-PINX[b.pin];});
  var starts=leds.length===1?[11]:leds.length===2?[8,17]:[6,14,22];
  var used=leds.map(function(l){return l.pin;});
  var s='<svg id="'+p+'-svg" viewBox="0 0 1000 680" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Arduino Uno ve breadboard devresi"><defs>';
  leds.forEach(function(l,i){var c=LEDC[l.color]||LEDC.red;
    s+='<radialGradient id="'+p+'-gr'+i+'"><stop offset="0" stop-color="'+c.glow+'" stop-opacity=".95"/><stop offset=".45" stop-color="'+c.glow+'" stop-opacity=".35"/><stop offset="1" stop-color="'+c.glow+'" stop-opacity="0"/></radialGradient>';});
  s+='</defs>'+board(p)+uno(p,used);
  s+=wire(curve(PINX.GND,447,bx(1),RAIL.bm,400),'#263238',p+'-gnd');
  leds.forEach(function(l,i){
    var cB=starts[i],cL=cB+4,xa=bx(cL),xc=bx(cL+1);
    s+=resistor(p,i,bx(cB),xa,RY.c,['#C62828','#C62828','#6D4C41','#C9A227']);
    s+=led(p,i,xa,xc,l.color,cfg.labels,l.tag);
    s+=wire({d:'M'+xc+' '+RY.d+' L'+xc+' '+RAIL.bm,x1:xc,y1:RY.d,x2:xc,y2:RAIL.bm},'#263238',p+'-k'+i);
    s+=wire(curve(PINX[l.pin],447,bx(cB),RY.a),WIRE[i%WIRE.length],p+'-w'+i);});
  s+=pinBubbles(p,used);
  s+='</svg>';
  return {svg:s,leds:leds};}

function setLevel(p,i,lv,pin){
  var g=document.getElementById(p+'-glow'+i),l=document.getElementById(p+'-lit'+i);
  if(g)g.setAttribute('opacity',(lv*0.95).toFixed(3));if(l)l.setAttribute('opacity',(lv*0.85).toFixed(3));
  var r=document.getElementById(p+'-pv-'+pin),t=document.getElementById(p+'-pt-'+pin);
  if(r&&t){var hi=lv>0.5;r.setAttribute('fill',hi?'#2E8540':'#2A3B50');t.textContent=hi?'5V':'0V';t.setAttribute('fill',hi?'#FFFFFF':'#C8D3E0');}}

/* ---- sahneler ---- */
function stars(n,seed,w,h){var s='',x=seed;for(var i=0;i<n;i++){x=(x*9301+49297)%233280;var a=x/233280;x=(x*9301+49297)%233280;var b=x/233280;
  s+='<circle cx="'+(a*w).toFixed(0)+'" cy="'+(b*h).toFixed(0)+'" r="'+(1+((i%3)*0.6)).toFixed(1)+'" fill="#FFFFFF" opacity="'+(0.35+(i%4)*0.15).toFixed(2)+'"/>';}return s;}
var SC={};
SC.lighthouse=function(p,map){
  var s='<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Deniz feneri"><defs><linearGradient id="'+p+'-sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#07142B"/><stop offset="1" stop-color="#1D3A63"/></linearGradient>'
   +'<radialGradient id="'+p+'-lg"><stop offset="0" stop-color="#FFF3B0" stop-opacity="1"/><stop offset="1" stop-color="#FFF3B0" stop-opacity="0"/></radialGradient></defs>';
  s+='<rect width="640" height="300" fill="url(#'+p+'-sk)"/>'+stars(36,7,640,190);
  s+='<circle cx="560" cy="52" r="20" fill="#F4F1DE"/><circle cx="552" cy="46" r="20" fill="#0B1B36"/>';
  s+='<polygon id="'+p+'-bl" points="320,85 -40,35 -40,135" fill="#FFF3B0" opacity="0"/><polygon id="'+p+'-br" points="320,85 680,35 680,135" fill="#FFF3B0" opacity="0"/>';
  s+='<rect y="215" width="640" height="85" fill="#10365C"/>';
  s+='<g class="wv"><path d="M0 232 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#2E5F91" stroke-width="3"/><path d="M0 262 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#2E5F91" stroke-width="3" opacity=".7"/></g>';
  s+='<path d="M230 222 Q320 190 410 222 L430 238 L210 238 Z" fill="#3B3F4A"/>';
  s+='<polygon points="293,205 347,205 337,112 303,112" fill="#F5F5F5"/><polygon points="299,160 341,160 339,142 301,142" fill="#C62828"/><polygon points="296,190 344,190 342,172 298,172" fill="#C62828"/>';
  s+='<rect x="296" y="100" width="48" height="12" fill="#37474F"/><rect x="304" y="72" width="32" height="28" fill="#5B6B78"/>';
  s+='<rect id="'+p+'-lamp" x="308" y="76" width="24" height="20" fill="#FFF3B0" opacity=".12"/><polygon points="300,72 340,72 320,52" fill="#C62828"/>';
  s+='<circle id="'+p+'-lg2" cx="320" cy="86" r="70" fill="url(#'+p+'-lg)" opacity="0"/>';
  s+='<text x="24" y="284" font-family="Rubik,Arial" font-size="18" fill="#9FC4E8">Liman girişi · LED: D'+map.lamp+'</text></svg>';
  return{svg:s,update:function(lv){var l=lv[map.lamp]||0;
    document.getElementById(p+'-bl').setAttribute('opacity',(l*0.5).toFixed(3));document.getElementById(p+'-br').setAttribute('opacity',(l*0.5).toFixed(3));
    document.getElementById(p+'-lamp').setAttribute('opacity',(0.12+0.88*l).toFixed(3));document.getElementById(p+'-lg2').setAttribute('opacity',l.toFixed(3));}};};

SC.boat=function(p,map){
  var s='<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mors ile SOS veren tekne"><defs><linearGradient id="'+p+'-sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050D1F"/><stop offset="1" stop-color="#15294A"/></linearGradient>'
   +'<radialGradient id="'+p+'-lg"><stop offset="0" stop-color="#FFE9A8" stop-opacity="1"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/></radialGradient></defs>';
  s+='<rect width="640" height="300" fill="url(#'+p+'-sk)"/>'+stars(30,21,640,130);
  s+='<rect y="128" width="640" height="60" fill="#0D2A4D"/>';
  s+='<g class="wv"><path d="M0 150 q20 -9 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#2E5F91" stroke-width="3"/></g>';
  s+='<g transform="translate(320,0)"><polygon points="-110,118 110,118 82,148 -82,148" fill="#7A2E18"/><rect x="-60" y="96" width="70" height="22" fill="#ECEFF1"/><rect x="-46" y="102" width="12" height="10" fill="#37474F"/><rect x="-26" y="102" width="12" height="10" fill="#37474F"/>';
  s+='<rect x="40" y="40" width="5" height="78" fill="#90A4AE"/><circle id="'+p+'-lg2" cx="42" cy="36" r="66" fill="url(#'+p+'-lg)" opacity="0"/><circle id="'+p+'-lamp" cx="42" cy="36" r="9" fill="#FFE9A8" opacity=".2" stroke="#ECEFF1" stroke-width="3"/></g>';
  s+='<rect y="188" width="640" height="112" fill="#0A1A33"/>';
  s+='<text x="320" y="214" text-anchor="middle" font-family="Rubik,Arial" font-size="17" letter-spacing="3" fill="#7FA3CC">MORS BANDI</text>';
  s+='<g id="'+p+'-tape"></g><text id="'+p+'-dec" x="320" y="286" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="38" font-weight="700" fill="#FFE9A8" letter-spacing="10"></text></svg>';
  var sym=[],startT=null,lastEnd=-1e9;
  function draw(){var g=document.getElementById(p+'-tape');if(!g)return;var h='',n=sym.length,x0=320-(n*36)/2+18;
    sym.forEach(function(v,i){var x=x0+i*36;h+=v==='.'?'<circle cx="'+x+'" cy="238" r="8" fill="#FFE9A8"/>':'<rect x="'+(x-15)+'" y="231" width="30" height="14" rx="5" fill="#FFE9A8"/>';});
    g.innerHTML=h;
    var d='',ch='';for(var i=0;i<n;i+=3){var grp=sym.slice(i,i+3).join('');ch=grp==='...'?'S':grp==='---'?'O':(grp.length<3?'':'?');d+=ch;}
    var dd=document.getElementById(p+'-dec');if(dd)dd.textContent=d;}
  return{svg:s,reset:function(){sym=[];startT=null;lastEnd=-1e9;draw();},
    update:function(lv){var l=lv[map.lamp]||0;
      document.getElementById(p+'-lamp').setAttribute('opacity',(0.2+0.8*l).toFixed(3));document.getElementById(p+'-lg2').setAttribute('opacity',l.toFixed(3));},
    edge:function(pin,nl,t,old){if(pin!==map.lamp)return;
      if(nl>0.5&&old<=0.5){startT=t;if(t-lastEnd>1500&&sym.length)sym=[];}
      else if(nl<=0.5&&old>0.5&&startT!==null){var d=t-startT;sym.push(d<400?'.':'-');lastEnd=t;startT=null;if(sym.length>9)sym.shift();draw();}}};};

SC.robot=function(p,map){
  var s='<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Robot yüzü"><defs><radialGradient id="'+p+'-eg"><stop offset="0" stop-color="#7DF9FF" stop-opacity="1"/><stop offset="1" stop-color="#7DF9FF" stop-opacity="0"/></radialGradient></defs>';
  s+='<rect width="640" height="300" fill="#0E1B2B"/>';
  s+='<line x1="320" y1="14" x2="320" y2="52" stroke="#93A3B8" stroke-width="6"/><circle cx="320" cy="14" r="10" fill="#FF9F5A"/>';
  s+='<rect x="130" y="52" width="380" height="210" rx="40" fill="#C9D3DE" stroke="#8FA0B3" stroke-width="6"/><rect x="108" y="124" width="22" height="66" rx="8" fill="#8FA0B3"/><rect x="510" y="124" width="22" height="66" rx="8" fill="#8FA0B3"/>';
  s+='<rect x="158" y="80" width="324" height="130" rx="26" fill="#10233A"/>';
  [['L',230],['R',410]].forEach(function(e){
    s+='<circle id="'+p+'-eg'+e[0]+'" cx="'+e[1]+'" cy="145" r="62" fill="url(#'+p+'-eg)" opacity="0"/><circle cx="'+e[1]+'" cy="145" r="36" fill="#1B3A57"/><circle id="'+p+'-ey'+e[0]+'" cx="'+e[1]+'" cy="145" r="36" fill="#7DF9FF" opacity="0"/><circle cx="'+e[1]+'" cy="145" r="12" fill="#0E1B2B"/>';});
  s+='<rect x="270" y="228" width="100" height="10" rx="5" fill="#6F8197"/>';
  s+='<text x="230" y="288" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="18" fill="#9FB0BA">sol göz · D'+map.L+'</text><text x="410" y="288" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="18" fill="#9FB0BA">sağ göz · D'+map.R+'</text></svg>';
  return{svg:s,update:function(lv){['L','R'].forEach(function(k){var l=lv[map[k]]||0;
    document.getElementById(p+'-ey'+k).setAttribute('opacity',l.toFixed(3));document.getElementById(p+'-eg'+k).setAttribute('opacity',l.toFixed(3));});}};};

SC.plane=function(p,map){
  var s='<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Uçak navigasyon ışıkları"><defs>'
   +'<radialGradient id="'+p+'-gR"><stop offset="0" stop-color="#FF5252" stop-opacity="1"/><stop offset="1" stop-color="#FF5252" stop-opacity="0"/></radialGradient>'
   +'<radialGradient id="'+p+'-gG"><stop offset="0" stop-color="#4CFF7A" stop-opacity="1"/><stop offset="1" stop-color="#4CFF7A" stop-opacity="0"/></radialGradient>'
   +'<radialGradient id="'+p+'-gW"><stop offset="0" stop-color="#FFFFFF" stop-opacity="1"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient></defs>';
  s+='<rect width="640" height="300" fill="#07101F"/>'+stars(40,3,640,300);
  s+='<g transform="translate(320,150)"><path d="M-240 20 L-10 -30 L-10 -60 L10 -60 L10 -30 L240 20 L240 44 L10 18 L10 76 L56 108 L56 124 L0 112 L-56 124 L-56 108 L-10 76 L-10 18 L-240 44 Z" fill="#B7C3CF" stroke="#6F8197" stroke-width="3"/>';
  s+='<ellipse cx="0" cy="-6" rx="18" ry="86" fill="#D3DCE5" stroke="#8FA0B3" stroke-width="3"/><path d="M-10 -78 Q0 -104 10 -78 Z" fill="#6F8197"/>';
  s+='<circle id="'+p+'-gL" cx="-240" cy="32" r="52" fill="url(#'+p+'-gR)" opacity="0"/><circle id="'+p+'-L" cx="-240" cy="32" r="10" fill="#FF5252" opacity=".25"/>';
  s+='<circle id="'+p+'-gRr" cx="240" cy="32" r="52" fill="url(#'+p+'-gG)" opacity="0"/><circle id="'+p+'-R" cx="240" cy="32" r="10" fill="#4CFF7A" opacity=".25"/>';
  s+='<circle id="'+p+'-gS" cx="0" cy="100" r="64" fill="url(#'+p+'-gW)" opacity="0"/><circle id="'+p+'-S" cx="0" cy="100" r="9" fill="#FFFFFF" opacity=".2"/></g>';
  s+='<text x="12" y="290" font-family="JetBrains Mono,monospace" font-size="17" fill="#9FB0BA">sol kanat D'+map.L+' · sağ kanat D'+map.R+' · çakar D'+map.S+'</text></svg>';
  return{svg:s,update:function(lv){
    function set(id,g,l){document.getElementById(p+'-'+id).setAttribute('opacity',(0.25+0.75*l).toFixed(3));document.getElementById(p+'-'+g).setAttribute('opacity',l.toFixed(3));}
    set('L','gL',lv[map.L]||0);set('R','gRr',lv[map.R]||0);set('S','gS',lv[map.S]||0);}};};

/* ---- zaman çizelgesi ---- */
function timelineSvg(p,rows,w){
  var h=rows.length*52+22,s='<svg id="'+p+'-tls" viewBox="0 0 '+w+' '+h+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pin zaman çizelgesi" style="width:100%;height:auto">';
  s+='<rect width="'+w+'" height="'+h+'" rx="12" fill="#0B121B"/>';
  rows.forEach(function(r,i){var y=10+i*52;
    s+='<text x="12" y="'+(y+30)+'" font-family="JetBrains Mono,monospace" font-size="18" font-weight="700" fill="'+r.col+'">D'+r.pin+'</text>';
    s+='<line x1="62" y1="'+(y+4)+'" x2="'+(w-10)+'" y2="'+(y+4)+'" stroke="#1F2E40" stroke-dasharray="3 5"/><line x1="62" y1="'+(y+40)+'" x2="'+(w-10)+'" y2="'+(y+40)+'" stroke="#1F2E40"/>';
    s+='<path id="'+p+'-tl'+i+'" d="" fill="none" stroke="'+r.col+'" stroke-width="3" stroke-linejoin="round"/>';});
  s+='<text x="62" y="'+(h-4)+'" font-family="Rubik,Arial" font-size="13" fill="#6B7C90">geçmiş</text><text x="'+(w-10)+'" y="'+(h-4)+'" text-anchor="end" font-family="Rubik,Arial" font-size="13" fill="#6B7C90">şimdi</text>';
  s+='<line x1="'+(w-10)+'" y1="4" x2="'+(w-10)+'" y2="'+(h-16)+'" stroke="#FF9F5A" stroke-width="2"/></svg>';
  return s;}
function timelineDraw(p,rows,rt,w,win){
  var x0=62,x1=w-10,span=x1-x0,t0=rt.t-win;
  rows.forEach(function(r,i){var y=10+i*52,top=y+4,bot=y+40,h=rt.hist[r.pin];
    var el=document.getElementById(p+'-tl'+i);if(!el)return;
    if(!h){el.setAttribute('d','M'+x0+' '+bot+' L'+x1+' '+bot);return;}
    function X(t){return x0+Math.max(0,(t-t0))/win*span;}
    function Y(l){return bot-(bot-top)*l;}
    var i0=0;for(var k=0;k<h.length;k++){if(h[k][0]<=t0)i0=k;}
    var d='M'+x0+' '+Y(h[i0][1]).toFixed(1),last=h[i0][1];
    for(k=i0+1;k<h.length;k++){if(h[k][0]>rt.t)break;var xx=X(h[k][0]).toFixed(1);d+=' L'+xx+' '+Y(last).toFixed(1)+' L'+xx+' '+Y(h[k][1]).toFixed(1);last=h[k][1];}
    d+=' L'+x1+' '+Y(last).toFixed(1);el.setAttribute('d',d);});}

root.Ckt={PINX:PINX,RY:RY,RAIL:RAIL,bx:bx,LEDC:LEDC,board:board,circuit:circuit,setLevel:setLevel,scenes:SC,timelineSvg:timelineSvg,timelineDraw:timelineDraw,stars:stars,ROWS_UP:ROWS_UP,ROWS_LO:ROWS_LO};
})(window);
