(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pt;const U=globalThis,F=U.ShadowRoot&&(U.ShadyCSS===void 0||U.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),X=new WeakMap;let Z=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(F&&t===void 0){const o=e!==void 0&&e.length===1;o&&(t=X.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&X.set(e,t))}return t}toString(){return this.cssText}};const ut=s=>new Z(typeof s=="string"?s:s+"",void 0,j),_t=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((o,i,a)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[a+1],s[0]);return new Z(e,s,j)},gt=(s,t)=>{if(F)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const o=document.createElement("style"),i=U.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=e.cssText,s.appendChild(o)}},G=F?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return ut(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:mt,defineProperty:bt,getOwnPropertyDescriptor:ft,getOwnPropertyNames:yt,getOwnPropertySymbols:vt,getPrototypeOf:kt}=Object,y=globalThis,Q=y.trustedTypes,xt=Q?Q.emptyScript:"",Y=y.reactiveElementPolyfillSupport,C=(s,t)=>s,H={toAttribute(s,t){switch(t){case Boolean:s=s?xt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},q=(s,t)=>!mt(s,t),tt={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=tt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);i!==void 0&&bt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:a}=ft(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){const n=i==null?void 0:i.call(this);a==null||a.call(this,r),this.requestUpdate(t,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??tt}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=kt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,o=[...yt(e),...vt(e)];for(const i of o)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[o,i]of e)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[e,o]of this.elementProperties){const i=this._$Eu(e,o);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const i of o)e.unshift(G(i))}else t!==void 0&&e.push(G(t));return e}static _$Eu(t,e){const o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var o;return(o=e.hostConnected)==null?void 0:o.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var o;return(o=e.hostDisconnected)==null?void 0:o.call(e)})}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){var a;const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(i!==void 0&&o.reflect===!0){const r=(((a=o.converter)==null?void 0:a.toAttribute)!==void 0?o.converter:H).toAttribute(e,o.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){var a,r;const o=this.constructor,i=o._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const n=o.getPropertyOptions(i),d=typeof n.converter=="function"?{fromAttribute:n.converter}:((a=n.converter)==null?void 0:a.fromAttribute)!==void 0?n.converter:H;this._$Em=i;const l=d.fromAttribute(e,n.type);this[i]=l??((r=this._$Ej)==null?void 0:r.get(i))??l,this._$Em=null}}requestUpdate(t,e,o){var i;if(t!==void 0){const a=this.constructor,r=this[t];if(o??(o=a.getPropertyOptions(t)),!((o.hasChanged??q)(r,e)||o.useDefault&&o.reflect&&r===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(a._$Eu(t,o))))return;this.C(t,e,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:a},r){o&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??e??this[t]),a!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[a,r]of this._$Ep)this[a]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[a,r]of i){const{wrapped:n}=r,d=this[a];n!==!0||this._$AL.has(a)||d===void 0||this.C(a,void 0,r,d)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(o=this._$EO)==null||o.forEach(i=>{var a;return(a=i.hostUpdate)==null?void 0:a.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(o=>{var i;return(i=o.hostUpdated)==null?void 0:i.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[C("elementProperties")]=new Map,A[C("finalized")]=new Map,Y==null||Y({ReactiveElement:A}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=globalThis,R=I.trustedTypes,et=R?R.createPolicy("lit-html",{createHTML:s=>s}):void 0,st="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,ot="?"+v,$t=`<${ot}>`,x=document,P=()=>x.createComment(""),S=s=>s===null||typeof s!="object"&&typeof s!="function",W=Array.isArray,wt=s=>W(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",V=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,it=/-->/g,rt=/>/g,$=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),at=/'/g,nt=/"/g,dt=/^(?:script|style|textarea|title)$/i,Tt=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),_=Tt(1),D=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),lt=new WeakMap,w=x.createTreeWalker(x,129);function ct(s,t){if(!W(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return et!==void 0?et.createHTML(t):t}const At=(s,t)=>{const e=s.length-1,o=[];let i,a=t===2?"<svg>":t===3?"<math>":"",r=B;for(let n=0;n<e;n++){const d=s[n];let l,g,c=-1,f=0;for(;f<d.length&&(r.lastIndex=f,g=r.exec(d),g!==null);)f=r.lastIndex,r===B?g[1]==="!--"?r=it:g[1]!==void 0?r=rt:g[2]!==void 0?(dt.test(g[2])&&(i=RegExp("</"+g[2],"g")),r=$):g[3]!==void 0&&(r=$):r===$?g[0]===">"?(r=i??B,c=-1):g[1]===void 0?c=-2:(c=r.lastIndex-g[2].length,l=g[1],r=g[3]===void 0?$:g[3]==='"'?nt:at):r===nt||r===at?r=$:r===it||r===rt?r=B:(r=$,i=void 0);const k=r===$&&s[n+1].startsWith("/>")?" ":"";a+=r===B?d+$t:c>=0?(o.push(l),d.slice(0,c)+st+d.slice(c)+v+k):d+v+(c===-2?n:k)}return[ct(s,a+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]};class M{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let a=0,r=0;const n=t.length-1,d=this.parts,[l,g]=At(t,e);if(this.el=M.createElement(l,o),w.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=w.nextNode())!==null&&d.length<n;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(st)){const f=g[r++],k=i.getAttribute(c).split(v),z=/([.?@])?(.*)/.exec(f);d.push({type:1,index:a,name:z[2],strings:k,ctor:z[1]==="."?Et:z[1]==="?"?Ct:z[1]==="@"?It:L}),i.removeAttribute(c)}else c.startsWith(v)&&(d.push({type:6,index:a}),i.removeAttribute(c));if(dt.test(i.tagName)){const c=i.textContent.split(v),f=c.length-1;if(f>0){i.textContent=R?R.emptyScript:"";for(let k=0;k<f;k++)i.append(c[k],P()),w.nextNode(),d.push({type:2,index:++a});i.append(c[f],P())}}}else if(i.nodeType===8)if(i.data===ot)d.push({type:2,index:a});else{let c=-1;for(;(c=i.data.indexOf(v,c+1))!==-1;)d.push({type:7,index:a}),c+=v.length-1}a++}}static createElement(t,e){const o=x.createElement("template");return o.innerHTML=t,o}}function E(s,t,e=s,o){var r,n;if(t===D)return t;let i=o!==void 0?(r=e._$Co)==null?void 0:r[o]:e._$Cl;const a=S(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==a&&((n=i==null?void 0:i._$AO)==null||n.call(i,!1),a===void 0?i=void 0:(i=new a(s),i._$AT(s,e,o)),o!==void 0?(e._$Co??(e._$Co=[]))[o]=i:e._$Cl=i),i!==void 0&&(t=E(s,i._$AS(s,t.values),i,o)),t}class Dt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=((t==null?void 0:t.creationScope)??x).importNode(e,!0);w.currentNode=i;let a=w.nextNode(),r=0,n=0,d=o[0];for(;d!==void 0;){if(r===d.index){let l;d.type===2?l=new N(a,a.nextSibling,this,t):d.type===1?l=new d.ctor(a,d.name,d.strings,this,t):d.type===6&&(l=new Pt(a,this,t)),this._$AV.push(l),d=o[++n]}r!==(d==null?void 0:d.index)&&(a=w.nextNode(),r++)}return w.currentNode=x,i}p(t){let e=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class N{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),S(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==D&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):wt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&S(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){var a;const{values:e,_$litType$:o}=t,i=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=M.createElement(ct(o.h,o.h[0]),this.options)),o);if(((a=this._$AH)==null?void 0:a._$AD)===i)this._$AH.p(e);else{const r=new Dt(i,this),n=r.u(this.options);r.p(e),this.T(n),this._$AH=r}}_$AC(t){let e=lt.get(t.strings);return e===void 0&&lt.set(t.strings,e=new M(t)),e}k(t){W(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const a of t)i===e.length?e.push(o=new N(this.O(P()),this.O(P()),this,this.options)):o=e[i],o._$AI(a),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,e);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class L{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,a){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=m}_$AI(t,e=this,o,i){const a=this.strings;let r=!1;if(a===void 0)t=E(this,t,e,0),r=!S(t)||t!==this._$AH&&t!==D,r&&(this._$AH=t);else{const n=t;let d,l;for(t=a[0],d=0;d<a.length-1;d++)l=E(this,n[o+d],e,d),l===D&&(l=this._$AH[d]),r||(r=!S(l)||l!==this._$AH[d]),l===m?t=m:t!==m&&(t+=(l??"")+a[d+1]),this._$AH[d]=l}r&&!i&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Et extends L{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}}class Ct extends L{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}}class It extends L{constructor(t,e,o,i,a){super(t,e,o,i,a),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??m)===D)return;const o=this._$AH,i=t===m&&o!==m||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,a=t!==m&&(o===m||i);i&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Pt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}}const J=I.litHtmlPolyfillSupport;J==null||J(M,N),(I.litHtmlVersions??(I.litHtmlVersions=[])).push("3.3.1");const St=(s,t,e)=>{const o=(e==null?void 0:e.renderBefore)??t;let i=o._$litPart$;if(i===void 0){const a=(e==null?void 0:e.renderBefore)??null;o._$litPart$=i=new N(t.insertBefore(P(),a),a,void 0,e??{})}return i._$AI(s),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis;class O extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=St(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return D}}O._$litElement$=!0,O.finalized=!0,(pt=T.litElementHydrateSupport)==null||pt.call(T,{LitElement:O});const K=T.litElementPolyfillSupport;K==null||K({LitElement:O}),(T.litElementVersions??(T.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bt=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:q},Nt=(s=Mt,t,e)=>{const{kind:o,metadata:i}=e;let a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),o==="setter"&&((s=Object.create(s)).wrapped=!0),a.set(e.name,s),o==="accessor"){const{name:r}=e;return{set(n){const d=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,d,s)},init(n){return n!==void 0&&this.C(r,void 0,s,n),n}}}if(o==="setter"){const{name:r}=e;return function(n){const d=this[r];t.call(this,n),this.requestUpdate(r,d,s)}}throw Error("Unsupported decorator location: "+o)};function ht(s){return(t,e)=>typeof e=="object"?Nt(s,t,e):((o,i,a)=>{const r=i.hasOwnProperty(a);return i.constructor.createProperty(a,o),r?Object.getOwnPropertyDescriptor(i,a):void 0})(s,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function u(s){return ht({...s,state:!0,attribute:!1})}class b{constructor(t){this.connection=t}async getBoards(){return(await this.connection.sendMessagePromise({type:"dobeedo/get_boards"})).boards??[]}async createBoard(t,e){const o={type:"dobeedo/create_board",name:t};return e!==void 0&&(o.description=e),(await this.connection.sendMessagePromise(o)).board}async getColumns(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_columns",board_id:t})).columns??[]}async createColumn(t,e,o){return(await this.connection.sendMessagePromise({type:"dobeedo/create_column",board_id:t,name:e,order_index:o})).column}async getTasks(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_tasks",board_id:t})).tasks??[]}async createTask(t,e,o,i,a,r,n){const d={type:"dobeedo/create_task",board_id:t,column_id:e,title:o};return i!==void 0&&(d.description=i),a!==void 0&&(d.due_date=a),r!==void 0&&(d.priority=r),n!==void 0&&(d.tags=n),(await this.connection.sendMessagePromise(d)).task}async updateTask(t,e){const o={type:"dobeedo/update_task",task_id:t};return e.title!==void 0&&(o.title=e.title),e.description!==void 0&&(o.description=e.description),e.due_date!==void 0&&(o.due_date=e.due_date),e.priority!==void 0&&(o.priority=e.priority),e.tags!==void 0&&(o.tags=e.tags),(await this.connection.sendMessagePromise(o)).task}async moveTask(t,e,o){const i={type:"dobeedo/move_task",task_id:t,target_column_id:e};return o!==void 0&&(i.target_sort_index=o),(await this.connection.sendMessagePromise(i)).task}async deleteTask(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_task",task_id:t})}async deleteColumn(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_column",column_id:t})}async deleteBoard(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_board",board_id:t})}subscribeUpdates(t){const e=this.connection;if(e.subscribeEvents){console.debug("DoBeeDo: using connection.subscribeEvents for updates");const a=e.subscribeEvents(r=>{if(console.debug("DoBeeDo: raw WS message via subscribeEvents",r),typeof(r==null?void 0:r.event_type)=="string"&&r.data){const n=r.event_type;if(n.startsWith("dobeedo_")){const d=n.replace(/^dobeedo_/,"");t({event_type:d,payload:r.data,raw_type:n})}return}(r==null?void 0:r.type)==="dobeedo/event"&&r.event_type&&r.payload&&t({event_type:r.event_type,payload:r.payload,raw_type:r.raw_type})});return()=>{console.debug("DoBeeDo: unsubscribe from subscribeEvents"),a()}}if(!e.subscribeMessage)return console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available"),()=>{};const o=a=>{console.debug("DoBeeDo: raw WS message in subscribeUpdates handler",a),(a==null?void 0:a.type)==="dobeedo/event"&&a.event_type&&a.payload&&t({event_type:a.event_type,payload:a.payload,raw_type:a.raw_type})};console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");const i=e.subscribeMessage(o,{type:"dobeedo/subscribe_updates"});return()=>{console.debug("DoBeeDo: unsubscribe from subscribe_updates"),i()}}async listTodoEntities(){return(await this.connection.sendMessagePromise({type:"dobeedo/list_todo_entities"})).entities??[]}async importFromTodo(t,e,o,i){const a={type:"dobeedo/import_from_todo",entity_id:t,board_id:e,column_id:o};return i!==void 0&&(a.status_filter=i),await this.connection.sendMessagePromise(a)}async importAllTodos(t,e){const o={type:"dobeedo/import_all_todos",board_id:t};return e!==void 0&&(o.status_filter=e),await this.connection.sendMessagePromise(o)}}var Ot=Object.defineProperty,Ut=Object.getOwnPropertyDescriptor,p=(s,t,e,o)=>{for(var i=o>1?void 0:o?Ut(t,e):t,a=s.length-1,r;a>=0;a--)(r=s[a])&&(i=(o?r(t,e,i):r(i))||i);return o&&i&&Ot(t,e,i),i};let h=class extends O{constructor(){super(...arguments),this._boards=[],this._tasks=[],this._columns=[],this._loading=!1,this._newTaskTitles={},this._newTaskDescriptions={},this._newTaskDueDates={},this._newTaskPriorities={},this._newTaskTags={},this._newColumnName="",this._newBoardName="",this._isAddingBoard=!1,this._unsubscribeUpdates=null,this._selectedBoardId=null,this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate="",this._editTaskPriority="",this._editTaskTags="",this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null,this._touchDragging=!1,this._touchStartY=0,this._touchCurrentY=0,this._importingColumnId=null,this._todoEntities=[],this._selectedTodoEntity=null,this._importStatusFilter="",this._boundTouchMove=null,this._boundTouchEnd=null}static get styles(){return _t`
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
        padding-top: 8px;
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
        touch-action: none;
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
    `}updated(s){if(s.has("hass")&&this.hass&&(this._fetchBoards(),!this._unsubscribeUpdates)){const t=new b(this.hass.connection);console.debug("DoBeeDo: registering subscribeUpdates"),this._unsubscribeUpdates=t.subscribeUpdates(e=>{var o,i;if(console.debug("DoBeeDo event received in panel",e),e.event_type.startsWith("task_")){const a=(o=e.payload.task)==null?void 0:o.board_id;console.debug("DoBeeDo task event for board",a,"selected",this._selectedBoardId),a&&a===this._selectedBoardId&&this._refreshTasksForSelectedBoard()}else if(e.event_type.startsWith("column_")){const a=(i=e.payload.column)==null?void 0:i.board_id;console.debug("DoBeeDo column event for board",a,"selected",this._selectedBoardId),a&&a===this._selectedBoardId&&this._refreshColumnsAndTasks()}else e.event_type.startsWith("board_")&&(console.debug("DoBeeDo board event"),this._fetchBoards())})}}async _fetchBoards(){if(this.hass){this._loading=!0;try{const s=new b(this.hass.connection);this._boards=await s.getBoards(),!this._selectedBoardId&&this._boards.length>0&&(this._selectedBoardId=this._boards[0].id),await this._refreshColumnsAndTasks()}catch(s){console.error("Failed to load DoBeeDo data",s)}finally{this._loading=!1}}}async _refreshColumnsAndTasks(){if(!this.hass||!this._selectedBoardId){this._columns=[],this._tasks=[];return}const s=new b(this.hass.connection);this._columns=await s.getColumns(this._selectedBoardId),this._tasks=await s.getTasks(this._selectedBoardId)}async _refreshTasksForSelectedBoard(){if(!this.hass||!this._selectedBoardId){this._tasks=[];return}const s=new b(this.hass.connection);this._tasks=await s.getTasks(this._selectedBoardId)}_handleSelectBoard(s){this._selectedBoardId!==s.id&&(this._selectedBoardId=s.id,this._refreshColumnsAndTasks())}async _handleCreateTask(s){const t=this._newTaskTitles[s]||"",e=this._newTaskDescriptions[s]||"",o=this._newTaskDueDates[s]||"",i=this._newTaskPriorities[s]||"",a=this._newTaskTags[s]||"";if(!this.hass||!this._selectedBoardId||!t.trim())return;const r=new b(this.hass.connection),n=this._boards.find(l=>l.id===this._selectedBoardId);if(!n)return;const d=a.split(",").map(l=>l.trim()).filter(l=>l.length>0);try{await r.createTask(n.id,s,t.trim(),e.trim()||void 0,o.trim()||void 0,i.trim()||void 0,d.length>0?d:void 0),delete this._newTaskTitles[s],delete this._newTaskDescriptions[s],delete this._newTaskDueDates[s],delete this._newTaskPriorities[s],delete this._newTaskTags[s],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions},this._newTaskDueDates={...this._newTaskDueDates},this._newTaskPriorities={...this._newTaskPriorities},this._newTaskTags={...this._newTaskTags}}catch(l){console.error("Failed to create DoBeeDo task",l)}}async _handleCreateColumn(){if(!this.hass||!this._selectedBoardId||!this._newColumnName.trim())return;const s=new b(this.hass.connection);try{await s.createColumn(this._selectedBoardId,this._newColumnName.trim()),this._newColumnName=""}catch(t){console.error("Failed to create DoBeeDo column",t)}}async _handleCreateBoard(){if(!this.hass||!this._newBoardName.trim())return;const s=new b(this.hass.connection);try{const t=await s.createBoard(this._newBoardName.trim());this._newBoardName="",this._isAddingBoard=!1,await this._fetchBoards(),this._selectedBoardId=t.id,await this._refreshColumnsAndTasks()}catch(t){console.error("Failed to create DoBeeDo board",t)}}async _handleDeleteBoard(s){if(!this.hass||!window.confirm(`Delete board "${s.name}" and all its columns and tasks?`))return;const t=new b(this.hass.connection);try{await t.deleteBoard(s.id),await this._fetchBoards(),this._selectedBoardId===s.id&&(this._selectedBoardId=this._boards.length>0?this._boards[0].id:null,await this._refreshColumnsAndTasks())}catch(e){console.error("Failed to delete DoBeeDo board",e)}}_startEditTask(s){this._editingTaskId=s.id,this._editTaskTitle=s.title,this._editTaskDescription=s.description??"",this._editTaskDueDate=s.due_date??"",this._editTaskPriority=s.priority??"",this._editTaskTags=s.tags?s.tags.join(", "):""}_cancelEditTask(){this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate="",this._editTaskPriority="",this._editTaskTags=""}async _saveEditTask(){if(!this.hass||!this._editingTaskId)return;const s=this._tasks.find(c=>c.id===this._editingTaskId);if(!s)return;const t=this._editTaskTitle.trim();if(!t)return;const e={};t!==s.title&&(e.title=t);const o=this._editTaskDescription.trim();o!==(s.description??"")&&(e.description=o===""?null:o);const i=this._editTaskDueDate.trim();i!==(s.due_date??"")&&(e.due_date=i===""?null:i);const a=this._editTaskPriority.trim();a!==(s.priority??"")&&(e.priority=a===""?null:a);const n=this._editTaskTags.trim().split(",").map(c=>c.trim()).filter(c=>c.length>0),d=s.tags||[];if((n.length!==d.length||n.some((c,f)=>c!==d[f]))&&(e.tags=n.length>0?n:null),!e.title&&e.description===void 0&&e.due_date===void 0&&e.priority===void 0&&e.tags===void 0){this._cancelEditTask();return}const g=new b(this.hass.connection);try{await g.updateTask(this._editingTaskId,e),this._cancelEditTask()}catch(c){console.error("Failed to update DoBeeDo task",c)}}_handleDragStart(s,t){if(t.dataTransfer){t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",s.id);const e=new Image;e.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",t.dataTransfer.setDragImage(e,0,0)}requestAnimationFrame(()=>{this._draggingTaskId=s.id})}_handleDragEnd(){this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null}_handleTouchStart(s,t){t.preventDefault();const e=t.touches[0];this._touchStartY=e.clientY,this._touchCurrentY=e.clientY,this._touchDragging=!0,requestAnimationFrame(()=>{this._draggingTaskId=s.id}),this._boundTouchMove=this._handleTouchMove.bind(this),this._boundTouchEnd=this._handleTouchEnd.bind(this),document.addEventListener("touchmove",this._boundTouchMove,{passive:!1}),document.addEventListener("touchend",this._boundTouchEnd,{passive:!1})}_handleTouchMove(s){var i;if(!this._touchDragging||!this._draggingTaskId)return;s.preventDefault();const t=s.touches[0];this._touchCurrentY=t.clientY;const e=(i=this.shadowRoot)==null?void 0:i.querySelector(".task-card.dragging");e&&(e.style.visibility="hidden");const o=this.shadowRoot&&typeof this.shadowRoot.elementsFromPoint=="function"?Array.from(this.shadowRoot.elementsFromPoint(t.clientX,t.clientY)):Array.from(document.elementsFromPoint(t.clientX,t.clientY));e&&(e.style.visibility="visible");for(const a of o)if(a.classList.contains("tasks-list")){const r=a.closest(".column");if(r){const n=this._getColumnIdFromElement(r);if(n){this._dragOverColumnId=n,this._calculateTouchDropPosition(n,t.clientY);break}}}}_handleTouchEnd(s){if(!(!this._touchDragging||!this._draggingTaskId)){if(s.preventDefault(),this._dropIndicatorPosition){const t=new DragEvent("drop");this._handleDrop(this._dropIndicatorPosition.columnId,t)}this._boundTouchMove&&(document.removeEventListener("touchmove",this._boundTouchMove),this._boundTouchMove=null),this._boundTouchEnd&&(document.removeEventListener("touchend",this._boundTouchEnd),this._boundTouchEnd=null),this._touchDragging=!1,this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null,this._touchStartY=0,this._touchCurrentY=0}}_getColumnIdFromElement(s){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelectorAll(".column");if(!t)return null;for(let o=0;o<t.length;o++)if(t[o]===s&&o<this._columns.length)return this._columns[o].id;return null}_calculateTouchDropPosition(s,t){var r;const e=Array.from(((r=this.shadowRoot)==null?void 0:r.querySelectorAll(".column"))||[]).find(n=>this._getColumnIdFromElement(n)===s);if(!e)return;const o=e.querySelector(".tasks-list");if(!o)return;const i=Array.from(o.querySelectorAll(".task-card"));if(i.length===0){this._dropIndicatorPosition={columnId:s,index:0};return}let a=i.length;for(let n=0;n<i.length;n++){const d=i[n];if(d.classList.contains("dragging"))continue;const l=d.getBoundingClientRect(),g=l.top+l.height/2;if(t<g){a=n;break}}this._dropIndicatorPosition={columnId:s,index:a}}_handleDragOver(s){s.preventDefault(),s.dataTransfer&&(s.dataTransfer.dropEffect="move")}_handleDragOverTasksList(s,t){if(t.preventDefault(),t.stopPropagation(),!this._draggingTaskId)return;const e=t.currentTarget,o=Array.from(e.querySelectorAll(".task-card")),i=t.clientY;if(o.length===0){this._dropIndicatorPosition={columnId:s,index:0};return}let a=o.length;for(let r=0;r<o.length;r++){const n=o[r];if(n.classList.contains("dragging"))continue;const d=n.getBoundingClientRect(),l=d.top+d.height/2;if(i<l){a=r;break}}(!this._dropIndicatorPosition||this._dropIndicatorPosition.columnId!==s||this._dropIndicatorPosition.index!==a)&&(this._dropIndicatorPosition={columnId:s,index:a})}_handleDragEnterColumn(s,t){t.stopPropagation(),this._dragOverColumnId=s}_handleDragLeaveColumn(s){const t=s.currentTarget,e=s.relatedTarget;(!e||!t.contains(e))&&(this._dragOverColumnId=null,this._dropIndicatorPosition=null)}_isTaskOverdue(s){if(!s.due_date)return!1;const t=new Date;return t.setHours(0,0,0,0),new Date(s.due_date)<t}_formatDueDate(s){const t=new Date(s),e=new Date;e.setHours(0,0,0,0);const o=new Date(e);o.setDate(o.getDate()+1);const i=new Date(s);if(i.setHours(0,0,0,0),i.getTime()===e.getTime())return"Today";if(i.getTime()===o.getTime())return"Tomorrow";{const a={month:"short",day:"numeric"};return t.toLocaleDateString(void 0,a)}}async _handleDrop(s,t){var a;if(t.preventDefault(),t.stopPropagation(),this._dragOverColumnId=null,!this._draggingTaskId||!this.hass)return;const e=this._tasks.find(r=>r.id===this._draggingTaskId);if(!e){this._draggingTaskId=null;return}const o=((a=this._dropIndicatorPosition)==null?void 0:a.index)??0,i=new b(this.hass.connection);try{await i.moveTask(e.id,s,o),this._draggingTaskId=null,this._dropIndicatorPosition=null}catch(r){console.error("Failed to move task via drag-and-drop",r),this._draggingTaskId=null,this._dropIndicatorPosition=null}}async _handleDeleteTask(s){if(!this.hass||!window.confirm(`Delete task "${s.title}"?`))return;const t=new b(this.hass.connection);try{await t.deleteTask(s.id)}catch(e){console.error("Failed to delete DoBeeDo task",e)}}async _handleDeleteColumn(s){if(!this.hass)return;const e=this._tasks.filter(a=>a.column_id===s.id).length,o=e>0?`Delete column "${s.name}" and ${e} task${e===1?"":"s"}?`:`Delete column "${s.name}"?`;if(!window.confirm(o))return;const i=new b(this.hass.connection);try{await i.deleteColumn(s.id)}catch(a){console.error("Failed to delete DoBeeDo column",a)}}async _startImport(s){if(!this.hass)return;const t=new b(this.hass.connection);try{this._todoEntities=await t.listTodoEntities(),this._importingColumnId=s,this._selectedTodoEntity=null,this._importStatusFilter=""}catch(e){console.error("Failed to load todo entities",e)}}_cancelImport(){this._importingColumnId=null,this._todoEntities=[],this._selectedTodoEntity=null,this._importStatusFilter=""}async _handleImport(){if(!this.hass||!this._selectedTodoEntity||!this._importingColumnId||!this._selectedBoardId)return;const s=new b(this.hass.connection);try{const t=await s.importFromTodo(this._selectedTodoEntity,this._selectedBoardId,this._importingColumnId,this._importStatusFilter||void 0);alert(`Successfully imported ${t.imported_count} task${t.imported_count===1?"":"s"}!`),this._cancelImport()}catch(t){console.error("Failed to import from todo",t),alert("Failed to import tasks. See console for details.")}}async _handleImportAll(){if(!this.hass||!this._selectedBoardId||!window.confirm("Import all Home Assistant todo lists as columns? This will create one column per todo list and import all their items."))return;const s=new b(this.hass.connection);try{const t=await s.importAllTodos(this._selectedBoardId);alert(`Successfully imported ${t.columns_created} todo list${t.columns_created===1?"":"s"} with ${t.total_imported} task${t.total_imported===1?"":"s"}!`)}catch(t){console.error("Failed to import all todos",t),alert("Failed to import todo lists. See console for details.")}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeUpdates&&typeof this._unsubscribeUpdates=="function"&&(this._unsubscribeUpdates(),this._unsubscribeUpdates=null),this._boundTouchMove&&(document.removeEventListener("touchmove",this._boundTouchMove),this._boundTouchMove=null),this._boundTouchEnd&&(document.removeEventListener("touchend",this._boundTouchEnd),this._boundTouchEnd=null)}render(){return _`
      <h1>DoBeeDo</h1>
      ${this._loading?_`<p>Loading boards…</p>`:this._renderContent()}
      ${this._importingColumnId?this._renderImportDialog():""}
    `}_renderContent(){return this._boards.length===0?_`
        <div class="empty-state">
          <p>No boards available yet.</p>
          <p>Create a board using the input above to get started!</p>
        </div>
      `:_`
      ${this._renderBoardSelector()}
      <div class="board-content">
        ${this._selectedBoardId?this._renderBoard():_`<p>Select a board to begin</p>`}
      </div>
    `}_renderBoardSelector(){return _`
      <div class="board-tabs">
        ${this._boards.map(s=>_`
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
        ${this._isAddingBoard?_`
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
            `:_`
              <div
                class="board-tab add-tab"
                @click=${()=>{this._isAddingBoard=!0,setTimeout(()=>{var t;const s=(t=this.shadowRoot)==null?void 0:t.querySelector(".add-board-input");s==null||s.focus()},50)}}
                title="Add new board"
              >
                + Add Board
              </div>
            `}
      </div>
    `}_renderBoard(){const s=this._columns.length===0;return _`
      ${s?_`
            <div style="margin-bottom: 16px; padding: 16px; background: var(--card-background-color); border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 12px 0; color: var(--secondary-text-color);">
                No columns yet. Create columns manually or import from your Home Assistant todo lists.
              </p>
              <button class="primary" @click=${()=>this._handleImportAll()}>
                📥 Import All Todo Lists
              </button>
            </div>
          `:_`
            <div style="margin-bottom: 12px; display: flex; justify-content: flex-end;">
              <button class="secondary small" @click=${()=>this._handleImportAll()} title="Import all todo lists as columns">
                📥 Import All
              </button>
            </div>
          `}
      <div class="columns-container">
        ${this._columns.map(t=>this._renderColumn(t))} ${this._renderAddColumnMock()}
      </div>
    `}_renderAddColumnMock(){return _`
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
          ${this._newColumnName.trim()?_`
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
    `}_renderColumn(s){var e;const t=this._tasks.filter(o=>o.column_id===s.id).sort((o,i)=>o.sort_index-i.sort_index);return _`
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
          ${t.length===0?_`
                <div class="empty-state" style="padding: 16px; font-size: 13px;">
                  No tasks yet
                </div>
              `:_`
                ${t.map((o,i)=>{var n,d,l,g;const a=((n=this._dropIndicatorPosition)==null?void 0:n.columnId)===s.id&&((d=this._dropIndicatorPosition)==null?void 0:d.index)===i,r=((l=this._dropIndicatorPosition)==null?void 0:l.columnId)===s.id&&((g=this._dropIndicatorPosition)==null?void 0:g.index)===i+1;return this._renderTask(o,a,r)})}
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
          ${(this._newTaskTitles[s.id]||"").trim()?_`
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
    `}_renderTask(s,t=!1,e=!1){if(this._editingTaskId===s.id)return _`
        <div class="task-card" style="padding: 16px;">
          <div style="margin-bottom: 8px;">
            <input
              type="text"
              .value=${this._editTaskTitle}
              placeholder="Task title"
              @input=${r=>{const n=r.target;this._editTaskTitle=n.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="text"
              .value=${this._editTaskDescription}
              placeholder="Description (optional)"
              @input=${r=>{const n=r.target;this._editTaskDescription=n.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="date"
              .value=${this._editTaskDueDate}
              placeholder="Due date (optional)"
              @input=${r=>{const n=r.target;this._editTaskDueDate=n.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <select
              .value=${this._editTaskPriority}
              @change=${r=>{const n=r.target;this._editTaskPriority=n.value}}
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
              @input=${r=>{const n=r.target;this._editTaskTags=n.value}}
              style="width: 100%;"
            />
          </div>
          <div class="task-actions">
            <button class="primary small" @click=${()=>this._saveEditTask()}>Save</button>
            <button class="secondary small" @click=${()=>this._cancelEditTask()}>Cancel</button>
          </div>
        </div>
      `;const i=this._draggingTaskId===s.id,a=this._isTaskOverdue(s);return _`
      <div
        class="task-card ${i?"dragging":""} ${a?"overdue":""} ${t?"drop-target-before":""} ${e?"drop-target-after":""}"
        draggable="true"
        @dragstart=${r=>this._handleDragStart(s,r)}
        @dragend=${this._handleDragEnd}
        @touchstart=${r=>this._handleTouchStart(s,r)}
      >
        <div class="task-title">${s.title}</div>
        ${s.description?_`<div class="task-description">${s.description}</div>`:""}
        ${s.priority?_`<div class="task-priority ${s.priority}">${s.priority}</div>`:""}
        ${s.tags&&s.tags.length>0?_`<div class="task-tags">
              ${s.tags.map(r=>_`<span class="task-tag">${r}</span>`)}
            </div>`:""}
        ${s.due_date?_`<div class="task-due-date ${a?"overdue":""}">
              📅 ${this._formatDueDate(s.due_date)}
            </div>`:""}
        <div class="task-actions">
          <button class="secondary small" draggable="false" @click=${()=>this._startEditTask(s)}>Edit</button>
          <button class="warning small" draggable="false" @click=${()=>this._handleDeleteTask(s)}>Delete</button>
        </div>
      </div>
    `}_renderImportDialog(){const s=this._columns.find(e=>e.id===this._importingColumnId),t=(s==null?void 0:s.name)||"Unknown";return _`
      <div class="import-dialog-overlay" @click=${this._cancelImport}>
        <div class="import-dialog" @click=${e=>e.stopPropagation()}>
          <div class="import-dialog-title">Import from To-do List to "${t}"</div>
          <div class="import-dialog-content">
            ${this._todoEntities.length===0?_`<p style="color: var(--secondary-text-color);">No to-do lists found in Home Assistant.</p>`:_`
                  <div>
                    <label class="form-label">Select To-do List</label>
                    <select
                      style="width: 100%;"
                      .value=${this._selectedTodoEntity||""}
                      @change=${e=>{const o=e.target;this._selectedTodoEntity=o.value}}
                    >
                      <option value="">-- Select a to-do list --</option>
                      ${this._todoEntities.map(e=>_`
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
    `}};p([ht({attribute:!1})],h.prototype,"hass",2),p([u()],h.prototype,"_boards",2),p([u()],h.prototype,"_tasks",2),p([u()],h.prototype,"_columns",2),p([u()],h.prototype,"_loading",2),p([u()],h.prototype,"_newTaskTitles",2),p([u()],h.prototype,"_newTaskDescriptions",2),p([u()],h.prototype,"_newTaskDueDates",2),p([u()],h.prototype,"_newTaskPriorities",2),p([u()],h.prototype,"_newTaskTags",2),p([u()],h.prototype,"_newColumnName",2),p([u()],h.prototype,"_newBoardName",2),p([u()],h.prototype,"_isAddingBoard",2),p([u()],h.prototype,"_unsubscribeUpdates",2),p([u()],h.prototype,"_selectedBoardId",2),p([u()],h.prototype,"_editingTaskId",2),p([u()],h.prototype,"_editTaskTitle",2),p([u()],h.prototype,"_editTaskDescription",2),p([u()],h.prototype,"_editTaskDueDate",2),p([u()],h.prototype,"_editTaskPriority",2),p([u()],h.prototype,"_editTaskTags",2),p([u()],h.prototype,"_draggingTaskId",2),p([u()],h.prototype,"_dragOverColumnId",2),p([u()],h.prototype,"_dropIndicatorPosition",2),p([u()],h.prototype,"_touchDragging",2),p([u()],h.prototype,"_touchStartY",2),p([u()],h.prototype,"_touchCurrentY",2),p([u()],h.prototype,"_importingColumnId",2),p([u()],h.prototype,"_todoEntities",2),p([u()],h.prototype,"_selectedTodoEntity",2),p([u()],h.prototype,"_importStatusFilter",2),h=p([Bt("dobeedo-panel")],h)})();
