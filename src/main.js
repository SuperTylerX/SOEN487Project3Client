import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iviewui from "view-design";
import locale from 'view-design/dist/locale/en-US';


Vue.use(iviewui, {locale});
Vue.config.productionTip = false;

router.afterEach((to) => {
    store.commit("CHANGEROUTER", {to});
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

Date.prototype.format = function (fmt) {
    const o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (const k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
