webpackJsonp([1],{24:function(t,e){},25:function(t,e){},26:function(t,e){},28:function(t,e,s){function o(t){s(77)}var n=s(7)(s(51),s(86),o,null,null);t.exports=n.exports},51:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(80),n=s.n(o),i=s(82),a=s.n(i),r=s(81),d=s.n(r);e.default={data:function(){return{app:{todo:[],newTodo:"",day:(new Date).getDate(),substitute:0,currentTodo:[],weekday:new Array("S u n d a y","M o n d a y","T u e s d a y","W e d n e s d a y","T h u r s d a y","F r i d a y","S a t u r d a y")[(new Date).getDay()],userTodo:[]}}},created:function(){this.AV()},methods:{AV:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){AV.init({appId:"iq8VG5dIWuxuOwbw9XGV9aCK-gzGzoHsz",appKey:"RK4buVBs7Q2rxhgE29gVKU66"})})},name:"app",components:{todos:a.a,calendar:d.a,background:n.a}}},52:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["todo"]}},53:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{month:(new Date).getMonth()+1,year:(new Date).getFullYear(),today:(new Date).getDate(),currentMonth:new Array("J a n u a r y","F e b r u a r y","M a r c h","A p r i l","M a y","J u n e","J u l y","A u g u s t","S e p t e m b e r","O c t o b e r","N o v e m b e r","D e c e m b e r")[(new Date).getMonth()]}},props:["app"],mounted:function(){this.resetDate()},methods:{changeDay:function(t){" "!==t&&(this.app.weekday=new Array("S u n d a y","M o n d a y","T u e s d a y","W e d n e s d a y","T h u r s d a y","F r i d a y","S a t u r d a y")[new Date(this.year,this.month,t).getDay()],this.app.day=Number(t),this.app.currentTodo=this.app.todo[this.app.substitute+this.app.day-2].todoList)},resetDate:function(){for(var t=new Date(this.year,this.month,0).getDate(),e=1;e<=t;e++)e<this.today?this.app.todo.push({year:""+this.year,month:""+this.month,date:""+e,past:!0,finish:!0,todoList:[]}):e===this.today?this.app.todo.push({year:""+this.year,month:""+this.month,date:""+e,now:!0,finish:!0,todoList:[]}):this.app.todo.push({year:""+this.year,month:""+this.month,date:""+e,past:!1,finish:!0,todoList:[]});this.app.substitute=new Date(this.year,this.month,1).getDay();for(var s=1;s<this.app.substitute;s++)this.app.todo.unshift({date:" ",finish:!0});this.app.currentTodo=this.app.todo[this.app.substitute+this.app.day-2].todolist}}}},54:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(56),n=s.n(o);e.default={data:function(){return{loginshow:!0,registershow:!1,signInshow:!1,todoshow:!1,loginOutshow:!1,canadd:!1,month:(new Date).getMonth()+1,year:(new Date).getFullYear(),today:(new Date).getDate()}},computed:{index:function(){return this.app.substitute+this.app.day-2}},mounted:function(){this.currentUser()},props:["app"],methods:{currentUser:function(){AV.User.current()&&(this.currentUser=AV.User.current().attributes.username,this.loginshow=!1,this.registershow=!1,this.signInshow=!1,this.todoshow=!0,this.read())},addTodo:function(){this.index=this.app.substitute+this.app.day-2;var t={year:this.year,mouth:this.month,date:this.app.day,title:this.app.newTodo,createdAt:new Date,done:!1};this.app.todo[this.index].todoList.push(t);for(var e=0;e<this.app.userTodo.length;e++)if(Number(this.app.userTodo[e].date)===t.date)return this.app.userTodo[e].todoList.push(t),this.app.todo[this.index].finish=!1,this.upDate(),void(this.app.currentTodo=this.app.todo[this.index].todoList);this.app.userTodo.push(this.app.todo[this.index]),this.app.todo[this.index].finish=!1,this.upDate(),this.app.currentTodo=this.app.todo[this.index].todoList},upDate:function(){var t=this;new AV.Query("TodoFolder").find().then(function(e){for(var s=0;s<e.length;s++)if(e[s].attributes.user===t.currentUser){console.log("s");var o=AV.Object.createWithoutData("TodoFolder",e[s].id);return o.set("todo",t.app.userTodo),console.log(t.app.userTodo),o.save(),void console.log("update")}t.save()},function(t){console.error(t)}),this.app.newTodo=""},save:function(){console.log("save");var t=AV.Object.extend("TodoFolder"),e=new t;e.set("todo",this.app.userTodo),e.set("user",this.currentUser),e.save().then(function(t){console.log("objectId is "+t.id)},function(t){console.error(t)}),this.app.newTodo=""},read:function(){var t=this;if(this.currentUser){new AV.Query("TodoFolder").find().then(function(e){for(var s=0;s<e.length;s++)e[s].attributes.user===t.currentUser&&(t.app.userTodo=e[s].attributes.todo,t.distribute(t.app.userTodo))},function(t){console.error(t)})}},distribute:function(t){for(var e=0;e<t.length;e++)Number(t[e].year)==this.year&&Number(t[e].month)===this.month&&(console.log(t),this.app.todo[this.app.substitute+t[e].todoList[0].date-2].finish=t[e].finish,this.app.todo[this.app.substitute+t[e].todoList[0].date-2].todoList=t[e].todoList);this.app.currentTodo=this.app.todo[this.app.substitute+this.today-2].todoList},removeTodo:function(t){console.log(this.app.userTodo);var e=this.app.todo[this.index].todoList.indexOf(t);this.app.todo[this.index].todoList.splice(e,1),0===this.app.todo[this.index].todoList.length&&(this.app.todo[this.index].finish=!0),this.upDate()},register:function(){var t=$("#registerUsername").val(),e=$("#registerPassword").val(),s=$("#registerEmail").val(),o=new AV.User;o.setUsername(t),o.setPassword(e),o.setEmail(s),o.signUp().then(function(t){},function(t){alert(n()(t))})},login:function(){var t=this,e=$("#signinEmail").val(),s=$("#signinPassword").val();AV.User.logIn(e,s).then(function(e){t.read(),t.signInshow=!1,t.appshow=!0},function(t){210===t.code?alert("用户名密码不匹配"):211===t.code&&alert("用户名不存在")})},getCurrentUser:function(){var t=AV.User.current(),e=t.id,s=t.createdAt;return{id:e,username:t.attributes.username,createdAt:s}},saveTodos:function(){var t=n()(this.app.dates[this.app.index].todolist),e=AV.Object.extend("AllTodos"),s=new e,o=new AV.ACL;o.setReadAccess(AV.User.current(),!0),o.setWriteAccess(AV.User.current(),!0),s.set("content",t),s.set("username",AV.User.current().attributes.username),s.setACL(o),s.save()},loginOut:function(){AV.User.logOut();AV.User.current();this.loginshow=!0,this.registershow=!1,this.signInshow=!1,history.go(0)}}}},55:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s(2),n=s(23),i=s.n(n),a=s(24),r=(s.n(a),s(26)),d=(s.n(r),s(25)),u=(s.n(d),s(28)),c=s.n(u),p=s(27);s.n(p);o.default.use(i.a),o.default.config.productionTip=!1,new o.default({el:"#app",template:"<App/>",components:{App:c.a},data:{newTodo:"",todoList:[]}})},77:function(t,e){},79:function(t,e,s){t.exports=s.p+"static/img/todolist.5bf5009.jpg"},80:function(t,e,s){var o=s(7)(s(52),s(83),null,null,null);t.exports=o.exports},81:function(t,e,s){var o=s(7)(s(53),s(85),null,null,null);t.exports=o.exports},82:function(t,e,s){var o=s(7)(s(54),s(84),null,null,null);t.exports=o.exports},83:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"background"},[s("div",{staticClass:"bg-grey"},[s("div",{staticClass:"bg-grey-triangle"})]),t._v(" "),s("div",{staticClass:"bg-white"})])}]}},84:function(t,e,s){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todo"},[o("transition",{attrs:{name:"el-fade-in-linear"}},[o("div",{directives:[{name:"show",rawName:"v-show",value:t.loginshow,expression:"loginshow"}],staticClass:"login"},[o("img",{attrs:{src:s(79),alt:""}}),t._v(" "),o("el-button",{staticClass:"el-register",attrs:{type:"text"},on:{click:function(e){t.loginshow=!t.loginshow,t.signInshow=!t.signInshow}}},[t._v("登 录")]),t._v(" "),o("el-button",{staticClass:"el-signIn",attrs:{type:"text"},on:{click:function(e){t.loginshow=!t.loginshow,t.registershow=!t.registershow}}},[t._v("注 册")]),t._v(" "),o("p",[t._v("Easiest way")]),t._v(" "),o("p",[t._v("to plan every day")])],1)]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.registershow,expression:"registershow"}],staticClass:"register"},[o("i",{staticClass:"el-icon-arrow-left",on:{click:function(e){t.loginshow=!t.loginshow,t.registershow=!t.registershow}}}),t._v(" "),o("h4",[t._v("To-DoList")]),t._v(" "),o("p",[t._v("Join us !")]),t._v(" "),o("p",[t._v("Welcome you")]),t._v(" "),o("form",{staticClass:"register-form",attrs:{action:""}},[o("input",{attrs:{type:"text",placeholder:"Username",id:"registerUsername"}}),t._v(" "),o("input",{attrs:{type:"password",placeholder:"password",id:"registerPassword"}}),t._v(" "),o("input",{attrs:{type:"text",placeholder:"email",id:"registerEmail"}}),t._v(" "),o("el-button",{staticClass:"el-register",on:{click:[function(e){t.register()},function(e){t.registershow=!t.registershow,t.signInshow=!t.signInshow}]}},[t._v("register")])],1)]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.signInshow,expression:"signInshow"}],staticClass:"register"},[o("i",{staticClass:"el-icon-arrow-left",on:{click:function(e){t.loginshow=!t.loginshow,t.signInshow=!t.signInshow}}}),t._v(" "),o("h4",[t._v("To-DoList")]),t._v(" "),o("p",[t._v("Hello there !")]),t._v(" "),o("p",[t._v("Welcome Back")]),t._v(" "),o("form",{staticClass:"register-form",attrs:{action:""}},[o("input",{attrs:{type:"text",placeholder:"Username",id:"signinEmail"}}),t._v(" "),o("input",{attrs:{type:"password",placeholder:"password",id:"signinPassword"}}),t._v(" "),o("el-button",{staticClass:"el-signin",on:{click:function(e){t.login()}}},[t._v("sign in")])],1)]),t._v(" "),o("transition",{attrs:{name:"el-fade-in"}},[o("div",{directives:[{name:"show",rawName:"v-show",value:t.todoshow,expression:"todoshow"}],staticClass:"todo"},[o("i",{staticClass:"el-icon-plus",on:{click:function(e){t.canadd=!t.canadd}}}),t._v(" "),o("p",{staticClass:"day"},[t._v(t._s(t.app.day))]),t._v(" "),o("p",{staticClass:"weekday"},[t._v(t._s(t.app.weekday))]),t._v(" "),o("div",{staticClass:"todos-wrapper"},[o("ol",{staticClass:"todos"},[o("li",[t.canadd?o("input",{directives:[{name:"model",rawName:"v-model",value:t.app.newTodo,expression:"app.newTodo"}],staticClass:"newtodo",attrs:{placeholder:"还要做什么？"},domProps:{value:t.app.newTodo},on:{keypress:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.addTodo(e)},input:function(e){e.target.composing||(t.app.newTodo=e.target.value)}}}):t._e()]),t._v(" "),t._l(t.app.currentTodo,function(e){return o("li",{staticClass:"list"},[o("div",{staticClass:"todolist"},[o("el-checkbox",{on:{change:function(e){t.upDate()}},model:{value:e.done,callback:function(t){e.done=t},expression:"todo.done"}}),t._v(" "),o("p",{class:{active:!0===e.done}},[t._v(t._s(e.title))])],1),t._v(" "),o("i",{staticClass:"el-icon-delete",on:{click:function(s){t.removeTodo(e)}}})])})],2)]),t._v(" "),o("svg",{staticClass:"icon",attrs:{width:"200px",height:"200.00px",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},on:{mouseenter:function(e){t.loginOutshow=!0},mouseleave:function(e){t.loginOutshow=!1},click:function(e){t.loginOut()}}},[o("path",{attrs:{fill:"#ffffff",d:"M706.432 195.136c-14.656-9.536-34.56-5.44-44.224 9.408-9.536 14.848-5.376 34.688 9.472 44.288C772.032 314.048 832 424.448 832 544.192c0 193.92-157.504 351.68-351.04 351.68s-351.04-157.76-351.04-351.68c0-119.68 60.032-230.144 160.448-295.296 14.848-9.6 19.072-29.504 9.472-44.352C290.112 189.632 270.336 185.408 255.552 195.072 136.768 272.192 65.856 402.688 65.856 544.192 65.856 773.504 252.032 960 480.96 960S896 773.504 896 544.192C896 402.624 825.152 272.128 706.432 195.136zM480.96 572.16c17.664 0 32-14.656 32-32.832l0-380.8c0-18.112-14.336-32.768-32-32.768s-32 14.656-32 32.768l0 380.8C448.96 557.504 463.232 572.16 480.96 572.16z"}})]),t._v(" "),o("span",{directives:[{name:"show",rawName:"v-show",value:t.loginOutshow,expression:"loginOutshow"}],staticClass:"loginOut"},[t._v("退出登录")])])])],1)},staticRenderFns:[]}},85:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"calendar"},[s("i",{staticClass:"el-icon-arrow-left"},[t._v(" "+t._s(this.year))]),t._v(" "),s("h4",{staticClass:"month"},[t._v(t._s(this.currentMonth))]),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"monthday"},t._l(t.app.todo,function(e,o){return s("div",{ref:"menuItem",refInFor:!0,class:{past:!0===e.past,now:!0===e.now},on:{click:function(s){t.changeDay(e.date)}}},[s("p",[t._v(t._s(e.date))]),t._v(" "),e.finish?t._e():s("div",{staticClass:"circular"})])}))])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"weekday"},[s("div",[t._v("mo")]),t._v(" "),s("div",[t._v("tu")]),t._v(" "),s("div",[t._v("we")]),t._v(" "),s("div",[t._v("th")]),t._v(" "),s("div",[t._v("fr")]),t._v(" "),s("div",{staticClass:"weekend"},[t._v("sa")]),t._v(" "),s("div",{staticClass:"weekend"},[t._v("su")])])}]}},86:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("background"),t._v(" "),s("calendar",{attrs:{app:t.app}}),t._v(" "),s("todos",{attrs:{app:t.app}})],1)},staticRenderFns:[]}}},[55]);
//# sourceMappingURL=app.7eb4c21cb95883d9aacb.js.map