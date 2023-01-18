import { createStore } from "vuex";
import ads from './Ads/ads'
import user from './Auth/user'
import common from './common'

const store = createStore({
  modules: {
    ads,
    user,
    common
  },
});

export default store;
