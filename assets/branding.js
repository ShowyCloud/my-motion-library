(function(g){
'use strict';
const fallback={name:'动态创意参考库',description:'',icon:''};
const B={site:Object.assign({},fallback,(g.MP_EDITOR_DATA||{}).site||{})};
B.apply=function(site,page){B.site=Object.assign({},fallback,site||{});const name=B.site.name||fallback.name;let title=page==='found'?'参考案例｜'+name:page==='editor'?'可视化编辑｜'+name:name;document.title=title;document.querySelectorAll('.logo').forEach(el=>{el.textContent='';if(B.site.icon){let img=document.createElement('img');img.src=B.site.icon;img.className='brand-icon';img.alt='';el.append(img);}let text=document.createElement('span');text.className='brand-name';text.textContent=name;el.append(text);el.setAttribute('aria-label',name);});let brand=document.querySelector('.brand');if(brand)brand.textContent=name+' / 本地编辑器';let icon=document.querySelector('link[rel="icon"]');if(!icon){icon=document.createElement('link');icon.rel='icon';document.head.append(icon);}icon.href=B.site.icon||'assets/favicon.svg';icon.removeAttribute('type');let values={'meta[property="og:site_name"]':name,'meta[property="og:title"]':title};if(B.site.description){values['meta[name="description"]']=B.site.description;values['meta[property="og:description"]']=B.site.description;}Object.keys(values).forEach(sel=>{let meta=document.querySelector(sel);if(meta)meta.setAttribute('content',values[sel]);});};
g.MPBrand=B;
})(window);
