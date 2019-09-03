import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Loja from '@/pages/Loja'
import Marca from '@/pages/Marca'
import Carro from '@/pages/Carro'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/carro' ,
      name: 'Carro',
      component: Carro
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/loja' ,
      name: 'Loja',
      component: Loja
    },
    {
      path: '/marca' ,
      name: 'Marca',
      component: Marca
    },
    {
      path: '*',
      component: Home
    }
  ]
})
