(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pt;const O=globalThis,j=O.ShadowRoot&&(O.ShadyCSS===void 0||O.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),Z=new WeakMap;let G=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(j&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Z.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Z.set(e,t))}return t}toString(){return this.cssText}};const ut=i=>new G(typeof i=="string"?i:i+"",void 0,W),_t=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,o,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[r+1],i[0]);return new G(e,i,W)},mt=(i,t)=>{if(j)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),o=O.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}},Q=j?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ut(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ft,defineProperty:bt,getOwnPropertyDescriptor:vt,getOwnPropertyNames:yt,getOwnPropertySymbols:$t,getPrototypeOf:gt}=Object,y=globalThis,X=y.trustedTypes,xt=X?X.emptyScript:"",F=y.reactiveElementPolyfillSupport,S=(i,t)=>i,H={toAttribute(i,t){switch(t){case Boolean:i=i?xt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},V=(i,t)=>!ft(i,t),tt={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);let T=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=tt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,e);o!==void 0&&bt(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){const{get:o,set:r}=vt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:o,set(n){const d=o==null?void 0:o.call(this);r==null||r.call(this,n),this.requestUpdate(t,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??tt}static _$Ei(){if(this.hasOwnProperty(S("elementProperties")))return;const t=gt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(S("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(S("properties"))){const e=this.properties,s=[...yt(e),...$t(e)];for(const o of s)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,o]of e)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const o=this._$Eu(e,s);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const o of s)e.unshift(Q(o))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return mt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var r;const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){const n=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:H).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){var r,n;const s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const d=s.getPropertyOptions(o),a=typeof d.converter=="function"?{fromAttribute:d.converter}:((r=d.converter)==null?void 0:r.fromAttribute)!==void 0?d.converter:H;this._$Em=o;const c=a.fromAttribute(e,d.type);this[o]=c??((n=this._$Ej)==null?void 0:n.get(o))??c,this._$Em=null}}requestUpdate(t,e,s){var o;if(t!==void 0){const r=this.constructor,n=this[t];if(s??(s=r.getPropertyOptions(t)),!((s.hasChanged??V)(n,e)||s.useDefault&&s.reflect&&n===((o=this._$Ej)==null?void 0:o.get(t))&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:r},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,n]of o){const{wrapped:d}=n,a=this[r];d!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,n,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(o=>{var r;return(r=o.hostUpdate)==null?void 0:r.call(o)}),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var o;return(o=s.hostUpdated)==null?void 0:o.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[S("elementProperties")]=new Map,T[S("finalized")]=new Map,F==null||F({ReactiveElement:T}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis,R=D.trustedTypes,et=R?R.createPolicy("lit-html",{createHTML:i=>i}):void 0,st="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,it="?"+$,kt=`<${it}>`,x=document,B=()=>x.createComment(""),P=i=>i===null||typeof i!="object"&&typeof i!="function",q=Array.isArray,wt=i=>q(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",Y=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ot=/-->/g,rt=/>/g,k=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),nt=/'/g,at=/"/g,dt=/^(?:script|style|textarea|title)$/i,At=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),h=At(1),C=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),lt=new WeakMap,w=x.createTreeWalker(x,129);function ct(i,t){if(!q(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return et!==void 0?et.createHTML(t):t}const Tt=(i,t)=>{const e=i.length-1,s=[];let o,r=t===2?"<svg>":t===3?"<math>":"",n=I;for(let d=0;d<e;d++){const a=i[d];let c,m,l=-1,v=0;for(;v<a.length&&(n.lastIndex=v,m=n.exec(a),m!==null);)v=n.lastIndex,n===I?m[1]==="!--"?n=ot:m[1]!==void 0?n=rt:m[2]!==void 0?(dt.test(m[2])&&(o=RegExp("</"+m[2],"g")),n=k):m[3]!==void 0&&(n=k):n===k?m[0]===">"?(n=o??I,l=-1):m[1]===void 0?l=-2:(l=n.lastIndex-m[2].length,c=m[1],n=m[3]===void 0?k:m[3]==='"'?at:nt):n===at||n===nt?n=k:n===ot||n===rt?n=I:(n=k,o=void 0);const g=n===k&&i[d+1].startsWith("/>")?" ":"";r+=n===I?a+kt:l>=0?(s.push(c),a.slice(0,l)+st+a.slice(l)+$+g):a+$+(l===-2?d:g)}return[ct(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class M{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let r=0,n=0;const d=t.length-1,a=this.parts,[c,m]=Tt(t,e);if(this.el=M.createElement(c,s),w.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(o=w.nextNode())!==null&&a.length<d;){if(o.nodeType===1){if(o.hasAttributes())for(const l of o.getAttributeNames())if(l.endsWith(st)){const v=m[n++],g=o.getAttribute(l).split($),L=/([.?@])?(.*)/.exec(v);a.push({type:1,index:r,name:L[2],strings:g,ctor:L[1]==="."?Et:L[1]==="?"?St:L[1]==="@"?Dt:z}),o.removeAttribute(l)}else l.startsWith($)&&(a.push({type:6,index:r}),o.removeAttribute(l));if(dt.test(o.tagName)){const l=o.textContent.split($),v=l.length-1;if(v>0){o.textContent=R?R.emptyScript:"";for(let g=0;g<v;g++)o.append(l[g],B()),w.nextNode(),a.push({type:2,index:++r});o.append(l[v],B())}}}else if(o.nodeType===8)if(o.data===it)a.push({type:2,index:r});else{let l=-1;for(;(l=o.data.indexOf($,l+1))!==-1;)a.push({type:7,index:r}),l+=$.length-1}r++}}static createElement(t,e){const s=x.createElement("template");return s.innerHTML=t,s}}function E(i,t,e=i,s){var n,d;if(t===C)return t;let o=s!==void 0?(n=e._$Co)==null?void 0:n[s]:e._$Cl;const r=P(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==r&&((d=o==null?void 0:o._$AO)==null||d.call(o,!1),r===void 0?o=void 0:(o=new r(i),o._$AT(i,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=o:e._$Cl=o),o!==void 0&&(t=E(i,o._$AS(i,t.values),o,s)),t}class Ct{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,o=((t==null?void 0:t.creationScope)??x).importNode(e,!0);w.currentNode=o;let r=w.nextNode(),n=0,d=0,a=s[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new U(r,r.nextSibling,this,t):a.type===1?c=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(c=new Bt(r,this,t)),this._$AV.push(c),a=s[++d]}n!==(a==null?void 0:a.index)&&(r=w.nextNode(),n++)}return w.currentNode=x,o}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class U{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),P(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==C&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):wt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=M.createElement(ct(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===o)this._$AH.p(e);else{const n=new Ct(o,this),d=n.u(this.options);n.p(e),this.T(d),this._$AH=n}}_$AC(t){let e=lt.get(t.strings);return e===void 0&&lt.set(t.strings,e=new M(t)),e}k(t){q(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,o=0;for(const r of t)o===e.length?e.push(s=new U(this.O(B()),this.O(B()),this,this.options)):s=e[o],s._$AI(r),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t!==this._$AB;){const o=t.nextSibling;t.remove(),t=o}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,o){const r=this.strings;let n=!1;if(r===void 0)t=E(this,t,e,0),n=!P(t)||t!==this._$AH&&t!==C,n&&(this._$AH=t);else{const d=t;let a,c;for(t=r[0],a=0;a<r.length-1;a++)c=E(this,d[s+a],e,a),c===C&&(c=this._$AH[a]),n||(n=!P(c)||c!==this._$AH[a]),c===p?t=p:t!==p&&(t+=(c??"")+r[a+1]),this._$AH[a]=c}n&&!o&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Et extends z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}class St extends z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}}class Dt extends z{constructor(t,e,s,o,r){super(t,e,s,o,r),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??p)===C)return;const s=this._$AH,o=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==p&&(s===p||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Bt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}}const J=D.litHtmlPolyfillSupport;J==null||J(M,U),(D.litHtmlVersions??(D.litHtmlVersions=[])).push("3.3.1");const Pt=(i,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let o=s._$litPart$;if(o===void 0){const r=(e==null?void 0:e.renderBefore)??null;s._$litPart$=o=new U(t.insertBefore(B(),r),r,void 0,e??{})}return o._$AI(i),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=globalThis;class N extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Pt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return C}}N._$litElement$=!0,N.finalized=!0,(pt=A.litElementHydrateSupport)==null||pt.call(A,{LitElement:N});const K=A.litElementPolyfillSupport;K==null||K({LitElement:N}),(A.litElementVersions??(A.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const It=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:V},Ut=(i=Mt,t,e)=>{const{kind:s,metadata:o}=e;let r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),r.set(e.name,i),s==="accessor"){const{name:n}=e;return{set(d){const a=t.get.call(this);t.set.call(this,d),this.requestUpdate(n,a,i)},init(d){return d!==void 0&&this.C(n,void 0,i,d),d}}}if(s==="setter"){const{name:n}=e;return function(d){const a=this[n];t.call(this,d),this.requestUpdate(n,a,i)}}throw Error("Unsupported decorator location: "+s)};function ht(i){return(t,e)=>typeof e=="object"?Ut(i,t,e):((s,o,r)=>{const n=o.hasOwnProperty(r);return o.constructor.createProperty(r,s),n?Object.getOwnPropertyDescriptor(o,r):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function f(i){return ht({...i,state:!0,attribute:!1})}class b{constructor(t){this.connection=t}async getBoards(){return(await this.connection.sendMessagePromise({type:"dobeedo/get_boards"})).boards??[]}async getColumns(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_columns",board_id:t})).columns??[]}async createColumn(t,e,s){return(await this.connection.sendMessagePromise({type:"dobeedo/create_column",board_id:t,name:e,order_index:s})).column}async getTasks(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_tasks",board_id:t})).tasks??[]}async createTask(t,e,s,o){return(await this.connection.sendMessagePromise({type:"dobeedo/create_task",board_id:t,column_id:e,title:s,description:o})).task}async updateTask(t,e){const s={type:"dobeedo/update_task",task_id:t};return e.title!==void 0&&(s.title=e.title),e.description!==void 0&&(s.description=e.description),(await this.connection.sendMessagePromise(s)).task}async moveTask(t,e,s){const o={type:"dobeedo/move_task",task_id:t,target_column_id:e};return s!==void 0&&(o.target_sort_index=s),(await this.connection.sendMessagePromise(o)).task}subscribeUpdates(t){const e=this.connection;if(e.subscribeEvents){console.debug("DoBeeDo: using connection.subscribeEvents for updates");const r=e.subscribeEvents(n=>{if(console.debug("DoBeeDo: raw WS message via subscribeEvents",n),typeof(n==null?void 0:n.event_type)=="string"&&n.data){const d=n.event_type;if(d.startsWith("dobeedo_")){const a=d.replace(/^dobeedo_/,"");t({event_type:a,payload:n.data,raw_type:d})}return}(n==null?void 0:n.type)==="dobeedo/event"&&n.event_type&&n.payload&&t({event_type:n.event_type,payload:n.payload,raw_type:n.raw_type})});return()=>{console.debug("DoBeeDo: unsubscribe from subscribeEvents"),r()}}if(!e.subscribeMessage)return console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available"),()=>{};const s=r=>{console.debug("DoBeeDo: raw WS message in subscribeUpdates handler",r),(r==null?void 0:r.type)==="dobeedo/event"&&r.event_type&&r.payload&&t({event_type:r.event_type,payload:r.payload,raw_type:r.raw_type})};console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");const o=e.subscribeMessage(s,{type:"dobeedo/subscribe_updates"});return()=>{console.debug("DoBeeDo: unsubscribe from subscribe_updates"),o()}}async populateTestData(){await this.connection.sendMessagePromise({type:"dobeedo/populate_test_data"})}}var Nt=Object.defineProperty,Ot=Object.getOwnPropertyDescriptor,_=(i,t,e,s)=>{for(var o=s>1?void 0:s?Ot(t,e):t,r=i.length-1,n;r>=0;r--)(n=i[r])&&(o=(s?n(t,e,o):n(o))||o);return s&&o&&Nt(t,e,o),o};let u=class extends N{constructor(){super(...arguments),this._boards=[],this._tasks=[],this._columns=[],this._loading=!1,this._newTaskTitle="",this._newTaskDescription="",this._newColumnName="",this._unsubscribeUpdates=null,this._selectedBoardId=null,this._selectedColumnId=null,this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._movingTaskId=null}static get styles(){return _t`
      :host {
        display: block;
        box-sizing: border-box;
        padding: 24px;
        background: var(--primary-background-color);
        min-height: 100vh;
        color: var(--primary-text-color);
      }

      h1 {
        margin: 0 0 24px 0;
        font-size: 2em;
        font-weight: 300;
        color: var(--primary-text-color);
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
        border: 1px solid var(--divider-color);
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
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
        transition: border-color 0.2s ease;
      }

      input:focus, select:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      /* Board selector */
      .board-selector {
        display: flex;
        gap: 8px;
        margin-bottom: 24px;
        flex-wrap: wrap;
      }

      .board-chip {
        padding: 8px 16px;
        border-radius: 16px;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--primary-text-color);
      }

      .board-chip:hover {
        border-color: var(--primary-color);
        transform: translateY(-1px);
        box-shadow: 0 2px 8px var(--ha-card-box-shadow, rgba(0,0,0,0.1));
      }

      .board-chip.selected {
        background: var(--primary-color);
        color: var(--text-primary-color);
        border-color: var(--primary-color);
      }

      /* Columns layout */
      .columns-container {
        display: flex;
        gap: 16px;
        overflow-x: auto;
        padding-bottom: 16px;
      }

      .column {
        flex: 0 0 300px;
        background: var(--card-background-color);
        border-radius: var(--ha-card-border-radius, 8px);
        padding: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0,0,0,0.1));
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - 300px);
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

      .task-count {
        font-size: 12px;
        font-weight: 400;
        color: var(--secondary-text-color);
        background: var(--divider-color);
        padding: 2px 8px;
        border-radius: 12px;
      }

      .tasks-list {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 100px;
      }

      /* Task cards */
      .task-card {
        background: var(--primary-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        padding: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .task-card:hover {
        border-color: var(--primary-color);
        box-shadow: 0 2px 8px var(--ha-card-box-shadow, rgba(0,0,0,0.15));
        transform: translateY(-2px);
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

      .task-actions {
        display: flex;
        gap: 4px;
        margin-top: 8px;
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
    `}updated(i){if(i.has("hass")&&this.hass&&(this._fetchBoards(),!this._unsubscribeUpdates)){const t=new b(this.hass.connection);console.debug("DoBeeDo: registering subscribeUpdates"),this._unsubscribeUpdates=t.subscribeUpdates(e=>{var s,o;if(console.debug("DoBeeDo event received in panel",e),e.event_type.startsWith("task_")){const r=(s=e.payload.task)==null?void 0:s.board_id;console.debug("DoBeeDo task event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshTasksForSelectedBoard()}else if(e.event_type.startsWith("column_")){const r=(o=e.payload.column)==null?void 0:o.board_id;console.debug("DoBeeDo column event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshColumnsAndTasks()}else e.event_type.startsWith("board_")&&this._fetchBoards()})}}async _fetchBoards(){if(this.hass){this._loading=!0;try{const i=new b(this.hass.connection);this._boards=await i.getBoards(),!this._selectedBoardId&&this._boards.length>0&&(this._selectedBoardId=this._boards[0].id),await this._refreshColumnsAndTasks()}catch(i){console.error("Failed to load DoBeeDo data",i)}finally{this._loading=!1}}}async _refreshColumnsAndTasks(){if(!this.hass||!this._selectedBoardId){this._columns=[],this._tasks=[],this._selectedColumnId=null;return}const i=new b(this.hass.connection);this._columns=await i.getColumns(this._selectedBoardId),this._tasks=await i.getTasks(this._selectedBoardId),this._columns.length===0?this._selectedColumnId=null:(!this._selectedColumnId||!this._columns.some(t=>t.id===this._selectedColumnId))&&(this._selectedColumnId=this._columns[0].id)}async _refreshTasksForSelectedBoard(){if(!this.hass||!this._selectedBoardId){this._tasks=[];return}const i=new b(this.hass.connection);this._tasks=await i.getTasks(this._selectedBoardId)}_handleSelectBoard(i){this._selectedBoardId!==i.id&&(this._selectedBoardId=i.id,this._refreshColumnsAndTasks())}async _handleCreateTask(){if(!this.hass||!this._selectedBoardId||!this._newTaskTitle.trim())return;const i=new b(this.hass.connection),t=this._boards.find(s=>s.id===this._selectedBoardId);if(!t)return;const e=this._selectedColumnId;if(!e){console.warn("No column selected on the selected board to create a task in.");return}try{const s=await i.createTask(t.id,e,this._newTaskTitle.trim(),this._newTaskDescription.trim()||void 0);this._newTaskTitle="",this._newTaskDescription="",t.id===this._selectedBoardId?this._tasks=[...this._tasks,s]:await this._refreshTasksForSelectedBoard()}catch(s){console.error("Failed to create DoBeeDo task",s)}}async _handleCreateColumn(){if(!this.hass||!this._selectedBoardId||!this._newColumnName.trim())return;const i=new b(this.hass.connection);try{const t=await i.createColumn(this._selectedBoardId,this._newColumnName.trim());this._newColumnName="",this._columns=[...this._columns,t]}catch(t){console.error("Failed to create DoBeeDo column",t)}}_startEditTask(i){this._editingTaskId=i.id,this._editTaskTitle=i.title,this._editTaskDescription=i.description??""}_cancelEditTask(){this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription=""}async _saveEditTask(){if(!this.hass||!this._editingTaskId)return;const i=this._tasks.find(r=>r.id===this._editingTaskId);if(!i)return;const t=this._editTaskTitle.trim();if(!t)return;const e={};t!==i.title&&(e.title=t);const s=this._editTaskDescription.trim();if(s!==(i.description??"")&&(e.description=s===""?null:s),!e.title&&e.description===void 0){this._cancelEditTask();return}const o=new b(this.hass.connection);try{const r=await o.updateTask(this._editingTaskId,e);this._tasks=this._tasks.map(n=>n.id===r.id?r:n),this._cancelEditTask()}catch(r){console.error("Failed to update DoBeeDo task",r)}}_startMoveTask(i){this._movingTaskId=i.id}_cancelMoveTask(){this._movingTaskId=null}async _handleMoveTask(i,t){if(!this.hass||t===i.column_id){this._cancelMoveTask();return}const e=new b(this.hass.connection);try{const s=await e.moveTask(i.id,t);this._tasks=this._tasks.map(o=>o.id===s.id?s:o),this._cancelMoveTask()}catch(s){console.error("Failed to move DoBeeDo task",s)}}async _handlePopulateTestData(){if(!this.hass||!window.confirm(`⚠️ WARNING: This will DELETE ALL existing boards, columns, and tasks!

This is a development helper that clears everything and creates fresh test data.

Are you sure you want to continue?`))return;const i=new b(this.hass.connection);try{await i.populateTestData(),await this._fetchBoards()}catch(t){console.error("Failed to populate test data",t)}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeUpdates&&(this._unsubscribeUpdates(),this._unsubscribeUpdates=null)}render(){return h`
      <h1>DoBeeDo</h1>

      <div class="flex-row mb-16">
        <button class="warning" @click=${()=>this._handlePopulateTestData()} ?disabled=${this._loading}>
          ⚠️ Populate Test Data (DEV ONLY)
        </button>
        <span class="helper-text">
          (Development helper - CLEARS ALL DATA and adds sample board. Remove before release!)
        </span>
      </div>

      ${this._loading?h`<p>Loading boards…</p>`:this._renderContent()}
    `}_renderContent(){return this._boards.length===0?h`
        <div class="empty-state">
          <p>No boards available yet.</p>
          <p>Click "Populate Test Data" to get started!</p>
        </div>
      `:h`
      ${this._renderBoardSelector()}
      ${this._selectedBoardId?this._renderBoard():h`<p>Select a board to begin</p>`}
    `}_renderBoardSelector(){return h`
      <div class="board-selector">
        ${this._boards.map(i=>h`
            <div
              class="board-chip ${i.id===this._selectedBoardId?"selected":""}"
              @click=${()=>this._handleSelectBoard(i)}
            >
              ${i.name}
            </div>
          `)}
      </div>
    `}_renderBoard(){return h`
      <div class="form-section">
        <label class="form-label">Add Column</label>
        <div class="form-row">
          <div>
            <input
              type="text"
              .value=${this._newColumnName}
              placeholder="Column name (e.g., To Do, In Progress, Done)"
              @input=${i=>{const t=i.target;this._newColumnName=t.value}}
              @keydown=${i=>{i.key==="Enter"&&this._handleCreateColumn()}}
            />
          </div>
          <button
            class="primary"
            @click=${()=>this._handleCreateColumn()}
            ?disabled=${!this._newColumnName.trim()||!this._selectedBoardId}
          >
            Add Column
          </button>
        </div>
      </div>

      ${this._columns.length===0?h`<div class="empty-state">No columns yet. Add a column to get started!</div>`:h`
            <div class="columns-container">${this._columns.map(i=>this._renderColumn(i))}</div>

            <div class="form-section">
              <label class="form-label">Create New Task</label>
              <div class="form-row">
                <div style="flex: 2;">
                  <input
                    type="text"
                    .value=${this._newTaskTitle}
                    placeholder="Task title"
                    @input=${i=>{const t=i.target;this._newTaskTitle=t.value}}
                    @keydown=${i=>{i.key==="Enter"&&this._handleCreateTask()}}
                  />
                </div>
                <div style="flex: 2;">
                  <input
                    type="text"
                    .value=${this._newTaskDescription}
                    placeholder="Description (optional)"
                    @input=${i=>{const t=i.target;this._newTaskDescription=t.value}}
                  />
                </div>
                <div style="flex: 1;">
                  <select
                    .value=${this._selectedColumnId??""}
                    @change=${i=>{const t=i.target;this._selectedColumnId=t.value||null}}
                  >
                    ${this._columns.map(i=>h`<option value=${i.id}>${i.name}</option>`)}
                  </select>
                </div>
                <button
                  class="primary"
                  @click=${()=>this._handleCreateTask()}
                  ?disabled=${!this._newTaskTitle.trim()||this._loading||!this._selectedBoardId||!this._selectedColumnId}
                >
                  Add Task
                </button>
              </div>
            </div>
          `}
    `}_renderColumn(i){const t=this._tasks.filter(e=>e.column_id===i.id).sort((e,s)=>e.sort_index-s.sort_index);return h`
      <div class="column">
        <div class="column-header">
          <span>${i.name}</span>
          <span class="task-count">${t.length}</span>
        </div>
        <div class="tasks-list">
          ${t.length===0?h`<div class="empty-state" style="padding: 16px; font-size: 13px;">
                No tasks yet
              </div>`:t.map(e=>this._renderTask(e))}
        </div>
      </div>
    `}_renderTask(i){const t=this._editingTaskId===i.id,e=this._movingTaskId===i.id;return t?h`
        <div class="task-card" style="padding: 16px;">
          <div style="margin-bottom: 8px;">
            <input
              type="text"
              .value=${this._editTaskTitle}
              placeholder="Task title"
              @input=${s=>{const o=s.target;this._editTaskTitle=o.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="text"
              .value=${this._editTaskDescription}
              placeholder="Description (optional)"
              @input=${s=>{const o=s.target;this._editTaskDescription=o.value}}
              style="width: 100%;"
            />
          </div>
          <div class="task-actions">
            <button class="primary small" @click=${()=>this._saveEditTask()}>Save</button>
            <button class="secondary small" @click=${()=>this._cancelEditTask()}>Cancel</button>
          </div>
        </div>
      `:e?h`
        <div class="task-card" style="padding: 16px;">
          <div class="task-title" style="margin-bottom: 8px;">${i.title}</div>
          <div style="font-size: 12px; margin-bottom: 8px; color: var(--secondary-text-color);">
            Move to column:
          </div>
          <select
            style="width: 100%; margin-bottom: 8px;"
            @change=${s=>{const o=s.target;this._handleMoveTask(i,o.value)}}
          >
            <option value="">-- Select column --</option>
            ${this._columns.map(s=>h`
                <option value=${s.id} ?selected=${s.id===i.column_id}>
                  ${s.name} ${s.id===i.column_id?"(current)":""}
                </option>
              `)}
          </select>
          <button class="secondary small" @click=${()=>this._cancelMoveTask()}>Cancel</button>
        </div>
      `:h`
      <div class="task-card">
        <div class="task-title">${i.title}</div>
        ${i.description?h`<div class="task-description">${i.description}</div>`:""}
        <div class="task-actions">
          <button class="secondary small" @click=${()=>this._startEditTask(i)}>Edit</button>
          <button class="secondary small" @click=${()=>this._startMoveTask(i)}>Move</button>
        </div>
      </div>
    `}};_([ht({attribute:!1})],u.prototype,"hass",2),_([f()],u.prototype,"_boards",2),_([f()],u.prototype,"_tasks",2),_([f()],u.prototype,"_columns",2),_([f()],u.prototype,"_loading",2),_([f()],u.prototype,"_newTaskTitle",2),_([f()],u.prototype,"_newTaskDescription",2),_([f()],u.prototype,"_newColumnName",2),_([f()],u.prototype,"_unsubscribeUpdates",2),_([f()],u.prototype,"_selectedBoardId",2),_([f()],u.prototype,"_selectedColumnId",2),_([f()],u.prototype,"_editingTaskId",2),_([f()],u.prototype,"_editTaskTitle",2),_([f()],u.prototype,"_editTaskDescription",2),_([f()],u.prototype,"_movingTaskId",2),u=_([It("dobeedo-panel")],u)})();
