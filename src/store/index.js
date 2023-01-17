import { createStore } from "vuex";
import ads from './Ads/ads'

const store = createStore({
  modules: {
    ads,
  },
});

export default store;
