<template>
    <Layout>
        <div class="card">
            <div class="card-header">{{ $t('menus.account.title') }} > {{ $t('menus.account.menu_auth') }}</div>
            
            <div class="card-body">
                <form name="staffRegistFm" class="form-horizontal" role="form" @submit.prevent="onSave">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">메뉴선택</label>
                                <div class="form-group col-sm-11 row">
                                    <div v-for="gnb in menus" :key="gnb.lang" class="dropdown">
                                        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                                            {{ $t(gnb.lang) }}
                                        </button>&nbsp;
                                        <div class="dropdown-menu">
                                            <a v-for="gnbSub in gnb.pages" :key="gnbSub.lang" class="dropdown-item" @click="menuSelected(gnbSub.path, gnbSub.lang)">{{ $t(gnbSub.lang) }}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row" v-if="selectedPath != '' && selectedLang != ''">
                                <label class="col-sm-1 col-form-label">선택된 메뉴</label>
                                <div class="form-group col-sm-11">
                                    <input type="text" readonly class="form-control-plaintext" :value="$t(selectedLang)">
                                </div>
                            </div>
                            <div class="form-row" v-if="selectedPath != '' && selectedLang != ''">
                                <label class="col-sm-1 col-form-label">권한 리스트</label>
                                <span v-for="eachManager in menuAuth" :key="eachManager.id">
                                    <button type="button" class="btn btn-light" @click="removeManager(eachManager.id)" style="margin-bottom: 5px;">
                                        {{ eachManager.name }}<i class="fa fa-times text-danger"></i>
                                    </button>&nbsp;
                                </span>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="form-row">
                                <label class="col-sm-1 col-form-label">관리자 선택</label>
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
            menus: menus,
            menuAuth: {},
            selectedPath: '',
            selectedLang: ''
        };
    },
    methods: {
        menuSelected: function(path, lang) {
            this.selectedPath = path;
            this.selectedLang = lang;

            
        }
    },
    mounted: function() {
        
    }
}
export default App
</script>

<style>

</style>