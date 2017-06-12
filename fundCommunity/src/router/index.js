import Router from 'vue-router'
import appentry from '../views/appentry.vue'
import index from '../views/index.vue'
import tread from '../views/tread.vue'
import mine from '../views/mine.vue'
import plate1 from '../views/plate1.vue'
import plate2 from '../views/plate2.vue'
import plate3 from '../views/plate3.vue'
import plate4 from '../views/plate4.vue'
import plate5 from '../views/plate5.vue'
import plate6 from '../views/plate6.vue'
import setting from '../views/setting.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'


export default new Router({
  routes: [
    {
      path: '/appentry',
      name: 'Appentry',
      component: appentry,
      children: [ {
          path: 'index',
          name: 'Index',
          component: index, 
        }, {
          path: 'tread',
          name: 'index',
          component: tread
        }, {
          path: 'mine',
          name: 'Mine',
          component: mine
        }
      ]
    },
    {
      path: '/plate1',
      name: 'Plate1',
      component: plate1
    },
    {
      path: '/plate2',
      name: 'Plate2',
      component: plate2
    },
    {
      path: '/plate3',
      name: 'Plate3',
      component: plate3
    },
    {
      path: '/plate4',
      name: 'Plate4',
      component: plate4
    },
    {
      path: '/plate5',
      name: 'Plate5',
      component: plate5
    },
    {
      path: '/plate6',
      name: 'Plate6',
      component: plate6
    },
    {
      path: '/setting',
      name: 'Setting',
      component: setting
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/register',
      name: 'Register',
      component: register
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})