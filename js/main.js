(function(){
  var D={
    home:["Homeowners policy",[["Dwelling","Rebuild cost"],["Personal property","Your belongings"],["Liability","Injury on property"],["Deductible","You choose"]],"Limits and prices depend on your home."],
    auto:["Personal auto policy",[["Liability","NY required"],["Collision","Your vehicle"],["Comprehensive","Theft, weather"],["Uninsured driver","Added protection"]],"Limits and prices depend on your drivers and car."],
    biz:["Business policy",[["Property","Space and equipment"],["General liability","Third-party claims"],["Professional","Errors and advice"],["Workers' comp","Employee injury"]],"Coverage depends on your industry and size."],
    life:["Life policy",[["Term","Set number of years"],["Permanent","Lifelong option"],["Beneficiary","Who you choose"],["Premium","Fits your budget"]],"Amounts depend on age, health and goals."]
  };
  var box=document.getElementById('detail'),tabs=[].slice.call(document.querySelectorAll('.tab'));
  function show(t){
    tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1});
    var d=D[t.dataset.k];
    box.innerHTML='<div class="swap"><small>Sample coverage summary</small><h2>'+d[0]+'</h2>'+d[1].map(function(r){return '<div class="row"><span>'+r[0]+'</span><span>'+r[1]+'</span></div>'}).join('')+'<p class="note">'+d[2]+' Call for a quote.</p><a class="btn btn-gold" href="tel:+15162469400">Ask an agent</a></div>';
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){show(t)});
    t.addEventListener('keydown',function(e){
      var n=e.key==='ArrowDown'||e.key==='ArrowRight'?tabs[(i+1)%4]:e.key==='ArrowUp'||e.key==='ArrowLeft'?tabs[(i+3)%4]:null;
      if(n){e.preventDefault();n.focus();show(n)}
    });
  });
  show(tabs[0]);

  var c=document.getElementById('fx'),x=c.getContext('2d'),W,H,dpr=Math.min(devicePixelRatio||1,2);
  function size(){var r=c.getBoundingClientRect();W=r.width;H=r.height;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0)}
  function draw(t){
    x.clearRect(0,0,W,H);
    var L=70,P=34,R=W*.34;
    for(var i=0;i<L;i++){
      var a=i/L*Math.PI*2+t*.00018;
      for(var j=0;j<P;j++){
        var u=j/(P-1),v=Math.abs(u-.5)*2,r=R*(.18+1.5*v*v),
            px=r*Math.cos(a),pz=r*Math.sin(a),py=(u-.5)*H*.9+pz*.12;
        var d=(pz/R+1.7)/3.4;
        x.fillStyle='rgba(120,235,190,'+(.1+.55*d*(.4+v))+')';
        x.fillRect(W/2+px,H/2+py,1.4,1.4);
      }
    }
  }
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function loop(t){draw(t);if(!rm)requestAnimationFrame(loop)}
  size();addEventListener('resize',function(){size();if(rm)draw(0)});
  loop(0);
})();
