// Copyright (c) 2022 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import t from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-boolean@esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-copy@esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-read-only-property@esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-read-only-accessor@esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-max@esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-sqrt@esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-roundn@esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@esm/index.mjs";import f from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-dists-t-quantile@esm/index.mjs";import h from"https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@esm/index.mjs";import p from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-number@esm/index.mjs";import j from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-string@esm/index.mjs";import v from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nan@esm/index.mjs";import c from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-assert-is-positive-zero@esm/index.mjs";import u from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-assert-is-negative-zero@esm/index.mjs";import b from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-assert-is-nan@esm/index.mjs";import g from"https://cdn.jsdelivr.net/gh/stdlib-js/constants-float64-pinf@esm/index.mjs";import x from"https://cdn.jsdelivr.net/gh/stdlib-js/constants-float64-ninf@esm/index.mjs";var w=t,y=e,T=p.isPrimitive,E=j.isPrimitive,N=m,k=v;var P=function(t,e){if(!y(e))return new TypeError(N("0dt2h",e));if(w(e,"alpha")){if(t.alpha=e.alpha,!T(t.alpha)||k(t.alpha))return new TypeError(N("0dt8h","alpha",t.alpha));if(t.alpha<0||t.alpha>1)return new RangeError(N("invalid option. `%s` option must be on the interval: [0, 1]. Option: `%f`.","alpha",t.alpha))}return w(e,"alternative")&&(t.alternative=e.alternative,!E(t.alternative))?new TypeError(N("0dt2i","alternative",t.alternative)):null},A={alpha:.05,alternative:"two-sided",digits:4,decision:!0},R=c,q=u,z=b,D=g,V=x;var F=function(t,e,i){var s,r,n;return s=D,r=V,n=0,function(a,l){var o,d,m;if(z(a))n=e,s=a,r=a;else if(n<e)n+=1,(a<s||a===s&&q(a))&&(s=a),(a>r||a===r&&R(a))&&(r=a);else if(i[l]===s&&a>s||i[l]===r&&a<r||z(i[l])){for(s=a,r=a,m=0;m<e;m++)if(m!==l){if(d=i[m],z(d)){s=d,r=d;break}(d<s||d===s&&q(d))&&(s=d),(d>r||d===r&&R(d))&&(r=d)}}else if(a<s)s=a;else if(a>r)r=a;else if(0===a){if(o=q(a),a===s)if(i[l]===s&&q(i[l])&&!1===o){for(s=a,m=0;m<e;m++)if(m!==l&&q(i[m])){s=i[m];break}}else o&&(s=a);if(a===r)if(i[l]===r&&R(i[l])&&o){for(r=a,m=0;m<e;m++)if(m!==l&&R(i[m])){r=i[m];break}}else!1===o&&(r=a)}return t[0]=s,t[1]=r,t}},G=b,K=o;var O=function(t,e,i){var s,r,n,a,l,o;return o=e-1,n=0,a=0,l=0,function(d,m){var f,h;if(G(d))l=e,a=NaN,n=NaN;else{if(l<e)return n+=(s=d-a)*(d-(a+=s/(l+=1))),t[0]=a,t[1]=1===l?0:K(n/(l-1)),t;if(1===l)return a=d,n=0,t[0]=d,t[1]=0,t;if(G(i[m])){for(l=1,a=d,n=0,f=0;f<e;f++)if(f!==m){if(h=i[f],G(h)){l=e,a=NaN,n=NaN;break}n+=(s=h-a)*(h-(a+=s/(l+=1)))}}else!1===G(n)&&(r=i[m],n+=(s=d-r)*(r-a+(d-(a+=s/e))))}return t[0]=a,t[1]=K(n/o),t}},B=t,C=e,H=i.isPrimitive,I=s.isPrimitive,J=r,L=n,M=a,Q=l,S=o,U=d,W=m,X=f,Y=h,Z=P,$=A,_=F,tt=O;var et=function(t){var e,i,s,r,n,a,l,o,d,m,f,h,p,j,v;if(!H(t))throw new TypeError(W("0dtAD",t));if(t<3)throw new RangeError(W("0dtAE",t));if(r=J($),arguments.length>1&&(n=Z(r,arguments[1])))throw n;return a=new Y(t),h=t-2,f=0,j=0,p=0,v=-1,l="min"===r.alternative||"max"===r.alternative?r.alpha/t:r.alpha/(2*t),m=X(1-l,h),f=(t-1)*m/S(t*(h+m*m)),s=_(o=[0,0],t,a),e=tt(d=[0,0],t,a),M(i={},"rejected",u),L(i,"alpha",r.alpha),L(i,"criticalValue",f),M(i,"statistic",b),L(i,"df",h),M(i,"mean",g),M(i,"sd",x),M(i,"min",w),M(i,"max",y),L(i,"alt",r.alternative),L(i,"method","Grubbs' Test"),L(i,"print",T),c;function c(n){var l;return 0===arguments.length?p<t?null:i:(p+=1,e(n,v=(v+1)%t),s(n,v),a[v]=n,p<t?null:("min"===r.alternative?j=(d[0]-o[0])/d[1]:"max"===r.alternative?j=(o[1]-d[0])/d[1]:(l=Q(d[0]-o[0],o[1]-d[0]),j=l/d[1]),i))}function u(){return j>f}function b(){return j}function g(){return d[0]}function x(){return d[1]}function w(){return o[0]}function y(){return o[1]}function T(t){var e,s,n;if(s=r.digits,e=r.decision,arguments.length>0){if(!C(t))throw new TypeError(W("0dt4K",t));if(B(t,"digits")){if(!H(t.digits))throw new TypeError(W("0dt3b","digits",t.digits));s=t.digits}if(B(t,"decision")){if(!I(t.decision))throw new TypeError(W("0dt30","decision",t.decision));e=t.decision}}return n="",n+=i.method,n+="\n\n",n+="Alternative hypothesis: ","max"===r.alternative?n+="The maximum value ("+o[1]+") is an outlier":"min"===r.alternative?n+="The minimum value ("+o[0]+") is an outlier":(n+="The ",d[0]-o[0]>o[1]-d[0]?n+="minimum value ("+o[0]+")":n+="maximum value ("+o[1]+")",n+=" is an outlier"),n+="\n\n",n+="    criticalValue: "+U(f,-s)+"\n",n+="    statistic: "+U(j,-s)+"\n",n+="    df: "+h+"\n",n+="\n",e&&(n+="Test Decision: ",n+=j>f?"Reject null in favor of alternative at "+100*r.alpha+"% significance level":"Fail to reject null in favor of alternative at "+100*r.alpha+"% significance level",n+="\n"),n}},it=et;export{it as default};
//# sourceMappingURL=index.mjs.map
