/* MOTOR: Arduino'nun bu haftaki alt kümesi (setup, loop, pinMode, digitalWrite, delay, int, for) için mini derleyici ve sanal zamanlı çalıştırıcı */
(function(root){
var FN={pinMode:2,digitalWrite:2,delay:1};
var CONSTV={OUTPUT:1,INPUT:0,HIGH:1,LOW:0};
var TYPES={int:1,byte:1,long:1};
var KNOWN=Object.keys(FN).concat(Object.keys(CONSTV),['void','setup','loop','int','for']);

function strip(src){var out='',i=0,n=src.length;
  while(i<n){var c=src[i],d=src[i+1];
    if(c==='/'&&d==='/'){while(i<n&&src[i]!=='\n'){out+=' ';i++;}}
    else if(c==='/'&&d==='*'){out+='  ';i+=2;while(i<n&&!(src[i]==='*'&&src[i+1]==='/')){out+=src[i]==='\n'?'\n':' ';i++;}if(i<n){out+='  ';i+=2;}}
    else{out+=c;i++;}}
  return out;}
function lineAt(s,idx){var n=1;for(var i=0;i<idx&&i<s.length;i++)if(s[i]==='\n')n++;return n;}

var P2=['++','--','<=','>=','==','!=','&&','||','+=','-=','*=','/='];
function tokenize(s,errs){
  var out=[],i=0,line=1,n=s.length;
  while(i<n){var c=s[i];
    if(c==='\n'){line++;i++;continue;}
    if(/\s/.test(c)){i++;continue;}
    var j=i;
    if(/[A-Za-z_]/.test(c)){while(j<n&&/\w/.test(s[j]))j++;out.push({k:'id',v:s.slice(i,j),line:line,pos:i,end:j});i=j;continue;}
    if(/\d/.test(c)){while(j<n&&/[\d.]/.test(s[j]))j++;out.push({k:'num',v:parseFloat(s.slice(i,j)),line:line,pos:i,end:j});i=j;continue;}
    var two=s.substr(i,2);
    if(P2.indexOf(two)>=0){out.push({k:'p',v:two,line:line,pos:i,end:i+2});i+=2;continue;}
    if('(){};,=<>+-*/%!'.indexOf(c)>=0){out.push({k:'p',v:c,line:line,pos:i,end:i+1});i++;continue;}
    errs.push({line:line,msg:"stray '"+c+"' in program"});i++;}
  return out;}

function compile(src){
  var errs=[],warns=[],s=strip(src);
  /* parantez dengesi */
  var st=[];
  for(var i=0;i<s.length;i++){var c=s[i];
    if(c==='('||c==='{')st.push({c:c,i:i});
    else if(c===')'||c==='}'){var want=c===')'?'(':'{',o=st[st.length-1];
      if(!o||o.c!==want){errs.push({line:lineAt(s,i),msg:"expected "+(o&&o.c==='('?"')'":"'}'")+" before '"+c+"' token"});return{errors:errs,warnings:warns};}
      st.pop();}}
  if(st.length){var o2=st[st.length-1];
    errs.push(o2.c==='{'?{line:lineAt(s,s.length),msg:"expected '}' at end of input"}:{line:lineAt(s,o2.i),msg:"expected ')' before ';' token"});
    return{errors:errs,warnings:warns};}
  var toks=tokenize(s,errs);
  if(errs.length)return{errors:errs,warnings:warns};

  var p=0,scopes=[{}],globals=[],funcs={};
  function cur(){return toks[p];}
  function isP(v,o){var t=toks[p+(o||0)];return !!t&&t.k==='p'&&t.v===v;}
  function prevLine(){return p>0?toks[p-1].line:1;}
  function fail(line,msg){throw {line:line,msg:msg};}
  function tokTxt(t){return t?(t.k==='num'?String(t.v):t.v):'end of input';}
  function declared(n){for(var k=scopes.length-1;k>=0;k--)if(Object.prototype.hasOwnProperty.call(scopes[k],n))return true;return false;}
  function hint(w){var hit=null,all=KNOWN.slice();
    scopes.forEach(function(sc){Object.keys(sc).forEach(function(k){all.push(k);});});
    all.forEach(function(k){if(k!==w&&k.toLowerCase()===w.toLowerCase())hit=k;});
    return hit?"; did you mean '"+hit+"'?":"";}
  function semi(){if(isP(';')){p++;return;}errs.push({line:prevLine(),msg:"expected ';' before '"+tokTxt(cur())+"' token"});}
  function expectClose(){if(isP(')')){return toks[p++];}fail(cur()?cur().line:prevLine(),"expected ')' before '"+tokTxt(cur())+"'");}

  var PREC={'||':1,'&&':2,'==':3,'!=':3,'<':4,'>':4,'<=':4,'>=':4,'+':5,'-':5,'*':6,'/':6,'%':6};
  function parseExpr(min){
    var l=parseUnary();
    for(;;){var t=cur();if(!t||t.k!=='p'||!PREC[t.v]||PREC[t.v]<min)break;p++;var r=parseExpr(PREC[t.v]+1);l={k:'b',op:t.v,l:l,r:r,line:t.line};}
    return l;}
  function parseUnary(){
    var t=cur();
    if(!t)fail(prevLine(),"expected primary-expression before end of input");
    if(isP('-')){p++;return{k:'u',op:'-',e:parseUnary()};}
    if(isP('!')){p++;return{k:'u',op:'!',e:parseUnary()};}
    if(isP('(')){p++;var e=parseExpr(1);expectClose();return e;}
    if(t.k==='num'){p++;return{k:'n',v:t.v};}
    if(t.k==='id'){p++;
      if(Object.prototype.hasOwnProperty.call(CONSTV,t.v))return{k:'c',name:t.v,v:CONSTV[t.v]};
      if(declared(t.v))return{k:'v',name:t.v};
      fail(t.line,"'"+t.v+"' was not declared in this scope"+hint(t.v));}
    fail(t.line,"expected primary-expression before '"+tokTxt(t)+"' token");}

  function parseDecl(needSemi){
    p++;var list=[];
    for(;;){var t=cur();
      if(!t||t.k!=='id'||TYPES[t.v])fail(t?t.line:prevLine(),"expected unqualified-id before '"+tokTxt(t)+"' token");
      p++;var init=null;
      if(isP('=')){p++;init=parseExpr(1);}
      var sc=scopes[scopes.length-1];
      if(Object.prototype.hasOwnProperty.call(sc,t.v))fail(t.line,"redeclaration of 'int "+t.v+"'");
      sc[t.v]=1;list.push({name:t.v,init:init});
      if(isP(',')){p++;continue;}break;}
    if(needSemi)semi();
    return{t:'seq',list:list};}
  function parseAssign(needSemi){
    var t=cur();
    if(!t||t.k!=='id')fail(t?t.line:prevLine(),"expected primary-expression before '"+tokTxt(t)+"' token");
    if(!declared(t.v))fail(t.line,"'"+t.v+"' was not declared in this scope"+hint(t.v));
    p++;var n=cur(),node;
    if(n&&n.k==='p'&&(n.v==='++'||n.v==='--')){p++;node={t:'assign',name:t.v,op:n.v==='++'?'+=':'-=',expr:{k:'n',v:1},line:t.line};}
    else if(n&&n.k==='p'&&(n.v==='='||n.v==='+='||n.v==='-='||n.v==='*='||n.v==='/=')){p++;node={t:'assign',name:t.v,op:n.v,expr:parseExpr(1),line:t.line};}
    else fail(t.line,"expected ';' before '"+tokTxt(n)+"' token");
    if(needSemi)semi();
    return node;}
  function parseCall(){
    var t=cur(),name=t.v;
    if(!FN[name])fail(t.line,"'"+name+"' was not declared in this scope"+hint(name));
    p+=2;var args=[];
    if(!isP(')')){for(;;){args.push(parseExpr(1));if(isP(',')){p++;continue;}break;}}
    var close=expectClose();
    if(args.length<FN[name])fail(t.line,"too few arguments to function '"+name+"'");
    if(args.length>FN[name])fail(t.line,"too many arguments to function '"+name+"'");
    if(name==='pinMode'&&!(args[1].k==='c'&&(args[1].name==='OUTPUT'||args[1].name==='INPUT')))fail(t.line,"invalid pin mode in 'pinMode' (OUTPUT veya INPUT yaz)");
    semi();
    return{t:'call',name:name,args:args,line:t.line,txt:s.slice(t.pos,close.end).replace(/\s+/g,' ')+';'};}
  function parseFor(){
    var t=cur();p++;
    if(!isP('('))fail(t.line,"expected '(' after 'for'");
    p++;scopes.push({});
    var init=null,cond=null,incr=null;
    try{
      if(!isP(';')){init=(cur()&&cur().k==='id'&&TYPES[cur().v])?parseDecl(false):parseAssign(false);}
      if(!isP(';'))fail(prevLine(),"expected ';' before '"+tokTxt(cur())+"' token");p++;
      if(!isP(';'))cond=parseExpr(1);
      if(!isP(';'))fail(prevLine(),"expected ';' before '"+tokTxt(cur())+"' token");p++;
      if(!isP(')'))incr=parseAssign(false);
      expectClose();
    }catch(e){
      if(!e.msg)throw e;errs.push(e);
      var d=1;while(cur()&&d>0){if(isP('('))d++;else if(isP(')'))d--;p++;}
      init=cond=incr=null;}
    var body=parseStmt();
    scopes.pop();
    return{t:'for',init:init,cond:cond,incr:incr,body:body,line:t.line};}
  function sync(s0){
    var d=0;
    while(cur()){if(isP('('))d++;else if(isP(')'))d--;
      else if(d<=0&&isP(';')){p++;break;}
      else if(d<=0&&isP('}'))break;
      p++;}
    if(p===s0)p++;}
  function parseBody(){
    var list=[];
    while(cur()&&!isP('}')){
      var s0=p;
      try{list.push(parseStmt());}catch(e){if(!e.msg)throw e;errs.push(e);sync(s0);}}
    if(isP('}'))p++;
    return list;}
  function parseStmt(){
    var t=cur();
    if(!t)fail(prevLine(),"expected '}' at end of input");
    if(isP('{')){p++;scopes.push({});var b=parseBody();scopes.pop();return{t:'block',body:b};}
    if(isP(';')){p++;return{t:'empty'};}
    if(t.k==='id'){
      if(TYPES[t.v])return parseDecl(true);
      if(t.v==='for')return parseFor();
      if(isP('(',1))return parseCall();
      return parseAssign(true);}
    fail(t.line,"expected primary-expression before '"+tokTxt(t)+"' token");}

  while(cur()){
    var s0=p;
    try{
      var t0=cur();
      if(t0.k==='id'&&TYPES[t0.v]){globals.push(parseDecl(true));}
      else if(t0.k==='id'&&t0.v==='void'){
        p++;var nm=cur();
        if(!nm||nm.k!=='id')fail(t0.line,"expected unqualified-id before '"+tokTxt(nm)+"' token");
        p++;
        if(!isP('('))fail(nm.line,"expected '(' before '"+tokTxt(cur())+"' token");p++;
        if(!isP(')'))fail(nm.line,"expected ')' before '"+tokTxt(cur())+"' token");p++;
        if(!isP('{'))fail(nm.line,"expected '{' before '"+tokTxt(cur())+"' token");p++;
        scopes.push({});var body=parseBody();scopes.pop();
        funcs[nm.v]={body:body,line:nm.line};}
      else if(t0.k==='id'&&isP('(',1))fail(t0.line,"expected constructor, destructor, or type conversion before '(' token");
      else fail(t0.line,"'"+tokTxt(t0)+"' does not name a type");
    }catch(e){
      if(!e.msg)throw e;errs.push(e);
      var d=0;while(cur()){if(isP('{'))d++;else if(isP('}')){d--;if(d<=0){p++;break;}}else if(d<=0&&isP(';')){p++;break;}p++;}
      if(p===s0)p++;}}
  if(!funcs.setup)errs.push({line:0,msg:"undefined reference to `setup'"});
  if(!funcs.loop)errs.push({line:0,msg:"undefined reference to `loop'"});
  errs.sort(function(a,b){return a.line-b.line;});
  if(errs.length)return{errors:errs,warnings:warns};
  return{funcs:funcs,globals:globals,errors:errs,warnings:warns};
}
var EMPTY={funcs:{setup:{body:[]},loop:{body:[]}},globals:[],errors:[],warnings:[]};

/* ---- çalıştırma ---- */
function Env(parent){this.vars={};this.parent=parent||null;}
Env.prototype.find=function(n){var e=this;while(e){if(Object.prototype.hasOwnProperty.call(e.vars,n))return e;e=e.parent;}return null;};
function evalx(e,env){
  switch(e.k){
    case 'n':case 'c':return e.v;
    case 'v':var o=env.find(e.name);return o?o.vars[e.name]:0;
    case 'u':{var v=evalx(e.e,env);return e.op==='-'?-v:(v?0:1);}
    case 'b':{var a=evalx(e.l,env),b=evalx(e.r,env);
      switch(e.op){case '+':return a+b;case '-':return a-b;case '*':return a*b;
        case '/':if(b===0)throw {msg:"0'a bölme (satır "+e.line+")"};return Math.trunc(a/b);
        case '%':if(b===0)throw {msg:"0'a bölme (satır "+e.line+")"};return a%b;
        case '<':return a<b?1:0;case '>':return a>b?1:0;case '<=':return a<=b?1:0;case '>=':return a>=b?1:0;
        case '==':return a===b?1:0;case '!=':return a!==b?1:0;case '&&':return(a&&b)?1:0;case '||':return(a||b)?1:0;}}}
  return 0;}
function varsText(env){
  var seen={},out=[];
  for(var e=env;e;e=e.parent)Object.keys(e.vars).forEach(function(k){if(!seen[k]){seen[k]=1;out.push(k+' = '+e.vars[k]);}});
  return out.join(', ');}
function initGlobals(prog,env){
  prog.globals.forEach(function(g){g.list.forEach(function(d){env.vars[d.name]=d.init?evalx(d.init,env):0;});});}
function* exec(s,env,ctx){
  switch(s.t){
    case 'empty':break;
    case 'seq':s.list.forEach(function(d){env.vars[d.name]=d.init?evalx(d.init,env):0;});break;
    case 'block':{var e2=new Env(env);for(var k=0;k<s.body.length;k++)yield* exec(s.body[k],e2,ctx);break;}
    case 'assign':{var o=env.find(s.name)||env,cv=o.vars[s.name]||0,v=evalx(s.expr,env);
      o.vars[s.name]=s.op==='='?v:s.op==='+='?cv+v:s.op==='-='?cv-v:s.op==='*='?cv*v:(v===0?0:Math.trunc(cv/v));break;}
    case 'for':{
      var fe=new Env(env);
      if(s.init)yield* exec(s.init,fe,ctx);
      while(!s.cond||evalx(s.cond,fe)){
        if(++ctx.steps>200000)throw {msg:"Döngü bitmiyor: for koşulu hiç yanlış olmuyor (satır "+s.line+")"};
        yield* exec(s.body,new Env(fe),ctx);
        if(s.incr)yield* exec(s.incr,fe,ctx);}
      break;}
    case 'call':{
      var a=s.args.map(function(x){return evalx(x,env);});
      var nm=function(i){return s.args[i].k==='c'?s.args[i].name:String(a[i]);};
      var op={line:s.line,txt:s.txt,vars:varsText(env)};
      if(s.name==='pinMode'){op.t='pm';op.pin=a[0];op.mode=s.args[1].name;op.res='pinMode('+a[0]+', '+op.mode+');';}
      else if(s.name==='digitalWrite'){op.t='dw';op.pin=a[0];op.val=a[1]?1:0;op.res='digitalWrite('+a[0]+', '+(s.args[1].k==='c'?s.args[1].name:(a[1]?'HIGH':'LOW'))+');';}
      else{op.t='dl';op.ms=Math.max(0,a[0]);op.res='delay('+a[0]+');';}
      ctx.steps=0;
      yield op;break;}
  }}
function* runBody(body,env,ctx){for(var k=0;k<body.length;k++)yield* exec(body[k],env,ctx);}

function analyze(prog){
  var r={modes:{},written:{},loopDelay:false,loopWrite:false,warns:[],stuck:null};
  if(!prog.funcs)return r;
  var genv=new Env(),ctx={steps:0};
  try{
    initGlobals(prog,genv);
    ['setup','loop'].forEach(function(name){
      var g=runBody(prog.funcs[name].body,genv,ctx),n=0;
      for(;;){var x=g.next();if(x.done)break;var o=x.value;
        if(++n>20000){r.warns.push('Çok uzun: bir turda 20000’den fazla komut var.');break;}
        if(o.t==='pm'&&o.mode==='OUTPUT')r.modes[o.pin]=1;
        if(o.t==='dw'){r.written[o.pin]=1;if(name==='loop')r.loopWrite=true;}
        if(o.t==='dl'&&name==='loop')r.loopDelay=true;
        if((o.t==='pm'||o.t==='dw')&&(o.pin<0||o.pin>13)){var m="D"+o.pin+" Uno'da yok (D0–D13) (satır "+o.line+")";if(r.warns.indexOf(m)<0)r.warns.push(m);}}});
  }catch(e){r.stuck=e.msg||String(e);}
  return r;}

function Runtime(prog){this.prog=prog;this.listeners=[];this.reset();}
Runtime.prototype.reset=function(){
  this.t=0;this.clock=0;this.mode={};this.val={};this.level={};this.lastT={};this.on={};this.hist={};
  this.stage='setup';this.gen=null;this.opsRun=0;this.setupRuns=0;this.loopRuns=0;this.cur=null;this.stuck=null;
  this.env=new Env();this.ctx={steps:0};initGlobals(this.prog,this.env);};
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
  while(this.clock<=target&&guard<6000&&!this.stuck){
    if(!this.gen){
      var body=this.prog.funcs[this.stage].body;
      this.gen=runBody(body,this.env,this.ctx);this.opsRun=0;}
    var r;
    try{r=this.gen.next();}catch(e){this.stuck=e.msg||String(e);this.clock=target+1;break;}
    if(r.done){
      this.gen=null;
      if(this.stage==='setup'){this.stage='loop';this.setupRuns=1;continue;}
      if(!this.opsRun){this.clock=target+1;break;}
      this.loopRuns++;
      this.clock+=0.002;continue;}
    var st=r.value;this.cur=st;this.opsRun++;
    if(st.t==='dl')this.clock+=st.ms;
    else{this._apply(st,this.clock);this.clock+=0.004;}
    guard++;}
  if(guard>=6000)this.clock=target+1;
  var self=this,out={};
  Object.keys(this.level).forEach(function(p){self._acc(+p,target);out[p]=dt>0?Math.min(1,self.on[p]/dt):self.level[p];self.on[p]=0;});
  this.t=target;
  Object.keys(this.hist).forEach(function(p){var h=self.hist[p];while(h.length>3&&h[1][0]<target-20000)h.shift();});
  return out;};
root.Engine={compile:compile,analyze:analyze,Runtime:Runtime,EMPTY:EMPTY};
})(window);
