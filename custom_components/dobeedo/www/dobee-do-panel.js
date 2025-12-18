(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pe;const O=globalThis,j=O.ShadowRoot&&(O.ShadyCSS===void 0||O.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol(),Z=new WeakMap;let G=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==F)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(j&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Z.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Z.set(t,e))}return e}toString(){return this.cssText}};const ue=s=>new G(typeof s=="string"?s:s+"",void 0,F),_e=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,o,r)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[r+1],s[0]);return new G(t,s,F)},me=(s,e)=>{if(j)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),o=O.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,s.appendChild(i)}},Q=j?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ue(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ge,defineProperty:be,getOwnPropertyDescriptor:fe,getOwnPropertyNames:ve,getOwnPropertySymbols:ye,getPrototypeOf:$e}=Object,v=globalThis,X=v.trustedTypes,ke=X?X.emptyScript:"",W=v.reactiveElementPolyfillSupport,E=(s,e)=>s,H={toAttribute(s,e){switch(e){case Boolean:s=s?ke:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},q=(s,e)=>!ge(s,e),ee={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),v.litPropertyMetadata??(v.litPropertyMetadata=new WeakMap);let A=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);o!==void 0&&be(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:r}=fe(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:o,set(a){const d=o==null?void 0:o.call(this);r==null||r.call(this,a),this.requestUpdate(e,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ee}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const e=$e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const t=this.properties,i=[...ve(t),...ye(t)];for(const o of i)this.createProperty(o,t[o])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,o]of t)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const o=this._$Eu(t,i);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(Q(o))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return me(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var r;const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(o!==void 0&&i.reflect===!0){const a=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:H).toAttribute(t,i.type);this._$Em=e,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(e,t){var r,a;const i=this.constructor,o=i._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const d=i.getPropertyOptions(o),n=typeof d.converter=="function"?{fromAttribute:d.converter}:((r=d.converter)==null?void 0:r.fromAttribute)!==void 0?d.converter:H;this._$Em=o;const l=n.fromAttribute(t,d.type);this[o]=l??((a=this._$Ej)==null?void 0:a.get(o))??l,this._$Em=null}}requestUpdate(e,t,i){var o;if(e!==void 0){const r=this.constructor,a=this[e];if(i??(i=r.getPropertyOptions(e)),!((i.hasChanged??q)(a,t)||i.useDefault&&i.reflect&&a===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:r},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),r!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,a]of o){const{wrapped:d}=a,n=this[r];d!==!0||this._$AL.has(r)||n===void 0||this.C(r,void 0,a,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(o=>{var r;return(r=o.hostUpdate)==null?void 0:r.call(o)}),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var o;return(o=i.hostUpdated)==null?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[E("elementProperties")]=new Map,A[E("finalized")]=new Map,W==null||W({ReactiveElement:A}),(v.reactiveElementVersions??(v.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=globalThis,R=B.trustedTypes,te=R?R.createPolicy("lit-html",{createHTML:s=>s}):void 0,se="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,ie="?"+y,xe=`<${ie}>`,k=document,S=()=>k.createComment(""),P=s=>s===null||typeof s!="object"&&typeof s!="function",V=Array.isArray,we=s=>V(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Y=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,re=/>/g,x=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ae=/'/g,ne=/"/g,de=/^(?:script|style|textarea|title)$/i,Te=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),h=Te(1),C=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),le=new WeakMap,w=k.createTreeWalker(k,129);function ce(s,e){if(!V(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return te!==void 0?te.createHTML(e):e}const Ae=(s,e)=>{const t=s.length-1,i=[];let o,r=e===2?"<svg>":e===3?"<math>":"",a=I;for(let d=0;d<t;d++){const n=s[d];let l,u,c=-1,f=0;for(;f<n.length&&(a.lastIndex=f,u=a.exec(n),u!==null);)f=a.lastIndex,a===I?u[1]==="!--"?a=oe:u[1]!==void 0?a=re:u[2]!==void 0?(de.test(u[2])&&(o=RegExp("</"+u[2],"g")),a=x):u[3]!==void 0&&(a=x):a===x?u[0]===">"?(a=o??I,c=-1):u[1]===void 0?c=-2:(c=a.lastIndex-u[2].length,l=u[1],a=u[3]===void 0?x:u[3]==='"'?ne:ae):a===ne||a===ae?a=x:a===oe||a===re?a=I:(a=x,o=void 0);const $=a===x&&s[d+1].startsWith("/>")?" ":"";r+=a===I?n+xe:c>=0?(i.push(l),n.slice(0,c)+se+n.slice(c)+y+$):n+y+(c===-2?d:$)}return[ce(s,r+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class M{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,a=0;const d=e.length-1,n=this.parts,[l,u]=Ae(e,t);if(this.el=M.createElement(l,i),w.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(o=w.nextNode())!==null&&n.length<d;){if(o.nodeType===1){if(o.hasAttributes())for(const c of o.getAttributeNames())if(c.endsWith(se)){const f=u[a++],$=o.getAttribute(c).split(y),L=/([.?@])?(.*)/.exec(f);n.push({type:1,index:r,name:L[2],strings:$,ctor:L[1]==="."?De:L[1]==="?"?Ee:L[1]==="@"?Be:z}),o.removeAttribute(c)}else c.startsWith(y)&&(n.push({type:6,index:r}),o.removeAttribute(c));if(de.test(o.tagName)){const c=o.textContent.split(y),f=c.length-1;if(f>0){o.textContent=R?R.emptyScript:"";for(let $=0;$<f;$++)o.append(c[$],S()),w.nextNode(),n.push({type:2,index:++r});o.append(c[f],S())}}}else if(o.nodeType===8)if(o.data===ie)n.push({type:2,index:r});else{let c=-1;for(;(c=o.data.indexOf(y,c+1))!==-1;)n.push({type:7,index:r}),c+=y.length-1}r++}}static createElement(e,t){const i=k.createElement("template");return i.innerHTML=e,i}}function D(s,e,t=s,i){var a,d;if(e===C)return e;let o=i!==void 0?(a=t._$Co)==null?void 0:a[i]:t._$Cl;const r=P(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==r&&((d=o==null?void 0:o._$AO)==null||d.call(o,!1),r===void 0?o=void 0:(o=new r(s),o._$AT(s,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=o:t._$Cl=o),o!==void 0&&(e=D(s,o._$AS(s,e.values),o,i)),e}class Ce{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=((e==null?void 0:e.creationScope)??k).importNode(t,!0);w.currentNode=o;let r=w.nextNode(),a=0,d=0,n=i[0];for(;n!==void 0;){if(a===n.index){let l;n.type===2?l=new N(r,r.nextSibling,this,e):n.type===1?l=new n.ctor(r,n.name,n.strings,this,e):n.type===6&&(l=new Se(r,this,e)),this._$AV.push(l),n=i[++d]}a!==(n==null?void 0:n.index)&&(r=w.nextNode(),a++)}return w.currentNode=k,o}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class N{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=D(this,e,t),P(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==C&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):we(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==_&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:i}=e,o=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=M.createElement(ce(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===o)this._$AH.p(t);else{const a=new Ce(o,this),d=a.u(this.options);a.p(t),this.T(d),this._$AH=a}}_$AC(e){let t=le.get(e.strings);return t===void 0&&le.set(e.strings,t=new M(e)),t}k(e){V(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new N(this.O(S()),this.O(S()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,r){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_}_$AI(e,t=this,i,o){const r=this.strings;let a=!1;if(r===void 0)e=D(this,e,t,0),a=!P(e)||e!==this._$AH&&e!==C,a&&(this._$AH=e);else{const d=e;let n,l;for(e=r[0],n=0;n<r.length-1;n++)l=D(this,d[i+n],t,n),l===C&&(l=this._$AH[n]),a||(a=!P(l)||l!==this._$AH[n]),l===_?e=_:e!==_&&(e+=(l??"")+r[n+1]),this._$AH[n]=l}a&&!o&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class De extends z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}}class Ee extends z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==_)}}class Be extends z{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){if((e=D(this,e,t,0)??_)===C)return;const i=this._$AH,o=e===_&&i!==_||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==_&&(i===_||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){D(this,e)}}const J=B.litHtmlPolyfillSupport;J==null||J(M,N),(B.litHtmlVersions??(B.litHtmlVersions=[])).push("3.3.1");const Pe=(s,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let o=i._$litPart$;if(o===void 0){const r=(t==null?void 0:t.renderBefore)??null;i._$litPart$=o=new N(e.insertBefore(S(),r),r,void 0,t??{})}return o._$AI(s),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis;class U extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return C}}U._$litElement$=!0,U.finalized=!0,(pe=T.litElementHydrateSupport)==null||pe.call(T,{LitElement:U});const K=T.litElementPolyfillSupport;K==null||K({LitElement:U}),(T.litElementVersions??(T.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ie=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Me={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:q},Ne=(s=Me,e,t)=>{const{kind:i,metadata:o}=t;let r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),r.set(t.name,s),i==="accessor"){const{name:a}=t;return{set(d){const n=e.get.call(this);e.set.call(this,d),this.requestUpdate(a,n,s)},init(d){return d!==void 0&&this.C(a,void 0,s,d),d}}}if(i==="setter"){const{name:a}=t;return function(d){const n=this[a];e.call(this,d),this.requestUpdate(a,n,s)}}throw Error("Unsupported decorator location: "+i)};function he(s){return(e,t)=>typeof t=="object"?Ne(s,e,t):((i,o,r)=>{const a=o.hasOwnProperty(r);return o.constructor.createProperty(r,i),a?Object.getOwnPropertyDescriptor(o,r):void 0})(s,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(s){return he({...s,state:!0,attribute:!1})}class b{constructor(e){this.connection=e}async getBoards(){return(await this.connection.sendMessagePromise({type:"dobeedo/get_boards"})).boards??[]}async createBoard(e,t){const i={type:"dobeedo/create_board",name:e};return t!==void 0&&(i.description=t),(await this.connection.sendMessagePromise(i)).board}async getColumns(e){return(await this.connection.sendMessagePromise({type:"dobeedo/get_columns",board_id:e})).columns??[]}async createColumn(e,t,i){return(await this.connection.sendMessagePromise({type:"dobeedo/create_column",board_id:e,name:t,order_index:i})).column}async getTasks(e){return(await this.connection.sendMessagePromise({type:"dobeedo/get_tasks",board_id:e})).tasks??[]}async createTask(e,t,i,o){return(await this.connection.sendMessagePromise({type:"dobeedo/create_task",board_id:e,column_id:t,title:i,description:o})).task}async updateTask(e,t){const i={type:"dobeedo/update_task",task_id:e};return t.title!==void 0&&(i.title=t.title),t.description!==void 0&&(i.description=t.description),(await this.connection.sendMessagePromise(i)).task}async moveTask(e,t,i){const o={type:"dobeedo/move_task",task_id:e,target_column_id:t};return i!==void 0&&(o.target_sort_index=i),(await this.connection.sendMessagePromise(o)).task}async deleteTask(e){await this.connection.sendMessagePromise({type:"dobeedo/delete_task",task_id:e})}async deleteColumn(e){await this.connection.sendMessagePromise({type:"dobeedo/delete_column",column_id:e})}async deleteBoard(e){await this.connection.sendMessagePromise({type:"dobeedo/delete_board",board_id:e})}subscribeUpdates(e){const t=this.connection;if(t.subscribeEvents){console.debug("DoBeeDo: using connection.subscribeEvents for updates");const r=t.subscribeEvents(a=>{if(console.debug("DoBeeDo: raw WS message via subscribeEvents",a),typeof(a==null?void 0:a.event_type)=="string"&&a.data){const d=a.event_type;if(d.startsWith("dobeedo_")){const n=d.replace(/^dobeedo_/,"");e({event_type:n,payload:a.data,raw_type:d})}return}(a==null?void 0:a.type)==="dobeedo/event"&&a.event_type&&a.payload&&e({event_type:a.event_type,payload:a.payload,raw_type:a.raw_type})});return()=>{console.debug("DoBeeDo: unsubscribe from subscribeEvents"),r()}}if(!t.subscribeMessage)return console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available"),()=>{};const i=r=>{console.debug("DoBeeDo: raw WS message in subscribeUpdates handler",r),(r==null?void 0:r.type)==="dobeedo/event"&&r.event_type&&r.payload&&e({event_type:r.event_type,payload:r.payload,raw_type:r.raw_type})};console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");const o=t.subscribeMessage(i,{type:"dobeedo/subscribe_updates"});return()=>{console.debug("DoBeeDo: unsubscribe from subscribe_updates"),o()}}async populateTestData(){await this.connection.sendMessagePromise({type:"dobeedo/populate_test_data"})}}var Ue=Object.defineProperty,Oe=Object.getOwnPropertyDescriptor,m=(s,e,t,i)=>{for(var o=i>1?void 0:i?Oe(e,t):e,r=s.length-1,a;r>=0;r--)(a=s[r])&&(o=(i?a(e,t,o):a(o))||o);return i&&o&&Ue(e,t,o),o};let p=class extends U{constructor(){super(...arguments),this._boards=[],this._tasks=[],this._columns=[],this._loading=!1,this._newTaskTitles={},this._newTaskDescriptions={},this._newColumnName="",this._newBoardName="",this._unsubscribeUpdates=null,this._selectedBoardId=null,this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._movingTaskId=null,this._draggingTaskId=null,this._dragOverColumnId=null}static get styles(){return _e`
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
        cursor: grab;
        transition: all 0.2s ease;
        box-shadow: var(--material-shadow-elevation-2dp, 0 2px 2px 0 rgba(0,0,0,0.14));
      }

      .task-card:hover {
        border-left-color: var(--primary-color);
        box-shadow: var(--material-shadow-elevation-4dp, 0 4px 5px 0 rgba(0,0,0,0.14));
        transform: translateY(-2px);
      }

      .task-card.dragging {
        opacity: 0.5;
        cursor: grabbing;
        transform: rotate(2deg);
      }

      .column.drag-over {
        background: var(--primary-color);
        opacity: 0.1;
      }

      .tasks-list.drag-over {
        background: var(--primary-color);
        opacity: 0.2;
        border-radius: 4px;
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
    `}updated(s){if(s.has("hass")&&this.hass&&(this._fetchBoards(),!this._unsubscribeUpdates)){const e=new b(this.hass.connection);console.debug("DoBeeDo: registering subscribeUpdates"),this._unsubscribeUpdates=e.subscribeUpdates(t=>{var i,o;if(console.debug("DoBeeDo event received in panel",t),t.event_type.startsWith("task_")){const r=(i=t.payload.task)==null?void 0:i.board_id;console.debug("DoBeeDo task event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshTasksForSelectedBoard()}else if(t.event_type.startsWith("column_")){const r=(o=t.payload.column)==null?void 0:o.board_id;console.debug("DoBeeDo column event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshColumnsAndTasks()}else t.event_type.startsWith("board_")&&(console.debug("DoBeeDo board event"),this._fetchBoards())})}}async _fetchBoards(){if(this.hass){this._loading=!0;try{const s=new b(this.hass.connection);this._boards=await s.getBoards(),!this._selectedBoardId&&this._boards.length>0&&(this._selectedBoardId=this._boards[0].id),await this._refreshColumnsAndTasks()}catch(s){console.error("Failed to load DoBeeDo data",s)}finally{this._loading=!1}}}async _refreshColumnsAndTasks(){if(!this.hass||!this._selectedBoardId){this._columns=[],this._tasks=[];return}const s=new b(this.hass.connection);this._columns=await s.getColumns(this._selectedBoardId),this._tasks=await s.getTasks(this._selectedBoardId)}async _refreshTasksForSelectedBoard(){if(!this.hass||!this._selectedBoardId){this._tasks=[];return}const s=new b(this.hass.connection);this._tasks=await s.getTasks(this._selectedBoardId)}_handleSelectBoard(s){this._selectedBoardId!==s.id&&(this._selectedBoardId=s.id,this._refreshColumnsAndTasks())}async _handleCreateTask(s){const e=this._newTaskTitles[s]||"",t=this._newTaskDescriptions[s]||"";if(!this.hass||!this._selectedBoardId||!e.trim())return;const i=new b(this.hass.connection),o=this._boards.find(r=>r.id===this._selectedBoardId);if(o)try{await i.createTask(o.id,s,e.trim(),t.trim()||void 0),delete this._newTaskTitles[s],delete this._newTaskDescriptions[s],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions}}catch(r){console.error("Failed to create DoBeeDo task",r)}}async _handleCreateColumn(){if(!this.hass||!this._selectedBoardId||!this._newColumnName.trim())return;const s=new b(this.hass.connection);try{await s.createColumn(this._selectedBoardId,this._newColumnName.trim()),this._newColumnName=""}catch(e){console.error("Failed to create DoBeeDo column",e)}}async _handleCreateBoard(){if(!this.hass||!this._newBoardName.trim())return;const s=new b(this.hass.connection);try{const e=await s.createBoard(this._newBoardName.trim());this._newBoardName="",await this._fetchBoards(),this._selectedBoardId=e.id,await this._refreshColumnsAndTasks()}catch(e){console.error("Failed to create DoBeeDo board",e)}}async _handleDeleteBoard(s){if(!this.hass||!window.confirm(`Delete board "${s.name}" and all its columns and tasks?`))return;const e=new b(this.hass.connection);try{await e.deleteBoard(s.id),await this._fetchBoards(),this._selectedBoardId===s.id&&(this._selectedBoardId=this._boards.length>0?this._boards[0].id:null,await this._refreshColumnsAndTasks())}catch(t){console.error("Failed to delete DoBeeDo board",t)}}_startEditTask(s){this._editingTaskId=s.id,this._editTaskTitle=s.title,this._editTaskDescription=s.description??""}_cancelEditTask(){this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription=""}async _saveEditTask(){if(!this.hass||!this._editingTaskId)return;const s=this._tasks.find(r=>r.id===this._editingTaskId);if(!s)return;const e=this._editTaskTitle.trim();if(!e)return;const t={};e!==s.title&&(t.title=e);const i=this._editTaskDescription.trim();if(i!==(s.description??"")&&(t.description=i===""?null:i),!t.title&&t.description===void 0){this._cancelEditTask();return}const o=new b(this.hass.connection);try{await o.updateTask(this._editingTaskId,t),this._cancelEditTask()}catch(r){console.error("Failed to update DoBeeDo task",r)}}_startMoveTask(s){this._movingTaskId=s.id}_cancelMoveTask(){this._movingTaskId=null}async _handleMoveTask(s,e){if(!this.hass||e===s.column_id){this._cancelMoveTask();return}const t=new b(this.hass.connection);try{await t.moveTask(s.id,e),this._cancelMoveTask()}catch(i){console.error("Failed to move DoBeeDo task",i)}}_handleDragStart(s,e){this._draggingTaskId=s.id,e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",s.id))}_handleDragEnd(){this._draggingTaskId=null,this._dragOverColumnId=null}_handleDragOver(s){s.preventDefault(),s.dataTransfer&&(s.dataTransfer.dropEffect="move")}_handleDragEnterColumn(s){this._dragOverColumnId=s}_handleDragLeaveColumn(){this._dragOverColumnId=null}async _handleDrop(s,e){if(e.preventDefault(),this._dragOverColumnId=null,!this._draggingTaskId||!this.hass)return;const t=this._tasks.find(d=>d.id===this._draggingTaskId);if(!t){this._draggingTaskId=null;return}let o=this._tasks.filter(d=>d.column_id===s&&d.id!==this._draggingTaskId).sort((d,n)=>d.sort_index-n.sort_index).length;const r=e.currentTarget.querySelector(".tasks-list");if(r){const d=Array.from(r.querySelectorAll(".task-card:not(.dragging)")),n=e.clientY;for(let l=0;l<d.length;l++){const u=d[l].getBoundingClientRect(),c=u.top+u.height/2;if(n<c){o=l;break}}}const a=new b(this.hass.connection);try{await a.moveTask(t.id,s,o),this._draggingTaskId=null}catch(d){console.error("Failed to move task via drag-and-drop",d),this._draggingTaskId=null}}async _handleDeleteTask(s){if(!this.hass||!window.confirm(`Delete task "${s.title}"?`))return;const e=new b(this.hass.connection);try{await e.deleteTask(s.id)}catch(t){console.error("Failed to delete DoBeeDo task",t)}}async _handleDeleteColumn(s){if(!this.hass)return;const t=this._tasks.filter(r=>r.column_id===s.id).length,i=t>0?`Delete column "${s.name}" and ${t} task${t===1?"":"s"}?`:`Delete column "${s.name}"?`;if(!window.confirm(i))return;const o=new b(this.hass.connection);try{await o.deleteColumn(s.id)}catch(r){console.error("Failed to delete DoBeeDo column",r)}}async _handlePopulateTestData(){if(!this.hass||!window.confirm(`⚠️ WARNING: This will DELETE ALL existing boards, columns, and tasks!

This is a development helper that clears everything and creates fresh test data.

Are you sure you want to continue?`))return;const s=new b(this.hass.connection);try{await s.populateTestData(),await this._fetchBoards()}catch(e){console.error("Failed to populate test data",e)}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeUpdates&&(this._unsubscribeUpdates(),this._unsubscribeUpdates=null)}render(){return h`
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
        ${this._boards.map(s=>h`
            <div class="board-chip-container">
              <div
                class="board-chip ${s.id===this._selectedBoardId?"selected":""}"
                @click=${()=>this._handleSelectBoard(s)}
              >
                ${s.name}
              </div>
              <button
                class="board-delete-btn"
                @click=${()=>this._handleDeleteBoard(s)}
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
            @input=${s=>{const e=s.target;this._newBoardName=e.value}}
            @keydown=${s=>{s.key==="Enter"&&this._newBoardName.trim()&&this._handleCreateBoard()}}
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
        ${this._columns.map(s=>this._renderColumn(s))}
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
            @input=${s=>{const e=s.target;this._newColumnName=e.value}}
            @keydown=${s=>{s.key==="Enter"&&this._newColumnName.trim()&&this._handleCreateColumn()}}
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
    `}_renderColumn(s){const e=this._tasks.filter(i=>i.column_id===s.id).sort((i,o)=>i.sort_index-o.sort_index),t=this._dragOverColumnId===s.id;return h`
      <div
        class="column ${t?"drag-over":""}"
        @dragover=${this._handleDragOver}
        @dragenter=${()=>this._handleDragEnterColumn(s.id)}
        @dragleave=${this._handleDragLeaveColumn}
        @drop=${i=>this._handleDrop(s.id,i)}
      >
        <div class="column-header">
          <div class="column-header-left">
            <span>${s.name}</span>
            <span class="task-count">${e.length}</span>
          </div>
          <button
            class="warning small"
            @click=${()=>this._handleDeleteColumn(s)}
            title="Delete column"
          >
            ×
          </button>
        </div>
        <div class="tasks-list ${t?"drag-over":""}">
          ${e.length===0?h`<div class="empty-state" style="padding: 16px; font-size: 13px;">
                No tasks yet
              </div>`:e.map(i=>this._renderTask(i))}
        </div>
        <div class="add-task-form">
          <input
            type="text"
            class="add-task-input"
            .value=${this._newTaskTitles[s.id]||""}
            placeholder="Add a task..."
            @input=${i=>{const o=i.target;this._newTaskTitles={...this._newTaskTitles,[s.id]:o.value}}}
            @keydown=${i=>{const o=this._newTaskTitles[s.id]||"";i.key==="Enter"&&o.trim()&&this._handleCreateTask(s.id)}}
          />
          ${(this._newTaskTitles[s.id]||"").trim()?h`
                <div class="add-task-actions">
                  <input
                    type="text"
                    class="add-task-input"
                    .value=${this._newTaskDescriptions[s.id]||""}
                    placeholder="Description (optional)"
                    @input=${i=>{const o=i.target;this._newTaskDescriptions={...this._newTaskDescriptions,[s.id]:o.value}}}
                    @keydown=${i=>{i.key==="Enter"&&this._handleCreateTask(s.id)}}
                  />
                  <div class="add-task-buttons">
                    <button class="primary small" @click=${()=>this._handleCreateTask(s.id)}>
                      Add
                    </button>
                    <button
                      class="secondary small"
                      @click=${()=>{delete this._newTaskTitles[s.id],delete this._newTaskDescriptions[s.id],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions}}}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              `:""}
        </div>
      </div>
    `}_renderTask(s){const e=this._editingTaskId===s.id,t=this._movingTaskId===s.id;if(e)return h`
        <div class="task-card" style="padding: 16px;">
          <div style="margin-bottom: 8px;">
            <input
              type="text"
              .value=${this._editTaskTitle}
              placeholder="Task title"
              @input=${o=>{const r=o.target;this._editTaskTitle=r.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="text"
              .value=${this._editTaskDescription}
              placeholder="Description (optional)"
              @input=${o=>{const r=o.target;this._editTaskDescription=r.value}}
              style="width: 100%;"
            />
          </div>
          <div class="task-actions">
            <button class="primary small" @click=${()=>this._saveEditTask()}>Save</button>
            <button class="secondary small" @click=${()=>this._cancelEditTask()}>Cancel</button>
          </div>
        </div>
      `;if(t)return h`
        <div class="task-card" style="padding: 16px;">
          <div class="task-title" style="margin-bottom: 8px;">${s.title}</div>
          <div style="font-size: 12px; margin-bottom: 8px; color: var(--secondary-text-color);">
            Move to column:
          </div>
          <select
            style="width: 100%; margin-bottom: 8px;"
            @change=${o=>{const r=o.target;this._handleMoveTask(s,r.value)}}
          >
            <option value="">-- Select column --</option>
            ${this._columns.map(o=>h`
                <option value=${o.id} ?selected=${o.id===s.column_id}>
                  ${o.name} ${o.id===s.column_id?"(current)":""}
                </option>
              `)}
          </select>
          <button class="secondary small" @click=${()=>this._cancelMoveTask()}>Cancel</button>
        </div>
      `;const i=this._draggingTaskId===s.id;return h`
      <div
        class="task-card ${i?"dragging":""}"
        draggable="true"
        @dragstart=${o=>this._handleDragStart(s,o)}
        @dragend=${this._handleDragEnd}
      >
        <div class="task-title">${s.title}</div>
        ${s.description?h`<div class="task-description">${s.description}</div>`:""}
        <div class="task-actions">
          <button class="secondary small" @click=${()=>this._startEditTask(s)}>Edit</button>
          <button class="secondary small" @click=${()=>this._startMoveTask(s)}>Move</button>
          <button class="warning small" @click=${()=>this._handleDeleteTask(s)}>Delete</button>
        </div>
      </div>
    `}};m([he({attribute:!1})],p.prototype,"hass",2),m([g()],p.prototype,"_boards",2),m([g()],p.prototype,"_tasks",2),m([g()],p.prototype,"_columns",2),m([g()],p.prototype,"_loading",2),m([g()],p.prototype,"_newTaskTitles",2),m([g()],p.prototype,"_newTaskDescriptions",2),m([g()],p.prototype,"_newColumnName",2),m([g()],p.prototype,"_newBoardName",2),m([g()],p.prototype,"_unsubscribeUpdates",2),m([g()],p.prototype,"_selectedBoardId",2),m([g()],p.prototype,"_editingTaskId",2),m([g()],p.prototype,"_editTaskTitle",2),m([g()],p.prototype,"_editTaskDescription",2),m([g()],p.prototype,"_movingTaskId",2),m([g()],p.prototype,"_draggingTaskId",2),m([g()],p.prototype,"_dragOverColumnId",2),p=m([Ie("dobeedo-panel")],p)})();
