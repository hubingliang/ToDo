<template>
    <div id="app">
      <calendar v-bind:todo="todo"/>

      <todos v-bind:todo="todo"/>
    </div>
</template>

<script>
import todos from './components/todos'
import calendar from './components/calendar'
export default {
  data(){
      return {
        todo:{
          year:new Date().getFullYear(),
          Cmonth: new Array("J a n u a r y", "F e b r u a r y", "M a r c h","A p r i l", "M a y", "J u n e", "J u l y", "A u g u s t", "S e p t e m b e r", "O c t o b e r", "N o v e m b e r", "D e c e m b e r")[new Date().getMonth()],
          dates: [],
          //分割线
          newTodo: '',
          todolist: [],  
          canadd: false,
          day : new Date().getDate(),
          weekday: new Array("S u n d a y", "M o n d a y", "T u e s d a y", "W e d n e s d a y", "T h u r s d a y", "F r i d a y", "S a t u r d a y")[new Date().getDay()]
        }
      }
  },
  mounted() {
      this.x()
  },
  name: 'app',
  components: {
    todos,calendar
  },
  methods:{
    x:function(){
      var APP_ID = 'iq8VG5dIWuxuOwbw9XGV9aCK-gzGzoHsz';
      var APP_KEY = 'RK4buVBs7Q2rxhgE29gVKU66';

      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
    register:function(){
      var username = $('#inputUsername').val();
      var password = $('#inputPassword').val();
      var email = $('inputEmail').val();

      // LeanCloud - 注册
      // https://leancloud.cn/docs/leanstorage_guide-js.html#注册
      var user = new AV.User();
      user.setUsername(username);
      user.setPassword(password);
      user.setEmail(email);
      user.signUp().then(function (loginedUser) {
        // 注册成功，跳转到商品 list 页面
      }, (function (error) {
          alert(JSON.stringify(error));
      }));
    },
    login:function(){
      var username = $('#inputUsername').val();
      var password = $('#inputPassword').val();

      // LeanCloud - 登录
      // https://leancloud.cn/docs/leanstorage_guide-js.html#用户名和密码登录
      AV.User.logIn(username, password).then(function (loginedUser) {
        // 登录成功，跳转到商品 list 页面
      }, function (error) {
        alert(JSON.stringify(error));
      });
    }
  }
}

</script>

<style>
#app {

}
</style>
