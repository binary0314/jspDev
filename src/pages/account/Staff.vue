<template>
    <Layout>
        <div class="card">
            <div class="card-header">
                {{ $t('menus.account.title') }} > {{ $t('menus.account.staff') }}
                <div class="pull-right">
                    <g-link to="/account/staff-regist/" role="button" class="btn btn-sm btn-primary">{{ $t('btnRegist') }}</g-link>
                </div>
                <div class="clearfix"></div>
            </div>
            
            <!-- Search Start -->
            <div class="card-body">
                <form name="staffListFm" class="form-horizontal" role="form" @submit.prevent="onSearch">
                    <div class="form-row">
                        <label for="inputSelect" class="col-sm-2 col-form-label">{{ $t('pageMsg.staff.title1') }}</label>
                        <div class="form-group col-md-4">
                            <select id="inputSelect" class="form-control" v-model="groupSelected" @change="teamSearch">
                                <option value="">{{ $t('defaultSelect') }}</option>
                                <option v-for="group in groups" :key="group.groupCode" :value="group.groupCode">{{ group.groupName }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="inputSelect" class="col-sm-2 col-form-label">{{ $t('pageMsg.staff.title2') }}</label>
                        <div class="form-group col-md-4">
                            <select id="inputSelect" class="form-control" v-model="teamSelected" @change="adminSearch">
                                <option value="">{{ $t('defaultSelect') }}</option>
                                <option v-for="team in teams" :key="team.groupCode" :value="team.groupCode">{{ team.groupName }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="keyword" class="col-sm-2 col-form-label">{{ $t('pageMsg.staff.title3') }}</label>
                        <div class="form-group col-sm-1">
                            <select class="form-control" name="searchType">
                                <option value="mamberName">{{ $t('name') }}</option>
                            </select>
                        </div>
                        <div class="form-group col-sm-4">
                            <input type="text" class="form-control" id="keyword" name="keyword" value="" :placeholder="$t('searchbarPlaceholder')">
                        </div>
                        <div class="form-group col-sm-3">
                            <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i> {{ $t('btnSearch') }}</button>&nbsp;
                            <button type="button" class="btn btn-outline-secondary" @click="reset"><i class="fa fa-refresh"></i> {{ $t('btnReset') }}</button>
                        </div>
                    </div>
                </form>
            </div>
            <!-- Search End -->

            <!-- List Start -->
            <div class="card-body">
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr class="text-center">
                            <th>{{ $t('pageMsg.staff.title4') }}</th>
                            <th>{{ $t('pageMsg.staff.title5') }}</th>
                            <th>{{ $t('pageMsg.staff.title6') }}</th>
                            <th>{{ $t('pageMsg.staff.title7') }}</th>
                            <th>{{ $t('pageMsg.staff.title8') }}</th>
                            <th>{{ $t('pageMsg.staff.title9') }}</th>
                            <th>{{ $t('pageMsg.staff.title10') }}</th>
                            <th>{{ $t('pageMsg.staff.title11') }}</th>
                            <th>{{ $t('pageMsg.staff.title12') }}</th>
                            <th>{{ $t('pageMsg.staff.title13') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="this.totalCount <= 0" class="text-center">
                            <td colspan="10"><h5><em>{{ $t('ListDataEmpty') }}</em></h5></td>
                        </tr>
                        <tr v-else v-for="(admin, index) in admins" :key="admin.adminId" class="text-center">
                            <td>{{ totalCount - index }}</td>
                            <td>{{ admin.mid }}</td>
                            <td>{{ admin.name }}</td>
                            <td>
                                <template v-if="admin.position == 'leader'">
                                    {{ $t('leader') }}
                                </template>
                                <template v-else>
                                    {{ $t('follower') }}
                                </template>
                            </td>
                            <td>{{ admin.gname }}</td>
                            <td>{{ admin.inphone }}</td>
                            <td>{{ admin.phone }}</td>
                            <td>{{ admin.mail }}</td>
                            <td>{{ admin.sdate }}</td>
                            <td>
                                <g-link :to="'/account/staff-detail/?idx='+admin.mno" role="button" class="btn btn-outline-secondary"><i class="fa fa-search-plus"></i>{{ $t('btnDetail') }}</g-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- List End -->
        </div>
    </Layout>
</template>

<script>
export default {
    
     data: function() {
        return {
            groups: {},
            teams: {},
            admins: {},
            totalCount: 0,
            groupSelected: '',
            teamSelected: ''
        };
    },
    methods: {
        async init() {
            this.$status = {
                getGroup: false,
                getTeam: false,
                getAdmin: false
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
        async adminSearch() {
            if (this.teamSelected == '') {
                this.admins = {};
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
                    if (response.data.code == 200) {
                        $('input[name=keyword]').val('');
                        this.admins = response.data.msg.data;
                        this.totalCount = Object.keys(this.admins).length;
                    } else {
                        console.log(response);
                        alert(this.$i18n.t('errMsg.http_err'));
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
                }
            }
        },
        async onSearch() {
            let searchType = $('select[name=searchType]').val();
            let searchValue = $('input[name=keyword]').val();
            if (searchType == '' || searchValue == '') {
                return false;
            }
            if (this.$status.getAdmin === true) {
                return false;
            }
            this.$status.getAdmin = true;
            try {
                let response = await this.$http({
                    method: 'get',
                    url: '/godoService/manager/members/'+searchType,
                    params: {
                        secureYn: 'Y',
                        searchValue: searchValue
                    },
                    headers: {
                        reqMno: this.getUserSession.mno
                    }
                });
                this.$status.getAdmin = false;
                if (response.data.msg.resultCode == 0) {
                    this.groupSelected = '';
                    this.teamSelected = '';
                    this.teams = {};
                    this.admins = response.data.msg.data;
                    this.totalCount = Object.keys(this.admins).length;
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
            }
        },
        reset() {
            this.groupSelected = '';
            this.teamSelected = '';
            this.teams = {};
            this.admins = {};
            this.totalCount = 0;
            $('input[name=keyword]').val('');
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