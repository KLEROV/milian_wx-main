(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/square/square"],{"039a":function(t,e,o){"use strict";o.r(e);var i=o("9ae6"),n=o("8701");for(var s in n)"default"!==s&&function(t){o.d(e,t,(function(){return n[t]}))}(s);o("a9dc");var c,a=o("f0c5"),r=Object(a["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);e["default"]=r.exports},"2b63":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(o("58ff")),n=s(o("9fad"));function s(t){return t&&t.__esModule?t:{default:t}}var c=function(){Promise.all([o.e("common/vendor"),o.e("city-select/city-select")]).then(function(){return resolve(o("ae36"))}.bind(null,o)).catch(o.oe)},a={onShareAppMessage:function(t){return console.log(t),"menu"===t.from&&console.log(t.target),{title:"觅恋一下，简单交友",path:"/pages/square/square",imageUrl:"../../static/img-share/img2.png"}},components:{citySelect:c},onLoad:function(){var e=this,o=t.getStorageSync("Locations");setTimeout((function(){e.formatName="cityName",e.activeCity={cityName:o[0].regeocodeData.addressComponent.city,cityCode:o[0].regeocodeData.addressComponent.adcode},e.hotCity=[{cityName:"南京",cityCode:110100},{cityName:"北京",cityCode:110102}],e.obtainCitys=n.default,t.showToast({icon:"none",title:"更新数据成功",duration:3e3,mask:!0})}),500)},data:function(){return{weixin:"1187790777",formatName:"title",activeCity:{id:1,title:"成都市"},hotCity:[{id:0,title:"北京市"},{id:1,title:"上海市"}],obtainCitys:[{id:0,title:"南京"},{id:1,title:"北京"},{id:2,title:"天津"},{id:3,title:"东京"}],manSty:"",womanSty:"",inverted:!0,optionCity:[],option1:[{text:"最新注册",value:0,color:"#fff"},{text:"收费价格",value:1},{text:"最好评",value:2},{text:"被搭讪次数最多",value:3},{text:"主动搭讪最多",value:4}],images:o("2c78"),colors:"",iscolors:-1,userList:[],nearbyy:"",flag:!1,show:!1,showSuccess:!1,value1:"城市",users:"",peopleList:{},refresh:!0,lon:"",lat:"",direct:"",order:"",city:""}},methods:{goole:function(){var t=this;i.default.get("/users",{gender:this.users.gender,lon:this.lon,lat:this.lat,city:this.city,direct:this.direct,order:this.order}).then((function(e){t.userList=e.data.data}))},init:function(){var e=this;this.users=t.getStorageSync("userinfos"),0===this.users.gender?this.users.gender=1:1===this.users.gender&&(this.users.gender=0),i.default.get("/users",{gender:this.users.gender}).then((function(t){e.userList=t.data.data})),console.log("这是搭讪成功打印的数据"),0===this.users.gender?(this.womanSty="color: #FFFFFF;background:linear-gradient(180deg, #7840F6 0%, #B464EF 100%)",this.manSty=""):1===this.users.gender&&(this.manSty="color: #FFFFFF;background:linear-gradient(180deg, #7840F6 0%, #B464EF 100%)",this.womanSty="")},man:function(){this.manSty="color: #FFFFFF;background:linear-gradient(180deg, #7840F6 0%, #B464EF 100%)",this.womanSty="",this.users.gender=1,this.goole()},woman:function(){this.womanSty="color: #FFFFFF;background:linear-gradient(180deg, #7840F6 0%, #B464EF 100%)",this.manSty="",this.users.gender=0,this.goole()},openimg:function(){this.images=o("533d"),this.flag=!1,this.nearbyy=""},closeimg:function(){this.images=o("2c78"),console.log("更多的关闭事件")},colsedCity:function(){console.log("城市的关闭事件")},changeColors:function(t){this.iscolors=t,0===t?(this.order="created_at",this.direct="asc"):1===t?(this.order="price",this.direct="asc"):2===t?(this.order="rating",this.direct="asc"):3===t?(this.order="be_accost_num",this.direct="asc"):4===t&&(this.order="accost_num",this.direct="asc"),this.goole()},accost:function(t){console.log(t),this.show=!0,this.peopleList=t},canclepop:function(){this.show=!1},nearbys:function(){if(console.log(123),this.flag=!this.flag,1==this.flag){this.nearbyy="color:#AB5FF1",this.selectComponent("#item").toggle(!1),this.selectComponent("#mores").toggle(!1);var e=t.getStorageSync("Location");this.lon=e.longitude,this.lat=e.latitude,this.goole()}else this.nearbyy="",this.lon="",this.lat="",this.goole()},gopop:function(){var e=this;i.default.post("/accost/"+this.peopleList.id).then((function(o){200===o.statusCode?(e.show=!1,e.showSuccess=!0,t.$emit("update",e.refresh),setTimeout((function(){e.init()}),1e3)):(console.log(o),t.showToast({title:o.data.message,duration:2e3,icon:"loading",success:function(){setTimeout((function(){t.navigateTo({url:"/components/recharge"})}),2e3)}}))}))},cancelAcc:function(){this.show=!1},cancelAcco:function(){this.showSuccess=!1},copy:function(e){t.setClipboardData({data:e,success:function(o){console.log("复制的信息：",e),t.showToast({title:"复制成功"})}})},cityClick:function(t){console.log(t),this.value1=t.cityName,this.city=t.cityName,this.selectComponent("#item").toggle(),this.goole()},openCity:function(){this.flag=!1,this.nearbyy="",console.log("城市列表打开事件")}},created:function(){this.init(),t.authorize({scope:"scope.userLocation",success:function(){t.getLocation({type:"gcj02",success:function(e){console.log("当前位置的经度："+e.longitude),console.log("当前位置的纬度："+e.latitude),console.log("当前地址信息",e),t.setStorageSync("Location",e)}})}})}};e.default=a}).call(this,o("543d")["default"])},8701:function(t,e,o){"use strict";o.r(e);var i=o("2b63"),n=o.n(i);for(var s in i)"default"!==s&&function(t){o.d(e,t,(function(){return i[t]}))}(s);e["default"]=n.a},"9ae6":function(t,e,o){"use strict";var i;o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return s})),o.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement;t._self._c},s=[]},a6b1:function(t,e,o){"use strict";(function(t){o("bc26");i(o("66fd"));var e=i(o("039a"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=o,t(e.default)}).call(this,o("543d")["createPage"])},a9dc:function(t,e,o){"use strict";var i=o("d812"),n=o.n(i);n.a},d812:function(t,e,o){}},[["a6b1","common/runtime","common/vendor"]]]);