// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import jquery from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";

import VueI18n from 'vue-i18n';
import messages from '@/lang/ko.json';

export default async function(Vue, { router, head, isClient }) {

    Object.defineProperty(Vue.prototype, "$", {
        value: jquery
    });
      
    await head.script.push({
        src: "https://code.jquery.com/jquery-3.4.1.slim.min.js",
        body: true
    });
    await head.script.push({
        src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
        body: true
    });
    await head.script.push({
        src: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
        body: true
    });

    // Set default layout as a global component
    Vue.component("Layout", DefaultLayout);
    Vue.use(VueI18n);
    // Vue.use(Bootstrap)

    
    const i18n = new VueI18n({
        locale: 'ko', // set locale
        fallbackLocale: 'ko',
        messages // set locale messages
    })

    /*
    let browser_language;

    if (isClient) {
        browser_language = window.navigator.language.split('-')[0]
        console.log(browser_language)
    }
    const languages = ["ko", "ja"];
    let selected_language = languages.includes(browser_language) ? browser_language : 'ko';

    return import(`@/lang/${selected_language}.json`).then(
        messages => {
            return (selected_language)
        }
    )
    */
}

/*
Vue.use(VueI18n);
export const i18n = new VueI18n({
    locale: 'ko', // set locale
    fallbackLocale: 'ko',
    messages // set locale messages
})*/