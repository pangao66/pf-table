(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{274:function(t,a,e){},339:function(t,a,e){"use strict";var n=e(274);e.n(n).a},364:function(t,a,e){"use strict";var n=e(365),i=e(366),o=e(338),c=e.n(o),s={components:{PageEdit:n.a,PageNav:i.a},props:["sidebarItems"],mounted:function(){var t=this;this.init(location.pathname),this.$router.afterEach((function(a,e){a.path!==e.path&&(console.log(a.path,e.path,"页面切换了"),t.init(a.path))}))},methods:{init:function(t){var a=new c.a({clientID:"bd729577007e51c7024e",clientSecret:"2ffab37b6220d89b521a4c2e3d1093bf7ca86ec1",repo:"pf-table-doc",owner:"pangao66",admin:["pangao66"],id:location.pathname,body:location.pathname,distractionFreeMode:!1}),e=document.getElementById("gitalk-container");e&&(e.innerHTML=""),a.render("gitalk-container")}}},r=(e(339),e(1)),d=Object(r.a)(s,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("main",{staticClass:"page"},[t._t("top"),t._v(" "),e("Content",{staticClass:"theme-default-content"}),t._v(" "),e("PageEdit"),t._v(" "),e("PageNav",t._b({},"PageNav",{sidebarItems:t.sidebarItems},!1)),t._v(" "),t._t("bottom"),t._v(" "),e("div",{attrs:{id:"gitalk-container"}})],2)}),[],!1,null,null,null);a.a=d.exports}}]);