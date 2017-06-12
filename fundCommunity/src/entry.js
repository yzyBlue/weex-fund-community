import app from './app.vue'
import router from './router'
import store from './store'



export default new Vue({
  el: '#root',
  router,
  store,
  render: h => h(app),
  template: '<app/>',
  components: { app }
})