/* 主程序：登录、菜单、游戏循环、输入、音效、存档 */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var E = window.Engine, D = window.Draw, LV = window.LEVELS, CFG = window.GAME_CONFIG, T = E.T;
  var IDS = ['tat', 'yen', 'ze', 'xiang'];
  var MAP_H = 14 * T, VIEW_TOP = 80, VIEW_H = MAP_H - VIEW_TOP; // 顶部几行一直是空的天空，裁掉让角色更大

  // ---------- 存档 ----------
  var SAVE_KEY = 'ffa_save_v1';
  var save = { unlocked: 1, best: {}, char: 'yen', sound: true };
  try { var s0 = JSON.parse(localStorage.getItem(SAVE_KEY)); if (s0) save = Object.assign(save, s0); } catch (e) {}
  function writeSave() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {} }

  // ---------- 音效（WebAudio，无需音频文件） ----------
  var AC = null;
  function sfx(type) {
    if (!save.sound) return;
    try {
      if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
      var seq = {
        jump: [[520, 0.06, 'square'], [780, 0.06, 'square']], coin: [[988, 0.05, 'square'], [1319, 0.1, 'square']],
        item: [[660, 0.06, 'triangle'], [880, 0.06, 'triangle'], [1175, 0.1, 'triangle']], star: [[784, 0.08], [988, 0.08], [1175, 0.08], [1568, 0.18]],
        key: [[523, 0.08], [659, 0.08], [784, 0.08], [1047, 0.2]], stomp: [[300, 0.05, 'square'], [180, 0.08, 'square']],
        hurt: [[300, 0.1, 'sawtooth'], [200, 0.1, 'sawtooth'], [120, 0.2, 'sawtooth']], win: [[523, 0.12], [659, 0.12], [784, 0.12], [1047, 0.15], [784, 0.1], [1047, 0.3]],
        checkpoint: [[700, 0.07], [1000, 0.12]], locked: [[200, 0.08, 'square'], [160, 0.1, 'square']], over: [[392, 0.2], [330, 0.2], [262, 0.4]]
      }[type];
      if (!seq) return;
      var t = AC.currentTime;
      seq.forEach(function (n) {
        var o = AC.createOscillator(), g = AC.createGain();
        o.type = n[2] || 'sine'; o.frequency.value = n[0];
        g.gain.setValueAtTime(0.12, t); g.gain.exponentialRampToValueAtTime(0.001, t + n[1]);
        o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + n[1] + 0.02); t += n[1] * 0.9;
      });
    } catch (e) {}
  }

  // ---------- 屏幕切换 ----------
  function show(id) {
    ['login', 'menu', 'play'].forEach(function (s) { $(s).classList.toggle('show', s === id); });
    document.body.dataset.screen = id;
  }
  function overlay(id) {
    ['ovIntro', 'ovWin', 'ovOver', 'ovPause'].forEach(function (o) { $(o).classList.toggle('show', o === id); });
  }

  // ---------- 登录（PBKDF2 哈希比对） ----------
  function hex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); }
  function unhex(h) { var a = new Uint8Array(h.length / 2); for (var i = 0; i < a.length; i++) a[i] = parseInt(h.substr(i * 2, 2), 16); return a; }
  function derive(pw) {
    var enc = new TextEncoder();
    return crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveBits']).then(function (k) {
      return crypto.subtle.deriveBits({ name: 'PBKDF2', salt: unhex(CFG.salt), iterations: CFG.iterations, hash: 'SHA-256' }, k, 256);
    }).then(hex);
  }
  function authed() {
    try { return localStorage.getItem('ffa_auth') === CFG.hash || sessionStorage.getItem('ffa_auth') === CFG.hash; } catch (e) { return false; }
  }
  $('loginForm').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var msg = $('loginMsg'), pw = $('pw').value;
    if (!window.crypto || !crypto.subtle) { msg.textContent = '请用 https 网址打开（GitHub Pages 默认就是 https）。'; return; }
    msg.textContent = '验证中…'; $('loginBtn').disabled = true;
    derive(pw).then(function (h) {
      $('loginBtn').disabled = false;
      if (h === CFG.hash) {
        try { ($('remember').checked ? localStorage : sessionStorage).setItem('ffa_auth', h); } catch (e) {}
        msg.textContent = ''; $('pw').value = ''; sfx('key'); openMenu();
      } else { msg.textContent = '密码不对，再试一次吧！'; $('pw').select(); sfx('locked'); }
    }).catch(function () { $('loginBtn').disabled = false; msg.textContent = '验证失败，请刷新页面再试。'; });
  });

  function drawLoginArt() {
    var c = $('loginArt'), x = c.getContext('2d');
    x.clearRect(0, 0, c.width, c.height);
    IDS.forEach(function (id, i) { drawChar(x, id, 85 + i * 130, 190, { s: 3.1, time: performance.now() / 16 + i * 40, facing: i < 2 ? 1 : -1 }); });
  }

  // ---------- 菜单 ----------
  function openMenu() {
    stopLoop(); show('menu'); buildMenu();
  }
  function buildMenu() {
    $('mSound').textContent = save.sound ? '音效：开' : '音效：关';
    var cl = $('charList'); cl.innerHTML = '';
    IDS.forEach(function (id) {
      var C = CHARS[id], b = document.createElement('button');
      b.className = 'char-card' + (save.char === id ? ' sel' : ''); b.dataset.id = id;
      b.innerHTML = '<canvas width="120" height="130"></canvas><b>' + C.name + '</b><span class="role">' + C.role + '</span><span class="skill">' + C.skill + '</span>';
      var cx = b.querySelector('canvas').getContext('2d');
      drawChar(cx, id, 60, 124, { s: 2.3, time: 60 });
      b.onclick = function () { save.char = id; writeSave(); buildMenu(); sfx('coin'); };
      cl.appendChild(b);
    });
    var ll = $('levelList'); ll.innerHTML = ''; var total = 0;
    LV.forEach(function (L, i) {
      var locked = i + 1 > save.unlocked, best = save.best[L.id] || { stars: 0, score: 0 };
      total += best.score || 0;
      var b = document.createElement('button');
      b.className = 'level-card' + (locked ? ' locked' : '') + (best.done ? ' done' : '');
      b.style.setProperty('--c1', L.theme.sky[0]); b.style.setProperty('--c2', L.theme.sky[1]);
      var stars = '';
      for (var k = 0; k < 3; k++) stars += '<svg><use href="#' + (k < (best.stars || 0) ? 'i-star' : 'i-star0') + '"/></svg>';
      var R = E.getRole(L, save.char);
      b.innerHTML = '<span class="lv-no">第 ' + (i + 1) + ' 关</span><span class="lv-year">' + L.year + '</span><b>' + L.title + '</b><span class="lv-tag">玩法：' + goalTag(R) + '</span>' +
        (locked ? '<span class="lock"><svg><use href="#i-lock"/></svg>未解锁</span>' : '<span class="stars">' + stars + '</span>');
      b.disabled = locked;
      b.onclick = function () { startLevel(i); };
      ll.appendChild(b);
    });
    $('totalScore').textContent = total ? '总分 ' + total : '';
  }
  var GOALNAME = { escort: '陪伴', follow: '带路', race: '追人', carry: '抱着走', photo: '拍照', collect: '收集', budget: '存钱', key: '寻宝', reach: '冲终点',
    checklist: '按顺序准备', deliver: '送口罩', stealth: '潜行', catchkids: '抓偷玩', clean: '打扫', catch: '接东西' };
  function goalTag(R) {
    var t = GOALNAME[R.goal] || '闯关';
    if (R.goal === 'carry') t = { bride: '抱新娘', babyze: '抱宝宝', babyxiang: '抱宝宝', ball: '带球射门' }[R.cargo] || t;
    if (R.autoscroll) t += '·自动前进'; if (R.temp) t += '·保暖'; if (R.fog) t += '·大雾'; if (R.draw) t = '画平台'; if (R.slowFood) t = '避开美食'; if (R.time) t += '·限时';
    return t;
  }
  $('mSound').onclick = function () { save.sound = !save.sound; writeSave(); buildMenu(); sfx('coin'); };
  $('mReset').onclick = function () {
    if ($('mReset').dataset.confirm) { save.unlocked = 1; save.best = {}; writeSave(); delete $('mReset').dataset.confirm; $('mReset').textContent = '清除进度'; buildMenu(); }
    else { $('mReset').dataset.confirm = 1; $('mReset').textContent = '再按一次确认清除'; setTimeout(function () { delete $('mReset').dataset.confirm; $('mReset').textContent = '清除进度'; }, 3000); }
  };
  $('mLogout').onclick = function () { try { localStorage.removeItem('ffa_auth'); sessionStorage.removeItem('ffa_auth'); } catch (e) {} show('login'); };

  // ---------- 游戏 ----------
  var cv = $('cv'), ctx = cv.getContext('2d');
  var S = null, cur = 0, mode = 'none', camX = 0, parts = [], shake = 0, raf = 0, last = 0, acc = 0, frame = 0;
  var view = { w: 800, scale: 1, ox: 0, oy: 0, dpr: 1 };
  var keys = {}, touch = { left: false, right: false, jump: false, action: false };

  function resize() {
    var w = window.innerWidth, h = window.innerHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); cv.style.width = w + 'px'; cv.style.height = h + 'px';
    var portrait = h > w;
    var minW = portrait ? 420 : 560;
    var scale = Math.min(h / VIEW_H, w / minW);
    var vw = w / scale;
    if (S) vw = Math.min(vw, S.w * T);
    view = { w: vw, scale: scale, ox: (w - vw * scale) / 2, oy: portrait ? Math.max(56, (h - VIEW_H * scale) * 0.3) : (h - VIEW_H * scale) / 2, dpr: dpr };
    document.body.classList.toggle('portrait', portrait);
  }
  window.addEventListener('resize', resize);

  function startLevel(i) {
    cur = i; var L = LV[i];
    S = E.create(L, save.char); parts = []; camX = 0; shake = 0;
    show('play'); resize();
    $('iBadge').textContent = '第 ' + (i + 1) + ' 关 · ' + L.year;
    var R = S.role;
    $('iTitle').textContent = L.title;
    $('iWho').innerHTML = '你是 <b>' + CHARS[save.char].name + '</b>（' + CHARS[save.char].role + '）· 玩法：' + goalTag(R);
    $('iStory').innerHTML = (R.story || []).map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('');
    var goals = (R.goalText || []).slice();
    if (R.time) goals.push('限时 ' + R.time + ' 秒！');
    goals.push('顺手收集金币和 3 颗星星可以加分');
    $('iGoals').innerHTML = goals.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('');
    document.body.classList.toggle('has-act', !!R.draw);
    $('levelTag').textContent = '第' + (i + 1) + '关 ' + L.title + ' · ' + CHARS[save.char].name;
    mode = 'intro'; overlay('ovIntro'); hudCache = {}; updateHud(true);
    startLoop();
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function begin() { if (mode !== 'intro') return; mode = 'play'; overlay(null); keys = {}; resetTouch(); }
  function restart() { startLevel(cur); begin(); }
  function pause() { if (mode !== 'play') return; mode = 'pause'; overlay('ovPause'); }
  function resume() { if (mode !== 'pause') return; mode = 'play'; overlay(null); }
  $('iStart').onclick = begin;
  $('bPause').onclick = function () { mode === 'pause' ? resume() : pause(); };
  $('bRestart').onclick = restart; $('pRestart').onclick = restart; $('oRetry').onclick = restart; $('wAgain').onclick = restart;
  $('pResume').onclick = resume;
  $('bMap').onclick = openMenu; $('pMap').onclick = openMenu; $('oMap').onclick = openMenu; $('wMap').onclick = openMenu;
  $('wNext').onclick = function () { if (cur + 1 < LV.length) startLevel(cur + 1); else openMenu(); };
  $('bSound').onclick = function () { save.sound = !save.sound; writeSave(); $('bSound').innerHTML = '<svg><use href="#' + (save.sound ? 'i-sound' : 'i-mute') + '"/></svg>'; };

  function win() {
    mode = 'win'; sfx('win');
    var L = LV[cur], best = save.best[L.id] || { stars: 0, score: 0 };
    save.best[L.id] = { done: true, stars: Math.max(best.stars || 0, S.starsN), score: Math.max(best.score || 0, S.score) };
    save.unlocked = Math.max(save.unlocked, Math.min(LV.length, cur + 2));
    writeSave();
    var last = cur + 1 >= LV.length;
    $('wTitle').textContent = last ? '全家通关！' : '通关！';
    var st = ''; for (var k = 0; k < 3; k++) st += '<svg><use href="#' + (k < S.starsN ? 'i-star' : 'i-star0') + '"/></svg>';
    $('wStars').innerHTML = st;
    $('wInfo').innerHTML = '分数 <b>' + S.score + '</b>　金币 ' + S.coinsN + '/' + S.totalCoins + '　剩余命 ' + S.lives +
      (last ? '<br>Tat、Yen、Ze、Xiang 一起完成了全部冒险！<br>换一个角色再玩，故事会不一样哦！' : '<br>下一关已解锁：<b>' + esc(LV[cur + 1].title) + '</b><br>换个角色玩这一关，任务会不一样！');
    $('wNext').textContent = last ? '回到地图' : '下一关';
    setTimeout(function () { overlay('ovWin'); }, 500);
  }
  function over() { mode = 'over'; sfx('over'); setTimeout(function () { overlay('ovOver'); }, 600); }

  // ---------- 输入 ----------
  var KEYMAP = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', Space: 'jump', ArrowUp: 'jump', KeyW: 'jump', KeyX: 'action', KeyK: 'action', KeyJ: 'action' };
  window.addEventListener('keydown', function (e) {
    if (document.body.dataset.screen !== 'play') return;
    var k = KEYMAP[e.code];
    if (k) { keys[k] = true; e.preventDefault(); }
    if ((e.code === 'Space' || e.code === 'Enter') && mode === 'intro') { begin(); keys.jump = false; e.preventDefault(); }
    if (e.code === 'KeyP' || e.code === 'Escape') { mode === 'pause' ? resume() : pause(); }
    if (e.code === 'KeyR' && (mode === 'play' || mode === 'over' || mode === 'pause')) restart();
  });
  window.addEventListener('keyup', function (e) { var k = KEYMAP[e.code]; if (k) keys[k] = false; });
  window.addEventListener('blur', function () { keys = {}; resetTouch(); if (mode === 'play') pause(); });
  document.addEventListener('visibilitychange', function () { if (document.hidden && mode === 'play') pause(); });

  // 触屏按钮：支持多点触控（左右 + 跳同时按）
  var tb = { tLeft: 'left', tRight: 'right', tJump: 'jump', tAct: 'action' };
  function resetTouch() { touch.left = touch.right = touch.jump = touch.action = false; Object.keys(tb).forEach(function (id) { $(id).classList.remove('on'); }); }
  Object.keys(tb).forEach(function (id) {
    var el = $(id), k = tb[id];
    var on = function (e) { e.preventDefault(); touch[k] = true; el.classList.add('on'); if (mode === 'intro') begin(), touch[k] = k !== 'jump'; };
    var off = function (e) { e.preventDefault(); touch[k] = false; el.classList.remove('on'); };
    el.addEventListener('pointerdown', function (e) { try { el.setPointerCapture(e.pointerId); } catch (x) {} on(e); });
    el.addEventListener('pointerup', off); el.addEventListener('pointercancel', off); el.addEventListener('lostpointercapture', off);
    el.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  });
  $('play').addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });

  // ---------- 循环 ----------
  function startLoop() { if (!raf) { last = performance.now(); acc = 0; raf = requestAnimationFrame(loop); } }
  function stopLoop() { if (raf) cancelAnimationFrame(raf); raf = 0; mode = 'none'; overlay(null); }
  function loop(now) {
    raf = requestAnimationFrame(loop);
    var dt = Math.min(100, now - last); last = now; acc += dt;
    var steps = 0;
    while (acc >= 1000 / 60 && steps < 5) { tick(); acc -= 1000 / 60; steps++; }
    if (steps >= 5) acc = 0;
    render();
  }
  function input() { if (window.__inputHook) return window.__inputHook(); return { left: !!(keys.left || touch.left), right: !!(keys.right || touch.right), jump: !!(keys.jump || touch.jump), action: !!(keys.action || touch.action) }; }

  var lockToastT = 0;
  function tick() {
    frame++;
    if (mode === 'play') {
      var ev = E.step(S, input());
      for (var i = 0; i < ev.length; i++) handle(ev[i]);
      if (S.status === 'win' && mode === 'play') win();
      if (S.status === 'over' && mode === 'play') over();
    }
    // 粒子
    for (var j = parts.length - 1; j >= 0; j--) { var p = parts[j]; p.x += p.vx; p.y += p.vy; p.vy += p.g; p.life--; if (p.life <= 0) parts.splice(j, 1); }
    if (shake > 0) shake--;
    // 镜头
    if (S) { var target = S.player.x + S.player.w / 2 - view.w * 0.42; target = Math.max(0, Math.min(S.w * T - view.w, target)); if (S.role.autoscroll) target = Math.max(target, Math.min(S.scroll, S.w * T - view.w)); camX += (target - camX) * 0.15; if (S.role.autoscroll && camX < S.scroll) camX = Math.min(S.scroll, S.w * T - view.w); if (Math.abs(target - camX) < 0.3) camX = target; }
    updateHud();
  }
  function burst(x, y, color, n, txt) {
    for (var i = 0; i < n; i++) parts.push({ x: x, y: y, vx: (Math.random() - 0.5) * 4, vy: -Math.random() * 3.5 - 0.5, g: 0.15, life: 30 + Math.random() * 15, c: color, r: 2 + Math.random() * 2 });
    if (txt) parts.push({ x: x, y: y - 10, vx: 0, vy: -0.8, g: 0, life: 45, txt: txt, c: color });
  }
  function handle(e) {
    var L = LV[cur];
    switch (e.type) {
      case 'jump': sfx('jump'); burst(e.x, e.y, '#ffffffaa', 4); break;
      case 'coin': sfx('coin'); burst(e.x, e.y, '#ffd23f', 5, '+10'); break;
      case 'star': sfx('star'); burst(e.x, e.y, '#fff176', 14, '+500'); toast('星星 ' + S.starsN + '/3'); break;
      case 'item': sfx('item'); burst(e.x, e.y, '#ff8fab', 8, '+100'); if (S.role.goal === 'checklist') toast({ mask: '戴上口罩', bottle: '带上水壶', wallet: '带上钱包' }[e.kind] + '！'); if (S.role.draw) toast('墨水 +1'); break;
      case 'key': sfx('key'); burst(e.x, e.y, '#ffd54f', 16, '+200'); toast('拿到' + (S.role.keyName || '钥匙') + '！'); break;
      case 'stomp': sfx('stomp'); burst(e.x, e.y, '#ffffff', 8, '+100'); break;
      case 'hurt': sfx('hurt'); shake = 14; burst(e.x + 10, e.y + 10, '#ff5252', 12);
        toast({ time: '时间到！再来！', fall: '掉下去了！', spike: '好痛！小心尖刺', race: 'Tat 跑到酒桌了！再追一次', cold: '冻僵了！记得捡外套', caught: '被监控拍到了！', gourd: '碰到苦瓜了！', scroll: '掉队了！跟上画面' }[e.why] || '被撞到了！');
        break;
      case 'checkpoint': sfx('checkpoint'); toast('存档点已激活'); break;
      case 'msg': sfx('locked'); toast(e.text); break;
      case 'drop': sfx('hurt'); shake = 8; toast(e.why === 'friend' ? '被朋友拉去喝酒了！快回去！' : ({ bride: '新娘掉下来了！回去抱她', babyze: '宝宝掉了！快回去抱', babyxiang: '宝宝掉了！快回去抱', ball: '球被抢走了！快去捡' }[S.cargo.kind])); break;
      case 'pickup': sfx('item'); burst(e.x + 10, e.y, '#ff8fab', 10); toast({ bride: '抱起新娘！', babyze: '抱起宝宝！', babyxiang: '抱起宝宝！', ball: '拿回足球！' }[S.cargo.kind]); break;
      case 'cargoBack': toast('它回到存档点了'); break;
      case 'npcChat': toast('Tat 停下来和朋友聊天……快追！'); break;
      case 'caught': sfx('key'); burst(e.x + 10, e.y, '#ff8fab', 18, '抓到了!'); toast('抓到 Tat 了！一起去礼堂'); break;
      case 'npcWarp': toast(CHARS[e.id] ? CHARS[e.id].name + ' 追上来了' : '追上来了'); break;
      case 'deliver': sfx('item'); burst(e.x + 10, e.y, '#64b5f6', 12, '+200'); toast(CHARS[e.id].name + ' 戴好口罩了！'); break;
      case 'catchKid': sfx('key'); burst(e.x + 10, e.y, '#ffd54f', 16, '+300'); toast('抓到 ' + CHARS[e.id].name + ' 偷玩手机！'); break;
      case 'photo': sfx('star'); burst(e.x, e.y, '#ffffff', 20, '咔嚓!'); toast('拍到一张 ' + S.photosN + '/' + S.need); break;
      case 'deviceOff': sfx('checkpoint'); burst(e.x, e.y, '#90a4ae', 8, '关掉!'); toast((e.kind === 'tv' ? '电视' : '手机') + '关掉了 ' + S.devOff + '/' + S.need); break;
      case 'drink': sfx('item'); burst(e.x, e.y, '#4fc3f7', 10, '咕噜'); toast('喝水了！'); break;
      case 'full': sfx('locked'); toast('吃不下了……走不动'); break;
      case 'pay': sfx('hurt'); shake = 6; burst(e.x + 10, e.y, '#ffd23f', 8, '-RM15'); break;
      case 'draw': sfx('jump'); burst(e.x + 10, e.y, '#7e57c2', 8); break;
      case 'lantern': sfx('item'); toast('灯笼照亮了四周！'); break;
      case 'npcWin': break;
    }
  }
  var toastT = 0;
  function toast(msg) { var t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 1600); }

  // ---------- HUD ----------
  var hudCache = {};
  function setH(id, v, html) { if (hudCache[id] === v) return; hudCache[id] = v; if (html) $(id).innerHTML = v; else $(id).textContent = v; }
  function updateHud() {
    if (!S) return;
    var h = ''; for (var i = 0; i < S.maxLives; i++) h += '<svg class="' + (i < S.lives ? '' : 'off') + '"><use href="#i-heart"/></svg>';
    setH('hLives', h, true);
    setH('hCoins', S.coinsN + '/' + S.totalCoins); setH('hScore', String(S.score));
    var pg = E.progress(S), done = E.goalOK(S);
    setH('hProgL', pg.label); setH('hProgV', pg.bar ? '' : (pg.max === 1 ? (pg.v ? '✓' : '') : pg.v + '/' + pg.max));
    $('hProgBar').style.display = pg.bar ? '' : 'none'; if (pg.bar) $('hProgBar').firstChild.style.width = Math.max(0, Math.min(100, pg.v)) + '%';
    $('hProg').classList.toggle('ok', done);
    $('hTemp').style.display = S.role.temp ? '' : 'none'; if (S.role.temp) { $('hTempBar').style.width = Math.max(0, S.temp) + '%'; $('hTemp').classList.toggle('warn', S.temp < 30); }
    $('hInk').style.display = S.role.draw ? '' : 'none'; if (S.role.draw) setH('hInkV', String(S.ink));
    var st = ''; for (var k = 0; k < 3; k++) st += '<svg><use href="#' + (k < S.starsN ? 'i-star' : 'i-star0') + '"/></svg>';
    setH('hStars', st, true);
    $('hKey').style.display = 'none';
    $('hTimeChip').style.display = S.timeLimit ? '' : 'none';
    if (S.timeLimit) { setH('hTime', String(Math.ceil(S.timer / 60))); $('hTimeChip').classList.toggle('warn', S.timer < 15 * 60); }
    $('bSound').innerHTML = '<svg><use href="#' + (save.sound ? 'i-sound' : 'i-mute') + '"/></svg>';
  }

  // ---------- 绘制 ----------
  function render() {
    if (!S) return;
    var th = LV[cur].theme, d = view.dpr, sc = view.scale;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = th.groundBody; ctx.fillRect(0, 0, cv.width, cv.height);
    var g = ctx.createLinearGradient(0, 0, 0, cv.height); g.addColorStop(0, th.sky[0]); g.addColorStop(1, th.sky[1]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, view.oy * d + VIEW_H * sc * d * 0.8);
    var sx = shake ? (Math.random() - 0.5) * shake : 0, sy = shake ? (Math.random() - 0.5) * shake : 0;
    ctx.setTransform(d * sc, 0, 0, d * sc, d * (view.ox + sx), d * (view.oy + sy - VIEW_TOP * sc));
    ctx.save(); ctx.beginPath(); ctx.rect(0, VIEW_TOP, view.w, VIEW_H); ctx.clip();
    var cx = Math.round(camX), t = frame;
    D.background(ctx, th, cx, view.w, MAP_H, t);
    D.tiles(ctx, S, th, cx, view.w);
    var R = S.role, gname = R.gateName || LV[cur].gateName, goalDone = E.goalOK(S);
    if (R.temp) D.wind(ctx, S, cx, view.w, t);
    S.movers.forEach(function (m) { if (m.x + m.w > cx && m.x < cx + view.w) D.mover(ctx, m, th, cx, th.far); });
    S.temps.forEach(function (q) { D.drawn(ctx, q, cx); });
    S.checkpoints.forEach(function (c) { D.checkpoint(ctx, c, cx, t); });
    S.hides.forEach(function (hz) { D.hide(ctx, hz, cx, R.goal === 'stealth' && S.hidden && Math.abs(hz.x + 16 - S.player.x) < 30); });
    S.devices.forEach(function (dv) { D.device(ctx, dv, cx, t, R.goal === 'stealth'); });
    if (S.fountain) D.fountain(ctx, S.fountain, cx, R.goal === 'checklist' && S.order[S.step] === 'drink');
    if (S.table) D.table(ctx, S.table, cx);
    S.friends.forEach(function (f) { D.friend(ctx, f, cx, t); });
    if (R.goal === 'photo') S.spots.forEach(function (sp) { D.spot(ctx, sp, cx, t); });
    if (S.gate) D.gate(ctx, S.gate, cx, gname, goalDone, t);
    var vis = function (o) { return o.x > cx - 30 && o.x < cx + view.w + 30; };
    var bob = Math.sin(t * 0.07) * 2;
    S.coins.forEach(function (o) { if (!o.got && vis(o)) D.coin(ctx, o.x - cx, o.y + bob, t + o.x); });
    S.items.forEach(function (o) { if (!o.got && vis(o)) D.item(ctx, o.kind, o.x - cx, o.y + bob, t, o.n); });
    S.lanterns.forEach(function (o) { if (!o.got && vis(o)) D.lantern2(ctx, o, cx, t); });
    S.stars.forEach(function (o) { if (!o.got && vis(o)) { ctx.save(); ctx.fillStyle = '#fff59d55'; ctx.beginPath(); ctx.arc(o.x - cx, o.y + bob, 17, 0, 7); ctx.fill(); ctx.restore(); D.star(ctx, o.x - cx, o.y + bob, 12, '#ffd23f', '#a66d00'); } });
    S.keys.forEach(function (o) { if (!o.got) { if (R.keyKind) D.item(ctx, R.keyKind, o.x - cx, o.y + bob, t, 0); else D.key(ctx, o.x - cx, o.y + bob, t); } });
    S.enemies.forEach(function (e) {
      if (!e.alive && e.dead <= 0) return;
      if (e.x + e.w < cx - 20 || e.x > cx + view.w + 20) return;
      if (e.kind === 'walk') D.enemy(ctx, e, th.enemy, cx, t); else D.flyer(ctx, e, th.flyer, cx, t);
    });
    S.fall.forEach(function (f) { D.fallItem(ctx, f, cx, t); });
    // 站着的家人（装饰）
    (S.decor || []).forEach(function (m) { drawChar(ctx, m.id, m.x - cx, m.y, { s: 0.9, facing: -1, time: t + m.x, mask: true }); });
    // 同行角色
    S.npcs.forEach(function (n) {
      if (n.ai === 'wander' && n.done) return;
      var id = n.id, o = { s: 0.95, facing: n.facing, t: n.anim * 2.2, time: t + 50, state: !n.onGround ? 'jump' : Math.abs(n.vx) > 0.3 ? 'run' : 'idle' };
      if (id === 'babyxiang') { id = 'xiang'; o.baby = true; o.s = 0.6; }
      if (S.charId === 'yen' && LV[cur].id === 5 && id === 'ze') o.s = 0.72;
      if (n.ai === 'wander') { o.phone = n.phone; }
      if (n.ai === 'stand') { o.mask = n.done; o.facing = -1; }
      drawChar(ctx, id, n.x + n.w / 2 - cx, n.y + n.h + 1, o);
      if (n.ai === 'race' && n.pause > 0) { ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#e65100'; ctx.fillText('干杯！', n.x + 10 - cx, n.y - 22); }
    });
    // 监控
    S.cams.forEach(function (c) { D.cam(ctx, c, cx, R.goal === 'stealth'); });
    // 货物（放下的时候）
    var cg = S.cargo;
    var drawCargo = function (x, y, carried) {
      if (cg.kind === 'ball') { D.item(ctx, 'ball', x, y - 10, t, 0); return; }
      var bid = cg.kind === 'bride' ? 'yen' : cg.kind === 'babyze' ? 'ze' : 'xiang';
      drawChar(ctx, bid, x, y, { s: cg.kind === 'bride' ? 0.8 : 0.55, bride: cg.kind === 'bride', baby: cg.kind !== 'bride', facing: S.player.facing, time: t, noShadow: carried });
    };
    if (cg && !cg.carried) { drawCargo(cg.x + 11 - cx, cg.y + cg.h, false); if (Math.floor(t / 15) % 2) { ctx.fillStyle = '#ff5252'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('!', cg.x + 11 - cx, cg.y - 30); } }
    // 玩家
    var p = S.player;
    if (!(p.inv > 0 && Math.floor(p.inv / 4) % 2)) {
      var stt = !p.onGround ? (p.vy < 0 ? 'jump' : 'fall') : (Math.abs(p.vx) > 0.4 ? 'run' : 'idle');
      var pmask = R.goal === 'checklist' && S.step > 0;
      if (cg && cg.carried && cg.kind === 'ball') D.item(ctx, 'ball', p.x + p.w / 2 - cx + p.facing * 14, p.y + p.h - 9 + (stt === 'run' ? Math.abs(Math.sin(p.anim * 2.2)) * -3 : 0), t, 0);
      drawChar(ctx, save.char, p.x + p.w / 2 - cx, p.y + p.h + 1, { s: 0.95, facing: p.facing, t: p.anim * 2.2, state: stt, time: t, hurt: p.inv > 70, bride: false, mask: pmask });
      if (cg && cg.carried && cg.kind !== 'ball') drawCargo(p.x + p.w / 2 - cx + p.facing * 3, p.y + 14 + (cg.kind === 'bride' ? 2 : 4), true);
      if (S.slow > 0) { ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#e65100'; ctx.fillText('好饱…', p.x + 10 - cx, p.y - 26); }
    }
    // 大雾
    if (R.fog) D.fog(ctx, p.x + p.w / 2 - cx, p.y + p.h / 2, S.light > 0 ? 260 : 120, view.w, VIEW_TOP, VIEW_H);
    // 目标箭头
    var hn = E.hint(S); if (hn && mode === 'play') D.arrow(ctx, hn.x, hn.y, cx, view.w, VIEW_TOP, t);
    // 粒子
    parts.forEach(function (q) {
      ctx.globalAlpha = Math.min(1, q.life / 20);
      if (q.txt) { ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0006'; ctx.lineWidth = 3; ctx.strokeText(q.txt, q.x - cx, q.y); ctx.fillText(q.txt, q.x - cx, q.y); }
      else { ctx.fillStyle = q.c; ctx.fillRect(q.x - cx - q.r / 2, q.y - q.r / 2, q.r, q.r); }
    });
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // ---------- 启动 ----------
  drawLoginArt();
  setInterval(function () { if (document.body.dataset.screen === 'login') drawLoginArt(); }, 50);
  if (authed()) openMenu(); else show('login');
  if (window.matchMedia && matchMedia('(pointer: coarse)').matches) document.body.classList.add('touch');
  window.addEventListener('touchstart', function () { document.body.classList.add('touch'); }, { once: true, passive: true });

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }

  // 自动化测试用（不影响游戏）
  window.FFA = { get S() { return S; }, get mode() { return mode; }, get save() { return save; }, startLevel: startLevel, begin: begin, keys: function () { return keys; } };
})();
