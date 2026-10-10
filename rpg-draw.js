/* 俯视角 RPG 绘制：地图、人物、敌人、特效（全部代码绘制） */
(function (G) {
  'use strict';
  var T = 32, rr = G.roundRect, D = G.Draw, CS = 1.3; // CS = 人物放大倍数
  var FONT = '"PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif';
  function h(x, y) { var n = Math.sin(x * 127.1 + y * 311.7) * 43758.5; return n - Math.floor(n); }
  var WALLISH = { '#': 1, 'h': 1 };

  // 每个场景的颜色
  var THEME = {
    office:   { f: { ',': '#8ea7c4', '.': '#e9ecef' }, wallTop: '#e3e8ec', wallFront: '#9fb0bd', table: '#bcaaa4' },
    street:   { f: { 'g': '#3f7a43', 's': '#9ea4a8', 'r': '#3a3f44', '.': '#9ea4a8' }, wallTop: '#6a5a8c', wallFront: '#4a3d66' },
    hall:     { f: { '.': '#fdf3e7' }, wallTop: '#f8d3e1', wallFront: '#e5a5bf', table: '#6d4c41' },
    beach:    { f: { 's': '#f5dc9a', 'd': '#d9b47a', '.': '#f5dc9a' }, wallTop: '#c8a165', wallFront: '#a1683a', table: '#a1683a' },
    temple:   { f: { 'g': '#5d9b4f', '.': '#c9bfae', 'd': '#b9a58a' }, wallTop: '#8d8070', wallFront: '#5d5348' },
    home:     { f: { '.': '#e8d5b7', 'W': '#cfe8f0' }, wallTop: '#fff3e0', wallFront: '#d7b98f', table: '#a1887f' },
    mart:     { f: { '.': '#eef1f2' }, wallTop: '#e0f2f1', wallFront: '#80cbc4', table: '#90a4ae' },
    park:     { f: { 'g': '#66b552', 'd': '#d7c49a' }, wallTop: '#a1887f', wallFront: '#795548', table: '#8d6e63' },
    mountain: { f: { 'n': '#a9c9b0', 'r': '#5a6066' }, wallTop: '#b0bec5', wallFront: '#78909c' },
    mall:     { f: { '.': '#f3e5ab' }, wallTop: '#ffe0b2', wallFront: '#d7a86e', table: '#8d6e63' },
    farm:     { f: { 'q': '#4f9a3c', 'j': '#6b4f35', 'd': '#cdb58c' }, wallTop: '#e3f2fd', wallFront: '#90caf9' },
    zoo:      { f: { 'g': '#5fae4e', 'd': '#d8c08e' }, wallTop: '#a1887f', wallFront: '#795548' },
    hotel:    { f: { '.': '#8c3f4a' }, wallTop: '#5d4037', wallFront: '#3e2723', table: '#6d4c41' },
    market:   { f: { 'r': '#3b3540', 's': '#7e6f7a' }, wallTop: '#4a2f6b', wallFront: '#2c1b47' }
  };

  function floorTile(ctx, c, x, y, th, tx, ty) {
    var col = th.f[c] || th.f['.'] || th.f['g'] || '#ccc';
    ctx.fillStyle = col; ctx.fillRect(x, y, T, T);
    switch (c) {
      case ',': if ((tx + ty) % 2) { ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fillRect(x, y, T, T); } break;
      case '.': ctx.strokeStyle = 'rgba(0,0,0,0.06)'; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, T - 1, T - 1); break;
      case 'g': case 'n': if ((tx + ty) % 2) { ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(x, y, T, T); } if (h(tx, ty) > 0.72) { ctx.fillStyle = c === 'n' ? '#ffffffaa' : 'rgba(255,255,255,0.18)'; ctx.fillRect(x + 8, y + 12, 2, 6); ctx.fillRect(x + 12, y + 10, 2, 8); } break;
      case 'r': if (ty % 3 === 1 && tx % 3 === 0) { ctx.fillStyle = '#fdd835'; ctx.fillRect(x + 4, y + 14, 20, 4); } break;
      case 's': case 'd': if (h(tx, ty) > 0.8) { ctx.fillStyle = 'rgba(0,0,0,0.08)'; ctx.beginPath(); ctx.arc(x + 10, y + 12, 2, 0, 7); ctx.arc(x + 22, y + 22, 1.5, 0, 7); ctx.fill(); } break;
      case 'q': ctx.fillStyle = '#3d7f2e'; ctx.beginPath(); ctx.ellipse(x + 16, y + 16, 15, 9, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#6cbf4f'; ctx.beginPath(); ctx.ellipse(x + 14, y + 13, 9, 5, 0, 0, 7); ctx.fill(); break;
      case 'j': ctx.fillStyle = '#4caf50'; ctx.beginPath(); ctx.arc(x + 9, y + 10, 6, 0, 7); ctx.arc(x + 23, y + 22, 6, 0, 7); ctx.fill(); ctx.fillStyle = '#e53935'; ctx.beginPath(); ctx.arc(x + 12, y + 13, 3, 0, 7); ctx.arc(x + 20, y + 20, 3, 0, 7); ctx.fill(); break;
      case 'W': ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.strokeRect(x + 0.5, y + 0.5, 15, 15); ctx.strokeRect(x + 16.5, y + 16.5, 15, 15); break;
      case '=': ctx.fillStyle = '#c62828'; ctx.fillRect(x, y, T, T); ctx.fillStyle = '#ffd54f'; if (tx === 16) ctx.fillRect(x, y, 3, T); else ctx.fillRect(x + T - 3, y, 3, T); break;
      case 'A': ctx.fillStyle = '#f8bbd0'; ctx.fillRect(x, y, T, T); ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(x, y + (tx % 2) * 16, T, 2); break;
      case 'x': ctx.fillStyle = '#6d4c41'; ctx.fillRect(x, y, T, T); ctx.fillStyle = '#ffd54f'; ctx.fillRect(x + 6, y + 13, 20, 6); break;
    }
  }
  var FLOORS = ',.grs=Axdnq jW';
  function baseFloor(W, tx, ty) {
    // 障碍物下面画什么地板：看旁边
    var A = W.tiles, cand = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (var i = 0; i < 4; i++) { var r = A[ty + cand[i][1]]; var c = r && r[tx + cand[i][0]]; if (c && FLOORS.indexOf(c) >= 0 && c !== ' ' && c !== 'x') return c; }
    return '.';
  }

  function objTile(ctx, c, x, y, th, tx, ty, W, t) {
    if (c !== '#' && c !== 'h' && c !== 'w') floorTile(ctx, baseFloor(W, tx, ty), x, y, th, tx, ty);
    var k;
    switch (c) {
      case '#': case 'h':
        var below = W.tiles[ty + 1] && W.tiles[ty + 1][tx], front = !(below && WALLISH[below]);
        if (c === 'h' && W.areaId === 'street' && tx >= 28) {
          ctx.fillStyle = '#7b1fa2'; ctx.fillRect(x, y, T, T); ctx.fillStyle = '#9c27b0'; ctx.fillRect(x, y, T, 6);
          if (ty === 3 || ty === 6) { ctx.fillStyle = (Math.floor(t / 20) + tx) % 2 ? '#ffeb3b' : '#ff9800'; for (k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(x + 4 + k * 8, y + 16, 2.5, 0, 7); ctx.fill(); } }
          break;
        }
        ctx.fillStyle = th.wallTop; ctx.fillRect(x, y, T, T);
        if (front) { ctx.fillStyle = th.wallFront; ctx.fillRect(x, y + T * 0.45, T, T * 0.55); }
        if (c === 'h' && front && tx % 3 === 1) { ctx.fillStyle = h(tx, ty) > 0.4 ? '#ffe082' : '#455a64'; ctx.fillRect(x + 8, y + 2, 16, 10); }
        if (c === 'h' && !front && (tx + ty) % 3 === 0) { ctx.fillStyle = h(tx, ty) > 0.5 ? '#ffe08299' : '#37474f55'; ctx.fillRect(x + 9, y + 9, 14, 14); }
        if (W.area.theme === 'temple' && c === 'h' && (tx + ty) % 4 === 0) { ctx.fillStyle = '#4e4339'; ctx.fillRect(x + 4, y + 4, 24, 3); }
        break;
      case 'D': ctx.fillStyle = '#a1887f'; rr(ctx, x + 1, y + 6, T - 2, 20, 3); ctx.fill(); ctx.fillStyle = '#795548'; ctx.fillRect(x + 1, y + 22, T - 2, 4);
        ctx.fillStyle = '#263238'; rr(ctx, x + 8, y - 2, 16, 12, 2); ctx.fill(); ctx.fillStyle = (Math.floor(t / 40) + tx) % 3 ? '#4fc3f7' : '#81d4fa'; ctx.fillRect(x + 10, y, 12, 8); break;
      case 'V': ctx.fillStyle = '#e53935'; rr(ctx, x + 3, y - 10, 26, 40, 4); ctx.fill(); ctx.fillStyle = '#b3e5fc'; ctx.fillRect(x + 6, y - 6, 20, 18);
        ['#ffeb3b', '#8bc34a', '#ff7043'].forEach(function (cc, i) { ctx.fillStyle = cc; ctx.fillRect(x + 8 + i * 6, y - 4, 4, 6); ctx.fillRect(x + 8 + i * 6, y + 4, 4, 6); }); break;
      case 'K': ctx.fillStyle = '#607d8b'; rr(ctx, x + 4, y - 2, 24, 30, 4); ctx.fill(); ctx.fillStyle = '#263238'; ctx.fillRect(x + 8, y + 2, 16, 10); ctx.fillStyle = '#69f0ae'; ctx.fillRect(x + 10, y + 4, 12, 6); break;
      case 'T': ctx.fillStyle = th.table || '#bcaaa4'; rr(ctx, x, y + 2, T, T - 4, 3); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.fillRect(x + 2, y + 4, T - 4, 4); break;
      case 'p': ctx.fillStyle = '#8d6e63'; rr(ctx, x + 9, y + 16, 14, 14, 3); ctx.fill(); ctx.fillStyle = '#43a047'; ctx.beginPath(); ctx.arc(x + 16, y + 10, 10, 0, 7); ctx.arc(x + 9, y + 14, 6, 0, 7); ctx.arc(x + 23, y + 14, 6, 0, 7); ctx.fill(); break;
      case 't': ctx.fillStyle = '#5d4037'; ctx.fillRect(x + 13, y + 18, 6, 12); ctx.fillStyle = W.area.theme === 'mountain' ? '#2e5d4a' : '#1b5e20';
        if (W.area.theme === 'mountain') { ctx.beginPath(); ctx.moveTo(x + 16, y - 10); ctx.lineTo(x + 30, y + 22); ctx.lineTo(x + 2, y + 22); ctx.fill(); ctx.fillStyle = '#fff9'; ctx.beginPath(); ctx.moveTo(x + 16, y - 10); ctx.lineTo(x + 21, y + 1); ctx.lineTo(x + 11, y + 1); ctx.fill(); }
        else { ctx.beginPath(); ctx.arc(x + 16, y + 10, 14, 0, 7); ctx.fill(); ctx.fillStyle = '#2e7d32'; ctx.beginPath(); ctx.arc(x + 12, y + 6, 7, 0, 7); ctx.fill(); }
        break;
      case 'y': ctx.strokeStyle = '#8d6e63'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + 14, y + 30); ctx.quadraticCurveTo(x + 20, y + 14, x + 16, y - 2); ctx.stroke();
        ctx.fillStyle = '#2e7d32'; for (k = 0; k < 5; k++) { ctx.save(); ctx.translate(x + 16, y - 2); ctx.rotate(-2.6 + k * 1.1); ctx.beginPath(); ctx.ellipse(13, 0, 14, 4.5, 0, 0, 7); ctx.fill(); ctx.restore(); }
        ctx.fillStyle = '#6d4c41'; ctx.beginPath(); ctx.arc(x + 14, y + 2, 3, 0, 7); ctx.arc(x + 19, y + 3, 3, 0, 7); ctx.fill(); break;
      case 'w': ctx.fillStyle = W.area.theme === 'beach' || W.area.theme === 'temple' ? '#29a3d9' : '#2f6fa8'; ctx.fillRect(x, y, T, T);
        ctx.strokeStyle = 'rgba(255,255,255,0.45)'; ctx.lineWidth = 1.5; ctx.beginPath(); var o = (t * 0.5 + tx * 9) % 32; ctx.moveTo(x + o - 8, y + 12); ctx.lineTo(x + o, y + 12); ctx.moveTo(x + 32 - o, y + 24); ctx.lineTo(x + 40 - o, y + 24); ctx.stroke(); break;
      case 'B':
        if (W.area.theme === 'hall') { ctx.fillStyle = '#8d6e63'; ctx.fillRect(x, y + 4, T, 20); ctx.fillStyle = '#6d4c41'; ctx.fillRect(x, y + 4, T, 6); if (tx === 10 || tx === 23) { ctx.fillStyle = '#f8bbd0'; ctx.beginPath(); ctx.arc(x + 16, y + 8, 5, 0, 7); ctx.fill(); } }
        else if (W.area.theme === 'beach') { ctx.fillStyle = '#ff7043'; rr(ctx, x + 3, y + 4, 26, 22, 4); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(x + 3, y + 10, 26, 4); ctx.fillRect(x + 3, y + 18, 26, 4); }
        else { ctx.fillStyle = '#8d6e63'; ctx.fillRect(x + 2, y + 10, 28, 8); ctx.fillRect(x + 4, y + 18, 3, 8); ctx.fillRect(x + 25, y + 18, 3, 8); }
        break;
      case 'l': ctx.fillStyle = '#37474f'; ctx.fillRect(x + 14, y - 14, 4, 40); ctx.fillStyle = W.area.theme === 'market' ? '#ff5252' : '#fff59d'; ctx.beginPath(); ctx.arc(x + 16, y - 16, 6, 0, 7); ctx.fill(); break;
      case 'f': ['#f06292', '#fff176', '#ba68c8', '#ffffff'].forEach(function (cc, i) { ctx.fillStyle = cc; ctx.beginPath(); ctx.arc(x + 8 + (i % 2) * 14, y + 10 + Math.floor(i / 2) * 12, 5, 0, 7); ctx.fill(); }); ctx.fillStyle = '#66bb6a'; ctx.fillRect(x + 14, y + 20, 4, 10); break;
      case 'P': ctx.fillStyle = '#fafafa'; ctx.fillRect(x + 6, y - 14, 20, 44); ctx.fillStyle = '#e0e0e0'; ctx.fillRect(x + 4, y - 16, 24, 6); ctx.fillRect(x + 4, y + 24, 24, 6); break;
      case 'O': ctx.fillStyle = '#9e9e9e'; rr(ctx, x + 6, y + 14, 20, 16, 3); ctx.fill(); ctx.fillStyle = '#bdbdbd'; ctx.beginPath(); ctx.arc(x + 16, y + 6, 9, 0, 7); ctx.fill(); ctx.fillRect(x + 10, y + 10, 12, 8); ctx.fillStyle = '#ff7043'; ctx.fillRect(x + 8, y + 18, 16, 3); break;
      case 'L': var open = W.area.doors && W.flags[W.area.doors.L];
        if (!open) { ctx.fillStyle = '#8d6e63'; ctx.fillRect(x + 2, y, T - 4, T); ctx.fillStyle = '#ffd54f'; ctx.beginPath(); ctx.arc(x + 16, y + 16, 4, 0, 7); ctx.fill(); ctx.fillRect(x + 14, y + 16, 4, 7); }
        else { ctx.fillStyle = '#d7ccc8'; ctx.fillRect(x, y, 4, T); ctx.fillRect(x + T - 4, y, 4, T); }
        break;
      case 'M': ctx.fillStyle = '#b0bec5'; rr(ctx, x + 4, y - 10, 24, 38, 10); ctx.fill(); ctx.fillStyle = '#e1f5fe'; rr(ctx, x + 7, y - 7, 18, 32, 8); ctx.fill(); break;
      case 'b': ctx.fillStyle = '#8d6e63'; ctx.fillRect(x, y, T, T); ctx.fillStyle = W.area.theme === 'hotel' ? '#eceff1' : '#bbdefb'; ctx.fillRect(x + 2, y + 2, T - 4, T - 4);
        if (W.tiles[ty - 1] && W.tiles[ty - 1][tx] !== 'b') { ctx.fillStyle = '#fff'; rr(ctx, x + 5, y + 4, 22, 9, 4); ctx.fill(); } break;
      case 'u': ctx.fillStyle = '#e57373'; rr(ctx, x, y + 2, T, 26, 5); ctx.fill(); ctx.fillStyle = '#ef9a9a'; rr(ctx, x + 3, y + 10, T - 6, 14, 4); ctx.fill(); break;
      case 'k': ctx.fillStyle = '#eceff1'; ctx.fillRect(x, y, T, T); ctx.fillStyle = '#90a4ae'; ctx.fillRect(x, y + 20, T, 12); if (tx % 3 === 0) { ctx.fillStyle = '#424242'; ctx.beginPath(); ctx.arc(x + 16, y + 10, 7, 0, 7); ctx.fill(); } break;
      case 'v': ctx.fillStyle = '#5d4037'; ctx.fillRect(x, y + 14, T, 14); ctx.fillStyle = '#212121'; rr(ctx, x + 1, y - 6, T - 2, 20, 2); ctx.fill(); ctx.fillStyle = (Math.floor(t / 30) % 2) ? '#4fc3f7' : '#81c784'; ctx.fillRect(x + 4, y - 3, T - 8, 14); break;
      case 'c': ctx.fillStyle = '#fff3e0'; ctx.fillRect(x + 1, y + 2, T - 2, T - 4); ctx.strokeStyle = '#ffb74d'; ctx.lineWidth = 2; ctx.strokeRect(x + 1, y + 2, T - 2, T - 4); for (k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x + k * 8, y + 2); ctx.lineTo(x + k * 8, y + T - 2); ctx.stroke(); } break;
      case 'S': ctx.fillStyle = '#b0bec5'; ctx.fillRect(x, y - 6, T, T + 4); ['#e53935', '#fdd835', '#43a047', '#1e88e5', '#ff7043'].forEach(function (cc, i) { ctx.fillStyle = cc; ctx.fillRect(x + 2 + (i * 6) % 28, y - 3 + (i % 2) * 12, 5, 9); }); ctx.fillStyle = '#78909c'; ctx.fillRect(x, y + 7, T, 2); break;
      case 'C': var cols = ['#e53935', '#fbc02d', '#43a047', '#1e88e5'], cc2 = cols[(tx + ty) % 4];
        ctx.fillStyle = '#795548'; ctx.fillRect(x + 1, y + 10, T - 2, 20); ctx.fillStyle = cc2; ctx.fillRect(x - 1, y - 8, T + 2, 12);
        ctx.fillStyle = '#fff'; for (k = 0; k < 4; k++) ctx.fillRect(x + k * 8, y - 8, 4, 12);
        if (W.area.night) { ctx.fillStyle = 'rgba(255,235,59,0.25)'; ctx.beginPath(); ctx.arc(x + 16, y + 14, 22, 0, 7); ctx.fill(); }
        ctx.fillStyle = '#ffcc80'; ctx.beginPath(); ctx.arc(x + 10, y + 16, 4, 0, 7); ctx.arc(x + 22, y + 16, 4, 0, 7); ctx.fill(); break;
      case 'F': ctx.fillStyle = '#8d6e63'; ctx.fillRect(x, y + 10, T, 4); ctx.fillRect(x, y + 20, T, 4); ctx.fillRect(x + 2, y + 4, 4, 24); ctx.fillRect(x + 26, y + 4, 4, 24); break;
    }
  }

  function tiles(ctx, W, cx, cy, vw, vh, t) {
    var th = THEME[W.area.theme] || THEME.office;
    var x0 = Math.max(0, Math.floor(cx / T)), x1 = Math.min(W.mw - 1, Math.ceil((cx + vw) / T));
    var y0 = Math.max(0, Math.floor(cy / T) - 1), y1 = Math.min(W.mh - 1, Math.ceil((cy + vh) / T) + 1);
    var tx, ty, c;
    for (ty = y0; ty <= y1; ty++) for (tx = x0; tx <= x1; tx++) { c = W.tiles[ty][tx]; if (FLOORS.indexOf(c) >= 0) floorTile(ctx, c, tx * T - cx, ty * T - cy, th, tx, ty); }
    for (ty = y0; ty <= y1; ty++) for (tx = x0; tx <= x1; tx++) { c = W.tiles[ty][tx]; if (FLOORS.indexOf(c) < 0) objTile(ctx, c, tx * T - cx, ty * T - cy, th, tx, ty, W, t); }
    if (W.areaId === 'street') sign(ctx, 31 * T - cx, T - cy + 8, 6 * T, '电 影 院', t);
    if (W.areaId === 'genting') sign(ctx, 29 * T - cx, 2 * T - cy, 9 * T, '缆 车 站', t);
    if (W.areaId === 'cameron') sign(ctx, 28 * T - cx, 2 * T - cy, 9 * T, '温 室', t);
    if (W.areaId === 'hall') {
      var ax = 16 * T - cx + 16, ay = 1 * T - cy + 8;
      ctx.strokeStyle = '#f48fb1'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(ax, ay + 40, 70, Math.PI, 0); ctx.stroke();
      for (var k = 0; k < 9; k++) { var a = Math.PI + k * Math.PI / 8; D.heart(ctx, ax + Math.cos(a) * 70, ay + 40 + Math.sin(a) * 70, 7, k % 2 ? '#ff4081' : '#ffffff'); }
      ctx.fillStyle = '#c2185b'; ctx.font = 'bold 14px ' + FONT; ctx.textAlign = 'center'; ctx.fillText('Tat ♥ Yen', ax, ay + 30);
    }
    if (W.areaId === 'park') { ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 2; ctx.strokeRect(23 * T - cx, 3 * T - cy, 14 * T, 6 * T); ctx.beginPath(); ctx.arc(30 * T - cx, 6 * T - cy, 30, 0, 7); ctx.moveTo(30 * T - cx, 3 * T - cy); ctx.lineTo(30 * T - cx, 9 * T - cy); ctx.stroke(); }
  }
  function sign(ctx, x, y, w, txt, t) {
    ctx.fillStyle = '#212121'; rr(ctx, x, y, w, 30, 6); ctx.fill(); ctx.strokeStyle = (Math.floor(t / 15) % 2) ? '#ffeb3b' : '#ff4081'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 18px ' + FONT; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x + w / 2, y + 15);
  }

  // ---------- 敌人 ----------
  function eyes(ctx, x, y, s) {
    s = s || 1;
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x - 4 * s, y, 3.6 * s, 0, 7); ctx.arc(x + 4 * s, y, 3.6 * s, 0, 7); ctx.fill();
    ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(x - 4 * s, y + 0.5, 1.8 * s, 0, 7); ctx.arc(x + 4 * s, y + 0.5, 1.8 * s, 0, 7); ctx.fill();
    ctx.strokeStyle = '#222'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x - 8 * s, y - 6 * s); ctx.lineTo(x - 2 * s, y - 3.5 * s); ctx.moveTo(x + 8 * s, y - 6 * s); ctx.lineTo(x + 2 * s, y - 3.5 * s); ctx.stroke();
  }
  // 画一个敌人外形，(0,0) = 脚底
  function body(ctx, type, t, dir) {
    var fake = { x: -11, y: -22, w: 22, h: 22, vx: dir, alive: true, dead: 0 }, k;
    ctx.lineWidth = 1.5; ctx.strokeStyle = '#3e2723';
    switch (type) {
      case 'folder': case 'gift': case 'crab': case 'pawn': case 'price': case 'tuktuk': case 'phone': D.enemy(ctx, fake, type, 0, t); break;
      case 'germ': case 'mosquito': case 'virus': case 'bee': case 'wind':
        if (type === 'mosquito') { ctx.translate(0, -14); ctx.fillStyle = '#5d4037'; ctx.beginPath(); ctx.ellipse(0, 0, 7, 5, 0, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.7)'; var fl = Math.sin(t * 0.8) * 3; ctx.beginPath(); ctx.ellipse(-5, -6 - fl, 6, 3, -0.5, 0, 7); ctx.ellipse(5, -6 + fl, 6, 3, 0.5, 0, 7); ctx.fill(); ctx.strokeStyle = '#3e2723'; ctx.beginPath(); ctx.moveTo(6, 1); ctx.lineTo(13, 4); ctx.stroke(); eyes(ctx, 0, -1, 0.6); break; }
        if (type === 'wind') { ctx.translate(0, -14); ctx.strokeStyle = '#e1f5fe'; ctx.lineWidth = 4; for (k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(0, 0, 6 + k * 4, t * 0.1 + k, t * 0.1 + k + 4); ctx.stroke(); } eyes(ctx, 0, 0, 0.8); break; }
        D.flyer(ctx, { x: -11, y: -26, w: 22, h: 22, alive: true }, type === 'bee' ? 'bee' : 'germ', 0, t);
        if (type === 'virus') { ctx.fillStyle = 'rgba(229,57,53,0.45)'; ctx.beginPath(); ctx.arc(0, -15, 11, 0, 7); ctx.fill(); }
        break;
      case 'cup': ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-10, -24); ctx.lineTo(10, -24); ctx.lineTo(8, 0); ctx.lineTo(-8, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#6d4c41'; ctx.fillRect(-9, -24, 18, 5); ctx.beginPath(); ctx.arc(12, -14, 5, -1.4, 1.4); ctx.stroke(); eyes(ctx, 0, -13); break;
      case 'cutter': case 'drinker': case 'hoarder':
        D.friend(ctx, { x: -12, y: -34, w: 24, h: 34 }, 0, t, type === 'cutter' ? '插队！' : type === 'drinker' ? '干杯！' : '抢！');
        if (type === 'hoarder') { ctx.strokeStyle = '#90a4ae'; ctx.lineWidth = 2; ctx.strokeRect(10, -18, 14, 12); ctx.beginPath(); ctx.arc(13, -4, 2, 0, 7); ctx.arc(21, -4, 2, 0, 7); ctx.stroke(); }
        break;
      case 'monkey': ctx.fillStyle = '#8d6e63'; ctx.beginPath(); ctx.ellipse(0, -9, 9, 9, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(0, -23, 9, 0, 7); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(-9, -24, 3.5, 0, 7); ctx.arc(9, -24, 3.5, 0, 7); ctx.fill(); ctx.fillStyle = '#ffccbc'; ctx.beginPath(); ctx.ellipse(0, -21, 6, 5, 0, 0, 7); ctx.fill();
        ctx.strokeStyle = '#6d4c41'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(8, -5); ctx.quadraticCurveTo(18, -6 + Math.sin(t * 0.2) * 4, 16, -16); ctx.stroke(); eyes(ctx, 0, -24, 0.7); break;
      case 'dust': ctx.fillStyle = '#9e9e9e'; for (k = 0; k < 9; k++) { var a = k * 0.7 + t * 0.05; ctx.beginPath(); ctx.arc(Math.cos(a) * 9, -11 + Math.sin(a) * 7, 6, 0, 7); ctx.fill(); } eyes(ctx, 0, -12, 0.8); break;
      case 'cry': ctx.fillStyle = '#81d4fa'; ctx.beginPath(); ctx.moveTo(0, -30); ctx.quadraticCurveTo(14, -12, 9, -3); ctx.quadraticCurveTo(0, 4, -9, -3); ctx.quadraticCurveTo(-14, -12, 0, -30); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(-4, -13, 2, 0, 7); ctx.arc(4, -13, 2, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(0, -6, 4, Math.PI, 0); ctx.fill(); break;
      case 'tv': ctx.fillStyle = '#263238'; rr(ctx, -14, -28, 28, 22, 3); ctx.fill(); ctx.stroke(); ctx.fillStyle = (Math.floor(t / 6) % 2) ? '#b0bec5' : '#eceff1'; ctx.fillRect(-11, -25, 22, 16);
        ctx.strokeStyle = '#263238'; ctx.beginPath(); ctx.moveTo(-6, -28); ctx.lineTo(-10, -36); ctx.moveTo(6, -28); ctx.lineTo(10, -36); ctx.stroke(); ctx.fillStyle = '#263238'; ctx.fillRect(-8, -6, 4, 6); ctx.fillRect(4, -6, 4, 6); eyes(ctx, 0, -18, 0.8); break;
      case 'ghost': ctx.globalAlpha *= 0.85; ctx.fillStyle = '#fafafa'; ctx.beginPath(); ctx.moveTo(-11, 0); ctx.lineTo(-11, -18); ctx.arc(0, -18, 11, Math.PI, 0); ctx.lineTo(11, 0);
        for (k = 0; k < 3; k++) ctx.quadraticCurveTo(7 - k * 7, -4 + Math.sin(t * 0.2 + k) * 2, 4 - k * 7, 0); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#222'; ctx.beginPath(); ctx.ellipse(-4, -18, 2, 3, 0, 0, 7); ctx.ellipse(4, -18, 2, 3, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, -11, 2.5, 3, 0, 0, 7); ctx.fill(); break;
      case 'gourd': ctx.translate(0, -14); D.item(ctx, 'gourdplain', 0, 0, t, 0); eyes(ctx, 0, -3, 0.8); break;
    }
  }
  var BOSSBODY = { monkeyKing: 'monkey', sleepless: 'cry', virusKing: 'virus', examKing: 'folder', priceKing: 'price', beeQueen: 'bee', gourdKing: 'gourd' };
  function enemy(ctx, e, cx, cy, t) {
    var x = e.x - cx, y = e.y - cy;
    ctx.save();
    if (!e.alive) ctx.globalAlpha = Math.max(0, e.dead / 30);
    else if (e.hit > 0 && e.hit % 4 < 2) ctx.globalAlpha = 0.55;
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(x, y + e.r * 0.7, e.r, e.r * 0.35, 0, 0, 7); ctx.fill();
    var z = e.z || 0, dir = G.__px > e.x ? 1 : -1;
    if (e.state === 'wind' && Math.floor(t / 4) % 2) { ctx.fillStyle = 'rgba(255,82,82,0.35)'; ctx.beginPath(); ctx.arc(x, y - 10, e.r + 12, 0, 7); ctx.fill(); }
    if (e.frozen > 0) { ctx.fillStyle = 'rgba(129,212,250,0.45)'; ctx.beginPath(); ctx.arc(x, y - 10, e.r + 8, 0, 7); ctx.fill(); }
    ctx.translate(x, y + 8 - z);
    if (e.type === 'bossOT') { ctx.scale(2.6, 2.6); body(ctx, 'folder', t, dir); ctx.fillStyle = '#c62828'; ctx.beginPath(); ctx.moveTo(-2, -4); ctx.lineTo(2, -4); ctx.lineTo(3, 4); ctx.lineTo(0, 7); ctx.lineTo(-3, 4); ctx.fill(); }
    else if (e.type === 'bossBeer') {
      ctx.lineWidth = 2; ctx.strokeStyle = '#3e2723'; ctx.fillStyle = '#ffb300'; rr(ctx, -24, -60, 44, 56, 8); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = '#3e2723'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(22, -34, 12, -1.3, 1.3); ctx.stroke();
      ctx.fillStyle = '#fff'; for (var k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(-20 + k * 8, -62 + Math.sin(t * 0.1 + k) * 2, 8, 0, 7); ctx.fill(); }
      ctx.save(); ctx.scale(1.8, 1.8); eyes(ctx, 0, -20); ctx.restore();
    } else if (BOSSBODY[e.type]) {
      ctx.save(); ctx.scale(2.5, 2.5); body(ctx, BOSSBODY[e.type], t, dir); ctx.restore();
      ctx.fillStyle = '#ffd23f'; ctx.strokeStyle = '#a66d00'; ctx.lineWidth = 2; ctx.beginPath(); // 皇冠
      ctx.moveTo(-14, -70); ctx.lineTo(-14, -82); ctx.lineTo(-7, -75); ctx.lineTo(0, -86); ctx.lineTo(7, -75); ctx.lineTo(14, -82); ctx.lineTo(14, -70); ctx.closePath(); ctx.fill(); ctx.stroke();
    } else { ctx.scale(1.25, 1.25); body(ctx, e.type, t, dir); }
    ctx.restore();
    if (e.alive && !e.boss && e.hp < e.maxHp) { ctx.fillStyle = '#0006'; ctx.fillRect(x - 15, y - 40, 30, 5); ctx.fillStyle = '#ff5252'; ctx.fillRect(x - 15, y - 40, 30 * e.hp / e.maxHp, 5); }
  }

  var PCOL = { tear: '#4fc3f7', static: '#b0bec5', banana: '#fdd835', star: '#ffeb3b', germ: '#9ccc65', coin: '#ffd23f', sting: '#ffb300', seed: '#7cb342', coffee: '#6d4c41' };
  function proj(ctx, q, cx, cy, t) {
    var x = q.x - cx, y = q.y - cy;
    ctx.save(); ctx.translate(x, y);
    switch (q.kind) {
      case 'paper': ctx.rotate(t * 0.3); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#90a4ae'; ctx.fillRect(-6, -8, 12, 16); ctx.strokeRect(-6, -8, 12, 16); break;
      case 'foam': ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.strokeStyle = '#ffb300'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 9, 0, 7); ctx.fill(); ctx.stroke(); break;
      case 'wave': ctx.rotate(Math.atan2(q.vy, q.vx)); ctx.strokeStyle = '#ff4081'; ctx.lineWidth = 3; for (var k = 0; k < 3; k++) { ctx.globalAlpha = 1 - k * 0.3; ctx.beginPath(); ctx.arc(-k * 7, 0, 9 + k * 2, -1, 1); ctx.stroke(); } break;
      case 'ball': ctx.rotate(t * 0.4); D.item(ctx, 'ball', 0, 0, t, 0); break;
      case 'ink': ctx.fillStyle = '#5e35b1'; ctx.beginPath(); ctx.arc(0, 0, 6, 0, 7); ctx.arc(4, 3, 3, 0, 7); ctx.fill(); break;
      case 'banana': ctx.rotate(t * 0.3); ctx.strokeStyle = '#fdd835'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, 7, 0.3, 2.6); ctx.stroke(); break;
      case 'star': ctx.rotate(t * 0.2); D.star(ctx, 0, 0, 8, '#ffeb3b', '#f57f17'); break;
      default: ctx.fillStyle = PCOL[q.kind] || '#fff'; ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(0, 0, q.r || 6, 0, 7); ctx.fill(); ctx.stroke();
    }
    ctx.restore();
  }

  function chest(ctx, c, open, cx, cy, t) {
    var x = c.x - cx, y = c.y - cy, look = c.def.look;
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(x, y + 12, 15, 5, 0, 0, 7); ctx.fill();
    if (!look) {
      ctx.fillStyle = '#8d6e63'; rr(ctx, x - 14, y - 6, 28, 18, 3); ctx.fill(); ctx.strokeStyle = '#4e342e'; ctx.lineWidth = 1.5; ctx.stroke();
      if (open) { ctx.fillStyle = '#5d4037'; rr(ctx, x - 14, y - 16, 28, 10, 3); ctx.fill(); }
      else { ctx.fillStyle = '#a1887f'; rr(ctx, x - 14, y - 12, 28, 10, 4); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ffd54f'; ctx.fillRect(x - 3, y - 6, 6, 7); }
      return;
    }
    if (look === 'tv' || look === 'phone') {
      if (look === 'tv') { ctx.fillStyle = '#263238'; rr(ctx, x - 16, y - 18, 32, 24, 3); ctx.fill(); ctx.fillStyle = open ? '#37474f' : ((Math.floor(t / 10) % 2) ? '#4fc3f7' : '#81c784'); ctx.fillRect(x - 13, y - 15, 26, 18); ctx.fillStyle = '#5d4037'; ctx.fillRect(x - 14, y + 6, 28, 6); }
      else { ctx.fillStyle = '#263238'; rr(ctx, x - 7, y - 12, 14, 22, 3); ctx.fill(); ctx.fillStyle = open ? '#37474f' : '#ba68c8'; ctx.fillRect(x - 5, y - 9, 10, 15); }
      if (!open) { ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.beginPath(); ctx.arc(x, y - 4, 22, 0, 7); ctx.fill(); }
      return;
    }
    // 小台子 + 物品
    ctx.fillStyle = '#d7ccc8'; rr(ctx, x - 13, y + 2, 26, 10, 3); ctx.fill(); ctx.strokeStyle = '#8d6e63'; ctx.lineWidth = 1.5; ctx.stroke();
    if (open) return;
    var b = Math.sin(t * 0.08) * 2;
    ctx.fillStyle = 'rgba(255,241,118,0.35)'; ctx.beginPath(); ctx.arc(x, y - 8 + b, 15, 0, 7); ctx.fill();
    if (look === 'camera') { ctx.fillStyle = '#37474f'; rr(ctx, x - 11, y - 16 + b, 22, 15, 4); ctx.fill(); ctx.fillStyle = '#90caf9'; ctx.beginPath(); ctx.arc(x, y - 8 + b, 5, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(x + 5, y - 15 + b, 4, 3); }
    else if (look === 'key') D.key(ctx, x, y - 8 + b, t);
    else D.item(ctx, look === 'berry' ? 'berry' : look, x, y - 8 + b, t, 0);
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
    rr(ctx, x - 10, y - 24, 20, 22, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#e65100'; ctx.font = 'bold 15px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y - 13);
  }
  function arrow(ctx, tx, ty, cx, cy, vw, vh, t) {
    var x = tx - cx, y = ty - cy, b = Math.sin(t * 0.15) * 4;
    ctx.save(); ctx.fillStyle = '#ffeb3b'; ctx.strokeStyle = '#e65100'; ctx.lineWidth = 2.5;
    if (x < 10 || x > vw - 10 || y < 10 || y > vh - 10) {
      var mx = vw / 2, my = vh / 2, ang = Math.atan2(y - my, x - mx);
      var k = Math.min((vw / 2 - 30) / Math.abs(Math.cos(ang) || 1e-6), (vh / 2 - 80) / Math.abs(Math.sin(ang) || 1e-6));
      ctx.translate(mx + Math.cos(ang) * (k + b), my + Math.sin(ang) * (k + b)); ctx.rotate(ang);
      ctx.beginPath(); ctx.moveTo(20, 0); ctx.lineTo(-8, -15); ctx.lineTo(-8, 15); ctx.closePath(); ctx.fill(); ctx.stroke();
    } else { ctx.translate(x, y - 64 + b); ctx.beginPath(); ctx.moveTo(0, 14); ctx.lineTo(-12, -5); ctx.lineTo(12, -5); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    ctx.restore();
  }

  function world(ctx, W, cx, cy, vw, vh, t, looks, opts) {
    tiles(ctx, W, cx, cy, vw, vh, t);
    (W.area.saves || []).forEach(function (s) { savePoint(ctx, s, cx, cy, t); });
    var R = G.RPG, p = W.p, it = R.interactable(W), tgt = R.target(W), q = W.quest && W.data.quests[W.quest];
    var masks = !!W.area.masks;
    G.__px = p.x;
    var list = [];
    W.chests.forEach(function (c) { list.push({ y: c.y, f: function () { chest(ctx, c, W.flags['chest_' + c.def.id], cx, cy, t); } }); });
    W.npcs.forEach(function (n) {
      if (!R.npcVisible(W, n) || n.def.look === 'none') return;
      list.push({ y: n.y, f: function () {
        var o = { s: CS * (n.def.small || 1), facing: p.x > n.x ? 1 : -1, time: t + n.x, state: 'idle', bride: n.def.look === 'yen' && looks.yen === 'bride', mask: masks };
        if (n.def.baby) { o.baby = true; o.s = CS * 0.6; }
        drawChar(ctx, n.def.look, n.x - cx, n.y - cy + 14, o);
        var isQuest = q && q.area === W.areaId && (q.npc === n.id || (q.npcs && q.npcs.some(function (pr) { return pr[0] === n.id && !W.flags[pr[1]]; })));
        if (isQuest) bubble(ctx, n.x - cx, n.y - cy - 54, '!');
        ctx.font = 'bold 13px ' + FONT; ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0009'; ctx.lineWidth = 3;
        ctx.strokeText(n.def.name, n.x - cx, n.y - cy + 30); ctx.fillText(n.def.name, n.x - cx, n.y - cy + 30);
      } });
    });
    W.enemies.forEach(function (e) { list.push({ y: e.y, f: function () { enemy(ctx, e, cx, cy, t); } }); });
    (W.helpers || []).forEach(function (hp) { list.push({ y: hp.y, f: function () {
      var x = hp.x - cx, y = hp.y - cy; ctx.globalAlpha = Math.min(1, hp.life / 40);
      ctx.save(); ctx.translate(x, y + 6); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#5e35b1'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(0, -18, 11, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-8, -8); ctx.lineTo(-10, 4); ctx.lineTo(10, 4); ctx.lineTo(8, -8); ctx.stroke();
      ctx.fillStyle = '#5e35b1'; ctx.beginPath(); ctx.arc(-4, -19, 1.8, 0, 7); ctx.arc(4, -19, 1.8, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(0, -15, 4, 0.2, Math.PI - 0.2); ctx.stroke();
      ctx.restore(); ctx.globalAlpha = 1;
    } }); });
    // 队友跟在后面
    var others = [];
    for (var i = 1; i < W.party.length; i++) others.push(W.party[(W.active + i) % W.party.length]);
    others.forEach(function (fm, k) {
      var idx = W.trail.length - 1 - (k + 1) * 11, tr = W.trail[idx];
      if (!tr) tr = { x: p.x - p.fx * 28 * (k + 1), y: p.y - p.fy * 28 * (k + 1) };
      list.push({ y: tr.y, f: function () {
        ctx.globalAlpha = fm.hp > 0 ? 1 : 0.4;
        drawChar(ctx, fm.id, tr.x - cx, tr.y - cy + 14, { s: CS, facing: p.x > tr.x ? 1 : -1, t: p.anim, time: t + 40 * k, state: p.moving ? 'run' : 'idle', bride: fm.id === 'yen' && looks.yen === 'bride', hurt: fm.hp <= 0, mask: masks });
        ctx.globalAlpha = 1;
      } });
    });
    list.push({ y: p.y, f: function () {
      var id = R.member(W).id, x = p.x - cx, y = p.y - cy;
      if (p.shield > 0) { ctx.fillStyle = 'rgba(255,128,171,' + (0.22 + Math.sin(t * 0.3) * 0.08) + ')'; ctx.strokeStyle = W.data.yenSkill === 'mask' ? '#4fc3f7' : '#ff80ab'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y - 16, 38, 0, 7); ctx.fill(); ctx.stroke(); if (W.data.yenSkill !== 'mask') D.heart(ctx, x, y - 64, 7, '#ff4081'); }
      if (p.spin > 0) { ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x, y - 10, 75, t * 0.5, t * 0.5 + 4.5); ctx.stroke(); ctx.strokeStyle = 'rgba(255,213,79,0.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y - 10, 58, t * 0.5 + 2, t * 0.5 + 6); ctx.stroke(); }
      if (!(p.inv > 0 && Math.floor(p.inv / 4) % 2) || p.shield > 0) {
        if (p.dodgeT > 0) { ctx.globalAlpha = 0.4; drawChar(ctx, id, x - p.ddx * 16, y + 14 - p.ddy * 16, { s: CS, facing: p.fx < 0 ? -1 : 1, state: 'run', t: p.anim }); ctx.globalAlpha = 1; }
        drawChar(ctx, id, x, y + 14, { s: CS, facing: p.fx < -0.1 ? -1 : (p.fx > 0.1 ? 1 : (p.lastF || 1)), t: p.anim, time: t, state: p.moving ? 'run' : 'idle', back: p.fy < -0.7, bride: id === 'yen' && looks.yen === 'bride', mask: masks || (id === 'yen' && p.shield > 0 && W.data.yenSkill === 'mask') });
        if (p.fx > 0.1) p.lastF = 1; else if (p.fx < -0.1) p.lastF = -1;
      }
      if (p.swing > 0 && id === 'tat') {
        var a = Math.atan2(p.fy, p.fx), sw = (14 - p.swing) / 14;
        ctx.save(); ctx.translate(x, y - 14); ctx.rotate(a - 1.1 + sw * 2.2);
        ctx.strokeStyle = 'rgba(255,255,255,' + (0.7 - sw * 0.5) + ')'; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(0, 0, 46, -0.9, 0.1); ctx.stroke();
        ctx.fillStyle = '#8d6e63'; ctx.fillRect(12, -2, 34, 5); ctx.fillStyle = '#ffca28'; ctx.beginPath(); ctx.moveTo(46, -10); ctx.lineTo(60, -14); ctx.lineTo(60, 14); ctx.lineTo(46, 10); ctx.closePath(); ctx.fill();
        ctx.restore();
      }
    } });
    list.sort(function (a, b) { return a.y - b.y; }).forEach(function (o) { o.f(); });
    W.projs.forEach(function (q2) { proj(ctx, q2, cx, cy, t); });
    if (it) bubble(ctx, it.o.x - cx, it.o.y - cy - (it.kind === 'npc' ? 72 : 26), it.kind === 'npc' ? '…' : '!', '#ffffff');
    if (W.area.night) {
      ctx.fillStyle = 'rgba(10,20,60,0.32)'; ctx.fillRect(0, 0, vw, vh);
      for (var ty = 0; ty < W.mh; ty++) for (var tx = 0; tx < W.mw; tx++) if (W.tiles[ty][tx] === 'l') {
        var lx = tx * T + 16 - cx, ly = ty * T - cy - 16; if (lx < -120 || lx > vw + 120 || ly < -120 || ly > vh + 120) continue;
        var g = ctx.createRadialGradient(lx, ly + 30, 4, lx, ly + 30, 110); g.addColorStop(0, 'rgba(255,241,118,0.35)'); g.addColorStop(1, 'rgba(255,241,118,0)'); ctx.fillStyle = g; ctx.fillRect(lx - 110, ly - 80, 220, 220);
      }
    }
    if (W.area.theme === 'mountain') { ctx.fillStyle = 'rgba(236,239,241,0.18)'; ctx.fillRect(0, 0, vw, vh); }
    if (tgt && opts.arrow) arrow(ctx, tgt.x, tgt.y, cx, cy, vw, vh, t);
  }

  G.RPGDraw = { world: world, CS: CS };
})(window);
