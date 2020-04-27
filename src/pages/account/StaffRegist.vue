<template>
    <Layout>
        <div class="card">
            <div class="card-header">{{ $t('menus.account.title') }} > {{ $t('menus.account.staff') }} > {{ $t('pageMsg.staffRegist.title1') }}</div>
            <div class="card-body">
                <form name="staffRegistFm" class="form-horizontal" role="form" @submit.prevent="onSave">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.staffRegist.title2') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="name" value="">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">{{ $t('pageMsg.staffRegist.title3') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="mid" value="">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.staffRegist.title4') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="mcode" value="">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">{{ $t('pageMsg.staffRegist.title5') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="sdate" value="" placeholder="yyyy-mm-dd">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.staffRegist.title6') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="password" class="form-control" name="pass" value="">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">{{ $t('pageMsg.staffRegist.title7') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="password" class="form-control" name="confirm" value="">
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.staffRegist.title8') }}</label>
                                <div class="form-group col-md-3">
                                    <select class="form-control" v-model="groupSelected" @change="teamSearch">
                                        <option value="">{{ $t('defaultSelect') }}</option>
                                        <option v-for="group in groups" :key="group.groupCode" :value="group.groupCode">{{ group.groupName }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <select class="form-control" name="gcode[]">
                                        <option value="">{{ $t('defaultSelect') }}</option>
                                        <option v-for="team in teams" :key="team.groupCode" :value="team.groupCode">{{ team.groupName }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <select class="form-control" name="position[]">
                                        <option value="follower">{{ $t('follower') }}</option>
                                        <option value="leader">{{ $t('leader') }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.staffRegist.title9') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="mail" value="">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">{{ $t('pageMsg.staffRegist.title10') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="phone" value="" :placeholder="$t('pageMsg.staffRegist.title13')">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.staffRegist.title11') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="inline" value="" :placeholder="$t('pageMsg.staffRegist.title14')">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">{{ $t('pageMsg.staffRegist.title12') }}</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="ip" value="">
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <div class="col-sm-12 text-center">
                                    <button type="submit" class="btn btn-primary btn-lg"><i class="fa fa-check"></i> {{ $t('btnSave') }}</button>&nbsp;
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
            groups: {},
            teams: {},
            groupSelected: ''
        };
    },
    methods: {
        async init() {
            this.$status = {
                getGroup: false,
                getTeam: false,
                setAdmin: false
            };
            this.$http = await axios.create({
                baseURL: process.env.GRIDSOME_CORE_API_URL,
                proxyHeaders: false,
                credentials: false,
                timeout: 2000
            });
            await this.groupSearch();
        },
        async groupSearch() {
            if (this.$status.getGroup === true) {
                return false;
            }
            this.$status.getGroup = true;
            try {
                let response = await this.$http({
                    method: 'get',
                    url: '/godoService/manager/groups'
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
        async teamSearch() {
            if (this.groupSelected == '') {
                this.teams = {};
            } else {
                if (this.$status.getTeam === true) {
                    return false;
                }
                this.$status.getTeam = true;
                try {
                    let response = await this.$http({
                        method: 'get',
                        url: '/godoService/manager/groups/'+this.groupSelected
                    });
                    this.$status.getTeam = false;
                    if (response.data.msg.resultCode == 0) {
                        if (response.data.msg.data.length <= 0) {
                            for(let index in this.groups) {
                                if (this.groups[index].groupCode == this.groupSelected) {
                                    this.teams = [{
                                        groupCode: this.groups[index].groupCode,
                                        groupName: this.groups[index].groupName
                                    }];
                                    break;
                                }
                            }
                        } else {
                            this.teams = response.data.msg.data;
                        }
                    }
                } catch (error) {
                    this.$status.getTeam = false;
                    if (error.response) {
                        console.log(error.response);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                    alert(this.$i18n.t('errMsg.http_err'));
                }
            }
        },
        async onSave() {
            if ($('input[name=name]').val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.staffRegist.title2'));
                $('input[name=name]').focus();
                return false;
            }
            if ($('input[name=mid]').val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.staffRegist.title3'));
                $('input[name=mid]').focus();
                return false;
            }
            if ($('input[name=mcode]').val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.staffRegist.title4'));
                $('input[name=mcode]').focus();
                return false;
            }
            if ($('input[name=sdate]').val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.staffRegist.title5'));
                $('input[name=sdate]').focus();
                return false;
            }
            if ($('input[name=pass]').val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.staffRegist.title6'));
                $('input[name=pass]').focus();
                return false;
            }
            if ($('input[name=confirm]').val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.staffRegist.title7'));
                $('input[name=confirm]').focus();
                return false;
            }
            if ($('input[name=pass]').val() !== $('input[name=confirm]').val()) {
                alert(this.$i18n.t('pageMsg.staffRegist.title15'));
                $('input[name=confirm]').focus();
                return false;
            }
            if ($("select[name='gcode[]']:eq(0)").val().length <= 0) {
                aalert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.staffRegist.title8'));
                $("select[name='gcode[]']").focus();
                return false;
            }
            if ($('input[name=mail]').val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.staffRegist.title9'));
                $('input[name=mail]').focus();
                return false;
            }
            if ($('input[name=phone]').val().length <= 0) {
                alert(this.$i18n.t('errMsg.param_err')+' : '+this.$i18n.t('pageMsg.staffRegist.title10'));
                $('input[name=phone]').focus();
                return false;
            }
            if (this.$status.setAdmin === true) {
                return false;
            }
            this.$status.setAdmin = true;
            try {
                $('input[name=mid]').prop('disabled', true);
                let response = await this.$http({
                    method: 'post',
                    url: '/godoService/manager/members/'+$('input[name=mid]').val(),
                    data: $('form[name=staffRegistFm]').serialize(),
                    headers: {
                        reqMno: this.getUserSession.mno
                    }
                });
                this.$status.setAdmin = false;
                if (response.status === 201) {
                    alert(this.$i18n.t('sucMsg.regist_suc'));
                    this.$router.push('/account/staff/');
                }
            } catch (error) {
                this.$status.setAdmin = false;
                if (error.response) {
                    console.log(error.response);
                    if (error.response.status == 400) {
                        alert(error.response.data.msg.reason);
                    } else {
                        alert(this.$i18n.t('errMsg.regist_err'));
                    }
                } else if (error.request) {
                    console.log(error.request);
                    alert(this.$i18n.t('errMsg.http_err'));
                } else {
                    console.log('Error', error.message);
                    alert(this.$i18n.t('errMsg.http_err'));
                }
            }
            $('input[name=mid]').prop('disabled', false);
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