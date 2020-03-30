// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import VueI18n from "vue-i18n";
import jquery from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";

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
}