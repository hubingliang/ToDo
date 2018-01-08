<template>
  <div id="app">
      <background />
      <calendar v-bind:app="app"/>
      <router-view v-bind:app="app"></router-view>
  </div>
</template>

<script>
import background from './components/background'
import todos from './components/todos'
import calendar from './components/calendar'
export default {
  data(){
      return {
        app:{
          todo:[],
          newTodo: '',
          day : new Date().getDate(),
          substitute : 0,
          currentTodo: [],
          weekday: new Array("S u n d a y", "M o n d a y", "T u e s d a y", "W e d n e s d a y", "T h u r s d a y", "F r i d a y", "S a t u r d a y")[new Date().getDay()],
          userTodo: []
        }
      }
  },
  created() {
    this.AV()
  },
  methods: {
    AV:function(){
        var APP_ID = 'iq8VG5dIWuxuOwbw9XGV9aCK-gzGzoHsz';
        var APP_KEY = 'RK4buVBs7Q2rxhgE29gVKU66';
        AV.init({
            appId: APP_ID,
            appKey: APP_KEY
        });
    },
    currentUser:function(){
      let currentUser = AV.User.current()
      if (currentUser) {
          this.currentUser = AV.User.current().attributes.username
          this.read()
      }
      else {
          //currentUser 为空时，可打开用户注册界面…
      }
    },
  },
  name: 'app',
  components: {
    todos,calendar,background
  }
}

</script>

<style>
</style>
