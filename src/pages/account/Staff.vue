<template>
    <Layout>
        <div class="card">
            <div class="card-header">
                계정관리 > 임직원 계정관리
                <div class="pull-right">
                    <a href="staff-regist" role="button" class="btn btn-sm btn-primary">등록하기</a>
                </div>
                <div class="clearfix"></div>
            </div>
            
            <!-- Search Start -->
            <div class="card-body">
                <form class="" role="form" action="">
                    <div class="form-row">
                        <label for="inputSelect" class="col-sm-1 col-form-label">조직 검색</label>
                        <div class="form-group col-md-4">
                            <select id="inputSelect" class="form-control">
                                <option value="" selected>선택하세요</option>
                                <option v-for="group in groups" :key="group.groupCode" :value="group.groupCode">{{ group.groupName }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="inputSelect" class="col-sm-1 col-form-label">팀 검색</label>
                        <div class="form-group col-md-4">
                            <select id="inputSelect" class="form-control">
                                <option value="" selected>선택하세요</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="keyword" class="col-sm-1 col-form-label">상세 조건</label>
                        <div class="form-group col-sm-1">
                            <select class="form-control" name="">
                                <option value="">이름</option>
                                <option value="">연락처</option>
                            </select>
                        </div>
                        <div class="form-group col-sm-4">
                            <input type="text" class="form-control" id="keyword" name="" value="" placeholder="검색명">
                        </div>
                        <div class="form-group col-sm-3">
                            <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i> 검색</button>&nbsp;
                            <button type="button" class="btn btn-outline-secondary" onClick="location.href='';"><i class="fa fa-refresh"></i> 초기화</button>
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
                        <tr>
                            <td colspan="10" class="text-center"><h5><em>리스트 결과가 없습니다.</em></h5></td>
                        </tr>
                        <!--tr>
                            <td>Tiger Nixon </td>
                            <td>System Architect</td>
                            <td>Edinburgh</td>
                            <td class="text-center">61</td>
                            <td class="text-center">2011/04/25</td>
                            <td class="text-right">$320,800</td>
                            <td class="text-center">
                                <button class="btn btn-default btn-data-layer">레이어</button>
                                <a href="#" role="button" class="btn btn-default"><i class="fa fa-search-plus"></i>상세</a>
                                <button class="btn btn-danger btn-data-delete" data-num="<?php echo $data['list primary key'];?>"><i class="fa fa-trash"></i>삭제</button>
                            </td>
                        </tr-->
                    </tbody>
                </table>
            </div>
            <!-- List End -->
            
        </div>
    </Layout>
</template>

<script>
const App = {
    
     data: function() {
        return {
            groups: [{"groupCode":"management_personnel","groupName":"재무 경영실"},{"groupCode":"hosting","groupName":"호스팅 사업실"},{"groupCode":"management","groupName":"???"},{"groupCode":"bizplan","groupName":"EC 사업실"},{"groupCode":"development","groupName":"개발실"},{"groupCode":"edu_design","groupName":"EC 디자인실"}],
            teams: {},
            admins: {}
        };
    },
    methods: {
        init: function() {
            axios.get('http://local-nhngodo.co.jp:8080/godoService/member/group', {
                params: {
                    searchType: 'group',
                    groupCode: 'all'
                }
            }).then(function(response) {
                if (response.data.resultCode == 0) {
                    //App.groups = JSON.parse(response.data.data);
                }
            }).catch(function (error) {
                if (error.response) {
                    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                    // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                    // Node.js의 http.ClientRequest 인스턴스입니다.
                    console.log(error.request);
                } else {
                    // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                    console.log('Error', error.message);
                }
                // alert(this.$root.$i18n.messages.ko.errMsg.http_fail);
                
            });
        }
    },
    created: function() {
        this.init();
    },
    mounted: function() {
       console.log(App.groups);
       //console.log(this.$root.$i18n);
    }
}
export default App
</script>

<style>

</style>