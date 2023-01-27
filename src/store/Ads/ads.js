import Ad from "./AdsHelp";
import { ref, update, child, get, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import fireStoreDb from "../firebaseConfig";
import {
  uploadBytes,
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

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
    loadAds(state, payload) {
      state.ads = payload;
    },
    updateAd(state, payload) {
      const i = state.ads.indexOf((i) => i === payload.key);
      state.ads[i] = payload;
    },
  },
  actions: {
    async createAd({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const srcExt = payload.src.name.slice(
          payload.src.name.lastIndexOf(".")
        );
        const db = fireStoreDb();
        const userId = getCurrentUser();
        const newPostKey = push(child(ref(db), "posts")).key;
        const key = `${userId}${newPostKey}`;
        if (userId) {
          // upload image in store firebase
          const storage = getStorage();
          const refFb = storageRef(
            storage,
            `ads-images/car${newPostKey}${srcExt}`
          );

          await uploadBytes(refFb, payload.src);

          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          const urlSrc = await getDownloadURL(refFb);

          const ad = new Ad(
            payload.title,
            payload.description,
            userId,
            key,
            urlSrc,
            payload.promo
          );

          // update realtime database firebase
          const updates = {};
          updates["/ads-posts/" + userId + newPostKey] = ad;
          commit("createAd", ad);
          await update(ref(db), updates);
          commit("setLoading", false);
        }
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.code);
        throw error;
      }
    },

    async fetchAds({ commit }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const dbRef = ref(fireStoreDb());
        const fbDb = await get(child(dbRef, `ads-posts`));
        const ads = fbDb.val();
        if (ads) {
          const ad = Object.keys(ads).map((key) => {
            return ads[key];
          });
          commit("setLoading", false);
          commit("loadAds", ad);
        } else {
          commit("setLoading", false);
          console.log("No data available");
        }
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.code);
        throw error;
      }
    },

    async updateAd({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);

      const ad = new Ad(
        payload.title,
        payload.description,
        payload.uid,
        payload.key,
        payload.src,
        payload.promo
      );

      try {
        const db = fireStoreDb();
        const userId = getCurrentUser();

        if (userId) {
          const updates = {};
          updates["/ads-posts/" + ad.key] = ad;
          await update(ref(db), updates);
          commit("updateAd", updates);
          commit("setLoading", false);
        } else {
          commit("setLoading", false);
          commit(
            "setError",
            "Something went wrong, check all the fields of the form. Contact your administrator, error in the update Ad function"
          );
        }
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.code);
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
    myAds(state, getters) {
      return state.ads.filter((ad) => ad.uid === getters.resUser);
    },
    adById(state) {
      return (id) => {
        return state.ads.find((ad) => ad.uid === id);
      };
    },
  },
};
