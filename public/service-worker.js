if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return a[e]||(c=new Promise(async c=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=c}else importScripts(e),c()})),c.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},c=(c,a)=>{Promise.all(c.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(c)};self.define=(c,i,n)=>{a[c]||(a[c]=Promise.resolve().then(()=>{let a={};const f={uri:location.origin+c.slice(1)};return Promise.all(i.map(c=>{switch(c){case"exports":return a;case"module":return f;default:return e(c)}})).then(e=>{const c=n(...e);return a.default||(a.default=c),a})}))}}define("./service-worker.js",["./workbox-df8cbb17"],(function(e){"use strict";e.setCacheNameDetails({prefix:"chat-app"}),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"css/2.b547bef4.css",revision:"12ee9490220377d7cf88d1e1fd27c748"},{url:"css/3.9aac9c88.css",revision:"c117b23288da1c4311a4eeb7af841ddb"},{url:"css/app.465dc8e7.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"css/vendor.70e36db9.css",revision:"76b4fa8398d636f0882fa709e276b036"},{url:"favicon.ico",revision:"30af09d1958a6d06e308db71ad51a0a8"},{url:"fonts/KFOkCnqEu92Fr1MmgVxIIzQ.a45108d3.woff",revision:"5cb7edfceb233100075dc9a1e12e8da3"},{url:"fonts/KFOlCnqEu92Fr1MmEU9fBBc-.cea99d3e.woff",revision:"87284894879f5b1c229cb49c8ff6decc"},{url:"fonts/KFOlCnqEu92Fr1MmSU5fBBc-.865f928c.woff",revision:"b00849e00f4c2331cddd8ffb44a6720b"},{url:"fonts/KFOlCnqEu92Fr1MmWUlfBBc-.2267169e.woff",revision:"adcde98f1d584de52060ad7b16373da3"},{url:"fonts/KFOlCnqEu92Fr1MmYUtfBBc-.bac8362e.woff",revision:"bb1e4dc6333675d11ada2e857e7f95d7"},{url:"fonts/KFOmCnqEu92Fr1Mu4mxM.49ae34d4.woff",revision:"60fa3c0614b8fb2f394fa29944c21540"},{url:"fonts/fa-brands-400.64295e33.woff",revision:"5734d789b25228cbafc64a58ae971aca"},{url:"fonts/fa-brands-400.6bc193d6.woff2",revision:"91a23e8bf2b4b84c39311cb5eb23aaa0"},{url:"fonts/fa-regular-400.5a071ce2.woff",revision:"d44ad00c44e46fd29f6126fa7d888cde"},{url:"fonts/fa-regular-400.75761b3a.woff2",revision:"5c674c9216c06ede2f618aa58ae71116"},{url:"fonts/fa-solid-900.792bbe12.woff2",revision:"412a43d6840addd683665ec12c30f810"},{url:"fonts/fa-solid-900.f89ad185.woff",revision:"f3a7d3b5880544a91e9a7e6f8f35d4d2"},{url:"fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.0cd122a9.woff",revision:"3e818a94fbf09bb3f988bf070952b382"},{url:"fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.2987c5cc.woff2",revision:"945837e0b4566b601ce571159eb59e07"},{url:"icons/apple-icon-120x120.png",revision:"3a5add37ca848a13ef6d9116364d8bec"},{url:"icons/apple-icon-152x152.png",revision:"113f62ade59c88cbfcbff0708e0a38ce"},{url:"icons/apple-icon-167x167.png",revision:"85ee23b4c8e1ac0b814ae7ee186895ea"},{url:"icons/apple-icon-180x180.png",revision:"dcf2ebc468e09d69cbe395dd518b6729"},{url:"icons/apple-launch-1125x2436.png",revision:"a3487ee34bd97d3aabc36a68a0491dcd"},{url:"icons/apple-launch-1242x2208.png",revision:"da19f3bd629b34a749c4eeb0ab428037"},{url:"icons/apple-launch-1242x2688.png",revision:"7f46d80bec79b104eed80e7ec5a8db29"},{url:"icons/apple-launch-1536x2048.png",revision:"977fa8a56ac41f61a2a9becc1df27af1"},{url:"icons/apple-launch-1668x2224.png",revision:"12c11ba755a1e9419e44559254d3618d"},{url:"icons/apple-launch-1668x2388.png",revision:"269e82459726b23fbe65467ba2fff932"},{url:"icons/apple-launch-2048x2732.png",revision:"06985cbd28a769eee0ad0dbb287b170a"},{url:"icons/apple-launch-640x1136.png",revision:"f2262d64bf907a22e0c42e567642cb54"},{url:"icons/apple-launch-750x1334.png",revision:"60832403624a9c67f938e7329502fa8a"},{url:"icons/apple-launch-828x1792.png",revision:"b77f5b7671abb3eb69865b50a4647a18"},{url:"icons/favicon-128x128.png",revision:"441ec8e62346e43eed2dae5f50e1c216"},{url:"icons/favicon-16x16.png",revision:"853a058e47300ea1ce642b4eb7537190"},{url:"icons/favicon-32x32.png",revision:"1fb89a57fb67d86b44131e6af16da4df"},{url:"icons/favicon-96x96.png",revision:"dac78ec04da1425671a7441205c35ee4"},{url:"icons/icon-128x128.png",revision:"441ec8e62346e43eed2dae5f50e1c216"},{url:"icons/icon-192x192.png",revision:"79e5aa98cc727fbdd0d546542ac953c1"},{url:"icons/icon-256x256.png",revision:"a36f679c7329f98d31cc1cb69761971c"},{url:"icons/icon-384x384.png",revision:"e102230aa18c2d4909ea344d3995edfc"},{url:"icons/icon-512x512.png",revision:"1262497c0750f60117b8778d68575e6f"},{url:"icons/ms-icon-144x144.png",revision:"72b770e5262c122ec652d1769c238768"},{url:"icons/safari-pinned-tab.svg",revision:"eedb2e85849a51ba6f4f9a8d9e0f7bf9"},{url:"img/Linth-crop.03147f2c.png",revision:"24334b686a5a07154d7a069d09f435a3"},{url:"img/Linth.fe344e83.png",revision:"4faf303fbf4dcbb5879c85b152ba9942"},{url:"img/logo.2085aeb0.png",revision:"961065831b28498313c2453dce33a9ad"},{url:"index.html",revision:"ec163740d6337153eaac68df4f51ef73"},{url:"js/10.f072be5c.js",revision:"611ef22a25e20c00f559667ed1907bb6"},{url:"js/2.a48eff3c.js",revision:"60ee597d9e4841ea5522386c23d1ae74"},{url:"js/3.7a41909a.js",revision:"02ce04a48426cd95a9dbdcef1666bbbb"},{url:"js/4.c258782c.js",revision:"b501f5d68a4c48a30f54fbbcfde4aa49"},{url:"js/5.aa117411.js",revision:"64161df0a149bdccef3bd8970ded7bcf"},{url:"js/6.642a8c9d.js",revision:"537b678b57f0b5eedceb557ab6bee63c"},{url:"js/7.82d7ac23.js",revision:"2b6b874ce0849b8fd377ddbcf3e69ed0"},{url:"js/8.f6a7bb33.js",revision:"d4782b9e2cf158132ce0cfb8933adb8d"},{url:"js/9.ce32dcaf.js",revision:"c567bfefd491baccca728cba0636857c"},{url:"js/app.8a3905a3.js",revision:"f72b18294c3ce5441d37357cc07dd326"},{url:"js/vendor.b803e7f6.js",revision:"f4fbcb7a674d2092eb794eda3f9b9d55"},{url:"manifest.json",revision:"5e4a04f1331ce70183c4a4e5808d2a31"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
