<template>
    <div class="v-header">
        <div class="header">

        </div>
        <router-link :to="{name: 'home'}">
            <img src="../../assets/images/like.png" alt="logo">
        </router-link>

        <div class="nav-menu">
            <router-link :to="{name: 'home'}">
                <p class="nav-menu__link">Home</p>
            </router-link>
            <router-link :to="{name: 'catalog'}">
                <p class="nav-menu__link">Catalog</p>
            </router-link>
            <router-link :to="{name: 'cart'}">
                <p class="nav-menu__link"> cart </p>
            </router-link>
        </div>

        <label for="" class="search-label">
            <i class="material-icons search-icon">search</i>
            <input
                    type="text"
                    class="search-field"
                    placeholder="Search..."
                    v-model="searchValue"
            >
            <button
                    class="search-btn"
                    @click="search(searchValue)"
            >
                Search
            </button>
        </label>
        <button
                class="clear_search-btn"
                @click="clearSearch"
                v-if="SEARCH_VALUE"
        >
            CLEAR SEARCH
        </button>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "v-header",
        data(){
            return{
                searchValue: ''
            }
        },
        computed: {
          ...mapGetters([
              'SEARCH_VALUE'
          ])
        },
        methods: {
            ...mapActions([
                'GET_SEARCH_VALUE'
            ]),
            search(value){
                this.GET_SEARCH_VALUE(value);
                if (this.$route.path !== '/catalog'){
                    this.$router.push('/catalog')
                }
                this.searchValue = ''
            },
            clearSearch(){
                this.GET_SEARCH_VALUE();
                if (this.$route.path !== '/catalog'){
                    this.$router.push('/catalog')
                }
            }
        }
    }
</script>

<style lang="scss">
    .v-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: $mainTextColor;
        padding: $padding;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 11;
        box-sizing: border-box;

        img{
            width: 50px;
            margin-left: $margin;
        }

        .nav-menu{
            width: 40%;
            display: flex;

            &__link{
                padding: 0 10px;
            }
        }

        .search-label{
            position: relative;
            margin-right: $margin;

            .search-field{
                padding: $padding $padding*4;
                outline: none;
                border: none;
            }
            .search-icon{
                color: $mainTextColor;
                position: absolute;
                position: absolute;
                top: 4px;
                left: 2px;
            }
            .search-btn{
                border: none;
                background: $itemColor;
                padding: $padding $padding*4;
                text-transform: uppercase;
                cursor: pointer;
                color: $main-color;
                outline: none;

                &:hover{
                    background: darken($itemColor, 10);
                }
            }
        }
        .clear_search-btn{
            border: none;
            /*padding: 20px 15px;*/
            padding: $padding;
            /*text-transform: uppercase;*/
            cursor: pointer;
            outline: none;
            transition: .3s;
            position: fixed;
            top: 160px;
            left: 10%;

            &:hover{
                background: $primaryColor;
                color: $main-color;
            }
        }

    }
</style>