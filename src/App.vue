<template>
    <div id="app">
        <v-main-wrapper/>
    </div>
</template>

<script>
    import vMainWrapper from './components/v-main-wrapper'

    export default {
        name: 'App',
        components: {
            vMainWrapper,
        },
        mounted() {
            // window.addEventListener('resize', function () {
            //     if (window.innerWidth > 767){
            //         console.log('Descktop');
            //     } else {
            //         console.log('Mobile')
            //     }
            // })
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 90px;
    }
</style>
