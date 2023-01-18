import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      console.log(payload)
      state.user = payload;
    },
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        commit("setUser", user.user.uid);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
      }
    },

    async signIn({ commit }, { email, password }) {
      try {
        const user = await signInWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        commit("setUser", user.user.uid);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
      }
    },
  },
  getters: {
    resUser(state) {
      return state.user;
    },
  },
};
