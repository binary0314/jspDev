// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// load components
import DefaultLayout from "~/layouts/Default.vue";

// load js
import jquery from "jquery";
import VueI18n from "vue-i18n";
import "bootstrap";

// Load json
import korean from "~/lang/ko.json";
import japanese from "~/lang/ja.json";

// load css
import "bootstrap/dist/css/bootstrap.min.css";

const messages = {
    ko: korean,
    ja: japanese
};

export default async function(Vue, { router, head, appOptions, isClient }) {
    Vue.component("Layout", DefaultLayout);
    Vue.use(VueI18n);

    if (isClient) {
        window.$ = jquery;
    }

    let lang;
    if (isClient) {
        lang = window.navigator.language.split("-")[0];
        console.log(lang);
    }
    const supportedLanguages = ["ko", "ja"];
    lang = supportedLanguages.includes(lang) ? lang : "ko";
    console.log("message", messages, lang);
    appOptions.i18n = new VueI18n({
        locale: lang, // set locale
        // fallbackLocale: "ko",
        messages // set locale messages
    });
}