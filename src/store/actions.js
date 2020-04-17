// Global Store Actions
const actions = {
    setAdminData ({ commit }, payload) {
        commit('setAdminData', payload)
    },
    setMenuAuthList ({ commit }) {
        commit('setMenuAuthList')
    }
}

export default actions