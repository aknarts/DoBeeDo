(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var mt;const R=globalThis,Y=R.ShadowRoot&&(R.ShadyCSS===void 0||R.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),tt=new WeakMap;let et=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Y&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=tt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&tt.set(e,t))}return t}toString(){return this.cssText}};const bt=o=>new et(typeof o=="string"?o:o+"",void 0,W),ft=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((s,i,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[r+1],o[0]);return new et(e,o,W)},yt=(o,t)=>{if(Y)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=R.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},ot=Y?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return bt(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:vt,defineProperty:kt,getOwnPropertyDescriptor:xt,getOwnPropertyNames:$t,getOwnPropertySymbols:wt,getPrototypeOf:Tt}=Object,k=globalThis,st=k.trustedTypes,Dt=st?st.emptyScript:"",V=k.reactiveElementPolyfillSupport,I=(o,t)=>o,z={toAttribute(o,t){switch(t){case Boolean:o=o?Dt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},J=(o,t)=>!vt(o,t),it={attribute:!0,type:String,converter:z,reflect:!1,useDefault:!1,hasChanged:J};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),k.litPropertyMetadata??(k.litPropertyMetadata=new WeakMap);let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=it){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&kt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=xt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){const l=i==null?void 0:i.call(this);r==null||r.call(this,n),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??it}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;const t=Tt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){const e=this.properties,s=[...$t(e),...wt(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(ot(i))}else t!==void 0&&e.push(ot(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return yt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var r;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const n=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:z).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){var r,n;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:z;this._$Em=i;const d=a.fromAttribute(e,l.type);this[i]=d??((n=this._$Ej)==null?void 0:n.get(i))??d,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const r=this.constructor,n=this[t];if(s??(s=r.getPropertyOptions(t)),!((s.hasChanged??J)(n,e)||s.useDefault&&s.reflect&&n===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,n]of i){const{wrapped:l}=n,a=this[r];l!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,n,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[I("elementProperties")]=new Map,A[I("finalized")]=new Map,V==null||V({ReactiveElement:A}),(k.reactiveElementVersions??(k.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,F=P.trustedTypes,rt=F?F.createPolicy("lit-html",{createHTML:o=>o}):void 0,at="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,nt="?"+x,At=`<${nt}>`,$=document,S=()=>$.createComment(""),B=o=>o===null||typeof o!="object"&&typeof o!="function",K=Array.isArray,Et=o=>K(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",Z=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,lt=/>/g,w=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ct=/'/g,ht=/"/g,pt=/^(?:script|style|textarea|title)$/i,Ct=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),p=Ct(1),E=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),ut=new WeakMap,T=$.createTreeWalker($,129);function _t(o,t){if(!K(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return rt!==void 0?rt.createHTML(t):t}const It=(o,t)=>{const e=o.length-1,s=[];let i,r=t===2?"<svg>":t===3?"<math>":"",n=M;for(let l=0;l<e;l++){const a=o[l];let d,h,c=-1,m=0;for(;m<a.length&&(n.lastIndex=m,h=n.exec(a),h!==null);)m=n.lastIndex,n===M?h[1]==="!--"?n=dt:h[1]!==void 0?n=lt:h[2]!==void 0?(pt.test(h[2])&&(i=RegExp("</"+h[2],"g")),n=w):h[3]!==void 0&&(n=w):n===w?h[0]===">"?(n=i??M,c=-1):h[1]===void 0?c=-2:(c=n.lastIndex-h[2].length,d=h[1],n=h[3]===void 0?w:h[3]==='"'?ht:ct):n===ht||n===ct?n=w:n===dt||n===lt?n=M:(n=w,i=void 0);const y=n===w&&o[l+1].startsWith("/>")?" ":"";r+=n===M?a+At:c>=0?(s.push(d),a.slice(0,c)+at+a.slice(c)+x+y):a+x+(c===-2?l:y)}return[_t(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class N{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const l=t.length-1,a=this.parts,[d,h]=It(t,e);if(this.el=N.createElement(d,s),T.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=T.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(at)){const m=h[n++],y=i.getAttribute(c).split(x),v=/([.?@])?(.*)/.exec(m);a.push({type:1,index:r,name:v[2],strings:y,ctor:v[1]==="."?St:v[1]==="?"?Bt:v[1]==="@"?Mt:j}),i.removeAttribute(c)}else c.startsWith(x)&&(a.push({type:6,index:r}),i.removeAttribute(c));if(pt.test(i.tagName)){const c=i.textContent.split(x),m=c.length-1;if(m>0){i.textContent=F?F.emptyScript:"";for(let y=0;y<m;y++)i.append(c[y],S()),T.nextNode(),a.push({type:2,index:++r});i.append(c[m],S())}}}else if(i.nodeType===8)if(i.data===nt)a.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf(x,c+1))!==-1;)a.push({type:7,index:r}),c+=x.length-1}r++}}static createElement(t,e){const s=$.createElement("template");return s.innerHTML=t,s}}function C(o,t,e=o,s){var n,l;if(t===E)return t;let i=s!==void 0?(n=e._$Co)==null?void 0:n[s]:e._$Cl;const r=B(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),r===void 0?i=void 0:(i=new r(o),i._$AT(o,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=C(o,i._$AS(o,t.values),i,s)),t}class Pt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??$).importNode(e,!0);T.currentNode=i;let r=T.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new O(r,r.nextSibling,this,t):a.type===1?d=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(d=new Nt(r,this,t)),this._$AV.push(d),a=s[++l]}n!==(a==null?void 0:a.index)&&(r=T.nextNode(),n++)}return T.currentNode=$,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class O{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),B(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Et(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&B(this._$AH)?this._$AA.nextSibling.data=t:this.T($.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=N.createElement(_t(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(e);else{const n=new Pt(i,this),l=n.u(this.options);n.p(e),this.T(l),this._$AH=n}}_$AC(t){let e=ut.get(t.strings);return e===void 0&&ut.set(t.strings,e=new N(t)),e}k(t){K(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new O(this.O(S()),this.O(S()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class j{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(r===void 0)t=C(this,t,e,0),n=!B(t)||t!==this._$AH&&t!==E,n&&(this._$AH=t);else{const l=t;let a,d;for(t=r[0],a=0;a<r.length-1;a++)d=C(this,l[s+a],e,a),d===E&&(d=this._$AH[a]),n||(n=!B(d)||d!==this._$AH[a]),d===b?t=b:t!==b&&(t+=(d??"")+r[a+1]),this._$AH[a]=d}n&&!i&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class St extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}}class Bt extends j{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}}class Mt extends j{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??b)===E)return;const s=this._$AH,i=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==b&&(s===b||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const X=P.litHtmlPolyfillSupport;X==null||X(N,O),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.1");const Ot=(o,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const r=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new O(t.insertBefore(S(),r),r,void 0,e??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis;class U extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ot(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return E}}U._$litElement$=!0,U.finalized=!0,(mt=D.litElementHydrateSupport)==null||mt.call(D,{LitElement:U});const G=D.litElementPolyfillSupport;G==null||G({LitElement:U}),(D.litElementVersions??(D.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ut=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ht={attribute:!0,type:String,converter:z,reflect:!1,hasChanged:J},Lt=(o=Ht,t,e)=>{const{kind:s,metadata:i}=e;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(e.name,o),s==="accessor"){const{name:n}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,o)},init(l){return l!==void 0&&this.C(n,void 0,o,l),l}}}if(s==="setter"){const{name:n}=e;return function(l){const a=this[n];t.call(this,l),this.requestUpdate(n,a,o)}}throw Error("Unsupported decorator location: "+s)};function gt(o){return(t,e)=>typeof e=="object"?Lt(o,t,e):((s,i,r)=>{const n=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),n?Object.getOwnPropertyDescriptor(i,r):void 0})(o,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(o){return gt({...o,state:!0,attribute:!1})}class f{constructor(t){this.connection=t}async getBoards(){return(await this.connection.sendMessagePromise({type:"dobeedo/get_boards"})).boards??[]}async createBoard(t,e){const s={type:"dobeedo/create_board",name:t};return e!==void 0&&(s.description=e),(await this.connection.sendMessagePromise(s)).board}async getColumns(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_columns",board_id:t})).columns??[]}async createColumn(t,e,s){return(await this.connection.sendMessagePromise({type:"dobeedo/create_column",board_id:t,name:e,order_index:s})).column}async getTasks(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_tasks",board_id:t})).tasks??[]}async createTask(t,e,s,i,r,n,l){const a={type:"dobeedo/create_task",board_id:t,column_id:e,title:s};return i!==void 0&&(a.description=i),r!==void 0&&(a.due_date=r),n!==void 0&&(a.priority=n),l!==void 0&&(a.tags=l),(await this.connection.sendMessagePromise(a)).task}async updateTask(t,e){const s={type:"dobeedo/update_task",task_id:t};return e.title!==void 0&&(s.title=e.title),e.description!==void 0&&(s.description=e.description),e.due_date!==void 0&&(s.due_date=e.due_date),e.priority!==void 0&&(s.priority=e.priority),e.tags!==void 0&&(s.tags=e.tags),(await this.connection.sendMessagePromise(s)).task}async moveTask(t,e,s){const i={type:"dobeedo/move_task",task_id:t,target_column_id:e};return s!==void 0&&(i.target_sort_index=s),(await this.connection.sendMessagePromise(i)).task}async deleteTask(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_task",task_id:t})}async deleteColumn(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_column",column_id:t})}async deleteBoard(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_board",board_id:t})}subscribeUpdates(t){const e=this.connection;if(e.subscribeEvents){console.debug("DoBeeDo: using connection.subscribeEvents for updates");const r=e.subscribeEvents(n=>{if(console.debug("DoBeeDo: raw WS message via subscribeEvents",n),typeof(n==null?void 0:n.event_type)=="string"&&n.data){const l=n.event_type;if(l.startsWith("dobeedo_")){const a=l.replace(/^dobeedo_/,"");t({event_type:a,payload:n.data,raw_type:l})}return}(n==null?void 0:n.type)==="dobeedo/event"&&n.event_type&&n.payload&&t({event_type:n.event_type,payload:n.payload,raw_type:n.raw_type})});return()=>{console.debug("DoBeeDo: unsubscribe from subscribeEvents"),r()}}if(!e.subscribeMessage)return console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available"),()=>{};const s=r=>{console.debug("DoBeeDo: raw WS message in subscribeUpdates handler",r),(r==null?void 0:r.type)==="dobeedo/event"&&r.event_type&&r.payload&&t({event_type:r.event_type,payload:r.payload,raw_type:r.raw_type})};console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");const i=e.subscribeMessage(s,{type:"dobeedo/subscribe_updates"});return()=>{console.debug("DoBeeDo: unsubscribe from subscribe_updates"),i()}}async listTodoEntities(){return(await this.connection.sendMessagePromise({type:"dobeedo/list_todo_entities"})).entities??[]}async importFromTodo(t,e,s,i){const r={type:"dobeedo/import_from_todo",entity_id:t,board_id:e,column_id:s};return i!==void 0&&(r.status_filter=i),await this.connection.sendMessagePromise(r)}async importAllTodos(t,e){const s={type:"dobeedo/import_all_todos",board_id:t};return e!==void 0&&(s.status_filter=e),await this.connection.sendMessagePromise(s)}}var Rt=Object.defineProperty,zt=Object.getOwnPropertyDescriptor,_=(o,t,e,s)=>{for(var i=s>1?void 0:s?zt(t,e):t,r=o.length-1,n;r>=0;r--)(n=o[r])&&(i=(s?n(t,e,i):n(i))||i);return s&&i&&Rt(t,e,i),i};let u=class extends U{constructor(){super(...arguments),this._boards=[],this._tasks=[],this._columns=[],this._loading=!1,this._newTaskTitles={},this._newTaskDescriptions={},this._newTaskDueDates={},this._newTaskPriorities={},this._newTaskTags={},this._newColumnName="",this._newBoardName="",this._isAddingBoard=!1,this._unsubscribeUpdates=null,this._selectedBoardId=null,this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate="",this._editTaskPriority="",this._editTaskTags="",this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null,this._touchDragging=!1,this._touchStartY=0,this._touchCurrentY=0,this._importingColumnId=null,this._todoEntities=[],this._selectedTodoEntity=null,this._importStatusFilter="",this._boundTouchMove=null,this._boundTouchEnd=null}static get styles(){return ft`
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
    `}updated(o){if(o.has("hass")&&this.hass&&(this._fetchBoards(),!this._unsubscribeUpdates)){const t=new f(this.hass.connection);console.debug("DoBeeDo: registering subscribeUpdates"),this._unsubscribeUpdates=t.subscribeUpdates(e=>{var s,i;if(console.debug("DoBeeDo event received in panel",e),e.event_type.startsWith("task_")){const r=(s=e.payload.task)==null?void 0:s.board_id;console.debug("DoBeeDo task event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshTasksForSelectedBoard()}else if(e.event_type.startsWith("column_")){const r=(i=e.payload.column)==null?void 0:i.board_id;console.debug("DoBeeDo column event for board",r,"selected",this._selectedBoardId),r&&r===this._selectedBoardId&&this._refreshColumnsAndTasks()}else e.event_type.startsWith("board_")&&(console.debug("DoBeeDo board event"),this._fetchBoards())})}}async _fetchBoards(){if(this.hass){this._loading=!0;try{const o=new f(this.hass.connection);this._boards=await o.getBoards(),!this._selectedBoardId&&this._boards.length>0&&(this._selectedBoardId=this._boards[0].id),await this._refreshColumnsAndTasks()}catch(o){console.error("Failed to load DoBeeDo data",o)}finally{this._loading=!1}}}async _refreshColumnsAndTasks(){if(!this.hass||!this._selectedBoardId){this._columns=[],this._tasks=[];return}const o=new f(this.hass.connection);this._columns=await o.getColumns(this._selectedBoardId),this._tasks=await o.getTasks(this._selectedBoardId)}async _refreshTasksForSelectedBoard(){if(!this.hass||!this._selectedBoardId){this._tasks=[];return}const o=new f(this.hass.connection);this._tasks=await o.getTasks(this._selectedBoardId)}_handleSelectBoard(o){this._selectedBoardId!==o.id&&(this._selectedBoardId=o.id,this._refreshColumnsAndTasks())}async _handleCreateTask(o){const t=this._newTaskTitles[o]||"",e=this._newTaskDescriptions[o]||"",s=this._newTaskDueDates[o]||"",i=this._newTaskPriorities[o]||"",r=this._newTaskTags[o]||"";if(!this.hass||!this._selectedBoardId||!t.trim())return;const n=new f(this.hass.connection),l=this._boards.find(d=>d.id===this._selectedBoardId);if(!l)return;const a=r.split(",").map(d=>d.trim()).filter(d=>d.length>0);try{await n.createTask(l.id,o,t.trim(),e.trim()||void 0,s.trim()||void 0,i.trim()||void 0,a.length>0?a:void 0),delete this._newTaskTitles[o],delete this._newTaskDescriptions[o],delete this._newTaskDueDates[o],delete this._newTaskPriorities[o],delete this._newTaskTags[o],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions},this._newTaskDueDates={...this._newTaskDueDates},this._newTaskPriorities={...this._newTaskPriorities},this._newTaskTags={...this._newTaskTags}}catch(d){console.error("Failed to create DoBeeDo task",d)}}async _handleCreateColumn(){if(!this.hass||!this._selectedBoardId||!this._newColumnName.trim())return;const o=new f(this.hass.connection);try{await o.createColumn(this._selectedBoardId,this._newColumnName.trim()),this._newColumnName=""}catch(t){console.error("Failed to create DoBeeDo column",t)}}async _handleCreateBoard(){if(!this.hass||!this._newBoardName.trim())return;const o=new f(this.hass.connection);try{const t=await o.createBoard(this._newBoardName.trim());this._newBoardName="",this._isAddingBoard=!1,await this._fetchBoards(),this._selectedBoardId=t.id,await this._refreshColumnsAndTasks()}catch(t){console.error("Failed to create DoBeeDo board",t)}}async _handleDeleteBoard(o){if(!this.hass||!window.confirm(`Delete board "${o.name}" and all its columns and tasks?`))return;const t=new f(this.hass.connection);try{await t.deleteBoard(o.id),await this._fetchBoards(),this._selectedBoardId===o.id&&(this._selectedBoardId=this._boards.length>0?this._boards[0].id:null,await this._refreshColumnsAndTasks())}catch(e){console.error("Failed to delete DoBeeDo board",e)}}_startEditTask(o){this._editingTaskId=o.id,this._editTaskTitle=o.title,this._editTaskDescription=o.description??"",this._editTaskDueDate=o.due_date??"",this._editTaskPriority=o.priority??"",this._editTaskTags=o.tags?o.tags.join(", "):""}_cancelEditTask(){this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate="",this._editTaskPriority="",this._editTaskTags=""}async _saveEditTask(){if(!this.hass||!this._editingTaskId)return;const o=this._tasks.find(c=>c.id===this._editingTaskId);if(!o)return;const t=this._editTaskTitle.trim();if(!t)return;const e={};t!==o.title&&(e.title=t);const s=this._editTaskDescription.trim();s!==(o.description??"")&&(e.description=s===""?null:s);const i=this._editTaskDueDate.trim();i!==(o.due_date??"")&&(e.due_date=i===""?null:i);const r=this._editTaskPriority.trim();r!==(o.priority??"")&&(e.priority=r===""?null:r);const l=this._editTaskTags.trim().split(",").map(c=>c.trim()).filter(c=>c.length>0),a=o.tags||[];if((l.length!==a.length||l.some((c,m)=>c!==a[m]))&&(e.tags=l.length>0?l:null),!e.title&&e.description===void 0&&e.due_date===void 0&&e.priority===void 0&&e.tags===void 0){this._cancelEditTask();return}const h=new f(this.hass.connection);try{await h.updateTask(this._editingTaskId,e),this._cancelEditTask()}catch(c){console.error("Failed to update DoBeeDo task",c)}}_handleDragStart(o,t){this._draggingTaskId=o.id,t.dataTransfer&&(t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",o.id))}_handleDragEnd(){this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null}_handleTouchStart(o,t){t.preventDefault();const e=t.touches[0];this._touchStartY=e.clientY,this._touchCurrentY=e.clientY,this._touchDragging=!0,this._draggingTaskId=o.id,this._boundTouchMove=this._handleTouchMove.bind(this),this._boundTouchEnd=this._handleTouchEnd.bind(this),document.addEventListener("touchmove",this._boundTouchMove,{passive:!1}),document.addEventListener("touchend",this._boundTouchEnd,{passive:!1})}_handleTouchMove(o){if(!this._touchDragging||!this._draggingTaskId)return;o.preventDefault();const t=o.touches[0];this._touchCurrentY=t.clientY;const e=document.elementsFromPoint(t.clientX,t.clientY);for(const s of e)if(s.classList.contains("tasks-list")){const i=s.closest(".column");if(i){const r=this._getColumnIdFromElement(i);if(r){this._dragOverColumnId=r,this._calculateTouchDropPosition(r,t.clientY);break}}}}_handleTouchEnd(o){if(!(!this._touchDragging||!this._draggingTaskId)){if(o.preventDefault(),this._dropIndicatorPosition){const t=new DragEvent("drop");this._handleDrop(this._dropIndicatorPosition.columnId,t)}this._boundTouchMove&&(document.removeEventListener("touchmove",this._boundTouchMove),this._boundTouchMove=null),this._boundTouchEnd&&(document.removeEventListener("touchend",this._boundTouchEnd),this._boundTouchEnd=null),this._touchDragging=!1,this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null,this._touchStartY=0,this._touchCurrentY=0}}_getColumnIdFromElement(o){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelectorAll(".column");if(!t)return null;for(let s=0;s<t.length;s++)if(t[s]===o&&s<this._columns.length)return this._columns[s].id;return null}_calculateTouchDropPosition(o,t){var l,a;const e=Array.from(((l=this.shadowRoot)==null?void 0:l.querySelectorAll(".column"))||[]).find(d=>this._getColumnIdFromElement(d)===o);if(!e)return;const s=e.querySelector(".tasks-list");if(!s)return;const i=Array.from(s.querySelectorAll(".task-card:not(.dragging):not(.drop-preview)"));if(i.length===0){this._dropIndicatorPosition={columnId:o,index:0};return}let r=i.length;const n=.15;for(let d=0;d<i.length;d++){const h=i[d].getBoundingClientRect(),c=h.top,m=h.bottom,y=m-c,v=c+y/2,H=c+y*(.5-n),L=c+y*(.5+n),q=(a=this._dropIndicatorPosition)==null?void 0:a.index,Q=q===d,Ft=q===d+1;if(t>=H&&t<L){if(Q){r=d;break}else if(Ft){r=d+1;break}t<v?r=d:r=d+1;break}if(t>=c&&t<H){r=d;break}if(t>=L&&t<m){r=d+1;break}}this._dropIndicatorPosition={columnId:o,index:r}}_handleDragOver(o){o.preventDefault(),o.dataTransfer&&(o.dataTransfer.dropEffect="move")}_handleDragOverTasksList(o,t){var l;if(t.preventDefault(),t.stopPropagation(),!this._draggingTaskId)return;const e=t.currentTarget,s=Array.from(e.querySelectorAll(".task-card:not(.dragging):not(.drop-preview)")),i=t.clientY;if(s.length===0){this._dropIndicatorPosition={columnId:o,index:0};return}let r=s.length;const n=.15;for(let a=0;a<s.length;a++){const d=s[a].getBoundingClientRect(),h=d.top,c=d.bottom,m=c-h,y=h+m/2,v=h+m*(.5-n),H=h+m*(.5+n),L=(l=this._dropIndicatorPosition)==null?void 0:l.index,q=L===a,Q=L===a+1;if(i>=v&&i<H){if(q){r=a;break}else if(Q){r=a+1;break}i<y?r=a:r=a+1;break}if(i>=h&&i<v){r=a;break}if(i>=H&&i<c){r=a+1;break}}(!this._dropIndicatorPosition||this._dropIndicatorPosition.columnId!==o||this._dropIndicatorPosition.index!==r)&&(this._dropIndicatorPosition={columnId:o,index:r})}_handleDragEnterColumn(o,t){t.stopPropagation(),this._dragOverColumnId=o}_handleDragLeaveColumn(o){const t=o.currentTarget,e=o.relatedTarget;(!e||!t.contains(e))&&(this._dragOverColumnId=null,this._dropIndicatorPosition=null)}_isTaskOverdue(o){if(!o.due_date)return!1;const t=new Date;return t.setHours(0,0,0,0),new Date(o.due_date)<t}_formatDueDate(o){const t=new Date(o),e=new Date;e.setHours(0,0,0,0);const s=new Date(e);s.setDate(s.getDate()+1);const i=new Date(o);if(i.setHours(0,0,0,0),i.getTime()===e.getTime())return"Today";if(i.getTime()===s.getTime())return"Tomorrow";{const r={month:"short",day:"numeric"};return t.toLocaleDateString(void 0,r)}}async _handleDrop(o,t){if(t.preventDefault(),t.stopPropagation(),this._dragOverColumnId=null,!this._draggingTaskId||!this.hass)return;const e=this._tasks.find(a=>a.id===this._draggingTaskId);if(!e){this._draggingTaskId=null;return}let i=this._tasks.filter(a=>a.column_id===o&&a.id!==this._draggingTaskId).sort((a,d)=>a.sort_index-d.sort_index).length;const r=t.currentTarget,n=r.classList.contains("tasks-list")?r:r.querySelector(".tasks-list");if(n){const a=Array.from(n.querySelectorAll(".task-card:not(.dragging)")),d=t.clientY;for(let h=0;h<a.length;h++){const c=a[h].getBoundingClientRect(),m=c.top+c.height/2;if(d<m){i=h;break}}}const l=new f(this.hass.connection);try{await l.moveTask(e.id,o,i),this._draggingTaskId=null,this._dropIndicatorPosition=null}catch(a){console.error("Failed to move task via drag-and-drop",a),this._draggingTaskId=null,this._dropIndicatorPosition=null}}async _handleDeleteTask(o){if(!this.hass||!window.confirm(`Delete task "${o.title}"?`))return;const t=new f(this.hass.connection);try{await t.deleteTask(o.id)}catch(e){console.error("Failed to delete DoBeeDo task",e)}}async _handleDeleteColumn(o){if(!this.hass)return;const e=this._tasks.filter(r=>r.column_id===o.id).length,s=e>0?`Delete column "${o.name}" and ${e} task${e===1?"":"s"}?`:`Delete column "${o.name}"?`;if(!window.confirm(s))return;const i=new f(this.hass.connection);try{await i.deleteColumn(o.id)}catch(r){console.error("Failed to delete DoBeeDo column",r)}}async _startImport(o){if(!this.hass)return;const t=new f(this.hass.connection);try{this._todoEntities=await t.listTodoEntities(),this._importingColumnId=o,this._selectedTodoEntity=null,this._importStatusFilter=""}catch(e){console.error("Failed to load todo entities",e)}}_cancelImport(){this._importingColumnId=null,this._todoEntities=[],this._selectedTodoEntity=null,this._importStatusFilter=""}async _handleImport(){if(!this.hass||!this._selectedTodoEntity||!this._importingColumnId||!this._selectedBoardId)return;const o=new f(this.hass.connection);try{const t=await o.importFromTodo(this._selectedTodoEntity,this._selectedBoardId,this._importingColumnId,this._importStatusFilter||void 0);alert(`Successfully imported ${t.imported_count} task${t.imported_count===1?"":"s"}!`),this._cancelImport()}catch(t){console.error("Failed to import from todo",t),alert("Failed to import tasks. See console for details.")}}async _handleImportAll(){if(!this.hass||!this._selectedBoardId||!window.confirm("Import all Home Assistant todo lists as columns? This will create one column per todo list and import all their items."))return;const o=new f(this.hass.connection);try{const t=await o.importAllTodos(this._selectedBoardId);alert(`Successfully imported ${t.columns_created} todo list${t.columns_created===1?"":"s"} with ${t.total_imported} task${t.total_imported===1?"":"s"}!`)}catch(t){console.error("Failed to import all todos",t),alert("Failed to import todo lists. See console for details.")}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeUpdates&&(this._unsubscribeUpdates(),this._unsubscribeUpdates=null),this._boundTouchMove&&(document.removeEventListener("touchmove",this._boundTouchMove),this._boundTouchMove=null),this._boundTouchEnd&&(document.removeEventListener("touchend",this._boundTouchEnd),this._boundTouchEnd=null)}render(){return p`
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
    `}_renderColumn(o){var i,r,n,l;const t=this._tasks.filter(a=>a.column_id===o.id).sort((a,d)=>a.sort_index-d.sort_index),e=this._dragOverColumnId===o.id,s=this._draggingTaskId!==null;return p`
      <div
        class="column ${s?"drag-active":""} ${e?"drag-over":""}"
        @dragover=${this._handleDragOver}
        @dragenter=${a=>this._handleDragEnterColumn(o.id,a)}
        @dragleave=${a=>this._handleDragLeaveColumn(a)}
        @drop=${a=>this._handleDrop(o.id,a)}
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
          @dragover=${a=>this._handleDragOverTasksList(o.id,a)}
          @drop=${a=>this._handleDrop(o.id,a)}
        >
          ${t.length===0?p`
                ${((i=this._dropIndicatorPosition)==null?void 0:i.columnId)===o.id&&((r=this._dropIndicatorPosition)==null?void 0:r.index)===0?this._renderDropPreview():""}
                <div class="empty-state" style="padding: 16px; font-size: 13px;">
                  No tasks yet
                </div>
              `:p`
                ${t.map((a,d)=>{var h,c;return p`
                    ${((h=this._dropIndicatorPosition)==null?void 0:h.columnId)===o.id&&((c=this._dropIndicatorPosition)==null?void 0:c.index)===d?this._renderDropPreview():""}
                    ${this._renderTask(a)}
                  `})}
                ${((n=this._dropIndicatorPosition)==null?void 0:n.columnId)===o.id&&((l=this._dropIndicatorPosition)==null?void 0:l.index)===t.length?this._renderDropPreview():""}
              `}
        </div>
        <div class="add-task-form">
          <input
            type="text"
            class="add-task-input"
            .value=${this._newTaskTitles[o.id]||""}
            placeholder="Add a task..."
            @input=${a=>{const d=a.target;this._newTaskTitles={...this._newTaskTitles,[o.id]:d.value}}}
            @keydown=${a=>{const d=this._newTaskTitles[o.id]||"";a.key==="Enter"&&d.trim()&&this._handleCreateTask(o.id)}}
          />
          ${(this._newTaskTitles[o.id]||"").trim()?p`
                <div class="add-task-actions">
                  <input
                    type="text"
                    class="add-task-input"
                    .value=${this._newTaskDescriptions[o.id]||""}
                    placeholder="Description (optional)"
                    @input=${a=>{const d=a.target;this._newTaskDescriptions={...this._newTaskDescriptions,[o.id]:d.value}}}
                    @keydown=${a=>{a.key==="Enter"&&this._handleCreateTask(o.id)}}
                  />
                  <input
                    type="date"
                    class="add-task-input"
                    .value=${this._newTaskDueDates[o.id]||""}
                    placeholder="Due date (optional)"
                    @input=${a=>{const d=a.target;this._newTaskDueDates={...this._newTaskDueDates,[o.id]:d.value}}}
                    @keydown=${a=>{a.key==="Enter"&&this._handleCreateTask(o.id)}}
                  />
                  <select
                    class="add-task-input"
                    .value=${this._newTaskPriorities[o.id]||""}
                    @change=${a=>{const d=a.target;this._newTaskPriorities={...this._newTaskPriorities,[o.id]:d.value}}}
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
                    @input=${a=>{const d=a.target;this._newTaskTags={...this._newTaskTags,[o.id]:d.value}}}
                    @keydown=${a=>{a.key==="Enter"&&this._handleCreateTask(o.id)}}
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
              @input=${i=>{const r=i.target;this._editTaskTitle=r.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="text"
              .value=${this._editTaskDescription}
              placeholder="Description (optional)"
              @input=${i=>{const r=i.target;this._editTaskDescription=r.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="date"
              .value=${this._editTaskDueDate}
              placeholder="Due date (optional)"
              @input=${i=>{const r=i.target;this._editTaskDueDate=r.value}}
              style="width: 100%; margin-bottom: 8px;"
            />
            <select
              .value=${this._editTaskPriority}
              @change=${i=>{const r=i.target;this._editTaskPriority=r.value}}
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
              @input=${i=>{const r=i.target;this._editTaskTags=r.value}}
              style="width: 100%;"
            />
          </div>
          <div class="task-actions">
            <button class="primary small" @click=${()=>this._saveEditTask()}>Save</button>
            <button class="secondary small" @click=${()=>this._cancelEditTask()}>Cancel</button>
          </div>
        </div>
      `;const e=this._draggingTaskId===o.id,s=this._isTaskOverdue(o);return p`
      <div
        class="task-card ${e?"dragging":""} ${s?"overdue":""}"
        draggable="true"
        @dragstart=${i=>this._handleDragStart(o,i)}
        @dragend=${this._handleDragEnd}
        @touchstart=${i=>this._handleTouchStart(o,i)}
        @touchmove=${i=>this._handleTouchMove(i)}
        @touchend=${i=>this._handleTouchEnd(i)}
      >
        <div class="task-title">${o.title}</div>
        ${o.description?p`<div class="task-description">${o.description}</div>`:""}
        ${o.priority?p`<div class="task-priority ${o.priority}">${o.priority}</div>`:""}
        ${o.tags&&o.tags.length>0?p`<div class="task-tags">
              ${o.tags.map(i=>p`<span class="task-tag">${i}</span>`)}
            </div>`:""}
        ${o.due_date?p`<div class="task-due-date ${s?"overdue":""}">
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
                      @change=${e=>{const s=e.target;this._selectedTodoEntity=s.value}}
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
                      @change=${e=>{const s=e.target;this._importStatusFilter=s.value}}
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
    `}};_([gt({attribute:!1})],u.prototype,"hass",2),_([g()],u.prototype,"_boards",2),_([g()],u.prototype,"_tasks",2),_([g()],u.prototype,"_columns",2),_([g()],u.prototype,"_loading",2),_([g()],u.prototype,"_newTaskTitles",2),_([g()],u.prototype,"_newTaskDescriptions",2),_([g()],u.prototype,"_newTaskDueDates",2),_([g()],u.prototype,"_newTaskPriorities",2),_([g()],u.prototype,"_newTaskTags",2),_([g()],u.prototype,"_newColumnName",2),_([g()],u.prototype,"_newBoardName",2),_([g()],u.prototype,"_isAddingBoard",2),_([g()],u.prototype,"_unsubscribeUpdates",2),_([g()],u.prototype,"_selectedBoardId",2),_([g()],u.prototype,"_editingTaskId",2),_([g()],u.prototype,"_editTaskTitle",2),_([g()],u.prototype,"_editTaskDescription",2),_([g()],u.prototype,"_editTaskDueDate",2),_([g()],u.prototype,"_editTaskPriority",2),_([g()],u.prototype,"_editTaskTags",2),_([g()],u.prototype,"_draggingTaskId",2),_([g()],u.prototype,"_dragOverColumnId",2),_([g()],u.prototype,"_dropIndicatorPosition",2),_([g()],u.prototype,"_touchDragging",2),_([g()],u.prototype,"_touchStartY",2),_([g()],u.prototype,"_touchCurrentY",2),_([g()],u.prototype,"_importingColumnId",2),_([g()],u.prototype,"_todoEntities",2),_([g()],u.prototype,"_selectedTodoEntity",2),_([g()],u.prototype,"_importStatusFilter",2),u=_([Ut("dobeedo-panel")],u)})();
