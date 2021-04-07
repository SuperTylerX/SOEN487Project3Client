import axios from "axios";


export default {

    namespaced: true,
    state: {
        userInfo: {}
    },
    mutations: {
        CHANGE_USERINFO(state, payloads) {
            state.userInfo = payloads.userInfo
        }
    },
    actions: {
        async CHANGE_USERINFO({commit}) {
            let token = sessionStorage.getItem("token");
            if (!token) {
                throw new Error("Token Expired");
            }
            let userInfo = await
                axios.get("http://localhost:8080/library/auth/user", {
                    headers: {'Authorization': token}
                }).then(data => data.data);
            if (userInfo.code === 200) {
                commit("CHANGE_USERINFO", {userInfo: userInfo.data})
            } else {
                throw new Error("Token Expired");
            }
        }
    }
}
