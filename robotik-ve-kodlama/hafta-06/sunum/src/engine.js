/* MOTOR: Arduino'nun bu haftaki alt kümesi (setup, loop, pinMode, digitalWrite, delay) için mini derleyici ve sanal zamanlı çalıştırıcı */
(function(root){
var FN={pinMode:2,digitalWrite:2,delay:1};
var CONST={OUTPUT:1,INPUT:1,HIGH:1,LOW:1};
var KNOWN=Object.keys(FN).concat(Object.keys(CONST),['void','setup','loop']);

function strip(src){var out='',i=0,n=src.length;
  while(i<n){var c=src[i],d=src[i+1];
    if(c==='/'&&d==='/'){while(i<n&&src[i]!=='\n'){out+=' ';i++;}}
    else if(c==='/'&&d==='*'){out+='  ';i+=2;while(i<n&&!(src[i]==='*'&&src[i+1]==='/')){out+=src[i]==='\n'?'\n':' ';i++;}if(i<n){out+='  ';i+=2;}}
    else{out+=c;i++;}}
  return out;}
function lineAt(s,idx){var n=1;for(var i=0;i<idx&&i<s.length;i++)if(s[i]==='\n')n++;return n;}
function blank(s,a,b){var o='';for(var i=a;i<b;i++)o+=(s[i]==='\n'?'\n':' ');return s.slice(0,a)+o+s.slice(b);}

function compile(src){
  var errs=[],warns=[],s=strip(src);
  function err(line,msg){errs.push({line:line,msg:msg});}
  /* parantez dengesi */
  var st=[];
  for(var i=0;i<s.length;i++){var c=s[i];
    if(c==='('||c==='{')st.push({c:c,i:i});
    else if(c===')'||c==='}'){var want=c===')'?'(':'{',o=st[st.length-1];
      if(!o||o.c!==want){err(lineAt(s,i),"expected "+(o&&o.c==='('?"')'":"'}'")+" before '"+c+"' token");return{errors:errs,warnings:warns};}
      st.pop();}}
  if(st.length){var o2=st[st.length-1];
    if(o2.c==='{')err(lineAt(s,s.length),"expected '}' at end of input");
    else err(lineAt(s,o2.i),"expected ')' before ';' token");
    return{errors:errs,warnings:warns};}
  /* fonksiyonlar */
  var funcs={},re=/\bvoid\s+(\w+)\s*\(\s*\)\s*\{/g,m,rest=s;
  while((m=re.exec(s))){
    var open=m.index+m[0].length-1,d=1,j=open+1;
    while(j<s.length&&d>0){if(s[j]==='{')d++;else if(s[j]==='}')d--;j++;}
    funcs[m[1]]={off:open+1,body:s.slice(open+1,j-1)};
    rest=blank(rest,m.index,j);re.lastIndex=j;}
  var lo=rest.search(/\S/);
  if(lo>=0){var tail=rest.slice(lo).split(';')[0];
    err(lineAt(rest,lo),/\(/.test(tail)?"expected constructor, destructor, or type conversion before '(' token":"'"+(tail.match(/\w+/)||['?'])[0]+"' does not name a type");}
  if(!funcs.setup)err(0,"undefined reference to `setup'");
  if(!funcs.loop)err(0,"undefined reference to `loop'");
  if(errs.length)return{errors:errs,warnings:warns};

  function stmt(seg,idx,list){
    var lead=seg.length-seg.replace(/^\s+/,'').length;
    var line=lineAt(s,idx+lead),text=seg.replace(/\s+/g,' ').trim();
    var idr=/[A-Za-z_]\w*/g,t;
    while((t=idr.exec(text))){var w=t[0];
      if(FN[w]||CONST[w])continue;
      var hit=null;KNOWN.forEach(function(k){if(k.toLowerCase()===w.toLowerCase())hit=k;});
      err(line,"'"+w+"' was not declared in this scope"+(hit?"; did you mean '"+hit+"'?":""));return;}
    var nx=text.match(/\)\s+([A-Za-z_]\w*)/);
    if(nx){err(line,"expected ';' before '"+nx[1]+"' token");return;}
    var nm=text.match(/^(\w+)\s*\(/);
    if(!nm){err(line,"expected primary-expression before '"+text.charAt(0)+"' token");return;}
    var name=nm[1];
    if(text.charAt(text.length-1)!==')'){err(line,"expected ')' before ';' token");return;}
    var inner=text.slice(text.indexOf('(')+1,-1),args=inner.trim()===''?[]:inner.split(',').map(function(a){return a.trim();});
    for(var q=0;q<args.length;q++){var sp=args[q].match(/^(\S+)\s+(\S+)/);
      if(sp){err(line,"expected ')' before '"+sp[2]+"'");return;}}
    if(args.length<FN[name]){err(line,"too few arguments to function '"+name+"'");return;}
    if(args.length>FN[name]){err(line,"too many arguments to function '"+name+"'");return;}
    if(name==='pinMode'){
      if(!/^\d+$/.test(args[0])){err(line,"invalid conversion to 'uint8_t' in '"+name+"'");return;}
      if(!/^(OUTPUT|INPUT)$/.test(args[1])){err(line,"invalid pin mode '"+args[1]+"' in '"+name+"'");return;}
      if(+args[0]>13)warns.push({line:line,msg:"D"+args[0]+" Uno'da yok (D0–D13)"});
      list.push({t:'pm',pin:+args[0],mode:args[1],line:line,txt:text+';'});}
    else if(name==='digitalWrite'){
      if(!/^\d+$/.test(args[0])){err(line,"invalid conversion to 'uint8_t' in '"+name+"'");return;}
      if(!/^(HIGH|LOW|\d+)$/.test(args[1])){err(line,"invalid value '"+args[1]+"' in '"+name+"'");return;}
      if(+args[0]>13)warns.push({line:line,msg:"D"+args[0]+" Uno'da yok (D0–D13)"});
      list.push({t:'dw',pin:+args[0],val:(args[1]==='HIGH'||(/^\d+$/.test(args[1])&&+args[1]>0))?1:0,line:line,txt:text+';'});}
    else if(name==='delay'){
      if(!/^\d+$/.test(args[0])){err(line,"invalid conversion to 'unsigned long' in '"+name+"'");return;}
      list.push({t:'dl',ms:+args[0],line:line,txt:text+';'});}
    else err(line,"'"+name+"' was not declared in this scope");
  }
  function body(name){var f=funcs[name],list=[],b=f.body,start=0;
    for(var k=0;k<=b.length;k++){
      if(k===b.length||b[k]===';'){var seg=b.slice(start,k);
        if(seg.trim()!==''){
          if(k===b.length){var ix=start+seg.replace(/\s+$/,'').length-1;err(lineAt(s,f.off+ix),"expected ';' before '}' token");}
          else stmt(seg,f.off+start,list);}
        start=k+1;}}
    return list;}
  var prog={setup:body('setup'),loop:body('loop'),errors:errs,warnings:warns};
  return prog;
}

function Runtime(prog){this.prog=prog;this.listeners=[];this.reset();}
Runtime.prototype.reset=function(){
  this.t=0;this.clock=0;this.mode={};this.val={};this.level={};this.lastT={};this.on={};this.hist={};
  this.stage='setup';this.pc=0;this.setupRuns=0;this.loopRuns=0;this.cur=null;};
Runtime.prototype.onEdge=function(fn){this.listeners.push(fn);};
Runtime.prototype._lv=function(p){return this.mode[p]==='OUTPUT'?(this.val[p]?1:0):(this.val[p]?0.06:0);};
Runtime.prototype._acc=function(p,t){var l=this.level[p]||0,lt=this.lastT[p]||0;this.on[p]=(this.on[p]||0)+l*(t-lt);this.lastT[p]=t;};
Runtime.prototype._apply=function(st,t){
  var p=st.pin;this._acc(p,t);
  if(st.t==='pm')this.mode[p]=st.mode;else this.val[p]=st.val;
  var nl=this._lv(p),old=this.level[p]||0;
  if(nl!==old||!this.hist[p]){
    this.level[p]=nl;
    var h=this.hist[p]||(this.hist[p]=[[0,0]]);
    h.push([t,nl]);
    for(var i=0;i<this.listeners.length;i++)this.listeners[i](p,nl,t,old);}};
Runtime.prototype.advance=function(dt){
  var target=this.t+dt,guard=0;
  while(this.clock<=target&&guard<6000){
    var list=this.stage==='setup'?this.prog.setup:this.prog.loop;
    if(this.pc>=list.length){
      if(this.stage==='setup'){this.stage='loop';this.setupRuns=1;this.pc=0;continue;}
      this.loopRuns++;this.pc=0;
      if(!list.length){this.clock=target+1;break;}
      this.clock+=0.002;continue;}
    var st=list[this.pc++];this.cur=st;
    if(st.t==='dl')this.clock+=st.ms;
    else{this._apply(st,this.clock);this.clock+=0.004;}
    guard++;}
  if(guard>=6000)this.clock=target+1;
  var self=this,out={};
  Object.keys(this.level).forEach(function(p){self._acc(+p,target);out[p]=dt>0?Math.min(1,self.on[p]/dt):self.level[p];self.on[p]=0;});
  this.t=target;
  Object.keys(this.hist).forEach(function(p){var h=self.hist[p];while(h.length>3&&h[1][0]<target-20000)h.shift();});
  return out;};
root.Engine={compile:compile,Runtime:Runtime};
})(window);
