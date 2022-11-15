const cacheName = 'dotcache';
const staticAssets = [
    './',
    './index.html',
    './about.html',
    './calendariocsgo.html',
    './calendariofifa.html',
    './calendariolol.html',
    './calendarioracing.html',
    './calendariorl.html',
    './contact.html',
    './cudgspring.html',
    './cudgwinter.html',
    './efadu.html',
    './interpascoa.html',
    './interverao.html',
    './news.html',
    './sponsors.html',
    './team.html',
    './img/CSbracket.png',
    './img/CStt.png',
    './img/csuni.jpg',
    './img/LOLbracket.png',
    './img/LOLtt.png',
    './img/loluni.jpg',
    './img/ROCKETbracket.png',
    './img/siteFIFA.png',
    './img/About/banner-img4.jpg',
    './img/About/experts-bg.jpg',
    './img/About/experts-img.jpg',
    './img/About/featured-games-img.jpg',
    './img/About/footer-map.png',
    './img/About/history-bg.jpg',
    './img/About/main-banner-bg5.jpg',
    './img/calendario/Circuito Tormenta.png',
    './img/calendario/DLP.png',
    './img/calendario/Evolution League.png',
    './img/calendario/exeedme.png',
    './img/calendario/GGPT.png',
    './img/calendario/Innovation.png',
    './img/calendario/Interescolas.png',
    './img/calendario/Liga Promessa.png',
    './img/calendario/LPLOL.png',
    './img/calendario/PTRL L1.png',
    './img/calendario/PTRL L2.png',
    './img/calendario/PTRL L3.png',
    './img/calendario/PTRL L4.png',
    './img/calendario/PTRL XBOX.png',
    './img/calendario/PTRL.png',
    './img/calendario/Retake Takeoff.png',
    './img/calendario/RTP Arena Cup.png',
    './img/calendario/Zebra League.png',
    './img/Equipas/aaue.png',
    './img/Equipas/aefct.png',
    './img/Equipas/asiscap.png',
    './img/Equipas/ColCal.png',
    './img/Equipas/ESPAA.png',
    './img/Equipas/Vagos.png',
    './img/Equipas/Viriato.png',
    './img/Home/aaue3.png',
    './img/Home/aefct1.png',
    './img/Home/aeiscap2.png',
    './img/Home/cudg.png',
    './img/Home/efadu.png',
    './img/Home/efadu.jpg',
    './img/Home/espaa3.png',
    './img/Home/interescolas.png',
    './img/Home/vagos1.png',
    './img/Home/viriato2.png',
    './img/logos/csgologo.png',
    './img/logos/emblema_cs_Prancheta 1.png',
    './img/logos/emblema_lol_Prancheta 1.png',
    './img/logos/emblema_novo2-01.png',
    './img/logos/emblema_novo2_cs-01.png',
    './img/logos/emblema_rocketleague_Prancheta 1.png',
    './img/logos/emblemaCs.png',
    './img/logos/emblemaFifa.png',
    './img/logos/emblemaLol.png',
    './img/logos/rocketlogo.png',
    './img/logos/lollogo.png',
    './img/Sponsors/adv1 sem fundo.png',
    './img/Sponsors/agc white.png',
    './img/Sponsors/apes - logotipo white.png',
    './img/Sponsors/Caretos.png',
    './img/Sponsors/CSManager.png',
    './img/Sponsors/egn.png',
    './img/Sponsors/esportzy.png',
    './img/Sponsors/fate walkers.png',
    './img/Sponsors/ign.png',
    './img/Sponsors/ipdj-1.png',
    './img/Sponsors/logitech.png',
    './img/Sponsors/Logo_NA_White.png',
    './img/Sponsors/ptts3.png',
    './img/Sponsors/rtp arena.png',
    './img/Sponsors/solverde sem margem.png',
    './img/Team/acaraje.jpg',
    './img/Team/angonz.jpg',
    './img/Team/bitten.jpg',
    './img/Team/bruno.jpg',
    './img/Team/dred.jpg',
    './img/Team/hugo.jpg',
    './img/Team/joaocruz.jpg',
    './img/Team/nuno.jpg',
    './img/Team/pipoca.jpg',
    './img/Team/saeken.jpg',
    './img/Team/syon.jpg',
    './img/Team/zemo.jpg',
    './img/Team/zubb.jpg',
    './css/style.css',
    './css/owl.carousel.min.css',
    './css/meanmenu.min.css',
    './css/flaticon.css',
    './css/fancybox.min.css',
    './css/boxicons.min.css',
    './css/bootstrap.min.css',
    './css/animate.min.css',
    './js/ajaxchimp.min.js',
    './js/bootstrap.min.js',
    './js/classificationcudgspring.js',
    './js/classificationcudgwinter.js',
    './js/classificationinterpascoa.js',
    './js/classificationinterverao.js',
    './js/contact-form-script.js',
    './js/cursor.min.js',
    './js/fancybox.min.js',
    './js/form-validator.min.js',
    './js/isotope.pkgd.min.js',
    './js/jquery.min.js',
    './js/magnific-popup.min.js',
    './js/main.js',
    './js/meanmenu.min.js',
    './js/owl.carousel.min.js',
    './js/parallax.min.js',
    './js/pdfobject.min.js',
    './js/popper.min.js',
    './js/wow.min.js',
    './manifest.webmanifest'
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
        e.respondWith(networkAndCache(req));
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