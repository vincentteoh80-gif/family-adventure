/* 离线缓存：联网时总是先取最新文件（更新后刷新即可看到），断网时用缓存。 */
const CACHE = 'family-adventure-v5';
const FILES = ['./', './index.html', './style.css', './config.js', './characters.js', './levels.js',
  './engine.js', './draw.js', './draw2.js', './game.js', './classic.html', './rpg.css', './rpg-data.js', './rpg-engine.js', './rpg-draw.js', './rpg-game.js', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png', './favicon-32.png', './face-tat.png', './face-yen.png', './face-ze.png', './face-xiang.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./index.html'))));
});
