(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ht;const U=globalThis,F=U.ShadowRoot&&(U.ShadyCSS===void 0||U.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),Z=new WeakMap;let G=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(F&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=Z.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Z.set(e,t))}return t}toString(){return this.cssText}};const ut=s=>new G(typeof s=="string"?s:s+"",void 0,j),gt=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((i,o,a)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[a+1],s[0]);return new G(e,s,j)},_t=(s,t)=>{if(F)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),o=U.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=e.cssText,s.appendChild(i)}},Q=F?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return ut(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:mt,defineProperty:bt,getOwnPropertyDescriptor:yt,getOwnPropertyNames:ft,getOwnPropertySymbols:vt,getPrototypeOf:xt}=Object,f=globalThis,X=f.trustedTypes,kt=X?X.emptyScript:"",W=f.reactiveElementPolyfillSupport,E=(s,t)=>s,H={toAttribute(s,t){switch(t){case Boolean:s=s?kt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},q=(s,t)=>!mt(s,t),tt={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);let D=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=tt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);o!==void 0&&bt(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:a}=yt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:o,set(r){const d=o==null?void 0:o.call(this);a==null||a.call(this,r),this.requestUpdate(t,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??tt}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const t=xt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const e=this.properties,i=[...ft(e),...vt(e)];for(const o of i)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,o]of e)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const o=this._$Eu(e,i);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const o of i)e.unshift(Q(o))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _t(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var a;const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(o!==void 0&&i.reflect===!0){const r=(((a=i.converter)==null?void 0:a.toAttribute)!==void 0?i.converter:H).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){var a,r;const i=this.constructor,o=i._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const d=i.getPropertyOptions(o),n=typeof d.converter=="function"?{fromAttribute:d.converter}:((a=d.converter)==null?void 0:a.fromAttribute)!==void 0?d.converter:H;this._$Em=o;const c=n.fromAttribute(e,d.type);this[o]=c??((r=this._$Ej)==null?void 0:r.get(o))??c,this._$Em=null}}requestUpdate(t,e,i){var o;if(t!==void 0){const a=this.constructor,r=this[t];if(i??(i=a.getPropertyOptions(t)),!((i.hasChanged??q)(r,e)||i.useDefault&&i.reflect&&r===((o=this._$Ej)==null?void 0:o.get(t))&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:a},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??e??this[t]),a!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[a,r]of this._$Ep)this[a]=r;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[a,r]of o){const{wrapped:d}=r,n=this[a];d!==!0||this._$AL.has(a)||n===void 0||this.C(a,void 0,r,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(o=>{var a;return(a=o.hostUpdate)==null?void 0:a.call(o)}),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var o;return(o=i.hostUpdated)==null?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[E("elementProperties")]=new Map,D[E("finalized")]=new Map,W==null||W({ReactiveElement:D}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,z=P.trustedTypes,et=z?z.createPolicy("lit-html",{createHTML:s=>s}):void 0,st="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,it="?"+v,$t=`<${it}>`,k=document,I=()=>k.createComment(""),B=s=>s===null||typeof s!="object"&&typeof s!="function",V=Array.isArray,wt=s=>V(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Y=`[ 	
\f\r]`,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ot=/-->/g,rt=/>/g,$=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),at=/'/g,nt=/"/g,dt=/^(?:script|style|textarea|title)$/i,Tt=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),p=Tt(1),A=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),lt=new WeakMap,w=k.createTreeWalker(k,129);function ct(s,t){if(!V(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return et!==void 0?et.createHTML(t):t}const Dt=(s,t)=>{const e=s.length-1,i=[];let o,a=t===2?"<svg>":t===3?"<math>":"",r=S;for(let d=0;d<e;d++){const n=s[d];let c,_,l=-1,y=0;for(;y<n.length&&(r.lastIndex=y,_=r.exec(n),_!==null);)y=r.lastIndex,r===S?_[1]==="!--"?r=ot:_[1]!==void 0?r=rt:_[2]!==void 0?(dt.test(_[2])&&(o=RegExp("</"+_[2],"g")),r=$):_[3]!==void 0&&(r=$):r===$?_[0]===">"?(r=o??S,l=-1):_[1]===void 0?l=-2:(l=r.lastIndex-_[2].length,c=_[1],r=_[3]===void 0?$:_[3]==='"'?nt:at):r===nt||r===at?r=$:r===ot||r===rt?r=S:(r=$,o=void 0);const x=r===$&&s[d+1].startsWith("/>")?" ":"";a+=r===S?n+$t:l>=0?(i.push(c),n.slice(0,l)+st+n.slice(l)+v+x):n+v+(l===-2?d:x)}return[ct(s,a+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class N{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let a=0,r=0;const d=t.length-1,n=this.parts,[c,_]=Dt(t,e);if(this.el=N.createElement(c,i),w.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(o=w.nextNode())!==null&&n.length<d;){if(o.nodeType===1){if(o.hasAttributes())for(const l of o.getAttributeNames())if(l.endsWith(st)){const y=_[r++],x=o.getAttribute(l).split(v),L=/([.?@])?(.*)/.exec(y);n.push({type:1,index:a,name:L[2],strings:x,ctor:L[1]==="."?Ct:L[1]==="?"?Et:L[1]==="@"?Pt:R}),o.removeAttribute(l)}else l.startsWith(v)&&(n.push({type:6,index:a}),o.removeAttribute(l));if(dt.test(o.tagName)){const l=o.textContent.split(v),y=l.length-1;if(y>0){o.textContent=z?z.emptyScript:"";for(let x=0;x<y;x++)o.append(l[x],I()),w.nextNode(),n.push({type:2,index:++a});o.append(l[y],I())}}}else if(o.nodeType===8)if(o.data===it)n.push({type:2,index:a});else{let l=-1;for(;(l=o.data.indexOf(v,l+1))!==-1;)n.push({type:7,index:a}),l+=v.length-1}a++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function C(s,t,e=s,i){var r,d;if(t===A)return t;let o=i!==void 0?(r=e._$Co)==null?void 0:r[i]:e._$Cl;const a=B(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==a&&((d=o==null?void 0:o._$AO)==null||d.call(o,!1),a===void 0?o=void 0:(o=new a(s),o._$AT(s,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=o:e._$Cl=o),o!==void 0&&(t=C(s,o._$AS(s,t.values),o,i)),t}class At{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=((t==null?void 0:t.creationScope)??k).importNode(e,!0);w.currentNode=o;let a=w.nextNode(),r=0,d=0,n=i[0];for(;n!==void 0;){if(r===n.index){let c;n.type===2?c=new O(a,a.nextSibling,this,t):n.type===1?c=new n.ctor(a,n.name,n.strings,this,t):n.type===6&&(c=new It(a,this,t)),this._$AV.push(c),n=i[++d]}r!==(n==null?void 0:n.index)&&(a=w.nextNode(),r++)}return w.currentNode=k,o}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class O{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),B(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):wt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&B(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){var a;const{values:e,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=N.createElement(ct(i.h,i.h[0]),this.options)),i);if(((a=this._$AH)==null?void 0:a._$AD)===o)this._$AH.p(e);else{const r=new At(o,this),d=r.u(this.options);r.p(e),this.T(d),this._$AH=r}}_$AC(t){let e=lt.get(t.strings);return e===void 0&&lt.set(t.strings,e=new N(t)),e}k(t){V(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const a of t)o===e.length?e.push(i=new O(this.O(I()),this.O(I()),this,this.options)):i=e[o],i._$AI(a),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t!==this._$AB;){const o=t.nextSibling;t.remove(),t=o}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,a){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(t,e=this,i,o){const a=this.strings;let r=!1;if(a===void 0)t=C(this,t,e,0),r=!B(t)||t!==this._$AH&&t!==A,r&&(this._$AH=t);else{const d=t;let n,c;for(t=a[0],n=0;n<a.length-1;n++)c=C(this,d[i+n],e,n),c===A&&(c=this._$AH[n]),r||(r=!B(c)||c!==this._$AH[n]),c===m?t=m:t!==m&&(t+=(c??"")+a[n+1]),this._$AH[n]=c}r&&!o&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ct extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}}class Et extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}}class Pt extends R{constructor(t,e,i,o,a){super(t,e,i,o,a),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??m)===A)return;const i=this._$AH,o=t===m&&i!==m||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==m&&(i===m||o);o&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class It{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const J=P.litHtmlPolyfillSupport;J==null||J(N,O),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.1");const Bt=(s,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let o=i._$litPart$;if(o===void 0){const a=(e==null?void 0:e.renderBefore)??null;i._$litPart$=o=new O(t.insertBefore(I(),a),a,void 0,e??{})}return o._$AI(s),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis;class M extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Bt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return A}}M._$litElement$=!0,M.finalized=!0,(ht=T.litElementHydrateSupport)==null||ht.call(T,{LitElement:M});const K=T.litElementPolyfillSupport;K==null||K({LitElement:M}),(T.litElementVersions??(T.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nt={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:q},Ot=(s=Nt,t,e)=>{const{kind:i,metadata:o}=e;let a=globalThis.litPropertyMetadata.get(o);if(a===void 0&&globalThis.litPropertyMetadata.set(o,a=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),a.set(e.name,s),i==="accessor"){const{name:r}=e;return{set(d){const n=t.get.call(this);t.set.call(this,d),this.requestUpdate(r,n,s)},init(d){return d!==void 0&&this.C(r,void 0,s,d),d}}}if(i==="setter"){const{name:r}=e;return function(d){const n=this[r];t.call(this,d),this.requestUpdate(r,n,s)}}throw Error("Unsupported decorator location: "+i)};function pt(s){return(t,e)=>typeof e=="object"?Ot(s,t,e):((i,o,a)=>{const r=o.hasOwnProperty(a);return o.constructor.createProperty(a,i),r?Object.getOwnPropertyDescriptor(o,a):void 0})(s,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(s){return pt({...s,state:!0,attribute:!1})}class b{constructor(t){this.connection=t}async getBoards(){return(await this.connection.sendMessagePromise({type:"dobeedo/get_boards"})).boards??[]}async createBoard(t,e){const i={type:"dobeedo/create_board",name:t};return e!==void 0&&(i.description=e),(await this.connection.sendMessagePromise(i)).board}async getColumns(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_columns",board_id:t})).columns??[]}async createColumn(t,e,i){return(await this.connection.sendMessagePromise({type:"dobeedo/create_column",board_id:t,name:e,order_index:i})).column}async getTasks(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_tasks",board_id:t})).tasks??[]}async createTask(t,e,i,o,a,r,d){const n={type:"dobeedo/create_task",board_id:t,column_id:e,title:i};return o!==void 0&&(n.description=o),a!==void 0&&(n.due_date=a),r!==void 0&&(n.priority=r),d!==void 0&&(n.tags=d),(await this.connection.sendMessagePromise(n)).task}async updateTask(t,e){const i={type:"dobeedo/update_task",task_id:t};return e.title!==void 0&&(i.title=e.title),e.description!==void 0&&(i.description=e.description),e.due_date!==void 0&&(i.due_date=e.due_date),e.priority!==void 0&&(i.priority=e.priority),e.tags!==void 0&&(i.tags=e.tags),(await this.connection.sendMessagePromise(i)).task}async moveTask(t,e,i){const o={type:"dobeedo/move_task",task_id:t,target_column_id:e};return i!==void 0&&(o.target_sort_index=i),(await this.connection.sendMessagePromise(o)).task}async deleteTask(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_task",task_id:t})}async deleteColumn(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_column",column_id:t})}async deleteBoard(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_board",board_id:t})}subscribeUpdates(t){const e=this.connection;if(e.subscribeEvents){console.debug("DoBeeDo: using connection.subscribeEvents for updates");const a=e.subscribeEvents(r=>{if(console.debug("DoBeeDo: raw WS message via subscribeEvents",r),typeof(r==null?void 0:r.event_type)=="string"&&r.data){const d=r.event_type;if(d.startsWith("dobeedo_")){const n=d.replace(/^dobeedo_/,"");t({event_type:n,payload:r.data,raw_type:d})}return}(r==null?void 0:r.type)==="dobeedo/event"&&r.event_type&&r.payload&&t({event_type:r.event_type,payload:r.payload,raw_type:r.raw_type})});return()=>{console.debug("DoBeeDo: unsubscribe from subscribeEvents"),a()}}if(!e.subscribeMessage)return console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available"),()=>{};const i=a=>{console.debug("DoBeeDo: raw WS message in subscribeUpdates handler",a),(a==null?void 0:a.type)==="dobeedo/event"&&a.event_type&&a.payload&&t({event_type:a.event_type,payload:a.payload,raw_type:a.raw_type})};console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");const o=e.subscribeMessage(i,{type:"dobeedo/subscribe_updates"});return()=>{console.debug("DoBeeDo: unsubscribe from subscribe_updates"),o()}}async listTodoEntities(){return(await this.connection.sendMessagePromise({type:"dobeedo/list_todo_entities"})).entities??[]}async importFromTodo(t,e,i,o){const a={type:"dobeedo/import_from_todo",entity_id:t,board_id:e,column_id:i};return o!==void 0&&(a.status_filter=o),await this.connection.sendMessagePromise(a)}async importAllTodos(t,e){const i={type:"dobeedo/import_all_todos",board_id:t};return e!==void 0&&(i.status_filter=e),await this.connection.sendMessagePromise(i)}}var Mt=Object.defineProperty,Ut=Object.getOwnPropertyDescriptor,u=(s,t,e,i)=>{for(var o=i>1?void 0:i?Ut(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(o=(i?r(t,e,o):r(o))||o);return i&&o&&Mt(t,e,o),o};let h=class extends M{constructor(){super(...arguments),this._boards=[],this._tasks=[],this._columns=[],this._loading=!1,this._newTaskTitles={},this._newTaskDescriptions={},this._newTaskDueDates={},this._newTaskPriorities={},this._newTaskTags={},this._newColumnName="",this._newBoardName="",this._isAddingBoard=!1,this._unsubscribeUpdates=null,this._selectedBoardId=null,this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate="",this._editTaskPriority="",this._editTaskTags="",this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null,this._importingColumnId=null,this._todoEntities=[],this._selectedTodoEntity=null,this._importStatusFilter=""}static get styles(){return gt`
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
        transform: rotate(2deg);
      }

      .column.drag-active {
        border: 3px solid var(--primary-color);
        border-style: dashed;
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.08);
        box-shadow: 0 0 0 2px rgba(var(--rgb-primary-color, 33, 150, 243), 0.2);
      }

      .column.drag-over {
        border: 4px solid var(--primary-color);
        border-style: solid;
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.15);
        box-shadow: 0 0 30px rgba(var(--rgb-primary-color, 33, 150, 243), 0.5),
                    0 0 0 4px rgba(var(--rgb-primary-color, 33, 150, 243), 0.3);
        transform: scale(1.02);
        transition: all 0.2s ease;
      }

      .tasks-list.drag-over {
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.2);
        border: 3px dashed var(--primary-color);
        border-radius: 8px;
        min-height: 150px;
        box-shadow: inset 0 0 20px rgba(var(--rgb-primary-color, 33, 150, 243), 0.3);
      }

      /* Drop indicator - more prominent */
      .drop-indicator {
        height: 4px;
        background: var(--primary-color);
        margin: 8px 0;
        border-radius: 3px;
        box-shadow: 0 0 12px var(--primary-color),
                    0 0 4px var(--primary-color);
        position: relative;
        z-index: 10;
        animation: pulse-indicator 1s ease-in-out infinite;
      }

      @keyframes pulse-indicator {
        0%, 100% {
          opacity: 1;
          box-shadow: 0 0 12px var(--primary-color), 0 0 4px var(--primary-color);
        }
        50% {
          opacity: 0.7;
          box-shadow: 0 0 20px var(--primary-color), 0 0 8px var(--primary-color);
        }
      }

      .drop-indicator::before {
        content: "";
        position: absolute;
        left: -6px;
        top: -4px;
        width: 12px;
        height: 12px;
        background: var(--primary-color);
        border-radius: 50%;
        box-shadow: 0 0 8px var(--primary-color);
      }

      .drop-indicator::after {
        content: "";
        position: absolute;
        right: -6px;
        top: -4px;
        width: 12px;
        height: 12px;
        background: var(--primary-color);
        border-radius: 50%;
        box-shadow: 0 0 8px var(--primary-color);
      }

      /* Drop preview - ghost of the task */
      .drop-preview {
        background: var(--card-background-color);
        border: 2px dashed var(--primary-color);
        border-left: 4px solid var(--primary-color);
        border-radius: 8px;
        padding: 12px;
        margin: 8px 0;
        opacity: 0.6;
        box-shadow: 0 4px 16px rgba(var(--rgb-primary-color, 33, 150, 243), 0.3);
        animation: fade-in 0.2s ease;
      }

      @keyframes fade-in {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 0.6;
          transform: scale(1);
        }
      }

      .drop-preview-title {
        font-weight: 500;
        color: var(--primary-text-color);
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

      /* Prevent drag styling on add-column-mock */
      .add-column-mock.drag-active {
        border: 2px dashed var(--primary-text-color);
        background: transparent;
        opacity: 0.3;
        box-shadow: none;
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
    `}updated(s){if(s.has("hass")&&this.hass&&(this._fetchBoards(),!this._unsubscribeUpdates)){const t=new b(this.hass.connection);console.debug("DoBeeDo: registering subscribeUpdates"),this._unsubscribeUpdates=t.subscribeUpdates(e=>{var i,o;if(console.debug("DoBeeDo event received in panel",e),e.event_type.startsWith("task_")){const a=(i=e.payload.task)==null?void 0:i.board_id;console.debug("DoBeeDo task event for board",a,"selected",this._selectedBoardId),a&&a===this._selectedBoardId&&this._refreshTasksForSelectedBoard()}else if(e.event_type.startsWith("column_")){const a=(o=e.payload.column)==null?void 0:o.board_id;console.debug("DoBeeDo column event for board",a,"selected",this._selectedBoardId),a&&a===this._selectedBoardId&&this._refreshColumnsAndTasks()}else e.event_type.startsWith("board_")&&(console.debug("DoBeeDo board event"),this._fetchBoards())})}}async _fetchBoards(){if(this.hass){this._loading=!0;try{const s=new b(this.hass.connection);this._boards=await s.getBoards(),!this._selectedBoardId&&this._boards.length>0&&(this._selectedBoardId=this._boards[0].id),await this._refreshColumnsAndTasks()}catch(s){console.error("Failed to load DoBeeDo data",s)}finally{this._loading=!1}}}async _refreshColumnsAndTasks(){if(!this.hass||!this._selectedBoardId){this._columns=[],this._tasks=[];return}const s=new b(this.hass.connection);this._columns=await s.getColumns(this._selectedBoardId),this._tasks=await s.getTasks(this._selectedBoardId)}async _refreshTasksForSelectedBoard(){if(!this.hass||!this._selectedBoardId){this._tasks=[];return}const s=new b(this.hass.connection);this._tasks=await s.getTasks(this._selectedBoardId)}_handleSelectBoard(s){this._selectedBoardId!==s.id&&(this._selectedBoardId=s.id,this._refreshColumnsAndTasks())}async _handleCreateTask(s){const t=this._newTaskTitles[s]||"",e=this._newTaskDescriptions[s]||"",i=this._newTaskDueDates[s]||"",o=this._newTaskPriorities[s]||"",a=this._newTaskTags[s]||"";if(!this.hass||!this._selectedBoardId||!t.trim())return;const r=new b(this.hass.connection),d=this._boards.find(c=>c.id===this._selectedBoardId);if(!d)return;const n=a.split(",").map(c=>c.trim()).filter(c=>c.length>0);try{await r.createTask(d.id,s,t.trim(),e.trim()||void 0,i.trim()||void 0,o.trim()||void 0,n.length>0?n:void 0),delete this._newTaskTitles[s],delete this._newTaskDescriptions[s],delete this._newTaskDueDates[s],delete this._newTaskPriorities[s],delete this._newTaskTags[s],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions},this._newTaskDueDates={...this._newTaskDueDates},this._newTaskPriorities={...this._newTaskPriorities},this._newTaskTags={...this._newTaskTags}}catch(c){console.error("Failed to create DoBeeDo task",c)}}async _handleCreateColumn(){if(!this.hass||!this._selectedBoardId||!this._newColumnName.trim())return;const s=new b(this.hass.connection);try{await s.createColumn(this._selectedBoardId,this._newColumnName.trim()),this._newColumnName=""}catch(t){console.error("Failed to create DoBeeDo column",t)}}async _handleCreateBoard(){if(!this.hass||!this._newBoardName.trim())return;const s=new b(this.hass.connection);try{const t=await s.createBoard(this._newBoardName.trim());this._newBoardName="",this._isAddingBoard=!1,await this._fetchBoards(),this._selectedBoardId=t.id,await this._refreshColumnsAndTasks()}catch(t){console.error("Failed to create DoBeeDo board",t)}}async _handleDeleteBoard(s){if(!this.hass||!window.confirm(`Delete board "${s.name}" and all its columns and tasks?`))return;const t=new b(this.hass.connection);try{await t.deleteBoard(s.id),await this._fetchBoards(),this._selectedBoardId===s.id&&(this._selectedBoardId=this._boards.length>0?this._boards[0].id:null,await this._refreshColumnsAndTasks())}catch(e){console.error("Failed to delete DoBeeDo board",e)}}_startEditTask(s){this._editingTaskId=s.id,this._editTaskTitle=s.title,this._editTaskDescription=s.description??"",this._editTaskDueDate=s.due_date??"",this._editTaskPriority=s.priority??"",this._editTaskTags=s.tags?s.tags.join(", "):""}_cancelEditTask(){this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate="",this._editTaskPriority="",this._editTaskTags=""}async _saveEditTask(){if(!this.hass||!this._editingTaskId)return;const s=this._tasks.find(l=>l.id===this._editingTaskId);if(!s)return;const t=this._editTaskTitle.trim();if(!t)return;const e={};t!==s.title&&(e.title=t);const i=this._editTaskDescription.trim();i!==(s.description??"")&&(e.description=i===""?null:i);const o=this._editTaskDueDate.trim();o!==(s.due_date??"")&&(e.due_date=o===""?null:o);const a=this._editTaskPriority.trim();a!==(s.priority??"")&&(e.priority=a===""?null:a);const d=this._editTaskTags.trim().split(",").map(l=>l.trim()).filter(l=>l.length>0),n=s.tags||[];if((d.length!==n.length||d.some((l,y)=>l!==n[y]))&&(e.tags=d.length>0?d:null),!e.title&&e.description===void 0&&e.due_date===void 0&&e.priority===void 0&&e.tags===void 0){this._cancelEditTask();return}const _=new b(this.hass.connection);try{await _.updateTask(this._editingTaskId,e),this._cancelEditTask()}catch(l){console.error("Failed to update DoBeeDo task",l)}}_handleDragStart(s,t){this._draggingTaskId=s.id,t.dataTransfer&&(t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",s.id))}_handleDragEnd(){this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null}_handleDragOver(s){s.preventDefault(),s.dataTransfer&&(s.dataTransfer.dropEffect="move")}_handleDragOverTasksList(s,t){if(t.preventDefault(),t.stopPropagation(),!this._draggingTaskId)return;const e=t.currentTarget,i=Array.from(e.querySelectorAll(".task-card:not(.dragging):not(.drop-preview)")),o=t.clientY;if(i.length===0){this._dropIndicatorPosition={columnId:s,index:0};return}let a=i.length;for(let r=0;r<i.length;r++){const d=i[r].getBoundingClientRect(),n=d.top+d.height/2;if(o<n){a=r;break}}(!this._dropIndicatorPosition||this._dropIndicatorPosition.columnId!==s||this._dropIndicatorPosition.index!==a)&&(this._dropIndicatorPosition={columnId:s,index:a})}_handleDragEnterColumn(s,t){t.stopPropagation(),this._dragOverColumnId=s}_handleDragLeaveColumn(s){const t=s.currentTarget,e=s.relatedTarget;(!e||!t.contains(e))&&(this._dragOverColumnId=null,this._dropIndicatorPosition=null)}_isTaskOverdue(s){if(!s.due_date)return!1;const t=new Date;return t.setHours(0,0,0,0),new Date(s.due_date)<t}_formatDueDate(s){const t=new Date(s),e=new Date;e.setHours(0,0,0,0);const i=new Date(e);i.setDate(i.getDate()+1);const o=new Date(s);if(o.setHours(0,0,0,0),o.getTime()===e.getTime())return"Today";if(o.getTime()===i.getTime())return"Tomorrow";{const a={month:"short",day:"numeric"};return t.toLocaleDateString(void 0,a)}}async _handleDrop(s,t){if(t.preventDefault(),t.stopPropagation(),this._dragOverColumnId=null,!this._draggingTaskId||!this.hass)return;const e=this._tasks.find(n=>n.id===this._draggingTaskId);if(!e){this._draggingTaskId=null;return}let o=this._tasks.filter(n=>n.column_id===s&&n.id!==this._draggingTaskId).sort((n,c)=>n.sort_index-c.sort_index).length;const a=t.currentTarget,r=a.classList.contains("tasks-list")?a:a.querySelector(".tasks-list");if(r){const n=Array.from(r.querySelectorAll(".task-card:not(.dragging)")),c=t.clientY;for(let _=0;_<n.length;_++){const l=n[_].getBoundingClientRect(),y=l.top+l.height/2;if(c<y){o=_;break}}}const d=new b(this.hass.connection);try{await d.moveTask(e.id,s,o),this._draggingTaskId=null,this._dropIndicatorPosition=null}catch(n){console.error("Failed to move task via drag-and-drop",n),this._draggingTaskId=null,this._dropIndicatorPosition=null}}async _handleDeleteTask(s){if(!this.hass||!window.confirm(`Delete task "${s.title}"?`))return;const t=new b(this.hass.connection);try{await t.deleteTask(s.id)}catch(e){console.error("Failed to delete DoBeeDo task",e)}}async _handleDeleteColumn(s){if(!this.hass)return;const e=this._tasks.filter(a=>a.column_id===s.id).length,i=e>0?`Delete column "${s.name}" and ${e} task${e===1?"":"s"}?`:`Delete column "${s.name}"?`;if(!window.confirm(i))return;const o=new b(this.hass.connection);try{await o.deleteColumn(s.id)}catch(a){console.error("Failed to delete DoBeeDo column",a)}}async _startImport(s){if(!this.hass)return;const t=new b(this.hass.connection);try{this._todoEntities=await t.listTodoEntities(),this._importingColumnId=s,this._selectedTodoEntity=null,this._importStatusFilter=""}catch(e){console.error("Failed to load todo entities",e)}}_cancelImport(){this._importingColumnId=null,this._todoEntities=[],this._selectedTodoEntity=null,this._importStatusFilter=""}async _handleImport(){if(!this.hass||!this._selectedTodoEntity||!this._importingColumnId||!this._selectedBoardId)return;const s=new b(this.hass.connection);try{const t=await s.importFromTodo(this._selectedTodoEntity,this._selectedBoardId,this._importingColumnId,this._importStatusFilter||void 0);alert(`Successfully imported ${t.imported_count} task${t.imported_count===1?"":"s"}!`),this._cancelImport()}catch(t){console.error("Failed to import from todo",t),alert("Failed to import tasks. See console for details.")}}async _handleImportAll(){if(!this.hass||!this._selectedBoardId||!window.confirm("Import all Home Assistant todo lists as columns? This will create one column per todo list and import all their items."))return;const s=new b(this.hass.connection);try{const t=await s.importAllTodos(this._selectedBoardId);alert(`Successfully imported ${t.columns_created} todo list${t.columns_created===1?"":"s"} with ${t.total_imported} task${t.total_imported===1?"":"s"}!`)}catch(t){console.error("Failed to import all todos",t),alert("Failed to import todo lists. See console for details.")}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeUpdates&&(this._unsubscribeUpdates(),this._unsubscribeUpdates=null)}render(){return p`
      <h1>DoBeeDo</h1>
      ${this._loading?p`<p>Loading boards…</p>`:this._renderContent()}
      ${this._importingColumnId?this._renderImportDialog():""}
    `}_renderContent(){return this._boards.length===0?p`
        <div class="empty-state">
          <p>No boards available yet.</p>
          <p>Create a board using the input above to get started!</p>
        </div>
      `:p`
      ${this._renderBoardSelector()}
      <div class="board-content">
        ${this._selectedBoardId?this._renderBoard():p`<p>Select a board to begin</p>`}
      </div>
    `}_renderBoardSelector(){return p`
      <div class="board-tabs">
        ${this._boards.map(s=>p`
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
        ${this._isAddingBoard?p`
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
            `:p`
              <div
                class="board-tab add-tab"
                @click=${()=>{this._isAddingBoard=!0,setTimeout(()=>{var t;const s=(t=this.shadowRoot)==null?void 0:t.querySelector(".add-board-input");s==null||s.focus()},50)}}
                title="Add new board"
              >
                + Add Board
              </div>
            `}
      </div>
    `}_renderBoard(){const s=this._columns.length===0;return p`
      ${s?p`
            <div style="margin-bottom: 16px; padding: 16px; background: var(--card-background-color); border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 12px 0; color: var(--secondary-text-color);">
                No columns yet. Create columns manually or import from your Home Assistant todo lists.
              </p>
              <button class="primary" @click=${()=>this._handleImportAll()}>
                📥 Import All Todo Lists
              </button>
            </div>
          `:p`
            <div style="margin-bottom: 12px; display: flex; justify-content: flex-end;">
              <button class="secondary small" @click=${()=>this._handleImportAll()} title="Import all todo lists as columns">
                📥 Import All
              </button>
            </div>
          `}
      <div class="columns-container">
        ${this._columns.map(t=>this._renderColumn(t))} ${this._renderAddColumnMock()}
      </div>
    `}_renderAddColumnMock(){const s=this._draggingTaskId!==null;return p`
      <div class="column add-column-mock ${s?"drag-active":""}">
        <div class="add-column-form">
          <input
            type="text"
            class="add-column-input"
            .value=${this._newColumnName}
            placeholder="Add column..."
            @input=${t=>{const e=t.target;this._newColumnName=e.value}}
            @keydown=${t=>{t.key==="Enter"&&this._newColumnName.trim()&&this._handleCreateColumn()}}
          />
          ${this._newColumnName.trim()?p`
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
    `}_renderColumn(s){var o,a;const t=this._tasks.filter(r=>r.column_id===s.id).sort((r,d)=>r.sort_index-d.sort_index),e=this._dragOverColumnId===s.id,i=this._draggingTaskId!==null;return p`
      <div
        class="column ${i?"drag-active":""} ${e?"drag-over":""}"
        @dragover=${this._handleDragOver}
        @dragenter=${r=>this._handleDragEnterColumn(s.id,r)}
        @dragleave=${r=>this._handleDragLeaveColumn(r)}
        @drop=${r=>this._handleDrop(s.id,r)}
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
          class="tasks-list ${e?"drag-over":""}"
          @dragover=${r=>this._handleDragOverTasksList(s.id,r)}
          @drop=${r=>this._handleDrop(s.id,r)}
        >
          ${t.length===0?p`
                ${((o=this._dropIndicatorPosition)==null?void 0:o.columnId)===s.id&&((a=this._dropIndicatorPosition)==null?void 0:a.index)===0?this._renderDropPreview():""}
                <div class="empty-state" style="padding: 16px; font-size: 13px;">
                  No tasks yet
                </div>
              `:t.map((r,d)=>{var n,c,_,l;return p`
                  ${((n=this._dropIndicatorPosition)==null?void 0:n.columnId)===s.id&&((c=this._dropIndicatorPosition)==null?void 0:c.index)===d?this._renderDropPreview():""}
                  ${this._renderTask(r)}
                  ${((_=this._dropIndicatorPosition)==null?void 0:_.columnId)===s.id&&((l=this._dropIndicatorPosition)==null?void 0:l.index)===d+1&&d===t.length-1?this._renderDropPreview():""}
                `})}
        </div>
        <div class="add-task-form">
          <input
            type="text"
            class="add-task-input"
            .value=${this._newTaskTitles[s.id]||""}
            placeholder="Add a task..."
            @input=${r=>{const d=r.target;this._newTaskTitles={...this._newTaskTitles,[s.id]:d.value}}}
            @keydown=${r=>{const d=this._newTaskTitles[s.id]||"";r.key==="Enter"&&d.trim()&&this._handleCreateTask(s.id)}}
          />
          ${(this._newTaskTitles[s.id]||"").trim()?p`
                <div class="add-task-actions">
                  <input
                    type="text"
                    class="add-task-input"
                    .value=${this._newTaskDescriptions[s.id]||""}
                    placeholder="Description (optional)"
                    @input=${r=>{const d=r.target;this._newTaskDescriptions={...this._newTaskDescriptions,[s.id]:d.value}}}
                    @keydown=${r=>{r.key==="Enter"&&this._handleCreateTask(s.id)}}
                  />
                  <input
                    type="date"
                    class="add-task-input"
                    .value=${this._newTaskDueDates[s.id]||""}
                    placeholder="Due date (optional)"
                    @input=${r=>{const d=r.target;this._newTaskDueDates={...this._newTaskDueDates,[s.id]:d.value}}}
                    @keydown=${r=>{r.key==="Enter"&&this._handleCreateTask(s.id)}}
                  />
                  <select
                    class="add-task-input"
                    .value=${this._newTaskPriorities[s.id]||""}
                    @change=${r=>{const d=r.target;this._newTaskPriorities={...this._newTaskPriorities,[s.id]:d.value}}}
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
                    @input=${r=>{const d=r.target;this._newTaskTags={...this._newTaskTags,[s.id]:d.value}}}
                    @keydown=${r=>{r.key==="Enter"&&this._handleCreateTask(s.id)}}
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
    `}_renderTask(s){if(this._editingTaskId===s.id)return p`
        <div class="task-card" style="padding: 16px;">
          <div style="margin-bottom: 8px;">
            <input
              type="text"
              .value=${this._editTaskTitle}
              placeholder="Task title"
              @input=${o=>{const a=o.target;this._editTaskTitle=a.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="text"
              .value=${this._editTaskDescription}
              placeholder="Description (optional)"
              @input=${o=>{const a=o.target;this._editTaskDescription=a.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="date"
              .value=${this._editTaskDueDate}
              placeholder="Due date (optional)"
              @input=${o=>{const a=o.target;this._editTaskDueDate=a.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <select
              .value=${this._editTaskPriority}
              @change=${o=>{const a=o.target;this._editTaskPriority=a.value}}
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
              @input=${o=>{const a=o.target;this._editTaskTags=a.value}}
              style="width: 100%;"
            />
          </div>
          <div class="task-actions">
            <button class="primary small" @click=${()=>this._saveEditTask()}>Save</button>
            <button class="secondary small" @click=${()=>this._cancelEditTask()}>Cancel</button>
          </div>
        </div>
      `;const e=this._draggingTaskId===s.id,i=this._isTaskOverdue(s);return p`
      <div
        class="task-card ${e?"dragging":""} ${i?"overdue":""}"
        draggable="true"
        @dragstart=${o=>this._handleDragStart(s,o)}
        @dragend=${this._handleDragEnd}
      >
        <div class="task-title">${s.title}</div>
        ${s.description?p`<div class="task-description">${s.description}</div>`:""}
        ${s.priority?p`<div class="task-priority ${s.priority}">${s.priority}</div>`:""}
        ${s.tags&&s.tags.length>0?p`<div class="task-tags">
              ${s.tags.map(o=>p`<span class="task-tag">${o}</span>`)}
            </div>`:""}
        ${s.due_date?p`<div class="task-due-date ${i?"overdue":""}">
              📅 ${this._formatDueDate(s.due_date)}
            </div>`:""}
        <div class="task-actions">
          <button class="secondary small" @click=${()=>this._startEditTask(s)}>Edit</button>
          <button class="warning small" @click=${()=>this._handleDeleteTask(s)}>Delete</button>
        </div>
      </div>
    `}_renderDropPreview(){if(!this._draggingTaskId)return p``;const s=this._tasks.find(t=>t.id===this._draggingTaskId);return s?p`
      <div class="drop-preview">
        <div class="drop-preview-title">${s.title}</div>
        ${s.priority?p`<div class="task-priority ${s.priority}">${s.priority}</div>`:""}
      </div>
    `:p``}_renderImportDialog(){const s=this._columns.find(e=>e.id===this._importingColumnId),t=(s==null?void 0:s.name)||"Unknown";return p`
      <div class="import-dialog-overlay" @click=${this._cancelImport}>
        <div class="import-dialog" @click=${e=>e.stopPropagation()}>
          <div class="import-dialog-title">Import from To-do List to "${t}"</div>
          <div class="import-dialog-content">
            ${this._todoEntities.length===0?p`<p style="color: var(--secondary-text-color);">No to-do lists found in Home Assistant.</p>`:p`
                  <div>
                    <label class="form-label">Select To-do List</label>
                    <select
                      style="width: 100%;"
                      .value=${this._selectedTodoEntity||""}
                      @change=${e=>{const i=e.target;this._selectedTodoEntity=i.value}}
                    >
                      <option value="">-- Select a to-do list --</option>
                      ${this._todoEntities.map(e=>p`
                          <option value=${e.entity_id}>${e.name}</option>
                        `)}
                    </select>
                  </div>
                  <div>
                    <label class="form-label">Status Filter (optional)</label>
                    <select
                      style="width: 100%;"
                      .value=${this._importStatusFilter}
                      @change=${e=>{const i=e.target;this._importStatusFilter=i.value}}
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
    `}};u([pt({attribute:!1})],h.prototype,"hass",2),u([g()],h.prototype,"_boards",2),u([g()],h.prototype,"_tasks",2),u([g()],h.prototype,"_columns",2),u([g()],h.prototype,"_loading",2),u([g()],h.prototype,"_newTaskTitles",2),u([g()],h.prototype,"_newTaskDescriptions",2),u([g()],h.prototype,"_newTaskDueDates",2),u([g()],h.prototype,"_newTaskPriorities",2),u([g()],h.prototype,"_newTaskTags",2),u([g()],h.prototype,"_newColumnName",2),u([g()],h.prototype,"_newBoardName",2),u([g()],h.prototype,"_isAddingBoard",2),u([g()],h.prototype,"_unsubscribeUpdates",2),u([g()],h.prototype,"_selectedBoardId",2),u([g()],h.prototype,"_editingTaskId",2),u([g()],h.prototype,"_editTaskTitle",2),u([g()],h.prototype,"_editTaskDescription",2),u([g()],h.prototype,"_editTaskDueDate",2),u([g()],h.prototype,"_editTaskPriority",2),u([g()],h.prototype,"_editTaskTags",2),u([g()],h.prototype,"_draggingTaskId",2),u([g()],h.prototype,"_dragOverColumnId",2),u([g()],h.prototype,"_dropIndicatorPosition",2),u([g()],h.prototype,"_importingColumnId",2),u([g()],h.prototype,"_todoEntities",2),u([g()],h.prototype,"_selectedTodoEntity",2),u([g()],h.prototype,"_importStatusFilter",2),h=u([St("dobeedo-panel")],h)})();
