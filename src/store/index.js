import Vue from 'vue'
import Vuex from 'vuex'

import libraryStore from "@/store/libraryStore";
import userStore from "@/store/userStore";
import myReservation from "@/store/reservation";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        routerName: "",
    },
    mutations: {
        CHANGEROUTER(state, payloads) {
            state.routerName = payloads.to.name;
        },
    },
    actions: {},
    modules: {
        libraryStore,
        userStore,
        myReservation
    }
})
