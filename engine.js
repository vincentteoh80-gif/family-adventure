/* 游戏核心：物理、碰撞、敌人、收集（不依赖 DOM，可在 Node 中测试） */
(function (G) {
  'use strict';
  var T = 32; // 每格像素

  var PHYS = {
    gravity: 0.55, maxFall: 10, jumpV: -10.6, speed: 3.3,
    accG: 0.75, accA: 0.45, coyote: 7, buffer: 7, cutV: -3.2
  };

  // 角色能力（只让游戏更容易，不会让关卡变难）
  var CHAR = {
    tat:   { lives: 4, speed: 3.3, jumpV: -10.6, glide: false },
    yen:   { lives: 3, speed: 3.3, jumpV: -10.6, glide: true },
    ze:    { lives: 3, speed: 3.9, jumpV: -10.6, glide: false },
    xiang: { lives: 3, speed: 3.3, jumpV: -11.6, glide: false }
  };

  var PW = 20, PH = 30; // 玩家碰撞盒

  function parse(def, charId) {
    var rows = def.map.slice();
    var h = rows.length, w = 0, x, y;
    for (y = 0; y < h; y++) w = Math.max(w, rows[y].length);
    var tiles = [];
    var S = {
      w: w, h: h, tiles: tiles, coins: [], stars: [], items: [], keys: [],
      checkpoints: [], enemies: [], movers: [], gate: null,
      t: 0, score: 0, coinsN: 0, starsN: 0, itemsN: 0, hasKey: false,
      status: 'play', timeLimit: def.time || 0, timer: (def.time || 0) * 60,
      charId: charId, events: []
    };
    var start = { x: 2 * T, y: 11 * T };
    for (y = 0; y < h; y++) {
      var row = [];
      for (x = 0; x < w; x++) {
        var c = rows[y][x] || ' ';
        var cx = x * T + T / 2, cy = y * T + T / 2;
        var tile = ' ';
        switch (c) {
          case '#': case 'B': case '=': case '^': tile = c; break;
          case 'o': S.coins.push({ x: cx, y: cy, got: false }); break;
          case '*': S.stars.push({ x: cx, y: cy, got: false }); break;
          case 'i': S.items.push({ x: cx, y: cy, got: false, n: S.items.length }); break;
          case 'k': S.keys.push({ x: cx, y: cy, got: false }); break;
          case 'C': S.checkpoints.push({ x: cx, y: (y + 1) * T, on: false }); break;
          case 'G': S.gate = { x: x * T, y: (y + 1) * T - 3 * T, w: 2 * T, h: 3 * T }; break;
          case 'P': start = { x: cx, y: (y + 1) * T }; break;
          case 'e': S.enemies.push({ kind: 'walk', x: cx - 11, y: (y + 1) * T - 22, w: 22, h: 22, vx: -0.9, vy: 0, alive: true, dead: 0 }); break;
          case 'f': S.enemies.push({ kind: 'fly', bx: cx - 11, by: cy - 11, x: cx - 11, y: cy - 11, w: 22, h: 22, ph: x * 0.7, alive: true, dead: 0 }); break;
          case '~': S.movers.push(mkMover(x, y, 1, 0, 4)); break;
          case '|': S.movers.push(mkMover(x, y, 0, -1, 3)); break;
        }
        row.push(tile);
      }
      tiles.push(row);
    }
    var cm = CHAR[charId] || CHAR.tat;
    S.lives = cm.lives; S.maxLives = cm.lives;
    S.spawn = start;
    S.player = mkPlayer(start, cm);
    S.totalCoins = S.coins.length; S.totalItems = S.items.length;
    return S;
  }

  function mkMover(x, y, dx, dy, range) {
    var dist = range * T, speed = 1.1;
    return { bx: x * T, by: y * T, x: x * T, y: y * T, w: 3 * T, h: 12, dx: dx, dy: dy,
      dist: dist, period: Math.round(dist / speed) * 2, mx: 0, my: 0 };
  }

  function mkPlayer(p, cm) {
    return { x: p.x - PW / 2, y: p.y - PH, w: PW, h: PH, vx: 0, vy: 0, onGround: false,
      onMover: -1, coyote: 0, buffer: 0, jumping: false, facing: 1, inv: 0,
      speed: cm.speed, jumpV: cm.jumpV, glide: cm.glide, anim: 0, wasJump: false };
  }

  function solidAt(S, tx, ty) {
    if (tx < 0 || tx >= S.w) return true;      // 左右边界是墙
    if (ty < 0 || ty >= S.h) return false;
    var c = S.tiles[ty][tx];
    return c === '#' || c === 'B';
  }
  function tileAt(S, tx, ty) {
    if (tx < 0 || tx >= S.w || ty < 0 || ty >= S.h) return ' ';
    return S.tiles[ty][tx];
  }
  function overlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }
  function tri(t, period) { var p = (t % period) / period; return p < 0.5 ? p * 2 : 2 - p * 2; }

  function updateMovers(S) {
    for (var i = 0; i < S.movers.length; i++) {
      var m = S.movers[i];
      var k = tri(S.t, m.period) * m.dist, k0 = tri(Math.max(0, S.t - 1), m.period) * m.dist;
      m.x = m.bx + m.dx * k; m.y = m.by + m.dy * k;
      m.mx = m.dx * (k - k0); m.my = m.dy * (k - k0);
    }
  }

  function moveX(S, p, dx) {
    p.x += dx;
    var top = Math.floor(p.y / T), bot = Math.floor((p.y + p.h - 0.01) / T), ty;
    if (dx > 0) {
      var tx = Math.floor((p.x + p.w) / T);
      for (ty = top; ty <= bot; ty++) if (solidAt(S, tx, ty)) { p.x = tx * T - p.w; p.vx = 0; return true; }
    } else if (dx < 0) {
      var tx2 = Math.floor(p.x / T);
      for (ty = top; ty <= bot; ty++) if (solidAt(S, tx2, ty)) { p.x = (tx2 + 1) * T; p.vx = 0; return true; }
    }
    return false;
  }

  function moveY(S, p, dy, oneWay) {
    var prevBottom = p.y + p.h;
    p.y += dy;
    var left = Math.floor(p.x / T), right = Math.floor((p.x + p.w - 0.01) / T), tx;
    if (dy > 0) {
      var ty = Math.floor((p.y + p.h) / T);
      for (tx = left; tx <= right; tx++) {
        var c = tileAt(S, tx, ty);
        if (solidAt(S, tx, ty) && ty >= 0 && ty < S.h || (oneWay && c === '=' && prevBottom <= ty * T + 0.5)) {
          p.y = ty * T - p.h; p.vy = 0; return 1;
        }
      }
    } else if (dy < 0) {
      var ty2 = Math.floor(p.y / T);
      for (tx = left; tx <= right; tx++) if (ty2 >= 0 && solidAt(S, tx, ty2)) { p.y = (ty2 + 1) * T; p.vy = 0; return -1; }
    }
    return 0;
  }

  function hurt(S, why) {
    var p = S.player;
    if (p.inv > 0 || S.status !== 'play') return;
    S.lives--;
    S.events.push({ type: 'hurt', x: p.x, y: p.y, why: why });
    if (S.lives <= 0) { S.status = 'over'; S.events.push({ type: 'over' }); return; }
    respawn(S);
  }
  function respawn(S) {
    var p = S.player;
    p.x = S.spawn.x - p.w / 2; p.y = S.spawn.y - p.h; p.vx = 0; p.vy = 0; p.inv = 100; p.onMover = -1;
    if (S.timeLimit) S.timer = S.timeLimit * 60;
  }

  function step(S, inp, opts) {
    S.events.length = 0;
    if (S.status !== 'play') return S.events;
    var noEnemies = opts && opts.noEnemies;
    S.t++;
    var p = S.player;
    updateMovers(S);

    // 跟随移动平台
    if (p.onMover >= 0) {
      var m = S.movers[p.onMover];
      moveX(S, p, m.mx);
      if (m.my < 0) { moveY(S, p, m.my, false); } else { p.y += m.my; }
    }

    // 水平
    var dir = (inp.right ? 1 : 0) - (inp.left ? 1 : 0);
    if (dir) p.facing = dir;
    var target = dir * p.speed;
    var acc = p.onGround ? PHYS.accG : PHYS.accA;
    if (!dir && p.onGround) acc = 0.9;
    var dv = target - p.vx;
    p.vx += Math.max(-acc, Math.min(acc, dv));

    // 跳跃（含土狼时间与按键缓冲）
    var pressed = inp.jump && !p.wasJump;
    p.wasJump = !!inp.jump;
    if (pressed) p.buffer = PHYS.buffer; else if (p.buffer > 0) p.buffer--;
    if (p.onGround) p.coyote = PHYS.coyote; else if (p.coyote > 0) p.coyote--;
    if (p.buffer > 0 && p.coyote > 0) {
      p.vy = p.jumpV; p.buffer = 0; p.coyote = 0; p.onGround = false; p.onMover = -1; p.jumping = true;
      S.events.push({ type: 'jump', x: p.x + p.w / 2, y: p.y + p.h });
    }
    if (p.jumping && !inp.jump && p.vy < PHYS.cutV) p.vy = PHYS.cutV;
    if (p.vy >= 0) p.jumping = false;

    // 重力（Yen 按住跳可以慢慢飘）
    if (p.glide && inp.jump && p.vy > 0) p.vy = Math.min(p.vy + PHYS.gravity * 0.35, 2.0);
    else p.vy = Math.min(p.vy + PHYS.gravity, PHYS.maxFall);

    moveX(S, p, p.vx);
    var prevBottom = p.y + p.h;
    var res = moveY(S, p, p.vy, true);
    p.onGround = res === 1;
    p.onMover = -1;
    // 落在移动平台上
    if (p.vy >= 0) {
      for (var i = 0; i < S.movers.length; i++) {
        var mv = S.movers[i];
        if (p.x + p.w > mv.x + 2 && p.x < mv.x + mv.w - 2 && prevBottom <= mv.y + 6 + Math.max(0, -mv.my) && p.y + p.h >= mv.y - 0.5) {
          p.y = mv.y - p.h; p.vy = 0; p.onGround = true; p.onMover = i; break;
        }
      }
    }
    if (p.onGround && Math.abs(p.vx) > 0.3) p.anim += Math.abs(p.vx) * 0.08;
    if (p.inv > 0) p.inv--;

    // 掉下去
    if (p.y > S.h * T + 40) { hurt(S, 'fall'); return S.events; }

    // 尖刺
    var hb = { x: p.x + 3, y: p.y + 4, w: p.w - 6, h: p.h - 4 };
    var l = Math.floor(hb.x / T), r = Math.floor((hb.x + hb.w) / T);
    var tp = Math.floor(hb.y / T), bt = Math.floor((hb.y + hb.h) / T);
    for (var ty = tp; ty <= bt; ty++) for (var tx = l; tx <= r; tx++) {
      if (tileAt(S, tx, ty) === '^') {
        var sp = { x: tx * T + 4, y: ty * T + 14, w: T - 8, h: T - 14 };
        if (overlap(hb, sp)) { hurt(S, 'spike'); return S.events; }
      }
    }

    // 计时
    if (S.timeLimit) { S.timer--; if (S.timer <= 0) { hurt(S, 'time'); if (S.status !== 'play') return S.events; } }

    // 敌人
    if (!noEnemies) for (var e = 0; e < S.enemies.length; e++) {
      var en = S.enemies[e];
      if (!en.alive) { if (en.dead > 0) en.dead--; continue; }
      if (en.kind === 'walk') {
        en.vy = Math.min(en.vy + PHYS.gravity, PHYS.maxFall);
        var nx = en.x + en.vx;
        var aheadX = en.vx > 0 ? Math.floor((nx + en.w) / T) : Math.floor(nx / T);
        var footY = Math.floor((en.y + en.h + 2) / T), midY = Math.floor((en.y + en.h / 2) / T);
        var ft = tileAt(S, aheadX, footY);
        if (solidAt(S, aheadX, midY) || !(solidAt(S, aheadX, footY) || ft === '=') || tileAt(S, aheadX, midY) === '^') en.vx = -en.vx;
        else en.x = nx;
        moveY(S, en, en.vy, true);
        if (en.y > S.h * T) en.alive = false;
      } else {
        en.x = en.bx + Math.sin(S.t * 0.02 + en.ph) * 40;
        en.y = en.by + Math.sin(S.t * 0.05 + en.ph) * 30;
      }
      if (overlap(p, en)) {
        if (p.vy > 0 && prevBottom <= en.y + 10) {
          en.alive = false; en.dead = 30; p.vy = inp.jump ? -10 : -7; p.jumping = !!inp.jump;
          S.score += 100; S.events.push({ type: 'stomp', x: en.x + en.w / 2, y: en.y });
        } else { hurt(S, 'enemy'); return S.events; }
      }
    }

    // 收集
    var pick = function (arr, r2, type, fn) {
      for (var j = 0; j < arr.length; j++) {
        var o = arr[j];
        if (o.got) continue;
        if (Math.abs(p.x + p.w / 2 - o.x) < r2 + p.w / 2 && Math.abs(p.y + p.h / 2 - o.y) < r2 + p.h / 2) {
          o.got = true; fn(o); S.events.push({ type: type, x: o.x, y: o.y, n: o.n });
        }
      }
    };
    pick(S.coins, 9, 'coin', function () { S.coinsN++; S.score += 10; });
    pick(S.stars, 12, 'star', function () { S.starsN++; S.score += 500; });
    pick(S.items, 11, 'item', function () { S.itemsN++; S.score += 100; });
    pick(S.keys, 12, 'key', function () { S.hasKey = true; S.score += 200; });

    for (var c = 0; c < S.checkpoints.length; c++) {
      var cp = S.checkpoints[c];
      if (!cp.on && Math.abs(p.x + p.w / 2 - cp.x) < 20 && Math.abs(p.y + p.h - cp.y) < 70) {
        cp.on = true; S.spawn = { x: cp.x, y: cp.y }; S.events.push({ type: 'checkpoint', x: cp.x, y: cp.y });
      }
    }

    if (S.gate && overlap(p, { x: S.gate.x + 14, y: S.gate.y, w: S.gate.w - 28, h: S.gate.h })) {
      if (S.hasKey || S.keys.length === 0) {
        S.status = 'win';
        S.score += S.lives * 100 + (S.timeLimit ? Math.floor(S.timer / 60) * 10 : 0);
        S.events.push({ type: 'win' });
      } else if (S.t % 60 === 0 || !S._lockHint) { S._lockHint = 1; S.events.push({ type: 'locked' }); }
    } else S._lockHint = 0;

    return S.events;
  }

  G.Engine = { T: T, PHYS: PHYS, CHAR: CHAR, create: parse, step: step, respawn: respawn };
})(typeof window !== 'undefined' ? window : globalThis);
