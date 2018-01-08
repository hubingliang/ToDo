<template>
    <div class="register">
        <router-link to="/">
            <i class="el-icon-arrow-left"></i>
        </router-link>
        <h4>To-DoList</h4>
        <p>Hello there !</p>
        <p>Welcome Back</p>  
        <form action="" class="register-form">
            <input type="text" placeholder="Username" id="signinEmail">
            <input type="password" placeholder="password" id="signinPassword">
            <el-button class="el-signin" v-on:click="login()">sign in</el-button>
        </form>
    </div>
</template>

<script>
export default {
  methods:{
    login:function(){
        var username = $('#signinEmail').val();
        var password = $('#signinPassword').val();
        AV.User.logIn(username, password).then( (loginedUser)=> {
            window.location.href = '#/todos'
        }, function (error) {
            if (error.code === 210) {
                alert('用户名密码不匹配')
            } else if (error.code === 211) {
                alert('用户名不存在')
            }
        });
    },
  }
}
</script>

<style lang="less">
.register{
    width: 425px;
    height: 550px;
    position: relative;
    padding: 30px;
    color: white;
    background: rgb(255, 101, 101);
    box-shadow: 0 40px 200px -50px rgb(255, 101, 101);
    h4{
        font-size: 35px;
        margin-top: 40px;
        margin-bottom: 20px;
    }
    p{
        font-size: 25px;
    }
    form{
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        margin-bottom: 30px;
        input{
            border: none;
            margin-top: 30px;
            list-style: none;
            outline: none;
            background: rgb(255, 101, 101);
            color: white;
        }
        
        input::-webkit-input-placeholder{
                color: whitesmoke;
        }
        .el-register{
            width: 100%;
            margin-top: 60px;
        }
        .el-signin{
            width: 100%;
            margin-top: 100px
        }
    }
}
</style>
