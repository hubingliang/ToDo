<template>
    <div id="app">
      <background />
      <calendar v-bind:todo="todo"/>
      <todos v-bind:todo="todo"/>
    </div>
</template>

<script>
import background from './components/background'
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
          totalTodoList:[],
          canadd: false,
          day : new Date().getDate(),
          weekday: new Array("S u n d a y", "M o n d a y", "T u e s d a y", "W e d n e s d a y", "T h u r s d a y", "F r i d a y", "S a t u r d a y")[new Date().getDay()]
        }
      }
  },
  name: 'app',
  components: {
    todos,calendar,background
  }
}

</script>

<style>
</style>
