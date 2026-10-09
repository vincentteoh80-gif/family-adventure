/* 四个卡通角色（全部用代码画出来，不使用真实照片，四人都戴眼镜） */
(function (G) {
  'use strict';
  var CHARS = {
    tat:   { name: 'Tat',   role: '爸爸', skill: '任劳任怨：多 1 条命', size: 1.0, wide: 1.0,
             skin: '#ffd8bc', hair: '#1c1a1f', shirt: '#b47cc7', shirt2: '#9a62ae', pants: '#36476b', shoe: '#2b2b2b', style: 'spiky' },
    yen:   { name: 'Yen',   role: '妈妈', skill: '裙摆飘飘：空中按住跳会慢慢飘', size: 0.97, wide: 0.95,
             skin: '#ffdcc6', hair: '#4a2a20', shirt: '#f7a9c4', shirt2: '#ee8fb0', pants: '#5a72b0', shoe: '#c2185b', style: 'long' },
    ze:    { name: 'Ze',    role: '大儿子', skill: '足球小将：跑得最快', size: 0.9, wide: 0.9,
             skin: '#ffd9bf', hair: '#18181b', shirt: '#f7f7f7', shirt2: '#1f8f4e', pants: '#2d3a58', shoe: '#1f8f4e', style: 'neat' },
    xiang: { name: 'Xiang', role: '小儿子', skill: '弹跳达人：跳得最高', size: 0.82, wide: 1.08,
             skin: '#ffdcc2', hair: '#232326', shirt: '#ffffff', shirt2: '#e53935', pants: '#2f4a6b', shoe: '#e53935', style: 'buzz' }
  };
  var LINE = '#4a3426';

  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  // 在 (x,y)=脚底中心 画角色。o: {s 缩放, facing 1/-1, t 时间, state 'idle'|'run'|'jump'|'fall', flash}
  function draw(ctx, id, x, y, o) {
    o = o || {};
    var C = CHARS[id]; if (!C) return;
    var s = (o.s || 1) * C.size, f = o.facing || 1, t = o.t || 0, st = o.state || 'idle';
    ctx.save();
    ctx.translate(x, y); ctx.scale(s * f, s);
    ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.lineWidth = 1.6; ctx.strokeStyle = LINE;
    var LW = s > 2.2 ? 1.1 : 1.6; ctx.lineWidth = LW;
    var run = st === 'run', air = st === 'jump' || st === 'fall';
    var sw = run ? Math.sin(t) : 0;
    var bob = run ? Math.abs(Math.cos(t)) * -1.5 : (st === 'idle' ? Math.sin((o.time || 0) * 0.05) * 0.6 : 0);
    var W = C.wide;

    // 影子
    if (!o.noShadow) { ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.beginPath(); ctx.ellipse(0, 0, 11 * W, 3, 0, 0, 7); ctx.fill(); }

    ctx.translate(0, bob);
    // 长发（后面）
    if (C.style === 'long') {
      ctx.fillStyle = C.hair; ctx.beginPath();
      ctx.moveTo(-14, -36); ctx.quadraticCurveTo(-17, -18, -12, -14); ctx.lineTo(12, -14); ctx.quadraticCurveTo(17, -18, 14, -36); ctx.closePath();
      ctx.fill(); ctx.stroke();
    }
    // 腿
    var legY = -9;
    function leg(dx, a) {
      ctx.save(); ctx.translate(dx, legY); ctx.rotate(a);
      ctx.fillStyle = C.pants; rr(ctx, -3, 0, 6, 8, 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = C.shoe; rr(ctx, -3.5, 6.5, 8, 3.5, 1.6); ctx.fill(); ctx.stroke();
      ctx.restore();
    }
    if (air) { leg(-4, -0.35); leg(4, 0.5); }
    else { leg(-4, sw * 0.6); leg(4, -sw * 0.6); }

    // 背包
    ctx.fillStyle = '#3e4a5c'; rr(ctx, -12 * W, -22, 6, 12, 2); ctx.fill(); ctx.stroke();

    // 身体 / 衣服
    ctx.fillStyle = C.shirt; rr(ctx, -9 * W, -23, 18 * W, 15, 5); ctx.fill(); ctx.stroke();
    if (id === 'xiang') { // 红条纹
      ctx.save(); rr(ctx, -9 * W, -23, 18 * W, 15, 5); ctx.clip();
      ctx.fillStyle = C.shirt2; ctx.fillRect(-12, -17, 24, 2.6); ctx.fillRect(-12, -12, 24, 2.6); ctx.restore();
      rr(ctx, -9 * W, -23, 18 * W, 15, 5); ctx.stroke();
    } else if (id === 'ze') { // 绿领
      ctx.fillStyle = C.shirt2; ctx.beginPath(); ctx.moveTo(-5, -23); ctx.quadraticCurveTo(0, -18, 5, -23); ctx.lineTo(3, -23); ctx.quadraticCurveTo(0, -20, -3, -23); ctx.fill();
      ctx.fillRect(-9 * W + 1, -11, 18 * W - 2, 2);
    } else { ctx.fillStyle = C.shirt2; ctx.beginPath(); ctx.arc(0, -23, 4, 0, Math.PI); ctx.fill(); }
    // 背包带
    ctx.strokeStyle = '#2d3747'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-5, -23); ctx.lineTo(-6, -12); ctx.moveTo(5, -23); ctx.lineTo(6, -12); ctx.stroke();
    ctx.strokeStyle = LINE; ctx.lineWidth = LW;

    // 手臂
    function arm(dx, a) {
      ctx.save(); ctx.translate(dx, -21); ctx.rotate(a);
      ctx.fillStyle = C.shirt; rr(ctx, -2.6, 0, 5.2, 6, 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = C.skin; ctx.beginPath(); ctx.arc(0, 8.5, 2.8, 0, 7); ctx.fill(); ctx.stroke();
      ctx.restore();
    }
    if (air) { arm(-9 * W, 2.4); arm(9 * W, -2.4); }
    else { arm(-9 * W, 0.25 - sw * 0.7); arm(9 * W, -0.25 + sw * 0.7); }

    // 头
    var hy = -35;
    ctx.fillStyle = C.skin;
    ctx.beginPath(); ctx.ellipse(1, hy, 13.5, 12.5, 0, 0, 7); ctx.fill(); ctx.stroke();
    // 耳朵
    ctx.beginPath(); ctx.ellipse(-12.5, hy + 1, 2.4, 3.2, 0, 0, 7); ctx.fill(); ctx.stroke();

    // 头发
    ctx.fillStyle = C.hair;
    if (C.style === 'spiky') {
      ctx.beginPath();
      ctx.moveTo(-13.5, hy + 1); ctx.quadraticCurveTo(-14, hy - 13, 1, hy - 13.5); ctx.quadraticCurveTo(14, hy - 13, 14.6, hy - 1);
      ctx.lineTo(11, hy - 6); ctx.lineTo(8, hy - 2.5); ctx.lineTo(5, hy - 7); ctx.lineTo(1, hy - 3); ctx.lineTo(-3, hy - 7); ctx.lineTo(-7, hy - 3.5); ctx.lineTo(-10, hy - 5); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-6, hy - 13); ctx.lineTo(-3, hy - 17); ctx.lineTo(0, hy - 13.4); ctx.lineTo(4, hy - 17.5); ctx.lineTo(6, hy - 13); ctx.lineTo(10, hy - 15.5); ctx.lineTo(10, hy - 11); ctx.fill();
    } else if (C.style === 'long') {
      ctx.beginPath();
      ctx.moveTo(-14.5, hy + 8); ctx.quadraticCurveTo(-16, hy - 14, 2, hy - 14); ctx.quadraticCurveTo(16, hy - 13, 15.5, hy + 8);
      ctx.quadraticCurveTo(13, hy - 2, 9, hy - 6); ctx.quadraticCurveTo(2, hy - 1, -6, hy - 7); ctx.quadraticCurveTo(-11, hy - 3, -12, hy + 8); ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.beginPath(); ctx.moveTo(-6, hy - 11); ctx.quadraticCurveTo(2, hy - 13, 8, hy - 10); ctx.stroke(); ctx.strokeStyle = LINE;
    } else if (C.style === 'neat') {
      ctx.beginPath();
      ctx.moveTo(-13.5, hy + 2); ctx.quadraticCurveTo(-14, hy - 14, 2, hy - 13.5); ctx.quadraticCurveTo(15, hy - 13, 14.6, hy - 1);
      ctx.quadraticCurveTo(10, hy - 7, 4, hy - 5.5); ctx.lineTo(2, hy - 8); ctx.quadraticCurveTo(-5, hy - 5, -10, hy - 4); ctx.closePath();
      ctx.fill(); ctx.stroke();
    } else { // buzz
      ctx.beginPath();
      ctx.moveTo(-13.4, hy - 1); ctx.quadraticCurveTo(-13, hy - 13.5, 1.5, hy - 13); ctx.quadraticCurveTo(14, hy - 12.5, 14.3, hy - 2);
      ctx.lineTo(10, hy - 6.5); ctx.lineTo(6, hy - 5); ctx.lineTo(3, hy - 8); ctx.lineTo(-1, hy - 5.5); ctx.lineTo(-5, hy - 7.5); ctx.lineTo(-9, hy - 5); ctx.closePath();
      ctx.fill(); ctx.stroke();
    }

    // 眼睛（眨眼）
    var blink = ((o.time || 0) % 220) < 8;
    var ex1 = -3, ex2 = 7.5, ey = hy + 1;
    ctx.fillStyle = '#2b1d16';
    if (blink) { ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(ex1 - 2, ey); ctx.lineTo(ex1 + 2, ey); ctx.moveTo(ex2 - 2, ey); ctx.lineTo(ex2 + 2, ey); ctx.stroke(); }
    else {
      ctx.beginPath(); ctx.ellipse(ex1, ey, 1.9, 2.4, 0, 0, 7); ctx.ellipse(ex2, ey, 1.9, 2.4, 0, 0, 7); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ex1 + 0.7, ey - 0.9, 0.7, 0, 7); ctx.arc(ex2 + 0.7, ey - 0.9, 0.7, 0, 7); ctx.fill();
    }
    // 眼镜（四个人都戴）
    ctx.lineWidth = 1.7; ctx.strokeStyle = '#111';
    ctx.fillStyle = 'rgba(200,230,255,0.25)';
    rr(ctx, ex1 - 4.6, ey - 3.6, 9.2, 7.2, 2.2); ctx.fill(); ctx.stroke();
    rr(ctx, ex2 - 4.6, ey - 3.6, 9.2, 7.2, 2.2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ex1 + 4.6, ey - 1); ctx.lineTo(ex2 - 4.6, ey - 1); ctx.moveTo(ex1 - 4.6, ey - 1); ctx.lineTo(-12, ey - 2); ctx.stroke();
    ctx.strokeStyle = LINE; ctx.lineWidth = LW;

    // 腮红 + 嘴巴
    ctx.fillStyle = 'rgba(255,120,130,0.35)';
    ctx.beginPath(); ctx.ellipse(-6, hy + 6.5, 2.6, 1.6, 0, 0, 7); ctx.ellipse(11, hy + 6.5, 2.4, 1.5, 0, 0, 7); ctx.fill();
    if (o.hurt) { ctx.fillStyle = '#7a2e2e'; ctx.beginPath(); ctx.ellipse(3, hy + 8, 2, 2.4, 0, 0, 7); ctx.fill(); }
    else {
      ctx.strokeStyle = id === 'yen' ? '#d0506e' : '#7a3b2e'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(3, hy + 5.2, 3.2, 0.25, Math.PI - 0.25); ctx.stroke();
    }
    ctx.restore();
  }

  G.CHARS = CHARS; G.drawChar = draw; G.roundRect = rr;
})(typeof window !== 'undefined' ? window : globalThis);
