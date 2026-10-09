/* 俯视角 RPG 引擎：移动、战斗、升级、对话、任务、问答、存档（不依赖 DOM，可自动测试） */
(function (G) {
  'use strict';
  var T = 32;
  var SOLID = { '#': 1, 'D': 1, 'V': 1, 'K': 1, 'T': 1, 'p': 1, 'h': 1, 't': 1, 'w': 1, 'B': 1, 'l': 1, 'P': 1, 'M': 1 };
  var BASE = {
    tat: { hp: 40, hpUp: 12, atk: 6, speed: 2.5, name: 'Tat' },
    yen: { hp: 34, hpUp: 10, atk: 5, speed: 2.5, name: 'Yen' }
  };
  var NEED = [0, 0, 30, 75, 135, 210, 300, 410, 540]; // 升到 lv 需要的累计经验
  var ENEMY = {
    folder:   { name: '文件怪', hp: 14, atk: 4, exp: 6, coins: 2, r: 12, speed: 1.15, ai: 'chase' },
    cup:      { name: '咖啡杯怪', hp: 12, atk: 4, exp: 8, coins: 3, r: 11, speed: 1.0, ai: 'shooter' },
    germ:     { name: '流感病菌', hp: 9, atk: 3, exp: 5, coins: 1, r: 10, speed: 1.6, ai: 'germ' },
    cutter:   { name: '插队怪', hp: 22, atk: 5, exp: 10, coins: 3, r: 12, speed: 1.0, ai: 'charger' },
    drinker:  { name: '劝酒朋友', hp: 24, atk: 5, exp: 10, coins: 3, r: 12, speed: 1.0, ai: 'charger' },
    gift:     { name: '礼物盒怪', hp: 18, atk: 5, exp: 9, coins: 3, r: 12, speed: 1.0, ai: 'hopper' },
    bossOT:   { name: '加班大魔王', hp: 170, atk: 6, exp: 60, coins: 30, r: 24, speed: 0.75, ai: 'bossOT' },
    bossBeer: { name: '劝酒大王', hp: 380, atk: 8, exp: 120, coins: 50, r: 26, speed: 0.9, ai: 'bossBeer' }
  };
  var ITEMS = { bento: { name: '便当', heal: 0.5 }, eggs: { name: '番茄炒蛋', heal: 1 }, ring: { name: '戒指', story: true } };

  function create(data, save) {
    var W = {
      data: data, t: 0, flags: {}, level: 1, exp: 0, coins: 0, items: { bento: 1, eggs: 0 }, gear: {},
      party: [], active: 0, looks: {}, quest: null, run: [], dialog: null, events: [], projs: [], fx: [],
      status: 'play', down: 0, ended: false, trail: [], saveAt: null, msgT: -999,
      p: { x: 0, y: 0, fx: 0, fy: 1, inv: 0, atkCd: 0, skillCd: 0, dodgeT: 0, dodgeCd: 0, swapCd: 0, swing: 0, spin: 0, shield: 0, anim: 0, moving: false, dx: 0, dy: 1 },
      prev: {}
    };
    if (save) {
      ['flags', 'level', 'exp', 'coins', 'items', 'gear', 'looks', 'quest', 'active'].forEach(function (k) { if (save[k] !== undefined) W[k] = JSON.parse(JSON.stringify(save[k])); });
      W.party = save.party.map(function (m) { return { id: m.id, hp: m.hp }; });
      W.saveAt = save.saveAt;
      loadArea(W, save.saveAt.area, save.saveAt.x, save.saveAt.y);
    } else {
      W.party = data.party.map(function (id) { return { id: id, hp: maxHp(W, id) }; });
      loadArea(W, data.start.area, data.start.x, data.start.y);
      W.saveAt = { area: data.start.area, x: data.start.x, y: data.start.y };
      push(W, data.intro);
    }
    runScript(W);
    return W;
  }

  // ---------- 角色数值 ----------
  function maxHp(W, id) { var b = BASE[id]; return b.hp + (W.level - 1) * b.hpUp; }
  function atk(W, id) { return BASE[id].atk + (W.level - 1) * 2 + (W.gear.glasses ? 2 : 0); }
  function member(W) { return W.party[W.active]; }

  // ---------- 地图 ----------
  function loadArea(W, id, tx, ty) {
    var A = W.data.areas[id];
    W.areaId = id; W.area = A;
    W.tiles = A.map.map(function (r) { return r.split(''); });
    W.mw = W.tiles[0].length; W.mh = W.tiles.length;
    W.enemies = []; W.projs = []; W.spawned = {};
    W.npcs = A.npcs.map(function (n) { return { def: n, id: n.id, x: n.x * T + T / 2, y: n.y * T + T / 2 }; });
    W.chests = (A.chests || []).map(function (c) { return { def: c, x: c.x * T + T / 2, y: c.y * T + T / 2 }; });
    spawnEnemies(W);
    W.p.x = tx * T + T / 2; W.p.y = ty * T + T / 2;
    W.trail = [];
    W.events.push({ type: 'area', id: id });
  }
  function cond(W, o) {
    if (!o) return true;
    var ok = function (f, want) { if (!f) return true; var arr = Array.isArray(f) ? f : [f]; return arr.every(function (k) { return !!W.flags[k] === want; }); };
    return ok(o.if, true) && ok(o.ifNot, false);
  }
  function spawnEnemies(W) {
    W.area.enemies.forEach(function (d, i) {
      if (W.spawned[i]) return;
      if (!cond(W, d)) return;
      if (d.group && W.flags['cleared_' + d.group]) return;
      if (d.boss && W.flags['defeated_' + d.id]) return;
      var st = ENEMY[d.type];
      W.spawned[i] = 1;
      W.enemies.push({ def: d, idx: i, type: d.type, st: st, x: d.x * T + T / 2, y: d.y * T + T / 2, hx: d.x * T + T / 2, hy: d.y * T + T / 2,
        hp: st.hp, maxHp: st.hp, r: st.r, vx: 0, vy: 0, kb: 0, kbx: 0, kby: 0, cd: 60 + (i * 17) % 60, state: 'idle', t: i * 31, hit: 0, alive: true, boss: !!d.boss, summoned: false, aggro: !!d.boss });
    });
  }
  function solidAt(W, tx, ty) {
    if (tx < 0 || ty < 0 || tx >= W.mw || ty >= W.mh) return true;
    var c = W.tiles[ty][tx];
    if (c === 'L') { var f = W.area.doors && W.area.doors.L; return !(f && W.flags[f]); }
    return !!SOLID[c];
  }
  function boxFree(W, x, y, r) {
    var x0 = Math.floor((x - r) / T), x1 = Math.floor((x + r - 0.01) / T), y0 = Math.floor((y - r * 0.6) / T), y1 = Math.floor((y + r * 0.8 - 0.01) / T);
    for (var ty = y0; ty <= y1; ty++) for (var tx = x0; tx <= x1; tx++) if (solidAt(W, tx, ty)) return false;
    return true;
  }
  function blocked(W, x, y, r) {
    if (!boxFree(W, x, y, r)) return true;
    for (var i = 0; i < W.chests.length; i++) { var c = W.chests[i]; if (Math.abs(c.x - x) < 14 + r && Math.abs(c.y - y) < 12 + r * 0.7) return true; }
    return false;
  }
  function move(W, e, dx, dy, r) {
    var moved = false;
    if (dx && !blocked(W, e.x + dx, e.y, r)) { e.x += dx; moved = true; }
    if (dy && !blocked(W, e.x, e.y + dy, r)) { e.y += dy; moved = true; }
    return moved;
  }
  function dist(a, b) { var dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy); }

  // ---------- 剧本 ----------
  function push(W, ops) { if (ops && ops.length) W.run = ops.concat(W.run); }
  function runScript(W) {
    while (W.run.length && !W.dialog && !W.ended) exec(W, W.run.shift());
  }
  function exec(W, op) {
    if (op.say) { W.dialog = { type: 'say', who: op.say, t: op.t, name: W._npcName }; return; }
    if (op.quiz) { W.dialog = { type: 'quiz', who: op.who || 'npc', t: op.quiz, opts: op.a, ok: op.ok, good: op.good, bad: op.bad, name: W._npcName }; return; }
    if (op.choice) { W.dialog = { type: 'choice', who: op.who || 'sys', t: op.choice, opts: op.opts.map(function (o) { return o.t; }), branches: op.opts.map(function (o) { return o.ops; }), name: W._npcName }; return; }
    if (op.flag) W.flags[op.flag] = true;
    if (op.unflag) delete W.flags[op.unflag];
    if (op.quest) { W.quest = op.quest; W.events.push({ type: 'quest', id: op.quest }); }
    if (op.give) { W.items[op.give] = (W.items[op.give] || 0) + (op.n || 1); W.events.push({ type: 'got', item: op.give, n: op.n || 1 }); }
    if (op.coins) { W.coins += op.coins; W.events.push({ type: 'coins', n: op.coins }); }
    if (op.exp) gainExp(W, op.exp);
    if (op.gear) { W.gear[op.gear] = true; W.events.push({ type: 'gear', id: op.gear }); }
    if (op.join) { if (!W.party.some(function (m) { return m.id === op.join; })) { W.party.push({ id: op.join, hp: maxHp(W, op.join) }); W.events.push({ type: 'join', id: op.join }); } }
    if (op.look) W.looks[op.look] = op.v;
    if (op.spawn) spawnEnemies(W);
    if (op.buy) {
      if (W.coins >= op.price) { W.coins -= op.price; W.items[op.buy] = (W.items[op.buy] || 0) + 1; W.events.push({ type: 'got', item: op.buy, n: 1 }); }
      else W.run.unshift({ say: 'sys', t: '金币不够哦！打怪可以拿到金币。' });
    }
    if (op.goto) { loadArea(W, op.goto, op.x, op.y); W.saveAt = { area: op.goto, x: op.x, y: op.y }; W.events.push({ type: 'save' }); }
    if (op.end) { W.ended = true; W.status = 'end'; W.events.push({ type: 'end' }); }
  }
  function answer(W, idx) {
    var d = W.dialog; if (!d) return;
    if (d.type === 'quiz') {
      var good = idx === d.ok;
      W.dialog = null; W.events.push({ type: good ? 'quizGood' : 'quizBad' });
      push(W, good ? d.good : d.bad);
    } else if (d.type === 'choice') {
      W.dialog = null; push(W, d.branches[idx] || []);
    }
    runScript(W);
  }
  function advance(W) {
    if (!W.dialog || W.dialog.type !== 'say') return;
    W.dialog = null; runScript(W);
    if (!W.dialog && !W.run.length) W._npcName = null;
  }

  // ---------- 经验 ----------
  function gainExp(W, n) {
    W.exp += n; W.events.push({ type: 'exp', n: n });
    while (W.level + 1 < NEED.length && W.exp >= NEED[W.level + 1]) {
      W.level++;
      W.party.forEach(function (m) { m.hp = maxHp(W, m.id); });
      W.events.push({ type: 'levelup', lv: W.level });
    }
  }
  function expInfo(W) {
    var a = NEED[W.level] || 0, b = NEED[W.level + 1] || (a + 999);
    return { lv: W.level, cur: W.exp - a, need: b - a };
  }

  // ---------- 受伤 ----------
  function hurtPlayer(W, dmg, fromX, fromY) {
    var p = W.p, m = member(W);
    if (p.inv > 0 || p.shield > 0 || p.dodgeT > 0 || W.status !== 'play') return;
    m.hp = Math.max(0, m.hp - dmg); p.inv = 45;
    var dx = p.x - fromX, dy = p.y - fromY, d = Math.sqrt(dx * dx + dy * dy) || 1;
    move(W, p, dx / d * 10, dy / d * 10, 9);
    W.events.push({ type: 'hurt', x: p.x, y: p.y, n: dmg });
    if (m.hp <= 0) {
      var other = W.party.findIndex(function (q) { return q.hp > 0; });
      if (other >= 0) { W.active = other; p.inv = 80; W.events.push({ type: 'swapDown', id: W.party[other].id }); }
      else { W.status = 'down'; W.down = 120; W.events.push({ type: 'down' }); }
    }
  }
  function revive(W) {
    var s = W.saveAt;
    if (s.area !== W.areaId) loadArea(W, s.area, s.x, s.y); else { W.p.x = s.x * T + T / 2; W.p.y = s.y * T + T / 2; }
    W.party.forEach(function (m) { m.hp = maxHp(W, m.id); });
    W.enemies.forEach(function (e) { if (e.boss) { e.hp = e.maxHp; e.x = e.hx; e.y = e.hy; e.summoned = false; } });
    W.projs = []; W.status = 'play'; W.p.inv = 90; W.active = 0;
    W.events.push({ type: 'revive' });
  }

  function damageEnemy(W, e, dmg, kx, ky, kbPow) {
    if (!e.alive) return;
    e.hp -= dmg; e.hit = 10;
    var d = Math.sqrt(kx * kx + ky * ky) || 1;
    if (!e.boss) { e.kb = 8; e.kbx = kx / d * (kbPow || 4); e.kby = ky / d * (kbPow || 4); }
    W.events.push({ type: 'dmg', x: e.x, y: e.y - e.r, n: dmg });
    if (e.hp <= 0) killEnemy(W, e);
  }
  function killEnemy(W, e) {
    e.alive = false; e.dead = 30;
    W.coins += e.st.coins; gainExp(W, e.st.exp);
    W.events.push({ type: 'kill', x: e.x, y: e.y, exp: e.st.exp, coins: e.st.coins, boss: e.boss });
    var d = e.def;
    if (d.group && !d.summon) {
      var left = W.enemies.some(function (o) { return o.alive && o.def.group === d.group && !o.def.summon; });
      if (!left) { W.flags['cleared_' + d.group] = true; push(W, (W.area.groups || {})[d.group]); }
    }
    if (e.boss) {
      W.flags['defeated_' + d.id] = true;
      W.enemies.forEach(function (o) { if (o.def.summon) { o.alive = false; o.dead = 20; } });
      W.projs = W.projs.filter(function (q) { return q.from !== 'enemy'; });
      push(W, d.onDefeat);
    }
    runScript(W);
  }
  function shoot(W, e, ang, speed, kind, dmg) {
    W.projs.push({ x: e.x, y: e.y, vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed, r: kind === 'foam' ? 9 : 6, dmg: dmg, from: 'enemy', life: 200, kind: kind });
  }
  function summon(W, type, x, y, n) {
    for (var i = 0; i < n; i++) {
      var st = ENEMY[type], a = i * Math.PI * 2 / n;
      var ex = x + Math.cos(a) * 50, ey = y + Math.sin(a) * 50;
      if (!boxFree(W, ex, ey, 12)) { ex = x; ey = y; }
      W.enemies.push({ def: { type: type, summon: true }, type: type, st: st, x: ex, y: ey, hx: ex, hy: ey, hp: st.hp, maxHp: st.hp, r: st.r, kb: 0, kbx: 0, kby: 0, cd: 40, state: 'idle', t: 0, hit: 0, alive: true, aggro: true });
    }
    W.events.push({ type: 'summon' });
  }

  function enemyAI(W, e) {
    var p = W.p, st = e.st, dx = p.x - e.x, dy = p.y - e.y, d = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / d, uy = dy / d;
    e.t++;
    if (e.hit > 0) e.hit--;
    if (e.kb > 0) { e.kb--; move(W, e, e.kbx, e.kby, e.r * 0.8); return; }
    if (!e.aggro && d < 230) e.aggro = true;
    if (!e.aggro) { var a = Math.sin(e.t * 0.02 + e.hx) * 0.5; move(W, e, Math.cos(e.t * 0.01 + e.hy) * 0.3, a * 0.3, e.r * 0.8); return; }
    if (d > 520 && !e.boss) { e.aggro = false; return; }
    var sp = st.speed;
    switch (st.ai) {
      case 'chase': move(W, e, ux * sp, uy * sp, e.r * 0.8); break;
      case 'germ': var w = Math.sin(e.t * 0.15) * 1.2; move(W, e, (ux - uy * w) * sp, (uy + ux * w) * sp, e.r * 0.8); break;
      case 'shooter':
        if (d < 120) move(W, e, -ux * sp, -uy * sp, e.r * 0.8); else if (d > 200) move(W, e, ux * sp, uy * sp, e.r * 0.8);
        if (--e.cd <= 0) { e.cd = 95; shoot(W, e, Math.atan2(dy, dx), 2.6, 'coffee', st.atk); }
        break;
      case 'charger':
        if (e.state === 'idle') { move(W, e, ux * sp * 0.6, uy * sp * 0.6, e.r * 0.8); if (d < 170 && --e.cd <= 0) { e.state = 'wind'; e.st2 = 32; e.cx = ux; e.cy = uy; } }
        else if (e.state === 'wind') { if (--e.st2 <= 0) { e.state = 'charge'; e.st2 = 24; } }
        else if (e.state === 'charge') { move(W, e, e.cx * 5, e.cy * 5, e.r * 0.8); if (--e.st2 <= 0) { e.state = 'idle'; e.cd = 60; } }
        break;
      case 'hopper':
        if (e.state === 'idle') { if (--e.cd <= 0) { e.state = 'hop'; e.st2 = 18; e.cx = ux; e.cy = uy; } }
        else { move(W, e, e.cx * 3.4, e.cy * 3.4, e.r * 0.8); e.z = Math.sin((18 - e.st2) / 18 * Math.PI) * 16; if (--e.st2 <= 0) { e.state = 'idle'; e.cd = 45; e.z = 0; } }
        break;
      case 'bossOT':
        move(W, e, ux * sp, uy * sp, e.r * 0.7);
        if (--e.cd <= 0) { e.cd = 150; for (var k = 0; k < 8; k++) shoot(W, e, k * Math.PI / 4 + e.t * 0.01, 2.3, 'paper', st.atk - 2); }
        if (!e.summoned && e.hp < e.maxHp / 2) { e.summoned = true; summon(W, 'folder', e.x, e.y, 2); }
        break;
      case 'bossBeer':
        if (e.state === 'idle') { move(W, e, ux * sp, uy * sp, e.r * 0.7); if (--e.cd <= 0) { e.state = 'wind'; e.st2 = 40; e.cx = ux; e.cy = uy; e.cycle = (e.cycle || 0) + 1; } }
        else if (e.state === 'wind') { if (--e.st2 <= 0) { if (e.cycle % 2) { e.state = 'charge'; e.st2 = 32; } else { var base = Math.atan2(dy, dx); for (var j = -2; j <= 2; j++) shoot(W, e, base + j * 0.28, 2.6, 'foam', st.atk - 2); e.state = 'idle'; e.cd = 100; } } }
        else if (e.state === 'charge') { if (!move(W, e, e.cx * 5.5, e.cy * 5.5, e.r * 0.7)) e.st2 = 0; if (--e.st2 <= 0) { e.state = 'idle'; e.cd = 90; } }
        if (!e.summoned && e.hp < e.maxHp / 2) { e.summoned = true; summon(W, 'drinker', e.x, e.y, 2); }
        break;
    }
    if (d < e.r + 11 && !(e.st.ai === 'hopper' && e.z > 6)) hurtPlayer(W, st.atk, e.x, e.y);
  }

  function interactable(W) {
    var p = W.p, best = null, bd = 48;
    W.npcs.forEach(function (n) { if (n.def.hideIf && W.flags[n.def.hideIf]) return; var d = dist(p, n); if (d < bd) { bd = d; best = { kind: 'npc', o: n }; } });
    W.chests.forEach(function (c) { if (W.flags['chest_' + c.def.id]) return; var d = dist(p, c); if (d < bd) { bd = d; best = { kind: 'chest', o: c }; } });
    return best;
  }
  function interact(W, it) {
    if (it.kind === 'npc') {
      var n = it.o.def, talk = null;
      for (var i = 0; i < n.talks.length; i++) if (cond(W, n.talks[i])) { talk = n.talks[i]; break; }
      if (talk) { W._npcName = n.name; W._npcLook = n.look; push(W, talk.script); runScript(W); }
      var dx = it.o.x - W.p.x, dy = it.o.y - W.p.y; it.o.face = dx > 0 ? -1 : 1;
    } else {
      var c = it.o.def; W.flags['chest_' + c.id] = true;
      if (c.give) { W.items[c.give] = (W.items[c.give] || 0) + (c.n || 1); W.events.push({ type: 'got', item: c.give, n: c.n || 1, x: it.o.x, y: it.o.y }); }
      if (c.coins) { W.coins += c.coins; W.events.push({ type: 'coins', n: c.coins }); }
      W.events.push({ type: 'chest', x: it.o.x, y: it.o.y });
      W._npcName = null; push(W, c.script); runScript(W);
    }
  }

  function useItem(W, id) {
    id = id || (W.items.bento > 0 ? 'bento' : W.items.eggs > 0 ? 'eggs' : null);
    if (!id || !(W.items[id] > 0)) { W.events.push({ type: 'msg', t: '没有可以吃的东西了' }); return; }
    var m = member(W), mx = maxHp(W, m.id);
    if (m.hp >= mx) { W.events.push({ type: 'msg', t: '体力已经是满的' }); return; }
    W.items[id]--; m.hp = Math.min(mx, m.hp + Math.ceil(mx * ITEMS[id].heal));
    W.events.push({ type: 'heal', x: W.p.x, y: W.p.y, item: id });
  }

  // ---------- 主循环 ----------
  function step(W, inp) {
    W.events.length = 0;
    var pr = W.prev, edge = function (k) { return inp[k] && !pr[k]; };
    W.prev = { attack: inp.attack, skill: inp.skill, dodge: inp.dodge, swap: inp.swap, talk: inp.talk, heal: inp.heal };
    if (W.ended) return W.events;
    if (W.dialog) {
      if (W.dialog.type === 'say' && (edge('talk') || edge('attack'))) advance(W);
      else if (W.dialog.type !== 'say' && inp.choice >= 0) answer(W, inp.choice);
      return W.events;
    }
    if (W.status === 'down') { if (--W.down <= 0) revive(W); return W.events; }
    W.t++;
    var p = W.p, m = member(W), id = m.id;
    ['inv', 'atkCd', 'skillCd', 'dodgeCd', 'swapCd', 'swing', 'spin', 'shield'].forEach(function (k) { if (p[k] > 0) p[k]--; });

    // 移动
    var mx = inp.mx || 0, my = inp.my || 0, ml = Math.sqrt(mx * mx + my * my);
    if (ml > 1) { mx /= ml; my /= ml; ml = 1; }
    if (ml > 0.2) { p.fx = mx / ml; p.fy = my / ml; }
    if (p.dodgeT > 0) { p.dodgeT--; move(W, p, p.ddx * 6.5, p.ddy * 6.5, 9); }
    else if (ml > 0.2) { var sp = BASE[id].speed; move(W, p, mx * sp, my * sp, 9); p.anim += 0.25; p.moving = true; }
    else p.moving = false;
    if (p.moving || p.dodgeT) { W.trail.push({ x: p.x, y: p.y }); if (W.trail.length > 40) W.trail.shift(); }

    // 换人
    if (edge('swap') && W.party.length > 1 && p.swapCd <= 0) {
      var next = (W.active + 1) % W.party.length;
      if (W.party[next].hp > 0) { W.active = next; p.swapCd = 30; W.events.push({ type: 'swap', id: W.party[next].id }); }
    }
    if (edge('heal')) useItem(W);

    // 对话 / 攻击
    var it = interactable(W);
    var nearEnemy = W.enemies.some(function (e) { return e.alive && dist(e, p) < 110; });
    if (it && (edge('talk') || (edge('attack') && !nearEnemy))) { interact(W, it); return W.events; }
    if (edge('attack') && p.atkCd <= 0) {
      if (id === 'tat') {
        p.atkCd = 22; p.swing = 14; W.events.push({ type: 'swing' });
        var dmg = atk(W, id);
        W.enemies.forEach(function (e) {
          if (!e.alive) return;
          var dx = e.x - p.x, dy = e.y - p.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
          if (d < 50 + e.r && ((dx * p.fx + dy * p.fy) / d > 0.3 || d < 22 + e.r)) damageEnemy(W, e, dmg, dx, dy, 5);
        });
      } else {
        p.atkCd = 24; W.events.push({ type: 'wave' });
        W.projs.push({ x: p.x + p.fx * 10, y: p.y + p.fy * 10, vx: p.fx * 6, vy: p.fy * 6, r: 9, dmg: atk(W, id), from: 'player', life: 34, kind: 'wave' });
      }
    }
    if (edge('skill')) {
      if (p.skillCd > 0) W.events.push({ type: 'msg', t: '技能冷却中…' });
      else if (id === 'tat') {
        if (W.level < 2) W.events.push({ type: 'msg', t: 'Tat 的“旋风扫把”Lv2 解锁' });
        else {
          p.skillCd = 240; p.spin = 24; W.events.push({ type: 'spin' });
          W.enemies.forEach(function (e) { if (e.alive && dist(e, p) < 82 + e.r) damageEnemy(W, e, Math.round(atk(W, id) * 1.7), e.x - p.x, e.y - p.y, 10); });
        }
      } else {
        p.skillCd = 480; p.shield = 160;
        W.party.forEach(function (q) { if (q.hp > 0) q.hp = Math.min(maxHp(W, q.id), q.hp + Math.ceil(maxHp(W, q.id) * 0.2)); });
        W.events.push({ type: 'shield' });
      }
    }
    if (edge('dodge') && p.dodgeCd <= 0) {
      p.dodgeT = 10; p.dodgeCd = 38; p.ddx = ml > 0.2 ? mx : p.fx; p.ddy = ml > 0.2 ? my : p.fy;
      var dl = Math.sqrt(p.ddx * p.ddx + p.ddy * p.ddy) || 1; p.ddx /= dl; p.ddy /= dl;
      W.events.push({ type: 'dodge' });
    }

    // 敌人
    W.enemies.forEach(function (e) { if (e.alive) enemyAI(W, e); else if (e.dead > 0) e.dead--; });
    W.enemies = W.enemies.filter(function (e) { return e.alive || e.dead > 0; });

    // 子弹
    for (var i = W.projs.length - 1; i >= 0; i--) {
      var q = W.projs[i]; q.x += q.vx; q.y += q.vy; q.life--;
      var dead = q.life <= 0 || solidAt(W, Math.floor(q.x / T), Math.floor(q.y / T));
      if (!dead && q.from === 'enemy' && dist(q, p) < q.r + 9) { hurtPlayer(W, q.dmg, q.x - q.vx * 5, q.y - q.vy * 5); dead = true; }
      if (!dead && q.from === 'player') {
        for (var j = 0; j < W.enemies.length; j++) { var e = W.enemies[j]; if (e.alive && dist(q, e) < q.r + e.r) { damageEnemy(W, e, q.dmg, q.vx, q.vy, 4); dead = true; break; } }
      }
      if (dead) W.projs.splice(i, 1);
    }

    // 存档点
    (W.area.saves || []).forEach(function (s) {
      var sx = s[0] * T + T / 2, sy = s[1] * T + T / 2;
      if (Math.abs(p.x - sx) < 22 && Math.abs(p.y - sy) < 22) {
        var was = W.saveAt && W.saveAt.area === W.areaId && W.saveAt.x === s[0] && W.saveAt.y === s[1];
        var hurtAny = W.party.some(function (q) { return q.hp < maxHp(W, q.id); });
        W.saveAt = { area: W.areaId, x: s[0], y: s[1] };
        if (!was || hurtAny) { W.party.forEach(function (q) { q.hp = maxHp(W, q.id); }); W.events.push({ type: 'save' }); }
      }
    });
    // 触发区
    (W.area.triggers || []).forEach(function (tg) {
      if (W.flags['trig_' + tg.id] || !cond(W, tg)) return;
      if (p.x > tg.x * T && p.x < (tg.x + tg.w) * T && p.y > tg.y * T && p.y < (tg.y + tg.h) * T) { W.flags['trig_' + tg.id] = true; W._npcName = null; push(W, tg.script); runScript(W); }
    });
    // 出口
    (W.area.exits || []).forEach(function (ex) {
      if (p.x > ex.x * T - 4 && p.x < (ex.x + ex.w) * T + 4 && p.y > ex.y * T - 4 && p.y < (ex.y + ex.h) * T + 4) {
        if (ex.need && !W.flags[ex.need]) {
          if (W.t - W.msgT > 80) { W.msgT = W.t; W.events.push({ type: 'msg', t: ex.lock }); }
          var cx = (ex.x + ex.w / 2) * T, cy = (ex.y + ex.h / 2) * T, dx = p.x - cx, dy = p.y - cy, d = Math.sqrt(dx * dx + dy * dy) || 1;
          move(W, p, dx / d * 6, dy / d * 6, 9);
        } else if (!W.dialog) { W._npcName = null; push(W, ex.script); runScript(W); }
      }
    });
    return W.events;
  }

  // ---------- 任务目标位置 ----------
  function target(W) {
    var q = W.quest && W.data.quests[W.quest]; if (!q) return null;
    if (q.area !== W.areaId) {
      var ex = (W.area.exits || [])[0]; return ex ? { x: (ex.x + ex.w / 2) * T, y: (ex.y + ex.h / 2) * T } : null;
    }
    if (q.npc) { var n = W.npcs.filter(function (o) { return o.id === q.npc; })[0]; return n ? { x: n.x, y: n.y } : null; }
    if (q.group) {
      var best = null, bd = 1e9;
      W.enemies.forEach(function (e) { if (e.alive && e.def.group === q.group) { var d = dist(e, W.p); if (d < bd) { bd = d; best = { x: e.x, y: e.y }; } } });
      return best;
    }
    if (q.enemy) { var b = W.enemies.filter(function (e) { return e.alive && e.def.id === q.enemy; })[0]; return b ? { x: b.x, y: b.y } : null; }
    return { x: q.x * T + T / 2, y: q.y * T + T / 2 };
  }

  function saveData(W) {
    return { v: 1, chapter: W.data.chapter, flags: W.flags, level: W.level, exp: W.exp, coins: W.coins, items: W.items, gear: W.gear, looks: W.looks, quest: W.quest, active: 0,
      party: W.party.map(function (m) { return { id: m.id, hp: m.hp }; }), saveAt: W.saveAt };
  }

  G.RPG = { T: T, BASE: BASE, ENEMY: ENEMY, ITEMS: ITEMS, create: create, step: step, maxHp: maxHp, atk: atk, expInfo: expInfo, target: target,
    interactable: interactable, solidAt: solidAt, saveData: saveData, useItem: useItem, member: member };
})(typeof window !== 'undefined' ? window : globalThis);
