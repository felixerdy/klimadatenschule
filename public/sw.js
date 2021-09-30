if (!self.define) {
  const e = e => {
      'require' !== e && (e += '.js');
      let s = Promise.resolve();
      return (
        a[e] ||
          (s = new Promise(async s => {
            if ('document' in self) {
              const a = document.createElement('script');
              (a.src = e), document.head.appendChild(a), (a.onload = s);
            } else importScripts(e), s();
          })),
        s.then(() => {
          if (!a[e]) throw new Error(`Module ${e} didn’t register its module`);
          return a[e];
        })
      );
    },
    s = (s, a) => {
      Promise.all(s.map(e)).then(e => a(1 === e.length ? e[0] : e));
    },
    a = { require: Promise.resolve(s) };
  self.define = (s, i, n) => {
    a[s] ||
      (a[s] = Promise.resolve().then(() => {
        let a = {};
        const t = { uri: location.origin + s.slice(1) };
        return Promise.all(
          i.map(s => {
            switch (s) {
              case 'exports':
                return a;
              case 'module':
                return t;
              default:
                return e(s);
            }
          })
        ).then(e => {
          const s = n(...e);
          return a.default || (a.default = s), a;
        });
      }));
  };
}
define('./sw.js', ['./workbox-4a677df8'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/chunks/213-f058d932977b66548e30.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/229.acf3975f1c6076e72626.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/283-a997a8cac9672f349183.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/321-4ddfc377ebfe9dc7bbf9.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/385-c8373446afcbade083ca.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/521-6a5e0e3f7f695bd9e2c1.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/544-0c737901cd0e9ed37f5c.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/548-8561485e8cf0c8e95c1a.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/675-23653c1b51e0ee9e96e3.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/6c44d60f.751b17f94210fef9e5a8.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/899-a47c21b91353655d56a8.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/d94c0b71-ea7bc1c4be93a317d0ce.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/framework-0c59e9db79781a67643b.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/main-6a8ca7ae20700a66db28.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/404-98b37f756653704ff684.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/500-e212a765e26ad1a12969.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/_app-413eaaf546b341631989.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/_error-82a806cd39f8ab3dc3ac.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/auth/complete-signup-0e4815cd59f478cee629.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/auth/signin-137a363842298d475871.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/dataset-4584ea143da5c1e620db.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/dataset/%5Bid%5D-4d7643449d91da41ac1c.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/dataset/create-5fdd3ddab93f038c846d.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/dataset/my-9ff49797355ca03dc516.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/ernaehrung-14f4f7723f2d50f2acd4.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/ernaehrung/my-8cd91d2d79ef5d89fcb3.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/index-809c74afb33aeb076a55.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/mobilitaet-7cd1672dd352dd25f8f2.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/mobilitaet/my-b9a297af26870b5c919d.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/papier-428c1c425270c518e348.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/papier/my-41155615393b7f5700d0.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/schaltzentrale-6eb977a7777da7ad30cf.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/schaltzentrale/orgs-85ab4bc1021e3f05796f.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/schaltzentrale/user-a5b0d2137233ab8642f4.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/tools-6bb85b491cf9202556d8.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/tools/landcover-472a6ae07f1e7ae25712.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/tools/nutrition-calculator-0079da60bbc6bb350974.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/wald-baum-c526ecf83548d91e3cc6.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/pages/wald-baum/my-9ad5326b22c202edee92.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/chunks/webpack-1a60b45a676da788e75b.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/css/d61294274365d2ecd9cd.css',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/css/d92d14d3de999257874b.css',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/hVGll9jLzQOe1Bm72E8OA/_buildManifest.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/hVGll9jLzQOe1Bm72E8OA/_ssgManifest.js',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-all-200-normal.8bfae380869f70eaecbe5886fb1b3ba5.woff',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-all-400-normal.5facca8710643c3862f1acad2be778cd.woff',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-all-600-normal.a47c92dd9d2e0b9c0de5a0cc7cc0237f.woff',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-all-800-normal.fb3ea153a739135d14898ce7336c17ae.woff',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-cyrillic-200-normal.ea753312fd08bf15e07bc1ef78cd01ff.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-cyrillic-400-normal.0aa7873c17034618e2c70c8cca02d103.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-cyrillic-600-normal.205f1963e8bbe843462c7aed76f1a21a.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-cyrillic-800-normal.6fc13b1aac2c729a5bb1539f4c692359.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-cyrillic-ext-200-normal.e357bb7d27d261a052100a46105c6ee3.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-cyrillic-ext-400-normal.e974cce7928dffb2fd31d9e62eeef113.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-cyrillic-ext-600-normal.38937735c3934555ec7bf266950d1617.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-cyrillic-ext-800-normal.1601e5b9f6edfc8147f9e636d3a46750.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-latin-200-normal.f2adcc191fee9d44549f265f957dbc83.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-latin-400-normal.39a18f443d434999b89b5cb4d3f34688.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-latin-600-normal.2f2e5f4d35c28e3974964b569d6bb212.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-latin-800-normal.e56152ca4b815efe5b49524b7af9763b.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-latin-ext-200-normal.5cb2dabcaba6ec401b3ad4a2577375f8.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-latin-ext-400-normal.f513a9ecadcc6a969826145f9613b66b.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-latin-ext-600-normal.c53b79bc3a7df4453261ca91cecba331.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-latin-ext-800-normal.de05408a9abb5742f2ff41594d7eabe2.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-vietnamese-200-normal.c9053bf390f17e198abd9fc2064c0c19.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-vietnamese-400-normal.8afa535b2cc0cccf030662e76998992f.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-vietnamese-600-normal.a29716a3845be2f42b1728ea19d17a4e.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        {
          url: '/_next/static/media/nunito-vietnamese-800-normal.b5e5ac7d7c47bbd3bbc43381c98e6bbc.woff2',
          revision: 'hVGll9jLzQOe1Bm72E8OA'
        },
        { url: '/favicon.ico', revision: '21b739d43fcb9bbb83d8541fe4fe88fa' },
        {
          url: '/images/kds-icon-mobility.png',
          revision: 'b915ce28cb7737c543a7dda545241315'
        },
        {
          url: '/images/kds-icon-nutrition.png',
          revision: '746ba3d9dec10f785ae4c8f8aa6d2308'
        },
        {
          url: '/images/kds-icon-paper.png',
          revision: '35a9cbcf0e2279f8d631ca1ede2efe86'
        },
        {
          url: '/images/kds-icon-tree.png',
          revision: '336ff5ef8a66767a62227c1ff50dc8cd'
        },
        {
          url: '/images/mobility.png',
          revision: '73949d523f20e6e8bf574d1ef43c1f4c'
        },
        {
          url: '/images/nutrition.png',
          revision: '57c7368cad353a66c07eb0f42cf93249'
        },
        {
          url: '/images/paper.png',
          revision: '6694ec2eebb464dd45084d2f859f23f6'
        },
        {
          url: '/images/tree-marker.svg',
          revision: '5c1c5286a80d80b79f0c0e82c22e48ad'
        },
        {
          url: '/images/undraw_Tree_swing_646s.svg',
          revision: '262ceccf0c9f483c88972732e3dc5e27'
        },
        {
          url: '/images/undraw_book_lover_mkck.svg',
          revision: '8ac9c07935dd277e1374ebf404ea64b4'
        },
        {
          url: '/images/undraw_breakfast_psiw.svg',
          revision: 'e669dac1dc6606f900fe0529fa116559'
        },
        {
          url: '/images/undraw_diet_ghvw.svg',
          revision: '5686c319a5838f029d2e26ee07729948'
        },
        {
          url: '/images/undraw_not_found_60pq.svg',
          revision: '8c3d2a79d2974762d90310ec87bec6e6'
        },
        {
          url: '/images/undraw_scooter_aia8.svg',
          revision: '69d28c576d44f4e7ba0d102852e23a3a'
        },
        {
          url: '/images/undraw_server_down_s4lk.svg',
          revision: '3098f2c47c1daf29152c5eb8db7ee9e3'
        },
        {
          url: '/images/undraw_starry_window_ppm0.svg',
          revision: '7646f2a4b74fbbb2e0d39ccdf1a4a22b'
        },
        {
          url: '/images/undraw_studying_s3l7.svg',
          revision: 'fb4a709b954b191de5da13a6637e764e'
        },
        {
          url: '/images/undraw_team_work_k80m.svg',
          revision: '9d2568a4e21d0ffd00a277749c42961f'
        },
        { url: '/manifest.json', revision: '96bc99994c4ce0bc63d142dec0e014f7' },
        { url: '/vercel.svg', revision: '4b4f1876502eb6721764637fe5c41702' }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: i
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers
                  })
                : s
          }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })
        ]
      }),
      'GET'
    );
});
