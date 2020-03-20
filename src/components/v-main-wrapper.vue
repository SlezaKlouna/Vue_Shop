<template>
    <div class="v-main-wrapper">

        <router-view></router-view>

        <p class="v-main-wrapper__title">
            {{title}}
            <span class="v-main-wrapper__title-span">&#10084;</span>
        </p>
<!--        <v-catalog/>-->
<!--        <v-cart-->
<!--                v-if="CART.length"-->
<!--                :cart_data="CART"-->
<!--        />-->
    </div>
</template>

<script>
    // import vCatalog from './v-catalog'
    // import vCart from './v-cart'
    import {mapGetters} from 'vuex'

    export default {
        name: 'v-main-wrapper',
        // components: {
        //     vCatalog,
        //     vCart
        // },
        props: {}, // то что прилетает из родителя
        data(){ // персональные данные
            return{
                title: 'My shop'
            }
        },
        computed:{
            ...mapGetters([
                'CART'
            ]),
        },
        methods: {}, // то что отлавливает действия пользователя
        watch: {},
        mounted() { // выполняет действие сразу после загрузки страницы
        }
    }
</script>

<style lang="scss">
    .v-main-wrapper{
        max-width: 900px;
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