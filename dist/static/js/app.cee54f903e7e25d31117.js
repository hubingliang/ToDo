webpackJsonp([1],{25:function(t,o){},26:function(t,o){},27:function(t,o){},28:function(t,o,e){function n(t){e(75)}var s=e(14)(e(51),e(80),n,null,null);t.exports=s.exports},51:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=e(16),s=e.n(n),d=e(77),a=e.n(d),i=e(76),r=e.n(i);o.default={data:function(){return{todo:{year:(new Date).getFullYear(),Cmonth:new Array("J a n u a r y","F e b r u a r y","M a r c h","A p r i l","M a y","J u n e","J u l y","A u g u s t","S e p t e m b e r","O c t o b e r","N o v e m b e r","D e c e m b e r")[(new Date).getMonth()],dates:[],newTodo:"",todolist:[],canadd:!1,day:(new Date).getDate(),weekday:new Array("S u n d a y","M o n d a y","T u e s d a y","W e d n e s d a y","T h u r s d a y","F r i d a y","S a t u r d a y")[(new Date).getDay()]}}},mounted:function(){this.x()},name:"app",components:{todos:a.a,calendar:r.a},methods:{x:function(){AV.init({appId:"iq8VG5dIWuxuOwbw9XGV9aCK-gzGzoHsz",appKey:"RK4buVBs7Q2rxhgE29gVKU66"})},register:function(){var t=$("#inputUsername").val(),o=$("#inputPassword").val(),e=$("inputEmail").val(),n=new AV.User;n.setUsername(t),n.setPassword(o),n.setEmail(e),n.signUp().then(function(t){},function(t){alert(s()(t))})},login:function(){var t=$("#inputUsername").val(),o=$("#inputPassword").val();AV.User.logIn(t,o).then(function(t){},function(t){alert(s()(t))})}}}},52:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default={props:["todo"],mounted:function(){this.monthdays(),this.whichDay()},methods:{changeday:function(t){var o=new Date,e=o.getMonth(),n=o.getFullYear();this.todo.day=this.todo.dates[t].date,this.todo.weekday=new Array("S u n d a y","M o n d a y","T u e s d a y","W e d n e s d a y","T h u r s d a y","F r i d a y","S a t u r d a y")[new Date(n,e,this.todo.dates[t].date).getDay()],this.todo.index=this.todo.day-1+this.todo.empty,this.todo.todolist=this.todo.dates[this.todo.index].todolist},whichDay:function(){for(var t=new Date,o=t.getMonth(),e=t.getFullYear(),n=new Date(e,o,1),s=n.getDay(),d=1;d<s;d++)this.todo.dates.unshift({date:"  "});this.todo.empty=s-1,this.todo.index=this.todo.day-1+this.todo.empty},monthdays:function(){var t=new Date,o=t.getMonth()+1,e=t.getFullYear(),n=t.getDate(),s=new Date(e,o,0),d=s.getDate(),a=1;console.log(d);for(var i=1;i<=d;i++)a<10&&(a="0"+a),a<n?(this.todo.dates.push({date:""+a,past:!0,todolist:[],finish:!1}),a++):a===n?(this.todo.dates.push({date:""+a,now:!0,todolist:[],finish:!1}),a++):(this.todo.dates.push({date:""+a,past:!1,todolist:[],finish:!1}),a++)}}}},53:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=e(16),s=e.n(n);o.default={props:["todo"],created:function(){var t=this;window.onbeforeunload=function(){var o=s()(t.todoList);window.localStorage.setItem("myTodos",o)};var o=window.localStorage.getItem("myTodos"),e=JSON.parse(o);this.todoList=e||[]},methods:{addTodo:function(){console.log(this.todo.todolist.length),this.todo.dates[this.todo.index].todolist.push({date:this.todo.day,title:this.todo.newTodo,createdAt:new Date,done:!1}),this.todo.newTodo="",this.todo.todolist=this.todo.dates[this.todo.index].todolist,this.todo.dates[this.todo.index].finish=!0,console.log(this.todo.dates[this.todo.index].finish)},removeTodo:function(t){var o=this.todo.dates[this.todo.index].todolist.indexOf(t);this.todo.dates[this.todo.index].todolist.splice(o,1),0===this.todo.todolist.length&&(this.todo.dates[this.todo.index].finish=!1),console.log(this.todo.dates[this.todo.index].finish)},add:function(){this.todo.canadd=!this.todo.canadd}}}},54:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=e(2),s=e(24),d=e.n(s),a=e(25),i=(e.n(a),e(27)),r=(e.n(i),e(26)),l=(e.n(r),e(28)),c=e.n(l);n.default.use(d.a),n.default.config.productionTip=!1,new n.default({el:"#app",template:"<App/>",components:{App:c.a},data:{newTodo:"",todoList:[]}})},75:function(t,o){},76:function(t,o,e){var n=e(14)(e(52),e(79),null,null,null);t.exports=n.exports},77:function(t,o,e){var n=e(14)(e(53),e(78),null,null,null);t.exports=n.exports},78:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"todo"},[e("i",{staticClass:"el-icon-plus",on:{click:t.add}}),t._v(" "),e("p",{staticClass:"day"},[t._v(t._s(t.todo.day))]),t._v(" "),e("p",{staticClass:"weekday"},[t._v(t._s(t.todo.weekday))]),t._v(" "),e("ol",{staticClass:"todos"},[e("li",[t.todo.canadd?e("input",{directives:[{name:"model",rawName:"v-model",value:t.todo.newTodo,expression:"todo.newTodo"}],staticClass:"newtodo",attrs:{placeholder:"还要做什么？"},domProps:{value:t.todo.newTodo},on:{keypress:function(o){if(!("button"in o)&&t._k(o.keyCode,"enter",13))return null;t.addTodo(o)},input:function(o){o.target.composing||(t.todo.newTodo=o.target.value)}}}):t._e()]),t._v(" "),t._l(t.todo.todolist,function(o){return e("li",{staticClass:"list"},[e("div",{staticClass:"todolist"},[e("el-checkbox",{model:{value:o.done,callback:function(t){o.done=t},expression:"todo.done"}}),t._v(" "),e("p",{class:{active:!0===o.done}},[t._v(t._s(o.title))])],1),t._v(" "),e("i",{staticClass:"el-icon-delete",on:{click:function(e){t.removeTodo(o)}}})])})],2)])},staticRenderFns:[]}},79:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"calendar"},[e("i",{staticClass:"el-icon-arrow-left"},[t._v(" "+t._s(t.todo.year))]),t._v(" "),e("h4",{staticClass:"month"},[t._v(t._s(t.todo.Cmonth))]),t._v(" "),t._m(0),t._v(" "),e("div",{staticClass:"monthday"},t._l(t.todo.dates,function(o,n){return e("div",{ref:"menuItem",refInFor:!0,class:{past:!0===o.past,now:!0===o.now},on:{click:function(o){t.changeday(n)}}},[e("p",[t._v(t._s(o.date))]),t._v(" "),o.finish?e("div",{staticClass:"circular"}):t._e()])}))])},staticRenderFns:[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"weekday"},[e("div",[t._v("mo")]),t._v(" "),e("div",[t._v("tu")]),t._v(" "),e("div",[t._v("we")]),t._v(" "),e("div",[t._v("th")]),t._v(" "),e("div",[t._v("fr")]),t._v(" "),e("div",{staticClass:"weekend"},[t._v("sa")]),t._v(" "),e("div",{staticClass:"weekend"},[t._v("su")])])}]}},80:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{attrs:{id:"app"}},[e("calendar",{attrs:{todo:t.todo}}),t._v(" "),e("todos",{attrs:{todo:t.todo}})],1)},staticRenderFns:[]}}},[54]);
//# sourceMappingURL=app.cee54f903e7e25d31117.js.map