(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pe;const O=globalThis,j=O.ShadowRoot&&(O.ShadyCSS===void 0||O.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol(),Z=new WeakMap;let G=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==F)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(j&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=Z.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Z.set(t,e))}return e}toString(){return this.cssText}};const ue=i=>new G(typeof i=="string"?i:i+"",void 0,F),_e=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,o,r)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[r+1],i[0]);return new G(t,i,F)},be=(i,e)=>{if(j)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),o=O.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=t.cssText,i.appendChild(s)}},Q=j?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return ue(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:me,defineProperty:fe,getOwnPropertyDescriptor:ye,getOwnPropertyNames:ve,getOwnPropertySymbols:ge,getPrototypeOf:$e}=Object,v=globalThis,X=v.trustedTypes,xe=X?X.emptyScript:"",W=v.reactiveElementPolyfillSupport,D=(i,e)=>i,H={toAttribute(i,e){switch(e){case Boolean:i=i?xe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},q=(i,e)=>!me(i,e),ee={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),v.litPropertyMetadata??(v.litPropertyMetadata=new WeakMap);let A=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(e,s,t);o!==void 0&&fe(this.prototype,e,o)}}static getPropertyDescriptor(e,t,s){const{get:o,set:r}=ye(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:o,set(a){const d=o==null?void 0:o.call(this);r==null||r.call(this,a),this.requestUpdate(e,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ee}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;const e=$e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){const t=this.properties,s=[...ve(t),...ge(t)];for(const o of s)this.createProperty(o,t[o])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,o]of t)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const o=this._$Eu(t,s);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const o of s)t.unshift(Q(o))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return be(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var r;const s=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,s);if(o!==void 0&&s.reflect===!0){const a=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:H).toAttribute(t,s.type);this._$Em=e,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(e,t){var r,a;const s=this.constructor,o=s._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const d=s.getPropertyOptions(o),n=typeof d.converter=="function"?{fromAttribute:d.converter}:((r=d.converter)==null?void 0:r.fromAttribute)!==void 0?d.converter:H;this._$Em=o;const c=n.fromAttribute(t,d.type);this[o]=c??((a=this._$Ej)==null?void 0:a.get(o))??c,this._$Em=null}}requestUpdate(e,t,s){var o;if(e!==void 0){const r=this.constructor,a=this[e];if(s??(s=r.getPropertyOptions(e)),!((s.hasChanged??q)(a,t)||s.useDefault&&s.reflect&&a===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:o,wrapped:r},a){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),r!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,a]of o){const{wrapped:d}=a,n=this[r];d!==!0||this._$AL.has(r)||n===void 0||this.C(r,void 0,a,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(o=>{var r;return(r=o.hostUpdate)==null?void 0:r.call(o)}),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var o;return(o=s.hostUpdated)==null?void 0:o.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[D("elementProperties")]=new Map,A[D("finalized")]=new Map,W==null||W({ReactiveElement:A}),(v.reactiveElementVersions??(v.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=globalThis,R=B.trustedTypes,te=R?R.createPolicy("lit-html",{createHTML:i=>i}):void 0,se="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,ie="?"+g,ke=`<${ie}>`,x=document,S=()=>x.createComment(""),P=i=>i===null||typeof i!="object"&&typeof i!="function",V=Array.isArray,we=i=>V(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",Y=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,re=/>/g,k=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ae=/'/g,ne=/"/g,de=/^(?:script|style|textarea|title)$/i,Te=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),h=Te(1),C=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),le=new WeakMap,w=x.createTreeWalker(x,129);function ce(i,e){if(!V(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return te!==void 0?te.createHTML(e):e}const Ae=(i,e)=>{const t=i.length-1,s=[];let o,r=e===2?"<svg>":e===3?"<math>":"",a=M;for(let d=0;d<t;d++){const n=i[d];let c,b,l=-1,y=0;for(;y<n.length&&(a.lastIndex=y,b=a.exec(n),b!==null);)y=a.lastIndex,a===M?b[1]==="!--"?a=oe:b[1]!==void 0?a=re:b[2]!==void 0?(de.test(b[2])&&(o=RegExp("</"+b[2],"g")),a=k):b[3]!==void 0&&(a=k):a===k?b[0]===">"?(a=o??M,l=-1):b[1]===void 0?l=-2:(l=a.lastIndex-b[2].length,c=b[1],a=b[3]===void 0?k:b[3]==='"'?ne:ae):a===ne||a===ae?a=k:a===oe||a===re?a=M:(a=k,o=void 0);const $=a===k&&i[d+1].startsWith("/>")?" ":"";r+=a===M?n+ke:l>=0?(s.push(c),n.slice(0,l)+se+n.slice(l)+g+$):n+g+(l===-2?d:$)}return[ce(i,r+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class N{constructor({strings:e,_$litType$:t},s){let o;this.parts=[];let r=0,a=0;const d=e.length-1,n=this.parts,[c,b]=Ae(e,t);if(this.el=N.createElement(c,s),w.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(o=w.nextNode())!==null&&n.length<d;){if(o.nodeType===1){if(o.hasAttributes())for(const l of o.getAttributeNames())if(l.endsWith(se)){const y=b[a++],$=o.getAttribute(l).split(g),L=/([.?@])?(.*)/.exec(y);n.push({type:1,index:r,name:L[2],strings:$,ctor:L[1]==="."?Ee:L[1]==="?"?De:L[1]==="@"?Be:z}),o.removeAttribute(l)}else l.startsWith(g)&&(n.push({type:6,index:r}),o.removeAttribute(l));if(de.test(o.tagName)){const l=o.textContent.split(g),y=l.length-1;if(y>0){o.textContent=R?R.emptyScript:"";for(let $=0;$<y;$++)o.append(l[$],S()),w.nextNode(),n.push({type:2,index:++r});o.append(l[y],S())}}}else if(o.nodeType===8)if(o.data===ie)n.push({type:2,index:r});else{let l=-1;for(;(l=o.data.indexOf(g,l+1))!==-1;)n.push({type:7,index:r}),l+=g.length-1}r++}}static createElement(e,t){const s=x.createElement("template");return s.innerHTML=e,s}}function E(i,e,t=i,s){var a,d;if(e===C)return e;let o=s!==void 0?(a=t._$Co)==null?void 0:a[s]:t._$Cl;const r=P(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==r&&((d=o==null?void 0:o._$AO)==null||d.call(o,!1),r===void 0?o=void 0:(o=new r(i),o._$AT(i,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=o:t._$Cl=o),o!==void 0&&(e=E(i,o._$AS(i,e.values),o,s)),e}class Ce{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,o=((e==null?void 0:e.creationScope)??x).importNode(t,!0);w.currentNode=o;let r=w.nextNode(),a=0,d=0,n=s[0];for(;n!==void 0;){if(a===n.index){let c;n.type===2?c=new U(r,r.nextSibling,this,e):n.type===1?c=new n.ctor(r,n.name,n.strings,this,e):n.type===6&&(c=new Se(r,this,e)),this._$AV.push(c),n=s[++d]}a!==(n==null?void 0:n.index)&&(r=w.nextNode(),a++)}return w.currentNode=x,o}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class U{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,o){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=E(this,e,t),P(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==C&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):we(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(x.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=N.createElement(ce(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===o)this._$AH.p(t);else{const a=new Ce(o,this),d=a.u(this.options);a.p(t),this.T(d),this._$AH=a}}_$AC(e){let t=le.get(e.strings);return t===void 0&&le.set(e.strings,t=new N(e)),t}k(e){V(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,o=0;for(const r of e)o===t.length?t.push(s=new U(this.O(S()),this.O(S()),this,this.options)):s=t[o],s._$AI(r),o++;o<t.length&&(this._$AR(s&&s._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,o,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(e,t=this,s,o){const r=this.strings;let a=!1;if(r===void 0)e=E(this,e,t,0),a=!P(e)||e!==this._$AH&&e!==C,a&&(this._$AH=e);else{const d=e;let n,c;for(e=r[0],n=0;n<r.length-1;n++)c=E(this,d[s+n],t,n),c===C&&(c=this._$AH[n]),a||(a=!P(c)||c!==this._$AH[n]),c===p?e=p:e!==p&&(e+=(c??"")+r[n+1]),this._$AH[n]=c}a&&!o&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ee extends z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}}class De extends z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}}class Be extends z{constructor(e,t,s,o,r){super(e,t,s,o,r),this.type=5}_$AI(e,t=this){if((e=E(this,e,t,0)??p)===C)return;const s=this._$AH,o=e===p&&s!==p||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==p&&(s===p||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){E(this,e)}}const J=B.litHtmlPolyfillSupport;J==null||J(N,U),(B.litHtmlVersions??(B.litHtmlVersions=[])).push("3.3.1");const Pe=(i,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let o=s._$litPart$;if(o===void 0){const r=(t==null?void 0:t.renderBefore)??null;s._$litPart$=o=new U(e.insertBefore(S(),r),r,void 0,t??{})}return o._$AI(i),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis;class I extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return C}}I._$litElement$=!0,I.finalized=!0,(pe=T.litElementHydrateSupport)==null||pe.call(T,{LitElement:I});const K=T.litElementPolyfillSupport;K==null||K({LitElement:I}),(T.litElementVersions??(T.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Me=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ne={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:q},Ue=(i=Ne,e,t)=>{const{kind:s,metadata:o}=t;let r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),r.set(t.name,i),s==="accessor"){const{name:a}=t;return{set(d){const n=e.get.call(this);e.set.call(this,d),this.requestUpdate(a,n,i)},init(d){return d!==void 0&&this.C(a,void 0,i,d),d}}}if(s==="setter"){const{name:a}=t;return function(d){const n=this[a];e.call(this,d),this.requestUpdate(a,n,i)}}throw Error("Unsupported decorator location: "+s)};function he(i){return(e,t)=>typeof t=="object"?Ue(i,e,t):((s,o,r)=>{const a=o.hasOwnProperty(r);return o.constructor.createProperty(r,s),a?Object.getOwnPropertyDescriptor(o,r):void 0})(i,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(i){return he({...i,state:!0,attribute:!1})}class f{constructor(e){this.connection=e}async getBoards(){return(await this.connection.sendMessagePromise({type:"dobeedo/get_boards"})).boards??[]}async createBoard(e,t){const s={type:"dobeedo/create_board",name:e};return t!==void 0&&(s.description=t),(await this.connection.sendMessagePromise(s)).board}async getColumns(e){return(await this.connection.sendMessagePromise({type:"dobeedo/get_columns",board_id:e})).columns??[]}async createColumn(e,t,s){return(await this.connection.sendMessagePromise({type:"dobeedo/create_column",board_id:e,name:t,order_index:s})).column}async getTasks(e){return(await this.connection.sendMessagePromise({type:"dobeedo/get_tasks",board_id:e})).tasks??[]}async createTask(e,t,s,o){return(await this.connection.sendMessagePromise({type:"dobeedo/create_task",board_id:e,column_id:t,title:s,description:o})).task}async updateTask(e,t){const s={type:"dobeedo/update_task",task_id:e};return t.title!==void 0&&(s.title=t.title),t.description!==void 0&&(s.description=t.description),(await this.connection.sendMessagePromise(s)).task}async moveTask(e,t,s){const o={type:"dobeedo/move_task",task_id:e,target_column_id:t};return s!==void 0&&(o.target_sort_index=s),(await this.connection.sendMessagePromise(o)).task}async deleteTask(e){await this.connection.sendMessagePromise({type:"dobeedo/delete_task",task_id:e})}async deleteColumn(e){await this.connection.sendMessagePromise({type:"dobeedo/delete_column",column_id:e})}async deleteBoard(e){await this.connection.sendMessagePromise({type:"dobeedo/delete_board",board_id:e})}subscribeUpdates(e){const t=this.connection;if(t.subscribeEvents){console.debug("DoBeeDo: using connection.subscribeEvents for updates");const r=t.subscribeEvents(a=>{if(console.debug("DoBeeDo: raw WS message via subscribeEvents",a),typeof(a==null?void 0:a.event_type)=="string"&&a.data){const d=a.event_type;if(d.startsWith("dobeedo_")){const n=d.replace(/^dobeedo_/,"");e({event_type:n,payload:a.data,raw_type:d})}return}(a==null?void 0:a.type)==="dobeedo/event"&&a.event_type&&a.payload&&e({event_type:a.event_type,payload:a.payload,raw_type:a.raw_type})});return()=>{console.debug("DoBeeDo: unsubscribe from subscribeEvents"),r()}}if(!t.subscribeMessage)return console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available"),()=>{};const s=r=>{console.debug("DoBeeDo: raw WS message in subscribeUpdates handler",r),(r==null?void 0:r.type)==="dobeedo/event"&&r.event_type&&r.payload&&e({event_type:r.event_type,payload:r.payload,raw_type:r.raw_type})};console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");const o=t.subscribeMessage(s,{type:"dobeedo/subscribe_updates"});return()=>{console.debug("DoBeeDo: unsubscribe from subscribe_updates"),o()}}async populateTestData(){await this.connection.sendMessagePromise({type:"dobeedo/populate_test_data"})}}var Ie=Object.defineProperty,Oe=Object.getOwnPropertyDescriptor,_=(i,e,t,s)=>{for(var o=s>1?void 0:s?Oe(e,t):e,r=i.length-1,a;r>=0;r--)(a=i[r])&&(o=(s?a(e,t,o):a(o))||o);return s&&o&&Ie(e,t,o),o};let u=class extends I{constructor(){super(...arguments),this._boards=[],this._tasks=[],this._columns=[],this._loading=!1,this._newTaskTitles={},this._newTaskDescriptions={},this._newColumnName="",this._newBoardName="",this._unsubscribeUpdates=null,this._selectedBoardId=null,this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._movingTaskId=null}static get styles(){return _e`
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
        border: 1px solid var(--input-idle-line-color, var(--divider-color));
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
      }

      select option {
        background: var(--card-background-color);
        color: var(--primary-text-color);
        padding: 8px;
      }

      /* Board selector */
      .board-selector {
        display: flex;
        gap: 8px;
        margin-bottom: 24px;
        flex-wrap: wrap;
        align-items: center;
      }

      .board-chip-container {
        display: flex;
        align-items: center;
        gap: 4px;
        position: relative;
      }

      .board-chip {
        padding: 8px 16px;
        border-radius: 16px;
        background: var(--card-background-color, #1c1c1c);
        border: 1px solid var(--ha-color-border-neutral-normal, #7a7a7a);
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--primary-text-color);
      }

      .board-chip:hover {
        border-color: var(--primary-color);
        transform: translateY(-1px);
        box-shadow: var(--material-shadow-elevation-2dp, 0 2px 2px 0 rgba(0,0,0,0.14));
      }

      .board-chip.selected {
        background: var(--primary-color);
        color: var(--text-primary-color);
        border-color: var(--primary-color);
        box-shadow: var(--material-shadow-elevation-2dp, 0 2px 2px 0 rgba(0,0,0,0.14));
      }

      .board-delete-btn {
        padding: 0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--warning-color);
        color: var(--text-primary-color);
        border: none;
        cursor: pointer;
        font-size: 16px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
        transition: opacity 0.2s ease;
      }

      .board-delete-btn:hover {
        opacity: 1;
      }

      .add-board-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .add-board-input {
        padding: 8px 16px;
        border-radius: 16px;
        background: var(--card-background-color, #1c1c1c);
        border: 1px dashed var(--ha-color-border-neutral-normal, #7a7a7a);
        color: var(--primary-text-color);
        font-size: 14px;
        width: 150px;
        transition: all 0.2s ease;
      }

      .add-board-input:focus {
        border-style: solid;
        border-color: var(--primary-color);
        outline: none;
      }

      .add-board-input::placeholder {
        color: var(--secondary-text-color);
        opacity: 0.7;
      }

      .add-board-actions {
        display: flex;
        gap: 4px;
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
        background: var(--card-background-color, #1c1c1c);
        border: 1px solid var(--ha-color-border-neutral-quiet, #5e5e5e);
        border-radius: var(--ha-border-radius-md, 8px);
        padding: 16px;
        box-shadow: var(--material-shadow-elevation-2dp, 0 2px 2px 0 rgba(0,0,0,0.14));
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

      .column-header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .task-count {
        font-size: 12px;
        font-weight: 400;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color, var(--divider-color));
        padding: 2px 8px;
        border-radius: 12px;
      }

      .tasks-list {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-height: 100px;
      }

      /* Task cards */
      .task-card {
        background: var(--secondary-background-color, #282828);
        border: 1px solid var(--ha-color-border-neutral-normal, #7a7a7a);
        border-left: 3px solid var(--ha-color-border-neutral-loud, #b1b1b1);
        border-radius: 6px;
        padding: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: var(--material-shadow-elevation-2dp, 0 2px 2px 0 rgba(0,0,0,0.14));
      }

      .task-card:hover {
        border-left-color: var(--primary-color);
        box-shadow: var(--material-shadow-elevation-4dp, 0 4px 5px 0 rgba(0,0,0,0.14));
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

      /* Add task form at bottom of columns */
      .add-task-form {
        margin-top: 8px;
        padding: 8px;
        border-top: 1px solid var(--ha-color-border-neutral-quiet, #5e5e5e);
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
        background: var(--card-background-color, #1c1c1c);
        border: 2px dashed var(--ha-color-border-neutral-quiet, #5e5e5e);
        opacity: 0.6;
        min-height: 60px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        transition: opacity 0.2s ease, border-color 0.2s ease;
      }

      .add-column-mock:hover {
        opacity: 1;
        border-color: var(--ha-color-border-neutral-normal, #7a7a7a);
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
    `}updated(i){if(i.has("hass")&&this.hass&&(this._fetchBoards(),!this._unsubscribeUpdates)){const e=new f(this.hass.connection);console.debug("DoBeeDo: registering subscribeUpdates"),this._unsubscribeUpdates=e.subscribeUpdates(t=>{var s,o;if(console.debug("DoBeeDo event received in panel",t),t.event_type.startsWith("task_")){const r=(s=t.payload.task)==null?void 0:s.board_id;console.debug("DoBeeDo task event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshTasksForSelectedBoard()}else if(t.event_type.startsWith("column_")){const r=(o=t.payload.column)==null?void 0:o.board_id;console.debug("DoBeeDo column event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshColumnsAndTasks()}else t.event_type.startsWith("board_")&&(console.debug("DoBeeDo board event"),this._fetchBoards())})}}async _fetchBoards(){if(this.hass){this._loading=!0;try{const i=new f(this.hass.connection);this._boards=await i.getBoards(),!this._selectedBoardId&&this._boards.length>0&&(this._selectedBoardId=this._boards[0].id),await this._refreshColumnsAndTasks()}catch(i){console.error("Failed to load DoBeeDo data",i)}finally{this._loading=!1}}}async _refreshColumnsAndTasks(){if(!this.hass||!this._selectedBoardId){this._columns=[],this._tasks=[];return}const i=new f(this.hass.connection);this._columns=await i.getColumns(this._selectedBoardId),this._tasks=await i.getTasks(this._selectedBoardId)}async _refreshTasksForSelectedBoard(){if(!this.hass||!this._selectedBoardId){this._tasks=[];return}const i=new f(this.hass.connection);this._tasks=await i.getTasks(this._selectedBoardId)}_handleSelectBoard(i){this._selectedBoardId!==i.id&&(this._selectedBoardId=i.id,this._refreshColumnsAndTasks())}async _handleCreateTask(i){const e=this._newTaskTitles[i]||"",t=this._newTaskDescriptions[i]||"";if(!this.hass||!this._selectedBoardId||!e.trim())return;const s=new f(this.hass.connection),o=this._boards.find(r=>r.id===this._selectedBoardId);if(o)try{await s.createTask(o.id,i,e.trim(),t.trim()||void 0),delete this._newTaskTitles[i],delete this._newTaskDescriptions[i],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions}}catch(r){console.error("Failed to create DoBeeDo task",r)}}async _handleCreateColumn(){if(!this.hass||!this._selectedBoardId||!this._newColumnName.trim())return;const i=new f(this.hass.connection);try{await i.createColumn(this._selectedBoardId,this._newColumnName.trim()),this._newColumnName=""}catch(e){console.error("Failed to create DoBeeDo column",e)}}async _handleCreateBoard(){if(!this.hass||!this._newBoardName.trim())return;const i=new f(this.hass.connection);try{const e=await i.createBoard(this._newBoardName.trim());this._newBoardName="",await this._fetchBoards(),this._selectedBoardId=e.id,await this._refreshColumnsAndTasks()}catch(e){console.error("Failed to create DoBeeDo board",e)}}async _handleDeleteBoard(i){if(!this.hass||!window.confirm(`Delete board "${i.name}" and all its columns and tasks?`))return;const e=new f(this.hass.connection);try{await e.deleteBoard(i.id),await this._fetchBoards(),this._selectedBoardId===i.id&&(this._selectedBoardId=this._boards.length>0?this._boards[0].id:null,await this._refreshColumnsAndTasks())}catch(t){console.error("Failed to delete DoBeeDo board",t)}}_startEditTask(i){this._editingTaskId=i.id,this._editTaskTitle=i.title,this._editTaskDescription=i.description??""}_cancelEditTask(){this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription=""}async _saveEditTask(){if(!this.hass||!this._editingTaskId)return;const i=this._tasks.find(r=>r.id===this._editingTaskId);if(!i)return;const e=this._editTaskTitle.trim();if(!e)return;const t={};e!==i.title&&(t.title=e);const s=this._editTaskDescription.trim();if(s!==(i.description??"")&&(t.description=s===""?null:s),!t.title&&t.description===void 0){this._cancelEditTask();return}const o=new f(this.hass.connection);try{await o.updateTask(this._editingTaskId,t),this._cancelEditTask()}catch(r){console.error("Failed to update DoBeeDo task",r)}}_startMoveTask(i){this._movingTaskId=i.id}_cancelMoveTask(){this._movingTaskId=null}async _handleMoveTask(i,e){if(!this.hass||e===i.column_id){this._cancelMoveTask();return}const t=new f(this.hass.connection);try{await t.moveTask(i.id,e),this._cancelMoveTask()}catch(s){console.error("Failed to move DoBeeDo task",s)}}async _handleDeleteTask(i){if(!this.hass||!window.confirm(`Delete task "${i.title}"?`))return;const e=new f(this.hass.connection);try{await e.deleteTask(i.id)}catch(t){console.error("Failed to delete DoBeeDo task",t)}}async _handleDeleteColumn(i){if(!this.hass)return;const t=this._tasks.filter(r=>r.column_id===i.id).length,s=t>0?`Delete column "${i.name}" and ${t} task${t===1?"":"s"}?`:`Delete column "${i.name}"?`;if(!window.confirm(s))return;const o=new f(this.hass.connection);try{await o.deleteColumn(i.id)}catch(r){console.error("Failed to delete DoBeeDo column",r)}}async _handlePopulateTestData(){if(!this.hass||!window.confirm(`⚠️ WARNING: This will DELETE ALL existing boards, columns, and tasks!

This is a development helper that clears everything and creates fresh test data.

Are you sure you want to continue?`))return;const i=new f(this.hass.connection);try{await i.populateTestData(),await this._fetchBoards()}catch(e){console.error("Failed to populate test data",e)}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeUpdates&&(this._unsubscribeUpdates(),this._unsubscribeUpdates=null)}render(){return h`
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
            <div class="board-chip-container">
              <div
                class="board-chip ${i.id===this._selectedBoardId?"selected":""}"
                @click=${()=>this._handleSelectBoard(i)}
              >
                ${i.name}
              </div>
              <button
                class="board-delete-btn"
                @click=${()=>this._handleDeleteBoard(i)}
                title="Delete board"
              >
                ×
              </button>
            </div>
          `)}
        <div class="board-chip-container add-board-container">
          <input
            type="text"
            class="add-board-input"
            .value=${this._newBoardName}
            placeholder="+ Add board"
            @input=${i=>{const e=i.target;this._newBoardName=e.value}}
            @keydown=${i=>{i.key==="Enter"&&this._newBoardName.trim()&&this._handleCreateBoard()}}
          />
          ${this._newBoardName.trim()?h`
                <div class="add-board-actions">
                  <button class="primary small" @click=${()=>this._handleCreateBoard()}>Add</button>
                  <button
                    class="secondary small"
                    @click=${()=>{this._newBoardName=""}}
                  >
                    Cancel
                  </button>
                </div>
              `:""}
        </div>
      </div>
    `}_renderBoard(){return h`
      ${this._columns.length===0?h`<div class="empty-state">No columns yet. Add a column to get started!</div>`:""}
      <div class="columns-container">
        ${this._columns.map(i=>this._renderColumn(i))}
        ${this._renderAddColumnMock()}
      </div>
    `}_renderAddColumnMock(){return h`
      <div class="column add-column-mock">
        <div class="add-column-form">
          <input
            type="text"
            class="add-column-input"
            .value=${this._newColumnName}
            placeholder="Add column..."
            @input=${i=>{const e=i.target;this._newColumnName=e.value}}
            @keydown=${i=>{i.key==="Enter"&&this._newColumnName.trim()&&this._handleCreateColumn()}}
          />
          ${this._newColumnName.trim()?h`
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
    `}_renderColumn(i){const e=this._tasks.filter(t=>t.column_id===i.id).sort((t,s)=>t.sort_index-s.sort_index);return h`
      <div class="column">
        <div class="column-header">
          <div class="column-header-left">
            <span>${i.name}</span>
            <span class="task-count">${e.length}</span>
          </div>
          <button
            class="warning small"
            @click=${()=>this._handleDeleteColumn(i)}
            title="Delete column"
          >
            ×
          </button>
        </div>
        <div class="tasks-list">
          ${e.length===0?h`<div class="empty-state" style="padding: 16px; font-size: 13px;">
                No tasks yet
              </div>`:e.map(t=>this._renderTask(t))}
        </div>
        <div class="add-task-form">
          <input
            type="text"
            class="add-task-input"
            .value=${this._newTaskTitles[i.id]||""}
            placeholder="Add a task..."
            @input=${t=>{const s=t.target;this._newTaskTitles={...this._newTaskTitles,[i.id]:s.value}}}
            @keydown=${t=>{const s=this._newTaskTitles[i.id]||"";t.key==="Enter"&&s.trim()&&this._handleCreateTask(i.id)}}
          />
          ${(this._newTaskTitles[i.id]||"").trim()?h`
                <div class="add-task-actions">
                  <input
                    type="text"
                    class="add-task-input"
                    .value=${this._newTaskDescriptions[i.id]||""}
                    placeholder="Description (optional)"
                    @input=${t=>{const s=t.target;this._newTaskDescriptions={...this._newTaskDescriptions,[i.id]:s.value}}}
                    @keydown=${t=>{t.key==="Enter"&&this._handleCreateTask(i.id)}}
                  />
                  <div class="add-task-buttons">
                    <button class="primary small" @click=${()=>this._handleCreateTask(i.id)}>
                      Add
                    </button>
                    <button
                      class="secondary small"
                      @click=${()=>{delete this._newTaskTitles[i.id],delete this._newTaskDescriptions[i.id],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions}}}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              `:""}
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
          <button class="warning small" @click=${()=>this._handleDeleteTask(i)}>Delete</button>
        </div>
      </div>
    `}};_([he({attribute:!1})],u.prototype,"hass",2),_([m()],u.prototype,"_boards",2),_([m()],u.prototype,"_tasks",2),_([m()],u.prototype,"_columns",2),_([m()],u.prototype,"_loading",2),_([m()],u.prototype,"_newTaskTitles",2),_([m()],u.prototype,"_newTaskDescriptions",2),_([m()],u.prototype,"_newColumnName",2),_([m()],u.prototype,"_newBoardName",2),_([m()],u.prototype,"_unsubscribeUpdates",2),_([m()],u.prototype,"_selectedBoardId",2),_([m()],u.prototype,"_editingTaskId",2),_([m()],u.prototype,"_editTaskTitle",2),_([m()],u.prototype,"_editTaskDescription",2),_([m()],u.prototype,"_movingTaskId",2),u=_([Me("dobeedo-panel")],u)})();
