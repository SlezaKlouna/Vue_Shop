<template>
    <div class="v-main-wrapper">

        <p class="v-main-wrapper__title">
            {{title}}
            <span class="v-main-wrapper__title-span">&#10084;</span>
        </p>
        <v-header/>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>

    </div>
</template>

<script>
    import VHeader from "./layouts/v-header";

    export default {
        name: 'v-main-wrapper',
        components: {VHeader},
        props: {}, // то что прилетает из родителя
        data(){ // персональные данные
            return{
                title: 'My shop'
            }
        },
        computed:{},
        methods: {}, // то что отлавливает действия пользователя
        watch: {},
        mounted() { // выполняет действие сразу после загрузки страницы
        }
    }
</script>

<style lang="scss">
    .v-main-wrapper{
        max-width: 1000px;
        margin: 0 auto;

        &__title{
            font-size: 36px;
            text-transform: uppercase;

            &-span{
                /*color: #f44336;*/
                color: #ef5350;
            }
        }
    }
</style>