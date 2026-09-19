(() => {
  'use strict';
  const config = window.PORTFOLIO;
  const dialog = document.querySelector('#detail');
  const content = document.querySelector('#detail-content');
  const keys = ['education','experience','projects','awards','life'];
  const meta = {
    education: ['01 / EDUCATION','教育经历','从生物技术到计算机，再到智能科学与技术。'],
    experience: ['02 / EXPERIENCE','工作经历','在跨境清算业务中，连接数据分析与实际应用。'],
    projects: ['03 / RESEARCH & CODE','GitHub 项目','研究问题，也把想法写进代码。'],
    awards: ['04 / RECOGNITION','奖项','成长路上，值得记录的肯定。'],
    life: ['05 / BEYOND THE SCREEN','个人生活','屏幕之外，还有很多热爱的事。']
  };
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeURL = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; } catch { return ''; } };
  const tags = values => '<div class="tag-list">'+values.map(v=>'<span class="tag">'+escape(v)+'</span>').join('')+'</div>';
  const renderers = {
    education: () => config.education.map(([date,name,degree,description])=>`<article class="timeline-item"><div class="date">${escape(date)}</div><div><h3 class="item-title">${escape(name)}</h3><p class="item-description">${escape(degree)}</p>${description ? `<p class="item-description">${escape(description)}</p>` : ''}</div></article>`).join(''),
    experience: () => `<div class="date">2020.07 — 2023.07</div><h3 class="item-title">跨境银行间清算公司（CIPS） · 数据部</h3><div class="work-stats"><div class="stat"><strong>20+</strong><span>业务分析报告</span></div><div class="stat"><strong>100+</strong><span>国家维度覆盖</span></div><div class="stat"><strong>70+</strong><span>银行维度覆盖</span></div></div><ul class="work-list"><li><strong>数据统计分析</strong>：使用 Excel、Python、SQL 编制跨境人民币业务分析报告。</li><li><strong>数据可视化</strong>：使用 Tableau、ECharts、Excel 设计 20 余份数据可视化图表。</li><li><strong>数据安全治理</strong>：参与数据治理方案研究及相关数据制度修订。</li><li><strong>数据服务推广</strong>：参与服贸会、进博会等国际博览会的宣传推广工作。</li></ul>${tags(['Python','SQL','Tableau','ECharts','Excel','数据治理'])}`,
    projects: () => `${safeURL(config.github) ? `<a class="project-link" href="${escape(safeURL(config.github))}" target="_blank" rel="noopener noreferrer">访问我的 GitHub ↗</a><br><br>` : ''}` + config.projects.map(p=>`<article class="project-card"><div class="project-top"><span>${escape(p.date)}</span><span>${escape(p.kind || "PROJECT")}</span></div><h3>${escape(p.name)}</h3><p>${escape(p.description)}</p>${tags(p.tags)}<span class="project-note">${escape(p.result)}</span>${safeURL(p.url) ? `<a class="project-link" href="${escape(safeURL(p.url))}" target="_blank" rel="noopener noreferrer">查看项目 <span aria-hidden="true">↗</span></a>` : '<span class="project-note">项目链接待补充</span>'}</article>`).join(''),
    awards: () => `<div class="awards-grid"><article class="award-card"><span class="award-mark" aria-hidden="true">✳</span><span class="date">2017.05</span><h3>校级一等奖学金</h3><p>华中师范大学</p></article><article class="award-card"><span class="award-mark" aria-hidden="true">✳</span><span class="date">2022.05</span><h3>优秀共青团员</h3><p>中国人民银行清算总中心</p></article></div><div class="secondary-awards"><p>2017 · 优秀毕业生<br>连续三年 · 校级三好学生</p></div>`,
    life: () => `<div class="life-layout"><img class="life-photo" src="assets/portrait.jpg" alt="戴子淳开怀微笑的写真" loading="lazy"><div class="life-copy"><h3>认真生活，<br>收藏日常的快乐。</h3><p>喜欢唱歌、跳舞，也喜欢旅行、游泳、电影和做饭。对感兴趣的事保持耐心，也善于发现身边的美食。</p></div></div><a class="travel-preview" href="travel.html"><img src="assets/travel/maldives-2-thumb.webp" alt="马尔代夫海上秋千" loading="lazy"><span><small>03 CHAPTERS · 09 FRAMES</small><strong>旅行影集</strong><em>西塘 · 日本 · 马尔代夫</em></span><b aria-hidden="true">↗</b></a><div class="life-interests">${[['唱歌','MUSIC'],['跳舞','DANCE'],['旅行','TRAVEL'],['游泳','SWIMMING'],['电影','FILMS'],['做饭','COOKING']].map(([cn,en])=>cn==='旅行'?`<a class="interest travel-interest" href="travel.html">${cn} ↗<span>TRAVEL ALBUM · 9 PHOTOS</span></a>`:`<div class="interest">${cn}<span>${en}</span></div>`).join('')}</div>`
  };
  let current = '', previousFocus = null, openedFromHome = false;
  function sync() {
    const key = location.hash.slice(1);
    if (!keys.includes(key)) { if (dialog.open) dialog.close(); current=''; return; }
    current = key;
    document.querySelector('#detail-kicker').textContent = meta[key][0];
    document.querySelector('#detail-title').textContent = meta[key][1];
    document.querySelector('#detail-subtitle').textContent = meta[key][2];
    document.querySelector('#detail-page').textContent = `${String(keys.indexOf(key)+1).padStart(2,'0')} / 05`;
    document.querySelector('#next-section').innerHTML = (key === 'life' ? '回到第一章' : '下一章') + ' <span aria-hidden="true">→</span>';
    content.innerHTML = renderers[key]();
    if (!dialog.open) { previousFocus = document.activeElement; dialog.showModal(); document.body.style.overflow='hidden'; }
    dialog.scrollTop = 0;
  }
  function closeDetail() {
    if (openedFromHome) { openedFromHome = false; history.back(); }
    else { history.replaceState(null,'',location.pathname+location.search); sync(); }
  }
  document.querySelectorAll('[data-section]').forEach(link=>link.addEventListener('click',()=>{openedFromHome = !keys.includes(location.hash.slice(1));}));
  document.querySelector('.close-button').addEventListener('click',closeDetail);
  dialog.addEventListener('cancel', event=>{event.preventDefault();closeDetail();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDetail();}});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';previousFocus?.focus();});
  document.querySelector('#next-section').addEventListener('click',()=>{const key=keys[(keys.indexOf(current)+1)%keys.length];history.replaceState(null,'','#'+key);sync();});
  window.addEventListener('hashchange',sync);
  const toggle = document.querySelector('.motion-toggle');
  const cover = document.querySelector('.cover');
  const character = document.querySelector('.character');
  const motion = document.querySelector('.character-motion');
  const caption = document.querySelector('.character-caption');
  const skip = document.querySelector('#skip-intro');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let introTimer;
  function finishIntro() { clearTimeout(introTimer); cover.classList.remove('entering'); skip.hidden=true; }
  function updateMotion() {document.body.classList.toggle('paused',paused);toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'开启动效':'暂停动效';if(paused)finishIntro();}
  function playIntro() {
    finishIntro();
    if (reducedMotion.matches) return;
    paused=false;updateMotion();
    void motion.offsetWidth;
    cover.classList.add('entering');skip.hidden=false;
    introTimer=setTimeout(finishIntro,4900);
  }
  toggle.addEventListener('click',()=>{paused=!paused;updateMotion();});
  document.querySelector('#replay').addEventListener('click',playIntro);
  skip.addEventListener('click',finishIntro);
  const words=['关于我的求学旅程','那些与数据同行的日子','来看看我在研究什么','每一份努力，都有回响','生活，还有很多面'];
  document.querySelectorAll('.ticket').forEach((ticket,index)=>{
    const enter=()=>{
      finishIntro();
      if(!paused&&!reducedMotion.matches) character.style.transform=`translateX(${(index-2)*9}px) rotate(${(index-2)*-3}deg) scale(1.025)`;
      caption.textContent=words[index];caption.classList.add('visible');
    };
    const leave=()=>{character.style.transform='';caption.classList.remove('visible');};
    ticket.addEventListener('pointerenter',enter);ticket.addEventListener('pointerleave',leave);
    ticket.addEventListener('focus',enter);ticket.addEventListener('blur',leave);
    ticket.addEventListener('click',()=>{finishIntro();leave();});
  });
  document.querySelector('#year').textContent=new Date().getFullYear();updateMotion();sync();
  if(!location.hash) { if(character.complete&&character.naturalWidth) playIntro(); else character.addEventListener('load',playIntro,{once:true}); }
})();
