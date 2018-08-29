import GridChan from "./components/GridChan.vue";
import HeatChan from "./components/HeatChan.vue";
import BarChan from "./components/BarChan.vue";
import LineChan from "./components/LineChan.vue";

export const routes = [
  { path: "/grid", component: GridChan, name: "GridChan" },
  { path: "/heat", component: HeatChan, name: "HeatChan" },
  { path: "/bar", component: BarChan, name: "BarChan" },
  { path: "/line", component: LineChan, name: "LineChan" },
  { path: "*", redirect: "/grid" }
];
