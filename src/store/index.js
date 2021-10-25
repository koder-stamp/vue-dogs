import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import main from "./main";

export const store = new Vuex.Store({
    modules: {
        main,
    },
})