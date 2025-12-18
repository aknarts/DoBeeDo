(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var bt;const F=globalThis,W=F.ShadowRoot&&(F.ShadyCSS===void 0||F.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),et=new WeakMap;let ot=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(W&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=et.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&et.set(e,t))}return t}toString(){return this.cssText}};const ft=o=>new ot(typeof o=="string"?o:o+"",void 0,V),yt=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((i,s,r)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new ot(e,o,V)},vt=(o,t)=>{if(W)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=F.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},it=W?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return ft(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:kt,defineProperty:xt,getOwnPropertyDescriptor:$t,getOwnPropertyNames:wt,getOwnPropertySymbols:Tt,getPrototypeOf:Dt}=Object,k=globalThis,st=k.trustedTypes,At=st?st.emptyScript:"",J=k.reactiveElementPolyfillSupport,S=(o,t)=>o,j={toAttribute(o,t){switch(t){case Boolean:o=o?At:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},K=(o,t)=>!kt(o,t),rt={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),k.litPropertyMetadata??(k.litPropertyMetadata=new WeakMap);let C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=rt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&xt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=$t(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){const l=s==null?void 0:s.call(this);r==null||r.call(this,a),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??rt}static _$Ei(){if(this.hasOwnProperty(S("elementProperties")))return;const t=Dt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(S("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(S("properties"))){const e=this.properties,i=[...wt(e),...Tt(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(it(s))}else t!==void 0&&e.push(it(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var r;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const a=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:j).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){var r,a;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),n=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:j;this._$Em=s;const d=n.fromAttribute(e,l.type);this[s]=d??((a=this._$Ej)==null?void 0:a.get(s))??d,this._$Em=null}}requestUpdate(t,e,i){var s;if(t!==void 0){const r=this.constructor,a=this[t];if(i??(i=r.getPropertyOptions(t)),!((i.hasChanged??K)(a,e)||i.useDefault&&i.reflect&&a===((s=this._$Ej)==null?void 0:s.get(t))&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??e??this[t]),r!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,a]of s){const{wrapped:l}=a,n=this[r];l!==!0||this._$AL.has(r)||n===void 0||this.C(r,void 0,a,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[S("elementProperties")]=new Map,C[S("finalized")]=new Map,J==null||J({ReactiveElement:C}),(k.reactiveElementVersions??(k.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=globalThis,q=B.trustedTypes,at=q?q.createPolicy("lit-html",{createHTML:o=>o}):void 0,nt="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,dt="?"+x,Et=`<${dt}>`,w=document,M=()=>w.createComment(""),N=o=>o===null||typeof o!="object"&&typeof o!="function",Z=Array.isArray,Ct=o=>Z(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",X=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lt=/-->/g,ct=/>/g,T=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ht=/'/g,pt=/"/g,ut=/^(?:script|style|textarea|title)$/i,It=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),p=It(1),I=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),_t=new WeakMap,D=w.createTreeWalker(w,129);function gt(o,t){if(!Z(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return at!==void 0?at.createHTML(t):t}const Pt=(o,t)=>{const e=o.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",a=O;for(let l=0;l<e;l++){const n=o[l];let d,h,c=-1,m=0;for(;m<n.length&&(a.lastIndex=m,h=a.exec(n),h!==null);)m=a.lastIndex,a===O?h[1]==="!--"?a=lt:h[1]!==void 0?a=ct:h[2]!==void 0?(ut.test(h[2])&&(s=RegExp("</"+h[2],"g")),a=T):h[3]!==void 0&&(a=T):a===T?h[0]===">"?(a=s??O,c=-1):h[1]===void 0?c=-2:(c=a.lastIndex-h[2].length,d=h[1],a=h[3]===void 0?T:h[3]==='"'?pt:ht):a===pt||a===ht?a=T:a===lt||a===ct?a=O:(a=T,s=void 0);const y=a===T&&o[l+1].startsWith("/>")?" ":"";r+=a===O?n+Et:c>=0?(i.push(d),n.slice(0,c)+nt+n.slice(c)+x+y):n+x+(c===-2?l:y)}return[gt(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class U{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0;const l=t.length-1,n=this.parts,[d,h]=Pt(t,e);if(this.el=U.createElement(d,i),D.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=D.nextNode())!==null&&n.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(nt)){const m=h[a++],y=s.getAttribute(c).split(x),v=/([.?@])?(.*)/.exec(m);n.push({type:1,index:r,name:v[2],strings:y,ctor:v[1]==="."?Bt:v[1]==="?"?Mt:v[1]==="@"?Nt:Y}),s.removeAttribute(c)}else c.startsWith(x)&&(n.push({type:6,index:r}),s.removeAttribute(c));if(ut.test(s.tagName)){const c=s.textContent.split(x),m=c.length-1;if(m>0){s.textContent=q?q.emptyScript:"";for(let y=0;y<m;y++)s.append(c[y],M()),D.nextNode(),n.push({type:2,index:++r});s.append(c[m],M())}}}else if(s.nodeType===8)if(s.data===dt)n.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf(x,c+1))!==-1;)n.push({type:7,index:r}),c+=x.length-1}r++}}static createElement(t,e){const i=w.createElement("template");return i.innerHTML=t,i}}function P(o,t,e=o,i){var a,l;if(t===I)return t;let s=i!==void 0?(a=e._$Co)==null?void 0:a[i]:e._$Cl;const r=N(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=P(o,s._$AS(o,t.values),s,i)),t}class St{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??w).importNode(e,!0);D.currentNode=s;let r=D.nextNode(),a=0,l=0,n=i[0];for(;n!==void 0;){if(a===n.index){let d;n.type===2?d=new H(r,r.nextSibling,this,t):n.type===1?d=new n.ctor(r,n.name,n.strings,this,t):n.type===6&&(d=new Ot(r,this,t)),this._$AV.push(d),n=i[++l]}a!==(n==null?void 0:n.index)&&(r=D.nextNode(),a++)}return D.currentNode=w,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class H{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),N(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==I&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ct(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(w.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=U.createElement(gt(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(e);else{const a=new St(s,this),l=a.u(this.options);a.p(e),this.T(l),this._$AH=a}}_$AC(t){let e=_t.get(t.strings);return e===void 0&&_t.set(t.strings,e=new U(t)),e}k(t){Z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new H(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}_$AI(t,e=this,i,s){const r=this.strings;let a=!1;if(r===void 0)t=P(this,t,e,0),a=!N(t)||t!==this._$AH&&t!==I,a&&(this._$AH=t);else{const l=t;let n,d;for(t=r[0],n=0;n<r.length-1;n++)d=P(this,l[i+n],e,n),d===I&&(d=this._$AH[n]),a||(a=!N(d)||d!==this._$AH[n]),d===b?t=b:t!==b&&(t+=(d??"")+r[n+1]),this._$AH[n]=d}a&&!s&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Bt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}}class Mt extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}}class Nt extends Y{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??b)===I)return;const i=this._$AH,s=t===b&&i!==b||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==b&&(i===b||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const G=B.litHtmlPolyfillSupport;G==null||G(U,H),(B.litHtmlVersions??(B.litHtmlVersions=[])).push("3.3.1");const Ut=(o,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const r=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new H(t.insertBefore(M(),r),r,void 0,e??{})}return s._$AI(o),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=globalThis;class L extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return I}}L._$litElement$=!0,L.finalized=!0,(bt=A.litElementHydrateSupport)==null||bt.call(A,{LitElement:L});const Q=A.litElementPolyfillSupport;Q==null||Q({LitElement:L}),(A.litElementVersions??(A.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ht=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lt={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:K},Rt=(o=Lt,t,e)=>{const{kind:i,metadata:s}=e;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(e.name,o),i==="accessor"){const{name:a}=e;return{set(l){const n=t.get.call(this);t.set.call(this,l),this.requestUpdate(a,n,o)},init(l){return l!==void 0&&this.C(a,void 0,o,l),l}}}if(i==="setter"){const{name:a}=e;return function(l){const n=this[a];t.call(this,l),this.requestUpdate(a,n,o)}}throw Error("Unsupported decorator location: "+i)};function mt(o){return(t,e)=>typeof e=="object"?Rt(o,t,e):((i,s,r)=>{const a=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),a?Object.getOwnPropertyDescriptor(s,r):void 0})(o,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(o){return mt({...o,state:!0,attribute:!1})}class f{constructor(t){this.connection=t}async getBoards(){return(await this.connection.sendMessagePromise({type:"dobeedo/get_boards"})).boards??[]}async createBoard(t,e){const i={type:"dobeedo/create_board",name:t};return e!==void 0&&(i.description=e),(await this.connection.sendMessagePromise(i)).board}async getColumns(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_columns",board_id:t})).columns??[]}async createColumn(t,e,i){return(await this.connection.sendMessagePromise({type:"dobeedo/create_column",board_id:t,name:e,order_index:i})).column}async getTasks(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_tasks",board_id:t})).tasks??[]}async createTask(t,e,i,s,r,a,l){const n={type:"dobeedo/create_task",board_id:t,column_id:e,title:i};return s!==void 0&&(n.description=s),r!==void 0&&(n.due_date=r),a!==void 0&&(n.priority=a),l!==void 0&&(n.tags=l),(await this.connection.sendMessagePromise(n)).task}async updateTask(t,e){const i={type:"dobeedo/update_task",task_id:t};return e.title!==void 0&&(i.title=e.title),e.description!==void 0&&(i.description=e.description),e.due_date!==void 0&&(i.due_date=e.due_date),e.priority!==void 0&&(i.priority=e.priority),e.tags!==void 0&&(i.tags=e.tags),(await this.connection.sendMessagePromise(i)).task}async moveTask(t,e,i){const s={type:"dobeedo/move_task",task_id:t,target_column_id:e};return i!==void 0&&(s.target_sort_index=i),(await this.connection.sendMessagePromise(s)).task}async deleteTask(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_task",task_id:t})}async deleteColumn(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_column",column_id:t})}async deleteBoard(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_board",board_id:t})}subscribeUpdates(t){const e=this.connection;if(e.subscribeEvents){console.debug("DoBeeDo: using connection.subscribeEvents for updates");const r=e.subscribeEvents(a=>{if(console.debug("DoBeeDo: raw WS message via subscribeEvents",a),typeof(a==null?void 0:a.event_type)=="string"&&a.data){const l=a.event_type;if(l.startsWith("dobeedo_")){const n=l.replace(/^dobeedo_/,"");t({event_type:n,payload:a.data,raw_type:l})}return}(a==null?void 0:a.type)==="dobeedo/event"&&a.event_type&&a.payload&&t({event_type:a.event_type,payload:a.payload,raw_type:a.raw_type})});return()=>{console.debug("DoBeeDo: unsubscribe from subscribeEvents"),r()}}if(!e.subscribeMessage)return console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available"),()=>{};const i=r=>{console.debug("DoBeeDo: raw WS message in subscribeUpdates handler",r),(r==null?void 0:r.type)==="dobeedo/event"&&r.event_type&&r.payload&&t({event_type:r.event_type,payload:r.payload,raw_type:r.raw_type})};console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");const s=e.subscribeMessage(i,{type:"dobeedo/subscribe_updates"});return()=>{console.debug("DoBeeDo: unsubscribe from subscribe_updates"),s()}}async listTodoEntities(){return(await this.connection.sendMessagePromise({type:"dobeedo/list_todo_entities"})).entities??[]}async importFromTodo(t,e,i,s){const r={type:"dobeedo/import_from_todo",entity_id:t,board_id:e,column_id:i};return s!==void 0&&(r.status_filter=s),await this.connection.sendMessagePromise(r)}async importAllTodos(t,e){const i={type:"dobeedo/import_all_todos",board_id:t};return e!==void 0&&(i.status_filter=e),await this.connection.sendMessagePromise(i)}}var zt=Object.defineProperty,Ft=Object.getOwnPropertyDescriptor,_=(o,t,e,i)=>{for(var s=i>1?void 0:i?Ft(t,e):t,r=o.length-1,a;r>=0;r--)(a=o[r])&&(s=(i?a(t,e,s):a(s))||s);return i&&s&&zt(t,e,s),s};let u=class extends L{constructor(){super(...arguments),this._boards=[],this._tasks=[],this._columns=[],this._loading=!1,this._newTaskTitles={},this._newTaskDescriptions={},this._newTaskDueDates={},this._newTaskPriorities={},this._newTaskTags={},this._newColumnName="",this._newBoardName="",this._isAddingBoard=!1,this._unsubscribeUpdates=null,this._selectedBoardId=null,this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate="",this._editTaskPriority="",this._editTaskTags="",this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null,this._touchDragging=!1,this._touchStartY=0,this._touchCurrentY=0,this._importingColumnId=null,this._todoEntities=[],this._selectedTodoEntity=null,this._importStatusFilter="",this._boundTouchMove=null,this._boundTouchEnd=null}static get styles(){return yt`
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
    `}updated(o){if(o.has("hass")&&this.hass&&(this._fetchBoards(),!this._unsubscribeUpdates)){const t=new f(this.hass.connection);console.debug("DoBeeDo: registering subscribeUpdates"),this._unsubscribeUpdates=t.subscribeUpdates(e=>{var i,s;if(console.debug("DoBeeDo event received in panel",e),e.event_type.startsWith("task_")){const r=(i=e.payload.task)==null?void 0:i.board_id;console.debug("DoBeeDo task event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshTasksForSelectedBoard()}else if(e.event_type.startsWith("column_")){const r=(s=e.payload.column)==null?void 0:s.board_id;console.debug("DoBeeDo column event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshColumnsAndTasks()}else e.event_type.startsWith("board_")&&(console.debug("DoBeeDo board event"),this._fetchBoards())})}}async _fetchBoards(){if(this.hass){this._loading=!0;try{const o=new f(this.hass.connection);this._boards=await o.getBoards(),!this._selectedBoardId&&this._boards.length>0&&(this._selectedBoardId=this._boards[0].id),await this._refreshColumnsAndTasks()}catch(o){console.error("Failed to load DoBeeDo data",o)}finally{this._loading=!1}}}async _refreshColumnsAndTasks(){if(!this.hass||!this._selectedBoardId){this._columns=[],this._tasks=[];return}const o=new f(this.hass.connection);this._columns=await o.getColumns(this._selectedBoardId),this._tasks=await o.getTasks(this._selectedBoardId)}async _refreshTasksForSelectedBoard(){if(!this.hass||!this._selectedBoardId){this._tasks=[];return}const o=new f(this.hass.connection);this._tasks=await o.getTasks(this._selectedBoardId)}_handleSelectBoard(o){this._selectedBoardId!==o.id&&(this._selectedBoardId=o.id,this._refreshColumnsAndTasks())}async _handleCreateTask(o){const t=this._newTaskTitles[o]||"",e=this._newTaskDescriptions[o]||"",i=this._newTaskDueDates[o]||"",s=this._newTaskPriorities[o]||"",r=this._newTaskTags[o]||"";if(!this.hass||!this._selectedBoardId||!t.trim())return;const a=new f(this.hass.connection),l=this._boards.find(d=>d.id===this._selectedBoardId);if(!l)return;const n=r.split(",").map(d=>d.trim()).filter(d=>d.length>0);try{await a.createTask(l.id,o,t.trim(),e.trim()||void 0,i.trim()||void 0,s.trim()||void 0,n.length>0?n:void 0),delete this._newTaskTitles[o],delete this._newTaskDescriptions[o],delete this._newTaskDueDates[o],delete this._newTaskPriorities[o],delete this._newTaskTags[o],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions},this._newTaskDueDates={...this._newTaskDueDates},this._newTaskPriorities={...this._newTaskPriorities},this._newTaskTags={...this._newTaskTags}}catch(d){console.error("Failed to create DoBeeDo task",d)}}async _handleCreateColumn(){if(!this.hass||!this._selectedBoardId||!this._newColumnName.trim())return;const o=new f(this.hass.connection);try{await o.createColumn(this._selectedBoardId,this._newColumnName.trim()),this._newColumnName=""}catch(t){console.error("Failed to create DoBeeDo column",t)}}async _handleCreateBoard(){if(!this.hass||!this._newBoardName.trim())return;const o=new f(this.hass.connection);try{const t=await o.createBoard(this._newBoardName.trim());this._newBoardName="",this._isAddingBoard=!1,await this._fetchBoards(),this._selectedBoardId=t.id,await this._refreshColumnsAndTasks()}catch(t){console.error("Failed to create DoBeeDo board",t)}}async _handleDeleteBoard(o){if(!this.hass||!window.confirm(`Delete board "${o.name}" and all its columns and tasks?`))return;const t=new f(this.hass.connection);try{await t.deleteBoard(o.id),await this._fetchBoards(),this._selectedBoardId===o.id&&(this._selectedBoardId=this._boards.length>0?this._boards[0].id:null,await this._refreshColumnsAndTasks())}catch(e){console.error("Failed to delete DoBeeDo board",e)}}_startEditTask(o){this._editingTaskId=o.id,this._editTaskTitle=o.title,this._editTaskDescription=o.description??"",this._editTaskDueDate=o.due_date??"",this._editTaskPriority=o.priority??"",this._editTaskTags=o.tags?o.tags.join(", "):""}_cancelEditTask(){this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate="",this._editTaskPriority="",this._editTaskTags=""}async _saveEditTask(){if(!this.hass||!this._editingTaskId)return;const o=this._tasks.find(c=>c.id===this._editingTaskId);if(!o)return;const t=this._editTaskTitle.trim();if(!t)return;const e={};t!==o.title&&(e.title=t);const i=this._editTaskDescription.trim();i!==(o.description??"")&&(e.description=i===""?null:i);const s=this._editTaskDueDate.trim();s!==(o.due_date??"")&&(e.due_date=s===""?null:s);const r=this._editTaskPriority.trim();r!==(o.priority??"")&&(e.priority=r===""?null:r);const l=this._editTaskTags.trim().split(",").map(c=>c.trim()).filter(c=>c.length>0),n=o.tags||[];if((l.length!==n.length||l.some((c,m)=>c!==n[m]))&&(e.tags=l.length>0?l:null),!e.title&&e.description===void 0&&e.due_date===void 0&&e.priority===void 0&&e.tags===void 0){this._cancelEditTask();return}const h=new f(this.hass.connection);try{await h.updateTask(this._editingTaskId,e),this._cancelEditTask()}catch(c){console.error("Failed to update DoBeeDo task",c)}}_handleDragStart(o,t){this._draggingTaskId=o.id,t.dataTransfer&&(t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",o.id))}_handleDragEnd(){this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null}_handleTouchStart(o,t){t.preventDefault();const e=t.touches[0];this._touchStartY=e.clientY,this._touchCurrentY=e.clientY,this._touchDragging=!0,this._draggingTaskId=o.id,this._boundTouchMove=this._handleTouchMove.bind(this),this._boundTouchEnd=this._handleTouchEnd.bind(this),document.addEventListener("touchmove",this._boundTouchMove,{passive:!1}),document.addEventListener("touchend",this._boundTouchEnd,{passive:!1})}_handleTouchMove(o){if(!this._touchDragging||!this._draggingTaskId)return;o.preventDefault();const t=o.touches[0];this._touchCurrentY=t.clientY;const e=document.elementsFromPoint(t.clientX,t.clientY);for(const i of e)if(i.classList.contains("tasks-list")){const s=i.closest(".column");if(s){const r=this._getColumnIdFromElement(s);if(r){this._dragOverColumnId=r,this._calculateTouchDropPosition(r,t.clientY);break}}}}_handleTouchEnd(o){if(!(!this._touchDragging||!this._draggingTaskId)){if(o.preventDefault(),this._dropIndicatorPosition){const t=new DragEvent("drop");this._handleDrop(this._dropIndicatorPosition.columnId,t)}this._boundTouchMove&&(document.removeEventListener("touchmove",this._boundTouchMove),this._boundTouchMove=null),this._boundTouchEnd&&(document.removeEventListener("touchend",this._boundTouchEnd),this._boundTouchEnd=null),this._touchDragging=!1,this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null,this._touchStartY=0,this._touchCurrentY=0}}_getColumnIdFromElement(o){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelectorAll(".column");if(!t)return null;for(let i=0;i<t.length;i++)if(t[i]===o&&i<this._columns.length)return this._columns[i].id;return null}_calculateTouchDropPosition(o,t){var l,n,d;const e=Array.from(((l=this.shadowRoot)==null?void 0:l.querySelectorAll(".column"))||[]).find(h=>this._getColumnIdFromElement(h)===o);if(!e)return;const i=e.querySelector(".tasks-list");if(!i)return;const s=Array.from(i.querySelectorAll(".task-card:not(.dragging):not(.drop-preview)"));if(s.length===0){this._dropIndicatorPosition={columnId:o,index:0};return}let r=s.length;const a=.3;for(let h=0;h<s.length;h++){const c=s[h].getBoundingClientRect(),m=c.top,y=c.bottom,v=y-m,R=m+v*(.5-a),E=m+v*(.5+a),$=(n=this._dropIndicatorPosition)==null?void 0:n.index,z=(d=this._dropIndicatorPosition)==null?void 0:d.columnId,tt=z===o&&$===h,jt=z===o&&$===h+1;if(t>=R&&t<E){if(tt){r=h;break}else if(jt){r=h+1;break}$!==void 0&&z===o&&(r=$);break}if(t>=m&&t<R){r=h;break}if(t>=E&&t<y){r=h+1;break}}this._dropIndicatorPosition={columnId:o,index:r}}_handleDragOver(o){o.preventDefault(),o.dataTransfer&&(o.dataTransfer.dropEffect="move")}_handleDragOverTasksList(o,t){var l,n;if(t.preventDefault(),t.stopPropagation(),!this._draggingTaskId)return;const e=t.currentTarget,i=Array.from(e.querySelectorAll(".task-card:not(.dragging):not(.drop-preview)")),s=t.clientY;if(i.length===0){this._dropIndicatorPosition={columnId:o,index:0};return}let r=i.length;const a=.3;for(let d=0;d<i.length;d++){const h=i[d].getBoundingClientRect(),c=h.top,m=h.bottom,y=m-c,v=c+y*(.5-a),R=c+y*(.5+a),E=(l=this._dropIndicatorPosition)==null?void 0:l.index,$=(n=this._dropIndicatorPosition)==null?void 0:n.columnId,z=$===o&&E===d,tt=$===o&&E===d+1;if(s>=v&&s<R){if(z){r=d;break}else if(tt){r=d+1;break}E!==void 0&&$===o&&(r=E);break}if(s>=c&&s<v){r=d;break}if(s>=R&&s<m){r=d+1;break}}(!this._dropIndicatorPosition||this._dropIndicatorPosition.columnId!==o||this._dropIndicatorPosition.index!==r)&&(this._dropIndicatorPosition={columnId:o,index:r})}_handleDragEnterColumn(o,t){t.stopPropagation(),this._dragOverColumnId=o}_handleDragLeaveColumn(o){const t=o.currentTarget,e=o.relatedTarget;(!e||!t.contains(e))&&(this._dragOverColumnId=null,this._dropIndicatorPosition=null)}_isTaskOverdue(o){if(!o.due_date)return!1;const t=new Date;return t.setHours(0,0,0,0),new Date(o.due_date)<t}_formatDueDate(o){const t=new Date(o),e=new Date;e.setHours(0,0,0,0);const i=new Date(e);i.setDate(i.getDate()+1);const s=new Date(o);if(s.setHours(0,0,0,0),s.getTime()===e.getTime())return"Today";if(s.getTime()===i.getTime())return"Tomorrow";{const r={month:"short",day:"numeric"};return t.toLocaleDateString(void 0,r)}}async _handleDrop(o,t){if(t.preventDefault(),t.stopPropagation(),this._dragOverColumnId=null,!this._draggingTaskId||!this.hass)return;const e=this._tasks.find(n=>n.id===this._draggingTaskId);if(!e){this._draggingTaskId=null;return}let s=this._tasks.filter(n=>n.column_id===o&&n.id!==this._draggingTaskId).sort((n,d)=>n.sort_index-d.sort_index).length;const r=t.currentTarget,a=r.classList.contains("tasks-list")?r:r.querySelector(".tasks-list");if(a){const n=Array.from(a.querySelectorAll(".task-card:not(.dragging)")),d=t.clientY;for(let h=0;h<n.length;h++){const c=n[h].getBoundingClientRect(),m=c.top+c.height/2;if(d<m){s=h;break}}}const l=new f(this.hass.connection);try{await l.moveTask(e.id,o,s),this._draggingTaskId=null,this._dropIndicatorPosition=null}catch(n){console.error("Failed to move task via drag-and-drop",n),this._draggingTaskId=null,this._dropIndicatorPosition=null}}async _handleDeleteTask(o){if(!this.hass||!window.confirm(`Delete task "${o.title}"?`))return;const t=new f(this.hass.connection);try{await t.deleteTask(o.id)}catch(e){console.error("Failed to delete DoBeeDo task",e)}}async _handleDeleteColumn(o){if(!this.hass)return;const e=this._tasks.filter(r=>r.column_id===o.id).length,i=e>0?`Delete column "${o.name}" and ${e} task${e===1?"":"s"}?`:`Delete column "${o.name}"?`;if(!window.confirm(i))return;const s=new f(this.hass.connection);try{await s.deleteColumn(o.id)}catch(r){console.error("Failed to delete DoBeeDo column",r)}}async _startImport(o){if(!this.hass)return;const t=new f(this.hass.connection);try{this._todoEntities=await t.listTodoEntities(),this._importingColumnId=o,this._selectedTodoEntity=null,this._importStatusFilter=""}catch(e){console.error("Failed to load todo entities",e)}}_cancelImport(){this._importingColumnId=null,this._todoEntities=[],this._selectedTodoEntity=null,this._importStatusFilter=""}async _handleImport(){if(!this.hass||!this._selectedTodoEntity||!this._importingColumnId||!this._selectedBoardId)return;const o=new f(this.hass.connection);try{const t=await o.importFromTodo(this._selectedTodoEntity,this._selectedBoardId,this._importingColumnId,this._importStatusFilter||void 0);alert(`Successfully imported ${t.imported_count} task${t.imported_count===1?"":"s"}!`),this._cancelImport()}catch(t){console.error("Failed to import from todo",t),alert("Failed to import tasks. See console for details.")}}async _handleImportAll(){if(!this.hass||!this._selectedBoardId||!window.confirm("Import all Home Assistant todo lists as columns? This will create one column per todo list and import all their items."))return;const o=new f(this.hass.connection);try{const t=await o.importAllTodos(this._selectedBoardId);alert(`Successfully imported ${t.columns_created} todo list${t.columns_created===1?"":"s"} with ${t.total_imported} task${t.total_imported===1?"":"s"}!`)}catch(t){console.error("Failed to import all todos",t),alert("Failed to import todo lists. See console for details.")}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeUpdates&&(this._unsubscribeUpdates(),this._unsubscribeUpdates=null),this._boundTouchMove&&(document.removeEventListener("touchmove",this._boundTouchMove),this._boundTouchMove=null),this._boundTouchEnd&&(document.removeEventListener("touchend",this._boundTouchEnd),this._boundTouchEnd=null)}render(){return p`
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
        ${this._boards.map(o=>p`
            <div
              class="board-tab ${o.id===this._selectedBoardId?"selected":""}"
              @click=${()=>this._handleSelectBoard(o)}
            >
              <span>${o.name}</span>
              <button
                class="board-tab-delete"
                @click=${t=>{t.stopPropagation(),this._handleDeleteBoard(o)}}
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
                  @input=${o=>{const t=o.target;this._newBoardName=t.value}}
                  @keydown=${o=>{o.key==="Enter"&&this._newBoardName.trim()?this._handleCreateBoard():o.key==="Escape"&&(this._isAddingBoard=!1,this._newBoardName="")}}
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
                @click=${()=>{this._isAddingBoard=!0,setTimeout(()=>{var t;const o=(t=this.shadowRoot)==null?void 0:t.querySelector(".add-board-input");o==null||o.focus()},50)}}
                title="Add new board"
              >
                + Add Board
              </div>
            `}
      </div>
    `}_renderBoard(){const o=this._columns.length===0;return p`
      ${o?p`
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
    `}_renderAddColumnMock(){const o=this._draggingTaskId!==null;return p`
      <div class="column add-column-mock ${o?"drag-active":""}">
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
    `}_renderColumn(o){var s,r,a,l;const t=this._tasks.filter(n=>n.column_id===o.id).sort((n,d)=>n.sort_index-d.sort_index),e=this._dragOverColumnId===o.id,i=this._draggingTaskId!==null;return p`
      <div
        class="column ${i?"drag-active":""} ${e?"drag-over":""}"
        @dragover=${this._handleDragOver}
        @dragenter=${n=>this._handleDragEnterColumn(o.id,n)}
        @dragleave=${n=>this._handleDragLeaveColumn(n)}
        @drop=${n=>this._handleDrop(o.id,n)}
      >
        <div class="column-header">
          <div class="column-header-left">
            <span>${o.name}</span>
            <span class="task-count">${t.length}</span>
          </div>
          <div style="display: flex; gap: 4px;">
            <button
              class="secondary small"
              @click=${()=>this._startImport(o.id)}
              title="Import from To-do list"
            >
              ↓
            </button>
            <button
              class="warning small"
              @click=${()=>this._handleDeleteColumn(o)}
              title="Delete column"
            >
              ×
            </button>
          </div>
        </div>
        <div
          class="tasks-list ${e?"drag-over":""}"
          @dragover=${n=>this._handleDragOverTasksList(o.id,n)}
          @drop=${n=>this._handleDrop(o.id,n)}
        >
          ${t.length===0?p`
                ${((s=this._dropIndicatorPosition)==null?void 0:s.columnId)===o.id&&((r=this._dropIndicatorPosition)==null?void 0:r.index)===0?this._renderDropPreview():""}
                <div class="empty-state" style="padding: 16px; font-size: 13px;">
                  No tasks yet
                </div>
              `:p`
                ${t.map((n,d)=>{var h,c;return p`
                    ${((h=this._dropIndicatorPosition)==null?void 0:h.columnId)===o.id&&((c=this._dropIndicatorPosition)==null?void 0:c.index)===d?this._renderDropPreview():""}
                    ${this._renderTask(n)}
                  `})}
                ${((a=this._dropIndicatorPosition)==null?void 0:a.columnId)===o.id&&((l=this._dropIndicatorPosition)==null?void 0:l.index)===t.length?this._renderDropPreview():""}
              `}
        </div>
        <div class="add-task-form">
          <input
            type="text"
            class="add-task-input"
            .value=${this._newTaskTitles[o.id]||""}
            placeholder="Add a task..."
            @input=${n=>{const d=n.target;this._newTaskTitles={...this._newTaskTitles,[o.id]:d.value}}}
            @keydown=${n=>{const d=this._newTaskTitles[o.id]||"";n.key==="Enter"&&d.trim()&&this._handleCreateTask(o.id)}}
          />
          ${(this._newTaskTitles[o.id]||"").trim()?p`
                <div class="add-task-actions">
                  <input
                    type="text"
                    class="add-task-input"
                    .value=${this._newTaskDescriptions[o.id]||""}
                    placeholder="Description (optional)"
                    @input=${n=>{const d=n.target;this._newTaskDescriptions={...this._newTaskDescriptions,[o.id]:d.value}}}
                    @keydown=${n=>{n.key==="Enter"&&this._handleCreateTask(o.id)}}
                  />
                  <input
                    type="date"
                    class="add-task-input"
                    .value=${this._newTaskDueDates[o.id]||""}
                    placeholder="Due date (optional)"
                    @input=${n=>{const d=n.target;this._newTaskDueDates={...this._newTaskDueDates,[o.id]:d.value}}}
                    @keydown=${n=>{n.key==="Enter"&&this._handleCreateTask(o.id)}}
                  />
                  <select
                    class="add-task-input"
                    .value=${this._newTaskPriorities[o.id]||""}
                    @change=${n=>{const d=n.target;this._newTaskPriorities={...this._newTaskPriorities,[o.id]:d.value}}}
                  >
                    <option value="">No priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <input
                    type="text"
                    class="add-task-input"
                    .value=${this._newTaskTags[o.id]||""}
                    placeholder="Tags (comma-separated, optional)"
                    @input=${n=>{const d=n.target;this._newTaskTags={...this._newTaskTags,[o.id]:d.value}}}
                    @keydown=${n=>{n.key==="Enter"&&this._handleCreateTask(o.id)}}
                  />
                  <div class="add-task-buttons">
                    <button class="primary small" @click=${()=>this._handleCreateTask(o.id)}>
                      Add
                    </button>
                    <button
                      class="secondary small"
                      @click=${()=>{delete this._newTaskTitles[o.id],delete this._newTaskDescriptions[o.id],delete this._newTaskDueDates[o.id],delete this._newTaskPriorities[o.id],delete this._newTaskTags[o.id],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions},this._newTaskDueDates={...this._newTaskDueDates},this._newTaskPriorities={...this._newTaskPriorities},this._newTaskTags={...this._newTaskTags}}}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              `:""}
        </div>
      </div>
    `}_renderTask(o){if(this._editingTaskId===o.id)return p`
        <div class="task-card" style="padding: 16px;">
          <div style="margin-bottom: 8px;">
            <input
              type="text"
              .value=${this._editTaskTitle}
              placeholder="Task title"
              @input=${s=>{const r=s.target;this._editTaskTitle=r.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="text"
              .value=${this._editTaskDescription}
              placeholder="Description (optional)"
              @input=${s=>{const r=s.target;this._editTaskDescription=r.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="date"
              .value=${this._editTaskDueDate}
              placeholder="Due date (optional)"
              @input=${s=>{const r=s.target;this._editTaskDueDate=r.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <select
              .value=${this._editTaskPriority}
              @change=${s=>{const r=s.target;this._editTaskPriority=r.value}}
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
              @input=${s=>{const r=s.target;this._editTaskTags=r.value}}
              style="width: 100%;"
            />
          </div>
          <div class="task-actions">
            <button class="primary small" @click=${()=>this._saveEditTask()}>Save</button>
            <button class="secondary small" @click=${()=>this._cancelEditTask()}>Cancel</button>
          </div>
        </div>
      `;const e=this._draggingTaskId===o.id,i=this._isTaskOverdue(o);return p`
      <div
        class="task-card ${e?"dragging":""} ${i?"overdue":""}"
        draggable="true"
        @dragstart=${s=>this._handleDragStart(o,s)}
        @dragend=${this._handleDragEnd}
        @touchstart=${s=>this._handleTouchStart(o,s)}
        @touchmove=${s=>this._handleTouchMove(s)}
        @touchend=${s=>this._handleTouchEnd(s)}
      >
        <div class="task-title">${o.title}</div>
        ${o.description?p`<div class="task-description">${o.description}</div>`:""}
        ${o.priority?p`<div class="task-priority ${o.priority}">${o.priority}</div>`:""}
        ${o.tags&&o.tags.length>0?p`<div class="task-tags">
              ${o.tags.map(s=>p`<span class="task-tag">${s}</span>`)}
            </div>`:""}
        ${o.due_date?p`<div class="task-due-date ${i?"overdue":""}">
              📅 ${this._formatDueDate(o.due_date)}
            </div>`:""}
        <div class="task-actions">
          <button class="secondary small" @click=${()=>this._startEditTask(o)}>Edit</button>
          <button class="warning small" @click=${()=>this._handleDeleteTask(o)}>Delete</button>
        </div>
      </div>
    `}_renderDropPreview(){if(!this._draggingTaskId)return p``;const o=this._tasks.find(t=>t.id===this._draggingTaskId);return o?p`
      <div class="drop-preview">
        <div class="drop-preview-title">${o.title}</div>
        ${o.priority?p`<div class="task-priority ${o.priority}">${o.priority}</div>`:""}
      </div>
    `:p``}_renderImportDialog(){const o=this._columns.find(e=>e.id===this._importingColumnId),t=(o==null?void 0:o.name)||"Unknown";return p`
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
    `}};_([mt({attribute:!1})],u.prototype,"hass",2),_([g()],u.prototype,"_boards",2),_([g()],u.prototype,"_tasks",2),_([g()],u.prototype,"_columns",2),_([g()],u.prototype,"_loading",2),_([g()],u.prototype,"_newTaskTitles",2),_([g()],u.prototype,"_newTaskDescriptions",2),_([g()],u.prototype,"_newTaskDueDates",2),_([g()],u.prototype,"_newTaskPriorities",2),_([g()],u.prototype,"_newTaskTags",2),_([g()],u.prototype,"_newColumnName",2),_([g()],u.prototype,"_newBoardName",2),_([g()],u.prototype,"_isAddingBoard",2),_([g()],u.prototype,"_unsubscribeUpdates",2),_([g()],u.prototype,"_selectedBoardId",2),_([g()],u.prototype,"_editingTaskId",2),_([g()],u.prototype,"_editTaskTitle",2),_([g()],u.prototype,"_editTaskDescription",2),_([g()],u.prototype,"_editTaskDueDate",2),_([g()],u.prototype,"_editTaskPriority",2),_([g()],u.prototype,"_editTaskTags",2),_([g()],u.prototype,"_draggingTaskId",2),_([g()],u.prototype,"_dragOverColumnId",2),_([g()],u.prototype,"_dropIndicatorPosition",2),_([g()],u.prototype,"_touchDragging",2),_([g()],u.prototype,"_touchStartY",2),_([g()],u.prototype,"_touchCurrentY",2),_([g()],u.prototype,"_importingColumnId",2),_([g()],u.prototype,"_todoEntities",2),_([g()],u.prototype,"_selectedTodoEntity",2),_([g()],u.prototype,"_importStatusFilter",2),u=_([Ht("dobeedo-panel")],u)})();
