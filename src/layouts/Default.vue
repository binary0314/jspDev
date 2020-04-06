<template>
    <div class="container-fluid p-0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        
        <!-- goms gnb load -->
        <Gnb/>
        <div class="row no-gutters">
            <div class="col-md-12">
                <div class="wrapper d-flex align-items-stretch">
                    <nav id="sidebar" v-if="pathname != '/'">
                        <div class="custom-menu">
                            <button type="button" id="sidebarCollapse" class="btn btn-primary">
                                <i class="fa fa-bars"></i>
                                <span class="sr-only">Toggle Menu</span>
                            </button>
                        </div>
                        <!-- goms lnb load -->
                        <Lnb/>
                    </nav>

                    <div id="content" class="p-4 p-md-5 pt-5">
                        <!-- goms contents load -->
                        <slot/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<static-query>
query {
    metadata {
        siteName
    }
}
</static-query>
<script>
// load css
import '~/assets/normalize.css';
import '~/assets/layout.css';

// load json
import menus from '~/assets/menu.json';

// load components
import Gnb from '../components/Gnb';
import Lnb from '../components/Lnb';

export default {
    metaInfo: {},
    components: {
        Gnb,
        Lnb
    },
    data: function() {
        return {
            pathname: null
        };
    },
    methods: {
        setData: function() {
            if (typeof window !== "undefined") {
                this.pathname = window.location.pathname;
            }
        },
        pageInit: function() {
            $(".js-fullheight").css("height", $(window).height());
            $(window).resize(function() {
                $(".js-fullheight").css("height", $(window).height());
            });
            $("#sidebarCollapse").on("click", function() {
                $("#sidebar").toggleClass("active");
            });
        }
    },
    mounted: function() {
        this.pageInit();
        this.setData();
    }
};
</script>
<style>

</style>