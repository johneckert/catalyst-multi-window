import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import Vuex from "vuex";
import App from "./App.vue";
import "jscatalyst/dist/jscatalyst.min.js";
import "jscatalyst/dist/jscatalyst.min.css";
import "../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../node_modules/ag-grid/dist/styles/ag-theme-balham.css";
import { routes } from "./routes";
import { data, gridCols } from "./data";

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({ mode: "history", routes });

const store = new Vuex.Store({
  state: {
    data,
    gridCols,
    options: {},
    height: 500
  },
  getters: {
    options: state => state.options,
    height: state => state.height,
    data: state => state.data,
    gridCols: state => state.gridCols
  }
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount("#app");
