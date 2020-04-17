// Global Store getters
const getters = {
    getUser: (state) => {
        return state.user
    },
    getMenuAuth: (state) => {
        return state.auth.menus
    }
}

export default getters