<template>
    <div class="v-catalog">
        <router-link :to="{name: 'cart', params: {cart_data: CART}}">
            <div class="v-catalog__link_to_cart"> Cart: {{CART.length}}</div>
        </router-link>

        <h1>Catalog</h1>

        <div class="filters">
            <v-select
                    :selected="selected"
                    :options="categories"
                    @select="sortByCategories"
                    class="v-catalog__filter"
            />

            <div class="range-slider">
                <input
                        type="range"
                        min="0"
                        max="1500"
                        step="10"
                        v-model.number="minPrice"
                        @change="setRangeSlider"
                >
                <input
                        type="range"
                        min="0"
                        max="1500"
                        step="10"
                        v-model.number="maxPrice"
                        @change="setRangeSlider"
                >
            </div>
            <div class="range-values">
                <p>Min: {{minPrice}}</p>
                <p>Max: {{maxPrice}}</p>
            </div>
        </div>

        <div class="v-catalog__list">
            <v-catalog-item
                v-for="product in filteredProducts"
                :key="product.article"
                v-bind:product_data="product"
                @addToCart = "addToCart"
            />
        </div>
    </div>

</template>

<script>
    import vCatalogItem from './v-catalog-item';
    import {mapActions, mapGetters} from 'vuex';
    import vSelect from '../v-select'

    export default {
        name: "v-catalog",
        components: {
            vCatalogItem,
            vSelect
        },
        props: {},
        data() {
            return {
                categories: [
                    { name: 'All', value: 'ALL' },
                    { name: 'Male', value: 'M' },
                    { name: 'Female', value: 'F' },
                ],
                selected: 'ALL',
                sortedProducts: [],
                minPrice: 0,
                maxPrice: 1500
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'CART'
            ]),
            filteredProducts(){
                if (this.sortedProducts.length){
                    return this.sortedProducts
                } else {
                   return  this.PRODUCTS
                }
            }
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_CART'
            ]),
            setRangeSlider(){
                if (this.minPrice > this.maxPrice){
                    let tmp = this.maxPrice
                    this.maxPrice = this.minPrice
                    this.minPrice = tmp
                }
            },
            sortByCategories(category){
                this.sortedProducts = [];
                let vm = this
                this.PRODUCTS.map(function (item) {
                    if (item.category === category.name){
                        vm.sortedProducts.push(item)
                    }
                })
                this.selected = category.name
            },
            addToCart(data){
                // console.log(data);
                this.ADD_TO_CART(data);
            }
        },
        mounted() {
            this.GET_PRODUCTS_FROM_API()
            .then(response => {
                if (response.data){
                    return 'Data arrived!'
                }
            })
        }
    }
</script>

<style lang="scss">
    .v-catalog{
        &__list{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
        }
        &__link_to_cart{
            position: absolute;
            top: 15px;
            right: 15px;
            padding: $padding*2;
            border: 1px solid $linkToCart;
            text-transform: uppercase;
            color: $mainTextColor;

            &:hover {
                background: $linkToCart;
                color: $btnTextColor;
                outline: 2px solid $linkToCart;
                outline-offset: 3px;
                transition: .3s ease-out;
            }
        }
        &__filter{
            margin-bottom: 20px;
            width: 40%;
        }

        .filters {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .range-slider {
            width: 200px;
            margin: auto 16px;
            text-align: center;
            position: relative;
        }
        .range-slider svg, .range-slider input[type=range] {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 99%;
        }
        input[type=range]::-webkit-slider-thumb {
            z-index: 2;
            position: relative;
            top: 2px;
            margin-top: -7px;
            border-radius: 50%;
        }
    }
</style>