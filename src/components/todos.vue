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
                    <el-button class="el-signin" v-on:click="login()"  @click="signInshow = !signInshow,todoshow = !todoshow">sign in</el-button>
                </form>
            </div>
            <transition name="el-fade-in">
            <div class="todo" v-show="todoshow">
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
            }),
            mounted() {
                this.read()
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
                    this.saveTodos()
                },
                removeTodo: function(todo){
                    let index = this.todo.dates[this.todo.index].todolist.indexOf(todo) // Array.prototype.indexOf 是 ES 5 新加的 API
                    this.todo.dates[this.todo.index].todolist.splice(index,1) // 不懂 splice？赶紧看 MDN 文档！
                    if(this.todo.todolist.length === 0){
                        this.todo.dates[this.todo.index].finish = false
                    }
                    this.saveTodos()
                },
                add: function(){
                    this.todo.canadd = !this.todo.canadd
                },
                register:function(){
                    var username = $('#registerUsername').val();
                    var password = $('#registerPassword').val();
                    var email = $('#registerEmail').val();
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
                    var username = $('#signinEmail').val();
                    var password = $('#signinPassword').val();
                    // LeanCloud - 登录
                    // https://leancloud.cn/docs/leanstorage_guide-js.html#用户名和密码登录
                    AV.User.logIn(username, password).then(function (loginedUser) {
                        alert(`Hello ${username}`)
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
                    let dataString = JSON.stringify(this.todo.dates[this.todo.index].todolist)
                    var AVTodos = AV.Object.extend('AllTodos')
                    var avTodos = new AVTodos()
                    var acl = new AV.ACL()
                    acl.setReadAccess(AV.User.current(),true)
                    acl.setWriteAccess(AV.User.current(),true)
                    avTodos.set('content', dataString)
                    avTodos.set('username', AV.User.current().attributes.username)
                    avTodos.setACL(acl)
                    avTodos.save().then(function (todo) {
                        alert('保存成功')
                    }, function (error) {
                        alert('保存失败')
                    });
                },
                read:function(){
                    this.currentUser = this.getCurrentUser()
                    let empty = this.todo.empty
                    if(this.currentUser){
                    var query = new AV.Query('AllTodos');
                    query.find().then((todos)=> {
                        for(let i=0;i<todos.length;i++){
                            console.log(AV.User.current().attributes.username)
                            console.log(todos[i].attributes.username)
                            if(AV.User.current().attributes.username === todos[i].attributes.username){
                                for(let i=0;i<todos.length;i++){
                                    var todo = JSON.parse(todos[i].attributes.content)
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
                                }
                                let nowday = new Date().getDate()
                                this.todo.todolist = this.todo.dates[nowday+empty-1].todolist
                            }
                        }

                        }, function(error){
                            console.error(error) 
                        })
                    }
                }
            }
        }
    </script>