<template>
    <Layout>
        <div class="card">
            <div class="card-header">{{ $t('menus.account.title') }} > {{ $t('menus.account.menu_auth') }}</div>
            
            <div class="card-body">
                <form name="staffRegistFm" class="form-horizontal" role="form" @submit.prevent="addManager">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.menu_auth.title1') }}</label>
                                <div class="form-group col-sm-11 row">
                                    <div v-for="gnb in menus" :key="gnb.lang" class="dropdown">
                                        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                                            {{ $t(gnb.lang) }}
                                        </button>&nbsp;
                                        <div class="dropdown-menu">
                                            <a v-for="gnbSub in gnb.pages" :key="gnbSub.lang" class="dropdown-item" @click="menuSelected(gnbSub.link, gnbSub.lang)">{{ $t(gnbSub.lang) }}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row" v-if="pathSelected != '' && langSelected != ''">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.menu_auth.title2') }}</label>
                                <div class="form-group col-sm-11">
                                    <input type="text" readonly class="form-control-plaintext" :value="$t(langSelected)">
                                </div>
                            </div>
                            <div class="form-row" v-if="pathSelected != '' && langSelected != ''">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.menu_auth.title3') }}</label>
                                <span v-for="mauth in menuAuth" :key="mauth.mid">
                                    <button type="button" class="btn btn-light" @click="removeManager(mauth.mno)" style="margin-bottom: 5px;">
                                        {{ mauth.name }}<i class="fa fa-times text-danger"></i>
                                    </button>&nbsp;
                                </span>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">{{ $t('pageMsg.menu_auth.title4') }}</label>
                                <div class="form-group col-md-4">
                                    <select class="form-control" v-model="teamSelected" @change="adminSearch">
                                        <option value="">{{ $t('detaultSelect') }}</option>
                                        <option v-for="group in groups" :key="group.groupCode" :value="group.groupCode">{{ group.groupName }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <select class="form-control" v-model="adminSelected">
                                        <option value="">{{ $t('detaultSelect') }}</option>
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
            sendStatus: false,
            sendInstance: false,
            menus: menus,
            menuAuth: {},
            groups: {},
            admins: {},
            pathSelected: '',
            langSelected: '',
            teamSelected: '',
            adminSelected: ''
        };
    },
    methods: {
        async init() {
            this.sendInstance = axios.create({
                baseURL: process.env.GRIDSOME_CORE_API_URL,
                proxyHeaders: false,
                credentials: false,
                timeout: 2000
            });
            await this.menuSearch();
        },
        async menuSearch() {
            if (this.sendStatus === true) {
                return false;
            }
            this.sendStatus = true;
            try {
                let response = await this.sendInstance({
                    method: 'get',
                    url: '/godoService/member/group',
                    params: {
                        searchTarget: 'team',
                        searchValue: 'all'
                    }
                });
                this.sendStatus = false;
                if (response.data.msg.resultCode == 0) {
                    this.groups = response.data.msg.data;
                }
            } catch (error) {
                this.sendStatus = false;
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
        async menuSelected(path, lang) {
            this.pathSelected = path;
            this.langSelected = lang;
            if (this.sendStatus === true) {
                return false;
            }
            this.sendStatus = true;
            try {
                let response = await this.sendInstance({
                    method: 'get',
                    url: '/godoService/member/menu-auth',
                    params: {
                        searchType: 'path',
                        searchValue: path
                    }
                });
                this.sendStatus = false;
                if (response.data.msg.resultCode == 0) {
                    this.menuAuth = response.data.msg.data;
                }
            } catch (error) {
                this.sendStatus = false;
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
                if (this.sendStatus === true) {
                    return false;
                }
                this.sendStatus = true;
                try {
                    let response = await this.sendInstance({
                        method: 'get',
                        url: '/godoService/member/admin',
                        params: {
                            secureYn: 'Y',
                            searchType: 'gcode',
                            searchValue: this.teamSelected
                        }
                    });
                    this.sendStatus = false;
                    if (response.data.msg.resultCode == 0) {
                        this.admins = response.data.msg.data;
                    }
                } catch (error) {
                    this.sendStatus = false;
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

            if (this.sendStatus === true) {
                return false;
            }
            this.sendStatus = true;
            try {
                let response = await this.sendInstance({
                    method: 'post',
                    url: '/godoService/member/menu-auth',
                    data: {mno: this.adminSelected, path: this.pathSelected}
                });
                this.sendStatus = false;
                if (response.status === 201) {
                    alert(this.$i18n.t('sucMsg.regist_suc'));
                    await this.menuSelected(this.pathSelected, this.langSelected);
                }
            } catch (error) {
                this.sendStatus = false;
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
            if (confirm(message)) {
                try {
                    let response = await this.sendInstance({
                        method: 'delete',
                        url: '/godoService/member/menu-auth/'+mno,
                        data: {path: this.pathSelected}
                    });
                    this.sendStatus = false;
                    if (response.status === 204) {
                        alert(this.$i18n.t('sucMsg.delete_suc'));
                        await this.menuSelected(this.pathSelected, this.langSelected);
                    }
                } catch (error) {
                    this.sendStatus = false;
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
    mounted: function() {
         this.init();
    }
}
</script>

<style>

</style>