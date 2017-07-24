<template>
<div class="todo">
    <i class="el-icon-plus" v-on:click="add"></i>
    <p class="day">{{todo.day}}</p>
    <p class="weekday">{{todo.weekday}}</p>
    <ol class="todos">
        <li>
            <input v-model="todo.newTodo" placeholder="还要做什么？" class="newtodo" @keypress.enter="addTodo" v-if="todo.canadd"></input>
        </li>
        <li v-for="todo in todo.todolist" class="list">
            <div class="todolist">
                <el-checkbox v-model="todo.done"></el-checkbox>
                <p v-bind:class="{active:todo.done === true}">{{ todo.title }}</p>
            </div>
          <i @click="removeTodo(todo)" class="el-icon-delete"></i>
        </li>
    </ol>
</div>
</template>

<script>
    export default {
        props:['todo'],
        created: function(){
            // onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload
            window.onbeforeunload = ()=>{
            let dataString = JSON.stringify(this.todoList) // JSON 文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
            window.localStorage.setItem('myTodos', dataString) // 看文档https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
            }

            let oldDataString = window.localStorage.getItem('myTodos')
            let oldData = JSON.parse(oldDataString)
            this.todoList = oldData || []
        },
        methods: {
            addTodo: function(){
                console.log(this.todo.todolist.length)
                this.todo.dates[this.todo.index].todolist.push({
                    date: this.todo.day,
                    title: this.todo.newTodo,
                    createdAt: new Date(),
                    done: false,
                })
                this.todo.newTodo = ''
                this.todo.todolist = this.todo.dates[this.todo.index].todolist
                this.todo.dates[this.todo.index].finish = true
                console.log(this.todo.dates[this.todo.index].finish)
            },
            removeTodo: function(todo){
                let index = this.todo.dates[this.todo.index].todolist.indexOf(todo) // Array.prototype.indexOf 是 ES 5 新加的 API
                this.todo.dates[this.todo.index].todolist.splice(index,1) // 不懂 splice？赶紧看 MDN 文档！
                if(this.todo.todolist.length === 0){
                    this.todo.dates[this.todo.index].finish = false
                }
                console.log(this.todo.dates[this.todo.index].finish)
            },
            add: function(){
                this.todo.canadd = !this.todo.canadd
            },
        }
    }
</script>