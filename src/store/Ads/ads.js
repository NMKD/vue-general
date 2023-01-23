import Ad from "./AdsHelp";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
export default {
  state() {
    return {
      ads: [
        {
          title: "First",
          description:
            "Lorem ipsum, dolor sit amet. Assumenda maiores architecto veniam et nisi suscipit quae laborum. Illo excepturi officiis laboriosam?",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
          id: "1",
        },
        {
          title: "Second",
          description:
            "Lorem ipsum, dolor sit amet. Assumenda maiores architecto veniam et nisi suscipit quae laborum. Illo excepturi officiis laboriosam?",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
          id: "2",
        },
        {
          title: "Third",
          description:
            "Lorem ipsum, dolor sit amet. Assumenda maiores architecto veniam et nisi suscipit quae laborum. Illo excepturi officiis laboriosam?",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
          id: "3",
        },
        {
          title: "Four",
          description:
            "Lorem ipsum, dolor sit amet. Assumenda maiores architecto veniam et nisi suscipit quae laborum. Illo excepturi officiis laboriosam?",
          promo: false,
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
          id: "4",
        },
      ],
    };
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload);
    },
  },
  actions: {
    async createAd({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);
      const ad = new Ad(
        payload.title,
        payload.description,
        getters.user,
        payload.src,
        payload.promo
      );

      try {
        const db = getDatabase();
        const auth = getAuth();
        const userId = auth.currentUser.uid;
        const adDb = await set(ref(db, '/ads/' + userId), ad)
        console.log(adDb)
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.code);
      }
    },
  },
  getters: {
    ads(state) {
      return state.ads;
    },
    promoAds(state) {
      return state.ads.filter((ad) => ad.promo);
    },
    myAds(state) {
      return state.ads;
    },
    adById(state) {
      return (adId) => {
        return state.ads.find((ad) => ad.id === adId);
      };
    },
  },
};
