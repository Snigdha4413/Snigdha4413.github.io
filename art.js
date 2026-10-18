/* Sticker-world engine: painted card art, shared nav, scroll-drawn rainbow ribbon, letter pop-ins and parallax. */
const Art = {
  P: { a:['#ffd9a8','#ff9a8b','#e8548a','#5b3fa0','#fff3c4'], b:['#9be0d0','#4fb8c0','#3a6fd0','#2b2f7a','#fff3c4'],
       c:['#f6d55c','#ff9a4d','#e8548a','#7a3fb0','#fff6d0'], d:['#c8b8ff','#8f86e0','#4a3fa0','#1f1a50','#fff1b8'] },
  rnd(s) { return () => (s = (s * 16807) % 2147483647) / 2147483647; },
  render(c, pal, seed, w = 720, h = 480) {
    c.width = w; c.height = h;
    const x = c.getContext('2d'), r = this.rnd(seed * 97 + 13), g = x.createLinearGradient(0, 0, 0, h);
    pal.slice(0, 4).forEach((k, i) => g.addColorStop(i / 3, k)); x.fillStyle = g; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 40; i++) {
      const px = r() * w, py = r() * h, rad = 40 + r() * 140, k = r() < .3 ? '#ffffff' : pal[Math.floor(r() * 4)], rg = x.createRadialGradient(px, py, 0, px, py, rad);
      rg.addColorStop(0, k + '66'); rg.addColorStop(1, k + '00');
      x.save(); x.translate(px, py); x.rotate(r() * 6); x.scale(1.7, .45); x.translate(-px, -py);
      x.fillStyle = rg; x.beginPath(); x.arc(px, py, rad, 0, 7); x.fill(); x.restore();
    }
    x.fillStyle = pal[4]; x.strokeStyle = '#1c1c1f'; x.lineWidth = h * .014;
    x.beginPath(); x.arc(w * (.2 + .6 * r()), h * (.14 + .18 * r()), h * .08, 0, 7); x.fill(); x.stroke();
    ['55', '99', 'dd'].forEach((al, n) => {
      x.fillStyle = pal[3] + al; x.beginPath(); x.moveTo(0, h); const base = h * (.62 + n * .12);
      for (let i = 0; i <= 4; i++) x.quadraticCurveTo(w * (i + .5) / 4, base - 30 - r() * 70, w * (i + 1) / 4, base + r() * 30);
      x.lineTo(w, h); x.fill();
    });
  },
  posters() { document.querySelectorAll('canvas[data-seed]').forEach(c => this.render(c, JSON.parse(c.dataset.pal), +c.dataset.seed, 540, 720)); },
  chrome() {
    const t = '<span>Open to research, data projects and campus events ✦</span>'.repeat(8), K = '#1c1c1f';
    document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="star" viewBox="0 0 100 100"><path d="M50 2C54 34 66 46 98 50C66 54 54 66 50 98C46 66 34 54 2 50C34 46 46 34 50 2Z" fill="currentColor"/></symbol>
<symbol id="moon" viewBox="0 0 100 100"><g stroke="${K}" stroke-width="4" stroke-linecap="round"><circle cx="50" cy="50" r="44" fill="#f6c744"/><circle cx="38" cy="44" r="8" fill="#fff"/><circle cx="62" cy="44" r="8" fill="#fff"/><circle cx="40" cy="45" r="3" fill="${K}"/><circle cx="64" cy="45" r="3" fill="${K}"/><path d="M38 64Q51 77 64 64" fill="none"/></g></symbol>
<symbol id="flower" viewBox="0 0 100 100"><g stroke="${K}" stroke-width="4"><g fill="#fff"><ellipse cx="50" cy="20" rx="11" ry="18"/><ellipse cx="50" cy="20" rx="11" ry="18" transform="rotate(60 50 50)"/><ellipse cx="50" cy="20" rx="11" ry="18" transform="rotate(120 50 50)"/><ellipse cx="50" cy="20" rx="11" ry="18" transform="rotate(180 50 50)"/><ellipse cx="50" cy="20" rx="11" ry="18" transform="rotate(240 50 50)"/><ellipse cx="50" cy="20" rx="11" ry="18" transform="rotate(300 50 50)"/></g><circle cx="50" cy="50" r="17" fill="#f6c744"/><circle cx="44" cy="47" r="2.5" fill="${K}"/><circle cx="56" cy="47" r="2.5" fill="${K}"/><path d="M44 56Q50 62 57 56" fill="none" stroke-linecap="round"/></g></symbol>
<symbol id="cloud" viewBox="0 0 120 70"><path d="M14 62C-2 62-2 40 18 40C20 16 56 14 62 34C80 24 106 38 98 54C114 54 114 62 100 62Z" fill="#ffc9a0" stroke="${K}" stroke-width="4" stroke-linejoin="round"/></symbol></defs></svg>
<div class="tick" aria-hidden="true"><div>${t}${t}</div></div>
<header class="nav"><nav class="nl"><a href="index.html#about">About</a><a href="index.html#projects">Projects</a><a href="index.html#community">Community</a><a href="index.html#hobbies">Hobbies</a></nav><a class="brand" href="index.html">snigdha.</a><nav class="nr"><a class="pill" href="index.html#contact">Contact</a><a class="pill" href="https://github.com/Snigdha4413" target="_blank" rel="noopener">GitHub</a></nav></header>`);
  },
  split() {
    document.querySelectorAll('[data-sp]').forEach(h => {
      let i = 0; h.setAttribute('aria-label', h.textContent); h.classList.add('sp');
      h.innerHTML = h.innerHTML.split(/(<br>|\s+)/).map(w => /^(<br>|\s+)$/.test(w) ? (w === '<br>' ? w : ' ') : `<span class="w" aria-hidden="true">${[...w].map(c => `<span style="--i:${i++}">${c}</span>`).join('')}</span>`).join('');
    });
  },
  // A rainbow ribbon that weaves down the page and is drawn as you scroll.
  ribbon(main, still) {
    const NS = 'http://www.w3.org/2000/svg', svg = document.createElementNS(NS, 'svg'); svg.id = 'rb'; svg.setAttribute('aria-hidden', 'true');
    const cols = ['#1c1c1f', '#e8548a', '#ff9a4d', '#f6d55c', '#8f86e0', '#f5ead9'], ws = [64, 54, 44, 34, 24, 12];
    const ph = cols.map(c => { const p = document.createElementNS(NS, 'path'); p.setAttribute('fill', 'none'); p.setAttribute('stroke', c); p.setAttribute('stroke-linecap', 'round'); svg.appendChild(p); return p; });
    main.prepend(svg); let L = 1, Y0 = 0, Y1 = 1, cur = 0;
    const build = () => {
      const W = innerWidth, H = main.offsetHeight, k = W < 760 ? .5 : 1, S = [...main.querySelectorAll('.sec')],
        ys = S.length > 1 ? S.map((s, i) => s.offsetTop + s.offsetHeight * (i ? .5 : .72)) : [H * .2, H * .8],
        pts = [[ys.length ? (W * .9 > W / 2 ? W * 1.15 : -W * .15) : 0, ys[0] - 320], ...ys.map((y, i) => [W * (i % 2 ? .1 : .9), y])];
      let d = 'M' + pts[0];
      for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], m = (a[1] + b[1]) / 2; d += `C${a[0]},${m} ${b[0]},${m} ${b[0]},${b[1]}`; }
      svg.setAttribute('width', W); svg.setAttribute('height', H);
      ph.forEach((p, i) => { p.setAttribute('d', d); p.setAttribute('stroke-width', ws[i] * k); });
      L = ph[0].getTotalLength(); ph.forEach(p => p.style.strokeDasharray = L + ' ' + (L + 400)); Y0 = pts[0][1]; Y1 = pts[pts.length - 1][1];
    };
    new ResizeObserver(build).observe(main); build();
    return y => {
      const t = still || y + innerHeight >= main.offsetHeight - 8 ? 1 : Math.max(0, Math.min(1, (y + innerHeight * .9 - Y0) / (Y1 - Y0)));
      cur += (t - cur) * (still ? 1 : .1); ph.forEach(p => p.style.strokeDashoffset = L * (1 - cur));
    };
  },
  page() {
    const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
    this.chrome(); this.split();
    const io = new IntersectionObserver(e => e.forEach(n => { if (n.isIntersecting) { n.target.classList.add('in'); io.unobserve(n.target); } }), { threshold: .2 });
    document.querySelectorAll('[data-r],[data-sp]').forEach(e => io.observe(e));
    const upd = this.ribbon(document.querySelector('main'), still), par = [...document.querySelectorAll('[data-s]')];
    const tick = () => { par.forEach(e => e.style.transform = `translate3d(0,${scrollY * e.dataset.s}px,0)`); upd(scrollY); if (!still) requestAnimationFrame(tick); };
    still ? addEventListener('scroll', () => upd(scrollY), { passive: true }) : 0; tick();
  }
};
