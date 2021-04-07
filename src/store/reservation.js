import axios from "axios";
import qs from "querystring"

export default {

    namespaced: true,
    state: {
        reservationList: []
    },
    mutations: {
        LOAD_RESERVATION(state, payloads) {
            state.reservationList = payloads.orders
        }
    },
    actions: {
        async LOAD_RESERVATION({commit}) {
            let token = sessionStorage.getItem("token");
            let reservation = await
                axios.get("http://localhost:8080/library/order/list", {
                    headers: {'Authorization': token}
                }).then(data => data.data);
            if (reservation.code === 200) {
                commit("LOAD_RESERVATION", {orders: reservation.orders})
            }
        },
        async CHANGE_RESERVATION_STATUS({dispatch}, payloads) {
            let token = sessionStorage.getItem("token");
            let reservation = await
                axios.put("http://localhost:8080/library/order/modifyStatus",
                    qs.stringify(payloads),
                    {
                        headers: {
                            'Authorization': token,
                            'Content-Type': "application/x-www-form-urlencoded"
                        }
                    }).then(data => data.data);
            if (reservation.code === 200) {
                await dispatch("LOAD_RESERVATION")
            }
        }
    }
}
