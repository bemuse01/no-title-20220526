const TestStore = {
    namespaced: true,
    state: {
        openTime: 1, // 1s
    },
    getters: {
        getOpenTime: (state) => state.openTime
    },
    mutations: {
    },
    actions: {
    }
}