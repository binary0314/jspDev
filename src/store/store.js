import Vue from "vue";
import Vuex, { Payload, Store } from "vuex";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

let vuexLocalStorage = null;

if (process.browser) {

    // vuex 데이터 기본 만료시간 설정
    let hours = 2;
    let saved = localStorage.getItem("_t");
    if (saved && new Date().getTime() - saved > hours * 60 * 60 * 1000) {
        localStorage.clear();
    }
    vuexLocalStorage = createPersistedState({
        storage: {
            getItem: key => localStorage.getItem("_t"),
            setItem: (key, value) => {
                localStorage.setItem("_t", new Date().getTime());
            },
            removeItem: key => ''
        }
    });
}

export default new Vuex.Store({
    getters,    // 필요한 데이터 가져다 쓸수 있도록 정의
    mutations,  // 실제 로직
    state,      // 기본적으로 필요한 정보들 정의
    actions,    // state 를 변경하는 함수역할
    plugins: process.browser ? [vuexLocalStorage] : []
});