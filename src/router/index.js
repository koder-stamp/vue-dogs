import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Breed from "../views/Breed";
import Favorites from "../views/Favorites";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
  },
  { path: '/:id',
    component: Breed,
    name: 'Breed',}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
