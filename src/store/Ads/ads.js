import Ad from "./AdsHelp";
import { ref, update, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import fireStoreDb from "../firebaseConfig";

const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser.uid;
};

export default {
  state() {
    return {
      ads: [],
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
      const db = fireStoreDb();
      const userId = getCurrentUser();
      const ad = new Ad(
        payload.title,
        payload.description,
        getters.resUser,
        payload.src,
        payload.promo
      );

      try {
        if (userId) {
          // const newPostKey = push(child(ref(db), "posts")).key;
          const updates = {};
          updates["/ads-posts/" + userId] = ad;
          commit("createAd", ad);
          await update(ref(db), updates);
          commit("setLoading", false);
        }
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.code);
      }
    },

    async fetchAds({ commit }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const dbRef = ref(fireStoreDb());
        const userId = getCurrentUser();
        const ads = await get(child(dbRef, `ads-posts/${userId}`));
        if (ads) {
          commit("setLoading", false);
          commit("createAd", ads.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        commit("setError", error.message);
        throw error;
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
        return state.ads.find((ad) => ad.uid === adId);
      };
    },
  },
};
