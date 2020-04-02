<template>
    <div id="menuGnb" class="row no-gutters sticky-top">
        <div class="col-md-12">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <g-link class="navbar-brand" to="/">GOMS</g-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse ml-sm-5" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle mr-sm-3 active" href="#" role="button" data-toggle="dropdown">
                                {{ $t('menus[0].name') }}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <g-link class="dropdown-item" to="/account/staff">임직원 계정관리</g-link>
                                <g-link class="dropdown-item" to="/account/menu-auth">메뉴별 권한설정</g-link>
                                <g-link class="dropdown-item" to="/account/info">개인별 관리 (사용자 정보관리 - My Menu)</g-link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle mr-sm-3" href="#" role="button" data-toggle="dropdown">
                                {{ $t('menus[1].name') }}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <g-link class="dropdown-item" to="/link">기본상품관리 - Platform 관리</g-link>
                                <g-link class="dropdown-item" to="/link">판매상품관리 - Platform 프로모션</g-link>
                                <g-link class="dropdown-item" to="/link">세팅서버 관리</g-link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle mr-sm-3" href="#" role="button" data-toggle="dropdown">
                                {{ $t('menus[2].name') }}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <g-link class="dropdown-item" to="/link">shopby 신청 List</g-link>
                                <g-link class="dropdown-item" to="/link">shopby 신청 상세</g-link>
                                <g-link class="dropdown-item" to="/link">관리자 팝업 관리</g-link>
                                <g-link class="dropdown-item" to="/link">정식도메인 신청 관리</g-link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle mr-sm-3" href="#" role="button" data-toggle="dropdown">
                                부가서비스
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <g-link class="dropdown-item" to="/link">PG 신청 중앙화 관리</g-link>
                                <g-link class="dropdown-item" to="/link">shopby 신청 상세</g-link>
                                <g-link class="dropdown-item" to="/link">전자세금계산서 서비스</g-link>
                                <g-link class="dropdown-item" to="/link">보안서버 신청 관리</g-link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle mr-sm-3" href="#" role="button" data-toggle="dropdown">
                                재무회계
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <g-link class="dropdown-item" to="/link">서비스 해지 관리</g-link>
                                <g-link class="dropdown-item" to="/link">현금영수증관리</g-link>
                                <g-link class="dropdown-item" to="/link">네온 관리</g-link>
                                <g-link class="dropdown-item" to="/link">세금계산서 관리</g-link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle mr-sm-3" href="#" role="button" data-toggle="dropdown">
                                게시판 관리
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <g-link class="dropdown-item" to="/link">1:1문의</g-link>
                                <g-link class="dropdown-item" to="/link">공지사항 관리</g-link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle mr-sm-3" href="#" role="button" data-toggle="dropdown">
                                통계
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <g-link class="dropdown-item" to="/link">솔루션 신청</g-link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle mr-sm-3" href="#" role="button" data-toggle="dropdown">
                                로그관리
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <g-link class="dropdown-item" to="/link">System Mail 발송 로그</g-link>
                                <g-link class="dropdown-item" to="/link">goms 로그인 로그</g-link>
                                <g-link class="dropdown-item" to="/link">권한설정 로그</g-link>
                            </div>
                        </li>
                    </ul>
                    <span class="navbar-text ml-sm-3">
                        <i class="fa fa-user"></i> 정보시스템개발팀 박재성
                    </span>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            pathname: null
        };
    },
    methods: {
        setData: function() {
            if (typeof window !== "undefined") {
                this.pathname = window.location.pathname;
            }
        }
    },
    mounted: function() {
        this.setData();
    }
};
</script>

<style>

</style>