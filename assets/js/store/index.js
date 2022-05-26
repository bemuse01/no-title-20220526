export default Vuex.createStore({
    state: {
        app: null
    },
    getters: {
        getApp: (state) => state.app
    },
    mutations: {
        setApp(state, value){
            state.app = value
        }
    },
    actions: {
        setApp({commit}, value){
            commit('setApp', value)
        }
    },
    modules: {
    }
})