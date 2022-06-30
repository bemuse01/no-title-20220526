export default {
    namespaced: true,
    state: {
        items: []
    },
    getters: {
        getItems: (state) => state.items,
        getItemById: (state) => (id) => state.items.find(item => item.id === id)
    },
    mutations: {
        addItem(state, item){
            state.items.push(item)
        },
        removeItem(state, id){
            state.items = state.items.filter(item => item.id !== id)
        }
    },
    actions: {
        addItem({commit}, item){
            commit('addItem', item)
        },
        removeItem({commit}, id){
            commit('removeItem', id)
        }
    }
}