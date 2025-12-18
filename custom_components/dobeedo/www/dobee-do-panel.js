(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var bt;const F=globalThis,W=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),et=new WeakMap;let st=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(W&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=et.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&et.set(e,t))}return t}toString(){return this.cssText}};const ft=s=>new st(typeof s=="string"?s:s+"",void 0,V),yt=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((o,i,r)=>o+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[r+1],s[0]);return new st(e,s,V)},vt=(s,t)=>{if(W)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const o=document.createElement("style"),i=F.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=e.cssText,s.appendChild(o)}},ot=W?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return ft(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:kt,defineProperty:xt,getOwnPropertyDescriptor:$t,getOwnPropertyNames:wt,getOwnPropertySymbols:Tt,getPrototypeOf:At}=Object,k=globalThis,it=k.trustedTypes,Dt=it?it.emptyScript:"",J=k.reactiveElementPolyfillSupport,B=(s,t)=>s,j={toAttribute(s,t){switch(t){case Boolean:s=s?Dt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},K=(s,t)=>!kt(s,t),rt={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),k.litPropertyMetadata??(k.litPropertyMetadata=new WeakMap);let C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=rt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);i!==void 0&&xt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:r}=$t(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:i,set(a){const d=i==null?void 0:i.call(this);r==null||r.call(this,a),this.requestUpdate(t,d,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??rt}static _$Ei(){if(this.hasOwnProperty(B("elementProperties")))return;const t=At(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(B("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(B("properties"))){const e=this.properties,o=[...wt(e),...Tt(e)];for(const i of o)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[o,i]of e)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[e,o]of this.elementProperties){const i=this._$Eu(e,o);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const i of o)e.unshift(ot(i))}else t!==void 0&&e.push(ot(t));return e}static _$Eu(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var o;return(o=e.hostConnected)==null?void 0:o.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var o;return(o=e.hostDisconnected)==null?void 0:o.call(e)})}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){var r;const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(i!==void 0&&o.reflect===!0){const a=(((r=o.converter)==null?void 0:r.toAttribute)!==void 0?o.converter:j).toAttribute(e,o.type);this._$Em=t,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){var r,a;const o=this.constructor,i=o._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const d=o.getPropertyOptions(i),n=typeof d.converter=="function"?{fromAttribute:d.converter}:((r=d.converter)==null?void 0:r.fromAttribute)!==void 0?d.converter:j;this._$Em=i;const l=n.fromAttribute(e,d.type);this[i]=l??((a=this._$Ej)==null?void 0:a.get(i))??l,this._$Em=null}}requestUpdate(t,e,o){var i;if(t!==void 0){const r=this.constructor,a=this[t];if(o??(o=r.getPropertyOptions(t)),!((o.hasChanged??K)(a,e)||o.useDefault&&o.reflect&&a===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(r._$Eu(t,o))))return;this.C(t,e,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:r},a){o&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??e??this[t]),r!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,a]of i){const{wrapped:d}=a,n=this[r];d!==!0||this._$AL.has(r)||n===void 0||this.C(r,void 0,a,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(o=this._$EO)==null||o.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(o=>{var i;return(i=o.hostUpdated)==null?void 0:i.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[B("elementProperties")]=new Map,C[B("finalized")]=new Map,J==null||J({ReactiveElement:C}),(k.reactiveElementVersions??(k.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,q=P.trustedTypes,at=q?q.createPolicy("lit-html",{createHTML:s=>s}):void 0,nt="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,dt="?"+x,Et=`<${dt}>`,w=document,M=()=>w.createComment(""),N=s=>s===null||typeof s!="object"&&typeof s!="function",Z=Array.isArray,Ct=s=>Z(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",G=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lt=/-->/g,ct=/>/g,T=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ht=/'/g,pt=/"/g,ut=/^(?:script|style|textarea|title)$/i,It=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),g=It(1),I=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),_t=new WeakMap,A=w.createTreeWalker(w,129);function gt(s,t){if(!Z(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return at!==void 0?at.createHTML(t):t}const St=(s,t)=>{const e=s.length-1,o=[];let i,r=t===2?"<svg>":t===3?"<math>":"",a=O;for(let d=0;d<e;d++){const n=s[d];let l,h,c=-1,m=0;for(;m<n.length&&(a.lastIndex=m,h=a.exec(n),h!==null);)m=a.lastIndex,a===O?h[1]==="!--"?a=lt:h[1]!==void 0?a=ct:h[2]!==void 0?(ut.test(h[2])&&(i=RegExp("</"+h[2],"g")),a=T):h[3]!==void 0&&(a=T):a===T?h[0]===">"?(a=i??O,c=-1):h[1]===void 0?c=-2:(c=a.lastIndex-h[2].length,l=h[1],a=h[3]===void 0?T:h[3]==='"'?pt:ht):a===pt||a===ht?a=T:a===lt||a===ct?a=O:(a=T,i=void 0);const y=a===T&&s[d+1].startsWith("/>")?" ":"";r+=a===O?n+Et:c>=0?(o.push(l),n.slice(0,c)+nt+n.slice(c)+x+y):n+x+(c===-2?d:y)}return[gt(s,r+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]};class U{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let r=0,a=0;const d=t.length-1,n=this.parts,[l,h]=St(t,e);if(this.el=U.createElement(l,o),A.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=A.nextNode())!==null&&n.length<d;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(nt)){const m=h[a++],y=i.getAttribute(c).split(x),v=/([.?@])?(.*)/.exec(m);n.push({type:1,index:r,name:v[2],strings:y,ctor:v[1]==="."?Pt:v[1]==="?"?Mt:v[1]==="@"?Nt:Y}),i.removeAttribute(c)}else c.startsWith(x)&&(n.push({type:6,index:r}),i.removeAttribute(c));if(ut.test(i.tagName)){const c=i.textContent.split(x),m=c.length-1;if(m>0){i.textContent=q?q.emptyScript:"";for(let y=0;y<m;y++)i.append(c[y],M()),A.nextNode(),n.push({type:2,index:++r});i.append(c[m],M())}}}else if(i.nodeType===8)if(i.data===dt)n.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf(x,c+1))!==-1;)n.push({type:7,index:r}),c+=x.length-1}r++}}static createElement(t,e){const o=w.createElement("template");return o.innerHTML=t,o}}function S(s,t,e=s,o){var a,d;if(t===I)return t;let i=o!==void 0?(a=e._$Co)==null?void 0:a[o]:e._$Cl;const r=N(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((d=i==null?void 0:i._$AO)==null||d.call(i,!1),r===void 0?i=void 0:(i=new r(s),i._$AT(s,e,o)),o!==void 0?(e._$Co??(e._$Co=[]))[o]=i:e._$Cl=i),i!==void 0&&(t=S(s,i._$AS(s,t.values),i,o)),t}class Bt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=((t==null?void 0:t.creationScope)??w).importNode(e,!0);A.currentNode=i;let r=A.nextNode(),a=0,d=0,n=o[0];for(;n!==void 0;){if(a===n.index){let l;n.type===2?l=new H(r,r.nextSibling,this,t):n.type===1?l=new n.ctor(r,n.name,n.strings,this,t):n.type===6&&(l=new Ot(r,this,t)),this._$AV.push(l),n=o[++d]}a!==(n==null?void 0:n.index)&&(r=A.nextNode(),a++)}return A.currentNode=w,i}p(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class H{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),N(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==I&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ct(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(w.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:o}=t,i=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=U.createElement(gt(o.h,o.h[0]),this.options)),o);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(e);else{const a=new Bt(i,this),d=a.u(this.options);a.p(e),this.T(d),this._$AH=a}}_$AC(t){let e=_t.get(t.strings);return e===void 0&&_t.set(t.strings,e=new U(t)),e}k(t){Z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const r of t)i===e.length?e.push(o=new H(this.O(M()),this.O(M()),this,this.options)):o=e[i],o._$AI(r),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,e);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,r){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=b}_$AI(t,e=this,o,i){const r=this.strings;let a=!1;if(r===void 0)t=S(this,t,e,0),a=!N(t)||t!==this._$AH&&t!==I,a&&(this._$AH=t);else{const d=t;let n,l;for(t=r[0],n=0;n<r.length-1;n++)l=S(this,d[o+n],e,n),l===I&&(l=this._$AH[n]),a||(a=!N(l)||l!==this._$AH[n]),l===b?t=b:t!==b&&(t+=(l??"")+r[n+1]),this._$AH[n]=l}a&&!i&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Pt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}}class Mt extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}}class Nt extends Y{constructor(t,e,o,i,r){super(t,e,o,i,r),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??b)===I)return;const o=this._$AH,i=t===b&&o!==b||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,r=t!==b&&(o===b||i);i&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ot{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const Q=P.litHtmlPolyfillSupport;Q==null||Q(U,H),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.1");const Ut=(s,t,e)=>{const o=(e==null?void 0:e.renderBefore)??t;let i=o._$litPart$;if(i===void 0){const r=(e==null?void 0:e.renderBefore)??null;o._$litPart$=i=new H(t.insertBefore(M(),r),r,void 0,e??{})}return i._$AI(s),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis;class R extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return I}}R._$litElement$=!0,R.finalized=!0,(bt=D.litElementHydrateSupport)==null||bt.call(D,{LitElement:R});const X=D.litElementPolyfillSupport;X==null||X({LitElement:R}),(D.litElementVersions??(D.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ht=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rt={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:K},Lt=(s=Rt,t,e)=>{const{kind:o,metadata:i}=e;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),o==="setter"&&((s=Object.create(s)).wrapped=!0),r.set(e.name,s),o==="accessor"){const{name:a}=e;return{set(d){const n=t.get.call(this);t.set.call(this,d),this.requestUpdate(a,n,s)},init(d){return d!==void 0&&this.C(a,void 0,s,d),d}}}if(o==="setter"){const{name:a}=e;return function(d){const n=this[a];t.call(this,d),this.requestUpdate(a,n,s)}}throw Error("Unsupported decorator location: "+o)};function mt(s){return(t,e)=>typeof e=="object"?Lt(s,t,e):((o,i,r)=>{const a=i.hasOwnProperty(r);return i.constructor.createProperty(r,o),a?Object.getOwnPropertyDescriptor(i,r):void 0})(s,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _(s){return mt({...s,state:!0,attribute:!1})}class f{constructor(t){this.connection=t}async getBoards(){return(await this.connection.sendMessagePromise({type:"dobeedo/get_boards"})).boards??[]}async createBoard(t,e){const o={type:"dobeedo/create_board",name:t};return e!==void 0&&(o.description=e),(await this.connection.sendMessagePromise(o)).board}async getColumns(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_columns",board_id:t})).columns??[]}async createColumn(t,e,o){return(await this.connection.sendMessagePromise({type:"dobeedo/create_column",board_id:t,name:e,order_index:o})).column}async getTasks(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_tasks",board_id:t})).tasks??[]}async createTask(t,e,o,i,r,a,d){const n={type:"dobeedo/create_task",board_id:t,column_id:e,title:o};return i!==void 0&&(n.description=i),r!==void 0&&(n.due_date=r),a!==void 0&&(n.priority=a),d!==void 0&&(n.tags=d),(await this.connection.sendMessagePromise(n)).task}async updateTask(t,e){const o={type:"dobeedo/update_task",task_id:t};return e.title!==void 0&&(o.title=e.title),e.description!==void 0&&(o.description=e.description),e.due_date!==void 0&&(o.due_date=e.due_date),e.priority!==void 0&&(o.priority=e.priority),e.tags!==void 0&&(o.tags=e.tags),(await this.connection.sendMessagePromise(o)).task}async moveTask(t,e,o){const i={type:"dobeedo/move_task",task_id:t,target_column_id:e};return o!==void 0&&(i.target_sort_index=o),(await this.connection.sendMessagePromise(i)).task}async deleteTask(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_task",task_id:t})}async deleteColumn(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_column",column_id:t})}async deleteBoard(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_board",board_id:t})}subscribeUpdates(t){const e=this.connection;if(e.subscribeEvents){console.debug("DoBeeDo: using connection.subscribeEvents for updates");const r=e.subscribeEvents(a=>{if(console.debug("DoBeeDo: raw WS message via subscribeEvents",a),typeof(a==null?void 0:a.event_type)=="string"&&a.data){const d=a.event_type;if(d.startsWith("dobeedo_")){const n=d.replace(/^dobeedo_/,"");t({event_type:n,payload:a.data,raw_type:d})}return}(a==null?void 0:a.type)==="dobeedo/event"&&a.event_type&&a.payload&&t({event_type:a.event_type,payload:a.payload,raw_type:a.raw_type})});return()=>{console.debug("DoBeeDo: unsubscribe from subscribeEvents"),r()}}if(!e.subscribeMessage)return console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available"),()=>{};const o=r=>{console.debug("DoBeeDo: raw WS message in subscribeUpdates handler",r),(r==null?void 0:r.type)==="dobeedo/event"&&r.event_type&&r.payload&&t({event_type:r.event_type,payload:r.payload,raw_type:r.raw_type})};console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");const i=e.subscribeMessage(o,{type:"dobeedo/subscribe_updates"});return()=>{console.debug("DoBeeDo: unsubscribe from subscribe_updates"),i()}}async listTodoEntities(){return(await this.connection.sendMessagePromise({type:"dobeedo/list_todo_entities"})).entities??[]}async importFromTodo(t,e,o,i){const r={type:"dobeedo/import_from_todo",entity_id:t,board_id:e,column_id:o};return i!==void 0&&(r.status_filter=i),await this.connection.sendMessagePromise(r)}async importAllTodos(t,e){const o={type:"dobeedo/import_all_todos",board_id:t};return e!==void 0&&(o.status_filter=e),await this.connection.sendMessagePromise(o)}}var zt=Object.defineProperty,Ft=Object.getOwnPropertyDescriptor,u=(s,t,e,o)=>{for(var i=o>1?void 0:o?Ft(t,e):t,r=s.length-1,a;r>=0;r--)(a=s[r])&&(i=(o?a(t,e,i):a(i))||i);return o&&i&&zt(t,e,i),i};let p=class extends R{constructor(){super(...arguments),this._boards=[],this._tasks=[],this._columns=[],this._loading=!1,this._newTaskTitles={},this._newTaskDescriptions={},this._newTaskDueDates={},this._newTaskPriorities={},this._newTaskTags={},this._newColumnName="",this._newBoardName="",this._isAddingBoard=!1,this._unsubscribeUpdates=null,this._selectedBoardId=null,this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate="",this._editTaskPriority="",this._editTaskTags="",this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null,this._touchDragging=!1,this._touchStartY=0,this._touchCurrentY=0,this._importingColumnId=null,this._todoEntities=[],this._selectedTodoEntity=null,this._importStatusFilter="",this._boundTouchMove=null,this._boundTouchEnd=null}static get styles(){return yt`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 24px;
        background: var(--primary-background-color);
        height: 100vh;
        color: var(--primary-text-color);
        overflow: hidden;
      }

      h1 {
        margin: 0 0 24px 0;
        font-size: 2em;
        font-weight: 300;
        color: var(--primary-text-color);
        flex-shrink: 0;
      }

      .empty-state {
        padding: 40px;
        text-align: center;
        color: var(--secondary-text-color);
      }

      /* Buttons */
      button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
        font-family: inherit;
      }

      button:hover:not(:disabled) {
        filter: brightness(1.1);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      button.primary {
        background-color: var(--primary-color);
        color: var(--text-primary-color);
      }

      button.secondary {
        background-color: var(--card-background-color);
        color: var(--primary-text-color);
        border: 2px solid var(--primary-text-color);
        opacity: 0.8;
      }

      button.secondary:hover:not(:disabled) {
        opacity: 1;
        border-color: var(--primary-color);
      }

      button.warning {
        background-color: var(--warning-color);
        color: var(--text-primary-color);
      }

      button.small {
        padding: 4px 8px;
        font-size: 12px;
      }

      /* Input fields */
      input, select {
        padding: 8px 12px;
        border: 2px solid var(--input-idle-line-color, var(--divider-color));
        border-radius: 4px;
        background: var(--input-fill-color, var(--secondary-background-color));
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
        transition: border-color 0.2s ease;
      }

      input:focus, select:focus {
        outline: none;
        border-color: var(--input-hover-line-color, var(--primary-color));
        box-shadow: 0 0 0 1px var(--primary-color);
      }

      select option {
        background: var(--card-background-color);
        color: var(--primary-text-color);
        padding: 8px;
      }

      /* Board tabs selector */
      .board-tabs {
        display: flex;
        margin-bottom: 0;
        background: var(--secondary-background-color);
        border-bottom: 2px solid var(--accent-color, var(--primary-color));
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: thin;
        flex-shrink: 0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .board-tab {
        position: relative;
        padding: 16px 24px;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        margin-bottom: -1px;
        color: var(--secondary-text-color);
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 8px;
        background: transparent;
      }

      .board-tab:hover:not(.selected) {
        color: var(--primary-text-color);
        background: var(--secondary-background-color);
      }

      .board-tab.selected {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
        font-weight: 500;
      }

      .board-tab-delete {
        padding: 0;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: transparent;
        color: var(--secondary-text-color);
        border: none;
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: all 0.2s ease;
      }

      .board-tab:hover .board-tab-delete {
        opacity: 0.7;
      }

      .board-tab-delete:hover {
        opacity: 1 !important;
        color: var(--warning-color);
        background: rgba(244, 67, 54, 0.1);
      }

      .board-tab.add-tab {
        color: var(--primary-color);
        padding: 12px 16px;
      }

      .board-tab.add-tab:hover {
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      .board-tab.add-tab.editing {
        min-width: 200px;
        padding: 8px 12px;
      }

      .add-board-input {
        background: transparent;
        border: 1px solid var(--primary-color);
        border-radius: 4px;
        padding: 6px 8px;
        color: var(--primary-text-color);
        font-size: 14px;
        width: 150px;
        outline: none;
      }

      .add-board-input::placeholder {
        color: var(--secondary-text-color);
        opacity: 0.7;
      }

      .add-board-actions {
        display: flex;
        gap: 4px;
        align-items: center;
      }

      /* Board content wrapper */
      .board-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        margin-top: 24px;
      }

      /* Columns layout */
      .columns-container {
        display: flex;
        gap: 16px;
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: 16px;
        flex: 1;
      }

      .column {
        flex: 0 0 300px;
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: var(--ha-card-border-radius, 12px);
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .column-header {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--primary-text-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .column-header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .task-count {
        font-size: 12px;
        font-weight: 400;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color);
        padding: 2px 8px;
        border-radius: 12px;
      }

      .tasks-list {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-height: 100px;
      }

      /* Task cards */
      .task-card {
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-left: 3px solid var(--primary-color);
        border-radius: 8px;
        padding: 12px;
        cursor: grab;
        transition: all 0.2s ease;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);
      }

      .task-card:hover {
        border-left-width: 4px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }

      .task-card.dragging {
        opacity: 0.5;
        cursor: grabbing;
      }

      /* Drop position indicators - simple border highlights */
      .task-card.drop-target-before {
        border-top: 4px solid var(--primary-color);
        box-shadow: 0 -4px 8px rgba(var(--rgb-primary-color, 33, 150, 243), 0.4),
                    0 1px 3px rgba(0, 0, 0, 0.12);
      }

      .task-card.drop-target-after {
        border-bottom: 4px solid var(--primary-color);
        box-shadow: 0 4px 8px rgba(var(--rgb-primary-color, 33, 150, 243), 0.4),
                    0 1px 3px rgba(0, 0, 0, 0.12);
      }

      /* Empty list drop indicator */
      .tasks-list.drop-target-empty {
        border: 3px dashed var(--primary-color);
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.1);
        min-height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .tasks-list.drop-target-empty::after {
        content: "Drop here";
        color: var(--primary-color);
        font-weight: 500;
        opacity: 0.7;
      }

      .task-title {
        font-weight: 500;
        margin-bottom: 4px;
        color: var(--primary-text-color);
      }

      .task-description {
        font-size: 13px;
        color: var(--secondary-text-color);
        margin-bottom: 8px;
        line-height: 1.4;
      }

      .task-due-date {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 8px;
        padding: 4px 8px;
        border-radius: 4px;
        background: var(--primary-background-color);
        border: 1px solid var(--divider-color);
        display: inline-block;
      }

      .task-due-date.overdue {
        color: var(--warning-color);
        background: rgba(244, 67, 54, 0.1);
        font-weight: 500;
      }

      .task-card.overdue {
        border-left-color: var(--warning-color);
      }

      .task-priority {
        font-size: 11px;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 12px;
        display: inline-block;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .task-priority.high {
        background: rgba(244, 67, 54, 0.15);
        color: #d32f2f;
        border: 1px solid rgba(244, 67, 54, 0.3);
      }

      .task-priority.medium {
        background: rgba(255, 152, 0, 0.15);
        color: #f57c00;
        border: 1px solid rgba(255, 152, 0, 0.3);
      }

      .task-priority.low {
        background: rgba(33, 150, 243, 0.15);
        color: #1976d2;
        border: 1px solid rgba(33, 150, 243, 0.3);
      }

      .task-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-bottom: 8px;
      }

      .task-tag {
        font-size: 11px;
        font-weight: 500;
        padding: 2px 8px;
        border-radius: 12px;
        background: rgba(156, 39, 176, 0.12);
        color: #7b1fa2;
        border: 1px solid rgba(156, 39, 176, 0.25);
      }

      .task-actions {
        display: flex;
        gap: 4px;
        margin-top: 8px;
      }

      /* Add task form at bottom of columns */
      .add-task-form {
        margin-top: 8px;
        padding: 8px;
        border-top: 1px solid var(--divider-color);
      }

      .add-task-input {
        width: 100%;
        margin-bottom: 8px;
      }

      .add-task-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .add-task-buttons {
        display: flex;
        gap: 4px;
      }

      /* Add column mock */
      .add-column-mock {
        background: transparent;
        border: 2px dashed var(--primary-text-color);
        opacity: 0.3;
        min-height: 60px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        transition: all 0.2s ease;
        box-shadow: none;
      }

      .add-column-mock:hover {
        opacity: 0.8;
        border-color: var(--primary-color);
        border-style: solid;
        background: var(--card-background-color);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .add-column-form {
        padding: 16px;
        width: 100%;
      }

      .add-column-input {
        width: 100%;
        margin-bottom: 8px;
        background: transparent;
        border: none;
        font-size: 14px;
        font-weight: 400;
      }

      .add-column-input:focus {
        background: var(--input-fill-color, var(--secondary-background-color));
        border: 1px solid var(--input-hover-line-color, var(--primary-color));
      }

      .add-column-input::placeholder {
        color: var(--secondary-text-color);
        opacity: 0.8;
      }

      .add-column-buttons {
        display: flex;
        gap: 4px;
        justify-content: center;
      }

      /* Forms */
      .form-section {
        background: var(--card-background-color);
        border-radius: var(--ha-card-border-radius, 8px);
        padding: 16px;
        margin-bottom: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0,0,0,0.1));
      }

      .form-row {
        display: flex;
        gap: 8px;
        align-items: flex-end;
        flex-wrap: wrap;
        margin-top: 12px;
      }

      .form-row > * {
        flex: 1;
        min-width: 150px;
      }

      .form-label {
        display: block;
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .helper-text {
        font-size: 13px;
        color: var(--secondary-text-color);
        margin-left: 8px;
      }

      .empty-state {
        text-align: center;
        padding: 32px;
        color: var(--secondary-text-color);
      }

      /* Utility classes */
      .mb-16 {
        margin-bottom: 16px;
      }

      .flex-row {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      /* Import dialog */
      .import-dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .import-dialog {
        background: var(--card-background-color);
        border-radius: var(--ha-card-border-radius, 12px);
        padding: 24px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }

      .import-dialog-title {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 16px;
        color: var(--primary-text-color);
      }

      .import-dialog-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .import-dialog-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        margin-top: 16px;
      }
    `}updated(s){if(s.has("hass")&&this.hass&&(this._fetchBoards(),!this._unsubscribeUpdates)){const t=new f(this.hass.connection);console.debug("DoBeeDo: registering subscribeUpdates"),this._unsubscribeUpdates=t.subscribeUpdates(e=>{var o,i;if(console.debug("DoBeeDo event received in panel",e),e.event_type.startsWith("task_")){const r=(o=e.payload.task)==null?void 0:o.board_id;console.debug("DoBeeDo task event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshTasksForSelectedBoard()}else if(e.event_type.startsWith("column_")){const r=(i=e.payload.column)==null?void 0:i.board_id;console.debug("DoBeeDo column event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshColumnsAndTasks()}else e.event_type.startsWith("board_")&&(console.debug("DoBeeDo board event"),this._fetchBoards())})}}async _fetchBoards(){if(this.hass){this._loading=!0;try{const s=new f(this.hass.connection);this._boards=await s.getBoards(),!this._selectedBoardId&&this._boards.length>0&&(this._selectedBoardId=this._boards[0].id),await this._refreshColumnsAndTasks()}catch(s){console.error("Failed to load DoBeeDo data",s)}finally{this._loading=!1}}}async _refreshColumnsAndTasks(){if(!this.hass||!this._selectedBoardId){this._columns=[],this._tasks=[];return}const s=new f(this.hass.connection);this._columns=await s.getColumns(this._selectedBoardId),this._tasks=await s.getTasks(this._selectedBoardId)}async _refreshTasksForSelectedBoard(){if(!this.hass||!this._selectedBoardId){this._tasks=[];return}const s=new f(this.hass.connection);this._tasks=await s.getTasks(this._selectedBoardId)}_handleSelectBoard(s){this._selectedBoardId!==s.id&&(this._selectedBoardId=s.id,this._refreshColumnsAndTasks())}async _handleCreateTask(s){const t=this._newTaskTitles[s]||"",e=this._newTaskDescriptions[s]||"",o=this._newTaskDueDates[s]||"",i=this._newTaskPriorities[s]||"",r=this._newTaskTags[s]||"";if(!this.hass||!this._selectedBoardId||!t.trim())return;const a=new f(this.hass.connection),d=this._boards.find(l=>l.id===this._selectedBoardId);if(!d)return;const n=r.split(",").map(l=>l.trim()).filter(l=>l.length>0);try{await a.createTask(d.id,s,t.trim(),e.trim()||void 0,o.trim()||void 0,i.trim()||void 0,n.length>0?n:void 0),delete this._newTaskTitles[s],delete this._newTaskDescriptions[s],delete this._newTaskDueDates[s],delete this._newTaskPriorities[s],delete this._newTaskTags[s],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions},this._newTaskDueDates={...this._newTaskDueDates},this._newTaskPriorities={...this._newTaskPriorities},this._newTaskTags={...this._newTaskTags}}catch(l){console.error("Failed to create DoBeeDo task",l)}}async _handleCreateColumn(){if(!this.hass||!this._selectedBoardId||!this._newColumnName.trim())return;const s=new f(this.hass.connection);try{await s.createColumn(this._selectedBoardId,this._newColumnName.trim()),this._newColumnName=""}catch(t){console.error("Failed to create DoBeeDo column",t)}}async _handleCreateBoard(){if(!this.hass||!this._newBoardName.trim())return;const s=new f(this.hass.connection);try{const t=await s.createBoard(this._newBoardName.trim());this._newBoardName="",this._isAddingBoard=!1,await this._fetchBoards(),this._selectedBoardId=t.id,await this._refreshColumnsAndTasks()}catch(t){console.error("Failed to create DoBeeDo board",t)}}async _handleDeleteBoard(s){if(!this.hass||!window.confirm(`Delete board "${s.name}" and all its columns and tasks?`))return;const t=new f(this.hass.connection);try{await t.deleteBoard(s.id),await this._fetchBoards(),this._selectedBoardId===s.id&&(this._selectedBoardId=this._boards.length>0?this._boards[0].id:null,await this._refreshColumnsAndTasks())}catch(e){console.error("Failed to delete DoBeeDo board",e)}}_startEditTask(s){this._editingTaskId=s.id,this._editTaskTitle=s.title,this._editTaskDescription=s.description??"",this._editTaskDueDate=s.due_date??"",this._editTaskPriority=s.priority??"",this._editTaskTags=s.tags?s.tags.join(", "):""}_cancelEditTask(){this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate="",this._editTaskPriority="",this._editTaskTags=""}async _saveEditTask(){if(!this.hass||!this._editingTaskId)return;const s=this._tasks.find(c=>c.id===this._editingTaskId);if(!s)return;const t=this._editTaskTitle.trim();if(!t)return;const e={};t!==s.title&&(e.title=t);const o=this._editTaskDescription.trim();o!==(s.description??"")&&(e.description=o===""?null:o);const i=this._editTaskDueDate.trim();i!==(s.due_date??"")&&(e.due_date=i===""?null:i);const r=this._editTaskPriority.trim();r!==(s.priority??"")&&(e.priority=r===""?null:r);const d=this._editTaskTags.trim().split(",").map(c=>c.trim()).filter(c=>c.length>0),n=s.tags||[];if((d.length!==n.length||d.some((c,m)=>c!==n[m]))&&(e.tags=d.length>0?d:null),!e.title&&e.description===void 0&&e.due_date===void 0&&e.priority===void 0&&e.tags===void 0){this._cancelEditTask();return}const h=new f(this.hass.connection);try{await h.updateTask(this._editingTaskId,e),this._cancelEditTask()}catch(c){console.error("Failed to update DoBeeDo task",c)}}_handleDragStart(s,t){if(t.dataTransfer){t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",s.id);const e=new Image;e.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",t.dataTransfer.setDragImage(e,0,0)}requestAnimationFrame(()=>{this._draggingTaskId=s.id})}_handleDragEnd(){this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null}_handleTouchStart(s,t){t.preventDefault();const e=t.touches[0];this._touchStartY=e.clientY,this._touchCurrentY=e.clientY,this._touchDragging=!0,this._draggingTaskId=s.id,this._boundTouchMove=this._handleTouchMove.bind(this),this._boundTouchEnd=this._handleTouchEnd.bind(this),document.addEventListener("touchmove",this._boundTouchMove,{passive:!1}),document.addEventListener("touchend",this._boundTouchEnd,{passive:!1})}_handleTouchMove(s){if(!this._touchDragging||!this._draggingTaskId)return;s.preventDefault();const t=s.touches[0];this._touchCurrentY=t.clientY;const e=document.elementsFromPoint(t.clientX,t.clientY);for(const o of e)if(o.classList.contains("tasks-list")){const i=o.closest(".column");if(i){const r=this._getColumnIdFromElement(i);if(r){this._dragOverColumnId=r,this._calculateTouchDropPosition(r,t.clientY);break}}}}_handleTouchEnd(s){if(!(!this._touchDragging||!this._draggingTaskId)){if(s.preventDefault(),this._dropIndicatorPosition){const t=new DragEvent("drop");this._handleDrop(this._dropIndicatorPosition.columnId,t)}this._boundTouchMove&&(document.removeEventListener("touchmove",this._boundTouchMove),this._boundTouchMove=null),this._boundTouchEnd&&(document.removeEventListener("touchend",this._boundTouchEnd),this._boundTouchEnd=null),this._touchDragging=!1,this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null,this._touchStartY=0,this._touchCurrentY=0}}_getColumnIdFromElement(s){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelectorAll(".column");if(!t)return null;for(let o=0;o<t.length;o++)if(t[o]===s&&o<this._columns.length)return this._columns[o].id;return null}_calculateTouchDropPosition(s,t){var d,n,l;const e=Array.from(((d=this.shadowRoot)==null?void 0:d.querySelectorAll(".column"))||[]).find(h=>this._getColumnIdFromElement(h)===s);if(!e)return;const o=e.querySelector(".tasks-list");if(!o)return;const i=Array.from(o.querySelectorAll(".task-card:not(.dragging)"));if(i.length===0){this._dropIndicatorPosition={columnId:s,index:0};return}let r=i.length;const a=.3;for(let h=0;h<i.length;h++){const c=i[h].getBoundingClientRect(),m=c.top,y=c.bottom,v=y-m,L=m+v*(.5-a),E=m+v*(.5+a),$=(n=this._dropIndicatorPosition)==null?void 0:n.index,z=(l=this._dropIndicatorPosition)==null?void 0:l.columnId,tt=z===s&&$===h,jt=z===s&&$===h+1;if(t>=L&&t<E){if(tt){r=h;break}else if(jt){r=h+1;break}$!==void 0&&z===s&&(r=$);break}if(t>=m&&t<L){r=h;break}if(t>=E&&t<y){r=h+1;break}}this._dropIndicatorPosition={columnId:s,index:r}}_handleDragOver(s){s.preventDefault(),s.dataTransfer&&(s.dataTransfer.dropEffect="move")}_handleDragOverTasksList(s,t){var d,n;if(t.preventDefault(),t.stopPropagation(),!this._draggingTaskId)return;const e=t.currentTarget,o=Array.from(e.querySelectorAll(".task-card:not(.dragging)")),i=t.clientY;if(o.length===0){this._dropIndicatorPosition={columnId:s,index:0};return}let r=o.length;const a=.3;for(let l=0;l<o.length;l++){const h=o[l].getBoundingClientRect(),c=h.top,m=h.bottom,y=m-c,v=c+y*(.5-a),L=c+y*(.5+a),E=(d=this._dropIndicatorPosition)==null?void 0:d.index,$=(n=this._dropIndicatorPosition)==null?void 0:n.columnId,z=$===s&&E===l,tt=$===s&&E===l+1;if(i>=v&&i<L){if(z){r=l;break}else if(tt){r=l+1;break}E!==void 0&&$===s&&(r=E);break}if(i>=c&&i<v){r=l;break}if(i>=L&&i<m){r=l+1;break}}(!this._dropIndicatorPosition||this._dropIndicatorPosition.columnId!==s||this._dropIndicatorPosition.index!==r)&&(this._dropIndicatorPosition={columnId:s,index:r})}_handleDragEnterColumn(s,t){t.stopPropagation(),this._dragOverColumnId=s}_handleDragLeaveColumn(s){const t=s.currentTarget,e=s.relatedTarget;(!e||!t.contains(e))&&(this._dragOverColumnId=null,this._dropIndicatorPosition=null)}_isTaskOverdue(s){if(!s.due_date)return!1;const t=new Date;return t.setHours(0,0,0,0),new Date(s.due_date)<t}_formatDueDate(s){const t=new Date(s),e=new Date;e.setHours(0,0,0,0);const o=new Date(e);o.setDate(o.getDate()+1);const i=new Date(s);if(i.setHours(0,0,0,0),i.getTime()===e.getTime())return"Today";if(i.getTime()===o.getTime())return"Tomorrow";{const r={month:"short",day:"numeric"};return t.toLocaleDateString(void 0,r)}}async _handleDrop(s,t){if(t.preventDefault(),t.stopPropagation(),this._dragOverColumnId=null,!this._draggingTaskId||!this.hass)return;const e=this._tasks.find(n=>n.id===this._draggingTaskId);if(!e){this._draggingTaskId=null;return}let i=this._tasks.filter(n=>n.column_id===s&&n.id!==this._draggingTaskId).sort((n,l)=>n.sort_index-l.sort_index).length;const r=t.currentTarget,a=r.classList.contains("tasks-list")?r:r.querySelector(".tasks-list");if(a){const n=Array.from(a.querySelectorAll(".task-card:not(.dragging)")),l=t.clientY;for(let h=0;h<n.length;h++){const c=n[h].getBoundingClientRect(),m=c.top+c.height/2;if(l<m){i=h;break}}}const d=new f(this.hass.connection);try{await d.moveTask(e.id,s,i),this._draggingTaskId=null,this._dropIndicatorPosition=null}catch(n){console.error("Failed to move task via drag-and-drop",n),this._draggingTaskId=null,this._dropIndicatorPosition=null}}async _handleDeleteTask(s){if(!this.hass||!window.confirm(`Delete task "${s.title}"?`))return;const t=new f(this.hass.connection);try{await t.deleteTask(s.id)}catch(e){console.error("Failed to delete DoBeeDo task",e)}}async _handleDeleteColumn(s){if(!this.hass)return;const e=this._tasks.filter(r=>r.column_id===s.id).length,o=e>0?`Delete column "${s.name}" and ${e} task${e===1?"":"s"}?`:`Delete column "${s.name}"?`;if(!window.confirm(o))return;const i=new f(this.hass.connection);try{await i.deleteColumn(s.id)}catch(r){console.error("Failed to delete DoBeeDo column",r)}}async _startImport(s){if(!this.hass)return;const t=new f(this.hass.connection);try{this._todoEntities=await t.listTodoEntities(),this._importingColumnId=s,this._selectedTodoEntity=null,this._importStatusFilter=""}catch(e){console.error("Failed to load todo entities",e)}}_cancelImport(){this._importingColumnId=null,this._todoEntities=[],this._selectedTodoEntity=null,this._importStatusFilter=""}async _handleImport(){if(!this.hass||!this._selectedTodoEntity||!this._importingColumnId||!this._selectedBoardId)return;const s=new f(this.hass.connection);try{const t=await s.importFromTodo(this._selectedTodoEntity,this._selectedBoardId,this._importingColumnId,this._importStatusFilter||void 0);alert(`Successfully imported ${t.imported_count} task${t.imported_count===1?"":"s"}!`),this._cancelImport()}catch(t){console.error("Failed to import from todo",t),alert("Failed to import tasks. See console for details.")}}async _handleImportAll(){if(!this.hass||!this._selectedBoardId||!window.confirm("Import all Home Assistant todo lists as columns? This will create one column per todo list and import all their items."))return;const s=new f(this.hass.connection);try{const t=await s.importAllTodos(this._selectedBoardId);alert(`Successfully imported ${t.columns_created} todo list${t.columns_created===1?"":"s"} with ${t.total_imported} task${t.total_imported===1?"":"s"}!`)}catch(t){console.error("Failed to import all todos",t),alert("Failed to import todo lists. See console for details.")}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeUpdates&&(this._unsubscribeUpdates(),this._unsubscribeUpdates=null),this._boundTouchMove&&(document.removeEventListener("touchmove",this._boundTouchMove),this._boundTouchMove=null),this._boundTouchEnd&&(document.removeEventListener("touchend",this._boundTouchEnd),this._boundTouchEnd=null)}render(){return g`
      <h1>DoBeeDo</h1>
      ${this._loading?g`<p>Loading boards…</p>`:this._renderContent()}
      ${this._importingColumnId?this._renderImportDialog():""}
    `}_renderContent(){return this._boards.length===0?g`
        <div class="empty-state">
          <p>No boards available yet.</p>
          <p>Create a board using the input above to get started!</p>
        </div>
      `:g`
      ${this._renderBoardSelector()}
      <div class="board-content">
        ${this._selectedBoardId?this._renderBoard():g`<p>Select a board to begin</p>`}
      </div>
    `}_renderBoardSelector(){return g`
      <div class="board-tabs">
        ${this._boards.map(s=>g`
            <div
              class="board-tab ${s.id===this._selectedBoardId?"selected":""}"
              @click=${()=>this._handleSelectBoard(s)}
            >
              <span>${s.name}</span>
              <button
                class="board-tab-delete"
                @click=${t=>{t.stopPropagation(),this._handleDeleteBoard(s)}}
                title="Delete board"
              >
                ×
              </button>
            </div>
          `)}
        ${this._isAddingBoard?g`
              <div class="board-tab add-tab editing">
                <input
                  type="text"
                  class="add-board-input"
                  .value=${this._newBoardName}
                  placeholder="Board name"
                  @input=${s=>{const t=s.target;this._newBoardName=t.value}}
                  @keydown=${s=>{s.key==="Enter"&&this._newBoardName.trim()?this._handleCreateBoard():s.key==="Escape"&&(this._isAddingBoard=!1,this._newBoardName="")}}
                  @blur=${()=>{this._newBoardName.trim()||(this._isAddingBoard=!1)}}
                />
                <div class="add-board-actions">
                  <button
                    class="primary small"
                    @click=${()=>this._handleCreateBoard()}
                    ?disabled=${!this._newBoardName.trim()}
                  >
                    Add
                  </button>
                  <button
                    class="secondary small"
                    @click=${()=>{this._isAddingBoard=!1,this._newBoardName=""}}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            `:g`
              <div
                class="board-tab add-tab"
                @click=${()=>{this._isAddingBoard=!0,setTimeout(()=>{var t;const s=(t=this.shadowRoot)==null?void 0:t.querySelector(".add-board-input");s==null||s.focus()},50)}}
                title="Add new board"
              >
                + Add Board
              </div>
            `}
      </div>
    `}_renderBoard(){const s=this._columns.length===0;return g`
      ${s?g`
            <div style="margin-bottom: 16px; padding: 16px; background: var(--card-background-color); border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 12px 0; color: var(--secondary-text-color);">
                No columns yet. Create columns manually or import from your Home Assistant todo lists.
              </p>
              <button class="primary" @click=${()=>this._handleImportAll()}>
                📥 Import All Todo Lists
              </button>
            </div>
          `:g`
            <div style="margin-bottom: 12px; display: flex; justify-content: flex-end;">
              <button class="secondary small" @click=${()=>this._handleImportAll()} title="Import all todo lists as columns">
                📥 Import All
              </button>
            </div>
          `}
      <div class="columns-container">
        ${this._columns.map(t=>this._renderColumn(t))} ${this._renderAddColumnMock()}
      </div>
    `}_renderAddColumnMock(){return g`
      <div class="column add-column-mock">
        <div class="add-column-form">
          <input
            type="text"
            class="add-column-input"
            .value=${this._newColumnName}
            placeholder="Add column..."
            @input=${s=>{const t=s.target;this._newColumnName=t.value}}
            @keydown=${s=>{s.key==="Enter"&&this._newColumnName.trim()&&this._handleCreateColumn()}}
          />
          ${this._newColumnName.trim()?g`
                <div class="add-column-buttons">
                  <button class="primary small" @click=${()=>this._handleCreateColumn()}>
                    Add
                  </button>
                  <button
                    class="secondary small"
                    @click=${()=>{this._newColumnName=""}}
                  >
                    Cancel
                  </button>
                </div>
              `:""}
        </div>
      </div>
    `}_renderColumn(s){var e;const t=this._tasks.filter(o=>o.column_id===s.id).sort((o,i)=>o.sort_index-i.sort_index);return g`
      <div
        class="column"
        @dragover=${this._handleDragOver}
        @dragenter=${o=>this._handleDragEnterColumn(s.id,o)}
        @dragleave=${o=>this._handleDragLeaveColumn(o)}
        @drop=${o=>this._handleDrop(s.id,o)}
      >
        <div class="column-header">
          <div class="column-header-left">
            <span>${s.name}</span>
            <span class="task-count">${t.length}</span>
          </div>
          <div style="display: flex; gap: 4px;">
            <button
              class="secondary small"
              @click=${()=>this._startImport(s.id)}
              title="Import from To-do list"
            >
              ↓
            </button>
            <button
              class="warning small"
              @click=${()=>this._handleDeleteColumn(s)}
              title="Delete column"
            >
              ×
            </button>
          </div>
        </div>
        <div
          class="tasks-list ${t.length===0&&((e=this._dropIndicatorPosition)==null?void 0:e.columnId)===s.id?"drop-target-empty":""}"
          @dragover=${o=>this._handleDragOverTasksList(s.id,o)}
          @drop=${o=>this._handleDrop(s.id,o)}
        >
          ${t.length===0?g`
                <div class="empty-state" style="padding: 16px; font-size: 13px;">
                  No tasks yet
                </div>
              `:g`
                ${t.map((o,i)=>{var d,n,l,h;const r=((d=this._dropIndicatorPosition)==null?void 0:d.columnId)===s.id&&((n=this._dropIndicatorPosition)==null?void 0:n.index)===i,a=((l=this._dropIndicatorPosition)==null?void 0:l.columnId)===s.id&&((h=this._dropIndicatorPosition)==null?void 0:h.index)===i+1;return this._renderTask(o,r,a)})}
              `}
        </div>
        <div class="add-task-form">
          <input
            type="text"
            class="add-task-input"
            .value=${this._newTaskTitles[s.id]||""}
            placeholder="Add a task..."
            @input=${o=>{const i=o.target;this._newTaskTitles={...this._newTaskTitles,[s.id]:i.value}}}
            @keydown=${o=>{const i=this._newTaskTitles[s.id]||"";o.key==="Enter"&&i.trim()&&this._handleCreateTask(s.id)}}
          />
          ${(this._newTaskTitles[s.id]||"").trim()?g`
                <div class="add-task-actions">
                  <input
                    type="text"
                    class="add-task-input"
                    .value=${this._newTaskDescriptions[s.id]||""}
                    placeholder="Description (optional)"
                    @input=${o=>{const i=o.target;this._newTaskDescriptions={...this._newTaskDescriptions,[s.id]:i.value}}}
                    @keydown=${o=>{o.key==="Enter"&&this._handleCreateTask(s.id)}}
                  />
                  <input
                    type="date"
                    class="add-task-input"
                    .value=${this._newTaskDueDates[s.id]||""}
                    placeholder="Due date (optional)"
                    @input=${o=>{const i=o.target;this._newTaskDueDates={...this._newTaskDueDates,[s.id]:i.value}}}
                    @keydown=${o=>{o.key==="Enter"&&this._handleCreateTask(s.id)}}
                  />
                  <select
                    class="add-task-input"
                    .value=${this._newTaskPriorities[s.id]||""}
                    @change=${o=>{const i=o.target;this._newTaskPriorities={...this._newTaskPriorities,[s.id]:i.value}}}
                  >
                    <option value="">No priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <input
                    type="text"
                    class="add-task-input"
                    .value=${this._newTaskTags[s.id]||""}
                    placeholder="Tags (comma-separated, optional)"
                    @input=${o=>{const i=o.target;this._newTaskTags={...this._newTaskTags,[s.id]:i.value}}}
                    @keydown=${o=>{o.key==="Enter"&&this._handleCreateTask(s.id)}}
                  />
                  <div class="add-task-buttons">
                    <button class="primary small" @click=${()=>this._handleCreateTask(s.id)}>
                      Add
                    </button>
                    <button
                      class="secondary small"
                      @click=${()=>{delete this._newTaskTitles[s.id],delete this._newTaskDescriptions[s.id],delete this._newTaskDueDates[s.id],delete this._newTaskPriorities[s.id],delete this._newTaskTags[s.id],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions},this._newTaskDueDates={...this._newTaskDueDates},this._newTaskPriorities={...this._newTaskPriorities},this._newTaskTags={...this._newTaskTags}}}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              `:""}
        </div>
      </div>
    `}_renderTask(s,t=!1,e=!1){if(this._editingTaskId===s.id)return g`
        <div class="task-card" style="padding: 16px;">
          <div style="margin-bottom: 8px;">
            <input
              type="text"
              .value=${this._editTaskTitle}
              placeholder="Task title"
              @input=${a=>{const d=a.target;this._editTaskTitle=d.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="text"
              .value=${this._editTaskDescription}
              placeholder="Description (optional)"
              @input=${a=>{const d=a.target;this._editTaskDescription=d.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="date"
              .value=${this._editTaskDueDate}
              placeholder="Due date (optional)"
              @input=${a=>{const d=a.target;this._editTaskDueDate=d.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <select
              .value=${this._editTaskPriority}
              @change=${a=>{const d=a.target;this._editTaskPriority=d.value}}
              style="width: 100%; margin-bottom: 8px;"
            >
              <option value="">No priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="text"
              .value=${this._editTaskTags}
              placeholder="Tags (comma-separated, optional)"
              @input=${a=>{const d=a.target;this._editTaskTags=d.value}}
              style="width: 100%;"
            />
          </div>
          <div class="task-actions">
            <button class="primary small" @click=${()=>this._saveEditTask()}>Save</button>
            <button class="secondary small" @click=${()=>this._cancelEditTask()}>Cancel</button>
          </div>
        </div>
      `;const i=this._draggingTaskId===s.id,r=this._isTaskOverdue(s);return g`
      <div
        class="task-card ${i?"dragging":""} ${r?"overdue":""} ${t?"drop-target-before":""} ${e?"drop-target-after":""}"
        draggable="true"
        @dragstart=${a=>this._handleDragStart(s,a)}
        @dragend=${this._handleDragEnd}
        @touchstart=${a=>this._handleTouchStart(s,a)}
      >
        <div class="task-title">${s.title}</div>
        ${s.description?g`<div class="task-description">${s.description}</div>`:""}
        ${s.priority?g`<div class="task-priority ${s.priority}">${s.priority}</div>`:""}
        ${s.tags&&s.tags.length>0?g`<div class="task-tags">
              ${s.tags.map(a=>g`<span class="task-tag">${a}</span>`)}
            </div>`:""}
        ${s.due_date?g`<div class="task-due-date ${r?"overdue":""}">
              📅 ${this._formatDueDate(s.due_date)}
            </div>`:""}
        <div class="task-actions">
          <button class="secondary small" draggable="false" @click=${()=>this._startEditTask(s)}>Edit</button>
          <button class="warning small" draggable="false" @click=${()=>this._handleDeleteTask(s)}>Delete</button>
        </div>
      </div>
    `}_renderImportDialog(){const s=this._columns.find(e=>e.id===this._importingColumnId),t=(s==null?void 0:s.name)||"Unknown";return g`
      <div class="import-dialog-overlay" @click=${this._cancelImport}>
        <div class="import-dialog" @click=${e=>e.stopPropagation()}>
          <div class="import-dialog-title">Import from To-do List to "${t}"</div>
          <div class="import-dialog-content">
            ${this._todoEntities.length===0?g`<p style="color: var(--secondary-text-color);">No to-do lists found in Home Assistant.</p>`:g`
                  <div>
                    <label class="form-label">Select To-do List</label>
                    <select
                      style="width: 100%;"
                      .value=${this._selectedTodoEntity||""}
                      @change=${e=>{const o=e.target;this._selectedTodoEntity=o.value}}
                    >
                      <option value="">-- Select a to-do list --</option>
                      ${this._todoEntities.map(e=>g`
                          <option value=${e.entity_id}>${e.name}</option>
                        `)}
                    </select>
                  </div>
                  <div>
                    <label class="form-label">Status Filter (optional)</label>
                    <select
                      style="width: 100%;"
                      .value=${this._importStatusFilter}
                      @change=${e=>{const o=e.target;this._importStatusFilter=o.value}}
                    >
                      <option value="">All items</option>
                      <option value="needs_action">Not completed</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                `}
          </div>
          <div class="import-dialog-actions">
            <button class="secondary small" @click=${this._cancelImport}>Cancel</button>
            <button
              class="primary small"
              @click=${()=>this._handleImport()}
              ?disabled=${!this._selectedTodoEntity}
            >
              Import
            </button>
          </div>
        </div>
      </div>
    `}};u([mt({attribute:!1})],p.prototype,"hass",2),u([_()],p.prototype,"_boards",2),u([_()],p.prototype,"_tasks",2),u([_()],p.prototype,"_columns",2),u([_()],p.prototype,"_loading",2),u([_()],p.prototype,"_newTaskTitles",2),u([_()],p.prototype,"_newTaskDescriptions",2),u([_()],p.prototype,"_newTaskDueDates",2),u([_()],p.prototype,"_newTaskPriorities",2),u([_()],p.prototype,"_newTaskTags",2),u([_()],p.prototype,"_newColumnName",2),u([_()],p.prototype,"_newBoardName",2),u([_()],p.prototype,"_isAddingBoard",2),u([_()],p.prototype,"_unsubscribeUpdates",2),u([_()],p.prototype,"_selectedBoardId",2),u([_()],p.prototype,"_editingTaskId",2),u([_()],p.prototype,"_editTaskTitle",2),u([_()],p.prototype,"_editTaskDescription",2),u([_()],p.prototype,"_editTaskDueDate",2),u([_()],p.prototype,"_editTaskPriority",2),u([_()],p.prototype,"_editTaskTags",2),u([_()],p.prototype,"_draggingTaskId",2),u([_()],p.prototype,"_dragOverColumnId",2),u([_()],p.prototype,"_dropIndicatorPosition",2),u([_()],p.prototype,"_touchDragging",2),u([_()],p.prototype,"_touchStartY",2),u([_()],p.prototype,"_touchCurrentY",2),u([_()],p.prototype,"_importingColumnId",2),u([_()],p.prototype,"_todoEntities",2),u([_()],p.prototype,"_selectedTodoEntity",2),u([_()],p.prototype,"_importStatusFilter",2),p=u([Ht("dobeedo-panel")],p)})();
