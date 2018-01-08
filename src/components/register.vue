<template>
    <div class="register">
        <router-link to="/">
        <i class="el-icon-arrow-left"></i>
        </router-link>
        <h4>To-DoList</h4>
        <p>Join us !</p>
        <p>Welcome you</p>   
        <form action="" class="register-form">
            <input type="text" placeholder="Username" id="registerUsername">
            <input type="password" placeholder="password" id="registerPassword">
            <input type="text" placeholder="email" id="registerEmail">
            <el-button class="el-register" v-on:click="register()">register</el-button>
        </form>
    </div>
</template>

<script>
export default {
  methods:{
    register:function(){
        var username = $('#registerUsername').val();
        var password = $('#registerPassword').val();
        var email = $('#registerEmail').val();
        var user = new AV.User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.signUp().then(function (loginedUser) {
            window.location.href = '#/signIn'
        }, (function (error) {
            alert(JSON.stringify(error));
        }));
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
            margin-top: 60px;
        }
        .el-signin{
            margin-top: 100px
        }
    }
}
</style>
