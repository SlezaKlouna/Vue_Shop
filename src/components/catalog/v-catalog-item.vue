<template>
    <div class="v-catalog-item">


        <v-popup
                v-if="isInfoPopupVisible"
                rightBtnTitle="Add to cart"
                :popupTitle="product_data.name"
                @closePopup="closeInfoPopup"
                @rightBtnAction="addToCart"
        >
            <img class="v-catalog-item__image popup-image" :src="require('../../assets/images/' + product_data.image)"
                 alt="img">
            <div>
                <p class="v-catalog-item__name">{{product_data.name}}</p>
                <p class="v-catalog-item__price">Price: {{product_data.price | toFix | formattedPrice}} </p>
                <p class="v-catalog-item__price">{{product_data.category}}</p>
                <p class="v-catalog-item__price">{{product_data.description}}</p>
            </div>

        </v-popup>


        <img class="v-catalog-item__image" :src="require('../../assets/images/' + product_data.image)" alt="img">
        <p class="v-catalog-item__name">{{product_data.name}}</p>
        <p class="v-catalog-item__price">Price: {{product_data.price | toFix | formattedPrice}} </p>

        <button
                class="btn v-catalog-item__show-info"
                @click="showPopupInfo"
        >
            Show Info
        </button>
        <button
                class="v-catalog-item__add_to_btn btn"
                @click="addToCart">
            Add to cart
        </button>
    </div>
</template>

<script>
    import vPopup from '../popup/v-popup'
    import toFix from "../../filters/toFix";
    import formattedPrice from "../../filters/price-format";

    export default {
        name: "v-catalog-item",
        components: {
            vPopup
        },
        props: {
            product_data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                isInfoPopupVisible: false
            }
        },
        filters: {
            toFix,
            formattedPrice
        },
        computed: {},
        methods: {
            showPopupInfo() {
                this.isInfoPopupVisible = true;
            },
            closeInfoPopup() {
                this.isInfoPopupVisible = false;
            },
            addToCart() {
                this.$emit('addToCart', this.product_data);
            }
        },
        mounted() {
            this.$set(this.product_data, 'quantity', 1);
        }
    }
</script>

<style lang="scss">
    .v-catalog-item {
        flex-basis: 25%;
        box-shadow: 0 0 8px 0 #e0e0e0;
        padding: $padding * 2;
        margin-bottom: $margin * 2;

        &__image {
            max-width: 100%;
            max-height: 60%;
        }

        .popup-image {
            max-width: 40%;
        }
    }
</style>