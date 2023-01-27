import { createStore } from "vuex";
import ads from "./Ads/ads";
import user from "./Auth/user";
import common from "./common";
import orders from "./Orders/orders";

const store = createStore({
  modules: {
    ads,
    user,
    common,
    orders,
  },
});

export default store;
