import chatStore from '../store/chatStore'
const routes = [
  {
    path: '/',
    component: () => import('pages/login.vue'),
  },
  {
    path: '/register',
    component: () => import('pages/register.vue')
  },
  {
    path: '/user',
    component: () => import('layouts/user.vue'),
    beforeEnter: (to, from, next) => {
      if (chatStore.state.token) {
        if (!chatStore.state.admin)
          next();
      } else
        next(false)
    },
    children: [
      {
        path: 'home',
        component: () => import('pages/home.vue')
      }
    ]
  },
  {
    path: '/chat/:roomId',
    name: 'chat',
    component: () => import('pages/chat.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
