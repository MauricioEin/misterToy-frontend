import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/home-page.vue'
import aboutView from '../views/about-page.vue'
import toyApp from '../views/toy-app.vue'
import toyEdit from '../views/toy-edit.vue'
import toyDetails from '../views/toy-details.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView
    },
    {
      path: '/about',
      name: 'about',
      component: aboutView
    },
    {
      path: '/toy',
      name: 'toyApp',
      component: toyApp
    },
    {
      path: '/toy/edit/:id?',
      name: 'edit',
      component: toyEdit
    },
    {
      path: '/toy/:id',
      name: 'toyDetails',
      component: toyDetails
    }
  ]
})

export default router
