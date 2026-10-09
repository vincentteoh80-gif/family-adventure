/* 游戏核心 v2：物理、碰撞、敌人 + 每个角色不同的关卡目标（不依赖 DOM，可在 Node 中测试） */
(function (G) {
  'use strict';
  var T = 32;
  var PHYS = { gravity: 0.55, maxFall: 10, jumpV: -10.6, speed: 3.3, accG: 0.75, accA: 0.45, coyote: 7, buffer: 7, cutV: -3.2 };
  var CHAR = {
    tat:   { lives: 4, speed: 3.3, jumpV: -10.6, glide: false },
    yen:   { lives: 3, speed: 3.3, jumpV: -10.6, glide: true },
    ze:    { lives: 3, speed: 3.9, jumpV: -10.6, glide: false },
    xiang: { lives: 3, speed: 3.3, jumpV: -11.6, glide: false }
  };
  var FAMILY = ['tat', 'yen', 'ze', 'xiang'];
  var PW = 20, PH = 30;

  function getRole(def, id) {
    var kid = id === 'ze' || id === 'xiang';
    var R = def.roles || {};
    return Object.assign({}, def.base || {}, (kid ? R.kids : R.parents) || {}, R[id] || {});
  }

  function body(x, y, o) {
    var b = { x: x - PW / 2, y: y - PH, w: PW, h: PH, vx: 0, vy: 0, onGround: false, onPlat: -1, coyote: 0, buffer: 0,
      jumping: false, facing: 1, inv: 0, anim: 0, wasJump: false, speed: PHYS.speed, jumpV: PHYS.jumpV, glide: false };
    return Object.assign(b, o || {});
  }

  function create(def, charId) {
    var r = getRole(def, charId);
    var rows = def.map, h = rows.length, w = 0, x, y;
    for (y = 0; y < h; y++) w = Math.max(w, rows[y].length);
    var S = {
      w: w, h: h, tiles: [], wind: {}, hides: [], coins: [], stars: [], items: [], keys: [], checkpoints: [], enemies: [],
      movers: [], temps: [], npcs: [], friends: [], spots: [], cams: [], devices: [], kidSpawns: [], standers: [], lanterns: [],
      fall: [], gate: null, table: null, fountain: null, npcSpawn: null, cargoSpawn: null,
      t: 0, score: 0, coinsN: 0, starsN: 0, itemsN: 0, hasKey: false, status: 'play', role: r, charId: charId, events: [],
      timeLimit: r.time || 0, timer: (r.time || 0) * 60, meter: 0, temp: 100, money: r.money0 || 0, ink: r.ink || 0,
      step: 0, slow: 0, light: 0, caughtN: 0, photosN: 0, deliveredN: 0, devOff: 0, scroll: 0, raceCaught: false, msgT: -999
    };
    var start = { x: 2 * T, y: 11 * T }, itemIdx = 0;
    for (y = 0; y < h; y++) {
      var row = [];
      for (x = 0; x < w; x++) {
        var c = rows[y][x] || ' ', cx = x * T + T / 2, cy = y * T + T / 2, bot = (y + 1) * T, tile = ' ';
        switch (c) {
          case '#': case 'B': case '=': case '^': tile = c; break;
          case '_': tile = r.draw ? ' ' : '='; break;
          case 'w': S.wind[y * w + x] = 1; break;
          case 'H': S.hides.push({ x: x * T, y: y * T, w: T, h: T }); break;
          case 'o': S.coins.push({ x: cx, y: cy, got: false }); break;
          case '*': S.stars.push({ x: cx, y: cy, got: false }); break;
          case 'i': S.items.push({ x: cx, y: cy, got: false, n: itemIdx, kind: r.itemKinds ? r.itemKinds[itemIdx % r.itemKinds.length] : (r.item || 'heart') }); itemIdx++; break;
          case 'k': S.keys.push({ x: cx, y: cy, got: false }); break;
          case 'C': S.checkpoints.push({ x: cx, y: bot, on: false }); break;
          case 'G': S.gate = { x: x * T, y: bot - 3 * T, w: 2 * T, h: 3 * T }; break;
          case 'P': start = { x: cx, y: bot }; break;
          case 'e': S.enemies.push({ kind: 'walk', x: cx - 11, y: bot - 22, w: 22, h: 22, vx: -0.9, vy: 0, alive: true, dead: 0 }); break;
          case 'f': S.enemies.push({ kind: 'fly', bx: cx - 11, by: cy - 11, x: cx - 11, y: cy - 11, w: 22, h: 22, ph: x * 0.7, alive: true, dead: 0 }); break;
          case '~': S.movers.push(mkMover(x, y, 1, 0, 4)); break;
          case '|': S.movers.push(mkMover(x, y, 0, -1, 3)); break;
          case 'N': S.npcSpawn = { x: cx, y: bot }; break;
          case 'D': S.table = { x: x * T, y: bot - 40, w: 2 * T, h: 40 }; break;
          case 'b': S.friends.push({ x: cx - 12, y: bot - 34, w: 24, h: 34, cool: 0 }); break;
          case 'p': S.spots.push({ x: x * T - 8, y: bot - 2 * T, w: T + 16, h: 2 * T, prog: 0, done: false }); break;
          case 'V': S.cams.push({ x: cx, y: y * T + 6, ph: x * 0.37, per: 200 + (x % 3) * 40 }); break;
          case 'T': S.devices.push({ x: cx - 16, y: bot - 30, w: 32, h: 30, off: false, kind: S.devices.length % 2 ? 'phone' : 'tv' }); break;
          case 'K': S.kidSpawns.push({ x: cx, y: bot }); break;
          case 'M': S.standers.push({ x: cx, y: bot }); break;
          case 'F': S.fountain = { x: x * T, y: bot - 40, w: T, h: 40 }; break;
          case 'L': S.lanterns.push({ x: cx, y: cy, got: false }); break;
          case 'c': S.cargoSpawn = { x: cx, y: bot }; break;
        }
        row.push(tile);
      }
      S.tiles.push(row);
    }
    var cm = CHAR[charId] || CHAR.tat;
    S.lives = cm.lives + (r.extraLives || 0); S.maxLives = S.lives;
    S.spawn = start; S.start = start;
    S.player = body(start.x, start.y, {
      speed: (r.speed || cm.speed) * (r.speedMul || 1), jumpV: cm.jumpV * (r.jumpMul || 1), glide: cm.glide || !!r.glide
    });
    S.baseSpeed = S.player.speed;
    S.totalCoins = S.coins.length; S.totalItems = S.items.length;
    S.need = r.need || 0;
    initGoal(S, r, charId);
    return S;
  }

  function mkNpc(id, x, y, ai, speed) {
    return body(x, y, { id: id, ai: ai, speed: speed, home: { x: x, y: y }, pause: 0, visited: {}, done: false, ph: 0 });
  }

  function initGoal(S, r, me) {
    var g = r.goal;
    if (g === 'escort') {
      var sp = S.npcSpawn || { x: S.start.x + 3 * T, y: S.start.y };
      S.npcs.push(mkNpc(r.npc, sp.x, sp.y, 'lead', r.npcSpeed || 2.0));
      S.meterMax = r.need || 600;
    } else if (g === 'follow') {
      S.npcs.push(mkNpc(r.npc, S.start.x - 40, S.start.y, 'follow', r.npcSpeed || 2.8));
    } else if (g === 'race') {
      var rs = S.npcSpawn || { x: S.start.x + 4 * T, y: S.start.y };
      S.npcs.push(mkNpc(r.npc, rs.x, rs.y, 'race', r.npcSpeed || 1.5));
    } else if (g === 'carry') {
      S.cargo = { kind: r.cargo, x: S.start.x, y: S.start.y - 20, w: 22, h: 20, vy: 0, carried: true };
    } else if (g === 'catchkids') {
      var ids = ['ze', 'xiang'];
      S.kidSpawns.forEach(function (k, i) { var n = mkNpc(ids[i % 2], k.x, k.y, 'wander', 1.1); n.ph = i * 137; S.npcs.push(n); });
      S.need = S.npcs.length;
    } else if (g === 'deliver') {
      var others = FAMILY.filter(function (f) { return f !== me; });
      S.standers.forEach(function (m, i) { var n = mkNpc(others[i % 3], m.x, m.y, 'stand', 0); S.npcs.push(n); });
      S.need = S.npcs.length;
    } else if (g === 'stealth') {
      S.need = S.devices.length;
    } else if (g === 'checklist') {
      S.order = r.order;
    } else if (g === 'clean') {
      S.need = S.items.length;
    }
    // 不是本角色用的东西：在 deliver 以外的模式，M 位置画成站着的家人（装饰）
    if (g !== 'deliver' && S.standers.length) {
      var o2 = FAMILY.filter(function (f) { return f !== me; });
      S.decor = S.standers.map(function (m, i) { return { id: o2[i % 3], x: m.x, y: m.y }; });
    }
  }

  function mkMover(x, y, dx, dy, range) {
    var dist = range * T, speed = 1.1;
    return { bx: x * T, by: y * T, x: x * T, y: y * T, w: 3 * T, h: 12, dx: dx, dy: dy, dist: dist, period: Math.round(dist / speed) * 2, mx: 0, my: 0 };
  }

  function solidAt(S, tx, ty) {
    if (tx < 0 || tx >= S.w) return true;
    if (ty < 0 || ty >= S.h) return false;
    var c = S.tiles[ty][tx]; return c === '#' || c === 'B';
  }
  function tileAt(S, tx, ty) { return (tx < 0 || tx >= S.w || ty < 0 || ty >= S.h) ? ' ' : S.tiles[ty][tx]; }
  function overlap(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }
  function tri(t, p) { var q = (t % p) / p; return q < 0.5 ? q * 2 : 2 - q * 2; }
  function hash(n) { var x = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); }

  function updateMovers(S) {
    for (var i = 0; i < S.movers.length; i++) {
      var m = S.movers[i];
      var k = tri(S.t, m.period) * m.dist, k0 = tri(Math.max(0, S.t - 1), m.period) * m.dist;
      m.x = m.bx + m.dx * k; m.y = m.by + m.dy * k; m.mx = m.dx * (k - k0); m.my = m.dy * (k - k0);
    }
    for (var j = S.temps.length - 1; j >= 0; j--) { if (--S.temps[j].life <= 0) S.temps.splice(j, 1); }
  }

  function moveX(S, p, dx) {
    p.x += dx;
    var top = Math.floor(p.y / T), bot = Math.floor((p.y + p.h - 0.01) / T), ty;
    if (dx > 0) { var tx = Math.floor((p.x + p.w) / T); for (ty = top; ty <= bot; ty++) if (solidAt(S, tx, ty)) { p.x = tx * T - p.w; p.vx = 0; return true; } }
    else if (dx < 0) { var tx2 = Math.floor(p.x / T); for (ty = top; ty <= bot; ty++) if (solidAt(S, tx2, ty)) { p.x = (tx2 + 1) * T; p.vx = 0; return true; } }
    return false;
  }
  function moveY(S, p, dy, oneWay) {
    var prevBottom = p.y + p.h; p.y += dy;
    var left = Math.floor(p.x / T), right = Math.floor((p.x + p.w - 0.01) / T), tx;
    if (dy > 0) {
      var ty = Math.floor((p.y + p.h) / T);
      for (tx = left; tx <= right; tx++) {
        var c = tileAt(S, tx, ty);
        if ((solidAt(S, tx, ty) && ty >= 0 && ty < S.h) || (oneWay && c === '=' && prevBottom <= ty * T + 0.5)) { p.y = ty * T - p.h; p.vy = 0; return 1; }
      }
    } else if (dy < 0) {
      var ty2 = Math.floor(p.y / T);
      for (tx = left; tx <= right; tx++) if (ty2 >= 0 && solidAt(S, tx, ty2)) { p.y = (ty2 + 1) * T; p.vy = 0; return -1; }
    }
    return 0;
  }

  // 通用身体物理（玩家和 NPC 共用）
  function physics(S, p, dir, jumpHeld, glideOk) {
    if (p.onPlat >= 0 && p.onPlat < S.movers.length) {
      var m = S.movers[p.onPlat]; moveX(S, p, m.mx); if (m.my < 0) moveY(S, p, m.my, false); else p.y += m.my;
    }
    if (dir) p.facing = dir;
    var acc = p.onGround ? PHYS.accG : PHYS.accA; if (!dir && p.onGround) acc = 0.9;
    var dv = dir * p.speed - p.vx; p.vx += Math.max(-acc, Math.min(acc, dv));
    var pressed = jumpHeld && !p.wasJump; p.wasJump = !!jumpHeld;
    if (pressed) p.buffer = PHYS.buffer; else if (p.buffer > 0) p.buffer--;
    if (p.onGround) p.coyote = PHYS.coyote; else if (p.coyote > 0) p.coyote--;
    var jumped = false;
    if (p.buffer > 0 && p.coyote > 0) { p.vy = p.jumpV; p.buffer = 0; p.coyote = 0; p.onGround = false; p.onPlat = -1; p.jumping = true; jumped = true; }
    if (p.jumping && !jumpHeld && p.vy < PHYS.cutV) p.vy = PHYS.cutV;
    if (p.vy >= 0) p.jumping = false;
    if (p.glide && glideOk && jumpHeld && p.vy > 0) p.vy = Math.min(p.vy + PHYS.gravity * 0.35, 2.0);
    else p.vy = Math.min(p.vy + PHYS.gravity, PHYS.maxFall);
    moveX(S, p, p.vx);
    var prevBottom = p.y + p.h;
    var res = moveY(S, p, p.vy, true);
    p.onGround = res === 1; p.onPlat = -1;
    if (p.vy >= 0) {
      var i, mv;
      for (i = 0; i < S.movers.length; i++) {
        mv = S.movers[i];
        if (p.x + p.w > mv.x + 2 && p.x < mv.x + mv.w - 2 && prevBottom <= mv.y + 6 + Math.max(0, -mv.my) && p.y + p.h >= mv.y - 0.5) { p.y = mv.y - p.h; p.vy = 0; p.onGround = true; p.onPlat = i; break; }
      }
      for (i = 0; i < S.temps.length; i++) {
        mv = S.temps[i];
        if (p.x + p.w > mv.x + 2 && p.x < mv.x + mv.w - 2 && prevBottom <= mv.y + 1 && p.y + p.h >= mv.y - 0.5) { p.y = mv.y - p.h; p.vy = 0; p.onGround = true; break; }
      }
    }
    if (p.onGround && Math.abs(p.vx) > 0.3) p.anim += Math.abs(p.vx) * 0.08;
    return { jumped: jumped, prevBottom: prevBottom };
  }

  function groundAhead(S, b, dir) {
    var fx = dir > 0 ? Math.floor((b.x + b.w + 6) / T) : Math.floor((b.x - 6) / T);
    var fy = Math.floor((b.y + b.h + 4) / T);
    for (var k = 0; k < 3; k++) { if (solidAt(S, fx, fy + k) || tileAt(S, fx, fy + k) === '=') return true; }
    return false;
  }
  function wallAhead(S, b, dir) {
    var fx = dir > 0 ? Math.floor((b.x + b.w + 4) / T) : Math.floor((b.x - 4) / T);
    return solidAt(S, fx, Math.floor((b.y + b.h - 4) / T)) || solidAt(S, fx, Math.floor(b.y / T));
  }
  function spikeAhead(S, b, dir) {
    var fx = dir > 0 ? Math.floor((b.x + b.w + 10) / T) : Math.floor((b.x - 10) / T);
    return tileAt(S, fx, Math.floor((b.y + b.h - 4) / T)) === '^';
  }

  function npcStep(S, n) {
    var p = S.player, dir = 0, jump = false, dx = (p.x - n.x);
    if (n.ai === 'lead') {
      var ahead = n.x - p.x;
      if (n.x < S.gate.x + 8 && ahead < 6 * T) dir = 1;
    } else if (n.ai === 'follow' || n.ai === 'tag') {
      if (Math.abs(dx) > 40) dir = dx > 0 ? 1 : -1;
    } else if (n.ai === 'race') {
      if (n.pause > 0) { n.pause--; }
      else {
        dir = 1;
        for (var i = 0; i < S.friends.length; i++) { var f = S.friends[i]; if (!n.visited[i] && Math.abs(n.x + n.w / 2 - (f.x + f.w / 2)) < 6) { n.visited[i] = 1; n.pause = 80; dir = 0; S.events.push({ type: 'npcChat', x: f.x, y: f.y }); } }
      }
    } else if (n.ai === 'wander') {
      var lo = n.home.x - 4 * T, hi = n.home.x + 4 * T;
      if (!n.wdir) n.wdir = 1;
      if (n.x > hi || wallAhead(S, n, n.wdir) || !groundAhead(S, n, n.wdir)) n.wdir = -1; if (n.x < lo) n.wdir = 1;
      n.phone = ((S.t + n.ph) % 300) < 170;
      dir = n.phone ? 0 : n.wdir;
    }
    if (dir && n.onGround && (wallAhead(S, n, dir) || !groundAhead(S, n, dir) || spikeAhead(S, n, dir))) jump = true;
    if (n.jumpHold > 0) { jump = true; if (--n.jumpHold === 0) n.rel = 1; }
    else if (n.rel) { jump = false; n.rel = 0; }
    else if (jump) n.jumpHold = 18;
    physics(S, n, dir, jump, false);
    // NPC 掉坑或卡住：瞬移回玩家附近
    var far = Math.abs(n.x - p.x) > 16 * T && (n.ai === 'follow' || n.ai === 'tag');
    if (n.y > S.h * T + 20 || far) {
      var sx = n.ai === 'lead' ? p.x + 2 * T : p.x - 30;
      n.x = sx; n.y = p.y; n.vx = 0; n.vy = 0;
      if (far) S.events.push({ type: 'npcWarp', id: n.id });
    }
  }

  function hurt(S, why) {
    var p = S.player;
    if (p.inv > 0 || S.status !== 'play') return;
    S.lives--;
    S.events.push({ type: 'hurt', x: p.x, y: p.y, why: why });
    if (S.lives <= 0) { S.status = 'over'; S.events.push({ type: 'over' }); return; }
    respawn(S);
  }
  function safeSpawnX(S, minX) {
    for (var c = Math.max(1, Math.floor(minX / T)); c < S.w - 1; c++) if (solidAt(S, c, 12) && tileAt(S, c, 11) === ' ' && tileAt(S, c, 10) === ' ' && solidAt(S, c + 1, 12)) return c * T + T / 2;
    return S.spawn.x;
  }
  function respawn(S) {
    var p = S.player, r = S.role, sp = S.spawn;
    if (r.autoscroll) sp = { x: safeSpawnX(S, S.scroll + 3 * T), y: 12 * T };
    p.x = sp.x - p.w / 2; p.y = sp.y - p.h; p.vx = 0; p.vy = 0; p.inv = 100; p.onPlat = -1;
    if (S.timeLimit) S.timer = S.timeLimit * 60;
    S.temp = 100; S.slow = 0;
    if (S.cargo) { S.cargo.carried = true; }
    S.npcs.forEach(function (n) {
      if (n.ai === 'race' && !S.raceCaught) { n.x = Math.max(n.home.x, sp.x + 4 * T) - n.w / 2; n.y = sp.y - n.h; n.vx = 0; n.vy = 0; n.visited = {}; n.pause = 30; }
      else if (n.ai === 'lead' || n.ai === 'follow' || n.ai === 'tag') { n.x = p.x + (n.ai === 'lead' ? 50 : -30); n.y = p.y; n.vx = 0; n.vy = 0; }
    });
  }

  function dropCargo(S, why) {
    var p = S.player, c = S.cargo;
    if (!c || !c.carried || p.inv > 0) return;
    c.carried = false; c.x = p.x; c.y = p.y - 6; c.vy = -5;
    p.vx = -p.facing * 5; p.vy = -5; p.inv = 50;
    S.events.push({ type: 'drop', x: p.x, y: p.y, why: why });
  }

  function msg(S, text, every) {
    if (S.t - S.msgT < (every || 70)) return;
    S.msgT = S.t; S.events.push({ type: 'msg', text: text });
  }

  function goalOK(S) {
    var r = S.role, g = r.goal;
    switch (g) {
      case 'key': return S.hasKey;
      case 'collect': case 'clean': return S.itemsN >= S.need;
      case 'escort': return S.meter >= S.meterMax;
      case 'follow': var n = S.npcs[0]; return Math.abs(n.x - S.player.x) < 4 * T;
      case 'race': return S.raceCaught;
      case 'carry': return S.cargo.carried;
      case 'photo': return S.photosN >= S.need;
      case 'budget': return S.money >= S.need;
      case 'deliver': return S.deliveredN >= S.need;
      case 'checklist': return S.step >= S.order.length;
      case 'stealth': return S.devOff >= S.need;
      case 'catchkids': return S.caughtN >= S.need;
      default: return true;
    }
  }

  // 下一个目标的位置（游戏里画箭头，也给自动测试用）
  function hint(S) {
    var r = S.role, g = r.goal, p = S.player, gate = S.gate ? { x: S.gate.x + T, y: S.gate.y + 2 * T } : null;
    var nearest = function (arr, f) { var best = null, bd = 1e9; arr.forEach(function (o) { if (f(o)) { var ox = o.x + (o.w ? o.w / 2 : 0), oy = o.y + (o.h ? o.h / 2 : 0); var d = Math.abs(ox - p.x) + Math.abs(oy - p.y) * 1.5; if (r.autoscroll && ox < p.x - 20) d += 5000; if (d < bd) { bd = d; best = { x: ox, y: oy }; } } }); return best; };
    if (goalOK(S)) return gate;
    switch (g) {
      case 'key': return S.keys[0] ? { x: S.keys[0].x, y: S.keys[0].y } : gate;
      case 'collect': case 'clean': return nearest(S.items, function (o) { return !o.got; });
      case 'escort': return { x: S.npcs[0].x + 10, y: S.npcs[0].y + 15 };
      case 'follow': return { x: S.npcs[0].x, y: S.npcs[0].y + 15 };
      case 'race': return { x: S.npcs[0].x, y: S.npcs[0].y + 15 };
      case 'carry': return { x: S.cargo.x, y: S.cargo.y };
      case 'photo': return nearest(S.spots, function (o) { return !o.done; });
      case 'budget': return nearest(S.coins, function (o) { return !o.got; }) || gate;
      case 'deliver': return nearest(S.npcs, function (o) { return !o.done; });
      case 'checklist':
        var need = S.order[S.step];
        if (need === 'drink' && S.fountain) return { x: S.fountain.x + 16, y: S.fountain.y + 20 };
        if (need === 'key' && S.keys[0]) return { x: S.keys[0].x, y: S.keys[0].y };
        return nearest(S.items, function (o) { return !o.got && o.kind === need; });
      case 'stealth': return nearest(S.devices, function (o) { return !o.off; });
      case 'catchkids': return nearest(S.npcs, function (o) { return !o.done; });
      case 'catch': var good = S.fall.filter(function (f) { return f.good; }); return good.length ? { x: good[0].x, y: 11 * T } : { x: S.w * T / 2, y: 11 * T };
    }
    return gate;
  }

  function step(S, inp, opts) {
    S.events.length = 0;
    if (S.status !== 'play') return S.events;
    var noEnemies = opts && opts.noEnemies, r = S.role, g = r.goal;
    S.t++;
    var p = S.player;
    updateMovers(S);

    // 自动卷屏（巴厘岛）
    if (r.autoscroll && S.t > 90) {
      S.scroll = Math.min(S.scroll + r.autoscroll, S.w * T - 640);
      if (p.x < S.scroll) { moveX(S, p, S.scroll - p.x); if (p.x < S.scroll - 2) { hurt(S, 'scroll'); return S.events; } }
    }

    // 画平台（Xiang）
    var act = inp.action && !S._wasAct; S._wasAct = !!inp.action;
    if (r.draw && act) {
      if (S.ink > 0) {
        S.ink--; if (S.temps.length >= 3) S.temps.shift();
        S.temps.push({ x: p.x + p.w / 2 - 1.5 * T + p.facing * 20, y: p.y + p.h + 3, w: 3 * T, h: 10, life: 330 });
        S.events.push({ type: 'draw', x: p.x, y: p.y + p.h });
      } else msg(S, '墨水用完了！吃零食补充墨水');
    }

    if (S.slow > 0) { S.slow--; p.speed = S.baseSpeed * 0.62; } else p.speed = S.baseSpeed;
    var dir = (inp.right ? 1 : 0) - (inp.left ? 1 : 0);
    var ph = physics(S, p, dir, inp.jump, true);
    if (ph.jumped) S.events.push({ type: 'jump', x: p.x + p.w / 2, y: p.y + p.h });
    var prevBottom = ph.prevBottom;
    if (p.inv > 0) p.inv--;
    if (p.y > S.h * T + 40) { hurt(S, 'fall'); return S.events; }

    // 尖刺
    var hb = { x: p.x + 3, y: p.y + 4, w: p.w - 6, h: p.h - 4 };
    for (var ty = Math.floor(hb.y / T); ty <= Math.floor((hb.y + hb.h) / T); ty++) for (var tx = Math.floor(hb.x / T); tx <= Math.floor((hb.x + hb.w) / T); tx++) {
      if (tileAt(S, tx, ty) === '^' && overlap(hb, { x: tx * T + 4, y: ty * T + 14, w: T - 8, h: T - 14 })) { hurt(S, 'spike'); return S.events; }
    }

    // 计时
    if (S.timeLimit) { S.timer--; if (S.timer <= 0) { hurt(S, 'time'); if (S.status !== 'play') return S.events; } }

    // 体温（云顶）
    if (r.temp) {
      var inWind = S.wind[Math.floor((p.y + p.h / 2) / T) * S.w + Math.floor((p.x + p.w / 2) / T)];
      S.temp -= (r.temp) * (inWind ? 5 : 1) * (S.charId === 'yen' ? 0.5 : 1);
      S.inWind = !!inWind;
      if (S.temp <= 0) { hurt(S, 'cold'); if (S.status !== 'play') return S.events; }
    }
    if (S.light > 0) S.light--;

    // 敌人
    if (!noEnemies) for (var e = 0; e < S.enemies.length; e++) {
      var en = S.enemies[e];
      if (!en.alive) { if (en.dead > 0) en.dead--; continue; }
      if (en.kind === 'walk') {
        en.vy = Math.min(en.vy + PHYS.gravity, PHYS.maxFall);
        var nx = en.x + en.vx, aheadX = en.vx > 0 ? Math.floor((nx + en.w) / T) : Math.floor(nx / T);
        var footY = Math.floor((en.y + en.h + 2) / T), midY = Math.floor((en.y + en.h / 2) / T);
        if (solidAt(S, aheadX, midY) || !(solidAt(S, aheadX, footY) || tileAt(S, aheadX, footY) === '=') || tileAt(S, aheadX, midY) === '^') en.vx = -en.vx; else en.x = nx;
        moveY(S, en, en.vy, true); if (en.y > S.h * T) en.alive = false;
      } else { en.x = en.bx + Math.sin(S.t * 0.02 + en.ph) * 40; en.y = en.by + Math.sin(S.t * 0.05 + en.ph) * 30; }
      if (overlap(p, en)) {
        if (p.vy > 0 && prevBottom <= en.y + 10) {
          en.alive = false; en.dead = 30; p.vy = inp.jump ? -10 : -7; p.jumping = !!inp.jump; S.score += 100; S.events.push({ type: 'stomp', x: en.x + en.w / 2, y: en.y });
        } else if (p.inv <= 0) {
          if (g === 'carry' && S.cargo.carried) dropCargo(S, 'enemy');
          else if (g === 'budget') { S.money = Math.max(0, S.money - 15); p.vx = -p.facing * 5; p.vy = -5; p.inv = 60; S.events.push({ type: 'pay', x: p.x, y: p.y }); }
          else { hurt(S, 'enemy'); return S.events; }
        }
      }
    }

    // 朋友（拿着啤酒）
    if (g === 'carry' && r.friendsDrop) {
      for (var fi = 0; fi < S.friends.length; fi++) if (overlap(p, S.friends[fi]) && S.cargo.carried && p.inv <= 0) dropCargo(S, 'friend');
      if (S.table && overlap(p, S.table) && S.cargo.carried && p.inv <= 0) dropCargo(S, 'friend');
    }

    // 货物（新娘 / 宝宝 / 足球）
    if (S.cargo) {
      var cg = S.cargo;
      if (cg.carried) { cg.x = p.x; cg.y = p.y - 16; }
      else {
        cg.vy = Math.min(cg.vy + PHYS.gravity, PHYS.maxFall); moveY(S, cg, cg.vy, true);
        if (cg.y > S.h * T) { cg.x = S.spawn.x - 11; cg.y = S.spawn.y - 30; cg.vy = 0; S.events.push({ type: 'cargoBack' }); }
        if (p.inv < 30 && overlap(p, cg)) { cg.carried = true; S.events.push({ type: 'pickup', x: cg.x, y: cg.y }); }
      }
    }

    // NPC
    for (var ni = 0; ni < S.npcs.length; ni++) {
      var n = S.npcs[ni];
      if (n.ai !== 'stand' && !(n.ai === 'wander' && n.done)) npcStep(S, n);
      if (n.ai === 'lead') { if (Math.abs(n.x - p.x) < 5 * T) S.meter = Math.min(S.meterMax, S.meter + 1); }
      if (n.ai === 'race' && !S.raceCaught) {
        if (overlap(p, n)) { S.raceCaught = true; n.ai = 'tag'; n.speed = 3.0; S.events.push({ type: 'caught', x: n.x, y: n.y }); }
        else if (S.table && n.x + n.w > S.table.x) { S.events.push({ type: 'npcWin' }); hurt(S, 'race'); return S.events; }
      }
      if (n.ai === 'stand' && !n.done && overlap(p, n)) { n.done = true; S.deliveredN++; S.score += 200; S.events.push({ type: 'deliver', x: n.x, y: n.y, id: n.id }); }
      if (n.ai === 'wander' && !n.done && overlap(p, n)) {
        if (n.phone) { n.done = true; S.caughtN++; S.score += 300; S.events.push({ type: 'catchKid', x: n.x, y: n.y, id: n.id }); }
        else msg(S, n.id === 'ze' ? 'Ze 在假装看书……等他偷偷拿手机再抓！' : 'Xiang 在假装看书……等他偷偷拿手机再抓！', 90);
      }
    }

    // 拍照点
    for (var si = 0; si < S.spots.length; si++) {
      var spt = S.spots[si];
      if (spt.done) continue;
      if (g === 'photo' && overlap(p, spt) && p.onGround && Math.abs(p.vx) < 0.6) { spt.prog++; if (spt.prog >= 40) { spt.done = true; S.photosN++; S.score += 200; S.events.push({ type: 'photo', x: spt.x + 24, y: spt.y }); } }
      else spt.prog = 0;
    }

    // 监控摄像头（潜行）
    if (g === 'stealth') {
      var hidden = false, pc = { x: p.x + p.w / 2, y: p.y + p.h / 2 };
      for (var hi = 0; hi < S.hides.length; hi++) { var hz = S.hides[hi]; if (pc.x > hz.x && pc.x < hz.x + hz.w && pc.y > hz.y - T && pc.y < hz.y + hz.h) hidden = true; }
      S.hidden = hidden;
      for (var ci = 0; ci < S.cams.length; ci++) {
        var cam = S.cams[ci];
        cam.ang = Math.PI / 2 + 0.75 * Math.sin(S.t * 2 * Math.PI / cam.per + cam.ph);
        var ddx = pc.x - cam.x, ddy = pc.y - cam.y, dist = Math.sqrt(ddx * ddx + ddy * ddy);
        var da = Math.atan2(ddy, ddx) - cam.ang;
        cam.see = !hidden && dist < 9 * T && Math.abs(da) < 0.22;
        if (cam.see && p.inv <= 0) { hurt(S, 'caught'); return S.events; }
      }
      for (var di = 0; di < S.devices.length; di++) { var dv = S.devices[di]; if (!dv.off && overlap(p, dv)) { dv.off = true; S.devOff++; S.score += 200; S.events.push({ type: 'deviceOff', x: dv.x + 16, y: dv.y, kind: dv.kind }); } }
    } else S.cams.forEach(function (cam) { cam.ang = Math.PI / 2 + 0.75 * Math.sin(S.t * 2 * Math.PI / cam.per + cam.ph); cam.see = false; });

    // 厨房接东西
    if (g === 'catch') {
      if (S.t % (r.every || 46) === 0 && S.caughtN < S.need) {
        var hx = hash(S.t), kindR = hash(S.t + 7);
        var kind = kindR < 0.45 ? 'tomato' : kindR < 0.8 ? 'egg' : 'gourd';
        S.fall.push({ x: (1.5 + hx * (S.w - 3)) * T, y: 2.5 * T, vy: 1.6 + Math.min(1.6, S.t / 2400), kind: kind, good: kind !== 'gourd' });
      }
      for (var fj = S.fall.length - 1; fj >= 0; fj--) {
        var fo = S.fall[fj]; fo.y += fo.vy;
        var fb = { x: fo.x - 10, y: fo.y - 10, w: 20, h: 20 };
        if (overlap(p, fb)) {
          S.fall.splice(fj, 1);
          if (fo.good) { S.caughtN++; S.score += 100; S.events.push({ type: 'item', x: fo.x, y: fo.y }); if (S.caughtN >= S.need) { S.status = 'win'; S.score += S.lives * 100; S.events.push({ type: 'win' }); return S.events; } }
          else { hurt(S, 'gourd'); return S.events; }
        } else if (fo.y > 12 * T - 8) { S.fall.splice(fj, 1); S.events.push({ type: 'splat', x: fo.x, y: 12 * T, kind: fo.kind }); }
      }
    }

    // 收集
    var pick = function (arr, r2, type, fn) {
      for (var j = 0; j < arr.length; j++) {
        var o = arr[j]; if (o.got) continue;
        if (Math.abs(p.x + p.w / 2 - o.x) < r2 + p.w / 2 && Math.abs(p.y + p.h / 2 - o.y) < r2 + p.h / 2) { if (fn(o) !== false) { o.got = true; S.events.push({ type: type, x: o.x, y: o.y, n: o.n, kind: o.kind }); } }
      }
    };
    pick(S.coins, 9, 'coin', function () { S.coinsN++; S.score += 10; if (g === 'budget') S.money += 5; });
    pick(S.stars, 12, 'star', function () { S.starsN++; S.score += 500; });
    pick(S.lanterns, 12, 'lantern', function () { S.light = 600; });
    pick(S.items, 11, 'item', function (o) {
      if (g === 'checklist') { if (S.order[S.step] !== o.kind) { msg(S, '先' + (r.orderNames[S.step] || '') + '！'); return false; } S.step++; }
      if (r.slowFood) { S.slow = 150; S.events.push({ type: 'full', x: o.x, y: o.y }); }
      if (r.temp && o.kind === 'coat') S.temp = Math.min(100, S.temp + 45);
      if (r.draw) S.ink = Math.min(r.inkMax || 5, S.ink + 1);
      S.itemsN++; S.score += 100;
    });
    pick(S.keys, 12, 'key', function () {
      if (g === 'checklist') { if (S.order[S.step] !== 'key') { msg(S, '先' + (r.orderNames[S.step] || '') + '！'); return false; } S.step++; }
      S.hasKey = true; S.score += 200;
    });
    if (S.fountain && overlap(p, S.fountain)) {
      if (g === 'checklist' && S.order[S.step] === 'drink') { S.step++; S.score += 100; S.events.push({ type: 'drink', x: S.fountain.x + 16, y: S.fountain.y }); }
    }

    for (var c = 0; c < S.checkpoints.length; c++) {
      var cp = S.checkpoints[c];
      if (!cp.on && Math.abs(p.x + p.w / 2 - cp.x) < 20 && Math.abs(p.y + p.h - cp.y) < 70) { cp.on = true; S.spawn = { x: cp.x, y: cp.y }; S.events.push({ type: 'checkpoint', x: cp.x, y: cp.y }); }
    }

    // 进度
    if (g === 'follow') { var fn2 = S.npcs[0], d2 = Math.abs(fn2.x - p.x); S.meter = Math.max(0, Math.min(100, 100 - (d2 - 3 * T) / (8 * T) * 100)); }

    // 终点
    if (S.gate && overlap(p, { x: S.gate.x + 14, y: S.gate.y, w: S.gate.w - 28, h: S.gate.h })) {
      if (goalOK(S)) { S.status = 'win'; S.score += S.lives * 100 + (S.timeLimit ? Math.floor(S.timer / 60) * 10 : 0); S.events.push({ type: 'win' }); }
      else msg(S, r.lockMsg || '还没完成任务！', 90);
    }
    return S.events;
  }

  // 进度条数据（给 HUD 用）
  function progress(S) {
    var r = S.role, g = r.goal;
    switch (g) {
      case 'key': return { label: r.keyName || '钥匙', v: S.hasKey ? 1 : 0, max: 1 };
      case 'collect': case 'clean': return { label: r.itemName, v: S.itemsN, max: S.need };
      case 'escort': return { label: r.meterName || '爱心值', v: Math.floor(S.meter / S.meterMax * 100), max: 100, bar: true };
      case 'follow': return { label: r.meterName || '跟上了吗', v: Math.round(S.meter), max: 100, bar: true };
      case 'race': return { label: r.meterName || '追上了吗', v: S.raceCaught ? 1 : 0, max: 1 };
      case 'carry': return { label: r.cargoName, v: S.cargo.carried ? 1 : 0, max: 1 };
      case 'photo': return { label: '拍照', v: S.photosN, max: S.need };
      case 'budget': return { label: '钱包 RM', v: S.money, max: S.need };
      case 'deliver': return { label: '戴好口罩', v: S.deliveredN, max: S.need };
      case 'checklist': return { label: S.step < S.order.length ? '下一步：' + r.orderNames[S.step] : '准备好了！', v: S.step, max: S.order.length };
      case 'stealth': return { label: '关掉电器', v: S.devOff, max: S.need };
      case 'catchkids': return { label: '抓到偷玩', v: S.caughtN, max: S.need };
      case 'catch': return { label: '番茄 + 鸡蛋', v: S.caughtN, max: S.need };
      default: return { label: '走到终点', v: 0, max: 1 };
    }
  }

  G.Engine = { T: T, PHYS: PHYS, CHAR: CHAR, create: create, step: step, respawn: respawn, hint: hint, goalOK: goalOK, progress: progress, getRole: getRole };
})(typeof window !== 'undefined' ? window : globalThis);
