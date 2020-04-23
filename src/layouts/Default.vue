<template>
    <div class="container-fluid p-0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        
        <!-- goms gnb load -->
        <template v-if="pathname != '/login/'">
            <Gnb/>
        </template>
        <div class="row no-gutters">
            <div class="col-md-12">
                <div class="wrapper d-flex align-items-stretch">
                    <nav id="sidebar" v-if="pathname != '/' && pathname != '/login/'">
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
                        <template v-if="pathname == '/' || pathname == '/login/' || getMenuAuthSession.includes(pathname)">
                            <slot/>
                        </template>
                        <template v-else>
                            {{ $t('notAuth') }}
                        </template>
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
        async init() {
            await this.pageInit();
            await this.setData();
            await this.loginCheck();
        },
        async setData() {
            if (typeof window !== "undefined") {
                this.pathname = window.location.pathname;
            }
        },
        async pageInit() {
            $(".js-fullheight").css("height", $(window).height());
            $(window).resize(function() {
                $(".js-fullheight").css("height", $(window).height());
            });
            $("#sidebarCollapse").on("click", function() {
                $("#sidebar").toggleClass("active");
            });
        },
        async loginCheck() {
            if (this.pathname != '/login/') {
                if (this.getCookie('gdsid') !== null) {
                    // store에 값이 있으면 통신하지 않고 그대로 사용
                    if (Object.keys(this.getUserSession).length <= 0) {
                        await this.getLoginData();
                    }
                } else {
                    alert(this.$i18n.t('notLogin'));
                    this.$router.push('/login/');   
                }

                // 메뉴권한 가져오기
                if (Object.keys(this.getMenuAuthSession).length <= 0) {
                    await this.getMenuAuthData();
                }
            }
        },
        async getLoginData() {
            try {
                let sid = this.getCookie('gdsid');
                let response = await axios.get(process.env.GRIDSOME_CORE_API_URL+'/memberService/login/admin', {
                    params: {
                        sid: sid
                    }
                });
                if (response.data.msg.resultCode == 0 && response.data.msg.data !== null) {
                    this.loginAssign(response.data.msg.data);
                } else {
                    alert(this.$i18n.t('notLogin'));
                    this.$router.push('/login/'); 
                }
            } catch (error) {
                alert(this.$i18n.t('notLogin'));
                this.$router.push('/login/'); 
            }
        },
        async getMenuAuthData() {
            try {
                let response = await axios.get(process.env.GRIDSOME_CORE_API_URL+'/memberService/member/menu-auth', {
                    params: {
                        searchType: 'mid',
                        searchValue: this.getUserSession.mid
                    }
                });
                if (response.data.msg.resultCode == 0) {
                    this.menuAuthAssign(response.data.msg.data);
                }
            } catch (error) {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                alert(this.$i18n.t('errMsg.http_err'));
            }
        },
        loginAssign(adminInfo) {
            this.$store.dispatch('setAdminData', adminInfo)
        },
        menuAuthAssign(menuList) {
            this.$store.dispatch('setMenuAuthList', menuList)
        },
        getCookie(name) {
            let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return value ? value[2]:null;
        }
    },
    computed: {
        getUserSession () {
            return this.$store.getters.getUser
        },
        getMenuAuthSession () {
            return this.$store.getters.getMenuAuth
        }
    },
    mounted: function() {
        this.init();
    }
}
</script>
<style>

</style>