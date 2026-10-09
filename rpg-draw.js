/* 俯视角 RPG 绘制：地图、人物、敌人、特效（全部代码绘制，不用图片） */
(function (G) {
  'use strict';
  var T = 32, rr = G.roundRect, D = G.Draw;
  var FONT = '"PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif';
  function h(x, y) { var n = Math.sin(x * 127.1 + y * 311.7) * 43758.5; return n - Math.floor(n); }
  var WALLISH = { '#': 1, 'h': 1 };

  var THEME = {
    office: { floor: '#8ea7c4', floor2: '#e9ecef', wallTop: '#e3e8ec', wallFront: '#9fb0bd' },
    street: { floor: '#3f7a43', floor2: '#9e9e9e', wallTop: '#6a5a8c', wallFront: '#4a3d66' },
    hall:   { floor: '#fdf3e7', floor2: '#fdf3e7', wallTop: '#f8d3e1', wallFront: '#e5a5bf' }
  };

  function floorTile(ctx, c, x, y, th, tx, ty) {
    switch (c) {
      case ',': ctx.fillStyle = th.floor; ctx.fillRect(x, y, T, T); ctx.fillStyle = 'rgba(255,255,255,0.06)'; if ((tx + ty) % 2) ctx.fillRect(x, y, T, T); break;
      case '.': ctx.fillStyle = th.floor2; ctx.fillRect(x, y, T, T); ctx.strokeStyle = 'rgba(0,0,0,0.06)'; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, T - 1, T - 1); break;
      case 'g': ctx.fillStyle = (tx + ty) % 2 ? '#3f7a43' : '#437f47'; ctx.fillRect(x, y, T, T); if (h(tx, ty) > 0.7) { ctx.fillStyle = '#5a9a5c'; ctx.fillRect(x + 8, y + 12, 2, 6); ctx.fillRect(x + 12, y + 10, 2, 8); } break;
      case 'r': ctx.fillStyle = '#3a3f44'; ctx.fillRect(x, y, T, T); if (ty === 13 && tx % 3 === 0) { ctx.fillStyle = '#fdd835'; ctx.fillRect(x + 4, y + 14, 20, 4); } break;
      case 's': ctx.fillStyle = '#9ea4a8'; ctx.fillRect(x, y, T, T); ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.strokeRect(x + 0.5, y + 0.5, T - 1, T - 1); break;
      case '=': ctx.fillStyle = '#c62828'; ctx.fillRect(x, y, T, T); ctx.fillStyle = '#ffd54f'; if (tx === 16) ctx.fillRect(x, y, 3, T); else ctx.fillRect(x + T - 3, y, 3, T); break;
      case 'A': ctx.fillStyle = '#f8bbd0'; ctx.fillRect(x, y, T, T); ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(x, y + (tx % 2) * 16, T, 2); break;
      case 'x': ctx.fillStyle = th === THEME.street ? '#3a2e4f' : '#6d4c41'; ctx.fillRect(x, y, T, T); ctx.fillStyle = '#ffd54f'; ctx.fillRect(x + 6, y + 13, 20, 6); break;
      default: ctx.fillStyle = th.floor2; ctx.fillRect(x, y, T, T);
    }
  }

  function objTile(ctx, c, x, y, th, tx, ty, W, t) {
    switch (c) {
      case '#': case 'h':
        var below = W.tiles[ty + 1] && W.tiles[ty + 1][tx];
        var front = !(below && WALLISH[below]);
        if (c === 'h' && W.areaId === 'street' && tx >= 28) {
          ctx.fillStyle = '#7b1fa2'; ctx.fillRect(x, y, T, T); ctx.fillStyle = '#9c27b0'; ctx.fillRect(x, y, T, 6);
          if (ty === 3 || ty === 6) { ctx.fillStyle = (Math.floor(t / 20) + tx) % 2 ? '#ffeb3b' : '#ff9800'; for (var k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(x + 4 + k * 8, y + 16, 2.5, 0, 7); ctx.fill(); } }
          break;
        }
        ctx.fillStyle = th.wallTop; ctx.fillRect(x, y, T, T);
        if (front) { ctx.fillStyle = th.wallFront; ctx.fillRect(x, y + T * 0.45, T, T * 0.55); }
        if (c === 'h' && front && tx % 3 === 1) { ctx.fillStyle = h(tx, ty) > 0.4 ? '#ffe082' : '#455a64'; ctx.fillRect(x + 8, y + 2, 16, 10); }
        if (c === 'h' && !front && (tx + ty) % 3 === 0) { ctx.fillStyle = h(tx, ty) > 0.5 ? '#ffe08299' : '#37474f'; ctx.fillRect(x + 9, y + 9, 14, 14); }
        break;
      case 'D':
        floorTile(ctx, ',', x, y, th, tx, ty);
        ctx.fillStyle = '#a1887f'; rr(ctx, x + 1, y + 6, T - 2, 20, 3); ctx.fill(); ctx.fillStyle = '#795548'; ctx.fillRect(x + 1, y + 22, T - 2, 4);
        ctx.fillStyle = '#263238'; rr(ctx, x + 8, y - 2, 16, 12, 2); ctx.fill(); ctx.fillStyle = (Math.floor(t / 40) + tx) % 3 ? '#4fc3f7' : '#81d4fa'; ctx.fillRect(x + 10, y, 12, 8);
        break;
      case 'V': floorTile(ctx, '.', x, y, th, tx, ty); ctx.fillStyle = '#e53935'; rr(ctx, x + 3, y - 10, 26, 40, 4); ctx.fill(); ctx.fillStyle = '#b3e5fc'; ctx.fillRect(x + 6, y - 6, 20, 18);
        ['#ffeb3b', '#8bc34a', '#ff7043'].forEach(function (cc, i) { ctx.fillStyle = cc; ctx.fillRect(x + 8 + i * 6, y - 4, 4, 6); ctx.fillRect(x + 8 + i * 6, y + 4, 4, 6); }); break;
      case 'K': floorTile(ctx, '.', x, y, th, tx, ty); ctx.fillStyle = '#607d8b'; rr(ctx, x + 5, y - 6, 22, 34, 4); ctx.fill(); ctx.fillStyle = '#263238'; ctx.fillRect(x + 10, y + 8, 12, 10); ctx.fillStyle = '#fff'; ctx.fillRect(x + 13, y + 12, 6, 6); break;
      case 'T': floorTile(ctx, W.areaId === 'hall' ? '.' : '.', x, y, th, tx, ty); ctx.fillStyle = W.areaId === 'hall' ? '#6d4c41' : '#bcaaa4'; ctx.fillRect(x, y + 2, T, T - 2); ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.fillRect(x, y + 2, T, 4); break;
      case 'p': floorTile(ctx, W.areaId === 'office' && ty > 8 ? ',' : '.', x, y, th, tx, ty); ctx.fillStyle = '#8d6e63'; rr(ctx, x + 9, y + 16, 14, 14, 3); ctx.fill(); ctx.fillStyle = '#43a047'; ctx.beginPath(); ctx.arc(x + 16, y + 10, 10, 0, 7); ctx.arc(x + 9, y + 14, 6, 0, 7); ctx.arc(x + 23, y + 14, 6, 0, 7); ctx.fill(); break;
      case 't': floorTile(ctx, 'g', x, y, th, tx, ty); ctx.fillStyle = '#5d4037'; ctx.fillRect(x + 13, y + 18, 6, 12); ctx.fillStyle = '#1b5e20'; ctx.beginPath(); ctx.arc(x + 16, y + 10, 14, 0, 7); ctx.fill(); ctx.fillStyle = '#2e7d32'; ctx.beginPath(); ctx.arc(x + 12, y + 6, 7, 0, 7); ctx.fill(); break;
      case 'w': ctx.fillStyle = '#2f6fa8'; ctx.fillRect(x, y, T, T); ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); var o = (t * 0.5 + tx * 9) % 32; ctx.moveTo(x + o - 8, y + 12); ctx.lineTo(x + o, y + 12); ctx.moveTo(x + 32 - o, y + 24); ctx.lineTo(x + 40 - o, y + 24); ctx.stroke(); break;
      case 'B':
        floorTile(ctx, W.areaId === 'hall' ? '.' : 'g', x, y, th, tx, ty);
        if (W.areaId === 'hall') { ctx.fillStyle = '#8d6e63'; ctx.fillRect(x, y + 4, T, 20); ctx.fillStyle = '#6d4c41'; ctx.fillRect(x, y + 4, T, 6); ctx.fillStyle = '#ffffff55'; if (tx === 10 || tx === 23) { ctx.fillStyle = '#f8bbd0'; ctx.beginPath(); ctx.arc(x + 16, y + 8, 5, 0, 7); ctx.fill(); } }
        else { ctx.fillStyle = '#8d6e63'; ctx.fillRect(x + 2, y + 10, 28, 8); ctx.fillRect(x + 4, y + 18, 3, 8); ctx.fillRect(x + 25, y + 18, 3, 8); }
        break;
      case 'l': floorTile(ctx, 's', x, y, th, tx, ty); ctx.fillStyle = '#37474f'; ctx.fillRect(x + 14, y - 14, 4, 40); ctx.fillStyle = '#fff59d'; ctx.beginPath(); ctx.arc(x + 16, y - 16, 6, 0, 7); ctx.fill(); break;
      case 'f': floorTile(ctx, W.areaId === 'street' ? 'g' : '.', x, y, th, tx, ty);
        ['#f06292', '#fff176', '#ba68c8', '#ffffff'].forEach(function (cc, i) { ctx.fillStyle = cc; ctx.beginPath(); ctx.arc(x + 8 + (i % 2) * 14, y + 10 + Math.floor(i / 2) * 12, 5, 0, 7); ctx.fill(); });
        ctx.fillStyle = '#66bb6a'; ctx.fillRect(x + 14, y + 20, 4, 10); break;
      case 'P': floorTile(ctx, '.', x, y, th, tx, ty); ctx.fillStyle = '#fafafa'; ctx.fillRect(x + 6, y - 14, 20, 44); ctx.fillStyle = '#e0e0e0'; ctx.fillRect(x + 4, y - 16, 24, 6); ctx.fillRect(x + 4, y + 24, 24, 6); break;
      case 'L':
        var open = W.area.doors && W.flags[W.area.doors.L];
        floorTile(ctx, '.', x, y, th, tx, ty);
        if (!open) { ctx.fillStyle = '#8d6e63'; ctx.fillRect(x + 2, y, T - 4, T); ctx.fillStyle = '#ffd54f'; ctx.beginPath(); ctx.arc(x + 16, y + 16, 4, 0, 7); ctx.fill(); ctx.fillRect(x + 14, y + 16, 4, 7); }
        else { ctx.fillStyle = '#d7ccc8'; ctx.fillRect(x, y, 4, T); ctx.fillRect(x + T - 4, y, 4, T); }
        break;
      case 'M': floorTile(ctx, '.', x, y, th, tx, ty); ctx.fillStyle = '#b0bec5'; rr(ctx, x + 4, y - 10, 24, 38, 10); ctx.fill(); ctx.fillStyle = '#e1f5fe'; rr(ctx, x + 7, y - 7, 18, 32, 8); ctx.fill(); break;
    }
  }

  function tiles(ctx, W, cx, cy, vw, vh, t) {
    var th = THEME[W.area.theme] || THEME.office;
    var x0 = Math.max(0, Math.floor(cx / T)), x1 = Math.min(W.mw - 1, Math.ceil((cx + vw) / T));
    var y0 = Math.max(0, Math.floor(cy / T) - 1), y1 = Math.min(W.mh - 1, Math.ceil((cy + vh) / T) + 1);
    var tx, ty, c;
    for (ty = y0; ty <= y1; ty++) for (tx = x0; tx <= x1; tx++) { c = W.tiles[ty][tx]; if (',.grs=Ax'.indexOf(c) >= 0) floorTile(ctx, c, tx * T - cx, ty * T - cy, th, tx, ty); }
    for (ty = y0; ty <= y1; ty++) for (tx = x0; tx <= x1; tx++) { c = W.tiles[ty][tx]; if (',.grs=Ax'.indexOf(c) < 0) objTile(ctx, c, tx * T - cx, ty * T - cy, th, tx, ty, W, t); }
    if (W.areaId === 'street') { // 电影院招牌
      var sx = 31 * T - cx, sy = 1 * T - cy + 8;
      ctx.fillStyle = '#212121'; rr(ctx, sx, sy, 6 * T, 30, 6); ctx.fill(); ctx.strokeStyle = (Math.floor(t / 15) % 2) ? '#ffeb3b' : '#ff4081'; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 18px ' + FONT; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('电 影 院', sx + 3 * T, sy + 15);
    }
    if (W.areaId === 'hall') { // 舞台拱门
      var ax = 16 * T - cx + 16, ay = 1 * T - cy + 8;
      ctx.strokeStyle = '#f48fb1'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(ax, ay + 40, 70, Math.PI, 0); ctx.stroke();
      for (var k = 0; k < 9; k++) { var a = Math.PI + k * Math.PI / 8; D.heart(ctx, ax + Math.cos(a) * 70, ay + 40 + Math.sin(a) * 70, 7, k % 2 ? '#ff4081' : '#ffffff'); }
      ctx.fillStyle = '#c2185b'; ctx.font = 'bold 14px ' + FONT; ctx.textAlign = 'center'; ctx.fillText('Tat ♥ Yen', ax, ay + 30);
    }
  }

  // ---------- 敌人 ----------
  function enemy(ctx, e, cx, cy, t) {
    var x = e.x - cx, y = e.y - cy;
    ctx.save();
    if (!e.alive) { ctx.globalAlpha = Math.max(0, e.dead / 30); }
    else if (e.hit > 0 && e.hit % 4 < 2) ctx.globalAlpha = 0.55;
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(x, y + e.r * 0.7, e.r, e.r * 0.35, 0, 0, 7); ctx.fill();
    var z = e.z || 0, dir = G.__px > e.x ? 1 : -1;
    var fake = { x: x - 11, y: y + 8 - 22 - z, w: 22, h: 22, vx: dir, alive: true, dead: 0 };
    if (e.state === 'wind' && Math.floor(t / 4) % 2) { ctx.fillStyle = 'rgba(255,82,82,0.35)'; ctx.beginPath(); ctx.arc(x, y - 6, e.r + 10, 0, 7); ctx.fill(); }
    switch (e.type) {
      case 'folder': D.enemy(ctx, fake, 'folder', 0, t); break;
      case 'gift': D.enemy(ctx, fake, 'gift', 0, t); break;
      case 'germ': D.flyer(ctx, { x: x - 11, y: y - 18, w: 22, h: 22, alive: true }, 'germ', 0, t); break;
      case 'cup':
        ctx.translate(x, y + 8); ctx.lineWidth = 1.5; ctx.strokeStyle = '#3e2723';
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-10, -24); ctx.lineTo(10, -24); ctx.lineTo(8, 0); ctx.lineTo(-8, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#6d4c41'; ctx.fillRect(-9, -24, 18, 5); ctx.beginPath(); ctx.arc(12, -14, 5, -1.4, 1.4); ctx.stroke();
        ctx.strokeStyle = '#bdbdbd'; ctx.beginPath(); ctx.moveTo(-3, -28 - Math.sin(t * 0.1) * 2); ctx.quadraticCurveTo(0, -34, 3, -30); ctx.stroke();
        eyes(ctx, 0, -13); break;
      case 'cutter': case 'drinker':
        D.friend(ctx, { x: x - 12, y: y + 8 - 34, w: 24, h: 34 }, 0, t, e.type === 'cutter' ? '插队！' : '干杯！');
        break;
      case 'bossOT':
        ctx.translate(x, y + 10); ctx.scale(2.6, 2.6); D.enemy(ctx, { x: -11, y: -22, w: 22, h: 22, vx: dir, alive: true }, 'folder', 0, t);
        ctx.fillStyle = '#c62828'; ctx.beginPath(); ctx.moveTo(-2, -4); ctx.lineTo(2, -4); ctx.lineTo(3, 4); ctx.lineTo(0, 7); ctx.lineTo(-3, 4); ctx.fill();
        ctx.fillStyle = '#fff'; for (var k = 0; k < 3; k++) { ctx.save(); ctx.rotate(-0.3 + k * 0.3); ctx.fillRect(-6, -34 - k * 2, 12, 8); ctx.restore(); }
        break;
      case 'bossBeer':
        ctx.translate(x, y + 12); ctx.lineWidth = 2; ctx.strokeStyle = '#3e2723';
        ctx.fillStyle = '#ffb300'; rr(ctx, -24, -56, 44, 56, 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillRect(-18, -50, 6, 44);
        ctx.strokeStyle = '#3e2723'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(22, -30, 12, -1.3, 1.3); ctx.stroke(); ctx.strokeStyle = '#ffe082'; ctx.lineWidth = 4; ctx.stroke();
        ctx.fillStyle = '#fff'; for (k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(-20 + k * 8, -58 + Math.sin(t * 0.1 + k) * 2, 8, 0, 7); ctx.fill(); }
        ctx.save(); ctx.scale(1.8, 1.8); eyes(ctx, 0, -18); ctx.restore();
        ctx.fillStyle = '#3e2723'; ctx.beginPath(); ctx.arc(0, -16, 7, 0, Math.PI); ctx.fill();
        break;
    }
    ctx.restore();
    if (e.alive && !e.boss && e.hp < e.maxHp) { ctx.fillStyle = '#0006'; ctx.fillRect(x - 14, y - 34, 28, 4); ctx.fillStyle = '#ff5252'; ctx.fillRect(x - 14, y - 34, 28 * e.hp / e.maxHp, 4); }
  }
  function eyes(ctx, x, y) {
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x - 4, y, 3.6, 0, 7); ctx.arc(x + 4, y, 3.6, 0, 7); ctx.fill();
    ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(x - 4, y + 0.5, 1.8, 0, 7); ctx.arc(x + 4, y + 0.5, 1.8, 0, 7); ctx.fill();
    ctx.strokeStyle = '#222'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x - 8, y - 6); ctx.lineTo(x - 2, y - 3.5); ctx.moveTo(x + 8, y - 6); ctx.lineTo(x + 2, y - 3.5); ctx.stroke();
  }

  function proj(ctx, q, cx, cy, t) {
    var x = q.x - cx, y = q.y - cy;
    ctx.save(); ctx.translate(x, y);
    if (q.kind === 'paper') { ctx.rotate(t * 0.3); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#90a4ae'; ctx.fillRect(-6, -8, 12, 16); ctx.strokeRect(-6, -8, 12, 16); }
    else if (q.kind === 'coffee') { ctx.fillStyle = '#6d4c41'; ctx.beginPath(); ctx.arc(0, 0, 6, 0, 7); ctx.fill(); ctx.fillStyle = '#a1887f'; ctx.beginPath(); ctx.arc(-2, -2, 2, 0, 7); ctx.fill(); }
    else if (q.kind === 'foam') { ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.strokeStyle = '#ffb300'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 9, 0, 7); ctx.fill(); ctx.stroke(); }
    else if (q.kind === 'wave') { ctx.rotate(Math.atan2(q.vy, q.vx)); ctx.strokeStyle = '#ff4081'; ctx.lineWidth = 3; for (var k = 0; k < 3; k++) { ctx.globalAlpha = 1 - k * 0.3; ctx.beginPath(); ctx.arc(-k * 7, 0, 8 + k * 2, -1, 1); ctx.stroke(); } }
    ctx.restore();
  }

  function chest(ctx, c, open, cx, cy) {
    var x = c.x - cx, y = c.y - cy;
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(x, y + 12, 15, 5, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#8d6e63'; rr(ctx, x - 14, y - 6, 28, 18, 3); ctx.fill(); ctx.strokeStyle = '#4e342e'; ctx.lineWidth = 1.5; ctx.stroke();
    if (open) { ctx.fillStyle = '#5d4037'; rr(ctx, x - 14, y - 16, 28, 10, 3); ctx.fill(); }
    else { ctx.fillStyle = '#a1887f'; rr(ctx, x - 14, y - 12, 28, 10, 4); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ffd54f'; ctx.fillRect(x - 3, y - 6, 6, 7); }
  }
  function savePoint(ctx, s, cx, cy, t) {
    var x = s[0] * T + 16 - cx, y = s[1] * T + 16 - cy;
    ctx.fillStyle = 'rgba(255,235,59,' + (0.25 + Math.sin(t * 0.06) * 0.1) + ')'; ctx.beginPath(); ctx.ellipse(x, y + 8, 18, 7, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#8d6e63'; ctx.fillRect(x - 2, y - 4, 4, 14);
    ctx.fillStyle = '#ffd54f'; rr(ctx, x - 12, y - 26, 24, 22, 3); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(x - 9, y - 23, 18, 16);
    D.heart(ctx, x, y - 15, 5, '#ff4d6d');
  }

  function bubble(ctx, x, y, txt, color) {
    ctx.fillStyle = color || '#ffeb3b'; ctx.strokeStyle = '#e65100'; ctx.lineWidth = 2;
    rr(ctx, x - 9, y - 22, 18, 20, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#e65100'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y - 12);
  }

  function arrow(ctx, tx, ty, cx, cy, vw, vh, t) {
    var x = tx - cx, y = ty - cy, b = Math.sin(t * 0.15) * 4;
    ctx.save(); ctx.fillStyle = '#ffeb3b'; ctx.strokeStyle = '#e65100'; ctx.lineWidth = 2;
    if (x < 10 || x > vw - 10 || y < 10 || y > vh - 10) {
      var mx = vw / 2, my = vh / 2, ang = Math.atan2(y - my, x - mx);
      var ex = Math.max(28, Math.min(vw - 28, mx + Math.cos(ang) * 1000)), ey = Math.max(70, Math.min(vh - 70, my + Math.sin(ang) * 1000));
      var k = Math.min((vw / 2 - 28) / Math.abs(Math.cos(ang) || 1e-6), (vh / 2 - 70) / Math.abs(Math.sin(ang) || 1e-6));
      ex = mx + Math.cos(ang) * k; ey = my + Math.sin(ang) * k;
      ctx.translate(ex + Math.cos(ang) * b, ey + Math.sin(ang) * b); ctx.rotate(ang);
      ctx.beginPath(); ctx.moveTo(16, 0); ctx.lineTo(-6, -12); ctx.lineTo(-6, 12); ctx.closePath(); ctx.fill(); ctx.stroke();
    } else { ctx.translate(x, y - 44 + b); ctx.beginPath(); ctx.moveTo(0, 12); ctx.lineTo(-10, -4); ctx.lineTo(10, -4); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    ctx.restore();
  }

  function world(ctx, W, cx, cy, vw, vh, t, looks, opts) {
    tiles(ctx, W, cx, cy, vw, vh, t);
    (W.area.saves || []).forEach(function (s) { savePoint(ctx, s, cx, cy, t); });
    var R = G.RPG, p = W.p, it = R.interactable(W), tgt = R.target(W), q = W.quest && W.data.quests[W.quest];
    G.__px = p.x;
    var list = [];
    W.chests.forEach(function (c) { list.push({ y: c.y, f: function () { chest(ctx, c, W.flags['chest_' + c.def.id], cx, cy); } }); });
    W.npcs.forEach(function (n) {
      if (n.def.hideIf && W.flags[n.def.hideIf]) return;
      if (n.def.look === 'none') return;
      list.push({ y: n.y, f: function () {
        var face = p.x > n.x ? 1 : -1;
        drawChar(ctx, n.def.look, n.x - cx, n.y - cy + 12, { s: 1, facing: face, time: t + n.x, state: 'idle', bride: n.def.look === 'yen' && looks.yen === 'bride' });
        var isQuest = q && q.area === W.areaId && q.npc === n.id;
        if (isQuest) bubble(ctx, n.x - cx, n.y - cy - 36, '!');
        ctx.font = 'bold 11px ' + FONT; ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0008'; ctx.lineWidth = 3;
        ctx.strokeText(n.def.name, n.x - cx, n.y - cy + 26); ctx.fillText(n.def.name, n.x - cx, n.y - cy + 26);
      } });
    });
    W.enemies.forEach(function (e) { list.push({ y: e.y, f: function () { enemy(ctx, e, cx, cy, t); } }); });
    // 队友（跟在后面）
    if (W.party.length > 1) {
      var fm = W.party[(W.active + 1) % W.party.length], tr = W.trail[0] || { x: p.x - 20, y: p.y };
      if (W.trail.length < 16) tr = { x: p.x - p.fx * 26, y: p.y - p.fy * 26 };
      list.push({ y: tr.y, f: function () {
        ctx.globalAlpha = fm.hp > 0 ? 1 : 0.4;
        drawChar(ctx, fm.id, tr.x - cx, tr.y - cy + 12, { s: 1, facing: p.x > tr.x ? 1 : -1, t: p.anim, time: t + 40, state: p.moving ? 'run' : 'idle', bride: fm.id === 'yen' && looks.yen === 'bride', hurt: fm.hp <= 0 });
        ctx.globalAlpha = 1;
      } });
    }
    list.push({ y: p.y, f: function () {
      var id = R.member(W).id, x = p.x - cx, y = p.y - cy;
      if (p.shield > 0) { ctx.fillStyle = 'rgba(129,212,250,' + (0.25 + Math.sin(t * 0.3) * 0.08) + ')'; ctx.strokeStyle = '#4fc3f7'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y - 10, 30, 0, 7); ctx.fill(); ctx.stroke(); }
      if (p.spin > 0) { ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y - 6, 70, t * 0.5, t * 0.5 + 4.5); ctx.stroke(); ctx.strokeStyle = 'rgba(255,213,79,0.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y - 6, 55, t * 0.5 + 2, t * 0.5 + 6); ctx.stroke(); }
      if (!(p.inv > 0 && Math.floor(p.inv / 4) % 2) || p.shield > 0) {
        if (p.dodgeT > 0) { ctx.globalAlpha = 0.4; drawChar(ctx, id, x - p.ddx * 14, y + 12 - p.ddy * 14, { s: 1, facing: p.fx < 0 ? -1 : 1, state: 'run', t: p.anim }); ctx.globalAlpha = 1; }
        drawChar(ctx, id, x, y + 12, { s: 1, facing: p.fx < -0.1 ? -1 : (p.fx > 0.1 ? 1 : (p.lastF || 1)), t: p.anim, time: t, state: p.moving ? 'run' : 'idle', back: p.fy < -0.7, bride: id === 'yen' && looks.yen === 'bride', mask: id === 'yen' && p.shield > 0 });
        if (p.fx > 0.1) p.lastF = 1; else if (p.fx < -0.1) p.lastF = -1;
      }
      if (p.swing > 0 && id === 'tat') { // 扫把
        var a = Math.atan2(p.fy, p.fx), sw = (14 - p.swing) / 14;
        ctx.save(); ctx.translate(x, y - 8); ctx.rotate(a - 1.1 + sw * 2.2);
        ctx.strokeStyle = 'rgba(255,255,255,' + (0.7 - sw * 0.5) + ')'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, 0, 40, -0.9, 0.1); ctx.stroke();
        ctx.fillStyle = '#8d6e63'; ctx.fillRect(10, -2, 30, 4); ctx.fillStyle = '#ffca28'; ctx.beginPath(); ctx.moveTo(40, -9); ctx.lineTo(52, -12); ctx.lineTo(52, 12); ctx.lineTo(40, 9); ctx.closePath(); ctx.fill();
        ctx.restore();
      }
    } });
    list.sort(function (a, b) { return a.y - b.y; }).forEach(function (o) { o.f(); });
    W.projs.forEach(function (q2) { proj(ctx, q2, cx, cy, t); });
    if (it) bubble(ctx, (it.o.x) - cx, it.o.y - cy - (it.kind === 'npc' ? 52 : 22), it.kind === 'npc' ? '…' : '!', '#ffffff');
    // 夜晚
    if (W.area.night) {
      ctx.fillStyle = 'rgba(10,20,60,0.32)'; ctx.fillRect(0, 0, vw, vh);
      for (var ty = 0; ty < W.mh; ty++) for (var tx = 0; tx < W.mw; tx++) if (W.tiles[ty][tx] === 'l') {
        var lx = tx * T + 16 - cx, ly = ty * T - cy - 16; if (lx < -120 || lx > vw + 120 || ly < -120 || ly > vh + 120) continue;
        var g = ctx.createRadialGradient(lx, ly + 30, 4, lx, ly + 30, 110); g.addColorStop(0, 'rgba(255,241,118,0.35)'); g.addColorStop(1, 'rgba(255,241,118,0)'); ctx.fillStyle = g; ctx.fillRect(lx - 110, ly - 80, 220, 220);
      }
    }
    if (tgt && opts.arrow) arrow(ctx, tgt.x, tgt.y, cx, cy, vw, vh, t);
  }

  G.RPGDraw = { world: world };
})(window);
