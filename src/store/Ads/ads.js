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
  },
  actions: {
    async createAd({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const srcExt = payload.src.name.slice(
          payload.src.name.lastIndexOf(".")
        );
        const db = fireStoreDb();
        const userId = getCurrentUser();
        const newPostKey = push(child(ref(db), "posts")).key;
        const uid = `${getters.resUser}${newPostKey}`;
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
            uid,
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
          commit("setLoading", false);
          const ad = Object.keys(ads).map((key) => {
            return ads[key];
          });
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
      return (id) => {
        return state.ads.find((ad) => ad.uid === id);
      };
    },
  },
};
