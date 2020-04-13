<template>
    <Layout>
        <div class="card">
            <div class="card-header">{{ $t('menus.account.title') }} > {{ $t('menus.account.staff') }} > 계정등록</div>
            <div class="card-body">
                <form name="staffRegistFm" class="form-horizontal" role="form" @submit.prevent="onSave">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">이름</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="name" value="">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">아이디</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="mid" value="">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">사번</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="mcode" value="">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">입사일</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="sdate" value="" placeholder="yyyy-mm-dd">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">비밀번호</label>
                                <div class="form-group col-sm-4">
                                    <input type="password" class="form-control" name="pass" value="">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">비밀번호 확인</label>
                                <div class="form-group col-sm-4">
                                    <input type="password" class="form-control" name="confirm" value="">
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">소속/직책</label>
                                <div class="form-group col-md-4">
                                    <select class="form-control" name="gcode[]">
                                        <option value="">선택하세요</option>
                                        <option v-for="group in groups" :key="group.groupCode" :value="group.groupCode">{{ group.groupName }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <select class="form-control" name="position[]">
                                        <option value="follower">구성원</option>
                                        <option value="leader">리더</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">이메일</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="mail" value="">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">휴대전화</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="phone" value="" placeholder="- 제외">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">내선번호</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="inline" value="" placeholder="4자리">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">관리자 IP</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="ip" value="">
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <div class="col-sm-12 text-center">
                                    <button type="submit" class="btn btn-primary btn-lg"><i class="fa fa-check"></i> 저장하기</button>&nbsp;
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
            groups: {}
        };
    },
    methods: {
        init: function() {
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
            if ($('input[name=name]').val().length <= 0) {
                alert('다음 항목을 입력하세요 : 이름');
                $('input[name=name]').focus();
                return false;
            }
            if ($('input[name=mid]').val().length <= 0) {
                alert('다음 항목을 입력하세요 : 아이디');
                $('input[name=mid]').focus();
                return false;
            }
            if ($('input[name=mcode]').val().length <= 0) {
                alert('다음 항목을 입력하세요 : 사번');
                $('input[name=mcode]').focus();
                return false;
            }
            if ($('input[name=sdate]').val().length <= 0) {
                alert('다음 항목을 입력하세요 : 입사일');
                $('input[name=sdate]').focus();
                return false;
            }
            if ($('input[name=pass]').val().length <= 0) {
                alert('다음 항목을 입력하세요 : 비밀번호');
                $('input[name=pass]').focus();
                return false;
            }
            if ($('input[name=confirm]').val().length <= 0) {
                alert('다음 항목을 입력하세요 : 비밀번호 확인');
                $('input[name=confirm]').focus();
                return false;
            }
            if ($('input[name=pass]').val() !== $('input[name=confirm]').val()) {
                alert('비밀번호가 일치하지 않습니다.');
                $('input[name=confirm]').focus();
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
                method: 'post',
                url: 'http://local-nhngodo.co.jp:8080/godoService/member/admin',
                data: $('form[name=staffRegistFm]').serialize()
            }).then(response => {
                if (response.status === 204) {
                    alert(this.$i18n.t('sucMsg.regist_suc'));
                    this.$router.push('/account/staff');
                }
            }).catch(error => {
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
            });
        }
    },
    mounted: function() {
        this.init();
    }
}
export default App
</script>

<style>

</style>