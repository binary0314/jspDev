<template>
    <Layout>
        <div class="card">
            <div class="card-header">{{ $t('menus.account.title') }} > {{ $t('menus.account.menu_auth') }}</div>
            
            <div class="card-body">
                <form name="staffRegistFm" class="form-horizontal" role="form" @submit.prevent="addManager">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-2 col-form-label">{{ $t('pageMsg.menu_auth.title1') }}</label>
                                <div class="form-group col-sm-10 row">
                                    <div v-for="gnb in menus" :key="gnb.lang" class="dropdown">
                                        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split m-1" data-toggle="dropdown">
                                            {{ $t(gnb.lang) }}
                                        </button>
                                        <div class="dropdown-menu">
                                            <a v-for="gnbSub in gnb.pages" :key="gnbSub.lang" class="dropdown-item" @click="menuSelected(gnbSub.link, gnbSub.lang, gnbSub.form)">{{ $t(gnbSub.lang) }}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row" v-if="pathSelected != '' && langSelected != ''">
                                <label class="col-sm-2 col-form-label">{{ $t('pageMsg.menu_auth.title2') }}</label>
                                <div class="form-group col-sm-10">
                                    <input type="text" readonly class="form-control-plaintext" :value="$t(langSelected)">
                                </div>
                            </div>
                            <div class="form-row" v-if="pathSelected != '' && langSelected != ''">
                                <label class="col-sm-2 col-form-label">{{ $t('pageMsg.menu_auth.title3') }}</label>
                                <div class="form-group col-sm-10">
                                    <button type="button" v-for="mauth in menuAuth" :key="mauth.mid" class="btn btn-light m-1" @click="removeManager(mauth.mno)">
                                        {{ mauth.name }}<i class="fa fa-times text-danger"></i>
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-2 col-form-label">{{ $t('pageMsg.menu_auth.title4') }}</label>
                                <div class="form-group col-md-3">
                                    <select class="form-control" v-model="groupSelected" @change="teamSearch">
                                        <option value="">{{ $t('defaultSelect') }}</option>
                                        <option v-for="group in groups" :key="group.groupCode" :value="group.groupCode">{{ group.groupName }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <select class="form-control" v-model="teamSelected" @change="adminSearch">
                                        <option value="">{{ $t('defaultSelect') }}</option>
                                        <option v-for="team in teams" :key="team.groupCode" :value="team.groupCode">{{ team.groupName }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <select class="form-control" v-model="adminSelected">
                                        <option value="">{{ $t('defaultSelect') }}</option>
                                        <option v-for="admin in admins" :key="admin.adminId" :value="admin.mno">{{ admin.name }} ({{ admin.mid }})</option>
                                    </select>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <div class="col-sm-12 text-center">
                                    <button type="submit" class="btn btn-primary btn-lg"><i class="fa fa-check"></i> {{ $t('btnSave') }}</button>&nbsp;
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
// load json
import menus from '~/assets/menu.json';

export default {
    
     data: function() {
        return {
            menus: menus,
            menuAuth: {},
            groups: {},
            teams: {},
            admins: {},
            pathSelected: '',
            langSelected: '',
            pathChild: [],
            groupSelected: '',
            teamSelected: '',
            adminSelected: ''
        };
    },
    methods: {
        async init() {
            this.$status = {
                getGroup: false,
                getTeam: false,
                getMenuAuth: false,
                getAdmin: false,
                addMenuAuth: false,
                delMenuAuth: false
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
                        this.teamSelected = '';
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
        async menuSelected(path, lang, form) {
            this.pathSelected = path;
            this.langSelected = lang;
            this.pathChild = form;
            if (this.$status.getMenuAuth === true) {
                return false;
            }
            this.$status.getMenuAuth = true;
            try {
                let response = await this.$http({
                    method: 'get',
                    url: '/godoService/manager/menu-auth/path',
                    params: {
                        searchValue: path
                    }
                });
                this.$status.getMenuAuth = false;
                if (response.data.msg.resultCode == 0) {
                    this.menuAuth = response.data.msg.data;
                }
            } catch (error) {
                this.$status.getMenuAuth = false;
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
        async adminSearch() {
            if (this.teamSelected == '') {
                this.adminSearch = {};
            } else {
                if (this.$status.getAdmin === true) {
                    return false;
                }
                this.$status.getAdmin = true;
                try {
                    let response = await this.$http({
                        method: 'get',
                        url: '/godoService/manager/members/groupCode',
                        params: {
                            secureYn: 'Y',
                            searchValue: this.teamSelected
                        },
                        headers: {
                            reqMno: this.getUserSession.mno
                        }
                    });
                    this.$status.getAdmin = false;
                    if (response.data.msg.resultCode == 0) {
                        this.admins = response.data.msg.data;
                    }
                    this.adminSelected = '';
                } catch (error) {
                    this.$status.getAdmin = false;
                    if (error.response) {
                        console.log(error.response);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                    console.log(error);
                    alert(this.$i18n.t('errMsg.http_err'));
                }
            }
        },
        async addManager() {
            if (this.pathSelected == '') {
                alert(this.$i18n.t('pageMsg.menu_auth.pathSelect_err'));
                return false;
            }
            if (this.adminSelected == '') {
                alert(this.$i18n.t('pageMsg.menu_auth.adminSelect_err'));
                return false;
            }

            let adminCheck = false;
            for (let i in this.menuAuth) {
                if (this.menuAuth[i].mno === this.adminSelected) {
                    adminCheck = true;
                    break;
                }
            }
            if (adminCheck == true) {
                alert(this.$i18n.t('pageMsg.menu_auth.adminCheck_err'));
                return false;
            }

            if (this.$status.addMenuAuth === true) {
                return false;
            }
            this.$status.addMenuAuth = true;
            try {
                let response = await this.$http({
                    method: 'post',
                    url: '/godoService/manager/menu-auth/'+this.adminSelected,
                    data: {
                        path: this.pathSelected
                    },
                    headers: {
                        reqMno: this.getUserSession.mno
                    }
                });
                this.$status.addMenuAuth = false;
                if (response.status === 201) {
                    if (Object.keys(this.pathChild).length > 0) {
                        for (let index in this.pathChild) {
                            await this.$http({
                                method: 'post',
                                url: '/godoService/manager/menu-auth/'+this.adminSelected,
                                data: {
                                    path: this.pathChild[index]
                                },
                                headers: {
                                    reqMno: this.getUserSession.mno
                                }
                            });
                        }
                    }
                    alert(this.$i18n.t('sucMsg.regist_suc'));
                    await this.menuSelected(this.pathSelected, this.langSelected, this.pathChild);
                }
            } catch (error) {
                this.$status.addMenuAuth = false;
                if (error.response) {
                    console.log(error.response);
                    if (error.response.status == 400) {
                        alert(error.response.data.msg.reason);
                    } else {
                        alert(this.$i18n.t('errMsg.regist_err'));
                    }
                } else if (error.request) {
                    console.log(error.request);
                    alert(this.$i18n.t('errMsg.regist_err'));
                } else {
                    console.log('Error', error.message);
                    alert(this.$i18n.t('errMsg.regist_err'));
                }
            }
        },
        async removeManager(mno) {
            let message = this.$i18n.t('conMsg.delete_con');
            if (this.$status.delMenuAuth === true) {
                return false;
            }
            if (confirm(message)) {                
                try {
                    let response = await this.$http({
                        method: 'delete',
                        url: '/godoService/manager/menu-auth/'+mno,
                        data: {
                            path: this.pathSelected
                        },
                        headers: {
                            reqMno: this.getUserSession.mno
                        }
                    });
                    this.$status.delMenuAuth = false;
                    if (response.status === 204) {
                        if (Object.keys(this.pathChild).length > 0) {
                            for (let index in this.pathChild) {
                                await this.$http({
                                    method: 'delete',
                                    url: '/godoService/manager/menu-auth/'+mno,
                                    data: {
                                        path: this.pathChild[index]
                                    },
                                    headers: {
                                        reqMno: this.getUserSession.mno
                                    }
                                });
                            }
                        }
                        alert(this.$i18n.t('sucMsg.delete_suc'));
                        await this.menuSelected(this.pathSelected, this.langSelected, this.pathChild);
                    }
                } catch (error) {
                    this.$status.delMenuAuth = false;
                    if (error.response) {
                        console.log(error.response);
                        if (error.response.status == 400) {
                            alert(error.response.data.msg.reason);
                        } else {
                            alert(this.$i18n.t('errMsg.delete_err'));
                        }
                    } else if (error.request) {
                        console.log(error.request);
                        alert(this.$i18n.t('errMsg.delete_err'));
                    } else {
                        console.log('Error', error.message);
                        alert(this.$i18n.t('errMsg.delete_err'));
                    }
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