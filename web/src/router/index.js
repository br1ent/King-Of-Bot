import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '../views/pk/PkIndexView.vue'
import RankListView from '../views/ranklist/RankListView.vue'
import RecordView from '../views/record/RecordView.vue'
import NotFound from '../views/error/NotFound.vue'
import UserBotView from '../views/user/bot/UserBotView.vue'
import LoginView from '../views/user/account/LoginView.vue'
import RegisterView from '../views/user/account/RegisterView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/pk'
  },
  {
    path: '/pk',
    name: 'pk',
    component: PkIndexView,
  },
  {
    path: '/ranklist',
    name: 'ranklist',
    component: RankListView,
  },
  {
    path: '/user/account/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/user/account/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/record',
    name: 'record',
    component: RecordView,
  },
  {
    path: '/user/bot',
    name: 'user_bot',
    component: UserBotView,
  },
  
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router