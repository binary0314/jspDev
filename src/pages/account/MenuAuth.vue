<template>
    <Layout>
        <div class="card">
            <div class="card-header">{{ $t('menus.account.title') }} > {{ $t('menus.account.menu_auth') }}</div>
            
            <div class="card-body">
                <form name="staffRegistFm" class="form-horizontal" role="form" @submit.prevent="onSave">
                    <ul class="list-group">
                         <li class="list-group-item">
                            <div class="form-row">
                                <div v-for="gnb in menus" :key="gnb.lang" class="dropdown">
                                    <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                                        {{ $t(gnb.lang) }}
                                    </button>&nbsp;
                                    <div class="dropdown-menu">
                                        <a v-for="gnbSub in gnb.pages" :key="gnbSub.lang" class="dropdown-item" href="#">{{ $t(gnbSub.lang) }}</a>
                                    </div>
                                </div>
                            </div>
                        </li>
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
// load json
import menus from '~/assets/menu.json';

let App = {
    
     data: function() {
        return {
            menus: menus
        };
    },
    methods: {
    },
    created: function() {
        
    }
}
export default App
</script>

<style>

</style>