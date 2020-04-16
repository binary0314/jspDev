import Vue from "vue";
import Vuex, { Payload, Store } from "vuex";
// import VuexPersistence from "vuex-persist"; // 새로고침시 vuex 상태값 유지될수 있게 해주는 플러그인
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
// import createPersistedState from "vuex-persistedstate";

// Module 형태 사용.
// import moduleHello from "./modules/hello";

Vue.use(Vuex);

let vuexLocalStorage = null;

if (process.browser) {

    // vuex 데이터 기본 만료시간 설정
    let hours = 2;
    let saved = localStorage.getItem("_t");
    if (saved && new Date().getTime() - saved > hours * 60 * 60 * 1000) {
        localStorage.clear();
    }
    /*
    vuexLocalStorage = createPersistedState({
        storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => {
                localStorage.setItem("_t", new Date().getTime());
            }
        }
    });
    */
}

export default new Vuex.Store({
    getters,    // 필요한 데이터 가져다 쓸수 있도록 정의
    mutations,  // 실제 로직
    state,      // 기본적으로 필요한 정보들 정의
    actions,    // state 를 변경하는 함수역할
    /*
    modules: {
        hello: moduleHello
    },
    */
    //plugins: process.browser ? [vuexLocalStorage] : [],
    strict: process.env.NODE_ENV !== "production"
});