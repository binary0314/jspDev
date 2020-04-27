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
        state.auth.mno = payload.mno
        state.auth.menus = []
        for (let i in payload) {
            state.auth.menus.push(payload[i].path)
        }
    },
    setLang(state, payload) {
        state.lang = (payload === 'ko' ? payload:'ja')
    }
};

export default mutations;  