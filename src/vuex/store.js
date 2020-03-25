import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

import commonActions from "./actions/actions"
import apiRequests from './actions/api-requests'
import getters from "./getters/getters";
import mutations from "./mutations/mutations";

const actions = {...commonActions, ...apiRequests};

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        searchValue: '',
        products: [],
        cart: []
    }, // хранение коллекций и т.п
    mutations, // изменяет state
    actions,
    getters,
})

export default store;