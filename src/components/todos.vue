<template>
    <div class="todo">
        <i class="el-icon-plus" @click="canadd = !canadd"></i>
        <p class="day">{{app.day}}</p>
        <p class="weekday">{{app.weekday}}</p>
        <div class="todos-wrapper">
            <ol class="todos">
                <li>
                    <input v-model="app.newTodo" placeholder="还要做什么？" class="newtodo" @keypress.enter="addTodo" v-if="canadd">
                </li>
                <li v-for="todo in app.currentTodo" class="list">
                    <div class="todolist">
                        <el-checkbox v-model="todo.done" v-on:change="upDate()"></el-checkbox>
                        <p v-bind:class="{active:todo.done === true}">{{ todo.title }}</p>
                    </div>
                    <i @click="removeTodo(todo)" class="el-icon-delete"></i>
                </li>
            </ol>
        </div>             
        <router-link to="/">   
        <svg class="icon" v-on:mouseenter="loginOutshow = true" v-on:mouseleave="loginOutshow = false" @click="loginOut()" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M706.432 195.136c-14.656-9.536-34.56-5.44-44.224 9.408-9.536 14.848-5.376 34.688 9.472 44.288C772.032 314.048 832 424.448 832 544.192c0 193.92-157.504 351.68-351.04 351.68s-351.04-157.76-351.04-351.68c0-119.68 60.032-230.144 160.448-295.296 14.848-9.6 19.072-29.504 9.472-44.352C290.112 189.632 270.336 185.408 255.552 195.072 136.768 272.192 65.856 402.688 65.856 544.192 65.856 773.504 252.032 960 480.96 960S896 773.504 896 544.192C896 402.624 825.152 272.128 706.432 195.136zM480.96 572.16c17.664 0 32-14.656 32-32.832l0-380.8c0-18.112-14.336-32.768-32-32.768s-32 14.656-32 32.768l0 380.8C448.96 557.504 463.232 572.16 480.96 572.16z" /></svg>
        </router-link>
        <span class="loginOut" v-show="loginOutshow">退出登录</span>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loginOutshow: false,
            canadd: false,
            month : new Date().getMonth() + 1,
            year : new Date().getFullYear(),
            today : new Date().getDate(),
        }
    },
    computed: {
        index: function () {
            return this.app.substitute + this.app.day - 2
        },
    },
    mounted() {
        this.currentUser()
    },
    props:['app'],
    methods: {
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
        addTodo:function(){
            this.index = this.app.substitute + this.app.day - 2//初始化index
            let newTodo = {
                year: this.year,
                mouth: this.month,
                date: this.app.day,
                title: this.app.newTodo,
                createdAt: new Date(),
                done: false,
            }
            this.app.todo[this.index].todoList.push(newTodo)
            this.app.todo[this.index].finish = false //生成日期下的小点
            
            this.upDate()
            this.app.currentTodo = this.app.todo[this.index].todoList//在当前列表中加入newYodo
            
            for(let i = 0;i<this.app.userTodo.length ;i++){
                if(Number(this.app.userTodo[i].date) === newTodo.date){
                    //this.app.userTodo[i].todoList.push(newTodo)
                    if(this.app.userTodo[i].todoList.length === 0){
                        this.app.userTodo[i].todoList.push(newTodo) 
                    }
                    return   
                }
            }
            this.app.userTodo.push(this.app.todo[this.index])
            
            
        },
        upDate:function(){
            var query = new AV.Query('TodoFolder');
            query.find().then((todos)=> {  
                for(let i = 0;i<todos.length;i++){
                    if(todos[i].attributes.user === this.currentUser){
                        let TodoFolder = AV.Object.createWithoutData('TodoFolder', todos[i].id)
                        // 修改属性
                        TodoFolder.set('todo', this.app.userTodo)
                        // 保存到云端
                        TodoFolder.save()
                        console.log('update')
                        return
                    }
                }
                this.save()
            }, function(error){
                console.error(error) 
            })
            this.app.newTodo = '' //清空输入框
        },
        save:function(){
            console.log('save')
                //保存到leanClond
            let TodoFolder = AV.Object.extend('TodoFolder')
            // 新建对象
            let todoFolder = new TodoFolder()
            // 设置名称
            todoFolder.set('todo',this.app.userTodo)
            // 设置优先级
            todoFolder.set('user',this.currentUser)
            todoFolder.save().then(function (todo) {
                console.log('objectId is ' + todo.id)
            }, function (error) {
                console.error(error)
            });
            this.app.newTodo = '' //清空输入框
        },
        read:function(){
            if(this.currentUser){
                var query = new AV.Query('TodoFolder');
                query.find().then((todos)=> { 
                    for(let i = 0;i<todos.length;i++){
                        if(todos[i].attributes.user === this.currentUser){
                            this.app.userTodo = todos[i].attributes.todo
                            this.distribute(this.app.userTodo)
                        }
                    }
                }, function(error){
                    console.error(error) 
                })
            }
        },
        distribute: function(todos){
            
            for(let i = 0;i < todos.length; i++){
                console.log('todos: ', todos);
                if(Number(todos[i].year) === this.year && Number(todos[i].month) === this.month && todos[i].todoList.length > 0){
                    this.app.todo[this.app.substitute + todos[i].todoList[0].date - 2].finish = todos[i].finish
                    this.app.todo[this.app.substitute + todos[i].todoList[0].date - 2].todoList = todos[i].todoList
                }
            }      
            this.app.currentTodo = this.app.todo[this.app.substitute + this.today - 2].todoList
        },
        removeTodo: function(todo){
            let index = this.app.todo[this.index].todoList.indexOf(todo) 
            this.app.todo[this.index].todoList.splice(index,1)
            if(this.app.todo[this.index].todoList.length === 0){
                this.app.todo[this.index].finish = true
            }

            this.upDate()

        },
        register:function(){
            var username = $('#registerUsername').val();
            var password = $('#registerPassword').val();
            var email = $('#registerEmail').val();
            var user = new AV.User();
            user.setUsername(username);
            user.setPassword(password);
            user.setEmail(email);
            user.signUp().then(function (loginedUser) {
            }, (function (error) {
                alert(JSON.stringify(error));
            }));
        },
        login:function(){
            var username = $('#signinEmail').val();
            var password = $('#signinPassword').val();
            AV.User.logIn(username, password).then( (loginedUser)=> {
                this.read()
            }, function (error) {
                if (error.code === 210) {
                    alert('用户名密码不匹配')
                } else if (error.code === 211) {
                    alert('用户名不存在')
                }
            });
        },
        getCurrentUser: function () {
            let {id, createdAt, attributes: {username}} = AV.User.current()
            return {id, username, createdAt}
        },
        loginOut:function(){
            AV.User.logOut();
            // 现在的 currentUser 是 null 了
            var currentUser = AV.User.current();
            history.go(0) 
        }
    },
}
</script>

