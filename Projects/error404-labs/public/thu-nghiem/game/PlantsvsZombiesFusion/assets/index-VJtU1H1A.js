(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ma="170",Nc=0,Ua=1,Fc=2,Yo=1,jo=2,un=3,Pn=0,Ct=1,_t=2,Tn=0,Mi=1,Na=2,Fa=3,Oa=4,Oc=5,Wn=100,Bc=101,zc=102,kc=103,Hc=104,Gc=200,Vc=201,Wc=202,Xc=203,Tr=204,Ar=205,qc=206,Yc=207,jc=208,Zc=209,$c=210,Kc=211,Jc=212,Qc=213,el=214,Rr=0,Cr=1,Pr=2,Ei=3,Lr=4,Ir=5,Dr=6,Ur=7,Zo=0,tl=1,nl=2,An=0,il=1,sl=2,rl=3,$o=4,al=5,ol=6,cl=7,Ko=300,bi=301,Ti=302,Nr=303,Fr=304,Hs=306,Or=1e3,qn=1001,Br=1002,Zt=1003,ll=1004,ts=1005,Yt=1006,qs=1007,Yn=1008,mn=1009,Jo=1010,Qo=1011,qi=1012,ga=1013,$n=1014,dn=1015,$i=1016,_a=1017,va=1018,Ai=1020,ec=35902,tc=1021,nc=1022,jt=1023,ic=1024,sc=1025,yi=1026,Ri=1027,rc=1028,xa=1029,ac=1030,Ma=1031,ya=1033,Cs=33776,Ps=33777,Ls=33778,Is=33779,zr=35840,kr=35841,Hr=35842,Gr=35843,Vr=36196,Wr=37492,Xr=37496,qr=37808,Yr=37809,jr=37810,Zr=37811,$r=37812,Kr=37813,Jr=37814,Qr=37815,ea=37816,ta=37817,na=37818,ia=37819,sa=37820,ra=37821,Ds=36492,aa=36494,oa=36495,oc=36283,ca=36284,la=36285,ha=36286,hl=3200,ul=3201,cc=0,dl=1,bn="",Ft="srgb",Pi="srgb-linear",Gs="linear",Ke="srgb",ei=7680,Ba=519,fl=512,pl=513,ml=514,lc=515,gl=516,_l=517,vl=518,xl=519,ua=35044,za="300 es",fn=2e3,Ns=2001;class Li{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ys=Math.PI/180,da=180/Math.PI;function Rn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xt[s&255]+xt[s>>8&255]+xt[s>>16&255]+xt[s>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[n&255]+xt[n>>8&255]+xt[n>>16&255]+xt[n>>24&255]).toLowerCase()}function Rt(s,e,t){return Math.max(e,Math.min(t,s))}function Ml(s,e){return(s%e+e)%e}function js(s,e,t){return(1-t)*s+t*e}function tn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Je(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Fe{constructor(e=0,t=0){Fe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class De{constructor(e,t,n,i,r,a,o,c,l){De.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],f=n[2],m=n[5],g=n[8],_=i[0],p=i[3],u=i[6],b=i[1],w=i[4],x=i[7],F=i[2],A=i[5],T=i[8];return r[0]=a*_+o*b+c*F,r[3]=a*p+o*w+c*A,r[6]=a*u+o*x+c*T,r[1]=l*_+h*b+d*F,r[4]=l*p+h*w+d*A,r[7]=l*u+h*x+d*T,r[2]=f*_+m*b+g*F,r[5]=f*p+m*w+g*A,r[8]=f*u+m*x+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,f=o*c-h*r,m=l*r-a*c,g=t*d+n*f+i*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(i*l-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=f*_,e[4]=(h*t-i*c)*_,e[5]=(i*r-o*t)*_,e[6]=m*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Zs.makeScale(e,t)),this}rotate(e){return this.premultiply(Zs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Zs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Zs=new De;function hc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Fs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function yl(){const s=Fs("canvas");return s.style.display="block",s}const ka={};function Vi(s){s in ka||(ka[s]=!0,console.warn(s))}function Sl(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function wl(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function El(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Xe={enabled:!0,workingColorSpace:Pi,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Ke&&(s.r=pn(s.r),s.g=pn(s.g),s.b=pn(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Ke&&(s.r=Si(s.r),s.g=Si(s.g),s.b=Si(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bn?Gs:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function pn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Si(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Ha=[.64,.33,.3,.6,.15,.06],Ga=[.2126,.7152,.0722],Va=[.3127,.329],Wa=new De().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xa=new De().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Xe.define({[Pi]:{primaries:Ha,whitePoint:Va,transfer:Gs,toXYZ:Wa,fromXYZ:Xa,luminanceCoefficients:Ga,workingColorSpaceConfig:{unpackColorSpace:Ft},outputColorSpaceConfig:{drawingBufferColorSpace:Ft}},[Ft]:{primaries:Ha,whitePoint:Va,transfer:Ke,toXYZ:Wa,fromXYZ:Xa,luminanceCoefficients:Ga,outputColorSpaceConfig:{drawingBufferColorSpace:Ft}}});let ti;class bl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ti===void 0&&(ti=Fs("canvas")),ti.width=e.width,ti.height=e.height;const n=ti.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ti}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Fs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=pn(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(pn(t[n]/255)*255):t[n]=pn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Tl=0;class uc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Tl++}),this.uuid=Rn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push($s(i[a].image)):r.push($s(i[a]))}else r=$s(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function $s(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?bl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Al=0;class Tt extends Li{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,n=qn,i=qn,r=Yt,a=Yn,o=jt,c=mn,l=Tt.DEFAULT_ANISOTROPY,h=bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Al++}),this.uuid=Rn(),this.name="",this.source=new uc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Fe(0,0),this.repeat=new Fe(1,1),this.center=new Fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new De,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ko)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Or:e.x=e.x-Math.floor(e.x);break;case qn:e.x=e.x<0?0:1;break;case Br:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Or:e.y=e.y-Math.floor(e.y);break;case qn:e.y=e.y<0?0:1;break;case Br:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=Ko;Tt.DEFAULT_ANISOTROPY=1;class ht{constructor(e=0,t=0,n=0,i=1){ht.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],h=c[4],d=c[8],f=c[1],m=c[5],g=c[9],_=c[2],p=c[6],u=c[10];if(Math.abs(h-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(l+1)/2,x=(m+1)/2,F=(u+1)/2,A=(h+f)/4,T=(d+_)/4,N=(g+p)/4;return w>x&&w>F?w<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(w),i=A/n,r=T/n):x>F?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=A/i,r=N/i):F<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(F),n=T/r,i=N/r),this.set(n,i,r,t),this}let b=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(p-g)/b,this.y=(d-_)/b,this.z=(f-h)/b,this.w=Math.acos((l+m+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rl extends Li{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Tt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new uc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kn extends Rl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class dc extends Tt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Cl extends Tt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ki{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3];const f=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(d!==_||c!==f||l!==m||h!==g){let p=1-o;const u=c*f+l*m+h*g+d*_,b=u>=0?1:-1,w=1-u*u;if(w>Number.EPSILON){const F=Math.sqrt(w),A=Math.atan2(F,u*b);p=Math.sin(p*A)/F,o=Math.sin(o*A)/F}const x=o*b;if(c=c*p+f*x,l=l*p+m*x,h=h*p+g*x,d=d*p+_*x,p===1-o){const F=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=F,l*=F,h*=F,d*=F}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return e[t]=o*g+h*d+c*m-l*f,e[t+1]=c*g+h*f+l*d-o*m,e[t+2]=l*g+h*m+o*f-c*d,e[t+3]=h*g-o*d-c*f-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),d=o(r/2),f=c(n/2),m=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=f*h*d+l*m*g,this._y=l*m*d-f*h*g,this._z=l*h*g+f*m*d,this._w=l*h*d-f*m*g;break;case"YXZ":this._x=f*h*d+l*m*g,this._y=l*m*d-f*h*g,this._z=l*h*g-f*m*d,this._w=l*h*d+f*m*g;break;case"ZXY":this._x=f*h*d-l*m*g,this._y=l*m*d+f*h*g,this._z=l*h*g+f*m*d,this._w=l*h*d-f*m*g;break;case"ZYX":this._x=f*h*d-l*m*g,this._y=l*m*d+f*h*g,this._z=l*h*g-f*m*d,this._w=l*h*d+f*m*g;break;case"YZX":this._x=f*h*d+l*m*g,this._y=l*m*d+f*h*g,this._z=l*h*g-f*m*d,this._w=l*h*d-f*m*g;break;case"XZY":this._x=f*h*d-l*m*g,this._y=l*m*d-f*h*g,this._z=l*h*g+f*m*d,this._w=l*h*d+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],f=n+o+d;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(a-i)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(h-c)/m,this._x=.25*m,this._y=(i+a)/m,this._z=(r+l)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(r-l)/m,this._x=(i+a)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(a-i)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Rt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),d=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=i+c*d+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ks.copy(this).projectOnVector(e),this.sub(Ks)}reflect(e){return this.sub(Ks.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ks=new L,qa=new Ki;class Ji{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Wt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Wt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Wt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Wt):Wt.fromBufferAttribute(r,a),Wt.applyMatrix4(e.matrixWorld),this.expandByPoint(Wt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ns.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ns.copy(n.boundingBox)),ns.applyMatrix4(e.matrixWorld),this.union(ns)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Wt),Wt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ni),is.subVectors(this.max,Ni),ni.subVectors(e.a,Ni),ii.subVectors(e.b,Ni),si.subVectors(e.c,Ni),vn.subVectors(ii,ni),xn.subVectors(si,ii),Nn.subVectors(ni,si);let t=[0,-vn.z,vn.y,0,-xn.z,xn.y,0,-Nn.z,Nn.y,vn.z,0,-vn.x,xn.z,0,-xn.x,Nn.z,0,-Nn.x,-vn.y,vn.x,0,-xn.y,xn.x,0,-Nn.y,Nn.x,0];return!Js(t,ni,ii,si,is)||(t=[1,0,0,0,1,0,0,0,1],!Js(t,ni,ii,si,is))?!1:(ss.crossVectors(vn,xn),t=[ss.x,ss.y,ss.z],Js(t,ni,ii,si,is))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(an[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),an[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),an[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),an[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),an[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),an[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),an[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),an[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(an),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const an=[new L,new L,new L,new L,new L,new L,new L,new L],Wt=new L,ns=new Ji,ni=new L,ii=new L,si=new L,vn=new L,xn=new L,Nn=new L,Ni=new L,is=new L,ss=new L,Fn=new L;function Js(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Fn.fromArray(s,r);const o=i.x*Math.abs(Fn.x)+i.y*Math.abs(Fn.y)+i.z*Math.abs(Fn.z),c=e.dot(Fn),l=t.dot(Fn),h=n.dot(Fn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Pl=new Ji,Fi=new L,Qs=new L;class Vs{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Pl.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fi.subVectors(e,this.center);const t=Fi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Fi,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fi.copy(e.center).add(Qs)),this.expandByPoint(Fi.copy(e.center).sub(Qs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const on=new L,er=new L,rs=new L,Mn=new L,tr=new L,as=new L,nr=new L;class fc{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,on)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=on.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(on.copy(this.origin).addScaledVector(this.direction,t),on.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){er.copy(e).add(t).multiplyScalar(.5),rs.copy(t).sub(e).normalize(),Mn.copy(this.origin).sub(er);const r=e.distanceTo(t)*.5,a=-this.direction.dot(rs),o=Mn.dot(this.direction),c=-Mn.dot(rs),l=Mn.lengthSq(),h=Math.abs(1-a*a);let d,f,m,g;if(h>0)if(d=a*c-o,f=a*o-c,g=r*h,d>=0)if(f>=-g)if(f<=g){const _=1/h;d*=_,f*=_,m=d*(d+a*f+2*o)+f*(a*d+f+2*c)+l}else f=r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-c),r),m=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-r,-c),r),m=f*(f+2*c)+l):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-c),r),m=-d*d+f*(f+2*c)+l);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(er).addScaledVector(rs,f),m}intersectSphere(e,t){on.subVectors(e.center,this.origin);const n=on.dot(this.direction),i=on.dot(on)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,on)!==null}intersectTriangle(e,t,n,i,r){tr.subVectors(t,e),as.subVectors(n,e),nr.crossVectors(tr,as);let a=this.direction.dot(nr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Mn.subVectors(this.origin,e);const c=o*this.direction.dot(as.crossVectors(Mn,as));if(c<0)return null;const l=o*this.direction.dot(tr.cross(Mn));if(l<0||c+l>a)return null;const h=-o*Mn.dot(nr);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,i,r,a,o,c,l,h,d,f,m,g,_,p){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,d,f,m,g,_,p)}set(e,t,n,i,r,a,o,c,l,h,d,f,m,g,_,p){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=i,u[1]=r,u[5]=a,u[9]=o,u[13]=c,u[2]=l,u[6]=h,u[10]=d,u[14]=f,u[3]=m,u[7]=g,u[11]=_,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/ri.setFromMatrixColumn(e,0).length(),r=1/ri.setFromMatrixColumn(e,1).length(),a=1/ri.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const f=a*h,m=a*d,g=o*h,_=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=m+g*l,t[5]=f-_*l,t[9]=-o*c,t[2]=_-f*l,t[6]=g+m*l,t[10]=a*c}else if(e.order==="YXZ"){const f=c*h,m=c*d,g=l*h,_=l*d;t[0]=f+_*o,t[4]=g*o-m,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=m*o-g,t[6]=_+f*o,t[10]=a*c}else if(e.order==="ZXY"){const f=c*h,m=c*d,g=l*h,_=l*d;t[0]=f-_*o,t[4]=-a*d,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*h,t[9]=_-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const f=a*h,m=a*d,g=o*h,_=o*d;t[0]=c*h,t[4]=g*l-m,t[8]=f*l+_,t[1]=c*d,t[5]=_*l+f,t[9]=m*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const f=a*c,m=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-f*d,t[8]=g*d+m,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*d+g,t[10]=f-_*d}else if(e.order==="XZY"){const f=a*c,m=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=f*d+_,t[5]=a*h,t[9]=m*d-g,t[2]=g*d-m,t[6]=o*h,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ll,e,Il)}lookAt(e,t,n){const i=this.elements;return Lt.subVectors(e,t),Lt.lengthSq()===0&&(Lt.z=1),Lt.normalize(),yn.crossVectors(n,Lt),yn.lengthSq()===0&&(Math.abs(n.z)===1?Lt.x+=1e-4:Lt.z+=1e-4,Lt.normalize(),yn.crossVectors(n,Lt)),yn.normalize(),os.crossVectors(Lt,yn),i[0]=yn.x,i[4]=os.x,i[8]=Lt.x,i[1]=yn.y,i[5]=os.y,i[9]=Lt.y,i[2]=yn.z,i[6]=os.z,i[10]=Lt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],f=n[9],m=n[13],g=n[2],_=n[6],p=n[10],u=n[14],b=n[3],w=n[7],x=n[11],F=n[15],A=i[0],T=i[4],N=i[8],S=i[12],y=i[1],R=i[5],H=i[9],k=i[13],q=i[2],K=i[6],X=i[10],ee=i[14],W=i[3],ae=i[7],de=i[11],Se=i[15];return r[0]=a*A+o*y+c*q+l*W,r[4]=a*T+o*R+c*K+l*ae,r[8]=a*N+o*H+c*X+l*de,r[12]=a*S+o*k+c*ee+l*Se,r[1]=h*A+d*y+f*q+m*W,r[5]=h*T+d*R+f*K+m*ae,r[9]=h*N+d*H+f*X+m*de,r[13]=h*S+d*k+f*ee+m*Se,r[2]=g*A+_*y+p*q+u*W,r[6]=g*T+_*R+p*K+u*ae,r[10]=g*N+_*H+p*X+u*de,r[14]=g*S+_*k+p*ee+u*Se,r[3]=b*A+w*y+x*q+F*W,r[7]=b*T+w*R+x*K+F*ae,r[11]=b*N+w*H+x*X+F*de,r[15]=b*S+w*k+x*ee+F*Se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],f=e[10],m=e[14],g=e[3],_=e[7],p=e[11],u=e[15];return g*(+r*c*d-i*l*d-r*o*f+n*l*f+i*o*m-n*c*m)+_*(+t*c*m-t*l*f+r*a*f-i*a*m+i*l*h-r*c*h)+p*(+t*l*d-t*o*m-r*a*d+n*a*m+r*o*h-n*l*h)+u*(-i*o*h-t*c*d+t*o*f+i*a*d-n*a*f+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],f=e[10],m=e[11],g=e[12],_=e[13],p=e[14],u=e[15],b=d*p*l-_*f*l+_*c*m-o*p*m-d*c*u+o*f*u,w=g*f*l-h*p*l-g*c*m+a*p*m+h*c*u-a*f*u,x=h*_*l-g*d*l+g*o*m-a*_*m-h*o*u+a*d*u,F=g*d*c-h*_*c-g*o*f+a*_*f+h*o*p-a*d*p,A=t*b+n*w+i*x+r*F;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=b*T,e[1]=(_*f*r-d*p*r-_*i*m+n*p*m+d*i*u-n*f*u)*T,e[2]=(o*p*r-_*c*r+_*i*l-n*p*l-o*i*u+n*c*u)*T,e[3]=(d*c*r-o*f*r-d*i*l+n*f*l+o*i*m-n*c*m)*T,e[4]=w*T,e[5]=(h*p*r-g*f*r+g*i*m-t*p*m-h*i*u+t*f*u)*T,e[6]=(g*c*r-a*p*r-g*i*l+t*p*l+a*i*u-t*c*u)*T,e[7]=(a*f*r-h*c*r+h*i*l-t*f*l-a*i*m+t*c*m)*T,e[8]=x*T,e[9]=(g*d*r-h*_*r-g*n*m+t*_*m+h*n*u-t*d*u)*T,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*u+t*o*u)*T,e[11]=(h*o*r-a*d*r-h*n*l+t*d*l+a*n*m-t*o*m)*T,e[12]=F*T,e[13]=(h*_*i-g*d*i+g*n*f-t*_*f-h*n*p+t*d*p)*T,e[14]=(g*o*i-a*_*i-g*n*c+t*_*c+a*n*p-t*o*p)*T,e[15]=(a*d*i-h*o*i+h*n*c-t*d*c-a*n*f+t*o*f)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,d=o+o,f=r*l,m=r*h,g=r*d,_=a*h,p=a*d,u=o*d,b=c*l,w=c*h,x=c*d,F=n.x,A=n.y,T=n.z;return i[0]=(1-(_+u))*F,i[1]=(m+x)*F,i[2]=(g-w)*F,i[3]=0,i[4]=(m-x)*A,i[5]=(1-(f+u))*A,i[6]=(p+b)*A,i[7]=0,i[8]=(g+w)*T,i[9]=(p-b)*T,i[10]=(1-(f+_))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=ri.set(i[0],i[1],i[2]).length();const a=ri.set(i[4],i[5],i[6]).length(),o=ri.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Xt.copy(this);const l=1/r,h=1/a,d=1/o;return Xt.elements[0]*=l,Xt.elements[1]*=l,Xt.elements[2]*=l,Xt.elements[4]*=h,Xt.elements[5]*=h,Xt.elements[6]*=h,Xt.elements[8]*=d,Xt.elements[9]*=d,Xt.elements[10]*=d,t.setFromRotationMatrix(Xt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=fn){const c=this.elements,l=2*r/(t-e),h=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let m,g;if(o===fn)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ns)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=fn){const c=this.elements,l=1/(t-e),h=1/(n-i),d=1/(a-r),f=(t+e)*l,m=(n+i)*h;let g,_;if(o===fn)g=(a+r)*d,_=-2*d;else if(o===Ns)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ri=new L,Xt=new rt,Ll=new L(0,0,0),Il=new L(1,1,1),yn=new L,os=new L,Lt=new L,Ya=new rt,ja=new Ki;class Ht{constructor(e=0,t=0,n=0,i=Ht.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],d=i[2],f=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(Rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Rt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Rt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Rt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ya.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ya,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ja.setFromEuler(this),this.setFromQuaternion(ja,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ht.DEFAULT_ORDER="XYZ";class pc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Dl=0;const Za=new L,ai=new Ki,cn=new rt,cs=new L,Oi=new L,Ul=new L,Nl=new Ki,$a=new L(1,0,0),Ka=new L(0,1,0),Ja=new L(0,0,1),Qa={type:"added"},Fl={type:"removed"},oi={type:"childadded",child:null},ir={type:"childremoved",child:null};class ft extends Li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dl++}),this.uuid=Rn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new L,t=new Ht,n=new Ki,i=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new rt},normalMatrix:{value:new De}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.multiply(ai),this}rotateOnWorldAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.premultiply(ai),this}rotateX(e){return this.rotateOnAxis($a,e)}rotateY(e){return this.rotateOnAxis(Ka,e)}rotateZ(e){return this.rotateOnAxis(Ja,e)}translateOnAxis(e,t){return Za.copy(e).applyQuaternion(this.quaternion),this.position.add(Za.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($a,e)}translateY(e){return this.translateOnAxis(Ka,e)}translateZ(e){return this.translateOnAxis(Ja,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(cn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?cs.copy(e):cs.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Oi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cn.lookAt(Oi,cs,this.up):cn.lookAt(cs,Oi,this.up),this.quaternion.setFromRotationMatrix(cn),i&&(cn.extractRotation(i.matrixWorld),ai.setFromRotationMatrix(cn),this.quaternion.premultiply(ai.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qa),oi.child=e,this.dispatchEvent(oi),oi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fl),ir.child=e,this.dispatchEvent(ir),ir.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),cn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),cn.multiply(e.parent.matrixWorld)),e.applyMatrix4(cn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qa),oi.child=e,this.dispatchEvent(oi),oi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,e,Ul),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,Nl,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),f=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ft.DEFAULT_UP=new L(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qt=new L,ln=new L,sr=new L,hn=new L,ci=new L,li=new L,eo=new L,rr=new L,ar=new L,or=new L,cr=new ht,lr=new ht,hr=new ht;class kt{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),qt.subVectors(e,t),i.cross(qt);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){qt.subVectors(i,t),ln.subVectors(n,t),sr.subVectors(e,t);const a=qt.dot(qt),o=qt.dot(ln),c=qt.dot(sr),l=ln.dot(ln),h=ln.dot(sr),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const f=1/d,m=(l*c-o*h)*f,g=(a*h-o*c)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,hn)===null?!1:hn.x>=0&&hn.y>=0&&hn.x+hn.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,hn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,hn.x),c.addScaledVector(a,hn.y),c.addScaledVector(o,hn.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return cr.setScalar(0),lr.setScalar(0),hr.setScalar(0),cr.fromBufferAttribute(e,t),lr.fromBufferAttribute(e,n),hr.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(cr,r.x),a.addScaledVector(lr,r.y),a.addScaledVector(hr,r.z),a}static isFrontFacing(e,t,n,i){return qt.subVectors(n,t),ln.subVectors(e,t),qt.cross(ln).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qt.subVectors(this.c,this.b),ln.subVectors(this.a,this.b),qt.cross(ln).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return kt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return kt.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;ci.subVectors(i,n),li.subVectors(r,n),rr.subVectors(e,n);const c=ci.dot(rr),l=li.dot(rr);if(c<=0&&l<=0)return t.copy(n);ar.subVectors(e,i);const h=ci.dot(ar),d=li.dot(ar);if(h>=0&&d<=h)return t.copy(i);const f=c*d-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(ci,a);or.subVectors(e,r);const m=ci.dot(or),g=li.dot(or);if(g>=0&&m<=g)return t.copy(r);const _=m*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(li,o);const p=h*g-m*d;if(p<=0&&d-h>=0&&m-g>=0)return eo.subVectors(r,i),o=(d-h)/(d-h+(m-g)),t.copy(i).addScaledVector(eo,o);const u=1/(p+_+f);return a=_*u,o=f*u,t.copy(n).addScaledVector(ci,a).addScaledVector(li,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const mc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sn={h:0,s:0,l:0},ls={h:0,s:0,l:0};function ur(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Oe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xe.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Xe.workingColorSpace){if(e=Ml(e,1),t=Rt(t,0,1),n=Rt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ur(a,r,e+1/3),this.g=ur(a,r,e),this.b=ur(a,r,e-1/3)}return Xe.toWorkingColorSpace(this,i),this}setStyle(e,t=Ft){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ft){const n=mc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=pn(e.r),this.g=pn(e.g),this.b=pn(e.b),this}copyLinearToSRGB(e){return this.r=Si(e.r),this.g=Si(e.g),this.b=Si(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ft){return Xe.fromWorkingColorSpace(Mt.copy(this),e),Math.round(Rt(Mt.r*255,0,255))*65536+Math.round(Rt(Mt.g*255,0,255))*256+Math.round(Rt(Mt.b*255,0,255))}getHexString(e=Ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.fromWorkingColorSpace(Mt.copy(this),t);const n=Mt.r,i=Mt.g,r=Mt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(i-r)/d+(i<r?6:0);break;case i:c=(r-n)/d+2;break;case r:c=(n-i)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Xe.workingColorSpace){return Xe.fromWorkingColorSpace(Mt.copy(this),t),e.r=Mt.r,e.g=Mt.g,e.b=Mt.b,e}getStyle(e=Ft){Xe.fromWorkingColorSpace(Mt.copy(this),e);const t=Mt.r,n=Mt.g,i=Mt.b;return e!==Ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Sn),this.setHSL(Sn.h+e,Sn.s+t,Sn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Sn),e.getHSL(ls);const n=js(Sn.h,ls.h,t),i=js(Sn.s,ls.s,t),r=js(Sn.l,ls.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Mt=new Oe;Oe.NAMES=mc;let Ol=0;class Jn extends Li{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ol++}),this.uuid=Rn(),this.name="",this.blending=Mi,this.side=Pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Tr,this.blendDst=Ar,this.blendEquation=Wn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Ei,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ba,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ei,this.stencilZFail=ei,this.stencilZPass=ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Mi&&(n.blending=this.blending),this.side!==Pn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Tr&&(n.blendSrc=this.blendSrc),this.blendDst!==Ar&&(n.blendDst=this.blendDst),this.blendEquation!==Wn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ei&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ba&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ln extends Jn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ht,this.combine=Zo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dt=new L,hs=new Fe;class $t{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ua,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)hs.fromBufferAttribute(this,t),hs.applyMatrix3(e),this.setXY(t,hs.x,hs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix3(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix4(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyNormalMatrix(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.transformDirection(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=tn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=tn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=tn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=tn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array),r=Je(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ua&&(e.usage=this.usage),e}}class gc extends $t{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class _c extends $t{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ct extends $t{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Bl=0;const Nt=new rt,dr=new ft,hi=new L,It=new Ji,Bi=new Ji,gt=new L;class wt extends Li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bl++}),this.uuid=Rn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hc(e)?_c:gc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new De().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Nt.makeRotationFromQuaternion(e),this.applyMatrix4(Nt),this}rotateX(e){return Nt.makeRotationX(e),this.applyMatrix4(Nt),this}rotateY(e){return Nt.makeRotationY(e),this.applyMatrix4(Nt),this}rotateZ(e){return Nt.makeRotationZ(e),this.applyMatrix4(Nt),this}translate(e,t,n){return Nt.makeTranslation(e,t,n),this.applyMatrix4(Nt),this}scale(e,t,n){return Nt.makeScale(e,t,n),this.applyMatrix4(Nt),this}lookAt(e){return dr.lookAt(e),dr.updateMatrix(),this.applyMatrix4(dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hi).negate(),this.translate(hi.x,hi.y,hi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ct(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ji);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];It.setFromBufferAttribute(r),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,It.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,It.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(It.min),this.boundingBox.expandByPoint(It.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(It.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Bi.setFromBufferAttribute(o),this.morphTargetsRelative?(gt.addVectors(It.min,Bi.min),It.expandByPoint(gt),gt.addVectors(It.max,Bi.max),It.expandByPoint(gt)):(It.expandByPoint(Bi.min),It.expandByPoint(Bi.max))}It.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)gt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(gt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)gt.fromBufferAttribute(o,l),c&&(hi.fromBufferAttribute(e,l),gt.add(hi)),i=Math.max(i,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $t(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let N=0;N<n.count;N++)o[N]=new L,c[N]=new L;const l=new L,h=new L,d=new L,f=new Fe,m=new Fe,g=new Fe,_=new L,p=new L;function u(N,S,y){l.fromBufferAttribute(n,N),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,y),f.fromBufferAttribute(r,N),m.fromBufferAttribute(r,S),g.fromBufferAttribute(r,y),h.sub(l),d.sub(l),m.sub(f),g.sub(f);const R=1/(m.x*g.y-g.x*m.y);isFinite(R)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(R),p.copy(d).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(R),o[N].add(_),o[S].add(_),o[y].add(_),c[N].add(p),c[S].add(p),c[y].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let N=0,S=b.length;N<S;++N){const y=b[N],R=y.start,H=y.count;for(let k=R,q=R+H;k<q;k+=3)u(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const w=new L,x=new L,F=new L,A=new L;function T(N){F.fromBufferAttribute(i,N),A.copy(F);const S=o[N];w.copy(S),w.sub(F.multiplyScalar(F.dot(S))).normalize(),x.crossVectors(A,S);const R=x.dot(c[N])<0?-1:1;a.setXYZW(N,w.x,w.y,w.z,R)}for(let N=0,S=b.length;N<S;++N){const y=b[N],R=y.start,H=y.count;for(let k=R,q=R+H;k<q;k+=3)T(e.getX(k+0)),T(e.getX(k+1)),T(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $t(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const i=new L,r=new L,a=new L,o=new L,c=new L,l=new L,h=new L,d=new L;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,m=t.count;f<m;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,d=o.normalized,f=new l.constructor(c.length*h);let m=0,g=0;for(let _=0,p=c.length;_<p;_++){o.isInterleavedBufferAttribute?m=c[_]*o.data.stride+o.offset:m=c[_]*h;for(let u=0;u<h;u++)f[g++]=l[m++]}return new $t(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wt,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const f=l[h],m=e(f,n);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,f=l.length;d<f;d++){const m=l[d];h.push(m.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],d=r[l];for(let f=0,m=d.length;f<m;f++)h.push(d[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const to=new rt,On=new fc,us=new Vs,no=new L,ds=new L,fs=new L,ps=new L,fr=new L,ms=new L,io=new L,gs=new L;class C extends ft{constructor(e=new wt,t=new Ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){ms.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(fr.fromBufferAttribute(d,e),a?ms.addScaledVector(fr,h):ms.addScaledVector(fr.sub(t),h))}t.add(ms)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),us.copy(n.boundingSphere),us.applyMatrix4(r),On.copy(e.ray).recast(e.near),!(us.containsPoint(On.origin)===!1&&(On.intersectSphere(us,no)===null||On.origin.distanceToSquared(no)>(e.far-e.near)**2))&&(to.copy(r).invert(),On.copy(e.ray).applyMatrix4(to),!(n.boundingBox!==null&&On.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,On)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=a[p.materialIndex],b=Math.max(p.start,m.start),w=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let x=b,F=w;x<F;x+=3){const A=o.getX(x),T=o.getX(x+1),N=o.getX(x+2);i=_s(this,u,e,n,l,h,d,A,T,N),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const b=o.getX(p),w=o.getX(p+1),x=o.getX(p+2);i=_s(this,a,e,n,l,h,d,b,w,x),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=a[p.materialIndex],b=Math.max(p.start,m.start),w=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let x=b,F=w;x<F;x+=3){const A=x,T=x+1,N=x+2;i=_s(this,u,e,n,l,h,d,A,T,N),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const b=p,w=p+1,x=p+2;i=_s(this,a,e,n,l,h,d,b,w,x),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function zl(s,e,t,n,i,r,a,o){let c;if(e.side===Ct?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===Pn,o),c===null)return null;gs.copy(o),gs.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(gs);return l<t.near||l>t.far?null:{distance:l,point:gs.clone(),object:s}}function _s(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,ds),s.getVertexPosition(c,fs),s.getVertexPosition(l,ps);const h=zl(s,e,t,n,ds,fs,ps,io);if(h){const d=new L;kt.getBarycoord(io,ds,fs,ps,d),i&&(h.uv=kt.getInterpolatedAttribute(i,o,c,l,d,new Fe)),r&&(h.uv1=kt.getInterpolatedAttribute(r,o,c,l,d,new Fe)),a&&(h.normal=kt.getInterpolatedAttribute(a,o,c,l,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new L,materialIndex:0};kt.getNormal(ds,fs,ps,f.normal),h.face=f,h.barycoord=d}return h}class St extends wt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new ct(l,3)),this.setAttribute("normal",new ct(h,3)),this.setAttribute("uv",new ct(d,2));function g(_,p,u,b,w,x,F,A,T,N,S){const y=x/T,R=F/N,H=x/2,k=F/2,q=A/2,K=T+1,X=N+1;let ee=0,W=0;const ae=new L;for(let de=0;de<X;de++){const Se=de*R-k;for(let Be=0;Be<K;Be++){const Qe=Be*y-H;ae[_]=Qe*b,ae[p]=Se*w,ae[u]=q,l.push(ae.x,ae.y,ae.z),ae[_]=0,ae[p]=0,ae[u]=A>0?1:-1,h.push(ae.x,ae.y,ae.z),d.push(Be/T),d.push(1-de/N),ee+=1}}for(let de=0;de<N;de++)for(let Se=0;Se<T;Se++){const Be=f+Se+K*de,Qe=f+Se+K*(de+1),j=f+(Se+1)+K*(de+1),ie=f+(Se+1)+K*de;c.push(Be,Qe,ie),c.push(Qe,j,ie),W+=6}o.addGroup(m,W,S),m+=W,f+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new St(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ci(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function bt(s){const e={};for(let t=0;t<s.length;t++){const n=Ci(s[t]);for(const i in n)e[i]=n[i]}return e}function kl(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function vc(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}const Hl={clone:Ci,merge:bt};var Gl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vl=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class In extends Jn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gl,this.fragmentShader=Vl,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ci(e.uniforms),this.uniformsGroups=kl(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class xc extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=fn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const wn=new L,so=new Fe,ro=new Fe;class Ot extends xc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=da*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ys*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return da*2*Math.atan(Math.tan(Ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(wn.x,wn.y).multiplyScalar(-e/wn.z),wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(wn.x,wn.y).multiplyScalar(-e/wn.z)}getViewSize(e,t){return this.getViewBounds(e,so,ro),t.subVectors(ro,so)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ys*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ui=-90,di=1;class Wl extends ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ot(ui,di,e,t);i.layers=this.layers,this.add(i);const r=new Ot(ui,di,e,t);r.layers=this.layers,this.add(r);const a=new Ot(ui,di,e,t);a.layers=this.layers,this.add(a);const o=new Ot(ui,di,e,t);o.layers=this.layers,this.add(o);const c=new Ot(ui,di,e,t);c.layers=this.layers,this.add(c);const l=new Ot(ui,di,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===fn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ns)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(d,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Mc extends Tt{constructor(e,t,n,i,r,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:bi,super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Xl extends Kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Mc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Yt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new St(5,5,5),r=new In({name:"CubemapFromEquirect",uniforms:Ci(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ct,blending:Tn});r.uniforms.tEquirect.value=t;const a=new C(i,r),o=t.minFilter;return t.minFilter===Yn&&(t.minFilter=Yt),new Wl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}const pr=new L,ql=new L,Yl=new De;class Gn{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=pr.subVectors(n,t).cross(ql.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(pr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Yl.getNormalMatrix(e),i=this.coplanarPoint(pr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bn=new Vs,vs=new L;class Sa{constructor(e=new Gn,t=new Gn,n=new Gn,i=new Gn,r=new Gn,a=new Gn){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=fn){const n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],c=i[3],l=i[4],h=i[5],d=i[6],f=i[7],m=i[8],g=i[9],_=i[10],p=i[11],u=i[12],b=i[13],w=i[14],x=i[15];if(n[0].setComponents(c-r,f-l,p-m,x-u).normalize(),n[1].setComponents(c+r,f+l,p+m,x+u).normalize(),n[2].setComponents(c+a,f+h,p+g,x+b).normalize(),n[3].setComponents(c-a,f-h,p-g,x-b).normalize(),n[4].setComponents(c-o,f-d,p-_,x-w).normalize(),t===fn)n[5].setComponents(c+o,f+d,p+_,x+w).normalize();else if(t===Ns)n[5].setComponents(o,d,_,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bn)}intersectsSprite(e){return Bn.center.set(0,0,0),Bn.radius=.7071067811865476,Bn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(vs.x=i.normal.x>0?e.max.x:e.min.x,vs.y=i.normal.y>0?e.max.y:e.min.y,vs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(vs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function yc(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function jl(s){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,d=l.byteLength,f=s.createBuffer();s.bindBuffer(c,f),s.bufferData(c,l,h),o.onUploadCallback();let m;if(l instanceof Float32Array)m=s.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=s.HALF_FLOAT:m=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=s.SHORT;else if(l instanceof Uint32Array)m=s.UNSIGNED_INT;else if(l instanceof Int32Array)m=s.INT;else if(l instanceof Int8Array)m=s.BYTE;else if(l instanceof Uint8Array)m=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(s.bindBuffer(l,o),d.length===0)s.bufferSubData(l,0,h);else{d.sort((m,g)=>m.start-g.start);let f=0;for(let m=1;m<d.length;m++){const g=d[f],_=d[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,d[f]=_)}d.length=f+1;for(let m=0,g=d.length;m<g;m++){const _=d[m];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}class nn extends wt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,d=e/o,f=t/c,m=[],g=[],_=[],p=[];for(let u=0;u<h;u++){const b=u*f-a;for(let w=0;w<l;w++){const x=w*d-r;g.push(x,-b,0),_.push(0,0,1),p.push(w/o),p.push(1-u/c)}}for(let u=0;u<c;u++)for(let b=0;b<o;b++){const w=b+l*u,x=b+l*(u+1),F=b+1+l*(u+1),A=b+1+l*u;m.push(w,x,A),m.push(x,F,A)}this.setIndex(m),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(_,3)),this.setAttribute("uv",new ct(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Zl=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$l=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Kl=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jl=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ql=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,eh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,th=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ih=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,sh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ah=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,oh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ch=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,hh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,uh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ph=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_h=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,vh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Mh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,yh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Eh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Th=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ah=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Rh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ch=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ph=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ih=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Uh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Oh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kh=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Hh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Yh=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,jh=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Zh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$h=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kh=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jh=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qh=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,iu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,su=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ru=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,au=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ou=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hu=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,uu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,du=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_u=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,vu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Su=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Eu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Au=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ru=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pu=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Lu=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Iu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Du=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Uu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ou=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ku=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hu=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gu=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Vu=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Wu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Yu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ju=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zu=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$u=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ku=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ju=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ed=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,td=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,nd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,id=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,sd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ad=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,od=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ld=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ud=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,md=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,gd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_d=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vd=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Md=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sd=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,wd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ed=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bd=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Td=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ad=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ne={alphahash_fragment:Zl,alphahash_pars_fragment:$l,alphamap_fragment:Kl,alphamap_pars_fragment:Jl,alphatest_fragment:Ql,alphatest_pars_fragment:eh,aomap_fragment:th,aomap_pars_fragment:nh,batching_pars_vertex:ih,batching_vertex:sh,begin_vertex:rh,beginnormal_vertex:ah,bsdfs:oh,iridescence_fragment:ch,bumpmap_pars_fragment:lh,clipping_planes_fragment:hh,clipping_planes_pars_fragment:uh,clipping_planes_pars_vertex:dh,clipping_planes_vertex:fh,color_fragment:ph,color_pars_fragment:mh,color_pars_vertex:gh,color_vertex:_h,common:vh,cube_uv_reflection_fragment:xh,defaultnormal_vertex:Mh,displacementmap_pars_vertex:yh,displacementmap_vertex:Sh,emissivemap_fragment:wh,emissivemap_pars_fragment:Eh,colorspace_fragment:bh,colorspace_pars_fragment:Th,envmap_fragment:Ah,envmap_common_pars_fragment:Rh,envmap_pars_fragment:Ch,envmap_pars_vertex:Ph,envmap_physical_pars_fragment:Hh,envmap_vertex:Lh,fog_vertex:Ih,fog_pars_vertex:Dh,fog_fragment:Uh,fog_pars_fragment:Nh,gradientmap_pars_fragment:Fh,lightmap_pars_fragment:Oh,lights_lambert_fragment:Bh,lights_lambert_pars_fragment:zh,lights_pars_begin:kh,lights_toon_fragment:Gh,lights_toon_pars_fragment:Vh,lights_phong_fragment:Wh,lights_phong_pars_fragment:Xh,lights_physical_fragment:qh,lights_physical_pars_fragment:Yh,lights_fragment_begin:jh,lights_fragment_maps:Zh,lights_fragment_end:$h,logdepthbuf_fragment:Kh,logdepthbuf_pars_fragment:Jh,logdepthbuf_pars_vertex:Qh,logdepthbuf_vertex:eu,map_fragment:tu,map_pars_fragment:nu,map_particle_fragment:iu,map_particle_pars_fragment:su,metalnessmap_fragment:ru,metalnessmap_pars_fragment:au,morphinstance_vertex:ou,morphcolor_vertex:cu,morphnormal_vertex:lu,morphtarget_pars_vertex:hu,morphtarget_vertex:uu,normal_fragment_begin:du,normal_fragment_maps:fu,normal_pars_fragment:pu,normal_pars_vertex:mu,normal_vertex:gu,normalmap_pars_fragment:_u,clearcoat_normal_fragment_begin:vu,clearcoat_normal_fragment_maps:xu,clearcoat_pars_fragment:Mu,iridescence_pars_fragment:yu,opaque_fragment:Su,packing:wu,premultiplied_alpha_fragment:Eu,project_vertex:bu,dithering_fragment:Tu,dithering_pars_fragment:Au,roughnessmap_fragment:Ru,roughnessmap_pars_fragment:Cu,shadowmap_pars_fragment:Pu,shadowmap_pars_vertex:Lu,shadowmap_vertex:Iu,shadowmask_pars_fragment:Du,skinbase_vertex:Uu,skinning_pars_vertex:Nu,skinning_vertex:Fu,skinnormal_vertex:Ou,specularmap_fragment:Bu,specularmap_pars_fragment:zu,tonemapping_fragment:ku,tonemapping_pars_fragment:Hu,transmission_fragment:Gu,transmission_pars_fragment:Vu,uv_pars_fragment:Wu,uv_pars_vertex:Xu,uv_vertex:qu,worldpos_vertex:Yu,background_vert:ju,background_frag:Zu,backgroundCube_vert:$u,backgroundCube_frag:Ku,cube_vert:Ju,cube_frag:Qu,depth_vert:ed,depth_frag:td,distanceRGBA_vert:nd,distanceRGBA_frag:id,equirect_vert:sd,equirect_frag:rd,linedashed_vert:ad,linedashed_frag:od,meshbasic_vert:cd,meshbasic_frag:ld,meshlambert_vert:hd,meshlambert_frag:ud,meshmatcap_vert:dd,meshmatcap_frag:fd,meshnormal_vert:pd,meshnormal_frag:md,meshphong_vert:gd,meshphong_frag:_d,meshphysical_vert:vd,meshphysical_frag:xd,meshtoon_vert:Md,meshtoon_frag:yd,points_vert:Sd,points_frag:wd,shadow_vert:Ed,shadow_frag:bd,sprite_vert:Td,sprite_frag:Ad},se={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new De}},envmap:{envMap:{value:null},envMapRotation:{value:new De},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new De}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new De}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new De},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new De},normalScale:{value:new Fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new De},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new De}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new De}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new De}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0},uvTransform:{value:new De}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new Fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}}},Jt={basic:{uniforms:bt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:bt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:bt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:bt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:bt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:bt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:bt([se.points,se.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:bt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:bt([se.common,se.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:bt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:bt([se.sprite,se.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new De},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new De}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:bt([se.common,se.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:bt([se.lights,se.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};Jt.physical={uniforms:bt([Jt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new De},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new De},clearcoatNormalScale:{value:new Fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new De},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new De},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new De},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new De},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new De},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new De},transmissionSamplerSize:{value:new Fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new De},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new De},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new De},anisotropyVector:{value:new Fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new De}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const xs={r:0,b:0,g:0},zn=new Ht,Rd=new rt;function Cd(s,e,t,n,i,r,a){const o=new Oe(0);let c=r===!0?0:1,l,h,d=null,f=0,m=null;function g(b){let w=b.isScene===!0?b.background:null;return w&&w.isTexture&&(w=(b.backgroundBlurriness>0?t:e).get(w)),w}function _(b){let w=!1;const x=g(b);x===null?u(o,c):x&&x.isColor&&(u(x,1),w=!0);const F=s.xr.getEnvironmentBlendMode();F==="additive"?n.buffers.color.setClear(0,0,0,1,a):F==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||w)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function p(b,w){const x=g(w);x&&(x.isCubeTexture||x.mapping===Hs)?(h===void 0&&(h=new C(new St(1,1,1),new In({name:"BackgroundCubeMaterial",uniforms:Ci(Jt.backgroundCube.uniforms),vertexShader:Jt.backgroundCube.vertexShader,fragmentShader:Jt.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(F,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),zn.copy(w.backgroundRotation),zn.x*=-1,zn.y*=-1,zn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(zn.y*=-1,zn.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Rd.makeRotationFromEuler(zn)),h.material.toneMapped=Xe.getTransfer(x.colorSpace)!==Ke,(d!==x||f!==x.version||m!==s.toneMapping)&&(h.material.needsUpdate=!0,d=x,f=x.version,m=s.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new C(new nn(2,2),new In({name:"BackgroundMaterial",uniforms:Ci(Jt.background.uniforms),vertexShader:Jt.background.vertexShader,fragmentShader:Jt.background.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Xe.getTransfer(x.colorSpace)!==Ke,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||f!==x.version||m!==s.toneMapping)&&(l.material.needsUpdate=!0,d=x,f=x.version,m=s.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function u(b,w){b.getRGB(xs,vc(s)),n.buffers.color.setClear(xs.r,xs.g,xs.b,w,a)}return{getClearColor:function(){return o},setClearColor:function(b,w=1){o.set(b),c=w,u(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,u(o,c)},render:_,addToRenderList:p}}function Pd(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,a=!1;function o(y,R,H,k,q){let K=!1;const X=d(k,H,R);r!==X&&(r=X,l(r.object)),K=m(y,k,H,q),K&&g(y,k,H,q),q!==null&&e.update(q,s.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,x(y,R,H,k),q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return s.createVertexArray()}function l(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function d(y,R,H){const k=H.wireframe===!0;let q=n[y.id];q===void 0&&(q={},n[y.id]=q);let K=q[R.id];K===void 0&&(K={},q[R.id]=K);let X=K[k];return X===void 0&&(X=f(c()),K[k]=X),X}function f(y){const R=[],H=[],k=[];for(let q=0;q<t;q++)R[q]=0,H[q]=0,k[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:H,attributeDivisors:k,object:y,attributes:{},index:null}}function m(y,R,H,k){const q=r.attributes,K=R.attributes;let X=0;const ee=H.getAttributes();for(const W in ee)if(ee[W].location>=0){const de=q[W];let Se=K[W];if(Se===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(Se=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(Se=y.instanceColor)),de===void 0||de.attribute!==Se||Se&&de.data!==Se.data)return!0;X++}return r.attributesNum!==X||r.index!==k}function g(y,R,H,k){const q={},K=R.attributes;let X=0;const ee=H.getAttributes();for(const W in ee)if(ee[W].location>=0){let de=K[W];de===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(de=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(de=y.instanceColor));const Se={};Se.attribute=de,de&&de.data&&(Se.data=de.data),q[W]=Se,X++}r.attributes=q,r.attributesNum=X,r.index=k}function _(){const y=r.newAttributes;for(let R=0,H=y.length;R<H;R++)y[R]=0}function p(y){u(y,0)}function u(y,R){const H=r.newAttributes,k=r.enabledAttributes,q=r.attributeDivisors;H[y]=1,k[y]===0&&(s.enableVertexAttribArray(y),k[y]=1),q[y]!==R&&(s.vertexAttribDivisor(y,R),q[y]=R)}function b(){const y=r.newAttributes,R=r.enabledAttributes;for(let H=0,k=R.length;H<k;H++)R[H]!==y[H]&&(s.disableVertexAttribArray(H),R[H]=0)}function w(y,R,H,k,q,K,X){X===!0?s.vertexAttribIPointer(y,R,H,q,K):s.vertexAttribPointer(y,R,H,k,q,K)}function x(y,R,H,k){_();const q=k.attributes,K=H.getAttributes(),X=R.defaultAttributeValues;for(const ee in K){const W=K[ee];if(W.location>=0){let ae=q[ee];if(ae===void 0&&(ee==="instanceMatrix"&&y.instanceMatrix&&(ae=y.instanceMatrix),ee==="instanceColor"&&y.instanceColor&&(ae=y.instanceColor)),ae!==void 0){const de=ae.normalized,Se=ae.itemSize,Be=e.get(ae);if(Be===void 0)continue;const Qe=Be.buffer,j=Be.type,ie=Be.bytesPerElement,xe=j===s.INT||j===s.UNSIGNED_INT||ae.gpuType===ga;if(ae.isInterleavedBufferAttribute){const oe=ae.data,Ae=oe.stride,Pe=ae.offset;if(oe.isInstancedInterleavedBuffer){for(let ze=0;ze<W.locationSize;ze++)u(W.location+ze,oe.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ze=0;ze<W.locationSize;ze++)p(W.location+ze);s.bindBuffer(s.ARRAY_BUFFER,Qe);for(let ze=0;ze<W.locationSize;ze++)w(W.location+ze,Se/W.locationSize,j,de,Ae*ie,(Pe+Se/W.locationSize*ze)*ie,xe)}else{if(ae.isInstancedBufferAttribute){for(let oe=0;oe<W.locationSize;oe++)u(W.location+oe,ae.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let oe=0;oe<W.locationSize;oe++)p(W.location+oe);s.bindBuffer(s.ARRAY_BUFFER,Qe);for(let oe=0;oe<W.locationSize;oe++)w(W.location+oe,Se/W.locationSize,j,de,Se*ie,Se/W.locationSize*oe*ie,xe)}}else if(X!==void 0){const de=X[ee];if(de!==void 0)switch(de.length){case 2:s.vertexAttrib2fv(W.location,de);break;case 3:s.vertexAttrib3fv(W.location,de);break;case 4:s.vertexAttrib4fv(W.location,de);break;default:s.vertexAttrib1fv(W.location,de)}}}}b()}function F(){N();for(const y in n){const R=n[y];for(const H in R){const k=R[H];for(const q in k)h(k[q].object),delete k[q];delete R[H]}delete n[y]}}function A(y){if(n[y.id]===void 0)return;const R=n[y.id];for(const H in R){const k=R[H];for(const q in k)h(k[q].object),delete k[q];delete R[H]}delete n[y.id]}function T(y){for(const R in n){const H=n[R];if(H[y.id]===void 0)continue;const k=H[y.id];for(const q in k)h(k[q].object),delete k[q];delete H[y.id]}}function N(){S(),a=!0,r!==i&&(r=i,l(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:N,resetDefaultState:S,dispose:F,releaseStatesOfGeometry:A,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:p,disableUnusedAttributes:b}}function Ld(s,e,t){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,d){d!==0&&(s.drawArraysInstanced(n,l,h,d),t.update(h,n,d))}function o(l,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let m=0;for(let g=0;g<d;g++)m+=h[g];t.update(m,n,1)}function c(l,h,d,f){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],h[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*f[_];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Id(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(T){return!(T!==jt&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const N=T===$i&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==mn&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==dn&&!N)}function c(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),u=s.getParameter(s.MAX_VERTEX_ATTRIBS),b=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),F=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:u,maxVertexUniforms:b,maxVaryings:w,maxFragmentUniforms:x,vertexTextures:F,maxSamples:A}}function Dd(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Gn,o=new De,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const m=d.length!==0||f||n!==0||i;return i=f,n=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=h(d,f,0)},this.setState=function(d,f,m){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,u=s.get(d);if(!i||g===null||g.length===0||r&&!p)r?h(null):l();else{const b=r?0:n,w=b*4;let x=u.clippingState||null;c.value=x,x=h(g,f,w,m);for(let F=0;F!==w;++F)x[F]=t[F];u.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,f,m,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const u=m+_*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<u)&&(p=new Float32Array(u));for(let w=0,x=m;w!==_;++w,x+=4)a.copy(d[w]).applyMatrix4(b,o),a.normal.toArray(p,x),p[x+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function Ud(s){let e=new WeakMap;function t(a,o){return o===Nr?a.mapping=bi:o===Fr&&(a.mapping=Ti),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Nr||o===Fr)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Xl(c.height);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Sc extends xc{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const vi=4,ao=[.125,.215,.35,.446,.526,.582],Xn=20,mr=new Sc,oo=new Oe;let gr=null,_r=0,vr=0,xr=!1;const Vn=(1+Math.sqrt(5))/2,fi=1/Vn,co=[new L(-Vn,fi,0),new L(Vn,fi,0),new L(-fi,0,Vn),new L(fi,0,Vn),new L(0,Vn,-fi),new L(0,Vn,fi),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class lo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){gr=this._renderer.getRenderTarget(),_r=this._renderer.getActiveCubeFace(),vr=this._renderer.getActiveMipmapLevel(),xr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(gr,_r,vr),this._renderer.xr.enabled=xr,e.scissorTest=!1,Ms(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bi||e.mapping===Ti?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),gr=this._renderer.getRenderTarget(),_r=this._renderer.getActiveCubeFace(),vr=this._renderer.getActiveMipmapLevel(),xr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:$i,format:jt,colorSpace:Pi,depthBuffer:!1},i=ho(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ho(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Nd(r)),this._blurMaterial=Fd(r,e,t)}return i}_compileMaterial(e){const t=new C(this._lodPlanes[0],e);this._renderer.compile(t,mr)}_sceneToCubeUV(e,t,n,i){const o=new Ot(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(oo),h.toneMapping=An,h.autoClear=!1;const m=new Ln({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1}),g=new C(new St,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(oo),_=!0);for(let u=0;u<6;u++){const b=u%3;b===0?(o.up.set(0,c[u],0),o.lookAt(l[u],0,0)):b===1?(o.up.set(0,0,c[u]),o.lookAt(0,l[u],0)):(o.up.set(0,c[u],0),o.lookAt(0,0,l[u]));const w=this._cubeSize;Ms(i,b*w,u>2?w:0,w,w),h.setRenderTarget(i),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===bi||e.mapping===Ti;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=fo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uo());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new C(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Ms(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,mr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=co[(i-r-1)%co.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new C(this._lodPlanes[i],l),f=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Xn-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):Xn;p>Xn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Xn}`);const u=[];let b=0;for(let T=0;T<Xn;++T){const N=T/_,S=Math.exp(-N*N/2);u.push(S),T===0?b+=S:T<p&&(b+=2*S)}for(let T=0;T<u.length;T++)u[T]=u[T]/b;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:w}=this;f.dTheta.value=g,f.mipInt.value=w-n;const x=this._sizeLods[i],F=3*x*(i>w-vi?i-w+vi:0),A=4*(this._cubeSize-x);Ms(t,F,A,3*x,2*x),c.setRenderTarget(t),c.render(d,mr)}}function Nd(s){const e=[],t=[],n=[];let i=s;const r=s-vi+1+ao.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>s-vi?c=ao[a-s+vi-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,d=1+l,f=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,_=3,p=2,u=1,b=new Float32Array(_*g*m),w=new Float32Array(p*g*m),x=new Float32Array(u*g*m);for(let A=0;A<m;A++){const T=A%3*2/3-1,N=A>2?0:-1,S=[T,N,0,T+2/3,N,0,T+2/3,N+1,0,T,N,0,T+2/3,N+1,0,T,N+1,0];b.set(S,_*g*A),w.set(f,p*g*A);const y=[A,A,A,A,A,A];x.set(y,u*g*A)}const F=new wt;F.setAttribute("position",new $t(b,_)),F.setAttribute("uv",new $t(w,p)),F.setAttribute("faceIndex",new $t(x,u)),e.push(F),i>vi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ho(s,e,t){const n=new Kn(s,e,t);return n.texture.mapping=Hs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ms(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Fd(s,e,t){const n=new Float32Array(Xn),i=new L(0,1,0);return new In({name:"SphericalGaussianBlur",defines:{n:Xn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function uo(){return new In({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function fo(){return new In({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function wa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Od(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Nr||c===Fr,h=c===bi||c===Ti;if(l||h){let d=e.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new lo(s)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const m=o.image;return l&&m&&m.height>0||h&&m&&i(m)?(t===null&&(t=new lo(s)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function i(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Bd(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Vi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function zd(s,e,t,n){const i={},r=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,u=_.length;p<u;p++)e.remove(_[p])}f.removeEventListener("dispose",a),delete i[f.id];const m=r.get(f);m&&(e.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,t.memory.geometries++),f}function c(d){const f=d.attributes;for(const g in f)e.update(f[g],s.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const _=m[g];for(let p=0,u=_.length;p<u;p++)e.update(_[p],s.ARRAY_BUFFER)}}function l(d){const f=[],m=d.index,g=d.attributes.position;let _=0;if(m!==null){const b=m.array;_=m.version;for(let w=0,x=b.length;w<x;w+=3){const F=b[w+0],A=b[w+1],T=b[w+2];f.push(F,A,A,T,T,F)}}else if(g!==void 0){const b=g.array;_=g.version;for(let w=0,x=b.length/3-1;w<x;w+=3){const F=w+0,A=w+1,T=w+2;f.push(F,A,A,T,T,F)}}else return;const p=new(hc(f)?_c:gc)(f,1);p.version=_;const u=r.get(d);u&&e.remove(u),r.set(d,p)}function h(d){const f=r.get(d);if(f){const m=d.index;m!==null&&f.version<m.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function kd(s,e,t){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,m){s.drawElements(n,m,r,f*a),t.update(m,n,1)}function l(f,m,g){g!==0&&(s.drawElementsInstanced(n,m,r,f*a,g),t.update(m,n,g))}function h(f,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,f,0,g);let p=0;for(let u=0;u<g;u++)p+=m[u];t.update(p,n,1)}function d(f,m,g,_){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<f.length;u++)l(f[u]/a,m[u],_[u]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,r,f,0,_,0,g);let u=0;for(let b=0;b<g;b++)u+=m[b]*_[b];t.update(u,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Hd(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Gd(s,e,t){const n=new WeakMap,i=new ht;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let y=function(){N.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var m=y;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),p===!0&&(x=3);let F=o.attributes.position.count*x,A=1;F>e.maxTextureSize&&(A=Math.ceil(F/e.maxTextureSize),F=e.maxTextureSize);const T=new Float32Array(F*A*4*d),N=new dc(T,F,A,d);N.type=dn,N.needsUpdate=!0;const S=x*4;for(let R=0;R<d;R++){const H=u[R],k=b[R],q=w[R],K=F*A*4*R;for(let X=0;X<H.count;X++){const ee=X*S;g===!0&&(i.fromBufferAttribute(H,X),T[K+ee+0]=i.x,T[K+ee+1]=i.y,T[K+ee+2]=i.z,T[K+ee+3]=0),_===!0&&(i.fromBufferAttribute(k,X),T[K+ee+4]=i.x,T[K+ee+5]=i.y,T[K+ee+6]=i.z,T[K+ee+7]=0),p===!0&&(i.fromBufferAttribute(q,X),T[K+ee+8]=i.x,T[K+ee+9]=i.y,T[K+ee+10]=i.z,T[K+ee+11]=q.itemSize===4?i.w:1)}}f={count:d,texture:N,size:new Fe(F,A)},n.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(s,"morphTargetBaseInfluence",_),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Vd(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,d=e.get(c,h);if(i.get(d)!==l&&(e.update(d),i.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return d}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class wc extends Tt{constructor(e,t,n,i,r,a,o,c,l,h=yi){if(h!==yi&&h!==Ri)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===yi&&(n=$n),n===void 0&&h===Ri&&(n=Ai),super(null,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Zt,this.minFilter=c!==void 0?c:Zt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Ec=new Tt,po=new wc(1,1),bc=new dc,Tc=new Cl,Ac=new Mc,mo=[],go=[],_o=new Float32Array(16),vo=new Float32Array(9),xo=new Float32Array(4);function Ii(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=mo[i];if(r===void 0&&(r=new Float32Array(i),mo[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function pt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function mt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Ws(s,e){let t=go[e];t===void 0&&(t=new Int32Array(e),go[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Wd(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Xd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;s.uniform2fv(this.addr,e),mt(t,e)}}function qd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;s.uniform3fv(this.addr,e),mt(t,e)}}function Yd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;s.uniform4fv(this.addr,e),mt(t,e)}}function jd(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;xo.set(n),s.uniformMatrix2fv(this.addr,!1,xo),mt(t,n)}}function Zd(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;vo.set(n),s.uniformMatrix3fv(this.addr,!1,vo),mt(t,n)}}function $d(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;_o.set(n),s.uniformMatrix4fv(this.addr,!1,_o),mt(t,n)}}function Kd(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Jd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;s.uniform2iv(this.addr,e),mt(t,e)}}function Qd(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;s.uniform3iv(this.addr,e),mt(t,e)}}function ef(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;s.uniform4iv(this.addr,e),mt(t,e)}}function tf(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function nf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;s.uniform2uiv(this.addr,e),mt(t,e)}}function sf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;s.uniform3uiv(this.addr,e),mt(t,e)}}function rf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;s.uniform4uiv(this.addr,e),mt(t,e)}}function af(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(po.compareFunction=lc,r=po):r=Ec,t.setTexture2D(e||r,i)}function of(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Tc,i)}function cf(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Ac,i)}function lf(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||bc,i)}function hf(s){switch(s){case 5126:return Wd;case 35664:return Xd;case 35665:return qd;case 35666:return Yd;case 35674:return jd;case 35675:return Zd;case 35676:return $d;case 5124:case 35670:return Kd;case 35667:case 35671:return Jd;case 35668:case 35672:return Qd;case 35669:case 35673:return ef;case 5125:return tf;case 36294:return nf;case 36295:return sf;case 36296:return rf;case 35678:case 36198:case 36298:case 36306:case 35682:return af;case 35679:case 36299:case 36307:return of;case 35680:case 36300:case 36308:case 36293:return cf;case 36289:case 36303:case 36311:case 36292:return lf}}function uf(s,e){s.uniform1fv(this.addr,e)}function df(s,e){const t=Ii(e,this.size,2);s.uniform2fv(this.addr,t)}function ff(s,e){const t=Ii(e,this.size,3);s.uniform3fv(this.addr,t)}function pf(s,e){const t=Ii(e,this.size,4);s.uniform4fv(this.addr,t)}function mf(s,e){const t=Ii(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function gf(s,e){const t=Ii(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function _f(s,e){const t=Ii(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function vf(s,e){s.uniform1iv(this.addr,e)}function xf(s,e){s.uniform2iv(this.addr,e)}function Mf(s,e){s.uniform3iv(this.addr,e)}function yf(s,e){s.uniform4iv(this.addr,e)}function Sf(s,e){s.uniform1uiv(this.addr,e)}function wf(s,e){s.uniform2uiv(this.addr,e)}function Ef(s,e){s.uniform3uiv(this.addr,e)}function bf(s,e){s.uniform4uiv(this.addr,e)}function Tf(s,e,t){const n=this.cache,i=e.length,r=Ws(t,i);pt(n,r)||(s.uniform1iv(this.addr,r),mt(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Ec,r[a])}function Af(s,e,t){const n=this.cache,i=e.length,r=Ws(t,i);pt(n,r)||(s.uniform1iv(this.addr,r),mt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Tc,r[a])}function Rf(s,e,t){const n=this.cache,i=e.length,r=Ws(t,i);pt(n,r)||(s.uniform1iv(this.addr,r),mt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Ac,r[a])}function Cf(s,e,t){const n=this.cache,i=e.length,r=Ws(t,i);pt(n,r)||(s.uniform1iv(this.addr,r),mt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||bc,r[a])}function Pf(s){switch(s){case 5126:return uf;case 35664:return df;case 35665:return ff;case 35666:return pf;case 35674:return mf;case 35675:return gf;case 35676:return _f;case 5124:case 35670:return vf;case 35667:case 35671:return xf;case 35668:case 35672:return Mf;case 35669:case 35673:return yf;case 5125:return Sf;case 36294:return wf;case 36295:return Ef;case 36296:return bf;case 35678:case 36198:case 36298:case 36306:case 35682:return Tf;case 35679:case 36299:case 36307:return Af;case 35680:case 36300:case 36308:case 36293:return Rf;case 36289:case 36303:case 36311:case 36292:return Cf}}class Lf{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=hf(t.type)}}class If{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Pf(t.type)}}class Df{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const Mr=/(\w+)(\])?(\[|\.)?/g;function Mo(s,e){s.seq.push(e),s.map[e.id]=e}function Uf(s,e,t){const n=s.name,i=n.length;for(Mr.lastIndex=0;;){const r=Mr.exec(n),a=Mr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Mo(t,l===void 0?new Lf(o,s,e):new If(o,s,e));break}else{let d=t.map[o];d===void 0&&(d=new Df(o),Mo(t,d)),t=d}}}class Us{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);Uf(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function yo(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const Nf=37297;let Ff=0;function Of(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const So=new De;function Bf(s){Xe._getMatrix(So,Xe.workingColorSpace,s);const e=`mat3( ${So.elements.map(t=>t.toFixed(4))} )`;switch(Xe.getTransfer(s)){case Gs:return[e,"LinearTransferOETF"];case Ke:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function wo(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+Of(s.getShaderSource(e),a)}else return i}function zf(s,e){const t=Bf(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function kf(s,e){let t;switch(e){case il:t="Linear";break;case sl:t="Reinhard";break;case rl:t="Cineon";break;case $o:t="ACESFilmic";break;case ol:t="AgX";break;case cl:t="Neutral";break;case al:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ys=new L;function Hf(){Xe.getLuminanceCoefficients(ys);const s=ys.x.toFixed(4),e=ys.y.toFixed(4),t=ys.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gf(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wi).join(`
`)}function Vf(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Wf(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Wi(s){return s!==""}function Eo(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bo(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Xf=/^[ \t]*#include +<([\w\d./]+)>/gm;function fa(s){return s.replace(Xf,Yf)}const qf=new Map;function Yf(s,e){let t=Ne[e];if(t===void 0){const n=qf.get(e);if(n!==void 0)t=Ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return fa(t)}const jf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function To(s){return s.replace(jf,Zf)}function Zf(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Ao(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function $f(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Yo?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===jo?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===un&&(e="SHADOWMAP_TYPE_VSM"),e}function Kf(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case bi:case Ti:e="ENVMAP_TYPE_CUBE";break;case Hs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Jf(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ti:e="ENVMAP_MODE_REFRACTION";break}return e}function Qf(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Zo:e="ENVMAP_BLENDING_MULTIPLY";break;case tl:e="ENVMAP_BLENDING_MIX";break;case nl:e="ENVMAP_BLENDING_ADD";break}return e}function ep(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function tp(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=$f(t),l=Kf(t),h=Jf(t),d=Qf(t),f=ep(t),m=Gf(t),g=Vf(r),_=i.createProgram();let p,u,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Wi).join(`
`),p.length>0&&(p+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Wi).join(`
`),u.length>0&&(u+=`
`)):(p=[Ao(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wi).join(`
`),u=[Ao(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?Ne.tonemapping_pars_fragment:"",t.toneMapping!==An?kf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,zf("linearToOutputTexel",t.outputColorSpace),Hf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Wi).join(`
`)),a=fa(a),a=Eo(a,t),a=bo(a,t),o=fa(o),o=Eo(o,t),o=bo(o,t),a=To(a),o=To(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,u=["#define varying in",t.glslVersion===za?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===za?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const w=b+p+a,x=b+u+o,F=yo(i,i.VERTEX_SHADER,w),A=yo(i,i.FRAGMENT_SHADER,x);i.attachShader(_,F),i.attachShader(_,A),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function T(R){if(s.debug.checkShaderErrors){const H=i.getProgramInfoLog(_).trim(),k=i.getShaderInfoLog(F).trim(),q=i.getShaderInfoLog(A).trim();let K=!0,X=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(K=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,F,A);else{const ee=wo(i,F,"vertex"),W=wo(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+H+`
`+ee+`
`+W)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(k===""||q==="")&&(X=!1);X&&(R.diagnostics={runnable:K,programLog:H,vertexShader:{log:k,prefix:p},fragmentShader:{log:q,prefix:u}})}i.deleteShader(F),i.deleteShader(A),N=new Us(i,_),S=Wf(i,_)}let N;this.getUniforms=function(){return N===void 0&&T(this),N};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,Nf)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ff++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=F,this.fragmentShader=A,this}let np=0;class ip{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new sp(e),t.set(e,n)),n}}class sp{constructor(e){this.id=np++,this.code=e,this.usedTimes=0}}function rp(s,e,t,n,i,r,a){const o=new pc,c=new ip,l=new Set,h=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let m=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return l.add(S),S===0?"uv":`uv${S}`}function p(S,y,R,H,k){const q=H.fog,K=k.geometry,X=S.isMeshStandardMaterial?H.environment:null,ee=(S.isMeshStandardMaterial?t:e).get(S.envMap||X),W=ee&&ee.mapping===Hs?ee.image.height:null,ae=g[S.type];S.precision!==null&&(m=i.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const de=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Se=de!==void 0?de.length:0;let Be=0;K.morphAttributes.position!==void 0&&(Be=1),K.morphAttributes.normal!==void 0&&(Be=2),K.morphAttributes.color!==void 0&&(Be=3);let Qe,j,ie,xe;if(ae){const $e=Jt[ae];Qe=$e.vertexShader,j=$e.fragmentShader}else Qe=S.vertexShader,j=S.fragmentShader,c.update(S),ie=c.getVertexShaderID(S),xe=c.getFragmentShaderID(S);const oe=s.getRenderTarget(),Ae=s.state.buffers.depth.getReversed(),Pe=k.isInstancedMesh===!0,ze=k.isBatchedMesh===!0,at=!!S.map,Ve=!!S.matcap,ut=!!ee,U=!!S.aoMap,Dt=!!S.lightMap,ke=!!S.bumpMap,He=!!S.normalMap,Ee=!!S.displacementMap,nt=!!S.emissiveMap,we=!!S.metalnessMap,E=!!S.roughnessMap,v=S.anisotropy>0,O=S.clearcoat>0,Z=S.dispersion>0,Q=S.iridescence>0,Y=S.sheen>0,Me=S.transmission>0,ce=v&&!!S.anisotropyMap,fe=O&&!!S.clearcoatMap,We=O&&!!S.clearcoatNormalMap,te=O&&!!S.clearcoatRoughnessMap,pe=Q&&!!S.iridescenceMap,be=Q&&!!S.iridescenceThicknessMap,Re=Y&&!!S.sheenColorMap,me=Y&&!!S.sheenRoughnessMap,Ge=!!S.specularMap,Ue=!!S.specularColorMap,et=!!S.specularIntensityMap,P=Me&&!!S.transmissionMap,re=Me&&!!S.thicknessMap,G=!!S.gradientMap,$=!!S.alphaMap,ue=S.alphaTest>0,le=!!S.alphaHash,Le=!!S.extensions;let lt=An;S.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(lt=s.toneMapping);const vt={shaderID:ae,shaderType:S.type,shaderName:S.name,vertexShader:Qe,fragmentShader:j,defines:S.defines,customVertexShaderID:ie,customFragmentShaderID:xe,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:ze,batchingColor:ze&&k._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&k.instanceColor!==null,instancingMorph:Pe&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:oe===null?s.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:Pi,alphaToCoverage:!!S.alphaToCoverage,map:at,matcap:Ve,envMap:ut,envMapMode:ut&&ee.mapping,envMapCubeUVHeight:W,aoMap:U,lightMap:Dt,bumpMap:ke,normalMap:He,displacementMap:f&&Ee,emissiveMap:nt,normalMapObjectSpace:He&&S.normalMapType===dl,normalMapTangentSpace:He&&S.normalMapType===cc,metalnessMap:we,roughnessMap:E,anisotropy:v,anisotropyMap:ce,clearcoat:O,clearcoatMap:fe,clearcoatNormalMap:We,clearcoatRoughnessMap:te,dispersion:Z,iridescence:Q,iridescenceMap:pe,iridescenceThicknessMap:be,sheen:Y,sheenColorMap:Re,sheenRoughnessMap:me,specularMap:Ge,specularColorMap:Ue,specularIntensityMap:et,transmission:Me,transmissionMap:P,thicknessMap:re,gradientMap:G,opaque:S.transparent===!1&&S.blending===Mi&&S.alphaToCoverage===!1,alphaMap:$,alphaTest:ue,alphaHash:le,combine:S.combine,mapUv:at&&_(S.map.channel),aoMapUv:U&&_(S.aoMap.channel),lightMapUv:Dt&&_(S.lightMap.channel),bumpMapUv:ke&&_(S.bumpMap.channel),normalMapUv:He&&_(S.normalMap.channel),displacementMapUv:Ee&&_(S.displacementMap.channel),emissiveMapUv:nt&&_(S.emissiveMap.channel),metalnessMapUv:we&&_(S.metalnessMap.channel),roughnessMapUv:E&&_(S.roughnessMap.channel),anisotropyMapUv:ce&&_(S.anisotropyMap.channel),clearcoatMapUv:fe&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:We&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:be&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:me&&_(S.sheenRoughnessMap.channel),specularMapUv:Ge&&_(S.specularMap.channel),specularColorMapUv:Ue&&_(S.specularColorMap.channel),specularIntensityMapUv:et&&_(S.specularIntensityMap.channel),transmissionMapUv:P&&_(S.transmissionMap.channel),thicknessMapUv:re&&_(S.thicknessMap.channel),alphaMapUv:$&&_(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(He||v),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!K.attributes.uv&&(at||$),fog:!!q,useFog:S.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ae,skinning:k.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:Be,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:lt,decodeVideoTexture:at&&S.map.isVideoTexture===!0&&Xe.getTransfer(S.map.colorSpace)===Ke,decodeVideoTextureEmissive:nt&&S.emissiveMap.isVideoTexture===!0&&Xe.getTransfer(S.emissiveMap.colorSpace)===Ke,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===_t,flipSided:S.side===Ct,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Le&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&S.extensions.multiDraw===!0||ze)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return vt.vertexUv1s=l.has(1),vt.vertexUv2s=l.has(2),vt.vertexUv3s=l.has(3),l.clear(),vt}function u(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const R in S.defines)y.push(R),y.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(b(y,S),w(y,S),y.push(s.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function b(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function w(S,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),S.push(o.mask)}function x(S){const y=g[S.type];let R;if(y){const H=Jt[y];R=Hl.clone(H.uniforms)}else R=S.uniforms;return R}function F(S,y){let R;for(let H=0,k=h.length;H<k;H++){const q=h[H];if(q.cacheKey===y){R=q,++R.usedTimes;break}}return R===void 0&&(R=new tp(s,y,S,r),h.push(R)),R}function A(S){if(--S.usedTimes===0){const y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),S.destroy()}}function T(S){c.remove(S)}function N(){c.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:x,acquireProgram:F,releaseProgram:A,releaseShaderCache:T,programs:h,dispose:N}}function ap(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function op(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Ro(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Co(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(d,f,m,g,_,p){let u=s[e];return u===void 0?(u={id:d.id,object:d,geometry:f,material:m,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},s[e]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=m,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=_,u.group=p),e++,u}function o(d,f,m,g,_,p){const u=a(d,f,m,g,_,p);m.transmission>0?n.push(u):m.transparent===!0?i.push(u):t.push(u)}function c(d,f,m,g,_,p){const u=a(d,f,m,g,_,p);m.transmission>0?n.unshift(u):m.transparent===!0?i.unshift(u):t.unshift(u)}function l(d,f){t.length>1&&t.sort(d||op),n.length>1&&n.sort(f||Ro),i.length>1&&i.sort(f||Ro)}function h(){for(let d=e,f=s.length;d<f;d++){const m=s[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:h,sort:l}}function cp(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Co,s.set(n,[a])):i>=r.length?(a=new Co,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function lp(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Oe};break;case"SpotLight":t={position:new L,direction:new L,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new L,halfWidth:new L,halfHeight:new L};break}return s[e.id]=t,t}}}function hp(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let up=0;function dp(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function fp(s){const e=new lp,t=hp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const i=new L,r=new rt,a=new rt;function o(l){let h=0,d=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let m=0,g=0,_=0,p=0,u=0,b=0,w=0,x=0,F=0,A=0,T=0;l.sort(dp);for(let S=0,y=l.length;S<y;S++){const R=l[S],H=R.color,k=R.intensity,q=R.distance,K=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=H.r*k,d+=H.g*k,f+=H.b*k;else if(R.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(R.sh.coefficients[X],k);T++}else if(R.isDirectionalLight){const X=e.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const ee=R.shadow,W=t.get(R);W.shadowIntensity=ee.intensity,W.shadowBias=ee.bias,W.shadowNormalBias=ee.normalBias,W.shadowRadius=ee.radius,W.shadowMapSize=ee.mapSize,n.directionalShadow[m]=W,n.directionalShadowMap[m]=K,n.directionalShadowMatrix[m]=R.shadow.matrix,b++}n.directional[m]=X,m++}else if(R.isSpotLight){const X=e.get(R);X.position.setFromMatrixPosition(R.matrixWorld),X.color.copy(H).multiplyScalar(k),X.distance=q,X.coneCos=Math.cos(R.angle),X.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),X.decay=R.decay,n.spot[_]=X;const ee=R.shadow;if(R.map&&(n.spotLightMap[F]=R.map,F++,ee.updateMatrices(R),R.castShadow&&A++),n.spotLightMatrix[_]=ee.matrix,R.castShadow){const W=t.get(R);W.shadowIntensity=ee.intensity,W.shadowBias=ee.bias,W.shadowNormalBias=ee.normalBias,W.shadowRadius=ee.radius,W.shadowMapSize=ee.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=K,x++}_++}else if(R.isRectAreaLight){const X=e.get(R);X.color.copy(H).multiplyScalar(k),X.halfWidth.set(R.width*.5,0,0),X.halfHeight.set(0,R.height*.5,0),n.rectArea[p]=X,p++}else if(R.isPointLight){const X=e.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity),X.distance=R.distance,X.decay=R.decay,R.castShadow){const ee=R.shadow,W=t.get(R);W.shadowIntensity=ee.intensity,W.shadowBias=ee.bias,W.shadowNormalBias=ee.normalBias,W.shadowRadius=ee.radius,W.shadowMapSize=ee.mapSize,W.shadowCameraNear=ee.camera.near,W.shadowCameraFar=ee.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=R.shadow.matrix,w++}n.point[g]=X,g++}else if(R.isHemisphereLight){const X=e.get(R);X.skyColor.copy(R.color).multiplyScalar(k),X.groundColor.copy(R.groundColor).multiplyScalar(k),n.hemi[u]=X,u++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=se.LTC_FLOAT_1,n.rectAreaLTC2=se.LTC_FLOAT_2):(n.rectAreaLTC1=se.LTC_HALF_1,n.rectAreaLTC2=se.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=f;const N=n.hash;(N.directionalLength!==m||N.pointLength!==g||N.spotLength!==_||N.rectAreaLength!==p||N.hemiLength!==u||N.numDirectionalShadows!==b||N.numPointShadows!==w||N.numSpotShadows!==x||N.numSpotMaps!==F||N.numLightProbes!==T)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=u,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=x+F-A,n.spotLightMap.length=F,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=T,N.directionalLength=m,N.pointLength=g,N.spotLength=_,N.rectAreaLength=p,N.hemiLength=u,N.numDirectionalShadows=b,N.numPointShadows=w,N.numSpotShadows=x,N.numSpotMaps=F,N.numLightProbes=T,n.version=up++)}function c(l,h){let d=0,f=0,m=0,g=0,_=0;const p=h.matrixWorldInverse;for(let u=0,b=l.length;u<b;u++){const w=l[u];if(w.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(p),d++}else if(w.isSpotLight){const x=n.spot[m];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(p),m++}else if(w.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(p),a.identity(),r.copy(w.matrixWorld),r.premultiply(p),a.extractRotation(r),x.halfWidth.set(w.width*.5,0,0),x.halfHeight.set(0,w.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(w.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(p),f++}else if(w.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(w.matrixWorld),x.direction.transformDirection(p),_++}}}return{setup:o,setupView:c,state:n}}function Po(s){const e=new fp(s),t=[],n=[];function i(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function pp(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new Po(s),e.set(i,[o])):r>=a.length?(o=new Po(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class mp extends Jn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=hl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class gp extends Jn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const _p=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function xp(s,e,t){let n=new Sa;const i=new Fe,r=new Fe,a=new ht,o=new mp({depthPacking:ul}),c=new gp,l={},h=t.maxTextureSize,d={[Pn]:Ct,[Ct]:Pn,[_t]:_t},f=new In({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Fe},radius:{value:4}},vertexShader:_p,fragmentShader:vp}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new wt;g.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new C(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yo;let u=this.type;this.render=function(A,T,N){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const S=s.getRenderTarget(),y=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),H=s.state;H.setBlending(Tn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const k=u!==un&&this.type===un,q=u===un&&this.type!==un;for(let K=0,X=A.length;K<X;K++){const ee=A[K],W=ee.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const ae=W.getFrameExtents();if(i.multiply(ae),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ae.x),i.x=r.x*ae.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ae.y),i.y=r.y*ae.y,W.mapSize.y=r.y)),W.map===null||k===!0||q===!0){const Se=this.type!==un?{minFilter:Zt,magFilter:Zt}:{};W.map!==null&&W.map.dispose(),W.map=new Kn(i.x,i.y,Se),W.map.texture.name=ee.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const de=W.getViewportCount();for(let Se=0;Se<de;Se++){const Be=W.getViewport(Se);a.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),H.viewport(a),W.updateMatrices(ee,Se),n=W.getFrustum(),x(T,N,W.camera,ee,this.type)}W.isPointLightShadow!==!0&&this.type===un&&b(W,N),W.needsUpdate=!1}u=this.type,p.needsUpdate=!1,s.setRenderTarget(S,y,R)};function b(A,T){const N=e.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Kn(i.x,i.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(T,null,N,f,_,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(T,null,N,m,_,null)}function w(A,T,N,S){let y=null;const R=N.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)y=R;else if(y=N.isPointLight===!0?c:o,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const H=y.uuid,k=T.uuid;let q=l[H];q===void 0&&(q={},l[H]=q);let K=q[k];K===void 0&&(K=y.clone(),q[k]=K,T.addEventListener("dispose",F)),y=K}if(y.visible=T.visible,y.wireframe=T.wireframe,S===un?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:d[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,N.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const H=s.properties.get(y);H.light=N}return y}function x(A,T,N,S,y){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===un)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,A.matrixWorld);const k=e.update(A),q=A.material;if(Array.isArray(q)){const K=k.groups;for(let X=0,ee=K.length;X<ee;X++){const W=K[X],ae=q[W.materialIndex];if(ae&&ae.visible){const de=w(A,ae,S,y);A.onBeforeShadow(s,A,T,N,k,de,W),s.renderBufferDirect(N,null,k,de,A,W),A.onAfterShadow(s,A,T,N,k,de,W)}}}else if(q.visible){const K=w(A,q,S,y);A.onBeforeShadow(s,A,T,N,k,K,null),s.renderBufferDirect(N,null,k,K,A,null),A.onAfterShadow(s,A,T,N,k,K,null)}}const H=A.children;for(let k=0,q=H.length;k<q;k++)x(H[k],T,N,S,y)}function F(A){A.target.removeEventListener("dispose",F);for(const N in l){const S=l[N],y=A.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const Mp={[Rr]:Cr,[Pr]:Dr,[Lr]:Ur,[Ei]:Ir,[Cr]:Rr,[Dr]:Pr,[Ur]:Lr,[Ir]:Ei};function yp(s,e){function t(){let P=!1;const re=new ht;let G=null;const $=new ht(0,0,0,0);return{setMask:function(ue){G!==ue&&!P&&(s.colorMask(ue,ue,ue,ue),G=ue)},setLocked:function(ue){P=ue},setClear:function(ue,le,Le,lt,vt){vt===!0&&(ue*=lt,le*=lt,Le*=lt),re.set(ue,le,Le,lt),$.equals(re)===!1&&(s.clearColor(ue,le,Le,lt),$.copy(re))},reset:function(){P=!1,G=null,$.set(-1,0,0,0)}}}function n(){let P=!1,re=!1,G=null,$=null,ue=null;return{setReversed:function(le){if(re!==le){const Le=e.get("EXT_clip_control");re?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT);const lt=ue;ue=null,this.setClear(lt)}re=le},getReversed:function(){return re},setTest:function(le){le?oe(s.DEPTH_TEST):Ae(s.DEPTH_TEST)},setMask:function(le){G!==le&&!P&&(s.depthMask(le),G=le)},setFunc:function(le){if(re&&(le=Mp[le]),$!==le){switch(le){case Rr:s.depthFunc(s.NEVER);break;case Cr:s.depthFunc(s.ALWAYS);break;case Pr:s.depthFunc(s.LESS);break;case Ei:s.depthFunc(s.LEQUAL);break;case Lr:s.depthFunc(s.EQUAL);break;case Ir:s.depthFunc(s.GEQUAL);break;case Dr:s.depthFunc(s.GREATER);break;case Ur:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}$=le}},setLocked:function(le){P=le},setClear:function(le){ue!==le&&(re&&(le=1-le),s.clearDepth(le),ue=le)},reset:function(){P=!1,G=null,$=null,ue=null,re=!1}}}function i(){let P=!1,re=null,G=null,$=null,ue=null,le=null,Le=null,lt=null,vt=null;return{setTest:function($e){P||($e?oe(s.STENCIL_TEST):Ae(s.STENCIL_TEST))},setMask:function($e){re!==$e&&!P&&(s.stencilMask($e),re=$e)},setFunc:function($e,Gt,sn){(G!==$e||$!==Gt||ue!==sn)&&(s.stencilFunc($e,Gt,sn),G=$e,$=Gt,ue=sn)},setOp:function($e,Gt,sn){(le!==$e||Le!==Gt||lt!==sn)&&(s.stencilOp($e,Gt,sn),le=$e,Le=Gt,lt=sn)},setLocked:function($e){P=$e},setClear:function($e){vt!==$e&&(s.clearStencil($e),vt=$e)},reset:function(){P=!1,re=null,G=null,$=null,ue=null,le=null,Le=null,lt=null,vt=null}}}const r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let h={},d={},f=new WeakMap,m=[],g=null,_=!1,p=null,u=null,b=null,w=null,x=null,F=null,A=null,T=new Oe(0,0,0),N=0,S=!1,y=null,R=null,H=null,k=null,q=null;const K=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ee=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(W)[1]),X=ee>=1):W.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),X=ee>=2);let ae=null,de={};const Se=s.getParameter(s.SCISSOR_BOX),Be=s.getParameter(s.VIEWPORT),Qe=new ht().fromArray(Se),j=new ht().fromArray(Be);function ie(P,re,G,$){const ue=new Uint8Array(4),le=s.createTexture();s.bindTexture(P,le),s.texParameteri(P,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(P,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Le=0;Le<G;Le++)P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY?s.texImage3D(re,0,s.RGBA,1,1,$,0,s.RGBA,s.UNSIGNED_BYTE,ue):s.texImage2D(re+Le,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ue);return le}const xe={};xe[s.TEXTURE_2D]=ie(s.TEXTURE_2D,s.TEXTURE_2D,1),xe[s.TEXTURE_CUBE_MAP]=ie(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),xe[s.TEXTURE_2D_ARRAY]=ie(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),xe[s.TEXTURE_3D]=ie(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),oe(s.DEPTH_TEST),a.setFunc(Ei),ke(!1),He(Ua),oe(s.CULL_FACE),U(Tn);function oe(P){h[P]!==!0&&(s.enable(P),h[P]=!0)}function Ae(P){h[P]!==!1&&(s.disable(P),h[P]=!1)}function Pe(P,re){return d[P]!==re?(s.bindFramebuffer(P,re),d[P]=re,P===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=re),P===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=re),!0):!1}function ze(P,re){let G=m,$=!1;if(P){G=f.get(re),G===void 0&&(G=[],f.set(re,G));const ue=P.textures;if(G.length!==ue.length||G[0]!==s.COLOR_ATTACHMENT0){for(let le=0,Le=ue.length;le<Le;le++)G[le]=s.COLOR_ATTACHMENT0+le;G.length=ue.length,$=!0}}else G[0]!==s.BACK&&(G[0]=s.BACK,$=!0);$&&s.drawBuffers(G)}function at(P){return g!==P?(s.useProgram(P),g=P,!0):!1}const Ve={[Wn]:s.FUNC_ADD,[Bc]:s.FUNC_SUBTRACT,[zc]:s.FUNC_REVERSE_SUBTRACT};Ve[kc]=s.MIN,Ve[Hc]=s.MAX;const ut={[Gc]:s.ZERO,[Vc]:s.ONE,[Wc]:s.SRC_COLOR,[Tr]:s.SRC_ALPHA,[$c]:s.SRC_ALPHA_SATURATE,[jc]:s.DST_COLOR,[qc]:s.DST_ALPHA,[Xc]:s.ONE_MINUS_SRC_COLOR,[Ar]:s.ONE_MINUS_SRC_ALPHA,[Zc]:s.ONE_MINUS_DST_COLOR,[Yc]:s.ONE_MINUS_DST_ALPHA,[Kc]:s.CONSTANT_COLOR,[Jc]:s.ONE_MINUS_CONSTANT_COLOR,[Qc]:s.CONSTANT_ALPHA,[el]:s.ONE_MINUS_CONSTANT_ALPHA};function U(P,re,G,$,ue,le,Le,lt,vt,$e){if(P===Tn){_===!0&&(Ae(s.BLEND),_=!1);return}if(_===!1&&(oe(s.BLEND),_=!0),P!==Oc){if(P!==p||$e!==S){if((u!==Wn||x!==Wn)&&(s.blendEquation(s.FUNC_ADD),u=Wn,x=Wn),$e)switch(P){case Mi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Na:s.blendFunc(s.ONE,s.ONE);break;case Fa:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Oa:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Mi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Na:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Fa:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Oa:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}b=null,w=null,F=null,A=null,T.set(0,0,0),N=0,p=P,S=$e}return}ue=ue||re,le=le||G,Le=Le||$,(re!==u||ue!==x)&&(s.blendEquationSeparate(Ve[re],Ve[ue]),u=re,x=ue),(G!==b||$!==w||le!==F||Le!==A)&&(s.blendFuncSeparate(ut[G],ut[$],ut[le],ut[Le]),b=G,w=$,F=le,A=Le),(lt.equals(T)===!1||vt!==N)&&(s.blendColor(lt.r,lt.g,lt.b,vt),T.copy(lt),N=vt),p=P,S=!1}function Dt(P,re){P.side===_t?Ae(s.CULL_FACE):oe(s.CULL_FACE);let G=P.side===Ct;re&&(G=!G),ke(G),P.blending===Mi&&P.transparent===!1?U(Tn):U(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const $=P.stencilWrite;o.setTest($),$&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),nt(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?oe(s.SAMPLE_ALPHA_TO_COVERAGE):Ae(s.SAMPLE_ALPHA_TO_COVERAGE)}function ke(P){y!==P&&(P?s.frontFace(s.CW):s.frontFace(s.CCW),y=P)}function He(P){P!==Nc?(oe(s.CULL_FACE),P!==R&&(P===Ua?s.cullFace(s.BACK):P===Fc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ae(s.CULL_FACE),R=P}function Ee(P){P!==H&&(X&&s.lineWidth(P),H=P)}function nt(P,re,G){P?(oe(s.POLYGON_OFFSET_FILL),(k!==re||q!==G)&&(s.polygonOffset(re,G),k=re,q=G)):Ae(s.POLYGON_OFFSET_FILL)}function we(P){P?oe(s.SCISSOR_TEST):Ae(s.SCISSOR_TEST)}function E(P){P===void 0&&(P=s.TEXTURE0+K-1),ae!==P&&(s.activeTexture(P),ae=P)}function v(P,re,G){G===void 0&&(ae===null?G=s.TEXTURE0+K-1:G=ae);let $=de[G];$===void 0&&($={type:void 0,texture:void 0},de[G]=$),($.type!==P||$.texture!==re)&&(ae!==G&&(s.activeTexture(G),ae=G),s.bindTexture(P,re||xe[P]),$.type=P,$.texture=re)}function O(){const P=de[ae];P!==void 0&&P.type!==void 0&&(s.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Z(){try{s.compressedTexImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Q(){try{s.compressedTexImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Y(){try{s.texSubImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Me(){try{s.texSubImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ce(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function fe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function We(){try{s.texStorage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function te(){try{s.texStorage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function pe(){try{s.texImage2D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function be(){try{s.texImage3D.apply(s,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Re(P){Qe.equals(P)===!1&&(s.scissor(P.x,P.y,P.z,P.w),Qe.copy(P))}function me(P){j.equals(P)===!1&&(s.viewport(P.x,P.y,P.z,P.w),j.copy(P))}function Ge(P,re){let G=l.get(re);G===void 0&&(G=new WeakMap,l.set(re,G));let $=G.get(P);$===void 0&&($=s.getUniformBlockIndex(re,P.name),G.set(P,$))}function Ue(P,re){const $=l.get(re).get(P);c.get(re)!==$&&(s.uniformBlockBinding(re,$,P.__bindingPointIndex),c.set(re,$))}function et(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ae=null,de={},d={},f=new WeakMap,m=[],g=null,_=!1,p=null,u=null,b=null,w=null,x=null,F=null,A=null,T=new Oe(0,0,0),N=0,S=!1,y=null,R=null,H=null,k=null,q=null,Qe.set(0,0,s.canvas.width,s.canvas.height),j.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:oe,disable:Ae,bindFramebuffer:Pe,drawBuffers:ze,useProgram:at,setBlending:U,setMaterial:Dt,setFlipSided:ke,setCullFace:He,setLineWidth:Ee,setPolygonOffset:nt,setScissorTest:we,activeTexture:E,bindTexture:v,unbindTexture:O,compressedTexImage2D:Z,compressedTexImage3D:Q,texImage2D:pe,texImage3D:be,updateUBOMapping:Ge,uniformBlockBinding:Ue,texStorage2D:We,texStorage3D:te,texSubImage2D:Y,texSubImage3D:Me,compressedTexSubImage2D:ce,compressedTexSubImage3D:fe,scissor:Re,viewport:me,reset:et}}function Lo(s,e,t,n){const i=Sp(n);switch(t){case tc:return s*e;case ic:return s*e;case sc:return s*e*2;case rc:return s*e/i.components*i.byteLength;case xa:return s*e/i.components*i.byteLength;case ac:return s*e*2/i.components*i.byteLength;case Ma:return s*e*2/i.components*i.byteLength;case nc:return s*e*3/i.components*i.byteLength;case jt:return s*e*4/i.components*i.byteLength;case ya:return s*e*4/i.components*i.byteLength;case Cs:case Ps:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ls:case Is:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case kr:case Gr:return Math.max(s,16)*Math.max(e,8)/4;case zr:case Hr:return Math.max(s,8)*Math.max(e,8)/2;case Vr:case Wr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Xr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case qr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Yr:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case jr:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Zr:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case $r:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Kr:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Jr:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Qr:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case ea:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case ta:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case na:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case ia:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case sa:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case ra:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ds:case aa:case oa:return Math.ceil(s/4)*Math.ceil(e/4)*16;case oc:case ca:return Math.ceil(s/4)*Math.ceil(e/4)*8;case la:case ha:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Sp(s){switch(s){case mn:case Jo:return{byteLength:1,components:1};case qi:case Qo:case $i:return{byteLength:2,components:1};case _a:case va:return{byteLength:2,components:4};case $n:case ga:case dn:return{byteLength:4,components:1};case ec:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function wp(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Fe,h=new WeakMap;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return m?new OffscreenCanvas(E,v):Fs("canvas")}function _(E,v,O){let Z=1;const Q=we(E);if((Q.width>O||Q.height>O)&&(Z=O/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const Y=Math.floor(Z*Q.width),Me=Math.floor(Z*Q.height);d===void 0&&(d=g(Y,Me));const ce=v?g(Y,Me):d;return ce.width=Y,ce.height=Me,ce.getContext("2d").drawImage(E,0,0,Y,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Y+"x"+Me+")."),ce}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),E;return E}function p(E){return E.generateMipmaps}function u(E){s.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function w(E,v,O,Z,Q=!1){if(E!==null){if(s[E]!==void 0)return s[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Y=v;if(v===s.RED&&(O===s.FLOAT&&(Y=s.R32F),O===s.HALF_FLOAT&&(Y=s.R16F),O===s.UNSIGNED_BYTE&&(Y=s.R8)),v===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.R8UI),O===s.UNSIGNED_SHORT&&(Y=s.R16UI),O===s.UNSIGNED_INT&&(Y=s.R32UI),O===s.BYTE&&(Y=s.R8I),O===s.SHORT&&(Y=s.R16I),O===s.INT&&(Y=s.R32I)),v===s.RG&&(O===s.FLOAT&&(Y=s.RG32F),O===s.HALF_FLOAT&&(Y=s.RG16F),O===s.UNSIGNED_BYTE&&(Y=s.RG8)),v===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.RG8UI),O===s.UNSIGNED_SHORT&&(Y=s.RG16UI),O===s.UNSIGNED_INT&&(Y=s.RG32UI),O===s.BYTE&&(Y=s.RG8I),O===s.SHORT&&(Y=s.RG16I),O===s.INT&&(Y=s.RG32I)),v===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),O===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),O===s.UNSIGNED_INT&&(Y=s.RGB32UI),O===s.BYTE&&(Y=s.RGB8I),O===s.SHORT&&(Y=s.RGB16I),O===s.INT&&(Y=s.RGB32I)),v===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),O===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),O===s.UNSIGNED_INT&&(Y=s.RGBA32UI),O===s.BYTE&&(Y=s.RGBA8I),O===s.SHORT&&(Y=s.RGBA16I),O===s.INT&&(Y=s.RGBA32I)),v===s.RGB&&O===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),v===s.RGBA){const Me=Q?Gs:Xe.getTransfer(Z);O===s.FLOAT&&(Y=s.RGBA32F),O===s.HALF_FLOAT&&(Y=s.RGBA16F),O===s.UNSIGNED_BYTE&&(Y=Me===Ke?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function x(E,v){let O;return E?v===null||v===$n||v===Ai?O=s.DEPTH24_STENCIL8:v===dn?O=s.DEPTH32F_STENCIL8:v===qi&&(O=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===$n||v===Ai?O=s.DEPTH_COMPONENT24:v===dn?O=s.DEPTH_COMPONENT32F:v===qi&&(O=s.DEPTH_COMPONENT16),O}function F(E,v){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==Zt&&E.minFilter!==Yt?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function A(E){const v=E.target;v.removeEventListener("dispose",A),N(v),v.isVideoTexture&&h.delete(v)}function T(E){const v=E.target;v.removeEventListener("dispose",T),y(v)}function N(E){const v=n.get(E);if(v.__webglInit===void 0)return;const O=E.source,Z=f.get(O);if(Z){const Q=Z[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&S(E),Object.keys(Z).length===0&&f.delete(O)}n.remove(E)}function S(E){const v=n.get(E);s.deleteTexture(v.__webglTexture);const O=E.source,Z=f.get(O);delete Z[v.__cacheKey],a.memory.textures--}function y(E){const v=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let Q=0;Q<v.__webglFramebuffer[Z].length;Q++)s.deleteFramebuffer(v.__webglFramebuffer[Z][Q]);else s.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)s.deleteFramebuffer(v.__webglFramebuffer[Z]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=E.textures;for(let Z=0,Q=O.length;Z<Q;Z++){const Y=n.get(O[Z]);Y.__webglTexture&&(s.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(O[Z])}n.remove(E)}let R=0;function H(){R=0}function k(){const E=R;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),R+=1,E}function q(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function K(E,v){const O=n.get(E);if(E.isVideoTexture&&Ee(E),E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){const Z=E.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(O,E,v);return}}t.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+v)}function X(E,v){const O=n.get(E);if(E.version>0&&O.__version!==E.version){j(O,E,v);return}t.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+v)}function ee(E,v){const O=n.get(E);if(E.version>0&&O.__version!==E.version){j(O,E,v);return}t.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+v)}function W(E,v){const O=n.get(E);if(E.version>0&&O.__version!==E.version){ie(O,E,v);return}t.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+v)}const ae={[Or]:s.REPEAT,[qn]:s.CLAMP_TO_EDGE,[Br]:s.MIRRORED_REPEAT},de={[Zt]:s.NEAREST,[ll]:s.NEAREST_MIPMAP_NEAREST,[ts]:s.NEAREST_MIPMAP_LINEAR,[Yt]:s.LINEAR,[qs]:s.LINEAR_MIPMAP_NEAREST,[Yn]:s.LINEAR_MIPMAP_LINEAR},Se={[fl]:s.NEVER,[xl]:s.ALWAYS,[pl]:s.LESS,[lc]:s.LEQUAL,[ml]:s.EQUAL,[vl]:s.GEQUAL,[gl]:s.GREATER,[_l]:s.NOTEQUAL};function Be(E,v){if(v.type===dn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Yt||v.magFilter===qs||v.magFilter===ts||v.magFilter===Yn||v.minFilter===Yt||v.minFilter===qs||v.minFilter===ts||v.minFilter===Yn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,ae[v.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,ae[v.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,ae[v.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,de[v.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,de[v.minFilter]),v.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,Se[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Zt||v.minFilter!==ts&&v.minFilter!==Yn||v.type===dn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");s.texParameterf(E,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Qe(E,v){let O=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",A));const Z=v.source;let Q=f.get(Z);Q===void 0&&(Q={},f.set(Z,Q));const Y=q(v);if(Y!==E.__cacheKey){Q[Y]===void 0&&(Q[Y]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Q[Y].usedTimes++;const Me=Q[E.__cacheKey];Me!==void 0&&(Q[E.__cacheKey].usedTimes--,Me.usedTimes===0&&S(v)),E.__cacheKey=Y,E.__webglTexture=Q[Y].texture}return O}function j(E,v,O){let Z=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=s.TEXTURE_3D);const Q=Qe(E,v),Y=v.source;t.bindTexture(Z,E.__webglTexture,s.TEXTURE0+O);const Me=n.get(Y);if(Y.version!==Me.__version||Q===!0){t.activeTexture(s.TEXTURE0+O);const ce=Xe.getPrimaries(Xe.workingColorSpace),fe=v.colorSpace===bn?null:Xe.getPrimaries(v.colorSpace),We=v.colorSpace===bn||ce===fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let te=_(v.image,!1,i.maxTextureSize);te=nt(v,te);const pe=r.convert(v.format,v.colorSpace),be=r.convert(v.type);let Re=w(v.internalFormat,pe,be,v.colorSpace,v.isVideoTexture);Be(Z,v);let me;const Ge=v.mipmaps,Ue=v.isVideoTexture!==!0,et=Me.__version===void 0||Q===!0,P=Y.dataReady,re=F(v,te);if(v.isDepthTexture)Re=x(v.format===Ri,v.type),et&&(Ue?t.texStorage2D(s.TEXTURE_2D,1,Re,te.width,te.height):t.texImage2D(s.TEXTURE_2D,0,Re,te.width,te.height,0,pe,be,null));else if(v.isDataTexture)if(Ge.length>0){Ue&&et&&t.texStorage2D(s.TEXTURE_2D,re,Re,Ge[0].width,Ge[0].height);for(let G=0,$=Ge.length;G<$;G++)me=Ge[G],Ue?P&&t.texSubImage2D(s.TEXTURE_2D,G,0,0,me.width,me.height,pe,be,me.data):t.texImage2D(s.TEXTURE_2D,G,Re,me.width,me.height,0,pe,be,me.data);v.generateMipmaps=!1}else Ue?(et&&t.texStorage2D(s.TEXTURE_2D,re,Re,te.width,te.height),P&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,te.width,te.height,pe,be,te.data)):t.texImage2D(s.TEXTURE_2D,0,Re,te.width,te.height,0,pe,be,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ue&&et&&t.texStorage3D(s.TEXTURE_2D_ARRAY,re,Re,Ge[0].width,Ge[0].height,te.depth);for(let G=0,$=Ge.length;G<$;G++)if(me=Ge[G],v.format!==jt)if(pe!==null)if(Ue){if(P)if(v.layerUpdates.size>0){const ue=Lo(me.width,me.height,v.format,v.type);for(const le of v.layerUpdates){const Le=me.data.subarray(le*ue/me.data.BYTES_PER_ELEMENT,(le+1)*ue/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,G,0,0,le,me.width,me.height,1,pe,Le)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,G,0,0,0,me.width,me.height,te.depth,pe,me.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,G,Re,me.width,me.height,te.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?P&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,G,0,0,0,me.width,me.height,te.depth,pe,be,me.data):t.texImage3D(s.TEXTURE_2D_ARRAY,G,Re,me.width,me.height,te.depth,0,pe,be,me.data)}else{Ue&&et&&t.texStorage2D(s.TEXTURE_2D,re,Re,Ge[0].width,Ge[0].height);for(let G=0,$=Ge.length;G<$;G++)me=Ge[G],v.format!==jt?pe!==null?Ue?P&&t.compressedTexSubImage2D(s.TEXTURE_2D,G,0,0,me.width,me.height,pe,me.data):t.compressedTexImage2D(s.TEXTURE_2D,G,Re,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?P&&t.texSubImage2D(s.TEXTURE_2D,G,0,0,me.width,me.height,pe,be,me.data):t.texImage2D(s.TEXTURE_2D,G,Re,me.width,me.height,0,pe,be,me.data)}else if(v.isDataArrayTexture)if(Ue){if(et&&t.texStorage3D(s.TEXTURE_2D_ARRAY,re,Re,te.width,te.height,te.depth),P)if(v.layerUpdates.size>0){const G=Lo(te.width,te.height,v.format,v.type);for(const $ of v.layerUpdates){const ue=te.data.subarray($*G/te.data.BYTES_PER_ELEMENT,($+1)*G/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,$,te.width,te.height,1,pe,be,ue)}v.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,pe,be,te.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Re,te.width,te.height,te.depth,0,pe,be,te.data);else if(v.isData3DTexture)Ue?(et&&t.texStorage3D(s.TEXTURE_3D,re,Re,te.width,te.height,te.depth),P&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,pe,be,te.data)):t.texImage3D(s.TEXTURE_3D,0,Re,te.width,te.height,te.depth,0,pe,be,te.data);else if(v.isFramebufferTexture){if(et)if(Ue)t.texStorage2D(s.TEXTURE_2D,re,Re,te.width,te.height);else{let G=te.width,$=te.height;for(let ue=0;ue<re;ue++)t.texImage2D(s.TEXTURE_2D,ue,Re,G,$,0,pe,be,null),G>>=1,$>>=1}}else if(Ge.length>0){if(Ue&&et){const G=we(Ge[0]);t.texStorage2D(s.TEXTURE_2D,re,Re,G.width,G.height)}for(let G=0,$=Ge.length;G<$;G++)me=Ge[G],Ue?P&&t.texSubImage2D(s.TEXTURE_2D,G,0,0,pe,be,me):t.texImage2D(s.TEXTURE_2D,G,Re,pe,be,me);v.generateMipmaps=!1}else if(Ue){if(et){const G=we(te);t.texStorage2D(s.TEXTURE_2D,re,Re,G.width,G.height)}P&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,pe,be,te)}else t.texImage2D(s.TEXTURE_2D,0,Re,pe,be,te);p(v)&&u(Z),Me.__version=Y.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function ie(E,v,O){if(v.image.length!==6)return;const Z=Qe(E,v),Q=v.source;t.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+O);const Y=n.get(Q);if(Q.version!==Y.__version||Z===!0){t.activeTexture(s.TEXTURE0+O);const Me=Xe.getPrimaries(Xe.workingColorSpace),ce=v.colorSpace===bn?null:Xe.getPrimaries(v.colorSpace),fe=v.colorSpace===bn||Me===ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const We=v.isCompressedTexture||v.image[0].isCompressedTexture,te=v.image[0]&&v.image[0].isDataTexture,pe=[];for(let $=0;$<6;$++)!We&&!te?pe[$]=_(v.image[$],!0,i.maxCubemapSize):pe[$]=te?v.image[$].image:v.image[$],pe[$]=nt(v,pe[$]);const be=pe[0],Re=r.convert(v.format,v.colorSpace),me=r.convert(v.type),Ge=w(v.internalFormat,Re,me,v.colorSpace),Ue=v.isVideoTexture!==!0,et=Y.__version===void 0||Z===!0,P=Q.dataReady;let re=F(v,be);Be(s.TEXTURE_CUBE_MAP,v);let G;if(We){Ue&&et&&t.texStorage2D(s.TEXTURE_CUBE_MAP,re,Ge,be.width,be.height);for(let $=0;$<6;$++){G=pe[$].mipmaps;for(let ue=0;ue<G.length;ue++){const le=G[ue];v.format!==jt?Re!==null?Ue?P&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue,0,0,le.width,le.height,Re,le.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue,Ge,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?P&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue,0,0,le.width,le.height,Re,me,le.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue,Ge,le.width,le.height,0,Re,me,le.data)}}}else{if(G=v.mipmaps,Ue&&et){G.length>0&&re++;const $=we(pe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,re,Ge,$.width,$.height)}for(let $=0;$<6;$++)if(te){Ue?P&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,pe[$].width,pe[$].height,Re,me,pe[$].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ge,pe[$].width,pe[$].height,0,Re,me,pe[$].data);for(let ue=0;ue<G.length;ue++){const Le=G[ue].image[$].image;Ue?P&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue+1,0,0,Le.width,Le.height,Re,me,Le.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue+1,Ge,Le.width,Le.height,0,Re,me,Le.data)}}else{Ue?P&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Re,me,pe[$]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ge,Re,me,pe[$]);for(let ue=0;ue<G.length;ue++){const le=G[ue];Ue?P&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue+1,0,0,Re,me,le.image[$]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ue+1,Ge,Re,me,le.image[$])}}}p(v)&&u(s.TEXTURE_CUBE_MAP),Y.__version=Q.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function xe(E,v,O,Z,Q,Y){const Me=r.convert(O.format,O.colorSpace),ce=r.convert(O.type),fe=w(O.internalFormat,Me,ce,O.colorSpace),We=n.get(v),te=n.get(O);if(te.__renderTarget=v,!We.__hasExternalTextures){const pe=Math.max(1,v.width>>Y),be=Math.max(1,v.height>>Y);Q===s.TEXTURE_3D||Q===s.TEXTURE_2D_ARRAY?t.texImage3D(Q,Y,fe,pe,be,v.depth,0,Me,ce,null):t.texImage2D(Q,Y,fe,pe,be,0,Me,ce,null)}t.bindFramebuffer(s.FRAMEBUFFER,E),He(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Z,Q,te.__webglTexture,0,ke(v)):(Q===s.TEXTURE_2D||Q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Z,Q,te.__webglTexture,Y),t.bindFramebuffer(s.FRAMEBUFFER,null)}function oe(E,v,O){if(s.bindRenderbuffer(s.RENDERBUFFER,E),v.depthBuffer){const Z=v.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,Y=x(v.stencilBuffer,Q),Me=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=ke(v);He(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ce,Y,v.width,v.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,ce,Y,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,Y,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Me,s.RENDERBUFFER,E)}else{const Z=v.textures;for(let Q=0;Q<Z.length;Q++){const Y=Z[Q],Me=r.convert(Y.format,Y.colorSpace),ce=r.convert(Y.type),fe=w(Y.internalFormat,Me,ce,Y.colorSpace),We=ke(v);O&&He(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,We,fe,v.width,v.height):He(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,We,fe,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,fe,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ae(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(v.depthTexture);Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K(v.depthTexture,0);const Q=Z.__webglTexture,Y=ke(v);if(v.depthTexture.format===yi)He(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0);else if(v.depthTexture.format===Ri)He(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Pe(E){const v=n.get(E),O=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){const Z=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=Z}if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Ae(v.__webglFramebuffer,E)}else if(O){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=s.createRenderbuffer(),oe(v.__webglDepthbuffer[Z],E,!1);else{const Q=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer[Z];s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),oe(v.__webglDepthbuffer,E,!1);else{const Z=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,Q)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function ze(E,v,O){const Z=n.get(E);v!==void 0&&xe(Z.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&Pe(E)}function at(E){const v=E.texture,O=n.get(E),Z=n.get(v);E.addEventListener("dispose",T);const Q=E.textures,Y=E.isWebGLCubeRenderTarget===!0,Me=Q.length>1;if(Me||(Z.__webglTexture===void 0&&(Z.__webglTexture=s.createTexture()),Z.__version=v.version,a.memory.textures++),Y){O.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[ce]=[];for(let fe=0;fe<v.mipmaps.length;fe++)O.__webglFramebuffer[ce][fe]=s.createFramebuffer()}else O.__webglFramebuffer[ce]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let ce=0;ce<v.mipmaps.length;ce++)O.__webglFramebuffer[ce]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(Me)for(let ce=0,fe=Q.length;ce<fe;ce++){const We=n.get(Q[ce]);We.__webglTexture===void 0&&(We.__webglTexture=s.createTexture(),a.memory.textures++)}if(E.samples>0&&He(E)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ce=0;ce<Q.length;ce++){const fe=Q[ce];O.__webglColorRenderbuffer[ce]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[ce]);const We=r.convert(fe.format,fe.colorSpace),te=r.convert(fe.type),pe=w(fe.internalFormat,We,te,fe.colorSpace,E.isXRRenderTarget===!0),be=ke(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,be,pe,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ce,s.RENDERBUFFER,O.__webglColorRenderbuffer[ce])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),oe(O.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Y){t.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture),Be(s.TEXTURE_CUBE_MAP,v);for(let ce=0;ce<6;ce++)if(v.mipmaps&&v.mipmaps.length>0)for(let fe=0;fe<v.mipmaps.length;fe++)xe(O.__webglFramebuffer[ce][fe],E,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,fe);else xe(O.__webglFramebuffer[ce],E,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);p(v)&&u(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let ce=0,fe=Q.length;ce<fe;ce++){const We=Q[ce],te=n.get(We);t.bindTexture(s.TEXTURE_2D,te.__webglTexture),Be(s.TEXTURE_2D,We),xe(O.__webglFramebuffer,E,We,s.COLOR_ATTACHMENT0+ce,s.TEXTURE_2D,0),p(We)&&u(s.TEXTURE_2D)}t.unbindTexture()}else{let ce=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ce=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ce,Z.__webglTexture),Be(ce,v),v.mipmaps&&v.mipmaps.length>0)for(let fe=0;fe<v.mipmaps.length;fe++)xe(O.__webglFramebuffer[fe],E,v,s.COLOR_ATTACHMENT0,ce,fe);else xe(O.__webglFramebuffer,E,v,s.COLOR_ATTACHMENT0,ce,0);p(v)&&u(ce),t.unbindTexture()}E.depthBuffer&&Pe(E)}function Ve(E){const v=E.textures;for(let O=0,Z=v.length;O<Z;O++){const Q=v[O];if(p(Q)){const Y=b(E),Me=n.get(Q).__webglTexture;t.bindTexture(Y,Me),u(Y),t.unbindTexture()}}}const ut=[],U=[];function Dt(E){if(E.samples>0){if(He(E)===!1){const v=E.textures,O=E.width,Z=E.height;let Q=s.COLOR_BUFFER_BIT;const Y=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Me=n.get(E),ce=v.length>1;if(ce)for(let fe=0;fe<v.length;fe++)t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let fe=0;fe<v.length;fe++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Q|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Q|=s.STENCIL_BUFFER_BIT)),ce){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Me.__webglColorRenderbuffer[fe]);const We=n.get(v[fe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,We,0)}s.blitFramebuffer(0,0,O,Z,0,0,O,Z,Q,s.NEAREST),c===!0&&(ut.length=0,U.length=0,ut.push(s.COLOR_ATTACHMENT0+fe),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ut.push(Y),U.push(Y),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,U)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ut))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ce)for(let fe=0;fe<v.length;fe++){t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.RENDERBUFFER,Me.__webglColorRenderbuffer[fe]);const We=n.get(v[fe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.TEXTURE_2D,We,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const v=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function ke(E){return Math.min(i.maxSamples,E.samples)}function He(E){const v=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Ee(E){const v=a.render.frame;h.get(E)!==v&&(h.set(E,v),E.update())}function nt(E,v){const O=E.colorSpace,Z=E.format,Q=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||O!==Pi&&O!==bn&&(Xe.getTransfer(O)===Ke?(Z!==jt||Q!==mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function we(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=H,this.setTexture2D=K,this.setTexture2DArray=X,this.setTexture3D=ee,this.setTextureCube=W,this.rebindTextures=ze,this.setupRenderTarget=at,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=He}function Ep(s,e){function t(n,i=bn){let r;const a=Xe.getTransfer(i);if(n===mn)return s.UNSIGNED_BYTE;if(n===_a)return s.UNSIGNED_SHORT_4_4_4_4;if(n===va)return s.UNSIGNED_SHORT_5_5_5_1;if(n===ec)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Jo)return s.BYTE;if(n===Qo)return s.SHORT;if(n===qi)return s.UNSIGNED_SHORT;if(n===ga)return s.INT;if(n===$n)return s.UNSIGNED_INT;if(n===dn)return s.FLOAT;if(n===$i)return s.HALF_FLOAT;if(n===tc)return s.ALPHA;if(n===nc)return s.RGB;if(n===jt)return s.RGBA;if(n===ic)return s.LUMINANCE;if(n===sc)return s.LUMINANCE_ALPHA;if(n===yi)return s.DEPTH_COMPONENT;if(n===Ri)return s.DEPTH_STENCIL;if(n===rc)return s.RED;if(n===xa)return s.RED_INTEGER;if(n===ac)return s.RG;if(n===Ma)return s.RG_INTEGER;if(n===ya)return s.RGBA_INTEGER;if(n===Cs||n===Ps||n===Ls||n===Is)if(a===Ke)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Cs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Is)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Cs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ls)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Is)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===zr||n===kr||n===Hr||n===Gr)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===zr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===kr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Hr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Gr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Vr||n===Wr||n===Xr)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Vr||n===Wr)return a===Ke?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Xr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===qr||n===Yr||n===jr||n===Zr||n===$r||n===Kr||n===Jr||n===Qr||n===ea||n===ta||n===na||n===ia||n===sa||n===ra)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===qr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Yr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===jr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Zr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===$r)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Kr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Jr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qr)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ea)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ta)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===na)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ia)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===sa)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ra)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ds||n===aa||n===oa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ds)return a===Ke?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===aa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===oa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===oc||n===ca||n===la||n===ha)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ds)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ca)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===la)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ha)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ai?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class bp extends Ot{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class jn extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Tp={type:"move"};class yr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),u=this._getHandJoint(l,_);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=h.position.distanceTo(d.position),m=.02,g=.005;l.inputState.pinching&&f>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Tp)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new jn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Ap=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Rp=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Cp{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Tt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new In({vertexShader:Ap,fragmentShader:Rp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new C(new nn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Pp extends Li{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,f=null,m=null,g=null;const _=new Cp,p=t.getContextAttributes();let u=null,b=null;const w=[],x=[],F=new Fe;let A=null;const T=new Ot;T.viewport=new ht;const N=new Ot;N.viewport=new ht;const S=[T,N],y=new bp;let R=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ie=w[j];return ie===void 0&&(ie=new yr,w[j]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(j){let ie=w[j];return ie===void 0&&(ie=new yr,w[j]=ie),ie.getGripSpace()},this.getHand=function(j){let ie=w[j];return ie===void 0&&(ie=new yr,w[j]=ie),ie.getHandSpace()};function k(j){const ie=x.indexOf(j.inputSource);if(ie===-1)return;const xe=w[ie];xe!==void 0&&(xe.update(j.inputSource,j.frame,l||a),xe.dispatchEvent({type:j.type,data:j.inputSource}))}function q(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",q),i.removeEventListener("inputsourceschange",K);for(let j=0;j<w.length;j++){const ie=x[j];ie!==null&&(x[j]=null,w[j].disconnect(ie))}R=null,H=null,_.reset(),e.setRenderTarget(u),m=null,f=null,d=null,i=null,b=null,Qe.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(F.width,F.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(u=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",q),i.addEventListener("inputsourceschange",K),p.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(F),i.renderState.layers===void 0){const ie={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(i,t,ie),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new Kn(m.framebufferWidth,m.framebufferHeight,{format:jt,type:mn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ie=null,xe=null,oe=null;p.depth&&(oe=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=p.stencil?Ri:yi,xe=p.stencil?Ai:$n);const Ae={colorFormat:t.RGBA8,depthFormat:oe,scaleFactor:r};d=new XRWebGLBinding(i,t),f=d.createProjectionLayer(Ae),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new Kn(f.textureWidth,f.textureHeight,{format:jt,type:mn,depthTexture:new wc(f.textureWidth,f.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Qe.setContext(i),Qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function K(j){for(let ie=0;ie<j.removed.length;ie++){const xe=j.removed[ie],oe=x.indexOf(xe);oe>=0&&(x[oe]=null,w[oe].disconnect(xe))}for(let ie=0;ie<j.added.length;ie++){const xe=j.added[ie];let oe=x.indexOf(xe);if(oe===-1){for(let Pe=0;Pe<w.length;Pe++)if(Pe>=x.length){x.push(xe),oe=Pe;break}else if(x[Pe]===null){x[Pe]=xe,oe=Pe;break}if(oe===-1)break}const Ae=w[oe];Ae&&Ae.connect(xe)}}const X=new L,ee=new L;function W(j,ie,xe){X.setFromMatrixPosition(ie.matrixWorld),ee.setFromMatrixPosition(xe.matrixWorld);const oe=X.distanceTo(ee),Ae=ie.projectionMatrix.elements,Pe=xe.projectionMatrix.elements,ze=Ae[14]/(Ae[10]-1),at=Ae[14]/(Ae[10]+1),Ve=(Ae[9]+1)/Ae[5],ut=(Ae[9]-1)/Ae[5],U=(Ae[8]-1)/Ae[0],Dt=(Pe[8]+1)/Pe[0],ke=ze*U,He=ze*Dt,Ee=oe/(-U+Dt),nt=Ee*-U;if(ie.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(nt),j.translateZ(Ee),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Ae[10]===-1)j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const we=ze+Ee,E=at+Ee,v=ke-nt,O=He+(oe-nt),Z=Ve*at/E*we,Q=ut*at/E*we;j.projectionMatrix.makePerspective(v,O,Z,Q,we,E),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ae(j,ie){ie===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ie.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;let ie=j.near,xe=j.far;_.texture!==null&&(_.depthNear>0&&(ie=_.depthNear),_.depthFar>0&&(xe=_.depthFar)),y.near=N.near=T.near=ie,y.far=N.far=T.far=xe,(R!==y.near||H!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),R=y.near,H=y.far),T.layers.mask=j.layers.mask|2,N.layers.mask=j.layers.mask|4,y.layers.mask=T.layers.mask|N.layers.mask;const oe=j.parent,Ae=y.cameras;ae(y,oe);for(let Pe=0;Pe<Ae.length;Pe++)ae(Ae[Pe],oe);Ae.length===2?W(y,T,N):y.projectionMatrix.copy(T.projectionMatrix),de(j,y,oe)};function de(j,ie,xe){xe===null?j.matrix.copy(ie.matrixWorld):(j.matrix.copy(xe.matrixWorld),j.matrix.invert(),j.matrix.multiply(ie.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=da*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function(j){c=j,f!==null&&(f.fixedFoveation=j),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let Se=null;function Be(j,ie){if(h=ie.getViewerPose(l||a),g=ie,h!==null){const xe=h.views;m!==null&&(e.setRenderTargetFramebuffer(b,m.framebuffer),e.setRenderTarget(b));let oe=!1;xe.length!==y.cameras.length&&(y.cameras.length=0,oe=!0);for(let Pe=0;Pe<xe.length;Pe++){const ze=xe[Pe];let at=null;if(m!==null)at=m.getViewport(ze);else{const ut=d.getViewSubImage(f,ze);at=ut.viewport,Pe===0&&(e.setRenderTargetTextures(b,ut.colorTexture,f.ignoreDepthValues?void 0:ut.depthStencilTexture),e.setRenderTarget(b))}let Ve=S[Pe];Ve===void 0&&(Ve=new Ot,Ve.layers.enable(Pe),Ve.viewport=new ht,S[Pe]=Ve),Ve.matrix.fromArray(ze.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(ze.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(at.x,at.y,at.width,at.height),Pe===0&&(y.matrix.copy(Ve.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),oe===!0&&y.cameras.push(Ve)}const Ae=i.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")){const Pe=d.getDepthInformation(xe[0]);Pe&&Pe.isValid&&Pe.texture&&_.init(e,Pe,i.renderState)}}for(let xe=0;xe<w.length;xe++){const oe=x[xe],Ae=w[xe];oe!==null&&Ae!==void 0&&Ae.update(oe,ie,l||a)}Se&&Se(j,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),g=null}const Qe=new yc;Qe.setAnimationLoop(Be),this.setAnimationLoop=function(j){Se=j},this.dispose=function(){}}}const kn=new Ht,Lp=new rt;function Ip(s,e){function t(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,vc(s)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function i(p,u,b,w,x){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(p,u):u.isMeshToonMaterial?(r(p,u),d(p,u)):u.isMeshPhongMaterial?(r(p,u),h(p,u)):u.isMeshStandardMaterial?(r(p,u),f(p,u),u.isMeshPhysicalMaterial&&m(p,u,x)):u.isMeshMatcapMaterial?(r(p,u),g(p,u)):u.isMeshDepthMaterial?r(p,u):u.isMeshDistanceMaterial?(r(p,u),_(p,u)):u.isMeshNormalMaterial?r(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?c(p,u,b,w):u.isSpriteMaterial?l(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,t(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Ct&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,t(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Ct&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,t(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,t(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const b=e.get(u),w=b.envMap,x=b.envMapRotation;w&&(p.envMap.value=w,kn.copy(x),kn.x*=-1,kn.y*=-1,kn.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(kn.y*=-1,kn.z*=-1),p.envMapRotation.value.setFromMatrix4(Lp.makeRotationFromEuler(kn)),p.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap&&(p.lightMap.value=u.lightMap,p.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,p.lightMapTransform)),u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function c(p,u,b,w){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*b,p.scale.value=w*.5,u.map&&(p.map.value=u.map,t(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function l(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function h(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function d(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function f(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,p.roughnessMapTransform)),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,b){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ct&&p.clearcoatNormalScale.value.negate())),u.dispersion>0&&(p.dispersion.value=u.dispersion),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,u){u.matcap&&(p.matcap.value=u.matcap)}function _(p,u){const b=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Dp(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,w){const x=w.program;n.uniformBlockBinding(b,x)}function l(b,w){let x=i[b.id];x===void 0&&(g(b),x=h(b),i[b.id]=x,b.addEventListener("dispose",p));const F=w.program;n.updateUBOMapping(b,F);const A=e.render.frame;r[b.id]!==A&&(f(b),r[b.id]=A)}function h(b){const w=d();b.__bindingPointIndex=w;const x=s.createBuffer(),F=b.__size,A=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,F,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,w,x),x}function d(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const w=i[b.id],x=b.uniforms,F=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let A=0,T=x.length;A<T;A++){const N=Array.isArray(x[A])?x[A]:[x[A]];for(let S=0,y=N.length;S<y;S++){const R=N[S];if(m(R,A,S,F)===!0){const H=R.__offset,k=Array.isArray(R.value)?R.value:[R.value];let q=0;for(let K=0;K<k.length;K++){const X=k[K],ee=_(X);typeof X=="number"||typeof X=="boolean"?(R.__data[0]=X,s.bufferSubData(s.UNIFORM_BUFFER,H+q,R.__data)):X.isMatrix3?(R.__data[0]=X.elements[0],R.__data[1]=X.elements[1],R.__data[2]=X.elements[2],R.__data[3]=0,R.__data[4]=X.elements[3],R.__data[5]=X.elements[4],R.__data[6]=X.elements[5],R.__data[7]=0,R.__data[8]=X.elements[6],R.__data[9]=X.elements[7],R.__data[10]=X.elements[8],R.__data[11]=0):(X.toArray(R.__data,q),q+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function m(b,w,x,F){const A=b.value,T=w+"_"+x;if(F[T]===void 0)return typeof A=="number"||typeof A=="boolean"?F[T]=A:F[T]=A.clone(),!0;{const N=F[T];if(typeof A=="number"||typeof A=="boolean"){if(N!==A)return F[T]=A,!0}else if(N.equals(A)===!1)return N.copy(A),!0}return!1}function g(b){const w=b.uniforms;let x=0;const F=16;for(let T=0,N=w.length;T<N;T++){const S=Array.isArray(w[T])?w[T]:[w[T]];for(let y=0,R=S.length;y<R;y++){const H=S[y],k=Array.isArray(H.value)?H.value:[H.value];for(let q=0,K=k.length;q<K;q++){const X=k[q],ee=_(X),W=x%F,ae=W%ee.boundary,de=W+ae;x+=ae,de!==0&&F-de<ee.storage&&(x+=F-de),H.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=x,x+=ee.storage}}}const A=x%F;return A>0&&(x+=F-A),b.__size=x,b.__cache={},this}function _(b){const w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),w}function p(b){const w=b.target;w.removeEventListener("dispose",p);const x=a.indexOf(w.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function u(){for(const b in i)s.deleteBuffer(i[b]);a=[],i={},r={}}return{bind:c,update:l,dispose:u}}class Up{constructor(e={}){const{canvas:t=yl(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const g=new Uint32Array(4),_=new Int32Array(4);let p=null,u=null;const b=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ft,this.toneMapping=An,this.toneMappingExposure=1;const x=this;let F=!1,A=0,T=0,N=null,S=-1,y=null;const R=new ht,H=new ht;let k=null;const q=new Oe(0);let K=0,X=t.width,ee=t.height,W=1,ae=null,de=null;const Se=new ht(0,0,X,ee),Be=new ht(0,0,X,ee);let Qe=!1;const j=new Sa;let ie=!1,xe=!1;const oe=new rt,Ae=new rt,Pe=new L,ze=new ht,at={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function ut(){return N===null?W:1}let U=n;function Dt(M,I){return t.getContext(M,I)}try{const M={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ma}`),t.addEventListener("webglcontextlost",$,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",le,!1),U===null){const I="webgl2";if(U=Dt(I,M),U===null)throw Dt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let ke,He,Ee,nt,we,E,v,O,Z,Q,Y,Me,ce,fe,We,te,pe,be,Re,me,Ge,Ue,et,P;function re(){ke=new Bd(U),ke.init(),Ue=new Ep(U,ke),He=new Id(U,ke,e,Ue),Ee=new yp(U,ke),He.reverseDepthBuffer&&f&&Ee.buffers.depth.setReversed(!0),nt=new Hd(U),we=new ap,E=new wp(U,ke,Ee,we,He,Ue,nt),v=new Ud(x),O=new Od(x),Z=new jl(U),et=new Pd(U,Z),Q=new zd(U,Z,nt,et),Y=new Vd(U,Q,Z,nt),Re=new Gd(U,He,E),te=new Dd(we),Me=new rp(x,v,O,ke,He,et,te),ce=new Ip(x,we),fe=new cp,We=new pp(ke),be=new Cd(x,v,O,Ee,Y,m,c),pe=new xp(x,Y,He),P=new Dp(U,nt,He,Ee),me=new Ld(U,ke,nt),Ge=new kd(U,ke,nt),nt.programs=Me.programs,x.capabilities=He,x.extensions=ke,x.properties=we,x.renderLists=fe,x.shadowMap=pe,x.state=Ee,x.info=nt}re();const G=new Pp(x,U);this.xr=G,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const M=ke.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=ke.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(M){M!==void 0&&(W=M,this.setSize(X,ee,!1))},this.getSize=function(M){return M.set(X,ee)},this.setSize=function(M,I,B=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=M,ee=I,t.width=Math.floor(M*W),t.height=Math.floor(I*W),B===!0&&(t.style.width=M+"px",t.style.height=I+"px"),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(X*W,ee*W).floor()},this.setDrawingBufferSize=function(M,I,B){X=M,ee=I,W=B,t.width=Math.floor(M*B),t.height=Math.floor(I*B),this.setViewport(0,0,M,I)},this.getCurrentViewport=function(M){return M.copy(R)},this.getViewport=function(M){return M.copy(Se)},this.setViewport=function(M,I,B,z){M.isVector4?Se.set(M.x,M.y,M.z,M.w):Se.set(M,I,B,z),Ee.viewport(R.copy(Se).multiplyScalar(W).round())},this.getScissor=function(M){return M.copy(Be)},this.setScissor=function(M,I,B,z){M.isVector4?Be.set(M.x,M.y,M.z,M.w):Be.set(M,I,B,z),Ee.scissor(H.copy(Be).multiplyScalar(W).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(M){Ee.setScissorTest(Qe=M)},this.setOpaqueSort=function(M){ae=M},this.setTransparentSort=function(M){de=M},this.getClearColor=function(M){return M.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor.apply(be,arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha.apply(be,arguments)},this.clear=function(M=!0,I=!0,B=!0){let z=0;if(M){let D=!1;if(N!==null){const ne=N.texture.format;D=ne===ya||ne===Ma||ne===xa}if(D){const ne=N.texture.type,he=ne===mn||ne===$n||ne===qi||ne===Ai||ne===_a||ne===va,ge=be.getClearColor(),_e=be.getClearAlpha(),Ce=ge.r,Ie=ge.g,ve=ge.b;he?(g[0]=Ce,g[1]=Ie,g[2]=ve,g[3]=_e,U.clearBufferuiv(U.COLOR,0,g)):(_[0]=Ce,_[1]=Ie,_[2]=ve,_[3]=_e,U.clearBufferiv(U.COLOR,0,_))}else z|=U.COLOR_BUFFER_BIT}I&&(z|=U.DEPTH_BUFFER_BIT),B&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",$,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",le,!1),fe.dispose(),We.dispose(),we.dispose(),v.dispose(),O.dispose(),Y.dispose(),et.dispose(),P.dispose(),Me.dispose(),G.dispose(),G.removeEventListener("sessionstart",Ta),G.removeEventListener("sessionend",Aa),Un.stop()};function $(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),F=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),F=!1;const M=nt.autoReset,I=pe.enabled,B=pe.autoUpdate,z=pe.needsUpdate,D=pe.type;re(),nt.autoReset=M,pe.enabled=I,pe.autoUpdate=B,pe.needsUpdate=z,pe.type=D}function le(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Le(M){const I=M.target;I.removeEventListener("dispose",Le),lt(I)}function lt(M){vt(M),we.remove(M)}function vt(M){const I=we.get(M).programs;I!==void 0&&(I.forEach(function(B){Me.releaseProgram(B)}),M.isShaderMaterial&&Me.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,B,z,D,ne){I===null&&(I=at);const he=D.isMesh&&D.matrixWorld.determinant()<0,ge=Ic(M,I,B,z,D);Ee.setMaterial(z,he);let _e=B.index,Ce=1;if(z.wireframe===!0){if(_e=Q.getWireframeAttribute(B),_e===void 0)return;Ce=2}const Ie=B.drawRange,ve=B.attributes.position;let qe=Ie.start*Ce,tt=(Ie.start+Ie.count)*Ce;ne!==null&&(qe=Math.max(qe,ne.start*Ce),tt=Math.min(tt,(ne.start+ne.count)*Ce)),_e!==null?(qe=Math.max(qe,0),tt=Math.min(tt,_e.count)):ve!=null&&(qe=Math.max(qe,0),tt=Math.min(tt,ve.count));const it=tt-qe;if(it<0||it===1/0)return;et.setup(D,z,ge,B,_e);let At,Ye=me;if(_e!==null&&(At=Z.get(_e),Ye=Ge,Ye.setIndex(At)),D.isMesh)z.wireframe===!0?(Ee.setLineWidth(z.wireframeLinewidth*ut()),Ye.setMode(U.LINES)):Ye.setMode(U.TRIANGLES);else if(D.isLine){let ye=z.linewidth;ye===void 0&&(ye=1),Ee.setLineWidth(ye*ut()),D.isLineSegments?Ye.setMode(U.LINES):D.isLineLoop?Ye.setMode(U.LINE_LOOP):Ye.setMode(U.LINE_STRIP)}else D.isPoints?Ye.setMode(U.POINTS):D.isSprite&&Ye.setMode(U.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)Ye.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(ke.get("WEBGL_multi_draw"))Ye.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const ye=D._multiDrawStarts,rn=D._multiDrawCounts,je=D._multiDrawCount,Vt=_e?Z.get(_e).bytesPerElement:1,Qn=we.get(z).currentProgram.getUniforms();for(let Pt=0;Pt<je;Pt++)Qn.setValue(U,"_gl_DrawID",Pt),Ye.render(ye[Pt]/Vt,rn[Pt])}else if(D.isInstancedMesh)Ye.renderInstances(qe,it,D.count);else if(B.isInstancedBufferGeometry){const ye=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,rn=Math.min(B.instanceCount,ye);Ye.renderInstances(qe,it,rn)}else Ye.render(qe,it)};function $e(M,I,B){M.transparent===!0&&M.side===_t&&M.forceSinglePass===!1?(M.side=Ct,M.needsUpdate=!0,es(M,I,B),M.side=Pn,M.needsUpdate=!0,es(M,I,B),M.side=_t):es(M,I,B)}this.compile=function(M,I,B=null){B===null&&(B=M),u=We.get(B),u.init(I),w.push(u),B.traverseVisible(function(D){D.isLight&&D.layers.test(I.layers)&&(u.pushLight(D),D.castShadow&&u.pushShadow(D))}),M!==B&&M.traverseVisible(function(D){D.isLight&&D.layers.test(I.layers)&&(u.pushLight(D),D.castShadow&&u.pushShadow(D))}),u.setupLights();const z=new Set;return M.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const ne=D.material;if(ne)if(Array.isArray(ne))for(let he=0;he<ne.length;he++){const ge=ne[he];$e(ge,B,D),z.add(ge)}else $e(ne,B,D),z.add(ne)}),w.pop(),u=null,z},this.compileAsync=function(M,I,B=null){const z=this.compile(M,I,B);return new Promise(D=>{function ne(){if(z.forEach(function(he){we.get(he).currentProgram.isReady()&&z.delete(he)}),z.size===0){D(M);return}setTimeout(ne,10)}ke.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let Gt=null;function sn(M){Gt&&Gt(M)}function Ta(){Un.stop()}function Aa(){Un.start()}const Un=new yc;Un.setAnimationLoop(sn),typeof self<"u"&&Un.setContext(self),this.setAnimationLoop=function(M){Gt=M,G.setAnimationLoop(M),M===null?Un.stop():Un.start()},G.addEventListener("sessionstart",Ta),G.addEventListener("sessionend",Aa),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(I),I=G.getCamera()),M.isScene===!0&&M.onBeforeRender(x,M,I,N),u=We.get(M,w.length),u.init(I),w.push(u),Ae.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),j.setFromProjectionMatrix(Ae),xe=this.localClippingEnabled,ie=te.init(this.clippingPlanes,xe),p=fe.get(M,b.length),p.init(),b.push(p),G.enabled===!0&&G.isPresenting===!0){const ne=x.xr.getDepthSensingMesh();ne!==null&&Xs(ne,I,-1/0,x.sortObjects)}Xs(M,I,0,x.sortObjects),p.finish(),x.sortObjects===!0&&p.sort(ae,de),Ve=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,Ve&&be.addToRenderList(p,M),this.info.render.frame++,ie===!0&&te.beginShadows();const B=u.state.shadowsArray;pe.render(B,M,I),ie===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=p.opaque,D=p.transmissive;if(u.setupLights(),I.isArrayCamera){const ne=I.cameras;if(D.length>0)for(let he=0,ge=ne.length;he<ge;he++){const _e=ne[he];Ca(z,D,M,_e)}Ve&&be.render(M);for(let he=0,ge=ne.length;he<ge;he++){const _e=ne[he];Ra(p,M,_e,_e.viewport)}}else D.length>0&&Ca(z,D,M,I),Ve&&be.render(M),Ra(p,M,I);N!==null&&(E.updateMultisampleRenderTarget(N),E.updateRenderTargetMipmap(N)),M.isScene===!0&&M.onAfterRender(x,M,I),et.resetDefaultState(),S=-1,y=null,w.pop(),w.length>0?(u=w[w.length-1],ie===!0&&te.setGlobalState(x.clippingPlanes,u.state.camera)):u=null,b.pop(),b.length>0?p=b[b.length-1]:p=null};function Xs(M,I,B,z){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)B=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLight)u.pushLight(M),M.castShadow&&u.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||j.intersectsSprite(M)){z&&ze.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ae);const he=Y.update(M),ge=M.material;ge.visible&&p.push(M,he,ge,B,ze.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||j.intersectsObject(M))){const he=Y.update(M),ge=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),ze.copy(M.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),ze.copy(he.boundingSphere.center)),ze.applyMatrix4(M.matrixWorld).applyMatrix4(Ae)),Array.isArray(ge)){const _e=he.groups;for(let Ce=0,Ie=_e.length;Ce<Ie;Ce++){const ve=_e[Ce],qe=ge[ve.materialIndex];qe&&qe.visible&&p.push(M,he,qe,B,ze.z,ve)}}else ge.visible&&p.push(M,he,ge,B,ze.z,null)}}const ne=M.children;for(let he=0,ge=ne.length;he<ge;he++)Xs(ne[he],I,B,z)}function Ra(M,I,B,z){const D=M.opaque,ne=M.transmissive,he=M.transparent;u.setupLightsView(B),ie===!0&&te.setGlobalState(x.clippingPlanes,B),z&&Ee.viewport(R.copy(z)),D.length>0&&Qi(D,I,B),ne.length>0&&Qi(ne,I,B),he.length>0&&Qi(he,I,B),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function Ca(M,I,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[z.id]===void 0&&(u.state.transmissionRenderTarget[z.id]=new Kn(1,1,{generateMipmaps:!0,type:ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float")?$i:mn,minFilter:Yn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xe.workingColorSpace}));const ne=u.state.transmissionRenderTarget[z.id],he=z.viewport||R;ne.setSize(he.z,he.w);const ge=x.getRenderTarget();x.setRenderTarget(ne),x.getClearColor(q),K=x.getClearAlpha(),K<1&&x.setClearColor(16777215,.5),x.clear(),Ve&&be.render(B);const _e=x.toneMapping;x.toneMapping=An;const Ce=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),u.setupLightsView(z),ie===!0&&te.setGlobalState(x.clippingPlanes,z),Qi(M,B,z),E.updateMultisampleRenderTarget(ne),E.updateRenderTargetMipmap(ne),ke.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let ve=0,qe=I.length;ve<qe;ve++){const tt=I[ve],it=tt.object,At=tt.geometry,Ye=tt.material,ye=tt.group;if(Ye.side===_t&&it.layers.test(z.layers)){const rn=Ye.side;Ye.side=Ct,Ye.needsUpdate=!0,Pa(it,B,z,At,Ye,ye),Ye.side=rn,Ye.needsUpdate=!0,Ie=!0}}Ie===!0&&(E.updateMultisampleRenderTarget(ne),E.updateRenderTargetMipmap(ne))}x.setRenderTarget(ge),x.setClearColor(q,K),Ce!==void 0&&(z.viewport=Ce),x.toneMapping=_e}function Qi(M,I,B){const z=I.isScene===!0?I.overrideMaterial:null;for(let D=0,ne=M.length;D<ne;D++){const he=M[D],ge=he.object,_e=he.geometry,Ce=z===null?he.material:z,Ie=he.group;ge.layers.test(B.layers)&&Pa(ge,I,B,_e,Ce,Ie)}}function Pa(M,I,B,z,D,ne){M.onBeforeRender(x,I,B,z,D,ne),M.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),D.onBeforeRender(x,I,B,z,M,ne),D.transparent===!0&&D.side===_t&&D.forceSinglePass===!1?(D.side=Ct,D.needsUpdate=!0,x.renderBufferDirect(B,I,z,D,M,ne),D.side=Pn,D.needsUpdate=!0,x.renderBufferDirect(B,I,z,D,M,ne),D.side=_t):x.renderBufferDirect(B,I,z,D,M,ne),M.onAfterRender(x,I,B,z,D,ne)}function es(M,I,B){I.isScene!==!0&&(I=at);const z=we.get(M),D=u.state.lights,ne=u.state.shadowsArray,he=D.state.version,ge=Me.getParameters(M,D.state,ne,I,B),_e=Me.getProgramCacheKey(ge);let Ce=z.programs;z.environment=M.isMeshStandardMaterial?I.environment:null,z.fog=I.fog,z.envMap=(M.isMeshStandardMaterial?O:v).get(M.envMap||z.environment),z.envMapRotation=z.environment!==null&&M.envMap===null?I.environmentRotation:M.envMapRotation,Ce===void 0&&(M.addEventListener("dispose",Le),Ce=new Map,z.programs=Ce);let Ie=Ce.get(_e);if(Ie!==void 0){if(z.currentProgram===Ie&&z.lightsStateVersion===he)return Ia(M,ge),Ie}else ge.uniforms=Me.getUniforms(M),M.onBeforeCompile(ge,x),Ie=Me.acquireProgram(ge,_e),Ce.set(_e,Ie),z.uniforms=ge.uniforms;const ve=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(ve.clippingPlanes=te.uniform),Ia(M,ge),z.needsLights=Uc(M),z.lightsStateVersion=he,z.needsLights&&(ve.ambientLightColor.value=D.state.ambient,ve.lightProbe.value=D.state.probe,ve.directionalLights.value=D.state.directional,ve.directionalLightShadows.value=D.state.directionalShadow,ve.spotLights.value=D.state.spot,ve.spotLightShadows.value=D.state.spotShadow,ve.rectAreaLights.value=D.state.rectArea,ve.ltc_1.value=D.state.rectAreaLTC1,ve.ltc_2.value=D.state.rectAreaLTC2,ve.pointLights.value=D.state.point,ve.pointLightShadows.value=D.state.pointShadow,ve.hemisphereLights.value=D.state.hemi,ve.directionalShadowMap.value=D.state.directionalShadowMap,ve.directionalShadowMatrix.value=D.state.directionalShadowMatrix,ve.spotShadowMap.value=D.state.spotShadowMap,ve.spotLightMatrix.value=D.state.spotLightMatrix,ve.spotLightMap.value=D.state.spotLightMap,ve.pointShadowMap.value=D.state.pointShadowMap,ve.pointShadowMatrix.value=D.state.pointShadowMatrix),z.currentProgram=Ie,z.uniformsList=null,Ie}function La(M){if(M.uniformsList===null){const I=M.currentProgram.getUniforms();M.uniformsList=Us.seqWithValue(I.seq,M.uniforms)}return M.uniformsList}function Ia(M,I){const B=we.get(M);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.batchingColor=I.batchingColor,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.instancingMorph=I.instancingMorph,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function Ic(M,I,B,z,D){I.isScene!==!0&&(I=at),E.resetTextureUnits();const ne=I.fog,he=z.isMeshStandardMaterial?I.environment:null,ge=N===null?x.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Pi,_e=(z.isMeshStandardMaterial?O:v).get(z.envMap||he),Ce=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ie=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),ve=!!B.morphAttributes.position,qe=!!B.morphAttributes.normal,tt=!!B.morphAttributes.color;let it=An;z.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(it=x.toneMapping);const At=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ye=At!==void 0?At.length:0,ye=we.get(z),rn=u.state.lights;if(ie===!0&&(xe===!0||M!==y)){const Ut=M===y&&z.id===S;te.setState(z,M,Ut)}let je=!1;z.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==rn.state.version||ye.outputColorSpace!==ge||D.isBatchedMesh&&ye.batching===!1||!D.isBatchedMesh&&ye.batching===!0||D.isBatchedMesh&&ye.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&ye.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&ye.instancing===!1||!D.isInstancedMesh&&ye.instancing===!0||D.isSkinnedMesh&&ye.skinning===!1||!D.isSkinnedMesh&&ye.skinning===!0||D.isInstancedMesh&&ye.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&ye.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&ye.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&ye.instancingMorph===!1&&D.morphTexture!==null||ye.envMap!==_e||z.fog===!0&&ye.fog!==ne||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==te.numPlanes||ye.numIntersection!==te.numIntersection)||ye.vertexAlphas!==Ce||ye.vertexTangents!==Ie||ye.morphTargets!==ve||ye.morphNormals!==qe||ye.morphColors!==tt||ye.toneMapping!==it||ye.morphTargetsCount!==Ye)&&(je=!0):(je=!0,ye.__version=z.version);let Vt=ye.currentProgram;je===!0&&(Vt=es(z,I,D));let Qn=!1,Pt=!1,Di=!1;const st=Vt.getUniforms(),Kt=ye.uniforms;if(Ee.useProgram(Vt.program)&&(Qn=!0,Pt=!0,Di=!0),z.id!==S&&(S=z.id,Pt=!0),Qn||y!==M){Ee.buffers.depth.getReversed()?(oe.copy(M.projectionMatrix),wl(oe),El(oe),st.setValue(U,"projectionMatrix",oe)):st.setValue(U,"projectionMatrix",M.projectionMatrix),st.setValue(U,"viewMatrix",M.matrixWorldInverse);const gn=st.map.cameraPosition;gn!==void 0&&gn.setValue(U,Pe.setFromMatrixPosition(M.matrixWorld)),He.logarithmicDepthBuffer&&st.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&st.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),y!==M&&(y=M,Pt=!0,Di=!0)}if(D.isSkinnedMesh){st.setOptional(U,D,"bindMatrix"),st.setOptional(U,D,"bindMatrixInverse");const Ut=D.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),st.setValue(U,"boneTexture",Ut.boneTexture,E))}D.isBatchedMesh&&(st.setOptional(U,D,"batchingTexture"),st.setValue(U,"batchingTexture",D._matricesTexture,E),st.setOptional(U,D,"batchingIdTexture"),st.setValue(U,"batchingIdTexture",D._indirectTexture,E),st.setOptional(U,D,"batchingColorTexture"),D._colorsTexture!==null&&st.setValue(U,"batchingColorTexture",D._colorsTexture,E));const Ui=B.morphAttributes;if((Ui.position!==void 0||Ui.normal!==void 0||Ui.color!==void 0)&&Re.update(D,B,Vt),(Pt||ye.receiveShadow!==D.receiveShadow)&&(ye.receiveShadow=D.receiveShadow,st.setValue(U,"receiveShadow",D.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Kt.envMap.value=_e,Kt.flipEnvMap.value=_e.isCubeTexture&&_e.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&I.environment!==null&&(Kt.envMapIntensity.value=I.environmentIntensity),Pt&&(st.setValue(U,"toneMappingExposure",x.toneMappingExposure),ye.needsLights&&Dc(Kt,Di),ne&&z.fog===!0&&ce.refreshFogUniforms(Kt,ne),ce.refreshMaterialUniforms(Kt,z,W,ee,u.state.transmissionRenderTarget[M.id]),Us.upload(U,La(ye),Kt,E)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Us.upload(U,La(ye),Kt,E),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&st.setValue(U,"center",D.center),st.setValue(U,"modelViewMatrix",D.modelViewMatrix),st.setValue(U,"normalMatrix",D.normalMatrix),st.setValue(U,"modelMatrix",D.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Ut=z.uniformsGroups;for(let gn=0,_n=Ut.length;gn<_n;gn++){const Da=Ut[gn];P.update(Da,Vt),P.bind(Da,Vt)}}return Vt}function Dc(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function Uc(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(M,I,B){we.get(M.texture).__webglTexture=I,we.get(M.depthTexture).__webglTexture=B;const z=we.get(M);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=B===void 0,z.__autoAllocateDepthBuffer||ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,I){const B=we.get(M);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(M,I=0,B=0){N=M,A=I,T=B;let z=!0,D=null,ne=!1,he=!1;if(M){const _e=we.get(M);if(_e.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(U.FRAMEBUFFER,null),z=!1;else if(_e.__webglFramebuffer===void 0)E.setupRenderTarget(M);else if(_e.__hasExternalTextures)E.rebindTextures(M,we.get(M.texture).__webglTexture,we.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const ve=M.depthTexture;if(_e.__boundDepthTexture!==ve){if(ve!==null&&we.has(ve)&&(M.width!==ve.image.width||M.height!==ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(M)}}const Ce=M.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(he=!0);const Ie=we.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ie[I])?D=Ie[I][B]:D=Ie[I],ne=!0):M.samples>0&&E.useMultisampledRTT(M)===!1?D=we.get(M).__webglMultisampledFramebuffer:Array.isArray(Ie)?D=Ie[B]:D=Ie,R.copy(M.viewport),H.copy(M.scissor),k=M.scissorTest}else R.copy(Se).multiplyScalar(W).floor(),H.copy(Be).multiplyScalar(W).floor(),k=Qe;if(Ee.bindFramebuffer(U.FRAMEBUFFER,D)&&z&&Ee.drawBuffers(M,D),Ee.viewport(R),Ee.scissor(H),Ee.setScissorTest(k),ne){const _e=we.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+I,_e.__webglTexture,B)}else if(he){const _e=we.get(M.texture),Ce=I||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,_e.__webglTexture,B||0,Ce)}S=-1},this.readRenderTargetPixels=function(M,I,B,z,D,ne,he){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ge=we.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&he!==void 0&&(ge=ge[he]),ge){Ee.bindFramebuffer(U.FRAMEBUFFER,ge);try{const _e=M.texture,Ce=_e.format,Ie=_e.type;if(!He.textureFormatReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=M.width-z&&B>=0&&B<=M.height-D&&U.readPixels(I,B,z,D,Ue.convert(Ce),Ue.convert(Ie),ne)}finally{const _e=N!==null?we.get(N).__webglFramebuffer:null;Ee.bindFramebuffer(U.FRAMEBUFFER,_e)}}},this.readRenderTargetPixelsAsync=async function(M,I,B,z,D,ne,he){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ge=we.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&he!==void 0&&(ge=ge[he]),ge){const _e=M.texture,Ce=_e.format,Ie=_e.type;if(!He.textureFormatReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=M.width-z&&B>=0&&B<=M.height-D){Ee.bindFramebuffer(U.FRAMEBUFFER,ge);const ve=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ve),U.bufferData(U.PIXEL_PACK_BUFFER,ne.byteLength,U.STREAM_READ),U.readPixels(I,B,z,D,Ue.convert(Ce),Ue.convert(Ie),0);const qe=N!==null?we.get(N).__webglFramebuffer:null;Ee.bindFramebuffer(U.FRAMEBUFFER,qe);const tt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Sl(U,tt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ve),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ne),U.deleteBuffer(ve),U.deleteSync(tt),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,I=null,B=0){M.isTexture!==!0&&(Vi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,M=arguments[1]);const z=Math.pow(2,-B),D=Math.floor(M.image.width*z),ne=Math.floor(M.image.height*z),he=I!==null?I.x:0,ge=I!==null?I.y:0;E.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,B,0,0,he,ge,D,ne),Ee.unbindTexture()},this.copyTextureToTexture=function(M,I,B=null,z=null,D=0){M.isTexture!==!0&&(Vi("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,M=arguments[1],I=arguments[2],D=arguments[3]||0,B=null);let ne,he,ge,_e,Ce,Ie,ve,qe,tt;const it=M.isCompressedTexture?M.mipmaps[D]:M.image;B!==null?(ne=B.max.x-B.min.x,he=B.max.y-B.min.y,ge=B.isBox3?B.max.z-B.min.z:1,_e=B.min.x,Ce=B.min.y,Ie=B.isBox3?B.min.z:0):(ne=it.width,he=it.height,ge=it.depth||1,_e=0,Ce=0,Ie=0),z!==null?(ve=z.x,qe=z.y,tt=z.z):(ve=0,qe=0,tt=0);const At=Ue.convert(I.format),Ye=Ue.convert(I.type);let ye;I.isData3DTexture?(E.setTexture3D(I,0),ye=U.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(E.setTexture2DArray(I,0),ye=U.TEXTURE_2D_ARRAY):(E.setTexture2D(I,0),ye=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,I.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,I.unpackAlignment);const rn=U.getParameter(U.UNPACK_ROW_LENGTH),je=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Vt=U.getParameter(U.UNPACK_SKIP_PIXELS),Qn=U.getParameter(U.UNPACK_SKIP_ROWS),Pt=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,it.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,it.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,_e),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ce),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ie);const Di=M.isDataArrayTexture||M.isData3DTexture,st=I.isDataArrayTexture||I.isData3DTexture;if(M.isRenderTargetTexture||M.isDepthTexture){const Kt=we.get(M),Ui=we.get(I),Ut=we.get(Kt.__renderTarget),gn=we.get(Ui.__renderTarget);Ee.bindFramebuffer(U.READ_FRAMEBUFFER,Ut.__webglFramebuffer),Ee.bindFramebuffer(U.DRAW_FRAMEBUFFER,gn.__webglFramebuffer);for(let _n=0;_n<ge;_n++)Di&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,we.get(M).__webglTexture,D,Ie+_n),M.isDepthTexture?(st&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,we.get(I).__webglTexture,D,tt+_n),U.blitFramebuffer(_e,Ce,ne,he,ve,qe,ne,he,U.DEPTH_BUFFER_BIT,U.NEAREST)):st?U.copyTexSubImage3D(ye,D,ve,qe,tt+_n,_e,Ce,ne,he):U.copyTexSubImage2D(ye,D,ve,qe,tt+_n,_e,Ce,ne,he);Ee.bindFramebuffer(U.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else st?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(ye,D,ve,qe,tt,ne,he,ge,At,Ye,it.data):I.isCompressedArrayTexture?U.compressedTexSubImage3D(ye,D,ve,qe,tt,ne,he,ge,At,it.data):U.texSubImage3D(ye,D,ve,qe,tt,ne,he,ge,At,Ye,it):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,D,ve,qe,ne,he,At,Ye,it.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,D,ve,qe,it.width,it.height,At,it.data):U.texSubImage2D(U.TEXTURE_2D,D,ve,qe,ne,he,At,Ye,it);U.pixelStorei(U.UNPACK_ROW_LENGTH,rn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,je),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Vt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Qn),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Pt),D===0&&I.generateMipmaps&&U.generateMipmap(ye),Ee.unbindTexture()},this.copyTextureToTexture3D=function(M,I,B=null,z=null,D=0){return M.isTexture!==!0&&(Vi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,z=arguments[1]||null,M=arguments[2],I=arguments[3],D=arguments[4]||0),Vi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,I,B,z,D)},this.initRenderTarget=function(M){we.get(M).__webglFramebuffer===void 0&&E.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?E.setTextureCube(M,0):M.isData3DTexture?E.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?E.setTexture2DArray(M,0):E.setTexture2D(M,0),Ee.unbindTexture()},this.resetState=function(){A=0,T=0,N=null,Ee.reset(),et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Xe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xe._getUnpackColorSpace()}}class Os{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Oe(e),this.near=t,this.far=n}clone(){return new Os(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Np extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ht,this.environmentIntensity=1,this.environmentRotation=new Ht,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Fp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ua,this.updateRanges=[],this.version=0,this.uuid=Rn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Et=new L;class Bs{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=tn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=tn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=tn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=tn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),i=Je(i,this.array),r=Je(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new $t(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Bs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Rc extends Jn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let pi;const zi=new L,mi=new L,gi=new L,_i=new Fe,ki=new Fe,Cc=new rt,Ss=new L,Hi=new L,ws=new L,Io=new Fe,Sr=new Fe,Do=new Fe;class Op extends ft{constructor(e=new Rc){if(super(),this.isSprite=!0,this.type="Sprite",pi===void 0){pi=new wt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Fp(t,5);pi.setIndex([0,1,2,0,2,3]),pi.setAttribute("position",new Bs(n,3,0,!1)),pi.setAttribute("uv",new Bs(n,2,3,!1))}this.geometry=pi,this.material=e,this.center=new Fe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),mi.setFromMatrixScale(this.matrixWorld),Cc.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),gi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&mi.multiplyScalar(-gi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Es(Ss.set(-.5,-.5,0),gi,a,mi,i,r),Es(Hi.set(.5,-.5,0),gi,a,mi,i,r),Es(ws.set(.5,.5,0),gi,a,mi,i,r),Io.set(0,0),Sr.set(1,0),Do.set(1,1);let o=e.ray.intersectTriangle(Ss,Hi,ws,!1,zi);if(o===null&&(Es(Hi.set(-.5,.5,0),gi,a,mi,i,r),Sr.set(0,1),o=e.ray.intersectTriangle(Ss,ws,Hi,!1,zi),o===null))return;const c=e.ray.origin.distanceTo(zi);c<e.near||c>e.far||t.push({distance:c,point:zi.clone(),uv:kt.getInterpolation(zi,Ss,Hi,ws,Io,Sr,Do,new Fe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Es(s,e,t,n,i,r){_i.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(ki.x=r*_i.x-i*_i.y,ki.y=i*_i.x+r*_i.y):ki.copy(_i),s.copy(e),s.x+=ki.x,s.y+=ki.y,s.applyMatrix4(Cc)}class Pc extends Jn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const zs=new L,ks=new L,Uo=new rt,Gi=new fc,bs=new Vs,wr=new L,No=new L;class Fo extends ft{constructor(e=new wt,t=new Pc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)zs.fromBufferAttribute(t,i-1),ks.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=zs.distanceTo(ks);e.setAttribute("lineDistance",new ct(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),bs.copy(n.boundingSphere),bs.applyMatrix4(i),bs.radius+=r,e.ray.intersectsSphere(bs)===!1)return;Uo.copy(i).invert(),Gi.copy(e.ray).applyMatrix4(Uo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=m,p=g-1;_<p;_+=l){const u=h.getX(_),b=h.getX(_+1),w=Ts(this,e,Gi,c,u,b);w&&t.push(w)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(m),u=Ts(this,e,Gi,c,_,p);u&&t.push(u)}}else{const m=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let _=m,p=g-1;_<p;_+=l){const u=Ts(this,e,Gi,c,_,_+1);u&&t.push(u)}if(this.isLineLoop){const _=Ts(this,e,Gi,c,g-1,m);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ts(s,e,t,n,i,r){const a=s.geometry.attributes.position;if(zs.fromBufferAttribute(a,i),ks.fromBufferAttribute(a,r),t.distanceSqToSegment(zs,ks,wr,No)>n)return;wr.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(wr);if(!(c<e.near||c>e.far))return{distance:c,point:No.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}class Bp extends Tt{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ea extends wt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new L,h=new Fe;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const m=n+d/t*i;l.x=e*Math.cos(m),l.y=e*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[f]/e+1)/2,h.y=(a[f+1]/e+1)/2,c.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ct(a,3)),this.setAttribute("normal",new ct(o,3)),this.setAttribute("uv",new ct(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ea(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Te extends wt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],f=[],m=[];let g=0;const _=[],p=n/2;let u=0;b(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new ct(d,3)),this.setAttribute("normal",new ct(f,3)),this.setAttribute("uv",new ct(m,2));function b(){const x=new L,F=new L;let A=0;const T=(t-e)/n;for(let N=0;N<=r;N++){const S=[],y=N/r,R=y*(t-e)+e;for(let H=0;H<=i;H++){const k=H/i,q=k*c+o,K=Math.sin(q),X=Math.cos(q);F.x=R*K,F.y=-y*n+p,F.z=R*X,d.push(F.x,F.y,F.z),x.set(K,T,X).normalize(),f.push(x.x,x.y,x.z),m.push(k,1-y),S.push(g++)}_.push(S)}for(let N=0;N<i;N++)for(let S=0;S<r;S++){const y=_[S][N],R=_[S+1][N],H=_[S+1][N+1],k=_[S][N+1];(e>0||S!==0)&&(h.push(y,R,k),A+=3),(t>0||S!==r-1)&&(h.push(R,H,k),A+=3)}l.addGroup(u,A,0),u+=A}function w(x){const F=g,A=new Fe,T=new L;let N=0;const S=x===!0?e:t,y=x===!0?1:-1;for(let H=1;H<=i;H++)d.push(0,p*y,0),f.push(0,y,0),m.push(.5,.5),g++;const R=g;for(let H=0;H<=i;H++){const q=H/i*c+o,K=Math.cos(q),X=Math.sin(q);T.x=S*X,T.y=p*y,T.z=S*K,d.push(T.x,T.y,T.z),f.push(0,y,0),A.x=K*.5+.5,A.y=X*.5*y+.5,m.push(A.x,A.y),g++}for(let H=0;H<i;H++){const k=F+H,q=R+H;x===!0?h.push(q,q+1,k):h.push(q+1,q,k),N+=3}l.addGroup(u,N,x===!0?1:2),u+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Te(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qt extends Te{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Qt(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Dn extends wt{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],c=[],l=[],h=[];let d=e;const f=(t-e)/i,m=new L,g=new Fe;for(let _=0;_<=i;_++){for(let p=0;p<=n;p++){const u=r+p/n*a;m.x=d*Math.cos(u),m.y=d*Math.sin(u),c.push(m.x,m.y,m.z),l.push(0,0,1),g.x=(m.x/t+1)/2,g.y=(m.y/t+1)/2,h.push(g.x,g.y)}d+=f}for(let _=0;_<i;_++){const p=_*(n+1);for(let u=0;u<n;u++){const b=u+p,w=b,x=b+n+1,F=b+n+2,A=b+1;o.push(w,x,A),o.push(x,F,A)}}this.setIndex(o),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(l,3)),this.setAttribute("uv",new ct(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class J extends wt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new L,f=new L,m=[],g=[],_=[],p=[];for(let u=0;u<=n;u++){const b=[],w=u/n;let x=0;u===0&&a===0?x=.5/t:u===n&&c===Math.PI&&(x=-.5/t);for(let F=0;F<=t;F++){const A=F/t;d.x=-e*Math.cos(i+A*r)*Math.sin(a+w*o),d.y=e*Math.cos(a+w*o),d.z=e*Math.sin(i+A*r)*Math.sin(a+w*o),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),p.push(A+x,1-w),b.push(l++)}h.push(b)}for(let u=0;u<n;u++)for(let b=0;b<t;b++){const w=h[u][b+1],x=h[u][b],F=h[u+1][b],A=h[u+1][b+1];(u!==0||a>0)&&m.push(w,x,A),(u!==n-1||c<Math.PI)&&m.push(x,F,A)}this.setIndex(m),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(_,3)),this.setAttribute("uv",new ct(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new J(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Zn extends wt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],c=[],l=[],h=new L,d=new L,f=new L;for(let m=0;m<=n;m++)for(let g=0;g<=i;g++){const _=g/i*r,p=m/n*Math.PI*2;d.x=(e+t*Math.cos(p))*Math.cos(_),d.y=(e+t*Math.cos(p))*Math.sin(_),d.z=t*Math.sin(p),o.push(d.x,d.y,d.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),f.subVectors(d,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/i),l.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=i;g++){const _=(i+1)*m+g-1,p=(i+1)*(m-1)+g-1,u=(i+1)*(m-1)+g,b=(i+1)*m+g;a.push(_,p,b),a.push(p,u,b)}this.setIndex(a),this.setAttribute("position",new ct(o,3)),this.setAttribute("normal",new ct(c,3)),this.setAttribute("uv",new ct(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class V extends Jn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cc,this.normalScale=new Fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ht,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ba extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class zp extends ba{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Er=new rt,Oo=new L,Bo=new L;class kp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Fe(512,512),this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sa,this._frameExtents=new Fe(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Oo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Oo),Bo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bo),t.updateMatrixWorld(),Er.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Er),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Er)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Hp extends kp{constructor(){super(new Sc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zo extends ba{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new Hp}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Gp extends ba{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ma}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ma);const Bt=5,zt=9,ot=1.6,en=-6.4,En=-3.2,wi=Array.from({length:Bt},(s,e)=>En+e*ot),Yi=Array.from({length:zt},(s,e)=>en+e*ot),yt={peashooter:{id:"peashooter",name:"Đậu Bắn",cost:100,hp:100,damage:20,fireRate:1.8,range:12,color:4500036,emoji:"🌱",desc:"Bắn đậu cơ bản",fuseable:!0},sunflower:{id:"sunflower",name:"Hướng Dương",cost:50,hp:80,sunInterval:6,sunAmount:25,color:16768324,emoji:"🌻",desc:"Sản xuất mặt trời",fuseable:!0},snowpea:{id:"snowpea",name:"Đậu Tuyết",cost:175,hp:100,damage:15,fireRate:2.2,range:12,slowFactor:.5,slowDuration:3,color:6737151,emoji:"❄️",desc:"Làm chậm zombie",fuseable:!0},wallnut:{id:"wallnut",name:"Tường Hạt",cost:50,hp:400,color:13404228,emoji:"🥜",desc:"Chặn zombie",fuseable:!0},cherrybomb:{id:"cherrybomb",name:"Anh Đào Nổ",cost:150,hp:50,explodeDamage:200,explodeRadius:2,color:16724787,emoji:"🍒",desc:"Nổ tung!",fuseable:!1,oneShot:!0},repeater:{id:"repeater",name:"Đậu Liên Thanh",cost:200,hp:100,damage:20,fireRate:1.4,range:12,shotsPerFire:2,color:5618517,emoji:"🔁",desc:"Bắn 2 phát",fuseable:!1},chomper:{id:"chomper",name:"Cây Nhái",cost:150,hp:80,chompDamage:60,chompInterval:2.5,range:1.5,color:10040268,emoji:"🦷",desc:"Ăn zombie",fuseable:!1},torchwood:{id:"torchwood",name:"Gỗ Đuốc",cost:175,hp:80,color:16737792,emoji:"🔥",desc:"Tăng sức đậu",fuseable:!1},iceberg:{id:"iceberg",name:"Xà Lách Băng",cost:0,hp:40,freezeDuration:5,oneShot:!0,color:8969727,emoji:"🧊",desc:"Đóng băng 1 zombie",fuseable:!1},potato:{id:"potato",name:"Khoai Tây Mìn",cost:25,hp:40,explodeDamage:150,explodeRadius:1.5,armTime:5,color:12290116,emoji:"🥔",desc:"Bẫy nổ",fuseable:!1,oneShot:!0},gatlingpea:{id:"gatlingpea",name:"Gatling Đậu",cost:325,hp:100,damage:20,range:12,maxSpinSpeed:12,spinAccel:5,spinDecel:3,color:13386820,emoji:"🔫",desc:"Nòng xoay tăng tốc, bắn liên thanh",fuseable:!1},triplepea:{id:"triplepea",name:"Đậu Ba",cost:300,hp:100,damage:20,fireRate:1.6,range:12,shotsPerFire:3,color:4491468,emoji:"3️⃣",desc:"Bắn 3 phát",fuseable:!1},laserbean:{id:"laserbean",name:"Đậu Laser",cost:250,hp:80,damage:40,fireRate:2,range:20,color:16720469,emoji:"🔴",desc:"Bắn tia laser tức thời",fuseable:!1,_laser:!0},homingpea:{id:"homingpea",name:"Đậu Tầm Nhiệt",cost:225,hp:100,damage:25,fireRate:2,range:14,color:16746496,emoji:"🎯",desc:"Đạn tự tìm mục tiêu",fuseable:!1},electropea:{id:"electropea",name:"Đậu Điện",cost:275,hp:100,damage:15,fireRate:2,range:12,color:4491519,emoji:"⚡",desc:"Điện xích 3 zombie",fuseable:!1},melon:{id:"melon",name:"Dưa Hấu",cost:350,hp:150,damage:40,fireRate:3,range:10,color:4500036,emoji:"🍉",desc:"Sát thương vùng",fuseable:!1},cobcannon:{id:"cobcannon",name:"Ngô Nổ",cost:500,hp:100,damage:80,fireRate:4,range:20,color:16768324,emoji:"🌽",desc:"Công phá mạnh nhất",fuseable:!1},pumpkin:{id:"pumpkin",name:"Bí Ngô",cost:125,hp:600,color:16746547,emoji:"🎃",desc:"Khiên bảo vệ",fuseable:!1},spikerock:{id:"spikerock",name:"Đá Gai",cost:150,hp:200,damage:10,fireRate:.8,range:.8,color:8947848,emoji:"🪨",desc:"Gai làm đau zombie",fuseable:!1},steelwall:{id:"steelwall",name:"Tường Thép",cost:175,hp:1200,color:8947916,emoji:"🛡️",desc:"Tường trâu nhất",fuseable:!1},bamboo:{id:"bamboo",name:"Tre Chắn",cost:75,hp:250,color:5614165,emoji:"🎋",desc:"Tường nhẹ",fuseable:!1},sunshroom:{id:"sunshroom",name:"Nấm Mặt Trời",cost:25,hp:40,sunInterval:5,sunAmount:15,color:16768358,emoji:"🍄",desc:"Nấm sinh nắng rẻ",fuseable:!1},sunlight:{id:"sunlight",name:"Cây Ánh Sáng",cost:75,hp:80,sunInterval:5,sunAmount:25,color:16777096,emoji:"💡",desc:"Sinh nắng ổn định",fuseable:!1},solarpanel:{id:"solarpanel",name:"Pin Mặt Trời",cost:200,hp:100,sunInterval:4,sunAmount:50,color:4491519,emoji:"☀️",desc:"Sinh nắng nhiều nhất",fuseable:!1},goldmushroom:{id:"goldmushroom",name:"Nấm Vàng",cost:100,hp:60,sunInterval:8,sunAmount:30,color:16763904,emoji:"🪙",desc:"Sinh vàng",fuseable:!1},moonflower:{id:"moonflower",name:"Hoa Mặt Trăng",cost:100,hp:80,color:10040319,emoji:"🌙",desc:"Buff cây lân cận",fuseable:!1},squash:{id:"squash",name:"Bí Đè",cost:125,hp:80,explodeDamage:150,explodeRadius:1,oneShot:!0,color:16746564,emoji:"🫃",desc:"Đè zombie tại chỗ",fuseable:!1},jalapeno:{id:"jalapeno",name:"Ớt Đỏ",cost:175,hp:50,explodeDamage:500,explodeRadius:10,oneShot:!0,color:16720418,emoji:"🌶️",desc:"Đốt cháy cả lane",fuseable:!1},garlic:{id:"garlic",name:"Tỏi",cost:50,hp:80,color:15658717,emoji:"🧄",desc:"Xua đuổi zombie",fuseable:!1},gravebuster:{id:"gravebuster",name:"Dương Tiêu",cost:75,hp:60,color:14527231,emoji:"🧹",desc:"Phá vật cản",fuseable:!1},hypnoshroom:{id:"hypnoshroom",name:"Nấm Thôi Miên",cost:125,hp:40,freezeDuration:6,oneShot:!0,color:16729343,emoji:"🌀",desc:"Thôi miên zombie",fuseable:!1},carrot:{id:"carrot",name:"Cà Rốt",cost:100,hp:80,color:16746530,emoji:"🥕",desc:"Hồi sinh cây chết",fuseable:!1},coffee:{id:"coffee",name:"Cà Phê",cost:75,hp:60,color:6702114,emoji:"☕",desc:"Tăng tốc bắn",fuseable:!1},marigold:{id:"marigold",name:"Cúc Vạn Thọ",cost:50,hp:60,sunInterval:7,sunAmount:15,color:16772676,emoji:"🌼",desc:"Phần thưởng ngẫu nhiên",fuseable:!1},umbrella:{id:"umbrella",name:"Ô Chắn",cost:100,hp:150,color:4491519,emoji:"☂️",desc:"Chắn đạn",fuseable:!1},madweed:{id:"madweed",name:"Cỏ Điên",cost:200,hp:80,damage:15,fireRate:1.5,range:10,color:16729343,emoji:"🤪",desc:"Bắn mọi hướng",fuseable:!1},lotus:{id:"lotus",name:"Sen Hồng",cost:125,hp:100,color:16746666,emoji:"🌸",desc:"Hồi máu cây lân cận",fuseable:!1},frost:{id:"frost",name:"Cây Tuyết",cost:200,hp:80,freezeDuration:3,oneShot:!0,color:11197951,emoji:"❄️",desc:"Đóng băng vùng",fuseable:!1},landmine:{id:"landmine",name:"Địa Lôi",cost:50,hp:40,explodeDamage:200,explodeRadius:1.5,armTime:4,oneShot:!0,color:5588019,emoji:"💣",desc:"Bẫy ẩn dưới đất",fuseable:!1},cactus:{id:"cactus",name:"Xương Rồng",cost:125,hp:120,damage:25,fireRate:2,range:14,color:4500053,emoji:"🌵",desc:"Bắn xuyên 2 zombie",fuseable:!1},thunder:{id:"thunder",name:"Cây Sấm Sét",cost:300,hp:80,explodeDamage:100,explodeRadius:2,oneShot:!0,color:4465407,emoji:"🌩️",desc:"Sét đánh vùng lớn",fuseable:!1}},ji=[{a:"peashooter",b:"sunflower",result:"sunpea",name:"Đậu Mặt Trời",emoji:"🌞🌱",desc:"Bắn đậu sinh mặt trời",color:16768324,cost:200,damage:18,fireRate:1.6,hp:120,sunPerHit:10},{a:"peashooter",b:"snowpea",result:"icepea",name:"Đậu Băng",emoji:"🧊🌱",desc:"Chậm + sát thương",color:7855615,cost:250,damage:22,fireRate:1.8,hp:120,slowFactor:.4,slowDuration:4},{a:"peashooter",b:"wallnut",result:"nutshooter",name:"Hạt Bắn",emoji:"🥜🌱",desc:"Bắn trâu bò",color:8956484,cost:200,damage:15,fireRate:2,hp:300},{a:"sunflower",b:"wallnut",result:"sunnut",name:"Hạt Mặt Trời",emoji:"🌻🥜",desc:"Mặt trời + khiên",color:14535748,cost:150,hp:350,sunInterval:5,sunAmount:25},{a:"snowpea",b:"wallnut",result:"icenut",name:"Hạt Băng",emoji:"🧊🥜",desc:"Tường băng",color:8965375,cost:250,hp:350,freezeAura:1.5},{a:"peashooter",b:"peashooter",result:"doublepea",name:"Đậu Kép",emoji:"🌱🌱",desc:"Bắn 2 phát",color:5622869,cost:200,damage:20,fireRate:1.4,hp:120,shotsPerFire:2},{a:"sunflower",b:"sunflower",result:"twinflower",name:"Hoa Đôi",emoji:"🌻🌻",desc:"Mặt trời đôi",color:16768324,cost:150,hp:100,sunInterval:4,sunAmount:25},{a:"snowpea",b:"snowpea",result:"wintermelon",name:"Dưa Mùa Đông",emoji:"❄️🍈",desc:"Chậm diện rộng",color:8969727,cost:300,damage:30,fireRate:2.5,hp:150,slowFactor:.3,slowDuration:4,aoeRadius:1.5},{a:"wallnut",b:"wallnut",result:"tallnut",name:"Hạt Cao",emoji:"🥜🥜",desc:"Tường siêu cấp",color:13408597,cost:150,hp:800}],Lc={basic:{id:"basic",name:"Zombie Cơ Bản",hp:100,speed:.25,damage:10,attackInterval:1,color:8956535,emoji:"🧟",score:10},cone:{id:"cone",name:"Zombie Nón",hp:200,speed:.3,damage:10,attackInterval:1,color:16746547,emoji:"🧟‍♂️",score:20},bucket:{id:"bucket",name:"Zombie Xô",hp:550,speed:.2,damage:10,attackInterval:1,color:13421772,emoji:"🧟‍♀️",score:30},flag:{id:"flag",name:"Zombie Cờ",hp:100,speed:.5,damage:10,attackInterval:1,color:16729156,emoji:"🚩",score:15},football:{id:"football",name:"Zombie Bóng Bầu",hp:300,speed:.7,damage:15,attackInterval:.8,color:13386820,emoji:"🏈",score:25},boss:{id:"boss",name:"Trùm Zombie",hp:2e3,speed:.15,damage:30,attackInterval:1.5,color:11141290,emoji:"👑",score:200,isBoss:!0},giant:{id:"giant",name:"Zombie Khổng Lồ",hp:1500,speed:.18,damage:40,attackInterval:2,color:5592405,emoji:"🦍",score:150,isBoss:!0}},pa={meadow:{label:"Bãi Cỏ",sky:8900331,fog:8900331,fogNear:25,fogFar:40,ground:4885567,groundStrip:4028979,grid:5938762,gridEdge:3832362,ambient:8952251,sunColor:16772829,sunIntensity:1.8},bamboo:{label:"Rừng Tre",sky:5933658,fog:4880970,fogNear:18,fogFar:32,ground:4025134,groundStrip:3037730,grid:4880954,gridEdge:3037730,ambient:6719590,sunColor:13426056,sunIntensity:1.4},desert:{label:"Sa Mạc",sky:15779962,fog:15251562,fogNear:22,fogFar:38,ground:13412949,groundStrip:12294468,grid:13938784,gridEdge:11175987,ambient:13417352,sunColor:16763972,sunIntensity:2.2},swamp:{label:"Đầm Lầy",sky:3824186,fog:2771498,fogNear:14,fogFar:28,ground:2775594,groundStrip:1722906,grid:3828282,gridEdge:1718810,ambient:4478276,sunColor:10070630,sunIntensity:1},snow:{label:"Tuyết",sky:13426175,fog:14544639,fogNear:20,fogFar:35,ground:14544639,groundStrip:13430527,grid:13426175,gridEdge:11193582,ambient:11189230,sunColor:16777215,sunIntensity:1.6},sunset:{label:"Hoàng Hôn",sky:14513988,fog:13395507,fogNear:20,fogFar:35,ground:8934707,groundStrip:7816226,grid:10053188,gridEdge:6697762,ambient:13404262,sunColor:16746564,sunIntensity:1.5},night:{label:"Biển Đêm",sky:657966,fog:657966,fogNear:16,fogFar:30,ground:1710650,groundStrip:986926,grid:2763338,gridEdge:1710650,ambient:2241365,sunColor:4482730,sunIntensity:.6},volcano:{label:"Núi Lửa",sky:6693410,fog:5574929,fogNear:14,fogFar:28,ground:5583650,groundStrip:4465169,grid:6702131,gridEdge:4465169,ambient:5583667,sunColor:16729122,sunIntensity:2},haunted:{label:"Rừng Ma",sky:1706542,fog:1706542,fogNear:14,fogFar:28,ground:2759226,groundStrip:2035502,grid:3811914,gridEdge:2035502,ambient:3351108,sunColor:8930474,sunIntensity:.7},space:{label:"Không Gian",sky:17,fog:17,fogNear:18,fogFar:32,ground:1118498,groundStrip:657946,grid:2236979,gridEdge:1118498,ambient:1118515,sunColor:4491519,sunIntensity:.8}},Cn=[{number:1,theme:"meadow",availablePlants:["peashooter","sunflower","wallnut"],rewards:["peashooter","sunflower","wallnut"],waves:[{zombies:[{type:"basic",count:3}],spawnInterval:4,prepTime:8},{zombies:[{type:"basic",count:4}],spawnInterval:3.5,prepTime:5},{zombies:[{type:"basic",count:2},{type:"cone",count:1},{type:"boss",count:1}],spawnInterval:3,prepTime:5}]},{number:2,theme:"bamboo",availablePlants:["peashooter","sunflower","snowpea","wallnut","potato"],rewards:["snowpea","potato","bamboo"],waves:[{zombies:[{type:"basic",count:4},{type:"cone",count:1}],spawnInterval:3.5,prepTime:6},{zombies:[{type:"basic",count:2},{type:"cone",count:3}],spawnInterval:3,prepTime:5},{zombies:[{type:"basic",count:3},{type:"cone",count:2},{type:"boss",count:1}],spawnInterval:3,prepTime:5}]},{number:3,theme:"desert",availablePlants:["peashooter","sunflower","snowpea","wallnut","cherrybomb"],rewards:["cherrybomb","cactus","sunlight"],waves:[{zombies:[{type:"basic",count:3},{type:"cone",count:2}],spawnInterval:3,prepTime:5},{zombies:[{type:"cone",count:4},{type:"flag",count:1}],spawnInterval:2.8,prepTime:5},{zombies:[{type:"cone",count:3},{type:"flag",count:1},{type:"boss",count:1}],spawnInterval:2.8,prepTime:5}]},{number:4,theme:"swamp",availablePlants:["peashooter","sunflower","wallnut","repeater","potato","torchwood"],rewards:["repeater","torchwood","lotus","spikerock"],waves:[{zombies:[{type:"cone",count:4},{type:"basic",count:2}],spawnInterval:2.8,prepTime:5},{zombies:[{type:"bucket",count:2},{type:"cone",count:2}],spawnInterval:2.5,prepTime:5},{zombies:[{type:"bucket",count:2},{type:"cone",count:2},{type:"boss",count:1}],spawnInterval:2.5,prepTime:5}]},{number:5,theme:"snow",availablePlants:["peashooter","sunflower","snowpea","wallnut","cherrybomb","repeater","chomper"],rewards:["chomper","frost","umbrella","iceberg"],waves:[{zombies:[{type:"bucket",count:3},{type:"cone",count:2}],spawnInterval:2.5,prepTime:5},{zombies:[{type:"bucket",count:2},{type:"cone",count:2},{type:"football",count:1}],spawnInterval:2.5,prepTime:5},{zombies:[{type:"bucket",count:2},{type:"cone",count:2},{type:"football",count:1},{type:"giant",count:1}],spawnInterval:2.5,prepTime:6}]},{number:6,theme:"sunset",availablePlants:["peashooter","sunflower","snowpea","wallnut","repeater","torchwood","chomper","potato"],rewards:["pumpkin","garlic","marigold","coffee","goldmushroom"],waves:[{zombies:[{type:"bucket",count:4},{type:"cone",count:2}],spawnInterval:2.5,prepTime:5},{zombies:[{type:"bucket",count:3},{type:"football",count:2}],spawnInterval:2.5,prepTime:5},{zombies:[{type:"bucket",count:3},{type:"football",count:2},{type:"boss",count:1}],spawnInterval:2.5,prepTime:5}]},{number:7,theme:"night",availablePlants:["peashooter","sunflower","snowpea","wallnut","cherrybomb","repeater","chomper","torchwood","potato"],rewards:["sunshroom","moonflower","electropea","carrot"],waves:[{zombies:[{type:"bucket",count:5},{type:"football",count:2}],spawnInterval:2.2,prepTime:5},{zombies:[{type:"bucket",count:3},{type:"football",count:3},{type:"flag",count:1}],spawnInterval:2.2,prepTime:5},{zombies:[{type:"bucket",count:3},{type:"football",count:2},{type:"giant",count:1}],spawnInterval:2.2,prepTime:5}]},{number:8,theme:"volcano",availablePlants:["peashooter","sunflower","snowpea","wallnut","cherrybomb","repeater","chomper","torchwood","potato"],rewards:["squash","jalapeno","landmine","thunder","triplepea"],waves:[{zombies:[{type:"bucket",count:4},{type:"football",count:3},{type:"basic",count:2}],spawnInterval:2,prepTime:5},{zombies:[{type:"bucket",count:3},{type:"football",count:3},{type:"cone",count:1}],spawnInterval:2,prepTime:5},{zombies:[{type:"bucket",count:3},{type:"football",count:3},{type:"boss",count:1}],spawnInterval:2,prepTime:6}]},{number:9,theme:"haunted",availablePlants:["peashooter","sunflower","snowpea","wallnut","cherrybomb","repeater","chomper","torchwood","potato"],rewards:["hypnoshroom","gravebuster","madweed","cobcannon","gatlingpea"],waves:[{zombies:[{type:"bucket",count:5},{type:"football",count:3}],spawnInterval:2,prepTime:5},{zombies:[{type:"bucket",count:4},{type:"football",count:4}],spawnInterval:1.8,prepTime:5},{zombies:[{type:"bucket",count:4},{type:"football",count:3},{type:"giant",count:1},{type:"boss",count:1}],spawnInterval:1.8,prepTime:6}]},{number:10,theme:"space",availablePlants:["peashooter","sunflower","snowpea","wallnut","cherrybomb","repeater","chomper","torchwood","potato"],rewards:["laserbean","homingpea","melon","solarpanel","steelwall"],waves:[{zombies:[{type:"bucket",count:6},{type:"football",count:3},{type:"cone",count:2}],spawnInterval:1.8,prepTime:5},{zombies:[{type:"bucket",count:5},{type:"football",count:4},{type:"cone",count:2}],spawnInterval:1.5,prepTime:5},{zombies:[{type:"bucket",count:4},{type:"football",count:4},{type:"giant",count:2},{type:"boss",count:1}],spawnInterval:1.5,prepTime:6}]}],ko=[{number:11,zombies:[{type:"basic",count:6},{type:"cone",count:4},{type:"bucket",count:3},{type:"football",count:2}],spawnInterval:2,prepTime:4},{number:12,zombies:[{type:"cone",count:5},{type:"bucket",count:4},{type:"football",count:3}],spawnInterval:2,prepTime:4},{number:13,zombies:[{type:"basic",count:8},{type:"bucket",count:4},{type:"football",count:3},{type:"giant",count:1}],spawnInterval:1.8,prepTime:5},{number:14,zombies:[{type:"basic",count:10},{type:"cone",count:6},{type:"bucket",count:4},{type:"football",count:3},{type:"boss",count:1}],spawnInterval:1.5,prepTime:5}],Ho={fast:{name:"Nhanh",speedMul:1.5,hpMul:.9,color:4521796,desc:"Di chuyển nhanh hơn"},armored:{name:"Giáp",hpMul:2.5,speedMul:.8,color:8947848,desc:"Máu gấp đôi rưỡi"},fire:{name:"Lửa",speedMul:1.1,damageMul:1.3,color:16729088,desc:"Tấn công mạnh, để lại lửa"},icy:{name:"Băng",hpMul:1.4,color:6737151,desc:"Làm chậm cây khi cắn"},regenerating:{name:"Hồi Phục",hpMul:.8,regenPerSec:8,color:8978312,desc:"Hồi máu theo thời gian"},explosive:{name:"Phát Nổ",color:16737792,explodeDmg:60,desc:"Nổ khi chết"}},xi={elite_cone:{base:"cone",name:"Nón Kim Loại",hpMul:2.5,speedMul:1.1,damageMul:1.5,color:14540117,scoreMul:3},elite_bucket:{base:"bucket",name:"Xô Vàng",hpMul:2,speedMul:1,damageMul:1.5,color:16768256,scoreMul:3},elite_football:{base:"football",name:"Bóng Bầu Dị Chủng",hpMul:2,speedMul:1.4,damageMul:1.5,color:14492194,scoreMul:3},miniboss:{base:"giant",name:"Mini Trùm",hpMul:3,speedMul:.6,damageMul:2,color:8930559,scoreMul:5}},Xi={swarm:{name:"Bầy Đàn",color:"#44ff44",desc:"Zombie đông hơn nhưng yếu",hpMul:.6,countMul:2,spawnIntervalMul:.7},horde:{name:"Đại Hội",color:"#ff8844",desc:"Spawn nhanh gấp đôi",spawnIntervalMul:.5,countMul:1.3},rush:{name:"Xung Kích",color:"#ff4444",desc:"Zombie lao nhanh",speedMul:1.6,countMul:.8},night:{name:"Bóng Đêm",color:"#4444ff",desc:"Zombie mạnh hơn trong bóng tối",hpMul:1.25,speedMul:1.15},poison:{name:"Độc Tố",color:"#88ff44",desc:"Zombie để lại vũng độc",poisonTrail:!0},ice_wind:{name:"Gió Băng",color:"#66ccff",desc:"Làm chậm toàn bộ",slowFactor:.6},armored_wave:{name:"Thiết Giáp",color:"#aaaaaa",desc:"Zombie có thêm giáp",bonusHp:80}},Vp={firePuddle:{name:"Vũng Lửa",color:16729088,damagePerSec:20,duration:8,radius:.6},icePatch:{name:"Băng Trơn",color:8965375,slowFactor:.35,duration:7,radius:.5},toxicCloud:{name:"Mây Độc",color:8978244,damagePerSec:15,duration:6,radius:.7}},Wp=150,Go=8,Xp=8,qp=-7.5;class Yp{constructor(e){this.container=e,this.scene=new Np,this.scene.background=new Oe(8900331),this.scene.fog=new Os(8900331,25,40);const t=e.clientWidth/e.clientHeight;this.camera=new Ot(35,t,.1,50),this.camera.position.set(0,14,11),this.camera.lookAt(0,0,0),this._baseCamPos=this.camera.position.clone(),this.renderer=new Up({antialias:!0}),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=jo,this.renderer.toneMapping=$o,this.renderer.toneMappingExposure=1.2,e.appendChild(this.renderer.domElement),this.groundMesh=null,this.stripMeshes=[],this.gridHelpers=[],this.gridLineHelpers=[],this.ambientLight=null,this.sunLight=null,this._shakeIntensity=0,this._shakeTimer=0,this._shakeDuration=0,this._flashMesh=null,this._flashTimer=0,this._flashDuration=0,this._setupLights(),this._createGround(),this._createGrid(),this._createDecorations(),this._handleResize(),this._createFlashOverlay()}_setupLights(){const e=new Gp(8952251,.6);this.scene.add(e),this.ambientLight=e;const t=new zp(8900331,3828533,.5);this.scene.add(t);const n=new zo(16772829,1.8);n.position.set(10,20,5),n.castShadow=!0,n.shadow.mapSize.width=2048,n.shadow.mapSize.height=2048,n.shadow.camera.near=.5,n.shadow.camera.far=40,n.shadow.camera.left=-12,n.shadow.camera.right=12,n.shadow.camera.top=12,n.shadow.camera.bottom=-12,this.scene.add(n),this.sunLight=n;const i=new zo(8947967,.3);i.position.set(-5,10,-5),this.scene.add(i)}_createFlashOverlay(){const e=new nn(30,20),t=new Ln({color:16777215,transparent:!0,opacity:0,depthTest:!1,side:_t});this._flashMesh=new C(e,t),this._flashMesh.position.set(0,.5,-1),this._flashMesh.renderOrder=999,this.scene.add(this._flashMesh)}flash(e=16777215,t=.15){this._flashMesh&&(this._flashMesh.material.color.setHex(e),this._flashMesh.material.opacity=.5,this._flashTimer=t,this._flashDuration=t)}shake(e=.3,t=.2){this._shakeIntensity=e,this._shakeDuration=t,this._shakeTimer=t}_createGround(){const e=new nn(28,16),t=new V({color:4885567,roughness:.9}),n=new C(e,t);n.rotation.x=-Math.PI/2,n.position.set(0,-.05,0),n.receiveShadow=!0,this.scene.add(n),this.groundMesh=n;const i=new nn(28,1.2),r=new V({color:4028979,roughness:.9});this.stripMeshes=[];for(let a=0;a<Bt;a++){const o=new C(i,r.clone());o.rotation.x=-Math.PI/2,o.position.set(0,-.04,En+a*ot),this.scene.add(o),this.stripMeshes.push(o)}}_createGrid(){const e=new V({color:5938762,roughness:.8,transparent:!0,opacity:.15}),t=new nn(ot*.9,ot*.9);this.gridHelpers=[];for(let i=0;i<Bt;i++)for(let r=0;r<zt;r++){const a=new C(t,e.clone());a.rotation.x=-Math.PI/2,a.position.set(Yi[r],-.03,wi[i]),this.scene.add(a),this.gridHelpers.push(a)}const n=new Pc({color:3832362,transparent:!0,opacity:.3});this.gridLineHelpers=[];for(let i=0;i<=Bt;i++){const r=En+(i-.5)*ot,a=[new L(en-ot*.5,0,r),new L(en+(zt-1)*ot+ot*.5,0,r)],o=new wt().setFromPoints(a),c=new Fo(o,n.clone());this.scene.add(c),this.gridLineHelpers.push(c)}for(let i=0;i<=zt;i++){const r=en+(i-.5)*ot,a=[new L(r,0,En-ot*.5),new L(r,0,En+(Bt-1)*ot+ot*.5)],o=new wt().setFromPoints(a),c=new Fo(o,n.clone());this.scene.add(c),this.gridLineHelpers.push(c)}}_createDecorations(){const e=new V({color:9137742,roughness:.8});for(let n=0;n<Bt;n++){const i=En+n*ot,r=new C(new St(.12,.6,.12),e.clone());r.position.set(en-ot*.5-.3,.2,i),this.scene.add(r);const a=new C(new St(.12,.6,.12),e.clone());a.position.set(en+(zt-1)*ot+ot*.5+.3,.2,i),this.scene.add(a)}const t=new V({color:2976542,roughness:.9});for(let n=0;n<6;n++){const i=new C(new J(.3+Math.random()*.2,6),t.clone());i.position.set(en+(zt-1)*ot+1.2+Math.random()*1.5,.15,En-1+Math.random()*(Bt*ot+2)),i.castShadow=!0,this.scene.add(i)}}setTheme(e){this.scene.background=new Oe(e.sky),this.scene.fog=new Os(e.fog,e.fogNear||25,e.fogFar||40),this.groundMesh&&this.groundMesh.material.color.setHex(e.ground),this.stripMeshes.forEach(t=>t.material.color.setHex(e.groundStrip)),this.gridHelpers.forEach(t=>t.material.color.setHex(e.grid)),this.gridLineHelpers.forEach(t=>t.material.color.setHex(e.gridEdge)),this.ambientLight&&this.ambientLight.color.setHex(e.ambient),this.sunLight&&(this.sunLight.color.setHex(e.sunColor),this.sunLight.intensity=e.sunIntensity)}_handleResize(){window.addEventListener("resize",()=>{const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)})}screenToWorld(e,t){const n=this.renderer.domElement.getBoundingClientRect(),i=(e-n.left)/n.width*2-1,r=-((t-n.top)/n.height)*2+1,a=new L(i,r,.5);a.unproject(this.camera);const o=a.sub(this.camera.position).normalize(),c=-this.camera.position.y/o.y,l=this.camera.position.clone().add(o.multiplyScalar(c));return{x:l.x,z:l.z}}highlightCell(e,t,n=!0){const i=e*zt+t;this.gridHelpers[i]&&(this.gridHelpers[i].material.color.setHex(n?8978278:5938762),this.gridHelpers[i].material.opacity=n?.4:.15)}clearHighlights(){this.gridHelpers.forEach(e=>{e.material.color.setHex(5938762),e.material.opacity=.15})}update(e){if(this._shakeTimer>0){this._shakeTimer-=e;const t=this._shakeTimer/this._shakeDuration,n=this._shakeIntensity*t;this.camera.position.x=this._baseCamPos.x+(Math.random()-.5)*n*2,this.camera.position.z=this._baseCamPos.z+(Math.random()-.5)*n*1.5,this.camera.lookAt(0,0,0)}else this.camera.position.x!==this._baseCamPos.x&&(this.camera.position.copy(this._baseCamPos),this.camera.lookAt(0,0,0));if(this._flashTimer>0){this._flashTimer-=e;const t=this._flashTimer/this._flashDuration;this._flashMesh.material.opacity=t*.5}else this._flashMesh.material.opacity=0}render(){this.renderer.render(this.scene,this.camera)}}class jp{constructor(){this.cells=[];for(let e=0;e<Bt;e++){this.cells[e]=[];for(let t=0;t<zt;t++)this.cells[e][t]={row:e,col:t,plant:null,occupied:!1}}}worldToGrid(e,t){const n=Math.round((e-en)/ot),i=Math.round((t-En)/ot);return i<0||i>=Bt||n<0||n>=zt?null:{row:i,col:n}}gridToWorld(e,t){return{x:Yi[t],z:wi[e]}}isOccupied(e,t){return e<0||e>=Bt||t<0||t>=zt?!0:this.cells[e][t].occupied}getPlantAt(e,t){return e<0||e>=Bt||t<0||t>=zt?null:this.cells[e][t].plant}placePlant(e,t,n){return this.isOccupied(e,t)?!1:(this.cells[e][t].plant=n,this.cells[e][t].occupied=!0,!0)}removePlant(e,t){const n=this.cells[e][t].plant;return this.cells[e][t].plant=null,this.cells[e][t].occupied=!1,n}getNeighbor(e,t,n){switch(n){case"up":return{row:e-1,col:t};case"down":return{row:e+1,col:t};case"left":return{row:e,col:t-1};case"right":return{row:e,col:t+1};default:return null}}findAdjacentPlants(e,t){const n=[];for(const i of["up","down","left","right"]){const r=this.getNeighbor(e,t,i);r&&this.isInBounds(r.row,r.col)&&this.cells[r.row][r.col].occupied&&n.push({...r,plant:this.cells[r.row][r.col].plant})}return n}isInBounds(e,t){return e>=0&&e<Bt&&t>=0&&t<zt}}class Zp{constructor(e){this.container=e,this.clickCallbacks=[],this.callbacks={click:[],mousemove:[]},this.mouseX=0,this.mouseY=0,this._bindEvents()}_bindEvents(){this.container.addEventListener("click",e=>{this.callbacks.click.forEach(t=>t(e.clientX,e.clientY))}),this.container.addEventListener("mousemove",e=>{this.mouseX=e.clientX,this.mouseY=e.clientY,this.callbacks.mousemove.forEach(t=>t(e.clientX,e.clientY))}),this.container.addEventListener("touchstart",e=>{e.preventDefault();const t=e.touches[0];this.mouseX=t.clientX,this.mouseY=t.clientY,this.callbacks.click.forEach(n=>n(t.clientX,t.clientY))},{passive:!1}),this.container.addEventListener("touchmove",e=>{e.preventDefault();const t=e.touches[0];this.mouseX=t.clientX,this.mouseY=t.clientY},{passive:!1})}onClick(e){this.callbacks.click.push(e)}onMouseMove(e){this.callbacks.mousemove.push(e)}}function Ze(s,e){return Math.random()*(e-s)+s}function Hn(s,e){return Math.floor(Ze(s,e+1))}class $p{constructor(e,t){this.scene=e,this.audio=t,this.sun=150,this.suns=[],this.sunTimer=0,this.nextDrop=Go}setSun(e){this.sun=e,this._updateUI()}addSun(e){this.sun+=e,this._updateUI()}spend(e){return this.sun<e?!1:(this.sun-=e,this._updateUI(),!0)}canAfford(e){return this.sun>=e}getSun(){return this.sun}_updateUI(){const e=document.getElementById("sun-amount");e&&(e.textContent=Math.floor(this.sun))}dropSunAt(e,t,n=25){const i=new L(e,.5,t),r=.3,a=new J(.2,8),o=new V({color:16768324,emissive:16755200,emissiveIntensity:.3}),c=new C(a,o);c.position.copy(i),c.position.y=4,c.castShadow=!0,this.scene.add(c);const l=new C(new Dn(.22,.28,16),new Ln({color:16768324,transparent:!0,opacity:.6,side:_t}));l.position.copy(i),l.position.y=.05,l.rotation.x=-Math.PI/2,this.scene.add(l),this.suns.push({mesh:c,ring:l,pos:i.clone(),targetY:r,amount:n,life:8,state:"falling",velY:0,bobTime:Ze(0,Math.PI*2),scale:0})}dropSun(e=25){const t=Ze(-4,4),n=Ze(-3,3);this.dropSunAt(t,n,e)}collectSun(e){const t=this.suns.indexOf(e);t!==-1&&(this.scene.remove(e.mesh),this.scene.remove(e.ring),e.mesh.geometry.dispose(),e.mesh.material.dispose(),e.ring.geometry.dispose(),e.ring.material.dispose(),this.suns.splice(t,1),this.addSun(e.amount),this.audio.playSunCollect())}update(e){this.sunTimer+=e,this.sunTimer>=this.nextDrop&&(this.sunTimer=0,this.nextDrop=Go+Ze(-2,2),this.dropSun());for(let t=this.suns.length-1;t>=0;t--){const n=this.suns[t];n.life-=e,n.state==="falling"&&(n.velY+=-9.8*e,n.mesh.position.y+=n.velY*e,n.mesh.position.y<=n.targetY&&(n.mesh.position.y=n.targetY,n.velY=0,n.state="idle"),n.scale=Math.min(1,n.scale+e*8),n.mesh.scale.setScalar(n.scale),n.ring.scale.setScalar(n.scale)),n.state==="idle"&&(n.bobTime+=e*2,n.mesh.position.y=n.targetY+Math.sin(n.bobTime)*.08,n.ring.material.opacity=.3+Math.sin(n.bobTime)*.15,n.ring.scale.setScalar(.8+Math.sin(n.bobTime+1)*.15)),n.life<=0&&n.state==="idle"&&this.collectSun(n)}}hitTest(e,t){for(const n of this.suns){const i=n.mesh.position.x-e,r=n.mesh.position.z-t;if(i*i+r*r<.6*.6)return n}return null}clear(){this.suns.forEach(e=>{this.scene.remove(e.mesh),this.scene.remove(e.ring),e.mesh.geometry.dispose(),e.mesh.material.dispose(),e.ring.geometry.dispose(),e.ring.material.dispose()}),this.suns=[]}}function Kp(s,e){const t=new jn,n=new Oe(e),i=new V({color:n,roughness:.6,metalness:.1});switch(s){case"peashooter":case"repeater":case"doublepea":case"sunpea":case"icepea":case"nutshooter":{const r=new C(new Te(.08,.12,.5,6),new V({color:3385907,roughness:.7}));r.position.y=.25,t.add(r);const a=new C(new J(.2,8),i);a.position.y=.55,a.castShadow=!0,t.add(a);const o=new C(new Te(.15,.2,.15,8),i);o.position.y=.75,t.add(o);const c=new C(new J(.05,6),new V({color:16777215}));c.position.set(-.07,.78,.12),t.add(c);const l=new C(new J(.05,6),new V({color:16777215}));l.position.set(.07,.78,.12),t.add(l);const h=new C(new J(.025,6),new V({color:0}));h.position.set(-.07,.78,.16),t.add(h);const d=new C(new J(.025,6),new V({color:0}));d.position.set(.07,.78,.16),t.add(d);const f=new C(new Te(.04,.06,.12,6),new V({color:2254370}));f.rotation.x=Math.PI/3,f.position.set(0,.65,.18),t.add(f);const m=new V({color:3385907,roughness:.7}),g=new C(new J(.1,6),m);g.position.set(-.2,.3,0),g.scale.set(1,.3,.6),t.add(g);const _=new C(new J(.1,6),m);if(_.position.set(.2,.3,0),_.scale.set(1,.3,.6),t.add(_),s==="repeater"||s==="doublepea"){const p=new C(new Te(.1,.15,.12,8),i);p.position.set(0,.9,-.05),t.add(p)}if(s==="sunpea"){const p=new C(new J(.08,8),new V({color:16768324,emissive:16755200,emissiveIntensity:.3}));p.position.set(0,.55,.22),t.add(p)}if(s==="icepea"){const p=new C(new J(.06,6),new V({color:16777215,emissive:6737151,emissiveIntensity:.2}));p.position.set(0,.55,.2),t.add(p)}break}case"sunflower":case"twinflower":{const r=new C(new Te(.08,.12,.5,6),new V({color:3385907,roughness:.7}));r.position.y=.25,t.add(r);const a=new C(new J(.18,8),new V({color:8930338,roughness:.8}));a.position.y=.6,t.add(a);const o=new V({color:16768324,roughness:.5});for(let f=0;f<8;f++){const m=f/8*Math.PI*2,g=new C(new J(.1,6),o);g.scale.set(.5,.2,1.5),g.position.set(Math.cos(m)*.2,.6+Math.sin(m*2)*.02,Math.sin(m)*.2),g.lookAt(0,.6,0),t.add(g)}const c=new C(new J(.08,6),new V({color:6697745}));c.position.set(0,.58,.18),t.add(c);const l=new V({color:3385907,roughness:.7}),h=new C(new J(.08,6),l);h.position.set(-.15,.25,0),h.scale.set(1.5,.3,.6),t.add(h);const d=new C(new J(.08,6),l);if(d.position.set(.15,.25,0),d.scale.set(1.5,.3,.6),t.add(d),s==="twinflower"){const f=new C(new J(.14,8),new V({color:8930338,roughness:.8}));f.position.set(.15,.75,.05),t.add(f);for(let m=0;m<6;m++){const g=m/6*Math.PI*2,_=new C(new J(.08,6),o);_.scale.set(.4,.15,1.2),_.position.set(.15+Math.cos(g)*.15,.75+Math.sin(g*2)*.02,.05+Math.sin(g)*.15),_.lookAt(.15,.75,.05),t.add(_)}}break}case"snowpea":case"icenut":case"wintermelon":{const r=new C(new Te(.08,.12,.5,6),new V({color:3385907,roughness:.7}));r.position.y=.25,t.add(r);const a=new C(new J(.22,8),i);a.position.y=.55,a.castShadow=!0,t.add(a);const o=new C(new J(.12,6),new V({color:16777215,emissive:6737151,emissiveIntensity:.2}));o.position.set(0,.75,0),o.scale.set(1,.4,1),t.add(o);const c=new C(new J(.04,6),new V({color:13158}));if(c.position.set(0,.52,.2),t.add(c),s==="wintermelon"){a.scale.set(1.3,1.1,1.3);const l=new C(new J(.16,6),new V({color:16777215,emissive:6737151,emissiveIntensity:.3}));l.position.set(0,.8,0),l.scale.set(1,.3,1),t.add(l)}break}case"wallnut":case"tallnut":case"sunnut":{const r=new C(new J(s==="tallnut"?.35:.25,8),i);r.position.y=s==="tallnut"?.5:.3,r.scale.set(1,s==="tallnut"?1.6:1.2,1),r.castShadow=!0,t.add(r);const a=new C(new J(.06,6),new V({color:6702114}));if(a.position.set(0,.3,.22),t.add(a),s==="sunnut"){const o=new C(new J(.1,8),new V({color:16768324,emissive:16755200,emissiveIntensity:.2}));o.position.set(0,.55,0),t.add(o)}break}case"cherrybomb":{const r=new C(new J(.2,8),i);r.position.y=.25,r.castShadow=!0,t.add(r);const a=new C(new J(.15,8),i);a.position.set(.15,.3,.05),t.add(a);const o=new C(new Te(.03,.04,.15,4),new V({color:3385907}));o.position.set(.07,.42,.02),t.add(o);const c=new C(new Te(.02,.02,.08,4),new V({color:8939076}));c.position.set(.12,.48,.05),c.rotation.x=.3,t.add(c);break}case"chomper":{const r=new C(new J(.22,8),i);r.position.y=.25,r.castShadow=!0,t.add(r);const a=new C(new St(.2,.08,.25),new V({color:16737894}));a.position.set(0,.15,.2),t.add(a);const o=new C(new Qt(.03,.06,4),new V({color:16777215}));o.position.set(0,.12,.34),t.add(o);const c=new C(new J(.05,6),new V({color:16777215}));c.position.set(0,.32,.18),t.add(c);const l=new C(new J(.025,6),new V({color:0}));l.position.set(0,.32,.22),t.add(l);break}case"torchwood":{const r=new C(new Te(.12,.2,.5,6),new V({color:8934690,roughness:.9}));r.position.y=.25,t.add(r);const a=new C(new Qt(.12,.25,6),new V({color:16737792,emissive:16729088,emissiveIntensity:.5}));a.position.y=.55,t.add(a);const o=new C(new Qt(.06,.15,6),new V({color:16755200,emissive:16746496,emissiveIntensity:.6}));o.position.y=.62,t.add(o);const c=new C(new J(.04,6),new V({color:16768256}));c.position.set(0,.3,.15),t.add(c);break}case"potato":{const r=new C(new J(.18,8),i);r.position.y=.1,r.scale.set(1,.7,1),r.castShadow=!0,t.add(r);const a=new C(new J(.03,6),new V({color:0}));a.position.set(.06,.12,.15),t.add(a);const o=new C(new J(.03,6),new V({color:0}));o.position.set(-.06,.12,.15),t.add(o);break}case"iceberg":{const r=new C(new J(.15,8),i);r.position.y=.12,r.scale.set(1,.6,1),r.castShadow=!0,t.add(r);const a=new C(new J(.08,6),new V({color:16777215,emissive:6737151,emissiveIntensity:.2}));a.position.set(0,.22,0),t.add(a);break}case"gatlingpea":case"triplepea":{const r=new C(new Te(.08,.12,.5,6),new V({color:3385907,roughness:.7}));r.position.y=.25,t.add(r);const a=new C(new J(.2,8),i);a.position.y=.55,a.castShadow=!0,t.add(a);const o=new C(new Te(.18,.22,.18,8),i);o.position.y=.78,t.add(o);const c=new C(new J(.04,6),new V({color:16777215}));c.position.set(-.06,.8,.14),t.add(c);const l=new C(new J(.04,6),new V({color:16777215}));if(l.position.set(.06,.8,.14),t.add(l),s==="triplepea"){const m=new C(new Te(.08,.1,.1,6),i);m.setRotationFromEuler(new Ht(Math.PI/3,0,-.3)),m.position.set(0,.85,.18),t.add(m);const g=new C(new Te(.08,.1,.1,6),i);g.setRotationFromEuler(new Ht(Math.PI/3,0,.3)),g.position.set(0,.85,.18),t.add(g)}if(s==="gatlingpea"){const m=new jn;m.name="barrelGroup";const g=new V({color:13386820,roughness:.3,metalness:.3});for(let _=0;_<4;_++){const p=_/4*Math.PI*2,u=new C(new Te(.025,.035,.25,6),g);u.position.set(Math.cos(p)*.08,Math.sin(p)*.08,.12),u.rotation.x=Math.PI/2,m.add(u)}m.position.y=.78,t.add(m)}const h=new V({color:3385907,roughness:.7}),d=new C(new J(.08,6),h);d.position.set(-.18,.3,0),d.scale.set(1.5,.3,.6),t.add(d);const f=new C(new J(.08,6),h);f.position.set(.18,.3,0),f.scale.set(1.5,.3,.6),t.add(f);break}case"laserbean":{const r=new C(new Te(.06,.1,.4,6),new V({color:3385907}));r.position.y=.2,t.add(r);const a=new C(new J(.18,8),i);a.position.y=.5,a.castShadow=!0,t.add(a);const o=new C(new J(.1,8),new V({color:16711748,emissive:16711748,emissiveIntensity:.3}));o.position.set(0,.5,.22),t.add(o);break}case"cactus":{const r=new C(new Te(.08,.15,.5,8),i);r.position.y=.3,r.castShadow=!0,t.add(r);const a=new C(new J(.1,6),i);a.position.y=.58,t.add(a);for(let o=0;o<4;o++){const c=o/4*Math.PI*2,l=new C(new Te(.03,.04,.12,4),i);l.rotation.z=.5,l.position.set(Math.cos(c)*.12,.35+Math.sin(o)*.05,Math.sin(c)*.12),t.add(l)}break}case"melon":{const r=new C(new J(.3,10),i);r.position.y=.3,r.castShadow=!0,t.add(r);const a=new V({color:2250018,roughness:.7});for(let o=0;o<3;o++){const c=o/3*Math.PI,l=new C(new J(.05,4),a);l.scale.set(.3,.1,1.5),l.position.set(Math.cos(c)*.2,.3,Math.sin(c)*.2),l.lookAt(0,.3,0),t.add(l)}break}case"pumpkin":{const r=new C(new J(.28,8),i);r.position.y=.3,r.scale.set(1,.9,.8),r.castShadow=!0,t.add(r);const a=new C(new Te(.04,.06,.1,4),new V({color:3385907}));a.position.y=.55,t.add(a);const o=new C(new J(.06,6),new V({color:3346688}));o.position.set(0,.3,.24),t.add(o);break}case"sunshroom":case"goldmushroom":case"hypnoshroom":{const r=new C(new Te(.04,.08,.2,6),new V({color:15654348}));r.position.y=.12,t.add(r);const a=new C(new J(.14,8),i);a.position.y=.3,a.scale.set(1,.5,1),a.castShadow=!0,t.add(a);const o=new C(new Te(.12,.14,.04,6),new V({color:13417386}));if(o.position.y=.2,t.add(o),s==="hypnoshroom"){const c=new C(new Zn(.12,.02,6,12),new V({color:16729343,emissive:16729343,emissiveIntensity:.3}));c.position.y=.32,c.rotation.x=Math.PI/2,t.add(c)}break}case"solarpanel":{const r=new C(new St(.3,.04,.2),new V({color:4491519,metalness:.4,roughness:.2}));r.position.y=.35,t.add(r);const a=new C(new Te(.04,.06,.25,4),new V({color:8947848,metalness:.6}));a.position.y=.15,t.add(a);const o=new C(new J(.06,8),new V({color:8965375,emissive:4491519,emissiveIntensity:.2}));o.position.set(0,.38,0),t.add(o);break}case"sunlight":{const r=new C(new Te(.06,.1,.35,6),new V({color:3385907}));r.position.y=.2,t.add(r);const a=new C(new J(.15,8),i);a.position.y=.45,a.castShadow=!0,t.add(a);const o=new C(new J(.06,8),new V({color:16777215,emissive:16777096,emissiveIntensity:.4}));o.position.set(0,.45,.2),t.add(o);break}case"squash":{const r=new C(new J(.2,8),i);r.position.y=.1,r.scale.set(1.2,.5,.9),r.castShadow=!0,t.add(r);const a=new C(new J(.04,6),new V({color:0}));a.position.set(0,.12,.18),t.add(a);break}case"jalapeno":{const r=new C(new Te(.06,.14,.4,8),i);r.position.y=.22,r.castShadow=!0,t.add(r);const a=new C(new Te(.03,.04,.08,4),new V({color:3385907}));a.position.y=.44,t.add(a);const o=new C(new J(.05,6),new V({color:16737792,emissive:16729088,emissiveIntensity:.3}));o.position.set(0,.15,.1),t.add(o);break}case"moonflower":{const r=new C(new Te(.06,.1,.35,6),new V({color:2254370}));r.position.y=.2,t.add(r);const a=new C(new J(.12,8),new V({color:2245734}));a.position.y=.45,t.add(a);const o=new V({color:10040319,roughness:.5});for(let c=0;c<6;c++){const l=c/6*Math.PI*2,h=new C(new J(.08,6),o);h.scale.set(.4,.15,1.2),h.position.set(Math.cos(l)*.16,.45,Math.sin(l)*.16),h.lookAt(0,.45,0),t.add(h)}break}case"electropea":{const r=new C(new Te(.08,.12,.5,6),new V({color:3385907}));r.position.y=.25,t.add(r);const a=new C(new J(.2,8),i);a.position.y=.55,a.castShadow=!0,t.add(a);const o=new C(new J(.06,6),new V({color:16777215,emissive:4491519,emissiveIntensity:.4}));o.position.set(0,.55,.22),t.add(o);break}case"frost":{const r=new C(new J(.18,8),i);r.position.y=.25,r.castShadow=!0,t.add(r);const a=new C(new Zn(.15,.03,6,12),new V({color:16777215,emissive:6737151,emissiveIntensity:.2}));a.position.y=.4,a.rotation.x=Math.PI/2,t.add(a);break}case"landmine":{const r=new C(new J(.12,8),i);r.position.y=.05,r.scale.set(1,.4,1),r.castShadow=!0,t.add(r);break}case"thunder":{const r=new C(new Te(.06,.1,.3,6),new V({color:3385907}));r.position.y=.15,t.add(r);const a=new C(new J(.12,8),i);a.position.y=.35,a.castShadow=!0,t.add(a);const o=new C(new Qt(.08,.2,4),new V({color:16777215,emissive:4474111,emissiveIntensity:.5}));o.position.y=.5,o.rotation.y=Math.PI/4,t.add(o);break}case"cobcannon":{const r=new C(new Te(.12,.18,.35,8),i);r.position.y=.25,r.castShadow=!0,t.add(r);const a=new C(new J(.1,6),i);a.position.y=.45,t.add(a);const o=new C(new Te(.08,.12,.08,6),new V({color:16768324}));o.rotation.x=Math.PI/3,o.position.set(0,.3,.2),t.add(o);break}case"steelwall":{const r=new C(new St(.35,.6,.3),new V({color:8947916,metalness:.8,roughness:.3}));r.position.y=.3,r.castShadow=!0,t.add(r);const a=new C(new J(.05,6),new V({color:4473958}));a.position.set(0,.32,.2),t.add(a);break}case"lotus":{const r=new C(new Te(.04,.08,.25,6),new V({color:3385907}));r.position.y=.12,t.add(r);const a=new V({color:16746666,roughness:.4});for(let c=0;c<5;c++){const l=c/5*Math.PI*2,h=new C(new J(.06,6),a);h.scale.set(.6,.15,1.5),h.position.set(Math.cos(l)*.1,.3,Math.sin(l)*.1),h.lookAt(0,.3,0),t.add(h)}const o=new C(new J(.06,6),new V({color:16768324}));o.position.y=.32,t.add(o);break}case"spikerock":{const r=new C(new J(.15,6),i);r.position.y=.08,r.scale.set(1.2,.5,1),r.castShadow=!0,t.add(r);for(let a=0;a<5;a++){const o=a/5*Math.PI*2,c=new C(new Qt(.03,.1,4),i);c.position.set(Math.cos(o)*.12,.12,Math.sin(o)*.12),t.add(c)}break}case"bamboo":{const r=new C(new Te(.1,.14,.55,6),i);r.position.y=.3,r.castShadow=!0,t.add(r);const a=new V({color:2254370});for(let o=0;o<3;o++){const c=new C(new Zn(.12,.015,4,8),a);c.position.y=.1+o*.2,c.rotation.x=Math.PI/2,t.add(c)}break}case"garlic":{const r=new C(new J(.16,8),i);r.position.y=.2,r.scale.set(.8,.9,.8),r.castShadow=!0,t.add(r);const a=new C(new Te(.02,.04,.12,4),new V({color:3385907}));a.position.y=.4,t.add(a);break}case"marigold":{const r=new C(new Te(.04,.08,.3,6),new V({color:3385907}));r.position.y=.15,t.add(r);const a=new C(new J(.08,6),new V({color:8930338}));a.position.y=.35,t.add(a);const o=new V({color:16772676,roughness:.5});for(let c=0;c<6;c++){const l=c/6*Math.PI*2,h=new C(new J(.06,6),o);h.scale.set(.5,.15,1.2),h.position.set(Math.cos(l)*.1,.35,Math.sin(l)*.1),h.lookAt(0,.35,0),t.add(h)}break}case"umbrella":{const r=new C(new Te(.04,.06,.35,6),new V({color:8939076}));r.position.y=.2,t.add(r);const a=new C(new J(.18,8),i);a.position.y=.4,a.scale.set(1,.2,1),a.castShadow=!0,t.add(a);break}case"coffee":{const r=new C(new Te(.08,.1,.12,8),i);r.position.y=.12,r.castShadow=!0,t.add(r);const a=new C(new J(.06,6),new V({color:4465152}));a.position.y=.2,a.scale.set(1,.3,1),t.add(a);const o=new C(new J(.02,4),new V({color:16777215,transparent:!0,opacity:.3}));o.position.set(0,.28,0),t.add(o);break}case"carrot":{const r=new C(new Qt(.1,.3,8),i);r.position.y=.15,r.castShadow=!0,t.add(r);const a=new V({color:3385907});for(let o=0;o<3;o++){const c=o/3*Math.PI*2-.5,l=new C(new J(.03,4),a);l.scale.set(.3,.1,1.5),l.position.set(Math.cos(c)*.04,.32,Math.sin(c)*.04),t.add(l)}break}case"madweed":{const r=new C(new Te(.06,.1,.35,6),new V({color:3385907}));r.position.y=.2,t.add(r);const a=new C(new J(.16,8),i);a.position.y=.42,a.castShadow=!0,t.add(a);const o=new C(new J(.04,6),new V({color:16777215}));o.position.set(.05,.44,.16),t.add(o);const c=new C(new J(.04,6),new V({color:16777215}));c.position.set(-.05,.44,.16),t.add(c);const l=new C(new J(.02,6),new V({color:16711680}));l.position.set(.05,.44,.18),t.add(l);break}case"homingpea":{const r=new C(new Te(.08,.12,.5,6),new V({color:3385907}));r.position.y=.25,t.add(r);const a=new C(new J(.2,8),i);a.position.y=.55,a.castShadow=!0,t.add(a);const o=new C(new Te(.15,.2,.15,8),i);o.position.y=.75,t.add(o);const c=new C(new J(.04,6),new V({color:16746496,emissive:16737792,emissiveIntensity:.3}));c.position.set(0,.65,.22),t.add(c);break}case"gravebuster":{const r=new C(new St(.16,.25,.16),i);r.position.y=.15,r.castShadow=!0,t.add(r);const a=new C(new St(.04,.12,.04),new V({color:16777215}));a.position.y=.32,t.add(a);break}default:{const r=new C(new St(.25,.3,.25),i);r.position.y=.15,r.castShadow=!0,t.add(r)}}return t}class Jp{constructor(e,t,n,i,r){this.scene=e,this.grid=t,this.particles=n,this.audio=i,this.game=r,this.plants=[],this.laserBeams=[],this.fusionRecipes=ji}placePlant(e,t,n,i=null){if(this.grid.isOccupied(t,n))return null;const r=i||yt[e];if(!r)return null;const a=this.grid.gridToWorld(t,n),o=Kp(e,r.color);o.position.set(a.x,0,a.z),o.rotation.y=Math.PI/2,this.scene.add(o);const c=this._createHpBar();o.add(c.sprite);const l=this,h=e==="gatlingpea"?o.getObjectByName("barrelGroup"):null,d={type:e,row:t,col:n,config:r,hp:r.hp,maxHp:r.hp,model:o,alive:!0,fireTimer:0,sunTimer:0,slowTimer:0,_icySlowTimer:0,_icySlowFactor:1,chompTimer:0,armTimer:0,armed:e!=="potato",animTime:Math.random()*Math.PI*2,isFusion:!!(i!=null&&i.isFusion),fusionData:i!=null&&i.isFusion?i:null,hpBar:c,damaged:!1,spinSpeed:0,spinAngle:0,lastFireAngle:0,barrelGroup:h,takeDamage(f){if(this.hp-=f,this.hp<=0){this.hp=0,l.removePlant(this);return}const m=Math.max(0,this.hp/this.maxHp),g=this.hpBar.ctx,_=this.hpBar.canvas;g.clearRect(0,0,_.width,_.height),g.fillStyle="#222222",g.fillRect(0,0,_.width,_.height);const p=Math.round(60*m);m<.25?g.fillStyle="#ff4444":m<.5?g.fillStyle="#ffaa00":g.fillStyle="#44ff44",g.fillRect(2,1,p,8),this.hpBar.tex.needsUpdate=!0,m<.5&&!this.damaged&&(this.damaged=!0,l._applyDamageVisual(this)),["wallnut","bamboo","steelwall","pumpkin","tallnut","icenut"].includes(this.type)&&l.particles.burst(8956671,this.model.position.clone().setY(.5),5,1.2,.05,.25)}};return this.grid.placePlant(t,n,d),this.plants.push(d),this.particles.plantPlace(o.position),this.audio.playPlace(),e==="cherrybomb"&&this._explodePlant(d),d}_createHpBar(){const e=document.createElement("canvas");e.width=64,e.height=10;const t=e.getContext("2d");t.fillStyle="#222222",t.fillRect(0,0,64,10),t.fillStyle="#44ff44",t.fillRect(2,1,60,8);const n=new Bp(e);n.minFilter=Yt;const i=new Rc({map:n,depthTest:!1,transparent:!0}),r=new Op(i);return r.scale.set(.5,.07,1),r.position.y=1,{sprite:r,canvas:e,ctx:t,tex:n}}_applyDamageVisual(e){e.model.traverse(t=>{if(t.isMesh&&t.material){const n=t.material.color.clone();n.multiplyScalar(.55),t.material.color.copy(n)}})}_createLaserBeam(e,t){const n=new L().copy(t).sub(e),i=n.length();if(i<.1)return;n.normalize();const r=new St(.025,.025,i),a=new V({color:16720469,emissive:16729224,emissiveIntensity:2.5,transparent:!0,opacity:.9}),o=new C(r,a);o.position.copy(e).add(n.clone().multiplyScalar(i/2)),o.quaternion.setFromUnitVectors(new L(0,0,1),n),this.scene.add(o),this.laserBeams.push({mesh:o,life:.12,maxLife:.12})}removePlant(e){if(!e.alive)return;e.alive=!1,this.grid.removePlant(e.row,e.col),this.scene.remove(e.model),e.model.traverse(n=>{n.isMesh&&(n.geometry.dispose(),n.material.dispose())});const t=this.plants.indexOf(e);t!==-1&&this.plants.splice(t,1)}_explodePlant(e){this.game.zombieManager.getZombiesInRadius(e.model.position.x,e.model.position.z,e.config.explodeRadius||2).forEach(n=>{n.takeDamage(e.config.explodeDamage||200)}),this.particles.explosion(e.model.position),this.audio.playExplosion(),this.removePlant(e)}getPlantAt(e,t){return this.grid.getPlantAt(e,t)}update(e){for(let t=this.plants.length-1;t>=0;t--){const n=this.plants[t];if(n.alive){if(n.animTime+=e,n.model.position.y=Math.sin(n.animTime*1.5)*.02,n._icySlowTimer>0&&(n._icySlowTimer-=e,n._icySlowTimer<=0&&(n._icySlowFactor=1)),n.config.sunInterval&&(n.sunTimer+=e,n.sunTimer>=n.config.sunInterval)){n.sunTimer=0;const i=n.type==="twinflower"?2:1;this.game.sunManager.dropSunAt(n.model.position.x+Ze(-.3,.3),n.model.position.z+Ze(-.3,.3),(n.config.sunAmount||25)*i),this.particles.burst(16768324,n.model.position.clone().setY(.5),6,1.5,.06,.3)}if((n.type==="potato"||n.type==="landmine")&&(n.armTimer+=e,n.armTimer>=(n.config.armTime||5)&&!n.armed&&(n.armed=!0,n.type==="landmine"?n.model.traverse(i=>{i.isMesh&&i.material.color.setHex(8943462)}):n.model.traverse(i=>{i.isMesh&&i.material.color.setHex(16737826)}))),n.type==="homingpea"&&(n.fireTimer+=e*n._icySlowFactor,n.fireTimer>=n.config.fireRate)){n.fireTimer=0;let i=null,r=n.config.range||14;for(const a of this.game.zombieManager.zombies){if(!a.alive)continue;const o=a.x-n.model.position.x;o>0&&o<r&&(r=o,i=a)}if(i){const a=n.model.position.clone(),o={targetZombie:i},c=i.model.position.z;this.game.projectileManager.fire(a,c,n.config.damage||20,"homing",o),this.audio.playShoot()}}if(n.config.damage&&n.config.fireRate&&!n.config._laser&&(n.fireTimer+=e*n._icySlowFactor,n.fireTimer>=n.config.fireRate)){n.fireTimer=0;const i=this.game.zombieManager.getClosestZombie(n.model.position.x,n.row,n.config.range||12);if(i){const r=n.config.shotsPerFire||1;for(let a=0;a<r;a++)setTimeout(()=>{if(!n.alive)return;const o=n.model.position.clone();let c="normal";const l={};n.type==="snowpea"?(c="ice",l.slowFactor=n.config.slowFactor,l.slowDuration=n.config.slowDuration):n.type==="icepea"?(c="ice",l.slowFactor=n.config.slowFactor||.4,l.slowDuration=n.config.slowDuration||4):n.type==="wintermelon"?(c="wintermelon",l.slowFactor=n.config.slowFactor||.3,l.slowDuration=n.config.slowDuration||4):n.type==="sunpea"?(c="sun",l.sunCallback=(d,f)=>{this.game.sunManager.dropSunAt(d,f,n.config.sunPerHit||10)}):n.type==="electropea"?c="electric":n.type==="melon"?c="melon":n.type==="cobcannon"?c="corn":n.type==="spikerock"?(c="spike",l.piercing=!0):n.type==="madweed"?c="mad":n.type==="cactus"?(c="cactus",l.piercing=!0):n.type==="nutshooter"?c="nut":n.type==="peashooter"?c="pea":n.type==="repeater"?c="rapid":n.type==="doublepea"?c="twin":n.type==="triplepea"&&(c="triple",l.zSpread=(a-1)*.15);const h=i.model.position.z;this.game.projectileManager.fire(o,h,n.config.damage||20,c,l),this.audio.playShoot()},a*100)}}if(n.type==="gatlingpea"){const i=this.game.zombieManager.getClosestZombie(n.model.position.x,n.row,n.config.range||12);for(i?n.spinSpeed=Math.min(n.spinSpeed+(n.config.spinAccel||5)*e,n.config.maxSpinSpeed||12):n.spinSpeed=Math.max(n.spinSpeed-(n.config.spinDecel||3)*e,0),n.spinAngle+=n.spinSpeed*e,n.barrelGroup&&(n.barrelGroup.rotation.z=n.spinAngle);n.spinAngle-n.lastFireAngle>=Math.PI/2;)if(n.lastFireAngle+=Math.PI/2,i&&n.spinSpeed>.3){const r=n.model.position.clone(),a=Math.floor(n.lastFireAngle/(Math.PI/2))%4;r.z+=Math.sin(n.lastFireAngle)*.04;const o={zSpread:(a/3-.5)*.3},c=i.model.position.z;this.game.projectileManager.fire(r,c,n.config.damage||20,"gatling",o),this.audio.playShoot()}}else if(n.type==="chomper"&&(n.chompTimer+=e,n.chompTimer>=(n.config.chompInterval||2.5))){const i=this.game.zombieManager.getZombiesInRadius(n.model.position.x,n.model.position.z,n.config.range||1.5);if(i.length>0){n.chompTimer=0;const r=i[0];r.takeDamage(n.config.chompDamage||60),this.audio.playChomp(),this.particles.burst(16729156,r.model.position.clone(),8,2,.1,.4)}}if(n.type==="laserbean"&&(n.fireTimer+=e,n.fireTimer>=n.config.fireRate)){n.fireTimer=0;const i=this.game.zombieManager.getClosestZombie(n.model.position.x,n.row,n.config.range||20);if(i){i.takeDamage(n.config.damage);const r=n.model.position.clone();r.y=.6;const a=i.model.position.clone();a.y=.6,this._createLaserBeam(r,a),this.particles.burst(16720469,r,6,1.5,.08,.25),this.particles.burst(16729224,a,10,2,.1,.4),this.particles.burst(16777215,a,5,1,.05,.25),this.audio.playShoot()}}if((n.type==="squash"||n.type==="thunder")&&n.config.oneShot&&this.game.zombieManager.getZombiesInRadius(n.model.position.x,n.model.position.z,n.config.explodeRadius||1).length>0&&(n.type==="squash"?(this.particles.burst(8978244,n.model.position.clone(),10,3,.12,.5),this.particles.burst(13412932,n.model.position.clone(),6,2,.08,.4)):(this.particles.burst(4474111,n.model.position.clone(),16,4,.15,.6),this.particles.burst(16777215,n.model.position.clone(),10,2.5,.1,.4),this.particles.burst(8947967,n.model.position.clone(),8,3,.12,.5)),this._explodePlant(n)),n.type==="jalapeno"&&n.config.oneShot&&this.game.zombieManager.zombies.filter(r=>r.alive&&Math.abs(r.model.position.z-n.model.position.z)<.8).length>0&&(this.particles.burst(16729088,n.model.position.clone(),25,5,.15,.8),this.particles.burst(16763904,n.model.position.clone(),15,3.5,.1,.5),this.particles.burst(16746496,n.model.position.clone(),10,2.5,.08,.4),this._explodePlant(n)),(n.type==="frost"||n.type==="hypnoshroom")&&n.alive){const i=this.game.zombieManager.getZombiesInRadius(n.model.position.x,n.model.position.z,n.config.freezeDuration?1.5:1);if(i.length>0){const r=i[0];r.freezeTimer=n.config.freezeDuration||5,r.frozen=!0,this.particles.burst(6737151,r.model.position.clone(),10,2,.1,.4),this.audio.playFreeze(),this.removePlant(n)}}if(n.type==="spikerock"&&n.alive){const i=this.game.zombieManager.getZombiesInRadius(n.model.position.x,n.model.position.z,.5);i.length>0&&i[0].takeDamage(n.config.damage||10)}n.type==="torchwood"&&(n.effectTimer=(n.effectTimer||0)+e,n.effectTimer>.4&&(n.effectTimer=0,this.particles.burst(16737792,n.model.position.clone().setY(.4),2,1,.04,.4))),n.type==="garlic"&&this.game.zombieManager.getZombiesInRadius(n.model.position.x,n.model.position.z,1.5).length>0&&(n.stinkTimer=(n.stinkTimer||0)+e,n.stinkTimer>.8&&(n.stinkTimer=0,this.particles.burst(8965222,n.model.position.clone().setY(.3),6,1.5,.06,.5))),n.type==="coffee"&&(n.effectTimer=(n.effectTimer||0)+e,n.effectTimer>.7&&(n.effectTimer=0,this.particles.burst(16768324,n.model.position.clone().setY(.5),3,1.2,.04,.3))),n.type==="moonflower"&&(n.effectTimer=(n.effectTimer||0)+e,n.effectTimer>1.2&&(n.effectTimer=0,this.particles.burst(10040319,n.model.position.clone().setY(.3),5,1.8,.06,.5))),n.type==="lotus"&&(n.effectTimer=(n.effectTimer||0)+e,n.effectTimer>1&&(n.effectTimer=0,this.particles.burst(16746666,n.model.position.clone().setY(.5),4,1.5,.05,.4))),n.type==="umbrella"&&(n.effectTimer=(n.effectTimer||0)+e,n.effectTimer>.8&&(n.effectTimer=0,this.particles.burst(4491519,n.model.position.clone().setY(.6),3,1,.04,.3))),n.type==="gravebuster"&&(n.effectTimer=(n.effectTimer||0)+e,n.effectTimer>.5&&(n.effectTimer=0,this.particles.burst(12290303,n.model.position.clone().setY(.4),4,1.5,.05,.3))),n.type==="carrot"&&(n.effectTimer=(n.effectTimer||0)+e,n.effectTimer>.6&&(n.effectTimer=0,this.particles.burst(16755234,n.model.position.clone().setY(.5),3,1.2,.04,.3))),n.type==="marigold"&&(n.effectTimer=(n.effectTimer||0)+e,n.effectTimer>.5&&(n.effectTimer=0,this.particles.burst(16772676,n.model.position.clone().setY(.5),3,1.2,.04,.3)))}}for(let t=this.laserBeams.length-1;t>=0;t--){const n=this.laserBeams[t];n.life-=e,n.life<=0?(this.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.laserBeams.splice(t,1)):n.mesh.material.opacity=n.life/n.maxLife}}clear(){this.plants.forEach(e=>{this.scene.remove(e.model),e.model.traverse(t=>{t.isMesh&&(t.geometry.dispose(),t.material.dispose())})}),this.plants=[],this.laserBeams.forEach(e=>{this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose()}),this.laserBeams=[];for(let e=0;e<5;e++)for(let t=0;t<9;t++)this.grid.cells[e][t].plant=null,this.grid.cells[e][t].occupied=!1}findFusionTargets(e,t){return this.grid.findAdjacentPlants(e,t)}}function Qp(s,e){const t=new jn,n=new Oe(e);new V({color:n,roughness:.7});const i=new V({color:8956535,roughness:.8});new V({color:8939076,roughness:.6});const r=new C(new Te(.15,.2,.4,6),i);r.position.y=.35,r.castShadow=!0,t.add(r);const a=new C(new J(.14,8),i);a.position.y=.65,a.castShadow=!0,t.add(a);const o=new C(new J(.025,6),new V({color:16729156}));o.position.set(-.05,.67,.12),t.add(o);const c=new C(new J(.025,6),new V({color:16729156}));c.position.set(.05,.67,.12),t.add(c);const l=new C(new Te(.025,.035,.28,5),i);l.position.set(-.12,.32,.04),l.rotation.x=Math.PI*.4,l.rotation.y=.3,l.name="armL",t.add(l);const h=new C(new Te(.025,.035,.28,5),i);switch(h.position.set(.12,.32,.04),h.rotation.x=Math.PI*.4,h.rotation.y=-.3,h.name="armR",t.add(h),s){case"cone":{const d=new C(new Qt(.12,.2,6),new V({color:16746547}));d.position.y=.78,t.add(d);break}case"bucket":{const d=new C(new Te(.12,.14,.16,8),new V({color:11184810,metalness:.3}));d.position.y=.78,t.add(d);const f=new C(new Zn(.06,.015,4,8),new V({color:8947848}));f.position.y=.87,f.rotation.x=Math.PI/2,t.add(f);break}case"flag":{const d=new C(new Te(.015,.015,.25,4),new V({color:8939076}));d.position.set(-.08,.8,.08),d.rotation.z=.2,t.add(d);const f=new C(new nn(.1,.07),new V({color:16729156,side:_t}));f.position.set(-.16,.85,.08),t.add(f);break}case"football":{const d=new C(new J(.08,6),new V({color:13386820}));d.position.set(0,.68,.12),t.add(d);const f=new C(new J(.1,8),new V({color:13386820}));f.position.set(0,.72,.02),f.scale.set(1,.7,1),t.add(f);break}case"boss":{const d=new C(new Te(.05,.12,.08,6),new V({color:16766720,metalness:.5}));d.position.y=.78,t.add(d),r.scale.set(1.3,1.2,1.3),a.scale.set(1.2,1.1,1.2),a.position.y=.7,l.scale.set(1.2,1.1,1.2),h.scale.set(1.2,1.1,1.2);const f=new C(new nn(.3,.25),new V({color:11141290,side:_t}));f.position.set(0,.35,-.12),t.add(f);break}case"giant":{r.scale.set(1.5,1.4,1.5),a.scale.set(1.4,1.3,1.4),a.position.y=.72,l.scale.set(1.4,1.3,1.4),h.scale.set(1.4,1.3,1.4);const d=new C(new Zn(.12,.02,4,8),new V({color:6702114}));d.position.y=.28,d.rotation.x=Math.PI/2,t.add(d);break}}return t}class em{constructor(e,t,n,i){this.scene=e,this.particles=t,this.audio=n,this.game=i,this.zombies=[]}spawn(e,t,n,i={}){const r=i.mutations||[],a=i.eliteType||null,o=i.isMiniboss||!1,c=i.waveModifiers||{},l=Lc[e];if(!l)return null;let h={...l},d=h.color;if(a){const p=xi[a];h.hp*=p.hpMul,h.speed*=p.speedMul||1,h.damage*=p.damageMul||1,h.score=Math.round(h.score*p.scoreMul),d=p.color}c.hpMul&&(h.hp*=c.hpMul),c.speedMul&&(h.speed*=c.speedMul),c.bonusHp&&(h.hp+=c.bonusHp);for(const p of r){const u=Ho[p];u&&(u.hpMul!==void 0&&(h.hp*=u.hpMul),u.speedMul!==void 0&&(h.speed*=u.speedMul),u.damageMul!==void 0&&(h.damage*=u.damageMul),d=u.color)}const f=t!==void 0?wi[t]:wi[n],m=Qp(e,d),g=Xp+Ze(-.5,.5);if(m.position.set(g,0,f),m.rotation.y=-Math.PI/2,a&&m.scale.set(1.25,1.25,1.25),o&&m.scale.set(1.5,1.5,1.5),r.length>0||a){const p=a?xi[a].color:Ho[r[0]].color,u=new Ln({color:p,transparent:!0,opacity:.3,side:_t,depthWrite:!1}),b=new C(new Dn(.22,.28,16),u);b.rotation.x=-Math.PI/2,b.position.y=.02,m.add(b);const w=new C(new Dn(.3,.32,16),u);w.rotation.x=-Math.PI/2,w.position.y=.02,w.material=u.clone(),w.material.opacity=.15,m.add(w)}if(o){const p=new Ln({color:8930559,transparent:!0,opacity:.15,side:_t}),u=new C(new J(.35,8),p);u.position.y=.35,m.add(u)}this.scene.add(m);const _={type:e,row:t!==void 0?t:n,config:h,model:m,hp:h.hp,maxHp:h.hp,speed:h.speed,damage:h.damage,attackInterval:h.attackInterval,attackTimer:0,isEating:!1,eatingPlant:null,slowTimer:0,slowFactor:1,alive:!0,score:h.score||10,isBoss:h.isBoss||!1,x:g,animTime:Math.random()*Math.PI*2,mutations:r,eliteType:a,isMiniboss:o,hasFireTrail:!1,hasPoisonTrail:!1,trailTimer:0,takeDamage(p){this.hp-=p,this.hp<=0&&(this.hp=0,this.game.zombieManager.kill(this))},applySlow(p,u){this.slowFactor=p,this.slowTimer=u}};_.game=this.game,_.armL=m.getObjectByName("armL"),_.armR=m.getObjectByName("armR");for(const p of r)p==="fire"&&(_.hasFireTrail=!0);return c.poisonTrail&&(_.hasPoisonTrail=!0),this.zombies.push(_),_}getZombiesInLane(e){return this.zombies.filter(t=>t.alive&&t.row===e)}hitTest(e,t,n){for(const i of this.zombies){if(!i.alive)continue;const r=i.x-e,a=i.model.position.z-t;if(r*r+a*a<n*n)return i}return null}getZombiesInRadius(e,t,n){return this.zombies.filter(i=>{if(!i.alive)return!1;const r=i.x-e,a=i.model.position.z-i;return r*r+a*a<n*n})}getClosestZombie(e,t,n=12){let i=null,r=n;for(const a of this.zombies){if(!a.alive||a.row!==t)continue;const o=a.x-e;o>0&&o<r&&(r=o,i=a)}return i}getAliveCount(){return this.zombies.filter(e=>e.alive).length}getTotalHpRemaining(){return this.zombies.reduce((e,t)=>t.alive?e+t.hp:e,0)}update(e,t){const n=this.game.hazardsManager;for(let i=this.zombies.length-1;i>=0;i--){const r=this.zombies[i];if(!r.alive)continue;r.animTime+=e*2,r.model.position.z=wi[r.row]+Math.sin(r.animTime)*.03,r.mutations.includes("regenerating")&&!r.isEating&&(r.hp=Math.min(r.maxHp,r.hp+8*e)),r.slowTimer>0&&(r.slowTimer-=e,r.slowTimer<=0&&(r.slowFactor=1)),r.isEating=!1;let a=null;for(let o=0;o<9;o++){const c=t.getPlantAt(r.row,o);if(c&&c.alive){const l=Yi[o],h=r.x-l;if(h<=.35&&h>=-1e-10){c.type==="potato"?c.armed&&(c.takeDamage(9999),this.particles.explosion(c.model.position),this.audio.playExplosion(),r.takeDamage(150)):c.type==="iceberg"?(r.applySlow(0,c.config.freezeDuration||5),c.takeDamage(9999),this.particles.iceHit(c.model.position),this.audio.playHit()):a=c;break}}}if(a){if(r.isEating=!0,r.x=Yi[a.col]+.34,r.model.position.x=r.x,r.attackTimer+=e,r.model.rotation.y=-Math.PI/2+Math.sin(r.animTime*2)*.08,r.model.rotation.z=Math.sin(r.animTime*3)*.05,r.model.position.y=Math.abs(Math.sin(r.animTime*3))*.025,r.armL){const o=.6+Math.abs(Math.sin(r.animTime*3))*.3;r.armL.position.set(-.08,.5,.1),r.armL.rotation.x=Math.PI*.2*o,r.armL.rotation.y=.4*o}if(r.armR){const o=.6+Math.abs(Math.sin(r.animTime*3+Math.PI))*.3;r.armR.position.set(.08,.5,.1),r.armR.rotation.x=Math.PI*.2*o,r.armR.rotation.y=-.4*o}if(r.attackTimer>=r.attackInterval&&(r.attackTimer=0,a.takeDamage(r.damage),r.mutations.includes("icy")&&(a._icySlowTimer=(a._icySlowTimer||0)+2,a._icySlowFactor=.5),a.type==="chomper"&&r.takeDamage(a.config.chompDamage||60),this.audio.playZombieEat(),this.particles.burst(16729156,a.model.position.clone().add(new L(0,.3,0)),3,.5,.05,.3),!a.alive)){const o=a.model.position.clone();this.particles.plantPlace(o)}}else{r.attackTimer=0;const o=r.speed*r.slowFactor*e;if(r.x-=o,r.model.position.x=r.x,r.model.rotation.y=-Math.PI/2+Math.sin(r.animTime*.5)*.05,r.model.rotation.z=0,r.model.position.y=Math.abs(Math.sin(r.animTime*2))*.02,r.armL&&(r.armL.position.set(-.12,.32,.04),r.armL.rotation.x=Math.PI*.4+Math.sin(r.animTime*2)*.15,r.armL.rotation.y=.3+Math.sin(r.animTime*1.5)*.15),r.armR&&(r.armR.position.set(.12,.32,.04),r.armR.rotation.x=Math.PI*.4-Math.sin(r.animTime*2)*.15,r.armR.rotation.y=-.3-Math.sin(r.animTime*1.5)*.15),(r.hasFireTrail||r.hasPoisonTrail)&&(r.trailTimer+=e,r.trailTimer>=.5)){r.trailTimer=0;const c=Math.round((r.x-en)/ot);c>=0&&c<9&&(r.hasFireTrail&&n&&n.addHazard("firePuddle",r.row,c,{color:16729088,duration:3,damagePerSec:10}),r.hasPoisonTrail&&n&&n.addHazard("toxicCloud",r.row,c,{color:8978244,duration:4,damagePerSec:8}))}}r.x<qp&&(this.game.loseLife(1),this._remove(r,i))}this._updateDeathAnimations(e)}kill(e,t){if(!e.alive)return;e.alive=!1;const n=e.model.position.clone();if(e.mutations.includes("explosive")){const r=this.getZombiesInRadius(n.x,n.z,1.5);for(const o of r)o!==e&&o.takeDamage(60);this.particles.explosion(n),this.audio.playExplosion();const a=Math.round((n.x-en)/ot);a>=0&&a<9&&this.game.hazardsManager&&this.game.hazardsManager.addHazard("firePuddle",e.row,a,{color:16737792,duration:5,damagePerSec:15})}if(this.particles.zombieDeath(n,e.eliteType?xi[e.eliteType].color:e.config.color),this.particles.starBurst(e.eliteType?xi[e.eliteType].color:e.config.color,n,6,2,.4),this.audio.playZombieDie(),e.isMiniboss&&(this.particles.explosion(n),this.particles.starBurst(8930559,n,20,4,.8),this.particles.starBurst(16777215,n,12,3,.5),this.game.sceneManager.shake(.4,.35),this.game.sceneManager.flash(8930559,.15),this.game.hitStop(.12)),t||(t=Math.random()<.33?"dissolve":Math.random()<.5?"launch":"normal"),t==="dissolve")e.model.traverse(i=>{i.isMesh&&(i.material.transparent=!0,i.material.opacity=1)}),e._deathType="dissolve",e._deathTimer=.4,e._deathMaxTimer=.4,e._deathPos=n.clone(),this.game.sceneManager.shake(e.isMiniboss?.3:.1,e.isMiniboss?.3:.15);else if(t==="launch")e.model.traverse(i=>{i.isMesh&&(i.material.transparent=!0,i.material.opacity=1)}),e._deathType="launch",e._deathTimer=.5,e._deathMaxTimer=.5,e._deathPos=n.clone(),e._deathVel=new L(Ze(-2,-1),Ze(3,6),Ze(-1,1)),this.game.sceneManager.shake(e.isMiniboss?.3:.15,e.isMiniboss?.3:.2);else{this._removeDead(e);const i=this.zombies.indexOf(e);i!==-1&&this.zombies.splice(i,1),this.game.addScore(e.score),this.game.sceneManager.shake(e.isMiniboss?.25:.08,e.isMiniboss?.2:.1)}}_removeDead(e){this.scene.remove(e.model),e.model.traverse(t=>{t.isMesh&&(t.geometry.dispose(),t.material.dispose())})}_updateDeathAnimations(e){for(let t=this.zombies.length-1;t>=0;t--){const n=this.zombies[t];if(!n._deathType)continue;n._deathTimer-=e;const i=n._deathTimer/n._deathMaxTimer;n._deathType==="dissolve"?(n.model.traverse(r=>{r.isMesh&&(r.material.opacity=i)}),n.model.position.y=(1-i)*.5,n.model.rotation.z+=e*2,n._deathTimer<=0&&(this._removeDead(n),this.game.addScore(n.score),this.zombies.splice(t,1))):n._deathType==="launch"&&(n._deathVel.y+=-10*e,n.model.position.copy(n._deathPos),n.model.position.add(n._deathVel.clone().multiplyScalar(e)),n.model.rotation.x+=n._deathVel.y*e*2,n.model.rotation.z+=e*4,n.model.traverse(r=>{r.isMesh&&(r.material.opacity=Math.max(0,i))}),(n._deathTimer<=0||n.model.position.y<-2)&&(this._removeDead(n),this.game.addScore(n.score),this.zombies.splice(t,1)))}}_remove(e,t){this.scene.remove(e.model),e.model.traverse(n=>{n.isMesh&&(n.geometry.dispose(),n.material.dispose())}),this.zombies.splice(t,1)}clear(){this.zombies.forEach(e=>{this.scene.remove(e.model),e.model.traverse(t=>{t.isMesh&&(t.geometry.dispose(),t.material.dispose())})}),this.zombies=[]}}class tm{constructor(e,t,n,i=null){this.scene=e,this.particles=t,this.audio=n,this.game=i,this.projectiles=[]}fire(e,t,n,i="normal",r={}){const a=i==="gatling",o=i==="homing",c=i==="electric",l=i==="corn",h=i==="spike",d=i==="mad",f=i==="cactus",m=i==="nut",g=i==="melon",_=i==="pea",p=i==="rapid",u=i==="twin",b=i==="triple",w=i==="ice"?6737151:i==="fire"?16737792:i==="sun"?16768324:a?14496563:o?16746496:c?6741503:g?5622869:l?16755234:h?10057557:d?8978244:f?10083669:m?13408597:_?6745702:p?8973960:u?11197764:b?4513160:4500036;let x;if(o){const A=new J(.1,8),T=new V({color:16746496,emissive:16737792,emissiveIntensity:1});x=new C(A,T),x.position.copy(e),x.position.y=.7,x.castShadow=!0}else if(a){const A=new J(.055,6),T=new V({color:w,emissive:w,emissiveIntensity:.5});x=new C(A,T),x.position.copy(e),x.position.y=.6,x.castShadow=!0,x.scale.set(1,1,1.6)}else if(c){const A=new J(.07,6),T=new V({color:w,emissive:4491519,emissiveIntensity:1.5});x=new C(A,T),x.position.copy(e),x.position.y=.6,x.castShadow=!0,x.scale.set(1.2,1,1.2)}else if(g){const A=new J(.15,8),T=new V({color:w,emissive:w,emissiveIntensity:.15});x=new C(A,T),x.position.copy(e),x.position.y=.6,x.castShadow=!0}else if(l){const A=new St(.1,.1,.14),T=new V({color:w,emissive:16746496,emissiveIntensity:.4});x=new C(A,T),x.position.copy(e),x.position.y=.6,x.castShadow=!0}else if(h){const A=new Qt(.04,.12,4),T=new V({color:w});x=new C(A,T),x.position.copy(e),x.position.y=.5,x.castShadow=!0,x.rotation.x=Math.PI/2}else if(f){const A=new Te(.02,.04,.15,4),T=new V({color:w,emissive:6728243,emissiveIntensity:.2});x=new C(A,T),x.position.copy(e),x.position.y=.55,x.castShadow=!0,x.rotation.z=Math.PI/2}else if(m){const A=new J(.1,8),T=new V({color:w});x=new C(A,T),x.position.copy(e),x.position.y=.6,x.castShadow=!0}else if(d){const A=new J(.07,5),T=new V({color:w,emissive:4521728,emissiveIntensity:.6});x=new C(A,T),x.position.copy(e),x.position.y=.6,x.castShadow=!0}else if(_){const A=new J(.085,8),T=new V({color:w,emissive:w,emissiveIntensity:.25});x=new C(A,T),x.position.copy(e),x.position.y=.6,x.castShadow=!0}else if(p){const A=new J(.065,6),T=new V({color:w,emissive:6750054,emissiveIntensity:.3});x=new C(A,T),x.position.copy(e),x.position.y=.6,x.castShadow=!0}else if(u){const A=new J(.075,7),T=new V({color:w,emissive:8965154,emissiveIntensity:.2});x=new C(A,T),x.position.copy(e),x.position.y=.6,x.castShadow=!0}else if(b){const A=new J(.072,7),T=new V({color:w,emissive:w,emissiveIntensity:.2});x=new C(A,T),x.position.copy(e),x.position.y=.6,x.castShadow=!0}else{const A=new J(i==="wintermelon"?.15:.08,8),T=new V({color:w,emissive:w,emissiveIntensity:i==="fire"?.5:.1});x=new C(A,T),x.position.copy(e),x.position.y=.6,x.castShadow=!0}this.scene.add(x);const F=r.zSpread||0;this.projectiles.push({mesh:x,startX:e.x,startZ:e.z,z:e.z,targetZ:t,speed:o||m?2.5:h||f?6:4,zSpeed:F*2,damage:n,type:i,extra:r,alive:!0,rotSpeed:Math.random()*10+5,targetZombie:r.targetZombie||null,homingStrength:3,trailTimer:0,madTimer:0,hitZombies:new Set})}update(e,t){for(let n=this.projectiles.length-1;n>=0;n--){const i=this.projectiles[n];if(!i.alive)continue;if(i.type==="trail"){i.life-=e,i.life<=0?this._remove(i,n):(i.mesh.material.opacity=i.life/i.maxLife*.7,i.mesh.scale.setScalar(1-(1-i.life/i.maxLife)*.5));continue}if(i.type==="shockwave"){if(i.life-=e,i.life<=0)this._remove(i,n);else{const a=1+(1-i.life/i.maxLife)*3;i.mesh.scale.set(a,a,a),i.mesh.material.opacity=i.life/i.maxLife}continue}if(i.type==="homing"){let a=i.targetZombie;if(!a||!a.alive){const o=t.zombies;let c=null,l=20;for(const h of o){if(!h.alive||h.x<i.mesh.position.x)continue;const d=Math.sqrt((h.x-i.mesh.position.x)**2+(h.model.position.z-i.mesh.position.z)**2);d<l&&(l=d,c=h)}a=c,i.targetZombie=a}if(a&&a.alive){const o=a.x-i.mesh.position.x,c=(a.model?a.model.position.z:a.z||0)-i.mesh.position.z,l=Math.sqrt(o*o+c*c),h=l<2?8:4;i.speed=Math.min(i.speed+h*e,l<2?12:7);const d=Math.atan2(c,o),f=Math.atan2(i.zSpeed,i.speed),m=d-f,g=Math.atan2(Math.sin(m),Math.cos(m))*Math.min(i.homingStrength*e,1),_=f+g;i.speed=Math.max(.5,i.speed),i.zSpeed=i.speed*Math.sin(_),i.speed=i.speed*Math.cos(_);const p=new L(i.speed,0,i.zSpeed).normalize();i.mesh.quaternion.setFromUnitVectors(new L(0,0,1),p)}else i.mesh.rotation.y+=i.rotSpeed*e;if(i.mesh.position.x+=i.speed*e,i.mesh.position.z+=i.zSpeed*e,i.trailTimer-=e,i.trailTimer<=0&&(i.trailTimer=.04,this._spawnTrail(i.mesh.position)),i.mesh.position.x>8||i.mesh.position.x<-8){this._remove(i,n);continue}}else if(i.type==="mad"&&(i.madTimer=(i.madTimer||0)+e,i.mesh.position.z=i.startZ+Math.sin(i.madTimer*10)*.4),i.mesh.position.x+=i.speed*e,i.type!=="spike"&&i.type!=="cactus"&&(i.mesh.position.z+=i.zSpeed*e),i.type==="gatling"?i.mesh.rotation.y+=i.rotSpeed*e:i.type==="corn"?(i.mesh.rotation.x+=i.rotSpeed*e*2,i.mesh.rotation.z+=i.rotSpeed*e):i.type==="spike"||i.type==="cactus"?i.mesh.rotation.z+=i.rotSpeed*e*2:(i.mesh.rotation.x+=i.rotSpeed*e,i.mesh.rotation.z+=i.rotSpeed*e*.5),i.mesh.position.x>8){this._remove(i,n);continue}if(i.type==="spike"||i.type==="cactus"){const a=t.zombies;for(const o of a){if(!o.alive||i.hitZombies.has(o))continue;if(Math.abs(o.x-i.mesh.position.x)<=.35&&Math.abs(o.model.position.z-i.mesh.position.z)<=.4){i.hitZombies.add(o),o.takeDamage(i.damage);const h=i.mesh.position.clone().setY(.6);this.particles.burst(8978244,h,4,1.5,.04,.25),this.particles.sparkBurst(h,8978244,3),this.audio.playHit(),this.game&&this.game.spawnDamagePopup(h,i.damage,"#88ff44")}}continue}const r=t.hitTest(i.mesh.position.x,i.mesh.position.z,i.type==="homing"?.5:.3);if(r){const a=i.damage,o=i.mesh.position.clone(),c=i.type==="homing"||i.type==="corn"||i.type==="melon"||i.type==="wintermelon"||i.type==="electric";if(c&&this.game&&(this.game.sceneManager.shake(.25,.2),this.game.hitStop(.06),this.game.sceneManager.flash(16777215,.08)),i.type==="homing")t.getZombiesInRadius(o.x,o.z,1.5).forEach(h=>{h.takeDamage(a)}),this._explosionEffect(o),this.game&&(this.game.sceneManager.shake(.35,.3),this.game.hitStop(.1),this.game.sceneManager.flash(16746496,.12));else if(i.type==="fire")r.takeDamage(a*1.5),this.particles.fireHit(o);else if(i.type==="ice")r.takeDamage(a),r.applySlow(i.extra.slowFactor||.5,i.extra.slowDuration||3),this.particles.iceHit(o);else if(i.type==="wintermelon")t.getZombiesInRadius(o.x,o.z,1.5).forEach(h=>{h.takeDamage(a),h.applySlow(i.extra.slowFactor||.3,i.extra.slowDuration||4)}),this.particles.iceHit(o),this.particles.ringBurst(8969727,o,3,3,.4),this.game&&this.game.hitStop(.08);else if(i.type==="electric"){r.takeDamage(a);const l=t.getClosestZombie(o.x,r.row,2);l&&l!==r&&(l.takeDamage(Math.round(a*.5)),this.particles.electricHit(l.model.position.clone()),this.game&&this.game.spawnDamagePopup(l.model.position.clone(),Math.round(a*.5),"#66ddff")),this.particles.electricHit(o),this.particles.ringBurst(6741503,o,3,3,.35)}else i.type==="melon"?(t.getZombiesInRadius(o.x,o.z,1.2).forEach(h=>h.takeDamage(a)),this.particles.burst(5622869,o,16,3,.12,.5),this.particles.burst(8978312,o,8,1.5,.06,.3),this.particles.ringBurst(5622869,o,3,3,.4),this.game&&(this.game.hitStop(.07),this.game.sceneManager.flash(5622869,.08))):i.type==="corn"?(t.getZombiesInRadius(o.x,o.z,1).forEach(h=>h.takeDamage(a)),this._explosionEffect(o),this.game&&(this.game.sceneManager.shake(.3,.25),this.game.hitStop(.09),this.game.sceneManager.flash(16755234,.1))):i.type==="nut"?(r.takeDamage(a),r.applySlow(.5,.3),this.particles.burst(13408597,o,8,2,.08,.3),this.particles.sparkBurst(o,13408597,4),this.game&&this.game.hitStop(.04)):i.type==="mad"?(r.takeDamage(a),this.particles.burst(8978244,o,10,2.5,.08,.4),this.particles.burst(13434760,o,6,1.5,.05,.25),this.particles.sparkBurst(o,8978244,5)):i.type==="pea"?(r.takeDamage(a),this.particles.peaHit(o,6745702),this.particles.sparkBurst(o,6745702,2)):i.type==="rapid"?(r.takeDamage(a),this.particles.peaHit(o,8973960)):i.type==="twin"?(r.takeDamage(a),this.particles.peaHit(o,11197764),this.particles.sparkBurst(o,11197764,3)):i.type==="triple"?(r.takeDamage(a),this.particles.peaHit(o,4513160),this.particles.sparkBurst(o,4513160,3)):(r.takeDamage(a),this.particles.peaHit(o),i.type==="sun"&&i.extra.sunCallback&&i.extra.sunCallback(o.x,o.z));this.game&&a>0&&this.game.spawnDamagePopup(o,a,c?"#ffdd44":"#ffffff"),i.type==="homing"?this.audio.playExplosion():i.type==="fire"?this.audio.playShoot():this.audio.playHit(),this._remove(i,n)}}}_spawnTrail(e){const t=new J(.04,4),n=new V({color:13421772,emissive:11184810,emissiveIntensity:.1,transparent:!0,opacity:.5}),i=new C(t,n);i.position.copy(e),i.position.x-=.05,i.position.y+=Math.random()*.05,this.scene.add(i),this.projectiles.push({mesh:i,alive:!0,type:"trail",speed:0,zSpeed:0,damage:0,extra:{},startX:0,z:0,targetZ:0,rotSpeed:0,life:.3,maxLife:.3})}_explosionEffect(e){this.particles.burst(16737792,e,16,3.5,.18,.6),this.particles.burst(16763904,e,12,2.5,.12,.5),this.particles.burst(16777215,e,8,2,.08,.4);const t=new Dn(.1,.2,24),n=new V({color:16746496,emissive:16729088,emissiveIntensity:1.5,transparent:!0,opacity:1,side:_t}),i=new C(t,n);i.position.copy(e),i.position.y=.6,i.rotation.x=-Math.PI/2,this.scene.add(i),this.projectiles.push({mesh:i,alive:!0,type:"shockwave",life:.35,maxLife:.35,speed:0,zSpeed:0,damage:0,extra:{},startX:0,z:0,targetZ:0,rotSpeed:0})}_remove(e,t){if(e.type==="trail"||e.type==="shockwave"){this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose(),this.projectiles.splice(t,1);return}this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose(),this.projectiles.splice(t,1)}clear(){this.projectiles.forEach(e=>{this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose()}),this.projectiles=[]}}const Vo=Object.keys(Xi),Wo=Object.keys(xi);class nm{constructor(e){this.game=e,this.levels=Cn,this.currentLevel=0,this.waveInLevel=0,this.totalLevels=Cn.length,this.state="idle",this.spawnTimer=0,this.spawnIndex=0,this.spawnQueue=[],this.prepTimer=0,this.endlessMode=!1,this.endlessWaveCount=0,this.waveActive=!1,this.currentModifier=null,this.minibossSpawned=!1,this.onWaveComplete=null}_startCurrentWave(){const t=this.levels[this.currentLevel].waves[this.waveInLevel];this._pickWaveModifier(),this._buildSpawnQueue(t),this.state="spawning",this.prepTimer=t.prepTime||5,this.spawnTimer=0,this.spawnIndex=0,this.waveActive=!0,this.minibossSpawned=!1,this._updateUI()}_pickWaveModifier(){const e=this.currentLevel;if(e<2){this.currentModifier=null;return}const t=.15+e*.04;Math.random()<t?this.currentModifier=Vo[Hn(0,Vo.length-1)]:this.currentModifier=null}_getMutationPool(){const e=this.currentLevel;return e<2?[]:e<4?["fast","armored"]:e<6?["fast","armored","fire","regenerating"]:["fast","armored","fire","icy","regenerating","explosive"]}_rollMutations(){const e=this._getMutationPool();if(e.length===0)return[];const t=[],n=this.currentLevel,i=Math.random();if(n>=2&&i<.25&&t.push(e[Hn(0,e.length-1)]),n>=4&&i<.12){const r=e[Hn(0,e.length-1)];t.includes(r)||t.push(r)}return t}_rollElite(){const e=this.currentLevel;if(e<3)return null;const t=e>=6?.12:.06;if(Math.random()<t){const n=e>=6?Wo:Wo.filter(i=>i!=="miniboss");return n[Hn(0,n.length-1)]}return null}_buildSpawnQueue(e){this.spawnQueue=[];const t=this.currentLevel,n=this.currentModifier?Xi[this.currentModifier]:null;let r=this.game.plantManager.plants.filter(h=>h.alive).reduce((h,d)=>h+(d.config.damage||0)+(d.config.hp||80),0);const a=(t+1)*50,o=r/Math.max(a,1),c=n&&n.countMul?n.countMul:1,l=Math.min(1.5,Math.max(.6,o));for(const h of e.zombies){let d=Math.round(h.count*c*l);d=Math.max(1,d);for(let f=0;f<d;f++){const m=Hn(0,4),g=this._rollElite(),_=g?xi[g].base:h.type,p=this._rollMutations();this.spawnQueue.push({type:_,lane:m,delay:e.spawnInterval||3,mutations:p,eliteType:g,isMiniboss:!1,waveModifiers:n||{}})}}for(let h=this.spawnQueue.length-1;h>0;h--){const d=Hn(0,h);[this.spawnQueue[h],this.spawnQueue[d]]=[this.spawnQueue[d],this.spawnQueue[h]]}if(t>=5&&Math.random()<.3&&!this.endlessMode){const h=Math.floor(this.spawnQueue.length/2),d=Hn(0,4);this.spawnQueue.splice(h,0,{type:"giant",lane:d,delay:2,mutations:["armored","fire"],eliteType:null,isMiniboss:!0,waveModifiers:n||{}})}this.spawnInterval=n&&n.spawnIntervalMul?(e.spawnInterval||3)*n.spawnIntervalMul:e.spawnInterval||3,this.spawnInterval=Math.max(.8,this.spawnInterval)}_notifyModifier(){if(!this.currentModifier)return;const e=Xi[this.currentModifier];e&&this.game.uiManager.showMessage(`🌀 ${e.name}: ${e.desc}`,2.5,e.color)}startLevel(e){this.currentLevel=e,this.waveInLevel=0,this._startCurrentWave(),this._notifyModifier()}startNextWave(){this.waveInLevel++;const e=this.levels[this.currentLevel];this.waveInLevel>=e.waves.length||(this._startCurrentWave(),this._notifyModifier())}update(e){if(this.state==="spawning"){if(this.prepTimer>0){this.prepTimer-=e;return}if(this.spawnTimer+=e,this.spawnIndex<this.spawnQueue.length&&this.spawnTimer>=this.spawnInterval){this.spawnTimer=0;const t=this.spawnQueue[this.spawnIndex];this.game.zombieManager.spawn(t.type,t.lane,t.lane,{mutations:t.mutations||[],eliteType:t.eliteType||null,isMiniboss:t.isMiniboss||!1,waveModifiers:t.waveModifiers||{}}),t.isMiniboss&&(this.game.uiManager.showMessage("👹 Mini Trùm xuất hiện!",2,"#8844ff"),this.game.sceneManager.shake(.3,.3),this.game.sceneManager.flash(8930559,.12)),this.spawnIndex++,this.spawnIndex>=this.spawnQueue.length&&(this.state="waiting")}}this.state==="waiting"&&this.game.zombieManager.getAliveCount()===0&&(this.waveActive=!1,this.state="idle",this.currentModifier=null,this.onWaveComplete&&this.onWaveComplete(this.currentLevel,this.waveInLevel))}_updateUI(){const e=document.getElementById("wave-info");if(e)if(this.endlessMode)e.textContent=`♾️ Bất Tận - Đợt ${this.endlessWaveCount}`;else{const t=this.currentLevel+1,n=this.waveInLevel+1;let i=`🏰 Màn ${t} - Đợt ${n}/3`;if(this.currentModifier){const r=Xi[this.currentModifier];i+=` | ${r.name}`}e.textContent=i}}startEndless(){this.endlessMode=!0,this.endlessWaveCount=0,this.currentLevel=9,this._nextEndlessWave()}_nextEndlessWave(){const e=this.endlessWaveCount%ko.length,t=ko[e];if(this._pickWaveModifier(),this._buildSpawnQueue(t),this.state="spawning",this.prepTimer=t.prepTime||4,this.waveActive=!0,this.spawnTimer=0,this.spawnIndex=0,this.minibossSpawned=!1,this.endlessWaveCount++,this._updateUI(),this.currentModifier){const n=Xi[this.currentModifier];n&&this.game.uiManager.showMessage(`🌀 ${n.name}: ${n.desc}`,2.5,n.color)}}reset(){this.currentLevel=0,this.waveInLevel=0,this.state="idle",this.spawnQueue=[],this.spawnIndex=0,this.spawnTimer=0,this.waveActive=!1,this.endlessMode=!1,this.endlessWaveCount=0,this.currentModifier=null,this.minibossSpawned=!1}}class im{constructor(e){this.game=e,this.recipes=ji,this.pendingFusion=null}canFuse(e,t){if(!e||!t)return null;for(const n of this.recipes)if(n.a===e&&n.b===t||n.a===t&&n.b===e)return n;return null}getFusionOptions(e,t){const n=this.game.plantManager.getPlantAt(e,t);if(!n||n.isFusion||!n.config.fuseable)return[];const i=this.game.plantManager.findFusionTargets(e,t),r=[];for(const a of i){if(!a.plant.alive||a.plant.isFusion||!a.plant.config.fuseable)continue;const o=this.canFuse(n.type,a.plant.type);o&&r.push({recipe:o,neighborRow:a.row,neighborCol:a.col,neighborPlant:a.plant})}return r}performFusion(e,t,n,i,r){const a=this.game.plantManager.getPlantAt(e,t),o=this.game.plantManager.getPlantAt(n,i);if(!a||!o||!a.alive||!o.alive)return!1;const c=a.model.position.clone().add(o.model.position).multiplyScalar(.5);this.game.plantManager.removePlant(a),this.game.plantManager.removePlant(o);const l={...r,isFusion:!0,id:r.result};return this.game.plantManager.placePlant(r.result,e,t,l)?(this.game.audio.playFusion(),this.game.particleManager.fusionBurst(c),this.game.particleManager.starBurst(16766720,c,20,5,.8),this.game.particleManager.ringBurst(16766720,c,5,4,.6),this.game.sceneManager.shake(.2,.25),this.game.sceneManager.flash(16766720,.15),this.game.hitStop(.08),this.game.addScore(50),this.game.collectionManager.addFusionResult(r.result),!0):!1}}class sm{constructor(e){this.scene=e,this.particles=[],this._starGeom=new J(.5,4),this._ringGeom=new Dn(.1,.2,16)}_makeParticle(e,t,n,i,r,a=0,o=.5){const c=new J(t*.5,6),l=new V({color:e,emissive:e,emissiveIntensity:o,transparent:!0,opacity:1}),h=new C(c,l);return h.position.copy(n),h.castShadow=!0,this.scene.add(h),this.particles.push({mesh:h,vel:i,life:r,maxLife:r,gravity:a,rotSpeed:Ze(-3,3)}),h}_makeSpark(e,t,n=.3){const i=new St(.03,.003,.003),r=new V({color:e,emissive:e,emissiveIntensity:2}),a=new C(i,r);return a.position.copy(t),this.scene.add(a),this.particles.push({mesh:a,vel:new L(Ze(-2,2),Ze(1,3),Ze(-2,2)),life:n,maxLife:n,gravity:-5,rotSpeed:Ze(-10,10)}),a}burst(e,t,n=8,i=2,r=.12,a=.6){for(let o=0;o<n;o++){const c=o/n*Math.PI*2+Ze(-.2,.2),l=new L(Math.cos(c)*Ze(i*.5,i),Ze(1,2.5),Math.sin(c)*Ze(i*.5,i));this._makeParticle(e,r,t.clone(),l,a*Ze(.7,1.3),-3,.8)}}starBurst(e,t,n=12,i=3,r=.6){for(let a=0;a<n;a++){const o=Math.random()*Math.PI*2,c=Math.random()*Math.PI,l=new L(Math.sin(c)*Math.cos(o)*Ze(i*.5,i),Math.abs(Math.sin(c)*Math.sin(o))*i*.8+1,Math.cos(c)*Ze(i*.5,i));this._makeParticle(e,.08+Math.random()*.06,t.clone(),l,r*Ze(.6,1),-4,1.5).scale.set(1.5,.3,.3)}}ringBurst(e,t,n=3,i=2.5,r=.4){for(let a=0;a<n;a++){const o=new C(new Dn(.05+a*.03,.08+a*.03,16),new Ln({color:e,transparent:!0,opacity:1,side:_t}));o.position.copy(t),o.position.y=.6,o.rotation.x=-Math.PI/2+Ze(-.2,.2),o.rotation.z=Ze(0,Math.PI),this.scene.add(o),this.particles.push({mesh:o,vel:new L(0,i*.3,0),life:r,maxLife:r,gravity:0,rotSpeed:Ze(-2,2)})}}sparkBurst(e,t=16777215,n=6){for(let i=0;i<n;i++){const r=Math.random()*Math.PI*2,a=Ze(2,5);new L(Math.cos(r)*a,Ze(1,3),Math.sin(r)*a),this._makeSpark(t,e.clone(),Ze(.15,.35))}}sunBurst(e){this.burst(16768324,e,12,2.5,.15,.8),this.burst(16755200,e,6,1.5,.08,.5),this.sparkBurst(e,16768324,4)}zombieDeath(e,t=8956535){this.burst(t,e,16,3,.15,.7),this.burst(16729156,e,6,2,.08,.5),this.starBurst(t,e,8,2.5,.5),this.ringBurst(t,e,2,2,.35)}explosion(e){this.burst(16729088,e,20,4,.2,.8),this.burst(16755200,e,15,3,.15,.6),this.burst(16776960,e,10,2.5,.1,.5),this.starBurst(16737792,e,10,3.5,.5),this.ringBurst(16729088,e,3,3,.4),this.sparkBurst(e,16763904,8)}fusionBurst(e){this.burst(16766720,e,24,4,.2,1),this.burst(16777215,e,12,3,.12,.7),this.burst(16738047,e,8,2,.1,.6),this.starBurst(16766720,e,16,4,.7),this.starBurst(16777215,e,8,2.5,.5),this.ringBurst(16766720,e,4,3.5,.5),this.sparkBurst(e,16777215,12)}plantPlace(e){this.burst(4521796,e,10,2,.12,.5),this.burst(8978312,e,5,1,.08,.3)}peaHit(e,t=4500036){this.burst(t,e,5,1.5,.08,.3),this.sparkBurst(e,t,3)}iceHit(e){this.burst(6737151,e,8,2,.1,.5),this.burst(16777215,e,4,1,.06,.3),this.sparkBurst(e,6737151,4)}fireHit(e){this.burst(16737792,e,10,2.5,.12,.5),this.burst(16763904,e,5,1.5,.08,.3),this.sparkBurst(e,16737792,6)}electricHit(e){this.burst(6741503,e,12,2.5,.1,.35),this.sparkBurst(e,6741503,8),this.sparkBurst(e,16777215,4)}update(e){for(let t=this.particles.length-1;t>=0;t--){const n=this.particles[t];if(n.life-=e,n.life<=0){this.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.particles.splice(t,1);continue}const i=1-n.life/n.maxLife;n.vel.y+=n.gravity*e,n.mesh.position.add(n.vel.clone().multiplyScalar(e)),n.mesh.material.opacity=1-i,n.mesh.scale.setScalar(1-i*.5),n.mesh.rotation.x+=n.rotSpeed*e,n.mesh.rotation.z+=n.rotSpeed*e*.7}}clear(){this.particles.forEach(e=>{this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose()}),this.particles=[]}}class rm{constructor(){this.ctx=null,this.enabled=!0,this.masterVolume=.3,this.bgm=null,this.bgmPlaying=!1}init(){try{this.ctx=new(window.AudioContext||window.webkitAudioContext)}catch{this.enabled=!1}this._createBgm()}_createBgm(){try{const e=new Audio;e.src=new URL("assets/music/backyard-bone-party_M1aEhT44.mp3",window.location.href).href,e.loop=!0,e.volume=this.masterVolume*.4,e.preload="auto",this.bgm=e}catch{this.bgm=null}}playBgm(){!this.bgm||this.bgmPlaying||(this.ensureResumed(),this.bgm.currentTime=0,this.bgm.play().catch(()=>{}),this.bgmPlaying=!0)}stopBgm(){this.bgm&&(this.bgm.pause(),this.bgm.currentTime=0,this.bgmPlaying=!1)}_updateBgmVolume(){this.bgm&&(this.bgm.volume=this.masterVolume*.4)}ensureResumed(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume(),this.bgm&&this.bgmPlaying&&this.bgm.paused&&this.bgm.play().catch(()=>{})}_playTone(e,t,n="square",i=1,r=!0){if(!this.enabled||!this.ctx)return;this.ensureResumed();const a=this.ctx.createOscillator(),o=this.ctx.createGain();a.type=n,a.frequency.setValueAtTime(e,this.ctx.currentTime),o.gain.setValueAtTime(i*this.masterVolume,this.ctx.currentTime),r&&o.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+t),a.connect(o),o.connect(this.ctx.destination),a.start(),a.stop(this.ctx.currentTime+t)}_playNoise(e,t=.1){if(!this.enabled||!this.ctx)return;this.ensureResumed();const n=this.ctx.sampleRate*e,i=this.ctx.createBuffer(1,n,this.ctx.sampleRate),r=i.getChannelData(0);for(let c=0;c<n;c++)r[c]=Math.random()*2-1;const a=this.ctx.createBufferSource();a.buffer=i;const o=this.ctx.createGain();o.gain.setValueAtTime(t*this.masterVolume,this.ctx.currentTime),o.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+e),a.connect(o),o.connect(this.ctx.destination),a.start()}playPlace(){this._playTone(400,.08,"square",.15),setTimeout(()=>this._playTone(600,.1,"square",.12),60)}playShoot(){this._playTone(800,.05,"square",.08)}playHit(){this._playNoise(.08,.08),this._playTone(200,.06,"sawtooth",.06)}playZombieEat(){this._playNoise(.12,.06),this._playTone(120,.1,"sawtooth",.04)}playSunCollect(){this._playTone(600,.06,"sine",.12),setTimeout(()=>this._playTone(900,.08,"sine",.1),50),setTimeout(()=>this._playTone(1200,.1,"sine",.08),100)}playExplosion(){this._playNoise(.3,.2),this._playTone(80,.3,"sawtooth",.15,!0)}playFusion(){this._playTone(400,.1,"sine",.12),setTimeout(()=>this._playTone(600,.1,"sine",.12),80),setTimeout(()=>this._playTone(800,.1,"sine",.12),160),setTimeout(()=>this._playTone(1e3,.15,"sine",.15),240)}playZombieDie(){this._playNoise(.15,.1),this._playTone(150,.12,"sawtooth",.06)}playWaveStart(){[400,500,600,800].forEach((t,n)=>{setTimeout(()=>this._playTone(t,.15,"square",.1),n*100)})}playGameOver(){[400,350,300,200].forEach((t,n)=>{setTimeout(()=>this._playTone(t,.3,"sawtooth",.1),n*200)})}playVictory(){[400,500,600,800,1e3,1200].forEach((t,n)=>{setTimeout(()=>this._playTone(t,.2,"sine",.1),n*120)})}playChomp(){this._playNoise(.1,.12),this._playTone(100,.08,"sawtooth",.08)}playFreeze(){this._playTone(1200,.15,"sine",.08),setTimeout(()=>this._playTone(1800,.1,"sine",.06),100),setTimeout(()=>this._playTone(800,.2,"sine",.05),200)}}class am{constructor(e){this.game=e,this.selectedPlant=null,this.selectedDeck=[],this.plantBar=document.getElementById("plant-bar"),this.fusionPanel=document.getElementById("fusion-panel"),this.messageToast=document.getElementById("message-toast"),this.gameOverScreen=document.getElementById("game-over"),this.victoryScreen=document.getElementById("victory-screen"),this.startScreen=document.getElementById("start-screen"),this.levelSelect=document.getElementById("level-select"),this.deckSelect=document.getElementById("deck-select"),this.deckSlots=document.getElementById("deck-slots"),this.deckCount=document.getElementById("deck-count"),this.cooldowns={},this.plantCards=[],this._pendingLevelIdx=0,this._buildPlantBar([]),this._bindEvents()}_buildPlantBar(e){this.plantBar.innerHTML="",this.plantCards=[];for(const t of e){const n=yt[t];if(!n)continue;const i=document.createElement("div");i.className="plant-card",i.dataset.plantId=t,i.innerHTML=`
        <div class="emoji">${n.emoji}</div>
        <div class="cost">☀${n.cost}</div>
        <div class="name-label">${n.name}</div>
        <div class="cooldown-overlay"></div>
      `,i.addEventListener("click",()=>this._selectPlant(t,i)),this.plantBar.appendChild(i),this.plantCards.push({id:t,element:i,cooldownTimer:0,cooldownDuration:5})}}rebuildPlantBar(e){this.clearSelection(),this._buildPlantBar(e)}_selectPlant(e,t){if(t.classList.contains("disabled"))return;if(this.selectedPlant===e){this.selectedPlant=null,this.plantCards.forEach(i=>i.element.classList.remove("active"));return}const n=yt[e];this.game.sunManager.canAfford(n.cost)&&(this.selectedPlant=e,this.plantCards.forEach(i=>i.element.classList.remove("active")),t.classList.add("active"),this.game.sceneManager.clearHighlights())}getSelectedPlant(){return this.selectedPlant}clearSelection(){this.selectedPlant=null,this.plantCards.forEach(e=>e.element.classList.remove("active"))}startCooldown(e){const t=this.plantCards.find(n=>n.id===e);if(t){if(this.game.noCooldown){t.cooldownTimer=0,t.element.classList.remove("disabled");return}t.cooldownTimer=t.cooldownDuration,t.element.classList.add("disabled")}}showFusionPanel(e,t,n,i){if(n.length===0){this.hideFusionPanel();return}this.fusionPanel.style.display="block",this.fusionPanel.style.left=Math.min(e,window.innerWidth-260)+"px",this.fusionPanel.style.top=Math.min(t,window.innerHeight-200)+"px";const r=this.fusionPanel.querySelector(".options");r.innerHTML="";for(const a of n){const o=document.createElement("div");o.className="fusion-option",o.innerHTML=`
        <span class="result-em">${a.recipe.emoji}</span>
        <div class="info">
          <strong>${a.recipe.name}</strong>
          <span class="desc">${a.recipe.desc}</span>
        </div>
      `,o.addEventListener("click",()=>{i(a),this.hideFusionPanel()}),r.appendChild(o)}}hideFusionPanel(){this.fusionPanel.style.display="none"}showMessage(e,t=1.5,n="#ffd700"){this.messageToast.innerHTML=e,this.messageToast.style.color=n,this.messageToast.classList.add("show"),setTimeout(()=>this.messageToast.classList.remove("show"),t*1e3)}showGameOver(){this.gameOverScreen.style.display="flex";const e=document.getElementById("gameover-btns");e.innerHTML="";const t=document.createElement("button");t.className="btn",t.textContent="🔁 Thử Lại",t.onclick=()=>{this.gameOverScreen.style.display="none",this._showDeckForLevel(this.game.currentLevelIndex)},e.appendChild(t);const n=document.createElement("button");n.className="btn",n.textContent="🏰 Chọn Màn",n.onclick=()=>{this.gameOverScreen.style.display="none",this.showLevelSelect()},e.appendChild(n);const i=document.createElement("button");i.className="btn",i.textContent="🏠 Màn Chính",i.onclick=()=>{this.gameOverScreen.style.display="none",this._goToMainMenu()},e.appendChild(i)}_goToMainMenu(){const e=this.game;e.audio.stopBgm(),e.destroy(),e.waveManager.reset(),this.startScreen.style.display="flex"}showVictory(e){this.victoryScreen.style.display="flex";const t=this.victoryScreen.querySelector("p");t.textContent=e===9?"🎉 Bạn đã phá đảo tất cả 10 màn!":`✅ Màn ${e+1} hoàn thành!`;const n=document.getElementById("victory-btns");if(n.innerHTML="",e<9){const a=document.createElement("button");a.className="btn",a.textContent="▶  Màn Tiếp",a.onclick=()=>{this.victoryScreen.style.display="none",this._showDeckForLevel(e+1)},n.appendChild(a)}if(e===9){const a=document.createElement("button");a.id="endless-btn",a.textContent="♾️ Bất Tận",a.onclick=()=>{this.victoryScreen.style.display="none",this.game.startEndless()},n.appendChild(a);const o=document.createElement("button");o.className="btn",o.textContent="🔁 Chơi Lại",o.onclick=()=>{this.victoryScreen.style.display="none",this._showDeckForLevel(0)},n.appendChild(o)}const i=document.createElement("button");i.className="btn",i.textContent="🏰 Chọn Màn",i.onclick=()=>{this.victoryScreen.style.display="none",this.showLevelSelect()},n.appendChild(i);const r=document.createElement("button");r.className="btn",r.textContent="🏠 Màn Chính",r.onclick=()=>{this.victoryScreen.style.display="none",this._goToMainMenu()},n.appendChild(r)}showLevelSelect(){this.levelSelect.style.display="flex",this._renderLevelGrid()}hideLevelSelect(){this.levelSelect.style.display="none"}_renderLevelGrid(){const e=Zi.getProgress(),t=document.getElementById("level-grid");t.innerHTML="";for(let n=0;n<10;n++){const i=document.createElement("div");i.className="level-card";const r=n<=e.highestUnlocked,a=e.completed.includes(n),o=pa[Cn[n].theme],c=Cn[n].rewards||[];r||i.classList.add("locked"),a&&i.classList.add("completed"),i.innerHTML=`
        <div class="level-num">${n+1}</div>
        <div class="level-icon">${r?a?"✅":"🏰":"🔒"}</div>
        <div class="level-label">${o.label}</div>
        <div class="level-plants">🌱+${c.length}</div>
        <div class="boss-badge">👑</div>
      `,r&&i.addEventListener("click",()=>{this.hideLevelSelect(),this._showDeckForLevel(n)}),t.appendChild(i)}}_showDeckForLevel(e){this._pendingLevelIdx=e;const t=Cn[e],n=pa[t.theme];document.getElementById("deck-level-name").textContent=`Màn ${e+1} - ${n.label}`,this.game.collectionManager.getAll();const i=this.game.collectionManager.getDeck();this.selectedDeck=i.filter(r=>yt[r]),this._renderDeckSelection(),this.deckSelect.style.display="flex"}_renderDeckSelection(){this._renderDeckSlots(),this._renderCollectionGrid()}_renderDeckSlots(){const e=this.deckSlots.querySelectorAll(".deck-slot"),t=this.game.collectionManager.getMaxDeckSize();for(let n=0;n<t;n++){const i=e[n];if(n<this.selectedDeck.length){const r=this.selectedDeck[n],a=yt[r];i.className="deck-slot filled",i.innerHTML=`
          <span style="font-size:20px">${a.emoji}</span>
          <span class="slot-cost">☀${a.cost}</span>
          <button class="slot-remove" data-idx="${n}">✕</button>
        `,i.querySelector(".slot-remove").addEventListener("click",o=>{o.stopPropagation(),this.selectedDeck.splice(n,1),this._renderDeckSelection()})}else i.className="deck-slot empty",i.innerHTML="+"}this.deckCount.textContent=`Đã chọn: ${this.selectedDeck.length}/${t}`}_renderCollectionGrid(){const e=document.getElementById("collection-grid");e.innerHTML="";const t=Object.keys(yt),i=this.game.fusionManager.recipes.map(a=>a.result),r=this.game.collectionManager.getAll();for(const a of t){if(i.includes(a))continue;const o=yt[a],c=r.includes(a),l=this.selectedDeck.includes(a),h=document.createElement("div");h.className="collect-card"+(l?" selected":"")+(c?"":" locked-card"),h.innerHTML=`
        <span>${o.emoji}</span>
        <span class="cc-cost">☀${o.cost}</span>
        <span class="cc-name">${o.name}</span>
      `,c&&h.addEventListener("click",()=>{if(l)this.selectedDeck=this.selectedDeck.filter(d=>d!==a);else{const d=this.game.collectionManager.getMaxDeckSize();if(this.selectedDeck.length>=d){this.showMessage("⛔ Tối đa 8 cây!",.8,"#ff6666");return}this.selectedDeck.push(a)}this._renderDeckSelection()}),e.appendChild(h)}}hideDeckSelection(){this.deckSelect.style.display="none"}_confirmDeck(){if(this.selectedDeck.length===0){this.showMessage("⛔ Chọn ít nhất 1 cây!",.8,"#ff6666");return}this.game.collectionManager.setDeck(this.selectedDeck),this.hideDeckSelection(),this.game.start(this._pendingLevelIdx,this.selectedDeck)}hideGameOver(){this.gameOverScreen.style.display="none"}hideVictoryScreen(){this.victoryScreen.style.display="none"}hideStartScreen(){this.startScreen.style.display="none"}update(e){for(const t of this.plantCards){if(t.cooldownTimer>0){t.cooldownTimer-=e;const i=t.cooldownTimer/t.cooldownDuration*100;t.element.querySelector(".cooldown-overlay").style.height=i+"%",t.cooldownTimer<=0&&(t.element.classList.remove("disabled"),t.element.querySelector(".cooldown-overlay").style.height="0%")}const n=yt[t.id];n&&!this.game.sunManager.canAfford(n.cost)&&!t.element.classList.contains("disabled")?t.element.style.opacity="0.5":n&&(t.element.style.opacity="")}}_bindEvents(){document.getElementById("start-btn").addEventListener("click",()=>{this.hideStartScreen(),this.showLevelSelect()}),document.getElementById("level-back-btn").addEventListener("click",()=>{this.hideLevelSelect(),this.startScreen.style.display="flex"}),document.getElementById("deck-back-btn").addEventListener("click",()=>{this.hideDeckSelection(),this.showLevelSelect()}),document.getElementById("deck-confirm-btn").addEventListener("click",()=>{this._confirmDeck()}),document.getElementById("home-btn").addEventListener("click",()=>{this.game.running&&this._goToMainMenu()}),document.getElementById("start-guide-btn").addEventListener("click",()=>{this._buildGuideContent(),document.getElementById("guide-panel").classList.add("show")}),document.getElementById("guide-btn").addEventListener("click",()=>{this._buildGuideContent(),document.getElementById("guide-panel").classList.add("show")}),document.getElementById("guide-close-btn").addEventListener("click",()=>{document.getElementById("guide-panel").classList.remove("show")}),document.querySelectorAll(".guide-tab").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".guide-tab").forEach(r=>r.classList.remove("active")),i.classList.add("active"),this._buildGuideContent(i.dataset.tab)})});const t=document.getElementById("cheat-toggle"),n=document.getElementById("cheat-panel");t.addEventListener("click",()=>{n.classList.toggle("open")}),document.querySelectorAll("#cheat-panel [data-cheat]").forEach(i=>{i.addEventListener("click",()=>{switch(i.dataset.cheat){case"sun":this.game.cheatAddSun();break;case"kill":this.game.cheatKillAll();break;case"win":this.game.cheatCompleteWave();break;case"unlock":this.game.cheatUnlockAll();break;case"warp":{const a=document.getElementById("cheat-level-select"),o=parseInt(a.value);n.classList.remove("open"),this.game.cheatWarpTo(o);break}case"close":{n.classList.remove("open");break}case"reset-factory":{n.classList.remove("open"),this.game.cheatResetFactory();break}case"nocooldown":{this.game.cheatToggleNoCooldown();break}}})}),document.addEventListener("keydown",i=>{(i.key==="`"||i.key==="~")&&(i.preventDefault(),n.classList.toggle("open"))})}_buildGuideContent(e){e=e||"plants";const t=document.getElementById("guide-content");let n="";if(e==="plants"){n+='<div class="guide-grid">';const i=Object.entries(yt);for(const[,r]of i){const a=[];r.damage&&a.push(`<span class="dmg">🗡️${r.damage}</span>`),r.fireRate&&a.push(`<span class="spd">⏱️${r.fireRate}s</span>`),r.hp&&a.push(`<span class="hp">❤️${r.hp}</span>`),r.cost!==void 0&&a.push(`<span class="cost">☀️${r.cost}</span>`),r.sunInterval&&a.push(`<span class="cost">☀️${r.sunAmount||"?"}/${r.sunInterval}s</span>`),n+=`<div class="guide-item">
          <div class="emoji">${r.emoji||"🌱"}</div>
          <div class="info">
            <div class="name">${r.name}</div>
            <div class="desc">${r.desc||""}</div>
            ${a.length?'<div class="stats">'+a.join("")+"</div>":""}
          </div>
        </div>`}n+="</div>"}else if(e==="fusion"){n+='<div class="guide-grid">';for(const i of ji){const r=yt[i.a]||{},a=yt[i.b]||{},o=[];i.damage&&o.push(`<span class="dmg">🗡️${i.damage}</span>`),i.fireRate&&o.push(`<span class="spd">⏱️${i.fireRate}s</span>`),i.hp&&o.push(`<span class="hp">❤️${i.hp}</span>`),i.cost!==void 0&&o.push(`<span class="cost">☀️${i.cost}</span>`),i.sunInterval&&o.push(`<span class="cost">☀️${i.sunAmount||"?"}/${i.sunInterval}s</span>`),n+=`<div class="guide-item">
          <div class="emoji">${i.emoji||"⚗️"}</div>
          <div class="info">
            <div class="name">${i.name}</div>
            <div class="desc">${i.desc||""}</div>
            <div class="guide-fusion-row">${r.emoji||""} ${r.name||"?"} + ${a.emoji||""} ${a.name||"?"} <span>→</span> ${i.name}</div>
            ${o.length?'<div class="stats">'+o.join("")+"</div>":""}
          </div>
        </div>`}n+="</div>"}else if(e==="zombies"){n+='<div class="guide-grid">';const i=Object.entries(Lc);for(const[,r]of i)n+=`<div class="guide-item">
          <div class="emoji">${r.emoji||"🧟"}</div>
          <div class="info">
            <div class="name">${r.name}</div>
            <div class="stats">
              <span class="hp">❤️${r.hp}</span>
              <span class="spd">👟${r.speed}</span>
              <span class="dmg">🗡️${r.damage}</span>
            </div>
          </div>
        </div>`;n+="</div>"}t.innerHTML=n}}class om{constructor(e,t){this.scene=e,this.game=t,this.hazards=[],this._geom=new Ea(1,16)}addHazard(e,t,n,i={}){const r=Vp[e];if(!r)return null;const a=Yi[n],o=wi[t],c=i.color||r.color,l=i.radius||r.radius,h=new Ln({color:c,transparent:!0,opacity:.4,depthWrite:!1,side:_t}),d=new C(this._geom.clone(),h);d.position.set(a,.02,o),d.scale.set(l,l,1),d.rotation.x=-Math.PI/2,this.scene.add(d);const f={type:e,row:t,col:n,x:a,z:o,mesh:d,mat:h,radius:l,color:c,life:i.duration||r.duration||8,maxLife:i.duration||r.duration||8,damagePerSec:i.damagePerSec||r.damagePerSec||0,slowFactor:r.slowFactor||0,alive:!0,tickTimer:0};return this.hazards.push(f),f}update(e,t){for(let n=this.hazards.length-1;n>=0;n--){const i=this.hazards[n];if(i.life-=e,i.life<=0){this._remove(n);continue}const r=i.life/i.maxLife;if(i.mat.opacity=.15+r*.35,i.mesh.scale.setScalar(i.radius*(.8+(1-r)*.2)),i.tickTimer+=e,i.tickTimer>=.5){i.tickTimer=0;const a=t.getZombiesInRadius(i.x,i.z,i.radius);for(const o of a)i.damagePerSec>0&&(o.takeDamage(i.damagePerSec*.5),this.game&&this.game.spawnDamagePopup(o.model.position.clone(),i.damagePerSec*.5,"#"+i.mat.color.getHexString())),i.slowFactor>0&&o.applySlow(i.slowFactor,1)}}}_remove(e){const t=this.hazards[e];this.scene.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material.dispose(),this.hazards.splice(e,1)}clear(){for(const e of this.hazards)this.scene.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();this.hazards=[]}}const Xo="pvz_fusion_collection",qo="pvz_fusion_deck",As=8,Rs=["peashooter","sunflower","wallnut"];class cm{constructor(){this._collection=this._loadCollection(),this._deck=this._loadDeck()}_loadCollection(){try{const e=localStorage.getItem(Xo);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t}}catch{}return[...Rs]}_saveCollection(){try{localStorage.setItem(Xo,JSON.stringify(this._collection))}catch{}}_loadDeck(){try{const e=localStorage.getItem(qo);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t}}catch{}return[...Rs]}_saveDeck(){try{localStorage.setItem(qo,JSON.stringify(this._deck))}catch{}}getAll(){return[...this._collection]}has(e){return this._collection.includes(e)}add(e){this._collection.includes(e)||(this._collection.push(e),this._saveCollection())}addBatch(e){let t=!1;for(const n of e)this._collection.includes(n)||(this._collection.push(n),t=!0);t&&this._saveCollection()}addFusionResult(e){return this._collection.includes(e)?!1:(this._collection.push(e),this._saveCollection(),!0)}getDeck(){return[...this._deck]}setDeck(e){e.length>As&&(e=e.slice(0,As)),this._deck=e.filter(t=>this._collection.includes(t)),this._saveDeck()}addToDeck(e){return this._deck.length>=As||!this._collection.includes(e)||this._deck.includes(e)?!1:(this._deck.push(e),this._saveDeck(),!0)}removeFromDeck(e){const t=this._deck.indexOf(e);return t!==-1?(this._deck.splice(t,1),this._saveDeck(),!0):!1}isInDeck(e){return this._deck.includes(e)}getMaxDeckSize(){return As}getCollectedCount(){const e=Object.keys(yt),t=ji.map(i=>i.result);return e.filter(i=>!t.includes(i)).filter(i=>this._collection.includes(i)).length}getTotalCollectibleCount(){const e=Object.keys(yt),t=ji.map(n=>n.result);return e.length-t.length}reset(){this._collection=[...Rs],this._deck=[...Rs],this._saveCollection(),this._saveDeck()}}const br="pvz_fusion_progress";class Zi{static getProgress(){try{return JSON.parse(localStorage.getItem(br))||{completed:[],highestUnlocked:0}}catch{return{completed:[],highestUnlocked:0}}}static resetProgress(){localStorage.removeItem(br)}constructor(e){this.container=e,this.running=!1,this.paused=!1,this.score=0,this.lives=3,this.time=0,this.currentLevelIndex=0,this._rafId=null,this._hitStopTimer=0,this._damagePopups=[],this.audio=new rm,this.audio.init(),this.noCooldown=!1,this.collectionManager=new cm,this.sceneManager=new Yp(e),this.gridManager=new jp,this.inputManager=new Zp(e),this.particleManager=new sm(this.sceneManager.scene),this.hazardsManager=new om(this.sceneManager.scene,this),this.sunManager=new $p(this.sceneManager.scene,this.audio),this.projectileManager=new tm(this.sceneManager.scene,this.particleManager,this.audio,this),this.zombieManager=new em(this.sceneManager.scene,this.particleManager,this.audio,this),this.plantManager=new Jp(this.sceneManager.scene,this.gridManager,this.particleManager,this.audio,this),this.waveManager=new nm(this),this.fusionManager=new im(this),this.uiManager=new am(this),this._setupInput(),this._setupWaveCallbacks()}_collectRewards(e){const t=Cn[e];t.rewards&&this.collectionManager.addBatch(t.rewards)}_saveProgress(e){const t=Zi.getProgress();t.completed.includes(e)||t.completed.push(e),e+1>t.highestUnlocked&&e+1<10&&(t.highestUnlocked=e+1),localStorage.setItem(br,JSON.stringify(t))}_setupInput(){this.inputManager.onClick((e,t)=>{if(this.audio.ensureResumed(),!this.running||this.paused)return;const n=this.sceneManager.screenToWorld(e,t),i=this.sunManager.hitTest(n.x,n.z);if(i){this.sunManager.collectSun(i);return}const r=this.gridManager.worldToGrid(n.x,n.z);if(!r)return;const{row:a,col:o}=r,c=this.plantManager.getPlantAt(a,o);if(c&&c.alive&&c.config.fuseable){const d=this.fusionManager.getFusionOptions(a,o);if(d.length>0){this.uiManager.showFusionPanel(e,t,d,f=>{this.fusionManager.performFusion(a,o,f.neighborRow,f.neighborCol,f.recipe),this.uiManager.clearSelection()});return}}this.uiManager.hideFusionPanel();const l=this.uiManager.getSelectedPlant();if(!l)return;if(this.gridManager.isOccupied(a,o)){this.uiManager.showMessage("⛔ Ô đã có cây!",.8,"#ff6666");return}const h=yt[l];if(!this.sunManager.spend(h.cost)){this.uiManager.showMessage("⛔ Không đủ nắng!",.8,"#ff6666");return}this.plantManager.placePlant(l,a,o),this.uiManager.startCooldown(l),this.uiManager.clearSelection(),this.sceneManager.clearHighlights()}),this.inputManager.onMouseMove((e,t)=>{if(!this.running)return;this.sceneManager.clearHighlights();const n=this.sceneManager.screenToWorld(e,t),i=this.gridManager.worldToGrid(n.x,n.z);i&&this.uiManager.getSelectedPlant()&&this.sceneManager.highlightCell(i.row,i.col,!this.gridManager.isOccupied(i.row,i.col))})}_setupWaveCallbacks(){this.waveManager.onWaveComplete=(e,t)=>{if(this.waveManager.endlessMode){setTimeout(()=>this.waveManager._nextEndlessWave(),3e3),this.audio.playWaveStart();return}if(t<2)setTimeout(()=>{this.waveManager.startNextWave(),this.audio.playWaveStart(),this.uiManager.showMessage(`🌊 Đợt ${t+2}/3 sắp tới!`,2,"#ff8844")},3e3);else if(this._collectRewards(e),this._saveProgress(e),e>=this.waveManager.totalLevels-1)this.victory();else{const n=Cn[e].rewards||[],i=n.length>0?` 🌱+${n.length} cây mới!`:"";this.uiManager.showMessage(`✅ Màn ${e+1} hoàn thành!${i}`,2.5,"#44ff44"),setTimeout(()=>{this.destroy(),this.waveManager.reset(),this.uiManager.showLevelSelect()},2500)}}}start(e=0,t=null){this.destroy(),this.waveManager.reset(),this.uiManager.clearSelection(),this.uiManager.hideFusionPanel();const n=Cn[e],i=pa[n.theme];this.sceneManager.setTheme(i);const r=t||n.availablePlants||Object.keys(yt).slice(0,6);this.uiManager.rebuildPlantBar(r),this.currentLevelIndex=e,this.running=!0,this.audio.playBgm(),this.time=0,this.score=0,this.lives=3,this.sunManager.setSun(Wp),this.uiManager.showMessage(`🌱 ${i.label} - Đặt cây để phòng thủ!`,2,"#44ff44"),setTimeout(()=>{this.waveManager.startLevel(e),this.audio.playWaveStart(),this.uiManager.showMessage(`🌊 Màn ${e+1} - Đợt 1 sắp tới!`,2,"#ff8844")},3e3),this._loop()}startEndless(){this.destroy(),this.waveManager.reset(),this.uiManager.clearSelection(),this.uiManager.hideFusionPanel(),this.running=!0,this.audio.playBgm(),this.waveManager.startEndless(),this.uiManager.showMessage("♾️ Chế Độ Bất Tận!",2,"#ffd700"),this._loop()}loseLife(e=1){this.lives-=e,this.lives<=0&&this.gameOver()}gameOver(){this.running=!1,this.audio.stopBgm(),this.audio.playGameOver(),this.uiManager.showGameOver()}victory(){this.running=!1,this.audio.stopBgm(),this.audio.playVictory(),this._saveProgress(this.currentLevelIndex),this.uiManager.showVictory(this.currentLevelIndex)}addScore(e){this.score+=e;const t=document.getElementById("score-amount");t&&(t.textContent=this.score)}cheatAddSun(){this.sunManager.addSun(1e3),this.uiManager.showMessage("☀️ +1000 Nắng",1,"#ffd700")}cheatKillAll(){[...this.zombieManager.zombies].forEach(e=>this.zombieManager.kill(e)),this.uiManager.showMessage("💀 Đã giết hết zombie",1,"#ff4444")}cheatCompleteWave(){const e=this.waveManager;e.prepTimer=0,e.spawnIndex=e.spawnQueue.length,e.state="waiting",[...this.zombieManager.zombies].forEach(t=>this.zombieManager.kill(t)),this.uiManager.showMessage("🏆 Chiến thắng đợt",1,"#44ff44")}cheatUnlockAll(){const e={completed:[0,1,2,3,4,5,6,7,8,9],highestUnlocked:9};localStorage.setItem("pvz_fusion_progress",JSON.stringify(e));const t=Object.keys(yt),i=this.fusionManager.recipes.map(a=>a.result),r=t.filter(a=>!i.includes(a));this.collectionManager.addBatch(r),this.uiManager.showMessage("🔓 Đã mở khoá tất cả màn + cây",1.5,"#ffd700")}cheatWarpTo(e){this.destroy(),this.waveManager.reset(),this.start(e)}cheatResetFactory(){Zi.resetProgress(),this.collectionManager.reset(),this.audio.stopBgm(),this.destroy(),this.waveManager.reset(),this.noCooldown=!1,this.uiManager.showMessage("🗑️ Đã reset về ban đầu!",2,"#ff6666"),this.uiManager.hideGameOver(),this.uiManager.hideVictoryScreen(),this.uiManager.hideLevelSelect(),this.uiManager.startScreen.style.display="flex"}cheatToggleNoCooldown(){this.noCooldown=!this.noCooldown,this.noCooldown?(this.uiManager.plantCards.forEach(e=>{e.cooldownTimer=0,e.element.classList.remove("disabled")}),this.uiManager.showMessage("⏰ Tắt cooldown cây",1.5,"#ff8844")):this.uiManager.showMessage("⏰ Bật lại cooldown cây",1.5,"#88ff88")}_loop(){if(!this.running)return;let e=Math.min(this._deltaTime(),.05);this._hitStopTimer>0&&(this._hitStopTimer-=e,e=0),this.time+=e,this.sunManager.update(e),this.zombieManager.update(e,this.gridManager),this.plantManager.update(e),this.projectileManager.update(e,this.zombieManager),this.waveManager.update(e),this.particleManager.update(e),this.hazardsManager.update(e,this.zombieManager),this.uiManager.update(e),this.sceneManager.update(e),this._updateDamagePopups(e),this.sceneManager.render(),this._rafId=requestAnimationFrame(()=>this._loop())}hitStop(e=.06){this._hitStopTimer=e}spawnDamagePopup(e,t,n="#ffffff"){const i=document.createElement("div");i.className="damage-popup",i.textContent=Math.round(t),i.style.cssText=`position:fixed;font-size:${18+Math.min(t,40)*.3}px;font-weight:bold;color:${n};text-shadow:0 2px 4px rgba(0,0,0,0.8);pointer-events:none;z-index:50;font-family:'Segoe UI',Arial,sans-serif;`,document.body.appendChild(i),this._damagePopups.push({el:i,x:0,y:0,life:.8,maxLife:.8,pos:e})}_updateDamagePopups(e){const t=this.sceneManager.camera;for(let n=this._damagePopups.length-1;n>=0;n--){const i=this._damagePopups[n];if(i.life-=e,i.life<=0){i.el.remove(),this._damagePopups.splice(n,1);continue}const r=i.pos.clone().add(new L(0,.6+(1-i.life/i.maxLife)*1.5,0));r.project(t);const a=(r.x*.5+.5)*window.innerWidth,o=(-r.y*.5+.5)*window.innerHeight;i.el.style.left=a+"px",i.el.style.top=o+"px";const c=i.life/i.maxLife;i.el.style.opacity=c,i.el.style.transform=`translateY(${-(1-c)*30}px)`}}_deltaTime(){const e=performance.now()/1e3;this._lastTime||(this._lastTime=e);const t=e-this._lastTime;return this._lastTime=e,t}destroy(){this._rafId&&(cancelAnimationFrame(this._rafId),this._rafId=null),this.running=!1,this.projectileManager.clear(),this.zombieManager.clear(),this.plantManager.clear(),this.sunManager.clear(),this.particleManager.clear(),this.hazardsManager.clear()}}const lm=document.body;new Zi(lm);
//# sourceMappingURL=index-VJtU1H1A.js.map
