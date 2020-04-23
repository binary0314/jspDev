// Global Store Actions
const actions = {
    setAdminData ({ commit }, payload) {
        commit('setAdminData', payload)
    },
    setMenuAuthList ({ commit }, payload) {
        commit('setMenuAuthList', payload)
    }
}

export default actions