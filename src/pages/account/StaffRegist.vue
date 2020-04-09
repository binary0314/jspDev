<template>
    <Layout>
        <div class="card">
            <div class="card-header">계정관리 > 임직원 계정관리 > 계정등록</div>
            <div class="card-body">
                <form class="form-horizontal" role="form" action="">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">이름</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="adminNm" value="">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">아이디</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="adminId" value="">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">사번</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="adminCode" value="">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">입사일</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="startDate" value="" placeholder="yyyy-mm-dd">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">비밀번호</label>
                                <div class="form-group col-sm-4">
                                    <input type="password" class="form-control" name="adminPw" value="">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">비밀번호 확인</label>
                                <div class="form-group col-sm-4">
                                    <input type="password" class="form-control" name="adminPwConfirm" value="">
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">소속/직책</label>
                                <div class="form-group col-md-4">
                                    <select class="form-control" name="groupCode">
                                        <option>선택하세요</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-1">
                                    <select class="form-control" name="groupPosition">
                                        <option value="follower">구성원</option>
                                        <option value="leader">리더</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">이메일</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="adminMail" value="">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">휴대전화</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="adminPhone" value="" placeholder="- 포함">
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">내선번호</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="indoorline" value="" placeholder="4자리">
                                </div>
                                <label class="col-sm-1 ml-5 col-form-label">관리자 IP</label>
                                <div class="form-group col-sm-4">
                                    <input type="text" class="form-control" name="adminIp" value="">
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
export default {

}
</script>

<style>

</style>