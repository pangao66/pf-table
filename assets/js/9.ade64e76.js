(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{370:function(t,e,a){"use strict";a.r(e);a(116),a(104);var r,n=a(39),s=a(268),o=a.n(s),l={name:"base-table",data:function(){return{tableData:[{id:11,email:"p.ldx@ljrprqgz.cn",name:"段军",address:"湖北省 襄阳市 南漳县"}]}},created:function(){this.getTableData()},methods:{getTableData:(r=Object(n.a)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.post("/base-table");case 2:200===(e=t.sent).status&&(e=e.data,this.tableData=e,console.log(e));case 4:case"end":return t.stop()}}),t,this)}))),function(){return r.apply(this,arguments)}),rowDblClick:function(t){this.$message.success("您双击了姓名为".concat(t.name,"这一行"))},getSex:function(t){return{1:"男",0:"女"}[t]||"-"},getJob:function(t){return{designer:"设计",programmer:"程序员",testers:"测试",product:"产品"}[t.cellValue]}},computed:{columns:function(){return[{prop:"id",label:"id",attrs:{width:260}},{prop:"name",label:"姓名",attrs:{width:60}},{prop:"address",label:"地址",attrs:{minWidth:160}},{prop:"birth",label:"生日",formatter:"date"},{prop:"job",label:"职位",formatter:this.getJob},{slot:"sex",label:"性别"}]}}},c=a(1),u=Object(c.a)(l,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("t-table",{attrs:{data:t.tableData,columns:t.columns,stripe:!0},on:{"row-dblclick":t.rowDblClick},scopedSlots:t._u([{key:"sex",fn:function(e){var r=e.row;return[a("el-tag",{attrs:{type:r.sex?"success":"danger"}},[t._v(t._s(t.getSex(r.sex)))])]}}])})}),[],!1,null,null,null);e.default=u.exports}}]);