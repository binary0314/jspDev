<template>
    <Layout>
        <div class="card">
            <div class="card-header">
                {{ $t('menus.account.title') }} > {{ $t('menus.account.staff') }}
                <div class="pull-right">
                    <g-link to="/account/staff-regist" role="button" class="btn btn-sm btn-primary">등록하기</g-link>
                </div>
                <div class="clearfix"></div>
            </div>
            
            <!-- Search Start -->
            <div class="card-body">
                <form name="staffListFm" class="form-horizontal" role="form" @submit.prevent="onSearch">
                    <div class="form-row">
                        <label for="inputSelect" class="col-sm-1 col-form-label">조직 검색</label>
                        <div class="form-group col-md-4">
                            <select id="inputSelect" class="form-control" v-model="groupSelected" @change="teamSearch">
                                <option value="">선택하세요</option>
                                <option v-for="group in groups" :key="group.groupCode" :value="group.groupCode">{{ group.groupName }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="inputSelect" class="col-sm-1 col-form-label">팀 검색</label>
                        <div class="form-group col-md-4">
                            <select id="inputSelect" class="form-control" v-model="teamSelected" @change="adminSearch">
                                <option value="">선택하세요</option>
                                <option v-for="team in teams" :key="team.groupCode" :value="team.groupCode">{{ team.groupName }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="keyword" class="col-sm-1 col-form-label">상세 조건</label>
                        <div class="form-group col-sm-1">
                            <select class="form-control" name="searchType">
                                <option value="name">이름</option>
                            </select>
                        </div>
                        <div class="form-group col-sm-4">
                            <input type="text" class="form-control" id="keyword" name="keyword" value="" placeholder="검색명">
                        </div>
                        <div class="form-group col-sm-3">
                            <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i> 검색</button>&nbsp;
                            <button type="button" class="btn btn-outline-secondary" @click="reset"><i class="fa fa-refresh"></i> 초기화</button>
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
                            <th>번호</th>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>직위</th>
                            <th>직책/소속</th>
                            <th>내선번호</th>
                            <th>연락처</th>
                            <th>메일주소</th>
                            <th>입사일</th>
                            <th>명령</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="this.totalCount <= 0" class="text-center">
                            <td colspan="10"><h5><em>리스트 결과가 없습니다.</em></h5></td>
                        </tr>
                        <tr v-else v-for="(admin, index) in admins" :key="admin.adminId" class="text-center">
                            <td>{{ totalCount - index }}</td>
                            <td>{{ admin.mid }}</td>
                            <td>{{ admin.name }}</td>
                            <td>
                                <template v-if="admin.position == 'leader'">
                                    팀장
                                </template>
                                <template v-else>
                                    팀원
                                </template>
                            </td>
                            <td>{{ admin.gname }}</td>
                            <td>{{ admin.inphone }}</td>
                            <td>{{ admin.phone }}</td>
                            <td>{{ admin.mail }}</td>
                            <td>{{ admin.sdate }}</td>
                            <td>
                                <g-link :to="'/account/staff-detail?idx='+admin.mno" role="button" class="btn btn-outline-secondary"><i class="fa fa-search-plus"></i>상세</g-link>
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
        init: function() {
            axios.get('http://local-nhngodo.co.jp:8080/godoService/member/group', {
                params: {
                    searchTarget: 'group',
                    searchValue: 'all'
                }
            }).then(response => {
                if (response.data.msg.resultCode == 0) {
                    this.groups = response.data.msg.data;
                }
            }).catch(error => {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                alert(this.$i18n.t('errMsg.http_err'));
            });
        },
        teamSearch: function() {
            if (this.groupSelected == '') {
                this.teams = {};
            } else {
                axios.get('http://local-nhngodo.co.jp:8080/godoService/member/group', {
                    params: {
                        searchTarget: 'team',
                        searchType: 'group',
                        searchValue: this.groupSelected
                    }
                }).then(response => {
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
                }).catch(error => {
                    if (error.response) {
                        console.log(error.response);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                    alert(this.$i18n.t('errMsg.http_err'));
                    
                });
            } 
        },
        adminSearch: function() {
            if (this.teamSelected == '') {
                this.admins = {};
            } else {
                axios.get('http://local-nhngodo.co.jp:8080/godoService/member/admin', {
                    params: {
                        secureYn: 'Y',
                        searchType: 'gcode',
                        searchValue: this.teamSelected
                    }
                }).then(response => {
                    if (response.data.msg.resultCode == 0) {
                        $('input[name=keyword]').val('');
                        this.admins = response.data.msg.data;
                        this.totalCount = Object.keys(this.admins).length;
                    }
                }).catch(error => {
                    if (error.response) {
                        console.log(error.response);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                    alert(this.$i18n.t('errMsg.http_err'));
                });
            }
        },
        onSearch: function() {
            let searchType = $('select[name=searchType]').val();
            let searchValue = $('input[name=keyword]').val();
            if (searchType == '' || searchValue == '') {
                return false;
            }
            axios.get('http://local-nhngodo.co.jp:8080/godoService/member/admin', {
                params: {
                    secureYn: 'Y',
                    searchType: searchType,
                    searchValue: searchValue
                }
            }).then(response => {
                if (response.data.msg.resultCode == 0) {
                    this.groupSelected = '';
                    this.teamSelected = '';
                    this.teams = {};
                    this.admins = response.data.msg.data;
                    this.totalCount = Object.keys(this.admins).length;
                }
            }).catch(error => {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                alert(this.$i18n.t('errMsg.http_err'));
                
            });
        },
        reset: function() {
            this.groupSelected = '';
            this.teamSelected = '';
            this.teams = {};
            this.admins = {};
            this.totalCount = 0;
            $('input[name=keyword]').val('');
        }
    },
    mounted: function() {
        this.init();
    }
}
</script>

<style>

</style>