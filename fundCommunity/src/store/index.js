import Vuex from 'vuex';

// Vuex is auto installed on the web
if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
}


export default new Vuex.Store({
	state: {
        logging: false,
        // username: "",
        // userid: -1,
        username: "sly",
        userid: 3,
        curselect: 'Index'
    },
	mutations: {
    },

	getters: {

    },
	actions: {

    }
})