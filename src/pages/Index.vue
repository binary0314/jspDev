<template>
    <Layout>
        <g-image alt="Example image" src="~/favicon.png" width="135" />

        <h1>{{ title }}</h1>
        <p>INDEX 페이지 입니다.</p>
    </Layout>
</template>

<script>
// load js

export default {
    data() {
        return {
            title: "GOMS main"
        };
    },
    mounted: function() {
        
    }
};
</script>

<style>
.home-links a {
    margin-right: 1rem;
}
</style>