<style lang="less">
.todo{
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    .el-icon-plus{
        position: absolute;
        right: 30px;
        top: 30px;
        color: white;
    }
    .day{
        font-size: 100px;
        color: white;
        font-weight: 100;
        margin-top: 60px;
    }
    .weekday{
        color: white;
    }
    .todos-wrapper{
        width: 330px;
        overflow-x: hidden;
        .todos{
            margin-top: 30px;
            color: white;
            height: 255px;
            overflow: auto;
            overflow-y:visible;
            width: 350px;
            .newtodo{
                padding-top: 20px;
                background: rgb(255, 101, 101);
                border: none;
                color: white;
                outline: none;
                width: 330px;
            }
            .newtodo::-webkit-input-placeholder{
                    color: whitesmoke;
            }
            .list{
                padding-top: 20px;
                display: flex;
                justify-content: space-between;
                width: 320px;
                .todolist{
                    display: flex;
                    p{
                        margin-left: 10px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        width: 250px;
                    }
                    .active{
                        text-decoration: line-through;
                        color: rgb(255, 178, 178);
                    }
                }
            }
        }
    }
    .icon{
        position: absolute;
        width: 20px;
        height: 20px;
        bottom: 30px;
        right: 30px;
    }
    .loginOut{
        position: absolute;
        height: 20px;
        color: white;
        bottom: 30px;
        right: 60px;
    }
}
</style>
