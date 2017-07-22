<template>
    <div id="app">
      <calendar />

      <todos />
    </div>
</template>

<script>
import todos from './components/todos'
import calendar from './components/calendar'
export default {
  data(){
    return {
      date:{

      }
    }
  },
  name: 'app',
  components: {
    todos,calendar
  },
}

</script>

<style>
#app {

}
</style>
