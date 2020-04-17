<template>
    <Layout>
    </Layout>
</template>

<script>
export default {

    data: function() {
        return {
            adminInfo: {},
            menuAuth: {}
        };
    },
    methods: {
        async login() {
            // localStorage.setItem("_t", new Date().getTime());
            // this.loginAssign();
        },
        loginAssign() {
            this.$store.dispatch('setAdminData', this.adminInfo)
        },
        menuAuthAssign() {

        }
    },
    mounted: function() {
        this.login();
    }

}
</script>

<style>

</style>