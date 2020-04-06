<template>
    <div class="row no-gutters sticky-top">
        <div class="col-md-12">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <g-link class="navbar-brand" to="/">GOMS</g-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse ml-sm-5" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li v-for="gnb in menus" :key="gnb.lang" class="nav-item dropdown">
                            <a :class="{active: gnb.links.includes(pathname)}" class="nav-link dropdown-toggle mr-sm-3" href="#" role="button" data-toggle="dropdown">
                                {{ $t(gnb.lang) }}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <g-link v-for="gnbSub in gnb.pages" :key="gnbSub.lang" class="dropdown-item" :to="gnbSub.link">{{ $t(gnbSub.lang) }}</g-link>
                            </div>
                        </li>
                    </ul>
                    <ul class="navbar-nav right">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle mr-sm-3" href="#" role="button" data-toggle="dropdown">
                                language
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#" role="button" @click="setLang('ko')">한국어</a>
                                <a class="dropdown-item" href="#" role="button" @click="setLang('ja')">日本</a>
                            </div>
                        </li>
                    </ul>
                    <span class="navbar-text ml-sm-3">
                        <i class="fa fa-user"></i> 정보시스템개발팀 박재성
                    </span>
                </div>
            </nav>
        </div>
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
        },
        setLang:function(lang) {
            this.$root.$i18n.locale = lang;
        }
    },
    mounted: function() {
        this.setData();
    }
};
</script>

<style>

</style>