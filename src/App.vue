<template>
    <div id="app">
      <background />
      <calendar v-bind:app="app"/>
      <todos v-bind:app="app"/>
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
          dates: [],
          newTodo: '',
          todolist: [],  
          totalTodoList:[],
          canadd: false,
          day : new Date().getDate(),
          substitute : 0,
          weekday: new Array("S u n d a y", "M o n d a y", "T u e s d a y", "W e d n e s d a y", "T h u r s d a y", "F r i d a y", "S a t u r d a y")[new Date().getDay()]
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
  },
  name: 'app',
  components: {
    todos,calendar,background
  }
}

</script>

<style>
</style>
