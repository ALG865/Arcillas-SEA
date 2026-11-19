/* Modelos 3D idealizados de las láminas de los minerales de la arcilla.
   Geometría de poliedros regulares (Si–O 1,62 Å; O–O 3,05 Å), no refinamientos cristalográficos. */
(function(){
"use strict";
var S3=Math.sqrt(3), E=3.05;                 // arista O–O
var A1=[E,0], A2=[E/2,E*S3/2];               // red de aniones
var HT=E*Math.sqrt(2/3);                     // alto de la capa octaédrica (planos de aniones)
var TT=1.62*4/3;                              // alto del tetraedro
var COL={T:0x7fa7c9,O:0x8fbf8a,Ob:0x5c9457,H:0xc9dfb4,K:0x9b6fb0,cat:0xd1783f,agua:0x5aa9d6,Mg:0x7a8f3a,Al:0xe0c060,C:0x4a4a4a,N:0x3d5fb0,an:0xc0504d};
function P(i,j){ return [i*A1[0]+j*A2[0], i*A1[1]+j*A2[1]]; }

function Constructor(lim){ this.t=[]; this.o=[]; this.h=[]; this.esf=[]; this.lim=lim||{x:13,y:11}; }
Constructor.prototype.dentro=function(x,y,m){ m=m||0; return Math.abs(x)<=this.lim.x-m && Math.abs(y)<=this.lim.y-m; };
Constructor.prototype.tri=function(arr,a,b,c){ arr.push(a[0],a[1],a[2],b[0],b[1],b[2],c[0],c[1],c[2]); };
Constructor.prototype.tetra=function(apex,b0,b1,b2){
  var g=this.t; // cara inferior y tres laterales
  this.tri(g,b0,b2,b1); this.tri(g,apex,b0,b1); this.tri(g,apex,b1,b2); this.tri(g,apex,b2,b0);
};
Constructor.prototype.octa=function(arr,top,bot){
  var t=top,b=bot,self=this;
  self.tri(arr,t[0],t[1],t[2]); self.tri(arr,b[0],b[2],b[1]);
  // seis caras laterales: cada arista superior con el vértice inferior opuesto y viceversa
  for(var k=0;k<3;k++){ var t0=t[k],t1=t[(k+1)%3];
    var bo=b.reduce(function(best,v){ var d=Math.hypot(v[0]-(t0[0]+t1[0])/2,v[1]-(t0[1]+t1[1])/2); return (!best||d<best.d)?{v:v,d:d}:best; },null).v;
    self.tri(arr,t0,bo,t1); }
  for(k=0;k<3;k++){ var b0=b[k],b1=b[(k+1)%3];
    var to=t.reduce(function(best,v){ var d=Math.hypot(v[0]-(b0[0]+b1[0])/2,v[1]-(b0[1]+b1[1])/2); return (!best||d<best.d)?{v:v,d:d}:best; },null).v;
    self.tri(arr,b0,b1,to); }
};
/* Capa octaédrica entre zt (aniones de arriba) y zb=zt-HT. oct: "di"|"tri". */
Constructor.prototype.capaO=function(zt,oct,arr,shift){
  var N=9, sh=shift||[0,0];
  for(var i=-N;i<=N;i++) for(var j=-N;j<=N;j++){
    var p=P(i,j); p=[p[0]+sh[0],p[1]+sh[1]];
    var c=[p[0]+(A1[0]+A2[0])/3, p[1]+(A1[1]+A2[1])/3];
    if(!this.dentro(c[0],c[1],1)) continue;
    if(oct==="di" && ((i-j)%3+3)%3===2) continue;
    var top=[[p[0],p[1],zt],[p[0]+A1[0],p[1]+A1[1],zt],[p[0]+A2[0],p[1]+A2[1],zt]];
    var bot=top.map(function(v){ return [2*c[0]-v[0],2*c[1]-v[1],zt-HT]; });
    this.octa(arr||this.o,top,bot);
  }
};
/* Capa tetraédrica. arriba=true: vértices hacia abajo apoyados en el plano zA (aniones superiores de la capa O). */
Constructor.prototype.capaT=function(zA,arriba,shift){
  var N=9, sh=shift||[0,0], self=this;
  function esSi(i,j){ return ((i-j)%3+3)%3!==0; }
  for(var i=-N;i<=N;i++) for(var j=-N;j<=N;j++){
    if(!esSi(i,j)) continue;
    var p=P(i,j); p=[p[0]+sh[0],p[1]+sh[1]];
    if(!this.dentro(p[0],p[1],1.5)) continue;
    // vecinos Si en el panal (distancia E)
    var vec=[[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]].filter(function(d){ return esSi(i+d[0],j+d[1]); });
    var zb = arriba? zA+TT : zA-TT;
    var base=vec.slice(0,3).map(function(d){ var q=P(i+d[0],j+d[1]); return [(p[0]+q[0]+sh[0])/2,(p[1]+q[1]+sh[1])/2,zb]; });
    if(base.length<3) continue;
    var apex=[p[0],p[1],zA];
    if(arriba) self.tetra(apex,base[0],base[1],base[2]); else self.tetra(apex,base[0],base[2],base[1]);
  }
};
Constructor.prototype.esferas=function(z,tipo,r,dens,shift,jit){
  var N=9, sh=shift||[0,0];
  for(var i=-N;i<=N;i++) for(var j=-N;j<=N;j++){
    if(((i-j)%3+3)%3!==0) continue; // centros de los anillos hexagonales
    if(dens<1 && ((i*7+j*13+50)%10)/10>=dens) continue;
    var p=P(i,j); var x=p[0]+sh[0], y=p[1]+sh[1];
    if(!this.dentro(x,y,1.5)) continue;
    this.esf.push({x:x,y:y,z:z+(jit?((i*31+j*17)%5-2)*0.25:0),t:tipo,r:r});
  }
};
Constructor.prototype.agua=function(z0,z1){
  var k=0;
  for(var x=-this.lim.x+1.5;x<=this.lim.x-1.5;x+=2.6) for(var y=-this.lim.y+1.5;y<=this.lim.y-1.5;y+=2.6){
    k++; var dz=((k*37)%100)/100*(z1-z0);
    this.esf.push({x:x+((k*13)%10)/10,y:y+((k*7)%10)/10,z:z0+dz,t:"agua",r:0.62});
  }
};
/* Lámina: 1:1 o 2:1 con base en z0 (plano basal inferior). Devuelve z del plano basal superior. */
Constructor.prototype.lamina=function(z0,tipo,oct){
  var sh=[0,0];
  if(tipo==="O"){ var zo=z0+HT; this.capaO(zo,oct,null,sh); return zo; }
  if(tipo==="TO"){ var zb=z0, zt=zb+HT; this.capaO(zt,oct,null,sh); this.capaT(zt,true,sh); return zt+TT; }
  var zA=z0+TT; this.capaT(zA,false,[sh[0]+(A1[0]+A2[0])*2/3, sh[1]+(A1[1]+A2[1])*2/3]);
  var zt2=zA+HT; this.capaO(zt2,oct,null,sh); this.capaT(zt2,true,sh); return zt2+TT;
};

/* Definición de cada modelo: lista de láminas y espacios interlaminares. d = espaciado basal (Å). */
var MODELOS={
  caolinita:{lam:"TO",oct:"di",d:7.16,inter:"H"},
  halloysita:{lam:"TO",oct:"di",d:10.0,inter:"agua1"},
  serpentina:{lam:"TO",oct:"tri",d:7.3,inter:"H"},
  talco:{lam:"TOT",oct:"tri",d:9.35,inter:"nada"},
  pirofilita:{lam:"TOT",oct:"di",d:9.2,inter:"nada"},
  illita:{lam:"TOT",oct:"di",d:10.0,inter:"K"},
  montmorillonita:{lam:"TOT",oct:"di",d:15.0,inter:"agua"},
  saponita:{lam:"TOT",oct:"tri",d:15.0,inter:"agua"},
  vermiculita:{lam:"TOT",oct:"tri",d:14.4,inter:"Mg"},
  clorita:{lam:"TOT",oct:"tri",d:14.2,inter:"hidroxido"},
  sudoita:{lam:"TOT",oct:"di",d:14.1,inter:"hidroxido"},
  /* interestratificados regulares: la interlámina alterna (alt) */
  rectorita:{lam:"TOT",oct:"di",alt:[{inter:"K",d:9.6},{inter:"agua",d:15.0}]},
  corrensita:{lam:"TOT",oct:"tri",alt:[{inter:"hidroxido",d:14.2},{inter:"agua",d:15.0}]},
  tosudita:{lam:"TOT",oct:"di",alt:[{inter:"hidroxido",d:14.2},{inter:"agua",d:15.0}]},
  aliettita:{lam:"TOT",oct:"tri",alt:[{inter:"nada",d:9.35},{inter:"agua",d:15.0}]},
  hidrobiotita:{lam:"TOT",oct:"tri",alt:[{inter:"K",d:10.0},{inter:"Mg",d:14.4}]},
  /* arcillas modificadas y materiales afines (modelos esquemáticos) */
  pilareada:{lam:"TOT",oct:"di",d:18.0,inter:"pilar"},
  organoarcilla:{lam:"TOT",oct:"di",d:20.0,inter:"organico"},
  ldh:{lam:"O",oct:"tri",d:7.6,inter:"anion"}
};
function construir(id,capas){
  var m=MODELOS[id], c=new Constructor(), n=capas||2, grosor=m.lam==="O"?HT:(m.lam==="TO"?(HT+TT):(2*TT+HT)), z0=0;
  if(m.alt&&n<3) n=3;
  for(var k=0;k<n;k++){
    var ztop=c.lamina(z0,m.lam,m.oct), it=m.alt?m.alt[k%m.alt.length]:m;
    if(k<n-1){ var g0=ztop, g1=z0+it.d;
      if(it.inter==="K") c.esferas((g0+g1)/2,"K",0.95,1,[0,0]);
      else if(it.inter==="agua"){ c.esferas((g0+g1)/2,"cat",0.75,0.35,[0,0]); c.agua(g0+0.9,g1-0.9); }
      else if(it.inter==="Mg"){ c.esferas((g0+g1)/2,"Mg",0.7,0.4,[0,0]); c.agua(g0+0.9,g1-0.9); }
      else if(it.inter==="agua1"){ c.agua((g0+g1)/2-0.3,(g0+g1)/2+0.3); }
      else if(it.inter==="pilar"){ // pilares de óxido de Al (Al13 calcinado), espaciados, con microporos entre ellos
        var zc=(g0+g1)/2, hh=(g1-g0)/2-0.6;
        [[-8,-6],[8,-6],[0,1],[-8,7],[8,7]].forEach(function(pp){
          for(var lv=-1;lv<=1;lv++) for(var q=0;q<6;q++){ var ang=q*Math.PI/3+lv*0.5; c.esf.push({x:pp[0]+1.6*Math.cos(ang),y:pp[1]+1.6*Math.sin(ang),z:zc+lv*hh*0.62,t:"Al",r:1.0}); }
          c.esf.push({x:pp[0],y:pp[1],z:zc,t:"Al",r:1.2}); }); }
      else if(it.inter==="organico"){ // cationes alquilamonio: cabeza N junto a la lámina y cadena de C inclinada
        var k2=0; for(var ox=-10;ox<=10;ox+=4) for(var oy=-8;oy<=8;oy+=4){ k2++; var abajo=k2%2===0, zN=abajo?g0+0.9:g1-0.9, dir=abajo?1:-1;
          c.esf.push({x:ox,y:oy,z:zN,t:"N",r:0.95});
          for(var s=1;s<=9;s++){ c.esf.push({x:ox+s*0.75*0.6,y:oy+((s%2)?0.35:-0.35),z:zN+dir*s*0.75*0.8,t:"C",r:0.72}); } } }
      else if(it.inter==="anion"){ c.esferas((g0+g1)/2,"an",0.8,0.5,[A1[0]/3,A1[1]/3]); c.agua(g0+0.6,g1-0.6); }
      else if(it.inter==="hidroxido"){ var zh=(g0+g1)/2+HT/2; c.capaO(zh,"tri",c.h,[A1[0]/3,A1[1]/3]); }
      z0+=it.d;
    }
  }
  return {c:c,altura:z0+grosor,d:m.d||m.alt[0].d};
}
/* Fibrosas: cintas 2:1 en tablero de ajedrez, con canales a lo largo de la fibra (eje x). */
function construirFibra(id){
  var anchoY = id==="palygorskita"?4.6:7.0, canal=id==="palygorskita"?3.7:5.6, c=new Constructor({x:13,y:30});
  var paso=anchoY+canal, filas=3, alto=2*TT+HT, dz=alto+0.3; var dentroOrig=c.dentro;
  for(var f=0;f<filas;f++) for(var k=-2;k<=2;k++){
    var y0=k*paso+(f%2?paso/2:0), z0=f*dz;
    c.dentro=function(x,y,m){ return Math.abs(x)<=13-(m||0) && Math.abs(y-y0)<=anchoY/2-(m||0)*0.2+0.6; };
    c.lamina(z0,"TOT","tri");
    // agua zeolítica en el canal
    var yc=y0+paso/2; if(k<2) for(var x=-11;x<=11;x+=3.2){ c.esf.push({x:x,y:yc,z:z0+alto/2+0.4,t:"agua",r:0.62}); c.esf.push({x:x+1.6,y:yc+0.9,z:z0+alto/2-0.6,t:"agua",r:0.62}); }
  }
  c.dentro=dentroOrig;
  return {c:c,altura:(filas-1)*dz+alto,d:null,fibra:true};
}

function malla(THREE,arr,color,opac){
  var g=new THREE.BufferGeometry(); g.setAttribute("position",new THREE.Float32BufferAttribute(arr,3)); g.computeVertexNormals();
  var mat=new THREE.MeshStandardMaterial({color:color,flatShading:true,roughness:.55,metalness:.05,transparent:opac<1,opacity:opac||1,side:THREE.DoubleSide});
  var me=new THREE.Mesh(g,mat), grupo=new THREE.Group(); grupo.add(me);
  var ed=new THREE.LineSegments(new THREE.EdgesGeometry(g,20),new THREE.LineBasicMaterial({color:0x2b2b2b,transparent:true,opacity:.35}));
  grupo.add(ed); return grupo;
}

/* Visor: crea la escena dentro de un contenedor. */
window.Visor3D=function(cont,opt){
  opt=opt||{};
  var THREE=window.THREE; if(!THREE||!cont) return null;
  var w=cont.clientWidth||600, h=cont.clientHeight||420;
  var ren; try{ ren=new THREE.WebGLRenderer({antialias:true,alpha:true}); }catch(e){ return null; }
  ren.setPixelRatio(Math.min(window.devicePixelRatio||1,2)); ren.setSize(w,h); cont.appendChild(ren.domElement);
  var esc=new THREE.Scene(), cam=new THREE.PerspectiveCamera(32,w/h,1,600);
  esc.add(new THREE.HemisphereLight(0xffffff,0xd8c8b0,1.6)); var dl=new THREE.DirectionalLight(0xffffff,1.6); dl.position.set(30,40,60); esc.add(dl);
  var ctr=new window.OrbitControls(cam,ren.domElement); ctr.enableDamping=true; ctr.autoRotate=opt.autoRotate!==false; ctr.autoRotateSpeed=1.1; ctr.enablePan=false;
  var raiz=new THREE.Group(); raiz.rotation.x=-Math.PI/2; esc.add(raiz);
  var vivo=true, actual=null;
  function limpiar(){ while(raiz.children.length){ var o=raiz.children.pop(); o.traverse(function(x){ if(x.geometry) x.geometry.dispose(); if(x.material) x.material.dispose(); }); } }
  function poner(id,capas){
    limpiar(); actual=id;
    var r=(id==="sepiolita"||id==="palygorskita")?construirFibra(id):construir(id,capas||3), c=r.c;
    var g=new THREE.Group();
    g.add(malla(THREE,c.t,COL.T,1)); g.add(malla(THREE,c.o,COL.O,1)); if(c.h.length) g.add(malla(THREE,c.h,COL.H,1));
    var geoE=new THREE.SphereGeometry(1,16,12);
    c.esf.forEach(function(s){ var m=new THREE.Mesh(geoE,new THREE.MeshStandardMaterial({color:COL[s.t]||0x999999,roughness:.4,transparent:s.t==="agua",opacity:s.t==="agua"?.8:1})); m.position.set(s.x,s.y,s.z); m.scale.setScalar(s.r); g.add(m); });
    g.position.z=-r.altura/2; raiz.add(g);
    fibra=!!r.fibra; dist=Math.max(r.altura*3.1, fibra?120:80);
    vista(fibra?"perfil":"oblicua");
    return r;
  }
  var fibra=false, dist=72;
  function vista(tipo){ var d=dist;
    if(tipo==="perfil") cam.position.set(fibra?d:0,0,fibra?0.01:d);
    else if(tipo==="planta") cam.position.set(0,d,0.01);
    else cam.position.set(d*0.62,d*0.2,d*0.76);
    ctr.target.set(0,0,0); ctr.update(); }
  function bucle(){ if(!vivo) return; if(!document.body.contains(cont)){ destruir(); return; } ctr.update(); ren.render(esc,cam); requestAnimationFrame(bucle); }
  function tam(){ var W=cont.clientWidth,H=cont.clientHeight; if(!W||!H) return; ren.setSize(W,H); cam.aspect=W/H; cam.updateProjectionMatrix(); }
  window.addEventListener("resize",tam);
  function destruir(){ vivo=false; limpiar(); ren.dispose(); window.removeEventListener("resize",tam); }
  requestAnimationFrame(bucle);
  return {poner:poner,vista:vista,girar:function(s){ ctr.autoRotate=s; },destruir:destruir,actual:function(){return actual;}};
};
window.MODELOS3D=MODELOS;
})();
