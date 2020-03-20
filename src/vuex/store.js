import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        cart: []
    }, // хранение коллекций и т.п
    mutations: {
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
        REMOVE_FROM_CART: (state, index) =>{
            state.cart.splice(index, 1)
        }
    }, // изменяет state
    actions: {
        GET_PRODUCTS_FROM_API({commit}){
            return axios('http://localhost:3000/products', { // axios аналог fetch у vue
                method: 'GET'
            })
                .then((products) => {
                    commit('SET_PRODUCTS_TO_STATE', products.data)
                    return products
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },
        ADD_TO_CART({commit}, product){
            commit('SET_CART', product)
        },
        DELETE_FROM_CART({commit}, index){
            commit('REMOVE_FROM_CART', index)
        }
    },
    getters: {
        PRODUCTS(state){
            return state.products;
        },
        CART(state){
            return state.cart;
        }
    }
})

export default store;