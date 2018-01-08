import App from './App'
import todos from './components/todos'
import register from './components/register'
import signIn from './components/signIn'
const router = new VueRouter({
    routes: [
      { path: '/', component: App,
        children: [
          {
            // 当 /user/:id/profile 匹配成功，
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: 'todos',
            component: todos
          },
          {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 会被渲染在 User 的 <router-view> 中
            path: 'register',
            component: register
          },
          {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 会被渲染在 User 的 <router-view> 中
            path: 'signIn',
            component: signIn
          }
        ]
      }
    ]
  })