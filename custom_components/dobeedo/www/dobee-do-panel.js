(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pe;const N=globalThis,L=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol(),Z=new WeakMap;let G=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==F)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(L&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=Z.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Z.set(t,e))}return e}toString(){return this.cssText}};const ue=s=>new G(typeof s=="string"?s:s+"",void 0,F),_e=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((o,i,r)=>o+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[r+1],s[0]);return new G(t,s,F)},ge=(s,e)=>{if(L)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),i=N.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=t.cssText,s.appendChild(o)}},Q=L?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return ue(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:be,defineProperty:me,getOwnPropertyDescriptor:fe,getOwnPropertyNames:ve,getOwnPropertySymbols:ye,getPrototypeOf:$e}=Object,v=globalThis,X=v.trustedTypes,ke=X?X.emptyScript:"",W=v.reactiveElementPolyfillSupport,E=(s,e)=>s,H={toAttribute(s,e){switch(e){case Boolean:s=s?ke:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},q=(s,e)=>!be(s,e),ee={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),v.litPropertyMetadata??(v.litPropertyMetadata=new WeakMap);let D=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);i!==void 0&&me(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:r}=fe(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:i,set(a){const d=i==null?void 0:i.call(this);r==null||r.call(this,a),this.requestUpdate(e,d,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ee}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const e=$e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const t=this.properties,o=[...ve(t),...ye(t)];for(const i of o)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,i]of t)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const i=this._$Eu(t,o);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const i of o)t.unshift(Q(i))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ge(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostConnected)==null?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostDisconnected)==null?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){var r;const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(i!==void 0&&o.reflect===!0){const a=(((r=o.converter)==null?void 0:r.toAttribute)!==void 0?o.converter:H).toAttribute(t,o.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){var r,a;const o=this.constructor,i=o._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const d=o.getPropertyOptions(i),n=typeof d.converter=="function"?{fromAttribute:d.converter}:((r=d.converter)==null?void 0:r.fromAttribute)!==void 0?d.converter:H;this._$Em=i;const c=n.fromAttribute(t,d.type);this[i]=c??((a=this._$Ej)==null?void 0:a.get(i))??c,this._$Em=null}}requestUpdate(e,t,o){var i;if(e!==void 0){const r=this.constructor,a=this[e];if(o??(o=r.getPropertyOptions(e)),!((o.hasChanged??q)(a,t)||o.useDefault&&o.reflect&&a===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(r._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:i,wrapped:r},a){o&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),r!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,a]of i){const{wrapped:d}=a,n=this[r];d!==!0||this._$AL.has(r)||n===void 0||this.C(r,void 0,a,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(o=this._$EO)==null||o.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(o=>{var i;return(i=o.hostUpdated)==null?void 0:i.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[E("elementProperties")]=new Map,D[E("finalized")]=new Map,W==null||W({ReactiveElement:D}),(v.reactiveElementVersions??(v.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=globalThis,z=B.trustedTypes,te=z?z.createPolicy("lit-html",{createHTML:s=>s}):void 0,se="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,ie="?"+y,xe=`<${ie}>`,k=document,S=()=>k.createComment(""),P=s=>s===null||typeof s!="object"&&typeof s!="function",V=Array.isArray,we=s=>V(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Y=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,re=/>/g,x=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ae=/'/g,ne=/"/g,de=/^(?:script|style|textarea|title)$/i,Te=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),p=Te(1),A=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),le=new WeakMap,w=k.createTreeWalker(k,129);function ce(s,e){if(!V(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return te!==void 0?te.createHTML(e):e}const De=(s,e)=>{const t=s.length-1,o=[];let i,r=e===2?"<svg>":e===3?"<math>":"",a=I;for(let d=0;d<t;d++){const n=s[d];let c,_,l=-1,f=0;for(;f<n.length&&(a.lastIndex=f,_=a.exec(n),_!==null);)f=a.lastIndex,a===I?_[1]==="!--"?a=oe:_[1]!==void 0?a=re:_[2]!==void 0?(de.test(_[2])&&(i=RegExp("</"+_[2],"g")),a=x):_[3]!==void 0&&(a=x):a===x?_[0]===">"?(a=i??I,l=-1):_[1]===void 0?l=-2:(l=a.lastIndex-_[2].length,c=_[1],a=_[3]===void 0?x:_[3]==='"'?ne:ae):a===ne||a===ae?a=x:a===oe||a===re?a=I:(a=x,i=void 0);const $=a===x&&s[d+1].startsWith("/>")?" ":"";r+=a===I?n+xe:l>=0?(o.push(c),n.slice(0,l)+se+n.slice(l)+y+$):n+y+(l===-2?d:$)}return[ce(s,r+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class M{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let r=0,a=0;const d=e.length-1,n=this.parts,[c,_]=De(e,t);if(this.el=M.createElement(c,o),w.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=w.nextNode())!==null&&n.length<d;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(se)){const f=_[a++],$=i.getAttribute(l).split(y),j=/([.?@])?(.*)/.exec(f);n.push({type:1,index:r,name:j[2],strings:$,ctor:j[1]==="."?Ce:j[1]==="?"?Ee:j[1]==="@"?Be:R}),i.removeAttribute(l)}else l.startsWith(y)&&(n.push({type:6,index:r}),i.removeAttribute(l));if(de.test(i.tagName)){const l=i.textContent.split(y),f=l.length-1;if(f>0){i.textContent=z?z.emptyScript:"";for(let $=0;$<f;$++)i.append(l[$],S()),w.nextNode(),n.push({type:2,index:++r});i.append(l[f],S())}}}else if(i.nodeType===8)if(i.data===ie)n.push({type:2,index:r});else{let l=-1;for(;(l=i.data.indexOf(y,l+1))!==-1;)n.push({type:7,index:r}),l+=y.length-1}r++}}static createElement(e,t){const o=k.createElement("template");return o.innerHTML=e,o}}function C(s,e,t=s,o){var a,d;if(e===A)return e;let i=o!==void 0?(a=t._$Co)==null?void 0:a[o]:t._$Cl;const r=P(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((d=i==null?void 0:i._$AO)==null||d.call(i,!1),r===void 0?i=void 0:(i=new r(s),i._$AT(s,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=i:t._$Cl=i),i!==void 0&&(e=C(s,i._$AS(s,e.values),i,o)),e}class Ae{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=((e==null?void 0:e.creationScope)??k).importNode(t,!0);w.currentNode=i;let r=w.nextNode(),a=0,d=0,n=o[0];for(;n!==void 0;){if(a===n.index){let c;n.type===2?c=new O(r,r.nextSibling,this,e):n.type===1?c=new n.ctor(r,n.name,n.strings,this,e):n.type===6&&(c=new Se(r,this,e)),this._$AV.push(c),n=o[++d]}a!==(n==null?void 0:n.index)&&(r=w.nextNode(),a++)}return w.currentNode=k,i}p(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class O{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),P(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):we(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==b&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:o}=e,i=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=M.createElement(ce(o.h,o.h[0]),this.options)),o);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(t);else{const a=new Ae(i,this),d=a.u(this.options);a.p(t),this.T(d),this._$AH=a}}_$AC(e){let t=le.get(e.strings);return t===void 0&&le.set(e.strings,t=new M(e)),t}k(e){V(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const r of e)i===t.length?t.push(o=new O(this.O(S()),this.O(S()),this,this.options)):o=t[i],o._$AI(r),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,r){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=b}_$AI(e,t=this,o,i){const r=this.strings;let a=!1;if(r===void 0)e=C(this,e,t,0),a=!P(e)||e!==this._$AH&&e!==A,a&&(this._$AH=e);else{const d=e;let n,c;for(e=r[0],n=0;n<r.length-1;n++)c=C(this,d[o+n],t,n),c===A&&(c=this._$AH[n]),a||(a=!P(c)||c!==this._$AH[n]),c===b?e=b:e!==b&&(e+=(c??"")+r[n+1]),this._$AH[n]=c}a&&!i&&this.j(e)}j(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ce extends R{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===b?void 0:e}}class Ee extends R{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==b)}}class Be extends R{constructor(e,t,o,i,r){super(e,t,o,i,r),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??b)===A)return;const o=this._$AH,i=e===b&&o!==b||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,r=e!==b&&(o===b||i);i&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}}const J=B.litHtmlPolyfillSupport;J==null||J(M,O),(B.litHtmlVersions??(B.litHtmlVersions=[])).push("3.3.1");const Pe=(s,e,t)=>{const o=(t==null?void 0:t.renderBefore)??e;let i=o._$litPart$;if(i===void 0){const r=(t==null?void 0:t.renderBefore)??null;o._$litPart$=i=new O(e.insertBefore(S(),r),r,void 0,t??{})}return i._$AI(s),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis;class U extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return A}}U._$litElement$=!0,U.finalized=!0,(pe=T.litElementHydrateSupport)==null||pe.call(T,{LitElement:U});const K=T.litElementPolyfillSupport;K==null||K({LitElement:U}),(T.litElementVersions??(T.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ie=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Me={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:q},Oe=(s=Me,e,t)=>{const{kind:o,metadata:i}=t;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),o==="setter"&&((s=Object.create(s)).wrapped=!0),r.set(t.name,s),o==="accessor"){const{name:a}=t;return{set(d){const n=e.get.call(this);e.set.call(this,d),this.requestUpdate(a,n,s)},init(d){return d!==void 0&&this.C(a,void 0,s,d),d}}}if(o==="setter"){const{name:a}=t;return function(d){const n=this[a];e.call(this,d),this.requestUpdate(a,n,s)}}throw Error("Unsupported decorator location: "+o)};function he(s){return(e,t)=>typeof t=="object"?Oe(s,e,t):((o,i,r)=>{const a=i.hasOwnProperty(r);return i.constructor.createProperty(r,o),a?Object.getOwnPropertyDescriptor(i,r):void 0})(s,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(s){return he({...s,state:!0,attribute:!1})}class m{constructor(e){this.connection=e}async getBoards(){return(await this.connection.sendMessagePromise({type:"dobeedo/get_boards"})).boards??[]}async createBoard(e,t){const o={type:"dobeedo/create_board",name:e};return t!==void 0&&(o.description=t),(await this.connection.sendMessagePromise(o)).board}async getColumns(e){return(await this.connection.sendMessagePromise({type:"dobeedo/get_columns",board_id:e})).columns??[]}async createColumn(e,t,o){return(await this.connection.sendMessagePromise({type:"dobeedo/create_column",board_id:e,name:t,order_index:o})).column}async getTasks(e){return(await this.connection.sendMessagePromise({type:"dobeedo/get_tasks",board_id:e})).tasks??[]}async createTask(e,t,o,i,r){const a={type:"dobeedo/create_task",board_id:e,column_id:t,title:o};return i!==void 0&&(a.description=i),r!==void 0&&(a.due_date=r),(await this.connection.sendMessagePromise(a)).task}async updateTask(e,t){const o={type:"dobeedo/update_task",task_id:e};return t.title!==void 0&&(o.title=t.title),t.description!==void 0&&(o.description=t.description),t.due_date!==void 0&&(o.due_date=t.due_date),(await this.connection.sendMessagePromise(o)).task}async moveTask(e,t,o){const i={type:"dobeedo/move_task",task_id:e,target_column_id:t};return o!==void 0&&(i.target_sort_index=o),(await this.connection.sendMessagePromise(i)).task}async deleteTask(e){await this.connection.sendMessagePromise({type:"dobeedo/delete_task",task_id:e})}async deleteColumn(e){await this.connection.sendMessagePromise({type:"dobeedo/delete_column",column_id:e})}async deleteBoard(e){await this.connection.sendMessagePromise({type:"dobeedo/delete_board",board_id:e})}subscribeUpdates(e){const t=this.connection;if(t.subscribeEvents){console.debug("DoBeeDo: using connection.subscribeEvents for updates");const r=t.subscribeEvents(a=>{if(console.debug("DoBeeDo: raw WS message via subscribeEvents",a),typeof(a==null?void 0:a.event_type)=="string"&&a.data){const d=a.event_type;if(d.startsWith("dobeedo_")){const n=d.replace(/^dobeedo_/,"");e({event_type:n,payload:a.data,raw_type:d})}return}(a==null?void 0:a.type)==="dobeedo/event"&&a.event_type&&a.payload&&e({event_type:a.event_type,payload:a.payload,raw_type:a.raw_type})});return()=>{console.debug("DoBeeDo: unsubscribe from subscribeEvents"),r()}}if(!t.subscribeMessage)return console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available"),()=>{};const o=r=>{console.debug("DoBeeDo: raw WS message in subscribeUpdates handler",r),(r==null?void 0:r.type)==="dobeedo/event"&&r.event_type&&r.payload&&e({event_type:r.event_type,payload:r.payload,raw_type:r.raw_type})};console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");const i=t.subscribeMessage(o,{type:"dobeedo/subscribe_updates"});return()=>{console.debug("DoBeeDo: unsubscribe from subscribe_updates"),i()}}}var Ue=Object.defineProperty,Ne=Object.getOwnPropertyDescriptor,u=(s,e,t,o)=>{for(var i=o>1?void 0:o?Ne(e,t):e,r=s.length-1,a;r>=0;r--)(a=s[r])&&(i=(o?a(e,t,i):a(i))||i);return o&&i&&Ue(e,t,i),i};let h=class extends U{constructor(){super(...arguments),this._boards=[],this._tasks=[],this._columns=[],this._loading=!1,this._newTaskTitles={},this._newTaskDescriptions={},this._newTaskDueDates={},this._newColumnName="",this._newBoardName="",this._isAddingBoard=!1,this._unsubscribeUpdates=null,this._selectedBoardId=null,this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate="",this._movingTaskId=null,this._draggingTaskId=null,this._dragOverColumnId=null}static get styles(){return _e`
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
        border: 2px solid var(--primary-color);
        border-style: dashed;
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.05);
      }

      .column.drag-over {
        border: 3px solid var(--primary-color);
        border-style: solid;
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.1);
        box-shadow: 0 0 20px rgba(var(--rgb-primary-color, 33, 150, 243), 0.3);
      }

      .tasks-list.drag-over {
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.15);
        border: 2px dashed var(--primary-color);
        border-radius: 8px;
        min-height: 150px;
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
    `}updated(s){if(s.has("hass")&&this.hass&&(this._fetchBoards(),!this._unsubscribeUpdates)){const e=new m(this.hass.connection);console.debug("DoBeeDo: registering subscribeUpdates"),this._unsubscribeUpdates=e.subscribeUpdates(t=>{var o,i;if(console.debug("DoBeeDo event received in panel",t),t.event_type.startsWith("task_")){const r=(o=t.payload.task)==null?void 0:o.board_id;console.debug("DoBeeDo task event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshTasksForSelectedBoard()}else if(t.event_type.startsWith("column_")){const r=(i=t.payload.column)==null?void 0:i.board_id;console.debug("DoBeeDo column event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshColumnsAndTasks()}else t.event_type.startsWith("board_")&&(console.debug("DoBeeDo board event"),this._fetchBoards())})}}async _fetchBoards(){if(this.hass){this._loading=!0;try{const s=new m(this.hass.connection);this._boards=await s.getBoards(),!this._selectedBoardId&&this._boards.length>0&&(this._selectedBoardId=this._boards[0].id),await this._refreshColumnsAndTasks()}catch(s){console.error("Failed to load DoBeeDo data",s)}finally{this._loading=!1}}}async _refreshColumnsAndTasks(){if(!this.hass||!this._selectedBoardId){this._columns=[],this._tasks=[];return}const s=new m(this.hass.connection);this._columns=await s.getColumns(this._selectedBoardId),this._tasks=await s.getTasks(this._selectedBoardId)}async _refreshTasksForSelectedBoard(){if(!this.hass||!this._selectedBoardId){this._tasks=[];return}const s=new m(this.hass.connection);this._tasks=await s.getTasks(this._selectedBoardId)}_handleSelectBoard(s){this._selectedBoardId!==s.id&&(this._selectedBoardId=s.id,this._refreshColumnsAndTasks())}async _handleCreateTask(s){const e=this._newTaskTitles[s]||"",t=this._newTaskDescriptions[s]||"",o=this._newTaskDueDates[s]||"";if(!this.hass||!this._selectedBoardId||!e.trim())return;const i=new m(this.hass.connection),r=this._boards.find(a=>a.id===this._selectedBoardId);if(r)try{await i.createTask(r.id,s,e.trim(),t.trim()||void 0,o.trim()||void 0),delete this._newTaskTitles[s],delete this._newTaskDescriptions[s],delete this._newTaskDueDates[s],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions},this._newTaskDueDates={...this._newTaskDueDates}}catch(a){console.error("Failed to create DoBeeDo task",a)}}async _handleCreateColumn(){if(!this.hass||!this._selectedBoardId||!this._newColumnName.trim())return;const s=new m(this.hass.connection);try{await s.createColumn(this._selectedBoardId,this._newColumnName.trim()),this._newColumnName=""}catch(e){console.error("Failed to create DoBeeDo column",e)}}async _handleCreateBoard(){if(!this.hass||!this._newBoardName.trim())return;const s=new m(this.hass.connection);try{const e=await s.createBoard(this._newBoardName.trim());this._newBoardName="",this._isAddingBoard=!1,await this._fetchBoards(),this._selectedBoardId=e.id,await this._refreshColumnsAndTasks()}catch(e){console.error("Failed to create DoBeeDo board",e)}}async _handleDeleteBoard(s){if(!this.hass||!window.confirm(`Delete board "${s.name}" and all its columns and tasks?`))return;const e=new m(this.hass.connection);try{await e.deleteBoard(s.id),await this._fetchBoards(),this._selectedBoardId===s.id&&(this._selectedBoardId=this._boards.length>0?this._boards[0].id:null,await this._refreshColumnsAndTasks())}catch(t){console.error("Failed to delete DoBeeDo board",t)}}_startEditTask(s){this._editingTaskId=s.id,this._editTaskTitle=s.title,this._editTaskDescription=s.description??"",this._editTaskDueDate=s.due_date??""}_cancelEditTask(){this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate=""}async _saveEditTask(){if(!this.hass||!this._editingTaskId)return;const s=this._tasks.find(a=>a.id===this._editingTaskId);if(!s)return;const e=this._editTaskTitle.trim();if(!e)return;const t={};e!==s.title&&(t.title=e);const o=this._editTaskDescription.trim();o!==(s.description??"")&&(t.description=o===""?null:o);const i=this._editTaskDueDate.trim();if(i!==(s.due_date??"")&&(t.due_date=i===""?null:i),!t.title&&t.description===void 0&&t.due_date===void 0){this._cancelEditTask();return}const r=new m(this.hass.connection);try{await r.updateTask(this._editingTaskId,t),this._cancelEditTask()}catch(a){console.error("Failed to update DoBeeDo task",a)}}_startMoveTask(s){this._movingTaskId=s.id}_cancelMoveTask(){this._movingTaskId=null}async _handleMoveTask(s,e){if(!this.hass||e===s.column_id){this._cancelMoveTask();return}const t=new m(this.hass.connection);try{await t.moveTask(s.id,e),this._cancelMoveTask()}catch(o){console.error("Failed to move DoBeeDo task",o)}}_handleDragStart(s,e){this._draggingTaskId=s.id,e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",s.id))}_handleDragEnd(){this._draggingTaskId=null,this._dragOverColumnId=null}_handleDragOver(s){s.preventDefault(),s.dataTransfer&&(s.dataTransfer.dropEffect="move")}_handleDragEnterColumn(s){this._dragOverColumnId=s}_handleDragLeaveColumn(){this._dragOverColumnId=null}_isTaskOverdue(s){if(!s.due_date)return!1;const e=new Date;return e.setHours(0,0,0,0),new Date(s.due_date)<e}_formatDueDate(s){const e=new Date(s),t=new Date;t.setHours(0,0,0,0);const o=new Date(t);o.setDate(o.getDate()+1);const i=new Date(s);if(i.setHours(0,0,0,0),i.getTime()===t.getTime())return"Today";if(i.getTime()===o.getTime())return"Tomorrow";{const r={month:"short",day:"numeric"};return e.toLocaleDateString(void 0,r)}}async _handleDrop(s,e){if(e.preventDefault(),e.stopPropagation(),this._dragOverColumnId=null,!this._draggingTaskId||!this.hass)return;const t=this._tasks.find(n=>n.id===this._draggingTaskId);if(!t){this._draggingTaskId=null;return}let i=this._tasks.filter(n=>n.column_id===s&&n.id!==this._draggingTaskId).sort((n,c)=>n.sort_index-c.sort_index).length;const r=e.currentTarget,a=r.classList.contains("tasks-list")?r:r.querySelector(".tasks-list");if(a){const n=Array.from(a.querySelectorAll(".task-card:not(.dragging)")),c=e.clientY;for(let _=0;_<n.length;_++){const l=n[_].getBoundingClientRect(),f=l.top+l.height/2;if(c<f){i=_;break}}}const d=new m(this.hass.connection);try{await d.moveTask(t.id,s,i),this._draggingTaskId=null}catch(n){console.error("Failed to move task via drag-and-drop",n),this._draggingTaskId=null}}async _handleDeleteTask(s){if(!this.hass||!window.confirm(`Delete task "${s.title}"?`))return;const e=new m(this.hass.connection);try{await e.deleteTask(s.id)}catch(t){console.error("Failed to delete DoBeeDo task",t)}}async _handleDeleteColumn(s){if(!this.hass)return;const t=this._tasks.filter(r=>r.column_id===s.id).length,o=t>0?`Delete column "${s.name}" and ${t} task${t===1?"":"s"}?`:`Delete column "${s.name}"?`;if(!window.confirm(o))return;const i=new m(this.hass.connection);try{await i.deleteColumn(s.id)}catch(r){console.error("Failed to delete DoBeeDo column",r)}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeUpdates&&(this._unsubscribeUpdates(),this._unsubscribeUpdates=null)}render(){return p`
      <h1>DoBeeDo</h1>
      ${this._loading?p`<p>Loading boards…</p>`:this._renderContent()}
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
                @click=${e=>{e.stopPropagation(),this._handleDeleteBoard(s)}}
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
                  @input=${s=>{const e=s.target;this._newBoardName=e.value}}
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
                @click=${()=>{this._isAddingBoard=!0,setTimeout(()=>{var e;const s=(e=this.shadowRoot)==null?void 0:e.querySelector(".add-board-input");s==null||s.focus()},50)}}
                title="Add new board"
              >
                + Add Board
              </div>
            `}
      </div>
    `}_renderBoard(){return p`
      <div class="columns-container">
        ${this._columns.map(s=>this._renderColumn(s))} ${this._renderAddColumnMock()}
      </div>
    `}_renderAddColumnMock(){const s=this._draggingTaskId!==null;return p`
      <div class="column add-column-mock ${s?"drag-active":""}">
        <div class="add-column-form">
          <input
            type="text"
            class="add-column-input"
            .value=${this._newColumnName}
            placeholder="Add column..."
            @input=${e=>{const t=e.target;this._newColumnName=t.value}}
            @keydown=${e=>{e.key==="Enter"&&this._newColumnName.trim()&&this._handleCreateColumn()}}
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
    `}_renderColumn(s){const e=this._tasks.filter(i=>i.column_id===s.id).sort((i,r)=>i.sort_index-r.sort_index),t=this._dragOverColumnId===s.id,o=this._draggingTaskId!==null;return p`
      <div
        class="column ${o?"drag-active":""} ${t?"drag-over":""}"
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
        <div
          class="tasks-list ${t?"drag-over":""}"
          @dragover=${this._handleDragOver}
          @drop=${i=>this._handleDrop(s.id,i)}
        >
          ${e.length===0?p`<div class="empty-state" style="padding: 16px; font-size: 13px;">
                No tasks yet
              </div>`:e.map(i=>this._renderTask(i))}
        </div>
        <div class="add-task-form">
          <input
            type="text"
            class="add-task-input"
            .value=${this._newTaskTitles[s.id]||""}
            placeholder="Add a task..."
            @input=${i=>{const r=i.target;this._newTaskTitles={...this._newTaskTitles,[s.id]:r.value}}}
            @keydown=${i=>{const r=this._newTaskTitles[s.id]||"";i.key==="Enter"&&r.trim()&&this._handleCreateTask(s.id)}}
          />
          ${(this._newTaskTitles[s.id]||"").trim()?p`
                <div class="add-task-actions">
                  <input
                    type="text"
                    class="add-task-input"
                    .value=${this._newTaskDescriptions[s.id]||""}
                    placeholder="Description (optional)"
                    @input=${i=>{const r=i.target;this._newTaskDescriptions={...this._newTaskDescriptions,[s.id]:r.value}}}
                    @keydown=${i=>{i.key==="Enter"&&this._handleCreateTask(s.id)}}
                  />
                  <input
                    type="date"
                    class="add-task-input"
                    .value=${this._newTaskDueDates[s.id]||""}
                    placeholder="Due date (optional)"
                    @input=${i=>{const r=i.target;this._newTaskDueDates={...this._newTaskDueDates,[s.id]:r.value}}}
                    @keydown=${i=>{i.key==="Enter"&&this._handleCreateTask(s.id)}}
                  />
                  <div class="add-task-buttons">
                    <button class="primary small" @click=${()=>this._handleCreateTask(s.id)}>
                      Add
                    </button>
                    <button
                      class="secondary small"
                      @click=${()=>{delete this._newTaskTitles[s.id],delete this._newTaskDescriptions[s.id],delete this._newTaskDueDates[s.id],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions},this._newTaskDueDates={...this._newTaskDueDates}}}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              `:""}
        </div>
      </div>
    `}_renderTask(s){const e=this._editingTaskId===s.id,t=this._movingTaskId===s.id;if(e)return p`
        <div class="task-card" style="padding: 16px;">
          <div style="margin-bottom: 8px;">
            <input
              type="text"
              .value=${this._editTaskTitle}
              placeholder="Task title"
              @input=${r=>{const a=r.target;this._editTaskTitle=a.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="text"
              .value=${this._editTaskDescription}
              placeholder="Description (optional)"
              @input=${r=>{const a=r.target;this._editTaskDescription=a.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="date"
              .value=${this._editTaskDueDate}
              placeholder="Due date (optional)"
              @input=${r=>{const a=r.target;this._editTaskDueDate=a.value}}
              style="width: 100%;"
            />
          </div>
          <div class="task-actions">
            <button class="primary small" @click=${()=>this._saveEditTask()}>Save</button>
            <button class="secondary small" @click=${()=>this._cancelEditTask()}>Cancel</button>
          </div>
        </div>
      `;if(t)return p`
        <div class="task-card" style="padding: 16px;">
          <div class="task-title" style="margin-bottom: 8px;">${s.title}</div>
          <div style="font-size: 12px; margin-bottom: 8px; color: var(--secondary-text-color);">
            Move to column:
          </div>
          <select
            style="width: 100%; margin-bottom: 8px;"
            @change=${r=>{const a=r.target;this._handleMoveTask(s,a.value)}}
          >
            <option value="">-- Select column --</option>
            ${this._columns.map(r=>p`
                <option value=${r.id} ?selected=${r.id===s.column_id}>
                  ${r.name} ${r.id===s.column_id?"(current)":""}
                </option>
              `)}
          </select>
          <button class="secondary small" @click=${()=>this._cancelMoveTask()}>Cancel</button>
        </div>
      `;const o=this._draggingTaskId===s.id,i=this._isTaskOverdue(s);return p`
      <div
        class="task-card ${o?"dragging":""} ${i?"overdue":""}"
        draggable="true"
        @dragstart=${r=>this._handleDragStart(s,r)}
        @dragend=${this._handleDragEnd}
      >
        <div class="task-title">${s.title}</div>
        ${s.description?p`<div class="task-description">${s.description}</div>`:""}
        ${s.due_date?p`<div class="task-due-date ${i?"overdue":""}">
              📅 ${this._formatDueDate(s.due_date)}
            </div>`:""}
        <div class="task-actions">
          <button class="secondary small" @click=${()=>this._startEditTask(s)}>Edit</button>
          <button class="secondary small" @click=${()=>this._startMoveTask(s)}>Move</button>
          <button class="warning small" @click=${()=>this._handleDeleteTask(s)}>Delete</button>
        </div>
      </div>
    `}};u([he({attribute:!1})],h.prototype,"hass",2),u([g()],h.prototype,"_boards",2),u([g()],h.prototype,"_tasks",2),u([g()],h.prototype,"_columns",2),u([g()],h.prototype,"_loading",2),u([g()],h.prototype,"_newTaskTitles",2),u([g()],h.prototype,"_newTaskDescriptions",2),u([g()],h.prototype,"_newTaskDueDates",2),u([g()],h.prototype,"_newColumnName",2),u([g()],h.prototype,"_newBoardName",2),u([g()],h.prototype,"_isAddingBoard",2),u([g()],h.prototype,"_unsubscribeUpdates",2),u([g()],h.prototype,"_selectedBoardId",2),u([g()],h.prototype,"_editingTaskId",2),u([g()],h.prototype,"_editTaskTitle",2),u([g()],h.prototype,"_editTaskDescription",2),u([g()],h.prototype,"_editTaskDueDate",2),u([g()],h.prototype,"_movingTaskId",2),u([g()],h.prototype,"_draggingTaskId",2),u([g()],h.prototype,"_dragOverColumnId",2),h=u([Ie("dobeedo-panel")],h)})();
