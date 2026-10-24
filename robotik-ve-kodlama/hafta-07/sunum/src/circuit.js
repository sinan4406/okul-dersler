/* ÇİZİMLER: breadboard (30 veya 42 sütun), Arduino Uno devresi (1–7 LED), canlı sahneler (kalp monitörü, ambulans, şarj göstergesi, robot tarayıcı), zaman çizelgesi */
(function(root){
var PINX={AREF:210,GND:234,13:258,12:282,11:306,10:330,9:354,8:378,7:414,6:438,5:462,4:486,3:510,2:534,1:558,0:582};
var PWM={11:1,10:1,9:1,6:1,5:1,3:1};
var RY={j:100,i:122,h:144,g:166,f:188,e:230,d:252,c:274,b:296,a:318};
var RAIL={tp:44,tm:64,bm:348,bp:368};
var ROWS_UP=['j','i','h','g','f'],ROWS_LO=['e','d','c','b','a'];
function bx(c,pt){return 88+(pt||28)*(c-1);}
function Ckt_bx(c,pt){return bx(c,pt);}
var LEDC={
  red:{base:'#C62828',lit:'#FF8A80',glow:'#FF5252',vf:2.0,name:'kırmızı'},
  green:{base:'#2E7D32',lit:'#A5F5B8',glow:'#4CFF7A',vf:2.2,name:'yeşil'},
  white:{base:'#9FB0BA',lit:'#FFFFFF',glow:'#EAF6FF',vf:3.0,name:'beyaz'},
  yellow:{base:'#B58900',lit:'#FFF59D',glow:'#FFD54F',vf:2.1,name:'sarı'},
  blue:{base:'#1A56B8',lit:'#9CCBFF',glow:'#4DA3FF',vf:3.0,name:'mavi'}};
var WIRE=['#F97316','#22C55E','#FACC15','#A78BFA','#06B6D4','#EC4899','#94A3B8'];

function board(p,o){
  o=o||{};var PT=o.pitch||28,NC=o.cols||30;function bx(c){return Ckt_bx(c,PT);}
  var s='<g>';
  s+='<rect x="52" y="20" width="884" height="372" rx="14" fill="#EFEADB" stroke="#B9B29B" stroke-width="2"/>';
  s+='<line x1="72" y1="34" x2="916" y2="34" stroke="#D32F2F" stroke-width="3"/><line x1="72" y1="76" x2="916" y2="76" stroke="#1E6BD6" stroke-width="3"/>';
  s+='<line x1="72" y1="337" x2="916" y2="337" stroke="#1E6BD6" stroke-width="3"/><line x1="72" y1="379" x2="916" y2="379" stroke="#D32F2F" stroke-width="3"/>';
  s+='<g font-family="Rubik,Arial,sans-serif" font-weight="700" font-size="15" text-anchor="middle"><text x="63" y="49" fill="#D32F2F">+</text><text x="63" y="69" fill="#1E6BD6">−</text><text x="63" y="353" fill="#1E6BD6">−</text><text x="63" y="373" fill="#D32F2F">+</text></g>';
  s+='<rect x="72" y="199" width="844" height="20" rx="4" fill="#DCD5C0"/>';
  s+='<text x="494" y="213" text-anchor="middle" font-family="Rubik,Arial,sans-serif" font-size="12" letter-spacing="3" fill="#8D8670">ÇUKUR (ORTA OLUK)</text>';
  s+='<g id="'+p+'-strips" style="display:none" fill="#9FB1C6">';
  for(var c=1;c<=NC;c++){s+='<rect x="'+(bx(c)-2.5)+'" y="'+(RY.j-9)+'" width="5" height="106" rx="2"/><rect x="'+(bx(c)-2.5)+'" y="'+(RY.e-9)+'" width="5" height="106" rx="2"/>';}
  ['tp','tm','bm','bp'].forEach(function(k){s+='<rect x="82" y="'+(RAIL[k]-2.5)+'" width="824" height="5" rx="2"/>';});
  s+='</g>';
  var lt='font-family="JetBrains Mono,monospace" font-size="11" fill="#8D8670"';
  ROWS_UP.concat(ROWS_LO).forEach(function(r){s+='<text x="72" y="'+(RY[r]+4)+'" '+lt+' text-anchor="middle">'+r+'</text>';});
  for(c=1;c<=NC;c++){if(c===1||c%5===0){s+='<text x="'+bx(c)+'" y="91" '+lt+' text-anchor="middle">'+c+'</text><text x="'+bx(c)+'" y="332" '+lt+' text-anchor="middle">'+c+'</text>';}}
  s+='<g id="'+p+'-holes">';
  for(c=1;c<=NC;c++){
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
  var n=leds.length,PT=n>=6?20:28,NC=n>=6?42:30;
  function bx(c){return Ckt_bx(c,PT);}
  var starts=n===1?[11]:n===2?[8,17]:n===3?[6,14,22]:leds.map(function(l,i){return 1+6*i;});
  var used=leds.map(function(l){return l.pin;});
  var s='<svg id="'+p+'-svg" viewBox="0 0 1000 680" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Arduino Uno ve breadboard devresi"><defs>';
  leds.forEach(function(l,i){var c=LEDC[l.color]||LEDC.red;
    s+='<radialGradient id="'+p+'-gr'+i+'"><stop offset="0" stop-color="'+c.glow+'" stop-opacity=".95"/><stop offset=".45" stop-color="'+c.glow+'" stop-opacity=".35"/><stop offset="1" stop-color="'+c.glow+'" stop-opacity="0"/></radialGradient>';});
  s+='</defs>'+board(p,{pitch:PT,cols:NC})+uno(p,used);
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
SC.ecg=function(p,map){
  var N=150,samples=[],sm=0;
  var s='<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kalp monitörü"><defs><radialGradient id="'+p+'-hg"><stop offset="0" stop-color="#FF5A6E" stop-opacity="1"/><stop offset="1" stop-color="#FF5A6E" stop-opacity="0"/></radialGradient></defs>';
  s+='<rect width="640" height="300" fill="#07131F"/>';
  for(var gx=0;gx<=640;gx+=40)s+='<line x1="'+gx+'" y1="0" x2="'+gx+'" y2="300" stroke="#0F2A3F" stroke-width="1"/>';
  for(var gy=0;gy<=300;gy+=40)s+='<line x1="0" y1="'+gy+'" x2="640" y2="'+gy+'" stroke="#0F2A3F" stroke-width="1"/>';
  s+='<circle id="'+p+'-hglow" cx="150" cy="95" r="120" fill="url(#'+p+'-hg)" opacity="0"/>';
  s+='<g id="'+p+'-heart" transform="translate(150,95)"><path d="M0 52 C-70 0 -62 -58 -26 -58 C-10 -58 0 -46 0 -36 C0 -46 10 -58 26 -58 C62 -58 70 0 0 52 Z" fill="#7A1B2B" stroke="#FF8A9A" stroke-width="3"/><path id="'+p+'-hlit" d="M0 52 C-70 0 -62 -58 -26 -58 C-10 -58 0 -46 0 -36 C0 -46 10 -58 26 -58 C62 -58 70 0 0 52 Z" fill="#FF4D63" opacity="0"/></g>';
  s+='<text x="300" y="60" font-family="JetBrains Mono,monospace" font-size="22" fill="#6CB6FF">EKG · D'+map.heart+'</text>';
  s+='<text x="300" y="108" font-family="JetBrains Mono,monospace" font-size="44" font-weight="700" fill="#9BE38B">♥ 72</text><text x="430" y="108" font-family="Rubik,Arial" font-size="20" fill="#93A3B8">atım / dk</text>';
  s+='<path id="'+p+'-tr" d="" fill="none" stroke="#9BE38B" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>';
  s+='<text x="20" y="288" font-family="Rubik,Arial" font-size="16" fill="#5B7894">Kızılay Haftası · ilk yardım monitörü</text></svg>';
  function draw(){var d='',n=samples.length;
    for(var i=0;i<n;i++){var x=630-(n-i)*(620/N),y=235-samples[i]*84;d+=(i?' L':'M')+x.toFixed(1)+' '+y.toFixed(1);}
    var t=document.getElementById(p+'-tr');if(t)t.setAttribute('d',d);}
  return{svg:s,reset:function(){samples=[];sm=0;draw();},
    update:function(lv){var l=lv[map.heart]||0;sm=sm*0.6+l*0.4;samples.push(sm);if(samples.length>N)samples.shift();
      var h=document.getElementById(p+'-heart'),gl=document.getElementById(p+'-hglow'),hl=document.getElementById(p+'-hlit');
      if(h)h.setAttribute('transform','translate(150,95) scale('+(1+0.14*l).toFixed(3)+')');
      if(gl)gl.setAttribute('opacity',l.toFixed(3));if(hl)hl.setAttribute('opacity',l.toFixed(3));draw();}};};

SC.ambulance=function(p,map){
  var s='<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ambulans çakar ışıkları"><defs>'
   +'<radialGradient id="'+p+'-gR"><stop offset="0" stop-color="#FF4D4D" stop-opacity="1"/><stop offset="1" stop-color="#FF4D4D" stop-opacity="0"/></radialGradient>'
   +'<radialGradient id="'+p+'-gB"><stop offset="0" stop-color="#4DA3FF" stop-opacity="1"/><stop offset="1" stop-color="#4DA3FF" stop-opacity="0"/></radialGradient></defs>';
  s+='<rect width="640" height="300" fill="#0B1220"/>';
  s+='<circle id="'+p+'-wB" cx="130" cy="150" r="220" fill="url(#'+p+'-gB)" opacity="0"/><circle id="'+p+'-wR" cx="510" cy="150" r="220" fill="url(#'+p+'-gR)" opacity="0"/>';
  s+='<rect y="236" width="640" height="64" fill="#1A2230"/><g fill="#C9D1D9"><rect x="40" y="266" width="70" height="8"/><rect x="190" y="266" width="70" height="8"/><rect x="380" y="266" width="70" height="8"/><rect x="530" y="266" width="70" height="8"/></g>';
  s+='<g transform="translate(320,0)"><rect x="-130" y="96" width="260" height="130" rx="22" fill="#F3F5F7" stroke="#B6C0CC" stroke-width="3"/>';
  s+='<rect x="-130" y="176" width="260" height="20" fill="#D32F2F"/><path d="M20 112 H46 V138 H72 V160 H46 V186 H20 V160 H-6 V138 H20 Z" fill="#D32F2F" transform="translate(20,-10) scale(0.8)"/>';
  s+='<rect x="-108" y="108" width="62" height="46" rx="8" fill="#9BC4E8"/><circle cx="-84" cy="228" r="22" fill="#263238"/><circle cx="84" cy="228" r="22" fill="#263238"/><circle cx="-84" cy="228" r="9" fill="#90A4AE"/><circle cx="84" cy="228" r="9" fill="#90A4AE"/>';
  s+='<rect x="-70" y="74" width="140" height="22" rx="6" fill="#37474F"/>';
  s+='<circle id="'+p+'-lB" cx="-40" cy="85" r="16" fill="#4DA3FF" opacity=".2" stroke="#ECEFF1" stroke-width="3"/><circle id="'+p+'-lR" cx="40" cy="85" r="16" fill="#FF4D4D" opacity=".2" stroke="#ECEFF1" stroke-width="3"/></g>';
  s+='<text x="12" y="24" font-family="JetBrains Mono,monospace" font-size="17" fill="#8FA6C4">mavi D'+map.B+' · kırmızı D'+map.R+'</text></svg>';
  return{svg:s,update:function(lv){var b=lv[map.B]||0,r=lv[map.R]||0;
    function set(id,v,a,k){var e=document.getElementById(p+'-'+id);if(e)e.setAttribute('opacity',(a+k*v).toFixed(3));}
    set('lB',b,.2,.8);set('lR',r,.2,.8);set('wB',b,0,.55);set('wR',r,0,.55);}};};

SC.battery=function(p,map){
  var cols=['#E53935','#FFB300','#FFB300','#43A047','#43A047'];
  var s='<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Şarj göstergesi"><rect width="640" height="300" fill="#0E1B2B"/>';
  s+='<rect x="90" y="70" width="420" height="150" rx="22" fill="#16253A" stroke="#93A3B8" stroke-width="6"/><rect x="510" y="115" width="32" height="60" rx="8" fill="#93A3B8"/>';
  for(var i=0;i<5;i++){var x=110+i*80;
    s+='<rect x="'+x+'" y="90" width="68" height="110" rx="10" fill="#1F2E40"/><rect id="'+p+'-b'+i+'" x="'+x+'" y="90" width="68" height="110" rx="10" fill="'+cols[i]+'" opacity=".12"/>';
    s+='<text x="'+(x+34)+'" y="250" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="17" fill="#9FB0BA">D'+map.pins[i]+'</text>';}
  s+='<text id="'+p+'-pct" x="320" y="48" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="34" font-weight="700" fill="#F6F4EE">% 0</text>';
  s+='<path d="M590 130 L560 175 H582 L572 210 L606 160 H584 Z" fill="#FFD54F" opacity=".9"/></svg>';
  return{svg:s,update:function(lv){var n=0;
    for(var i=0;i<5;i++){var l=lv[map.pins[i]]||0;if(l>0.5)n++;var e=document.getElementById(p+'-b'+i);if(e)e.setAttribute('opacity',(0.12+0.88*l).toFixed(3));}
    var t=document.getElementById(p+'-pct');if(t)t.textContent='% '+(n*20);}};};

SC.visor=function(p,map){
  var n=map.pins.length,trail=[],i;for(i=0;i<n;i++)trail.push(0);
  var s='<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Robot tarayıcı ışığı"><defs><radialGradient id="'+p+'-g"><stop offset="0" stop-color="#FF5252" stop-opacity="1"/><stop offset="1" stop-color="#FF5252" stop-opacity="0"/></radialGradient></defs>';
  s+='<rect width="640" height="300" fill="#0B121B"/>';
  s+='<line x1="320" y1="10" x2="320" y2="46" stroke="#93A3B8" stroke-width="6"/><circle cx="320" cy="12" r="9" fill="#FF9F5A"/>';
  s+='<rect x="60" y="46" width="520" height="210" rx="46" fill="#C9D3DE" stroke="#8FA0B3" stroke-width="6"/><rect x="38" y="120" width="22" height="64" rx="8" fill="#8FA0B3"/><rect x="580" y="120" width="22" height="64" rx="8" fill="#8FA0B3"/>';
  s+='<rect x="90" y="96" width="460" height="96" rx="40" fill="#10151C"/>';
  for(i=0;i<n;i++){var cx=130+i*(380/(n-1));
    s+='<circle id="'+p+'-g'+i+'" cx="'+cx+'" cy="144" r="46" fill="url(#'+p+'-g)" opacity="0"/><circle cx="'+cx+'" cy="144" r="18" fill="#3A1414"/><circle id="'+p+'-c'+i+'" cx="'+cx+'" cy="144" r="18" fill="#FF6B6B" opacity="0"/>';
    s+='<text x="'+cx+'" y="228" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="16" fill="#52606F">D'+map.pins[i]+'</text>';}
  s+='<text x="320" y="285" text-anchor="middle" font-family="Rubik,Arial" font-size="17" fill="#6B7C90">güvenlik robotu · tarayıcı çubuğu</text></svg>';
  return{svg:s,reset:function(){for(var k=0;k<n;k++)trail[k]=0;},
    update:function(lv){for(var k=0;k<n;k++){var l=lv[map.pins[k]]||0;trail[k]=Math.max(l,trail[k]*0.82);
      var c=document.getElementById(p+'-c'+k),g=document.getElementById(p+'-g'+k);
      if(c)c.setAttribute('opacity',trail[k].toFixed(3));if(g)g.setAttribute('opacity',(trail[k]*0.9).toFixed(3));}}};};

/* ---- zaman çizelgesi ---- */
function timelineSvg(p,rows,w,rh){
  rh=rh||52;var h=rows.length*rh+22,s='<svg id="'+p+'-tls" viewBox="0 0 '+w+' '+h+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pin zaman çizelgesi" style="width:100%;height:auto">';
  s+='<rect width="'+w+'" height="'+h+'" rx="12" fill="#0B121B"/>';
  rows.forEach(function(r,i){var y=10+i*rh;
    s+='<text x="12" y="'+(y+Math.round(rh/2)+5)+'" font-family="JetBrains Mono,monospace" font-size="18" font-weight="700" fill="'+r.col+'">D'+r.pin+'</text>';
    s+='<line x1="62" y1="'+(y+4)+'" x2="'+(w-10)+'" y2="'+(y+4)+'" stroke="#1F2E40" stroke-dasharray="3 5"/><line x1="62" y1="'+(y+rh-12)+'" x2="'+(w-10)+'" y2="'+(y+rh-12)+'" stroke="#1F2E40"/>';
    s+='<path id="'+p+'-tl'+i+'" d="" fill="none" stroke="'+r.col+'" stroke-width="3" stroke-linejoin="round"/>';});
  s+='<text x="62" y="'+(h-4)+'" font-family="Rubik,Arial" font-size="13" fill="#6B7C90">geçmiş</text><text x="'+(w-10)+'" y="'+(h-4)+'" text-anchor="end" font-family="Rubik,Arial" font-size="13" fill="#6B7C90">şimdi</text>';
  s+='<line x1="'+(w-10)+'" y1="4" x2="'+(w-10)+'" y2="'+(h-16)+'" stroke="#FF9F5A" stroke-width="2"/></svg>';
  return s;}
function timelineDraw(p,rows,rt,w,win,rh){
  rh=rh||52;var x0=62,x1=w-10,span=x1-x0,t0=rt.t-win;
  rows.forEach(function(r,i){var y=10+i*rh,top=y+4,bot=y+rh-12,h=rt.hist[r.pin];
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
