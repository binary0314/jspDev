// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// load components
import DefaultLayout from "~/layouts/Default.vue";

// load js
import Axios from "axios";
import jquery from "jquery";
import VueI18n from "vue-i18n";

// Load json
import korean from "~/lang/ko.json";
import japanese from "~/lang/ja.json";

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
        window.$ = jquery;
        require("bootstrap");

        lang = window.navigator.language.split("-")[0];
        console.log(lang);
    }
    const supportedLanguages = ["ko", "ja"];
    lang = supportedLanguages.includes(lang) ? lang : "ko";
    appOptions.i18n = new VueI18n({
        locale: lang, // set locale
        // fallbackLocale: "ko",
        messages // set locale messages
    });
    
    Vue.component("Layout", DefaultLayout);
    
}