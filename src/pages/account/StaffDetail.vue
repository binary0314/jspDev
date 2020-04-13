<template>
    <Layout>
        <div class="card">
            <div class="card-header">{{ $t('menus.account.title') }} > {{ $t('menus.account.staff') }} > 계정 수정</div>
            <div class="card-body">
                <form name="staffDetailFm" class="form-horizontal" role="form" @submit.prevent="onSave">
                    <input type="hidden" name="mid" :value="adminInfo.mid"/>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">이름</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" readonly class="form-control-plaintext" :value="adminInfo.name">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">아이디</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" readonly class="form-control-plaintext" :value="adminInfo.mid">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">사번</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" readonly class="form-control-plaintext" :value="adminInfo.mcode">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">입사일</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="sdate" :value="adminInfo.sdate" placeholder="yyyy-mm-dd">
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">소속/직책</label>
                                <div class="form-group col-md-4">
                                    <select class="form-control" name="gcode[]">
                                        <option value="">선택하세요</option>
                                        <option v-for="group in groups" :key="group.groupCode" :value="group.groupCode" :selected="group.groupCode == adminInfo.gcode">{{ group.groupName }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <select class="form-control" name="position[]">
                                        <option value="follower" :selected="adminInfo.position == 'follower'">구성원</option>
                                        <option value="leader" :selected="adminInfo.position == 'leader'">리더</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">이메일</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="mail" :value="adminInfo.mail">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">휴대전화</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="phone" :value="adminInfo.phone" placeholder="- 제외">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">내선번호</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="inline" :value="adminInfo.inline" placeholder="4자리">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">관리자 IP</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="ip" :value="adminInfo.ip">
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <div class="col-sm-12 text-center">
                                    <button type="submit" class="btn btn-primary btn-lg"><i class="fa fa-check"></i> 수정하기</button>&nbsp;
                                    <g-link to="/account/staff" role="button" class="btn btn-outline-secondary btn-lg"><i class="fa fa-list"></i> 목록</g-link>
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
let App = {
    
     data: function() {
        return {
            idx: this.$route.query.idx,
            adminInfo: {},
            groups: {}
        };
    },
    methods: {
        init: function() {
            if (this.idx <= 0) {
                alert(this.$i18n.t('errMsg.http_err'));
                history.back();
            }
            axios.get('http://local-nhngodo.co.jp:8080/godoService/member/admin', {
                params: {
                    secureYn: 'N',
                    searchType: 'mno',
                    searchValue: this.idx
                }
            }).then(response => {
                if (response.data.msg.resultCode == 0) {
                    this.adminInfo = response.data.msg.data[0];
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
                history.back();
            });
            axios.get('http://local-nhngodo.co.jp:8080/godoService/member/group', {
                params: {
                    searchTarget: 'team',
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
        onSave: function() {
            if ($('input[name=sdate]').val().length <= 0) {
                alert('다음 항목을 입력하세요 : 입사일');
                $('input[name=sdate]').focus();
                return false;
            }
            if ($("select[name='gcode[]']:eq(0)").val().length <= 0) {
                alert('다음 항목을 입력하세요 : 소속/직책');
                $("select[name='gcode[]']").focus();
                return false;
            }
            if ($('input[name=mail]').val().length <= 0) {
                alert('다음 항목을 입력하세요 : 이메일');
                $('input[name=mail]').focus();
                return false;
            }
            if ($('input[name=phone]').val().length <= 0) {
                alert('다음 항목을 입력하세요 : 휴대전화');
                $('input[name=phone]').focus();
                return false;
            }
            axios({
                method: 'put',
                url: 'http://local-nhngodo.co.jp:8080/godoService/member/admin/'+this.idx,
                data: $('form[name=staffDetailFm]').serialize()
            }).then(response => {
                if (response.status === 204) {
                    alert(this.$i18n.t('sucMsg.update_suc'));
                    this.$router.push('/account/staff');
                }
            }).catch(error => {
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
            });
        }
    },
    created: function() {
        this.init();
    }
}
export default App
</script>

<style>

</style>