<template>
    <div class="login">
        <img src="../assets/todolist.jpg" alt="">
        <router-link to="/signIn">
            <el-button type="text" class="el-register">登 录</el-button>
        </router-link>
        <router-link to="/register">
            <el-button type="text" class="el-signIn">注 册</el-button>
        </router-link>
        <p>Easiest way</p>
        <p>to plan every day</p>
    </div>
</template>

<script>
export default {
  props:['show'],
}
</script>

<style lang="less">
.login{
    width: 425px;
    height: 550px;
    position: relative;
    background: rgb(255, 101, 101);
    box-shadow: 0 40px 200px -50px rgb(255, 101, 101);
    img{
        width: 425px;
        margin-bottom: 20px;
    }
    .el-register{
        position: absolute;
        top: 320px;
        left: 100px;
        transform: rotateZ(-12deg);
        color: black;
        font-weight: bold;
        font-size: 20px;
    }
    .el-signIn{
        position: absolute;
        top: 285px;
        left: 240px;
        transform: rotateZ(-13deg);
        color: black;
        font-weight: bold;
        font-size: 20px;
    }
    p{
        color: white;
        font-size: 24px;
        margin-left: 25px;
    }
}
</style>
