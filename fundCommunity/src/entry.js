import app from './app.vue'
import router from './router'
import store from './store'

import { sync } from 'vuex-router-sync'

import * as filters from './filters'

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue(Vue.util.extend({ el: '#root', router, store }, app))

router.push('/')


// export default new Vue({
//   el: '#root',
//   router,
//   store,
//   render: h => h(app),
//   template: '<app/>',
//   components: { app }
// })