/* 新玩法的绘制：朋友、酒桌、拍照点、冷风、监控、厕所门、电器、饮水机、灯笼、画出的平台、厨房、提示箭头、大雾 */
(function (G) {
  'use strict';
  var D = G.Draw, rr = G.roundRect, T = 32;
  var FONT = '"PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif';

  function label(ctx, txt, x, y, bg) {
    ctx.font = 'bold 11px ' + FONT; var w = ctx.measureText(txt).width + 10;
    ctx.fillStyle = bg || 'rgba(0,0,0,0.55)'; rr(ctx, x - w / 2, y - 9, w, 17, 6); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y);
  }

  // 新物品
  var baseItem = D.item;
  D.item = function (ctx, kind, x, y, t, n) {
    ctx.save(); ctx.translate(x, y); ctx.lineWidth = 1.5; ctx.strokeStyle = '#4a3426';
    var done = true;
    switch (kind) {
      case 'photo': ctx.rotate(Math.sin(t * 0.05 + (n || 0)) * 0.15); ctx.fillStyle = '#fff'; rr(ctx, -11, -11, 22, 22, 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#90caf9'; ctx.fillRect(-8, -8, 16, 12); ctx.fillStyle = '#ff8fab'; ctx.beginPath(); ctx.arc(-3, -2, 3, 0, 7); ctx.arc(3, -2, 3, 0, 7); ctx.fill(); ctx.fillStyle = '#66bb6a'; ctx.fillRect(-8, 1, 16, 3); break;
      case 'snack': ctx.fillStyle = '#ff7043'; rr(ctx, -8, -11, 16, 22, 3); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ffeb3b'; ctx.beginPath(); ctx.arc(0, 0, 5, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(-8, -11, 16, 3); break;
      case 'trash': ctx.fillStyle = '#9e9e9e'; ctx.beginPath(); ctx.moveTo(-9, 8); ctx.lineTo(-11, -4); ctx.quadraticCurveTo(0, -12, 11, -4); ctx.lineTo(9, 8); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#616161'; ctx.fillRect(-2, -12, 4, 4); break;
      case 'tomato': ctx.fillStyle = '#e53935'; ctx.beginPath(); ctx.arc(0, 1, 10, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#43a047'; ctx.beginPath(); ctx.moveTo(-5, -8); ctx.lineTo(0, -5); ctx.lineTo(5, -8); ctx.lineTo(0, -11); ctx.fill(); ctx.fillStyle = '#fff6'; ctx.beginPath(); ctx.arc(-4, -2, 2.5, 0, 7); ctx.fill(); break;
      case 'egg': ctx.fillStyle = '#fffde7'; ctx.beginPath(); ctx.ellipse(0, 0, 8, 11, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-3, -4, 2, 0, 7); ctx.fill(); break;
      case 'gourd': ctx.rotate(0.5); ctx.fillStyle = '#7cb342'; ctx.beginPath(); ctx.ellipse(0, 0, 6, 15, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#558b2f'; for (var k = -2; k <= 2; k++) { ctx.beginPath(); ctx.arc(-2, k * 5, 1.5, 0, 7); ctx.arc(2, k * 5 + 2, 1.5, 0, 7); ctx.fill(); }
        ctx.rotate(-0.5); ctx.strokeStyle = '#c62828'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(0, 0, 15, 0, 7); ctx.moveTo(-10, -10); ctx.lineTo(10, 10); ctx.stroke(); break;
      case 'gourdplain': ctx.rotate(0.5); ctx.fillStyle = '#7cb342'; ctx.beginPath(); ctx.ellipse(0, 0, 7, 16, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#558b2f'; for (var k2 = -2; k2 <= 2; k2++) { ctx.beginPath(); ctx.arc(-2, k2 * 5, 1.5, 0, 7); ctx.arc(2, k2 * 5 + 2, 1.5, 0, 7); ctx.fill(); } break;
      case 'dish': ctx.fillStyle = '#fff59d55'; ctx.beginPath(); ctx.arc(0, 0, 19, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(0, 4, 14, 6, 0, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ffd54f'; ctx.beginPath(); ctx.ellipse(-3, 0, 7, 4, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#e53935'; ctx.beginPath(); ctx.arc(4, 0, 3.5, 0, 7); ctx.arc(-1, -2, 3, 0, 7); ctx.fill(); break;
      default: done = false;
    }
    ctx.restore();
    if (!done) baseItem(ctx, kind, x, y, t, n);
  };

  D.friend = function (ctx, f, camX, t, lab) {
    var x = f.x - camX + f.w / 2, y = f.y + f.h;
    ctx.save(); ctx.translate(x, y); ctx.lineWidth = 1.5; ctx.strokeStyle = '#3e2723';
    ctx.fillStyle = '#546e7a'; rr(ctx, -8, -22, 16, 16, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#37474f'; ctx.fillRect(-6, -7, 5, 7); ctx.fillRect(1, -7, 5, 7);
    ctx.fillStyle = '#ffcc80'; ctx.beginPath(); ctx.arc(0, -29, 9, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.arc(0, -33, 9, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(-3, -29, 1.4, 0, 7); ctx.arc(3, -29, 1.4, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(0, -26, 3, 0.2, Math.PI - 0.2); ctx.stroke();
    var up = Math.sin(t * 0.08) * 4;
    ctx.save(); ctx.translate(-14, -20 + up); ctx.fillStyle = '#ffca28'; rr(ctx, -5, -8, 10, 12, 2); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff'; rr(ctx, -5, -10, 10, 4, 2); ctx.fill(); ctx.restore();
    ctx.restore();
    if (lab !== '') label(ctx, lab || '来喝一杯！', x, f.y - 14, 'rgba(230,81,0,0.85)');
  };
  D.table = function (ctx, tb, camX) {
    var x = tb.x - camX, y = tb.y;
    ctx.fillStyle = '#8d6e63'; ctx.fillRect(x, y + 10, tb.w, 6); ctx.fillRect(x + 6, y + 16, 5, 24); ctx.fillRect(x + tb.w - 11, y + 16, 5, 24);
    for (var k = 0; k < 4; k++) { ctx.fillStyle = '#ffca28'; ctx.fillRect(x + 6 + k * 14, y - 4, 9, 14); ctx.fillStyle = '#fff'; ctx.fillRect(x + 6 + k * 14, y - 6, 9, 4); }
    label(ctx, '酒桌', x + tb.w / 2, y - 18, 'rgba(230,81,0,0.85)');
  };
  D.spot = function (ctx, s, camX, t) {
    var x = s.x - camX, y = s.y;
    ctx.save(); ctx.setLineDash([5, 4]); ctx.strokeStyle = s.done ? '#43a047' : '#fff'; ctx.lineWidth = 2; rr(ctx, x, y, s.w, s.h, 8); ctx.stroke(); ctx.restore();
    var cx = x + s.w / 2, cy = y - 12 + Math.sin(t * 0.08) * 2;
    ctx.fillStyle = s.done ? '#43a047' : '#37474f'; rr(ctx, cx - 11, cy - 8, 22, 16, 4); ctx.fill(); ctx.fillStyle = '#90caf9'; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, 7); ctx.fill();
    if (s.prog > 0 && !s.done) { ctx.strokeStyle = '#ffeb3b'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, 13, -Math.PI / 2, -Math.PI / 2 + s.prog / 40 * Math.PI * 2); ctx.stroke(); }
  };
  D.wind = function (ctx, S, camX, vw, t) {
    var x0 = Math.floor(camX / T), x1 = Math.ceil((camX + vw) / T);
    ctx.strokeStyle = 'rgba(255,255,255,0.75)'; ctx.lineWidth = 2;
    for (var x = x0; x <= x1; x++) for (var y = 0; y < S.h; y++) {
      if (!S.wind[y * S.w + x]) continue;
      var px = x * T - camX, py = y * T, o = ((t * 3 + y * 13 + x * 7) % 40);
      ctx.fillStyle = 'rgba(225,245,254,0.18)'; ctx.fillRect(px, py, T, T);
      ctx.beginPath(); ctx.moveTo(px + 32 - o, py + 10); ctx.lineTo(px + 22 - o, py + 10); ctx.moveTo(px + 40 - o, py + 22); ctx.lineTo(px + 28 - o, py + 22); ctx.stroke();
    }
  };
  D.cam = function (ctx, c, camX, active) {
    var x = c.x - camX, y = c.y;
    if (active) {
      var a = c.ang, r = 9 * T;
      ctx.fillStyle = c.see ? 'rgba(244,67,54,0.35)' : 'rgba(255,235,59,0.28)';
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a - 0.22) * r, y + Math.sin(a - 0.22) * r); ctx.arc(x, y, r, a - 0.22, a + 0.22); ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle = '#eceff1'; ctx.strokeStyle = '#37474f'; ctx.lineWidth = 1.5; rr(ctx, x - 12, y - 8, 24, 14, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#263238'; ctx.beginPath(); ctx.arc(x + Math.cos(c.ang || 1.57) * 4, y + 1, 4, 0, 7); ctx.fill();
    ctx.fillStyle = '#f44336'; ctx.beginPath(); ctx.arc(x + 8, y - 4, 1.8, 0, 7); ctx.fill();
  };
  D.hide = function (ctx, hz, camX, on) {
    var x = hz.x - camX, y = hz.y - T;
    ctx.fillStyle = on ? '#4fc3f7' : '#90a4ae'; rr(ctx, x + 2, y, T - 4, 2 * T, 4); ctx.fill();
    ctx.strokeStyle = '#37474f'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('WC', x + T / 2, y + 14);
    ctx.fillStyle = '#ffd54f'; ctx.beginPath(); ctx.arc(x + T - 9, y + T + 4, 2, 0, 7); ctx.fill();
  };
  D.device = function (ctx, d, camX, t, tag) {
    var x = d.x - camX, y = d.y;
    if (d.kind === 'tv') {
      ctx.fillStyle = '#263238'; rr(ctx, x - 4, y, 40, 26, 3); ctx.fill(); ctx.fillRect(x + 12, y + 26, 8, 4);
      ctx.fillStyle = d.off ? '#37474f' : ((Math.floor(t / 12) % 2) ? '#4fc3f7' : '#81c784'); ctx.fillRect(x - 1, y + 3, 34, 20);
    } else {
      ctx.fillStyle = '#5d4037'; ctx.fillRect(x - 2, y + 18, 36, 12);
      ctx.fillStyle = '#263238'; rr(ctx, x + 10, y + 2, 12, 18, 2); ctx.fill(); ctx.fillStyle = d.off ? '#37474f' : '#ba68c8'; ctx.fillRect(x + 12, y + 4, 8, 13);
    }
    if (!d.off) { ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.beginPath(); ctx.arc(x + 16, y + 12, 22, 0, 7); ctx.fill(); if (tag) label(ctx, '关掉！', x + 16, y - 12, 'rgba(211,47,47,0.85)'); }
  };
  D.fountain = function (ctx, f, camX, need) {
    var x = f.x - camX, y = f.y;
    ctx.fillStyle = '#b3e5fc'; rr(ctx, x + 6, y - 6, 20, 18, 4); ctx.fill(); ctx.strokeStyle = '#0277bd'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#eceff1'; ctx.fillRect(x + 4, y + 12, 24, 28); ctx.strokeRect(x + 4, y + 12, 24, 28);
    ctx.fillStyle = '#0277bd'; ctx.fillRect(x + 13, y + 20, 6, 4);
    if (need) label(ctx, '喝水', x + 16, y - 16, 'rgba(2,119,189,0.85)');
  };
  D.lantern2 = function (ctx, o, camX, t) {
    var x = o.x - camX, y = o.y + Math.sin(t * 0.07) * 3;
    ctx.fillStyle = 'rgba(255,235,59,0.3)'; ctx.beginPath(); ctx.arc(x, y, 18, 0, 7); ctx.fill();
    ctx.fillStyle = '#ff7043'; ctx.beginPath(); ctx.ellipse(x, y, 8, 10, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#ffd54f'; ctx.fillRect(x - 4, y - 12, 8, 3); ctx.fillRect(x - 4, y + 9, 8, 3);
  };
  D.drawn = function (ctx, p, camX) {
    var x = p.x - camX; ctx.globalAlpha = p.life < 60 ? (Math.floor(p.life / 6) % 2 ? 0.4 : 0.9) : 1;
    ctx.fillStyle = '#ffeb3b'; rr(ctx, x, p.y, p.w, 10, 5); ctx.fill();
    ctx.strokeStyle = '#7e57c2'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x + 3, p.y + 2); for (var k = 0; k < p.w; k += 8) ctx.lineTo(x + k, p.y + (k / 8 % 2 ? 1 : 8)); ctx.stroke();
    ctx.globalAlpha = 1;
  };
  D.fallItem = function (ctx, f, camX, t) {
    ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.beginPath(); ctx.ellipse(f.x - camX, 12 * T - 2, 10, 3, 0, 0, 7); ctx.fill();
    D.item(ctx, f.kind, f.x - camX, f.y, t, 0);
  };
  D.arrow = function (ctx, tx, ty, camX, vw, top, t) {
    var x = tx - camX, y = ty, b = Math.sin(t * 0.15) * 4;
    ctx.save(); ctx.fillStyle = '#ffeb3b'; ctx.strokeStyle = '#e65100'; ctx.lineWidth = 2;
    if (x < 20 || x > vw - 20) {
      var left = x < 20, ax = left ? 26 : vw - 26, ay = Math.max(top + 40, Math.min(330, y));
      ctx.translate(ax + (left ? -b : b), ay); if (left) ctx.scale(-1, 1);
      ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(-6, -12); ctx.lineTo(-6, 12); ctx.closePath(); ctx.fill(); ctx.stroke();
    } else {
      ctx.translate(x, y - 34 + b);
      ctx.beginPath(); ctx.moveTo(0, 12); ctx.lineTo(-10, -4); ctx.lineTo(10, -4); ctx.closePath(); ctx.fill(); ctx.stroke();
    }
    ctx.restore();
  };
  D.fog = function (ctx, px, py, radius, vw, top, h) {
    var g = ctx.createRadialGradient(px, py, radius * 0.55, px, py, radius);
    g.addColorStop(0, 'rgba(236,239,241,0)'); g.addColorStop(1, 'rgba(236,239,241,0.97)');
    ctx.fillStyle = g; ctx.fillRect(0, top, vw, h);
  };
  // 厨房背景
  var baseBg = D.background;
  D.background = function (ctx, th, camX, vw, vh, t) {
    if (th.far !== 'kitchen') return baseBg(ctx, th, camX, vw, vh, t);
    ctx.fillStyle = th.sky[1]; ctx.fillRect(0, 0, vw, vh);
    for (var y = 0; y < vh; y += 24) for (var x = 0; x < vw + 24; x += 24) { ctx.fillStyle = ((x + y) / 24) % 2 ? '#fff3e0' : '#ffe0b2'; ctx.fillRect(x - camX % 24, y, 24, 24); }
    ctx.fillStyle = '#a1887f'; for (var k = 0; k < 6; k++) { rr(ctx, 30 + k * 140 - camX, 90, 110, 60, 6); ctx.fill(); }
    ctx.fillStyle = '#d7ccc8'; ctx.fillRect(0, 330, vw, 54);
    ctx.fillStyle = '#5d4037'; rr(ctx, vw / 2 - 60 - camX * 0, 300, 120, 30, 6); ctx.fill();
    ctx.fillStyle = '#424242'; ctx.beginPath(); ctx.ellipse(vw / 2, 300, 50, 10, 0, 0, 7); ctx.fill();
  };
})(window);
