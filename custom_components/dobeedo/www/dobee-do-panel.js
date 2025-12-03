(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ue;const O=globalThis,L=O.ShadowRoot&&(O.ShadyCSS===void 0||O.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),G=new WeakMap;let Q=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(L&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=G.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&G.set(t,e))}return e}toString(){return this.cssText}};const pe=o=>new Q(typeof o=="string"?o:o+"",void 0,W),_e=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((s,i,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new Q(t,o,W)},fe=(o,e)=>{if(L)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=O.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,o.appendChild(s)}},X=L?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return pe(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:$e,defineProperty:me,getOwnPropertyDescriptor:be,getOwnPropertyNames:ye,getOwnPropertySymbols:ge,getPrototypeOf:ve}=Object,b=globalThis,Y=b.trustedTypes,Ae=Y?Y.emptyScript:"",F=b.reactiveElementPolyfillSupport,B=(o,e)=>o,H={toAttribute(o,e){switch(e){case Boolean:o=o?Ae:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},q=(o,e)=>!$e(o,e),ee={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&me(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:n}=be(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:i,set(r){const d=i==null?void 0:i.call(this);n==null||n.call(this,r),this.requestUpdate(e,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ee}static _$Ei(){if(this.hasOwnProperty(B("elementProperties")))return;const e=ve(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(B("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(B("properties"))){const t=this.properties,s=[...ye(t),...ge(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(X(i))}else e!==void 0&&t.push(X(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return fe(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var n;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const r=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:H).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){var n,r;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const d=s.getPropertyOptions(i),a=typeof d.converter=="function"?{fromAttribute:d.converter}:((n=d.converter)==null?void 0:n.fromAttribute)!==void 0?d.converter:H;this._$Em=i;const c=a.fromAttribute(t,d.type);this[i]=c??((r=this._$Ej)==null?void 0:r.get(i))??c,this._$Em=null}}requestUpdate(e,t,s){var i;if(e!==void 0){const n=this.constructor,r=this[e];if(s??(s=n.getPropertyOptions(e)),!((s.hasChanged??q)(r,t)||s.useDefault&&s.reflect&&r===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,r??t??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,r]of i){const{wrapped:d}=r,a=this[n];d!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,r,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[B("elementProperties")]=new Map,k[B("finalized")]=new Map,F==null||F({ReactiveElement:k}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,R=P.trustedTypes,te=R?R.createPolicy("lit-html",{createHTML:o=>o}):void 0,se="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,ie="?"+y,we=`<${ie}>`,A=document,x=()=>A.createComment(""),D=o=>o===null||typeof o!="object"&&typeof o!="function",V=Array.isArray,Ce=o=>V(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",J=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,ne=/>/g,w=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),re=/'/g,ae=/"/g,de=/^(?:script|style|textarea|title)$/i,Ee=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),p=Ee(1),S=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),le=new WeakMap,C=A.createTreeWalker(A,129);function ce(o,e){if(!V(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return te!==void 0?te.createHTML(e):e}const ke=(o,e)=>{const t=o.length-1,s=[];let i,n=e===2?"<svg>":e===3?"<math>":"",r=I;for(let d=0;d<t;d++){const a=o[d];let c,u,l=-1,m=0;for(;m<a.length&&(r.lastIndex=m,u=r.exec(a),u!==null);)m=r.lastIndex,r===I?u[1]==="!--"?r=oe:u[1]!==void 0?r=ne:u[2]!==void 0?(de.test(u[2])&&(i=RegExp("</"+u[2],"g")),r=w):u[3]!==void 0&&(r=w):r===w?u[0]===">"?(r=i??I,l=-1):u[1]===void 0?l=-2:(l=r.lastIndex-u[2].length,c=u[1],r=u[3]===void 0?w:u[3]==='"'?ae:re):r===ae||r===re?r=w:r===oe||r===ne?r=I:(r=w,i=void 0);const v=r===w&&o[d+1].startsWith("/>")?" ":"";n+=r===I?a+we:l>=0?(s.push(c),a.slice(0,l)+se+a.slice(l)+y+v):a+y+(l===-2?d:v)}return[ce(o,n+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class U{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let n=0,r=0;const d=e.length-1,a=this.parts,[c,u]=ke(e,t);if(this.el=U.createElement(c,s),C.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=C.nextNode())!==null&&a.length<d;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(se)){const m=u[r++],v=i.getAttribute(l).split(y),z=/([.?@])?(.*)/.exec(m);a.push({type:1,index:n,name:z[2],strings:v,ctor:z[1]==="."?Te:z[1]==="?"?Be:z[1]==="@"?Pe:j}),i.removeAttribute(l)}else l.startsWith(y)&&(a.push({type:6,index:n}),i.removeAttribute(l));if(de.test(i.tagName)){const l=i.textContent.split(y),m=l.length-1;if(m>0){i.textContent=R?R.emptyScript:"";for(let v=0;v<m;v++)i.append(l[v],x()),C.nextNode(),a.push({type:2,index:++n});i.append(l[m],x())}}}else if(i.nodeType===8)if(i.data===ie)a.push({type:2,index:n});else{let l=-1;for(;(l=i.data.indexOf(y,l+1))!==-1;)a.push({type:7,index:n}),l+=y.length-1}n++}}static createElement(e,t){const s=A.createElement("template");return s.innerHTML=e,s}}function T(o,e,t=o,s){var r,d;if(e===S)return e;let i=s!==void 0?(r=t._$Co)==null?void 0:r[s]:t._$Cl;const n=D(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((d=i==null?void 0:i._$AO)==null||d.call(i,!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=T(o,i._$AS(o,e.values),i,s)),e}class Se{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??A).importNode(t,!0);C.currentNode=i;let n=C.nextNode(),r=0,d=0,a=s[0];for(;a!==void 0;){if(r===a.index){let c;a.type===2?c=new M(n,n.nextSibling,this,e):a.type===1?c=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(c=new xe(n,this,e)),this._$AV.push(c),a=s[++d]}r!==(a==null?void 0:a.index)&&(n=C.nextNode(),r++)}return C.currentNode=A,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class M{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=T(this,e,t),D(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ce(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=U.createElement(ce(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(t);else{const r=new Se(i,this),d=r.u(this.options);r.p(t),this.T(d),this._$AH=r}}_$AC(e){let t=le.get(e.strings);return t===void 0&&le.set(e.strings,t=new U(e)),t}k(e){V(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const n of e)i===t.length?t.push(s=new M(this.O(x()),this.O(x()),this,this.options)):s=t[i],s._$AI(n),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class j{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(e,t=this,s,i){const n=this.strings;let r=!1;if(n===void 0)e=T(this,e,t,0),r=!D(e)||e!==this._$AH&&e!==S,r&&(this._$AH=e);else{const d=e;let a,c;for(e=n[0],a=0;a<n.length-1;a++)c=T(this,d[s+a],t,a),c===S&&(c=this._$AH[a]),r||(r=!D(c)||c!==this._$AH[a]),c===h?e=h:e!==h&&(e+=(c??"")+n[a+1]),this._$AH[a]=c}r&&!i&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Te extends j{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class Be extends j{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class Pe extends j{constructor(e,t,s,i,n){super(e,t,s,i,n),this.type=5}_$AI(e,t=this){if((e=T(this,e,t,0)??h)===S)return;const s=this._$AH,i=e===h&&s!==h||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==h&&(s===h||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class xe{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){T(this,e)}}const K=P.litHtmlPolyfillSupport;K==null||K(U,M),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.1");const De=(o,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const n=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new M(e.insertBefore(x(),n),n,void 0,t??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=globalThis;class N extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=De(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return S}}N._$litElement$=!0,N.finalized=!0,(ue=E.litElementHydrateSupport)==null||ue.call(E,{LitElement:N});const Z=E.litElementPolyfillSupport;Z==null||Z({LitElement:N}),(E.litElementVersions??(E.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ie=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ue={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:q},Me=(o=Ue,e,t)=>{const{kind:s,metadata:i}=t;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(t.name,o),s==="accessor"){const{name:r}=t;return{set(d){const a=e.get.call(this);e.set.call(this,d),this.requestUpdate(r,a,o)},init(d){return d!==void 0&&this.C(r,void 0,o,d),d}}}if(s==="setter"){const{name:r}=t;return function(d){const a=this[r];e.call(this,d),this.requestUpdate(r,a,o)}}throw Error("Unsupported decorator location: "+s)};function he(o){return(e,t)=>typeof t=="object"?Me(o,e,t):((s,i,n)=>{const r=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),r?Object.getOwnPropertyDescriptor(i,n):void 0})(o,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $(o){return he({...o,state:!0,attribute:!1})}class g{constructor(e){this.connection=e}async getBoards(){return(await this.connection.sendMessagePromise({type:"dobeedo/get_boards"})).boards??[]}async getColumns(e){return(await this.connection.sendMessagePromise({type:"dobeedo/get_columns",board_id:e})).columns??[]}async createColumn(e,t,s){return(await this.connection.sendMessagePromise({type:"dobeedo/create_column",board_id:e,name:t,order_index:s})).column}async getTasks(e){return(await this.connection.sendMessagePromise({type:"dobeedo/get_tasks",board_id:e})).tasks??[]}async createTask(e,t,s,i){return(await this.connection.sendMessagePromise({type:"dobeedo/create_task",board_id:e,column_id:t,title:s,description:i})).task}async updateTask(e,t){const s={type:"dobeedo/update_task",task_id:e};return t.title!==void 0&&(s.title=t.title),t.description!==void 0&&(s.description=t.description),(await this.connection.sendMessagePromise(s)).task}async moveTask(e,t,s){const i={type:"dobeedo/move_task",task_id:e,target_column_id:t};return s!==void 0&&(i.target_sort_index=s),(await this.connection.sendMessagePromise(i)).task}subscribeUpdates(e){const t=this.connection;if(t.subscribeEvents){console.debug("DoBeeDo: using connection.subscribeEvents for updates");const n=t.subscribeEvents(r=>{if(console.debug("DoBeeDo: raw WS message via subscribeEvents",r),typeof(r==null?void 0:r.event_type)=="string"&&r.data){const d=r.event_type;if(d.startsWith("dobeedo_")){const a=d.replace(/^dobeedo_/,"");e({event_type:a,payload:r.data,raw_type:d})}return}(r==null?void 0:r.type)==="dobeedo/event"&&r.event_type&&r.payload&&e({event_type:r.event_type,payload:r.payload,raw_type:r.raw_type})});return()=>{console.debug("DoBeeDo: unsubscribe from subscribeEvents"),n()}}if(!t.subscribeMessage)return console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available"),()=>{};const s=n=>{console.debug("DoBeeDo: raw WS message in subscribeUpdates handler",n),(n==null?void 0:n.type)==="dobeedo/event"&&n.event_type&&n.payload&&e({event_type:n.event_type,payload:n.payload,raw_type:n.raw_type})};console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");const i=t.subscribeMessage(s,{type:"dobeedo/subscribe_updates"});return()=>{console.debug("DoBeeDo: unsubscribe from subscribe_updates"),i()}}}var Ne=Object.defineProperty,Oe=Object.getOwnPropertyDescriptor,f=(o,e,t,s)=>{for(var i=s>1?void 0:s?Oe(e,t):e,n=o.length-1,r;n>=0;n--)(r=o[n])&&(i=(s?r(e,t,i):r(i))||i);return s&&i&&Ne(e,t,i),i};let _=class extends N{constructor(){super(...arguments),this._boards=[],this._tasks=[],this._columns=[],this._loading=!1,this._newTaskTitle="",this._newColumnName="",this._unsubscribeUpdates=null,this._selectedBoardId=null,this._selectedColumnId=null}static get styles(){return _e`
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
    `}updated(o){if(o.has("hass")&&this.hass&&(this._fetchBoards(),!this._unsubscribeUpdates)){const e=new g(this.hass.connection);console.debug("DoBeeDo: registering subscribeUpdates"),this._unsubscribeUpdates=e.subscribeUpdates(t=>{var s,i;if(console.debug("DoBeeDo event received in panel",t),t.event_type.startsWith("task_")){const n=(s=t.payload.task)==null?void 0:s.board_id;console.debug("DoBeeDo task event for board",n,"selected",this._selectedBoardId),n&&n===this._selectedBoardId&&this._refreshTasksForSelectedBoard()}else if(t.event_type.startsWith("column_")){const n=(i=t.payload.column)==null?void 0:i.board_id;console.debug("DoBeeDo column event for board",n,"selected",this._selectedBoardId),n&&n===this._selectedBoardId&&this._refreshColumnsAndTasks()}else t.event_type.startsWith("board_")&&this._fetchBoards()})}}async _fetchBoards(){if(this.hass){this._loading=!0;try{const o=new g(this.hass.connection);this._boards=await o.getBoards(),!this._selectedBoardId&&this._boards.length>0&&(this._selectedBoardId=this._boards[0].id),await this._refreshColumnsAndTasks()}catch(o){console.error("Failed to load DoBeeDo data",o)}finally{this._loading=!1}}}async _refreshColumnsAndTasks(){if(!this.hass||!this._selectedBoardId){this._columns=[],this._tasks=[],this._selectedColumnId=null;return}const o=new g(this.hass.connection);this._columns=await o.getColumns(this._selectedBoardId),this._tasks=await o.getTasks(this._selectedBoardId),this._columns.length===0?this._selectedColumnId=null:(!this._selectedColumnId||!this._columns.some(e=>e.id===this._selectedColumnId))&&(this._selectedColumnId=this._columns[0].id)}async _refreshTasksForSelectedBoard(){if(!this.hass||!this._selectedBoardId){this._tasks=[];return}const o=new g(this.hass.connection);this._tasks=await o.getTasks(this._selectedBoardId)}_handleSelectBoard(o){this._selectedBoardId!==o.id&&(this._selectedBoardId=o.id,this._refreshColumnsAndTasks())}async _handleCreateTask(){if(!this.hass||!this._selectedBoardId||!this._newTaskTitle.trim())return;const o=new g(this.hass.connection),e=this._boards.find(s=>s.id===this._selectedBoardId);if(!e)return;const t=this._selectedColumnId;if(!t){console.warn("No column selected on the selected board to create a task in.");return}try{const s=await o.createTask(e.id,t,this._newTaskTitle.trim());this._newTaskTitle="",e.id===this._selectedBoardId?this._tasks=[...this._tasks,s]:await this._refreshTasksForSelectedBoard()}catch(s){console.error("Failed to create DoBeeDo task",s)}}async _handleCreateColumn(){if(!this.hass||!this._selectedBoardId||!this._newColumnName.trim())return;const o=new g(this.hass.connection);try{const e=await o.createColumn(this._selectedBoardId,this._newColumnName.trim());this._newColumnName="",this._columns=[...this._columns,e]}catch(e){console.error("Failed to create DoBeeDo column",e)}}async _handleEditTask(o){if(!this.hass)return;const e=window.prompt("Edit task title",o.title);if(e===null)return;const t=e.trim();if(!t)return;const s=window.prompt("Edit task description (leave empty to clear)",o.description??""),i=s!==null?s.trim():o.description??null,n={};if(t!==o.title&&(n.title=t),i!==(o.description??null)&&(n.description=i===""?null:i),!n.title&&n.description===void 0)return;const r=new g(this.hass.connection);try{const d=await r.updateTask(o.id,n);this._tasks=this._tasks.map(a=>a.id===d.id?d:a)}catch(d){console.error("Failed to update DoBeeDo task",d)}}async _handleMoveTask(o){if(!this.hass||this._columns.length===0)return;const e=window.prompt("Move task to column ID (use one of: "+this._columns.map(s=>s.id).join(", ")+")",o.column_id);if(!e)return;const t=new g(this.hass.connection);try{const s=await t.moveTask(o.id,e||o.column_id);this._tasks=this._tasks.map(i=>i.id===s.id?s:i)}catch(s){console.error("Failed to move DoBeeDo task",s)}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeUpdates&&(this._unsubscribeUpdates(),this._unsubscribeUpdates=null)}render(){const o=this._boards.find(e=>e.id===this._selectedBoardId)??null;return console.debug("DoBeeDo render",{boards:this._boards,selectedBoardId:this._selectedBoardId,columns:this._columns,selectedColumnId:this._selectedColumnId}),p`
      <h1>DoBeeDo</h1>
      ${this._loading?p`<p>Loading boards…</p>`:p`
            ${this._boards.length===0?p`<p>No boards available yet. Backend logic is still being implemented.</p>`:p`
                  <ul>
                    ${this._boards.map(e=>p`
                        <li
                          @click=${()=>this._handleSelectBoard(e)}
                          style="cursor: pointer; ${e.id===this._selectedBoardId?"font-weight: 700;":""}"
                        >
                          <div class="board-name">${e.name}</div>
                          ${e.description?p`<div class="board-description">
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
                    ${this._columns.length===0?p`<p>No columns defined for this board yet.</p>`:this._columns.map(e=>{const t=this._tasks.filter(s=>s.column_id===e.id).sort((s,i)=>s.sort_index-i.sort_index);return p`
                            <div>
                              <div class="board-name">${e.name}</div>
                              ${t.length===0?p`<p>No tasks in this column.</p>`:p`<ul>
                                    ${t.map(s=>p`<li class="task-item">
                                        <span>${s.title}</span>
                                        <button @click=${()=>this._handleEditTask(s)}>
                                          Edit
                                        </button>
                                        <button @click=${()=>this._handleMoveTask(s)}>
                                          Move
                                        </button>
                                      </li>`)}
                                  </ul>`}
                            </div>
                          `})}
                  </div>

                  <div style="margin-top: 16px; display: flex; gap: 8px; align-items: center; border: 1px dashed red; padding: 4px;">
                    <span>Column selector:</span>
                    <input
                      type="text"
                      .value=${this._newTaskTitle}
                      placeholder="New task title"
                      @input=${e=>{const t=e.target;this._newTaskTitle=t.value}}
                    />

                    <select
                      .value=${this._selectedColumnId??""}
                      @change=${e=>{const t=e.target;this._selectedColumnId=t.value||null}}
                    >
                      ${this._columns.map(e=>p`<option value=${e.id}>${e.name}</option>`)}
                    </select>

                    <button
                      @click=${()=>this._handleCreateTask()}
                      ?disabled=${!this._newTaskTitle.trim()||this._loading||!this._selectedBoardId||!this._selectedColumnId}
                    >
                      Add task
                    </button>
                  </div>
                `}
          `}
      <p>
        This is the early DoBeeDo panel. The full board view, columns, and task
        management UI will be added in later phases.
      </p>
    `}};f([he({attribute:!1})],_.prototype,"hass",2),f([$()],_.prototype,"_boards",2),f([$()],_.prototype,"_tasks",2),f([$()],_.prototype,"_columns",2),f([$()],_.prototype,"_loading",2),f([$()],_.prototype,"_newTaskTitle",2),f([$()],_.prototype,"_newColumnName",2),f([$()],_.prototype,"_unsubscribeUpdates",2),f([$()],_.prototype,"_selectedBoardId",2),f([$()],_.prototype,"_selectedColumnId",2),_=f([Ie("dobeedo-panel")],_)})();
