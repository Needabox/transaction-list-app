import { createRouter, createWebHistory } from 'vue-router'
import Note from '../views/Note.vue'

const routes = [
  {
    path: '/',
    name: 'Note',
    component: Note
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
