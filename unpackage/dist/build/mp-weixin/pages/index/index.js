(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0a6c":function(t,e,n){},"6d02":function(t,e,n){"use strict";n.r(e);var i=n("89e3"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},8412:function(t,e,n){"use strict";n.r(e);var i=n("e0b9"),o=n("6d02");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("8b10");var a,c=n("f0c5"),s=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);e["default"]=s.exports},"89e3":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("3d1d");function o(t){return s(t)||c(t)||a(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(t,e){if(t){if("string"===typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(t,e):void 0}}function c(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function s(t){if(Array.isArray(t))return u(t)}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}var h=function(){n.e("pages/index/components/actorList").then(function(){return resolve(n("c304"))}.bind(null,n)).catch(n.oe)},f={data:function(){return{container:140,mainHeight:0,show:!1,picSet:{width:0,animation:"",picType:4},dataArr:[],msg:{target:0,data:[],copyWeChat:!1,getChatShow:!0}}},components:{actorList:h},methods:{actorList:function(t){this.msg.target=t,this.msg.data=this.dataArr,this.msg.getChatShow=!0,this.msg.copyWeChat=!1,this.show=!0},howMove:function(t,e){this.picSet.animation="";var n=wx.getSystemInfoSync(),o=n.windowWidth;return e>=3*this.picSet.picType?(this.picSet.width=Math.ceil(e/this.picSet.picType)*this.container*2,this.picSet.height=n.windowHeight/this.picSet.picType):(this.picSet.width=o,this.picSet.height=n.windowHeight/this.picSet.picType,this.container=120),(0,i.positionSet)(t,this.picSet.height,this.container)},onClose:function(){this.show=!1},change:function(t){switch(t){case 0:this.msg.getChatShow=!1,this.msg.copyWeChat=!0;break;case 1:this.show=!1,this.msg.copyWeChat=!1,this.getUserList();break;case 2:break;default:break}},getUserList:function(){var e=this;t.showLoading({title:"加载中..."});var n="/users?page=1";this.$api.get(n).then((function(n){var i=[];if(200==n.statusCode){for(var r=0;r<10;r++)i.push.apply(i,o(n.data.data)),i[r].avatar_url="http://192.168.0.62/storage/avatars/HTTn6AotC9o3xQ6k2VZtzxMGKM6MxaDkbsx0TB52.jpg";e.msg.data=i,e.dataArr=e.howMove(i,i.length),setTimeout((function(){t.hideLoading()}),1e3)}})).catch((function(e){t.showToast({title:"数据丢失了,请检查网络",icon:"none",duration:2e3}),console.log(e,2)}))}},computed:{arr1:{set:function(){},get:function(t){return t.dataArr}}},mounted:function(){var t=wx.getSystemInfoSync();this.mainHeight=t.windowHeight,this.getUserList()},onLoad:function(){},onPullDownRefresh:function(){if(this.show)return!1;this.picSet.animation="",this.getUserList(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)}};e.default=f}).call(this,n("543d")["default"])},"8b10":function(t,e,n){"use strict";var i=n("0a6c"),o=n.n(i);o.a},d5d3:function(t,e,n){"use strict";(function(t){n("bc26");i(n("66fd"));var e=i(n("8412"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},e0b9:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement;t._self._c},r=[]}},[["d5d3","common/runtime","common/vendor"]]]);