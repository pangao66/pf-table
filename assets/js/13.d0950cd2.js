(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{373:function(t,e,r){"use strict";r.r(e);r(100),r(101),r(102),r(62),r(60),r(59),r(98);var a=r(39),n=(r(99),r(30)),o=r(257),s=r.n(o);function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){Object(a.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var c,p={name:"search-table",data:function(){return{tableData:[],total:10}},methods:{getTableData:(c=Object(n.a)(regeneratorRuntime.mark((function t(e,r){var a,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=Object.assign({},e),t.next=3,s.a.post("/search-table",i({},a));case 3:200===(n=t.sent).status&&(n=n.data,this.tableData=n.list,this.total=n.total,console.log(n.list)),r();case 6:case"end":return t.stop()}}),t,this)}))),function(t,e){return c.apply(this,arguments)}),getSex:function(t){return{1:"男",0:"女"}[t.cellValue]||"-"}},computed:{columns:function(){return[{prop:"id",label:"id",attrs:{width:260}},{prop:"name",label:"姓名",attrs:{width:60}},{prop:"address",label:"地址",attrs:{minWidth:160}},{prop:"age",label:"年龄",attrs:{width:60}},{prop:"birth",label:"生日"},{prop:"sex",label:"性别",formatter:this.getSex}]},formItems:function(){return[{type:"input",prop:"name",label:"姓名"},{type:"select",prop:"sex",label:"性别",options:[{label:"男",value:1},{label:"女",value:0}]}]}}},u=r(1),b=Object(u.a)(p,(function(){var t=this.$createElement;return(this._self._c||t)("pf-table",{attrs:{columns:this.columns,data:this.tableData,total:this.total,"form-items":this.formItems},on:{"get-table-data":this.getTableData}})}),[],!1,null,"19e586e4",null);e.default=b.exports}}]);