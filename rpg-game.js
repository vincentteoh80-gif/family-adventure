/* RPG 主程序：登录、标题、输入（键盘 + 摇杆）、HUD、对话框、存档、音效 */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var R = window.RPG, DATA = window.RPG_DATA, CFG = window.GAME_CONFIG, T = R.T;
  var SAVE_KEY = 'ffa_rpg_save2', PROG_KEY = 'ffa_rpg_prog', OPT_KEY = 'ffa_rpg_opt';
  var FACE = { tat: 'face-tat.png', yen: 'face-yen.png', ze: 'face-ze.png', xiang: 'face-xiang.png' };
  var prog = { done: {}, carry: {} };
  try { prog = Object.assign(prog, JSON.parse(localStorage.getItem(PROG_KEY)) || {}); } catch (e) {}
  function saveProg() { try { localStorage.setItem(PROG_KEY, JSON.stringify(prog)); } catch (e) {} }
  var opt = { sound: true };
  try { opt = Object.assign(opt, JSON.parse(localStorage.getItem(OPT_KEY)) || {}); } catch (e) {}
  function saveOpt() { try { localStorage.setItem(OPT_KEY, JSON.stringify(opt)); } catch (e) {} }
  function loadSave() { try { return JSON.parse(localStorage.getItem(SAVE_KEY)); } catch (e) { return null; } }
  function writeSave(W) { try { localStorage.setItem(SAVE_KEY, JSON.stringify(R.saveData(W))); } catch (e) {} }

  // ---------- 音效 ----------
  var AC = null;
  function sfx(type) {
    if (!opt.sound) return;
    try {
      if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
      var seq = {
        swing: [[300, 0.05, 'triangle'], [200, 0.05, 'triangle']], wave: [[880, 0.05], [1100, 0.06]], hit: [[180, 0.06, 'square']],
        kill: [[520, 0.06, 'square'], [780, 0.08, 'square']], hurt: [[220, 0.08, 'sawtooth'], [150, 0.12, 'sawtooth']],
        levelup: [[523, 0.1], [659, 0.1], [784, 0.1], [1047, 0.25]], talk: [[660, 0.03, 'square']], quest: [[784, 0.08], [1047, 0.15]],
        got: [[988, 0.06], [1319, 0.12]], spin: [[200, 0.1, 'sawtooth'], [400, 0.1, 'sawtooth'], [600, 0.12, 'sawtooth']], shield: [[600, 0.1], [900, 0.2]],
        dodge: [[400, 0.04, 'triangle']], save: [[523, 0.08], [784, 0.15]], good: [[784, 0.1], [988, 0.1], [1319, 0.2]], bad: [[300, 0.15, 'square'], [250, 0.2, 'square']],
        end: [[523, 0.15], [659, 0.15], [784, 0.15], [1047, 0.15], [784, 0.12], [1047, 0.4]], down: [[392, 0.2], [330, 0.2], [262, 0.4]]
      }[type];
      if (!seq) return;
      var t = AC.currentTime;
      seq.forEach(function (n) {
        var o = AC.createOscillator(), g = AC.createGain(); o.type = n[2] || 'sine'; o.frequency.value = n[0];
        g.gain.setValueAtTime(0.1, t); g.gain.exponentialRampToValueAtTime(0.001, t + n[1]);
        o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + n[1] + 0.02); t += n[1] * 0.9;
      });
    } catch (e) {}
  }

  // ---------- 屏幕 ----------
  function show(id) { ['login', 'title', 'play'].forEach(function (s) { $(s).classList.toggle('show', s === id); }); document.body.dataset.screen = id; }
  function overlay(id) { ['ovPause', 'ovEnd'].forEach(function (o) { $(o).classList.toggle('show', o === id); }); }

  // ---------- 登录 ----------
  function hex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); }
  function unhex(h) { var a = new Uint8Array(h.length / 2); for (var i = 0; i < a.length; i++) a[i] = parseInt(h.substr(i * 2, 2), 16); return a; }
  function derive(pw) {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits']).then(function (k) {
      return crypto.subtle.deriveBits({ name: 'PBKDF2', salt: unhex(CFG.salt), iterations: CFG.iterations, hash: 'SHA-256' }, k, 256);
    }).then(hex);
  }
  function authed() { try { return localStorage.getItem('ffa_auth') === CFG.hash || sessionStorage.getItem('ffa_auth') === CFG.hash; } catch (e) { return false; } }
  $('loginForm').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var msg = $('loginMsg');
    if (!window.crypto || !crypto.subtle) { msg.textContent = '请用 https 网址打开（GitHub Pages 默认就是 https）。'; return; }
    msg.textContent = '验证中…'; $('loginBtn').disabled = true;
    derive($('pw').value).then(function (h) {
      $('loginBtn').disabled = false;
      if (h === CFG.hash) { try { ($('remember').checked ? localStorage : sessionStorage).setItem('ffa_auth', h); } catch (e) {} msg.textContent = ''; $('pw').value = ''; sfx('save'); openTitle(); }
      else { msg.textContent = '密码不对，再试一次吧！'; $('pw').select(); sfx('bad'); }
    }).catch(function () { $('loginBtn').disabled = false; msg.textContent = '验证失败，请刷新页面再试。'; });
  });
  function art(c, ids, s) {
    var x = c.getContext('2d'); x.clearRect(0, 0, c.width, c.height);
    ids.forEach(function (id, i) { drawChar(x, id, c.width / (ids.length + 1) * (i + 1), c.height - 10, { s: s, time: performance.now() / 16 + i * 40, facing: i < ids.length / 2 ? 1 : -1, bride: id === 'yen' && c.id === 'endArt' }); });
  }
  setInterval(function () {
    var sc = document.body.dataset.screen;
    if (sc === 'login') art($('loginArt'), ['tat', 'yen', 'ze', 'xiang'], 3.1);

  }, 60);

  // ---------- 标题 ----------
  function openTitle() {
    stop(); show('title');
    var sv = loadSave();
    $('tContinue').style.display = sv ? '' : 'none';
    if (sv) $('tContinue').textContent = '继续冒险（' + DATA.chapters[sv.ch || 0].title.split('：')[0] + '）';
    $('tSound').textContent = opt.sound ? '音效：开' : '音效：关';
    var list = $('chapList'); list.innerHTML = '';
    DATA.chapters.forEach(function (ch, i) {
      var open = i === 0 || prog.done[i - 1], b = document.createElement('button');
      b.className = 'chap' + (open ? '' : ' locked') + (prog.done[i] ? ' done' : '');
      b.innerHTML = '<b>' + ch.title + '</b><span>' + ch.years + '</span>' + (prog.done[i] ? '<i>已完成</i>' : open ? '' : '<i>未解锁</i>');
      b.disabled = !open;
      b.onclick = function () { newChapter(i); };
      list.appendChild(b);
    });
  }
  function newChapter(i) {
    var sv = loadSave();
    if (sv && sv.ch === i && !confirmNew[i]) { confirmNew[i] = 1; toastTitle('这一章有存档，再按一次会重新开始'); setTimeout(function () { confirmNew[i] = 0; }, 3000); return; }
    confirmNew[i] = 0;
    startGame(null, i, i > 0 ? prog.carry[i - 1] : null);
  }
  var confirmNew = {};
  function toastTitle(m) { var t = $('titleMsg'); t.textContent = m; setTimeout(function () { if (t.textContent === m) t.textContent = ''; }, 3000); }
  $('tContinue').onclick = function () { startGame(loadSave()); };
  $('tSound').onclick = function () { opt.sound = !opt.sound; saveOpt(); $('tSound').textContent = opt.sound ? '音效：开' : '音效：关'; };
  $('tLogout').onclick = function () { try { localStorage.removeItem('ffa_auth'); sessionStorage.removeItem('ffa_auth'); } catch (e) {} show('login'); };

  // ---------- 游戏 ----------
  var cv = $('cv'), ctx = cv.getContext('2d');
  var W = null, raf = 0, last = 0, acc = 0, frame = 0, paused = false, parts = [], shake = 0, camX = 0, camY = 0;
  var view = { w: 640, h: 360, scale: 1, dpr: 1 };
  function resize() {
    var w = window.innerWidth, h = window.innerHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); cv.style.width = w + 'px'; cv.style.height = h + 'px';
    var scale = Math.max(0.7, Math.min(h / 300, w / 360));
    if (w > 1200 && h > 700) scale = Math.min(h / 380, w / 640);
    view = { w: w / scale, h: h / scale, scale: scale, dpr: dpr };
    document.body.classList.toggle('portrait', h > w);
  }
  window.addEventListener('resize', resize);

  function startGame(sv, ch, carry) {
    W = R.create(DATA, sv, ch, carry); parts = []; paused = false; overlay(null);
    show('play'); resize(); camX = W.p.x - view.w / 2; camY = W.p.y - view.h / 2;
    if (sv) toast('继续冒险！');
    banner(W.data.title); setTimeout(function () { if (W) banner(W.area.name); }, 2600);
    if (!sv) writeSave(W);
    hud(true); dialogUI();
    if (!raf) { last = performance.now(); acc = 0; raf = requestAnimationFrame(loop); }
  }
  function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; }
  function loop(now) {
    raf = requestAnimationFrame(loop);
    var dt = Math.min(100, now - last); last = now; acc += dt; var n = 0;
    while (acc >= 1000 / 60 && n < 4) { tick(); acc -= 1000 / 60; n++; }
    if (n >= 4) acc = 0;
    render();
  }

  // ---------- 输入 ----------
  var latch = {}, keys = {}, touch = { attack: false, skill: false, dodge: false, swap: false }, stick = { x: 0, y: 0, id: null }, pendingChoice = -1;
  var KEY = { KeyJ: 'attack', Space: 'attack', KeyK: 'skill', KeyL: 'dodge', ShiftLeft: 'dodge', ShiftRight: 'dodge', KeyQ: 'swap', KeyE: 'talk', Enter: 'talk', NumpadEnter: 'talk', KeyH: 'heal' };
  window.addEventListener('keydown', function (e) {
    if (document.body.dataset.screen !== 'play') return;
    if (e.code === 'Escape' || e.code === 'KeyP') { togglePause(); return; }
    var k = KEY[e.code]; if (k) { keys[k] = true; latch[k] = true; e.preventDefault(); }
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].indexOf(e.code) >= 0) { keys[e.code] = true; e.preventDefault(); }
    if (W && W.dialog && W.dialog.type !== 'say') { var d = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, Numpad1: 0, Numpad2: 1, Numpad3: 2 }[e.code]; if (d !== undefined && d < W.dialog.opts.length) pendingChoice = d; }
  });
  window.addEventListener('keyup', function (e) { var k = KEY[e.code]; if (k) keys[k] = false; keys[e.code] = false; });
  window.addEventListener('blur', function () { keys = {}; resetTouch(); });
  document.addEventListener('visibilitychange', function () { if (document.hidden && W && !paused && !W.ended) togglePause(); });

  function bindBtn(id, k) {
    var el = $(id);
    var on = function (e) { e.preventDefault(); touch[k] = true; latch[k] = true; el.classList.add('on'); try { el.setPointerCapture(e.pointerId); } catch (x) {} };
    var off = function (e) { e.preventDefault(); touch[k] = false; el.classList.remove('on'); };
    el.addEventListener('pointerdown', on); el.addEventListener('pointerup', off); el.addEventListener('pointercancel', off); el.addEventListener('lostpointercapture', off);
    el.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  }
  bindBtn('bAtk', 'attack'); bindBtn('bSkill', 'skill'); bindBtn('bDodge', 'dodge'); bindBtn('bSwap', 'swap');
  function resetTouch() { touch = { attack: false, skill: false, dodge: false, swap: false }; stick.x = stick.y = 0; stick.id = null; $('knob').style.transform = ''; }
  var stickEl = $('stick');
  function stickMove(e) {
    var r = stickEl.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, R2 = r.width / 2;
    var dx = e.clientX - cx, dy = e.clientY - cy, d = Math.sqrt(dx * dx + dy * dy);
    if (d > R2) { dx = dx / d * R2; dy = dy / d * R2; }
    stick.x = dx / R2; stick.y = dy / R2; $('knob').style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
  }
  stickEl.addEventListener('pointerdown', function (e) { e.preventDefault(); stick.id = e.pointerId; try { stickEl.setPointerCapture(e.pointerId); } catch (x) {} stickMove(e); });
  stickEl.addEventListener('pointermove', function (e) { if (e.pointerId === stick.id) stickMove(e); });
  var stickEnd = function (e) { if (e.pointerId === stick.id) { stick.id = null; stick.x = stick.y = 0; $('knob').style.transform = ''; } };
  stickEl.addEventListener('pointerup', stickEnd); stickEl.addEventListener('pointercancel', stickEnd);
  $('play').addEventListener('touchmove', function (e) { if (!e.target.closest('#dialog')) e.preventDefault(); }, { passive: false });
  // 点对话框继续
  $('dialog').addEventListener('pointerdown', function (e) { if (W && W.dialog && W.dialog.type === 'say' && !e.target.closest('button')) { tapNext = true; } });
  var tapNext = false, lastIn = {};

  function input() {
    if (window.__rpgHook) return window.__rpgHook(W);
    var mx = (keys.ArrowRight || keys.KeyD ? 1 : 0) - (keys.ArrowLeft || keys.KeyA ? 1 : 0);
    var my = (keys.ArrowDown || keys.KeyS ? 1 : 0) - (keys.ArrowUp || keys.KeyW ? 1 : 0);
    if (Math.abs(stick.x) > 0.15 || Math.abs(stick.y) > 0.15) { mx = stick.x; my = stick.y; }
    var get = function (k, held) { var v = !!(held || latch[k]); latch[k] = false; return v; };
    var inp = { mx: mx, my: my, attack: get('attack', keys.attack || touch.attack), skill: get('skill', keys.skill || touch.skill), dodge: get('dodge', keys.dodge || touch.dodge),
      swap: get('swap', keys.swap || touch.swap), talk: get('talk', keys.talk || tapNext), heal: get('heal', keys.heal), choice: pendingChoice };
    lastIn = inp; tapNext = false; pendingChoice = -1;
    return inp;
  }

  // ---------- 每帧 ----------
  function tick() {
    frame++;
    if (!W || paused) return;
    var had = !!W.dialog;
    var ev = R.step(W, input());
    ev.forEach(handle);
    if (had !== !!W.dialog || (W.dialog && W.dialog !== lastDlg)) dialogUI();
    for (var i = parts.length - 1; i >= 0; i--) { var q = parts[i]; q.x += q.vx; q.y += q.vy; q.vy += q.g; if (--q.life <= 0) parts.splice(i, 1); }
    if (shake > 0) shake--;
    var tx = W.p.x - view.w / 2, ty = W.p.y - view.h / 2 - 10;
    tx = Math.max(0, Math.min(W.mw * T - view.w, tx)); ty = Math.max(-40, Math.min(W.mh * T - view.h + 20, ty));
    if (W.mw * T < view.w) tx = (W.mw * T - view.w) / 2; if (W.mh * T < view.h) ty = (W.mh * T - view.h) / 2;
    camX += (tx - camX) * 0.18; camY += (ty - camY) * 0.18;
    if (frame % 6 === 0) hud();
  }
  function txt(x, y, s, c, big) { parts.push({ x: x, y: y, vx: 0, vy: -0.7, g: 0, life: 50, txt: s, c: c || '#fff', big: big }); }
  function burst(x, y, c, n) { for (var i = 0; i < n; i++) parts.push({ x: x, y: y, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4 - 1, g: 0.05, life: 25 + Math.random() * 15, c: c, r: 2 + Math.random() * 3 }); }
  var ITEMNAME = { bento: '便当', eggs: '番茄炒蛋', chicken: '芽菜鸡', ring: '戒指' };
  function handle(e) {
    switch (e.type) {
      case 'swing': sfx('swing'); break;
      case 'wave': sfx('wave'); break;
      case 'kick': sfx('swing'); break;
      case 'ink': sfx('wave'); break;
      case 'chess': sfx('spin'); toast('将军！附近的敌人被冻住了'); break;
      case 'helper': sfx('shield'); toast('Xiang 画出了一个小帮手！'); break;
      case 'stolen': sfx('bad'); txt(W.p.x, W.p.y - 60, '-' + e.n + ' 金币', '#ff8a65'); toast(e.by + '偷走了金币！'); break;
      case 'dmg': sfx('hit'); txt(e.x, e.y - 20, String(e.n), '#fff59d'); burst(e.x, e.y + 10, '#ffffff', 4); break;
      case 'kill': sfx('kill'); burst(e.x, e.y, '#ffd54f', e.boss ? 40 : 12); txt(e.x, e.y - 20, '+' + e.exp + ' 经验', '#b9f6ca'); if (e.boss) shake = 20; break;
      case 'hurt': sfx('hurt'); shake = 8; txt(e.x, e.y - 30, '-' + e.n, '#ff5252'); break;
      case 'levelup': sfx('levelup'); txt(W.p.x, W.p.y - 70, '升级！Lv' + e.lv, '#ffeb3b', true); toast('升级到 Lv' + e.lv + '！体力回满' + (e.lv === 2 ? '，Tat 学会“旋风扫把”（技能）' : '')); break;
      case 'quest': sfx('quest'); toast('新任务：' + W.data.quests[e.id].t); hud(true); break;
      case 'got': sfx('got'); if (!e.silent) toast('得到 ' + (ITEMNAME[e.item] || e.item) + ' ×' + e.n); break;
      case 'coins': txt(W.p.x, W.p.y - 40, '+' + e.n + ' 金币', '#ffd54f'); break;
      case 'gear': sfx('levelup'); toast('装备了新眼镜！攻击力 +2'); break;
      case 'join': sfx('levelup'); toast(CHARS[e.id].name + ' 加入了队伍！'); hud(true); break;
      case 'spin': sfx('spin'); shake = 6; break;
      case 'shield': sfx('shield'); toast(e.mask ? '口罩护盾！全队回血' : '爱心护盾！全队回血'); break;
      case 'dodge': sfx('dodge'); break;
      case 'swap': sfx('talk'); toast('换成 ' + CHARS[e.id].name); break;
      case 'swapDown': toast('体力用完，换 ' + CHARS[e.id].name + ' 上场！'); break;
      case 'down': sfx('down'); toast('全队晕倒了……回到最近的相框'); break;
      case 'revive': toast('回到存档点，体力回满'); break;
      case 'save': sfx('save'); writeSave(W); txt(W.p.x, W.p.y - 50, '已存档', '#80deea'); break;
      case 'area': banner(W.area.name); writeSave(W); camX = W.p.x - view.w / 2; camY = W.p.y - view.h / 2; break;
      case 'heal': sfx('got'); burst(e.x, e.y, '#69f0ae', 14); toast('吃了' + ITEMNAME[e.item] + '，体力恢复！'); break;
      case 'msg': toast(e.t); break;
      case 'quizGood': sfx('good'); break;
      case 'quizBad': sfx('bad'); break;
      case 'summon': toast('它叫来了帮手！'); break;
      case 'chest': sfx('got'); burst(e.x, e.y, '#ffd54f', 16); break;
      case 'end': sfx('end'); prog.done[W.ch] = true; prog.carry[W.ch] = R.carryData(W); saveProg(); try { localStorage.removeItem(SAVE_KEY); } catch (x) {} setTimeout(showEnd, 600); break;
    }
  }
  var toastT = 0;
  function toast(m) { var t = $('toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 2200); }
  var bannerT = 0;
  function banner(m) { var b = $('areaBanner'); b.textContent = m; b.classList.add('show'); clearTimeout(bannerT); bannerT = setTimeout(function () { b.classList.remove('show'); }, 2500); }

  // ---------- 对话框 ----------
  var lastDlg = null, noFace = {};
  function dialogUI() {
    var d = W && W.dialog; lastDlg = d;
    $('dialog').classList.toggle('show', !!d);
    document.body.classList.toggle('in-dialog', !!d);
    if (!d) return;
    sfx('talk');
    var who = d.who, name, face;
    if (who === 'tat' || who === 'yen' || who === 'ze' || who === 'xiang') { name = CHARS[who].name; face = who; }
    else if (who === 'npc') { name = d.name || ''; face = W._npcLook && W._npcLook !== 'none' ? W._npcLook : null; }
    else { name = ''; face = null; }
    $('dlgName').textContent = name; $('dlgName').style.display = name ? '' : 'none';
    $('dlgText').textContent = d.t;
    var fc = $('dlgFace'), fx = fc.getContext('2d'), img = $('dlgImg'); fx.clearRect(0, 0, 96, 96);
    if (face && FACE[face] && !noFace[face]) {
      img.onerror = function () { noFace[face] = 1; img.style.display = 'none'; fc.style.display = ''; drawChar(fx, face, 48, 150, { s: 3.2, noShadow: true, time: 60 }); };
      img.src = FACE[face]; img.style.display = ''; fc.style.display = 'none'; }
    else { img.style.display = 'none'; fc.style.display = face ? '' : 'none'; if (face) drawChar(fx, face, 48, 150, { s: 3.2, noShadow: true, time: 60 }); }
    $('dialog').classList.toggle('sys', !name);
    var o = $('dlgOpts'); o.innerHTML = '';
    if (d.type !== 'say') {
      d.opts.forEach(function (t, i) {
        var b = document.createElement('button'); b.className = 'btn opt'; b.textContent = (i + 1) + '. ' + t;
        b.onclick = function () { pendingChoice = i; }; o.appendChild(b);
      });
    }
    $('dlgNext').style.display = d.type === 'say' ? '' : 'none';
  }

  // ---------- HUD ----------
  var hudCache = '';
  function hud(force) {
    if (!W) return;
    var h = '';
    W.party.forEach(function (m, i) {
      var mx = R.maxHp(W, m.id), pc = Math.max(0, m.hp / mx * 100);
      h += '<div class="pm' + (i === W.active ? ' act' : '') + (m.hp <= 0 ? ' ko' : '') + '"><img src="' + FACE[m.id] + '" alt="" onerror="this.style.visibility=\'hidden\'"><div><b>' + CHARS[m.id].name + '</b><i class="hp"><i style="width:' + pc + '%"></i></i><small>' + m.hp + '/' + mx + '</small></div></div>';
    });
    var key = h + W.looks.yen;
    if (force || key !== hudCache) {
      hudCache = key; $('party').innerHTML = h;

    }
    var xi = R.expInfo(W);
    $('lv').textContent = 'Lv' + xi.lv; $('xp').style.width = Math.min(100, xi.cur / xi.need * 100) + '%';
    $('coins').textContent = W.coins; $('nBento').textContent = W.items.bento || 0; $('nEggs').textContent = W.items.eggs || 0; $('nChicken').textContent = W.items.chicken || 0;
    $('bEggs').style.display = W.items.eggs ? '' : 'none'; $('bChicken').style.display = W.items.chicken ? '' : 'none';
    var q = W.quest && W.data.quests[W.quest]; $('questT').textContent = q ? q.t : '';
    var boss = W.enemies.filter(function (e) { return e.boss && e.alive && e.aggro; })[0];
    $('bossBar').classList.toggle('show', !!boss);
    if (boss) { $('bossName').textContent = boss.st.name; $('bossHp').style.width = Math.max(0, boss.hp / boss.maxHp * 100) + '%'; }
    var p = W.p, it = R.interactable(W), near = W.enemies.some(function (e) { return e.alive && Math.hypot(e.x - p.x, e.y - p.y) < 110; });
    $('bAtk').textContent = it && !near ? '对话' : '攻击';
    $('bSwap').style.display = W.party.length > 1 ? '' : 'none';
    var id = R.member(W).id;
    $('bSkill').firstChild.nodeValue = { tat: W.level < 2 ? 'Lv2解锁' : '旋风', yen: W.data.yenSkill === 'mask' ? '口罩' : '爱心', ze: '将军', xiang: '帮手' }[id];
    $('skillCd').style.height = (p.skillCd > 0 ? p.skillCd / ({ tat: 240, yen: W.data.yenSkill === 'mask' ? 420 : 480, ze: 420, xiang: 600 }[id]) * 100 : 0) + '%';
  }
  $('bBento').onclick = function () { if (W) { R.useItem(W, 'bento'); W.events.forEach(handle); W.events.length = 0; hud(true); } };
  $('bChicken').onclick = function () { if (W) { R.useItem(W, 'chicken'); W.events.forEach(handle); W.events.length = 0; hud(true); } };
  $('bEggs').onclick = function () { if (W) { R.useItem(W, 'eggs'); W.events.forEach(handle); W.events.length = 0; hud(true); } };
  $('bMenu').onclick = togglePause;
  function togglePause() {
    if (!W || W.ended) return;
    paused = !paused; overlay(paused ? 'ovPause' : null); keys = {}; resetTouch();
    if (paused) { var xi = R.expInfo(W); $('pStats').innerHTML = W.data.title + '<br>等级 Lv' + xi.lv + '　金币 ' + W.coins + '　便当 ' + (W.items.bento || 0) + (W.gear.glasses ? '<br>装备：新眼镜（攻击 +2）' : '') + '<br>任务：' + (W.data.quests[W.quest] ? W.data.quests[W.quest].t : ''); }
  }
  $('pResume').onclick = togglePause;
  $('pTitle').onclick = function () { paused = false; overlay(null); writeSave(W); openTitle(); };
  function showEnd() {
    overlay('ovEnd');
    var last = W.ch + 1 >= DATA.chapters.length;
    $('endTitle').textContent = last ? '全部章节完成！' : W.data.title.split('：')[0] + '完成！';
    $('endFaces').innerHTML = W.party.map(function (m) { return '<img src="' + FACE[m.id] + '" alt="" onerror="this.style.display=\'none\'">'; }).join('');
    var xi = R.expInfo(W);
    $('endInfo').innerHTML = W.data.endText + '<br>等级 Lv' + xi.lv + '　金币 ' + W.coins + (last ? '<br><br>谢谢你玩我们家的故事！' : '<br><br>下一章：' + DATA.chapters[W.ch + 1].title);
    $('eNext').style.display = last ? 'none' : '';
  }
  $('eTitle').onclick = function () { overlay(null); openTitle(); };
  $('eNext').onclick = function () { var n = W.ch + 1; overlay(null); startGame(null, n, prog.carry[n - 1]); };

  // ---------- 绘制 ----------
  function render() {
    if (!W) return;
    var d = view.dpr, sc = view.scale;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#1b1340'; ctx.fillRect(0, 0, cv.width, cv.height);
    var sx = shake ? (Math.random() - 0.5) * shake : 0, sy = shake ? (Math.random() - 0.5) * shake : 0;
    ctx.setTransform(d * sc, 0, 0, d * sc, d * sx, d * sy);
    var cx = Math.round(camX), cy = Math.round(camY);
    RPGDraw.world(ctx, W, cx, cy, view.w, view.h, frame, W.looks, { arrow: !W.dialog });
    parts.forEach(function (q) {
      ctx.globalAlpha = Math.min(1, q.life / 20);
      if (q.txt) { ctx.font = 'bold ' + (q.big ? 20 : 14) + 'px "PingFang SC","Microsoft YaHei",sans-serif'; ctx.textAlign = 'center'; ctx.lineWidth = 3; ctx.strokeStyle = '#000a'; ctx.strokeText(q.txt, q.x - cx, q.y - cy); ctx.fillStyle = q.c; ctx.fillText(q.txt, q.x - cx, q.y - cy); }
      else { ctx.fillStyle = q.c; ctx.fillRect(q.x - cx - q.r / 2, q.y - cy - q.r / 2, q.r, q.r); }
    });
    ctx.globalAlpha = 1;
    if (W.status === 'down') { ctx.fillStyle = 'rgba(0,0,0,' + (0.6 - W.down / 240) + ')'; ctx.fillRect(0, 0, view.w, view.h); }
  }

  // ---------- 启动 ----------
  if (window.matchMedia && matchMedia('(pointer: coarse)').matches) document.body.classList.add('touch');
  window.addEventListener('touchstart', function () { document.body.classList.add('touch'); }, { once: true, passive: true });
  if (authed()) openTitle(); else show('login');
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) navigator.serviceWorker.register('sw.js').catch(function () {});
  window.RPGGAME = { get W() { return W; }, start: startGame, get paused() { return paused; }, get prog() { return prog; } };
})();
