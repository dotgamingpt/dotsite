const cacheName = 'dotcache';
const staticAssets = [
    '../',
    '../index.html',
    '../about.html',
    '../calendariocsgo.html',
    '../calendariofifa.html',
    '../calendariolol.html',
    '../calendarioracing.html',
    '../calendariorl.html',
    '../contacto.html',
    '../cudgspring.html',
    '../cudgwinter.html',
    '../efadu.html',
    '../interpascoa.html',
    '../interverao.html',
    '../news.html',
    '../sponsors.html',
    '../team.html',
    '../manifest.webmanifest',
    '../css/style.css',
    '../css/owl.carousel.min.css',
    '../css/meanmenu.min.css',
    '../css/flaticon.css',
    '../css/fancybox.min.css',
    '../css/boxicons.min.css',
    '../css/bootstrap.min.css',
    '../css/animate.min.css',
    './ajaxchimp.min.js',
    './bootstrap.min.js',
    './classificationcudgspring.js',
    './classificationcudgwinter.js',
    './classificationinterpascoa.js',
    './classificationinterverao.js',
    './contact-form-script.js',
    './cursor.min.js',
    './fancybox.min.js',
    './form-validator.min.js',
    './isotope.pkgd.min.js',
    './jquery.min.js',
    './magnific-popup.min.js',
    './main.js',
    './meanmenu.min.js',
    './owl.carousel.min.js',
    './parallax.min.js',
    './pdfobject.min.js',
    './popper.min.js',
    './wow.min.js',
]

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', e => {
    self.clients.claim();
});

self.addEventListener('fetch', async e =>{
    const req = e.request;
    const url = new URL(req.url);

    if(url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(newtorkAndCache(req));
    }
});

async function cacheFirst(req){
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req){
    const cache = await caches.open(cacheName);
    try{
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch(e){
        const cached = await cache.match(req);
        return cached;
    }
}