import{S as u,i as f,s as _,C as p,k as h,q as k,a as S,D as g,l as $,m as v,r as C,h as d,c as E,E as m,b as y,F as b,G as L,H as w,g as M,d as j}from"../chunks/index.4a72436c.js";const q=!0,O=!0,P=!1,F=Object.freeze(Object.defineProperty({__proto__:null,csr:O,prerender:q,ssr:P},Symbol.toStringTag,{value:"Module"}));function T(a){let s,l,o,r;const c=a[1].default,t=p(c,a,a[0],null);return{c(){s=h("script"),l=k(`if (document) {\r
      const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches\r
        ? 'dark'\r
        : 'light'\r
      const mode = localStorage.theme || prefersColorScheme\r
      if (mode === 'dark') {\r
        document.documentElement.classList.add('dark')\r
      } else {\r
        document.documentElement.classList.remove('dark')\r
      }\r
    }`),o=S(),t&&t.c()},l(e){const n=g("svelte-43tisa",document.head);s=$(n,"SCRIPT",{});var i=v(s);l=C(i,`if (document) {\r
      const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches\r
        ? 'dark'\r
        : 'light'\r
      const mode = localStorage.theme || prefersColorScheme\r
      if (mode === 'dark') {\r
        document.documentElement.classList.add('dark')\r
      } else {\r
        document.documentElement.classList.remove('dark')\r
      }\r
    }`),i.forEach(d),n.forEach(d),o=E(e),t&&t.l(e)},m(e,n){m(document.head,s),m(s,l),y(e,o,n),t&&t.m(e,n),r=!0},p(e,[n]){t&&t.p&&(!r||n&1)&&b(t,c,e,e[0],r?w(c,e[0],n,null):L(e[0]),null)},i(e){r||(M(t,e),r=!0)},o(e){j(t,e),r=!1},d(e){d(s),e&&d(o),t&&t.d(e)}}}function z(a,s,l){let{$$slots:o={},$$scope:r}=s;return a.$$set=c=>{"$$scope"in c&&l(0,r=c.$$scope)},[r,o]}class G extends u{constructor(s){super(),f(this,s,z,T,_,{})}}export{G as component,F as universal};
