(function(){
  var q=document.getElementById('sz-q');if(!q)return;
  q.addEventListener('input',function(){var v=q.value.toLocaleLowerCase('tr-TR');
    document.querySelectorAll('.sz-r').forEach(function(r){r.style.display=(!v||r.textContent.toLocaleLowerCase('tr-TR').indexOf(v)>=0)?'':'none';});});
})();
