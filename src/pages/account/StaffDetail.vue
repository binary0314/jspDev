<template>
    <Layout>
        <div class="card">
            <div class="card-header">{{ $t('menus.account.title') }} > {{ $t('menus.account.staff') }} > {{ $t('pageMsg.staffDetail.title1') }}</div>
            <div class="card-body">
                <form name="staffDetailFm" class="form-horizontal" role="form" @submit.prevent="onSave">
                    <input type="hidden" name="mid" :value="adminInfo.mid"/>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.staffDetail.title2') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" readonly class="form-control-plaintext" :value="adminInfo.name">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">{{ $t('pageMsg.staffDetail.title3') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" readonly class="form-control-plaintext" :value="adminInfo.mid">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.staffDetail.title4') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" readonly class="form-control-plaintext" :value="adminInfo.mcode">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">{{ $t('pageMsg.staffDetail.title5') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="sdate" :value="adminInfo.sdate" placeholder="yyyy-mm-dd">
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.staffDetail.title6') }}</label>
                                <div class="form-group col-md-4">
                                    <select class="form-control" name="gcode[]">
                                        <option value="">{{ $t('defaultSelect') }}</option>
                                        <option v-for="group in groups" :key="group.groupCode" :value="group.groupCode" :selected="group.groupCode == adminInfo.gcode">{{ group.groupName }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <select class="form-control" name="position[]">
                                        <option value="follower" :selected="adminInfo.position == 'follower'">{{ $t('follower') }}</option>
                                        <option value="leader" :selected="adminInfo.position == 'leader'">{{ $t('leader') }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.staffDetail.title7') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="mail" :value="adminInfo.mail">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">{{ $t('pageMsg.staffDetail.title8') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="phone" :value="adminInfo.phone" :placeholder="$t('pageMsg.staffRegist.title11')">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.staffDetail.title9') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="inline" :value="adminInfo.inline" :placeholder="$t('pageMsg.staffRegist.title12')">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">{{ $t('pageMsg.staffDetail.title10') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="ip" :value="adminInfo.ip">
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <div class="col-sm-12 text-center">
                                    <button type="submit" class="btn btn-primary btn-lg"><i class="fa fa-check"></i> {{ $t('btnModify') }}</button>&nbsp;
                                    <g-link to="/account/staff/" role="button" class="btn btn-outline-secondary btn-lg"><i class="fa fa-list"></i> {{ $t('btnList') }}</g-link>
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
            adminInfo: {},
            groups: {}
        };
    },
    methods: {
        async init() {
            this.idx = this.$route.query.idx;
            if (this.idx <= 0) {
                alert(this.$i18n.t('errMsg.http_err'));
                history.back();
            }
            this.$status = {
                getGroup: false,
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
            await this.groupSearch();
        },
        async getAdminInfo() {
            if (this.$status.getAdmin === true) {
                return false;
            }
            this.$status.getAdmin = true;
            try {
                let response = await this.$http({
                    method: 'get',
                    url: '/memberService/member/admin',
                    params: {
                        secureYn: 'N',
                        searchType: 'mno',
                        searchValue: this.idx
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
        async groupSearch() {
            if (this.$status.getGroup === true) {
                return false;
            }
            this.$status.getGroup = true;
            try {
                let response = await this.$http({
                    method: 'get',
                    url: '/memberService/member/group',
                    params: {
                        searchTarget: 'team',
                        searchValue: 'all'
                    }
                });
                this.$status.getGroup = false;
                if (response.data.msg.resultCode == 0) {
                    this.groups = response.data.msg.data;
                }
            } catch (error) {
                this.$status.getGroup = false;
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
        async onSave() {
            if ($('input[name=sdate]').val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.staffDetail.title5'));
                $('input[name=sdate]').focus();
                return false;
            }
            if ($("select[name='gcode[]']:eq(0)").val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.staffDetail.title6'));
                $("select[name='gcode[]']").focus();
                return false;
            }
            if ($('input[name=mail]').val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.staffDetail.title7'));
                $('input[name=mail]').focus();
                return false;
            }
            if ($('input[name=phone]').val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.staffDetail.title8'));
                $('input[name=phone]').focus();
                return false;
            }
            if (this.$status.setAdmin === true) {
                return false;
            }
            this.$status.setAdmin = true;
            try {
                let response = await this.$http({
                    method: 'put',
                    url: '/memberService/member/admin/'+this.idx,
                    data: $('form[name=staffDetailFm]').serialize()
                });
                this.$status.setAdmin = false;
                if (response.status === 204) {
                    alert(this.$i18n.t('sucMsg.update_suc'));
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
    mounted: function() {
        this.init();
    }
}
</script>

<style>

</style>