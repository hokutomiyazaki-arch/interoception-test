const CACHE_NAME = 'interoception-test-v1.0.0';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './FNT512.png',
    './FNT512-transparent.png',
    'https://hokutomiyazaki-arch.github.io/interoception-test/FNT512.png',
    'https://hokutomiyazaki-arch.github.io/interoception-test/FNT512-transparent.png'
];

// インストール時にキャッシュ
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching assets');
                return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
                    console.log('[SW] Some assets failed to cache:', err);
                    // 失敗しても続行（画像ファイルがない場合など）
                    return Promise.resolve();
                });
            })
            .then(() => {
                console.log('[SW] Install complete');
                return self.skipWaiting();
            })
    );
});

// アクティベート時に古いキャッシュを削除
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Activation complete');
                return self.clients.claim();
            })
    );
});

// フェッチ時の処理（ネットワーク優先、キャッシュフォールバック）
self.addEventListener('fetch', (event) => {
    // カメラやその他の特殊なリクエストは無視
    if (event.request.url.includes('chrome-extension') ||
        event.request.url.includes('blob:') ||
        event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        // まずネットワークを試行
        fetch(event.request)
            .then((response) => {
                // 成功したらキャッシュを更新
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                }
                return response;
            })
            .catch(() => {
                // ネットワーク失敗時はキャッシュから取得
                return caches.match(event.request)
                    .then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        
                        // HTMLリクエストの場合はindex.htmlを返す
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('./index.html');
                        }
                        
                        // それ以外は404
                        return new Response('Not found', { status: 404 });
                    });
            })
    );
});

// プッシュ通知（将来の拡張用）
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'トレーニングの時間です',
        icon: './FNT512.png',
        badge: './FNT512.png',
        vibrate: [100, 50, 100]
    };

    event.waitUntil(
        self.registration.showNotification('内受容覚テスト', options)
    );
});

// バックグラウンド同期（将来の拡張用）
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-results') {
        console.log('[SW] Syncing results...');
    }
});
