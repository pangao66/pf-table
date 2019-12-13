(window.webpackJsonp=window.webpackJsonp||[]).push([[7,10],{311:function(e,t,r){"use strict";r.r(t);r(36),r(37),r(38),r(39),r(19),r(34),r(35),r(109);var n=r(40),a=r(10),o=r(279),s=r.n(o);function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){Object(a.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var l,u={name:"edit-user",props:{info:{type:Object,default:function(){}}},data:function(){return{formData:{}}},created:function(){this.isEdit&&(this.formData=c({},this.info))},methods:{confirm:(l=Object(n.a)(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n={},!this.isEdit){e.next=7;break}return e.next=4,s.a.post("/update-user",c({},t));case 4:n=e.sent,e.next=10;break;case 7:return e.next=9,s.a.post("/add-user",c({},t));case 9:n=e.sent;case 10:200===n.status&&1===(n=n.data).code&&(this.$message.success(this.isEdit?"编辑用户成功":"添加用户成功"),this.$emit("refresh-table"),this.$emit("close")),r();case 12:case"end":return e.stop()}}),e,this)}))),function(e,t){return l.apply(this,arguments)})},computed:{formItems:function(){return[{type:"input",label:"姓名",prop:"name",trim:!0,required:!0},{type:"radio",label:"性别",prop:"sex",options:[{label:"男",value:1},{label:"女",value:0}],required:!0},{type:"input",label:"地址",prop:"address",required:!0},{type:"date",label:"出生日期",prop:"birth",attrs:{"value-format":"timestamp"},required:!0},{slot:"describe",label:"描述",prop:"describe"}]},rules:function(){return{}},isEdit:function(){return Object.keys(this.info).length}}},p=r(1),f=Object(p.a)(u,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("t-dialog-form",e._g({attrs:{title:e.isEdit?"编辑用户":"添加用户","form-items":e.formItems,"dialog-config":{width:"500px"},rules:e.rules,originData:e.formData},on:{confirm:e.confirm},scopedSlots:e._u([{key:"describe",fn:function(t){var n=t.form,a=t.item;return[r("el-form-item",{attrs:{label:a.label,prop:a.prop}},[r("el-input",{attrs:{type:"textarea"},model:{value:n[a.prop],callback:function(t){e.$set(n,a.prop,t)},expression:"form[item.prop]"}})],1)]}}]),model:{value:e.formData,callback:function(t){e.formData=t},expression:"formData"}},e.$listeners))}),[],!1,null,"2f418cf6",null);t.default=f.exports},372:function(e,t,r){"use strict";r.r(t);r(36),r(37),r(38),r(39),r(19),r(34),r(35),r(113);var n=r(10),a=(r(109),r(40)),o=r(279),s=r.n(o),i=r(311);function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var u,p,f={name:"complex-table",data:function(){return{tableData:[],total:10,editDialogShow:!1,currentInfo:{}}},methods:{getTableData:(p=Object(a.a)(regeneratorRuntime.mark((function e(t,r){var n,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object.assign({},t),e.next=3,s.a.post("/search-table",l({},n));case 3:200===(a=e.sent).status&&(a=a.data,this.tableData=a.list,this.total=a.total,console.log(a.list)),r();case 6:case"end":return e.stop()}}),e,this)}))),function(e,t){return p.apply(this,arguments)}),addUser:function(){this.currentInfo={},this.editDialogShow=!0},editUser:function(e){this.currentInfo=e,this.editDialogShow=!0},deleteUser:(u=Object(a.a)(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.post("/delete-user",{id:t.id});case 2:200===(r=e.sent).status&&1===(r=r.data).code&&(this.$message.success("删除用户成功"),this.refreshTable());case 4:case"end":return e.stop()}}),e,this)}))),function(e){return u.apply(this,arguments)}),refreshTable:function(){this.$refs.pfTable.search()},getSex:function(e){return{1:"男",0:"女"}[e]||"-"},getJob:function(e){return{designer:"设计",programmer:"程序员",testers:"测试",product:"产品"}[e.cellValue]}},computed:{columns:function(){return[{prop:"id",label:"id"},{prop:"name",label:"姓名",attrs:{width:60}},{prop:"address",label:"地址",attrs:{minWidth:140}},{prop:"birth",label:"生日",formatter:"date"},{prop:"job",label:"职位",formatter:this.getJob},{slot:"sex",label:"性别"},{slot:"handle",label:"操作",attrs:{width:170}}]},formItems:function(){return[{type:"input",prop:"name",label:"姓名"},{type:"select",prop:"sex",label:"性别",options:[{label:"男",value:1},{label:"女",value:0}]}]}},components:{editUser:i.default}},b=r(1),d=Object(b.a)(f,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("pf-table",{ref:"pfTable",attrs:{columns:e.columns,data:e.tableData,total:e.total,"form-items":e.formItems},on:{"get-table-data":e.getTableData},scopedSlots:e._u([{key:"form-after",fn:function(){return[r("el-button",{staticStyle:{"margin-bottom":"20px"},attrs:{icon:"el-icon-plus",type:"primary"},on:{click:e.addUser}},[e._v("添加\n      ")])]},proxy:!0},{key:"sex",fn:function(t){var n=t.row;return[r("el-tag",{attrs:{type:n.sex?"success":"danger"}},[e._v(e._s(e.getSex(n.sex)))])]}},{key:"handle",fn:function(t){var n=t.row;return[r("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.editUser(n)}}},[e._v("编辑")]),e._v(" "),r("el-popconfirm",{attrs:{title:"请确认是否删除",width:"200",placement:"top-end"},on:{onConfirm:function(t){return e.deleteUser(n)}}},[r("el-button",{attrs:{slot:"reference",size:"mini",type:"danger"},slot:"reference"},[e._v("删除")])],1)]}}])}),e._v(" "),e.editDialogShow?r("edit-user",{attrs:{info:e.currentInfo},on:{close:function(t){e.editDialogShow=!1},"refresh-table":e.refreshTable}}):e._e()],1)}),[],!1,null,"7f75fe14",null);t.default=d.exports}}]);