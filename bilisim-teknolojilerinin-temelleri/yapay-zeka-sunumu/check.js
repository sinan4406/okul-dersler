(function(){
var errs=[];window.addEventListener('error',function(e){errs.push('JS HATA: '+e.message+' @'+(e.filename||'').split('/').pop()+':'+e.lineno)});
function desc(el){var t=(el.textContent||'').trim().replace(/\s+/g,' ').slice(0,40);return el.tagName.toLowerCase()+(el.className&&typeof el.className==='string'?'.'+el.className.split(' ')[0]:'')+' "'+t+'"';}
function measure(s,tag,out){
  var sr=s.getBoundingClientRect();var foot=s.querySelector('.foot');var fr=foot?foot.getBoundingClientRect():null;
  var els=s.querySelectorAll('*');
  for(var i=0;i<els.length;i++){var el=els[i];if(el.closest('aside')||el.closest('[hidden]'))continue;
    var r=el.getBoundingClientRect();if(r.width===0||r.height===0)continue;
    if(el.tagName==='OPTION')continue;if(el.closest('svg')&&el.tagName.toLowerCase()!=='svg')continue;
    if(r.bottom>sr.bottom-18||r.right>sr.right-18||r.left<sr.left+10){out.push(s.id+tag+' TASMA '+desc(el)+' alt='+Math.round(r.bottom-sr.top)+' sag='+Math.round(r.right-sr.left));break;}
    if(fr&&el!==foot&&!foot.contains(el)&&r.bottom>fr.top-4&&r.top<fr.bottom){out.push(s.id+tag+' FOOT-CAKISMA '+desc(el));break;}
    if(el.tagName!=='INPUT'&&el.tagName!=='TEXTAREA'&&el.scrollWidth>el.clientWidth+2&&getComputedStyle(el).overflowX!=='visible'&&el.clientWidth>0){out.push(s.id+tag+' YATAY-KAYMA '+desc(el));break;}
  }
}
function run(){
  var out=[];document.getElementById('stage').style.transform='none';
  window.__slides.forEach(function(s){
    s.querySelectorAll('.ans[hidden]').forEach(function(x){x.hidden=false});
    s.querySelectorAll('.why[hidden]').forEach(function(x){x.hidden=false});
    var groups=s.querySelectorAll('[data-tabs]');
    if(groups.length){groups.forEach(function(g){g.querySelectorAll('.tb[data-tab]').forEach(function(b){b.click();measure(s,'['+b.textContent.trim().slice(0,14)+']',out);});});}
    else measure(s,'',out);
    var st=window.steppers[s.id];if(st){var guard=0;measure(s,'[adım0]',out);while(st.next()&&guard++<60){measure(s,'[adım'+guard+']',out);}}
  });
  out=errs.concat(out);
  var pre=document.createElement('pre');pre.id='chkout';pre.textContent='SLAYT='+window.__slides.length+'\n'+(out.length?out.join('\n'):'TEMIZ');document.body.appendChild(pre);
}
function go(){ (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){setTimeout(run,800)}); }
if(document.readyState==='complete')go();else window.addEventListener('load',go);
})();
