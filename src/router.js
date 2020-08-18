import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Benefit from './views/Benefit.vue'

import ViewBenefit from './views/Benefit/ViewBenefit.vue'
import AddBenefit from './views/Benefit/AddBenefit.vue'

import ViewEmployee from './views/Employee/ViewEmployee.vue'
import AddEmployee from './views/Employee/AddEmployee.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/benefit',
      name: 'benefit',
      component: Benefit
    },
    {
      path: '/benefit/add',
      name: 'addbenefit',
      component: AddBenefit
    },
    {
      path: '/benefit/:id',
      name: 'viewbenefit',
      component: ViewBenefit
    },
    {
      path: '/employee/add',
      name: 'addemployee',
      component: AddEmployee
    },
    {
      path: '/employee/:id',
      name: 'viewemployee',
      component: ViewEmployee
    }
  ]
})
