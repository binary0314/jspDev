<template>
    <Layout>
        <form name="loginFm" class="form-horizontal" role="form" @submit.prevent="login">
            <div class="login-wrapper">
                <div class="box">
                    <div class="content-wrap">
                        <h6>{{ $t('pageMsg.login.title1') }}</h6>
                        <div class="form-row">
                            <div class="form-group col-sm-1"><i class="fa fa-lock"></i></div>
                            <div class="form-group col-sm-11">
                                <input class="form-control" name="pass1" type="password" :placeholder="$t('pageMsg.login.title2')">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-1"><i class="fa fa-lock"></i></div>
                            <div class="form-group col-sm-11">
                                <input class="form-control" name="pass2" type="password" :placeholder="$t('pageMsg.login.title3')">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-lg btn-primary"><i class="fa fa-unlock-alt"></i> {{ $t('pageMsg.login.title1') }}</button>
                    </div>
                </div>
            </div>
        </form>
    </Layout>
</template>

<script>
export default {

    data: function() {
        return {
            adminInfo: {},
            menuList: {}
        };
    },
    methods: {
        init() {
            this.pageInit();
            this.delCookie();
        },
        pageInit() {
            const imgRand = ["7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg"];
            let img = this.shuffle(imgRand);
            let bgImage = require('~/assets/img/'+img[0]);
            $('html body').css('backgroundImage','url('+bgImage+')');
        },
        async login() {
            let mid = $('input[name=pass1]').val();
            let pass = $('input[name=pass2]').val();
            if (mid.length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.login.title2'));
                $('input[name=pass1]').focus();
                return false;
            }
            if (pass.length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.login.title3'));
                $('input[name=pass2]').focus();
                return false;
            }
            try {
                let response = await axios.post(process.env.GRIDSOME_CORE_API_URL+'/godoService/manager/login', {
                    mid: mid,
                    pass: pass
                });
                if (response.data.msg.resultCode == 0) {
                    this.setCookie(response.data.msg.data.sid);
                    alert(this.$i18n.t('pageMsg.login.login_suc'));
                    $('html body').css('background-image', 'url("")');
                    this.$router.replace('/');
                } else {
                    alert(this.$i18n.t('errMsg.http_err'));
                }
            } catch (error) {
                if (error.response) {
                    console.log(error.response);
                    if (error.response.status == 400) {
                        alert(error.response.data.msg.reason);
                    } else {
                        alert(this.$i18n.t('errMsg.http_err'));
                    }
                } else if (error.request) {
                    console.log(error.request);
                    alert(this.$i18n.t('errMsg.http_err'));
                } else {
                    console.log('Error', error.message);
                    alert(this.$i18n.t('errMsg.http_err'));
                }
            }
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
        },
        shuffle(o) {
            for(let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		    return o;
        }
    },
    mounted: function() {
        this.init();
    }

}
</script>

<style>
body {
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../img/bgs/landscape.jpg', sizingMethod='scale');
    -ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../img/bgs/landscape.jpg', sizingMethod='scale')";
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
.login-wrapper {
    position: absolute;
    top: 90px;
    left: 0;
    right: 0;
    text-align: center;
}
.login-wrapper .box {
    margin: 0 auto;
    padding: 35px 0 30px;
    float: none;
    width: 400px;
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.65);
}
.login-wrapper .box .content-wrap {
    width: 82%;
    margin: 0 auto;
}
.login-wrapper .box h6 {
    text-transform: uppercase;
    margin: 0 0 30px 0;
    font-size: 18px;
    font-weight: 600;
}
.login-wrapper .box input[type="text"],
.login-wrapper .box input[type="password"] {
    font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 13px;
    height: 40px;
    margin-bottom: 0px;
    border-color: #b2bfc7;
    padding-left: 12px;
}
.login-wrapper .box input[type="password"] {
    margin-bottom: 0px;
}
.login-wrapper .box input:-moz-placeholder {
    color: #9ba8b6;
    font-size: 15px;
    letter-spacing: 0px;
    font-style: italic;
}
.login-wrapper .box input:-ms-input-placeholder {
    color: #9ba8b6;
    font-style: italic;
    letter-spacing: 0px;
    font-size: 15px;
}
.login-wrapper .box input::-webkit-input-placeholder {
    color: #9ba8b6;
    font-style: italic;
    letter-spacing: 0px;
    font-size: 15px;
}
</style>