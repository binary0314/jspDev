<template>
    <Layout>
        <div class="card">
            <div class="card-header">{{ $t('menus.account.title') }} > {{ $t('menus.account.info') }}</div>
            <div class="card-body">
                <form name="infoFm" class="form-horizontal" role="form" @submit.prevent="onSave">
                    <input type="hidden" name="mid" :value="adminInfo.mid"/>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.info.title1') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" readonly class="form-control-plaintext" :value="adminInfo.mid">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">{{ $t('pageMsg.info.title2') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" readonly class="form-control-plaintext" :value="adminInfo.name">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.info.title3') }}<br>({{ $t('pageMsg.info.title4') }})</label>
                                <div class="form-group col-sm-11">
                                    <input type="text" readonly class="form-control-plaintext text-danger" :value="$t('pageMsg.info.title13')">
                                    <div class="row col-sm-4 py-1">
                                        <input type="password" class="form-control" name="oldPass" :placeholder="$t('pageMsg.info.title5')">
                                    </div>
                                    <div class="row col-sm-4 py-1">
                                        <input type="password" class="form-control" name="newPass" :placeholder="$t('pageMsg.info.title6')">
                                    </div>
                                    <div class="row col-sm-4 py-1">
                                        <input type="password" class="form-control" name="confirm" :placeholder="$t('pageMsg.info.title7')">
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.info.title8') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="phone" :value="adminInfo.phone" :placeholder="$t('pageMsg.info.title11')">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">email</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="mail" :value="adminInfo.mail">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.info.title9') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="ip" :value="adminInfo.ip">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">{{ $t('pageMsg.info.title10') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="inline" :value="adminInfo.inline" :placeholder="$t('pageMsg.info.title12')">
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <div class="col-sm-12 text-center">
                                    <button type="submit" class="btn btn-primary btn-lg"><i class="fa fa-check"></i> {{ $t('btnSave') }}</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    </Layout>
</template>

<script>
export default {
    
     data: function() {
        return {
            adminInfo: {}
        };
    },
    methods: {
        async init() {
            this.idx = this.getUserSession.mno;
            this.$status = {
                getAdmin: false,
                setAdmin: false
            };
            this.$http = axios.create({
                baseURL: process.env.GRIDSOME_CORE_API_URL,
                proxyHeaders: false,
                credentials: false,
                timeout: 2000
            });
            await this.getAdminInfo();
        },
        async getAdminInfo() {
            if (this.$status.getAdmin === true) {
                return false;
            }
            this.$status.getAdmin = true;
            try {
                let response = await this.$http({
                    method: 'get',
                    url: '/godoService/manager/members/memberNumber',
                    params: {
                        secureYn: 'N',
                        searchValue: this.idx
                    },
                    headers: {
                        reqMno: this.getUserSession.mno
                    }
                });
                this.$status.getAdmin = false;
                if (response.data.msg.resultCode == 0) {
                    this.adminInfo = response.data.msg.data[0];
                } else {
                    alert(this.$i18n.t('errMsg.http_err'));
                    history.back();
                }
            } catch (error) {
                this.$status.getAdmin = false;
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                alert(this.$i18n.t('errMsg.http_err'));
                history.back();
            }
        },
        async onSave() {
            if ($('input[name=oldPass]').val().length > 0 || $('input[name=newPass]').val().length > 0 || $('input[name=confirm]').val().length > 0) {
                if ($('input[name=oldPass]').val().length <= 0) {
                    alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.info.title5'));
                    $('input[name=oldPass]').focus();
                    return false;
                }
                if ($('input[name=newPass]').val().length <= 0) {
                    alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.info.title6'));
                    $('input[name=newPass]').focus();
                    return false;
                }
                if ($('input[name=confirm]').val().length <= 0) {
                    alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.info.title7'));
                    $('input[name=confirm]').focus();
                    return false;
                }
                if ($('input[name=newPass]').val() != $('input[name=confirm]').val()) {
                    alert(this.$i18n.t('pageMsg.info.title14'));
                    $('input[name=confirm]').focus();
                    return false;
                }
            }
            if ($('input[name=phone]').val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.info.title8'));
                $('input[name=phone]').focus();
                return false;
            }
            if ($('input[name=mail]').val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.info.title7'));
                $('input[name=mail]').focus();
                return false;
            }
            if (this.$status.setAdmin === true) {
                return false;
            }
            this.$status.setAdmin = true;
            try {
                let response = await this.$http({
                    method: 'put',
                    url: '/godoService/manager/members/'+this.idx,
                    data: $('form[name=infoFm]').serialize(),
                    headers: {
                        reqMno: this.getUserSession.mno
                    }
                });
                this.$status.setAdmin = false;
                if (response.status === 204) {
                    alert(this.$i18n.t('sucMsg.update_suc'));
                    $('input[name=oldPass]').val('');
                    $('input[name=newPass]').val('');
                    $('input[name=confirm]').val('');
                }
            } catch (error) {
                this.$status.setAdmin = false;
                if (error.response) {
                    console.log(error.response);
                    if (error.response.status == 400) {
                        alert(error.response.data.msg.reason);
                    } else {
                        alert(this.$i18n.t('errMsg.update_err'));
                    }
                } else if (error.request) {
                    console.log(error.request);
                    alert(this.$i18n.t('errMsg.update_err'));
                } else {
                    console.log('Error', error.message);
                    alert(this.$i18n.t('errMsg.update_err'));
                }
            }
        }
    },
    computed: {
        getUserSession () {
            return this.$store.getters.getUser
        }
    },
    mounted: function() {
        this.init();
    }
}
</script>

<style>

</style>