// Global Store mutations
const mutations = {
    setAdminData(state, payload) {
        state.user = {
            mno: payload.mno,
            mid: payload.mid,
            name: payload.name,
            mcode: payload.mcode,
            gcode: payload.gcode,
            gname: payload.gname,
            position: payload.position
        }
    },
    setMenuAuthList(state) {
        state.menus = []
        for (let i in authList) {
            
        }
    }
};

export default mutations;  