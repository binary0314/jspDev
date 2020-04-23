// Global Store mutations
const mutations = {
    setAdminData(state, payload) {
        state.user = {
            mno: payload.mno,
            mid: payload.mid,
            name: payload.name,
            gname: payload.gname
        }
    },
    setMenuAuthList(state, payload) {
        state.auth.menus = []
        for (let i in payload) {
            state.auth.menus.push(payload[i].path)
        }
    }
};

export default mutations;  