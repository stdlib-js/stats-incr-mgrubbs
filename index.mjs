// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import e from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@v0.2.2-esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@v0.2.2-esm/index.mjs";import{isPrimitive as i}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@v0.2.2-esm/index.mjs";import{isPrimitive as s}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-boolean@v0.2.2-esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-read-only-property@v0.2.2-esm/index.mjs";import n from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-read-only-accessor@v0.2.2-esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-max@v0.3.0-esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-sqrt@v0.2.2-esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-roundn@v0.2.2-esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.2.2-esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-base-dists-t-quantile@v0.2.1-esm/index.mjs";import f from"https://cdn.jsdelivr.net/gh/stdlib-js/array-float64@v0.2.2-esm/index.mjs";import{isPrimitive as h}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-number@v0.2.2-esm/index.mjs";import{isPrimitive as p}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-string@v0.2.2-esm/index.mjs";import v from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-nan@v0.2.2-esm/index.mjs";import c from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-assert-is-positive-zero@v0.2.2-esm/index.mjs";import j from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-assert-is-negative-zero@v0.2.2-esm/index.mjs";import u from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-assert-is-nan@v0.2.2-esm/index.mjs";import g from"https://cdn.jsdelivr.net/gh/stdlib-js/constants-float64-pinf@v0.2.2-esm/index.mjs";import b from"https://cdn.jsdelivr.net/gh/stdlib-js/constants-float64-ninf@v0.2.2-esm/index.mjs";function x(x){var w,y,T,z,E,H,N,P,k,R,V,q,D,A;if(!i(x))throw new TypeError(m("1Hz9b",x));if(x<3)throw new RangeError(m("1Hz9c",x));if(z={alpha:.05,alternative:"two-sided",digits:4,decision:!0},arguments.length>1&&(E=function(i,s){if(!t(s))return new TypeError(m("1Hz2V",s));if(e(s,"alpha")){if(i.alpha=s.alpha,!h(i.alpha)||v(i.alpha))return new TypeError(m("1Hz8P","alpha",i.alpha));if(i.alpha<0||i.alpha>1)return new RangeError(m("1HzDZ","alpha",i.alpha))}return e(s,"alternative")&&(i.alternative=s.alternative,!p(i.alternative))?new TypeError(m("1Hz2W","alternative",i.alternative)):null}(z,arguments[1]),E))throw E;return H=new f(x),0,D=0,q=0,A=-1,k=d(1-("min"===z.alternative||"max"===z.alternative?z.alpha/x:z.alpha/(2*x)),V=x-2),R=(x-1)*k/l(x*(V+k*k)),T=function(e,t,i){var s,r,n;return s=g,r=b,n=0,function(a,l){var o,m,d;if(u(a))n=t,s=a,r=a;else if(n<t)n+=1,(a<s||a===s&&j(a))&&(s=a),(a>r||a===r&&c(a))&&(r=a);else if(i[l]===s&&a>s||i[l]===r&&a<r||u(i[l])){for(s=a,r=a,d=0;d<t;d++)if(d!==l){if(m=i[d],u(m)){s=m,r=m;break}(m<s||m===s&&j(m))&&(s=m),(m>r||m===r&&c(m))&&(r=m)}}else if(a<s)s=a;else if(a>r)r=a;else if(0===a){if(o=j(a),a===s)if(i[l]===s&&j(i[l])&&!1===o){for(s=a,d=0;d<t;d++)if(d!==l&&j(i[d])){s=i[d];break}}else o&&(s=a);if(a===r)if(i[l]===r&&c(i[l])&&o){for(r=a,d=0;d<t;d++)if(d!==l&&c(i[d])){r=i[d];break}}else!1===o&&(r=a)}return e[0]=s,e[1]=r,e}}(N=[0,0],x,H),w=function(e,t,i){var s,r,n,a,o,m;return m=t-1,n=0,a=0,o=0,function(d,f){var h,p;if(u(d))o=t,a=NaN,n=NaN;else{if(o<t)return n+=(s=d-a)*(d-(a+=s/(o+=1))),e[0]=a,e[1]=1===o?0:l(n/(o-1)),e;if(1===o)return a=d,n=0,e[0]=d,e[1]=0,e;if(u(i[f])){for(o=1,a=d,n=0,h=0;h<t;h++)if(h!==f){if(p=i[h],u(p)){o=t,a=NaN,n=NaN;break}n+=(s=p-a)*(p-(a+=s/(o+=1)))}}else!1===u(n)&&(r=i[f],n+=(s=d-r)*(r-a+(d-(a+=s/t))))}return e[0]=a,e[1]=l(n/m),e}}(P=[0,0],x,H),n(y={},"rejected",(function(){return D>R})),r(y,"alpha",z.alpha),r(y,"criticalValue",R),n(y,"statistic",(function(){return D})),r(y,"df",V),n(y,"mean",(function(){return P[0]})),n(y,"sd",(function(){return P[1]})),n(y,"min",(function(){return N[0]})),n(y,"max",(function(){return N[1]})),r(y,"alt",z.alternative),r(y,"method","Grubbs' Test"),r(y,"print",(function(r){var n,a,l;if(a=z.digits,n=z.decision,arguments.length>0){if(!t(r))throw new TypeError(m("1Hz47",r));if(e(r,"digits")){if(!i(r.digits))throw new TypeError(m("1Hz3P","digits",r.digits));a=r.digits}if(e(r,"decision")){if(!s(r.decision))throw new TypeError(m("1Hz2o","decision",r.decision));n=r.decision}}l="",l+=y.method,l+="\n\n",l+="Alternative hypothesis: ","max"===z.alternative?l+="The maximum value ("+N[1]+") is an outlier":"min"===z.alternative?l+="The minimum value ("+N[0]+") is an outlier":(l+="The ",l+=P[0]-N[0]>N[1]-P[0]?"minimum value ("+N[0]+")":"maximum value ("+N[1]+")",l+=" is an outlier");l+="\n\n",l+="    criticalValue: "+o(R,-a)+"\n",l+="    statistic: "+o(D,-a)+"\n",l+="    df: "+V+"\n",l+="\n",n&&(l+="Test Decision: ",l+=D>R?"Reject null in favor of alternative at "+100*z.alpha+"% significance level":"Fail to reject null in favor of alternative at "+100*z.alpha+"% significance level",l+="\n");return l})),function(e){var t;if(0===arguments.length)return q<x?null:y;if(q+=1,w(e,A=(A+1)%x),T(e,A),H[A]=e,q<x)return null;"min"===z.alternative?D=(P[0]-N[0])/P[1]:"max"===z.alternative?D=(N[1]-P[0])/P[1]:(t=a(P[0]-N[0],N[1]-P[0]),D=t/P[1]);return y}}export{x as default};
//# sourceMappingURL=index.mjs.map
