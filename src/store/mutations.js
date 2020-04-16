// Global Store mutations
const mutations = {
    increment(state) {
        state.count++;
    },
    decrement(state) {
        if (state.count > 1) {
        state.count--;
        }
    },
    updateTime() {
        // localStorage.setItem("_t", new Date().getTime());
    }
};

export default mutations;  