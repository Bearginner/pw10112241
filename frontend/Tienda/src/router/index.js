import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientesView from '../views/ClientesView.vue'
import VentasView from '../views/VentasView.vue'
import ProveedoresView from '../views/ProveedoresView.vue'
import ClientesCreateView from '../views/ClientesCreateView.vue'
import ClientesEditarView from '../views/ClientesEditarView.vue'
import RegistroView from '../views/RegistroView.vue'
import EntradaView from '../views/EntradaView.vue'
import NoAutorizaView from '../views/NoAutorizaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ClientesView
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: VentasView
    },
    {
      path: '/proveedores',
      name: 'proveedores',
      component: ProveedoresView
    },
    {
      path: '/clientes/create',
      name: 'clientescreate',
      component: ClientesCreateView
    },
    {
      path: '/clientes/:id/edit',
      name: 'clienteseditar',
      component: ClientesEditarView
    },
    {
      path: '/clientes/registro',
      name: 'registro',
      component: RegistroView
    },
    {
      path: '/clientes/entrada',
      name: 'entrada',
      component: EntradaView
    },
    {
      path: '/clientes/noautoriza',
      name: 'noautoriza',
      component: NoAutorizaView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})
 //Analizamos todas las rutas antes de que se ejecuten
 router.beforeEach((to,from,next) => {
  //Si alguna ruta tiene meytarequireAuth
  if(to.matched.some((record) => record.meta.requireAuth)){
    //Si existe un usuario ergistrado
    if(getAuth().currentUser){
      next(); //continuar sin problemas
    }else{
      alert("Acceso no autorizado");
    }
  }else{  //si no tiene la etiqueta meta
    next();
  }
})

export default router
