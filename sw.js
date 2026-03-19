// ★ バージョンを上げるたびに古いキャッシュが自動削除される
const CACHE_NAME = 'fnt-intero-v2.0.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './FNT512.png',
  './FNT512-transparent.png'
];

// インストール: 必ずネットから最新を取得してキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' })))
    ).then(() => self.skipWaiting()) // 即座に新SWを有効化
  );
});

// アクティベート: 古いキャッシュをすべて削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => {
        console.log('[SW] 古いキャッシュ削除:', k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim()) // 開いているページをすぐ制御下に
  );
});

// フェッチ: Network First（常に最新を優先、失敗時のみキャッシュ）
self.addEventListener('fetch', event => {
  // html・js・cssは常にネットから最新取得
  const url = new URL(event.request.url);
  const isCore = ASSETS.some(a => url.pathname.endsWith(a.replace('./','')));

  if (isCore) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(response => {
          // キャッシュも最新で上書き
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request)) // オフライン時のみキャッシュ
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
  }
});

// メッセージ受信: skipWaiting コマンド
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
