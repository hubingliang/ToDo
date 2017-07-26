    <template>
        <div class="todo">
            <transition name="el-fade-in-linear">
                <div class="login" v-show="loginshow">
                    <img src="../assets/todolist.jpg" alt="">
                    <el-button class="el-register"  @click="loginshow = !loginshow,signInshow = !signInshow">登 录</el-button>
                    <el-button class="el-signIn" @click="loginshow = !loginshow,registershow = !registershow">注 册</el-button>
                    <p>Easiest way to </p>
                    <p>be to plan every day</p>
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
                    <el-button class="el-register"v-on:click="register()">register</el-button>
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
            <div class="todo" v-show="registershow">
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

            }),
            mounted() {
                this.AV()
            },
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
                    this.todo.dates[this.todo.index].todolist.push({
                        date: this.todo.day,
                        title: this.todo.newTodo,
                        createdAt: new Date(),
                        done: false,
                    })
                    this.todo.newTodo = ''
                    this.todo.todolist = this.todo.dates[this.todo.index].todolist
                    this.todo.dates[this.todo.index].finish = true
                },
                removeTodo: function(todo){
                    let index = this.todo.dates[this.todo.index].todolist.indexOf(todo) // Array.prototype.indexOf 是 ES 5 新加的 API
                    this.todo.dates[this.todo.index].todolist.splice(index,1) // 不懂 splice？赶紧看 MDN 文档！
                    if(this.todo.todolist.length === 0){
                        this.todo.dates[this.todo.index].finish = false
                    }
                },
                add: function(){
                    this.todo.canadd = !this.todo.canadd
                },
                register:function(){
                    var username = $('#registerUsername').val();
                    var password = $('#registerPassword').val();
                    var email = $('#registerEmail').val();
                    console.log(username)
                    console.log(password)
                    console.log(email)
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
                        alert(JSON.stringify(error));
                    });
                },
                AV:function(){
                    var APP_ID = 'iq8VG5dIWuxuOwbw9XGV9aCK-gzGzoHsz';
                    var APP_KEY = 'RK4buVBs7Q2rxhgE29gVKU66';
                    AV.init({
                        appId: APP_ID,
                        appKey: APP_KEY
                    });
                },
            }
        }
    </script>