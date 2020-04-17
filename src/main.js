// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// load components
import DefaultLayout from "~/layouts/Default.vue";

// load js
import Axios from "axios";
import JQuery from "jquery";
import VueI18n from "vue-i18n";

// Load json
import korean from "~/lang/ko.json";
import japanese from "~/lang/ja.json";

// load vuex store
import Store from "~/store/store";

// load css
import "bootstrap/dist/css/bootstrap.min.css";

const messages = {
    ko: korean,
    ja: japanese
};

export default async function(Vue, { appOptions, isClient }) {

    Vue.use(VueI18n);
    
    let lang;
    if (isClient) {
        window.axios = Axios;
        window.$ = JQuery;
        require("bootstrap");

        lang = window.navigator.language.split("-")[0];

        // HTTP프로토콜 HTTPS로 변경
        if (window.location.protocol == "http:" && process.env.GRIDOMSE_DEV_MODE == false) {
            window.location.href = window.location.href.replace("http:", "https:");
        }
    }
    
    const supportedLanguages = ["ko", "ja"];
    lang = supportedLanguages.includes(lang) ? lang : "ko";
    appOptions.i18n = new VueI18n({
        locale: lang, // set locale
        // fallbackLocale: "ko",
        messages // set locale messages
    });
    
    appOptions.store = Store;
    Vue.component("Layout", DefaultLayout);
    
}