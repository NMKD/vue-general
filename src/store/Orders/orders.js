import { ref, update, child, get } from "firebase/database";
import fireStoreDb from "../firebaseConfig";
import getCurrentUser from "../Auth/currentUser";
import Orders from "./ordersHelper";

export default {
  state() {
    return {
      orders: [],
    };
  },
  mutations: {
    createOrders(state, payload) {
      state.orders.push(payload);
    },
    loadingOrders(state, payload) {
      state.orders = payload;
    },
    loadingMarkOrders(state, payload) {
      const i = state.orders.findIndex((o) => o.key === payload.key);
      state.orders[i] = payload;
    },
  },
  actions: {
    async createOrders({ commit }, payload) {
      commit("clearError");
      const userId = getCurrentUser();
      const db = fireStoreDb();
      try {
        if (userId) {
          const order = new Orders(
            payload.name,
            payload.phone,
            payload.key,
            payload.uid,
            payload.done
          );
          const updates = {};
          updates["/orders/" + payload.key] = order;
          await update(ref(db), updates);
          commit("createOrders", payload);
        }
      } catch (error) {
        commit("setError", error.code);
        throw error;
      }
    },
    async fetchOrders({ commit }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const userId = getCurrentUser();

        if (userId) {
          const dbRef = ref(fireStoreDb());
          const fbDb = await get(child(dbRef, `orders`));
          const ordersDb = fbDb.val();
          const orders = Object.keys(ordersDb).map((key) => {
            return ordersDb[key];
          });
          commit("setLoading", false);
          commit("loadingOrders", orders);
        }
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.code);
        throw error;
      }
    },

    async markOrders({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        payload.done = !payload.done;
        const db = fireStoreDb();
        const updates = {};
        updates["/orders/" + payload.key] = payload;
        await update(ref(db), updates);
        commit("setLoading", false);
        commit("loadingMarkOrders", payload);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.code);
        throw error;
      }
    },
  },
  getters: {
    getOrders(state) {
      return state.orders.filter((o) => o.uid === getCurrentUser());
    },
  },
};
