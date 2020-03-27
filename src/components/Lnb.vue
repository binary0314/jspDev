<template>
    <ul class="list-unstyled components mb-5">
        <li :class="{active: pathname == '/account/staff'}">
            <g-link to="/account/staff">임직원 계정관리</g-link>
        </li>
        <li :class="{active: pathname == '/account/menu-auth'}">
            <g-link to="/account/menu-auth">메뉴별 권한설정</g-link>
        </li>
        <li :class="{active: pathname == '/account/info'}">
            <g-link to="/account/info">개인별 관리<br>(사용자 정보관리 - My Menu)</g-link>
        </li>
    </ul>
</template>

<script>
export default {
    data:function() {
        return {
            pathname:window.location.pathname
        }
    }
}
</script>

<style>

</style>