<template>
    <div class="v-catalog">
        <router-link :to="{name: 'cart', params: {cart_data: CART}}">
            <div class="v-catalog__link_to_cart"> Cart: {{CART.length}}</div>
        </router-link>


        <h1>Catalog</h1>
        <div class="filters_wrapper">
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
        </div>


        <div class="v-catalog__list">
            <v-catalog-item
                    v-for="product in filteredProducts"
                    :key="product.article"
                    v-bind:product_data="product"
                    @addToCart="addToCart"
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
                    {name: 'All', value: 'ALL'},
                    {name: 'Male', value: 'M'},
                    {name: 'Female', value: 'F'},
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
                'CART',
                'SEARCH_VALUE'
            ]),
            filteredProducts() {
                if (this.sortedProducts.length) {
                    return this.sortedProducts
                } else {
                    return this.PRODUCTS
                }
            }
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_CART'
            ]),
            setRangeSlider() {
                if (this.minPrice > this.maxPrice) {
                    let tmp = this.maxPrice
                    this.maxPrice = this.minPrice
                    this.minPrice = tmp
                }
                this.sortByCategories()
            },
            sortByCategories(category) {
                let vm = this;
                this.sortedProducts = [...this.PRODUCTS]
                this.sortedProducts = this.sortedProducts.filter(item => {
                    return item.price >= vm.minPrice && item.price <= vm.maxPrice
                })
                if (category) {
                    this.sortedProducts = this.sortedProducts.filter(el => {
                        vm.selected = category.name
                        return el.category === category.name
                    })
                }
            },
            sortProductsBySerchValue(value){
                this.sortedProducts = [...this.PRODUCTS]
                if (value) {
                    this.sortedProducts = this.sortedProducts.filter(item => {
                        return item.name.toLowerCase().includes(value.toLowerCase())
                    })
                } else {
                    return this.sortedProducts = this.PRODUCTS
                }
            },
            addToCart(data) {
                this.ADD_TO_CART(data);
            },

        },
        watch: {
            SEARCH_VALUE(){
                this.sortProductsBySerchValue(this.SEARCH_VALUE)
            }
        },
        mounted() {
            this.GET_PRODUCTS_FROM_API()
                .then(response => {
                    if (response.data) {
                        console.log('Data arrived!')
                        this.sortByCategories()
                        this.sortProductsBySerchValue(this.SEARCH_VALUE)
                    }
                })
        }
    }
</script>

<style lang="scss">
    .v-catalog {
        &__list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
        }

        &__link_to_cart {
            position: absolute;
            top: 80px;
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

        &__filter {
            margin-bottom: 20px;
            width: 40%;
        }

        .filters {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .range-slider {
            width: 300px;
            height: 15px;
            margin-bottom: 20px;
            text-align: center;
            position: relative;
        }

        .range-slider svg, .range-slider input[type=range] {
            -webkit-appearance: none;
            appearance: none;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            outline: none;
            background-color: lighten($itemColor, 20);
        }

        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            z-index: 2;
            position: relative;
            top: 2px;
            margin-top: -5px;
            width: 12px;
            height: 30px;
            background: $primaryColor;
            cursor: pointer;
        }
    }
</style>