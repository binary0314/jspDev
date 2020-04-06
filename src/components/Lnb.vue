<template>
    <div>
        <ul v-for="lnb in menus" :key="lnb.lang" v-show="lnb.links.includes(pathname)" class="list-unstyled components mb-5">
            <li v-for="lnbSub in lnb.pages" :key="lnbSub.lang" :class="{active: pathname == lnbSub.link}">
                <g-link v-if="lnbSub.sub.length <= 0" :to="lnbSub.link">{{ $t(lnbSub.lang) }}</g-link>
                <a  v-else class="dropdown-toggle" :href="'#'+lnbSub.subId" role="button" data-toggle="collapse">{{ $t(lnbSub.lang) }}</a>
                <ul :id="lnbSub.subId" class="collapse list-unstyled">
                    <li>
                        <g-link v-for="lnbSubChild in lnbSub.sub" :key="lnbSubChild.lang" :to="lnbSubChild.link">{{ $t(lnbSubChild.lang) }}</g-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
// load json
import menus from '~/assets/menu.json';

export default {
    data: function() {
        return {
            pathname: null,
            menus: menus
        };
    },
    methods: {
        setData: function() {
            if (typeof window !== "undefined") {
                this.pathname = window.location.pathname;
            }
        }
    },
    mounted: function() {
        this.setData();
    }
};
</script>

<style>

</style>