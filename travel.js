(() => {
  'use strict';
  const chapters=window.TRAVEL_CHAPTERS;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pad=n=>String(n).padStart(2,'0');
  document.querySelector('#chapter-nav').innerHTML=chapters.map((c,i)=>`<a href="#${c.id}" style="--chapter:${c.color}"><span>${pad(i+1)}</span>${esc(c.en)}<small>${c.year}</small></a>`).join('');
  document.querySelector('#chapters').innerHTML=chapters.map((c,i)=>`<section class="roll" id="${c.id}" style="--chapter:${c.color}" aria-labelledby="title-${c.id}"><div class="roll-label"><span class="roll-number">${pad(i+1)}</span><h2 id="title-${c.id}">${esc(c.en)}</h2><p class="roll-place">${esc(c.name)}</p><span class="roll-meta">${c.year} · ${pad(c.photos.length)} FRAMES</span></div><div class="filmstrip">${c.photos.map((p,j)=>`<button class="frame" data-chapter="${i}" data-photo="${j}" aria-label="查看${esc(c.name)}照片 ${j+1}：${esc(p.caption)}"><img src="${p.thumb}" alt="${esc(p.caption)}" loading="${i===0?'eager':'lazy'}"><span class="frame-index">${pad(j+1)}</span><span class="frame-label">${esc(p.caption)} ↗</span></button>`).join('')}</div></section>`).join('');
  const viewer=document.querySelector('#photo-viewer');const img=document.querySelector('#viewer-image');
  let ci=0,pi=0,opener=null;
  function render(){const c=chapters[ci],p=c.photos[pi];img.src=p.src;img.alt=c.name+' · '+p.caption;document.querySelector('#viewer-location').textContent=c.name+' / '+c.en+' · '+c.year;document.querySelector('#viewer-caption').textContent=p.caption;document.querySelector('#viewer-counter').textContent=pad(pi+1)+' / '+pad(c.photos.length);document.querySelector('#viewer-thumbnails').innerHTML=c.photos.map((p,i)=>`<button data-index="${i}" aria-label="查看第${i+1}张：${esc(p.caption)}" aria-current="${i===pi}"><img src="${p.thumb}" alt=""></button>`).join('');}
  function step(delta){pi=(pi+delta+chapters[ci].photos.length)%chapters[ci].photos.length;render();}
  document.querySelector('#chapters').addEventListener('click',e=>{const b=e.target.closest('.frame');if(!b)return;ci=Number(b.dataset.chapter);pi=Number(b.dataset.photo);opener=b;render();viewer.showModal();document.body.style.overflow='hidden';});
  document.querySelector('#viewer-close').addEventListener('click',()=>viewer.close());
  viewer.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus({preventScroll:true});});
  document.querySelector('#photo-prev').addEventListener('click',()=>step(-1));document.querySelector('#photo-next').addEventListener('click',()=>step(1));
  viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();step(e.key==='ArrowLeft'?-1:1);}});
  document.querySelector('#viewer-thumbnails').addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(b){pi=Number(b.dataset.index);render();document.querySelector(`#viewer-thumbnails [data-index="${pi}"]`).focus();}});
  let touchX=null;img.addEventListener('touchstart',e=>{if(e.touches.length===1)touchX=e.touches[0].clientX;},{passive:true});img.addEventListener('touchend',e=>{if(touchX===null)return;const d=e.changedTouches[0].clientX-touchX;if(Math.abs(d)>55)step(d>0?-1:1);touchX=null;},{passive:true});
})();
