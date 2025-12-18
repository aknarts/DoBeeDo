(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pt;const L=globalThis,F=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),J=new WeakMap;let K=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(F&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=J.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&J.set(e,t))}return t}toString(){return this.cssText}};const ut=o=>new K(typeof o=="string"?o:o+"",void 0,j),gt=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((s,i,a)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[a+1],o[0]);return new K(e,o,j)},_t=(o,t)=>{if(F)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=L.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},Z=F?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ut(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:mt,defineProperty:bt,getOwnPropertyDescriptor:ft,getOwnPropertyNames:yt,getOwnPropertySymbols:vt,getPrototypeOf:kt}=Object,y=globalThis,Q=y.trustedTypes,xt=Q?Q.emptyScript:"",Y=y.reactiveElementPolyfillSupport,C=(o,t)=>o,U={toAttribute(o,t){switch(t){case Boolean:o=o?xt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},q=(o,t)=>!mt(o,t),tt={attribute:!0,type:String,converter:U,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);let D=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=tt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&bt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:a}=ft(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){const n=i==null?void 0:i.call(this);a==null||a.call(this,r),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??tt}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=kt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,s=[...yt(e),...vt(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Z(i))}else t!==void 0&&e.push(Z(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _t(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var a;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const r=(((a=s.converter)==null?void 0:a.toAttribute)!==void 0?s.converter:U).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){var a,r;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const n=s.getPropertyOptions(i),d=typeof n.converter=="function"?{fromAttribute:n.converter}:((a=n.converter)==null?void 0:a.fromAttribute)!==void 0?n.converter:U;this._$Em=i;const l=d.fromAttribute(e,n.type);this[i]=l??((r=this._$Ej)==null?void 0:r.get(i))??l,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const a=this.constructor,r=this[t];if(s??(s=a.getPropertyOptions(t)),!((s.hasChanged??q)(r,e)||s.useDefault&&s.reflect&&r===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:a},r){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??e??this[t]),a!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[a,r]of this._$Ep)this[a]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[a,r]of i){const{wrapped:n}=r,d=this[a];n!==!0||this._$AL.has(a)||d===void 0||this.C(a,void 0,r,d)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var a;return(a=i.hostUpdate)==null?void 0:a.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[C("elementProperties")]=new Map,D[C("finalized")]=new Map,Y==null||Y({ReactiveElement:D}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=globalThis,H=I.trustedTypes,et=H?H.createPolicy("lit-html",{createHTML:o=>o}):void 0,ot="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,st="?"+v,$t=`<${st}>`,x=document,P=()=>x.createComment(""),S=o=>o===null||typeof o!="object"&&typeof o!="function",W=Array.isArray,Tt=o=>W(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",V=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,it=/-->/g,rt=/>/g,$=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),at=/'/g,nt=/"/g,dt=/^(?:script|style|textarea|title)$/i,wt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),u=wt(1),A=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),lt=new WeakMap,T=x.createTreeWalker(x,129);function ct(o,t){if(!W(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return et!==void 0?et.createHTML(t):t}const Dt=(o,t)=>{const e=o.length-1,s=[];let i,a=t===2?"<svg>":t===3?"<math>":"",r=B;for(let n=0;n<e;n++){const d=o[n];let l,_,c=-1,f=0;for(;f<d.length&&(r.lastIndex=f,_=r.exec(d),_!==null);)f=r.lastIndex,r===B?_[1]==="!--"?r=it:_[1]!==void 0?r=rt:_[2]!==void 0?(dt.test(_[2])&&(i=RegExp("</"+_[2],"g")),r=$):_[3]!==void 0&&(r=$):r===$?_[0]===">"?(r=i??B,c=-1):_[1]===void 0?c=-2:(c=r.lastIndex-_[2].length,l=_[1],r=_[3]===void 0?$:_[3]==='"'?nt:at):r===nt||r===at?r=$:r===it||r===rt?r=B:(r=$,i=void 0);const k=r===$&&o[n+1].startsWith("/>")?" ":"";a+=r===B?d+$t:c>=0?(s.push(l),d.slice(0,c)+ot+d.slice(c)+v+k):d+v+(c===-2?n:k)}return[ct(o,a+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class M{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let a=0,r=0;const n=t.length-1,d=this.parts,[l,_]=Dt(t,e);if(this.el=M.createElement(l,s),T.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=T.nextNode())!==null&&d.length<n;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(ot)){const f=_[r++],k=i.getAttribute(c).split(v),z=/([.?@])?(.*)/.exec(f);d.push({type:1,index:a,name:z[2],strings:k,ctor:z[1]==="."?Et:z[1]==="?"?Ct:z[1]==="@"?It:R}),i.removeAttribute(c)}else c.startsWith(v)&&(d.push({type:6,index:a}),i.removeAttribute(c));if(dt.test(i.tagName)){const c=i.textContent.split(v),f=c.length-1;if(f>0){i.textContent=H?H.emptyScript:"";for(let k=0;k<f;k++)i.append(c[k],P()),T.nextNode(),d.push({type:2,index:++a});i.append(c[f],P())}}}else if(i.nodeType===8)if(i.data===st)d.push({type:2,index:a});else{let c=-1;for(;(c=i.data.indexOf(v,c+1))!==-1;)d.push({type:7,index:a}),c+=v.length-1}a++}}static createElement(t,e){const s=x.createElement("template");return s.innerHTML=t,s}}function E(o,t,e=o,s){var r,n;if(t===A)return t;let i=s!==void 0?(r=e._$Co)==null?void 0:r[s]:e._$Cl;const a=S(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==a&&((n=i==null?void 0:i._$AO)==null||n.call(i,!1),a===void 0?i=void 0:(i=new a(o),i._$AT(o,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=E(o,i._$AS(o,t.values),i,s)),t}class At{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??x).importNode(e,!0);T.currentNode=i;let a=T.nextNode(),r=0,n=0,d=s[0];for(;d!==void 0;){if(r===d.index){let l;d.type===2?l=new N(a,a.nextSibling,this,t):d.type===1?l=new d.ctor(a,d.name,d.strings,this,t):d.type===6&&(l=new Pt(a,this,t)),this._$AV.push(l),d=s[++n]}r!==(d==null?void 0:d.index)&&(a=T.nextNode(),r++)}return T.currentNode=x,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class N{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),S(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Tt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&S(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){var a;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=M.createElement(ct(s.h,s.h[0]),this.options)),s);if(((a=this._$AH)==null?void 0:a._$AD)===i)this._$AH.p(e);else{const r=new At(i,this),n=r.u(this.options);r.p(e),this.T(n),this._$AH=r}}_$AC(t){let e=lt.get(t.strings);return e===void 0&&lt.set(t.strings,e=new M(t)),e}k(t){W(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const a of t)i===e.length?e.push(s=new N(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(a),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,a){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(t,e=this,s,i){const a=this.strings;let r=!1;if(a===void 0)t=E(this,t,e,0),r=!S(t)||t!==this._$AH&&t!==A,r&&(this._$AH=t);else{const n=t;let d,l;for(t=a[0],d=0;d<a.length-1;d++)l=E(this,n[s+d],e,d),l===A&&(l=this._$AH[d]),r||(r=!S(l)||l!==this._$AH[d]),l===m?t=m:t!==m&&(t+=(l??"")+a[d+1]),this._$AH[d]=l}r&&!i&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Et extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}}class Ct extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}}class It extends R{constructor(t,e,s,i,a){super(t,e,s,i,a),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??m)===A)return;const s=this._$AH,i=t===m&&s!==m||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==m&&(s===m||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Pt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}}const X=I.litHtmlPolyfillSupport;X==null||X(M,N),(I.litHtmlVersions??(I.litHtmlVersions=[])).push("3.3.1");const St=(o,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const a=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new N(t.insertBefore(P(),a),a,void 0,e??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w=globalThis;class O extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=St(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return A}}O._$litElement$=!0,O.finalized=!0,(pt=w.litElementHydrateSupport)==null||pt.call(w,{LitElement:O});const G=w.litElementPolyfillSupport;G==null||G({LitElement:O}),(w.litElementVersions??(w.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bt=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt={attribute:!0,type:String,converter:U,reflect:!1,hasChanged:q},Nt=(o=Mt,t,e)=>{const{kind:s,metadata:i}=e;let a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),s==="setter"&&((o=Object.create(o)).wrapped=!0),a.set(e.name,o),s==="accessor"){const{name:r}=e;return{set(n){const d=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,d,o)},init(n){return n!==void 0&&this.C(r,void 0,o,n),n}}}if(s==="setter"){const{name:r}=e;return function(n){const d=this[r];t.call(this,n),this.requestUpdate(r,d,o)}}throw Error("Unsupported decorator location: "+s)};function ht(o){return(t,e)=>typeof e=="object"?Nt(o,t,e):((s,i,a)=>{const r=i.hasOwnProperty(a);return i.constructor.createProperty(a,s),r?Object.getOwnPropertyDescriptor(i,a):void 0})(o,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(o){return ht({...o,state:!0,attribute:!1})}class b{constructor(t){this.connection=t}async getBoards(){return(await this.connection.sendMessagePromise({type:"dobeedo/get_boards"})).boards??[]}async createBoard(t,e){const s={type:"dobeedo/create_board",name:t};return e!==void 0&&(s.description=e),(await this.connection.sendMessagePromise(s)).board}async getColumns(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_columns",board_id:t})).columns??[]}async createColumn(t,e,s){return(await this.connection.sendMessagePromise({type:"dobeedo/create_column",board_id:t,name:e,order_index:s})).column}async getTasks(t){return(await this.connection.sendMessagePromise({type:"dobeedo/get_tasks",board_id:t})).tasks??[]}async createTask(t,e,s,i,a,r,n){const d={type:"dobeedo/create_task",board_id:t,column_id:e,title:s};return i!==void 0&&(d.description=i),a!==void 0&&(d.due_date=a),r!==void 0&&(d.priority=r),n!==void 0&&(d.tags=n),(await this.connection.sendMessagePromise(d)).task}async updateTask(t,e){const s={type:"dobeedo/update_task",task_id:t};return e.title!==void 0&&(s.title=e.title),e.description!==void 0&&(s.description=e.description),e.due_date!==void 0&&(s.due_date=e.due_date),e.priority!==void 0&&(s.priority=e.priority),e.tags!==void 0&&(s.tags=e.tags),(await this.connection.sendMessagePromise(s)).task}async moveTask(t,e,s){const i={type:"dobeedo/move_task",task_id:t,target_column_id:e};return s!==void 0&&(i.target_sort_index=s),(await this.connection.sendMessagePromise(i)).task}async deleteTask(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_task",task_id:t})}async deleteColumn(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_column",column_id:t})}async deleteBoard(t){await this.connection.sendMessagePromise({type:"dobeedo/delete_board",board_id:t})}subscribeUpdates(t){const e=this.connection;if(e.subscribeEvents){console.debug("DoBeeDo: using connection.subscribeEvents for updates");const a=e.subscribeEvents(r=>{if(console.debug("DoBeeDo: raw WS message via subscribeEvents",r),typeof(r==null?void 0:r.event_type)=="string"&&r.data){const n=r.event_type;if(n.startsWith("dobeedo_")){const d=n.replace(/^dobeedo_/,"");t({event_type:d,payload:r.data,raw_type:n})}return}(r==null?void 0:r.type)==="dobeedo/event"&&r.event_type&&r.payload&&t({event_type:r.event_type,payload:r.payload,raw_type:r.raw_type})});return()=>{console.debug("DoBeeDo: unsubscribe from subscribeEvents"),a()}}if(!e.subscribeMessage)return console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available"),()=>{};const s=a=>{console.debug("DoBeeDo: raw WS message in subscribeUpdates handler",a),(a==null?void 0:a.type)==="dobeedo/event"&&a.event_type&&a.payload&&t({event_type:a.event_type,payload:a.payload,raw_type:a.raw_type})};console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");const i=e.subscribeMessage(s,{type:"dobeedo/subscribe_updates"});return()=>{console.debug("DoBeeDo: unsubscribe from subscribe_updates"),i()}}async listTodoEntities(){return(await this.connection.sendMessagePromise({type:"dobeedo/list_todo_entities"})).entities??[]}async importFromTodo(t,e,s,i){const a={type:"dobeedo/import_from_todo",entity_id:t,board_id:e,column_id:s};return i!==void 0&&(a.status_filter=i),await this.connection.sendMessagePromise(a)}async importAllTodos(t,e){const s={type:"dobeedo/import_all_todos",board_id:t};return e!==void 0&&(s.status_filter=e),await this.connection.sendMessagePromise(s)}}var Ot=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,p=(o,t,e,s)=>{for(var i=s>1?void 0:s?Lt(t,e):t,a=o.length-1,r;a>=0;a--)(r=o[a])&&(i=(s?r(t,e,i):r(i))||i);return s&&i&&Ot(t,e,i),i};let h=class extends O{constructor(){super(...arguments),this._boards=[],this._tasks=[],this._columns=[],this._loading=!1,this._newTaskTitles={},this._newTaskDescriptions={},this._newTaskDueDates={},this._newTaskPriorities={},this._newTaskTags={},this._newColumnName="",this._newBoardName="",this._isAddingBoard=!1,this._unsubscribeUpdates=null,this._selectedBoardId=null,this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate="",this._editTaskPriority="",this._editTaskTags="",this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null,this._touchDragging=!1,this._touchStartY=0,this._touchCurrentY=0,this._importingColumnId=null,this._todoEntities=[],this._selectedTodoEntity=null,this._importStatusFilter="",this._touchDebugLog=[],this._boundTouchMove=null,this._boundTouchEnd=null}static get styles(){return gt`
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

      /* Touch debug overlay */
      .touch-debug-overlay {
        position: fixed;
        bottom: 10px;
        left: 10px;
        right: 10px;
        max-height: 150px;
        background: rgba(0, 0, 0, 0.85);
        color: #0f0;
        font-family: monospace;
        font-size: 10px;
        padding: 8px;
        border-radius: 4px;
        overflow-y: auto;
        z-index: 9999;
        pointer-events: none;
      }

      .touch-debug-overlay div {
        margin-bottom: 2px;
      }
    `}updated(o){if(o.has("hass")&&this.hass&&(this._fetchBoards(),!this._unsubscribeUpdates)){const t=new b(this.hass.connection);console.debug("DoBeeDo: registering subscribeUpdates"),this._unsubscribeUpdates=t.subscribeUpdates(e=>{var s,i;if(console.debug("DoBeeDo event received in panel",e),e.event_type.startsWith("task_")){const a=(s=e.payload.task)==null?void 0:s.board_id;console.debug("DoBeeDo task event for board",a,"selected",this._selectedBoardId),a&&a===this._selectedBoardId&&this._refreshTasksForSelectedBoard()}else if(e.event_type.startsWith("column_")){const a=(i=e.payload.column)==null?void 0:i.board_id;console.debug("DoBeeDo column event for board",a,"selected",this._selectedBoardId),a&&a===this._selectedBoardId&&this._refreshColumnsAndTasks()}else e.event_type.startsWith("board_")&&(console.debug("DoBeeDo board event"),this._fetchBoards())})}}async _fetchBoards(){if(this.hass){this._loading=!0;try{const o=new b(this.hass.connection);this._boards=await o.getBoards(),!this._selectedBoardId&&this._boards.length>0&&(this._selectedBoardId=this._boards[0].id),await this._refreshColumnsAndTasks()}catch(o){console.error("Failed to load DoBeeDo data",o)}finally{this._loading=!1}}}async _refreshColumnsAndTasks(){if(!this.hass||!this._selectedBoardId){this._columns=[],this._tasks=[];return}const o=new b(this.hass.connection);this._columns=await o.getColumns(this._selectedBoardId),this._tasks=await o.getTasks(this._selectedBoardId)}async _refreshTasksForSelectedBoard(){if(!this.hass||!this._selectedBoardId){this._tasks=[];return}const o=new b(this.hass.connection);this._tasks=await o.getTasks(this._selectedBoardId)}_handleSelectBoard(o){this._selectedBoardId!==o.id&&(this._selectedBoardId=o.id,this._refreshColumnsAndTasks())}async _handleCreateTask(o){const t=this._newTaskTitles[o]||"",e=this._newTaskDescriptions[o]||"",s=this._newTaskDueDates[o]||"",i=this._newTaskPriorities[o]||"",a=this._newTaskTags[o]||"";if(!this.hass||!this._selectedBoardId||!t.trim())return;const r=new b(this.hass.connection),n=this._boards.find(l=>l.id===this._selectedBoardId);if(!n)return;const d=a.split(",").map(l=>l.trim()).filter(l=>l.length>0);try{await r.createTask(n.id,o,t.trim(),e.trim()||void 0,s.trim()||void 0,i.trim()||void 0,d.length>0?d:void 0),delete this._newTaskTitles[o],delete this._newTaskDescriptions[o],delete this._newTaskDueDates[o],delete this._newTaskPriorities[o],delete this._newTaskTags[o],this._newTaskTitles={...this._newTaskTitles},this._newTaskDescriptions={...this._newTaskDescriptions},this._newTaskDueDates={...this._newTaskDueDates},this._newTaskPriorities={...this._newTaskPriorities},this._newTaskTags={...this._newTaskTags}}catch(l){console.error("Failed to create DoBeeDo task",l)}}async _handleCreateColumn(){if(!this.hass||!this._selectedBoardId||!this._newColumnName.trim())return;const o=new b(this.hass.connection);try{await o.createColumn(this._selectedBoardId,this._newColumnName.trim()),this._newColumnName=""}catch(t){console.error("Failed to create DoBeeDo column",t)}}async _handleCreateBoard(){if(!this.hass||!this._newBoardName.trim())return;const o=new b(this.hass.connection);try{const t=await o.createBoard(this._newBoardName.trim());this._newBoardName="",this._isAddingBoard=!1,await this._fetchBoards(),this._selectedBoardId=t.id,await this._refreshColumnsAndTasks()}catch(t){console.error("Failed to create DoBeeDo board",t)}}async _handleDeleteBoard(o){if(!this.hass||!window.confirm(`Delete board "${o.name}" and all its columns and tasks?`))return;const t=new b(this.hass.connection);try{await t.deleteBoard(o.id),await this._fetchBoards(),this._selectedBoardId===o.id&&(this._selectedBoardId=this._boards.length>0?this._boards[0].id:null,await this._refreshColumnsAndTasks())}catch(e){console.error("Failed to delete DoBeeDo board",e)}}_startEditTask(o){this._editingTaskId=o.id,this._editTaskTitle=o.title,this._editTaskDescription=o.description??"",this._editTaskDueDate=o.due_date??"",this._editTaskPriority=o.priority??"",this._editTaskTags=o.tags?o.tags.join(", "):""}_cancelEditTask(){this._editingTaskId=null,this._editTaskTitle="",this._editTaskDescription="",this._editTaskDueDate="",this._editTaskPriority="",this._editTaskTags=""}async _saveEditTask(){if(!this.hass||!this._editingTaskId)return;const o=this._tasks.find(c=>c.id===this._editingTaskId);if(!o)return;const t=this._editTaskTitle.trim();if(!t)return;const e={};t!==o.title&&(e.title=t);const s=this._editTaskDescription.trim();s!==(o.description??"")&&(e.description=s===""?null:s);const i=this._editTaskDueDate.trim();i!==(o.due_date??"")&&(e.due_date=i===""?null:i);const a=this._editTaskPriority.trim();a!==(o.priority??"")&&(e.priority=a===""?null:a);const n=this._editTaskTags.trim().split(",").map(c=>c.trim()).filter(c=>c.length>0),d=o.tags||[];if((n.length!==d.length||n.some((c,f)=>c!==d[f]))&&(e.tags=n.length>0?n:null),!e.title&&e.description===void 0&&e.due_date===void 0&&e.priority===void 0&&e.tags===void 0){this._cancelEditTask();return}const _=new b(this.hass.connection);try{await _.updateTask(this._editingTaskId,e),this._cancelEditTask()}catch(c){console.error("Failed to update DoBeeDo task",c)}}_handleDragStart(o,t){if(t.dataTransfer){t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",o.id);const e=new Image;e.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",t.dataTransfer.setDragImage(e,0,0)}requestAnimationFrame(()=>{this._draggingTaskId=o.id})}_handleDragEnd(){this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null}_addTouchDebugLog(o){const t=new Date().toLocaleTimeString();this._touchDebugLog=[...this._touchDebugLog,`[${t}] ${o}`].slice(-20)}_handleTouchStart(o,t){t.preventDefault(),this._addTouchDebugLog(`START: task ${o.id}`);const e=t.touches[0];this._touchStartY=e.clientY,this._touchCurrentY=e.clientY,this._touchDragging=!0,requestAnimationFrame(()=>{this._draggingTaskId=o.id,this._addTouchDebugLog(`DRAG ACTIVE: ${o.id}`)}),this._boundTouchMove=this._handleTouchMove.bind(this),this._boundTouchEnd=this._handleTouchEnd.bind(this),document.addEventListener("touchmove",this._boundTouchMove,{passive:!1}),document.addEventListener("touchend",this._boundTouchEnd,{passive:!1})}_handleTouchMove(o){var a,r,n,d;if(!this._touchDragging||!this._draggingTaskId){this._addTouchDebugLog("MOVE: no drag or taskId");return}o.preventDefault();const t=o.touches[0];this._touchCurrentY=t.clientY;const e=(a=this.shadowRoot)==null?void 0:a.querySelector(".task-card.dragging");e&&(e.style.visibility="hidden");const s=((n=(r=this.shadowRoot)==null?void 0:r.elementsFromPoint)==null?void 0:n.call(r,t.clientX,t.clientY))||document.elementsFromPoint(t.clientX,t.clientY);if(e&&(e.style.visibility="visible"),Math.random()<.1){const l=Array.from(s).slice(0,5).map(_=>`${_.tagName}.${_.className}`.substring(0,30)).join(", ");this._addTouchDebugLog(`ELEM: ${l}`)}let i=!1;for(const l of s)if(l.classList.contains("tasks-list")){const _=l.closest(".column");if(_){const c=this._getColumnIdFromElement(_);if(c){this._dragOverColumnId=c,this._calculateTouchDropPosition(c,t.clientY),i=!0,this._addTouchDebugLog(`MOVE: over ${c} idx=${(d=this._dropIndicatorPosition)==null?void 0:d.index}`);break}}}i||this._addTouchDebugLog(`MOVE: no column at ${t.clientX},${t.clientY}`)}_handleTouchEnd(o){if(!this._touchDragging||!this._draggingTaskId){this._addTouchDebugLog("END: no drag or taskId");return}if(o.preventDefault(),this._dropIndicatorPosition){this._addTouchDebugLog(`END: DROP at ${this._dropIndicatorPosition.columnId}[${this._dropIndicatorPosition.index}]`);const t=new DragEvent("drop");this._handleDrop(this._dropIndicatorPosition.columnId,t)}else this._addTouchDebugLog("END: NO drop position - CANCELLED");this._boundTouchMove&&(document.removeEventListener("touchmove",this._boundTouchMove),this._boundTouchMove=null),this._boundTouchEnd&&(document.removeEventListener("touchend",this._boundTouchEnd),this._boundTouchEnd=null),this._touchDragging=!1,this._draggingTaskId=null,this._dragOverColumnId=null,this._dropIndicatorPosition=null,this._touchStartY=0,this._touchCurrentY=0}_getColumnIdFromElement(o){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelectorAll(".column");if(!t)return null;for(let s=0;s<t.length;s++)if(t[s]===o&&s<this._columns.length)return this._columns[s].id;return null}_calculateTouchDropPosition(o,t){var r;const e=Array.from(((r=this.shadowRoot)==null?void 0:r.querySelectorAll(".column"))||[]).find(n=>this._getColumnIdFromElement(n)===o);if(!e)return;const s=e.querySelector(".tasks-list");if(!s)return;const i=Array.from(s.querySelectorAll(".task-card"));if(i.length===0){this._dropIndicatorPosition={columnId:o,index:0};return}let a=i.length;for(let n=0;n<i.length;n++){const d=i[n];if(d.classList.contains("dragging"))continue;const l=d.getBoundingClientRect(),_=l.top+l.height/2;if(t<_){a=n;break}}this._dropIndicatorPosition={columnId:o,index:a}}_handleDragOver(o){o.preventDefault(),o.dataTransfer&&(o.dataTransfer.dropEffect="move")}_handleDragOverTasksList(o,t){if(t.preventDefault(),t.stopPropagation(),!this._draggingTaskId)return;const e=t.currentTarget,s=Array.from(e.querySelectorAll(".task-card")),i=t.clientY;if(s.length===0){this._dropIndicatorPosition={columnId:o,index:0};return}let a=s.length;for(let r=0;r<s.length;r++){const n=s[r];if(n.classList.contains("dragging"))continue;const d=n.getBoundingClientRect(),l=d.top+d.height/2;if(i<l){a=r;break}}(!this._dropIndicatorPosition||this._dropIndicatorPosition.columnId!==o||this._dropIndicatorPosition.index!==a)&&(this._dropIndicatorPosition={columnId:o,index:a})}_handleDragEnterColumn(o,t){t.stopPropagation(),this._dragOverColumnId=o}_handleDragLeaveColumn(o){const t=o.currentTarget,e=o.relatedTarget;(!e||!t.contains(e))&&(this._dragOverColumnId=null,this._dropIndicatorPosition=null)}_isTaskOverdue(o){if(!o.due_date)return!1;const t=new Date;return t.setHours(0,0,0,0),new Date(o.due_date)<t}_formatDueDate(o){const t=new Date(o),e=new Date;e.setHours(0,0,0,0);const s=new Date(e);s.setDate(s.getDate()+1);const i=new Date(o);if(i.setHours(0,0,0,0),i.getTime()===e.getTime())return"Today";if(i.getTime()===s.getTime())return"Tomorrow";{const a={month:"short",day:"numeric"};return t.toLocaleDateString(void 0,a)}}async _handleDrop(o,t){var a;if(t.preventDefault(),t.stopPropagation(),this._dragOverColumnId=null,!this._draggingTaskId||!this.hass)return;const e=this._tasks.find(r=>r.id===this._draggingTaskId);if(!e){this._draggingTaskId=null;return}const s=((a=this._dropIndicatorPosition)==null?void 0:a.index)??0,i=new b(this.hass.connection);try{await i.moveTask(e.id,o,s),this._draggingTaskId=null,this._dropIndicatorPosition=null}catch(r){console.error("Failed to move task via drag-and-drop",r),this._draggingTaskId=null,this._dropIndicatorPosition=null}}async _handleDeleteTask(o){if(!this.hass||!window.confirm(`Delete task "${o.title}"?`))return;const t=new b(this.hass.connection);try{await t.deleteTask(o.id)}catch(e){console.error("Failed to delete DoBeeDo task",e)}}async _handleDeleteColumn(o){if(!this.hass)return;const e=this._tasks.filter(a=>a.column_id===o.id).length,s=e>0?`Delete column "${o.name}" and ${e} task${e===1?"":"s"}?`:`Delete column "${o.name}"?`;if(!window.confirm(s))return;const i=new b(this.hass.connection);try{await i.deleteColumn(o.id)}catch(a){console.error("Failed to delete DoBeeDo column",a)}}async _startImport(o){if(!this.hass)return;const t=new b(this.hass.connection);try{this._todoEntities=await t.listTodoEntities(),this._importingColumnId=o,this._selectedTodoEntity=null,this._importStatusFilter=""}catch(e){console.error("Failed to load todo entities",e)}}_cancelImport(){this._importingColumnId=null,this._todoEntities=[],this._selectedTodoEntity=null,this._importStatusFilter=""}async _handleImport(){if(!this.hass||!this._selectedTodoEntity||!this._importingColumnId||!this._selectedBoardId)return;const o=new b(this.hass.connection);try{const t=await o.importFromTodo(this._selectedTodoEntity,this._selectedBoardId,this._importingColumnId,this._importStatusFilter||void 0);alert(`Successfully imported ${t.imported_count} task${t.imported_count===1?"":"s"}!`),this._cancelImport()}catch(t){console.error("Failed to import from todo",t),alert("Failed to import tasks. See console for details.")}}async _handleImportAll(){if(!this.hass||!this._selectedBoardId||!window.confirm("Import all Home Assistant todo lists as columns? This will create one column per todo list and import all their items."))return;const o=new b(this.hass.connection);try{const t=await o.importAllTodos(this._selectedBoardId);alert(`Successfully imported ${t.columns_created} todo list${t.columns_created===1?"":"s"} with ${t.total_imported} task${t.total_imported===1?"":"s"}!`)}catch(t){console.error("Failed to import all todos",t),alert("Failed to import todo lists. See console for details.")}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeUpdates&&typeof this._unsubscribeUpdates=="function"&&(this._unsubscribeUpdates(),this._unsubscribeUpdates=null),this._boundTouchMove&&(document.removeEventListener("touchmove",this._boundTouchMove),this._boundTouchMove=null),this._boundTouchEnd&&(document.removeEventListener("touchend",this._boundTouchEnd),this._boundTouchEnd=null)}render(){return u`
      <h1>DoBeeDo</h1>
      ${this._loading?u`<p>Loading boards…</p>`:this._renderContent()}
      ${this._importingColumnId?this._renderImportDialog():""}
      ${this._touchDebugLog.length>0?u`
        <div class="touch-debug-overlay">
          ${this._touchDebugLog.map(o=>u`<div>${o}</div>`)}
        </div>
      `:""}
    `}_renderContent(){return this._boards.length===0?u`
        <div class="empty-state">
          <p>No boards available yet.</p>
          <p>Create a board using the input above to get started!</p>
        </div>
      `:u`
      ${this._renderBoardSelector()}
      <div class="board-content">
        ${this._selectedBoardId?this._renderBoard():u`<p>Select a board to begin</p>`}
      </div>
    `}_renderBoardSelector(){return u`
      <div class="board-tabs">
        ${this._boards.map(o=>u`
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
        ${this._isAddingBoard?u`
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
            `:u`
              <div
                class="board-tab add-tab"
                @click=${()=>{this._isAddingBoard=!0,setTimeout(()=>{var t;const o=(t=this.shadowRoot)==null?void 0:t.querySelector(".add-board-input");o==null||o.focus()},50)}}
                title="Add new board"
              >
                + Add Board
              </div>
            `}
      </div>
    `}_renderBoard(){const o=this._columns.length===0;return u`
      ${o?u`
            <div style="margin-bottom: 16px; padding: 16px; background: var(--card-background-color); border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 12px 0; color: var(--secondary-text-color);">
                No columns yet. Create columns manually or import from your Home Assistant todo lists.
              </p>
              <button class="primary" @click=${()=>this._handleImportAll()}>
                📥 Import All Todo Lists
              </button>
            </div>
          `:u`
            <div style="margin-bottom: 12px; display: flex; justify-content: flex-end;">
              <button class="secondary small" @click=${()=>this._handleImportAll()} title="Import all todo lists as columns">
                📥 Import All
              </button>
            </div>
          `}
      <div class="columns-container">
        ${this._columns.map(t=>this._renderColumn(t))} ${this._renderAddColumnMock()}
      </div>
    `}_renderAddColumnMock(){return u`
      <div class="column add-column-mock">
        <div class="add-column-form">
          <input
            type="text"
            class="add-column-input"
            .value=${this._newColumnName}
            placeholder="Add column..."
            @input=${o=>{const t=o.target;this._newColumnName=t.value}}
            @keydown=${o=>{o.key==="Enter"&&this._newColumnName.trim()&&this._handleCreateColumn()}}
          />
          ${this._newColumnName.trim()?u`
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
    `}_renderColumn(o){var e;const t=this._tasks.filter(s=>s.column_id===o.id).sort((s,i)=>s.sort_index-i.sort_index);return u`
      <div
        class="column"
        @dragover=${this._handleDragOver}
        @dragenter=${s=>this._handleDragEnterColumn(o.id,s)}
        @dragleave=${s=>this._handleDragLeaveColumn(s)}
        @drop=${s=>this._handleDrop(o.id,s)}
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
          class="tasks-list ${t.length===0&&((e=this._dropIndicatorPosition)==null?void 0:e.columnId)===o.id?"drop-target-empty":""}"
          @dragover=${s=>this._handleDragOverTasksList(o.id,s)}
          @drop=${s=>this._handleDrop(o.id,s)}
        >
          ${t.length===0?u`
                <div class="empty-state" style="padding: 16px; font-size: 13px;">
                  No tasks yet
                </div>
              `:u`
                ${t.map((s,i)=>{var n,d,l,_;const a=((n=this._dropIndicatorPosition)==null?void 0:n.columnId)===o.id&&((d=this._dropIndicatorPosition)==null?void 0:d.index)===i,r=((l=this._dropIndicatorPosition)==null?void 0:l.columnId)===o.id&&((_=this._dropIndicatorPosition)==null?void 0:_.index)===i+1;return this._renderTask(s,a,r)})}
              `}
        </div>
        <div class="add-task-form">
          <input
            type="text"
            class="add-task-input"
            .value=${this._newTaskTitles[o.id]||""}
            placeholder="Add a task..."
            @input=${s=>{const i=s.target;this._newTaskTitles={...this._newTaskTitles,[o.id]:i.value}}}
            @keydown=${s=>{const i=this._newTaskTitles[o.id]||"";s.key==="Enter"&&i.trim()&&this._handleCreateTask(o.id)}}
          />
          ${(this._newTaskTitles[o.id]||"").trim()?u`
                <div class="add-task-actions">
                  <input
                    type="text"
                    class="add-task-input"
                    .value=${this._newTaskDescriptions[o.id]||""}
                    placeholder="Description (optional)"
                    @input=${s=>{const i=s.target;this._newTaskDescriptions={...this._newTaskDescriptions,[o.id]:i.value}}}
                    @keydown=${s=>{s.key==="Enter"&&this._handleCreateTask(o.id)}}
                  />
                  <input
                    type="date"
                    class="add-task-input"
                    .value=${this._newTaskDueDates[o.id]||""}
                    placeholder="Due date (optional)"
                    @input=${s=>{const i=s.target;this._newTaskDueDates={...this._newTaskDueDates,[o.id]:i.value}}}
                    @keydown=${s=>{s.key==="Enter"&&this._handleCreateTask(o.id)}}
                  />
                  <select
                    class="add-task-input"
                    .value=${this._newTaskPriorities[o.id]||""}
                    @change=${s=>{const i=s.target;this._newTaskPriorities={...this._newTaskPriorities,[o.id]:i.value}}}
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
                    @input=${s=>{const i=s.target;this._newTaskTags={...this._newTaskTags,[o.id]:i.value}}}
                    @keydown=${s=>{s.key==="Enter"&&this._handleCreateTask(o.id)}}
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
    `}_renderTask(o,t=!1,e=!1){if(this._editingTaskId===o.id)return u`
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
      `;const i=this._draggingTaskId===o.id,a=this._isTaskOverdue(o);return u`
      <div
        class="task-card ${i?"dragging":""} ${a?"overdue":""} ${t?"drop-target-before":""} ${e?"drop-target-after":""}"
        draggable="true"
        @dragstart=${r=>this._handleDragStart(o,r)}
        @dragend=${this._handleDragEnd}
        @touchstart=${r=>this._handleTouchStart(o,r)}
      >
        <div class="task-title">${o.title}</div>
        ${o.description?u`<div class="task-description">${o.description}</div>`:""}
        ${o.priority?u`<div class="task-priority ${o.priority}">${o.priority}</div>`:""}
        ${o.tags&&o.tags.length>0?u`<div class="task-tags">
              ${o.tags.map(r=>u`<span class="task-tag">${r}</span>`)}
            </div>`:""}
        ${o.due_date?u`<div class="task-due-date ${a?"overdue":""}">
              📅 ${this._formatDueDate(o.due_date)}
            </div>`:""}
        <div class="task-actions">
          <button class="secondary small" draggable="false" @click=${()=>this._startEditTask(o)}>Edit</button>
          <button class="warning small" draggable="false" @click=${()=>this._handleDeleteTask(o)}>Delete</button>
        </div>
      </div>
    `}_renderImportDialog(){const o=this._columns.find(e=>e.id===this._importingColumnId),t=(o==null?void 0:o.name)||"Unknown";return u`
      <div class="import-dialog-overlay" @click=${this._cancelImport}>
        <div class="import-dialog" @click=${e=>e.stopPropagation()}>
          <div class="import-dialog-title">Import from To-do List to "${t}"</div>
          <div class="import-dialog-content">
            ${this._todoEntities.length===0?u`<p style="color: var(--secondary-text-color);">No to-do lists found in Home Assistant.</p>`:u`
                  <div>
                    <label class="form-label">Select To-do List</label>
                    <select
                      style="width: 100%;"
                      .value=${this._selectedTodoEntity||""}
                      @change=${e=>{const s=e.target;this._selectedTodoEntity=s.value}}
                    >
                      <option value="">-- Select a to-do list --</option>
                      ${this._todoEntities.map(e=>u`
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
    `}};p([ht({attribute:!1})],h.prototype,"hass",2),p([g()],h.prototype,"_boards",2),p([g()],h.prototype,"_tasks",2),p([g()],h.prototype,"_columns",2),p([g()],h.prototype,"_loading",2),p([g()],h.prototype,"_newTaskTitles",2),p([g()],h.prototype,"_newTaskDescriptions",2),p([g()],h.prototype,"_newTaskDueDates",2),p([g()],h.prototype,"_newTaskPriorities",2),p([g()],h.prototype,"_newTaskTags",2),p([g()],h.prototype,"_newColumnName",2),p([g()],h.prototype,"_newBoardName",2),p([g()],h.prototype,"_isAddingBoard",2),p([g()],h.prototype,"_unsubscribeUpdates",2),p([g()],h.prototype,"_selectedBoardId",2),p([g()],h.prototype,"_editingTaskId",2),p([g()],h.prototype,"_editTaskTitle",2),p([g()],h.prototype,"_editTaskDescription",2),p([g()],h.prototype,"_editTaskDueDate",2),p([g()],h.prototype,"_editTaskPriority",2),p([g()],h.prototype,"_editTaskTags",2),p([g()],h.prototype,"_draggingTaskId",2),p([g()],h.prototype,"_dragOverColumnId",2),p([g()],h.prototype,"_dropIndicatorPosition",2),p([g()],h.prototype,"_touchDragging",2),p([g()],h.prototype,"_touchStartY",2),p([g()],h.prototype,"_touchCurrentY",2),p([g()],h.prototype,"_importingColumnId",2),p([g()],h.prototype,"_todoEntities",2),p([g()],h.prototype,"_selectedTodoEntity",2),p([g()],h.prototype,"_importStatusFilter",2),p([g()],h.prototype,"_touchDebugLog",2),h=p([Bt("dobeedo-panel")],h)})();
