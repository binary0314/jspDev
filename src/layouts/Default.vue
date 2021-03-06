<template>
    <div class="container-fluid p-0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>

        <template v-if="pathname == '/login/' || Object.keys(getUserSession).length > 0">
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
        </template>
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
            let sid = this.getCookie('gdsid');
            if (this.pathname != '/login/') {
                if (sid !== null) {
                    try {
                        let response = await axios.get(process.env.GRIDSOME_CORE_API_URL+'/godoService/manager/login/confirm', {
                            params: {
                                sid: sid
                            }
                        });
                        if (response.data.msg.resultCode == 0 && response.data.msg.data !== null) {
                            // 쿠키 만료일 갱신
                            this.delCookie();
                            this.setCookie(sid);

                            // 로그인 정보 저장
                            await this.loginAssign(response.data.msg.data);
                        } else {
                            if (this.pathname != '/') {
                                alert(this.$i18n.t('notLogin'));
                            }
                            this.$router.push('/login/'); 
                        }
                    } catch (error) {
                        if (this.pathname != '/') {
                            alert(this.$i18n.t('notLogin'));
                        }
                        this.$router.push('/login/'); 
                    }
                } else {
                    if (this.pathname != '/') {
                        alert(this.$i18n.t('notLogin'));
                    }
                    this.$router.push('/login/');
                }

                // 메뉴권한 가져오기
                if (Object.keys(this.getMenuAuthSession).length <= 0) {
                    await this.getMenuAuthData();
                }

                // 언어설정 가져오기
                if (this.getLang == null) {
                    await this.getLangData();
                }
            }
        },
        async getMenuAuthData() {
            try {
                let response = await axios.get(process.env.GRIDSOME_CORE_API_URL+'/godoService/manager/menu-auth/mid', {
                    params: {
                        searchValue: this.getUserSession.mid
                    }
                });
                if (response.data.msg.resultCode == 0) {
                    await this.menuAuthAssign(response.data.msg.data);
                }
            } catch (error) {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            }
        },
        async getLangData() {
            try {
                let response = await axios.get(process.env.GRIDSOME_CORE_API_URL+'/godoService/manager/language/'+this.getUserSession.mno);
                if (response.data.msg.resultCode == 0 && response.data.msg.data !== null) {
                    this.setLang(response.data.msg.data);
                }
            } catch (error) {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            }
        },
        async loginAssign(adminInfo) {
            this.$store.dispatch('setAdminData', adminInfo)
        },
        async menuAuthAssign(menuList) {
            this.$store.dispatch('setMenuAuthList', menuList)
        },
        async setLang(lang) {
            this.$store.dispatch('setLang', lang);
            if (['jp', 'ko'].includes(lang)) {
                this.$root.$i18n.locale = (lang == 'ko' ? lang:'ja');
            }
        },
        getCookie(name) {
            let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return value ? value[2]:null;
        },
        setCookie(sid) {
            let d = new Date();                
            d.setTime(d.getTime() + (3600 * 1000)); // 1시간
            let expires = "expires="+ d.toUTCString();
            document.cookie = "gdsid=" + sid + ";" + expires + ";path=/";
        },
        delCookie() {
            let d = new Date();                
            d.setTime(d.getTime() - 1); // 쿠키 만료처리
            let expires = "expires="+ d.toUTCString();
            document.cookie = "gdsid='';" + expires + ";path=/";
        }
    },
    computed: {
        getUserSession () {
            return this.$store.getters.getUser
        },
        getMenuAuthSession () {
            return this.$store.getters.getMenuAuth
        },
        getLang() {
            return this.$store.getters.getLang
        }
    },
    created: function() {
        this.init();
    }
}
</script>
<style>

</style>