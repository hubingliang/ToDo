<template>
<div class="todo">
    <i class="el-icon-plus" v-on:click="add"></i>
    <p class="day">{{month}}</p>
    <p class="weekday">{{day}}</p>
    <ol class="todos">
        <li>
            <input v-model="newTodo" placeholder="还要做什么？" class="newtodo" @keypress.enter="addTodo" v-if="canadd"></input>
        </li>
        <li v-for="todo in todoList" class="list">
            <div>
                <el-checkbox v-model="todo.done"></el-checkbox>
                <span v-bind:class="{active:todo.done === true}">{{ todo.title }}</span>
            </div>
          <i @click="removeTodo(todo)" class="el-icon-delete"></i>
        </li>
    </ol>
</div>
</template>

<script>
    export default {
        data() {
            return {
                newTodo: '',
                todoList: [],
                canadd: false,
                month : new Date().getDate(),
                day: new Array("S u n d a y", "M o n d a y", "T u e s d a y", "W e d n e s d a y", "T h u r s d a y", "F r i d a y", "S a t u r d a y")[new Date().getDay()]
            }
        },
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
                this.todoList.push({
                    title: this.newTodo,
                    createdAt: new Date(),
                    done: false
                })
                this.newTodo = ''
            },
            removeTodo: function(todo){
                let index = this.todoList.indexOf(todo) // Array.prototype.indexOf 是 ES 5 新加的 API
                this.todoList.splice(index,1) // 不懂 splice？赶紧看 MDN 文档！
            },
            add: function(){
                this.canadd = !this.canadd
            },
            getday: function(){
                let a = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");  
                let week = new Date().getDay();  
                let str = a[week];  
            },
        }
    }
</script>