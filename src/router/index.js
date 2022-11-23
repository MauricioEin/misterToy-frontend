import { createRouter, createWebHistory } from 'vue-router'
import statsView from '../views/stats-page.vue'
import aboutView from '../views/about-page.vue'
import toyApp from '../views/toy-app.vue'
import toyEdit from '../views/toy-edit.vue'
import toyDetails from '../views/toy-details.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/toy'
    },
    {
      path: '/about',
      name: 'about',
      component: aboutView
    },
    {
      path: '/stats',
      name: 'stats',
      component: statsView
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
