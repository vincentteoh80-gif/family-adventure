/* 场景绘制：背景、地面、物品、敌人、终点门（全部用代码画，不依赖外部图片） */
(function (G) {
  'use strict';
  var T = 32, rr = G.roundRect;
  function rnd(i) { var x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  function shade(hex, k) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    var f = function (c) { return Math.max(0, Math.min(255, Math.round(k > 0 ? c + (255 - c) * k : c * (1 + k)))); };
    return 'rgb(' + f(r) + ',' + f(g) + ',' + f(b) + ')';
  }

  // ---------- 背景 ----------
  function background(ctx, th, camX, vw, vh, t) {
    var g = ctx.createLinearGradient(0, 0, 0, vh);
    g.addColorStop(0, th.sky[0]); g.addColorStop(1, th.sky[1]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, vw, vh);
    var far = th.far, i, x, px;
    function layer(par, spacing, fn) {
      var off = camX * par, first = Math.floor(off / spacing) - 1, n = Math.ceil(vw / spacing) + 2;
      for (i = first; i < first + n; i++) fn(i * spacing - off, i);
    }
    ctx.save();
    if (far === 'city') {
      ctx.fillStyle = '#fff8'; for (i = 0; i < 40; i++) { ctx.fillRect((rnd(i) * 2000 - camX * 0.05) % vw, rnd(i + 9) * 180, 2, 2); }
      ctx.fillStyle = '#fff3c4'; ctx.beginPath(); ctx.arc(vw * 0.8 - camX * 0.02, 70, 26, 0, 7); ctx.fill();
      layer(0.25, 70, function (x, i) { var h = 120 + rnd(i) * 140; ctx.fillStyle = th.farColor; ctx.fillRect(x, 384 - h, 60, h + 64);
        ctx.fillStyle = '#ffe08a88'; for (var wy = 384 - h + 12; wy < 370; wy += 22) for (var wx = 8; wx < 52; wx += 16) if (rnd(i * 31 + wy + wx) > 0.45) ctx.fillRect(x + wx, wy, 8, 10); });
      layer(0.5, 110, function (x, i) { var h = 70 + rnd(i + 50) * 80; ctx.fillStyle = th.nearColor; ctx.fillRect(x, 400 - h, 90, h + 60); });
    } else if (far === 'hall') {
      layer(0.2, 160, function (x, i) { ctx.fillStyle = th.farColor; ctx.beginPath(); ctx.moveTo(x, 400); ctx.lineTo(x, 200); ctx.arc(x + 60, 200, 60, Math.PI, 0); ctx.lineTo(x + 120, 400); ctx.fill(); });
      layer(0.35, 60, function (x, i) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, 40); ctx.quadraticCurveTo(x + 30, 70, x + 60, 40); ctx.stroke();
        heart(ctx, x + 30, 66, 7, i % 2 ? '#ff8fab' : '#ffc2d1'); });
      layer(0.5, 140, function (x, i) { flower(ctx, x + 40, 380, th.nearColor); });
    } else if (far === 'sea') {
      ctx.fillStyle = '#fff59d'; ctx.beginPath(); ctx.arc(vw * 0.75 - camX * 0.02, 90, 34, 0, 7); ctx.fill();
      cloudRow(ctx, camX, vw, t);
      ctx.fillStyle = th.farColor; ctx.fillRect(0, 250, vw, 200);
      ctx.fillStyle = '#ffffff55'; for (i = 0; i < 30; i++) { x = (rnd(i) * 1600 - camX * 0.3 + t * 0.2) % (vw + 60); ctx.fillRect(x, 262 + rnd(i + 3) * 120, 30, 2); }
      layer(0.5, 220, function (x, i) { palm(ctx, x + 60, 390, 120 + rnd(i) * 40); });
    } else if (far === 'field') {
      cloudRow(ctx, camX, vw, t);
      layer(0.2, 300, function (x, i) { ctx.fillStyle = th.farColor; ctx.beginPath(); ctx.ellipse(x + 150, 400, 220, 120, 0, Math.PI, 0); ctx.fill(); });
      layer(0.45, 420, function (x, i) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.strokeRect(x + 100, 300, 110, 80); ctx.strokeStyle = '#ffffff66'; ctx.lineWidth = 1;
        for (var k = 0; k < 6; k++) { ctx.beginPath(); ctx.moveTo(x + 100 + k * 22, 300); ctx.lineTo(x + 100 + k * 22, 380); ctx.stroke(); } });
    } else if (far === 'paper') {
      ctx.strokeStyle = '#90caf955'; ctx.lineWidth = 1;
      for (i = 0; i < vh; i += 24) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(vw, i); ctx.stroke(); }
      ctx.strokeStyle = '#ef9a9a88'; x = 60 - (camX * 0.3) % vw; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, vh); ctx.stroke();
      layer(0.3, 180, function (x, i) { doodle(ctx, x + 40, 80 + rnd(i) * 160, i, th); });
    } else if (far === 'mountain') {
      layer(0.15, 260, function (x, i) { var h = 200 + rnd(i) * 90; ctx.fillStyle = th.farColor; ctx.beginPath(); ctx.moveTo(x - 60, 420); ctx.lineTo(x + 130, 420 - h); ctx.lineTo(x + 320, 420); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(x + 130, 420 - h); ctx.lineTo(x + 100, 450 - h); ctx.lineTo(x + 118, 445 - h); ctx.lineTo(x + 132, 455 - h); ctx.lineTo(x + 160, 450 - h); ctx.fill(); });
      // 缆车
      var cx0 = -camX * 0.3; ctx.strokeStyle = '#37474f'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, 60 + cx0 * 0.0); ctx.lineTo(vw, 140); ctx.stroke();
      for (i = 0; i < 4; i++) { x = ((t * 0.4 + i * 260 - camX * 0.3) % (vw + 200) + vw + 200) % (vw + 200) - 100; var y = 60 + (x / vw) * 80;
        ctx.strokeStyle = '#37474f'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 14); ctx.stroke();
        ctx.fillStyle = '#e53935'; rr(ctx, x - 13, y + 14, 26, 20, 5); ctx.fill(); ctx.fillStyle = '#bbdefb'; ctx.fillRect(x - 9, y + 18, 18, 7); }
      ctx.fillStyle = '#ffffff55'; for (i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse((rnd(i) * vw + t * 0.15) % (vw + 200) - 100, 200 + i * 30, 120, 18, 0, 0, 7); ctx.fill(); }
      layer(0.45, 200, function (x, i) { pine(ctx, x + 50, 400, th.nearColor); pine(ctx, x + 90, 410, th.nearColor); });
    } else if (far === 'tea') {
      cloudRow(ctx, camX, vw, t);
      layer(0.2, 340, function (x, i) { ctx.fillStyle = th.farColor; ctx.beginPath(); ctx.ellipse(x + 170, 420, 260, 190, 0, Math.PI, 0); ctx.fill();
        ctx.strokeStyle = '#33691e55'; ctx.lineWidth = 3; for (var k = 0; k < 6; k++) { ctx.beginPath(); ctx.ellipse(x + 170, 420, 240 - k * 36, 170 - k * 26, 0, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); } });
      layer(0.45, 260, function (x, i) { ctx.fillStyle = th.nearColor; ctx.beginPath(); ctx.ellipse(x + 130, 430, 170, 90, 0, Math.PI, 0); ctx.fill(); });
    } else if (far === 'market') {
      ctx.fillStyle = '#fff8'; for (i = 0; i < 40; i++) ctx.fillRect((rnd(i) * 2000) % vw, rnd(i + 9) * 150, 2, 2);
      layer(0.25, 150, function (x, i) { ctx.fillStyle = th.farColor; ctx.fillRect(x, 260, 130, 200); ctx.fillStyle = i % 2 ? '#e53935' : '#fbc02d';
        for (var k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(x + k * 26, 260); ctx.lineTo(x + k * 26 + 26, 260); ctx.lineTo(x + k * 26 + 13, 284); ctx.fill(); } });
      layer(0.4, 50, function (x, i) { var y = 70 + Math.sin(i * 0.9) * 12; ctx.strokeStyle = '#ffffff55'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 50, 70 + Math.sin((i + 1) * 0.9) * 12); ctx.stroke(); lantern(ctx, x, y, t + i * 20); });
    } else { // home
      ctx.fillStyle = '#ffffff22'; for (i = 0; i < vw + 40; i += 40) ctx.fillRect(i - (camX * 0.2) % 40, 0, 20, vh);
      layer(0.3, 260, function (x, i) { ctx.fillStyle = '#bbdefb'; rr(ctx, x + 40, 90, 90, 80, 6); ctx.fill(); ctx.strokeStyle = th.nearColor; ctx.lineWidth = 6; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + 85, 90); ctx.lineTo(x + 85, 170); ctx.moveTo(x + 40, 130); ctx.lineTo(x + 130, 130); ctx.stroke();
        // 书架 / 电视
        if (i % 2) { ctx.fillStyle = th.nearColor; ctx.fillRect(x + 170, 240, 70, 140); ctx.fillStyle = '#fff6'; for (var k = 0; k < 3; k++) ctx.fillRect(x + 175, 260 + k * 40, 60, 4); }
        else { ctx.fillStyle = '#263238'; rr(ctx, x + 160, 230, 90, 56, 5); ctx.fill(); ctx.fillStyle = (Math.floor(t / 20 + i) % 2) ? '#4fc3f7' : '#81c784'; ctx.fillRect(x + 166, 236, 78, 44); } });
    }
    ctx.restore();
  }
  function cloudRow(ctx, camX, vw, t) {
    ctx.fillStyle = '#ffffffcc';
    for (var i = 0; i < 6; i++) { var x = ((rnd(i) * 1500 - camX * 0.1 + t * 0.1) % (vw + 200) + vw + 200) % (vw + 200) - 100, y = 40 + rnd(i + 4) * 100;
      ctx.beginPath(); ctx.arc(x, y, 18, 0, 7); ctx.arc(x + 20, y - 8, 22, 0, 7); ctx.arc(x + 42, y, 16, 0, 7); ctx.fill(); }
  }
  function palm(ctx, x, y, h) {
    ctx.strokeStyle = '#8d6e63'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 14, y - h / 2, x + 6, y - h); ctx.stroke();
    ctx.fillStyle = '#2e7d32'; for (var k = 0; k < 5; k++) { ctx.save(); ctx.translate(x + 6, y - h); ctx.rotate(-2.6 + k * 0.9); ctx.beginPath(); ctx.ellipse(28, 0, 30, 8, 0, 0, 7); ctx.fill(); ctx.restore(); }
  }
  function pine(ctx, x, y, c) { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x, y - 90); ctx.lineTo(x + 26, y); ctx.lineTo(x - 26, y); ctx.fill(); }
  function flower(ctx, x, y, c) { ctx.fillStyle = '#66bb6a'; ctx.fillRect(x - 1, y - 30, 3, 30); ctx.fillStyle = c; for (var k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(x + Math.cos(k * 1.26) * 7, y - 34 + Math.sin(k * 1.26) * 7, 6, 0, 7); ctx.fill(); } ctx.fillStyle = '#fff176'; ctx.beginPath(); ctx.arc(x, y - 34, 4, 0, 7); ctx.fill(); }
  function lantern(ctx, x, y, t) { ctx.fillStyle = '#ff5252'; ctx.beginPath(); ctx.ellipse(x, y + 12, 9, 11, Math.sin(t * 0.03) * 0.1, 0, 7); ctx.fill(); ctx.fillStyle = '#ffd54f'; ctx.fillRect(x - 5, y, 10, 3); ctx.fillRect(x - 5, y + 22, 10, 3); ctx.fillStyle = '#ffeb3b55'; ctx.beginPath(); ctx.arc(x, y + 12, 16, 0, 7); ctx.fill(); }
  function doodle(ctx, x, y, i, th) { ctx.strokeStyle = th.farColor; ctx.lineWidth = 3; ctx.beginPath();
    if (i % 3 === 0) { star(ctx, x, y, 16, null, th.farColor, true); } else if (i % 3 === 1) { ctx.arc(x, y, 16, 0, 7); ctx.moveTo(x - 6, y - 4); ctx.arc(x - 6, y - 4, 1, 0, 7); ctx.moveTo(x + 6, y - 4); ctx.arc(x + 6, y - 4, 1, 0, 7); ctx.moveTo(x - 8, y + 4); ctx.quadraticCurveTo(x, y + 12, x + 8, y + 4); ctx.stroke(); }
    else { ctx.moveTo(x - 20, y); for (var k = 0; k < 5; k++) ctx.quadraticCurveTo(x - 16 + k * 8, y - 12, x - 12 + k * 8, y); ctx.stroke(); } }

  function heart(ctx, x, y, r, c) {
    ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x, y + r * 0.9);
    ctx.bezierCurveTo(x - r * 1.6, y - r * 0.2, x - r * 0.8, y - r * 1.4, x, y - r * 0.5);
    ctx.bezierCurveTo(x + r * 0.8, y - r * 1.4, x + r * 1.6, y - r * 0.2, x, y + r * 0.9); ctx.fill();
  }
  function star(ctx, x, y, r, fill, stroke, strokeOnly) {
    ctx.beginPath();
    for (var k = 0; k < 10; k++) { var a = -Math.PI / 2 + k * Math.PI / 5, rad = k % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad); }
    ctx.closePath(); if (!strokeOnly) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
  }

  // ---------- 地块 ----------
  function tiles(ctx, S, th, camX, vw) {
    var x0 = Math.max(0, Math.floor(camX / T)), x1 = Math.min(S.w - 1, Math.ceil((camX + vw) / T));
    for (var y = 0; y < S.h; y++) for (var x = x0; x <= x1; x++) {
      var c = S.tiles[y][x], px = x * T - camX, py = y * T;
      if (c === '#') {
        ctx.fillStyle = th.groundBody; ctx.fillRect(px, py, T + 0.5, T + 0.5);
        ctx.fillStyle = shade(th.groundBody, -0.12); if ((x + y) % 2) ctx.fillRect(px + 6, py + 10, 6, 4); else ctx.fillRect(px + 18, py + 20, 7, 4);
        var above = y > 0 ? S.tiles[y - 1][x] : ' ';
        if (above !== '#' && above !== 'B') {
          ctx.fillStyle = th.groundTop; ctx.fillRect(px, py, T + 0.5, 9);
          ctx.beginPath(); for (var k = 0; k < 4; k++) ctx.arc(px + 4 + k * 8, py + 9, 4, 0, Math.PI); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(px, py, T + 0.5, 2);
        }
      } else if (c === 'B') {
        ctx.fillStyle = th.block; rr(ctx, px + 1, py + 1, T - 2, T - 2, 4); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(px + 3, py + 3, T - 6, 4);
        ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(px + 3, py + T - 6, T - 6, 3);
      } else if (c === '=') {
        ctx.fillStyle = th.plank; rr(ctx, px, py, T + 0.5, 11, 3); ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(px, py + 8, T, 3);
        ctx.fillStyle = 'rgba(0,0,0,0.12)'; ctx.fillRect(px + 14, py + 1, 2, 8);
      } else if (c === '^') {
        ctx.fillStyle = '#cfd8dc'; ctx.strokeStyle = '#546e7a'; ctx.lineWidth = 1.5;
        for (var s = 0; s < 3; s++) { ctx.beginPath(); ctx.moveTo(px + s * 10 + 1, py + T); ctx.lineTo(px + s * 10 + 6, py + 12); ctx.lineTo(px + s * 10 + 11, py + T); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      }
    }
  }

  function mover(ctx, m, th, camX, far) {
    var x = m.x - camX, y = m.y;
    if (far === 'mountain' || far === 'sea') {
      if (far === 'mountain') { ctx.strokeStyle = '#37474f'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 48, y); ctx.lineTo(x + 48, 0); ctx.stroke(); }
    }
    ctx.fillStyle = far === 'sea' ? '#a1887f' : th.plank; rr(ctx, x, y, m.w, 14, 5); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(x + 4, y + 2, m.w - 8, 3);
    if (far === 'sea') { ctx.strokeStyle = '#6d4c41'; for (var k = 1; k < 6; k++) { ctx.beginPath(); ctx.moveTo(x + k * 16, y + 2); ctx.lineTo(x + k * 16, y + 12); ctx.stroke(); } }
    // 箭头提示
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath();
    if (m.dx) { ctx.moveTo(x + 40, y + 7); ctx.lineTo(x + 46, y + 4); ctx.lineTo(x + 46, y + 10); ctx.moveTo(x + 56, y + 7); ctx.lineTo(x + 50, y + 4); ctx.lineTo(x + 50, y + 10); }
    else { ctx.moveTo(x + 48, y + 3); ctx.lineTo(x + 44, y + 7); ctx.lineTo(x + 52, y + 7); ctx.moveTo(x + 48, y + 12); ctx.lineTo(x + 44, y + 8); ctx.lineTo(x + 52, y + 8); }
    ctx.fill();
  }

  // ---------- 物品 ----------
  var DAILY = ['mask', 'bottle', 'wallet'];
  function item(ctx, kind, x, y, t, n) {
    if (kind === 'daily') kind = DAILY[(n || 0) % 3];
    ctx.save(); ctx.translate(x, y); ctx.lineWidth = 1.5; ctx.strokeStyle = '#4a3426';
    switch (kind) {
      case 'heart': heart(ctx, 0, 1, 10, '#ff4d6d'); ctx.fillStyle = '#fff8'; ctx.beginPath(); ctx.arc(-4, -3, 2.5, 0, 7); ctx.fill(); break;
      case 'ring': ctx.strokeStyle = '#ffc107'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 3, 8, 0, 7); ctx.stroke(); ctx.fillStyle = '#b3e5fc'; ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(6, -6); ctx.lineTo(0, -1); ctx.lineTo(-6, -6); ctx.fill(); ctx.strokeStyle = '#0288d1'; ctx.lineWidth = 1; ctx.stroke(); break;
      case 'shell': ctx.fillStyle = '#ffab91'; ctx.beginPath(); ctx.moveTo(-11, 6); ctx.quadraticCurveTo(0, -18, 11, 6); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); for (var k = -2; k <= 2; k++) { ctx.moveTo(0, 6); ctx.lineTo(k * 4.5, -6 + Math.abs(k) * 2); } ctx.stroke(); break;
      case 'ball': ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 10, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#222'; ctx.beginPath(); for (var a = 0; a < 5; a++) ctx.lineTo(Math.cos(a * 1.257 - 1.57) * 4, Math.sin(a * 1.257 - 1.57) * 4); ctx.fill();
        for (a = 0; a < 5; a++) { ctx.beginPath(); ctx.arc(Math.cos(a * 1.257 - 1.57) * 9, Math.sin(a * 1.257 - 1.57) * 9, 2.4, 0, 7); ctx.fill(); } break;
      case 'pencil': ctx.rotate(-0.6); ctx.fillStyle = '#ffca28'; ctx.fillRect(-12, -4, 18, 8); ctx.strokeRect(-12, -4, 18, 8); ctx.fillStyle = '#ffe0b2'; ctx.beginPath(); ctx.moveTo(6, -4); ctx.lineTo(13, 0); ctx.lineTo(6, 4); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#333'; ctx.beginPath(); ctx.moveTo(11, -1); ctx.lineTo(13, 0); ctx.lineTo(11, 1); ctx.fill(); ctx.fillStyle = '#f48fb1'; ctx.fillRect(-15, -4, 3, 8); break;
      case 'coat': ctx.fillStyle = '#42a5f5'; ctx.beginPath(); ctx.moveTo(-6, -10); ctx.lineTo(6, -10); ctx.lineTo(13, -4); ctx.lineTo(10, 0); ctx.lineTo(8, -3); ctx.lineTo(8, 11); ctx.lineTo(-8, 11); ctx.lineTo(-8, -3); ctx.lineTo(-10, 0); ctx.lineTo(-13, -4); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(0, 11); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(-8, -11, 16, 3); break;
      case 'berry': ctx.fillStyle = '#e53935'; ctx.beginPath(); ctx.moveTo(0, 11); ctx.quadraticCurveTo(-13, -2, -7, -7); ctx.quadraticCurveTo(0, -10, 7, -7); ctx.quadraticCurveTo(13, -2, 0, 11); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ffeb3b'; for (k = 0; k < 6; k++) ctx.fillRect(-5 + (k % 3) * 4, -3 + Math.floor(k / 3) * 5, 1.5, 1.5); ctx.fillStyle = '#43a047'; ctx.beginPath(); ctx.moveTo(-7, -7); ctx.lineTo(0, -12); ctx.lineTo(7, -7); ctx.lineTo(0, -5); ctx.fill(); break;
      case 'food': ctx.strokeStyle = '#8d6e63'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-12, 10); ctx.lineTo(12, -10); ctx.stroke(); ['#ff7043', '#8bc34a', '#ff7043'].forEach(function (c, i) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(-6 + i * 6, 5 - i * 5, 4.5, 0, 7); ctx.fill(); }); break;
      case 'book': ctx.fillStyle = '#5c6bc0'; rr(ctx, -10, -9, 20, 18, 2); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(-7, -6, 14, 3); ctx.fillStyle = '#fdd835'; ctx.fillRect(6, -9, 2, 18); break;
      case 'mask': ctx.fillStyle = '#e3f2fd'; rr(ctx, -10, -6, 20, 12, 4); ctx.fill(); ctx.strokeStyle = '#64b5f6'; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-7, -2); ctx.lineTo(7, -2); ctx.moveTo(-7, 2); ctx.lineTo(7, 2); ctx.moveTo(-10, -4); ctx.lineTo(-14, 0); ctx.lineTo(-10, 4); ctx.moveTo(10, -4); ctx.lineTo(14, 0); ctx.lineTo(10, 4); ctx.stroke(); break;
      case 'bottle': ctx.fillStyle = '#4fc3f7'; rr(ctx, -6, -8, 12, 19, 4); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#0277bd'; ctx.fillRect(-4, -12, 8, 5); ctx.fillStyle = '#fff8'; ctx.fillRect(-3, -4, 2, 11); break;
      case 'wallet': ctx.fillStyle = '#8d6e63'; rr(ctx, -11, -7, 22, 15, 3); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#6d4c41'; rr(ctx, 2, -3, 9, 7, 2); ctx.fill(); ctx.fillStyle = '#ffd54f'; ctx.beginPath(); ctx.arc(6, 0.5, 1.6, 0, 7); ctx.fill(); ctx.fillStyle = '#81c784'; ctx.fillRect(-8, -10, 12, 4); break;
    }
    ctx.restore();
  }
  function coin(ctx, x, y, t) {
    var w = Math.abs(Math.cos(t * 0.08)) * 8 + 1.5;
    ctx.fillStyle = '#ffd23f'; ctx.strokeStyle = '#a66d00'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(x, y, w, 9, 0, 0, 7); ctx.fill(); ctx.stroke();
    if (w > 4) { ctx.fillStyle = '#e3a008'; ctx.fillRect(x - 1, y - 5, 2, 10); }
  }
  function key(ctx, x, y, t) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 0.05) * 0.2);
    ctx.fillStyle = '#fff59d55'; ctx.beginPath(); ctx.arc(0, 0, 18, 0, 7); ctx.fill();
    ctx.strokeStyle = '#f4b400'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(-6, 0, 5.5, 0, 7); ctx.moveTo(0, 0); ctx.lineTo(13, 0); ctx.moveTo(9, 0); ctx.lineTo(9, 5); ctx.moveTo(13, 0); ctx.lineTo(13, 4); ctx.stroke();
    ctx.restore();
  }
  function checkpoint(ctx, cp, camX, t) {
    var x = cp.x - camX, y = cp.y;
    ctx.fillStyle = '#795548'; ctx.fillRect(x - 2, y - 56, 4, 56);
    ctx.fillStyle = cp.on ? '#43a047' : '#bdbdbd';
    var wv = Math.sin(t * 0.1) * 3;
    ctx.beginPath(); ctx.moveTo(x + 2, y - 56); ctx.quadraticCurveTo(x + 14, y - 52 + wv, x + 28, y - 48); ctx.lineTo(x + 2, y - 38); ctx.fill();
    if (cp.on) { heart(ctx, x + 12, y - 48, 4, '#fff'); }
  }
  function gate(ctx, g, camX, name, open, t) {
    var x = g.x - camX, y = g.y, w = g.w, h = g.h;
    ctx.fillStyle = '#6d4c41'; rr(ctx, x - 4, y - 6, w + 8, h + 6, 10); ctx.fill();
    ctx.fillStyle = open ? '#fff8e1' : '#8d6e63'; rr(ctx, x + 6, y + 6, w - 12, h - 6, 6); ctx.fill();
    if (open) { var gl = ctx.createRadialGradient(x + w / 2, y + h / 2, 4, x + w / 2, y + h / 2, 50); gl.addColorStop(0, '#fffde7'); gl.addColorStop(1, '#ffd54f00'); ctx.fillStyle = gl; ctx.fillRect(x - 30, y - 20, w + 60, h + 30);
      star(ctx, x + w / 2, y + h / 2 + Math.sin(t * 0.08) * 4, 9, '#ffd23f', '#a66d00'); }
    else { ctx.fillStyle = '#5d4037'; ctx.fillRect(x + w / 2 - 1, y + 8, 2, h - 10); ctx.fillStyle = '#ffd54f'; rr(ctx, x + w / 2 - 7, y + h / 2 - 2, 14, 12, 2); ctx.fill(); ctx.strokeStyle = '#ffd54f'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x + w / 2, y + h / 2 - 2, 4.5, Math.PI, 0); ctx.stroke(); }
    // 招牌
    ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif';
    var tw = ctx.measureText(name).width + 16;
    ctx.fillStyle = '#ff7043'; rr(ctx, x + w / 2 - tw / 2, y - 30, tw, 22, 6); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(name, x + w / 2, y - 19);
  }

  // ---------- 敌人 ----------
  function eyes(ctx, x, y, dir, angry) {
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x - 4, y, 3.6, 0, 7); ctx.arc(x + 4, y, 3.6, 0, 7); ctx.fill();
    ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(x - 4 + dir * 1.3, y + 0.5, 1.8, 0, 7); ctx.arc(x + 4 + dir * 1.3, y + 0.5, 1.8, 0, 7); ctx.fill();
    if (angry) { ctx.strokeStyle = '#222'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x - 8, y - 6); ctx.lineTo(x - 2, y - 3.5); ctx.moveTo(x + 8, y - 6); ctx.lineTo(x + 2, y - 3.5); ctx.stroke(); }
  }
  function enemy(ctx, e, kind, camX, t) {
    var x = e.x - camX + e.w / 2, y = e.y + e.h, dir = e.vx > 0 ? 1 : -1;
    ctx.save(); ctx.translate(x, y);
    if (!e.alive) { ctx.globalAlpha = e.dead / 30; ctx.scale(1.3, 0.35); }
    var step = Math.sin(t * 0.25 + e.x * 0.1);
    ctx.lineWidth = 1.5; ctx.strokeStyle = '#3e2723';
    switch (kind) {
      case 'folder': ctx.fillStyle = '#ffca28'; rr(ctx, -12, -20, 24, 18, 3); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ffe082'; ctx.fillRect(-12, -23, 10, 4); ctx.fillStyle = '#fff'; ctx.fillRect(-9, -17, 18, 3); eyes(ctx, 0, -10, dir, true); feet(ctx, step); break;
      case 'gift': ctx.fillStyle = '#4dd0e1'; rr(ctx, -12, -21, 24, 19, 3); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ff7043'; ctx.fillRect(-2, -21, 4, 19); ctx.beginPath(); ctx.ellipse(-5, -24, 5, 3, 0.4, 0, 7); ctx.ellipse(5, -24, 5, 3, -0.4, 0, 7); ctx.fill(); eyes(ctx, -0.5, -11, dir, false); feet(ctx, step); break;
      case 'crab': ctx.fillStyle = '#ef5350'; ctx.beginPath(); ctx.ellipse(0, -9, 13, 9, 0, 0, 7); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(-15, -16 + step * 2, 5, 0, 7); ctx.arc(15, -16 - step * 2, 5, 0, 7); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#c62828'; ctx.lineWidth = 2; for (var k = -1; k <= 1; k += 2) { ctx.beginPath(); ctx.moveTo(k * 8, -3); ctx.lineTo(k * 14, 0); ctx.stroke(); } eyes(ctx, 0, -13, dir, false); break;
      case 'pawn': ctx.fillStyle = '#263238'; ctx.beginPath(); ctx.arc(0, -20, 6, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(-5, -15); ctx.lineTo(5, -15); ctx.lineTo(8, -4); ctx.lineTo(-8, -4); ctx.fill(); rr(ctx, -11, -5, 22, 5, 2); ctx.fill(); eyes(ctx, 0, -11, dir, true); break;
      case 'ink': case 'germwalk': ctx.fillStyle = kind === 'ink' ? '#311b92' : '#7cb342'; ctx.beginPath(); ctx.moveTo(-12, 0); ctx.quadraticCurveTo(-14, -22, 0, -22); ctx.quadraticCurveTo(14, -22, 12, 0);
        for (k = 0; k < 4; k++) ctx.quadraticCurveTo(9 - k * 6, -4 + (k % 2) * 4, 6 - k * 6, 0); ctx.fill();
        if (kind === 'germwalk') { ctx.strokeStyle = '#558b2f'; ctx.lineWidth = 2; for (k = 0; k < 6; k++) { var a = -Math.PI + k * 0.6; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 12, -10 + Math.sin(a) * 12); ctx.lineTo(Math.cos(a) * 16, -10 + Math.sin(a) * 16); ctx.stroke(); } }
        eyes(ctx, 0, -12, dir, true); break;
      case 'price': ctx.fillStyle = '#fff176'; ctx.beginPath(); ctx.moveTo(-12, -22); ctx.lineTo(6, -22); ctx.lineTo(13, -12); ctx.lineTo(6, -2); ctx.lineTo(-12, -2); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#d32f2f'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('$$$', -2, -6); eyes(ctx, -2, -15, dir, true); feet(ctx, step); break;
      case 'snail': ctx.fillStyle = '#ffcc80'; ctx.beginPath(); ctx.ellipse(0, -4, 14, 5, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#a1887f'; ctx.beginPath(); ctx.arc(-2, -13, 9, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(-2, -13, 4, 0, 5); ctx.stroke(); eyes(ctx, dir * 10, -14, dir, false); break;
      case 'tuktuk': ctx.fillStyle = '#43a047'; rr(ctx, -14, -24, 28, 18, 5); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ffeb3b'; ctx.fillRect(-14, -26, 28, 4); ctx.fillStyle = '#b3e5fc'; ctx.fillRect(dir > 0 ? 2 : -11, -21, 9, 7);
        ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.arc(-8, -4, 4.5, 0, 7); ctx.arc(9, -4, 4.5, 0, 7); ctx.fill(); eyes(ctx, dir > 0 ? -5 : 5, -15, dir, true); break;
      case 'phone': ctx.fillStyle = '#37474f'; rr(ctx, -9, -26, 18, 25, 4); ctx.fill(); ctx.stroke(); ctx.fillStyle = (Math.floor(t / 10) % 2) ? '#4fc3f7' : '#ba68c8'; ctx.fillRect(-7, -23, 14, 17); eyes(ctx, 0, -15, dir, true); feet(ctx, step); break;
    }
    ctx.restore();
  }
  function feet(ctx, s) { ctx.fillStyle = '#3e2723'; ctx.beginPath(); ctx.ellipse(-6 + s * 2, -1, 4, 2.5, 0, 0, 7); ctx.ellipse(6 - s * 2, -1, 4, 2.5, 0, 0, 7); ctx.fill(); }
  function flyer(ctx, e, kind, camX, t) {
    var x = e.x - camX + e.w / 2, y = e.y + e.h / 2;
    ctx.save(); ctx.translate(x, y);
    if (!e.alive) { ctx.globalAlpha = e.dead / 30; ctx.scale(1.3, 0.4); }
    var flap = Math.sin(t * 0.5);
    ctx.lineWidth = 1.5; ctx.strokeStyle = '#3e2723';
    switch (kind) {
      case 'germ': case 'ink':
        ctx.fillStyle = kind === 'ink' ? '#5e35b1' : '#9ccc65';
        for (var k = 0; k < 8; k++) { var a = k * 0.785 + t * 0.03; ctx.beginPath(); ctx.arc(Math.cos(a) * 12, Math.sin(a) * 12, 3, 0, 7); ctx.fill(); }
        ctx.beginPath(); ctx.arc(0, 0, 11, 0, 7); ctx.fill(); ctx.stroke(); eyes(ctx, 0, -1, 0, true); break;
      case 'balloon': ctx.strokeStyle = '#999'; ctx.beginPath(); ctx.moveTo(0, 12); ctx.quadraticCurveTo(4, 20, 0, 26); ctx.stroke(); ctx.fillStyle = '#f06292'; ctx.beginPath(); ctx.ellipse(0, 0, 11, 13, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#3e2723'; ctx.stroke(); eyes(ctx, 0, -2, 0, true); break;
      case 'gull': ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(0, 0, 11, 7, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-3, -2); ctx.lineTo(-14, -8 - flap * 6); ctx.lineTo(4, -3); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ffa000'; ctx.beginPath(); ctx.moveTo(10, -1); ctx.lineTo(16, 1); ctx.lineTo(10, 3); ctx.fill(); eyes(ctx, 4, -2, 1, true); break;
      case 'bee': ctx.fillStyle = '#e3f2fd'; ctx.beginPath(); ctx.ellipse(-3, -10 - flap * 2, 6, 4, -0.4, 0, 7); ctx.ellipse(4, -10 + flap * 2, 6, 4, 0.4, 0, 7); ctx.fill(); ctx.fillStyle = '#fdd835'; ctx.beginPath(); ctx.ellipse(0, 0, 12, 9, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#212121'; ctx.fillRect(-4, -8, 3, 16); ctx.fillRect(3, -8, 3, 16); eyes(ctx, -6, -1, -1, true); break;
      case 'lantern': lantern(ctx, 0, -12, t); eyes(ctx, 0, 0, 0, true); break;
    }
    ctx.restore();
  }

  G.Draw = { background: background, tiles: tiles, mover: mover, item: item, coin: coin, key: key, star: star, heart: heart,
    checkpoint: checkpoint, gate: gate, enemy: enemy, flyer: flyer, DAILY: DAILY };
})(window);
