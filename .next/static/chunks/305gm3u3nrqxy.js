(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,18581,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"useMergedRef",{enumerable:!0,get:function(){return r}});let n=e.r(71645);function r(e,t){let a=(0,n.useRef)(null),r=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=a.current;e&&(a.current=null,e());let t=r.current;t&&(r.current=null,t())}else e&&(a.current=o(e,n)),t&&(r.current=o(t,n))},[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let a=e(t);return"function"==typeof a?a:()=>e(null)}}("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},95057,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={formatUrl:function(){return l},formatWithValidation:function(){return d},urlObjectKeys:function(){return s}};for(var r in n)Object.defineProperty(a,r,{enumerable:!0,get:n[r]});let o=e.r(90809)._(e.r(98183)),i=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:a}=e,n=e.protocol||"",r=e.pathname||"",l=e.hash||"",s=e.query||"",d=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?d=t+e.host:a&&(d=t+(~a.indexOf(":")?`[${a}]`:a),e.port&&(d+=":"+e.port)),s&&"object"==typeof s&&(s=String(o.urlQueryToSearchParams(s)));let u=e.search||s&&`?${s}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||i.test(n))&&!1!==d?(d="//"+(d||""),r&&"/"!==r[0]&&(r="/"+r)):d||(d=""),l&&"#"!==l[0]&&(l="#"+l),u&&"?"!==u[0]&&(u="?"+u),r=r.replace(/[?#]/g,encodeURIComponent),u=u.replace("#","%23"),`${n}${d}${r}${u}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function d(e){return l(e)}},73668,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"isLocalURL",{enumerable:!0,get:function(){return o}});let n=e.r(18967),r=e.r(52817);function o(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),a=new URL(e,t);return a.origin===t&&(0,r.hasBasePath)(a.pathname)}catch(e){return!1}}},84508,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={default:function(){return g},useLinkStatus:function(){return b}};for(var r in n)Object.defineProperty(a,r,{enumerable:!0,get:n[r]});let o=e.r(90809),i=e.r(43476),l=o._(e.r(71645)),s=e.r(95057),d=e.r(8372),u=e.r(18581),c=e.r(18967),f=e.r(5550);e.r(33525);let p=e.r(88540),m=e.r(91949),h=e.r(73668),_=e.r(9396);function g(t){var a,n;let r,o,g,[b,v]=(0,l.useOptimistic)(m.IDLE_LINK_STATUS),y=(0,l.useRef)(null),{href:j,as:N,children:w,prefetch:P=null,passHref:C,replace:D,shallow:k,scroll:S,onClick:I,onMouseEnter:O,onTouchStart:E,legacyBehavior:L=!1,onNavigate:R,transitionTypes:T,ref:q,unstable_dynamicOnHover:B,...A}=t;r=w,L&&("string"==typeof r||"number"==typeof r)&&(r=(0,i.jsx)("a",{children:r}));let $=l.default.useContext(d.AppRouterContext),M=!1!==P,z=!1!==P?null===(n=P)||"auto"===n?_.FetchStrategy.PPR:_.FetchStrategy.Full:_.FetchStrategy.PPR,W="string"==typeof(a=N||j)?a:(0,s.formatUrl)(a);if(L){if(r?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});o=l.default.Children.only(r)}let X=L?o&&"object"==typeof o&&o.ref:q,U=l.default.useCallback(e=>(null!==$&&(y.current=(0,m.mountLinkInstance)(e,W,$,z,M,v)),()=>{y.current&&((0,m.unmountLinkForCurrentNavigation)(y.current),y.current=null),(0,m.unmountPrefetchableInstance)(e)}),[M,W,$,z,v]),H={ref:(0,u.useMergedRef)(U,X),onClick(t){L||"function"!=typeof I||I(t),L&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(t),!$||t.defaultPrevented||function(t,a,n,r,o,i,s){if("u">typeof window){let d,{nodeName:u}=t.currentTarget;if("A"===u.toUpperCase()&&((d=t.currentTarget.getAttribute("target"))&&"_self"!==d||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(a)){r&&(t.preventDefault(),location.replace(a));return}if(t.preventDefault(),i){let e=!1;if(i({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:c}=e.r(99781);l.default.startTransition(()=>{c(a,r?"replace":"push",!1===o?p.ScrollBehavior.NoScroll:p.ScrollBehavior.Default,n.current,s)})}}(t,W,y,D,S,R,T)},onMouseEnter(e){L||"function"!=typeof O||O(e),L&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),$&&M&&(0,m.onNavigationIntent)(e.currentTarget,!0===B)},onTouchStart:function(e){L||"function"!=typeof E||E(e),L&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),$&&M&&(0,m.onNavigationIntent)(e.currentTarget,!0===B)}};return(0,c.isAbsoluteUrl)(W)?H.href=W:L&&!C&&("a"!==o.type||"href"in o.props)||(H.href=(0,f.addBasePath)(W)),g=L?l.default.cloneElement(o,H):(0,i.jsx)("a",{...A,...H,children:r}),(0,i.jsx)(x.Provider,{value:b,children:g})}e.r(84508);let x=(0,l.createContext)(m.IDLE_LINK_STATUS),b=()=>(0,l.useContext)(x);("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},88143,(e,t,a)=>{"use strict";function n({widthInt:e,heightInt:t,blurWidth:a,blurHeight:r,blurDataURL:o,objectFit:i}){let l=a?40*a:e,s=r?40*r:t,d=l&&s?`viewBox='0 0 ${l} ${s}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${d}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${d?"none":"contain"===i?"xMidYMid":"cover"===i?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${o}'/%3E%3C/svg%3E`}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImageBlurSvg",{enumerable:!0,get:function(){return n}})},87690,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={VALID_LOADERS:function(){return o},imageConfigDefault:function(){return i}};for(var r in n)Object.defineProperty(a,r,{enumerable:!0,get:n[r]});let o=["default","imgix","cloudinary","akamai","custom"],i={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},8927,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImgProps",{enumerable:!0,get:function(){return d}}),e.r(33525);let n=e.r(43369),r=e.r(88143),o=e.r(87690),i=["-moz-initial","fill","none","scale-down",void 0];function l(e){return void 0!==e.default}function s(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function d({src:e,sizes:t,unoptimized:a=!1,priority:u=!1,preload:c=!1,loading:f,className:p,quality:m,width:h,height:_,fill:g=!1,style:x,overrideSrc:b,onLoad:v,onLoadingComplete:y,placeholder:j="empty",blurDataURL:N,fetchPriority:w,decoding:P="async",layout:C,objectFit:D,objectPosition:k,lazyBoundary:S,lazyRoot:I,...O},E){var L;let R,T,q,{imgConf:B,showAltText:A,blurComplete:$,defaultLoader:M}=E,z=B||o.imageConfigDefault;if("allSizes"in z)R=z;else{let e=[...z.deviceSizes,...z.imageSizes].sort((e,t)=>e-t),t=z.deviceSizes.sort((e,t)=>e-t),a=z.qualities?.sort((e,t)=>e-t);R={...z,allSizes:e,deviceSizes:t,qualities:a}}if(void 0===M)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let W=O.loader||M;delete O.loader,delete O.srcSet;let X="__next_img_default"in W;if(X){if("custom"===R.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=W;W=t=>{let{config:a,...n}=t;return e(n)}}if(C){"fill"===C&&(g=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[C];e&&(x={...x,...e});let a={responsive:"100vw",fill:"100vw"}[C];a&&!t&&(t=a)}let U="",H=s(h),F=s(_);if((L=e)&&"object"==typeof L&&(l(L)||void 0!==L.src)){let t=l(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(T=t.blurWidth,q=t.blurHeight,N=N||t.blurDataURL,U=t.src,!g)if(H||F){if(H&&!F){let e=H/t.width;F=Math.round(t.height*e)}else if(!H&&F){let e=F/t.height;H=Math.round(t.width*e)}}else H=t.width,F=t.height}let G=!u&&!c&&("lazy"===f||void 0===f);(!(e="string"==typeof e?e:U)||e.startsWith("data:")||e.startsWith("blob:"))&&(a=!0,G=!1),R.unoptimized&&(a=!0),X&&!R.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(a=!0);let V=s(m),K=Object.assign(g?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:D,objectPosition:k}:{},A?{}:{color:"transparent"},x),Y=$||"empty"===j?null:"blur"===j?`url("data:image/svg+xml;charset=utf-8,${(0,r.getImageBlurSvg)({widthInt:H,heightInt:F,blurWidth:T,blurHeight:q,blurDataURL:N||"",objectFit:K.objectFit})}")`:`url("${j}")`,Q=i.includes(K.objectFit)?"fill"===K.objectFit?"100% 100%":"cover":K.objectFit,J=Y?{backgroundSize:Q,backgroundPosition:K.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:Y}:{},Z=function({config:e,src:t,unoptimized:a,width:r,quality:o,sizes:i,loader:l}){if(a){if(t.startsWith("/")&&!t.startsWith("//")){let e=(0,n.getDeploymentId)();if(e){let a=t.indexOf("?");if(-1!==a){let n=new URLSearchParams(t.slice(a+1));n.get("dpl")||(n.append("dpl",e),t=t.slice(0,a)+"?"+n.toString())}else t+=`?dpl=${e}`}}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:s,kind:d}=function({deviceSizes:e,allSizes:t},a,n){if(n){let a=/(^|\s)(1?\d?\d)vw/g,r=[];for(let e;e=a.exec(n);)r.push(parseInt(e[2]));if(r.length){let a=.01*Math.min(...r);return{widths:t.filter(t=>t>=e[0]*a),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof a?{widths:e,kind:"w"}:{widths:[...new Set([a,2*a].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,r,i),u=s.length-1;return{sizes:i||"w"!==d?i:"100vw",srcSet:s.map((a,n)=>`${l({config:e,src:t,quality:o,width:a})} ${"w"===d?a:n+1}${d}`).join(", "),src:l({config:e,src:t,quality:o,width:s[u]})}}({config:R,src:e,unoptimized:a,width:H,quality:V,sizes:t,loader:W}),ee=G?"lazy":f;return{props:{...O,loading:ee,fetchPriority:w,width:H,height:F,decoding:P,className:p,style:{...K,...J},sizes:Z.sizes,srcSet:Z.srcSet,src:b||Z.src},meta:{unoptimized:a,preload:c||u,placeholder:j,fill:g}}}},98879,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return l}});let n=e.r(71645),r="u"<typeof window,o=r?()=>{}:n.useLayoutEffect,i=r?()=>{}:n.useEffect;function l(e){let{headManager:t,reduceComponentsToState:a}=e;function l(){if(t&&t.mountedInstances){let e=n.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(a(e))}}return r&&(t?.mountedInstances?.add(e.children),l()),o(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),o(()=>(t&&(t._pendingUpdate=l),()=>{t&&(t._pendingUpdate=l)})),i(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={default:function(){return h},defaultHead:function(){return c}};for(var r in n)Object.defineProperty(a,r,{enumerable:!0,get:n[r]});let o=e.r(55682),i=e.r(90809),l=e.r(43476),s=i._(e.r(71645)),d=o._(e.r(98879)),u=e.r(42732);function c(){return[(0,l.jsx)("meta",{charSet:"utf-8"},"charset"),(0,l.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function f(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===s.default.Fragment?e.concat(s.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let p=["name","httpEquiv","charSet","itemProp"];function m(e){let t,a,n,r;return e.reduce(f,[]).reverse().concat(c().reverse()).filter((t=new Set,a=new Set,n=new Set,r={},e=>{let o=!0,i=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){i=!0;let a=e.key.slice(e.key.indexOf("$")+1);t.has(a)?o=!1:t.add(a)}switch(e.type){case"title":case"base":a.has(e.type)?o=!1:a.add(e.type);break;case"meta":for(let t=0,a=p.length;t<a;t++){let a=p[t];if(e.props.hasOwnProperty(a))if("charSet"===a)n.has(a)?o=!1:n.add(a);else{let t=e.props[a],n=r[a]||new Set;("name"!==a||!i)&&n.has(t)?o=!1:(n.add(t),r[a]=n)}}}return o})).reverse().map((e,t)=>{let a=e.key||t;return s.default.cloneElement(e,{key:a})})}let h=function({children:e}){let t=(0,s.useContext)(u.HeadManagerContext);return(0,l.jsx)(d.default,{reduceComponentsToState:m,headManager:t,children:e})};("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},18556,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"ImageConfigContext",{enumerable:!0,get:function(){return o}});let n=e.r(55682)._(e.r(71645)),r=e.r(87690),o=n.default.createContext(r.imageConfigDefault)},65856,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"RouterContext",{enumerable:!0,get:function(){return n}});let n=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,a)=>{"use strict";function n(e,t){let a=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-a)<Math.abs(e-a)?t:e,t.qualities[0]):a}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"findClosestQuality",{enumerable:!0,get:function(){return n}})},1948,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return i}});let n=e.r(70965),r=e.r(43369);function o({config:e,src:t,width:a,quality:i}){let l=(0,r.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//")){let e=t.indexOf("?");if(-1!==e){let a=new URLSearchParams(t.slice(e+1)),n=a.get("dpl");if(n){l=n,a.delete("dpl");let r=a.toString();t=t.slice(0,e)+(r?"?"+r:"")}}}if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let s=(0,n.findClosestQuality)(i,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${a}&q=${s}${t.startsWith("/")&&l?`&dpl=${l}`:""}`}o.__next_img_default=!0;let i=o},5500,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"Image",{enumerable:!0,get:function(){return v}});let n=e.r(55682),r=e.r(90809),o=e.r(43476),i=r._(e.r(71645)),l=n._(e.r(74080)),s=n._(e.r(25633)),d=e.r(8927),u=e.r(87690),c=e.r(18556);e.r(33525);let f=e.r(65856),p=n._(e.r(1948)),m=e.r(18581),h={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function _(e,t,a,n,r,o,i){let l=e?.src;e&&e["data-loaded-src"]!==l&&(e["data-loaded-src"]=l,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&r(!0),a?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let n=!1,r=!1;a.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>n,isPropagationStopped:()=>r,persist:()=>{},preventDefault:()=>{n=!0,t.preventDefault()},stopPropagation:()=>{r=!0,t.stopPropagation()}})}n?.current&&n.current(e)}}))}function g(e){return i.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let x=(0,i.forwardRef)(({src:e,srcSet:t,sizes:a,height:n,width:r,decoding:l,className:s,style:d,fetchPriority:u,placeholder:c,loading:f,unoptimized:p,fill:h,onLoadRef:x,onLoadingCompleteRef:b,setBlurComplete:v,setShowAltText:y,sizesInput:j,onLoad:N,onError:w,...P},C)=>{let D=(0,i.useCallback)(e=>{e&&(w&&(e.src=e.src),e.complete&&_(e,c,x,b,v,p,j))},[e,c,x,b,v,w,p,j]),k=(0,m.useMergedRef)(C,D);return(0,o.jsx)("img",{...P,...g(u),loading:f,width:r,height:n,decoding:l,"data-nimg":h?"fill":"1",className:s,style:d,sizes:a,srcSet:t,src:e,ref:k,onLoad:e=>{_(e.currentTarget,c,x,b,v,p,j)},onError:e=>{y(!0),"empty"!==c&&v(!0),w&&w(e)}})});function b({isAppRouter:e,imgAttributes:t}){let a={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...g(t.fetchPriority)};return e&&l.default.preload?(l.default.preload(t.src,a),null):(0,o.jsx)(s.default,{children:(0,o.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...a},"__nimg-"+t.src+t.srcSet+t.sizes)})}let v=(0,i.forwardRef)((e,t)=>{let a=(0,i.useContext)(f.RouterContext),n=(0,i.useContext)(c.ImageConfigContext),r=(0,i.useMemo)(()=>{let e=h||n||u.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),a=e.deviceSizes.sort((e,t)=>e-t),r=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:a,qualities:r,localPatterns:"u"<typeof window?n?.localPatterns:e.localPatterns}},[n]),{onLoad:l,onLoadingComplete:s}=e,m=(0,i.useRef)(l);(0,i.useEffect)(()=>{m.current=l},[l]);let _=(0,i.useRef)(s);(0,i.useEffect)(()=>{_.current=s},[s]);let[g,v]=(0,i.useState)(!1),[y,j]=(0,i.useState)(!1),{props:N,meta:w}=(0,d.getImgProps)(e,{defaultLoader:p.default,imgConf:r,blurComplete:g,showAltText:y});return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(x,{...N,unoptimized:w.unoptimized,placeholder:w.placeholder,fill:w.fill,onLoadRef:m,onLoadingCompleteRef:_,setBlurComplete:v,setShowAltText:j,sizesInput:e.sizes,ref:t}),w.preload?(0,o.jsx)(b,{isAppRouter:!a,imgAttributes:N}):null]})});("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},94909,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={default:function(){return u},getImageProps:function(){return d}};for(var r in n)Object.defineProperty(a,r,{enumerable:!0,get:n[r]});let o=e.r(55682),i=e.r(8927),l=e.r(5500),s=o._(e.r(1948));function d(e){let{props:t}=(0,i.getImgProps)(e,{defaultLoader:s.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,a]of Object.entries(t))void 0===a&&delete t[e];return{props:t}}let u=l.Image},57688,(e,t,a)=>{t.exports=e.r(94909)},19489,e=>{e.v({admissionBtn:"Header-module__9fWxfa__admissionBtn",backdrop:"Header-module__9fWxfa__backdrop",closeButton:"Header-module__9fWxfa__closeButton",dropdown:"Header-module__9fWxfa__dropdown",dropdownArrow:"Header-module__9fWxfa__dropdownArrow",dropdownItem:"Header-module__9fWxfa__dropdownItem",dropdownMenu:"Header-module__9fWxfa__dropdownMenu",examNavLinkActive:"Header-module__9fWxfa__examNavLinkActive",faqsLink:"Header-module__9fWxfa__faqsLink",header:"Header-module__9fWxfa__header",headerContainer:"Header-module__9fWxfa__headerContainer",loginBtn:"Header-module__9fWxfa__loginBtn",logo:"Header-module__9fWxfa__logo",logoImage:"Header-module__9fWxfa__logoImage",logoText:"Header-module__9fWxfa__logoText",menuToggle:"Header-module__9fWxfa__menuToggle",nav:"Header-module__9fWxfa__nav",navLink:"Header-module__9fWxfa__navLink",navOpen:"Header-module__9fWxfa__navOpen",navbar:"Header-module__9fWxfa__navbar",navbarRightLogo:"Header-module__9fWxfa__navbarRightLogo",navbarRightLogoWrapper:"Header-module__9fWxfa__navbarRightLogoWrapper",separator:"Header-module__9fWxfa__separator",socialLink:"Header-module__9fWxfa__socialLink",socialLinks:"Header-module__9fWxfa__socialLinks",textGlow:"Header-module__9fWxfa__textGlow",topBar:"Header-module__9fWxfa__topBar",topBarContainer:"Header-module__9fWxfa__topBarContainer",topBarLeft:"Header-module__9fWxfa__topBarLeft",topBarLink:"Header-module__9fWxfa__topBarLink",topBarRight:"Header-module__9fWxfa__topBarRight",transparent:"Header-module__9fWxfa__transparent",transparentBg:"Header-module__9fWxfa__transparentBg"})},53501,e=>{"use strict";var t=e.i(43476),a=e.i(71645),n=e.i(22016),r=e.i(57688),o=e.i(18566),i=e.i(19489);e.s(["default",0,function({transparent:e=!1}){let l=(0,o.usePathname)(),s=!!l?.startsWith("/examination"),[d,u]=(0,a.useState)(!1),[c,f]=(0,a.useState)(!1),[p,m]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{if(!s)return;let e=!1;return(async()=>{try{let t=await fetch("/api/examination",{cache:"no-store"}),a=await t.json();!e&&a.success&&m(!!a.marksEntryEnabled)}catch{e||m(!1)}})(),()=>{e=!0}},[s]),(0,t.jsxs)("header",{className:`${i.default.header} ${e?i.default.transparent:""}`,children:[(0,t.jsx)("div",{className:`${i.default.topBar} ${e?i.default.transparentBg:""}`,children:(0,t.jsx)("div",{className:`container ${i.default.topBarContainer}`,children:(0,t.jsxs)("div",{className:i.default.topBarLeft,children:[(0,t.jsx)("a",{href:"#faqs",className:i.default.faqsLink,children:"FAQs"}),(0,t.jsx)("span",{className:i.default.separator,children:"|"}),(0,t.jsxs)("div",{className:i.default.socialLinks,children:[(0,t.jsx)("a",{href:"#","aria-label":"Facebook",className:i.default.socialLink,children:"Facebook"}),(0,t.jsx)("a",{href:"#","aria-label":"Instagram",className:i.default.socialLink,children:"Instagram"}),(0,t.jsx)("a",{href:"https://www.youtube.com/@NnadDhyass",target:"_blank",rel:"noopener noreferrer","aria-label":"Youtube",className:i.default.socialLink,children:"Youtube"})]})]})})}),(0,t.jsx)("div",{className:`${i.default.navbar} ${e?i.default.transparentBg:""}`,children:(0,t.jsxs)("div",{className:`container ${i.default.headerContainer}`,children:[(0,t.jsxs)(n.default,{href:"/",className:i.default.logo,children:[(0,t.jsx)(r.default,{src:"/Logo2.png",alt:"Logo",width:100,height:100,className:i.default.logoImage,priority:!0}),(0,t.jsx)("span",{className:i.default.logoText,children:"SWARGUMPHAN"})]}),(0,t.jsxs)("button",{className:i.default.menuToggle,onClick:()=>u(!d),"aria-label":"Toggle menu",children:[(0,t.jsx)("span",{}),(0,t.jsx)("span",{}),(0,t.jsx)("span",{})]}),d&&(0,t.jsx)("div",{className:i.default.backdrop,onClick:()=>u(!1)}),(0,t.jsxs)("nav",{className:`${i.default.nav} ${d?i.default.navOpen:""}`,children:[(0,t.jsx)("button",{className:i.default.closeButton,onClick:()=>u(!1),"aria-label":"Close menu",children:"×"}),s?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.default,{href:"/",className:i.default.navLink,onClick:()=>u(!1),children:"Home"}),(0,t.jsx)(n.default,{href:"/examination",className:`${i.default.navLink} ${"/examination"===l?i.default.examNavLinkActive:""}`,onClick:()=>u(!1),children:"Notice"}),p&&(0,t.jsx)(n.default,{href:"/examination/marks-entry",className:`${i.default.navLink} ${"/examination/marks-entry"===l?i.default.examNavLinkActive:""}`,onClick:()=>u(!1),children:"Marks Entry"}),(0,t.jsx)(n.default,{href:"/examination/exam-admin",className:`${i.default.navLink} ${l?.startsWith("/examination/exam-admin")?i.default.examNavLinkActive:""}`,onClick:()=>u(!1),children:"Exam_Admin"})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.default,{href:"/",className:i.default.navLink,onClick:()=>u(!1),children:"Home"}),(0,t.jsxs)("div",{className:i.default.dropdown,onMouseEnter:()=>f(!0),onMouseLeave:()=>f(!1),children:[(0,t.jsxs)("a",{href:"#courses",className:i.default.navLink,onClick:()=>f(!c),children:["Courses",(0,t.jsx)("span",{className:i.default.dropdownArrow,children:"▼"})]}),c&&(0,t.jsxs)("div",{className:i.default.dropdownMenu,children:[(0,t.jsx)("a",{href:"#online-courses",className:i.default.dropdownItem,onClick:()=>u(!1),children:"Online Courses"}),(0,t.jsx)("a",{href:"#offline-courses",className:i.default.dropdownItem,onClick:()=>u(!1),children:"Offline Courses"})]})]}),(0,t.jsx)("a",{href:"#events",className:i.default.navLink,onClick:()=>u(!1),children:"Events"}),(0,t.jsx)(n.default,{href:"/donation",className:i.default.navLink,onClick:()=>u(!1),children:"Donation"}),(0,t.jsx)(n.default,{href:"/examination",className:i.default.navLink,onClick:()=>u(!1),children:"Examination"}),(0,t.jsx)(n.default,{href:"/gallery",className:i.default.navLink,onClick:()=>u(!1),children:"Gallery"}),(0,t.jsx)("a",{href:"#about",className:i.default.navLink,onClick:()=>u(!1),children:"About"}),(0,t.jsx)(n.default,{href:"/register",className:i.default.admissionBtn,onClick:()=>u(!1),children:"Take Admission 🪈"}),(0,t.jsx)(n.default,{href:"/student/login",className:i.default.loginBtn,onClick:()=>u(!1),children:"Login 🎵"}),(0,t.jsx)(n.default,{href:"/",className:i.default.navbarRightLogoWrapper,children:(0,t.jsx)(r.default,{src:"/nad_dhyas.png",alt:"Nad Dhyas Logo",width:75,height:75,className:i.default.navbarRightLogo,priority:!0})})]})]})]})})]})}])},15090,e=>{e.v({address:"Donation-module__aa0PXq__address",backButton:"Donation-module__aa0PXq__backButton",container:"Donation-module__aa0PXq__container",downloadButton:"Donation-module__aa0PXq__downloadButton",form:"Donation-module__aa0PXq__form",formActions:"Donation-module__aa0PXq__formActions",formCard:"Donation-module__aa0PXq__formCard",formGroup:"Donation-module__aa0PXq__formGroup",formRow:"Donation-module__aa0PXq__formRow",formSection:"Donation-module__aa0PXq__formSection",header:"Donation-module__aa0PXq__header",headerLeft:"Donation-module__aa0PXq__headerLeft",headerRight:"Donation-module__aa0PXq__headerRight",helpText:"Donation-module__aa0PXq__helpText",homeButton:"Donation-module__aa0PXq__homeButton",input:"Donation-module__aa0PXq__input",label:"Donation-module__aa0PXq__label",main:"Donation-module__aa0PXq__main",receiptInfo:"Donation-module__aa0PXq__receiptInfo",receiptLabel:"Donation-module__aa0PXq__receiptLabel",receiptNo:"Donation-module__aa0PXq__receiptNo",receiptTitle:"Donation-module__aa0PXq__receiptTitle",receiptValue:"Donation-module__aa0PXq__receiptValue",resetButton:"Donation-module__aa0PXq__resetButton",sectionTitle:"Donation-module__aa0PXq__sectionTitle",submitButton:"Donation-module__aa0PXq__submitButton",successActions:"Donation-module__aa0PXq__successActions",successCard:"Donation-module__aa0PXq__successCard",successIcon:"Donation-module__aa0PXq__successIcon",successMessage:"Donation-module__aa0PXq__successMessage",successNote:"Donation-module__aa0PXq__successNote",successTitle:"Donation-module__aa0PXq__successTitle",textarea:"Donation-module__aa0PXq__textarea",title:"Donation-module__aa0PXq__title",upiContainer:"Donation-module__aa0PXq__upiContainer",upiId:"Donation-module__aa0PXq__upiId",upiIdContainer:"Donation-module__aa0PXq__upiIdContainer",upiIdLabel:"Donation-module__aa0PXq__upiIdLabel",upiImage:"Donation-module__aa0PXq__upiImage",upiText:"Donation-module__aa0PXq__upiText"})},46235,e=>{"use strict";var t=e.i(43476),a=e.i(71645),n=e.i(57688),r=e.i(22016),o=e.i(53501),i=e.i(15090);e.s(["default",0,function(){let[e,l]=(0,a.useState)("ND-001"),[s,d]=(0,a.useState)(!1),[u,c]=(0,a.useState)(""),[f,p]=(0,a.useState)(null),[m,h]=(0,a.useState)({userUpiId:"",donatedBy:"",streetAddress:"",city:"",state:"",zip:"",dateOfDonation:"",donationValue:"",description:"",taxId:""});(0,a.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/donation/receipt-no");if(e.ok){let t=await e.json();l(t.receiptNo||"ND-001")}else l("ND-001")}catch(e){console.error("Error fetching receipt number:",e),l("ND-001")}})()},[]);let _=e=>{let{name:t,value:a}=e.target;h(e=>({...e,[t]:a}))},g=async t=>{t.preventDefault();try{let t=await fetch("/api/donate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({receiptNo:e,...m})}),a=await t.json();if(t.ok&&a.success){let t={receiptNo:a.receiptNo||e,...m};p(t),c(a.receiptNo||e),d(!0),h({userUpiId:"",donatedBy:"",streetAddress:"",city:"",state:"",zip:"",dateOfDonation:"",donationValue:"",description:"",taxId:""})}else alert(`Donation submission failed: ${a.error||"Unknown error"}`)}catch(t){console.error("Error submitting donation:",t);let e=t instanceof Error?t.message:"Unknown error";e.includes("fetch failed")||e.includes("ECONNREFUSED")?alert("Cannot connect to server. Please ensure the backend server is running on http://localhost:3001"):alert(`An error occurred while submitting the donation: ${e}. Please try again.`)}};return s?(0,t.jsxs)("main",{className:i.default.main,children:[(0,t.jsx)(o.default,{}),(0,t.jsx)("div",{className:i.default.container,children:(0,t.jsxs)("div",{className:i.default.successCard,children:[(0,t.jsx)("div",{className:i.default.successIcon,children:"✓"}),(0,t.jsx)("h1",{className:i.default.successTitle,children:"Donation Successful!"}),(0,t.jsx)("p",{className:i.default.successMessage,children:"Thank you for your generous donation to Naad Dhyas Foundation."}),(0,t.jsxs)("div",{className:i.default.receiptInfo,children:[(0,t.jsx)("p",{className:i.default.receiptLabel,children:"Receipt Number:"}),(0,t.jsx)("p",{className:i.default.receiptValue,children:u})]}),(0,t.jsx)("p",{className:i.default.successNote,children:"Your donation has been recorded successfully. A receipt has been generated for your records."}),(0,t.jsxs)("div",{className:i.default.successActions,children:[(0,t.jsx)("button",{onClick:()=>{if(!f)return;let e=window.open("","_blank");if(!e)return;let t=new Date(f.dateOfDonation).toLocaleDateString("en-IN",{year:"numeric",month:"long",day:"numeric"});e.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Donation Receipt - ${f.receiptNo}</title>
                <style>
                    @media print {
                        @page { 
                            margin: 8mm;
                            size: A4;
                        }
                        body { 
                            margin: 0;
                            padding: 0;
                        }
                        .no-print { display: none; }
                        * {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                    }
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        color: #000;
                        background: white;
                        font-size: 14px;
                        line-height: 1.6;
                    }
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        border-bottom: 2px solid #800000;
                        padding-bottom: 20px;
                        margin-bottom: 30px;
                    }
                    .header-left {
                        text-align: left;
                    }
                    .header-left h1 {
                        color: #800000;
                        margin: 0 0 8px 0;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .header-left p {
                        margin: 4px 0;
                        font-size: 14px;
                        color: #333;
                    }
                    .header-right {
                        text-align: right;
                    }
                    .header-right h2 {
                        color: #800000;
                        margin: 0 0 10px 0;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .header-right p {
                        margin: 5px 0;
                        font-size: 14px;
                        color: #333;
                    }
                    .info-section {
                        margin-bottom: 30px;
                    }
                    .info-section h3 {
                        color: #800000;
                        border-bottom: 1px solid #ddd;
                        padding-bottom: 8px;
                        margin-bottom: 15px;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    .info-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 15px;
                        margin-bottom: 20px;
                    }
                    .info-item {
                        margin-bottom: 10px;
                    }
                    .info-item label {
                        font-weight: bold;
                        color: #333;
                        display: block;
                        margin-bottom: 4px;
                    }
                    .info-item span {
                        color: #555;
                    }
                    .donation-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 30px 0;
                    }
                    .donation-table thead {
                        background: #800000;
                        color: white;
                    }
                    .donation-table th {
                        padding: 12px;
                        text-align: left;
                        font-weight: 600;
                    }
                    .donation-table td {
                        padding: 12px;
                        border-bottom: 1px solid #ddd;
                    }
                    .donation-table tfoot td {
                        font-weight: bold;
                        font-size: 18px;
                        padding: 15px 12px;
                        background: #f9f9f9;
                    }
                    .amount-cell {
                        text-align: right;
                        color: #800000;
                        font-weight: bold;
                        font-size: 18px;
                    }
                    .footer {
                        margin-top: 50px;
                        text-align: center;
                        color: #777;
                        font-size: 12px;
                        border-top: 1px solid #ddd;
                        padding-top: 20px;
                    }
                    .footer p {
                        margin: 5px 0;
                    }
                    .no-print {
                        text-align: center;
                        margin-top: 30px;
                    }
                    .no-print button {
                        padding: 12px 24px;
                        background: #800000;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-size: 16px;
                        cursor: pointer;
                        margin: 0 10px;
                    }
                    .no-print button:hover {
                        background: #990000;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="header-left">
                        <h1>Naad Dhyas Foundation</h1>
                        <p>At post Deravan</p>
                        <p>Tal : Patan , Dist : Satara</p>
                    </div>
                    <div class="header-right">
                        <h2>Donation Receipt</h2>
                        <p><strong>Receipt No:</strong> ${f.receiptNo}</p>
                        <p><strong>Date:</strong> ${t}</p>
                    </div>
                </div>

                <div class="info-section">
                    <h3>Donor Information</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Donated By:</label>
                            <span>${f.donatedBy}</span>
                        </div>
                        <div class="info-item">
                            <label>User UPI ID:</label>
                            <span>${f.userUpiId}</span>
                        </div>
                        <div class="info-item">
                            <label>Street Address:</label>
                            <span>${f.streetAddress}</span>
                        </div>
                        <div class="info-item">
                            <label>City:</label>
                            <span>${f.city}</span>
                        </div>
                        <div class="info-item">
                            <label>State:</label>
                            <span>${f.state}</span>
                        </div>
                        <div class="info-item">
                            <label>Zip Code:</label>
                            <span>${f.zip}</span>
                        </div>
                    </div>
                </div>

                <table class="donation-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th style="text-align: right;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div><strong>Donation</strong></div>
                                <div style="font-size: 13px; color: #666; margin-top: 5px;">
                                    ${f.description}
                                </div>
                            </td>
                            <td class="amount-cell">₹${parseFloat(f.donationValue).toLocaleString("en-IN")}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td style="text-align: right;"><strong>Total Donation:</strong></td>
                            <td class="amount-cell">₹${parseFloat(f.donationValue).toLocaleString("en-IN")}</td>
                        </tr>
                    </tfoot>
                </table>

                <div class="footer">
                    <p>Thank you for your generous donation to Naad Dhyas Foundation.</p>
                    <p>This is a computer generated receipt and does not require a signature.</p>
                </div>

                <div class="no-print">
                    <button onclick="window.print()">Print / Download PDF</button>
                    <button onclick="window.close()">Close</button>
                </div>

                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                        }, 250);
                    };
                </script>
            </body>
            </html>
        `),e.document.close()},className:i.default.downloadButton,children:"📄 Download Receipt"}),(0,t.jsx)("button",{onClick:()=>{d(!1),fetch("/api/donation/receipt-no").then(e=>e.json()).then(e=>l(e.receiptNo||"ND-001")).catch(()=>l("ND-001"))},className:i.default.backButton,children:"Back to Donation"}),(0,t.jsx)(r.default,{href:"/",className:i.default.homeButton,children:"Visit Home Page"})]})]})})]}):(0,t.jsxs)("main",{className:i.default.main,children:[(0,t.jsx)(o.default,{}),(0,t.jsx)("div",{className:i.default.container,children:(0,t.jsxs)("div",{className:i.default.formCard,children:[(0,t.jsxs)("div",{className:i.default.header,children:[(0,t.jsxs)("div",{className:i.default.headerLeft,children:[(0,t.jsx)("h1",{className:i.default.title,children:"Naad Dhyas Foundation"}),(0,t.jsx)("p",{className:i.default.address,children:"At post Deravan"}),(0,t.jsx)("p",{className:i.default.address,children:"Tal : Patan , Dist : Satara"})]}),(0,t.jsx)("div",{className:i.default.headerRight,children:(0,t.jsx)("h2",{className:i.default.receiptTitle,children:"Donation Receipt"})})]}),(0,t.jsxs)("form",{onSubmit:g,className:i.default.form,children:[(0,t.jsxs)("div",{className:i.default.formSection,children:[(0,t.jsx)("h3",{className:i.default.sectionTitle,children:"Donor Information"}),(0,t.jsxs)("div",{className:i.default.upiContainer,children:[(0,t.jsx)(n.default,{src:"/UPI.png",alt:"UPI Payment QR Code",width:250,height:250,className:i.default.upiImage,priority:!0}),(0,t.jsxs)("div",{className:i.default.upiIdContainer,children:[(0,t.jsx)("p",{className:i.default.upiIdLabel,children:"UPI ID:"}),(0,t.jsx)("p",{className:i.default.upiId,children:"krdmr011246011@yesbank"})]}),(0,t.jsx)("p",{className:i.default.upiText,children:"Scan to make payment via UPI"})]}),(0,t.jsxs)("div",{className:i.default.formGroup,children:[(0,t.jsx)("label",{className:i.default.label,children:"User UPI ID: *"}),(0,t.jsx)("input",{type:"text",name:"userUpiId",value:m.userUpiId,onChange:_,className:i.default.input,required:!0,placeholder:"Enter your UPI ID (e.g., yourname@paytm)"})]}),(0,t.jsxs)("div",{className:i.default.formGroup,children:[(0,t.jsx)("label",{className:i.default.label,children:"Donated By: *"}),(0,t.jsx)("input",{type:"text",name:"donatedBy",value:m.donatedBy,onChange:_,className:i.default.input,required:!0,placeholder:"Enter donor name"})]}),(0,t.jsxs)("div",{className:i.default.formGroup,children:[(0,t.jsx)("label",{className:i.default.label,children:"Street Address: *"}),(0,t.jsx)("input",{type:"text",name:"streetAddress",value:m.streetAddress,onChange:_,className:i.default.input,required:!0,placeholder:"Enter street address"})]}),(0,t.jsxs)("div",{className:i.default.formRow,children:[(0,t.jsxs)("div",{className:i.default.formGroup,children:[(0,t.jsx)("label",{className:i.default.label,children:"City: *"}),(0,t.jsx)("input",{type:"text",name:"city",value:m.city,onChange:_,className:i.default.input,required:!0,placeholder:"Enter city"})]}),(0,t.jsxs)("div",{className:i.default.formGroup,children:[(0,t.jsx)("label",{className:i.default.label,children:"State: *"}),(0,t.jsx)("input",{type:"text",name:"state",value:m.state,onChange:_,className:i.default.input,required:!0,placeholder:"Enter state"})]}),(0,t.jsxs)("div",{className:i.default.formGroup,children:[(0,t.jsx)("label",{className:i.default.label,children:"Zip: *"}),(0,t.jsx)("input",{type:"text",name:"zip",value:m.zip,onChange:_,className:i.default.input,required:!0,placeholder:"Enter zip code",pattern:"[0-9]{6}",maxLength:6})]})]}),(0,t.jsxs)("div",{className:i.default.formGroup,children:[(0,t.jsx)("label",{className:i.default.label,children:"Date of Donation: *"}),(0,t.jsx)("input",{type:"date",name:"dateOfDonation",value:m.dateOfDonation,onChange:_,className:i.default.input,required:!0})]}),(0,t.jsxs)("div",{className:i.default.formGroup,children:[(0,t.jsx)("label",{className:i.default.label,children:"Donation Value: *"}),(0,t.jsx)("input",{type:"number",name:"donationValue",value:m.donationValue,onChange:_,className:i.default.input,required:!0,placeholder:"Enter donation amount (₹)",min:"1",step:"0.01"})]}),(0,t.jsxs)("div",{className:i.default.formGroup,children:[(0,t.jsx)("label",{className:i.default.label,children:"Description of Donation: *"}),(0,t.jsx)("textarea",{name:"description",value:m.description,onChange:_,className:i.default.textarea,required:!0,placeholder:"Enter description of donation",rows:4})]}),(0,t.jsxs)("div",{className:i.default.formGroup,children:[(0,t.jsx)("label",{className:i.default.label,children:"Tax ID Field:"}),(0,t.jsx)("input",{type:"text",name:"taxId",value:m.taxId,onChange:_,className:i.default.input,disabled:!0,placeholder:"Tax ID (will be enabled later)"}),(0,t.jsx)("p",{className:i.default.helpText,children:"This field is currently disabled and will be enabled later"})]})]}),(0,t.jsxs)("div",{className:i.default.formActions,children:[(0,t.jsx)("button",{type:"submit",className:i.default.submitButton,children:"Submit Donation"}),(0,t.jsx)("button",{type:"button",className:i.default.resetButton,onClick:()=>{h({userUpiId:"",donatedBy:"",streetAddress:"",city:"",state:"",zip:"",dateOfDonation:"",donationValue:"",description:"",taxId:""})},children:"Reset Form"})]})]})]})})]})}])}]);