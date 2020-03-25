export default {
    SET_SEARCH_VALUE:(state, value) => {
        state.searchValue = value
    },
    SET_PRODUCTS_TO_STATE: (state, products) => {
        state.products = products;
    },
    SET_CART: (state, prodact) => {
        if (state.cart.length){
            let isProductExist = false;
            state.cart.map(function (item) {
                if (item.article === prodact.article){
                    isProductExist = true;
                    item.quantity++;
                }
            })
            if (!isProductExist){
                state.cart.push(prodact);
            }
        } else {
            state.cart.push(prodact);
        }
    },
    INCREMENT: (state, index) => {
        state.cart[index].quantity++;
    },
    DECREMENT: (state, index) => {
        if (state.cart[index].quantity > 1){
            state.cart[index].quantity--
        }
    },
    REMOVE_FROM_CART: (state, index) =>{
        state.cart.splice(index, 1)
    }
}