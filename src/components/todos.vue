    <template>
        <div class="todo">
            <transition name="el-fade-in-linear">
                <div class="login" v-show="loginshow">
                    <img src="../assets/todolist.jpg" alt="">
                    <el-button type="text" class="el-register"  @click="loginshow = !loginshow,signInshow = !signInshow">登 录</el-button>
                    <el-button type="text" class="el-signIn" @click="loginshow = !loginshow,registershow = !registershow">注 册</el-button>
                    <p>Easiest way</p>
                    <p>to plan every day</p>
                </div>
            </transition>
            <div class="register" v-show="registershow">
                <i class="el-icon-arrow-left" @click="loginshow = !loginshow,registershow = !registershow"></i>
                <h4>To-DoList</h4>
                <p>Join us !</p>
                <p>Welcome you</p>   
                <form action="" class="register-form">
                    <input type="text"placeholder="Username"id="registerUsername">
                    <input type="password"placeholder="password"id="registerPassword">
                    <input type="text"placeholder="email"id="registerEmail">
                    <el-button class="el-register"v-on:click="register()" @click="registershow = !registershow,signInshow = !signInshow">register</el-button>
                </form>
            </div>
            <div class="register" v-show="signInshow">
                <i class="el-icon-arrow-left" @click="loginshow = !loginshow,signInshow = !signInshow"></i>
                <h4>To-DoList</h4>
                <p>Hello there !</p>
                <p>Welcome Back</p>  
                <form action="" class="register-form">
                    <input type="text"placeholder="Username"id="signinEmail">
                    <input type="password"placeholder="password"id="signinPassword">
                    <el-button class="el-signin" v-on:click="login()">sign in</el-button>
                </form>
            </div>
            <transition name="el-fade-in">
            <div class="todo" v-show="todoshow">
                <i class="el-icon-plus" v-on:click="add"></i>
                <p class="day">{{todo.day}}</p>
                <p class="weekday">{{todo.weekday}}</p>
                <div class="todos-wrapper">
                    <ol class="todos">
                        <li>
                            <input v-model="todo.newTodo" placeholder="还要做什么？" class="newtodo" @keypress.enter="addTodo" v-if="todo.canadd"></input>
                        </li>
                        <li v-for="todo in todo.todolist" class="list">
                            <div class="todolist">
                                <el-checkbox v-model="todo.done" v-on:change="upDate()"></el-checkbox>
                                <p v-bind:class="{active:todo.done === true}">{{ todo.title }}</p>
                            </div>
                            <i @click="removeTodo(todo)" class="el-icon-delete"></i>
                        </li>
                    </ol>
                </div>                
                <svg class="icon" v-on:mouseenter="loginOutshow = true" v-on:mouseleave="loginOutshow = false" @click="loginOut()" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M706.432 195.136c-14.656-9.536-34.56-5.44-44.224 9.408-9.536 14.848-5.376 34.688 9.472 44.288C772.032 314.048 832 424.448 832 544.192c0 193.92-157.504 351.68-351.04 351.68s-351.04-157.76-351.04-351.68c0-119.68 60.032-230.144 160.448-295.296 14.848-9.6 19.072-29.504 9.472-44.352C290.112 189.632 270.336 185.408 255.552 195.072 136.768 272.192 65.856 402.688 65.856 544.192 65.856 773.504 252.032 960 480.96 960S896 773.504 896 544.192C896 402.624 825.152 272.128 706.432 195.136zM480.96 572.16c17.664 0 32-14.656 32-32.832l0-380.8c0-18.112-14.336-32.768-32-32.768s-32 14.656-32 32.768l0 380.8C448.96 557.504 463.232 572.16 480.96 572.16z" /></svg>
                <span class="loginOut" v-show="loginOutshow">退出登录</span>
            </div>
            </transition>
        </div>
    </template>

    <script>
        export default {
            data: () => ({
                loginshow: true,
                registershow: false,
                signInshow: false,
                todoshow: false,
                loginOutshow: false
            }),
            mounted() {
                this.currentUser()
            },
            created: function(){
                this.AV()
            },
            props:['todo'],
            methods: {
                addTodo: function(){
                    this.todo.dates[this.todo.index].todolist.push({
                        date: this.todo.day,
                        title: this.todo.newTodo,
                        createdAt: new Date(),
                        done: false,
                    })
                    this.todo.newTodo = ''
                    this.todo.todolist = this.todo.dates[this.todo.index].todolist
                    this.todo.dates[this.todo.index].finish = true
                    var query = new AV.Query('AllTodos')
                    query.find().then((todos)=>{
                        if(this.todo.todolist.length === 1){
                            
                            this.saveTodos() 
                        }else{
                            if(todos.length === 0){
                                this.saveTodos() 
                            }else{
                                for(let i = 0;i<=todos.length;i++){
                                    if(AV.User.current().attributes.username === todos[i].attributes.username){
                                        this.upDate()
                                    }else{
                                        this.saveTodos() 
                                    }
                                }
                            }
                            
                        }

                    })
                    

                },
                removeTodo: function(todo){
                    let index = this.todo.dates[this.todo.index].todolist.indexOf(todo) // Array.prototype.indexOf 是 ES 5 新加的 API
                    this.todo.dates[this.todo.index].todolist.splice(index,1) // 不懂 splice？赶紧看 MDN 文档！
                    if(this.todo.todolist.length === 0){
                        this.todo.dates[this.todo.index].finish = false
                    }
                    this.upDate()
                },
                add: function(){
                    this.todo.canadd = !this.todo.canadd
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
                        this.signInshow = false
                        this.todoshow = true
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
                AV:function(){
                    var APP_ID = 'iq8VG5dIWuxuOwbw9XGV9aCK-gzGzoHsz';
                    var APP_KEY = 'RK4buVBs7Q2rxhgE29gVKU66';
                    AV.init({
                        appId: APP_ID,
                        appKey: APP_KEY
                    });
                },
                saveTodos:function(){
                    console.log('save')
                    let dataString = JSON.stringify(this.todo.dates[this.todo.index].todolist)
                    var AVTodos = AV.Object.extend('AllTodos')
                    var avTodos = new AVTodos()
                    var acl = new AV.ACL()
                    acl.setReadAccess(AV.User.current(),true)
                    acl.setWriteAccess(AV.User.current(),true)
                    avTodos.set('content', dataString)
                    avTodos.set('username', AV.User.current().attributes.username)
                    avTodos.setACL(acl)
                    avTodos.save()
                },
                upDate:function(){
                    console.log('update')
                    var query = new AV.Query('AllTodos')
                    query.find().then((todos)=>{
                        for(let i = 0;i<todos.length;i++){
                            if(AV.User.current().attributes.username === todos[i].attributes.username ){
                                let dataString = JSON.stringify(this.todo.dates[this.todo.index].todolist)
                                console.log(dataString)
                                let id = todos[i].id
                                let todo = AV.Object.createWithoutData('AllTodos', id);
                                // 修改属性
                                todo.set('content', dataString);
                                // 保存到云端
                                todo.save();
                            }
                        }
                    })
                },
                read:function(){
                    this.currentUser = this.getCurrentUser()
                    let empty = this.todo.empty
                    if(this.currentUser){
                    var query = new AV.Query('AllTodos');
                    query.find().then((todos)=> {  
                        console.log(todos) 
                        for(let i=0;i<todos.length;i++){
                            if(AV.User.current().attributes.username === todos[i].attributes.username){
                                    var todo = JSON.parse(todos[i].attributes.content)
                                    console.log(todo)
                                    for(let ii=0;ii<todo.length;ii++){
                                        var date = todo[ii].date
                                        var index =  Number(date)  + empty - 1
                                        var todolist = this.todo.dates[index].todolist
                                        this.todo.dates[index].finish = true
                                        todolist.push({
                                            date: todo[ii].date,
                                            title: todo[ii].title,
                                            done: todo[ii].done,
                                        })
                                    }
                                let nowday = new Date().getDate()
                                this.todo.todolist = this.todo.dates[nowday+empty-1].todolist
                            }
                        }

                        }, function(error){
                            console.error(error) 
                        })
                    }
                },
                currentUser:function(){
                    var currentUser = AV.User.current();
                    if (currentUser) {
                        this.loginshow = false
                        this.registershow = false,
                        this.signInshow = false,
                        this.todoshow = true
                        this.read()
                    }
                    else {
                        //currentUser 为空时，可打开用户注册界面…
                    }
                },
                loginOut:function(){
                    AV.User.logOut();
                    // 现在的 currentUser 是 null 了
                    var currentUser = AV.User.current();
                    this.loginshow = true
                    this.registershow = false
                    this.signInshow = false
                    history.go(0) 
                }
            }
        }
    </script>