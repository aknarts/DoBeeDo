(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pe;const O=globalThis,L=O.ShadowRoot&&(O.ShadyCSS===void 0||O.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),Z=new WeakMap;let G=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(L&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=Z.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Z.set(t,e))}return e}toString(){return this.cssText}};const ue=i=>new G(typeof i=="string"?i:i+"",void 0,W),_e=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,o,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[r+1],i[0]);return new G(t,i,W)},me=(i,e)=>{if(L)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),o=O.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=t.cssText,i.appendChild(s)}},Q=L?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return ue(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:fe,defineProperty:be,getOwnPropertyDescriptor:ve,getOwnPropertyNames:ye,getOwnPropertySymbols:$e,getPrototypeOf:ge}=Object,y=globalThis,X=y.trustedTypes,xe=X?X.emptyScript:"",F=y.reactiveElementPolyfillSupport,S=(i,e)=>i,H={toAttribute(i,e){switch(e){case Boolean:i=i?xe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},q=(i,e)=>!fe(i,e),ee={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);let T=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(e,s,t);o!==void 0&&be(this.prototype,e,o)}}static getPropertyDescriptor(e,t,s){const{get:o,set:r}=ve(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:o,set(n){const d=o==null?void 0:o.call(this);r==null||r.call(this,n),this.requestUpdate(e,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ee}static _$Ei(){if(this.hasOwnProperty(S("elementProperties")))return;const e=ge(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(S("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(S("properties"))){const t=this.properties,s=[...ye(t),...$e(t)];for(const o of s)this.createProperty(o,t[o])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,o]of t)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const o=this._$Eu(t,s);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const o of s)t.unshift(Q(o))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return me(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var r;const s=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,s);if(o!==void 0&&s.reflect===!0){const n=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:H).toAttribute(t,s.type);this._$Em=e,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){var r,n;const s=this.constructor,o=s._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const d=s.getPropertyOptions(o),a=typeof d.converter=="function"?{fromAttribute:d.converter}:((r=d.converter)==null?void 0:r.fromAttribute)!==void 0?d.converter:H;this._$Em=o;const c=a.fromAttribute(t,d.type);this[o]=c??((n=this._$Ej)==null?void 0:n.get(o))??c,this._$Em=null}}requestUpdate(e,t,s){var o;if(e!==void 0){const r=this.constructor,n=this[e];if(s??(s=r.getPropertyOptions(e)),!((s.hasChanged??q)(n,t)||s.useDefault&&s.reflect&&n===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:o,wrapped:r},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,n]of o){const{wrapped:d}=n,a=this[r];d!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(o=>{var r;return(r=o.hostUpdate)==null?void 0:r.call(o)}),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var o;return(o=s.hostUpdated)==null?void 0:o.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[S("elementProperties")]=new Map,T[S("finalized")]=new Map,F==null||F({ReactiveElement:T}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis,R=D.trustedTypes,te=R?R.createPolicy("lit-html",{createHTML:i=>i}):void 0,se="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,ie="?"+$,ke=`<${ie}>`,x=document,B=()=>x.createComment(""),P=i=>i===null||typeof i!="object"&&typeof i!="function",V=Array.isArray,we=i=>V(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",J=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,re=/>/g,k=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ne=/'/g,ae=/"/g,de=/^(?:script|style|textarea|title)$/i,Ae=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),h=Ae(1),C=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),le=new WeakMap,w=x.createTreeWalker(x,129);function ce(i,e){if(!V(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return te!==void 0?te.createHTML(e):e}const Te=(i,e)=>{const t=i.length-1,s=[];let o,r=e===2?"<svg>":e===3?"<math>":"",n=I;for(let d=0;d<t;d++){const a=i[d];let c,m,l=-1,v=0;for(;v<a.length&&(n.lastIndex=v,m=n.exec(a),m!==null);)v=n.lastIndex,n===I?m[1]==="!--"?n=oe:m[1]!==void 0?n=re:m[2]!==void 0?(de.test(m[2])&&(o=RegExp("</"+m[2],"g")),n=k):m[3]!==void 0&&(n=k):n===k?m[0]===">"?(n=o??I,l=-1):m[1]===void 0?l=-2:(l=n.lastIndex-m[2].length,c=m[1],n=m[3]===void 0?k:m[3]==='"'?ae:ne):n===ae||n===ne?n=k:n===oe||n===re?n=I:(n=k,o=void 0);const g=n===k&&i[d+1].startsWith("/>")?" ":"";r+=n===I?a+ke:l>=0?(s.push(c),a.slice(0,l)+se+a.slice(l)+$+g):a+$+(l===-2?d:g)}return[ce(i,r+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class M{constructor({strings:e,_$litType$:t},s){let o;this.parts=[];let r=0,n=0;const d=e.length-1,a=this.parts,[c,m]=Te(e,t);if(this.el=M.createElement(c,s),w.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(o=w.nextNode())!==null&&a.length<d;){if(o.nodeType===1){if(o.hasAttributes())for(const l of o.getAttributeNames())if(l.endsWith(se)){const v=m[n++],g=o.getAttribute(l).split($),j=/([.?@])?(.*)/.exec(v);a.push({type:1,index:r,name:j[2],strings:g,ctor:j[1]==="."?Ee:j[1]==="?"?Se:j[1]==="@"?De:z}),o.removeAttribute(l)}else l.startsWith($)&&(a.push({type:6,index:r}),o.removeAttribute(l));if(de.test(o.tagName)){const l=o.textContent.split($),v=l.length-1;if(v>0){o.textContent=R?R.emptyScript:"";for(let g=0;g<v;g++)o.append(l[g],B()),w.nextNode(),a.push({type:2,index:++r});o.append(l[v],B())}}}else if(o.nodeType===8)if(o.data===ie)a.push({type:2,index:r});else{let l=-1;for(;(l=o.data.indexOf($,l+1))!==-1;)a.push({type:7,index:r}),l+=$.length-1}r++}}static createElement(e,t){const s=x.createElement("template");return s.innerHTML=e,s}}function E(i,e,t=i,s){var n,d;if(e===C)return e;let o=s!==void 0?(n=t._$Co)==null?void 0:n[s]:t._$Cl;const r=P(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==r&&((d=o==null?void 0:o._$AO)==null||d.call(o,!1),r===void 0?o=void 0:(o=new r(i),o._$AT(i,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=o:t._$Cl=o),o!==void 0&&(e=E(i,o._$AS(i,e.values),o,s)),e}class Ce{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,o=((e==null?void 0:e.creationScope)??x).importNode(t,!0);w.currentNode=o;let r=w.nextNode(),n=0,d=0,a=s[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new U(r,r.nextSibling,this,e):a.type===1?c=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(c=new Be(r,this,e)),this._$AV.push(c),a=s[++d]}n!==(a==null?void 0:a.index)&&(r=w.nextNode(),n++)}return w.currentNode=x,o}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class U{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,o){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=E(this,e,t),P(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==C&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):we(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(x.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=M.createElement(ce(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===o)this._$AH.p(t);else{const n=new Ce(o,this),d=n.u(this.options);n.p(t),this.T(d),this._$AH=n}}_$AC(e){let t=le.get(e.strings);return t===void 0&&le.set(e.strings,t=new M(e)),t}k(e){V(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,o=0;for(const r of e)o===t.length?t.push(s=new U(this.O(B()),this.O(B()),this,this.options)):s=t[o],s._$AI(r),o++;o<t.length&&(this._$AR(s&&s._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,o,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(e,t=this,s,o){const r=this.strings;let n=!1;if(r===void 0)e=E(this,e,t,0),n=!P(e)||e!==this._$AH&&e!==C,n&&(this._$AH=e);else{const d=e;let a,c;for(e=r[0],a=0;a<r.length-1;a++)c=E(this,d[s+a],t,a),c===C&&(c=this._$AH[a]),n||(n=!P(c)||c!==this._$AH[a]),c===p?e=p:e!==p&&(e+=(c??"")+r[a+1]),this._$AH[a]=c}n&&!o&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ee extends z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}}class Se extends z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}}class De extends z{constructor(e,t,s,o,r){super(e,t,s,o,r),this.type=5}_$AI(e,t=this){if((e=E(this,e,t,0)??p)===C)return;const s=this._$AH,o=e===p&&s!==p||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==p&&(s===p||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Be{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){E(this,e)}}const K=D.litHtmlPolyfillSupport;K==null||K(M,U),(D.litHtmlVersions??(D.litHtmlVersions=[])).push("3.3.1");const Pe=(i,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let o=s._$litPart$;if(o===void 0){const r=(t==null?void 0:t.renderBefore)??null;s._$litPart$=o=new U(e.insertBefore(B(),r),r,void 0,t??{})}return o._$AI(i),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=globalThis;class N extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return C}}N._$litElement$=!0,N.finalized=!0,(pe=A.litElementHydrateSupport)==null||pe.call(A,{LitElement:N});const Y=A.litElementPolyfillSupport;Y==null||Y({LitElement:N}),(A.litElementVersions??(A.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ie=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Me={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:q},Ue=(i=Me,e,t)=>{const{kind:s,metadata:o}=t;let r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),r.set(t.name,i),s==="accessor"){const{name:n}=t;return{set(d){const a=e.get.call(this);e.set.call(this,d),this.requestUpdate(n,a,i)},init(d){return d!==void 0&&this.C(n,void 0,i,d),d}}}if(s==="setter"){const{name:n}=t;return function(d){const a=this[n];e.call(this,d),this.requestUpdate(n,a,i)}}throw Error("Unsupported decorator location: "+s)};function he(i){return(e,t)=>typeof t=="object"?Ue(i,e,t):((s,o,r)=>{const n=o.hasOwnProperty(r);return o.constructor.createProperty(r,s),n?Object.getOwnPropertyDescriptor(o,r):void 0})(i,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function f(i){return he({...i,state:!0,attribute:!1})}class b{constructor(e){this.connection=e}async getBoards(){return(await this.connection.sendMessagePromise({type:"dobeedo/get_boards"})).boards??[]}async getColumns(e){return(await this.connection.sendMessagePromise({type:"dobeedo/get_columns",board_id:e})).columns??[]}async createColumn(e,t,s){return(await this.connection.sendMessagePromise({type:"dobeedo/create_column",board_id:e,name:t,order_index:s})).column}async getTasks(e){return(await this.connection.sendMessagePromise({type:"dobeedo/get_tasks",board_id:e})).tasks??[]}async createTask(e,t,s,o){return(await this.connection.sendMessagePromise({type:"dobeedo/create_task",board_id:e,column_id:t,title:s,description:o})).task}async updateTask(e,t){const s={type:"dobeedo/update_task",task_id:e};return t.title!==void 0&&(s.title=t.title),t.description!==void 0&&(s.description=t.description),(await this.connection.sendMessagePromise(s)).task}async moveTask(e,t,s){const o={type:"dobeedo/move_task",task_id:e,target_column_id:t};return s!==void 0&&(o.target_sort_index=s),(await this.connection.sendMessagePromise(o)).task}subscribeUpdates(e){const t=this.connection;if(t.subscribeEvents){console.debug("DoBeeDo: using connection.subscribeEvents for updates");const r=t.subscribeEvents(n=>{if(console.debug("DoBeeDo: raw WS message via subscribeEvents",n),typeof(n==null?void 0:n.event_type)=="string"&&n.data){const d=n.event_type;if(d.startsWith("dobeedo_")){const a=d.replace(/^dobeedo_/,"");e({event_type:a,payload:n.data,raw_type:d})}return}(n==null?void 0:n.type)==="dobeedo/event"&&n.event_type&&n.payload&&e({event_type:n.event_type,payload:n.payload,raw_type:n.raw_type})});return()=>{console.debug("DoBeeDo: unsubscribe from subscribeEvents"),r()}}if(!t.subscribeMessage)return console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available"),()=>{};const s=r=>{console.debug("DoBeeDo: raw WS message in subscribeUpdates handler",r),(r==null?void 0:r.type)==="dobeedo/event"&&r.event_type&&r.payload&&e({event_type:r.event_type,payload:r.payload,raw_type:r.raw_type})};console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");const o=t.subscribeMessage(s,{type:"dobeedo/subscribe_updates"});return()=>{console.debug("DoBeeDo: unsubscribe from subscribe_updates"),o()}}async populateTestData(){await this.connection.sendMessagePromise({type:"dobeedo/populate_test_data"})}}var Ne=Object.defineProperty,Oe=Object.getOwnPropertyDescriptor,_=(i,e,t,s)=>{for(var o=s>1?void 0:s?Oe(e,t):e,r=i.length-1,n;r>=0;r--)(n=i[r])&&(o=(s?n(e,t,o):n(o))||o);return s&&o&&Ne(e,t,o),o};let u=class extends N{constructor(){super(...arguments),this._boards=[],this._tasks=[],this._columns=[],this._loading=!1,this._newTaskTitle="",this._newTaskDescription="",this._newColumnName="",this._unsubscribeUpdates=null,this._selectedBoardId=null,this._selectedColumnId=null,this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._movingTaskId=null}static get styles(){return _e`
      :host {
        display: block;
        box-sizing: border-box;
        padding: 24px;
        background: var(--lovelace-background, var(--primary-background-color));
        min-height: 100vh;
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
        background-color: var(--primary-color, #03a9f4);
        color: var(--text-primary-color, white);
      }

      button.secondary {
        background-color: var(--card-background-color, white);
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color, #e0e0e0);
      }

      button.small {
        padding: 4px 8px;
        font-size: 12px;
      }

      /* Input fields */
      input, select {
        padding: 8px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        background: var(--card-background-color, white);
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
        transition: border-color 0.2s ease;
      }

      input:focus, select:focus {
        outline: none;
        border-color: var(--primary-color, #03a9f4);
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
        background: var(--card-background-color, white);
        border: 2px solid var(--divider-color, #e0e0e0);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .board-chip:hover {
        border-color: var(--primary-color, #03a9f4);
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .board-chip.selected {
        background: var(--primary-color, #03a9f4);
        color: var(--text-primary-color, white);
        border-color: var(--primary-color, #03a9f4);
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
        background: var(--card-background-color, white);
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
        background: var(--divider-color, #e0e0e0);
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
        background: var(--lovelace-background, var(--primary-background-color));
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 6px;
        padding: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .task-card:hover {
        border-color: var(--primary-color, #03a9f4);
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
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
        background: var(--card-background-color, white);
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
    `}updated(i){if(i.has("hass")&&this.hass&&(this._fetchBoards(),!this._unsubscribeUpdates)){const e=new b(this.hass.connection);console.debug("DoBeeDo: registering subscribeUpdates"),this._unsubscribeUpdates=e.subscribeUpdates(t=>{var s,o;if(console.debug("DoBeeDo event received in panel",t),t.event_type.startsWith("task_")){const r=(s=t.payload.task)==null?void 0:s.board_id;console.debug("DoBeeDo task event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshTasksForSelectedBoard()}else if(t.event_type.startsWith("column_")){const r=(o=t.payload.column)==null?void 0:o.board_id;console.debug("DoBeeDo column event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshColumnsAndTasks()}else t.event_type.startsWith("board_")&&this._fetchBoards()})}}async _fetchBoards(){if(this.hass){this._loading=!0;try{const i=new b(this.hass.connection);this._boards=await i.getBoards(),!this._selectedBoardId&&this._boards.length>0&&(this._selectedBoardId=this._boards[0].id),await this._refreshColumnsAndTasks()}catch(i){console.error("Failed to load DoBeeDo data",i)}finally{this._loading=!1}}}async _refreshColumnsAndTasks(){if(!this.hass||!this._selectedBoardId){this._columns=[],this._tasks=[],this._selectedColumnId=null;return}const i=new b(this.hass.connection);this._columns=await i.getColumns(this._selectedBoardId),this._tasks=await i.getTasks(this._selectedBoardId),this._columns.length===0?this._selectedColumnId=null:(!this._selectedColumnId||!this._columns.some(e=>e.id===this._selectedColumnId))&&(this._selectedColumnId=this._columns[0].id)}async _refreshTasksForSelectedBoard(){if(!this.hass||!this._selectedBoardId){this._tasks=[];return}const i=new b(this.hass.connection);this._tasks=await i.getTasks(this._selectedBoardId)}_handleSelectBoard(i){this._selectedBoardId!==i.id&&(this._selectedBoardId=i.id,this._refreshColumnsAndTasks())}async _handleCreateTask(){if(!this.hass||!this._selectedBoardId||!this._newTaskTitle.trim())return;const i=new b(this.hass.connection),e=this._boards.find(s=>s.id===this._selectedBoardId);if(!e)return;const t=this._selectedColumnId;if(!t){console.warn("No column selected on the selected board to create a task in.");return}try{const s=await i.createTask(e.id,t,this._newTaskTitle.trim(),this._newTaskDescription.trim()||void 0);this._newTaskTitle="",this._newTaskDescription="",e.id===this._selectedBoardId?this._tasks=[...this._tasks,s]:await this._refreshTasksForSelectedBoard()}catch(s){console.error("Failed to create DoBeeDo task",s)}}async _handleCreateColumn(){if(!this.hass||!this._selectedBoardId||!this._newColumnName.trim())return;const i=new b(this.hass.connection);try{const e=await i.createColumn(this._selectedBoardId,this._newColumnName.trim());this._newColumnName="",this._columns=[...this._columns,e]}catch(e){console.error("Failed to create DoBeeDo column",e)}}_startEditTask(i){this._editingTaskId=i.id,this._editTaskTitle=i.title,this._editTaskDescription=i.description??""}_cancelEditTask(){this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription=""}async _saveEditTask(){if(!this.hass||!this._editingTaskId)return;const i=this._tasks.find(r=>r.id===this._editingTaskId);if(!i)return;const e=this._editTaskTitle.trim();if(!e)return;const t={};e!==i.title&&(t.title=e);const s=this._editTaskDescription.trim();if(s!==(i.description??"")&&(t.description=s===""?null:s),!t.title&&t.description===void 0){this._cancelEditTask();return}const o=new b(this.hass.connection);try{const r=await o.updateTask(this._editingTaskId,t);this._tasks=this._tasks.map(n=>n.id===r.id?r:n),this._cancelEditTask()}catch(r){console.error("Failed to update DoBeeDo task",r)}}_startMoveTask(i){this._movingTaskId=i.id}_cancelMoveTask(){this._movingTaskId=null}async _handleMoveTask(i,e){if(!this.hass||e===i.column_id){this._cancelMoveTask();return}const t=new b(this.hass.connection);try{const s=await t.moveTask(i.id,e);this._tasks=this._tasks.map(o=>o.id===s.id?s:o),this._cancelMoveTask()}catch(s){console.error("Failed to move DoBeeDo task",s)}}async _handlePopulateTestData(){if(!this.hass||this._boards.length>0&&!window.confirm("Test data can only be added to an empty board. Continue?"))return;const i=new b(this.hass.connection);try{await i.populateTestData(),await this._fetchBoards()}catch(e){console.error("Failed to populate test data",e)}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeUpdates&&(this._unsubscribeUpdates(),this._unsubscribeUpdates=null)}render(){return h`
      <h1>DoBeeDo</h1>

      <div class="flex-row mb-16">
        <button class="primary" @click=${()=>this._handlePopulateTestData()} ?disabled=${this._loading}>
          Populate Test Data
        </button>
        <span class="helper-text">(Development helper - adds sample board with tasks)</span>
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
              @input=${i=>{const e=i.target;this._newColumnName=e.value}}
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
                    @input=${i=>{const e=i.target;this._newTaskTitle=e.value}}
                    @keydown=${i=>{i.key==="Enter"&&this._handleCreateTask()}}
                  />
                </div>
                <div style="flex: 2;">
                  <input
                    type="text"
                    .value=${this._newTaskDescription}
                    placeholder="Description (optional)"
                    @input=${i=>{const e=i.target;this._newTaskDescription=e.value}}
                  />
                </div>
                <div style="flex: 1;">
                  <select
                    .value=${this._selectedColumnId??""}
                    @change=${i=>{const e=i.target;this._selectedColumnId=e.value||null}}
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
    `}_renderColumn(i){const e=this._tasks.filter(t=>t.column_id===i.id).sort((t,s)=>t.sort_index-s.sort_index);return h`
      <div class="column">
        <div class="column-header">
          <span>${i.name}</span>
          <span class="task-count">${e.length}</span>
        </div>
        <div class="tasks-list">
          ${e.length===0?h`<div class="empty-state" style="padding: 16px; font-size: 13px;">
                No tasks yet
              </div>`:e.map(t=>this._renderTask(t))}
        </div>
      </div>
    `}_renderTask(i){const e=this._editingTaskId===i.id,t=this._movingTaskId===i.id;return e?h`
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
      `:t?h`
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
    `}};_([he({attribute:!1})],u.prototype,"hass",2),_([f()],u.prototype,"_boards",2),_([f()],u.prototype,"_tasks",2),_([f()],u.prototype,"_columns",2),_([f()],u.prototype,"_loading",2),_([f()],u.prototype,"_newTaskTitle",2),_([f()],u.prototype,"_newTaskDescription",2),_([f()],u.prototype,"_newColumnName",2),_([f()],u.prototype,"_unsubscribeUpdates",2),_([f()],u.prototype,"_selectedBoardId",2),_([f()],u.prototype,"_selectedColumnId",2),_([f()],u.prototype,"_editingTaskId",2),_([f()],u.prototype,"_editTaskTitle",2),_([f()],u.prototype,"_editTaskDescription",2),_([f()],u.prototype,"_movingTaskId",2),u=_([Ie("dobeedo-panel")],u)})();
