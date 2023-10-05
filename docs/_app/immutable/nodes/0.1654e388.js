import{S as u,i as _,s as f,C as h,k as p,q as g,a as k,D as S,l as v,m as $,r as E,h as d,c as b,E as m,b as y,F as L,G as w,H as j,g as C,d as M}from"../chunks/index.33dbc0d8.js";const q=!0,z=Object.freeze(Object.defineProperty({__proto__:null,prerender:q},Symbol.toStringTag,{value:"Module"}));function O(o){let a,c,l,s;const r=o[1].default,t=h(r,o,o[0],null);return{c(){a=p("script"),c=g(`if (document) {
      let mode = localStorage.theme || 'light'
      if (mode === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
      }
    }`),l=k(),t&&t.c()},l(e){const n=S("svelte-bjnlvt",document.head);a=v(n,"SCRIPT",{});var i=$(a);c=E(i,`if (document) {
      let mode = localStorage.theme || 'light'
      if (mode === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
      }
    }`),i.forEach(d),n.forEach(d),l=b(e),t&&t.l(e)},m(e,n){m(document.head,a),m(a,c),y(e,l,n),t&&t.m(e,n),s=!0},p(e,[n]){t&&t.p&&(!s||n&1)&&L(t,r,e,e[0],s?j(r,e[0],n,null):w(e[0]),null)},i(e){s||(C(t,e),s=!0)},o(e){M(t,e),s=!1},d(e){d(a),e&&d(l),t&&t.d(e)}}}function P(o,a,c){let{$$slots:l={},$$scope:s}=a;return o.$$set=r=>{"$$scope"in r&&c(0,s=r.$$scope)},[s,l]}class D extends u{constructor(a){super(),_(this,a,P,O,f,{})}}export{D as component,z as universal};
