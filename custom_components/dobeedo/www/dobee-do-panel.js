(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pe;const O=globalThis,L=O.ShadowRoot&&(O.ShadyCSS===void 0||O.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),G=new WeakMap;let Q=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(L&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=G.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&G.set(t,e))}return e}toString(){return this.cssText}};const ue=o=>new Q(typeof o=="string"?o:o+"",void 0,W),_e=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((s,i,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[r+1],o[0]);return new Q(t,o,W)},fe=(o,e)=>{if(L)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=O.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,o.appendChild(s)}},X=L?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return ue(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:$e,defineProperty:me,getOwnPropertyDescriptor:be,getOwnPropertyNames:ye,getOwnPropertySymbols:ve,getPrototypeOf:ge}=Object,y=globalThis,Y=y.trustedTypes,we=Y?Y.emptyScript:"",F=y.reactiveElementPolyfillSupport,x=(o,e)=>o,H={toAttribute(o,e){switch(e){case Boolean:o=o?we:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},q=(o,e)=>!$e(o,e),ee={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);let E=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&me(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:r}=be(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:i,set(n){const d=i==null?void 0:i.call(this);r==null||r.call(this,n),this.requestUpdate(e,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ee}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const e=ge(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,s=[...ye(t),...ve(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(X(i))}else e!==void 0&&t.push(X(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return fe(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var r;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const n=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:H).toAttribute(t,s.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){var r,n;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const d=s.getPropertyOptions(i),a=typeof d.converter=="function"?{fromAttribute:d.converter}:((r=d.converter)==null?void 0:r.fromAttribute)!==void 0?d.converter:H;this._$Em=i;const c=a.fromAttribute(t,d.type);this[i]=c??((n=this._$Ej)==null?void 0:n.get(i))??c,this._$Em=null}}requestUpdate(e,t,s){var i;if(e!==void 0){const r=this.constructor,n=this[e];if(s??(s=r.getPropertyOptions(e)),!((s.hasChanged??q)(n,t)||s.useDefault&&s.reflect&&n===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,n]of i){const{wrapped:d}=n,a=this[r];d!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[x("elementProperties")]=new Map,E[x("finalized")]=new Map,F==null||F({ReactiveElement:E}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis,R=D.trustedTypes,te=R?R.createPolicy("lit-html",{createHTML:o=>o}):void 0,se="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,ie="?"+v,Ae=`<${ie}>`,w=document,B=()=>w.createComment(""),P=o=>o===null||typeof o!="object"&&typeof o!="function",V=Array.isArray,Ce=o=>V(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",J=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,ne=/>/g,A=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),re=/'/g,ae=/"/g,de=/^(?:script|style|textarea|title)$/i,ke=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),u=ke(1),T=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),le=new WeakMap,C=w.createTreeWalker(w,129);function ce(o,e){if(!V(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return te!==void 0?te.createHTML(e):e}const Ee=(o,e)=>{const t=o.length-1,s=[];let i,r=e===2?"<svg>":e===3?"<math>":"",n=I;for(let d=0;d<t;d++){const a=o[d];let c,p,l=-1,b=0;for(;b<a.length&&(n.lastIndex=b,p=n.exec(a),p!==null);)b=n.lastIndex,n===I?p[1]==="!--"?n=oe:p[1]!==void 0?n=ne:p[2]!==void 0?(de.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=A):p[3]!==void 0&&(n=A):n===A?p[0]===">"?(n=i??I,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?A:p[3]==='"'?ae:re):n===ae||n===re?n=A:n===oe||n===ne?n=I:(n=A,i=void 0);const g=n===A&&o[d+1].startsWith("/>")?" ":"";r+=n===I?a+Ae:l>=0?(s.push(c),a.slice(0,l)+se+a.slice(l)+v+g):a+v+(l===-2?d:g)}return[ce(o,r+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class U{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,n=0;const d=e.length-1,a=this.parts,[c,p]=Ee(e,t);if(this.el=U.createElement(c,s),C.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=C.nextNode())!==null&&a.length<d;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(se)){const b=p[n++],g=i.getAttribute(l).split(v),z=/([.?@])?(.*)/.exec(b);a.push({type:1,index:r,name:z[2],strings:g,ctor:z[1]==="."?Se:z[1]==="?"?xe:z[1]==="@"?De:j}),i.removeAttribute(l)}else l.startsWith(v)&&(a.push({type:6,index:r}),i.removeAttribute(l));if(de.test(i.tagName)){const l=i.textContent.split(v),b=l.length-1;if(b>0){i.textContent=R?R.emptyScript:"";for(let g=0;g<b;g++)i.append(l[g],B()),C.nextNode(),a.push({type:2,index:++r});i.append(l[b],B())}}}else if(i.nodeType===8)if(i.data===ie)a.push({type:2,index:r});else{let l=-1;for(;(l=i.data.indexOf(v,l+1))!==-1;)a.push({type:7,index:r}),l+=v.length-1}r++}}static createElement(e,t){const s=w.createElement("template");return s.innerHTML=e,s}}function S(o,e,t=o,s){var n,d;if(e===T)return e;let i=s!==void 0?(n=t._$Co)==null?void 0:n[s]:t._$Cl;const r=P(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((d=i==null?void 0:i._$AO)==null||d.call(i,!1),r===void 0?i=void 0:(i=new r(o),i._$AT(o,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=S(o,i._$AS(o,e.values),i,s)),e}class Te{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??w).importNode(t,!0);C.currentNode=i;let r=C.nextNode(),n=0,d=0,a=s[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new M(r,r.nextSibling,this,e):a.type===1?c=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(c=new Be(r,this,e)),this._$AV.push(c),a=s[++d]}n!==(a==null?void 0:a.index)&&(r=C.nextNode(),n++)}return C.currentNode=w,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class M{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),P(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==T&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ce(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=U.createElement(ce(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(t);else{const n=new Te(i,this),d=n.u(this.options);n.p(t),this.T(d),this._$AH=n}}_$AC(e){let t=le.get(e.strings);return t===void 0&&le.set(e.strings,t=new U(e)),t}k(e){V(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new M(this.O(B()),this.O(B()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class j{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(e,t=this,s,i){const r=this.strings;let n=!1;if(r===void 0)e=S(this,e,t,0),n=!P(e)||e!==this._$AH&&e!==T,n&&(this._$AH=e);else{const d=e;let a,c;for(e=r[0],a=0;a<r.length-1;a++)c=S(this,d[s+a],t,a),c===T&&(c=this._$AH[a]),n||(n=!P(c)||c!==this._$AH[a]),c===h?e=h:e!==h&&(e+=(c??"")+r[a+1]),this._$AH[a]=c}n&&!i&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Se extends j{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class xe extends j{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class De extends j{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??h)===T)return;const s=this._$AH,i=e===h&&s!==h||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==h&&(s===h||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Be{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const K=D.litHtmlPolyfillSupport;K==null||K(U,M),(D.litHtmlVersions??(D.litHtmlVersions=[])).push("3.3.1");const Pe=(o,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const r=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new M(e.insertBefore(B(),r),r,void 0,t??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k=globalThis;class N extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return T}}N._$litElement$=!0,N.finalized=!0,(pe=k.litElementHydrateSupport)==null||pe.call(k,{LitElement:N});const Z=k.litElementPolyfillSupport;Z==null||Z({LitElement:N}),(k.litElementVersions??(k.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ie=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ue={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:q},Me=(o=Ue,e,t)=>{const{kind:s,metadata:i}=t;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(t.name,o),s==="accessor"){const{name:n}=t;return{set(d){const a=e.get.call(this);e.set.call(this,d),this.requestUpdate(n,a,o)},init(d){return d!==void 0&&this.C(n,void 0,o,d),d}}}if(s==="setter"){const{name:n}=t;return function(d){const a=this[n];e.call(this,d),this.requestUpdate(n,a,o)}}throw Error("Unsupported decorator location: "+s)};function he(o){return(e,t)=>typeof t=="object"?Me(o,e,t):((s,i,r)=>{const n=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),n?Object.getOwnPropertyDescriptor(i,r):void 0})(o,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $(o){return he({...o,state:!0,attribute:!1})}class m{constructor(e){this.connection=e}async getBoards(){return(await this.connection.sendMessagePromise({type:"dobeedo/get_boards"})).boards??[]}async getColumns(e){return(await this.connection.sendMessagePromise({type:"dobeedo/get_columns",board_id:e})).columns??[]}async createColumn(e,t,s){return(await this.connection.sendMessagePromise({type:"dobeedo/create_column",board_id:e,name:t,order_index:s})).column}async getTasks(e){return(await this.connection.sendMessagePromise({type:"dobeedo/get_tasks",board_id:e})).tasks??[]}async createTask(e,t,s,i){return(await this.connection.sendMessagePromise({type:"dobeedo/create_task",board_id:e,column_id:t,title:s,description:i})).task}async updateTask(e,t){const s={type:"dobeedo/update_task",task_id:e};return t.title!==void 0&&(s.title=t.title),t.description!==void 0&&(s.description=t.description),(await this.connection.sendMessagePromise(s)).task}async moveTask(e,t,s){const i={type:"dobeedo/move_task",task_id:e,target_column_id:t};return s!==void 0&&(i.target_sort_index=s),(await this.connection.sendMessagePromise(i)).task}subscribeUpdates(e){const t=this.connection;if(t.subscribeEvents){console.debug("DoBeeDo: using connection.subscribeEvents for updates");const r=t.subscribeEvents(n=>{if(console.debug("DoBeeDo: raw WS message via subscribeEvents",n),typeof(n==null?void 0:n.event_type)=="string"&&n.data){const d=n.event_type;if(d.startsWith("dobeedo_")){const a=d.replace(/^dobeedo_/,"");e({event_type:a,payload:n.data,raw_type:d})}return}(n==null?void 0:n.type)==="dobeedo/event"&&n.event_type&&n.payload&&e({event_type:n.event_type,payload:n.payload,raw_type:n.raw_type})});return()=>{console.debug("DoBeeDo: unsubscribe from subscribeEvents"),r()}}if(!t.subscribeMessage)return console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available"),()=>{};const s=r=>{console.debug("DoBeeDo: raw WS message in subscribeUpdates handler",r),(r==null?void 0:r.type)==="dobeedo/event"&&r.event_type&&r.payload&&e({event_type:r.event_type,payload:r.payload,raw_type:r.raw_type})};console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");const i=t.subscribeMessage(s,{type:"dobeedo/subscribe_updates"});return()=>{console.debug("DoBeeDo: unsubscribe from subscribe_updates"),i()}}async populateTestData(){await this.connection.sendMessagePromise({type:"dobeedo/populate_test_data"})}}var Ne=Object.defineProperty,Oe=Object.getOwnPropertyDescriptor,f=(o,e,t,s)=>{for(var i=s>1?void 0:s?Oe(e,t):e,r=o.length-1,n;r>=0;r--)(n=o[r])&&(i=(s?n(e,t,i):n(i))||i);return s&&i&&Ne(e,t,i),i};let _=class extends N{constructor(){super(...arguments),this._boards=[],this._tasks=[],this._columns=[],this._loading=!1,this._newTaskTitle="",this._newTaskDescription="",this._newColumnName="",this._unsubscribeUpdates=null,this._selectedBoardId=null,this._selectedColumnId=null}static get styles(){return _e`
      :host {
        display: block;
        box-sizing: border-box;
        padding: 16px;
      }

      h1 {
        margin-top: 0;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      li {
        padding: 8px 0;
      }

      .board-name {
        font-weight: 600;
      }

      .board-description {
        font-size: 0.9em;
        color: var(--secondary-text-color, #666);
      }

      .tasks-title {
        margin-top: 24px;
        font-weight: 600;
      }

      .task-item {
        padding: 4px 0;
      }
    `}updated(o){if(o.has("hass")&&this.hass&&(this._fetchBoards(),!this._unsubscribeUpdates)){const e=new m(this.hass.connection);console.debug("DoBeeDo: registering subscribeUpdates"),this._unsubscribeUpdates=e.subscribeUpdates(t=>{var s,i;if(console.debug("DoBeeDo event received in panel",t),t.event_type.startsWith("task_")){const r=(s=t.payload.task)==null?void 0:s.board_id;console.debug("DoBeeDo task event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshTasksForSelectedBoard()}else if(t.event_type.startsWith("column_")){const r=(i=t.payload.column)==null?void 0:i.board_id;console.debug("DoBeeDo column event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshColumnsAndTasks()}else t.event_type.startsWith("board_")&&this._fetchBoards()})}}async _fetchBoards(){if(this.hass){this._loading=!0;try{const o=new m(this.hass.connection);this._boards=await o.getBoards(),!this._selectedBoardId&&this._boards.length>0&&(this._selectedBoardId=this._boards[0].id),await this._refreshColumnsAndTasks()}catch(o){console.error("Failed to load DoBeeDo data",o)}finally{this._loading=!1}}}async _refreshColumnsAndTasks(){if(!this.hass||!this._selectedBoardId){this._columns=[],this._tasks=[],this._selectedColumnId=null;return}const o=new m(this.hass.connection);this._columns=await o.getColumns(this._selectedBoardId),this._tasks=await o.getTasks(this._selectedBoardId),this._columns.length===0?this._selectedColumnId=null:(!this._selectedColumnId||!this._columns.some(e=>e.id===this._selectedColumnId))&&(this._selectedColumnId=this._columns[0].id)}async _refreshTasksForSelectedBoard(){if(!this.hass||!this._selectedBoardId){this._tasks=[];return}const o=new m(this.hass.connection);this._tasks=await o.getTasks(this._selectedBoardId)}_handleSelectBoard(o){this._selectedBoardId!==o.id&&(this._selectedBoardId=o.id,this._refreshColumnsAndTasks())}async _handleCreateTask(){if(!this.hass||!this._selectedBoardId||!this._newTaskTitle.trim())return;const o=new m(this.hass.connection),e=this._boards.find(s=>s.id===this._selectedBoardId);if(!e)return;const t=this._selectedColumnId;if(!t){console.warn("No column selected on the selected board to create a task in.");return}try{const s=await o.createTask(e.id,t,this._newTaskTitle.trim(),this._newTaskDescription.trim()||void 0);this._newTaskTitle="",this._newTaskDescription="",e.id===this._selectedBoardId?this._tasks=[...this._tasks,s]:await this._refreshTasksForSelectedBoard()}catch(s){console.error("Failed to create DoBeeDo task",s)}}async _handleCreateColumn(){if(!this.hass||!this._selectedBoardId||!this._newColumnName.trim())return;const o=new m(this.hass.connection);try{const e=await o.createColumn(this._selectedBoardId,this._newColumnName.trim());this._newColumnName="",this._columns=[...this._columns,e]}catch(e){console.error("Failed to create DoBeeDo column",e)}}async _handleEditTask(o){if(!this.hass)return;const e=window.prompt("Edit task title",o.title);if(e===null)return;const t=e.trim();if(!t)return;const s=window.prompt("Edit task description (leave empty to clear; Cancel keeps current description)",o.description??""),i={};if(t!==o.title&&(i.title=t),s!==null){const n=s.trim();n!==(o.description??"")&&(i.description=n===""?null:n)}if(!i.title&&i.description===void 0)return;const r=new m(this.hass.connection);try{const n=await r.updateTask(o.id,i);this._tasks=this._tasks.map(d=>d.id===n.id?n:d)}catch(n){console.error("Failed to update DoBeeDo task",n)}}async _handleMoveTask(o){if(!this.hass||this._columns.length===0)return;const e=window.prompt("Move task to column ID (use one of: "+this._columns.map(s=>s.id).join(", ")+")",o.column_id);if(!e)return;const t=new m(this.hass.connection);try{const s=await t.moveTask(o.id,e||o.column_id);this._tasks=this._tasks.map(i=>i.id===s.id?s:i)}catch(s){console.error("Failed to move DoBeeDo task",s)}}async _handlePopulateTestData(){if(!this.hass||this._boards.length>0&&!window.confirm("Test data can only be added to an empty board. Continue?"))return;const o=new m(this.hass.connection);try{await o.populateTestData(),await this._fetchBoards()}catch(e){console.error("Failed to populate test data",e)}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeUpdates&&(this._unsubscribeUpdates(),this._unsubscribeUpdates=null)}render(){const o=this._boards.find(e=>e.id===this._selectedBoardId)??null;return console.debug("DoBeeDo render",{boards:this._boards,selectedBoardId:this._selectedBoardId,columns:this._columns,selectedColumnId:this._selectedColumnId}),u`
      <h1>DoBeeDo</h1>

      <div style="margin-bottom: 16px;">
        <button
          @click=${()=>this._handlePopulateTestData()}
          style="background-color: var(--primary-color, #03a9f4); color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;"
          ?disabled=${this._loading}
        >
          Populate Test Data
        </button>
        <span style="margin-left: 8px; color: var(--secondary-text-color, #666); font-size: 0.9em;">
          (Development helper - adds sample board with tasks)
        </span>
      </div>

      ${this._loading?u`<p>Loading boards…</p>`:u`
            ${this._boards.length===0?u`<p>No boards available yet. Backend logic is still being implemented.</p>`:u`
                  <ul>
                    ${this._boards.map(e=>u`
                        <li
                          @click=${()=>this._handleSelectBoard(e)}
                          style="cursor: pointer; ${e.id===this._selectedBoardId?"font-weight: 700;":""}"
                        >
                          <div class="board-name">${e.name}</div>
                          ${e.description?u`<div class="board-description">
                                ${e.description}
                              </div>`:""}
                        </li>
                      `)}
                  </ul>

                  <div class="tasks-title">
                    Tasks on ${o?o.name:"(no board selected)"}
                  </div>

                  <div style="margin-bottom: 16px;">
                    <input
                      type="text"
                      .value=${this._newColumnName}
                      placeholder="New column name"
                      @input=${e=>{const t=e.target;this._newColumnName=t.value}}
                    />
                    <button
                      @click=${()=>this._handleCreateColumn()}
                      ?disabled=${!this._newColumnName.trim()||!this._selectedBoardId}
                    >
                      Add column
                    </button>
                  </div>

                  <div style="display: flex; gap: 16px; align-items: flex-start;">
                    ${this._columns.length===0?u`<p>No columns defined for this board yet.</p>`:this._columns.map(e=>{const t=this._tasks.filter(s=>s.column_id===e.id).sort((s,i)=>s.sort_index-i.sort_index);return u`
                            <div>
                              <div class="board-name">${e.name}</div>
                              ${t.length===0?u`<p>No tasks in this column.</p>`:u`<ul>
                                    ${t.map(s=>u`<li class="task-item">
                                        <div>
                                          <div>${s.title}</div>
                                          ${s.description?u`<div class="board-description">
                                                ${s.description}
                                              </div>`:""}
                                        </div>
                                        <button @click=${()=>this._handleEditTask(s)}>
                                          Edit details
                                        </button>
                                        <button @click=${()=>this._handleMoveTask(s)}>
                                          Move
                                        </button>
                                      </li>`)}
                                  </ul>`}
                            </div>
                          `})}
                  </div>

                  <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 8px; border: 1px dashed red; padding: 4px;">
                    <span>New task:</span>
                    <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                      <input
                        type="text"
                        .value=${this._newTaskTitle}
                        placeholder="New task title"
                        @input=${e=>{const t=e.target;this._newTaskTitle=t.value}}
                      />
                      <input
                        type="text"
                        .value=${this._newTaskDescription}
                        placeholder="New task description (optional)"
                        @input=${e=>{const t=e.target;this._newTaskDescription=t.value}}
                      />

                      <select
                        .value=${this._selectedColumnId??""}
                        @change=${e=>{const t=e.target;this._selectedColumnId=t.value||null}}
                      >
                        ${this._columns.map(e=>u`<option value=${e.id}>${e.name}</option>`)}
                      </select>

                      <button
                        @click=${()=>this._handleCreateTask()}
                        ?disabled=${!this._newTaskTitle.trim()||this._loading||!this._selectedBoardId||!this._selectedColumnId}
                      >
                        Add task
                      </button>
                    </div>
                  </div>
                `}
          `}
      <p>
        This is the early DoBeeDo panel. The full board view, columns, and task
        management UI will be added in later phases.
      </p>
    `}};f([he({attribute:!1})],_.prototype,"hass",2),f([$()],_.prototype,"_boards",2),f([$()],_.prototype,"_tasks",2),f([$()],_.prototype,"_columns",2),f([$()],_.prototype,"_loading",2),f([$()],_.prototype,"_newTaskTitle",2),f([$()],_.prototype,"_newTaskDescription",2),f([$()],_.prototype,"_newColumnName",2),f([$()],_.prototype,"_unsubscribeUpdates",2),f([$()],_.prototype,"_selectedBoardId",2),f([$()],_.prototype,"_selectedColumnId",2),_=f([Ie("dobeedo-panel")],_)})();
