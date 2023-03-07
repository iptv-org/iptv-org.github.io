import{S as u,i as f,s as h,D as _,k as p,q as g,a as k,E as S,l as $,m as E,r as v,h as d,c as L,F as m,b as w,G as b,H as y,I as q,f as C,t as I}from"../../chunks/index-44df08c7.js";function M(l){let a,r,o,s;const c=l[1].default,t=_(c,l,l[0],null);return{c(){a=p("script"),r=g(`if (document) {
      let mode = localStorage.theme || 'light'
      if (mode === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
      }
    }`),o=k(),t&&t.c()},l(e){const n=S("svelte-bjnlvt",document.head);a=$(n,"SCRIPT",{});var i=E(a);r=v(i,`if (document) {
      let mode = localStorage.theme || 'light'
      if (mode === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
      }
    }`),i.forEach(d),n.forEach(d),o=L(e),t&&t.l(e)},m(e,n){m(document.head,a),m(a,r),w(e,o,n),t&&t.m(e,n),s=!0},p(e,[n]){t&&t.p&&(!s||n&1)&&b(t,c,e,e[0],s?q(c,e[0],n,null):y(e[0]),null)},i(e){s||(C(t,e),s=!0)},o(e){I(t,e),s=!1},d(e){d(a),e&&d(o),t&&t.d(e)}}}function j(l,a,r){let{$$slots:o={},$$scope:s}=a;return l.$$set=c=>{"$$scope"in c&&r(0,s=c.$$scope)},[s,o]}class F extends u{constructor(a){super(),f(this,a,j,M,h,{})}}export{F as default};
