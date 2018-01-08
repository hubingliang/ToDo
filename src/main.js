// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/reset.css'
import './assets/index.css'
import App from './App'
import todos from './components/todos'
import register from './components/register'
import signIn from './components/signIn'
import start from './components/start'
import AV from 'leancloud-storage'
import VueRouter from 'vue-router'

const router = new VueRouter({
    routes : [
        { path: '/todos', component: todos },
        { path: '/register', component: register },
        { path: '/signIn', component: signIn },
        { path: '/', component: start }
      ]
})
Vue.use(VueRouter)

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    data: {
        newTodo: '',
        todoList: []
    }
})